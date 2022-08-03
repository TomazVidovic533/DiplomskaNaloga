import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';

import { ChatroomComponent} from "./views/chatroom/chatroom.component";

import { MessageComponent } from './components/custom-components/message/message.component';
import { SendMessagePanelComponent } from './components/custom-components/send-message-panel/send-message-panel.component';
import { CallPanelComponent } from './components/custom-components/call-panel/call-panel.component';
import { RoomListItemComponent } from './components/custom-components/room-list-item/room-list-item.component';
import { ChatroomWrapperComponent } from './components/layout/chatroom-wrapper/chatroom-wrapper.component';
import { ChatroomChatContainerComponent } from './components/layout/chatroom-chat-container/chatroom-chat-container.component';
import { ChatroomRoomContainerComponent } from './components/layout/chatroom-room-container/chatroom-room-container.component';
import { ChatroomMessageWindowComponent } from './components/layout/chatroom-message-window/chatroom-message-window.component';
import { CallControlPanelComponent } from './components/custom-components/call-control-panel/call-control-panel.component';
import { CallContainerComponent } from './components/layout/call-container/call-container.component';
import { CallroomComponent } from './views/callroom/callroom.component';
import { CallWindowsHolderComponent } from './components/layout/call-windows-holder/call-windows-holder.component';
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {LucideAngularModule} from "lucide-angular";
import { ChatViewComponent } from './views/chat-view/chat-view.component';
import { FileDropDirective } from './directive/file-drop.directive';
import {ShortenTextPipe} from "./pipes/shorten-pipe";



@NgModule({
  declarations: [
    ChatroomComponent,
    MessageComponent,
    SendMessagePanelComponent,
    CallPanelComponent,
    RoomListItemComponent,
    ChatroomWrapperComponent,
    ChatroomChatContainerComponent,
    ChatroomRoomContainerComponent,
    ChatroomMessageWindowComponent,
    CallControlPanelComponent,
    CallContainerComponent,
    CallroomComponent,
    CallWindowsHolderComponent,
    ChatViewComponent,
    FileDropDirective,
    ShortenTextPipe
  ],
  imports: [
    SharedModule,
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    LucideAngularModule
  ]
})
export class ChatModule { }
