import {Injectable} from '@angular/core';
import {FirestoreService} from "../../../core/services/firestore.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Call} from "../../../core/models/call.model";
import {Router} from "@angular/router";
import {combineLatest, map, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CallService extends FirestoreService<Call> {

  constructor(private firestore: AngularFirestore,
              private router: Router) {
    super("calls", firestore);
  }

  createNewCallRoom(myId: string, calleeId: string) {
    this.add({creatorId: myId, calleeId: calleeId, status: 'waiting'}).then((newCallReference) => {
      if (newCallReference.id) {
        this.sendCallNotification(myId, calleeId, newCallReference.id);
      }
      this.router.navigate(['/app/chat/call/' + newCallReference.id]);
    })
  }

  sendCallNotification(callerId: string, calleeId: string, callId: string) {
    this.firestore.collection('call_invitations').doc(calleeId).collection('calls').doc(callerId).set({
      callId: callId
    })
  }

  acceptCallOffer(callId: string, userId: string, id:string) {
    this.firestore.collection('call_invitations').doc(userId).collection('calls').doc(id).delete();
    this.router.navigate(['/app/chat/call/' + callId]);
  }

  denyCallOffer(userId: string, id:string) {
    this.firestore.collection('call_invitations').doc(userId).collection('calls').doc(id).delete();
  }

  getIncomingCalls(userId: string) {
    return this.firestore.collection('call_invitations')
      .doc(userId)
      .collection('calls')
      .snapshotChanges()
      .pipe(
        map((data: any[]) => data.map((document) => ({
            ...document.payload.doc.data(),
            ...{id: document.payload.doc.id}
          }))
        ),
        switchMap((calls: any[]) => {
          const membersData$ = calls.map((call) =>
            this.firestore.collection(`users`).doc(call.id).valueChanges()
          );
          return combineLatest([
            of(calls),
            combineLatest(membersData$.length ? membersData$ : [of([])])
          ]);
        }),
        map(([messages, userData]: [any[], any]) =>
          messages.map((message, i) => {
            return {
              callData: message,
              userData: userData[i]
            };
          })
        )
      );
  }
}
