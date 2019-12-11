import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { take, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser;

  constructor(public afAuth: AngularFireAuth, public usersService: UsersService) {}

  getLoggedInUser(): Observable<User> {
    return this.loggedInUser;
  }

  doFacebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  doGoogleLogin() {
    const provider = new auth.GoogleAuthProvider();
    // provider.addScope('profile');
    // provider.addScope('email');
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return new Promise<any>((resolve, reject) =>
      this.afAuth.auth.signInWithPopup(provider).then(
        credentials => {
          this.loggedInUser = this.usersService.getUsers('uid', credentials.user.uid).pipe(first());
          this.loggedInUser.subscribe(loggedInUser => {
            if (!loggedInUser[0]) {
              this.createNewUser(credentials);
            }
            console.log(loggedInUser);
          });
          resolve(credentials);
        },
        err => {
          console.log(err);
          reject(err);
        }
      )
    );
  }

  private createNewUser(credentials) {
    const newUser: User = {
      uid: credentials.user.uid,
      email: credentials.user.email
    };
    this.usersService.createUser(newUser);
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password).then(
        res => {
          resolve(res);
        },
        err => reject(err)
      );
    });
  }
}
