import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsOverviewComponent } from './views/rooms-overview/rooms-overview.component';

import {SharedModule} from "../../shared/shared.module";
import { RoomProfileComponent } from './views/room-profile/room-profile.component';
import { RoomEditComponent } from './views/room-edit/room-edit.component';
import { CreateRoomFormComponent } from './components/create-room-form/create-room-form.component';
import { EditRoomFormComponent } from './components/edit-room-form/edit-room-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { RoomCreateComponent } from './views/room-create/room-create.component';

@NgModule({
  declarations: [
    RoomsOverviewComponent,
    RoomProfileComponent,
    RoomEditComponent,
    CreateRoomFormComponent,
    EditRoomFormComponent,
    RoomCreateComponent
  ],
    imports: [
        CommonModule,
        RoomsRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class RoomsModule { }
