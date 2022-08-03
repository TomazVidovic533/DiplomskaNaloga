import {DataObjectItem} from "../../shared/models/data-object-item";
import {Timestamp} from "@angular/fire/firestore";

export interface User extends DataObjectItem{
  id?: string;
  username?: string;
  name?: string;
  email: string;
  created_at?: Timestamp,
  gender?: string;
  language?:string;
  is_verified?: boolean;
  password?:string;
  avatar?: string;
  is_pro_member?: boolean;
  bio?: string;
}

export interface LoggedUser{
  id?: string;
  name?: string | null;
  email?: string | null;
  photoUrl?: string | null;
}
