
export const SECRETARY_CREDENTIALS = {
  username: "secretario",
  password: "123456",
  name: "Secretário Geral"
};

// Lista de secretários registrados (inicialmente vazia)
export let REGISTERED_SECRETARIES: Array<{
  username: string;
  password: string;
  name: string;
}> = [];

// Função para adicionar um novo secretário
export const addSecretary = (username: string, password: string, name: string) => {
  REGISTERED_SECRETARIES.push({ username, password, name });
  return true;
};

// Função para limpar todos os secretários registrados
export const clearSecretaries = () => {
  REGISTERED_SECRETARIES = [];
};
