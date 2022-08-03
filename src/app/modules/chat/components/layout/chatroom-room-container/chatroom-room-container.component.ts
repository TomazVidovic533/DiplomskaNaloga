import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, take} from "rxjs";
import {Room} from "../../../../../core/models/room.model";

@Component({
  selector: 'app-chatroom-room-container',
  templateUrl: './chatroom-room-container.component.html',
  styleUrls: ['./chatroom-room-container.component.css']
})
export class ChatroomRoomContainerComponent implements OnInit {

  rooms$!: Observable<Room[]>;

  constructor() {
  }

  ngOnInit(): void {

  }
}
