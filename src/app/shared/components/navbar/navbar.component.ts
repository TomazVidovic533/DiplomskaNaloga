import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Boxes, Home, MessageCircle, Users, Menu, LogOut, UserCog} from 'lucide-angular';
import {AuthService} from "../../../modules/auth/services/auth.service";
import {Observable} from "rxjs";
import {User} from "../../../core/models/user.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isOpenedOnMobile:boolean=true;

  home=Home;
  profile=UserCog;
  chat=MessageCircle;
  people=Users;
  community=Boxes;
  menu=Menu;
  logout=LogOut;

  // @ts-ignore
  userId!: Observable<firebase.User>;

  userData$!: Observable<User|null>;
  profilePath!: string;


  constructor(private elRef: ElementRef,
              private renderer: Renderer2,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.userId=this.authService.user$;
    this.userId.subscribe();

    this.userData$=this.authService.getUserData();
    this.userData$.subscribe((res)=>{
      this.profilePath="profile/"+res?.id;
    });
  }

  toggleMenu(){
    this.isOpenedOnMobile = !this.isOpenedOnMobile;
  }

  logOut(){
    this.authService.logOut();
  }

}
