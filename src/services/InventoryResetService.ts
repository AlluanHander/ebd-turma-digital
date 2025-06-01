
import { startOfDay, isToday, isSunday, parseISO, differenceInDays } from "date-fns";
import { Inventory } from "@/types/InventoryTypes";
import { toast } from "@/hooks/use-toast";

export const checkAndResetInventory = (inventory: Inventory): Inventory => {
  const today = startOfDay(new Date());
  
  // Se for a primeira vez usando o app ou não houver data de último reset
  if (!inventory.lastResetDate) {
    return {
      ...inventory,
      lastResetDate: today.toISOString(),
    };
  }
  
  const lastResetDate = parseISO(inventory.lastResetDate);
  
  // Verificar se hoje é domingo e não reiniciamos hoje ainda
  if (isSunday(today) && !isToday(lastResetDate)) {
    // Se passou pelo menos um dia desde o último reset
    if (differenceInDays(today, lastResetDate) >= 1) {
      // Mostrar notificação toast
      toast({
        title: "Reinício automático",
        description: "O inventário foi reiniciado para o novo domingo de EBD.",
        duration: 5000, // Exibir por 5 segundos
      });
      
      // Reiniciar inventário
      return {
        bibles: 0,
        magazines: 0, 
        offerings: 0,
        lastResetDate: today.toISOString(),
      };
    }
  }
  
  // Sem necessidade de reiniciar
  return inventory;
};
