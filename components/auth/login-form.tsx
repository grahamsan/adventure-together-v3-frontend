"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthControllerLogin } from "@/api/auth/hooks";

// --- 1. Schéma Zod pour la Connexion ---
const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Minimum 6 caractères requis"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
};

// --- 2. Composant LoginForm ---

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const loginMutation = useAuthControllerLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: "onChange",
  });

  // Fonction de soumission
  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        // Stocker le token (gère les deux structures possibles)
        const token = response?.accessToken || response?.data?.accessToken;
        if (token) {
          localStorage.setItem("ACCESS_TOKEN", token);
        }

        toast.success("Bon retour parmi nous !");
        router.push("/home");
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          "Échec de la connexion. Veuillez vérifier vos identifiants.";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <Card className="space-y-6 p-6 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Champ Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="votre.email@exemple.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Champ Mot de passe avec Toggle */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 6 caractères"
                        {...field}
                        className="pr-10"
                      />
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bouton de Soumission */}
            <Button type="submit" className="w-full">
              Se connecter
            </Button>

            {/* Lien pour mot de passe oublié */}
            <p className="text-sm text-center text-muted-foreground">
              <a
                href="/forgot-password"
                className="text-primary hover:underline"
              >
                Mot de passe oublié ?
              </a>
            </p>
          </form>
        </Form>
      </Card>
    </div>
  );
}
