
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Class } from "@/types/ChurchTypes";

interface ClassesTabProps {
  allClasses: Class[];
  switchClass: (classId: string) => void;
}

const ClassesTab: React.FC<ClassesTabProps> = ({ allClasses, switchClass }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todas as Classes</CardTitle>
        <CardDescription>
          Visão geral de todas as classes cadastradas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Igreja</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead>Professor</TableHead>
                <TableHead>Qtd. Membros</TableHead>
                <TableHead>Qtd. Avisos</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allClasses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                    Nenhuma classe cadastrada ainda
                  </TableCell>
                </TableRow>
              ) : (
                allClasses.map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell>{cls.churchName}</TableCell>
                    <TableCell>{cls.sector}</TableCell>
                    <TableCell>{cls.teacher || "Não definido"}</TableCell>
                    <TableCell>{cls.members.length}</TableCell>
                    <TableCell>{cls.announcements.length}</TableCell>
                    <TableCell>
                      <Button 
                        size="sm"
                        onClick={() => {
                          switchClass(cls.id);
                          navigate("/classe");
                        }}
                      >
                        Gerenciar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassesTab;
