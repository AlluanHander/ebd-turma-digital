
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Book } from "lucide-react";

interface ChurchLoginFormProps {
  onSubmit: (churchName: string, sector: string) => void;
}

const ChurchLoginForm: React.FC<ChurchLoginFormProps> = ({ onSubmit }) => {
  const [churchName, setChurchName] = useState("");
  const [sector, setSector] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!churchName.trim() || !sector.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o nome da igreja e o setor.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(churchName, sector);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="pt-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="churchName">Nome da Igreja</Label>
            <div className="relative">
              <Input
                id="churchName"
                placeholder="Ex: Igreja Batista Central"
                value={churchName}
                onChange={(e) => setChurchName(e.target.value)}
                className="pl-10"
              />
              <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sector">Setor</Label>
            <Input
              id="sector"
              placeholder="Ex: Jovens"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full bg-ebd-blue hover:bg-ebd-navy">
          Entrar como Visitante
        </Button>
      </CardFooter>
    </form>
  );
};

export default ChurchLoginForm;
