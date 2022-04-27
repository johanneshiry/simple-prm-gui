import { ChronoUnit } from "@js-joda/core";
import { DurationUtil } from "../../../../../common/duration-util";

export abstract class ReminderDetailConstants {
  defaultReminderIntervalUnit = DurationUtil.supportedIntervalUnits.get(
    ChronoUnit.DAYS
  );

  reminderIntervalUnits: string[] = [
    ...DurationUtil.supportedIntervalUnits.values(),
  ];
}
