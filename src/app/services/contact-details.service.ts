import { Injectable } from "@angular/core";
import { Contact } from "../models/contact.model";
import { VCard4 } from "vcard4-ts";
import { Observable } from "rxjs";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ContactDetailsService {
  private _contactStorageKey: string = "contact";

  constructor() {}

  storeContact(contact: Contact): Observable<string | undefined> {
    this.store(contact.vCard);
    return of(contact.fn);
  }

  private store(vCard: VCard4) {
    localStorage.setItem(this._contactStorageKey, JSON.stringify(vCard));
  }

  private read(): undefined | VCard4 {
    let storedContact = localStorage.getItem(this._contactStorageKey);
    if (storedContact != undefined) {
      return <VCard4>JSON.parse(storedContact);
    }
    return undefined;
  }

  get contact() {
    let storedContactVCard = this.read()!;
    return new Contact(storedContactVCard);
  }

  clean() {
    localStorage.removeItem(this._contactStorageKey);
  }
}
