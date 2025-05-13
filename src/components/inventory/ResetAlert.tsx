
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar } from "lucide-react";
import { isSunday } from "date-fns";

interface ResetAlertProps {
  isTodaySunday: boolean;
  lastResetDate: string;
  nextResetDate: string;
}

const ResetAlert: React.FC<ResetAlertProps> = ({
  isTodaySunday,
  lastResetDate,
  nextResetDate,
}) => {
  return (
    <Alert className={`mb-4 ${isTodaySunday ? "bg-blue-100 border-blue-300" : "bg-blue-50 border-blue-200"}`}>
      <Calendar className={`h-4 w-4 ${isTodaySunday ? "text-blue-600" : "text-blue-500"}`} />
      <AlertTitle className={`${isTodaySunday ? "text-blue-800" : "text-blue-700"}`}>
        Sistema de reinicialização automática
      </AlertTitle>
      <AlertDescription className={`text-sm ${isTodaySunday ? "text-blue-800" : "text-blue-700"}`}>
        {isTodaySunday ? (
          <span className="font-medium">Hoje é domingo! O inventário será reiniciado automaticamente.</span>
        ) : (
          "O inventário será zerado automaticamente todo domingo."
        )}
        <div className="mt-1">
          <span className="font-semibold">Último reset:</span> {lastResetDate}
        </div>
        <div>
          <span className="font-semibold">Próximo reset:</span> {nextResetDate}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ResetAlert;
