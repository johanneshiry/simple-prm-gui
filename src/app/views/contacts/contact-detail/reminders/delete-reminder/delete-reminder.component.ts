import { Component, Input, OnInit } from "@angular/core";
import { Reminder } from "../../../../../models/reminder.model";

@Component({
  selector: "app-delete-reminder[selectedReminder]",
  templateUrl: "./delete-reminder.component.html",
  styleUrls: ["./delete-reminder.component.scss"],
})
export class DeleteReminderComponent implements OnInit {
  @Input()
  selectedReminder?: Reminder;

  show: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  handleDeleteReminderChange(visible: boolean) {
    this.show = visible;
    this.selectedReminder = visible ? this.selectedReminder : undefined;
  }

  // // delete reminder
  // maybeDelete(reminder: Reminder): void {
  //   this.showReminderDelete = true;
  //   this.selectedReminder = reminder;
  // }
  //
  // handleDeleteReminderChange(visible: boolean) {
  //   this.showReminderDelete = visible;
  //   this.selectedReminder = visible ? this.selectedReminder : undefined;
  // }
  //
  // deleteReminder(): void {
  //   // todo actual deletion process of selected reminder
  //   // delete + requery
  // }
}
