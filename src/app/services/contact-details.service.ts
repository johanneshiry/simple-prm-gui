import { Injectable } from "@angular/core";
import { Contact } from "../models/contact.model";
import { Reminder } from "../models/reminder.model";
import { ReminderApiService } from "./api/reminder-api.service";
import { ApiReminder } from "../models/api/reminder.model";
import { VCard4 } from "vcard4-ts";
import { forkJoin, map, Observable } from "rxjs";

interface Storage {
  vCard: VCard4;
  reminders: Reminder[];
}

@Injectable({
  providedIn: "root",
})
export class ContactDetailsService {
  private storageStruct(vCard: VCard4, reminders: Reminder[]): Storage {
    return {
      vCard: vCard,
      reminders: reminders,
    };
  }

  fetchAdditionalDataAndStore(
    contact: Contact
  ): Observable<String | undefined> {
    return forkJoin(this.fetchAdditionalContactData(contact)).pipe(
      map(([reminders]) => {
        this.store(contact.vCard, reminders);
        return contact.fn;
      })
    );
  }

  private store(vCard: VCard4, reminders: Reminder[]) {
    localStorage.setItem(
      this._contactStorageKey,
      JSON.stringify(this.storageStruct(vCard, reminders))
    );
  }

  private read(): undefined | Storage {
    let storedContact = localStorage.getItem(this._contactStorageKey);
    if (storedContact != undefined) {
      return <Storage>JSON.parse(storedContact);
    }
    return undefined;
  }

  private _contactStorageKey: string = "contact";

  constructor(private reminderService: ReminderApiService) {}

  fetchAdditionalContactData(contact: Contact) {
    return [this.fetchReminders(contact)];
  }

  private fetchReminders(contact: Contact): Observable<ApiReminder[]> {
    return this.reminderService.get(contact.uid);
  }

  get reminder(): Reminder[] {
    let storedData = this.read();
    if (storedData != undefined) {
      return storedData.reminders;
    }
    return [];
  }

  get contact() {
    let storedContactVCard = this.read()!.vCard;
    return new Contact(storedContactVCard);
  }

  clean() {
    localStorage.removeItem(this._contactStorageKey);
  }
}
