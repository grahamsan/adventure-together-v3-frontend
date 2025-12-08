"use client";

import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
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
import { useForgotPassword, useResetPassword } from "@/features/auth/queries";

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
const PasswordSchema = z
  .object({
    password: z.string().min(8, "Minimum 8 caractères requis"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"], // Afficher l'erreur sur ce champ
  });

// Types combinés
const ForgotPasswordSchema = EmailSchema.merge(OTPSchema.partial()) // OTP est optionnel au début
  .merge(PasswordSchema.partial()); // Password est optionnel au début

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
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [showPassword, setShowPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMER_DURATION);
  const [isResending, setIsResending] = useState(false);
  const forgotPasswordMutation = useForgotPassword();
  const resetPasswordMutation = useResetPassword();

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
        onSettled: () => {
          setTimeLeft(RESEND_TIMER_DURATION);
          setIsResending(false);
        },
      }
    );
  };

  const isTimerActive = timeLeft > 0;

  // --- Gestionnaire de Soumission par Étapes ---
  const handleNext = async () => {
    const isValid = await form.trigger(); // Valide tous les champs du formulaire

    if (!isValid) return;

    if (step === 1) {
      // Validation Email (vérifier uniquement le champ email)
      const emailValid = await form.trigger("email");
      if (emailValid) {
        await forgotPasswordMutation.mutateAsync({ email: currentEmail });
        setStep(2); // Passage à l'étape OTP
      }
    } else if (step === 2) {
      // Validation OTP
      const otpValid = await form.trigger("pin");
      if (otpValid) {
        // Pas de vérification API intermédiaire pour le moment
        setStep(3); // Passage à l'étape Nouveau Mot de Passe
      }
    } else if (step === 3) {
      // Validation Finale du Mot de Passe
      const finalValid = await form.trigger(["password", "confirmPassword"]);
      if (finalValid) {
        const values = form.getValues();
        await resetPasswordMutation.mutateAsync({
          email: values.email,
          code: values.pin!,
          newPassword: values.password!,
        });
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
                  <Button type="submit" className="w-full mt-6">
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
                          disabled={isResending}
                          className="p-0 h-auto text-sm"
                        >
                          {isResending ? "Envoi..." : "Renvoyer le code"}
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

                  <Button type="submit" className="w-full mt-6">
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
