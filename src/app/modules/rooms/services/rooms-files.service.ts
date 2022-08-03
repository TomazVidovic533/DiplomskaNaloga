import { Injectable } from '@angular/core';
import {FirestoreService} from "../../../core/services/firestore.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {UploadFile} from "../../../core/models/file.model";
import {combineLatest, map, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomsFilesService extends FirestoreService<UploadFile>{

  constructor(private firestore: AngularFirestore, private router: Router) {
    super("rooms_files", firestore);
  }

  getSharedFilesInRoom(roomId: string){
    return this.firestore
      .collection('rooms_files')
      .doc(roomId)
      .collection('files')
      .snapshotChanges()
      .pipe(
        map((documents: any[]) => documents.map((doc) => ({...doc.payload.doc.data(), ...{id: doc.payload.doc.id}}))),
        switchMap((roomFiles: any[]) => {
          const roomFiles$ = roomFiles.map((file) =>
            this.firestore
              .collection(`files`).doc(file.id)
              .valueChanges()
          );
          return combineLatest([of(roomFiles), combineLatest(roomFiles$.length ? roomFiles$ : [of([])])]);
        }),
        map(([roomFiles, fileData]) =>
          roomFiles.map((r, i) => {
            r.fileData = fileData[i];
            return r;
          })
        )
      );
  }


  removeFileFromRoom(roomId: string, fileId: string){
    this.deleteSubCollectionDocument(roomId,'files', fileId);
    this.firestore.collection('files').doc(fileId).delete();
  }
}
