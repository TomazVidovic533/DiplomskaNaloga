import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IncomingCall} from "../../../core/models/incoming-call.model";

@Component({
  selector: 'app-notifications-panel',
  templateUrl: './notifications-panel.component.html',
  styleUrls: ['./notifications-panel.component.css']
})
export class NotificationsPanelComponent implements OnInit {
  @Input() dataSource$!: Observable<IncomingCall[]>;

  constructor() { }

  ngOnInit(): void {

  }
}
