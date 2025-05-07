import React, { useState, ReactNode } from "react";
import { ChurchContext } from "./ChurchContext";
import { Class, SecretaryData } from "@/types/ChurchTypes";
import { SECRETARY_CREDENTIALS } from "@/constants/secretaryCredentials";
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
  
  const [isSecretary, setIsSecretary] = useState<boolean>(() => {
    const savedSecretaryStatus = localStorage.getItem("ebdIsSecretary");
    return savedSecretaryStatus ? JSON.parse(savedSecretaryStatus) : false;
  });
  
  const [secretaryData, setSecretaryData] = useState<SecretaryData | null>(() => {
    const savedSecretaryData = localStorage.getItem("ebdSecretaryData");
    return savedSecretaryData ? JSON.parse(savedSecretaryData) : null;
  });

  const setChurchInfo = (name: string, sector: string) => {
    const newClassData = createNewClass(name, sector);
    
    setChurchData(newClassData);
    
    const updatedClasses = [...allClasses, newClassData];
    setAllClasses(updatedClasses);
    
    localStorage.setItem("ebdChurchData", JSON.stringify(newClassData));
    localStorage.setItem("ebdAllClasses", JSON.stringify(updatedClasses));
    localStorage.setItem("ebdIsSecretary", JSON.stringify(false));
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
    if (username === SECRETARY_CREDENTIALS.username && password === SECRETARY_CREDENTIALS.password) {
      const secretaryUserData = {
        username,
        password,
        name: SECRETARY_CREDENTIALS.name,
        isLoggedIn: true
      };
      
      setIsSecretary(true);
      setSecretaryData(secretaryUserData);
      
      localStorage.setItem("ebdIsSecretary", JSON.stringify(true));
      localStorage.setItem("ebdSecretaryData", JSON.stringify(secretaryUserData));
      
      return true;
    }
    return false;
  };
  
  const secretaryLogout = () => {
    setIsSecretary(false);
    setSecretaryData(null);
    
    localStorage.setItem("ebdIsSecretary", JSON.stringify(false));
    localStorage.removeItem("ebdSecretaryData");
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
    // Do not clear allClasses when logging out
    setIsSecretary(false);
    setSecretaryData(null);
    
    localStorage.removeItem("ebdChurchData");
    localStorage.setItem("ebdIsSecretary", JSON.stringify(false));
    localStorage.removeItem("ebdSecretaryData");
  };

  return (
    <ChurchContext.Provider
      value={{
        churchData,
        allClasses,
        isSecretary,
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
        secretaryLogout,
        switchClass,
        updateMemberBirthday,
        logout,
      }}
    >
      {children}
    </ChurchContext.Provider>
  );
};
