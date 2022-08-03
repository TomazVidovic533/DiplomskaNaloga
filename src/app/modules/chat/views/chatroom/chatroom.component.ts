import {Component, OnInit} from '@angular/core';
import {combineLatest, map, Observable, Subscription, switchMap} from "rxjs";
import {UsersService} from "../../../people/services/users.service";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  private subscriptions = new Subscription();
  usersRooms$!: Observable<any>;
  userRooms: any;

  constructor(private usersService: UsersService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.usersRooms$ = this.authService.getUserData().pipe(
      switchMap(user => combineLatest([
        this.usersService.getRoomsOfUser(user?.id),
        this.usersService.getUsersContacts(user?.id)
      ])),
      map(([rooms, contacts]) => {
        let combined = [...rooms, ...contacts];
        let mappedContacts = [];
        for (const element of combined) {
          mappedContacts.push({
            id: (element.room_id ? element.room_id : element.id),
            avatar: (element.userData ? element.userData.avatar : element.roomData.avatar),
            name: (element.userData ? element.userData.name : element.roomData.name),
            user_id: (element.room_id ? element.id : null),
            recent_message: (element.userData ? null : element.roomData.recent_message)
          })
        }
        return mappedContacts;
      })
    );
    this.subscriptions.add(this.usersRooms$.subscribe());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

