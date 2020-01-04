import { Injectable } from '@angular/core';

import { UsersService } from '../services/users.service';
import { ValidUsersService } from '../services/valid-users.service';
import { User } from '../models/user.model';

import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { ValidUser } from '../models/valid-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser;
  users$: Observable<DocumentChangeAction<User>[]>;
  verified: boolean;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public currentUserDocId: Observable<string>;

  constructor(
    public afAuth: AngularFireAuth,
    public usersService: UsersService,
    public validUsersService: ValidUsersService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getLoggedInUser() {
    return this.afAuth.authState;
  }

  isUserVerified(): boolean {
    this.getLoggedInUser().subscribe(loggedIn => {
      if (loggedIn) {
        this.usersService.getUsers('uid', loggedIn.uid).subscribe(user => {
          if (user[0].payload.doc.data().pinVerified) {
            return true;
          }
        });
      }
    });
    return false;
  }

  // doFacebookLogin() {
  //   const provider = new auth.FacebookAuthProvider();
  //   return this.oAuthLogin(provider);
  // }

  // doGoogleLogin() {
  //   const provider = new auth.GoogleAuthProvider();
  //   // provider.addScope('profile');
  //   // provider.addScope('email');
  //   return this.oAuthLogin(provider);
  // }

  // private oAuthLogin(provider) {
  //   return new Promise<any>((resolve, reject) =>
  //     this.afAuth.auth.signInWithPopup(provider).then(
  //       credentials => {
  //         this.loggedInUser = this.usersService.getUsers('uid', credentials.user.uid).pipe(first());
  //         this.loggedInUser.subscribe(loggedInUser => {
  //           if (!loggedInUser[0]) {
  //             this.createNewUser(credentials);
  //           }
  //         });
  //         resolve(credentials);
  //       },
  //       err => {
  //         console.log(err);
  //         reject(err);
  //       }
  //     )
  //   );
  // }

  private createNewUser(credentials, validUser) {
    const newUser: User = {
      uid: credentials.user.uid,
      email: credentials.user.email,
      firstName: validUser.payload.doc.data().firstName,
      lastName: validUser.payload.doc.data().lastName,
      middleInitial: validUser.payload.doc.data().middleInitial,
      rank: validUser.payload.doc.data().rank,
      nickname: validUser.payload.doc.data().nickname,
      hometownCity: validUser.payload.doc.data().hometownCity,
      hometownState: validUser.payload.doc.data().hometownState,
      school: validUser.payload.doc.data().school,
      emailPrivate: false,
      registered: true,
      pinVerified: false
    };
    this.usersService.createUser(newUser);
    this.updateUser(newUser);
    this.validUsersService.updateUserData(credentials.user.email, validUser.payload.doc.id);
  }

  doRegister(value, validUser: DocumentChangeAction<ValidUser>) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password).then(
        credentials => {
          this.createNewUser(credentials, validUser);
          resolve(credentials);
        },
        err => reject(err)
      );
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password).then(
        credentials => {
          this.usersService.getUsers('uid', credentials.user.uid).subscribe(user => {
            this.updateUser(user[0].payload.doc.data());
          });
          resolve(credentials);
        },
        err => reject(err)
      );
    });
  }

  updateUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  doLogout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return this.afAuth.auth.signOut();
  }
}
