import { FormGroup } from '@angular/forms';

export function getFormControlValue(
  form: FormGroup,
  formControlName: string
): any {
  return form.get(formControlName).value;
}

export function setFormControlValue(
  form: FormGroup,
  formControlName: string,
  newValue: any
): void {
  form.get(formControlName).patchValue(newValue);
}

export function clearFormControl(
  form: FormGroup,
  formControlName: string
): void {
  form.get(formControlName).patchValue('');
}