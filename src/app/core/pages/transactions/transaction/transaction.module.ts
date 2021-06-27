import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TransactionComponent } from './transaction.component';
import { SharedModule } from '../../../../shared/shared.module';
import { TransactionFormModule } from '../transaction-form/transaction-form.module';

@NgModule({
  declarations: [
    TransactionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TransactionFormModule,
  ],
  exports: [
    TransactionComponent,
  ]
})
export class TransactionModule { }
