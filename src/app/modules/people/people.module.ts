import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import {UsersOverviewComponent} from "./views/users-overview/users-overview.component";
import {UserProfileComponent} from "./views/user-profile/user-profile.component";
import {ProfileHeaderComponent} from "../../shared/components/profile-header/profile-header.component";
import {
  ProfileInformationItemComponent
} from "../../shared/components/profile-information-item/profile-information-item.component";
import {SharedModule} from "../../shared/shared.module";
import { ProfileEditComponent } from './views/profile-edit/profile-edit.component';
import { EditProfileFormComponent } from './components/edit-profile-form/edit-profile-form.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    UsersOverviewComponent,
    UserProfileComponent,
    ProfileEditComponent,
    EditProfileFormComponent
  ],
    imports: [
        CommonModule,
        PeopleRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class PeopleModule { }
