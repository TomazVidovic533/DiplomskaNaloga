import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataObjectItem} from "../../models/data-object-item";
import {Observable} from "rxjs";

@Component({
  selector: 'app-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.css']
})
export class GridCardComponent<T extends DataObjectItem>  implements OnInit {

  @Input() dataObject!: T;
  @Output() gridItemSelected: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  triggerItemSelected(clickedEntry: MouseEvent, id: string | undefined) {
    this.gridItemSelected.emit([clickedEntry, id]);
  }
}
