import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { MatCardModule } from '@angular/material/card';
// import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { AuthLayoutComponent } from './layout/layout.component';
// import { LoginComponent } from './login/login.component';
// import { SignUpComponent } from './sign-up/sign-up.component';
import { AutoLogoutModalComponent } from './auto-logout-modal/auto-logout-modal.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    // LoginComponent,
    // SignUpComponent,
    AutoLogoutModalComponent,
  ],
  imports: [
    MatCardModule,
    // MatInputModule,
    // MatButtonModule,
    // MatIconModule,
    RouterModule,
    // FormsModule,
    // ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    AuthLayoutComponent
  ],
  providers: []
})
export class AuthModule {

}
