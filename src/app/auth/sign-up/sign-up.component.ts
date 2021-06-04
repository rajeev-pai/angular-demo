import { Component } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'mm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  valueFromService = this.authService.getValue();

  constructor(private authService: AuthService) { }

  onSignUp(form: any) {
    
  }

  setValue() {
    this.authService.setValue('SIGN UP');
  }

  getValue() {
    this.valueFromService = this.authService.getValue();
  }
}
