import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { AuthService } from '../auth.service';
import { UsernameValidators } from '../../shared/validators/username.validator';
import { PasswordValidators } from '../../shared/validators/password.validator';

@Component({
  selector: 'mm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signUpForm = new FormGroup({
    email: new FormControl(
      '',
      [
        Validators.required,
        Validators.email,
      ]
    ),
    username: new FormControl(
      '',
      [
        Validators.required,
        UsernameValidators.shouldNotContainSpaces,
      ],
    ),
    password: new FormControl(
      '',
      [
        Validators.required,
        PasswordValidators.shouldBeStrong(6),
      ],
    ),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService) { }

  get email() {
    return this.signUpForm.controls['email'] as FormControl;
  }

  get username() {
    return this.signUpForm.controls['username'] as FormControl;
  }

  get password() {
    return this.signUpForm.controls['password'] as FormControl;
  }

  get confirmPassword() {
    return this.signUpForm.controls['confirmPassword'] as FormControl;
  }

  getEmailError() {
    if (this.email.hasError('required')) {
      return 'This field is required!';
    }

    if (this.email.hasError('email')) {
      return 'Invalid email!';
    }

    return null;
  }

  getUsernameError() {
    if (this.username.hasError('required')) {
      return 'This field is required!';
    }

    if (this.username.hasError('shouldNotContainSpaces')) {
      return 'Should not contain spaces!';
    }

    return null;
  }

  getPasswordError() {
    if (this.password.hasError('required')) {
      return 'This field is required!';
    }

    if (this.password.hasError('shouldBeStrong')) {
      const errors = this.password.errors?.shouldBeStrong;
      const requiredLength = errors.requiredLength;

      if (requiredLength) {
        return `Require minimum ${requiredLength} characters`;
      }

      if (errors.uppercaseCharacter) {
        return 'Should contain at least one uppercase character';
      }
    }

    return null;
  }

  getConfirmPasswordError() {
    if (this.confirmPassword.hasError('required')) {
      return 'This field is required!';
    }

    return null;
  }

  onSignUp() {

  }
}
