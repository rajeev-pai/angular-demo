import { Component } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'mm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  constructor(private authService: AuthService) { }

  onLogin(form: any) {
    this.authService
      .login()
      .subscribe(res => {
        console.log(res);
      });
  }
}