import {map, Observable, publishReplay, refCount, shareReplay} from "rxjs";

import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Condition} from "../models/condition";
import {CollectionItem} from "../models/collection-item.model";

export class FirestoreService<T extends CollectionItem> {
  protected collection: AngularFirestoreCollection<T>;

  constructor(protected uri: string, protected afs: AngularFirestore) {
    this.collection = this.afs.collection(this.uri);
  }

  search(collectionName: string, fieldName: string, query: string): Observable<T[]> {
    if (query === '') {
      return this.list();
    }
    return this.afs
      .collection(collectionName, ref => ref.orderBy(fieldName)
        .startAt(query)
        .endAt(query + '\uf8ff'))
      .snapshotChanges()
      .pipe(
        shareReplay(1),
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as T;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  searchWhere(collectionName: string, fieldName: string, query: string, condition: Condition): Observable<T[]> {
    return this.afs
      .collection(collectionName, ref => ref.orderBy(fieldName)
        // @ts-ignore
        .where(condition.fieldName, condition.operator, condition.value)
        .startAt(query)
        .endAt(query + '\uf8ff'))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as T;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  get(id: string): Observable<T> {
      return this.collection
        .doc<T>(id)
        .snapshotChanges()
        .pipe(
          map(doc => {
            if (doc.payload.exists) {
              const data = doc.payload.data() as any;
              const id = doc.payload.id;
              return {id, ...data};
            }
          })
        );
  }

  getSubCollectionDocument(documentId: string, collectionId: string, collectionDocumentId: string): Observable<T> {
    return this.collection.doc(documentId).collection(collectionId).doc(collectionDocumentId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          if (doc.payload.exists) {
            const data = doc.payload.data() as any;
            const id = doc.payload.id;
            return {id, ...data};
          }
        })
      );
  }


  list(): Observable<T[]> {
      return this.collection
        .snapshotChanges()
        .pipe(
          map(changes => {
            return changes.map(a => {
              const data = a.payload.doc.data() as T;
              data.id = a.payload.doc.id;
              return data;
            });
          })
        );
    }


  listWhere(fieldName: string, operator: string, value: any): Observable<T[]> {
    // @ts-ignore
    return this.afs.collection(this.uri, ref => ref.where(fieldName, operator, value))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as T;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  listSubCollection(documentId: string, collectionId: string): Observable<T[]> {
    return this.collection.doc(documentId).collection(collectionId)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as T;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  add(item: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.collection.add(item).then(ref => {
        const newItem = {
          id: ref.id,
          ...(item as any)
        };
        resolve(newItem);
      });
    });
  }

  addSubCollectionDocument(documentId: string, collectionId: string, item: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.collection.doc(documentId).collection(collectionId).add(item).then(ref => {
        const newItem = {
          id: ref.id,
          ...(item as any)
        };
        resolve(newItem);
      });
    });
  }


  update(item: T, id: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.collection
        .doc<T>(id)
        .update(item)
        .then(() => {
          resolve({
            ...(item as any)
          });
        });
    });
  }

  updateSubCollectionDocument(documentId: string, collectionId: string, subCollectionDocumentId: string, item: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.collection.doc(documentId).collection(collectionId)
        .doc<T>(subCollectionDocumentId)
        .update(item)
        .then(() => {
          resolve({
            ...(item as any)
          });
        });
    });
  }

  setSubCollectionDocument(documentId: string, collectionId: string, subCollectionDocumentId: string, item: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.collection.doc(documentId).collection(collectionId)
        .doc<T>(subCollectionDocumentId)
        .set(item)
        .then(() => {
          resolve({
            ...(item as any)
          });
        });
    });
  }

  delete(id: string): void {
    this.collection.doc<T>(id).delete();
  }

  deleteSubCollectionDocument(documentId: string, collectionId: string, subCollectionDocumentId: string): void {
    this.collection.doc(documentId).collection(collectionId).doc<T>(subCollectionDocumentId).delete();
  }
}
