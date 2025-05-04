
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useChurch } from "@/context"; 
import { useTeacher } from "@/context";

const Index = () => {
  const { churchData } = useChurch();
  const { teacherData } = useTeacher();
  const navigate = useNavigate();

  useEffect(() => {
    // Set default church name if it doesn't exist
    if (!localStorage.getItem("ebdChurchName")) {
      localStorage.setItem("ebdChurchName", "Igreja EBD");
    }
    
    if (churchData || teacherData) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [churchData, teacherData, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center ebd-gradient">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-2">EBD</h1>
        <p className="text-xl">Carregando...</p>
      </div>
    </div>
  );
};

export default Index;
