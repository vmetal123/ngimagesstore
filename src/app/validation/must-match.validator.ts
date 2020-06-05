import { FormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.MustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            return matchingControl.setErrors({mustMatch: true});
        } else {
            return null
        }
    }
}