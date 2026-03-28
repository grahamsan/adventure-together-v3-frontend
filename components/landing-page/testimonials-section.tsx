"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Koffi A.",
    role: "Barcelona → Cotonou",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    quote:
      "Organiser un week-end à Ouidah avec un groupe du site a été simple et convivial.",
  },
  {
    name: "Sarah M.",
    role: "Organisatrice d’événements",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    quote:
      "Les participants reçoivent les infos en temps réel, et la messagerie évite les allers-retours interminables.",
  },
  {
    name: "Jules D.",
    role: "Passionné road trip",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    quote:
      "J’ai trouvé des compagnons pour la côte, avec un trajet clair et un prix affiché dès le départ.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[var(--landing-muted-bg)] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center lg:mb-16"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[#121212] lg:text-4xl">
            Ils ont exploré le Bénin{" "}
            <span className="text-[var(--landing-primary)]">avec nous</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-[24px] bg-white p-8 shadow-lg shadow-black/5 ring-1 ring-black/5"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-[var(--landing-primary)]/20">
                  <Image
                    src={t.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="font-bold text-[#121212]">{t.name}</p>
                  <p className="text-sm text-[#121212]/55">{t.role}</p>
                </div>
              </div>
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-[var(--landing-primary)] text-[var(--landing-primary)]"
                  />
                ))}
              </div>
              <p className="leading-relaxed text-[#121212]/75">&ldquo;{t.quote}&rdquo;</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
