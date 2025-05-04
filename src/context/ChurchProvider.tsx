
import React, { ReactNode } from "react";
import { ChurchContext } from "./ChurchContext";

import { useChurchData } from "@/hooks/useChurchData";
import { useMembers } from "@/hooks/useMembers";
import { useVisitors } from "@/hooks/useVisitors";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useTeacherManagement } from "@/hooks/useTeacherManagement";
import { useSecretaryAuth } from "@/hooks/useSecretaryAuth";

interface ChurchProviderProps {
  children: ReactNode;
}

export const ChurchProvider = ({ children }: ChurchProviderProps) => {
  // Core church data state management
  const {
    churchData,
    setChurchData,
    allClasses, 
    setAllClasses,
    setChurchInfo,
    switchClass,
    logout
  } = useChurchData();
  
  // Members management
  const { addMember, removeMember, updateAttendance } = useMembers(
    churchData,
    setChurchData,
    allClasses,
    setAllClasses
  );
  
  // Visitors management
  const { addVisitor, removeVisitor } = useVisitors(
    churchData,
    setChurchData,
    allClasses,
    setAllClasses
  );
  
  // Announcements management
  const { addAnnouncement, removeAnnouncement } = useAnnouncements(
    churchData,
    setChurchData,
    allClasses,
    setAllClasses
  );
  
  // Teacher management
  const { setTeacher } = useTeacherManagement(
    churchData,
    setChurchData,
    allClasses,
    setAllClasses
  );
  
  // Secretary authentication
  const {
    isSecretary,
    secretaryData,
    secretaryLogin,
    secretaryLogout
  } = useSecretaryAuth();

  // Combined logout function
  const handleLogout = () => {
    logout();
    secretaryLogout();
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
        logout: handleLogout,
      }}
    >
      {children}
    </ChurchContext.Provider>
  );
};
