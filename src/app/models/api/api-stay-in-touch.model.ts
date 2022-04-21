import { Duration, ZonedDateTime } from "@js-joda/core";

export interface ApiStayInTouch {
  contactId: string;
  lastContacted: ZonedDateTime;
  contactInterval: Duration;
}
