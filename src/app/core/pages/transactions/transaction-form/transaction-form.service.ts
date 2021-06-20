import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CREATE_TXN, UPDATE_TXN } from '../../../../helpers/apis';

import {
  CreateOrUpdateTransactionData,
  Transaction,
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
}