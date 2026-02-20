"use client";

import { useGetUserRole } from "@/api/app/hooks";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AdminGuard({ children }: { children: ReactNode }) {
  const { isAdmin, isLoading, isError } = useGetUserRole();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full space-y-4 text-center">
        <h1 className="text-4xl font-bold text-red-600">403</h1>
        <h2 className="text-2xl font-semibold">Accès refusé</h2>
        <p className="text-gray-600 max-w-md">
          Vous n'êtes pas autorisé à accéder à cette page.
        </p>
        <Button onClick={() => router.push("/home")}>
          Me ramener à l'accueil
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
