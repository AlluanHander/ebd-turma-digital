
import React, { useState } from "react";
import { useChurch } from "@/context/ChurchContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
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

const AttendanceTab = () => {
  const { churchData, addMember, updateAttendance, removeMember } = useChurch();
  const [newMemberName, setNewMemberName] = useState("");
  const [memberToDelete, setMemberToDelete] = useState<{ id: string, name: string } | null>(null);
  const weeks = Array.from({ length: 13 }, (_, i) => i + 1);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMemberName.trim()) {
      addMember(newMemberName.trim());
      setNewMemberName("");
      toast({
        title: "Membro adicionado",
        description: `${newMemberName} foi adicionado à lista.`,
      });
    }
  };

  const handleAttendanceChange = (memberId: string, weekIndex: number, isChecked: boolean) => {
    updateAttendance(memberId, weekIndex, isChecked);
  };

  const handleDeleteMember = () => {
    if (memberToDelete) {
      removeMember(memberToDelete.id);
      toast({
        title: "Membro removido",
        description: `${memberToDelete.name} foi removido da lista.`,
      });
      setMemberToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Membro</CardTitle>
          <CardDescription>
            Adicione um novo membro à sua turma de EBD
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddMember} className="flex items-end gap-2">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Nome do Membro</label>
              <Input
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
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
          <CardTitle>Controle de Presença</CardTitle>
          <CardDescription>
            Registre a presença dos membros nas 13 semanas do trimestre
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Nome</TableHead>
                  {weeks.map((week) => (
                    <TableHead key={week} className="text-center w-12">
                      {week}
                    </TableHead>
                  ))}
                  <TableHead className="w-16 text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {churchData?.members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    {member.attendance.map((isPresent, index) => (
                      <TableCell key={index} className="text-center">
                        <Checkbox
                          checked={isPresent}
                          onCheckedChange={(checked) => {
                            handleAttendanceChange(
                              member.id,
                              index,
                              checked === true
                            );
                          }}
                        />
                      </TableCell>
                    ))}
                    <TableCell className="text-center">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-100"
                            onClick={() => setMemberToDelete({ id: member.id, name: member.name })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir {member.name} da lista? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setMemberToDelete(null)}>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteMember} className="bg-red-500 hover:bg-red-600">
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
                {churchData?.members.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={15} className="text-center py-4 text-gray-500">
                      Nenhum membro adicionado ainda
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

export default AttendanceTab;
