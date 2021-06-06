// import {  } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable } from 'rxjs';

export class UsernameValidators {

  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;

    if (value && value.indexOf(' ') !== -1) {
      return { cannotContainSpace: true };
    }

    return null;
  }

  static available<T>(apiFn: (...args: any) => Observable<T>): AsyncValidatorFn {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value as string;
      return apiFn(value);
    }
  }
}