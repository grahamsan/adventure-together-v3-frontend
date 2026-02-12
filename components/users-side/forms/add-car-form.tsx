import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, Plus, Car } from "lucide-react";
import { useVehiclesControllerCreate } from "@/api/vehicles/hooks";
import { useUploadControllerUploadMultiple } from "@/api/upload/hooks";
import toast from "react-hot-toast";

const vehicleSchema = z.object({
  brand: z.string().min(2, "La marque doit contenir au moins 2 caractères"),
  model: z.string().min(2, "Le modèle doit contenir au moins 2 caractères"),
  plateNumber: z.string().optional(),
  seats: z.number().min(1, "Le nombre de places doit être au moins 1").max(50, "Maximum 50 places"),
  image: z.instanceof(File).optional(),
});

export interface CreateVehicleFormProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateVehicleForm({
  open,
  onClose,
}: CreateVehicleFormProps) {
  const [page, setPage] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const createVehicleMutation = useVehiclesControllerCreate();
  const uploadMutation = useUploadControllerUploadMultiple();

  const form = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      brand: "",
      model: "",
      plateNumber: "",
      seats: 5,
    },
  });

  const onSubmit = async (values: z.infer<typeof vehicleSchema>) => {
    try {
      let imageUrl = "";

      // 1. Upload Image if exists
      if (values.image) {
        const formData = new FormData();
        formData.append("files", values.image);

        const uploadResponse = await uploadMutation.mutateAsync(
          formData as any
        );

        if (uploadResponse?.data && uploadResponse.data.length > 0) {
          imageUrl = uploadResponse.data[0].url;
        }
      }

      // 2. Create Vehicle
      const vehiclePayload = {
        brand: values.brand,
        model: values.model,
        plateNumber: values.plateNumber || undefined,
        seats: values.seats,
        imageUrl: imageUrl || undefined,
      };

      await createVehicleMutation.mutateAsync(vehiclePayload);

      toast.success("Véhicule créé avec succès !");
      setIsOpen(false);
      form.reset();
      setPage(1);
      setImagePreview(null);
    } catch (error: any) {
      console.error("Error creating vehicle:", error);
      toast.error(
        "Une erreur est survenue lors de la création du véhicule."
      );
    }
  };

  const handleImage = (file: File | null) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024)
      return alert("Image trop lourde (max 5 Mo)");
    if (!/(png|jpg|jpeg)$/i.test(file.type)) return alert("Format non valide");

    form.setValue("image", file);

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <Dialog
      open={open !== undefined ? open : isOpen}
      onOpenChange={(isOpen) => {
        if (onClose && !isOpen) {
          onClose();
        }
        setIsOpen(isOpen);
      }}
    >
      {/* <DialogTrigger asChild>
        <Button className="w-10 h-10" suppressHydrationWarning={true}>
          <Plus className="w-5 h-5" />
        </Button>
      </DialogTrigger> */}
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            Créer un véhicule
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {page === 1 && (
              <>
                {/* BRAND */}
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marque</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Renault, Peugeot..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* MODEL */}
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modèle</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Clio, 308..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* PLATE NUMBER */}
                <FormField
                  control={form.control}
                  name="plateNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Immatriculation (optionnel)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: AB-123-CD" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* SEATS */}
                <FormField
                  control={form.control}
                  name="seats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de places</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="50"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  className="w-full"
                  onClick={() => setPage(2)}
                >
                  Suivant
                </Button>
              </>
            )}

            {page === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormLabel>Image du véhicule (optionnel)</FormLabel>
                      <div
                        className="border border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/30"
                        onDrop={(e) => {
                          e.preventDefault();
                          handleImage(e.dataTransfer.files[0]);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() =>
                          document.getElementById("vehicleFilePick")?.click()
                        }
                      >
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            className="mx-auto h-40 object-cover rounded-md"
                            alt="Aperçu du véhicule"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                            <Upload className="w-6 h-6" />
                            Glissez une image ou cliquez pour importer
                          </div>
                        )}
                      </div>

                      <input
                        id="vehicleFilePick"
                        type="file"
                        accept="image/png, image/jpeg"
                        className="hidden"
                        onChange={(e) =>
                          handleImage(e.target.files?.[0] || null)
                        }
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPage(1)}
                  >
                    Retour
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      createVehicleMutation.isPending ||
                      uploadMutation.isPending
                    }
                  >
                    {createVehicleMutation.isPending ||
                    uploadMutation.isPending
                      ? "Création..."
                      : "Créer le véhicule"}
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}