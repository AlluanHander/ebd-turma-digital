
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Teacher {
  id: string;
  username: string;
  name: string;
  isLoggedIn: boolean;
}

interface TeacherContextType {
  teacherData: Teacher | null;
  teacherLogin: (username: string, password: string) => boolean;
  teacherLogout: () => void;
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined);

// Sample teacher credentials (in a real app, this would be stored securely)
const TEACHER_CREDENTIALS = [
  {
    id: "1",
    username: "professor",
    password: "123456",
    name: "Professor EBD"
  }
];

export const TeacherProvider = ({ children }: { children: ReactNode }) => {
  const [teacherData, setTeacherData] = useState<Teacher | null>(() => {
    const savedData = localStorage.getItem("ebdTeacherData");
    return savedData ? JSON.parse(savedData) : null;
  });

  const teacherLogin = (username: string, password: string): boolean => {
    const teacher = TEACHER_CREDENTIALS.find(
      t => t.username === username && t.password === password
    );
    
    if (teacher) {
      const teacherUserData = {
        id: teacher.id,
        username: teacher.username,
        name: teacher.name,
        isLoggedIn: true
      };
      
      setTeacherData(teacherUserData);
      localStorage.setItem("ebdTeacherData", JSON.stringify(teacherUserData));
      return true;
    }
    return false;
  };
  
  const teacherLogout = () => {
    setTeacherData(null);
    localStorage.removeItem("ebdTeacherData");
  };

  return (
    <TeacherContext.Provider
      value={{
        teacherData,
        teacherLogin,
        teacherLogout
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};

export const useTeacher = (): TeacherContextType => {
  const context = useContext(TeacherContext);
  if (context === undefined) {
    throw new Error("useTeacher must be used within a TeacherProvider");
  }
  return context;
};
