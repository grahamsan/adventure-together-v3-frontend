"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, Calendar1, Loader2 } from "lucide-react";
import { useTripsControllerCreate } from "@/api/trips/hooks";
import { useExperiencesControllerFindAll } from "@/api/experiences/hooks";
import { useVehiclesControllerFindAll } from "@/api/vehicles/hooks";
import toast from "react-hot-toast";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { SearchableSelect } from "@/components/shared/searchable-select";
import PlaceLocationInput from "@/components/shared/place-location-input";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { useEffect, useRef, useState } from "react";
import { format, isAfter, isBefore, startOfDay } from "date-fns";
import { formatRelativeDate } from "@/utils/format-relative-date";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Updated Schema to match new API payload
const tripSchema = z.object({
  from: z.string().min(2, "Le lieu de départ est requis"),
  to: z.string().min(2, "La destination est requise"),
  startDate: z.date(),
  startHour: z.string().min(1, "L'heure de départ est requise"),
  tripDescription: z.string().min(2, "La description est requise"),
  price: z.coerce.number().min(1, "Le prix est requis"),
  seatsAvailable: z.coerce.number().min(1, "Le nombre de places est requis"),
  /** Optionnel côté API : trajet sans expérience liée. */
  experienceId: z.string().optional(),
  placeId: z.string().optional(),
  escales: z.array(z.string()),
  associatedVehicle: z.string().min(1, "Veuillez sélectionner un véhicule"),
});

type TripFormValues = z.infer<typeof tripSchema>;

// --- Sortable Escale Card ---
function SortableEscaleCard({ id, value }: { id: string; value: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-100 rounded-md p-3 mb-2 flex items-center justify-between shadow-sm"
    >
      <span className="flex-1 text-gray-800">{value}</span>
      <GripVertical
        {...listeners}
        {...attributes}
        className="cursor-grab text-gray-500 ml-2"
        size={20}
      />
    </div>
  );
}

/** Ouverture depuis le drawer « trajets d’une expérience » : arrivée, expérience et borne date max. */
export type CreateTripExperienceContext = {
  experienceId: string;
  eventLocation: string;
  eventStartAt: Date;
};

export interface CreateTripFormProps {
  open?: boolean;
  onClose?: () => void;
  experienceContext?: CreateTripExperienceContext;
  /** Ouvre uniquement via `open` (pas de bouton + dans le dialogue). */
  hideTrigger?: boolean;
}

function defaultStartDateWithinEvent(eventStart: Date): Date {
  const eventDay = startOfDay(eventStart);
  const today = startOfDay(new Date());
  if (isAfter(today, eventDay)) return eventDay;
  return today;
}

export default function CreateTripForm({
  open,
  onClose,
  experienceContext,
  hideTrigger = false,
}: CreateTripFormProps) {
  const [step, setStep] = useState(1);
  const [escales, setEscales] = useState<string[]>([]);
  const [escaleInput, setEscaleInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const prevDialogOpenRef = useRef(false);

  const dialogOpen = open !== undefined ? open : isOpen;

  // Hooks for fetching options
  const { data: experiencesData } = useExperiencesControllerFindAll();
  const { data: vehiclesData } = useVehiclesControllerFindAll();

  // Map to SearchableSelect items
  const experienceOptions =
    [
      {
        value: "",
        label: "Aucune expérience (trajet autonome)",
        searchKey: "aucune autonome",
      },
      ...(experiencesData?.data?.map((exp: any) => ({
        value: exp.id,
        label: exp.title,
        searchKey: exp.title,
      })) || []),
    ];

  const vehicleOptions =
    vehiclesData?.map((veh: any) => ({
      value: veh.id,
      label: `${veh.brand} ${veh.model} (${veh.seats} places)`,
      searchKey: `${veh.brand} ${veh.model}`,
    })) || [];

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripSchema) as any,
    defaultValues: {
      from: "",
      to: "",
      startDate: new Date(),
      startHour: "",
      tripDescription: "",
      price: 0,
      seatsAvailable: 1,
      experienceId: "",
      placeId: "",
      associatedVehicle: "",
      escales: [],
    },
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const addEscale = () => {
    const val = escaleInput.trim();
    if (val && !escales.includes(val)) {
      setEscales([...escales, val]);
      setEscaleInput("");
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = escales.findIndex((e) => e === active.id);
      const newIndex = escales.findIndex((e) => e === over.id);
      setEscales(arrayMove(escales, oldIndex, newIndex));
    }
  };

  const createTripMutation = useTripsControllerCreate();

  useEffect(() => {
    const justOpened = dialogOpen && !prevDialogOpenRef.current;
    prevDialogOpenRef.current = dialogOpen;
    if (!justOpened || !experienceContext) return;

    form.reset({
      from: "",
      to: experienceContext.eventLocation,
      startDate: defaultStartDateWithinEvent(experienceContext.eventStartAt),
      startHour: "",
      tripDescription: "",
      price: 0,
      seatsAvailable: 1,
      experienceId: experienceContext.experienceId,
      placeId: "",
      associatedVehicle: "",
      escales: [],
    });
    setEscales([]);
    setStep(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset ciblé à l’ouverture du dialogue
  }, [dialogOpen, experienceContext]);

  const onSubmit = async (values: TripFormValues) => {
    const payload = {
      from: values.from,
      to: values.to,
      startDate: format(values.startDate, "yyyy-MM-dd"), // Format as YYYY-MM-DD
      startHour: values.startHour,
      tripDescription: values.tripDescription,
      price: Number(values.price),
      seatsAvailable: Number(values.seatsAvailable),
      ...(values.experienceId?.trim()
        ? { experienceId: values.experienceId.trim() }
        : {}),
      placeId: values.placeId || undefined, // Optional
      escales: escales,
      associatedVehicle: values.associatedVehicle,
    };

    createTripMutation.mutate(payload as any, {
      onSuccess: () => {
        toast.success("Trajet créé avec succès !");
        if (values.experienceId?.trim()) {
          queryClient.invalidateQueries({
            queryKey: queryKeys.experiences.trip(values.experienceId.trim()),
          });
        }
        queryClient.invalidateQueries({ queryKey: queryKeys.experiences.all });
        setIsOpen(false);
        if (onClose) onClose();
        form.reset();
        setEscales([]);
        setStep(1);
      },
      onError: (error: any) => {
        console.error("Error creating trip:", error);
        toast.error("Erreur lors de la création du trajet.");
      },
    });
  };

  const calendarDisabled = (date: Date) => {
    const d = startOfDay(date);
    const today = startOfDay(new Date());
    if (isBefore(d, today)) return true;
    if (experienceContext) {
      const maxDay = startOfDay(experienceContext.eventStartAt);
      if (isAfter(d, maxDay)) return true;
    }
    return false;
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(isOpenNew) => {
        if (!isOpenNew) {
          form.reset();
          setEscales([]);
          setStep(1);
        }
        if (onClose && !isOpenNew) onClose();
        if (open === undefined) setIsOpen(isOpenNew);
      }}
    >
      {!hideTrigger && (
        <DialogTrigger asChild>
          <Button className="h-10 w-10">
            <Plus className="h-5 w-5" />
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Créer un voyage</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4"
          >
            {/* --- STEP 1: Basic Info --- */}
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Départ</FormLabel>
                      <PlaceLocationInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Lieu de départ (saisie libre ou lieu plateforme)"
                        id={field.name}
                      />
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
                      <PlaceLocationInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Destination"
                        disabled={Boolean(experienceContext)}
                        id={field.name}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prix (FCFA)</FormLabel>
                        <Input
                          {...field}
                          type="number"
                          min={0}
                          placeholder="5000"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="seatsAvailable"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Places disponibles</FormLabel>
                        <Input
                          {...field}
                          type="number"
                          min={1}
                          placeholder="4"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={() => setStep(2)}>
                    Suivant
                  </Button>
                </div>
              </>
            )}

            {/* --- STEP 2: Date & Associations --- */}
            {step === 2 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de départ</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="flex gap-x-2 items-center font-semibold w-full justify-start text-left bg-stone-100 text-stone-500 p-2 rounded-lg cursor-pointer">
                              <Calendar1 className="h-4 w-4" />
                              {field.value
                                ? formatRelativeDate(field.value)
                                : "Sélectionner une date"}
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={calendarDisabled}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startHour"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heure de départ</FormLabel>
                        <Input {...field} type="time" />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="experienceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expérience associée</FormLabel>
                      <p className="mb-1 text-xs text-muted-foreground">
                        Optionnel : liez le trajet à un événement ou laissez un
                        trajet autonome.
                      </p>
                      <SearchableSelect
                        items={experienceOptions}
                        placeholder="Rechercher une expérience..."
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                        disabled={Boolean(experienceContext)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="associatedVehicle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Véhicule</FormLabel>
                      <SearchableSelect
                        items={vehicleOptions}
                        placeholder="Rechercher un véhicule..."
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={false}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Optional Place ID - Keeping it simple or hidden? User said "place est optionnel". 
                    Adding input just in case user wants to manually enter, or could be removed if unneeded.
                    I'll add it as an optional advanced field or just leave it. 
                    Given the prompt "retirer les champs qui n'ont rien à voir" and "place est optionnel", 
                    I'll include it for completeness of payload but maybe at the bottom or if needed.
                */}
                {/* 
                <FormField
                  control={form.control}
                  name="placeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lieu (ID Optionnel)</FormLabel>
                      <Input {...field} placeholder="Identifiant du lieu" />
                      <FormMessage />
                    </FormItem>
                  )}
                /> 
                */}

                <div className="flex justify-between mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Retour
                  </Button>
                  <Button type="button" onClick={() => setStep(3)}>
                    Suivant
                  </Button>
                </div>
              </>
            )}

            {/* --- STEP 3: Description & Escales --- */}
            {step === 3 && (
              <>
                <FormField
                  control={form.control}
                  name="tripDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description du trajet</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Décrivez le trajet..."
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mb-2">
                  <FormLabel>Escales prévues</FormLabel>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={escaleInput}
                      onChange={(e) => setEscaleInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addEscale())
                      }
                      placeholder="Ajouter une escale"
                    />
                    <Button type="button" onClick={addEscale}>
                      Ajouter
                    </Button>
                  </div>
                </div>

                <div className="h-48 overflow-y-auto mt-3 border rounded-md p-2 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-200">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={escales}
                      strategy={verticalListSortingStrategy}
                    >
                      {escales.map((e) => (
                        <SortableEscaleCard key={e} id={e} value={e} />
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Nombre d'escales : {escales.length}
                </p>

                <div className="flex justify-between mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                  >
                    Retour
                  </Button>
                  <Button type="submit" disabled={createTripMutation.isPending}>
                    {createTripMutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Créer le trajet
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
