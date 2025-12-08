"use client";
import RegisterForm from "@/components/auth/register-form";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-12 items-center justify-center min-h-screen py-24 overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[32px] font-bold mb-4">
          Rejoignez AdventureTogether
        </h1>
        <p>
          Déjà un compte ?{" "}
          <span className="text-[var(--BRAND-500)] cursor-pointer" onClick={() => router.push("/login")}>Connectez-vous</span>
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
