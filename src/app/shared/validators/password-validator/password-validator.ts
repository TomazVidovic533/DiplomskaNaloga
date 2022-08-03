import {FormControl} from "@angular/forms";
import {ValidationFormControlInput} from "../../models/validation-form-control-input.model";

export class PasswordValidator {

  public static complex(formControlInput: FormControl): ValidationFormControlInput | null {
    let containsNumber = /\d/.test(formControlInput.value);
    let containsUpperChar = /[A-Z]/.test(formControlInput.value);
    let containsLowerChar = /[a-z]/.test(formControlInput.value);
    let containsSpecialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(formControlInput.value);
    if (!(containsNumber && containsUpperChar && containsLowerChar && containsSpecialChar)) return { isPasswordComplex: true };
    return null;
  }
}
