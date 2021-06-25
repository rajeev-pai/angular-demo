import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SignUpComponent } from './sign-up.component';
import { AuthModule } from '../auth.module';
import { SignUpRoutingModule } from './sign-up-routing.module';

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SignUpRoutingModule
  ]
})
export class SignUpModule { }
