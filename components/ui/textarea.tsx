import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Style aligné avec Input
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "dark:bg-input/30 w-full min-w-0 rounded-lg border bg-transparent px-3 py-2 text-base shadow-xs transition-all outline-none md:text-sm",

        // Bordure & focus (identique Input)
        "border-stone-200 focus:border-[var(--BRAND-500)] focus:ring-[var(--BRAND-500)]/60 focus:ring-2",

        // Erreurs
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

        // Désactivé
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

        // Taille minimale + poignée de redimensionnement
        "min-h-24 resize-y",

        className
      )}
      {...props}
    />
  );
}

export { Textarea };
