import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiContact } from "../../models/api/api-contact.model";
import { GlobalConstants } from "../../common/global-constants";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  constructor(private http: HttpClient) {}

  get(limit: number, offset: number): Observable<ApiContact[]> {
    return this.http.get<ApiContact[]>(
      GlobalConstants.apiContactsUrl +
        `/get/page?limit=${limit}&offset=${offset}`
    );
  }
}
