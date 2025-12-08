"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, Calendar1 } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { useState } from "react";
import { format } from "date-fns";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tripSchema = z.object({
  from: z.string().min(2),
  to: z.string().min(2),
  startDate: z.date(),
  startHour: z.string(),
  associatedEventTitle: z.string().min(2),
  escales: z.array(z.string().min(1)),
  associatedVehicle: z.string().min(1),
  tripDescription: z.string().min(2),
  price: z.number().min(1),
  meetingPoint: z.object({
    latitude: z.number(),
    longitude: z.number(),
    description: z.string().min(2),
  }),
});

type TripFormValues = z.infer<typeof tripSchema>;

const mockVehicles = [
  { id: "veh1", name: "Toyota Prius", seats: 4 },
  { id: "veh2", name: "Ford Transit", seats: 8 },
  { id: "veh3", name: "Renault Kangoo", seats: 5 },
];

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

// --- Main Form Component ---
export default function CreateTripForm() {
  const [step, setStep] = useState(1);
  const [escales, setEscales] = useState<string[]>([]);
  const [escaleInput, setEscaleInput] = useState("");
  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      from: "",
      to: "",
      startDate: new Date(),
      startHour: "",
      associatedEventTitle: "",
      escales: [],
      associatedVehicle: "",
      tripDescription: "",
      price: 0,
      meetingPoint: { latitude: 0, longitude: 0, description: "" },
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

  const onSubmit = async (values: TripFormValues) => {
    const payload = { ...values, escales };
    console.log("Ready for API:", payload);
    alert("Form submitted! Voir console pour les données.");
    // await fetch("/api/trips", { method: "POST", body: JSON.stringify(payload) });
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-10 h-10">
          <Plus className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Créer un voyage</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4"
          >
            {/* --- STEP 1: From/To --- */}
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <Input {...field} placeholder="Lieu de départ" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <Input {...field} placeholder="Destination" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="button" onClick={() => setStep(2)}>
                    Suivant
                  </Button>
                </div>
              </>
            )}

            {/* --- STEP 2: Details --- */}
            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de départ</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <div
                            className="flex gap-x-2 items-center font-semibold w-full justify-start text-left bg-stone-100 text-stone-500 p-2 rounded-lg cursor-pointer"
                          >
                            <Calendar1 className="h-4 w-4" />
                            {field.value
                              ? format(field.value, "PPP")
                              : "Sélectionner une date"}
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
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
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="associatedEventTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Événement associé</FormLabel>
                      <Input {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tripDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description du trajet</FormLabel>
                      <Textarea {...field} placeholder="Décrivez le trajet" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix par place (FCFA)</FormLabel>
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        placeholder="Ex: 5000"
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="associatedVehicle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Véhicule</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionner un véhicule" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockVehicles.map((v) => (
                            <SelectItem key={v.id} value={v.name}>
                              {v.name} ({v.seats} places)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
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

            {step === 3 && (
              <>
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

                <div className="h-64 overflow-y-auto mt-3 border rounded-md p-2 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-200">
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
                  <Button type="submit">Créer le trajet</Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
