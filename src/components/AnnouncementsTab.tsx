
import React, { useState } from "react";
import { useChurch } from "@/context/ChurchContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { MessageSquare } from "lucide-react";

interface AnnouncementsTabProps {
  isSecretary?: boolean;
}

const AnnouncementsTab = ({ isSecretary = false }: AnnouncementsTabProps) => {
  const { churchData, addAnnouncement, removeAnnouncement } = useChurch();
  const [newAnnouncement, setNewAnnouncement] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAnnouncement.trim()) {
      addAnnouncement(newAnnouncement.trim());
      setNewAnnouncement("");
      toast({
        title: "Aviso adicionado",
        description: "O aviso foi registrado com sucesso.",
      });
    }
  };

  const handleDelete = (index: number) => {
    removeAnnouncement(index);
    toast({
      title: "Aviso removido",
      description: "O aviso foi removido com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      {isSecretary && (
        <Card>
          <CardHeader>
            <CardTitle>Novo Aviso</CardTitle>
            <CardDescription>
              Registre um novo aviso para sua turma de EBD
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Conteúdo do Aviso</label>
                  <Textarea
                    value={newAnnouncement}
                    onChange={(e) => setNewAnnouncement(e.target.value)}
                    placeholder="Digite o aviso completo..."
                    rows={4}
                  />
                </div>
                <Button type="submit" className="bg-ebd-blue hover:bg-ebd-navy">
                  Adicionar Aviso
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            Avisos da Secretaria
          </CardTitle>
          <CardDescription>
            {isSecretary ? 'Lista de todos os avisos ativos' : 'Avisos emitidos pela secretaria para professores'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {churchData?.announcements.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Não há avisos registrados
            </div>
          ) : (
            <div className="space-y-4">
              {churchData?.announcements.map((announcement, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-white border rounded-lg shadow-sm flex justify-between items-start"
                >
                  <p className="text-gray-700 whitespace-pre-wrap">{announcement}</p>
                  {isSecretary && (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(index)}
                      className="ml-4 flex-shrink-0"
                    >
                      Excluir
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementsTab;
