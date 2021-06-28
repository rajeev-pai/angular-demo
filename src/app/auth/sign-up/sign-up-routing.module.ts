import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up.component';
import { CanDeactivateForm } from '../../utils/guards/form-alert/can-deactivate-form.guard';

const routes: Route[] = [
  {
    path: '',
    component: SignUpComponent,
    canDeactivate: [CanDeactivateForm],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SignUpRoutingModule { }