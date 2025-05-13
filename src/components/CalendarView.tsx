
import React, { useState, useEffect } from "react";
import { format, startOfWeek, addDays, isSunday, getWeekOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon } from "lucide-react";

interface CalendarViewProps {
  currentWeek: number;
  onWeekChange: (weekIndex: number) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  currentWeek,
  onWeekChange
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Calcular a data para a semana especificada de EBD (considerando o primeiro domingo como início)
  const getDateForWeek = (weekIndex: number): Date => {
    const now = new Date();
    const firstDay = startOfWeek(now, { weekStartsOn: 0 });
    
    // Calcular diferença de semanas (passado ou futuro)
    const weekDifference = weekIndex - currentWeek;
    return addDays(firstDay, weekDifference * 7);
  };
  
  // Criar um array de datas para todas as 13 semanas
  const getEbdDates = () => {
    return Array.from({ length: 13 }, (_, i) => {
      return {
        weekIndex: i,
        date: getDateForWeek(i)
      };
    });
  };
  
  const ebdDates = getEbdDates();
  
  // Quando uma data é selecionada, encontrar a semana de EBD correspondente
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    
    setDate(selectedDate);
    
    // Encontrar o domingo mais próximo da data selecionada
    const dayOfWeek = selectedDate.getDay();
    const daysFromSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    const nextSunday = addDays(selectedDate, daysFromSunday);
    
    const closestEbdWeek = ebdDates.reduce((closest, current) => {
      const currentDiff = Math.abs(current.date.getTime() - nextSunday.getTime());
      const closestDiff = Math.abs(closest.date.getTime() - nextSunday.getTime());
      return currentDiff < closestDiff ? current : closest;
    });
    
    if (closestEbdWeek.weekIndex !== currentWeek) {
      onWeekChange(closestEbdWeek.weekIndex);
    }
  };
  
  // Destacar os domingos no calendário
  const isSundayClass = (date: Date) => {
    return isSunday(date);
  };
  
  return (
    <Card className="border-ebd-blue/20 shadow-md">
      <CardHeader className="pb-2 bg-gradient-to-r from-ebd-blue/10 to-ebd-navy/5">
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-ebd-blue" />
          <span>Calendário de EBD</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border pointer-events-auto"
            locale={ptBR}
            modifiers={{
              sunday: isSundayClass
            }}
            modifiersClassNames={{
              sunday: "bg-ebd-blue/20 text-ebd-navy font-medium"
            }}
          />
          
          <div className="space-y-2">
            <h3 className="font-medium flex items-center gap-2">
              <span>Trimestre atual:</span>
              <Badge variant="outline" className="font-normal">
                {currentWeek + 1} de 13 semanas
              </Badge>
            </h3>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1 scrollbar-thin">
              {ebdDates.map((ebdDate) => (
                <Badge 
                  key={ebdDate.weekIndex}
                  variant={ebdDate.weekIndex === currentWeek ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    ebdDate.weekIndex === currentWeek 
                      ? "bg-ebd-blue hover:bg-ebd-navy" 
                      : "hover:bg-ebd-blue/10"
                  }`}
                  onClick={() => onWeekChange(ebdDate.weekIndex)}
                >
                  Semana {ebdDate.weekIndex + 1}: {format(ebdDate.date, "dd/MM", { locale: ptBR })}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
