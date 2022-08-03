import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersOverviewComponent} from "./views/users-overview/users-overview.component";
import {UserProfileComponent} from "./views/user-profile/user-profile.component";
import {ProfileEditComponent} from "./views/profile-edit/profile-edit.component";

const routes: Routes = [
  {
    path: '', component: UsersOverviewComponent
  },
  {
    path: ':userId', component: UserProfileComponent
  },
  {
    path: ':userId/edit', component: ProfileEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule {
}
