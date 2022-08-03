import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, switchMap, take} from "rxjs";
import {RoomService} from "../../services/room.service";
import {Room} from "../../../../core/models/room.model";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  roomData$!: Observable<Room>;

  constructor(private route: ActivatedRoute, private roomsService: RoomService) { }

  ngOnInit(): void {

    this.roomData$=this.route.paramMap.pipe(
      take(1),
      switchMap(params => {
        return this.roomsService.get(<string>params.get('roomId'));
      })
    )
  }

}
