
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import NavBar from "@/components/NavBar";
import AttendanceTab from "@/components/AttendanceTab";
import AnnouncementsTab from "@/components/AnnouncementsTab";
import ReportsTab from "@/components/ReportsTab";
import VisitorsTab from "@/components/VisitorsTab";
import { useChurch } from "@/context/ChurchContext";
import { Calendar, Home, MessageSquare, Users, UserPlus } from "lucide-react";

interface LocationState {
  activeTab?: string;
}

interface TeacherFormValues {
  teacherName: string;
}

const Turma = () => {
  const { churchData, setTeacher } = useChurch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("chamada");
  const [isTeacherDialogOpen, setIsTeacherDialogOpen] = useState(false);
  const { toast } = useToast();
  const locationState = location.state as LocationState | null;

  const form = useForm<TeacherFormValues>({
    defaultValues: {
      teacherName: churchData?.teacher || "",
    },
  });

  useEffect(() => {
    if (!churchData) {
      navigate("/");
      return;
    }

    if (locationState?.activeTab) {
      setActiveTab(locationState.activeTab);
    }
  }, [churchData, navigate, locationState]);

  const onSubmitTeacherName = (data: TeacherFormValues) => {
    setTeacher(data.teacherName);
    setIsTeacherDialogOpen(false);
    toast({
      title: "Professor atualizado",
      description: `Nome do professor definido como: ${data.teacherName}`,
    });
  };

  if (!churchData) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />

      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gestão da Turma</h1>
            {churchData.teacher && (
              <p className="text-gray-600 mt-1">Professor: {churchData.teacher}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline"
              onClick={() => setIsTeacherDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>{churchData.teacher ? "Alterar Professor" : "Adicionar Professor"}</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/home")}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              <span>Voltar para Home</span>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="chamada" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Chamada</span>
            </TabsTrigger>
            <TabsTrigger value="visitantes" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Visitantes</span>
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
          <TabsContent value="visitantes">
            <VisitorsTab />
          </TabsContent>
          <TabsContent value="avisos">
            <AnnouncementsTab />
          </TabsContent>
          <TabsContent value="relatorios">
            <ReportsTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Teacher Name Dialog */}
      <Dialog open={isTeacherDialogOpen} onOpenChange={setIsTeacherDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{churchData.teacher ? "Atualizar Professor" : "Adicionar Professor"}</DialogTitle>
            <DialogDescription>
              Informe o nome do professor responsável pela classe
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitTeacherName)} className="space-y-4">
              <FormField
                control={form.control}
                name="teacherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Professor</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome completo" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Turma;
