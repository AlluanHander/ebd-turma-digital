
import { Class } from "@/types/ChurchTypes";
import { createNewVisitor, updateClassInList } from "@/utils/churchDataUtils";

export const useVisitors = (
  churchData: Class | null,
  setChurchData: (data: Class | null) => void,
  allClasses: Class[],
  setAllClasses: (classes: Class[]) => void
) => {
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

  return { addVisitor, removeVisitor };
};
