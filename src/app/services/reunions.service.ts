import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Reunion, ReunionId, ReunionAttendance, ReunionAttendanceId } from '../models/reunions.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReunionsService {
  constructor(private afs: AngularFirestore) {}

  _firebaseCollection = 'reunions';

  getReunionCollection(field: string, id: string): AngularFirestoreCollection<Reunion> {
    if (!field || !id) {
      return this.afs.collection(this._firebaseCollection);
    } else {
      return this.afs.collection(this._firebaseCollection, ref => ref.where(field, '==', id));
    }
  }

  getReunionDoc(id: string): AngularFirestoreDocument<Reunion> {
    return this.afs.doc<Reunion>(`${this._firebaseCollection}/${id}`);
  }

  getReunions(field: string, id: string): Observable<ReunionId[]> {
    return this.getReunionCollection(field, id)
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
    return this.getReunionDoc(id)
      .snapshotChanges()
      .pipe(
        map(a => {
          const data = a.payload.data() as Reunion;
          const userId = a.payload.id;
          return { id: userId, ...data };
        })
      );
  }



  getReunionAttendance(id: string): Observable<ReunionAttendanceId[]> {
    return this.getReunionDoc(id)
      .collection('attendees')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as ReunionAttendance;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  updateReunionAttendance(reunionId: string, attendeeId: string, data: any) {
    return this.afs
      .doc(`${this._firebaseCollection}/${reunionId}/attendees/${attendeeId}`)
      .update(data)
      .then(() => 'Attendance Updated Successfully');
  }

  addReunionAttendance(reunionId: string, data: any) {
    return this.afs
      .collection(`${this._firebaseCollection}/${reunionId}/attendees`)
      .add(Object.assign({}, data))
      .then(() => 'Attendance Created Successfully');
  }
}
