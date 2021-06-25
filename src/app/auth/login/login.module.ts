import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LoginComponent } from './login.component';
import { AuthModule } from '../auth.module';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
