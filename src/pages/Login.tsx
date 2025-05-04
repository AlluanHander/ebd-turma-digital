
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChurch } from "@/context/ChurchContext";
import { useTeacher } from "@/context/TeacherContext";
import { toast } from "@/components/ui/use-toast";

// Import the new components
import ChurchLoginForm from "@/components/login/ChurchLoginForm";
import TeacherLoginForm from "@/components/login/TeacherLoginForm";
import SecretaryLoginForm from "@/components/login/SecretaryLoginForm";
import LoginHeader from "@/components/login/LoginHeader";

const Login = () => {
  // Active tab
  const [activeTab, setActiveTab] = useState("church");
  
  const { setChurchInfo, secretaryLogin } = useChurch();
  const { teacherLogin } = useTeacher();
  const navigate = useNavigate();

  const handleChurchSubmit = (churchName: string, sector: string) => {
    setChurchInfo(churchName, sector);
    toast({
      title: "Login realizado com sucesso!",
      description: "Bem-vindo ao sistema EBD.",
    });
    navigate("/home");
  };
  
  const handleTeacherSubmit = (username: string, password: string) => {
    const success = teacherLogin(username, password);
    
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
  
  const handleSecretarySubmit = (username: string, password: string) => {
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
        <LoginHeader />

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
              <ChurchLoginForm onSubmit={handleChurchSubmit} />
            </TabsContent>
            
            <TabsContent value="teacher">
              <TeacherLoginForm onSubmit={handleTeacherSubmit} />
            </TabsContent>
            
            <TabsContent value="secretary">
              <SecretaryLoginForm onSubmit={handleSecretarySubmit} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Login;
