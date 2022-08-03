import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";

@Component({
  selector: 'app-error-form-notification',
  templateUrl: './error-form-notification.component.html',
  styleUrls: ['./error-form-notification.component.css']
})
export class ErrorFormNotificationComponent implements OnInit {

  @Input() formControlInput!: AbstractControl | null;
  @Input() inputLabel!: string;

  constructor() { }

  ngOnInit(): void {

  }

}
