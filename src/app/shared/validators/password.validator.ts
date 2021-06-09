import { AbstractControl, ValidatorFn } from '@angular/forms';

export interface StrongPasswordErrors {
  shouldBeStrong: {
    requiredLength?: number;
    actualLength?: number;
    maxLength?: number;
    requireSpecialCharacter?: boolean;
    requireLowerCaseCharacter?: boolean;
    requireUpperCaseCharacter?: boolean;
    requireNumericalCharacter?: boolean;
  };
}

export class PasswordValidators {

  static shouldBeStrong(minLength: number, maxLength?: number): ValidatorFn {
    return (control: AbstractControl): StrongPasswordErrors | null => {
      const value = control.value as string;

      if (!value) {
        return null;
      }

      if (value.length < minLength) {
        return {
          shouldBeStrong: {
            requiredLength: minLength,
            actualLength: value.length,
          },
        };
      }

      if (maxLength && (value.length > maxLength)) {
        return {
          shouldBeStrong: {
            maxLength,
            actualLength: value.length,
          },
        };
      }

      const SPECIAL_CHARACTER_REGEXP = /[^A-Za-z0-9]/g;
      if (!SPECIAL_CHARACTER_REGEXP.test(value)) {
        return {
          shouldBeStrong: {
            requireSpecialCharacter: true,
          },
        };
      }

      const LOWERCASE_REGEXP = /[a-z]/g;
      if (!LOWERCASE_REGEXP.test(value)) {
        return {
          shouldBeStrong: {
            requireLowerCaseCharacter: true,
          },
        };
      }

      const UPPERCASE_REGEXP = /[A-Z]/g;
      if (!UPPERCASE_REGEXP.test(value)) {
        return {
          shouldBeStrong: {
            requireUpperCaseCharacter: true,
          },
        };
      }

      const NUMBER_REGEXP = /[0-9]/g;
      if (!NUMBER_REGEXP.test(value)) {
        return {
          shouldBeStrong: {
            requireNumericalCharacter: true,
          },
        };
      }

      return null;
    }
  }

  static shouldMatch(originalPassword: string): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value as string;

      if (!value) {
        return null;
      }

      if (value !== originalPassword) {
        return {
          shouldMatch: {
            original: originalPassword,
            current: value,
          },
        };
      }

      return null;
    }
  }
}