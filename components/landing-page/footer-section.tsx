"use client";

import Link from "next/link";

const destinations = ["Cotonou", "Ouidah", "Porto-Novo", "Pendjari"];
const experienceTypes = ["Road trips", "Événements", "Covoiturage", "Lieux"];
const support = [
  { label: "Aide", href: "#" },
  { label: "Confidentialité", href: "#" },
  { label: "Conditions", href: "#" },
];

export default function FooterSection() {
  return (
    <footer className="border-t border-black/5 bg-[var(--landing-muted-bg)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-[var(--landing-primary)]">
              Adventure Together
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#121212]/65">
              La plateforme pour découvrir le Bénin entre voyageurs et
              organisateurs.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#121212]/50">
              Destinations
            </h3>
            <ul className="mt-4 space-y-3">
              {destinations.map((d) => (
                <li key={d}>
                  <span className="text-sm text-[#121212]/80">{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#121212]/50">
              Expériences
            </h3>
            <ul className="mt-4 space-y-3">
              {experienceTypes.map((d) => (
                <li key={d}>
                  <span className="text-sm text-[#121212]/80">{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#121212]/50">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {support.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#121212]/80 transition hover:text-[var(--landing-primary)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/login"
                  className="text-sm text-[#121212]/80 transition hover:text-[var(--landing-primary)]"
                >
                  Connexion
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 border-t border-black/10 pt-8 text-center text-sm text-[#121212]/50">
          © {new Date().getFullYear()} Adventure Together. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
