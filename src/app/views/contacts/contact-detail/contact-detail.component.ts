import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Contact } from "../../../models/contact.model";
import { DummyContactComponent } from "./DummyContact.component";
import { ReminderService } from "../../../services/api/reminder.service";
import { Reminder } from "../../../models/reminder.model";
import { ApiContact } from "../../../models/api/api-contact.model";
import { ApiReminder } from "../../../models/api/reminder.model";
import { ContactService } from "../../../services/api/contact.service";

@Component({
  selector: "app-contact-detail",
  templateUrl: "./contact-detail.component.html",
  styleUrls: ["./contact-detail.component.scss"],
})
export class ContactDetailComponent implements OnInit {
  @Input() contact?: Contact = DummyContactComponent.dummyContact();

  avatarBackgroundColor = "secondary";
  reminders?: Reminder[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reminderService: ReminderService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state as {
      contact: Contact;
    };
    if (state != undefined) {
      // todo switch to service to enable page reloading
      this.contact = state.contact;
      this.route.snapshot.data = { title: this.contact.fn };
    } else {
      this.route.snapshot.data = { title: "No contact selected!" };
    }

    // retrieve reminders
    this.retrieveReminders();
  }

  ngOnInit(): void {}

  private retrieveReminders() {
    if (this.contact?.uid != undefined) {
      this.reminderService.get(this.contact.uid).subscribe({
        next: (apiReminder: ApiReminder[]) => {
          if (apiReminder.length != 0) {
            this.reminders = apiReminder.map(
              (apiReminder) => new Reminder(apiReminder)
            );
          }
        },
        error: (e) => console.error(e),
      });
    }
  }
}
