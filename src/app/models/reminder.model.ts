import { Duration, ZonedDateTime } from "@js-joda/core";
import { ApiReminder } from "./api/reminder.model";

export class Reminder {
  contactId: string;
  lastContacted: ZonedDateTime;
  contactInterval: Duration;

  constructor(apiReminder: ApiReminder) {
    this.contactId = apiReminder.contactId;
    this.lastContacted = apiReminder.lastContacted;
    this.contactInterval = apiReminder.contactInterval;
  }
}
