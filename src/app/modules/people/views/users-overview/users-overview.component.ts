import { Component, OnInit } from '@angular/core';
import {Observable, shareReplay, switchMap} from "rxjs";
import {User} from "../../../../core/models/user.model";
import {UsersService} from "../../services/users.service";
import {SearchService} from "../../../../shared/services/search.service";
import {AuthService} from "../../../auth/services/auth.service";
import {TranslateService} from "@ngx-translate/core";



@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.css']
})
export class UsersOverviewComponent implements OnInit {

  constructor(private usersService: UsersService,
              private authService: AuthService,
              private translateService: TranslateService) {}

  ngOnInit(): void {

    this.authService.getUserData().pipe().subscribe((user) => {
      if (user?.language == 'Slovene') {
        this.translateService.use('si');
      } else if (user?.language == 'English') {
        this.translateService.use('en');
      }
    })
  }

}
