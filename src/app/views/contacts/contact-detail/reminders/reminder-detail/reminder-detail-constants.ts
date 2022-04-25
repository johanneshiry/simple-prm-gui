import { ChronoUnit } from "@js-joda/core";

export abstract class ReminderDetailConstants {
  // supported reminder intervals "enum"
  private _reminderIntervalUnits = new Map([
    [ChronoUnit.DAYS, "Day(s)"],
    [ChronoUnit.WEEKS, "Week(s)"],
    [ChronoUnit.MONTHS, "Month(s)"],
    [ChronoUnit.YEARS, "Year(s)"],
  ]);

  defaultReminderIntervalUnit = this._reminderIntervalUnits.get(
    ChronoUnit.DAYS
  );

  reminderIntervalUnits: string[] = [
    ...this._reminderIntervalUnits.values(),
  ].filter((intervalUnit) => intervalUnit != this.defaultReminderIntervalUnit);
}
