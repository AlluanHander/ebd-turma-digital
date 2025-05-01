
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useChurch } from "@/context/ChurchContext";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  // Church login state
  const [churchName, setChurchName] = useState("");
  const [sector, setSector] = useState("");
  
  // Secretary login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Active tab
  const [activeTab, setActiveTab] = useState("church");
  
  const { setChurchInfo, secretaryLogin } = useChurch();
  const navigate = useNavigate();

  const handleChurchSubmit = (e: React.FormEvent) => {
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
  
  const handleSecretarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o usuário e a senha.",
        variant: "destructive",
      });
      return;
    }
    
    const success = secretaryLogin(username, password);
    
    if (success) {
      toast({
        title: "Login de secretário realizado com sucesso!",
        description: "Bem-vindo ao sistema EBD.",
      });
      navigate("/secretary");
    } else {
      toast({
        title: "Erro no login",
        description: "Usuário ou senha incorretos.",
        variant: "destructive",
      });
    }
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
              Acesse o sistema EBD
            </CardDescription>
          </CardHeader>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4 mt-4 px-6">
              <TabsTrigger value="church">Professor</TabsTrigger>
              <TabsTrigger value="secretary">Secretário</TabsTrigger>
            </TabsList>
            
            <TabsContent value="church">
              <form onSubmit={handleChurchSubmit}>
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
                    Entrar como Professor
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="secretary">
              <form onSubmit={handleSecretarySubmit}>
                <CardContent className="pt-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="username">Usuário</Label>
                      <Input
                        id="username"
                        placeholder="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="text-sm text-gray-500 italic">
                      <p>Para teste, use: secretario / 123456</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-ebd-blue hover:bg-ebd-navy">
                    Entrar como Secretário
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Login;
