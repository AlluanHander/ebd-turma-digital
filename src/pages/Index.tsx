
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useChurch } from "@/context/ChurchContext";

const Index = () => {
  const { churchData, setChurchInfo } = useChurch();
  const navigate = useNavigate();

  useEffect(() => {
    // Try to load saved church name
    const savedChurchName = localStorage.getItem("ebdChurchName");
    
    if (churchData) {
      navigate("/home");
    } else if (savedChurchName) {
      // If we have a saved church name but no churchData,
      // redirect to login page with the saved church name
      navigate("/login");
    } else {
      // If no saved data, go to login
      navigate("/login");
    }
  }, [churchData, navigate, setChurchInfo]);

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
