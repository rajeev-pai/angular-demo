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
import { NotifierService } from 'angular-notifier';

import { TransactionFormService } from './transaction-form.service';
import { ContactsService } from '../../contacts/contacts.service';
import { FormCanDeactivate } from '../../../../utils/guards/form-alert/form-can-deactivate';
import {
  TransactionFormField,
  CreateOrUpdateTransactionData,
  Transaction,
} from '../../../../helpers/types';

interface ModalData {
  mode: 'create' | 'edit' | 'view';
  transaction?: Transaction;
  contactId?: number;
  afterCreate?: () => void;
}

@Component({
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent extends FormCanDeactivate implements OnInit, OnDestroy {
  formModel: TransactionFormField[] = [];
  form!: FormGroup;
  title = 'New Transaction';
  submitButtonText = 'Save';
  disableButton = false;

  private contactSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private txnFormService: TransactionFormService,
    private contactsService: ContactsService,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private dialogRef: MatDialogRef<TransactionFormComponent>,
    private notifierService: NotifierService,
  ) {
    super();
  }

  get formRef() {
    return this.form;
  }

  ngOnInit() {
    this.dialogRef.disableClose = true;
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

  // shouldDisableField(controlName: string): boolean {
  //   if (this.data.mode === 'view') {
  //     return true;
  //   }

  //   if ((controlName === 'contactId') && this.data.contactId) {
  //     return true;
  //   }

  //   return false;
  // }

  onClose() {
    if (this.canDeactivate()) {
      this.dialogRef.close();
      return;
    }

    if (confirm('You have unsaved changes! Are you sure you want to close this modal?')) {
      this.dialogRef.close();
    }
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

    console.log(this.form.value);

    const submitData: CreateOrUpdateTransactionData = {
      contactId: contactId ? contactId : this.data.contactId,
      type,
      amount: +amount,
      note,
      description,
      dateTime: new Date(dateTime).getTime()
    };

    switch (this.data.mode) {
      case 'create':
        this.disableButton = true;

        this.txnFormService
          .createNewTransaction(submitData)
          .subscribe(_ => {
            this.disableButton = false;
            this.notifierService.notify(
              'success',
              'New transaction created successfully!'
            );

            if (this.data.afterCreate) {
              this.data.afterCreate();
            }

            this.dialogRef.close();
          });
        break;

      case 'edit':
        this.disableButton = true;

        this.txnFormService
          .updateTransaction(this.data.transaction!.id, submitData)
          .subscribe(_ => {
            this.disableButton = false;

            this.notifierService.notify(
              'success',
              'Transaction updated successfully!'
            );

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
      // const formControl = [];
      ['', [], []]
      let initialValue: any = '';

      switch (field.elementType) {
        case 'dateTimePicker':
          // const currentDate = new Date().toISOString();
          // formControl.push(currentDate);
          initialValue = new Date().toISOString();
          break;

        case 'select':
          initialValue = null;

          if (field.options && (field.options.length > 0)) {
            // Make the first option the default choice.
            initialValue = field.options[0].value;
          }

          if ((field.fieldName === 'contactId') && this.data.contactId) {
            initialValue = this.data.contactId;
          }

          // formControl.push(initialValue);

          if (field.shouldFetchOptions) {
            if (field.fieldName === 'contactId') {
              // Trigger fetching of contacts list.
              this.contactsService.fetchContacts().subscribe();
            }
          }
          break;

        default:
          // formControl.push('');
          initialValue = '';
          break;
      }

      if (this.data.transaction) {
        switch (this.data.mode) {
          case 'edit':
            this.title = 'Edit transaction';
            this.submitButtonText = 'Update';
            break;

          case 'view':
            this.title = 'View transaction';
            break;
        }

        const fieldData = this.data.transaction[field.fieldName];

        if (field.elementType === 'dateTimePicker') {
          // formControl[0] = new Date(fieldData).toISOString();
          initialValue = new Date(fieldData).toISOString();
        } else {
          // formControl[0] = fieldData;
          initialValue = fieldData;
        }
      }

      const synchronousValidators: ValidatorFn[] = [];

      if (field.isRequired) {
        synchronousValidators.push(Validators.required);
      }

      let isDisabled = false;

      if (this.data.mode === 'view') {
        isDisabled = true;
      }

      if ((field.fieldName === 'contactId') && this.data.contactId) {
        isDisabled = true;
      }

      // formControl.push(synchronousValidators);
      formControls[field.fieldName] = [
        {
          value: initialValue,
          disabled: isDisabled
        },
        synchronousValidators
      ];
      // formControls[field.fieldName] = this.fb.control(
      //   {
      //     value: initialValue,
      //     disabled: isDisabled
      //   },
      //   synchronousValidators
      // );
    }

    this.form = this.fb.group(formControls);
  }
}
