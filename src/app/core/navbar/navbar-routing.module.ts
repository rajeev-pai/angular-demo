import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar.component';

const routes: Route[] = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'contacts',
        loadChildren: async () => {
          const m = await import('../pages/contacts/contacts.module');
          return m.ContactsModule;
        }
      },
      {
        path: 'contact/:id',
        loadChildren: async () => {
          const m = await import('../pages/contacts/contact-view/contact-view.module');
          return m.ContactViewModule;
        }
      },
      {
        path: 'new-contact',
        loadChildren: async () => {
          const m = await import('../pages/contacts/contact-form/contact-form.module');
          return m.ContactFormModule;
        }
      },
      {
        path: 'edit-contact/:id',
        loadChildren: async () => {
          const m = await import('../pages/contacts/contact-form/contact-form.module');
          return m.ContactFormModule;
        }
      },
      {
        path: '',
        redirectTo: 'contacts',
        pathMatch: 'full'
      }
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class NavbarRoutingModule { }