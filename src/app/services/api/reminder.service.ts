import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalConstants } from "../../common/global-constants";
import { Observable } from "rxjs";
import { ApiReminder } from "../../models/api/reminder.model";
import { Reminder } from "../../models/reminder.model";

@Injectable({
  providedIn: "root",
})
export class ReminderService {
  constructor(private http: HttpClient) {}

  create(stayInTouch: Reminder) {
    return this.http.post<Reminder>(
      GlobalConstants.apiReminderUrl + "/",
      stayInTouch
    );
  }

  get(contactUid: string): Observable<ApiReminder[]> {
    return this.http.get<ApiReminder[]>(
      GlobalConstants.apiReminderUrl + `/${contactUid}`
    );
  }
}
