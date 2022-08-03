import {Component, OnInit} from '@angular/core';
import {map, Observable, Subscription, switchMap, take} from "rxjs";
import {User} from "../../../../core/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../services/room.service";
import {Room} from "../../../../core/models/room.model";
import {AuthService} from "../../../auth/services/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {TableDataItem} from "../../../../core/models/table-data-item.model";
import {RoomsFilesService} from "../../services/rooms-files.service";


@Component({
  selector: 'app-room-profile',
  templateUrl: './room-profile.component.html',
  styleUrls: ['./room-profile.component.css']
})
export class RoomProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private roomService: RoomService,
              private roomFilesService: RoomsFilesService,
              private authService: AuthService,
              private translateService: TranslateService,
              private roomsFilesService: RoomsFilesService,
              private router: Router) {
  }

  private subscriptions = new Subscription();
  roomRequests$!: Observable<TableDataItem[]>;
  roomFilesShared$!: Observable<TableDataItem[]>;

  roomMembers$!: Observable<Room[]>;
  roomData$!: Observable<Room>;
  roomObject!: Room;
  myId!: string | undefined;
  roomId!: string | null;
  isViewingUserMember: boolean = false;

  createdAtLabel!: string;
  typeLabel!: string;
  bioLabel!: string;
  privateRoomLabel!: string;
  publicRoomLabel!: string;
  roomMembersLabel!: string;

  tableFilesDelActionLbl!: string;
  tableFilesNameHeaderLbl!: string;
  tableFilesTitleLbl!: string;
  tableFilesViewActionLbl!: string;

  tableReqDelActionLbl!: string;
  tableReqReactionActionLbl!: string;
  tableReqNameHeaderLbl!: string;
  tableReqTitleLbl!: string;
  tableReqViewActionLbl!: string;


  ngOnInit(): void {
    // @ts-ignore
    this.authService.getUserData().pipe(take(1)).subscribe((user) => {
      this.myId = user?.id
    })

    this.roomId = this.route.snapshot.paramMap.get('roomId')

    this.translateService.get(['profile.created_at', 'profile.bio',
      'profile.public_room', 'profile.private_room',
      'profile.type', 'profile.room_members',
      'tableview-requests.delete_action_header', 'tableview-requests.reaction_action_header',
      'tableview-requests.name_header', 'tableview-requests.title', 'tableview-requests.view_action_header',
      'tableview-files.delete_action_header','tableview-files.name_header', 'tableview-files.title', 'tableview-files.view_action_header'])
      .subscribe(translations => {
        this.createdAtLabel = translations['profile.created_at'];
        this.bioLabel = translations['profile.bio'];
        this.typeLabel = translations['profile.type'];
        this.publicRoomLabel = translations['profile.public_room'];
        this.privateRoomLabel = translations['profile.private_room'];
        this.roomMembersLabel = translations['profile.room_members'];

        this.tableFilesDelActionLbl = translations['tableview-files.delete_action_header'];
        this.tableFilesNameHeaderLbl = translations['tableview-files.name_header'];
        this.tableFilesTitleLbl = translations['tableview-files.title'];
        this.tableFilesViewActionLbl = translations['tableview-files.view_action_header'];

        this.tableReqDelActionLbl = translations['tableview-requests.delete_action_header'];
        this.tableReqReactionActionLbl = translations['tableview-requests.reaction_action_header'];
        this.tableReqNameHeaderLbl = translations['tableview-requests.name_header'];
        this.tableReqTitleLbl = translations['tableview-requests.title'];
        this.tableReqViewActionLbl = translations['tableview-requests.view_action_header'];
      });

    if (this.roomId) {
      this.roomData$ = this.roomService.get(this.roomId);

      this.roomRequests$ = this.roomService.getPrivateRoomsRequests(this.roomId).pipe(
        map(data => {
          return data.map((element: any) => {
            return {
              id: element.id,
              avatar: element.userData.avatar,
              name: element.userData.name,
            };
          });
        }));

      this.roomFilesShared$ = this.roomFilesService.getSharedFilesInRoom(this.roomId).pipe(
        map(data => {
          return data.map((element: any) => {
            return {
              id: element.id,
              url: element.fileData.url,
              name: element.fileData.name,
            };
          });
        }));

      this.roomMembers$ = this.roomService.getRoomsMembers(this.roomId).pipe(
        map(data => {
          return data.map((element: any) => {
            return {
              id: element.id,
              avatar: element.userData.avatar,
              name: element.userData.name,
            };
          });
        }));

      this.roomMembers$.subscribe((members) => {
        for (var i = 0; i < members.length; i++) {
          if (members[i].id == this.myId) {
            this.isViewingUserMember = true;
            break;
          }
        }
      })
    }
    this.subscriptions.add(this.roomFilesShared$.subscribe());
    this.subscriptions.add(this.roomRequests$.subscribe());
    this.subscriptions.add(this.roomData$.subscribe((roomObject) => {
      this.roomObject = roomObject;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  joinRoom(event: Event) {
    if (this.roomId != null) {
      this.authService.getUserData().pipe(take(1)).subscribe((myUserData) => {
        if (myUserData) {
          this.roomService.joinRoom(this.roomObject, myUserData);
        }
      })
    }
  }

  requestAccessToRoom(event: Event) {
    if (this.roomId != null) {
      this.authService.getUserData().pipe(take(1)).subscribe((myUserData) => {
        if (myUserData) {
          this.roomService.requestAccess(this.roomObject, myUserData);
        }
      })
    }
  }

  leaveRoom(event: Event) {
    if (this.roomId != null) {
      if (typeof this.myId === "string") {
        this.roomService.leaveRoom(this.roomId, this.myId);
      }
    }
  }

  delete(event: Event) {
    if (this.roomId != null) {
      this.roomService.delete(this.roomId);
      this.router.navigate(['/app/rooms']);
    }
  }


  viewProfile(event: Event, id: string) {
    this.router.navigate(['/app/people/' + id]);
  }

  goToUrl(event: Event, url: string) {
    window.location.href = url;
  }

  deleteFile(event: Event, id: string) {
   this.roomsFilesService.removeFileFromRoom(<string>this.roomId, id);
  }

  acceptRequest(event: Event, id: string) {
    if (this.roomId) {
      this.roomService.acceptPendingRequest(this.roomId, id);
    }
  }

  deleteRequest(event: Event, id: string) {
    if (this.roomId) {
      this.roomService.deletePendingRequest(this.roomId, id);
    }
  }

  memberSelected(itemClicked: Event, itemId: string) {
    this.router.navigate(['/app/people/' + itemId]);
  }
}
