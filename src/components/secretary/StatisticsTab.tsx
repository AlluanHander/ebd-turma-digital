
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Class } from "@/types/ChurchTypes";

interface StatisticsTabProps {
  allClasses: Class[];
}

const StatisticsTab: React.FC<StatisticsTabProps> = ({ allClasses }) => {
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
  );
};

export default StatisticsTab;
