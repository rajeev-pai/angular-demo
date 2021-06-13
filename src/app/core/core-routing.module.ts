import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ContactFormComponent } from './pages/contacts/contact-form/contact-form.component';
import { ContactComponent } from './pages/contacts/contact/contact.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

const routes: Route[] = [
  {
    path: 'app',
    component: NavbarComponent,
    children: [
      {
        path: 'contacts',
        component: ContactsComponent
      },
      {
        path: 'contact/:id',
        component: ContactComponent,
      },
      {
        path: 'new-contact',
        component: ContactFormComponent,
      },
      {
        path: 'edit-contact/:id',
        component: ContactFormComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
      },
      {
        path: '',
        redirectTo: 'contacts',
        pathMatch: 'full'
      }
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class CoreRoutingModule {

}