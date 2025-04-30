
import React from "react";
import { useChurch } from "@/context/ChurchContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ReportsTab = () => {
  const { churchData } = useChurch();

  const calculateAttendancePercentage = (attendance: boolean[]): number => {
    if (attendance.length === 0) return 0;
    const presentCount = attendance.filter(Boolean).length;
    return Math.round((presentCount / attendance.length) * 100);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios de Frequência</CardTitle>
          <CardDescription>
            Visualize o relatório de presença de cada membro da turma
          </CardDescription>
        </CardHeader>
        <CardContent>
          {churchData?.members.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhum membro cadastrado para gerar relatórios
            </div>
          ) : (
            <div className="space-y-6">
              {churchData?.members.map((member) => {
                const percentage = calculateAttendancePercentage(member.attendance);
                return (
                  <div key={member.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{member.name}</h3>
                      <span className="text-sm font-medium">{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <div className="grid grid-cols-13 gap-1 mt-2">
                      {member.attendance.map((isPresent, index) => (
                        <div
                          key={index}
                          className={`h-2 w-full rounded-sm ${
                            isPresent ? "bg-green-500" : "bg-red-300"
                          }`}
                          title={`Semana ${index + 1}: ${isPresent ? "Presente" : "Ausente"}`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumo de Frequência</CardTitle>
          <CardDescription>
            Tabela detalhada de frequência por semana
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="text-right">Total de Presenças</TableHead>
                  <TableHead className="text-right">% de Frequência</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {churchData?.members.map((member) => {
                  const presentCount = member.attendance.filter(Boolean).length;
                  const percentage = calculateAttendancePercentage(member.attendance);
                  return (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell className="text-right">
                        {presentCount} de {member.attendance.length}
                      </TableCell>
                      <TableCell className="text-right">{percentage}%</TableCell>
                    </TableRow>
                  );
                })}
                {churchData?.members.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4 text-gray-500">
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

export default ReportsTab;
