"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
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
import { useAuthControllerLogin } from "@/api/auth/hooks";
import { userControllerGetMe } from "@/api/users/api";
import { queryKeys } from "@/lib/query-keys";

const adminLoginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Minimum 6 caractères requis"),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

function extractAccessToken(response: unknown): string | undefined {
  if (!response || typeof response !== "object") return undefined;
  const r = response as Record<string, unknown>;
  const nested = r.data as Record<string, unknown> | undefined;
  if (typeof r.accessToken === "string") return r.accessToken;
  if (nested && typeof nested.accessToken === "string") return nested.accessToken;
  return undefined;
}

export default function AdminLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const loginMutation = useAuthControllerLogin();

  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: AdminLoginFormValues) => {
    loginMutation.mutate(values, {
      onSuccess: async (response) => {
        const token = extractAccessToken(response);
        if (!token) {
          toast.error("Réponse de connexion invalide (token manquant).");
          return;
        }

        localStorage.setItem("ACCESS_TOKEN", token);

        try {
          const me = await userControllerGetMe();
          if (me.role !== "Admin") {
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("REFRESH_TOKEN");
            toast.error(
              "Ce compte n’a pas le rôle administrateur. Utilisez la connexion classique.",
            );
            return;
          }

          await queryClient.invalidateQueries({ queryKey: queryKeys.users.me });
          toast.success("Connexion administrateur réussie.");
          router.push("/dashboard");
        } catch {
          localStorage.removeItem("ACCESS_TOKEN");
          localStorage.removeItem("REFRESH_TOKEN");
          toast.error("Impossible de vérifier votre profil. Réessayez.");
        }
      },
      onError: (error: unknown) => {
        const err = error as {
          response?: { data?: { message?: string | string[] } };
        };
        const msg = err?.response?.data?.message;
        const message = Array.isArray(msg)
          ? msg.join(", ")
          : typeof msg === "string"
            ? msg
            : "Identifiants incorrects ou compte indisponible.";
        toast.error(message);
      },
    });
  };

  const isSubmitting = loginMutation.isPending;

  return (
    <Card className="w-full max-w-md p-8 shadow-xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Connexion Admin</h2>
        <p className="text-gray-600 mt-2">
          Connectez-vous à votre compte administrateur
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="admin@exemple.com"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      placeholder="••••••••"
                      {...field}
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-lg font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connexion...
              </>
            ) : (
              "Se connecter"
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>Seuls les comptes avec le rôle administrateur peuvent accéder au panneau.</p>
      </div>
    </Card>
  );
}
