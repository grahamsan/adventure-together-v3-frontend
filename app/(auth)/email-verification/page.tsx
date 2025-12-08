"use client";
import EmailVerificationFormAnimated from "@/components/auth/email-verification";
import { useRouter } from "next/navigation";


export default function EmailVerificationPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-6 items-center justify-center min-h-screen py-24 overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[32px] font-bold mb-4">
          Vérification de l'email
        </h1>
      </div>
      <EmailVerificationFormAnimated />
    </div>
  );
}
