import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

// import { LoginComponent } from './auth/login/login.component';
// import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthPageGuard } from './auth/auth-page.guard';
import { CorePageGuard } from './core/core-page.guard';

const routes: Route[] = [
  {
    path: 'login',
    // component: LoginComponent,
    // loadChildren: () => {
    //   return import('./auth/login/login.module')
    //     .then(m => {
    //       return m.LoginModule;
    //     });
    // },
    loadChildren: async () => {
      const m = await import('./auth/login/login.module');
      return m.LoginModule;
    },
    canActivate: [AuthPageGuard],
  },
  {
    path: 'sign-up',
    // component: SignUpComponent,
    // loadChildren: () => {
    //   return import('./auth/sign-up/sign-up.module')
    //     .then(m => {
    //       return m.SignUpModule;
    //     });
    // },
    loadChildren: async () => {
      const m = await import('./auth/sign-up/sign-up.module');
      return m.SignUpModule;
    },
    canActivate: [AuthPageGuard],
  },
  {
    path: '',
    loadChildren: async () => {
      const m = await import('./core/navbar/navbar.module');
      return m.NavbarModule;
    },
    canActivate: [CorePageGuard],
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