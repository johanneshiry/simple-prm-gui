import { Component, Inject, Input, OnInit, ViewChild } from "@angular/core";
import { Reminder } from "../../../../models/reminder.model";
import { Duration, ZonedDateTime } from "@js-joda/core";
import { ReminderApiService } from "../../../../services/api/reminder-api.service";

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
    this.queryReminders();
  }

  private queryReminders() {
    // query reminders
    this.reminderApiService.get(this.contactUid).subscribe({
      next: (maybeReminders) => {
        if (maybeReminders) {
          this.reminders = maybeReminders;
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
  }

  // create reminder
  createReminder(): Reminder {
    return new Reminder({
      contactId: this.contactUid,
      lastContacted: ZonedDateTime.now(),
      contactInterval: Duration.ofDays(1),
    });
  }

  private _toggleSelectedReminder(reminder: Reminder) {
    this.selectedReminder = this.selectedReminder ? undefined : reminder;
  }

  toggleReminderDetails(reminder: Reminder, editOrCreate: string) {
    if (!this._deleteReminder.show) {
      this._toggleSelectedReminder(reminder);
      this._reminderDetails.show = !this._reminderDetails.show;
      this._reminderDetails.modalTitle = editOrCreate + " Reminder";
    }
  }

  toggleDeleteReminder(reminder: Reminder) {
    this._toggleSelectedReminder(reminder);
    this._deleteReminder.show = !this._deleteReminder.show;
  }
}
