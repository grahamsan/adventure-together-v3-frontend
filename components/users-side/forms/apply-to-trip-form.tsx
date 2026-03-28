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
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
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
import { useTripsControllerApply } from "@/api/trips/hooks";
import toast from "react-hot-toast";

const applyToTripSchema = z.object({
  message: z.string().max(1000, "Le message est trop long"),
  requestedSeats: z.coerce
    .number()
    .min(1, "Au moins 1 place")
    .max(10, "Maximum 10 places"), // Adjust max as needed or based on prop
});

type ApplyToTripFormValues = z.infer<typeof applyToTripSchema>;

export default function ApplyToTripForm({
  tripId,
  hasApplied,
  seatsAvailable,
}: {
  tripId: string;
  hasApplied: boolean;
  seatsAvailable: number;
}) {
  const form = useForm<ApplyToTripFormValues>({
    resolver: zodResolver(applyToTripSchema) as any,
    defaultValues: {
      message: "",
      requestedSeats: 1,
    },
  });

  const applyMutation = useTripsControllerApply();

  const onSubmit = async (values: ApplyToTripFormValues) => {
    applyMutation.mutate(
      {
        id: tripId,
        message: values.message?.trim() || undefined,
        requestedSeats: values.requestedSeats,
      },
      {
        onSuccess: () => {
          toast.success("Candidature envoyée !");
          form.reset();
        },
        onError: (error: any) => {
          toast.error("Erreur lors de l'envoi de la candidature.");
        },
      },
    );
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) form.reset(); // reset du formulaire à la fermeture
      }}
    >
      <DialogTrigger asChild>
        <Button
          disabled={hasApplied}
          className="flex-1 bg-[var(--BRAND-500)] hover:bg-amber-700 text-white rounded-full h-[42px] font-medium"
        >
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
            <div className="flex gap-4">
              {/* Champ Places */}
              <FormField
                control={form.control}
                name="requestedSeats"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Places</FormLabel>
                    <Input
                      type="number"
                      min={1}
                      max={seatsAvailable}
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber || 1)
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Champ Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message de motivation (optionnel)</FormLabel>
                  <Textarea
                    placeholder="Sinon, un texte sera proposé automatiquement dans la conversation avec le conducteur."
                    className="min-h-28 rounded-md mt-2"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Boutons */}
            <div className="flex justify-end gap-3 pt-2">
              <DialogClose asChild>
                <Button variant="outline">Annuler</Button>
              </DialogClose>

              <Button type="submit" disabled={applyMutation.isPending}>
                {applyMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Postuler
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
