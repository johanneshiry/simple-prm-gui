import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { Reminder } from "../../../../../models/reminder.model";
import { ReminderDetailConstants } from "./reminder-detail-constants";
import { ReminderApiService } from "../../../../../services/api/reminder-api.service";
import { ToastNotificationUtil } from "../../../../common/toast-notification/toast-notification.util";
import { ToasterComponent } from "@coreui/angular";
import { DurationUtil } from "../../../../../common/duration-util";
import { LocalDate, LocalDateTime } from "@js-joda/core";
import { NgForm } from "@angular/forms";
import { ApiUtil } from "../../../../../services/api/api-util";

@Component({
  selector: "app-reminder-detail[selectedReminder]",
  templateUrl: "./reminder-detail.component.html",
  styleUrls: ["./reminder-detail.component.scss"],
})
export class ReminderDetailComponent
  extends ReminderDetailConstants
  implements OnInit, OnChanges
{
  @ViewChild(ToasterComponent) queryResultToast!: ToasterComponent;

  @Input()
  selectedReminder?: Reminder;
  show: boolean = false;
  editOrCreate: string = "Edit";
  modalTitle: string = this.editOrCreate + " Reminder";

  customStylesValidated = false;

  selectedReminderFormData = this._selectedReminderFormData();

  ngOnChanges(changes: SimpleChanges) {
    if (changes["selectedReminder"].currentValue) {
      this.selectedReminderFormData = this._selectedReminderFormData();
      this.customStylesValidated = false;
    }
  }

  private _selectedReminderFormData() {
    if (this.selectedReminder) {
      let formDuration = DurationUtil.toInputFormRepresentation(
        this.selectedReminder.reminderInterval
      );
      let formDate = this.selectedReminder.reminderDate;
      return {
        interval: {
          availableUnits: this.reminderIntervalUnits.filter(
            (intervalUnit) => intervalUnit != formDuration.unit
          ),
          unit: formDuration.unit,
          formVal: formDuration.value,
        },
        date: {
          year: formDate.year(),
          month: formDate.monthValue(),
          day: formDate.dayOfMonth(),
        },
      };
    } else {
      return {
        interval: {
          availableUnits: this.reminderIntervalUnits.filter(
            (intervalUnit) => intervalUnit != this.defaultReminderIntervalUnit
          ),
          unit: this.defaultReminderIntervalUnit,
          formVal: 1,
        },
        date: {
          year: LocalDateTime.now().year(),
          month: LocalDateTime.now().monthValue(),
          day: LocalDateTime.now().dayOfMonth(),
        },
      };
    }
  }

  formDateString(date: { year: number; month: number; day: number }) {
    return `${date.year}-${date.month < 10 ? "0" + date.month : date.month}-${
      date.day < 10 ? "0" + date.day : date.day
    }`;
  }

  constructor(private reminderApiService: ReminderApiService) {
    super();
  }

  ngOnInit(): void {}

  handleReminderDetailsChange(visible: boolean, reminderDetailForm?: NgForm) {
    this.show = visible;
    if (!visible) {
      this._resetFormValuesToDefaults(reminderDetailForm);
    }
  }

  private _resetFormValuesToDefaults(reminderDetailForm?: NgForm) {
    if (reminderDetailForm) {
      reminderDetailForm.resetForm();
      reminderDetailForm.form
        .get("datepicker")
        ?.setValue(this.selectedReminderFormData.date);
      reminderDetailForm.form
        .get("interval_value")
        ?.setValue(this.selectedReminderFormData.interval.formVal);
      reminderDetailForm.form
        .get("interval_unit")
        ?.setValue(this.selectedReminderFormData.interval.unit);
    }
  }

  onSubmit(event: any, reminderDetailForm: NgForm) {
    this.customStylesValidated = true;
    if (reminderDetailForm.valid && this.selectedReminder) {
      this._save(
        this.editOrCreate == "Edit" ? "Adapting" : "Creation",
        this.selectedReminder.uuid,
        this.selectedReminder.contactId,
        this.selectedReminder.reminderType,
        this.selectedReminder.lastTimeReminded,
        this.formDateString(reminderDetailForm.value.datepicker),
        reminderDetailForm.value.interval_value,
        reminderDetailForm.value.interval_unit
      )?.add(() => {
        // query the current state of contact reminders
        this.reminderApiService.get(this.selectedReminder!.contactId);
        this.handleReminderDetailsChange(false, reminderDetailForm);
      });
    }
  }

  private _save(
    adaptionOrCreation: string,
    uuid: string,
    contactId: string,
    type: string,
    lastContacted: LocalDate,
    selectedDate: string,
    intervalVal: string,
    intervalUnit: string
  ) {
    let interval = DurationUtil.fromStrings(intervalVal, intervalUnit);
    let adaptOrCreate = adaptionOrCreation == "Adapting" ? "adapt" : "create";
    let adaptedOrCreated =
      adaptionOrCreation == "Adapting" ? "adapted" : "created";

    if (interval) {
      let date = LocalDate.parse(selectedDate);
      return this.reminderApiService
        .create(
          new Reminder(uuid, contactId, type, date, interval, lastContacted, "") // todo
        )
        .subscribe({
          next: () =>
            ToastNotificationUtil.success(
              adaptionOrCreation + " successful",
              "Successfully " + adaptedOrCreated + " reminder!",
              this.queryResultToast
            ),
          error: (err) =>
            ToastNotificationUtil.failure(
              adaptionOrCreation + " failed",
              "Cannot " +
                adaptOrCreate +
                " reminder! Error: " +
                ApiUtil.errorString(err.error),
              this.queryResultToast
            ),
        });
    } else {
      ToastNotificationUtil.failure(
        adaptionOrCreation + " failed",
        "Cannot " +
          adaptOrCreate +
          " reminder: parsing interval input value failed!",
        this.queryResultToast
      );
      return undefined;
    }
  }
}
