import React, { useState } from "react";
import { useInventory } from "@/context/InventoryContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { MinusCircle, PlusCircle, Book, BookOpen, DollarSign, RefreshCw, Calendar } from "lucide-react";
import { format, parseISO, nextSunday, isSunday } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const InventoryManager: React.FC = () => {
  const { inventory, updateInventory, incrementItem, decrementItem } = useInventory();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (field: keyof typeof inventory, value: string) => {
    if (field === "lastResetDate") return; // Proteger lastResetDate
    
    const numValue = parseInt(value) || 0;
    updateInventory(field, numValue >= 0 ? numValue : 0);
  };

  // Calcular próxima data de reinicialização (próximo domingo)
  const getNextResetDate = () => {
    const today = new Date();
    const next = nextSunday(today);
    return format(next, "dd 'de' MMMM", { locale: ptBR });
  };

  // Formatar a data da última reinicialização
  const getLastResetDate = () => {
    if (!inventory.lastResetDate) return "Nunca";
    try {
      return format(parseISO(inventory.lastResetDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (e) {
      return "Data inválida";
    }
  };

  // Verificar se hoje é domingo (dia de reinicialização)
  const isTodaySunday = isSunday(new Date());

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

          <Alert className={`mb-4 ${isTodaySunday ? "bg-blue-100 border-blue-300" : "bg-blue-50 border-blue-200"}`}>
            <Calendar className={`h-4 w-4 ${isTodaySunday ? "text-blue-600" : "text-blue-500"}`} />
            <AlertTitle className={`${isTodaySunday ? "text-blue-800" : "text-blue-700"}`}>
              Sistema de reinicialização automática
            </AlertTitle>
            <AlertDescription className={`text-sm ${isTodaySunday ? "text-blue-800" : "text-blue-700"}`}>
              {isTodaySunday ? (
                <span className="font-medium">Hoje é domingo! O inventário será reiniciado automaticamente.</span>
              ) : (
                "O inventário será zerado automaticamente todo domingo."
              )}
              <div className="mt-1">
                <span className="font-semibold">Último reset:</span> {getLastResetDate()}
              </div>
              <div>
                <span className="font-semibold">Próximo reset:</span> {getNextResetDate()}
              </div>
            </AlertDescription>
          </Alert>

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

          <DialogFooter>
            <Button 
              variant="outline"
              className="mr-2"
              onClick={() => {
                setIsDialogOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={() => {
                setIsDialogOpen(false);
                toast({
                  title: "Inventário atualizado",
                  description: "Os dados foram salvos com sucesso!",
                  duration: 3000, // 3 segundos
                });
              }}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InventoryManager;
