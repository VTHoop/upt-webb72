import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User, UserId } from '../models/user.model';
import { map } from 'rxjs/operators';

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
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  updateUserData(id: string, data: any) {
    return this.afs
      .doc(`${this._firebaseCollection}/${id}`)
      .update(data)
      .then(() => 'Profile Updated Successfully');
  }

  getUsers(field: string, criteria: string): Observable<UserId[]> {
    return this.getUserReference(field, criteria)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as User;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getUserById(id: string): Observable<UserId> {
    return this.afs
      .doc<User>(`${this._firebaseCollection}/${id}`)
      .snapshotChanges()
      .pipe(
        map(a => {
          const data = a.payload.data() as User;
          const userId = a.payload.id;
          return { id: userId, ...data };
        })
      );
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
