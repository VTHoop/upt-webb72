import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private afs: AngularFirestore) {}

  _firebaseCollection = 'users';

  getUserReference(field: string, id: string): AngularFirestoreCollection<User> {
    if (!field || !id) {
      return this.afs.collection(this._firebaseCollection);
    } else {
      return this.afs.collection(this._firebaseCollection, ref => ref.where(field, '==', id));
    }
  }

  createUser(user: User) {
    return new Promise<any>((resolve, reject) => {
      this.afs
        .collection(this._firebaseCollection)
        .add(Object.assign({}, user))
        .then(
          res => {},
          err => reject(err)
        );
    });
  }

  updateUserData(user: User) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      state: user.state
    };

    return userRef.set(data, { merge: true });
  }

  getUsers(field: string, id: string): Observable<User[]> {
    return this.getUserReference(field, id).valueChanges();
  }

  getUserById(id: string): Observable<User> {
    return this.getUserReference(null, null)
      .doc<User>(id)
      .valueChanges();
  }
}
