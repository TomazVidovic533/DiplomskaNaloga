import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  Observable,
  Subscription,
  switchMap,
} from "rxjs";
import {Room} from "../../../../core/models/room.model";
import {MappedMessage, Message} from "../../../../core/models/message.model";
import {ChatService} from "../../services/chat.service";
import {RoomService} from "../../../rooms/services/room.service";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../../core/models/user.model";

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {

  id!: string | null;
  chatMessages$!: Observable<MappedMessage[]>;
  roomData$!: Observable<Room>;
  routeListener$!: Observable<any>;
  myUser$!: Observable<User>

  selectedRoom!: any;
  subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,
              private chatService: ChatService,
              private roomsService: RoomService,
              private auth: AuthService) {
  }

  ngOnInit(): void {
    this.subscription.add(this.chatService.selectedRoom.subscribe(data =>
      this.selectedRoom = data));

     // @ts-ignore
    this.myUser$=this.auth.getUserData();

    this.chatMessages$ = this.route.params.pipe(
      switchMap(params => {
        return this.chatService.getMappedRoomMessages(params['roomId']);
      })
    )
    this.routeListener$ = this.route.params.pipe(
      switchMap(params => {
        return this.roomsService.get(params['roomId']);
      })
    );

    this.subscription.add(this.myUser$.subscribe());
    this.subscription.add(this.routeListener$.subscribe());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
