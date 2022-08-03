import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription, take} from "rxjs";
import {MappedMessage, Message} from "../../../../../core/models/message.model";
import {ChatService} from "../../../services/chat.service";
import {FilesService} from "../../../../../shared/services/files.service";
import {AuthService} from "../../../../auth/services/auth.service";

@Component({
  selector: 'app-chatroom-message-window',
  templateUrl: './chatroom-message-window.component.html',
  styleUrls: ['./chatroom-message-window.component.css']
})
export class ChatroomMessageWindowComponent implements OnInit {
  @ViewChild('scrollBar') private myScrollContainer!: ElementRef;
  @Input() chatMessages$!: Observable<MappedMessage[]>;
  @Input() roomId!: string;
  @Input() myId!: string | undefined;

  isFileOverMessageWindow!: boolean;
  files: File[] = [];

  message!: any;
  subscription: Subscription = new Subscription();

  constructor(private chatService: ChatService,
              private filesService: FilesService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscription.add(this.chatMessages$.subscribe());
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  showFileDetection(isOver: boolean) {
    this.isFileOverMessageWindow = isOver;
  }

  dropFiles(files: FileList) {
    this.authService.getUserData().pipe(take(1)).subscribe((user) => {
      for (let i = 0; i < files.length; i++) {
        console.log(files[i])
        // @ts-ignore
        this.filesService.sendFileAsMessage(files.item(i), this.roomId, user?.id);
      }
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
