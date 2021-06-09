import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { ContactsComponent } from './pages/contacts/contacts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './pages/contacts/contact/contact.component';
import { ContactFormComponent } from './pages/contacts/contact-form/contact-form.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TransactionComponent } from './pages/transactions/transaction/transaction.component';
import { TransactionFormComponent } from './pages/transactions/transaction-form/transaction-form.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ContactsComponent,
    ContactComponent,
    ContactFormComponent,
    TransactionsComponent,
    TransactionComponent,
    TransactionFormComponent,
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
  ]
})
export class CoreModule { }