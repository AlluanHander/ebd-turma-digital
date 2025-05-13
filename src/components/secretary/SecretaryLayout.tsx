
import React from "react";
import { useNavigate } from "react-router-dom";
import { useChurch } from "@/context";
import NavBar from "@/components/NavBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Users, Cake } from "lucide-react";

import ClassSelector from "@/components/secretary/ClassSelector";
import ClassesTab from "@/components/secretary/ClassesTab";
import AttendanceTab from "@/components/secretary/AttendanceTab";
import StatisticsTab from "@/components/secretary/StatisticsTab";
import BirthdaysTab from "@/components/secretary/BirthdaysTab";

interface SecretaryLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedClassId: string | null;
  setSelectedClassId: (classId: string | null) => void;
  currentWeek: number;
  setCurrentWeek: (week: number) => void;
}

const SecretaryLayout: React.FC<SecretaryLayoutProps> = ({
  activeTab,
  setActiveTab,
  selectedClassId,
  setSelectedClassId,
  currentWeek,
  setCurrentWeek,
}) => {
  const { allClasses, switchClass, secretaryData, secretaryLogout } = useChurch();
  const navigate = useNavigate();

  const handleClassChange = (classId: string) => {
    setSelectedClassId(classId);
    switchClass(classId);
  };

  const handleLogout = () => {
    secretaryLogout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar isSecretary={true} secretaryName={secretaryData?.name || "Secretário"} onLogout={handleLogout} />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Painel do Secretário
          </h1>
          <p className="text-gray-600 mt-2">
            Gerencie todas as classes da EBD
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left sidebar with class selection */}
          <div className="lg:w-1/4">
            <ClassSelector 
              allClasses={allClasses}
              selectedClassId={selectedClassId}
              onClassChange={handleClassChange}
            />
          </div>

          {/* Main content area */}
          <div className="lg:w-3/4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="classes" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Classes</span>
                </TabsTrigger>
                <TabsTrigger value="attendance" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Frequência</span>
                </TabsTrigger>
                <TabsTrigger value="statistics" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Estatísticas</span>
                </TabsTrigger>
                <TabsTrigger value="birthdays" className="flex items-center gap-2">
                  <Cake className="h-4 w-4" />
                  <span>Aniversários</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="classes">
                <ClassesTab 
                  allClasses={allClasses}
                  switchClass={switchClass}
                />
              </TabsContent>

              <TabsContent value="attendance">
                <AttendanceTab allClasses={allClasses} />
              </TabsContent>

              <TabsContent value="statistics">
                <StatisticsTab allClasses={allClasses} />
              </TabsContent>
              
              <TabsContent value="birthdays">
                <BirthdaysTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretaryLayout;
