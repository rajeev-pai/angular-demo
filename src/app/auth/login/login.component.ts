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
  disableButton = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {  }

  onLogin(form: NgForm) {
    this.disableButton = true;

    this.authService
      .login(form.value)
      .subscribe(
        _ => {
          this.router.navigateByUrl('/contacts');
        },
        err => {
          this.loginError = true;
          this.disableButton = false;
          console.log('Login failed: ', err);
        }
      );
  }
}