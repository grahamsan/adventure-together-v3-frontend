"use client";
import ForgotPasswordFormAnimated from "@/components/auth/forgot-password";
import { useRouter } from "next/navigation";


export default function ForgotPasswordPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-6 items-center justify-center min-h-screen py-24 overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[32px] font-bold mb-4">
          Mot de passe oublié
        </h1>
        <p className="flex gap-x-2">
          Retour à la page de connexion ?{" "}
          <span className="text-[var(--BRAND-500)] cursor-pointer" onClick={() => router.push("/login")}>Se connecter</span>
        </p>
      </div>
      <ForgotPasswordFormAnimated />
    </div>
  );
}
