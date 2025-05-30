
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import InventoryManager from "@/components/InventoryManager";
import { useChurch } from "@/context";
import { useInventory } from "@/context";
import { Calendar, FileText, MessageSquare, Users, Book, BookOpen, DollarSign } from "lucide-react";

const Home = () => {
  const { churchData } = useChurch();
  const { inventory } = useInventory();
  const navigate = useNavigate();

  useEffect(() => {
    if (!churchData) {
      navigate("/");
    }
  }, [churchData, navigate]);

  if (!churchData) return null;

  const stats = [
    {
      title: "Total de Membros",
      value: churchData.members.length,
      icon: <Users className="h-8 w-8 text-ebd-blue" />,
    },
    {
      title: "Avisos Ativos",
      value: churchData.announcements.length,
      icon: <MessageSquare className="h-8 w-8 text-ebd-blue" />,
    },
    {
      title: "Semanas de EBD",
      value: "13",
      icon: <Calendar className="h-8 w-8 text-ebd-blue" />,
    },
  ];

  const inventoryStats = [
    {
      title: "Bíblias",
      value: inventory.bibles,
      icon: <Book className="h-8 w-8 text-ebd-blue" />,
    },
    {
      title: "Revistas",
      value: inventory.magazines,
      icon: <BookOpen className="h-8 w-8 text-ebd-blue" />,
    },
    {
      title: "Ofertas (R$)",
      value: inventory.offerings,
      icon: <DollarSign className="h-8 w-8 text-ebd-blue" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Bem-vindo à Gestão de EBD
            </h1>
            <p className="text-gray-600 mt-2">
              {churchData.churchName} - {churchData.sector}
            </p>
          </div>
          <InventoryManager />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="overflow-hidden border-t-4 border-t-ebd-blue">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-full">{stat.icon}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {inventoryStats.map((stat, index) => (
            <Card key={index} className="overflow-hidden border-t-4 border-t-green-500">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-full">{stat.icon}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardHeader className="bg-ebd-blue bg-opacity-10 border-b border-ebd-blue border-opacity-20">
            <CardTitle className="text-ebd-blue">Gestão da Classe</CardTitle>
            <CardDescription>
              Gerencie sua turma de Escola Bíblica Dominical
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    <Users className="h-12 w-12 text-ebd-blue" />
                  </div>
                  <CardTitle className="text-center">Chamada</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-center text-gray-500">
                    Registre a presença dos membros da sua turma e adicione novos alunos.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-ebd-blue hover:bg-ebd-navy"
                    onClick={() => navigate("/classe", { state: { activeTab: "chamada" } })}
                  >
                    Acessar
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    <MessageSquare className="h-12 w-12 text-ebd-blue" />
                  </div>
                  <CardTitle className="text-center">Avisos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-center text-gray-500">
                    Gerencie os avisos importantes para sua turma de EBD.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-ebd-blue hover:bg-ebd-navy"
                    onClick={() => navigate("/classe", { state: { activeTab: "avisos" } })}
                  >
                    Acessar
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    <FileText className="h-12 w-12 text-ebd-blue" />
                  </div>
                  <CardTitle className="text-center">Relatórios</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-center text-gray-500">
                    Visualize relatórios de frequência por membro da sua turma.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-ebd-blue hover:bg-ebd-navy"
                    onClick={() => navigate("/classe", { state: { activeTab: "relatorios" } })}
                  >
                    Acessar
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
