import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContactsService } from '../contacts.service';
import { TransactionsService } from '../../transactions/transactions.service';
import { ContactData, Transaction } from '../../../../helpers/types';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss']
})
export class ContactViewComponent implements OnInit {

  contact!: ContactData;
  transactions: Transaction[] = [];

  private contactId!: number;

  constructor(
    private contactsService: ContactsService,
    private activatedRoute: ActivatedRoute,
    private transactionService: TransactionsService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(param => {
        this.contactId = +param['id'];
        this.fetchContact();
        this.fetchTransactions();
      });
  }

  get fullName() {
    return `${this.contact.firstName} ${this.contact.lastName}`;
  }

  private fetchContact() {
    this.contactsService
      .fetchContactById(this.contactId)
      .subscribe(contact => {
        this.contact = contact;
      });
  }

  fetchTransactions() {
    this.transactionService
      .fetchTransactionsOfContact(this.contactId)
      .subscribe(res => {
        this.transactions = res.transactions;
      });
  }

  onAddTransaction() {
    
  }

  refreshList() {
    
  }
}
