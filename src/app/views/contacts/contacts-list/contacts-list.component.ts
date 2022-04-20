import {Component, OnInit} from '@angular/core';
import {Contact} from "../../../models/contact.model";
import {ContactService} from "../../../services/contact.service";
import {ApiContact} from "../../../models/api/api-contact.model";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit {

    contacts?: Contact[];
    currentContact?: Contact;
    currentIndex = -1;
    title = '';
    readonly limit = 20;
    readonly defaultOffset = 0;
    currentOffset = 0;

    // details modal view
    // detailsVisible = false;


    constructor(private contactService: ContactService, private router: Router) {
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

        this.router.navigate(['contacts/' + contact.fn], {state: {contact: this.currentContact}})
            .then(success => console.log('navigation success?', success))
            .catch(console.error);
    }

    fetchPrevious(): void {
        this.retrieveContacts(this.currentOffset - this.limit)
    }

    fetchNext(): void {
        this.retrieveContacts(this.currentOffset + this.limit)
    }

    // toggleContactDetails(contact: Contact, index: number) {
    //   this.detailsVisible = !this.detailsVisible;
    //   this.setActiveContact(contact, index)
    // }

    // handleDetailsVisibleChange(event: any) {
    //   this.detailsVisible = event;
    // }

}
