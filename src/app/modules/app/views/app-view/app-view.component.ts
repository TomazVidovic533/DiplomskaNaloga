import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../../auth/services/auth.service";
import {map, Observable, Subscription, switchMap, take} from "rxjs";
import {CallService} from "../../../chat/services/call.service";

@Component({
  selector: 'app-app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.css']
})
export class AppViewComponent implements OnInit {
  usersIncomingCalls$!: Observable<any>;
  subscription = new Subscription();

  constructor(private translate: TranslateService,
              private authService: AuthService,
              private callsService: CallService) {
  }

  ngOnInit(): void {
    this.translate.addLangs(['en', 'si']);
    this.translate.setDefaultLang('si');

    this.authService.getUserData().pipe().subscribe((user) => {
      if (user?.language == 'Slovene') {
        this.translate.use('si');
      } else if (user?.language == 'English') {
        this.translate.use('en');
      }
    })

    this.usersIncomingCalls$ = this.authService.getUserData().pipe(
      switchMap(user => {
        // @ts-ignore
        return this.callsService.getIncomingCalls(user?.id);
      }),
      map(data => {
        console.log(data)
        return data.map((element: any) => {
          return {
            id: element.callData.id,
            callId: element.callData.callId,
            avatar: element.userData.avatar,
            name: element.userData.name,
          };
        });
      }));

    this.subscription.add(this.usersIncomingCalls$.subscribe());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
