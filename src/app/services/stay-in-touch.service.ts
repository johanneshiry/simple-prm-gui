import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalConstants } from "../common/global-constants";
import { StayInTouch } from "../models/stay-in-touch.model";

@Injectable({
  providedIn: "root",
})
export class StayInTouchService {
  constructor(private http: HttpClient) {}

  create(stayInTouch: StayInTouch) {
    return this.http.post<StayInTouch>(
      GlobalConstants.apiStayInTouchUrl + "/create",
      stayInTouch
    );
  }
}
