import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { ContactsComponent } from './pages/contacts/contacts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './pages/contacts/contact/contact.component';
import { ContactFormComponent } from './pages/contacts/contact-form/contact-form.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TransactionComponent } from './pages/transactions/transaction/transaction.component';
import { TransactionFormComponent } from './pages/transactions/transaction-form/transaction-form.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ContactViewComponent } from './pages/contacts/contact-view/contact-view.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ContactsComponent,
    ContactComponent,
    ContactFormComponent,
    TransactionsComponent,
    TransactionComponent,
    TransactionFormComponent,
    ContactViewComponent,
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    CoreRoutingModule,
    CommonModule,
    SharedModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ]
})
export class CoreModule { }