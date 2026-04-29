import { fill, join } from "lodash";

export const SECOND = 1000;
export const MINUTE = 60;
export const HOUR = 60;
export const DAY = 24;
export const MS_MINUTE = SECOND * MINUTE;
export const MS_HOUR = MS_MINUTE * HOUR;
export const MS_DAY = MS_HOUR * DAY;
const FLOAT_FIX = 0.000001;
const MS_FORM_LENGTH = 3;

const timeWithZeros = (val: number, zeroCount = 2): string => {
  const strVal = val.toString();
  return join([...fill<string>(new Array(zeroCount - strVal.length), "0"), strVal], "");
};

export class TimeSpan {
  public stamp = 0;

  constructor(date1: Date | number, date2: Date | number = 0) {
    const ms1: number = date1 instanceof Date ? date1.getTime() : date1;
    const ms2: number = date2 instanceof Date ? date2.getTime() : date2;
    this.stamp = ms1 - ms2;
  }

  public get totalDays(): number {
    return Math.round(this.stamp / MS_DAY + FLOAT_FIX);
  }

  public get totalHours(): number {
    return Math.round(this.stamp / MS_HOUR + FLOAT_FIX);
  }

  public get totalMinutes(): number {
    return Math.round(this.stamp / MS_MINUTE + FLOAT_FIX);
  }

  public get totalSeconds(): number {
    return Math.round(this.stamp / SECOND + FLOAT_FIX);
  }

  public get totalMilliseconds(): number {
    return this.stamp;
  }

  public get milliseconds(): number {
    return this.stamp % SECOND;
  }

  public get seconds(): number {
    return Math.round((this.stamp - this.milliseconds) / SECOND + FLOAT_FIX) % MINUTE;
  }

  public get minutes(): number {
    return Math.round((this.stamp - this.seconds * SECOND) / MS_MINUTE + FLOAT_FIX) % HOUR;
  }

  public get hours(): number {
    return Math.round((this.stamp - this.minutes * MS_MINUTE) / MS_HOUR + FLOAT_FIX) % DAY;
  }

  public get days(): number {
    return Math.round((this.stamp - this.hours * MS_HOUR) / MS_DAY + FLOAT_FIX);
  }

  public toTimestamp(): number {
    return this.stamp;
  }

  public toDate(): Date {
    return new Date(this.stamp);
  }

  public addMilliseconds(ms: number): TimeSpan {
    this.stamp += ms;
    return this;
  }

  public addSeconds(sec: number): TimeSpan {
    this.stamp += sec * SECOND;
    return this;
  }

  public addMinutes(min: number): TimeSpan {
    this.stamp += min * MINUTE * SECOND;
    return this;
  }

  public addHours(hours: number): TimeSpan {
    this.stamp += hours * HOUR * MINUTE * SECOND;
    return this;
  }

  public addDays(days: number): TimeSpan {
    this.stamp += days * DAY * HOUR * MINUTE * SECOND;
    return this;
  }

  public substractMilliseconds(ms: number): TimeSpan {
    return this.addMilliseconds(-ms);
  }

  public substractSeconds(sec: number): TimeSpan {
    return this.addSeconds(-sec);
  }

  public substractMinutes(min: number): TimeSpan {
    return this.addMinutes(-min);
  }

  public substractHours(hours: number): TimeSpan {
    return this.addHours(-hours);
  }

  public substractDays(days: number): TimeSpan {
    return this.addDays(-days);
  }

  public toString(): string {
    return (
      (this.days > 0 ? this.days.toString() + " days " : "") +
      `${timeWithZeros(this.hours)}:${timeWithZeros(this.minutes)}:${timeWithZeros(this.seconds)}` +
      `.${timeWithZeros(this.milliseconds, MS_FORM_LENGTH)}`
    );
  }

  public static fromSeconds(seconds: number): TimeSpan {
    return new TimeSpan(seconds * SECOND);
  }

  public static fromMinutes(minutes: number): TimeSpan {
    return new TimeSpan(minutes * MS_MINUTE);
  }

  public static fromHours(hours: number): TimeSpan {
    return new TimeSpan(hours * MS_HOUR);
  }

  public static fromDays(days: number): TimeSpan {
    return new TimeSpan(days * MS_DAY);
  }
}
