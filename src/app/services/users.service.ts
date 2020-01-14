import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentSnapshot,
  Action
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../shared/services/auth.service';

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

  updateUserData(id: string, data: any) {
    return this.getUserReference(null, null)
      .doc(id)
      .update(data);
  }

  getUsers(field: string, id: string): Observable<DocumentChangeAction<User>[]> {
    return this.getUserReference(field, id).snapshotChanges();
  }

  getUserById(id: string): Observable<Action<DocumentSnapshot<User>>> {
    return this.getUserReference(null, null)
      .doc<User>(id)
      .snapshotChanges();
  }

  setUserData(userKey, value): Promise<void> {
    return new Promise<any>((resolve, reject) => {
      this.getUserReference(null, null)
        .doc(userKey)
        .set(value)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }
}
