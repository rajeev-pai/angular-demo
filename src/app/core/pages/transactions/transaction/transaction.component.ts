import { Component, Input } from '@angular/core';

import { Transaction } from '../../../../helpers/types';

@Component({
  selector: 'mm-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent { 

  @Input('transaction') txn!: Transaction;
}
