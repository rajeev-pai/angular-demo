import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { TransactionFormService } from './transaction-form.service';
import { ContactsService } from '../../contacts/contacts.service';
import {
  TransactionFormField,
  TransactionFormOption,
} from '../../../../helpers/types';

@Component({
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {

  formModel: TransactionFormField[] = [];
  form!: FormGroup;

  private contactSubscription!: Subscription;

  // private contactOptions: TransactionFormOption[] = [];

  constructor(
    private fb: FormBuilder,
    private txnFormService: TransactionFormService,
    private contactsService: ContactsService,
  ) { }

  ngOnInit() {
    this.formModel = this.txnFormService.getTransactionFormModel();
    this.createForm();

    this.contactsService
      .contacts$
      .pipe(
        map(contacts => {
          const formattedContacts: TransactionFormOption[] = [];

          for (let contact of contacts) {
            formattedContacts.push({
              text: `${contact.firstName} ${contact.lastName}`,
              value: contact.id,
            });
          }

          return formattedContacts;
        }),
      )
      .subscribe(contactOptions => {
        const index = this.formModel.findIndex(model => {
          return model.fieldName === 'contactId';
        });

        if (index !== -1) {
          this.formModel[index].options = contactOptions;

          if (contactOptions.length > 0) {
            this.form.controls['contactId']
              .setValue(contactOptions[0].value);
          }
        }
      });
  }

  getFieldError() {

  }

  private createForm() {
    const formControls: { [key: string]: any; } = {};

    for (const field of this.formModel) {
      const formControl = [];

      switch (field.elementType) {
        case 'dateTimePicker':
          const currentDate = new Date().toISOString();
          formControl.push(currentDate);
          break;

        case 'select':
          if (field.options && (field.options.length > 0)) {
            formControl.push(field.options[0].value)
          }

          if (field.shouldFetchOptions) {
            if (field.fieldName === 'contactId') {
              this.contactsService.fetchContacts().subscribe();
            }
          }
          break;

        default:
          formControl.push('');
          break;
      }

      const synchronousValidators: ValidatorFn[] = [];

      if (field.isRequired) {
        synchronousValidators.push(Validators.required);
      }

      formControl.push(synchronousValidators);
      formControls[field.fieldName] = formControl;
    }

    this.form = this.fb.group(formControls);
  }
}
