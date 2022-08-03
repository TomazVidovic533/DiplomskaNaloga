import {Timestamp} from "@angular/fire/firestore";

export interface UploadFile {
  id?: string;
  name?: string;
  path?: string;
  ownerId?: string;
  created_at?: Timestamp;
  url?: string;
}
