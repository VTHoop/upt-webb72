import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {
  Reunion,
  ReunionId,
  ReunionAttendance,
  ReunionAttendanceId,
  ReunionEventId,
  ReunionEvent,
  ReunionEventAttendanceId,
  ReunionEventAttendance
} from '../models/reunions.model';
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

  getReunionEventDoc(id: string, eventId: string): AngularFirestoreDocument<ReunionEvent> {
    return this.afs.doc<ReunionEvent>(`${this._firebaseCollection}/${id}/events/${eventId}`);
  }

  ///////////
  // /reunions
  // READ one, READ all
  ///////////
  getReunions(field: string, criteria: string): Observable<ReunionId[]> {
    return this.afs
      .collection('reunions', ref => ref.orderBy('reunionDate', 'asc'))
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

  getReunionEventAttendanceByUser(reunionId: string, uid: string) {
    return this.afs
      .collectionGroup('eventAttendees', ref => ref.where('uid', '==', uid))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            // return a.payload.doc.data();
            const data = a.payload.doc.data() as ReunionEventAttendance;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  ///////////
  // /reunions/attendees
  // READ all, UPDATE, CREATE
  ///////////

  getReunionAttendance(docId: string): Observable<ReunionAttendanceId[]> {
    return this.getReunionDoc(docId)
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
      .then(() => 'Attendance Updated Successfully');
  }

  ///////////
  // /reunions/events
  // READ one, READ all
  ///////////

  getReunionEvents(docId: string): Observable<ReunionEventId[]> {
    return this.getReunionDoc(docId)
      .collection('events', ref => ref.orderBy('eventDate', 'asc'))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as ReunionEvent;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getReunionEventById(id: string, eventId: string): Observable<ReunionEventId> {
    return this.getReunionEventDoc(id, eventId)
      .snapshotChanges()
      .pipe(
        map(a => {
          const data = a.payload.data() as ReunionEvent;
          const userId = a.payload.id;
          return { id: userId, ...data };
        })
      );
  }

  ///////////
  // /reunions/<id>/events/<id>/attendees
  // READ all, UPDATE, CREATE
  ///////////

  getReunionEventAttendance(reunionId: string, eventId: string): Observable<ReunionEventAttendanceId[]> {
    return this.getReunionEventDoc(reunionId, eventId)
      .collection('eventAttendees')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as ReunionEventAttendance;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  updateReunionEventAttendance(reunionId: string, eventId: string, attendeeId: string, data: any) {
    return this.afs
      .doc(`${this._firebaseCollection}/${reunionId}/events/${eventId}/eventAttendees/${attendeeId}`)
      .update(data)
      .then(() => 'Attendance Updated Successfully');
  }

  addReunionEventAttendance(reunionId: string, eventId: string, data: any) {
    return this.afs
      .collection(`${this._firebaseCollection}/${reunionId}/events/${eventId}/eventAttendees`)
      .add(Object.assign({}, data))
      .then(() => 'Attendance Updated Successfully');
  }
}
