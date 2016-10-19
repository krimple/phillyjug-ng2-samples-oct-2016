import { ValidatorFn, FormControl } from '@angular/forms';

export function rangeValidator(min: number, max?: number): ValidatorFn {
  return (control: FormControl): { [s: string]: boolean } => {
    let numVal = parseFloat(control.value);
      if (min && min > numVal) {
        return { min: true };
      }
      if (max && max < numVal) {
        return { max: true };
      }
  };
}
