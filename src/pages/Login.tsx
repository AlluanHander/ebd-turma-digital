import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useChurch } from "@/context/ChurchContext";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Key, Lock, User } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

const Login = () => {
  // Common state
  const [churchName, setChurchName] = useState("");
  
  // Teacher login state
  const [teacherName, setTeacherName] = useState("");
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
  
  const { setChurchInfo, secretaryLogin } = useChurch();
  const navigate = useNavigate();

  // Load saved credentials on component mount
  useEffect(() => {
    const savedChurchName = localStorage.getItem("ebdChurchName");
    if (savedChurchName) {
      setChurchName(savedChurchName);
    }

    const savedTeacherCredentials = localStorage.getItem("ebdTeacherCredentials");
    if (savedTeacherCredentials) {
      const { name, password } = JSON.parse(savedTeacherCredentials);
      setTeacherName(name);
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
    
    if (!churchName.trim() || !teacherName.trim() || !teacherPassword.trim()) {
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
        name: teacherName,
        password: teacherPassword
      }));
    } else {
      localStorage.removeItem("ebdTeacherCredentials");
    }
    
    // Always save church name
    localStorage.setItem("ebdChurchName", churchName);

    // Set teacher info and sector (using teacher name as sector for now)
    setChurchInfo(churchName, teacherName);

    toast({
      title: "Login realizado com sucesso!",
      description: "Bem-vindo ao sistema EBD, Professor.",
    });
    navigate("/home");
  };
  
  const handleSecretarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!churchName.trim() || !username.trim() || !password.trim()) {
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
    
    // Always save church name
    localStorage.setItem("ebdChurchName", churchName);
    
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

    // Simulate password reset email
    toast({
      title: "E-mail enviado!",
      description: `Um link de redefinição de senha foi enviado para ${resetEmail}.`,
    });
    
    // Clear email field
    setResetEmail("");
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

          {/* Common field - Church Name */}
          <CardContent className="pt-6">
            <div className="grid gap-2 mb-4">
              <Label htmlFor="churchName">Nome da Igreja</Label>
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
                      <Label htmlFor="teacherName">Nome do Professor</Label>
                      <div className="relative">
                        <Input
                          id="teacherName"
                          placeholder="Digite seu nome"
                          value={teacherName}
                          onChange={(e) => setTeacherName(e.target.value)}
                          className="pl-10"
                        />
                        <div className="absolute left-3 top-2.5 text-gray-500">
                          <User size={18} />
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
                      Informe seu e-mail para receber um link de redefinição de senha.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="resetEmail">E-mail</Label>
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
                  </div>
                  <DialogFooter>
                    <Button onClick={handlePasswordReset}>Enviar link</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Registration link - New addition */}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
