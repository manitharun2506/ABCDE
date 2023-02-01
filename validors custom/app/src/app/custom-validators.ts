import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidator {
  static noWhitespaceValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    if ((control.value as string)?.startsWith(' ')) {
      return { noWhitespaceValidator: true };
    }
    return null;
  }

  // validate negative number
  static negativeNumberValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    if (control.value < 0) {
      return { negativeNumberValidator: true };
    }
    return null;
  }

  // min value 1
  static minValueValidator(
    min: number
  ): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value < min) {
        return { minValueValidator: true };
      }
      return null;
    };
  }

  // phone number validation
  static phoneNumberValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!/^[0-9]{10}$/.test(control.value)) {
      return { phoneNumberValidator: true };
    }
    return null;
  }

  // PAN validation
  static panValidator(control: AbstractControl): ValidationErrors | null {
    // 5 characters followed by 4 numbers followed by 1 character validation
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(control.value)) {
      return { panValidator: true };
    }
    return null;
  }

  // aadharValidator validation
  static aadharValidator(control: AbstractControl): ValidationErrors | null {
    if (!/^[0-9]{12}$/.test(control.value)) {
      return { aadharValidator: true };
    }
    return null;
  }

  // IDValidator validation with Alphanumeric with - and _ allowed
  static IDValidator(control: AbstractControl): ValidationErrors | null {
    if (!/^[a-zA-Z0-9_-]*$/.test(control.value)) {
      return { IDValidator: true };
    }
    return null;
  }
  // max string length validation
  static maxLengthValidator(
    max: number
  ): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value?.length > max) {
        return { maxLengthValidator: true };
      }
      return null;
    };
  }

  // allow alpha numeric with space
  static alphaNumericValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!/^[a-zA-Z0-9 ]*$/.test(control.value)) {
      return { alphaNumericValidator: true };
    }
    return null;
  }

  static specialCharecterValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    if (/^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]/.test(control.value)) {
      return { specialCharecterValidator: true };
    }
    return null;
  }

  static nameValidator(control: AbstractControl): ValidationErrors | null {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (control.value && nameRegexp.test(control.value)) {
      return { nameValidator: true };
    }
    return null;
  }
  // dateValidator
  static dateValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const date = new Date(control.value);
      if (date.toString() === 'Invalid Date') {
        return { dateValidator: true };
      }
    }
    return null;
  }

  // decimal number validation
  static decimalNumberValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!/^\d+(\.\d{1,2})?$/.test(control.value)) {
      return { decimalNumberValidator: true };
    }
    return null;
  }
}
