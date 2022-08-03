import {Component, OnInit} from '@angular/core';
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import * as Stripe from "stripe";
import {loadStripe} from "@stripe/stripe-js";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../../core/models/user.model";
import {take} from "rxjs";


@Component({
  selector: 'app-pricing-overview',
  templateUrl: './pricing-overview.component.html',
  styleUrls: ['./pricing-overview.component.css']
})
export class PricingOverviewComponent implements OnInit {

  user!: User;

  constructor(private functions: AngularFireFunctions, private authService: AuthService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.authService.getUserData().pipe(take(1)).subscribe((user)=>{
      this.user = <User>user;
    })
  }

  async createPurchaseSession() {
    const stripe = await loadStripe('pk_test_51LOmISGgB96LAeCnOmAkuNdnrMCo8kJUIrlBzgoZWf8a91CeUIpN1LRyfwkDnAPudChDwj0sXHTtAQnjuqYPraEQ001XD4PQwO');
    this.functions.httpsCallable('purchaseProMembership')({}).subscribe((sessionId) => {
        stripe?.redirectToCheckout({sessionId: sessionId})
      }
    );
  }


}
