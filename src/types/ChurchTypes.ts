
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

export interface Teacher {
  id: string;
  name: string;
  email: string;
  password: string;
  assignedClasses: string[]; // Array of class IDs
}

export interface Class {
  id: string;
  churchName: string;
  sector: string;
  members: Member[];
  announcements: string[];
  teacher: string;
  teacherId?: string; // Link to teacher ID
  visitors: Visitor[];
}

export interface SecretaryData {
  username: string;
  password: string;
  name: string;
  email?: string;
  isLoggedIn: boolean;
}

export interface ChurchContextType {
  churchData: Class | null;
  allClasses: Class[];
  allTeachers: Teacher[];
  isSecretary: boolean;
  isTeacher: boolean;
  currentUser: SecretaryData | Teacher | null;
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
  teacherLogin: (email: string, password: string) => boolean;
  secretaryLogout: () => void;
  teacherLogout: () => void;
  switchClass: (classId: string) => void;
  updateMemberBirthday: (memberId: string, birthday: string) => void;
  logout: () => void;
  registerSecretary: (username: string, password: string, name: string, email: string) => boolean;
  registerTeacher: (name: string, email: string, password: string, assignedClasses: string[]) => boolean;
  updateTeacher: (teacherId: string, name: string, email: string, assignedClasses: string[]) => boolean;
  removeTeacher: (teacherId: string) => boolean;
  createClass: (churchName: string, sector: string, teacherId?: string) => string;
  clearAllSecretaries: () => void;
  sendPasswordReset: (email: string) => boolean;
}
