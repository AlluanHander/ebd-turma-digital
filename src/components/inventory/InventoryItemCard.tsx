
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MinusCircle, PlusCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface InventoryItemCardProps {
  title: string;
  description: string;
  value: number;
  field: "bibles" | "magazines" | "offerings";
  icon: LucideIcon;
  onIncrement: (field: string) => void;
  onDecrement: (field: string) => void;
  onInputChange: (field: string, value: string) => void;
}

const InventoryItemCard: React.FC<InventoryItemCardProps> = ({
  title,
  description,
  value,
  field,
  icon: Icon,
  onIncrement,
  onDecrement,
  onInputChange,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="h-5 w-5 text-ebd-blue" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDecrement(field)}
            disabled={value <= 0}
          >
            <MinusCircle className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={value}
            onChange={(e) => onInputChange(field, e.target.value)}
            className="text-center"
            min="0"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => onIncrement(field)}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryItemCard;
