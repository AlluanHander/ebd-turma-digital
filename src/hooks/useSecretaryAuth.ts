
import { useState } from "react";
import { SecretaryData } from "@/types/ChurchTypes";
import { SECRETARY_CREDENTIALS } from "@/constants/secretaryCredentials";

export const useSecretaryAuth = () => {
  const [isSecretary, setIsSecretary] = useState<boolean>(() => {
    const savedSecretaryStatus = localStorage.getItem("ebdIsSecretary");
    return savedSecretaryStatus ? JSON.parse(savedSecretaryStatus) : false;
  });
  
  const [secretaryData, setSecretaryData] = useState<SecretaryData | null>(() => {
    const savedSecretaryData = localStorage.getItem("ebdSecretaryData");
    return savedSecretaryData ? JSON.parse(savedSecretaryData) : null;
  });

  const secretaryLogin = (username: string, password: string) => {
    if (username === SECRETARY_CREDENTIALS.username && password === SECRETARY_CREDENTIALS.password) {
      const secretaryUserData = {
        username,
        password,
        name: SECRETARY_CREDENTIALS.name,
        isLoggedIn: true
      };
      
      setIsSecretary(true);
      setSecretaryData(secretaryUserData);
      
      localStorage.setItem("ebdIsSecretary", JSON.stringify(true));
      localStorage.setItem("ebdSecretaryData", JSON.stringify(secretaryUserData));
      
      return true;
    }
    return false;
  };
  
  const secretaryLogout = () => {
    setIsSecretary(false);
    setSecretaryData(null);
    
    localStorage.setItem("ebdIsSecretary", JSON.stringify(false));
    localStorage.removeItem("ebdSecretaryData");
  };

  return {
    isSecretary,
    secretaryData,
    secretaryLogin,
    secretaryLogout
  };
};
