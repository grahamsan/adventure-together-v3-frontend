"use client";
import LoginForm from "@/components/auth/login-form";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-12 items-center justify-center min-h-screen py-24 overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[32px] font-bold mb-4">
          Connectez-vous
        </h1>
        <p className="flex gap-x-2">
          Pas de compte ?{" "}
          <span className="text-[var(--BRAND-500)] cursor-pointer" onClick={() => router.push("/register")}>Inscrivez-vous</span>
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
