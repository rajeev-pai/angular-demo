import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { TransactionsService } from './transactions.service';
import { Transaction } from '../../../helpers/types';
import { AuthService } from '../../../auth/auth.service';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

@Component({
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  username = '';
  email = '';
  youOwe = 0;
  owesYou = 0;

  private subscription!: Subscription;

  constructor(
    private transactionService: TransactionsService,
    private authService: AuthService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.subscription = this.authService.user$
      .subscribe(user => {
        if (user) {
          this.username = user.username;
          this.email = user.email;
        }
      });

    this.fetchTransactions();
    this.fetchTransactionSummary();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  fetchTransactions() {
    this.transactionService
      .fetchTransactionsOfAccount()
      .subscribe(res => {
        this.transactions = res.transactions;
      });
  }

  fetchTransactionSummary() {
    this.transactionService
      .fetchAccountTransactionSummary()
      .subscribe(res => {
        this.youOwe = res.youOwe;
        this.owesYou = res.owesYou;
      }); 
  }

  onAddTransaction() {
    this.matDialog.open(TransactionFormComponent, {
      width: '500px',
      data: {
        mode: 'create',
        afterCreate: this.refreshList
      }
    });
  }

  refreshList = () => {
    this.fetchTransactions();
    this.fetchTransactionSummary();
  }
}
