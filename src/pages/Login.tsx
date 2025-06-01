
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useChurch } from "@/context/ChurchContext";
import { useTeacher } from "@/context/TeacherContext";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Book } from "lucide-react";

const Login = () => {
  // Church login state
  const [churchName, setChurchName] = useState("");
  const [sector, setSector] = useState("");
  
  // Secretary login state
  const [secretaryUsername, setSecretaryUsername] = useState("");
  const [secretaryPassword, setSecretaryPassword] = useState("");
  
  // Teacher login state
  const [teacherUsername, setTeacherUsername] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  
  // Active tab
  const [activeTab, setActiveTab] = useState("church");
  
  const { setChurchInfo, secretaryLogin } = useChurch();
  const { teacherLogin } = useTeacher();
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
    
    if (!secretaryUsername.trim() || !secretaryPassword.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o usuário e a senha.",
        variant: "destructive",
      });
      return;
    }
    
    const success = secretaryLogin(secretaryUsername, secretaryPassword);
    
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
  
  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!teacherUsername.trim() || !teacherPassword.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o usuário e a senha.",
        variant: "destructive",
      });
      return;
    }
    
    const success = teacherLogin(teacherUsername, teacherPassword);
    
    if (success) {
      toast({
        title: "Login de professor realizado com sucesso!",
        description: "Bem-vindo ao sistema EBD.",
      });
      navigate("/home");
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
            <TabsList className="grid w-full grid-cols-3 mb-4 mt-4 px-6">
              <TabsTrigger value="church">Turma</TabsTrigger>
              <TabsTrigger value="teacher">Professor</TabsTrigger>
              <TabsTrigger value="secretary">Secretário</TabsTrigger>
            </TabsList>
            
            <TabsContent value="church">
              <form onSubmit={handleChurchSubmit}>
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
            </TabsContent>
            
            <TabsContent value="teacher">
              <form onSubmit={handleTeacherSubmit}>
                <CardContent className="pt-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="teacherUsername">Usuário</Label>
                      <div className="relative">
                        <Input
                          id="teacherUsername"
                          placeholder="Nome de usuário"
                          value={teacherUsername}
                          onChange={(e) => setTeacherUsername(e.target.value)}
                          className="pl-10"
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="teacherPassword">Senha</Label>
                      <div className="relative">
                        <Input
                          id="teacherPassword"
                          type="password"
                          placeholder="Senha"
                          value={teacherPassword}
                          onChange={(e) => setTeacherPassword(e.target.value)}
                          className="pl-10"
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 italic">
                      <p>Para teste, use: professor / 123456</p>
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
                      <Label htmlFor="secretaryUsername">Usuário</Label>
                      <div className="relative">
                        <Input
                          id="secretaryUsername"
                          placeholder="Usuário"
                          value={secretaryUsername}
                          onChange={(e) => setSecretaryUsername(e.target.value)}
                          className="pl-10"
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="secretaryPassword">Senha</Label>
                      <div className="relative">
                        <Input
                          id="secretaryPassword"
                          type="password"
                          placeholder="Senha"
                          value={secretaryPassword}
                          onChange={(e) => setSecretaryPassword(e.target.value)}
                          className="pl-10"
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
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
