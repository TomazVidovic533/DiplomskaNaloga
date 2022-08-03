import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup,} from "@angular/forms";
import { debounceTime, Observable, startWith,  Subscription, switchMap} from "rxjs";
import {SearchService} from "../../services/search.service";
import {DataObjectItem} from "../../models/data-object-item";
import {Condition} from "../../../core/models/condition";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {
  @Input() collectionName!: string;
  @Input() redirectItemPath!: string;
  @Input() condition!: Condition;

  queryResults$!: Observable<DataObjectItem[]>;
  private subscription = new Subscription();

  searchForm!: FormGroup;
  searchInputLabel!: string;

  constructor(private formBuilder: FormBuilder,
              private searchService: SearchService,
              private translateService: TranslateService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
      queryString: new FormControl('', []),
    });

    this.translateService.get(['search_' + this.collectionName])
      .subscribe(translations => {
        this.searchInputLabel=translations['search_' + this.collectionName];
      });

    // @ts-ignore
    this.queryResults$ = this.searchForm.get('queryString').valueChanges.pipe(
      startWith(''),
      debounceTime(350),
      switchMap(queryString => {
        if (!this.condition) {
          return this.searchService.search(this.collectionName, 'name', queryString)
        }
        return this.searchService.searchWhere(this.collectionName, 'name', queryString, this.condition);
      }));

    this.subscription.add(this.queryResults$.subscribe());
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  itemSelected(eventClicked: Event, itemId: string) {
    this.router.navigate(['/app/'+this.redirectItemPath+'/'+itemId])
  }
}
