
import { AbstractControl, ValidatorFn } from '@angular/forms';

export const regexValidator = (regex: RegExp): ValidatorFn => (control: AbstractControl) => {
  const forbidden: boolean = !regex.test(control.value);

  return forbidden ? {forbiddenColor: {value: control.value}} : null;
};
