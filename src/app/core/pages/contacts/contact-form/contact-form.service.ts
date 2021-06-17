import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { 
  CREATE_CONTACT, 
  UPDATE_CONTACT,
} from '../../../../helpers/apis';

import {
  CreateContactData,
  UpdateContactData,
  ContactData,
} from '../../../../helpers/types';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  constructor(
    private http: HttpClient,
  ) { }

  createContact(data: CreateContactData) {
    return this.http.post<ContactData>(CREATE_CONTACT, data);
  }

  updateContact(data: UpdateContactData) {
    return this.http.patch<ContactData>(UPDATE_CONTACT, data);
  }
}