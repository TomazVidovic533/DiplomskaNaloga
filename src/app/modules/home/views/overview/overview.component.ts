import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../../auth/services/auth.service";
import {take} from "rxjs";
import {FilesService} from "../../../../shared/services/files.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(private translateService: TranslateService, private authService: AuthService, private filesService: FilesService) {
  }

  ngOnInit(): void {

    this.authService.getUserData().pipe(take(1)).subscribe((userData) => {

      if (userData?.language == 'English') {
        this.translateService.use('en');
      } else if (userData?.language == 'Slovene') {
        this.translateService.use('si')
      }
    })
  }

  download() {
    this.filesService.downloadFile();
  }


}
