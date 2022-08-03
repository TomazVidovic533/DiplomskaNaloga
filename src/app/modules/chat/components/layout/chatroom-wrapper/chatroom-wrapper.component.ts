import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chatroom-wrapper',
  templateUrl: './chatroom-wrapper.component.html',
  styleUrls: ['./chatroom-wrapper.component.css']
})
export class ChatroomWrapperComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {

  }

}
