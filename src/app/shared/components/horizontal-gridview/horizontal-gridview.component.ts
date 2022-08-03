import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {DataObjectItem} from "../../models/data-object-item";

@Component({
  selector: 'app-horizontal-gridview',
  templateUrl: './horizontal-gridview.component.html',
  styleUrls: ['./horizontal-gridview.component.css']
})
export class HorizontalGridviewComponent<T extends DataObjectItem> implements OnInit {

  @Input() dataSource!: Observable<T[]>;
  @Output() gridItemClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
  }

  gridItemSelected(clickedEntry: MouseEvent, id: string | undefined){
    this.gridItemClicked.emit([clickedEntry, id]);
  }

}
