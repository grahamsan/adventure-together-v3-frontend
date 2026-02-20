"use client";

import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useAuthControllerRequestReset,
  useAuthControllerResetPassword,
} from "@/api/auth/hooks";

// --- 1. Schémas Zod pour chaque étape ---

// Étape 1: Email
const EmailSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse e-mail valide."),
});

// Étape 2: OTP (supposons 6 chiffres)
const OTPSchema = z.object({
  pin: z.string().min(6, { message: "Le code doit contenir 6 chiffres." }),
});

// Étape 3: Nouveau Mot de Passe
const PasswordBase = z.object({
  password: z.string().min(8, "Minimum 8 caractères requis"),
  confirmPassword: z.string(),
});

// Types combinés
const ForgotPasswordSchema = EmailSchema.merge(OTPSchema.partial())
  .merge(PasswordBase.partial())
  .superRefine((data, ctx) => {
    // Si les champs mot de passe sont remplis (étape 3), on valide la correspondance
    if (
      data.password &&
      data.confirmPassword &&
      data.password !== data.confirmPassword
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Les mots de passe ne correspondent pas.",
        path: ["confirmPassword"],
      });
    }
  });

type FormValues = z.infer<typeof ForgotPasswordSchema>;

// Durée du compte à rebours en secondes
const RESEND_TIMER_DURATION = 30;

// --- 2. Animations Framer Motion ---
const stepVariants = {
  hidden: { x: 300, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 },
};

// --- 3. Composant Principal ---

export default function ForgotPasswordFormAnimated() {
  const router = useRouter(); // Use App Router
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [showPassword, setShowPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMER_DURATION);
  const [isResending, setIsResending] = useState(false);
  const forgotPasswordMutation = useAuthControllerRequestReset();
  const resetPasswordMutation = useAuthControllerResetPassword();

  const form = useForm<FormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
      pin: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const currentEmail = form.watch("email");
  const currentPin = form.watch("pin") || "";

  // --- Logique du Compte à Rebours ---
  useEffect(() => {
    if (step !== 2 || timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [step, timeLeft]);

  const handleResendClick = () => {
    setIsResending(true);
    forgotPasswordMutation.mutate(
      { email: currentEmail },
      {
        onSuccess: () => {
          toast.success("Code renvoyé avec succès !");
          setTimeLeft(RESEND_TIMER_DURATION);
          setIsResending(false);
        },
        onError: (error: any) => {
          // Basic error handling assuming error.message exists
          toast.error(
            error?.response?.data?.message || "Erreur lors de l'envoi du code.",
          );
          setIsResending(false);
        },
      },
    );
  };

  const isTimerActive = timeLeft > 0;

  // --- Gestionnaire de Soumission par Étapes ---
  const handleNext = async () => {
    // const isValid = await form.trigger(); // Ne pas valider tout le formulaire d'un coup car les étapes suivantes sont vides
    // if (!isValid) return;

    if (step === 1) {
      // Validation Email (vérifier uniquement le champ email)
      const emailValid = await form.trigger("email");
      if (emailValid) {
        forgotPasswordMutation.mutate(
          { email: currentEmail },
          {
            onSuccess: () => {
              toast.success("Code envoyé avec succès !");
              setStep(2);
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message ||
                  "Erreur lors de l'envoi de l'email.",
              );
            },
          },
        );
      }
    } else if (step === 2) {
      // Validation OTP
      const otpValid = await form.trigger("pin");
      if (otpValid) {
        // Pas de vérification API intermédiaire pour le moment
        // On pourrait ajouter une vérification ici si l'API le permettait
        setStep(3); // Passage à l'étape Nouveau Mot de Passe
      }
    } else if (step === 3) {
      // Validation Finale du Mot de Passe (on valide tout pour déclencher le superRefine)
      const finalValid = await form.trigger();
      if (finalValid) {
        const values = form.getValues();
        resetPasswordMutation.mutate(
          {
            email: values.email,
            code: values.pin!,
            newPassword: values.password!,
          },
          {
            onSuccess: (data: any) => {
              // Structure attendue: {"statusCode":201,"data":{"message":"Mot de passe réinitialisé avec succès"}}
              const message =
                data?.data?.message || "Mot de passe réinitialisé avec succès";
              toast.success(message);
              router.push("/login");
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message ||
                  error?.message ||
                  "Erreur lors de la réinitialisation.",
              );
            },
          },
        );
      }
    }
  };

  const titles = [
    "Réinitialiser votre mot de passe",
    "Vérification du code",
    "Définir le nouveau mot de passe",
  ];
  const descriptions = [
    "Entrez votre adresse e-mail pour recevoir un code de réinitialisation.",
    `Un code a été envoyé à ${currentEmail}. Veuillez le saisir ci-dessous.`,
    "Créez un mot de passe sécurisé pour votre compte.",
  ];

  return (
    <AnimatePresence mode="wait">
      <Card className="space-y-6 p-4 lg:w-[30vw] w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {titles[step - 1]}
          </CardTitle>
          <CardDescription className="text-center">
            {descriptions[step - 1]}
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {/* ---------------- ÉTAPE 1: EMAIL ---------------- */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse E-mail</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="votre.email@exemple.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full mt-6"
                    disabled={forgotPasswordMutation.isPending}
                  >
                    {forgotPasswordMutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Envoyer le code de réinitialisation
                  </Button>
                </motion.div>
              )}

              {/* ---------------- ÉTAPE 2: OTP ---------------- */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="w-full space-y-4"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <FormField
                      control={form.control}
                      name="pin"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-center">
                          <FormLabel>Code à 6 chiffres</FormLabel>
                          <FormControl>
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                {[...Array(6)].map((_, index) => (
                                  <InputOTPSlot key={index} index={index} />
                                ))}
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={
                        form.formState.isSubmitting || currentPin.length < 6
                      }
                    >
                      Vérifier et continuer
                    </Button>

                    {/* Compte à Rebours et Bouton Renvoyer */}
                    <div className="flex justify-center items-center pt-2">
                      {isTimerActive ? (
                        <p className="text-sm text-muted-foreground">
                          Renvoyer dans{" "}
                          <span className="font-semibold text-primary">
                            {timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
                          </span>
                        </p>
                      ) : (
                        <Button
                          variant="link"
                          type="button"
                          onClick={handleResendClick}
                          disabled={
                            isResending || forgotPasswordMutation.isPending
                          }
                          className="p-0 h-auto text-sm"
                        >
                          {isResending || forgotPasswordMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-3 w-3 animate-spin" />{" "}
                              Envoi...
                            </>
                          ) : (
                            "Renvoyer le code"
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ---------------- ÉTAPE 3: NEW PASSWORD ---------------- */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="w-full space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nouveau mot de passe</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Minimum 8 caractères"
                              {...field}
                              className="pr-10"
                            />
                            <Button
                              variant="ghost"
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
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
                          <Input
                            type="password"
                            placeholder="Confirmer le nouveau mot de passe"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full mt-6"
                    disabled={resetPasswordMutation.isPending}
                  >
                    {resetPasswordMutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Réinitialiser le mot de passe
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Form>
      </Card>
    </AnimatePresence>
  );
}
