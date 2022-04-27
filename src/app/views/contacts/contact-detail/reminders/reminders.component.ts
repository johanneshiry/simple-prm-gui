import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Reminder } from "../../../../models/reminder.model";
import { Period, ZonedDateTime } from "@js-joda/core";
import { ReminderApiService } from "../../../../services/api/reminder-api.service";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: "app-reminders[contactUid]",
  templateUrl: "./reminders.component.html",
  styleUrls: ["./reminders.component.scss"],
})
export class RemindersComponent implements OnInit {
  @Input()
  contactUid!: string;

  // the list of reminders that are shown
  reminders?: Reminder[];

  // the currently selected reminder if any
  selectedReminder?: Reminder;

  // default error msg if querying fails
  reminderQueryErrorMsg: string = "No reminders set!";

  // childs of modals
  @ViewChild("reminderDetails") private _reminderDetails: any;
  @ViewChild("deleteReminder") private _deleteReminder: any;

  constructor(private reminderApiService: ReminderApiService) {}

  ngOnInit(): void {
    this.subscribeReminderChanges();
  }

  private subscribeReminderChanges() {
    // subscribe
    this.reminderApiService.subscribe({
      next: (maybeReminders) => {
        this.reminders = undefined;
        if (maybeReminders) {
          this.reminders = maybeReminders.map((apiReminder) =>
            Reminder.fromApiReminder(apiReminder)
          );
        } else {
          this.reminders = [];
        }
      },
      error: (err) => {
        this.reminders = [];
        this.reminderQueryErrorMsg =
          "Error while fetching reminders: " + JSON.stringify(err);
      },
    });
    // query
    this.reminderApiService.get(this.contactUid);
  }

  // create reminder
  createReminder(): Reminder {
    return new Reminder(
      uuidv4(),
      this.contactUid,
      "Reminder",
      ZonedDateTime.now(),
      Period.ofDays(1),
      ZonedDateTime.parse(new Date(0).toISOString())
    );
  }

  private _toggleSelectedReminder(reminder: Reminder) {
    this.selectedReminder = reminder;
  }

  toggleReminderDetails(reminder: Reminder, editOrCreate: string) {
    if (!this._deleteReminder.show) {
      this._toggleSelectedReminder(reminder);
      this._reminderDetails.show = !this._reminderDetails.show;
      this._reminderDetails.editOrCreate = editOrCreate;
    }
  }

  toggleDeleteReminder(reminder: Reminder) {
    this._toggleSelectedReminder(reminder);
    this._deleteReminder.show = !this._deleteReminder.show;
  }
}
