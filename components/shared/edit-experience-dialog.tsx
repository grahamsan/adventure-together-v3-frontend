"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useExperiencesControllerUpdate } from "@/api/experiences/hooks";
import type { Experience } from "@/api/experiences/types";

const schema = z.object({
  title: z.string().min(2, "Le titre est requis"),
  description: z.string().min(2, "La description est requise"),
  location: z.string().min(2, "Le lieu est requis"),
});

type FormValues = z.infer<typeof schema>;

export default function EditExperienceDialog({
  open,
  onOpenChange,
  experience,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience: Experience;
}) {
  const updateMutation = useExperiencesControllerUpdate();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
    },
  });

  useEffect(() => {
    if (experience && open) {
      form.reset({
        title: experience.title,
        description: experience.description,
        location: experience.location,
      });
    }
  }, [experience, open, form]);

  const onSubmit = (values: FormValues) => {
    updateMutation.mutate(
      {
        id: experience.id,
        payload: {
          title: values.title,
          description: values.description,
          location: values.location,
        },
      },
      {
        onSuccess: () => {
          toast.success("Événement mis à jour.");
          onOpenChange(false);
        },
        onError: () => {
          toast.error("Impossible de modifier l’événement.");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Modifier l’événement</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lieu</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                {updateMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Enregistrer"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
