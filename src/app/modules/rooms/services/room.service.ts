import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FirestoreService} from "../../../core/services/firestore.service";
import {Room} from "../../../core/models/room.model";
import {Router} from "@angular/router";
import {combineLatest, map, of, switchMap, take} from "rxjs";
import {User} from "../../../core/models/user.model";


@Injectable({providedIn: 'root'})
export class RoomService extends FirestoreService<Room> {
  constructor(private firestore: AngularFirestore, private router: Router) {
    super("rooms", firestore);
  }

  startConversation(roomData: Room, otherUserData: User, myUserData: User) {
    this.firestore.collection('users').doc(myUserData.id)
      .collection('contacts').doc(otherUserData.id)
      .snapshotChanges().pipe(take(1)).subscribe(userContact => {
      if (userContact.payload.exists) {
        //const data = userContact.payload.data() as any;
        this.router.navigate(['/app/chat/']);
      } else {
        this.add(roomData).then((newRoomReference) => {

          if (newRoomReference.id != null) {
            this.addRoomToUser(otherUserData, newRoomReference.id, false);
            this.addRoomToUser(myUserData, newRoomReference.id, false);

            this.addUserToRoom(otherUserData, newRoomReference.id);
            this.addUserToRoom(myUserData, newRoomReference.id);

            this.addContact(myUserData, otherUserData, newRoomReference.id);
            this.addContact(otherUserData, myUserData, newRoomReference.id);
          }
          this.router.navigate(['/app/chat/' + newRoomReference.id]);
        });
      }
    });
  }

  requestAccess(roomObject: Room, myUserData: User) {
    if (roomObject.id != null && myUserData.id != null) {
      this.setSubCollectionDocument(roomObject.id, 'requests', myUserData.id, {
        id: myUserData.id
      });
    }
  }

  joinRoom(roomData: Room, user: User) {
    if (roomData.id != null) {
      this.addRoomToUser(user, roomData.id, true);
      this.addUserToRoom(user, roomData.id);
    }
    this.router.navigate(['/app/chat/' + roomData.id]);
  }

  private addRoomToUser(myUser: User, newRoomReferenceId: string, isGroup: boolean) {
    this.firestore.collection('users').doc(myUser.id).collection('rooms').doc(newRoomReferenceId).set({
      is_group: isGroup
    })
  }

  private addUserToRoom(user: User, newRoomReferenceId: string) {
    this.firestore.collection('rooms').doc(newRoomReferenceId).collection('members').doc(user.id).set({
      is_member: true
    })
  }

  private addContact(myUser: User, otherUser: User, newRoomReferenceId: string) {
    this.firestore.collection('users').doc(myUser.id).collection('contacts').doc(otherUser.id).set({
      room_id: newRoomReferenceId
    })
  }

  leaveRoom(roomId: string, userId: string) {
    this.deleteSubCollectionDocument(roomId, 'members', userId);
    this.firestore.collection('users').doc(userId).collection('rooms').doc(roomId).delete();
    this.router.navigate(['/app/chat/' + roomId]);
  }

  getPrivateRoomsRequests(roomId: string) {
    return this.firestore
      .collection('rooms')
      .doc(roomId)
      .collection('requests')
      .snapshotChanges()
      .pipe(
        map((documents: any[]) => documents.map((doc) => ({...doc.payload.doc.data(), ...{id: doc.payload.doc.id}}))),
        switchMap((requests: any[]) => {
          const requests$ = requests.map((request) =>
            this.firestore
              .collection(`users`).doc(request.id)
              .valueChanges()
          );
          return combineLatest([of(requests), combineLatest(requests$.length ? requests$ : [of([])])]);
        }),
        map(([requests, userData]) =>
          requests.map((r, i) => {
            r.userData = userData[i];
            return r;
          })
        )
      );
  }

  getRoomsMembers(roomId: string) {
    return this.firestore
      .collection('rooms')
      .doc(roomId)
      .collection('members')
      .snapshotChanges()
      .pipe(
        map((documents: any[]) => documents.map((doc) => ({...doc.payload.doc.data(), ...{id: doc.payload.doc.id}}))),
        switchMap((members: any[]) => {
          const members$ = members.map((member) =>
            this.firestore
              .collection(`users`).doc(member.id)
              .valueChanges()
          );
          return combineLatest([of(members), combineLatest(members$.length ? members$ : [of([])])]);
        }),
        map(([members, userData]) =>
          members.map((m, i) => {
            m.userData = userData[i];
            return m;
          })
        )
      );
  }

  acceptPendingRequest(roomId: string, id: string) {
    this.addRoomToUser({id: id} as User, roomId, true);
    this.addUserToRoom({id: id} as User, roomId);
    this.deleteSubCollectionDocument(roomId, 'requests', id);

  }

  deletePendingRequest(roomId: string, id: string) {
    this.deleteSubCollectionDocument(roomId, 'requests', id);
  }
}
