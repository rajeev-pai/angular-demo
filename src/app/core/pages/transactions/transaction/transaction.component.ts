import { 
  Component, 
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  Transaction,
  TransactionTypeCode,
  CrudPressEvents,
} from '../../../../helpers/types';

@Component({
  selector: 'mm-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {

  @Input('transaction') txn!: Transaction;
  @Input('isLast') isLast!: boolean;
  @Input('hideContactName') hideName!: boolean;

  @Output('refresh') refreshList = new EventEmitter();

  get owesYou(): boolean {
    return this.txn.type === TransactionTypeCode.OWES_YOU;
  }

  get isOwed(): boolean {
    return this.txn.type === TransactionTypeCode.YOU_OWE;
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

  onButtonAction(type: CrudPressEvents) {
    switch (type) {
      case 'view':
        this.viewTransaction();
        break;

      case 'edit':
        this.prepareToEditTransaction();
        break;

      case 'delete':
        this.askDeleteConfirmation();
        break;
    }
  }

  viewTransaction() {

  }

  prepareToEditTransaction() {

  }

  askDeleteConfirmation() {

  }
}
