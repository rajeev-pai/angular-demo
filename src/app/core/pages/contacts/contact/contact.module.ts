import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [
    ContactComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    ContactComponent,
  ]
})
export class ContactModule { }
