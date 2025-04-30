
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useChurch } from "@/context/ChurchContext";

const NavBar = () => {
  const { churchData, logout } = useChurch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-full bg-ebd-blue text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="font-bold text-xl">EBD</div>
          {churchData && (
            <div className="hidden md:block text-sm text-white/80">
              {churchData.churchName} - {churchData.sector}
            </div>
          )}
        </div>
        <div>
          <Button
            variant="ghost"
            className="text-white hover:bg-ebd-navy"
            onClick={handleLogout}
          >
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
