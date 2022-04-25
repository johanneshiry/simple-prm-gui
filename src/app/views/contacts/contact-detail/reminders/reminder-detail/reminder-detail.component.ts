import { Component, Input, OnInit } from "@angular/core";
import { Reminder } from "../../../../../models/reminder.model";
import { ReminderDetailConstants } from "./reminder-detail-constants";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-reminder-detail[selectedReminder]",
  templateUrl: "./reminder-detail.component.html",
  styleUrls: ["./reminder-detail.component.scss"],
})
export class ReminderDetailComponent
  extends ReminderDetailConstants
  implements OnInit
{
  @Input()
  selectedReminder?: Reminder;
  show: boolean = false;
  modalTitle?: string;

  selectedReminderIntervalUnit?: string;

  model?: NgbDateStruct;

  constructor() {
    super();
  }

  ngOnInit(): void {}

  handleReminderDetailsChange(visible: boolean) {
    this.show = visible;
    this.selectedReminderIntervalUnit = visible
      ? this.selectedReminderIntervalUnit
      : this.defaultReminderIntervalUnit;
  }

  validateAndSaveReminder(
    intervalValue: string | null,
    intervalUnit: string | null,
    yearMonthDate: string | null
  ) {
    // let validReminder: Reminder | { error: string } = this.validate(
    //   intervalValue,
    //   intervalUnit,
    //   yearMonthDate
    // );
    // if (!("error" in validReminder)) {
    //   // hide
    //   this.handleReminderDetailsChange(false);
    //
    //   // save
    //   // todo as observable
    //
    //   // query and reload reminder afterwards
    //   // todo as subscribe
    // } else {
    //   console.log(validReminder.error);
    // }
  }

  // validate reminder form
  // validate(
  //     intervalValue: string | null,
  //     intervalUnit: string | null,
  //     yearMonthDate: string | null
  // ): Reminder | { error: string } {
  //   // interval value must be not null and must be a number
  //   if (intervalValue == null || isNaN(+intervalValue)) {
  //     return {
  //       error:
  //           "Interval value must be at least '1'. Current value: '" +
  //           intervalValue +
  //           "'",
  //     };
  //   }
  //
  //   let chronoUnit: ChronoUnit | undefined = undefined;
  //   if (intervalUnit != null) {
  //     chronoUnit = [...this._reminderIntervalUnits.entries()]
  //         .reduce((acc, [k, v]) => {
  //           acc.has(v) ? acc.set(v, acc.get(v).concat(k)) : acc.set(v, [k]);
  //           return acc;
  //         }, new Map())
  //         .get(intervalUnit.trim());
  //   }
  //   if (!chronoUnit) {
  //     return {
  //       error: "Please select a valid unit!",
  //     };
  //   }
  //
  //   let date = undefined;
  //   if (yearMonthDate != null && yearMonthDate.length > 0) {
  //     date = Date.parse(yearMonthDate);
  //   }
  //   if (!date) {
  //     return {
  //       error: "Please provide a valid reminder date!",
  //     };
  //   }
  //
  //   return new Reminder({
  //     contactId: this.contact.uid,
  //     lastContacted: ZonedDateTime.now(), // todo
  //     contactInterval: Duration.of(1, ChronoUnit.HOURS), // todo https://stackoverflow.com/questions/26454129/getting-duration-using-the-new-datetime-api
  //   }); // todo
  // }
}
