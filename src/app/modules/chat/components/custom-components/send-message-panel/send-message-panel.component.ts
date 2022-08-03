import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../../services/chat.service";
import {Message} from "../../../../../core/models/message.model";
import {SmilePlus} from "lucide-angular";
import {AuthService} from "../../../../auth/services/auth.service";
import {Observable, Subscription, take} from "rxjs";
import {Room} from "../../../../../core/models/room.model";
import { Timestamp } from '@angular/fire/firestore';


@Component({
  selector: 'app-send-message-panel',
  templateUrl: './send-message-panel.component.html',
  styleUrls: ['./send-message-panel.component.css']
})
export class SendMessagePanelComponent implements OnInit {

  @Input() roomId!: string | undefined;
  sendMessageForm!: FormGroup;
  roomData: any;
  smilePlus = SmilePlus;
  message!: any;
  subscription!: Subscription;

  constructor(private formBuilder: FormBuilder,
              private chatService: ChatService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscription = new Subscription();

    this.sendMessageForm = this.formBuilder.group({
      message: new FormControl(null, [Validators.required])
    });

    this.subscription.add(this.chatService.selectedRoom.subscribe());
  }

  sendMessage(event: Event) {
    this.authService.getUserData().pipe(take(1)).subscribe((myUserData) => {
      if (this.roomId != null) {
        this.chatService.sendMessageToRoom({
          created_at: Timestamp.now(),
          sent_by: myUserData?.id,
          message: this.sendMessageForm.get('message')?.value,
        } as Message, this.roomId)
      }
    })

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
