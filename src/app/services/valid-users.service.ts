import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ValidUser, ValidUserId } from '../models/valid-user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidUsersService {
  constructor(private afs: AngularFirestore) {}

  _firebaseCollection = 'validUsers';

  getValidUserReference(field: string, id: string): AngularFirestoreCollection<ValidUser> {
    if (!field || !id) {
      return this.afs.collection(this._firebaseCollection);
    } else {
      return this.afs.collection(this._firebaseCollection, ref => ref.where(field, '==', id));
    }
  }

  getUsers(field: string, criteria: string): Observable<ValidUserId[]> {
    return this.getValidUserReference(field, criteria)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as ValidUser;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getUserById(id: string): Observable<ValidUserId> {
    return this.afs
      .doc(`${this._firebaseCollection}/${id}`)
      .snapshotChanges()
      .pipe(
        map(a => {
          const data = a.payload.data() as ValidUser;
          const userId = a.payload.id;
          return { id: userId, ...data };
        })
      );
  }

  updateUserData(email: string, uid: string) {
    return this.getValidUserReference('email', email)
      .doc(uid)
      .update({ registered: true });
  }
}
