import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { GlobalConstants } from "../../common/global-constants";
import { catchError, Observable, Observer, of, throwError } from "rxjs";
import { ApiReminder } from "../../models/api/api-reminder.model";
import { Reminder } from "../../models/reminder.model";

@Injectable({
  providedIn: "root",
})
export class ReminderApiService {
  private _subscribers: Partial<Observer<ApiReminder[]>>[] = [];

  constructor(private http: HttpClient) {}

  create(stayInTouch: Reminder) {
    return this.http.post<Reminder>(
      GlobalConstants.apiReminderUrl + "/",
      stayInTouch
    );
  }

  get(contactUid: string): Observable<ApiReminder[]> {
    let result = this.http.get<ApiReminder[]>(
      GlobalConstants.apiReminderUrl + `/${contactUid}`
    );

    this._notifySubscribers(result);
    return result;
  }

  delete(reminderUid: string): Observable<ApiReminder[]> {
    return this.http.delete<ApiReminder[]>(
      GlobalConstants.apiReminderUrl + `/${reminderUid}`
    );
  }

  subscribe(observer: Partial<Observer<ApiReminder[]>>) {
    this._subscribers.push(observer);
  }

  private _notifySubscribers(observable: Observable<ApiReminder[]>) {
    observable.subscribe({
      next: (apiReminders) =>
        this._subscribers.forEach((observer) => observer.next?.(apiReminders)),
      error: (err) =>
        this._subscribers.forEach((observer) => observer.error?.(err)),
    });
  }
}
