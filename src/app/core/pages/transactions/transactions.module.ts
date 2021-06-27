import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TransactionsComponent } from './transactions.component';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionFormModule } from './transaction-form/transaction-form.module';

@NgModule({
  declarations: [
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    TransactionModule,
    TransactionFormModule,
  ]
})
export class TransactionsModule { }
