
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginHeaderProps {
  churchName: string;
  setChurchName: (name: string) => void;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ churchName, setChurchName }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-ebd-blue mb-2">EBD</h1>
      <p className="text-lg text-gray-600 mb-4">Escola Bíblica Dominical</p>
      
      <div className="flex flex-col mb-4">
        <Label htmlFor="churchName" className="mb-1 text-left">Nome da Igreja</Label>
        <Input 
          id="churchName" 
          value={churchName} 
          onChange={(e) => setChurchName(e.target.value)}
          placeholder="Nome da Igreja"
        />
      </div>
    </div>
  );
};

export default LoginHeader;
