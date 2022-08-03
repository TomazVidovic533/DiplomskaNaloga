import {ChangeDetectorRef, Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {switchMap} from "rxjs";
import {AuthService} from "./modules/auth/services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatster-angular-app';

  constructor(private _changeDetectorRef: ChangeDetectorRef, private translate: TranslateService) {
    translate.addLangs(['en', 'si']);
    this.translate.onLangChange.subscribe((language)=>{
      this.translate.use(language.lang);
      this._changeDetectorRef.detectChanges();
    })
  }


}
