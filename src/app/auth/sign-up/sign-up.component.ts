import { Component } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'mm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  constructor(private authService: AuthService) { }

  onSignUp(form: any) {
    
  }
}
