import { Duration, ZonedDateTime } from "@js-joda/core";

export interface ApiReminder {
  uuid: string;
  contactId: string;
  lastContacted: ZonedDateTime;
  contactInterval: Duration;
}
