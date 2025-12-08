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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Upload, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const eventSchema = z.object({
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères"),
  description: z
    .string()
    .min(2, "La description doit contenir au moins 2 caractères"),
  location: z.string().min(2, "Le lieu doit contenir au moins 2 caractères"),
  image: z.instanceof(File).optional(),
  dateStart: z.date(),
  dateEnd: z.date(),
});

export default function CreateEventForm() {
  const [page, setPage] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      dateStart: new Date(),
      dateEnd: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof eventSchema>) => {
    console.log("Ready for API call:", values);
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
    <Dialog>
      <DialogTrigger asChild>
        {/* FIX: Ajout de suppressHydrationWarning pour éviter les erreurs d'IDs Radix UI */}
        <Button className="w-10 h-10" suppressHydrationWarning={true}>
          <Plus className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Créer un événement</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {page === 1 && (
              <>
                {/* TITLE */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom de l'événement" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* DESCRIPTION */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez votre événement..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* LOCATION */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lieu</FormLabel>
                      <FormControl>
                        <Input placeholder="Lieu de l'événement" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex-1 flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="dateStart"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de début</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <div
                                className={cn(
                                  "w-full justify-start text-left font-normal flex items-center gap-x-2 bg-green-50 p-2 w-fit rounded-lg text-green-500 font-semibold cursor-pointer",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value
                                  ? format(field.value, "PPP")
                                  : "Choisir une date"}
                              </div>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateEnd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de fin</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <div
                                className={cn(
                                  "w-full justify-start text-left font-normal flex items-center gap-x-2 bg-red-50 p-2 w-fit rounded-lg text-red-500 font-semibold cursor-pointer",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value
                                  ? format(field.value, "PPP")
                                  : "Choisir une date"}
                              </div>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                      <FormLabel>Image de l'événement</FormLabel>
                      <div
                        className="border border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/30"
                        onDrop={(e) => {
                          e.preventDefault();
                          handleImage(e.dataTransfer.files[0]);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() =>
                          document.getElementById("filePick")?.click()
                        }
                      >
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            className="mx-auto h-40 object-cover rounded-md"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                            <Upload className="w-6 h-6" />
                            Glissez une image ou cliquez pour importer
                          </div>
                        )}
                      </div>

                      <input
                        id="filePick"
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
                  <Button type="submit">Créer l'événement</Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
