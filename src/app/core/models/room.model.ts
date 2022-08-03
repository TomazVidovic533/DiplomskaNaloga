import {Timestamp} from "@angular/fire/firestore";

export interface Room {
  id?: string;
  name?: string;
  bio?: string;
  is_private?: boolean;
  created_at?: Timestamp;
  is_group?: boolean;
  recent_message?: string;
  owner?: string;
  avatar?:string;
}

export interface MappedRoom {
  user_id?: string;
  name?: string;
  bio?: string;
  is_private?: boolean;
  created_at?: Timestamp;
  is_group?: boolean;
  recent_message?: string;
  owner?: string;
  avatar?:string;
  roomData: Room;
}

export interface RoomItem{
  id?: string;
  room_id?: string;
  user_id?: string;
  name?: string;
  avatar?: string;
  recent_message?: string;
}
