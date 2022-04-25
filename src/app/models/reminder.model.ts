import { Duration, ZonedDateTime } from "@js-joda/core";
import { ApiReminder } from "./api/api-reminder.model";

export class Reminder {
  uuid: string;
  contactId: string;
  lastContacted: ZonedDateTime;
  contactInterval: Duration;

  constructor(apiReminder: ApiReminder) {
    this.uuid = apiReminder.uuid;
    this.contactId = apiReminder.contactId;
    this.lastContacted = apiReminder.lastContacted;
    this.contactInterval = apiReminder.contactInterval;
  }
}
