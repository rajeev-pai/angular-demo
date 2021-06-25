import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { ContactsService } from '../contacts.service';
import { TransactionsService } from '../../transactions/transactions.service';
import { ContactData, Transaction } from '../../../../helpers/types';
import { TransactionFormComponent } from '../../transactions/transaction-form/transaction-form.component';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss']
})
export class ContactViewComponent implements OnInit {
  contact!: ContactData;
  transactions: Transaction[] = [];
  youOwe = 0;
  owesYou = 0;

  private contactId!: number;

  constructor(
    private contactsService: ContactsService,
    private activatedRoute: ActivatedRoute,
    private transactionService: TransactionsService,
    private matDialog: MatDialog,
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

  onAddTransaction() {
    this.matDialog.open(TransactionFormComponent, {
      width: '500px',
      data: {
        mode: 'create',
        contactId: this.contactId,
        afterCreate: this.refreshList
      }
    });
  }

  refreshList = () => {
    this.fetchTransactions();
    this.fetchTransactionSummary();
  }

  private fetchContact() {
    this.contactsService
      .fetchContactById(this.contactId)
      .subscribe(contact => {
        this.contact = contact;
        this.youOwe = contact.youOwe;
        this.owesYou = contact.owesYou;
      });
  }

  private fetchTransactions() {
    this.transactionService
      .fetchTransactionsOfContact(this.contactId)
      .subscribe(res => {
        this.transactions = res.transactions;
      });
  }

  private fetchTransactionSummary() {
    this.transactionService
      .fetchContactTransactionSummary(this.contactId)
      .subscribe(res => {
        this.youOwe = res.youOwe;
        this.owesYou = res.owesYou;
      });
  }
}
