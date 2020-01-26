import { Injectable } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { ValidUsersService } from '../../services/valid-users.service';
import { User, UserId } from '../../models/user.model';

import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { ValidUser, ValidUserId } from '../../models/valid-user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser;
  verified: boolean;
  redirectUrl: string;

  private currentUserSubject: BehaviorSubject<UserId>;
  public currentUser: Observable<UserId>;
  public currentUserDocId: Observable<string>;

  baseSendPinUrl = 'https://us-central1-upt-webb72.cloudfunctions.net/sendPin';

  constructor(
    public afAuth: AngularFireAuth,
    public usersService: UsersService,
    public validUsersService: ValidUsersService,
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<UserId>(JSON.parse(localStorage.getItem('currentUser')));
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
          if (user[0].pinVerified) {
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

  private async createNewUser(credentials, validUser: ValidUserId) {
    const newUser: User = {
      uid: credentials.user.uid,
      email: credentials.user.email,
      firstName: validUser.firstName,
      lastName: validUser.lastName,
      middleInitial: validUser.middleInitial,
      rank: validUser.rank,
      nickname: validUser.nickname,
      hometownCity: validUser.hometownCity,
      hometownState: validUser.hometownState,
      school: validUser.school,
      section: validUser.section,
      emailPrivate: false,
      registered: true,
      pinVerified: false
    };
    const newUserReference: DocumentReference = await this.usersService.createUser(newUser);
    this.updateUser({ ...newUser, id: newUserReference.id });
    await this.validUsersService.updateUserData(credentials.user.email, validUser.id);

    const sendPinUrl = `${this.baseSendPinUrl}?dest=${credentials.user.email}&pin=${validUser.pin}`;
    this.http.get(sendPinUrl).subscribe();
  }

  doRegister(value, validUser: ValidUserId) {
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
        (credentials: firebase.auth.UserCredential) => {
          this.usersService.getUsers('uid', credentials.user.uid).subscribe((user: UserId[]) => {
            this.updateUser(user[0]);
          });
          resolve(credentials);
        },
        err => reject(err)
      );
    });
  }

  updateUser(user: UserId) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  resetPasswordEmail(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email).then(
      () => {
        return 'Email has been sent to address provided';
      },
      err => {
        return err;
      }
    );
  }

  doLogout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.redirectUrl = null;
    return this.afAuth.auth.signOut();
  }
}
