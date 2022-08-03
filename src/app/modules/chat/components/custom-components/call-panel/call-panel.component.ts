import {Component, Input, OnInit} from '@angular/core';
import {Video} from "lucide-angular";
import {Observable, Subscription, switchMap, take} from "rxjs";
import {Room} from "../../../../../core/models/room.model";
import {AuthService} from "../../../../auth/services/auth.service";
import {UsersService} from "../../../../people/services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../../../rooms/services/room.service";
import {CallService} from "../../../services/call.service";
import {ChatService} from "../../../services/chat.service";


@Component({
  selector: 'app-call-panel',
  templateUrl: './call-panel.component.html',
  styleUrls: ['./call-panel.component.css']
})
export class CallPanelComponent implements OnInit {

  @Input() elementId!: string | undefined;
  roomData$!: Observable<Room>
  room!: Observable<any>;
  calleeId!: string;
  videocall = Video;
  message!: any;
  subscription: Subscription = new Subscription();


  constructor(private roomsService: RoomService,
              private authService: AuthService,
              private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router,
              private callService: CallService,
              private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.room = this.chatService.selectedRoom.pipe(
      switchMap((params) => {
        // @ts-ignore
        if (params.userId) {
          // @ts-ignore
          return this.usersService.get(params.userId)
        }
        // @ts-ignore
        return this.roomsService.get(params.roomId)
      }))

      this.roomData$ = this.route.params.pipe(
        switchMap(params => {
          return this.roomsService.get(params['roomId']);
        })
      );
      this.subscription.add(this.roomData$.subscribe());


    this.subscription.add(this.room.subscribe((data)=>{
      if(data){
        this.calleeId = data.id;
      }
    }));
  }

  createCallRoom() {
    this.authService.getUserData().pipe(take(1)).subscribe((myUserData) => {
      this.callService.createNewCallRoom(<string>myUserData?.id, this.calleeId);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


/*    this.roomData$ = this.route.params.pipe(
      switchMap(params => {
        return this.roomsService.get(params['roomId']);
      })
    );

    this.roomData$.subscribe((res) => {

    });*/
