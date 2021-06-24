import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import {
  Transaction,
  TransactionTypeCode,
  CrudPressEvents,
} from '../../../../helpers/types';

import { ContactsService } from '../../contacts/contacts.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'mm-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  @Input('transaction') txn!: Transaction;
  @Input('isLast') isLast!: boolean;
  @Input('hideContactName') hideName!: boolean;

  @Output('refresh') refreshList = new EventEmitter();

  constructor(
    private contactsService: ContactsService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit() {

  }

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

  getContactName() {
    const contact = this.contactsService.getContactById(this.txn.contactId);
    return contact ? `${contact.firstName} ${contact.lastName}` : 'Loading...';
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
    this.matDialog.open(TransactionFormComponent, {
      width: '500px',
      data: {
        mode: 'edit',
        transaction: this.txn,
        afterCreate: () => {
          this.refreshList.emit();
        }
      }
    });
  }

  askDeleteConfirmation() {

  }
}
