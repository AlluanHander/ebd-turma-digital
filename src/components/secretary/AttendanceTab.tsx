
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Class } from "@/types/ChurchTypes";

interface AttendanceTabProps {
  allClasses: Class[];
}

const AttendanceTab: React.FC<AttendanceTabProps> = ({ allClasses }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequência Geral</CardTitle>
        <CardDescription>
          Relatório de frequência das turmas
        </CardDescription>
      </CardHeader>
      <CardContent>
        {allClasses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Nenhuma turma cadastrada para exibir frequência</p>
        ) : (
          <div className="space-y-6">
            {allClasses.map((cls) => (
              <div key={cls.id} className="border p-4 rounded-lg">
                <h3 className="font-bold mb-2">{cls.churchName} - {cls.sector}</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Aluno</TableHead>
                        <TableHead className="text-right">Total de Presenças</TableHead>
                        <TableHead className="text-right">% de Frequência</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cls.members.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-2 text-gray-500">
                            Nenhum membro nesta turma
                          </TableCell>
                        </TableRow>
                      ) : (
                        cls.members.map((member) => {
                          const presentCount = member.attendance.filter(Boolean).length;
                          const percentage = Math.round((presentCount / member.attendance.length) * 100);
                          
                          return (
                            <TableRow key={member.id}>
                              <TableCell>{member.name}</TableCell>
                              <TableCell className="text-right">
                                {presentCount} de {member.attendance.length}
                              </TableCell>
                              <TableCell className="text-right">{percentage}%</TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceTab;
