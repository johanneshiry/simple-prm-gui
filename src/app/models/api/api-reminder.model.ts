import { Reminder } from "../reminder.model";

export interface ApiReminder {
  uuid: string;
  reason: string;
  contactId: string;
  reminderDate: string;
  lastTimeReminded: string;
  reminderInterval: string;
  reminderType: string;
}

export class ApiReminder implements ApiReminder {
  constructor(
    uuid: string,
    reason: string,
    contactId: string,
    reminderDate: string,
    lastTimeReminded: string,
    reminderInterval: string,
    reminderType: string
  ) {
    this.uuid = uuid;
    this.contactId = contactId;
    this.reminderDate = reminderDate;
    this.reminderType = reminderType;
    this.reminderInterval = reminderInterval;
    this.lastTimeReminded = lastTimeReminded;
  }

  public static fromReminder(reminder: Reminder) {
    return new ApiReminder(
      reminder.uuid,
      reminder.reason,
      reminder.contactId,
      reminder.reminderDate.toString(),
      reminder.lastTimeReminded.toString(),
      reminder.reminderInterval.toString(),
      reminder.reminderType.toString()
    );
  }
}
