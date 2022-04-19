import {Component, OnInit} from '@angular/core';
import {ContactService} from "../../services/contact.service";
import {Contact} from "../../models/contact.model";
import {ApiContact} from "../../models/api/api-contact.model";

@Component({
    selector: 'app-contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
    contacts?: Contact[];
    currentContact?: Contact;
    currentIndex = -1;
    title = '';
    readonly limit = 20;
    readonly defaultOffset = 0;
    currentOffset = 0;

    constructor(private contactService: ContactService) {
    }

    ngOnInit(): void {
        this.retrieveContacts();
    }

    retrieveContacts(offset: number = this.defaultOffset): void {
        if (offset >= 0) { // offset must be at least zero
            this.contactService.get(this.limit, offset).subscribe({
                    next: (apiContacts: ApiContact[]) => {
                        if (apiContacts.length != 0) {
                            // only execute if we have entries, otherwise keep the current array of contacts
                            this.contacts = apiContacts.map(apiContact => new Contact(apiContact))
                            this.currentOffset = offset
                        }
                    },
                    error: (e) => console.error(e)
                }
            );
        }
    }

    setActiveContact(contact: Contact, index: number): void {
        this.currentContact = contact;
        this.currentIndex = index;
    }

    fetchPrevious(): void {
        this.retrieveContacts(this.currentOffset - this.limit)
    }

    fetchNext(): void {
        this.retrieveContacts(this.currentOffset + this.limit)
    }

}
