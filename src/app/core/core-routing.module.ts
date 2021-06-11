import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
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
        path: 'transactions',
        component: TransactionsComponent,
      },
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