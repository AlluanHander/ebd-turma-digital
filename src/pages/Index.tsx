import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useChurch } from "@/context/ChurchContext"; // Keep using the same import path

const Index = () => {
  const { churchData } = useChurch();
  const navigate = useNavigate();

  useEffect(() => {
    if (churchData) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [churchData, navigate]);

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
