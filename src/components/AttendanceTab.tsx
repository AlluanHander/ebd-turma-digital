
import React, { useState } from "react";
import { useChurch } from "@/context";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CalendarView from "@/components/CalendarView";
import { Calendar, CheckCircle, XCircle, UserPlus, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const AttendanceTab = () => {
  const { churchData, updateAttendance, addMember, removeMember } = useChurch();
  const [currentWeek, setCurrentWeek] = useState(0);
  const [newMemberName, setNewMemberName] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  if (!churchData) return null;

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      addMember(newMemberName.trim());
      setNewMemberName("");
      setIsAddDialogOpen(false);
      toast({
        title: "Membro Adicionado",
        description: `${newMemberName.trim()} foi adicionado à lista de membros.`,
      });
    }
  };

  const handleWeekChange = (weekIndex: number) => {
    if (weekIndex >= 0 && weekIndex < 13) {
      setCurrentWeek(weekIndex);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2 space-y-6">
          <CalendarView 
            currentWeek={currentWeek} 
            onWeekChange={handleWeekChange} 
          />

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Calendar className="h-6 w-6 text-ebd-blue" />
                Semana {currentWeek + 1} de 13
              </CardTitle>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Novo Membro
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Membro</DialogTitle>
                    <DialogDescription>
                      Insira o nome do novo membro da classe.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Nome do membro"
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleAddMember}>Adicionar</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {churchData.members.length === 0 ? (
                <div className="text-center p-4 text-gray-500">
                  Nenhum membro cadastrado. Adicione membros para registrar presenças.
                </div>
              ) : (
                <div className="space-y-2">
                  {churchData.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                    >
                      <div className="font-medium">{member.name}</div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={member.attendance[currentWeek] ? "default" : "outline"}
                          className="cursor-pointer"
                        >
                          {member.attendance[currentWeek] ? "Presente" : "Ausente"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateAttendance(member.id, currentWeek, true)
                          }
                          className="text-green-600 h-8 w-8"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateAttendance(member.id, currentWeek, false)
                          }
                          className="text-red-600 h-8 w-8"
                        >
                          <XCircle className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            removeMember(member.id);
                            toast({
                              title: "Membro Removido",
                              description: `${member.name} foi removido da lista de membros.`,
                            });
                          }}
                          className="text-gray-600 h-8 w-8"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle>Estado da Turma - Semana {currentWeek + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Resumo de Presenças:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-100 p-3 rounded-md">
                      <p className="text-sm text-green-800">Presentes</p>
                      <p className="text-2xl font-bold text-green-800">
                        {churchData.members.filter(m => m.attendance[currentWeek]).length}
                      </p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-md">
                      <p className="text-sm text-red-800">Ausentes</p>
                      <p className="text-2xl font-bold text-red-800">
                        {churchData.members.filter(m => !m.attendance[currentWeek]).length}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Estatísticas:</h3>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-sm text-gray-800">
                      Taxa de Presença
                    </p>
                    <p className="text-2xl font-bold text-gray-800">
                      {churchData.members.length > 0
                        ? Math.round(
                            (churchData.members.filter(m => m.attendance[currentWeek]).length /
                              churchData.members.length) *
                              100
                          )
                        : 0}
                      %
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTab;
