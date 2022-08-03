import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SearchService} from "../../services/search.service";
import {Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.css']
})
export class SearchSectionComponent implements OnInit {

  searchForm!: FormGroup;
  querySubmit$ = new Subject<Event>;

  constructor(private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      queryString: new FormControl(null, [Validators.required]),
    });
  }

  search(event: Event) {
    this.querySubmit$.next(event);
  }

}
