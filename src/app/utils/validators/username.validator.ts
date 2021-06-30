import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsernameValidators {

  constructor(
    private authService: AuthService,
  ) { }

  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;

    if (value && (value.indexOf(' ') !== -1)) {
      return {
        cannotContainSpace: true,
      };
    }

    return null;
  }

  taken = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = control.value as string;

    if (!value) {
      return of(null);
    }

    return timer(500).pipe(
      switchMap(() => {
        return this.authService
          .checkUsernameAvailability(value)
          .pipe(
            map(res => {
              return res.available ? null : { taken: true };
            }),
          );
      }),
    );
  }
}