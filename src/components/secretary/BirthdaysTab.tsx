
import React from "react";
import { useChurch } from "@/context/ChurchContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Cake } from "lucide-react";
import { getAllBirthdaysThisMonth } from "@/utils/churchDataUtils";

const SecretaryBirthdaysTab = () => {
  const { allClasses } = useChurch();
  const birthdaysThisMonth = getAllBirthdaysThisMonth(allClasses);
  const currentMonth = new Date().toLocaleDateString('pt-BR', { month: 'long' });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cake className="h-5 w-5" /> 
            Aniversariantes do mês de {currentMonth}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Data de Aniversário</TableHead>
                <TableHead>Classe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {birthdaysThisMonth.length > 0 ? (
                birthdaysThisMonth.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.member.name}</TableCell>
                    <TableCell>{item.member.birthday}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.className}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                    Nenhum aniversariante neste mês
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecretaryBirthdaysTab;
