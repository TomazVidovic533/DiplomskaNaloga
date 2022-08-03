import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import {GridviewComponent} from "./components/gridview/gridview.component";
import {SearchSectionComponent} from "./components/search-section/search-section.component";
import {GridCardComponent} from "./components/grid-card/grid-card.component";
import {RouterModule} from "@angular/router";
import {ProfileHeaderComponent} from "./components/profile-header/profile-header.component";
import {
  ProfileInformationItemComponent
} from "./components/profile-information-item/profile-information-item.component";
import { CustomFormInputTextComponent } from './components/custom-form-input-text/custom-form-input-text.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustomFileUploadComponent } from './components/custom-file-upload/custom-file-upload.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { SearchViewComponent } from './components/search-view/search-view.component';
import {TranslateModule} from "@ngx-translate/core";
import { TableViewComponent } from './components/table-view/table-view.component';
import { TableItemComponent } from './components/table-item/table-item.component';
import { HorizontalGridviewComponent } from './components/horizontal-gridview/horizontal-gridview.component';
import { NotificationsPanelComponent } from './components/notifications-panel/notifications-panel.component';
import { NotificationItemComponent } from './components/notification-item/notification-item.component';
import { ErrorFormNotificationComponent } from './components/error-form-notification/error-form-notification.component';

@NgModule({
  declarations: [
    GridviewComponent,
    SearchSectionComponent,
    GridCardComponent,
    ProfileHeaderComponent,
    ProfileInformationItemComponent,
    CustomFormInputTextComponent,
    CustomFileUploadComponent,
    CustomButtonComponent,
    SearchViewComponent,
    TableViewComponent,
    TableItemComponent,
    HorizontalGridviewComponent,
    NotificationsPanelComponent,
    NotificationItemComponent,
    ErrorFormNotificationComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        LucideAngularModule.pick({}),
        FormsModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    exports: [
        GridviewComponent,
        SearchSectionComponent,
        GridCardComponent,
        ProfileInformationItemComponent,
        ProfileHeaderComponent,
        CustomFormInputTextComponent,
        CustomFileUploadComponent,
        CustomButtonComponent,
        SearchViewComponent,
        TranslateModule,
        TableItemComponent,
        TableViewComponent,
        HorizontalGridviewComponent,
        NotificationsPanelComponent,
        ErrorFormNotificationComponent
    ]
})
export class SharedModule { }
