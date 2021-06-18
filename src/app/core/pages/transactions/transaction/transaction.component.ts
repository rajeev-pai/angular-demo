import { Component, Input } from '@angular/core';

import { Transaction, TransactionTypeCode } from '../../../../helpers/types';

@Component({
  selector: 'mm-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {

  @Input('transaction') txn!: Transaction;

  get containerStyleClass() {
    return (
      (this.txn.type === TransactionTypeCode.OWES_YOU)
        ? 'owes_you'
        : 'is_owed'
    );
  }

  get transactionType() {
    return (
      (this.txn.type === TransactionTypeCode.OWES_YOU)
        ? 'Owes You'
        : 'Is Owed'
    );
  }

  get note() {
    return this.txn.note ? this.txn.note : 'No note provided!';
  }

  get description() {
    return (
      this.txn.description
        ? this.txn.description
        : 'No description provided!'
    );
  }
}
