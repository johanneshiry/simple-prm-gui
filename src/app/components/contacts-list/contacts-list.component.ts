import {Component, OnInit} from '@angular/core';
import {ContactService} from "../../services/contact.service";
import {Contact} from "../../models/contact.model";
import {ApiContact} from "../../models/api-contact.model";

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

    constructor(private contactService: ContactService) {
    }

    ngOnInit(): void {
        this.retrieveContacts();
    }

    retrieveContacts(): void {
        this.contactService.getAll().subscribe({
                next: (apiContacts: ApiContact[]) => {
                    this.contacts = apiContacts.map(apiContact => new Contact(apiContact))
                },
                error: (e) => console.error(e)
            }
        );
    }

    setActiveContact(contact: Contact, index: number): void {
        this.currentContact = contact;
        this.currentIndex = index;
    }

}
