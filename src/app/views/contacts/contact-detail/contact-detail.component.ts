import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Contact } from "../../../models/contact.model";
import { Reminder } from "../../../models/reminder.model";
import { ContactDetailsService } from "../../../services/contact-details.service";
import {
  ChronoUnit,
  DateTimeFormatter,
  Duration,
  LocalDateTime,
  ZonedDateTime,
  ZoneId,
  ZoneOffset,
} from "@js-joda/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { ReminderDetailComponent } from "./reminders/reminder-detail/reminder-detail.component";

@Component({
  selector: "app-contact-detail",
  templateUrl: "./contact-detail.component.html",
  styleUrls: ["./contact-detail.component.scss"],
})
export class ContactDetailComponent implements OnInit, OnDestroy {
  @Input() contact: Contact;

  avatarBackgroundColor = "secondary";
  reminders: Reminder[];

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

  ngOnDestroy(): void {}

  ngOnInit(): void {}
}
