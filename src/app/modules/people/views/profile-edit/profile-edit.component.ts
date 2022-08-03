import { Component, OnInit } from '@angular/core';
import {Observable, Subscription, take} from "rxjs";
import {User} from "../../../../core/models/user.model";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  userData$!: Observable<User | null>;
  userData!: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // take(1) pobere samo eno iz se zakljuci - auto unsubrscribe
    this.userData$=this.authService.getUserData().pipe(take(1));
    this.userData$.subscribe();
  }

}
