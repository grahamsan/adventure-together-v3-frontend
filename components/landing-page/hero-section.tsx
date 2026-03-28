"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const HERO_BG =
  "/images/pendjari.jpg";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative h-screen min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_BG}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.97] via-white/75 to-white/25 sm:via-white/65 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-transparent to-white/20" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-center px-4 pb-8 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl space-y-6"
          >
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-[#121212] sm:text-5xl lg:text-6xl">
              Explorez le{" "}
              <span className="text-[var(--landing-primary)]">Bénin</span>{" "}
              autrement.
            </h1>
            <p className="text-lg leading-relaxed text-[#121212]/80">
              Paysages uniques, traditions vivantes et itinéraires pensés avec
              des locaux. Trouvez votre prochaine escapade et partez en groupe
              ou en toute confiance.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="rounded-full bg-[var(--landing-primary)] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#c84c2d]/25 transition hover:bg-[var(--landing-primary-hover)]"
              >
                Rejoindre l&apos;aventure
              </button>
              <a
                href="#experiences"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#121212]/25 bg-white/70 px-8 py-3.5 text-base font-semibold text-[#121212] backdrop-blur-sm transition hover:border-[#121212]/40 hover:bg-white/90"
              >
                Voir les expériences disponibles
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
