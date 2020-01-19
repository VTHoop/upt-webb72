export interface ValidUser {
  email: string;
  firstName: string;
  lastName: string;
  middleInitial: string;
  nickname: string;
  hometownCity: string;
  hometownState: string;
  rank: string;
  school: string;
  section: string;
  registered: boolean;
  pin: boolean;
}

export interface ValidUserId extends ValidUser {
  id: string;
}
