import {Component, Input, OnInit} from '@angular/core';
import {CallService} from "../../../modules/chat/services/call.service";
import {AuthService} from "../../../modules/auth/services/auth.service";
import {take} from "rxjs";
import {IncomingCall} from "../../../core/models/incoming-call.model";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent implements OnInit {

  @Input() item!: IncomingCall;

  constructor(private callService: CallService,
              private authService: AuthService) {

  }

  ngOnInit(): void {
  }

  denyCall(callId: string,id: string) {

    this.authService.getUserData().pipe(take(1)).subscribe((userData)=>{
      if(userData){
        // @ts-ignore
        this.callService.denyCallOffer(userData.id, id)
      }
    })
  }

  acceptCall(callId: string, id:string) {

    this.authService.getUserData().pipe(take(1)).subscribe((userData)=>{
      if(userData){
        // @ts-ignore
        this.callService.acceptCallOffer(callId,userData.id, id)
      }
    })
  }
}
