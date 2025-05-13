
import { format, parseISO, nextSunday, isSunday } from "date-fns";
import { ptBR } from "date-fns/locale";

// Calcular próxima data de reinicialização (próximo domingo)
export const getNextResetDate = (): string => {
  const today = new Date();
  const next = nextSunday(today);
  return format(next, "dd 'de' MMMM", { locale: ptBR });
};

// Formatar a data da última reinicialização
export const getLastResetDate = (lastResetDate: string | undefined): string => {
  if (!lastResetDate) return "Nunca";
  try {
    return format(parseISO(lastResetDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch (e) {
    return "Data inválida";
  }
};

// Verificar se hoje é domingo
export const isTodaySunday = (): boolean => isSunday(new Date());
