
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useChurch } from "@/context/ChurchContext";
import { LogOut, Book } from "lucide-react";

interface NavBarProps {
  isSecretary?: boolean;
  secretaryName?: string;
  onLogout?: () => void;
}

const NavBar = ({ isSecretary, secretaryName, onLogout }: NavBarProps) => {
  const { churchData, logout } = useChurch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      logout();
      navigate("/");
    }
  };

  return (
    <header className="bg-ebd-blue text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Book size={24} />
            <Link to={isSecretary ? "/secretary" : "/home"} className="text-xl font-bold">
              EBD
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-white/80">
              {isSecretary ? (
                <span>Secretário: {secretaryName}</span>
              ) : (
                churchData && (
                  <span>
                    {churchData.churchName} | {churchData.sector}
                  </span>
                )
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="bg-transparent text-white border-white hover:bg-white/20"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
