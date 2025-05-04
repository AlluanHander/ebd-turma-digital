
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { User, Lock } from "lucide-react";

interface SecretaryLoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const SecretaryLoginForm: React.FC<SecretaryLoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o usuário e a senha.",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="pt-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="secretaryUsername">Usuário</Label>
            <div className="relative">
              <Input
                id="secretaryUsername"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
  );
};

export default SecretaryLoginForm;
