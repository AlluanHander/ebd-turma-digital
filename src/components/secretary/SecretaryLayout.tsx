
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useChurch } from "@/context/ChurchContext";
import NavBar from "@/components/NavBar";
import AttendanceTab from "./AttendanceTab";
import BirthdaysTab from "./BirthdaysTab";
import ClassesTab from "./ClassesTab";
import StatisticsTab from "./StatisticsTab";
import TeachersTab from "./TeachersTab";
import ClassSelector from "./ClassSelector";

interface SecretaryLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedClassId: string | null;
  setSelectedClassId: (classId: string | null) => void;
  currentWeek: number;
  setCurrentWeek: (week: number) => void;
}

const SecretaryLayout = ({
  activeTab,
  setActiveTab,
  selectedClassId,
  setSelectedClassId,
  currentWeek,
  setCurrentWeek,
}: SecretaryLayoutProps) => {
  const { secretaryData, secretaryLogout, allClasses, switchClass } = useChurch();

  const handleClassChange = (classId: string) => {
    setSelectedClassId(classId);
    switchClass(classId);
  };

  return (
    <div className="min-h-screen bg-ebd-gray">
      <NavBar
        isSecretary={true}
        secretaryName={secretaryData?.name}
        onLogout={secretaryLogout}
      />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-ebd-blue mb-2">
            Painel do Secretário
          </h1>
          <p className="text-gray-600">
            Gerencie todas as classes, professores e atividades da EBD
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="classes">Salas</TabsTrigger>
            <TabsTrigger value="teachers">Professores</TabsTrigger>
            <TabsTrigger value="attendance">Frequência</TabsTrigger>
            <TabsTrigger value="birthdays">Aniversários</TabsTrigger>
            <TabsTrigger value="statistics">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="space-y-6">
            <ClassesTab allClasses={allClasses} switchClass={switchClass} />
          </TabsContent>

          <TabsContent value="teachers" className="space-y-6">
            <TeachersTab />
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Controle de Frequência</CardTitle>
                <CardDescription>
                  Selecione uma sala para gerenciar a frequência dos alunos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ClassSelector
                  allClasses={allClasses}
                  selectedClassId={selectedClassId}
                  onClassChange={handleClassChange}
                />
              </CardContent>
            </Card>
            
            {selectedClassId && (
              <AttendanceTab allClasses={allClasses} />
            )}
          </TabsContent>

          <TabsContent value="birthdays" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Controle de Aniversários</CardTitle>
                <CardDescription>
                  Selecione uma sala para gerenciar os aniversários dos alunos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ClassSelector
                  allClasses={allClasses}
                  selectedClassId={selectedClassId}
                  onClassChange={handleClassChange}
                />
              </CardContent>
            </Card>
            
            {selectedClassId && <BirthdaysTab />}
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <StatisticsTab allClasses={allClasses} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SecretaryLayout;
