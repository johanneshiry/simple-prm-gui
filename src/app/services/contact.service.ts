import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiContact} from "../models/api-contact.model";

const baseUrl = 'http://localhost:8888/api/rest/v1/contact/get/page?limit=5'; // todo configurable

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<ApiContact[]> {
    return this.http.get<ApiContact[]>(baseUrl);
  }
}
