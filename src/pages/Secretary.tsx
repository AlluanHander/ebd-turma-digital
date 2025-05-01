
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChurch } from "@/context";
import NavBar from "@/components/NavBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Users } from "lucide-react";

import ClassSelector from "@/components/secretary/ClassSelector";
import ClassesTab from "@/components/secretary/ClassesTab";
import AttendanceTab from "@/components/secretary/AttendanceTab";
import StatisticsTab from "@/components/secretary/StatisticsTab";

const Secretary = () => {
  const { isSecretary, secretaryData, allClasses, switchClass, secretaryLogout } = useChurch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("classes");
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

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
            Gerencie todas as turmas da EBD
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
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="classes" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Turmas</span>
                </TabsTrigger>
                <TabsTrigger value="attendance" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Frequência</span>
                </TabsTrigger>
                <TabsTrigger value="statistics" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Estatísticas</span>
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
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Secretary;
