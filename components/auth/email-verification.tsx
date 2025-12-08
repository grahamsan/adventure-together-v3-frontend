"use client";

import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
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
import { useVerifyEmail } from "@/features/auth/queries";

// --- 1. Schémas Zod pour chaque étape ---

// Étape 1: Email
const EmailSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse e-mail valide."),
});

// Étape 2: OTP (6 chiffres)
const OTPSchema = z.object({
  pin: z.string().min(6, { message: "Le code doit contenir 6 chiffres." }),
});

// Types combinés
const EmailVerificationSchema = EmailSchema.merge(OTPSchema.partial());

type FormValues = z.infer<typeof EmailVerificationSchema>;

// Durée du compte à rebours en secondes
const RESEND_TIMER_DURATION = 30;

// --- 2. Composant Principal ---

export default function EmailVerificationForm() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Success
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMER_DURATION);
  const [isResending, setIsResending] = useState(false);
  const verifyEmailMutation = useVerifyEmail();

  const form = useForm<FormValues>({
    resolver: zodResolver(EmailVerificationSchema),
    defaultValues: {
      email: "",
      pin: "",
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
    // Simuler l'appel API de renvoi d'email
    console.log(`Renvoyer le code à ${currentEmail}`);
    setTimeout(() => {
      setTimeLeft(RESEND_TIMER_DURATION);
      setIsResending(false);
    }, 500);
  };

  const isTimerActive = timeLeft > 0;

  // --- Gestionnaire de Soumission par Étapes ---
  const handleNext = async () => {
    if (step === 1) {
      // Validation Email
      const emailValid = await form.trigger("email");
      if (emailValid) {
        // Just proceed to step 2
        setStep(2); // Passage à l'étape OTP
        setTimeLeft(RESEND_TIMER_DURATION); // Réinitialiser le timer
      }
    } else if (step === 2) {
      // Validation OTP
      const otpValid = await form.trigger("pin");
      if (otpValid) {
        await verifyEmailMutation.mutateAsync({
          email: currentEmail,
          code: currentPin,
        });
        setStep(3); // Passage à l'écran de succès
      }
    }
  };

  const titles = [
    "Vérification de votre email",
    "Entrez le code de vérification",
    "Email vérifié avec succès !",
  ];

  const descriptions = [
    "Entrez votre adresse e-mail pour recevoir un code de vérification.",
    `Un code à 6 chiffres a été envoyé à ${currentEmail}. Veuillez le saisir ci-dessous.`,
    "Votre adresse e-mail a été vérifiée avec succès. Vous pouvez maintenant continuer.",
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

        <CardContent>
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
                    key="step1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full space-y-4"
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
                    <Button type="submit" className="w-full">
                      Envoyer le code de vérification
                    </Button>
                  </motion.div>
                )}

                {/* ---------------- ÉTAPE 2: OTP ---------------- */}
                {step === 2 && (
                  <motion.div
                    key="step2"
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
                        Vérifier le code
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

                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm"
                      >
                        Modifier l'adresse e-mail
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* ---------------- ÉTAPE 3: SUCCESS ---------------- */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full space-y-6"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="bg-green-100 rounded-full p-6">
                        <CheckCircle2 className="w-16 h-16 text-green-600" />
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-lg font-semibold text-green-700">
                          Vérification réussie !
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {currentEmail}
                        </p>
                      </div>
                      <Button
                        type="button"
                        className="w-full"
                        onClick={() => {
                          // TODO: Redirection ou action suivante
                          console.log("Continuer vers la page suivante");
                        }}
                      >
                        Continuer
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AnimatePresence>
  );
}
