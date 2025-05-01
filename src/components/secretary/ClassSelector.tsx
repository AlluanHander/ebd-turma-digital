
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Class } from "@/types/ChurchTypes";

interface ClassSelectorProps {
  allClasses: Class[];
  selectedClassId: string | null;
  onClassChange: (classId: string) => void;
}

const ClassSelector: React.FC<ClassSelectorProps> = ({ 
  allClasses, 
  selectedClassId, 
  onClassChange 
}) => {
  const navigate = useNavigate();

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Turmas</CardTitle>
        <CardDescription>
          Selecione uma turma para gerenciar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {allClasses.length === 0 ? (
          <p className="text-gray-500">Nenhuma turma cadastrada ainda.</p>
        ) : (
          <Select 
            value={selectedClassId || ""} 
            onValueChange={onClassChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma turma" />
            </SelectTrigger>
            <SelectContent>
              {allClasses.map(cls => (
                <SelectItem key={cls.id} value={cls.id}>
                  {cls.churchName} - {cls.sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => navigate("/home")}
        >
          Acessar turma selecionada
        </Button>
      </CardContent>
    </Card>
  );
};

export default ClassSelector;
