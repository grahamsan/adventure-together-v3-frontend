"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RoleBadge from "../shared/role-badges";
import PickCard from "../shared/pick-card";
import { Card } from "@/components/ui/card";
import { MotionWrapper } from "../shared/motion-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRegister } from "@/features/auth/queries";
import { RegisterDto } from "@/features/auth/types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const baseUserSchema = z.object({
  nom: z.string().min(1, "Champ requis"),
  prenom: z.string().min(1, "Champ requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(8, "Numéro invalide"),
  dateNaissance: z.string().min(1, "Champ requis"),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, "Minimum 6 caractères"),
    confirmPassword: z.string().min(6, "Minimum 6 caractères"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

const vehicleSchema = z.object({
  marque: z.string().min(1, "Champ requis"),
  modele: z.string().min(1, "Champ requis"),
  immatriculation: z.string().min(1, "Champ requis"),
  photos: z.array(z.any()).optional(),
});

const organizerEntrepriseSchema = z.object({
  type: z.enum([
    "restaurant",
    "agence evenementielle",
    "hotel",
    "centre de loisirs",
    "salle de spectacle",
    "musée",
    "parc d'attractions",
  ]),
  nomEntreprise: z.string().min(1, "Champ requis"),
  emailContact: z.string().email("Email invalide"),
  numeroContact: z.string().min(8, "Numéro invalide"),
  adresseSiege: z.string().min(3, "Champ requis"),
});

const organizerParticulierSchema = baseUserSchema.extend({
  dateNaissance: z.string().min(1, "Champ requis"),
});

const registerSchema = z.object({
  role: z.enum(["Participant", "Organizer", "Driver"]).optional(),
  nom: z.string().optional(),
  prenom: z.string().optional(),
  email: z.string().optional(),
  telephone: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  dateNaissance: z.string().optional(),
  nomEntreprise: z.string().optional(),
  type: z
    .enum([
      "restaurant",
      "agence evenementielle",
      "hotel",
      "centre de loisirs",
      "salle de spectacle",
      "musée",
      "parc d'attractions",
    ])
    .optional(),
  emailContact: z.string().optional(),
  numeroContact: z.string().optional(),
  adresseSiege: z.string().optional(),
  marque: z.string().optional(),
  modele: z.string().optional(),
  immatriculation: z.string().optional(),
  permisConduire: z.string().optional(),
  photos: z.array(z.any()).optional(),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const step1Schema = z.object({
  role: z.enum(["Participant", "Organizer", "Driver"]),
});

const getStep2Schema = (role: string, isEntreprise: boolean) => {
  if (role === "Organizer") {
    if (isEntreprise) {
      return organizerEntrepriseSchema;
    }
    return organizerParticulierSchema;
  }
  if (role === "Driver") {
    return baseUserSchema.extend({
      permisConduire: z.string().min(1, "Numéro de permis requis"),
    });
  }
  return baseUserSchema;
};

const step3Schema = passwordSchema;

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<
    "Participant" | "Organizer" | "Driver" | null
  >(null);
  const [isEntreprise, setIsEntreprise] = useState(false);
  const [formData, setFormData] = useState<RegisterFormValues>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const registerMutation = useRegister();

  // Fonction pour obtenir le schéma actuel
  const getCurrentSchema = () => {
    if (step === 1) return step1Schema;
    if (step === 2 && selectedRole)
      return getStep2Schema(selectedRole, isEntreprise);
    return step3Schema;
  };

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema) as any,
    defaultValues: {
      role: "Participant",
      nom: "",
      prenom: "",
      email: "",
      telephone: " ",
      password: " ",
      confirmPassword: " ",
      dateNaissance: " ",
      nomEntreprise: " ",
      type: "agence evenementielle",
      emailContact: " ",
      numeroContact: " ",
      adresseSiege: " ",
      marque: " ",
      modele: " ",
      immatriculation: " ",
      permisConduire: " ",
      photos: [],
    },
  });

  // Met à jour la validation quand step/role/isEntreprise change
  useEffect(() => {
    form.clearErrors();
    // Restaure les données sauvegardées quand on change d'étape
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof RegisterFormValues];
      if (value !== undefined && value !== "") {
        form.setValue(key as keyof RegisterFormValues, value);
      }
    });
  }, [step, selectedRole, isEntreprise]);

  const validateCurrentStep = async () => {
    const currentSchema = getCurrentSchema();
    const values = form.getValues();

    try {
      await currentSchema.parseAsync(values);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as keyof RegisterFormValues;
          if (fieldName) {
            form.setError(fieldName, {
              type: "manual",
              message: issue.message,
            });
          }
        });
      }
      return false;
    }
  };

  const handleContinue = async () => {
    // Pour l'étape 1, on vérifie juste qu'un rôle est sélectionné
    if (step === 1) {
      if (!selectedRole) return;
      form.setValue("role", selectedRole);
      setFormData((prev) => ({ ...prev, role: selectedRole }));
      setStep(2);
      return;
    }

    // Pour les autres étapes, on valide les données
    const isValid = await validateCurrentStep();

    if (!isValid) return;

    const values = form.getValues();
    setFormData((prev) => ({ ...prev, ...values }));

    if (step === 2) {
      setStep(3);
    }
  };

  const handleSubmit = async (data: RegisterFormValues) => {
    const isValid = await validateCurrentStep();

    if (!isValid) return;

    const finalData = { ...formData, ...data };

    // Construct RegisterDto based on role
    const registerPayload: RegisterDto = {
      email: finalData.email || "",
      password: finalData.password || "",
      role: finalData.role || "Participant",
      phoneNumber: finalData.telephone || null,
      firstName: finalData.prenom || null,
      lastName: finalData.nom || null,
      dateOfBirth: finalData.dateNaissance || null,
      driverLicenseNumber: finalData.permisConduire || null,
      name: finalData.nom || null,
      companyName: finalData.nomEntreprise || null,
      companyType: finalData.type || null,
      contactEmail: finalData.emailContact || null,
      companyAddress: finalData.adresseSiege || null,
    };

    // Refine payload based on role to ensure NULLs are sent for irrelevant fields
    if (finalData.role === "Participant") {
      registerPayload.driverLicenseNumber = null;
      registerPayload.companyName = null;
      registerPayload.companyType = null;
      registerPayload.contactEmail = null;
      registerPayload.companyAddress = null;
    } else if (finalData.role === "Driver") {
      registerPayload.companyName = null;
      registerPayload.companyType = null;
      registerPayload.contactEmail = null;
      registerPayload.companyAddress = null;
    } else if (finalData.role === "Organizer") {
      if (isEntreprise) {
        // Enterprise Organizer
        registerPayload.firstName = null;
        registerPayload.lastName = null;
        registerPayload.dateOfBirth = null;
        registerPayload.driverLicenseNumber = null;
        registerPayload.name = null;
      } else {
        // Individual Organizer
        registerPayload.companyName = null;
        registerPayload.companyType = null;
        registerPayload.contactEmail = null;
        registerPayload.companyAddress = null;
        registerPayload.driverLicenseNumber = null;
      }
    }

    registerMutation.mutate(registerPayload);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  return (
    <AnimatePresence>
      {step === 1 && (
        <MotionWrapper step={1}>
          <div className="space-y-6 px-12">
            <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
              <PickCard
                handleClick={() => {
                  setSelectedRole("Organizer");
                  handleContinue();
                }}
                title="Organisateur d'expériences"
                description="Créez et gérez des expériences ludiques et intéressantes"
                icon={<RoleBadge role="Organizer" />}
                isSelected={selectedRole === "Organizer"}
              />
              <PickCard
                handleClick={() => {
                  setSelectedRole("Participant");
                  handleContinue();
                }}
                title="Participant"
                description="Rejoignez des voyages et expériences"
                icon={<RoleBadge role="Participant" />}
                isSelected={selectedRole === "Participant"}
              />
              <PickCard
                handleClick={() => {
                  setSelectedRole("Driver");
                  handleContinue();
                }}
                title="Conducteur"
                description="Créez et gérez des voyages liés à des expériences"
                icon={<RoleBadge role="Driver" />}
                isSelected={selectedRole === "Driver"}
              />
            </div>
          </div>
        </MotionWrapper>
      )}

      {step === 2 && (
        <MotionWrapper step={2}>
          <Card className="space-y-6 p-4 lg:w-[30vw] w-full mx-auto">
            <div>
              <h2 className="text-2xl font-bold mb-2">Vos informations</h2>
              <p className="text-muted-foreground">
                Complétez votre profil pour continuer
              </p>
            </div>

            {selectedRole === "Organizer" && (
              <div className="space-y-4">
                <div
                  className="flex border-1 border-[var(--BRAND-500)] rounded-[18px] w-fit transition-all 
              duration-500"
                >
                  <Button
                    type="button"
                    variant={!isEntreprise ? "default" : "outline"}
                    onClick={() => setIsEntreprise(false)}
                    className="border-none transition-all duration-500"
                  >
                    Un particulier
                  </Button>
                  <Button
                    type="button"
                    variant={isEntreprise ? "default" : "outline"}
                    onClick={() => setIsEntreprise(true)}
                    className="border-none transition-all duration-500"
                  >
                    Une entreprise
                  </Button>
                </div>
              </div>
            )}

            <Form {...form}>
              <form className="space-y-4">
                {selectedRole === "Organizer" && !isEntreprise && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="flex gap-x-2 w-full justify-center">
                      <FormField
                        control={form.control}
                        name="nom"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Dupont"
                                {...field}
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="prenom"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Jean"
                                {...field}
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="jean.dupont@example.com"
                              {...field}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-x-2 w-full justify-center">
                      <FormField
                        control={form.control}
                        name="telephone"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="+229 XX XX XX XX"
                                {...field}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  value = value.replace(/[^\d+]/g, "");
                                  if (value.includes("+")) {
                                    value =
                                      "+" +
                                      value
                                        .replace(/\+/g, "")
                                        .replace(/[^\d]/g, "");
                                  }
                                  field.onChange(value);
                                }}
                                inputMode="numeric"
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dateNaissance"
                        render={({ field }) => (
                          <FormItem className="flex-1 flex flex-col">
                            <FormLabel>Date de naissance</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value &&
                                    !isNaN(new Date(field.value).getTime()) ? (
                                      format(new Date(field.value), "PPP")
                                    ) : (
                                      <span>Choisir une date</span>
                                    )}

                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  onSelect={(date) =>
                                    field.onChange(
                                      date ? format(date, "yyyy-MM-dd") : ""
                                    )
                                  }
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                )}

                {selectedRole === "Organizer" && isEntreprise && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="flex gap-x-2 w-full justify-center">
                      <FormField
                        control={form.control}
                        name="nomEntreprise"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Nom de l'entreprise</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Nom de la société"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Type d'entreprise</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full cursor-pointer whitespace-nowrap">
                                  <SelectValue placeholder="Sélectionnez un type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="restaurant">
                                  Restaurant
                                </SelectItem>
                                <SelectItem value="agence evenementielle">
                                  Agence événementielle
                                </SelectItem>
                                <SelectItem value="hotel">Hôtel</SelectItem>
                                <SelectItem value="centre de loisirs">
                                  Centre de loisirs
                                </SelectItem>
                                <SelectItem value="salle de spectacle">
                                  Salle de spectacle
                                </SelectItem>
                                <SelectItem value="musée">Musée</SelectItem>
                                <SelectItem value="parc d'attractions">
                                  Parc d'attractions
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="emailContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email de contact</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="contact@entreprise.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-x-2 w-full justify-center">
                      <FormField
                        control={form.control}
                        name="numeroContact"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Numéro de contact</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="+229 XX XX XX XX"
                                {...field}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  value = value.replace(/[^\d+]/g, "");
                                  if (value.includes("+")) {
                                    value =
                                      "+" +
                                      value
                                        .replace(/\+/g, "")
                                        .replace(/[^\d]/g, "");
                                  }
                                  field.onChange(value);
                                }}
                                inputMode="numeric"
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="adresseSiege"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Adresse du siège</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="123 Rue Example, Cotonou"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                )}

                {selectedRole === "Participant" && (
                  <>
                    <div className="flex gap-x-2 w-full justify-center">
                      <FormField
                        control={form.control}
                        name="nom"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input placeholder="Dupont" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="prenom"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <Input placeholder="Jean" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="jean.dupont@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-x-2 w-full justify-center">
                      <FormField
                        control={form.control}
                        name="telephone"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+229 XX XX XX XX"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dateNaissance"
                        render={({ field }) => (
                          <FormItem className="flex-1 flex flex-col">
                            <FormLabel>Date de naissance</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value &&
                                    !isNaN(new Date(field.value).getTime()) ? (
                                      format(new Date(field.value), "PPP")
                                    ) : (
                                      <span>Choisir une date</span>
                                    )}

                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  onSelect={(date) =>
                                    field.onChange(
                                      date ? format(date, "yyyy-MM-dd") : ""
                                    )
                                  }
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}

                {selectedRole === "Driver" && (
                  <>
                    <div className="flex gap-x-2 w-full justify-center">
                      <FormField
                        control={form.control}
                        name="nom"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input placeholder="Dupont" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="prenom"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <Input placeholder="Jean" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="jean.dupont@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-x-2 w-full justify-center">
                      <FormField
                        control={form.control}
                        name="telephone"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="+229 XX XX XX XX"
                                {...field}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  value = value.replace(/[^\d+]/g, "");
                                  if (value.includes("+")) {
                                    value =
                                      "+" +
                                      value
                                        .replace(/\+/g, "")
                                        .replace(/[^\d]/g, "");
                                  }
                                  field.onChange(value);
                                }}
                                inputMode="numeric"
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dateNaissance"
                        render={({ field }) => (
                          <FormItem className="flex-1 flex flex-col">
                            <FormLabel>Date de naissance</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value &&
                                    !isNaN(new Date(field.value).getTime()) ? (
                                      format(new Date(field.value), "PPP")
                                    ) : (
                                      <span>Choisir une date</span>
                                    )}

                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  onSelect={(date) =>
                                    field.onChange(
                                      date ? format(date, "yyyy-MM-dd") : ""
                                    )
                                  }
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="permisConduire"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Numéro de permis de conduire</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="XXXX-XXXX-XXXX"
                              {...field}
                              onChange={(e) => {
                                let value = e.target.value;
                                value = value.replace(/[^\d-]/g, "");
                                if (value.includes("-")) {
                                  value =
                                    "-" +
                                    value
                                      .replace(/\-/g, "")
                                      .replace(/[^\d]/g, "");
                                }
                                field.onChange(value);
                              }}
                              inputMode="numeric"
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </form>
            </Form>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                Retour
              </Button>
              <Button type="button" onClick={handleContinue} className="flex-1">
                Continuer
              </Button>
            </div>
          </Card>
        </MotionWrapper>
      )}

      {step === 3 && (
        <MotionWrapper step={3}>
          <Card className="space-y-6 p-4 lg:w-[30vw] w-full mx-auto">
            <div>
              <h2 className="text-2xl font-bold mb-2">Sécurité du compte</h2>
              <p className="text-muted-foreground">
                Créez un mot de passe sécurisé pour votre compte
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <div className="flex gap-x-2">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Minimum 6 caractères"
                            {...field}
                            className="flex-1 pr-10"
                          />
                          <Button
                            variant="outline"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <Eye /> : <EyeOff />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmer le mot de passe</FormLabel>
                      <FormControl>
                        <div className="flex gap-x-2">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Retapez votre mot de passe"
                            {...field}
                            className="flex-1 pr-10"
                          />
                          <Button
                            variant="outline"
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? <Eye /> : <EyeOff />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1"
                  >
                    Retour
                  </Button>
                  <Button type="submit" className="flex-1">
                    Créer le compte
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </MotionWrapper>
      )}
    </AnimatePresence>
  );
}
