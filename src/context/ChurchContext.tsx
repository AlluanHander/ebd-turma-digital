
import React, { createContext, useState, useContext, ReactNode } from "react";

interface Member {
  id: string;
  name: string;
  // Array of 13 weeks, true for present, false for absent
  attendance: boolean[];
}

interface Visitor {
  id: string;
  name: string;
  date: string;
}

interface ChurchData {
  churchName: string;
  sector: string;
  members: Member[];
  announcements: string[];
  teacher: string;
  visitors: Visitor[];
}

interface ChurchContextType {
  churchData: ChurchData | null;
  setChurchInfo: (name: string, sector: string) => void;
  addMember: (name: string) => void;
  removeMember: (memberId: string) => void;
  updateAttendance: (memberId: string, weekIndex: number, isPresent: boolean) => void;
  addAnnouncement: (announcement: string) => void;
  removeAnnouncement: (index: number) => void;
  setTeacher: (teacherName: string) => void;
  addVisitor: (name: string) => void;
  removeVisitor: (visitorId: string) => void;
  logout: () => void;
}

const ChurchContext = createContext<ChurchContextType | undefined>(undefined);

export const ChurchProvider = ({ children }: { children: ReactNode }) => {
  const [churchData, setChurchData] = useState<ChurchData | null>(() => {
    const savedData = localStorage.getItem("ebdChurchData");
    return savedData ? JSON.parse(savedData) : null;
  });

  const setChurchInfo = (name: string, sector: string) => {
    const newChurchData = {
      churchName: name,
      sector: sector,
      members: [],
      announcements: [],
      teacher: "",
      visitors: [],
    };
    setChurchData(newChurchData);
    localStorage.setItem("ebdChurchData", JSON.stringify(newChurchData));
  };

  const addMember = (name: string) => {
    if (!churchData) return;
    
    const newMember: Member = {
      id: Date.now().toString(),
      name,
      attendance: Array(13).fill(false),
    };
    
    const updatedChurchData = {
      ...churchData,
      members: [...churchData.members, newMember],
    };
    
    setChurchData(updatedChurchData);
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
  };

  const removeMember = (memberId: string) => {
    if (!churchData) return;
    
    const updatedMembers = churchData.members.filter(member => member.id !== memberId);
    
    const updatedChurchData = {
      ...churchData,
      members: updatedMembers,
    };
    
    setChurchData(updatedChurchData);
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
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
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
  };

  const addAnnouncement = (announcement: string) => {
    if (!churchData) return;
    
    const updatedChurchData = {
      ...churchData,
      announcements: [...churchData.announcements, announcement],
    };
    
    setChurchData(updatedChurchData);
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
  };

  const removeAnnouncement = (index: number) => {
    if (!churchData) return;
    
    const updatedAnnouncements = churchData.announcements.filter((_, i) => i !== index);
    
    const updatedChurchData = {
      ...churchData,
      announcements: updatedAnnouncements,
    };
    
    setChurchData(updatedChurchData);
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
  };

  const setTeacher = (teacherName: string) => {
    if (!churchData) return;
    
    const updatedChurchData = {
      ...churchData,
      teacher: teacherName,
    };
    
    setChurchData(updatedChurchData);
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
  };

  const addVisitor = (name: string) => {
    if (!churchData) return;
    
    const newVisitor: Visitor = {
      id: Date.now().toString(),
      name,
      date: new Date().toLocaleDateString('pt-BR'),
    };
    
    const updatedChurchData = {
      ...churchData,
      visitors: [...churchData.visitors || [], newVisitor],
    };
    
    setChurchData(updatedChurchData);
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
  };

  const removeVisitor = (visitorId: string) => {
    if (!churchData) return;
    
    const updatedVisitors = churchData.visitors.filter(visitor => visitor.id !== visitorId);
    
    const updatedChurchData = {
      ...churchData,
      visitors: updatedVisitors,
    };
    
    setChurchData(updatedChurchData);
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
  };

  const logout = () => {
    setChurchData(null);
    localStorage.removeItem("ebdChurchData");
  };

  return (
    <ChurchContext.Provider
      value={{
        churchData,
        setChurchInfo,
        addMember,
        removeMember,
        updateAttendance,
        addAnnouncement,
        removeAnnouncement,
        setTeacher,
        addVisitor,
        removeVisitor,
        logout,
      }}
    >
      {children}
    </ChurchContext.Provider>
  );
};

export const useChurch = () => {
  const context = useContext(ChurchContext);
  if (context === undefined) {
    throw new Error("useChurch must be used within a ChurchProvider");
  }
  return context;
};
