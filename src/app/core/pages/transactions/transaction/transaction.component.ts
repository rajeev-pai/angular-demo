import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

import {
  Transaction,
  TransactionTypeCode,
  CrudPressEvents,
  ContactData,
} from '../../../../helpers/types';

import { ContactsService } from '../../contacts/contacts.service';

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

  private fetchContactHttp$!: Observable<ContactData>;

  constructor(
    private contactsService: ContactsService,
  ) { }

  ngOnInit() {
    this.fetchContactHttp$ = (
      this.contactsService
        .fetchContactById(this.txn.contactId)
        .pipe(
          shareReplay(),
        )
    );
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
    return this.fetchContactHttp$
      .pipe(
        map(res => `${res.firstName} ${res.lastName}`)
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
