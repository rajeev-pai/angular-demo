import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { ContactsComponent } from './contacts/contacts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contacts/contact/contact.component';
import { ContactFormComponent } from './contacts/contact-form/contact-form.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionComponent } from './transactions/transaction/transaction.component';
import { TransactionFormComponent } from './transactions/transaction-form/transaction-form.component';

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
  ]
})
export class CoreModule { }