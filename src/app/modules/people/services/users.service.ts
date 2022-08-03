import {Injectable} from '@angular/core';
import {FirestoreService} from "../../../core/services/firestore.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../../../core/models/user.model";
import {combineLatest, map, Observable, of, switchMap} from "rxjs";


@Injectable({providedIn: 'root'})
export class UsersService extends FirestoreService<User> {
  constructor(private firestore: AngularFirestore) {
    super("users", firestore);
  }

  getRoomsOfUser(userId: string | undefined): Observable<any> {
    return this.firestore
      .collection('users')
      .doc(userId)
      // samo za public sobe
      .collection('rooms', ref => ref.where('is_group', '==', true))
      .snapshotChanges()
      .pipe(
        map((documents: any[]) => documents.map((doc) => ({...doc.payload.doc.data(), ...{id: doc.payload.doc.id}}))),
        switchMap((rooms: any[]) => {
          const rooms$ = rooms.map((room) =>
            this.firestore
              .collection(`rooms`).doc(room.id)
              .valueChanges()
          );
          // ustvarimo observable iz arraya rooms, združimo posamezne v en oservable, če sploh ostajajo, če ne empty array
          return combineLatest([of(rooms), combineLatest(rooms$.length ? rooms$ : [of([])])]);
        }),
        // mapiramo podatke
        map(([rooms, roomData]) =>
          rooms.map((p, idx) => {
            p.roomData = roomData[idx];
            return p;
          })
        )
      );
  }

  getUsersContacts(userId: string | undefined): Observable<any> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('contacts')
      .snapshotChanges()
      .pipe(
        map((documents: any[]) => documents.map((doc) => ({...doc.payload.doc.data(), ...{id: doc.payload.doc.id}}))),
        switchMap((contacts: any[]) => {
          const contacts$ = contacts.map((contact) =>
            this.firestore
              .collection(`users`).doc(contact.id)
              .valueChanges()
          );
          return combineLatest([of(contacts), combineLatest(contacts$.length ? contacts$ : [of([])])]);
        }),
        map(([contacts, userData]) =>
          contacts.map((p, i) => {
            p.userData = userData[i];
            return p;
          })
        )
      );
  }
}
