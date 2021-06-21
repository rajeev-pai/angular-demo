import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http
      .delete<{ success: boolean }>(`${DELETE_CONTACT}/${id}`)
      .pipe(
        tap(res => {
          if (res.success) {
            this.removeContactFromList(id);
          }
        }),
      );
  }

  private updateContactList(contact: ContactData) {
    const indexOfContact = this.contacts.findIndex(c => c.id === contact.id);

    // Update the contact in the list.
    if (indexOfContact === -1) {
      this.contacts.push(contact);
    } else {
      this.contacts[indexOfContact] = contact;
    }

    const indexOfIdBeingFetched = this.contactIdsBeingFetched
      .indexOf(contact.id);

    if (indexOfIdBeingFetched !== -1) {
      this.contactIdsBeingFetched.splice(indexOfIdBeingFetched, 1);
    }
  }

  private removeContactFromList(id: number) {
    const index = this.contacts.findIndex(c => c.id === id);

    if (index !== -1) {
      this.contacts.splice(index, 1);
    }
  }
}