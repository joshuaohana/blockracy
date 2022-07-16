import { Notify } from 'quasar';
import { DateTime } from 'luxon';

export default class Utils {
  static notify(text: string) {
    Notify.create({
      message: text,
    });
  }

  static success(text: string) {
    Notify.create({
      message: text,
      icon: 'check_circle',
      classes: 'app-q-notify',
    });
  }

  static error(text: string, err?: unknown) {
    let message = text;
    if (err && (err as { message?: string }).message) {
      message += (': ' + (err as { message?: string }).message) as string;
    } else if (err && typeof err === 'string' && err.length > 0) {
      message += ': ' + err;
    }
    Notify.create({
      message: message,
      icon: 'error',
      classes: 'app-q-notify-error',
    });
  }

  static displayDateFromSeconds(timeInSeconds: number): string {
    return DateTime.fromSeconds(timeInSeconds).toLocaleString(
      DateTime.DATETIME_MED
    );
  }

  static dateInSecondsFromString(date: string): number {
    return Math.floor(new Date(date).getTime() / 1000);
  }
}
