
import React, { useState } from "react";
import { useInventory } from "@/context/InventoryContext";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import InventoryDialog from "./inventory/InventoryDialog";
import { getNextResetDate, getLastResetDate, isTodaySunday } from "./inventory/DateUtils";

const InventoryManager: React.FC = () => {
  const { inventory, updateInventory, incrementItem, decrementItem } = useInventory();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (field: keyof typeof inventory, value: string) => {
    if (field === "lastResetDate") return; // Proteger lastResetDate
    
    const numValue = parseInt(value) || 0;
    updateInventory(field, numValue >= 0 ? numValue : 0);
  };

  return (
    <>
      <Button 
        onClick={() => setIsDialogOpen(true)}
        className="bg-ebd-blue hover:bg-ebd-navy flex items-center gap-2"
      >
        <Book className="h-4 w-4" />
        <span>Ver Inventário</span>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <InventoryDialog
          inventory={inventory}
          onClose={() => setIsDialogOpen(false)}
          incrementItem={incrementItem}
          decrementItem={decrementItem}
          handleInputChange={handleInputChange}
          isTodaySunday={isTodaySunday()}
          lastResetDate={getLastResetDate(inventory.lastResetDate)}
          nextResetDate={getNextResetDate()}
        />
      </Dialog>
    </>
  );
};

export default InventoryManager;
