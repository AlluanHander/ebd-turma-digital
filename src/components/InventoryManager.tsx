
import React, { useState } from "react";
import { useInventory } from "@/context/InventoryContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { MinusCircle, PlusCircle, Book, BookOpen, DollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const InventoryManager: React.FC = () => {
  const { inventory, updateInventory, incrementItem, decrementItem } = useInventory();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (field: keyof typeof inventory, value: string) => {
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Inventário da EBD</DialogTitle>
            <DialogDescription>
              Controle a quantidade de bíblias, revistas e ofertas
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 my-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Book className="h-5 w-5 text-ebd-blue" /> 
                  Bíblias
                </CardTitle>
                <CardDescription>
                  Quantidade de bíblias disponíveis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => decrementItem("bibles")}
                    disabled={inventory.bibles <= 0}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={inventory.bibles}
                    onChange={(e) => handleInputChange("bibles", e.target.value)}
                    className="text-center"
                    min="0"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => incrementItem("bibles")}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5 text-ebd-blue" /> 
                  Revistas
                </CardTitle>
                <CardDescription>
                  Quantidade de revistas disponíveis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => decrementItem("magazines")}
                    disabled={inventory.magazines <= 0}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={inventory.magazines}
                    onChange={(e) => handleInputChange("magazines", e.target.value)}
                    className="text-center"
                    min="0"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => incrementItem("magazines")}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-5 w-5 text-ebd-blue" /> 
                  Ofertas (R$)
                </CardTitle>
                <CardDescription>
                  Total de ofertas recebidas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => decrementItem("offerings")}
                    disabled={inventory.offerings <= 0}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={inventory.offerings}
                    onChange={(e) => handleInputChange("offerings", e.target.value)}
                    className="text-center"
                    min="0"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => incrementItem("offerings")}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={() => {
                setIsDialogOpen(false);
                toast({
                  title: "Inventário atualizado",
                  description: "Os dados foram salvos com sucesso!"
                });
              }}
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InventoryManager;
