
import React, { useState } from "react";
import { useChurch } from "@/context/ChurchContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const VisitorsTab = () => {
  const { churchData, addVisitor, removeVisitor } = useChurch();
  const [newVisitorName, setNewVisitorName] = useState("");
  const [visitorToDelete, setVisitorToDelete] = useState<{ id: string, name: string } | null>(null);

  const handleAddVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (newVisitorName.trim()) {
      addVisitor(newVisitorName.trim());
      setNewVisitorName("");
      toast({
        title: "Visitante adicionado",
        description: `${newVisitorName} foi adicionado à lista de visitantes.`,
      });
    }
  };

  const handleDeleteVisitor = () => {
    if (visitorToDelete) {
      removeVisitor(visitorToDelete.id);
      toast({
        title: "Visitante removido",
        description: `${visitorToDelete.name} foi removido da lista.`,
      });
      setVisitorToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Visitante</CardTitle>
          <CardDescription>
            Registre os visitantes que compareceram à sua turma de EBD
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddVisitor} className="flex items-end gap-2">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Nome do Visitante</label>
              <Input
                value={newVisitorName}
                onChange={(e) => setNewVisitorName(e.target.value)}
                placeholder="Digite o nome completo"
              />
            </div>
            <Button type="submit" className="bg-ebd-blue hover:bg-ebd-navy">
              Adicionar
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Visitantes</CardTitle>
          <CardDescription>
            Visitantes registrados na sua turma de EBD
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Nome</TableHead>
                  <TableHead>Data da Visita</TableHead>
                  <TableHead className="w-16 text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {churchData?.visitors && churchData.visitors.length > 0 ? (
                  churchData.visitors.map((visitor) => (
                    <TableRow key={visitor.id}>
                      <TableCell className="font-medium">{visitor.name}</TableCell>
                      <TableCell>{visitor.date}</TableCell>
                      <TableCell className="text-center">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-red-500 hover:text-red-700 hover:bg-red-100"
                              onClick={() => setVisitorToDelete({ id: visitor.id, name: visitor.name })}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir {visitor.name} da lista de visitantes? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setVisitorToDelete(null)}>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDeleteVisitor} className="bg-red-500 hover:bg-red-600">
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                      Nenhum visitante registrado ainda
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorsTab;
