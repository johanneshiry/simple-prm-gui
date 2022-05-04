import { LocalDate, Period } from "@js-joda/core";
import { ApiReminder } from "./api/api-reminder.model";
import { DurationUtil } from "../common/duration-util";

export class Reminder {
  private _uuid: string;
  private readonly _contactId: string;
  private readonly _reminderDate: LocalDate;
  private readonly _reminderInterval: Period;
  private readonly _lastTimeReminded: LocalDate;
  private readonly _reminderType: string;
  private readonly _reason: string;

  constructor(
    uuid: string,
    contactId: string,
    reminderType: string,
    reminderDate: LocalDate,
    reminderInterval: Period,
    lastTimeReminded: LocalDate,
    reason: string
  ) {
    this._uuid = uuid;
    this._contactId = contactId;
    this._reminderType = reminderType;
    this._reminderDate = reminderDate;
    this._lastTimeReminded = lastTimeReminded;
    this._reminderInterval = Period.ofDays(reminderInterval.days());
    this._reason = reason;
  }

  static fromApiReminder(apiReminder: ApiReminder): Reminder {
    return new Reminder(
      apiReminder.uuid,
      apiReminder.contactId,
      apiReminder.reminderType,
      LocalDate.parse(apiReminder.reminderDate),
      DurationUtil.parsePeriod(apiReminder.reminderInterval),
      LocalDate.parse(apiReminder.lastTimeReminded),
      apiReminder.reason
    );
  }

  get uuid(): string {
    return this._uuid;
  }

  set uuid(value: string) {
    this._uuid = value;
  }

  get reminderInterval(): Period {
    return this._reminderInterval;
  }

  get contactIntervalHumanReadable(): String {
    return DurationUtil.periodDisplayString(this._reminderInterval);
  }

  get lastTimeReminded(): LocalDate {
    return this._lastTimeReminded;
  }

  get contactId(): string {
    return this._contactId;
  }

  get reminderDate(): LocalDate {
    return this._reminderDate;
  }

  get reminderType(): string {
    return this._reminderType;
  }

  get reason(): string {
    return this._reason;
  }
}
