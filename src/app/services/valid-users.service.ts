import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ValidUser } from '../models/valid-user.model';

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

  getUsers(field: string, id: string): Observable<DocumentChangeAction<ValidUser>[]> {
    return this.getValidUserReference(field, id).snapshotChanges();
  }

  getUserById(id: string): Observable<ValidUser> {
    return this.getValidUserReference(null, null)
      .doc<ValidUser>(id)
      .valueChanges();
  }

  updateUserData(email: string, uid: string) {
    return this.getValidUserReference('email', email)
      .doc(uid)
      .update({ registered: true });
  }
}
