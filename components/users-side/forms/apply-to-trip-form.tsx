"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, InfoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const applyToTripSchema = z.object({
  message: z
    .string()
    .min(1, "Veuillez entrer un message")
    .max(1000, "Le message est trop long"),
});

export default function ApplyToTripForm() {
  const form = useForm<z.infer<typeof applyToTripSchema>>({
    resolver: zodResolver(applyToTripSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof applyToTripSchema>) => {
    console.log("Submitting...", values);
    // 🔥 API call here
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) form.reset(); // reset du formulaire à la fermeture
      }}
    >
      <DialogTrigger asChild>
        <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full h-[42px] font-medium">
          Postuler
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Postuler à un trajet</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Champ Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre message</FormLabel>
                  <Textarea
                    placeholder="Petit message pour vous introduire chez l'auteur de l'annonce..."
                    className="min-h-28 rounded-md mt-2"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bloc d’information */}
            <div className="flex items-center gap-x-2 text-sm text-red-700 bg-red-50 rounded-lg px-2 py-1">
              <InfoIcon className="w-5 h-5 text-red-700" />
              <p>
                Vous allez être redirigé vers une conversation privée avec
                l'auteur de l'annonce
              </p>
            </div>

            {/* Boutons */}
            <div className="flex justify-end gap-3 pt-2">
              <DialogClose asChild>
                <Button variant="outline">Annuler</Button>
              </DialogClose>

              <Button type="submit">Postuler</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
