
import { AbstractControl } from '@angular/forms';

export const dateValidator = (control: AbstractControl) => {
    const date: Date = new Date(control.value);

    return isNaN(date.getTime()) ? {forbiddenDate: {value: control.value}} : null;
  };
