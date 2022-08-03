import { Timestamp } from '@angular/fire/firestore';

export interface Message {
  id?:string;
  created_at?: Timestamp;
  sent_by?: string;
  message?: string;
  fileId?: string;
}

export interface MappedMessage {
  messageData: Message,
  userData: any
}
