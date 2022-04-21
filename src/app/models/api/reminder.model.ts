import { Duration, ZonedDateTime } from "@js-joda/core";

export interface ApiReminder {
  contactId: string;
  lastContacted: ZonedDateTime;
  contactInterval: Duration;
}
