import {Duration, ZonedDateTime} from "@js-joda/core";

export class StayInTouch {
    contactId: string
    lastContacted: ZonedDateTime
    contactInterval: Duration

    constructor(contactId: string, lastContacted: ZonedDateTime, contactInterval: Duration) {
        this.contactId = contactId
        this.lastContacted = lastContacted
        this.contactInterval = contactInterval
    }
}
