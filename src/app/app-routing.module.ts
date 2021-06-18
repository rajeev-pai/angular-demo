import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthPageGuard } from './auth/auth-page.guard';

const routes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthPageGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AuthPageGuard],
  },
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {

}