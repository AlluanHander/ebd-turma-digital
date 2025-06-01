import React, { useState, ReactNode } from "react";
import { ChurchContext } from "./ChurchContext";
import { Class, SecretaryData, Teacher } from "@/types/ChurchTypes";
import { SECRETARY_CREDENTIALS, REGISTERED_SECRETARIES, addSecretary, clearSecretaries } from "@/constants/secretaryCredentials";
import { createNewClass, createNewMember, createNewVisitor, updateClassInList } from "@/utils/churchDataUtils";

interface ChurchProviderProps {
  children: ReactNode;
}

export const ChurchProvider = ({ children }: ChurchProviderProps) => {
  const [churchData, setChurchData] = useState<Class | null>(() => {
    const savedData = localStorage.getItem("ebdChurchData");
    return savedData ? JSON.parse(savedData) : null;
  });
  
  const [allClasses, setAllClasses] = useState<Class[]>(() => {
    const savedClasses = localStorage.getItem("ebdAllClasses");
    return savedClasses ? JSON.parse(savedClasses) : [];
  });

  const [allTeachers, setAllTeachers] = useState<Teacher[]>(() => {
    const savedTeachers = localStorage.getItem("ebdAllTeachers");
    return savedTeachers ? JSON.parse(savedTeachers) : [];
  });
  
  const [isSecretary, setIsSecretary] = useState<boolean>(() => {
    const savedSecretaryStatus = localStorage.getItem("ebdIsSecretary");
    return savedSecretaryStatus ? JSON.parse(savedSecretaryStatus) : false;
  });

  const [isTeacher, setIsTeacher] = useState<boolean>(() => {
    const savedTeacherStatus = localStorage.getItem("ebdIsTeacher");
    return savedTeacherStatus ? JSON.parse(savedTeacherStatus) : false;
  });
  
  const [secretaryData, setSecretaryData] = useState<SecretaryData | null>(() => {
    const savedSecretaryData = localStorage.getItem("ebdSecretaryData");
    return savedSecretaryData ? JSON.parse(savedSecretaryData) : null;
  });

  const [currentUser, setCurrentUser] = useState<SecretaryData | Teacher | null>(() => {
    const savedUser = localStorage.getItem("ebdCurrentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const setChurchInfo = (name: string, sector: string) => {
    const newClassData = createNewClass(name, sector);
    
    setChurchData(newClassData);
    
    const updatedClasses = [...allClasses, newClassData];
    setAllClasses(updatedClasses);
    
    localStorage.setItem("ebdChurchData", JSON.stringify(newClassData));
    localStorage.setItem("ebdAllClasses", JSON.stringify(updatedClasses));
  };

  const addMember = (name: string, birthday?: string) => {
    if (!churchData) return;
    
    const newMember = createNewMember(name, birthday);
    
    const updatedChurchData = {
      ...churchData,
      members: [...churchData.members, newMember],
    };
    
    setChurchData(updatedChurchData);
    
    const updatedClasses = updateClassInList(allClasses, updatedChurchData);
    setAllClasses(updatedClasses);
    
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
    localStorage.setItem("ebdAllClasses", JSON.stringify(updatedClasses));
  };

  const updateMemberBirthday = (memberId: string, birthday: string) => {
    if (!churchData) return;
    
    const updatedMembers = churchData.members.map(member => {
      if (member.id === memberId) {
        return { ...member, birthday };
      }
      return member;
    });
    
    const updatedChurchData = {
      ...churchData,
      members: updatedMembers,
    };
    
    setChurchData(updatedChurchData);
    
    const updatedClasses = updateClassInList(allClasses, updatedChurchData);
    setAllClasses(updatedClasses);
    
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
    localStorage.setItem("ebdAllClasses", JSON.stringify(updatedClasses));
  };

  const removeMember = (memberId: string) => {
    if (!churchData) return;
    
    const updatedMembers = churchData.members.filter(member => member.id !== memberId);
    
    const updatedChurchData = {
      ...churchData,
      members: updatedMembers,
    };
    
    setChurchData(updatedChurchData);
    
    const updatedClasses = updateClassInList(allClasses, updatedChurchData);
    setAllClasses(updatedClasses);
    
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
    localStorage.setItem("ebdAllClasses", JSON.stringify(updatedClasses));
  };

  const updateAttendance = (memberId: string, weekIndex: number, isPresent: boolean) => {
    if (!churchData) return;
    
    const updatedMembers = churchData.members.map(member => {
      if (member.id === memberId) {
        const updatedAttendance = [...member.attendance];
        updatedAttendance[weekIndex] = isPresent;
        return { ...member, attendance: updatedAttendance };
      }
      return member;
    });
    
    const updatedChurchData = {
      ...churchData,
      members: updatedMembers,
    };
    
    setChurchData(updatedChurchData);
    
    const updatedClasses = updateClassInList(allClasses, updatedChurchData);
    setAllClasses(updatedClasses);
    
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
    localStorage.setItem("ebdAllClasses", JSON.stringify(updatedClasses));
  };

  const addAnnouncement = (announcement: string) => {
    if (!churchData) return;
    
    const updatedChurchData = {
      ...churchData,
      announcements: [...churchData.announcements, announcement],
    };
    
    setChurchData(updatedChurchData);
    
    const updatedClasses = updateClassInList(allClasses, updatedChurchData);
    setAllClasses(updatedClasses);
    
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
    localStorage.setItem("ebdAllClasses", JSON.stringify(updatedClasses));
  };

  const removeAnnouncement = (index: number) => {
    if (!churchData) return;
    
    const updatedAnnouncements = churchData.announcements.filter((_, i) => i !== index);
    
    const updatedChurchData = {
      ...churchData,
      announcements: updatedAnnouncements,
    };
    
    setChurchData(updatedChurchData);
    
    const updatedClasses = updateClassInList(allClasses, updatedChurchData);
    setAllClasses(updatedClasses);
    
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
    localStorage.setItem("ebdAllClasses", JSON.stringify(updatedClasses));
  };

  const setTeacher = (teacherName: string) => {
    if (!churchData) return;
    
    const updatedChurchData = {
      ...churchData,
      teacher: teacherName,
    };
    
    setChurchData(updatedChurchData);
    
    const updatedClasses = updateClassInList(allClasses, updatedChurchData);
    setAllClasses(updatedClasses);
    
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
    localStorage.setItem("ebdAllClasses", JSON.stringify(updatedClasses));
  };

  const addVisitor = (name: string) => {
    if (!churchData) return;
    
    const newVisitor = createNewVisitor(name);
    
    const updatedChurchData = {
      ...churchData,
      visitors: [...churchData.visitors || [], newVisitor],
    };
    
    setChurchData(updatedChurchData);
    
    const updatedClasses = updateClassInList(allClasses, updatedChurchData);
    setAllClasses(updatedClasses);
    
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
    localStorage.setItem("ebdAllClasses", JSON.stringify(updatedClasses));
  };

  const removeVisitor = (visitorId: string) => {
    if (!churchData) return;
    
    const updatedVisitors = churchData.visitors.filter(visitor => visitor.id !== visitorId);
    
    const updatedChurchData = {
      ...churchData,
      visitors: updatedVisitors,
    };
    
    setChurchData(updatedChurchData);
    
    const updatedClasses = updateClassInList(allClasses, updatedChurchData);
    setAllClasses(updatedClasses);
    
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
    localStorage.setItem("ebdAllClasses", JSON.stringify(updatedClasses));
  };
  
  const secretaryLogin = (username: string, password: string) => {
    // Verificar credenciais padrão
    if (username === SECRETARY_CREDENTIALS.username && password === SECRETARY_CREDENTIALS.password) {
      const secretaryUserData = {
        username,
        password,
        name: SECRETARY_CREDENTIALS.name,
        isLoggedIn: true
      };
      
      setIsSecretary(true);
      setIsTeacher(false);
      setSecretaryData(secretaryUserData);
      setCurrentUser(secretaryUserData);
      
      localStorage.setItem("ebdIsSecretary", JSON.stringify(true));
      localStorage.setItem("ebdIsTeacher", JSON.stringify(false));
      localStorage.setItem("ebdSecretaryData", JSON.stringify(secretaryUserData));
      localStorage.setItem("ebdCurrentUser", JSON.stringify(secretaryUserData));
      
      return true;
    }
    
    // Verificar secretários registrados
    const foundSecretary = REGISTERED_SECRETARIES.find(
      (secretary) => secretary.username === username && secretary.password === password
    );
    
    if (foundSecretary) {
      const secretaryUserData = {
        username,
        password,
        name: foundSecretary.name,
        isLoggedIn: true
      };
      
      setIsSecretary(true);
      setIsTeacher(false);
      setSecretaryData(secretaryUserData);
      setCurrentUser(secretaryUserData);
      
      localStorage.setItem("ebdIsSecretary", JSON.stringify(true));
      localStorage.setItem("ebdIsTeacher", JSON.stringify(false));
      localStorage.setItem("ebdSecretaryData", JSON.stringify(secretaryUserData));
      localStorage.setItem("ebdCurrentUser", JSON.stringify(secretaryUserData));
      
      return true;
    }
    
    return false;
  };

  const teacherLogin = (email: string, password: string) => {
    const foundTeacher = allTeachers.find(
      (teacher) => teacher.email === email && teacher.password === password
    );
    
    if (foundTeacher) {
      setIsTeacher(true);
      setIsSecretary(false);
      setCurrentUser(foundTeacher);
      setSecretaryData(null);
      
      // Filtrar classes do professor
      const teacherClasses = allClasses.filter(cls => 
        foundTeacher.assignedClasses.includes(cls.id)
      );
      
      if (teacherClasses.length > 0) {
        setChurchData(teacherClasses[0]);
        localStorage.setItem("ebdChurchData", JSON.stringify(teacherClasses[0]));
      }
      
      localStorage.setItem("ebdIsTeacher", JSON.stringify(true));
      localStorage.setItem("ebdIsSecretary", JSON.stringify(false));
      localStorage.setItem("ebdCurrentUser", JSON.stringify(foundTeacher));
      localStorage.removeItem("ebdSecretaryData");
      
      return true;
    }
    
    return false;
  };

  const registerSecretary = (username: string, password: string, name: string, email: string) => {
    return addSecretary(username, password, name);
  };

  const registerTeacher = (name: string, email: string, password: string, assignedClasses: string[]) => {
    const newTeacher: Teacher = {
      id: Date.now().toString(),
      name,
      email,
      password,
      assignedClasses
    };
    
    const updatedTeachers = [...allTeachers, newTeacher];
    setAllTeachers(updatedTeachers);
    localStorage.setItem("ebdAllTeachers", JSON.stringify(updatedTeachers));
    
    return true;
  };

  const updateTeacher = (teacherId: string, name: string, email: string, assignedClasses: string[]) => {
    const updatedTeachers = allTeachers.map(teacher => {
      if (teacher.id === teacherId) {
        return { ...teacher, name, email, assignedClasses };
      }
      return teacher;
    });
    
    setAllTeachers(updatedTeachers);
    localStorage.setItem("ebdAllTeachers", JSON.stringify(updatedTeachers));
    
    return true;
  };

  const removeTeacher = (teacherId: string) => {
    const updatedTeachers = allTeachers.filter(teacher => teacher.id !== teacherId);
    setAllTeachers(updatedTeachers);
    localStorage.setItem("ebdAllTeachers", JSON.stringify(updatedTeachers));
    
    return true;
  };

  const createClass = (churchName: string, sector: string, teacherId?: string) => {
    const newClass = createNewClass(churchName, sector);
    if (teacherId) {
      newClass.teacherId = teacherId;
      // Find teacher and add class to their assigned classes
      updateTeacher(teacherId, allTeachers.find(t => t.id === teacherId)?.name || '', 
                   allTeachers.find(t => t.id === teacherId)?.email || '',
                   [...(allTeachers.find(t => t.id === teacherId)?.assignedClasses || []), newClass.id]);
    }
    
    const updatedClasses = [...allClasses, newClass];
    setAllClasses(updatedClasses);
    localStorage.setItem("ebdAllClasses", JSON.stringify(updatedClasses));
    
    return newClass.id;
  };

  const clearAllSecretaries = () => {
    clearSecretaries();
  };

  const sendPasswordReset = (email: string) => {
    console.log(`Password reset email sent to: ebdvilaelida2024@gmail.com for user: ${email}`);
    return true;
  };
  
  const secretaryLogout = () => {
    setIsSecretary(false);
    setSecretaryData(null);
    setCurrentUser(null);
    
    localStorage.setItem("ebdIsSecretary", JSON.stringify(false));
    localStorage.removeItem("ebdSecretaryData");
    localStorage.removeItem("ebdCurrentUser");
  };

  const teacherLogout = () => {
    setIsTeacher(false);
    setCurrentUser(null);
    
    localStorage.setItem("ebdIsTeacher", JSON.stringify(false));
    localStorage.removeItem("ebdCurrentUser");
  };
  
  const switchClass = (classId: string) => {
    const selectedClass = allClasses.find(classItem => classItem.id === classId);
    if (selectedClass) {
      setChurchData(selectedClass);
      localStorage.setItem("ebdChurchData", JSON.stringify(selectedClass));
    }
  };

  const logout = () => {
    setChurchData(null);
    setIsSecretary(false);
    setIsTeacher(false);
    setSecretaryData(null);
    setCurrentUser(null);
    
    localStorage.removeItem("ebdChurchData");
    localStorage.setItem("ebdIsSecretary", JSON.stringify(false));
    localStorage.setItem("ebdIsTeacher", JSON.stringify(false));
    localStorage.removeItem("ebdSecretaryData");
    localStorage.removeItem("ebdCurrentUser");
  };

  return (
    <ChurchContext.Provider
      value={{
        churchData,
        allClasses,
        allTeachers,
        isSecretary,
        isTeacher,
        currentUser,
        secretaryData,
        setChurchInfo,
        addMember,
        removeMember,
        updateAttendance,
        addAnnouncement,
        removeAnnouncement,
        setTeacher,
        addVisitor,
        removeVisitor,
        secretaryLogin,
        teacherLogin,
        secretaryLogout,
        teacherLogout,
        switchClass,
        updateMemberBirthday,
        logout,
        registerSecretary,
        registerTeacher,
        updateTeacher,
        removeTeacher,
        createClass,
        clearAllSecretaries,
        sendPasswordReset,
      }}
    >
      {children}
    </ChurchContext.Provider>
  );
};
