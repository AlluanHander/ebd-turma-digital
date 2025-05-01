
import { createContext, useContext } from "react";
import { ChurchContextType } from "@/types/ChurchTypes";

export const ChurchContext = createContext<ChurchContextType | undefined>(undefined);

export const useChurch = () => {
  const context = useContext(ChurchContext);
  if (context === undefined) {
    throw new Error("useChurch must be used within a ChurchProvider");
  }
  return context;
};
