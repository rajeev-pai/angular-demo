import { Component, OnInit } from '@angular/core';

import { ContactsService } from './contacts.service';
import { ContactData } from '../../../helpers/types';

@Component({
  selector: 'mm-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: ContactData[] = [];
  isLoading = false;

  constructor(
    private contactsService: ContactsService,
  ) { }

  ngOnInit() {
    this.fetchContacts();
  }

  favouriteChanged(e: boolean) {
    console.log('New favourite value: ', e);
  }

  fetchContacts() {
    this.isLoading = true;

    this.contactsService
      .fetchContacts()
      .subscribe(res => {
        this.isLoading = false;
        this.contacts = res.contacts;
      });
  }
}