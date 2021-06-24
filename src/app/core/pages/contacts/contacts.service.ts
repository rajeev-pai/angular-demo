import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import {
  GET_CONTACTS,
  GET_CONTACT,
  DELETE_CONTACT,
} from '../../../helpers/apis';

import {
  ContactData,
  FetchContactsResponse,
  TransactionFormOption,
} from '../../../helpers/types';

import { AuthService } from '../../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private subject = new BehaviorSubject<ContactData[]>([]);
  private contactIdsBeingFetched: number[] = [];

  contacts$ = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {

    // Listen to logout event.
    this.authService.logout$
      .subscribe(_ => {
        this.subject.next([]);
      });
  }

  fetchContacts() {
    return this.http
      .get<FetchContactsResponse>(GET_CONTACTS)
      .pipe(
        tap(res => {
          this.updateContactsInStore(res.contacts);
        }),
      );
  }

  fetchContactById(id: number) {
    return this.http
      .get<ContactData>(`${GET_CONTACT}/${id}`)
      .pipe(
        tap(contact => {
          this.updateContactInStore(contact);
        }),
      );
  }

  getContactById(id: number): ContactData | undefined {
    const contact = this.subject.getValue().find(c => c.id === id);

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
            this.removeContactFromStore(id);
          }
        }),
      );
  }

  getContactOptions() {
    return this.contacts$
      .pipe(
        map(contacts => {
          const formattedContacts: TransactionFormOption[] = [];

          for (let contact of contacts) {
            formattedContacts.push({
              text: `${contact.firstName} ${contact.lastName}`,
              value: contact.id,
            });
          }

          return formattedContacts;
        }),
      );
  }

  private updateContactsInStore(contacts: ContactData[]) {
    const copyOfContacts = [...this.subject.getValue()];

    for (let contact of contacts) {
      const index = copyOfContacts.findIndex(c => {
        return c.id === contact.id;
      });

      // Update the contact in the list.
      if (index === -1) {
        copyOfContacts.push(contact);
      } else {
        copyOfContacts[index] = {
          ...copyOfContacts[index],
          ...contact,
        };
      }
    }

    this.subject.next(copyOfContacts);
  }

  private updateContactInStore(contact: ContactData) {
    const copyOfContacts = [...this.subject.getValue()];
    const indexOfContact = copyOfContacts.findIndex(c => c.id === contact.id);

    // Update the contact in the list.
    if (indexOfContact === -1) {
      copyOfContacts.push(contact);
    } else {
      copyOfContacts[indexOfContact] = {
        ...copyOfContacts[indexOfContact],
        ...contact,
      };
    }

    const indexOfIdBeingFetched = this.contactIdsBeingFetched
      .indexOf(contact.id);

    if (indexOfIdBeingFetched !== -1) {
      this.contactIdsBeingFetched.splice(indexOfIdBeingFetched, 1);
    }

    this.subject.next(copyOfContacts);
  }

  private removeContactFromStore(id: number) {
    const contacts = this.subject.getValue();
    const index = contacts.findIndex(c => c.id === id);

    if (index !== -1) {
      const copyOfContacts = [...contacts];
      copyOfContacts.splice(index, 1);

      this.subject.next(copyOfContacts);
    }
  }
}