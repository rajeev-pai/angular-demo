import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import {
  PasswordValidators,
  StrongPasswordErrors,
} from '../../shared/validators/password.validator';
import { UsernameValidators } from '../../shared/validators/username.validator';

@Component({
  selector: 'mm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  showPassword = false;
  showConfirmPassword = false;
  signUpInProgress = false;

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
        UsernameValidators.cannotContainSpace,
      ]
    ),
    password: new FormControl(
      '',
      [
        Validators.required,
        PasswordValidators.shouldBeStrong(6, 10),
      ]
    ),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  private passwordSubcription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    // Listen to changes from the password input field.
    this.passwordSubcription = this.password
      .valueChanges
      .subscribe(value => {
        this.confirmPassword.clearValidators();
        this.confirmPassword.setValidators([
          Validators.required,
          PasswordValidators.shouldMatch(value),
        ]);
        this.confirmPassword.updateValueAndValidity();
      });
  }

  ngOnDestroy() {
    this.passwordSubcription.unsubscribe();
  }

  get email() {
    return this.signUpForm.get('email') as FormControl;
  }

  get username() {
    return this.signUpForm.get('username') as FormControl;
  }

  get password() {
    return this.signUpForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword') as FormControl;
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

    if (this.username.hasError('cannotContainSpace')) {
      return 'Should not contain spaces!';
    }

    return null;
  }

  getPasswordError() {
    if (this.password.hasError('required')) {
      return 'This field is required!';
    }

    if (this.password.hasError('shouldBeStrong')) {
      const errors = (this.password.errors! as StrongPasswordErrors).shouldBeStrong;

      if (errors.requiredLength) {
        return `Must have at least ${errors.requiredLength} characters.`;
      }

      if (errors.maxLength) {
        return `Must not contain more that ${errors.maxLength} characters.`;
      }

      if (errors.requireSpecialCharacter) {
        return 'Must contain at least one special character.';
      }

      if (errors.requireLowerCaseCharacter) {
        return 'Must contain at least one lowercase character.';
      }

      if (errors.requireUpperCaseCharacter) {
        return 'Must contain at least one uppercase character';
      }

      if (errors.requireNumericalCharacter) {
        return 'Must contain at least one number.';
      }
    }

    return null;
  }

  getConfirmPasswordError() {
    if (this.confirmPassword.hasError('required')) {
      return 'This field is required!';
    }

    if (this.confirmPassword.hasError('shouldMatch')) {
      return 'Does not match the original password.';
    }

    return null;
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      this.signUpInProgress = true;

      this.authService
        .signUp(this.signUpForm.value)
        .subscribe(
          _ => {
            this.signUpInProgress = false;
            this.resetSignUpForm();
            this.router.navigateByUrl('/login');
          },
          err => {
            console.log('Err:', err);
          }
        );
    }
  }

  private resetSignUpForm() {
    this.signUpForm.reset();

    for (let control in this.signUpForm.controls) {
      this.signUpForm.controls[control].setErrors(null);
    }
  }
}
