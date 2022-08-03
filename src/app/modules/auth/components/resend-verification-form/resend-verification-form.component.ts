import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-resend-verification-form',
  templateUrl: './resend-verification-form.component.html',
  styleUrls: ['./resend-verification-form.component.css']
})
export class ResendVerificationFormComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
     this.authService.user$.subscribe((authUser)=>{
       if(authUser.emailVerified && authUser){
         this.router.navigate(['/app/home']);
       }
     })
  }

  continueToApplication(event: Event){
    location.reload();
    this.router.navigate(['/app/home']);
  }

  resendVerificationEmail(event: Event){
   this.authService.resendVerificationEmail();
  }

}
