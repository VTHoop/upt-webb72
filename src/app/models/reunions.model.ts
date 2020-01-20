export interface Reunion {
  locationCity: string;
  locationState: string;
  reunionDate: Date;
  reunionStart: string;
  reunionEnd: string;
  reunionYear: string;
}

export interface ReunionId extends Reunion {
  id: string;
}

export interface ReunionAttendance {
  uid: string;
  name: string;
  status: string;
}

export interface ReunionAttendanceId extends ReunionAttendance {
  id: string;
}

export enum AttendanceStatus {
  YES = 'yes',
  MAYBE = 'maybe',
  NO = 'no'
}
