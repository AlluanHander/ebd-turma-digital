
import { useState } from "react";
import { Class } from "@/types/ChurchTypes";
import { createNewClass, updateClassInList } from "@/utils/churchDataUtils";

export const useChurchData = () => {
  const [churchData, setChurchData] = useState<Class | null>(() => {
    const savedData = localStorage.getItem("ebdChurchData");
    return savedData ? JSON.parse(savedData) : null;
  });
  
  const [allClasses, setAllClasses] = useState<Class[]>(() => {
    const savedClasses = localStorage.getItem("ebdAllClasses");
    return savedClasses ? JSON.parse(savedClasses) : [];
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
    
    localStorage.removeItem("ebdChurchData");
  };

  return {
    churchData,
    setChurchData,
    allClasses,
    setAllClasses,
    setChurchInfo,
    switchClass,
    logout
  };
};
