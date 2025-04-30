
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import AttendanceTab from "@/components/AttendanceTab";
import AnnouncementsTab from "@/components/AnnouncementsTab";
import ReportsTab from "@/components/ReportsTab";
import { useChurch } from "@/context/ChurchContext";
import { Calendar, Home, MessageSquare, Users } from "lucide-react";

interface LocationState {
  activeTab?: string;
}

const Turma = () => {
  const { churchData } = useChurch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("chamada");
  const locationState = location.state as LocationState | null;

  useEffect(() => {
    if (!churchData) {
      navigate("/");
      return;
    }

    if (locationState?.activeTab) {
      setActiveTab(locationState.activeTab);
    }
  }, [churchData, navigate, locationState]);

  if (!churchData) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />

      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gestão da Turma</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate("/home")}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            <span>Voltar para Home</span>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="chamada" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Chamada</span>
            </TabsTrigger>
            <TabsTrigger value="avisos" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Avisos</span>
            </TabsTrigger>
            <TabsTrigger value="relatorios" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Relatórios</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chamada">
            <AttendanceTab />
          </TabsContent>
          <TabsContent value="avisos">
            <AnnouncementsTab />
          </TabsContent>
          <TabsContent value="relatorios">
            <ReportsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Turma;
