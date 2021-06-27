import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ContactViewComponent } from './contact-view.component';
import { ContactViewRoutingModule } from './contact-view-routing.module';
import { TransactionModule } from '../../transactions/transaction/transaction.module';
import { TransactionFormModule } from '../../transactions/transaction-form/transaction-form.module';

@NgModule({
  declarations: [
    ContactViewComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ContactViewRoutingModule,
    TransactionModule,
    TransactionFormModule,
  ]
})
export class ContactViewModule { }
