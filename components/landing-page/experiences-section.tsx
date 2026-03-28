"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Users } from "lucide-react";

const experiences = [
  {
    title: "Safari dans le parc national de Pendjari",
    description:
      "Découvrez la faune et la flore du parc national de Pendjari, avec des guides locaux et des activités de plein air.",
    image:
      "/images/safari-1.jpg",
    date: "12–14 avril",
    spots: 4,
    tag: "Nouveau",
    tagStyle: "bg-[var(--landing-primary)] text-white",
  },
  {
    title: "Visite guidée de la statue Bio Guera",
    description:
      "Découvrez la statue Bio Guera, une statue érigée en l'honneur de la défense des droits de l'homme et de la liberté.",
    image:
      "/images/bio-guera-2.jpg",
    date: "3 mai",
    spots: 0,
    tag: "Complet",
    tagStyle: "bg-[#121212]/80 text-white",
  },
];

export default function ExperiencesSection() {
  return (
    <section
      id="experiences"
      className="scroll-mt-24 bg-[var(--landing-muted-bg)] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[#121212] lg:text-4xl">
            Expériences{" "}
            <span className="text-[var(--landing-primary)]">béninoises</span>{" "}
            immersives
          </h2>
          <p className="mt-4 max-w-2xl text-[#121212]/65">
            Des séjours et sorties sélectionnées, avec places limitées pour
            privilégier le groupe.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 lg:gap-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="overflow-hidden rounded-[28px] bg-white shadow-xl shadow-black/5 ring-1 ring-black/5 lg:flex lg:min-h-[280px] lg:flex-row"
            >
              <div className="relative aspect-[16/10] w-full shrink-0 lg:aspect-auto lg:w-[46%] lg:min-h-[280px]">
                <Image
                  src={exp.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 46vw"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center gap-4 p-6 lg:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${exp.tagStyle}`}
                  >
                    {exp.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#121212]">
                  {exp.title}
                </h3>
                <p className="leading-relaxed text-[#121212]/70">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-6 text-sm text-[#121212]/80">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[var(--landing-primary)]" />
                    {exp.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Users className="h-4 w-4 text-[var(--landing-primary)]" />
                    {exp.spots > 0
                      ? `${exp.spots} places restantes`
                      : "Complet"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
