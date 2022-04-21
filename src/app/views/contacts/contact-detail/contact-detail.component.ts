import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Contact } from "../../../models/contact.model";
import { DummyContactComponent } from "./DummyContact.component";

@Component({
  selector: "app-contact-detail",
  templateUrl: "./contact-detail.component.html",
  styleUrls: ["./contact-detail.component.scss"],
})
export class ContactDetailComponent implements OnInit {
  @Input() contact?: Contact = DummyContactComponent.dummyContact();

  _avatarBackgroundColor = "secondary";

  constructor(private route: ActivatedRoute, private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state as {
      contact: Contact;
    };
    if (state != undefined) {
      this.contact = state.contact;
      this.route.snapshot.data = { title: this.contact.fn };
    } else {
      this.route.snapshot.data = { title: "No contact selected!" };
    }
  }

  ngOnInit(): void {}
}
