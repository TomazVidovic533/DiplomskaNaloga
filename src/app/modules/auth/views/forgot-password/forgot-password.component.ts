import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;

  constructor(private authService: AuthService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  forgotPassword(event: Event){
    this.authService.forgotPassword(this.forgotPasswordForm.get('email')?.value)
  }

  invalid($event: Event) {

  }
}
