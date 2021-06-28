import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ContactFormComponent } from './contact-form.component';
import { CanDeactivateForm } from '../../../../utils/guards/form-alert/can-deactivate-form.guard';

const routes: Route[] = [
  {
    path: '',
    component: ContactFormComponent,
    canDeactivate: [CanDeactivateForm],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class ContactFormRoutingModule { }