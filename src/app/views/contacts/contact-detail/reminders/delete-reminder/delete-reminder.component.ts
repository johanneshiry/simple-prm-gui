import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Reminder } from "../../../../../models/reminder.model";
import { ReminderApiService } from "../../../../../services/api/reminder-api.service";
import { ToasterComponent } from "@coreui/angular";
import { ToastNotificationUtil } from "../../../../common/toast-notification/toast-notification.util";
import { ApiUtil } from "../../../../../services/api/api-util";

@Component({
  selector: "app-delete-reminder[selectedReminder]",
  templateUrl: "./delete-reminder.component.html",
  styleUrls: ["./delete-reminder.component.scss"],
})
export class DeleteReminderComponent implements OnInit {
  @Input()
  selectedReminder?: Reminder;

  show: boolean = false;

  @ViewChild(ToasterComponent) queryResultToast!: ToasterComponent;

  constructor(private reminderApiService: ReminderApiService) {}

  ngOnInit(): void {}

  handleDeleteReminderChange(visible: boolean) {
    this.show = visible;
  }

  deleteReminder(): void {
    if (this.selectedReminder) {
      this.reminderApiService
        .delete(this.selectedReminder.uuid)
        .subscribe({
          next: () =>
            ToastNotificationUtil.success(
              "Deletion successful",
              "Successfully deleted reminder!",
              this.queryResultToast
            ),
          error: (err) =>
            ToastNotificationUtil.failure(
              "Deletion failed",
              "Cannot delete reminder! Error: " +
                ApiUtil.errorString(err.error),
              this.queryResultToast
            ),
        })
        .add(() =>
          // query the current state of contact reminders
          this.reminderApiService.get(this.selectedReminder!.contactId)
        );
    } else {
      ToastNotificationUtil.failure(
        "Deletion failed",
        "Cannot delete reminder, as no reminder is currently selected!",
        this.queryResultToast
      );
    }

    this.handleDeleteReminderChange(false);
  }
}
