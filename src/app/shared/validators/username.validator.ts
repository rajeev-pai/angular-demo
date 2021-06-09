import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UsernameValidators {

  static shouldNotContainSpaces(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;

    if (value && (value.indexOf(' ') !== -1)) {
      return {
        shouldNotContainSpaces: true,
      };
    }

    return null;
  }
}