import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.css']
})
export class TableItemComponent implements OnInit {

  @Input()  id!: string;
  @Input()  name!: string;
  @Input()  avatar!: string;
  @Input()  url!: string;
  @Input()  isOwner!: boolean;
  @Input()  redirectPath!: string;
  @Output() onDeleteTriggered: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deleteClicked(clickedEntry: Event, id: string){
    this.onDeleteTriggered.emit([clickedEntry, id]);
  }

}
