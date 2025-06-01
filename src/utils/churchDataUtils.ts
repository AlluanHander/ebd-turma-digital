
import { Class, Member, Visitor } from "@/types/ChurchTypes";

export const createNewClass = (name: string, sector: string): Class => {
  return {
    id: Date.now().toString(),
    churchName: name,
    sector: sector,
    members: [],
    announcements: [],
    teacher: "",
    visitors: [],
  };
};

export const createNewMember = (name: string, birthday?: string): Member => {
  return {
    id: Date.now().toString(),
    name,
    attendance: Array(13).fill(false),
    birthday,
  };
};

export const createNewVisitor = (name: string): Visitor => {
  return {
    id: Date.now().toString(),
    name,
    date: new Date().toLocaleDateString('pt-BR'),
  };
};

export const updateClassInList = (classList: Class[], updatedClass: Class): Class[] => {
  return classList.map(classItem => 
    classItem.id === updatedClass.id ? updatedClass : classItem
  );
};

export const getBirthdaysThisMonth = (members: Member[]): Member[] => {
  if (!members || members.length === 0) return [];
  
  const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-indexed
  
  return members.filter(member => {
    if (!member.birthday) return false;
    
    // Extract month from birthday (assuming format is DD/MM/YYYY)
    const birthdayMonth = parseInt(member.birthday.split('/')[1]);
    return birthdayMonth === currentMonth;
  });
};

export const getAllBirthdaysThisMonth = (classes: Class[]): { member: Member; className: string }[] => {
  if (!classes || classes.length === 0) return [];
  
  const result: { member: Member; className: string }[] = [];
  
  classes.forEach(classItem => {
    const birthdayMembers = getBirthdaysThisMonth(classItem.members);
    birthdayMembers.forEach(member => {
      result.push({
        member,
        className: classItem.sector
      });
    });
  });
  
  return result;
};
