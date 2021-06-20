import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  GET_CONTACT_TXNS,
  GET_ACCOUNT_TXNS,
  GET_ACCOUNT_TXN_SUMMARY,
  GET_TXN,
  GET_CONTACT_TXN_SUMMARY,
  CREATE_TXN,
  UPDATE_TXN,
  DELETE_TXN,
} from '../../../helpers/apis';

import {
  TransactionsResponse,
  TransactionSummary,
  Transaction,
  CreateOrUpdateTransactionData,
} from '../../../helpers/types';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    private http: HttpClient,
  ) { }

  fetchTransactionsOfAccount() {
    return this.http.get<TransactionsResponse>(GET_ACCOUNT_TXNS);
  }

  fetchAccountTransactionSummary() {
    return this.http.get<TransactionSummary>(GET_ACCOUNT_TXN_SUMMARY);
  }

  fetchTransactionsOfContact(contactId: number) {
    return this.http
      .get<TransactionsResponse>(`${GET_CONTACT_TXNS}/${contactId}`);
  }

  fetchTransaction(txnId: number) {
    return this.http.get<Transaction>(`${GET_TXN}/${txnId}`);
  }

  fetchContactTransactionSummary(contactId: number) {
    return this.http
      .get<TransactionSummary>(`${GET_CONTACT_TXN_SUMMARY}/${contactId}`);
  }

  createNewTransaction(data: CreateOrUpdateTransactionData) {
    return this.http.post<Transaction>(CREATE_TXN, data);
  }

  updateTransaction(txnId: number, data: CreateOrUpdateTransactionData) {
    return this.http.patch<Transaction>(`${UPDATE_TXN}/${txnId}`, data);
  }

  deleteTransaction(id: number) {
    return this.http.delete<{ success: boolean; }>(`${DELETE_TXN}/${id}`);
  }
}