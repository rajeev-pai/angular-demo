import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  CreateContactData,
  UpdateContactData,
  ContactData,
} from '../../../../helpers/types';
import { AuthService } from '../../../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  createContact(data: CreateContactData) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });

    return this.http.post<ContactData>(
      '/api/contacts/create',
      data,
      { headers }
    );
  }

  updateContact(data: UpdateContactData) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });

    return this.http.patch<ContactData>(
      '/api/contacts/update',
      data,
      { headers }
    );
  }
}