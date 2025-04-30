
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useChurch } from "@/context/ChurchContext";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const [churchName, setChurchName] = useState("");
  const [sector, setSector] = useState("");
  const { setChurchInfo } = useChurch();
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

    setChurchInfo(churchName, sector);
    toast({
      title: "Login realizado com sucesso!",
      description: "Bem-vindo ao sistema EBD.",
    });
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ebd-gray p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-ebd-blue mb-2">EBD</h1>
          <p className="text-lg text-gray-600">Escola Bíblica Dominical</p>
        </div>

        <Card className="w-full">
          <CardHeader className="ebd-gradient text-white rounded-t-lg">
            <CardTitle className="text-xl font-semibold">Login</CardTitle>
            <CardDescription className="text-white/80">
              Insira os dados da sua igreja
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="churchName">Nome da Igreja</Label>
                  <Input
                    id="churchName"
                    placeholder="Ex: Igreja Batista Central"
                    value={churchName}
                    onChange={(e) => setChurchName(e.target.value)}
                  />
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
                Entrar
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
