import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TransactionComponent } from './transaction.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [
    TransactionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    TransactionComponent,
  ]
})
export class TransactionModule { }
