export interface Reunion {
  locationCity: string;
  locationState: string;
  reunionDate: firebase.firestore.Timestamp;
  reunionStart: string;
  reunionEnd: string;
  reunionYear: string;
}

export interface ReunionId extends Reunion {
  id: string;
}

// subcollection of reunion
export interface ReunionAttendance {
  uid: string;
  name: string;
  status: string;
  isGuestAttending: boolean;
}

export interface ReunionAttendanceId extends ReunionAttendance {
  id: string;
}

// subcollection of reunion
export interface ReunionEvent {
  eventDate: firebase.firestore.Timestamp;
  eventTime: string;
  description: string;
  location?: string;
}

export interface ReunionEventId extends ReunionEvent {
  id: string;
}

export interface ReunionEventAttendance {
  eventId: string;
  uid: string;
  name: string;
  status: string;
  isGuestAttending: boolean;
}

export interface ReunionEventAttendanceId extends ReunionEventAttendance {
  id: string;
}

export enum AttendanceStatus {
  YES = 'yes',
  MAYBE = 'maybe',
  NO = 'no'
}
