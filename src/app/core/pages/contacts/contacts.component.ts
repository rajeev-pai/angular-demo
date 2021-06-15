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

  constructor(
    private contactsService: ContactsService,
  ) { }

  ngOnInit() {
    this.contactsService
      .fetchContacts()
      .subscribe(res => {
        this.contacts = res.contacts;
      });
  }

  favouriteChanged(e: boolean) {
    console.log('New favourite value: ', e);
  }
}