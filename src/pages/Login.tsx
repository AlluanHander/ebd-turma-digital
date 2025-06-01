
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useChurch } from "@/context/ChurchContext";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Key, Lock, User, Trash2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Login = () => {
  // Common state
  const [churchName, setChurchName] = useState("");
  
  // Teacher login state
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [saveTeacherCredentials, setSaveTeacherCredentials] = useState(false);
  
  // Secretary login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [saveSecretaryCredentials, setSaveSecretaryCredentials] = useState(false);
  
  // Password reset state
  const [resetEmail, setResetEmail] = useState("");
  
  // Active tab
  const [activeTab, setActiveTab] = useState("teacher");
  
  const { secretaryLogin, teacherLogin, clearAllSecretaries, sendPasswordReset } = useChurch();
  const navigate = useNavigate();

  // Load saved credentials on component mount
  useEffect(() => {
    const savedChurchName = localStorage.getItem("ebdChurchName");
    if (savedChurchName) {
      setChurchName(savedChurchName);
    }

    const savedTeacherCredentials = localStorage.getItem("ebdTeacherCredentials");
    if (savedTeacherCredentials) {
      const { email, password } = JSON.parse(savedTeacherCredentials);
      setTeacherEmail(email);
      setTeacherPassword(password);
      setSaveTeacherCredentials(true);
    }

    const savedSecretaryCredentials = localStorage.getItem("ebdSecretaryCredentials");
    if (savedSecretaryCredentials) {
      const { username, password } = JSON.parse(savedSecretaryCredentials);
      setUsername(username);
      setPassword(password);
      setSaveSecretaryCredentials(true);
    }
  }, []);

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!teacherEmail.trim() || !teacherPassword.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    // Save credentials if checkbox is checked
    if (saveTeacherCredentials) {
      localStorage.setItem("ebdTeacherCredentials", JSON.stringify({
        email: teacherEmail,
        password: teacherPassword
      }));
    } else {
      localStorage.removeItem("ebdTeacherCredentials");
    }
    
    // Always save church name if provided
    if (churchName.trim()) {
      localStorage.setItem("ebdChurchName", churchName);
    }

    const success = teacherLogin(teacherEmail, teacherPassword);
    
    if (success) {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao sistema EBD, Professor.",
      });
      navigate("/classe");
    } else {
      toast({
        title: "Erro no login",
        description: "E-mail ou senha incorretos, ou você não tem salas atribuídas.",
        variant: "destructive",
      });
    }
  };
  
  const handleSecretarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }
    
    // Save credentials if checkbox is checked
    if (saveSecretaryCredentials) {
      localStorage.setItem("ebdSecretaryCredentials", JSON.stringify({
        username,
        password
      }));
    } else {
      localStorage.removeItem("ebdSecretaryCredentials");
    }
    
    // Always save church name if provided
    if (churchName.trim()) {
      localStorage.setItem("ebdChurchName", churchName);
    }
    
    const success = secretaryLogin(username, password);
    
    if (success) {
      toast({
        title: "Login de secretário realizado com sucesso!",
        description: "Bem-vindo ao sistema EBD, Secretário.",
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

  const handlePasswordReset = () => {
    if (!resetEmail.trim()) {
      toast({
        title: "E-mail obrigatório",
        description: "Por favor, informe seu e-mail para redefinição de senha.",
        variant: "destructive",
      });
      return;
    }

    const success = sendPasswordReset(resetEmail);
    
    if (success) {
      toast({
        title: "Solicitação enviada!",
        description: `Uma solicitação de redefinição de senha foi enviada para ebdvilaelida2024@gmail.com com seus dados.`,
      });
      
      // Clear email field
      setResetEmail("");
    } else {
      toast({
        title: "Erro no envio",
        description: "Não foi possível processar sua solicitação.",
        variant: "destructive",
      });
    }
  };

  const handleClearAllData = () => {
    // Limpar todos os secretários registrados
    clearAllSecretaries();
    
    // Limpar localStorage
    localStorage.removeItem("ebdAllClasses");
    localStorage.removeItem("ebdAllTeachers");
    localStorage.removeItem("ebdChurchData");
    localStorage.removeItem("ebdIsSecretary");
    localStorage.removeItem("ebdIsTeacher");
    localStorage.removeItem("ebdSecretaryData");
    localStorage.removeItem("ebdCurrentUser");
    localStorage.removeItem("ebdTeacherCredentials");
    localStorage.removeItem("ebdSecretaryCredentials");
    
    toast({
      title: "Dados limpos com sucesso!",
      description: "Todos os registros foram removidos.",
    });
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

          <CardContent className="pt-6">
            {/* Optional church name field */}
            <div className="grid gap-2 mb-4">
              <Label htmlFor="churchName">Nome da Igreja (opcional)</Label>
              <Input
                id="churchName"
                placeholder="Ex: Igreja Batista Central"
                value={churchName}
                onChange={(e) => setChurchName(e.target.value)}
              />
            </div>
          
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="teacher">Professor</TabsTrigger>
                <TabsTrigger value="secretary">Secretário</TabsTrigger>
              </TabsList>
              
              <TabsContent value="teacher">
                <form onSubmit={handleTeacherSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="teacherEmail">E-mail</Label>
                      <div className="relative">
                        <Input
                          id="teacherEmail"
                          type="email"
                          placeholder="professor@exemplo.com"
                          value={teacherEmail}
                          onChange={(e) => setTeacherEmail(e.target.value)}
                          className="pl-10"
                        />
                        <div className="absolute left-3 top-2.5 text-gray-500">
                          <Mail size={18} />
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="teacherPassword">Senha</Label>
                      <div className="relative">
                        <Input
                          id="teacherPassword"
                          type="password"
                          placeholder="Digite sua senha"
                          value={teacherPassword}
                          onChange={(e) => setTeacherPassword(e.target.value)}
                          className="pl-10"
                        />
                        <div className="absolute left-3 top-2.5 text-gray-500">
                          <Lock size={18} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox 
                        id="saveTeacherCredentials" 
                        checked={saveTeacherCredentials}
                        onCheckedChange={(checked) => {
                          setSaveTeacherCredentials(checked === true);
                        }}
                      />
                      <label
                        htmlFor="saveTeacherCredentials"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Salvar dados de acesso
                      </label>
                    </div>
                  </div>
                
                  <Button type="submit" className="w-full mt-4 bg-ebd-blue hover:bg-ebd-navy">
                    Entrar como Professor
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="secretary">
                <form onSubmit={handleSecretarySubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="username">Usuário</Label>
                      <div className="relative">
                        <Input
                          id="username"
                          placeholder="Digite seu usuário"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="pl-10"
                        />
                        <div className="absolute left-3 top-2.5 text-gray-500">
                          <User size={18} />
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Senha</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type="password"
                          placeholder="Digite sua senha"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                        />
                        <div className="absolute left-3 top-2.5 text-gray-500">
                          <Lock size={18} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox 
                        id="saveSecretaryCredentials" 
                        checked={saveSecretaryCredentials}
                        onCheckedChange={(checked) => {
                          setSaveSecretaryCredentials(checked === true);
                        }}
                      />
                      <label
                        htmlFor="saveSecretaryCredentials"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Salvar dados de acesso
                      </label>
                    </div>
                    
                    <div className="text-sm text-gray-500 italic">
                      <p>Para teste, use: secretario / 123456</p>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full mt-4 bg-ebd-blue hover:bg-ebd-navy">
                    Entrar como Secretário
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            {/* Password reset option */}
            <div className="mt-6 text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm text-ebd-blue">
                    Esqueceu sua senha?
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Recuperação de Senha</DialogTitle>
                    <DialogDescription>
                      Informe seu e-mail e enviaremos suas informações para ebdvilaelida2024@gmail.com.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="resetEmail">Seu E-mail</Label>
                      <div className="relative">
                        <Input
                          id="resetEmail"
                          type="email"
                          placeholder="seu-email@exemplo.com"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          className="pl-10"
                        />
                        <div className="absolute left-3 top-2.5 text-gray-500">
                          <Mail size={18} />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Suas informações de recuperação serão enviadas para o e-mail administrativo: ebdvilaelida2024@gmail.com
                    </p>
                  </div>
                  <DialogFooter>
                    <Button onClick={handlePasswordReset}>Solicitar Recuperação</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Registration link */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Primeiro acesso?{" "}
                <Button 
                  variant="link" 
                  className="text-sm p-0 text-ebd-blue" 
                  onClick={() => navigate("/registration")}
                >
                  Cadastre-se aqui
                </Button>
              </p>
            </div>
            
            {/* Clear All Data Option */}
            <div className="mt-4 border-t pt-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center text-destructive border-destructive hover:bg-destructive/10"
                  >
                    <Trash2 size={18} className="mr-2" /> Limpar todos os dados
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Limpar todos os dados</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação irá remover todos os registros e cadastros do sistema. Esta operação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearAllData} className="bg-destructive">
                      Limpar Dados
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
