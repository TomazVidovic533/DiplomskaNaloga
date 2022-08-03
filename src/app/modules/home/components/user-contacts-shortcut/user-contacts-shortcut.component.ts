import {Component, OnInit} from '@angular/core';
import {combineLatest, map, Observable, Subscription, switchMap, take} from "rxjs";
import {DataObjectItem} from "../../../../shared/models/data-object-item";
import {UsersService} from "../../../people/services/users.service";
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {ChatService} from "../../../chat/services/chat.service";

@Component({
  selector: 'app-user-contacts-shortcut',
  templateUrl: './user-contacts-shortcut.component.html',
  styleUrls: ['./user-contacts-shortcut.component.css']
})
export class UserContactsShortcutComponent implements OnInit {
  userContacts$!: Observable<DataObjectItem[]>;
  private subscription = new Subscription();

  constructor(private usersService: UsersService,
              private authService: AuthService,
              private router: Router,
              private chatService: ChatService) {
  }

  ngOnInit(): void {
    /*   this.authService.getUserData().pipe(take(1)).subscribe((user)=>{
         // @ts-ignore
         this.userContacts$ = this.usersService.getUsersContacts(user.id);
       })*/

    this.userContacts$ = this.authService.getUserData().pipe(
      switchMap(user => {
        return this.usersService.getUsersContacts(user?.id)
      }),
      map(data => {
        return data.map((element: any) => {
          return {
            id: element.room_id,
            avatar: element.userData.avatar,
            name: element.userData.name,
            user_id: element.id
          };
        });
      }));

    this.subscription.add(this.userContacts$.subscribe());
  }

  ngOnDestroy(){

  }

  contactSelected(eventClicked: Event, itemId: string) {
    this.chatService.switchRoom({roomId: itemId, userId: null})
    this.router.navigate(['/app/chat/'+itemId]);
  }
}
