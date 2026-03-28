"use client";

import { motion } from "framer-motion";
import { MessageCircle, Users, Compass } from "lucide-react";

const points = [
  {
    icon: Users,
    text: "Trouver des compagnons de route pour vos week-ends et sorties.",
  },
  {
    icon: MessageCircle,
    text: "Échanger des conseils et itinéraires avec la communauté.",
  },
  {
    icon: Compass,
    text: "Découvrir des lieux validés par les organisateurs locaux.",
  },
];

export default function CommunitySection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="rounded-[32px] border border-black/10 bg-[var(--landing-muted-bg)] p-4 shadow-2xl shadow-black/10">
              <div className="mb-3 flex items-center justify-between px-2 pt-1">
                <span className="text-xs font-medium text-[#121212]/50">
                  9:41
                </span>
                <div className="h-8 w-20 rounded-full bg-[#121212]/80" />
              </div>
              <div className="space-y-3 rounded-[24px] bg-white p-4 shadow-inner">
                <div className="flex flex-col gap-2 rounded-2xl bg-[#121212] p-4 text-white">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-[var(--landing-primary)]" />
                    <div>
                      <p className="text-sm font-semibold">Amsan</p>
                      <p className="text-xs text-white/70">à l’instant</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-white/90">
                    On part samedi pour Grand-Popo — il reste 2 places dans le
                    groupe. Tu viens ?
                  </p>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl bg-[var(--landing-muted-bg)] px-4 py-3 text-sm text-[#121212]/90">
                    Super, j’envoie ma demande sur l’app !
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-[#121212] lg:text-4xl">
              Ne découvrez plus le Bénin{" "}
              <span className="text-[var(--landing-primary)]">seul.</span>
            </h2>
            <p className="text-lg leading-relaxed text-[#121212]/70">
              Adventure Together relie voyageurs, conducteurs et organisateurs
              pour des expériences partagées, en toute transparence.
            </p>
            <ul className="space-y-5">
              {points.map(({ icon: Icon, text }) => (
                <li key={text} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--landing-muted-bg)] text-[var(--landing-primary)]">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <p className="pt-2 leading-relaxed text-[#121212]/80">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
