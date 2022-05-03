import { Duration, Period, Temporal, ZonedDateTime } from "@js-joda/core";
import { ApiReminder } from "./api/api-reminder.model";
import { DurationUtil } from "../common/duration-util";

export class Reminder {
  private _uuid: string;
  private readonly _contactId: string;
  private readonly _firstContactDate: ZonedDateTime;
  private readonly _contactInterval: Period;
  private readonly _lastContacted: ZonedDateTime;
  private _type: string;

  constructor(
    uuid: string,
    contactId: string,
    type: string,
    firstContactDate: ZonedDateTime,
    contactInterval: Period,
    lastContacted: ZonedDateTime
  ) {
    this._uuid = uuid;
    this._contactId = contactId;
    this._type = type;
    this._firstContactDate = firstContactDate;
    this._lastContacted = lastContacted;
    this._contactInterval = Period.ofDays(contactInterval.days());
  }

  static fromApiReminder(apiReminder: ApiReminder): Reminder {
    return new Reminder(
      apiReminder.uuid,
      apiReminder.contactId,
      "Reminder", // todo
      // ZonedDateTime.parse(apiReminder.firstContactDate), // todo
      ZonedDateTime.now(), // todo
      DurationUtil.parsePeriod(apiReminder.contactInterval),
      ZonedDateTime.parse(apiReminder.lastContacted)
    );
  }

  get uuid(): string {
    return this._uuid;
  }

  set uuid(value: string) {
    this._uuid = value;
  }

  get contactInterval(): Period {
    return this._contactInterval;
  }

  get contactIntervalHumanReadable(): String {
    return DurationUtil.periodDisplayString(this._contactInterval);
  }

  get lastContacted(): ZonedDateTime {
    return this._lastContacted;
  }

  get contactId(): string {
    return this._contactId;
  }

  get firstContactDate(): ZonedDateTime {
    return this._firstContactDate;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
}
