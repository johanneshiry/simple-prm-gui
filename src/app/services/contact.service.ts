import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Contact} from "../models/contact.model";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:8888/api/rest/v1/contact/get/page?limit=5'; // todo configurable

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(baseUrl);
  }
}
