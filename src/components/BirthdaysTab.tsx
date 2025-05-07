
import React, { useState } from "react";
import { useChurch } from "@/context/ChurchContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Cake } from "lucide-react";

const BirthdaysTab = () => {
  const { churchData, addMember, removeMember, updateMemberBirthday } = useChurch();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberBirthday, setNewMemberBirthday] = useState("");
  const [editingMember, setEditingMember] = useState<{ id: string; name: string; birthday?: string }>({ id: "", name: "", birthday: "" });
  const { toast } = useToast();

  const handleAddMember = () => {
    if (!newMemberName.trim()) {
      toast({
        title: "Nome inválido",
        description: "Por favor, insira um nome válido",
        variant: "destructive"
      });
      return;
    }
    
    addMember(newMemberName, newMemberBirthday);
    
    toast({
      title: "Aluno adicionado",
      description: `${newMemberName} foi adicionado à classe`
    });
    
    setNewMemberName("");
    setNewMemberBirthday("");
    setIsAddDialogOpen(false);
  };

  const handleRemoveMember = (memberId: string, memberName: string) => {
    removeMember(memberId);
    toast({
      title: "Aluno removido",
      description: `${memberName} foi removido da classe`
    });
  };

  const openEditDialog = (member: { id: string; name: string; birthday?: string }) => {
    setEditingMember(member);
    setIsEditDialogOpen(true);
  };

  const handleUpdateBirthday = () => {
    if (editingMember.id && editingMember.birthday) {
      updateMemberBirthday(editingMember.id, editingMember.birthday);
      toast({
        title: "Aniversário atualizado",
        description: `O aniversário de ${editingMember.name} foi atualizado`
      });
      setIsEditDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Gerenciar Aniversários</h2>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Cake className="h-4 w-4" />
          Adicionar Aluno
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cake className="h-5 w-5" /> 
            Lista de Alunos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Data de Aniversário</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {churchData && churchData.members && churchData.members.length > 0 ? (
                churchData.members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.birthday || "Não informado"}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(member)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveMember(member.id, member.name)}
                        >
                          Remover
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                    Nenhum aluno cadastrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Member Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Aluno</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nome</label>
              <Input
                id="name"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                placeholder="Digite o nome do aluno"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="birthday" className="text-sm font-medium">Data de Aniversário</label>
              <Input
                id="birthday"
                value={newMemberBirthday}
                onChange={(e) => setNewMemberBirthday(e.target.value)}
                placeholder="DD/MM/AAAA"
              />
              <p className="text-xs text-gray-500">Formato: DD/MM/AAAA</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddMember}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Birthday Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Aniversário</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome</label>
              <p>{editingMember.name}</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-birthday" className="text-sm font-medium">Data de Aniversário</label>
              <Input
                id="edit-birthday"
                value={editingMember.birthday || ""}
                onChange={(e) => setEditingMember({...editingMember, birthday: e.target.value})}
                placeholder="DD/MM/AAAA"
              />
              <p className="text-xs text-gray-500">Formato: DD/MM/AAAA</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleUpdateBirthday}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BirthdaysTab;
