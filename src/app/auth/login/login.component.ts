import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'mm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginError = false;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  onLogin(form: NgForm) {
    this.authService
      .login(form.value)
      .subscribe(
        res => {
          this.router.navigateByUrl('/app');
        },
        err => {
          this.loginError = true;
          console.log('Login failed: ', err);
        }
      );
  }
}