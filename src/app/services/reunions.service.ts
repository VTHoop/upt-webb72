import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Reunion, ReunionId } from '../models/reunions.model';
import { map } from 'rxjs/operators';

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

  getReunions(field: string, id: string): Observable<ReunionId[]> {
    return this.getValidReunionReference(field, id)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Reunion;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getReunionById(id: string): Observable<ReunionId> {
    return this.afs
      .doc<Reunion>(`${this._firebaseCollection}/${id}`)
      .snapshotChanges()
      .pipe(
        map(a => {
          const data = a.payload.data() as Reunion;
          const userId = a.payload.id;
          return { id: userId, ...data };
        })
      );
  }
}
