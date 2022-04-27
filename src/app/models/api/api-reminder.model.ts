import { Reminder } from "../reminder.model";

export interface ApiReminder {
  uuid: string;
  contactId: string;
  type: string;
  firstContactDate: string;
  contactInterval: string;
  lastContacted: string;
}

export class ApiReminder implements ApiReminder {
  constructor(
    uuid: string,
    contactId: string,
    type: string,
    firstContactDate: string,
    contactInterval: string,
    lastContacted: string
  ) {
    this.uuid = uuid;
    this.contactId = contactId;
    this.firstContactDate = firstContactDate;
    this.type = type;
    this.contactInterval = contactInterval;
    this.lastContacted = lastContacted;
  }

  public static fromReminder(reminder: Reminder) {
    return new ApiReminder(
      reminder.uuid,
      reminder.contactId,
      reminder.type,
      reminder.firstContactDate.toString(),
      reminder.contactInterval.toString(),
      reminder.lastContacted.toString()
    );
  }
}
