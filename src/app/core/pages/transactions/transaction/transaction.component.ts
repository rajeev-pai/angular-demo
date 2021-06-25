import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import {
  Transaction,
  TransactionTypeCode,
  CrudPressEvents,
} from '../../../../helpers/types';

import { ContactsService } from '../../contacts/contacts.service';
import { TransactionsService } from '../transactions.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { DeleteConfirmationModalComponent } from '../../../../shared/UI/delete-confirmation-modal/delete-confirmation-modal.component';

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

  private deleteModalRef!: MatDialogRef<DeleteConfirmationModalComponent>;

  constructor(
    private contactsService: ContactsService,
    private matDialog: MatDialog,
    private transactionsService: TransactionsService,
  ) { }

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
    this.matDialog.open(TransactionFormComponent, {
      width: '500px',
      data: {
        mode: 'view',
        transaction: this.txn
      }
    });
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
    this.deleteModalRef = this.matDialog
      .open(DeleteConfirmationModalComponent, {
        data: {
          title: 'Are you sure you want to delete this transaction?',
          description: 'This action will permanently remove the transaction!',
          deleteFunc: this.deleteTransaction
        }
      });
  }

  private deleteTransaction = () => {
    this.transactionsService
      .deleteTransaction(this.txn.id)
      .subscribe(res => {
        if (res.success) {
          this.deleteModalRef.close();
          this.refreshList.emit();
        }
      });
  }
}
