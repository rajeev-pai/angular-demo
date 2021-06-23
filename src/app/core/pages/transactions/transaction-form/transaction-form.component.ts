import { Component } from '@angular/core';

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

  private formModel: TxnFormField[] = [
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

  constructor() { }
}
