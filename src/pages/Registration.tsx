
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useChurch } from "@/context/ChurchContext";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Lock, Key, ChevronLeft } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Form validation schema
const formSchema = z.object({
  churchName: z.string().min(3, "Nome da igreja deve ter pelo menos 3 caracteres"),
  fullName: z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  username: z.string().min(3, "Nome de usuário deve ter pelo menos 3 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  role: z.enum(["teacher", "secretary"], {
    required_error: "Por favor, selecione um perfil",
  }),
  agreeTerms: z.boolean().refine(value => value === true, {
    message: "Você deve concordar com os termos de uso",
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const Registration = () => {
  const navigate = useNavigate();
  const { registerSecretary, secretaryLogin } = useChurch();
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      churchName: localStorage.getItem("ebdChurchName") || "",
      fullName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "secretary",
      agreeTerms: false
    },
  });

  const onSubmit = (data: FormValues) => {
    // Store the church name in localStorage
    localStorage.setItem("ebdChurchName", data.churchName);
    
    if (data.role === "secretary") {
      // Registrar novo secretário
      const success = registerSecretary(data.username, data.password, data.fullName, data.email);
      
      if (success) {
        toast({
          title: "Cadastro de secretário realizado com sucesso!",
          description: "Sua conta de secretário foi criada.",
        });
        
        // Fazer login automático como secretário
        secretaryLogin(data.username, data.password);
        navigate("/secretary");
      } else {
        toast({
          title: "Erro no cadastro",
          description: "Não foi possível criar a conta de secretário.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Cadastro de professor não disponível",
        description: "Professores devem ser cadastrados pelo secretário.",
        variant: "destructive",
      });
    }
  };
  
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ebd-gray p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-ebd-blue mb-2">EBD</h1>
          <p className="text-lg text-gray-600">Escola Bíblica Dominical</p>
        </div>
        
        <Card className="w-full">
          <CardHeader className="ebd-gradient text-white rounded-t-lg">
            <CardTitle className="text-xl font-semibold">Cadastro de Secretário</CardTitle>
            <CardDescription className="text-white/80">
              Crie sua conta de secretário para acessar o sistema EBD
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="churchName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Igreja</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Ex: Igreja Batista Central"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <div className="absolute left-3 top-2.5 text-gray-500">
                          <Key size={18} />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Digite seu nome completo"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <div className="absolute left-3 top-2.5 text-gray-500">
                          <User size={18} />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="seu-email@exemplo.com"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <div className="absolute left-3 top-2.5 text-gray-500">
                          <Mail size={18} />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome de Usuário</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Digite seu nome de usuário"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <div className="absolute left-3 top-2.5 text-gray-500">
                          <User size={18} />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Crie uma senha segura"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <div className="absolute left-3 top-2.5 text-gray-500">
                          <Lock size={18} />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirme sua Senha</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Digite sua senha novamente"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <div className="absolute left-3 top-2.5 text-gray-500">
                          <Lock size={18} />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="agreeTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium leading-none cursor-pointer">
                          Concordo com os termos de uso e política de privacidade
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="pt-4 space-y-2">
                  <Button type="submit" className="w-full bg-ebd-blue hover:bg-ebd-navy">
                    Cadastrar como Secretário
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center"
                    onClick={goToLogin}
                  >
                    <ChevronLeft className="mr-1" size={16} /> Voltar para o Login
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Registration;
