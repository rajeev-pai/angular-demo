import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { ContactFormRoutingModule } from './contact-form-routing.module';
import { ContactFormComponent } from './contact-form.component';

@NgModule({
  declarations: [
    ContactFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ContactFormRoutingModule,
  ]
})
export class ContactFormModule { }
