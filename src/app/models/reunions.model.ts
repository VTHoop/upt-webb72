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
