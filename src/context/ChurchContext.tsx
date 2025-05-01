
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

interface Class {
  id: string;
  churchName: string;
  sector: string;
  members: Member[];
  announcements: string[];
  teacher: string;
  visitors: Visitor[];
}

interface SecretaryData {
  username: string;
  password: string;
  name: string;
  isLoggedIn: boolean;
}

interface ChurchContextType {
  churchData: Class | null;
  allClasses: Class[];
  isSecretary: boolean;
  secretaryData: SecretaryData | null;
  setChurchInfo: (name: string, sector: string) => void;
  addMember: (name: string) => void;
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
  logout: () => void;
}

const ChurchContext = createContext<ChurchContextType | undefined>(undefined);

// Secretary credentials (in real app, this would be in a database)
const SECRETARY_CREDENTIALS = {
  username: "secretario",
  password: "123456",
  name: "Secretário Geral"
};

export const ChurchProvider = ({ children }: { children: ReactNode }) => {
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
    const newClassData: Class = {
      id: Date.now().toString(),
      churchName: name,
      sector: sector,
      members: [],
      announcements: [],
      teacher: "",
      visitors: [],
    };
    
    setChurchData(newClassData);
    
    // Also update allClasses to include this new class
    const updatedClasses = [...allClasses, newClassData];
    setAllClasses(updatedClasses);
    
    // Save to localStorage
    localStorage.setItem("ebdChurchData", JSON.stringify(newClassData));
    localStorage.setItem("ebdAllClasses", JSON.stringify(updatedClasses));
    localStorage.setItem("ebdIsSecretary", JSON.stringify(false));
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
    
    // Update class in allClasses as well
    const updatedClasses = allClasses.map(classItem => 
      classItem.id === updatedChurchData.id ? updatedChurchData : classItem
    );
    setAllClasses(updatedClasses);
    
    // Save to localStorage
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
    
    // Update class in allClasses as well
    const updatedClasses = allClasses.map(classItem => 
      classItem.id === updatedChurchData.id ? updatedChurchData : classItem
    );
    setAllClasses(updatedClasses);
    
    // Save to localStorage
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
    
    // Update class in allClasses as well
    const updatedClasses = allClasses.map(classItem => 
      classItem.id === updatedChurchData.id ? updatedChurchData : classItem
    );
    setAllClasses(updatedClasses);
    
    // Save to localStorage
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
    
    // Update class in allClasses as well
    const updatedClasses = allClasses.map(classItem => 
      classItem.id === updatedChurchData.id ? updatedChurchData : classItem
    );
    setAllClasses(updatedClasses);
    
    // Save to localStorage
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
    
    // Update class in allClasses as well
    const updatedClasses = allClasses.map(classItem => 
      classItem.id === updatedChurchData.id ? updatedChurchData : classItem
    );
    setAllClasses(updatedClasses);
    
    // Save to localStorage
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
    
    // Update class in allClasses as well
    const updatedClasses = allClasses.map(classItem => 
      classItem.id === updatedChurchData.id ? updatedChurchData : classItem
    );
    setAllClasses(updatedClasses);
    
    // Save to localStorage
    localStorage.setItem("ebdChurchData", JSON.stringify(updatedChurchData));
    localStorage.setItem("ebdAllClasses", JSON.stringify(updatedClasses));
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
    
    // Update class in allClasses as well
    const updatedClasses = allClasses.map(classItem => 
      classItem.id === updatedChurchData.id ? updatedChurchData : classItem
    );
    setAllClasses(updatedClasses);
    
    // Save to localStorage
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
    
    // Update class in allClasses as well
    const updatedClasses = allClasses.map(classItem => 
      classItem.id === updatedChurchData.id ? updatedChurchData : classItem
    );
    setAllClasses(updatedClasses);
    
    // Save to localStorage
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
