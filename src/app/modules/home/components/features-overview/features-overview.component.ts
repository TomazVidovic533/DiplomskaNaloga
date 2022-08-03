import { Component, OnInit } from '@angular/core';
import {FileAudio, MessageCircle, Search} from "lucide-angular";


@Component({
  selector: 'app-features-overview',
  templateUrl: './features-overview.component.html',
  styleUrls: ['./features-overview.component.css']
})
export class FeaturesOverviewComponent implements OnInit {
  chats=MessageCircle;
  search=Search;
  call=FileAudio;

  constructor() { }

  ngOnInit(): void {
  }

}
