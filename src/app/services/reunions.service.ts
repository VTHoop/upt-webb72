import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Reunion } from '../models/reunions.model';

@Injectable({
  providedIn: 'root'
})
export class ReunionsService {
  constructor(private afs: AngularFirestore) {}

  _firebaseCollection = 'reunions';

  getValidReunionReference(field: string, id: string): AngularFirestoreCollection<Reunion> {
    if (!field || !id) {
      return this.afs.collection(this._firebaseCollection);
    } else {
      return this.afs.collection(this._firebaseCollection, ref => ref.where(field, '==', id));
    }
  }

  getReunions(field: string, id: string): Observable<DocumentChangeAction<Reunion>[]> {
    return this.getValidReunionReference(field, id).snapshotChanges();
  }

  getReunionById(id: string): Observable<Reunion> {
    return this.getValidReunionReference(null, null)
      .doc<Reunion>(id)
      .valueChanges();
  }
}
