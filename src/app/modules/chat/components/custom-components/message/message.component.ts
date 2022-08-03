import {Component, Input, OnInit} from '@angular/core';
import {MappedMessage, Message} from "../../../../../core/models/message.model";
import {AuthService} from "../../../../auth/services/auth.service";
import {take} from "rxjs";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() messageData!: MappedMessage;
  @Input() roomId!: string;
  @Input() myUserId!: string | undefined;


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

  }

}
