import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RoomService} from "../../services/room.service";
import {Room} from "../../../../core/models/room.model";
import {AuthService} from "../../../auth/services/auth.service";
import {Observable, take} from "rxjs";
import {User} from "../../../../core/models/user.model";
import {FilesService} from "../../../../shared/services/files.service";
import {Router} from "@angular/router";
import {Timestamp} from "@angular/fire/firestore";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-create-room-form',
  templateUrl: './create-room-form.component.html',
  styleUrls: ['./create-room-form.component.css']
})
export class CreateRoomFormComponent implements OnInit {

  createRoomForm!: FormGroup;
  isPrivateOptions: string[] = [];
  userData$!: Observable<User | null>;

  constructor(private formBuilder: FormBuilder,
              private roomService: FilesService,
              private authService: AuthService,
              private router: Router,
              private translateService: TranslateService) {
  }

  nameLabel!: string;
  privateRoomLabel!: string;
  publicRoomLabel!: string;
  bioLabel!: string;
  chooseAvatarLabel!: string;
  createRoomBtnLabel!: string;
  createRoomStringLabel!: string;
  errors: any;

  ngOnInit(): void {

    this.translateService.get([
      'profile.created_at',
      'profile.bio',
      'profile.name',
      'profile.username',
      'profile.email',
      'profile.gender',
      'profile.language',
      'profile.private_room',
      'profile.public_room',
      'profile.pro',
      'create_room_btn',
      'create_room_string'])
      .subscribe(translations => {
        this.bioLabel = translations['profile.bio'];
        this.nameLabel = translations['profile.name'];
        this.chooseAvatarLabel = translations['avatar_btn'];
        this.isPrivateOptions.push(translations['profile.public_room']);
        this.isPrivateOptions.push(translations['profile.private_room']);
        this.createRoomBtnLabel = translations['create_room_btn'];
        this.createRoomStringLabel = translations['create_room_string']
      });

    this.createRoomForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      avatar: new FormControl(null, [Validators.required]),
      is_private: new FormControl(this.isPrivateOptions[0], null),
      bio: new FormControl(null, [Validators.required])
    });

    this.userData$ = this.authService.getUserData();
  }

  createNewRoom(event: Event) {
    this.authService.getUserData().pipe(take(1)).subscribe((user) => {
      let newRoomData = {
        name: this.createRoomForm.get('name')?.value,
        is_private:
          (this.createRoomForm.get('is_private')?.value != 'Public room' ||
            this.createRoomForm.get('is_private')?.value != 'Javna soba'),
        is_group: true,
        recent_message: '',
        owner: user?.id,
        bio: this.createRoomForm.get('bio')?.value,
        created_at: Timestamp.now(),
      } as Room;

      if (user) {
        this.roomService.uploadRoomProfilePhoto(newRoomData, this.createRoomForm.get('avatar')?.value, user);
      }

      this.router.navigate(['/app/rooms']);
    })
  }

  invalid($event: Event) {

  }
}
