import { Component, OnInit } from "@angular/core";
import { Contact } from "../../../models/contact.model";
import { ContactApiService } from "../../../services/api/contact-api.service";
import { ApiContact } from "../../../models/api/api-contact.model";
import { Router } from "@angular/router";
import { ContactDetailsService } from "../../../services/contact-details.service";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts-list.component.html",
  styleUrls: ["./contacts-list.component.scss"],
})
export class ContactsListComponent implements OnInit {
  contacts?: Contact[];
  currentContact?: Contact;
  currentIndex = -1;
  title = "";
  readonly limit = 20;
  readonly defaultOffset = 0;
  currentOffset = 0;
  loading = false;

  // details modal view
  // detailsVisible = false;

  constructor(
    private contactService: ContactApiService,
    private router: Router,
    private contactDetailsService: ContactDetailsService
  ) {}

  ngOnInit(): void {
    this.retrieveContacts();
  }

  retrieveContacts(offset: number = this.defaultOffset): void {
    this.loading = true;
    if (offset >= 0) {
      // offset must be at least zero
      this.contactService.get(this.limit, offset).subscribe({
        next: (apiContacts: ApiContact[]) => {
          if (apiContacts.length != 0) {
            // only execute if we have entries, otherwise keep the current array of contacts
            this.contacts = apiContacts.map((apiContact) =>
              Contact.fromApiContact(apiContact)
            );
            this.currentOffset = offset;
            this.loading = false;
          }
        },
        error: (e) => console.error(e),
      });
    }
  }

  setActiveContact(contact: Contact, index: number): void {
    this.currentContact = contact;
    this.currentIndex = index;

    // prepare contact data to be passed to detail page
    this.contactDetailsService
      .storeContact(contact)
      .subscribe((maybeContactFN) => {
        if (maybeContactFN != undefined) {
          this.router.navigate(["contacts/" + contact.fn]).catch(console.error);
        } else {
          console.error("Cannot fetch and store contact detail data!");
        }
      });
  }

  fetchPrevious(): void {
    this.retrieveContacts(this.currentOffset - this.limit);
  }

  fetchNext(): void {
    this.retrieveContacts(this.currentOffset + this.limit);
  }
}
