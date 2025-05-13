
import { startOfDay, isToday, isSunday, parseISO, differenceInDays } from "date-fns";
import { Inventory } from "@/types/InventoryTypes";
import { toast } from "@/hooks/use-toast";

export const checkAndResetInventory = (inventory: Inventory): Inventory => {
  const today = startOfDay(new Date());
  
  // If first time using the app or no last reset date
  if (!inventory.lastResetDate) {
    return {
      ...inventory,
      lastResetDate: today.toISOString(),
    };
  }
  
  const lastResetDate = parseISO(inventory.lastResetDate);
  
  // Check if today is Sunday and we haven't reset today
  if (isSunday(today) && !isToday(lastResetDate)) {
    // If it's been at least a day since the last reset
    if (differenceInDays(today, lastResetDate) >= 1) {
      // Show toast notification
      toast({
        title: "Reinício automático",
        description: "O inventário foi reiniciado para o novo domingo de EBD.",
      });
      
      // Reset inventory
      return {
        bibles: 0,
        magazines: 0, 
        offerings: 0,
        lastResetDate: today.toISOString(),
      };
    }
  }
  
  // No reset needed
  return inventory;
};
