import { Component } from '@angular/core';

@Component({
  selector: 'mm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = 'Ethan Hunt';
  password = '123456';

  onLogin(e: MouseEvent) {
    e.preventDefault();
    console.log(this.username, this.password);
  }
}