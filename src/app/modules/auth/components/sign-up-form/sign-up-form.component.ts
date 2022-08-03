import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../core/models/user.model";
import {PasswordValidator} from "../../../../shared/validators/password-validator/password-validator";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  signUpForm!: FormGroup;

  genderOptions: string[] = ['Male', 'Female'];
  languageOptions: string[] = ['Slovene', 'English'];

  constructor(private formBuilder: FormBuilder,private authService: AuthService) {
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required,  Validators.maxLength(30)]),
      username: new FormControl(null, [Validators.required, Validators.maxLength(18)]),
      email: new FormControl(null, [Validators.required,Validators.email]),
      gender: new FormControl('Male', [Validators.required]),
      language: new FormControl('Slovene', [Validators.required]),
      avatar: new FormControl(null, [Validators.required]),
      bio: new FormControl(null, [Validators.required,Validators.maxLength(150)]),
      password: new FormControl(null, [Validators.required, PasswordValidator.complex])
    });
  }

  signUpWithEmailAndPassword(event: Event){
    let user = {
      name: this.signUpForm.get('name')?.value,
      username: this.signUpForm.get('username')?.value,
      email: this.signUpForm.get('email')?.value,
      gender: this.signUpForm.get('gender')?.value,
      language: this.signUpForm.get('language')?.value,
      bio: this.signUpForm.get('bio')?.value
    }as User;
    this.authService.signUpWithEmailAndPassword(user, this.signUpForm.get('password')?.value,this.signUpForm.get('avatar')?.value);
  }

  signInGoogle(event: Event){
    this.authService.signInWithGoogle();
  }

  invalid($event: Event) {

  }
}
