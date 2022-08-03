import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from "../../services/room.service";
import {Observable, shareReplay} from "rxjs";
import {Room} from "../../../../core/models/room.model";
import {Condition} from "../../../../core/models/condition";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-rooms-overview',
  templateUrl: './rooms-overview.component.html',
  styleUrls: ['./rooms-overview.component.css']
})
export class RoomsOverviewComponent implements OnInit {

  searchCondition!: Condition;
  createRoomBtnLabel!: string;

  constructor(private roomService: RoomService,
              private translateService: TranslateService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUserData().pipe().subscribe((user) => {
      if (user?.language == 'Slovene') {
        this.translateService.use('si');
      } else if (user?.language == 'English') {
        this.translateService.use('en');
      }
    })

    this.translateService.get(['create_room_btn'])
      .subscribe(translations => {
        this.createRoomBtnLabel = translations['create_room_btn'];
      });

    this.searchCondition = {
      fieldName: 'is_group',
      operator: '==',
      value: true
    } as Condition;
  }

}
