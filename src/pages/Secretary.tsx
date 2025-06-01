
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChurch } from "@/context";
import SecretaryLayout from "@/components/secretary/SecretaryLayout";
import { toast } from "@/hooks/use-toast";

const Secretary = () => {
  const { isSecretary, allClasses, switchClass } = useChurch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("classes");
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [currentWeek, setCurrentWeek] = useState<number>(0);

  useEffect(() => {
    // Redirect if not a secretary
    if (!isSecretary) {
      navigate("/");
      return;
    }
    
    // Set the first class as selected by default if we have classes
    if (allClasses.length > 0 && !selectedClassId) {
      setSelectedClassId(allClasses[0].id);
      switchClass(allClasses[0].id);
    }
  }, [isSecretary, navigate, allClasses, selectedClassId, switchClass]);

  if (!isSecretary) {
    return null; // Will redirect in useEffect
  }

  return (
    <SecretaryLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      selectedClassId={selectedClassId}
      setSelectedClassId={setSelectedClassId}
      currentWeek={currentWeek}
      setCurrentWeek={setCurrentWeek}
    />
  );
};

export default Secretary;
