import {Injectable, OnInit} from '@angular/core';
import {auditTime, BehaviorSubject, filter, first, Observable, of, switchMap, take, tap} from "rxjs";
import {LoggedUser, User} from "../../../core/models/user.model";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UsersService} from "../../people/services/users.service";
import {Router} from "@angular/router";
import {GoogleAuthProvider} from 'firebase/auth';
import {FilesService} from "../../../shared/services/files.service";
import {AngularFireFunctions} from "@angular/fire/compat/functions";


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  // @ts-ignore
  user$!: Observable<firebase.User>;
  // @ts-ignore
  data$!: firebase.User;
  // @ts-ignore
  userId$!: string;

  constructor(private usersService: UsersService,
              private fireAuth: AngularFireAuth,
              private functions: AngularFireFunctions,
              private router: Router,
              private filesService: FilesService) {
    this.user$ = this.fireAuth.user;
    this.fireAuth.authState.subscribe(user => {
      if(user) {
        this.userId$ = user.uid;
      }
    });
  }

  getUserId() {
    return this.fireAuth.authState;
  }

  getUserData(){
    return this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.usersService.get(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }

  isLoggedIn() {
    return this.fireAuth.authState.pipe(first())
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password).then(res => {
      this.router.navigate(['/app/home'])
      return res;
    }).catch(err => {
        return err.message;
      });
  }

  signUpWithEmailAndPassword(userData: User, password: string, file: File) {
    return this.fireAuth
      .createUserWithEmailAndPassword(<string>userData.email, password).then((userCredential) => {
        this.usersService.update(userData,<string>userCredential.user?.uid);
        if(file){
          this.filesService.uploadProfilePhoto(file, userData, userCredential.user?.uid);
        }
        this.signInWithEmailAndPassword(userData.email, password).then(r => {
          this.resendVerificationEmail();
        });
      })
      .catch((error) => {
        console.log(error)
      });
  }

  resendVerificationEmail() {
    this.fireAuth.currentUser.then((user) => {
      user?.sendEmailVerification().then(() => {
        this.router.navigate(['auth/resend-verification']);
      });
    })
  }

  forgotPassword(email: string) {
    this.fireAuth.sendPasswordResetEmail(email).then(() => {
      window.alert('Password reset email sent, check your inbox.');
    },(err)=>{
      window.alert(err);
    })
  }


  async signInWithGoogle() {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider()).then((res) => {
      if (res.user?.emailVerified == false) {
        this.resendVerificationEmail();
      } else {
        this.router.navigate(['app/home']);
      }
    })
      .catch((error) => {
      });
  }

  logOut() {
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['auth/sign-in'])
    });
  }

  deleteAccount(){
    this.fireAuth.authState.subscribe((user)=>{
      user?.delete();
    })
  }

}
