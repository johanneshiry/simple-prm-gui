import { Component, Input, OnInit } from "@angular/core";
import { Contact } from "../../models/contact.model";
import { StayInTouchService } from "../../services/stay-in-touch.service";
import { StayInTouch } from "../../models/stay-in-touch.model";
import { ChronoUnit, Duration, ZonedDateTime, ZoneId } from "@js-joda/core";

@Component({
  selector: "app-contact-details",
  templateUrl: "./contact-details.component.html",
  styleUrls: ["./contact-details.component.scss"],
})
export class ContactDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentContact?: Contact;

  constructor(private stayInTouchService: StayInTouchService) {}

  ngOnInit(): void {}

  createDummyStayInTouch(contact: Contact): void {
    let stayInTouch = new StayInTouch(
      contact.uid,
      ZonedDateTime.now(ZoneId.UTC),
      Duration.of(48, ChronoUnit.HOURS)
    );
    this.stayInTouchService.create(stayInTouch).subscribe({
      next: (value) => console.debug(value),
    });
  }
}
