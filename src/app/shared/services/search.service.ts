import {Injectable} from '@angular/core';
import {FirestoreService} from "../../core/services/firestore.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {DataObjectItem} from "../models/data-object-item";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService extends FirestoreService<DataObjectItem> {
  searchResults$!: Observable<DataObjectItem[]>;

  constructor(private firestore: AngularFirestore) {
    super("users", firestore);
  }

  queryString(fieldName: string, queryString: string) {

  }

  getSearchResults() {
    return this.searchResults$;
  }
}

