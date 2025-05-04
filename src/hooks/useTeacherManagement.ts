
import { Class } from "@/types/ChurchTypes";
import { updateClassInList } from "@/utils/churchDataUtils";

export const useTeacherManagement = (
  churchData: Class | null,
  setChurchData: (data: Class | null) => void,
  allClasses: Class[],
  setAllClasses: (classes: Class[]) => void
) => {
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

  return { setTeacher };
};
