import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidators {

  static shouldBeStrong(minLength: number, maxLength?: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;

      if (!value) {
        return null;
      }

      if (value.length < minLength) {
        return {
          shouldBeStrong: {
            requiredLength: minLength,
            actualLength: value.length,
          }
        };
      }

      if (maxLength && (value.length > maxLength)) {
        return {
          shouldBeStrong: {
            maxLength: maxLength,
            actualLength: value.length,
          },
        };
      }

      const UPPERCASE_REGEXP = /[A-Z]/g;
      if (!UPPERCASE_REGEXP.test(value)) {
        return {
          shouldBeStrong: {
            uppercaseCharacter: true,
          },
        };
      }

      return null;
    };
  }
}