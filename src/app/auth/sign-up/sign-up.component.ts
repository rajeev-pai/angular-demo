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

import { NotifierService } from 'angular-notifier';

import { AuthService } from '../auth.service';
import { FormCanDeactivate } from '../../utils/guards/form-alert/form-can-deactivate';

import {
  PasswordValidators,
  StrongPasswordErrors,
  UsernameValidators,
} from '../../utils/validators';

@Component({
  selector: 'mm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends FormCanDeactivate implements OnInit, OnDestroy {
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
      ],
      [
        this.usernameValidators.taken
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

  private passwordSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService,
    private usernameValidators: UsernameValidators,
  ) {
    super();
  }

  ngOnInit() {
    // Listen to changes from the password input field.
    this.passwordSubscription = this.password
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
    this.passwordSubscription.unsubscribe();
  }

  get formRef() {
    return this.signUpForm;
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

    if (this.email.hasError('taken')) {
      return 'This email is already taken!';
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

    if (this.username.hasError('taken')) {
      return 'This username is already taken!';
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
    if (this.signUpForm.valid && !this.signUpInProgress) {
      this.signUpInProgress = true;

      this.authService
        .signUp(this.signUpForm.value)
        .subscribe(
          // _ => {
          //   this.notifierService.notify(
          //     'success',
          //     'Account created successfully!'
          //   );

          //   this.signUpInProgress = false;
          //   this.resetSignUpForm();
          //   this.router.navigateByUrl('/login');
          // },
          // err => {
          //   this.signUpInProgress = false;

          //   if (err.error.errors.email) {
          //     this.email.setErrors({ taken: true })
          //   }
          // }

          res => {
            this.signUpInProgress = false;

            if (res.success) {
              this.notifierService.notify(
                'success',
                'Account created successfully!'
              );

              this.resetSignUpForm();
              this.router.navigateByUrl('/login');
            } else {
              if (res.error) {
                if (res.error.email) {
                  this.email.setErrors({ taken: true })
                }
              }
            }
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
