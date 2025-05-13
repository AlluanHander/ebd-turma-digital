
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Inventory } from "@/types/InventoryTypes";
import { checkAndResetInventory } from "@/services/InventoryResetService";

interface InventoryContextType {
  inventory: Inventory;
  updateInventory: (field: keyof Inventory, value: number) => void;
  incrementItem: (field: keyof Inventory) => void;
  decrementItem: (field: keyof Inventory) => void;
}

const defaultInventory: Inventory = {
  bibles: 0,
  magazines: 0,
  offerings: 0,
  lastResetDate: new Date().toISOString(),
};

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory deve ser usado dentro de um InventoryProvider");
  }
  return context;
};

interface InventoryProviderProps {
  children: ReactNode;
}

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  const [inventory, setInventory] = useState<Inventory>(() => {
    const savedInventory = localStorage.getItem("ebdInventory");
    return savedInventory ? JSON.parse(savedInventory) : defaultInventory;
  });

  // Check for reset on component mount and when it's a new day
  useEffect(() => {
    const updatedInventory = checkAndResetInventory(inventory);
    if (updatedInventory.lastResetDate !== inventory.lastResetDate) {
      setInventory(updatedInventory);
    }
    
    // Check every hour for a day change
    const intervalId = setInterval(() => {
      setInventory(prev => {
        const updated = checkAndResetInventory(prev);
        return updated;
      });
    }, 3600000); // 1 hour in milliseconds
    
    return () => clearInterval(intervalId);
  }, []);

  // Save to localStorage whenever inventory changes
  useEffect(() => {
    localStorage.setItem("ebdInventory", JSON.stringify(inventory));
  }, [inventory]);

  const updateInventory = (field: keyof Inventory, value: number) => {
    if (field === "lastResetDate") return; // Protect lastResetDate from direct updates
    
    setInventory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const incrementItem = (field: keyof Inventory) => {
    if (field === "lastResetDate") return; // Protect lastResetDate from direct updates
    
    setInventory((prev) => ({
      ...prev,
      [field]: prev[field] + 1,
    }));
  };

  const decrementItem = (field: keyof Inventory) => {
    if (field === "lastResetDate") return; // Protect lastResetDate from direct updates
    
    setInventory((prev) => ({
      ...prev,
      [field]: Math.max(0, prev[field] - 1),
    }));
  };

  return (
    <InventoryContext.Provider value={{ inventory, updateInventory, incrementItem, decrementItem }}>
      {children}
    </InventoryContext.Provider>
  );
};
