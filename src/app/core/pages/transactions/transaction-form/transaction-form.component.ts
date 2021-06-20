import { Component } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn } from '@angular/forms';

import { TransactionTypeCode } from '../../../../helpers/types';

interface TxnFormField {
  fieldName: string;
  elementType: 'select' | 'input' | 'textarea' | 'dateTimePicker',
  options?: Array<{ text: string; value: any; }>;
  isRequired?: boolean;
  isNumber?: boolean;
}

@Component({
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent {

  private txnFormFields: TxnFormField[] = [
    {
      fieldName: 'type',
      elementType: 'select',
      options: [
        { text: 'Owes you', value: TransactionTypeCode.OWES_YOU },
        { text: 'You owe', value: TransactionTypeCode.YOU_OWE },
      ],
      isRequired: true,
    },
    {
      fieldName: 'amount',
      elementType: 'input',
      isRequired: true, 
    },
    {
      fieldName: 'dateTime',
      elementType: 'dateTimePicker',
      isRequired: true,
    },
    {
      fieldName: 'note',
      elementType: 'textarea',
    },
    {
      fieldName: 'description',
      elementType: 'textarea'
    }
  ];

  transactionForm = this.getForm();

  constructor(
    private fb: FormBuilder,
  ) { }

  private getForm() {
    const formConfig: { [key: string]: any; } = {};

    for (let field of this.txnFormFields) {
      const controlConfig: any[] = [];
      const validators: ValidatorFn[] = [];

      if (field.elementType === 'dateTimePicker') {
        controlConfig.push(Date.now());
      } else {
        controlConfig.push('');
      }

      if (field.isRequired) {
        validators.push(Validators.required);
      }

      if (validators.length > 0) {
        controlConfig.push(validators);
      }

      formConfig[field.fieldName] = controlConfig;
    }

    return this.fb.group(formConfig);
  }
}
