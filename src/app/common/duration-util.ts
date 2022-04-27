import { ChronoUnit, Period } from "@js-joda/core";
import { TinyDuration } from "./tinyduration";

export class DurationUtil {
  public static supportedIntervalUnits = new Map([
    [ChronoUnit.DAYS, "Day(s)"],
    [ChronoUnit.MONTHS, "Month(s)"],
    [ChronoUnit.YEARS, "Year(s)"],
  ]);

  public static supportedIntervalUnitsInv = new Map(
    [...DurationUtil.supportedIntervalUnits.keys()].map((e, i) => {
      return [[...DurationUtil.supportedIntervalUnits.values()][i], e];
    })
  );

  public static toInputFormRepresentation(period: Period) {
    // all information are expected as days
    let days = period.days();
    if (days <= 30) {
      return {
        value: days.toFixed(0),
        unit: DurationUtil.supportedIntervalUnits.get(ChronoUnit.DAYS),
      };
    } else if (days <= 365) {
      let months = period.days() / 30;
      return {
        value: months.toFixed(0),
        unit: DurationUtil.supportedIntervalUnits.get(ChronoUnit.MONTHS),
      };
    } else {
      let years = period.days() / 365;
      return {
        value: years.toFixed(0),
        unit: DurationUtil.supportedIntervalUnits.get(ChronoUnit.YEARS),
      };
    }
  }

  public static periodDisplayString(period: Period) {
    // all information are expected as days
    let days = period.days();
    if (days <= 30) {
      return `${days} ${this.supportedIntervalUnits.get(ChronoUnit.DAYS)}`;
    } else if (days <= 365) {
      let months = period.days() / 30;
      return `${months.toFixed(0)} ${this.supportedIntervalUnits.get(
        ChronoUnit.MONTHS
      )}`;
    } else {
      let years = period.days() / 365;
      return `${years.toFixed(0)} ${this.supportedIntervalUnits.get(
        ChronoUnit.YEARS
      )}`;
    }
  }

  public static fromStrings(durationVal: string, durationUnit: string) {
    let unit = DurationUtil.supportedIntervalUnitsInv.get(durationUnit);
    if (unit == ChronoUnit.DAYS) {
      return Period.ofDays(Number(durationVal));
    } else if (unit == ChronoUnit.MONTHS) {
      return Period.ofDays(Number(durationVal) * 30);
    } else if (unit == ChronoUnit.YEARS) {
      return Period.ofDays(Number(durationVal) * 365);
    }
    return undefined;
  }

  public static parsePeriod(iso8601Str: string) {
    let duration = TinyDuration.parse(iso8601Str);

    let days = 0;
    if (duration.hours) {
      days = duration.hours / 24;
    }
    if (duration.days) {
      days = days + duration.days;
    }
    if (duration.months) {
      days = days + duration.months * 30;
    }
    if (duration.years) {
      days = days + 365 * duration.years;
    }

    return Period.ofDays(days);
  }
}
