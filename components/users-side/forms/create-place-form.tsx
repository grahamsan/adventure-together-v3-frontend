"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { usePlacesControllerCreate } from "@/api/places/hooks";
import { useUploadControllerUploadMultiple } from "@/api/upload/hooks";
import toast from "react-hot-toast";
import type { CreatePlaceDto } from "@/api/places/types";

const placeTypes = [
  "Ville",
  "Monument",
  "Musée",
  "Parc",
  "Hotel",
] as const satisfies readonly CreatePlaceDto["type"][];

const placeSchema = z.object({
  title: z.string().min(2, "Titre trop court"),
  type: z.enum(placeTypes),
  description: z.string().min(10, "Description plus détaillée"),
  address: z.string().optional(),
  image: z.instanceof(File).optional(),
});

export type CreatePlaceFormProps = {
  open?: boolean;
  onClose?: () => void;
};

export default function CreatePlaceForm({
  open,
  onClose,
}: CreatePlaceFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const createMutation = usePlacesControllerCreate();
  const uploadMutation = useUploadControllerUploadMultiple();

  const form = useForm<z.infer<typeof placeSchema>>({
    resolver: zodResolver(placeSchema),
    defaultValues: {
      title: "",
      type: "Ville",
      description: "",
      address: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof placeSchema>) => {
    try {
      let imageUrl: string | undefined;
      if (values.image) {
        const formData = new FormData();
        formData.append("files", values.image);
        const uploadResponse = await uploadMutation.mutateAsync(
          formData as unknown as { files?: string[] },
        );
        const res = uploadResponse as { data?: { url?: string }[] };
        if (res?.data?.length) {
          imageUrl = res.data[0].url;
        }
      }

      const payload: CreatePlaceDto = {
        title: values.title,
        type: values.type,
        description: values.description,
        ...(values.address?.trim() ? { address: values.address.trim() } : {}),
        ...(imageUrl ? { imageUrl } : {}),
      };

      await createMutation.mutateAsync(payload);
      toast.success("Lieu créé avec succès !");
      form.reset();
      setPreview(null);
      setIsOpen(false);
      onClose?.();
    } catch (e) {
      console.error(e);
      toast.error("Impossible de créer le lieu.");
    }
  };

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image trop lourde (max 5 Mo)");
      return;
    }
    if (!/(png|jpg|jpeg|webp)$/i.test(file.type)) {
      toast.error("Format accepté : jpg, png, webp");
      return;
    }
    form.setValue("image", file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <Dialog
      open={open !== undefined ? open : isOpen}
      onOpenChange={(v) => {
        if (!v) onClose?.();
        setIsOpen(v);
      }}
    >
      <DialogContent className="w-[98vw] lg:w-[60vw] lg:max-w-[60vw] h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer un lieu</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="flex gap-4">

              <div className="flex-1 flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex. Porte du Non-Retour" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-full w-full">
                            <SelectValue placeholder="Choisir" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {placeTypes.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t === "Hotel" ? "Hôtel / restauration" : t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        <Textarea
                          rows={4}
                          placeholder="Décrivez le lieu…"
                          className="rounded-md resize-none scrollbar-custom"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse (optionnel)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ville, quartier…" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormLabel>Photo (optionnel)</FormLabel>
                      <FormControl>
                        <label className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-stone-300 p-6 cursor-pointer hover:bg-stone-50">
                          <Upload className="w-8 h-8 text-stone-400" />
                          <span className="text-sm text-stone-600">
                            Cliquer pour choisir une image
                          </span>
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="hidden"
                            onChange={(e) =>
                              handleFile(e.target.files?.[0] ?? null)
                            }
                          />
                        </label>
                      </FormControl>
                      {preview && (
                        // eslint-disable-next-line @next/next/no-img-element -- aperçu data URL local
                        <img
                          src={preview}
                          alt=""
                          className="mt-2 max-h-40 rounded-lg object-cover w-full"
                        />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

            </div>
            <div className="w-full flex justify-end">
              <Button
                type="submit"
                className="w-fit rounded-full flex justify-center items-center"
                disabled={createMutation.isPending || uploadMutation.isPending}
              >
                {(createMutation.isPending || uploadMutation.isPending) && (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                )}
                Publier le lieu
              </Button>
            </div>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
