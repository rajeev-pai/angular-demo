import { Component, OnInit } from '@angular/core';

import { TransactionsService } from './transactions.service';
import { Transaction } from '../../../helpers/types';

@Component({
  selector: 'mm-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(
    private transactionService: TransactionsService,
  ) { }

  ngOnInit() {
    this.fetchTransactions();
  }

  fetchTransactions() {
    this.transactionService
      .fetchTransactionsOfAccount()
      .subscribe(res => {
        this.transactions = res.transactions;
      })
  }

  refreshList() {

  }
}
