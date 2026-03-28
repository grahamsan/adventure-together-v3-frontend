"use client";

import { motion } from "framer-motion";
import { MapPinned, Bell, ShieldCheck, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FeaturesBentoSection() {
  const router = useRouter();

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center lg:mb-14"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[#121212] lg:text-4xl">
            Tout pour un voyage{" "}
            <span className="text-[var(--landing-primary)]">serein</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex min-h-[280px] flex-[2] flex-col justify-between rounded-[28px] bg-[#121212] p-8 text-white lg:min-h-[320px]"
          >
            <div className="rounded-2xl bg-white/10 p-3 w-fit">
              <MapPinned className="h-8 w-8 text-[var(--landing-primary)]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Trajets & lieux du Bénin</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                Explorez des road trips et des points d’intérêt décrits par la
                communauté, avec des infos pratiques à jour.
              </p>
            </div>
          </motion.div>

          <div className="flex flex-[1] flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="flex flex-1 flex-col justify-between rounded-[28px] bg-[var(--landing-mint)] p-6 text-[#121212]"
            >
              <Bell className="h-8 w-8" strokeWidth={1.75} />
              <div>
                <h3 className="text-lg font-bold">Alertes</h3>
                <p className="mt-2 text-sm opacity-80">
                  Rappels pour vos départs et messages importants.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-1 flex-col justify-between rounded-[28px] bg-[var(--landing-lavender)] p-6 text-[#121212]"
            >
              <ShieldCheck className="h-8 w-8" strokeWidth={1.75} />
              <div>
                <h3 className="text-lg font-bold">Modération</h3>
                <p className="mt-2 text-sm opacity-80">
                  Signalements et équipe pour un espace respectueux.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 flex min-h-[160px] flex-col justify-between rounded-[28px] bg-[var(--landing-primary)] p-8 text-white lg:flex-row lg:items-center"
        >
          <div className="flex items-start gap-4">
            <Rocket className="h-10 w-10 shrink-0" />
            <div>
              <h3 className="text-2xl font-bold">Prêt pour un départ ?</h3>
              <p className="mt-2 max-w-xl text-sm text-white/90">
                Créez votre compte et accédez à la plateforme pour publier ou
                rejoindre une aventure.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="mt-6 shrink-0 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[var(--landing-primary)] shadow-lg transition hover:bg-white/95 lg:mt-0"
          >
            Inviter à la plateforme
          </button>
        </motion.div>
      </div>
    </section>
  );
}
