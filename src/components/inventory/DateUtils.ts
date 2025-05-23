
import { format, parseISO, nextSunday, isSunday, addDays, startOfWeek } from "date-fns";
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

// Obter data para uma determinada semana do trimestre (0-12)
export const getDateForWeek = (weekIndex: number, currentWeek: number): Date => {
  const now = new Date();
  const firstDay = startOfWeek(now, { weekStartsOn: 0 });
  
  // Calcular diferença de semanas (passado ou futuro)
  const weekDifference = weekIndex - currentWeek;
  return addDays(firstDay, weekDifference * 7);
};

// Formatação de data amigável
export const formatDateFriendly = (date: Date): string => {
  return format(date, "dd 'de' MMMM", { locale: ptBR });
};

// Formatação de data completa
export const formatDateFull = (date: Date): string => {
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};
