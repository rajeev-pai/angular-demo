import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GET_CONTACTS } from '../../../utils/apis';
import { AuthService } from '../../../auth/auth.service';

export interface ContactData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  accountId: number;
  createdAt: number;
  updatedAt: number;
  youOwe: number;
  owesYou: number;
}

export interface ContactsData {
  contacts: ContactData[];
}

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

    return this.http.get(GET_CONTACTS, { headers }) as Observable<ContactsData>;
  }
}