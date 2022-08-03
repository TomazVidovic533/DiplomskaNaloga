import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataObjectItem} from "../../models/data-object-item";
import {Observable} from "rxjs";

@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.css']
})
export class GridviewComponent<T extends DataObjectItem> implements OnInit {

  @Input() dataSource!: Observable<T[]>;
  @Output() gridItemClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  gridItemSelected(clickedEntry: MouseEvent, id: string | undefined){
    this.gridItemClicked.emit([clickedEntry, id]);
  }

}
