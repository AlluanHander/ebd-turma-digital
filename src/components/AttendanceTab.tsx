
import React, { useState } from "react";
import { useChurch } from "@/context/ChurchContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const AttendanceTab = () => {
  const { churchData, addMember, updateAttendance } = useChurch();
  const [newMemberName, setNewMemberName] = useState("");
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
                  </TableRow>
                ))}
                {churchData?.members.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={14} className="text-center py-4 text-gray-500">
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
