import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomsOverviewComponent} from "./views/rooms-overview/rooms-overview.component";
import {RoomProfileComponent} from "./views/room-profile/room-profile.component";
import {RoomEditComponent} from "./views/room-edit/room-edit.component";
import {RoomCreateComponent} from "./views/room-create/room-create.component";

const routes: Routes = [
  {
  path: '', component: RoomsOverviewComponent
},
  {
    path: 'add', component: RoomCreateComponent
  },
  {
    path: ':roomId', component: RoomProfileComponent
  },
  {
    path: ':roomId/edit', component: RoomEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule {
}
