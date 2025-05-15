
export interface Member {
  id: string;
  name: string;
  // Array of 13 weeks, true for present, false for absent
  attendance: boolean[];
  birthday?: string; // Add birthday field
}

export interface Visitor {
  id: string;
  name: string;
  date: string;
}

export interface Class {
  id: string;
  churchName: string;
  sector: string;
  members: Member[];
  announcements: string[];
  teacher: string;
  visitors: Visitor[];
}

export interface SecretaryData {
  username: string;
  password: string;
  name: string;
  isLoggedIn: boolean;
}

export interface ChurchContextType {
  churchData: Class | null;
  allClasses: Class[];
  isSecretary: boolean;
  secretaryData: SecretaryData | null;
  setChurchInfo: (name: string, sector: string) => void;
  addMember: (name: string, birthday?: string) => void;
  removeMember: (memberId: string) => void;
  updateAttendance: (memberId: string, weekIndex: number, isPresent: boolean) => void;
  addAnnouncement: (announcement: string) => void;
  removeAnnouncement: (index: number) => void;
  setTeacher: (teacherName: string) => void;
  addVisitor: (name: string) => void;
  removeVisitor: (visitorId: string) => void;
  secretaryLogin: (username: string, password: string) => boolean;
  secretaryLogout: () => void;
  switchClass: (classId: string) => void;
  updateMemberBirthday: (memberId: string, birthday: string) => void;
  logout: () => void;
  registerSecretary: (username: string, password: string, name: string) => boolean;
  clearAllSecretaries: () => void;
}
