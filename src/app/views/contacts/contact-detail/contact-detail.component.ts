import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Contact } from "../../../models/contact.model";
import { Reminder } from "../../../models/reminder.model";
import { ContactDetailsService } from "../../../services/contact-details.service";
import { Duration, ZonedDateTime } from "@js-joda/core";

@Component({
  selector: "app-contact-detail",
  templateUrl: "./contact-detail.component.html",
  styleUrls: ["./contact-detail.component.scss"],
})
export class ContactDetailComponent implements OnInit, OnDestroy {
  @Input() contact: Contact;

  avatarBackgroundColor = "secondary";
  reminders: Reminder[];

  // reminder edit + details handling
  selectedReminder?: Reminder;
  showReminderDetails = false;
  reminderDetailsTitle = "";
  showReminderDelete = false;

  constructor(
    private route: ActivatedRoute,
    private contactDetailsService: ContactDetailsService
  ) {
    this.contact = contactDetailsService.contact;
    this.reminders = contactDetailsService.reminder;
    this.setRouteTitle();
  }

  private setRouteTitle() {
    if (this.contact != undefined) {
      this.route.snapshot.data = { title: this.contact.fn };
    } else {
      this.route.snapshot.data = { title: "No contact selected!" };
    }
  }

  // reminder details / edit modal view handling
  displayReminderDetails(reminder: Reminder, editOrCreate: string) {
    if (!this.showReminderDelete) {
      // do not show edit if delete is open already open
      // required as delete is in scope of the same button
      this.showReminderDetails = true;
      this.selectedReminder = reminder;
      this.reminderDetailsTitle = editOrCreate + " Reminder";
    }
  }

  handleReminderDetailsChange(visible: boolean) {
    this.showReminderDetails = visible;
    this.selectedReminder = visible ? this.selectedReminder : undefined;
  }

  // create reminder
  createReminder(): Reminder {
    return new Reminder({
      contactId: this.contact.uid,
      lastContacted: ZonedDateTime.now(),
      contactInterval: Duration.ofDays(1),
    });
  }

  // delete reminder
  maybeDelete(reminder: Reminder): void {
    this.showReminderDelete = true;
    this.selectedReminder = reminder;
  }

  handleDeleteReminderChange(visible: boolean) {
    this.showReminderDelete = visible;
    this.selectedReminder = visible ? this.selectedReminder : undefined;
  }

  deleteReminder(): void {
    // todo actual deletion process of selected reminder
    // delete + requery
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {}
}
