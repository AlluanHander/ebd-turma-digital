
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

export const createNewMember = (name: string): Member => {
  return {
    id: Date.now().toString(),
    name,
    attendance: Array(13).fill(false),
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
