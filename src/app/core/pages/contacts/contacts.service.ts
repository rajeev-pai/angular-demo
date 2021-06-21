import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  GET_CONTACTS,
  GET_CONTACT,
  DELETE_CONTACT,
} from '../../../helpers/apis';

import { 
  ContactData, 
  FetchContactsResponse,
} from '../../../helpers/types';



@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private contacts: ContactData[] = [];
  private contactIdsBeingFetched: number[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  fetchContacts() {
    return this.http
      .get<FetchContactsResponse>(GET_CONTACTS)
      .pipe(
        tap(res => {
          for (const contact of res.contacts) {
            this.updateContactList(contact);
          }
        }),
      );
  }

  fetchContactById(id: number) {
    return this.http
      .get<ContactData>(`${GET_CONTACT}/${id}`)
      .pipe(
        tap(contact => {
          this.updateContactList(contact);
        }),
      );
  }

  getContactById(id: number): ContactData | undefined {
    const contact = this.contacts.find(c => c.id === id);

    if (!contact) {
      if (this.contactIdsBeingFetched.indexOf(id) === -1) {
        this.contactIdsBeingFetched.push(id);
        this.fetchContactById(id).subscribe();
      }
    }

    return contact;
  }

  deleteContact(id: number) {
    return this.http.delete<{ success: boolean }>(`${DELETE_CONTACT}/${id}`);
  }

  private updateContactList(contact: ContactData) {
    const index = this.contactIdsBeingFetched.indexOf(contact.id);
    this.contacts.push(contact);

    if (index !== -1) {
      this.contactIdsBeingFetched.splice(index, 1);
    }
  }
}