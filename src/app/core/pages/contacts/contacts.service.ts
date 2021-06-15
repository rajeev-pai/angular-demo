import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GET_CONTACTS } from '../../../helpers/apis';
import { ContactData, FetchContactsResponse } from '../../../helpers/types';
import { AuthService } from '../../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  fetchContacts() {
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return this.http
      .get(GET_CONTACTS, { headers }) as Observable<FetchContactsResponse>;
  }

  fetchContactById(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });

    return this.http.get<ContactData>(`/api/contacts/${id}`, { headers });
  }
}