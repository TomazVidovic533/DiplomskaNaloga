import {Component, Input, OnInit} from '@angular/core';
import {RoomItem} from "../../../../../core/models/room.model";
import {ChatService} from "../../../services/chat.service";


@Component({
  selector: 'app-room-list-item',
  templateUrl: './room-list-item.component.html',
  styleUrls: ['./room-list-item.component.css']
})
export class RoomListItemComponent implements OnInit {

  @Input() roomData!: RoomItem;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  enter(roomId: string | undefined,userId: string | undefined | null){
    if(roomId){
      this.chatService.switchRoom({roomId: roomId, userId: userId, is_private: !!userId})
    }
  }

}
