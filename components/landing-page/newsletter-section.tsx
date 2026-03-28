"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[32px] bg-[#121212] px-6 py-12 text-center shadow-2xl shadow-black/20 sm:px-10 lg:px-14 lg:py-14"
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            L&apos;aventure béninoise s&apos;invite chez vous.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/65 lg:text-base">
            Idées de sorties, nouveautés et inspirations voyage — une fois par
            mois, sans spam.
          </p>
          <form
            className="mx-auto mt-10 flex max-w-lg flex-col gap-4 sm:flex-row sm:items-stretch"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="landing-newsletter" className="sr-only">
              Adresse e-mail
            </label>
            <input
              id="landing-newsletter"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="min-h-[52px] flex-1 rounded-full border border-white/15 bg-[#1a1a1a] px-6 text-sm text-white outline-none ring-0 placeholder:text-white/35 focus:border-[var(--landing-primary)] focus:ring-2 focus:ring-[var(--landing-primary)]/30"
            />
            <button
              type="submit"
              className="min-h-[52px] rounded-full bg-[var(--landing-primary)] px-8 text-sm font-semibold text-white transition hover:bg-[var(--landing-primary-hover)]"
            >
              S&apos;inscrire
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
