import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppViewComponent } from './views/app-view/app-view.component';
import {LucideAngularModule} from "lucide-angular";
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    AppViewComponent,
    NavbarComponent
  ],
    imports: [
        CommonModule,
        AppRoutingModule,
        LucideAngularModule,
        SharedModule
    ]
})
export class AppModule { }
