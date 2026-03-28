"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const destinations = [
  {
    name: "Cotonou",
    image:
      "/images/amazone.jpg",
  },
  {
    name: "Ouidah",
    image:
      "/images/pdnr.jpeg",
  },
  {
    name: "Porto-Novo",
    image:
      "/images/pn.jpeg",
  },
  {
    name: "Nikki",
    image:
      "/images/nikki.jpg",
  },
];

export default function DestinationsSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center lg:mb-16"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[#121212] lg:text-4xl">
            Le cœur du Bénin{" "}
            <span className="text-[var(--landing-primary)]">vibre ici</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#121212]/65">
            Quatre villes emblématiques pour commencer votre exploration.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {destinations.map((d, index) => (
            <motion.article
              key={d.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative aspect-[3/5] overflow-hidden rounded-[24px] shadow-lg ring-1 ring-black/5 lg:rounded-[28px]"
            >
              <Image
                src={d.image}
                alt={d.name}
                fill
                className="object-cover grayscale-[25%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                sizes="(max-width:1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
                <h3 className="text-lg font-bold text-white drop-shadow-md lg:text-xl">
                  {d.name}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
