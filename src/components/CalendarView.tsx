
import React, { useState, useEffect } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CalendarViewProps {
  currentWeek: number;
  onWeekChange: (weekIndex: number) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  currentWeek,
  onWeekChange
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Calculate the date for the specified EBD week (assuming first Sunday as start)
  const getDateForWeek = (weekIndex: number): Date => {
    const now = new Date();
    const firstDay = startOfWeek(now, { weekStartsOn: 0 });
    
    // Calculate weeks difference (past or future)
    const weekDifference = weekIndex - currentWeek;
    return addDays(firstDay, weekDifference * 7);
  };
  
  // Create an array of dates for all 13 weeks
  const getEbdDates = () => {
    return Array.from({ length: 13 }, (_, i) => {
      return {
        weekIndex: i,
        date: getDateForWeek(i)
      };
    });
  };
  
  const ebdDates = getEbdDates();
  
  // When a date is selected, find corresponding EBD week
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    
    setDate(selectedDate);
    
    // Find the closest EBD week to the selected date
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
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Calendário de EBD</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border"
            locale={ptBR}
          />
          
          <div className="space-y-2">
            <h3 className="font-medium">Semanas de EBD:</h3>
            <div className="flex flex-wrap gap-2">
              {ebdDates.map((ebdDate) => (
                <Badge 
                  key={ebdDate.weekIndex}
                  variant={ebdDate.weekIndex === currentWeek ? "default" : "outline"}
                  className="cursor-pointer"
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
