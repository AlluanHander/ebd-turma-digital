
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChurch } from "@/context/ChurchContext";
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Calendar, FileText, Users, UserPlus } from "lucide-react";

const Secretary = () => {
  const { isSecretary, secretaryData, allClasses, churchData, switchClass, secretaryLogout } = useChurch();
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

  // Prepare data for attendance overview chart
  const prepareAttendanceData = () => {
    if (!allClasses.length) return [];
    
    const totalMembers = allClasses.reduce((sum, cls) => sum + cls.members.length, 0);
    const totalMembersPresent = allClasses.reduce((sum, cls) => {
      return sum + cls.members.reduce((memberSum, member) => {
        const presentCount = member.attendance.filter(Boolean).length;
        return memberSum + (presentCount > 0 ? 1 : 0);
      }, 0);
    }, 0);
    
    return [
      { name: "Presentes", value: totalMembersPresent },
      { name: "Ausentes", value: totalMembers - totalMembersPresent }
    ];
  };

  const chartData = prepareAttendanceData();
  const COLORS = ["#0088FE", "#FF8042"];

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
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Turmas</CardTitle>
                <CardDescription>
                  Selecione uma turma para gerenciar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {allClasses.length === 0 ? (
                  <p className="text-gray-500">Nenhuma turma cadastrada ainda.</p>
                ) : (
                  <Select 
                    value={selectedClassId || ""} 
                    onValueChange={handleClassChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma turma" />
                    </SelectTrigger>
                    <SelectContent>
                      {allClasses.map(cls => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.churchName} - {cls.sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => navigate("/home")}
                >
                  Acessar turma selecionada
                </Button>
              </CardContent>
            </Card>
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
                <Card>
                  <CardHeader>
                    <CardTitle>Todas as Turmas</CardTitle>
                    <CardDescription>
                      Visão geral de todas as turmas cadastradas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Igreja</TableHead>
                            <TableHead>Setor</TableHead>
                            <TableHead>Professor</TableHead>
                            <TableHead>Qtd. Membros</TableHead>
                            <TableHead>Qtd. Avisos</TableHead>
                            <TableHead>Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {allClasses.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                                Nenhuma turma cadastrada ainda
                              </TableCell>
                            </TableRow>
                          ) : (
                            allClasses.map((cls) => (
                              <TableRow key={cls.id}>
                                <TableCell>{cls.churchName}</TableCell>
                                <TableCell>{cls.sector}</TableCell>
                                <TableCell>{cls.teacher || "Não definido"}</TableCell>
                                <TableCell>{cls.members.length}</TableCell>
                                <TableCell>{cls.announcements.length}</TableCell>
                                <TableCell>
                                  <Button 
                                    size="sm"
                                    onClick={() => {
                                      switchClass(cls.id);
                                      setSelectedClassId(cls.id);
                                      navigate("/turma");
                                    }}
                                  >
                                    Gerenciar
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="attendance">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequência Geral</CardTitle>
                    <CardDescription>
                      Relatório de frequência das turmas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {allClasses.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Nenhuma turma cadastrada para exibir frequência</p>
                    ) : (
                      <div className="space-y-6">
                        {allClasses.map((cls) => (
                          <div key={cls.id} className="border p-4 rounded-lg">
                            <h3 className="font-bold mb-2">{cls.churchName} - {cls.sector}</h3>
                            <div className="overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Aluno</TableHead>
                                    <TableHead className="text-right">Total de Presenças</TableHead>
                                    <TableHead className="text-right">% de Frequência</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {cls.members.length === 0 ? (
                                    <TableRow>
                                      <TableCell colSpan={3} className="text-center py-2 text-gray-500">
                                        Nenhum membro nesta turma
                                      </TableCell>
                                    </TableRow>
                                  ) : (
                                    cls.members.map((member) => {
                                      const presentCount = member.attendance.filter(Boolean).length;
                                      const percentage = Math.round((presentCount / member.attendance.length) * 100);
                                      
                                      return (
                                        <TableRow key={member.id}>
                                          <TableCell>{member.name}</TableCell>
                                          <TableCell className="text-right">
                                            {presentCount} de {member.attendance.length}
                                          </TableCell>
                                          <TableCell className="text-right">{percentage}%</TableCell>
                                        </TableRow>
                                      );
                                    })
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="statistics">
                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas Gerais</CardTitle>
                    <CardDescription>
                      Visão estatística da EBD
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-center text-lg">Distribuição de Frequência</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center items-center h-[300px]">
                          {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={chartData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                  {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          ) : (
                            <p className="text-gray-500">Dados insuficientes para exibir o gráfico</p>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-center text-lg">Resumo</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center border-b pb-2">
                              <span>Total de Turmas:</span>
                              <span className="font-bold">{allClasses.length}</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                              <span>Total de Alunos:</span>
                              <span className="font-bold">
                                {allClasses.reduce((sum, cls) => sum + cls.members.length, 0)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                              <span>Total de Visitantes:</span>
                              <span className="font-bold">
                                {allClasses.reduce((sum, cls) => sum + (cls.visitors?.length || 0), 0)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                              <span>Total de Avisos:</span>
                              <span className="font-bold">
                                {allClasses.reduce((sum, cls) => sum + cls.announcements.length, 0)}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Secretary;
