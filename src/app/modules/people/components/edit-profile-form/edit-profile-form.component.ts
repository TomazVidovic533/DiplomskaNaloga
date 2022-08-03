import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../core/models/user.model";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";
import {take} from "rxjs";
import {UsersService} from "../../services/users.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css']
})
export class EditProfileFormComponent implements OnInit {

  @Input() userData!: User;
  editUserForm!: FormGroup;
  languageOptions: string[] = ['Slovene', 'English'];
  genderOptions: string[] = ['Male', 'Female'];


  editUserLabel!: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private usersService: UsersService,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.authService.getUserData().pipe().subscribe((user) => {
      if (user?.language == 'Slovene') {
        this.translateService.use('si');
      } else if (user?.language == 'English') {
        this.translateService.use('en');
      }
    })

    this.translateService.get(['edit_room_string'])
      .subscribe(translations => {
        this.editUserLabel = translations['edit_profile_string'];
      });

    this.editUserForm = this.formBuilder.group({
      name: new FormControl(this.userData.name, [Validators.required, Validators.maxLength(30)]),
      username: new FormControl(this.userData.username, [Validators.required, Validators.maxLength(18)]),
      gender: new FormControl(this.userData.gender, [Validators.required]),
      language: new FormControl(this.userData.language, [Validators.required]),
      bio: new FormControl(this.userData.bio, [Validators.required, Validators.maxLength(150)]),
    });
  }

  editUser(event: Event) {
    let editedData = {
      name: this.editUserForm.get('name')?.value,
      username: this.editUserForm.get('username')?.value,
      gender: this.editUserForm.get('gender')?.value,
      language: this.editUserForm.get('language')?.value,
      bio: this.editUserForm.get('bio')?.value
    } as User;

    if (this.userData.language == 'English') {
      this.translateService.use('en');
    } else if (this.userData.language == 'Slovene') {
      this.translateService.use('si')
    }

    this.authService.getUserData().pipe(take(1)).subscribe((user) => {
      this.usersService.update(editedData, <string>user?.id);
      this.router.navigate(['/app/profile/' + <string>user?.id]);
    })
  }

  invalid($event: Event) {

  }
}
