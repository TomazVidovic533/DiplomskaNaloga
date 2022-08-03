import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

  @Input() avatar!: string | undefined;
  @Input() fullName!: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
