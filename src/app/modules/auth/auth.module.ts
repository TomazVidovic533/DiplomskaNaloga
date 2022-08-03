import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {SignInComponent} from "./views/sign-in/sign-in.component";
import {SignInFormComponent} from "./components/sign-in-form/sign-in-form.component";
import {SignUpFormComponent} from "./components/sign-up-form/sign-up-form.component";
import {SignUpComponent} from "./views/sign-up/sign-up.component";
import {
  ResendVerificationFormComponent
} from "./components/resend-verification-form/resend-verification-form.component";
import {NotVerifiedComponent} from "./views/not-verified/not-verified.component";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {UsersService} from "../people/services/users.service";
import {ForgotPasswordComponent} from "./views/forgot-password/forgot-password.component";


@NgModule({
  declarations: [
    SignInComponent,
    SignInFormComponent,
    SignUpComponent,
    SignUpFormComponent,
    ResendVerificationFormComponent,
    NotVerifiedComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    UsersService
  ]
})
export class AuthModule { }
