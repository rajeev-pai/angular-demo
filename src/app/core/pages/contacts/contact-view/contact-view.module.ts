import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { ContactViewComponent } from './contact-view.component';
import { ContactViewRoutingModule } from './contact-view-routing.module';
import { TransactionModule } from '../../transactions/transaction/transaction.module';

@NgModule({
  declarations: [
    ContactViewComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ContactViewRoutingModule,
    TransactionModule,
  ]
})
export class ContactViewModule { }
