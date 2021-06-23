import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CREATE_TXN, UPDATE_TXN } from '../../../../helpers/apis';

import {
  CreateOrUpdateTransactionData,
  Transaction,
  TransactionTypeCode,
  TransactionFormField,
} from '../../../../helpers/types';

@Injectable({
  providedIn: 'root'
})
export class TransactionFormService {

  constructor(
    private http: HttpClient,
  ) { }

  createNewTransaction(data: CreateOrUpdateTransactionData) {
    return this.http.post<Transaction>(CREATE_TXN, data);
  }

  updateTransaction(txnId: number, data: CreateOrUpdateTransactionData) {
    return this.http.patch<Transaction>(`${UPDATE_TXN}/${txnId}`, data);
  }

  getTransactionFormModel(): TransactionFormField[] {
    return [
      {
        fieldName: 'contactId',
        displayName: 'Contact',
        elementType: 'select',
        options: [],
        shouldFetchOptions: true,
        isRequired: true,
      },
      {
        fieldName: 'type',
        displayName: 'Transaction type',
        elementType: 'select',
        options: [
          { text: 'Owes you', value: TransactionTypeCode.OWES_YOU },
          { text: 'You owe', value: TransactionTypeCode.YOU_OWE },
        ],
        isRequired: true,
      },
      {
        fieldName: 'amount',
        displayName: 'Amount',
        elementType: 'input',
        isRequired: true, 
      },
      {
        fieldName: 'dateTime',
        displayName: 'Date & Time',
        elementType: 'dateTimePicker',
        isRequired: true,
      },
      {
        fieldName: 'note',
        displayName: 'Note',
        elementType: 'textarea',
      },
      {
        fieldName: 'description',
        displayName: 'Description',
        elementType: 'textarea'
      }
    ];
  }
}