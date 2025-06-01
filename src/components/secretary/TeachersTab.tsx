
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChurch } from "@/context/ChurchContext";
import { toast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, User, Mail, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Teacher } from "@/types/ChurchTypes";

const TeachersTab = () => {
  const { allTeachers, allClasses, registerTeacher, updateTeacher, removeTeacher } = useChurch();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  
  // Form states
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const resetForm = () => {
    setTeacherName("");
    setTeacherEmail("");
    setTeacherPassword("");
    setSelectedClasses([]);
  };

  const handleCreateTeacher = () => {
    if (!teacherName.trim() || !teacherEmail.trim() || !teacherPassword.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    const success = registerTeacher(teacherName, teacherEmail, teacherPassword, selectedClasses);
    
    if (success) {
      toast({
        title: "Professor cadastrado!",
        description: "O professor foi cadastrado com sucesso.",
      });
      setIsCreateDialogOpen(false);
      resetForm();
    } else {
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível cadastrar o professor.",
        variant: "destructive",
      });
    }
  };

  const handleEditTeacher = () => {
    if (!selectedTeacher || !teacherName.trim() || !teacherEmail.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    const success = updateTeacher(selectedTeacher.id, teacherName, teacherEmail, selectedClasses);
    
    if (success) {
      toast({
        title: "Professor atualizado!",
        description: "Os dados do professor foram atualizados.",
      });
      setIsEditDialogOpen(false);
      setSelectedTeacher(null);
      resetForm();
    } else {
      toast({
        title: "Erro na atualização",
        description: "Não foi possível atualizar o professor.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveTeacher = (teacherId: string) => {
    const success = removeTeacher(teacherId);
    
    if (success) {
      toast({
        title: "Professor removido!",
        description: "O professor foi removido do sistema.",
      });
    } else {
      toast({
        title: "Erro na remoção",
        description: "Não foi possível remover o professor.",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setTeacherName(teacher.name);
    setTeacherEmail(teacher.email);
    setSelectedClasses(teacher.assignedClasses);
    setIsEditDialogOpen(true);
  };

  const handleClassSelection = (classId: string, checked: boolean) => {
    if (checked) {
      setSelectedClasses([...selectedClasses, classId]);
    } else {
      setSelectedClasses(selectedClasses.filter(id => id !== classId));
    }
  };

  const getClassNames = (classIds: string[]) => {
    return classIds
      .map(id => allClasses.find(cls => cls.id === id)?.sector)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gerenciar Professores</h2>
          <p className="text-gray-600">Cadastre e gerencie professores do sistema</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ebd-blue hover:bg-ebd-navy">
              <Plus className="h-4 w-4 mr-2" />
              Novo Professor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Professor</DialogTitle>
              <DialogDescription>
                Preencha os dados do professor e selecione as salas que ele irá lecionar.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="teacherName">Nome Completo</Label>
                <div className="relative">
                  <Input
                    id="teacherName"
                    placeholder="Digite o nome do professor"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="pl-10"
                  />
                  <div className="absolute left-3 top-2.5 text-gray-500">
                    <User size={18} />
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="teacherEmail">E-mail</Label>
                <div className="relative">
                  <Input
                    id="teacherEmail"
                    type="email"
                    placeholder="professor@exemplo.com"
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    className="pl-10"
                  />
                  <div className="absolute left-3 top-2.5 text-gray-500">
                    <Mail size={18} />
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="teacherPassword">Senha</Label>
                <div className="relative">
                  <Input
                    id="teacherPassword"
                    type="password"
                    placeholder="Digite a senha"
                    value={teacherPassword}
                    onChange={(e) => setTeacherPassword(e.target.value)}
                    className="pl-10"
                  />
                  <div className="absolute left-3 top-2.5 text-gray-500">
                    <Lock size={18} />
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label>Salas Atribuídas</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {allClasses.map((classItem) => (
                    <div key={classItem.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`class-${classItem.id}`}
                        checked={selectedClasses.includes(classItem.id)}
                        onCheckedChange={(checked) => handleClassSelection(classItem.id, checked === true)}
                      />
                      <label
                        htmlFor={`class-${classItem.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {classItem.sector} - {classItem.churchName}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateTeacher} className="bg-ebd-blue hover:bg-ebd-navy">
                Cadastrar Professor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {allTeachers.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <User className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-center">
                Nenhum professor cadastrado ainda.
                <br />
                Clique em "Novo Professor" para começar.
              </p>
            </CardContent>
          </Card>
        ) : (
          allTeachers.map((teacher) => (
            <Card key={teacher.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {teacher.name}
                    </CardTitle>
                    <CardDescription>{teacher.email}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(teacher)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveTeacher(teacher.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="text-sm font-medium mb-2">Salas Atribuídas:</h4>
                  <p className="text-sm text-gray-600">
                    {teacher.assignedClasses.length > 0 
                      ? getClassNames(teacher.assignedClasses)
                      : "Nenhuma sala atribuída"
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Professor</DialogTitle>
            <DialogDescription>
              Atualize os dados do professor e suas salas atribuídas.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="editTeacherName">Nome Completo</Label>
              <div className="relative">
                <Input
                  id="editTeacherName"
                  placeholder="Digite o nome do professor"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="pl-10"
                />
                <div className="absolute left-3 top-2.5 text-gray-500">
                  <User size={18} />
                </div>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="editTeacherEmail">E-mail</Label>
              <div className="relative">
                <Input
                  id="editTeacherEmail"
                  type="email"
                  placeholder="professor@exemplo.com"
                  value={teacherEmail}
                  onChange={(e) => setTeacherEmail(e.target.value)}
                  className="pl-10"
                />
                <div className="absolute left-3 top-2.5 text-gray-500">
                  <Mail size={18} />
                </div>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Salas Atribuídas</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {allClasses.map((classItem) => (
                  <div key={classItem.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-class-${classItem.id}`}
                      checked={selectedClasses.includes(classItem.id)}
                      onCheckedChange={(checked) => handleClassSelection(classItem.id, checked === true)}
                    />
                    <label
                      htmlFor={`edit-class-${classItem.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {classItem.sector} - {classItem.churchName}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditTeacher} className="bg-ebd-blue hover:bg-ebd-navy">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeachersTab;
