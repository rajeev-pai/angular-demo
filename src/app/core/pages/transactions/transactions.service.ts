import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  GET_CONTACT_TXNS,
} from '../../../helpers/apis';
import { ContactTransactionsResponse } from '../../../helpers/types';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    private http: HttpClient,
  ) { }

  fetchTransactionsOfContact(id: number) {
    return this.http
      .get<ContactTransactionsResponse>(`${GET_CONTACT_TXNS}/${id}`);
  }
}