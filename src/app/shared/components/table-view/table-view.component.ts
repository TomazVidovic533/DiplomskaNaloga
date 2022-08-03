import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {TableDataItem} from "../../../core/models/table-data-item.model";
import {Eye, ListPlus, Trash2} from "lucide-angular";

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent<T extends TableDataItem> implements OnInit {
  @Input() title!: string;
  @Input() contentHeader!: string;
  @Input() nameHeader!: string;
  @Input() viewActionHeader!: string;
  @Input() reactionActionHeader!: string;
  @Input() deleteActionHeader!: string;
  @Input() itemType!: string;
  @Input() isOwner!: boolean;
  @Input() dataSource$!: Observable<T[]>

  @Output() onDeleteTriggered: EventEmitter<any> = new EventEmitter();
  @Output() onAcceptTriggered: EventEmitter<any> = new EventEmitter();
  @Output() onViewTriggered: EventEmitter<any> = new EventEmitter();


  view = Eye;
  trash = Trash2;
  accept=ListPlus


  constructor() {
  }

  ngOnInit(): void {

  }

  deleteClicked(clickedEntry: Event, id: string | undefined): void {
    this.onDeleteTriggered.emit([clickedEntry, id]);
  }

  acceptClicked(clickedEntry: MouseEvent, id: string | undefined) {
    this.onAcceptTriggered.emit([clickedEntry, id]);
  }

  viewClicked(clickedEntry: MouseEvent, id: string | undefined) {
    this.onViewTriggered.emit([clickedEntry, id]);
  }
}
