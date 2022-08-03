import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {OverviewComponent} from "./views/overview/overview.component";
import {SharedModule} from "../../shared/shared.module";
import { FeaturesOverviewComponent } from './components/features-overview/features-overview.component';
import { PricingOverviewComponent } from './components/pricing-overview/pricing-overview.component';
import { UserContactsShortcutComponent } from './components/user-contacts-shortcut/user-contacts-shortcut.component';
import {LucideAngularModule} from "lucide-angular";


@NgModule({
  declarations: [
    OverviewComponent,
    FeaturesOverviewComponent,
    PricingOverviewComponent,
    UserContactsShortcutComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    LucideAngularModule
  ]
})
export class HomeModule { }
