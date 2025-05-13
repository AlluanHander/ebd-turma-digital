
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Book, BookOpen, DollarSign } from "lucide-react";
import { Inventory } from "@/types/InventoryTypes";
import InventoryItemCard from "./InventoryItemCard";
import ResetAlert from "./ResetAlert";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface InventoryDialogProps {
  inventory: Inventory;
  onClose: () => void;
  incrementItem: (field: keyof Inventory) => void;
  decrementItem: (field: keyof Inventory) => void;
  handleInputChange: (field: keyof Inventory, value: string) => void;
  isTodaySunday: boolean;
  lastResetDate: string;
  nextResetDate: string;
}

const InventoryDialog: React.FC<InventoryDialogProps> = ({
  inventory,
  onClose,
  incrementItem,
  decrementItem,
  handleInputChange,
  isTodaySunday,
  lastResetDate,
  nextResetDate,
}) => {
  const inventoryItems = [
    {
      title: "Bíblias",
      description: "Quantidade de bíblias disponíveis",
      field: "bibles" as keyof Inventory,
      icon: Book,
      value: inventory.bibles,
    },
    {
      title: "Revistas",
      description: "Quantidade de revistas disponíveis",
      field: "magazines" as keyof Inventory,
      icon: BookOpen,
      value: inventory.magazines,
    },
    {
      title: "Ofertas (R$)",
      description: "Total de ofertas recebidas",
      field: "offerings" as keyof Inventory,
      icon: DollarSign,
      value: inventory.offerings,
    },
  ];

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Inventário da EBD</DialogTitle>
        <DialogDescription>
          Controle a quantidade de bíblias, revistas e ofertas
        </DialogDescription>
      </DialogHeader>

      <ResetAlert 
        isTodaySunday={isTodaySunday} 
        lastResetDate={lastResetDate}
        nextResetDate={nextResetDate}
      />

      <div className="grid gap-6 my-4">
        {inventoryItems.map((item) => (
          <InventoryItemCard
            key={item.field}
            title={item.title}
            description={item.description}
            value={item.value}
            field={item.field}
            icon={item.icon}
            onIncrement={incrementItem}
            onDecrement={decrementItem}
            onInputChange={handleInputChange}
          />
        ))}
      </div>

      <DialogFooter>
        <Button variant="outline" className="mr-2" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          onClick={() => {
            onClose();
            toast({
              title: "Inventário atualizado",
              description: "Os dados foram salvos com sucesso!",
              duration: 3000,
            });
          }}
        >
          Salvar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default InventoryDialog;
