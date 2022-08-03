import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {PasswordValidator} from "../../../../shared/validators/password-validator/password-validator";

export function requiredFileType( type: string ) {
  return function (control: FormControl) {
    const file = control.value;
    if ( file ) {
      const extension = file.name.split('.')[1].toLowerCase();
      if ( type.toLowerCase() !== extension.toLowerCase() ) {
        return {
          requiredFileType: true
        };
      }

      return null;
    }

    return null;
  };
}

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

  signInForm!: FormGroup;
  checkErrors!: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, PasswordValidator.complex])
    });
    this.checkErrors=false;
  }

  async signInGoogle(event: Event) {

    await this.authService.signInWithGoogle();

  }

  async signInWithEmailAndPassword(event: Event) {

    if(!this.signInForm.valid){
      this.checkErrors=true;
    }else{
      await this.authService.signInWithEmailAndPassword(
        this.signInForm.get('email')?.value,
        this.signInForm.get('password')?.value).catch();
    }
  }
}
