import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GET_CONTACTS, GET_CONTACT } from '../../../helpers/apis';
import { ContactData, FetchContactsResponse } from '../../../helpers/types';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private http: HttpClient,
  ) { }

  fetchContacts() {
    return this.http
      .get(GET_CONTACTS) as Observable<FetchContactsResponse>;
  }

  fetchContactById(id: number) {
    return this.http.get<ContactData>(`${GET_CONTACT}/${id}`);
  }
}