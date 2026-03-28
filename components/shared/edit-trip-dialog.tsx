"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useTripsControllerUpdate } from "@/api/trips/hooks";
import toast from "react-hot-toast";
import { useEffect } from "react";

const schema = z.object({
  from: z.string().min(2, "Requis"),
  to: z.string().min(2, "Requis"),
  startDate: z.string().min(1, "Date requise"),
  startHour: z.string().min(1, "Heure requise"),
  tripDescription: z.string().min(2, "Description requise"),
  price: z.coerce.number().min(0),
  seatsAvailable: z.coerce.number().min(1),
  escalesRaw: z.string().optional(),
});

type Values = z.infer<typeof schema>;

export interface EditTripDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tripId: string;
  initial: {
    from: string;
    to: string;
    date: string;
    time: string;
    description: string;
    price: number;
    seatsAvailable: number;
    escales: string[];
  };
}

export default function EditTripDialog({
  open,
  onOpenChange,
  tripId,
  initial,
}: EditTripDialogProps) {
  const updateMutation = useTripsControllerUpdate();

  const form = useForm<Values>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      from: initial.from,
      to: initial.to,
      startDate: initial.date ? initial.date.split("T")[0] : "",
      startHour: initial.time,
      tripDescription: initial.description,
      price: Number(initial.price),
      seatsAvailable: initial.seatsAvailable,
      escalesRaw: initial.escales?.join(", ") ?? "",
    },
  });

  useEffect(() => {
    if (!open) return;
    form.reset({
      from: initial.from,
      to: initial.to,
      startDate: initial.date ? initial.date.split("T")[0] : "",
      startHour: initial.time,
      tripDescription: initial.description,
      price: Number(initial.price),
      seatsAvailable: initial.seatsAvailable,
      escalesRaw: initial.escales?.join(", ") ?? "",
    });
  }, [open, initial, form]);

  const onSubmit = (values: Values) => {
    const escales = values.escalesRaw
      ? values.escalesRaw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    updateMutation.mutate(
      {
        id: tripId,
        payload: {
          from: values.from,
          to: values.to,
          startDate: values.startDate,
          startHour: values.startHour,
          tripDescription: values.tripDescription,
          price: values.price,
          seatsAvailable: values.seatsAvailable,
          escales,
        },
      },
      {
        onSuccess: () => {
          toast.success("Trajet mis à jour.");
          onOpenChange(false);
        },
        onError: () => {
          toast.error(
            "Impossible de modifier le trajet (candidatures déjà reçues ou erreur serveur).",
          );
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier le trajet</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-2"
          >
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Départ</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arrivée</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Input type="date" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startHour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heure</FormLabel>
                    <Input type="time" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="tripDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Textarea {...field} rows={4} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix (FCFA)</FormLabel>
                    <Input type="number" min={0} {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seatsAvailable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Places</FormLabel>
                    <Input type="number" min={1} {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="escalesRaw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Escales (séparées par des virgules)</FormLabel>
                  <Input {...field} placeholder="Ville A, Ville B" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Enregistrer
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
