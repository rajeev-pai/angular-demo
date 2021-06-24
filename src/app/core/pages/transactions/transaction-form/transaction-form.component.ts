import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

import { Subscription } from 'rxjs';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TransactionFormService } from './transaction-form.service';
import { ContactsService } from '../../contacts/contacts.service';
import {
  TransactionFormField,
  CreateOrUpdateTransactionData,
  Transaction,
} from '../../../../helpers/types';

interface ModalData {
  mode: 'create' | 'edit' | 'view';
  transaction?: Transaction,
  afterCreate?: () => void;
}

@Component({
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit, OnDestroy {

  formModel: TransactionFormField[] = [];
  form!: FormGroup;
  title = 'New Transaction';
  submitButtonText = 'Save';

  private contactSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private txnFormService: TransactionFormService,
    private contactsService: ContactsService,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private dialogRef: MatDialogRef<TransactionFormComponent>,
  ) { }

  ngOnInit() {
    this.formModel = this.txnFormService.getTransactionFormModel();
    this.createForm();

    this.contactSubscription = this.contactsService
      .getContactOptions()
      .subscribe(contactOptions => {
        const index = this.formModel.findIndex(model => {
          return model.fieldName === 'contactId';
        });

        if (index !== -1) {
          this.formModel[index].options = contactOptions;

          if (contactOptions.length > 0) {
            const control = this.getControl('contactId');

            if (!control.value) {
              control.setValue(contactOptions[0].value);
            }
          }
        }
      });
  }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe();
  }

  getControl(controlName: string): AbstractControl {
    return this.form.controls[controlName];
  }

  hasError(controlName: string) {
    const control = this.getControl(controlName);
    return control.invalid && control.touched;
  }

  getFieldError(controlName: string) {
    const control = this.getControl(controlName);

    if (control.hasError('required')) {
      return 'This field is required';
    }

    return null;
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const {
      amount,
      contactId,
      dateTime,
      description,
      note,
      type
    } = this.form.value;

    const submitData: CreateOrUpdateTransactionData = {
      contactId,
      type,
      amount: +amount,
      note,
      description,
      dateTime: new Date(dateTime).getTime()
    };

    switch (this.data.mode) {
      case 'create':
        this.txnFormService
          .createNewTransaction(submitData)
          .subscribe(_ => {
            if (this.data.afterCreate) {
              this.data.afterCreate();
            }

            this.dialogRef.close();
          });
        break;

      case 'edit':
        this.txnFormService
          .updateTransaction(this.data.transaction!.id, submitData)
          .subscribe(_ => {
            if (this.data.afterCreate) {
              this.data.afterCreate();
            }

            this.dialogRef.close();
          });
        break;
    }
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
            // Make the first option the default choice.
            formControl.push(field.options[0].value)
          } else {
            formControl.push(null);
          }

          if (field.shouldFetchOptions) {
            if (field.fieldName === 'contactId') {
              // Trigger fetching of contacts list.
              this.contactsService.fetchContacts().subscribe();
            }
          }
          break;

        default:
          formControl.push('');
          break;
      }

      if (
        (this.data.mode === 'edit')
        && this.data.transaction
      ) {
        this.title = 'Edit transaction';
        this.submitButtonText = 'Update';
        const fieldData = this.data.transaction[field.fieldName];

        if (field.elementType === 'dateTimePicker') {
          formControl[0] = new Date(fieldData).toISOString();
        } else {
          formControl[0] = fieldData;
        }
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
