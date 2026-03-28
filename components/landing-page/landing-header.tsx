"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingHeader() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-black/5 bg-white/90 px-5 py-3 shadow-sm backdrop-blur-md">
        {/* <button
          type="button"
          onClick={() => router.push("/")}
          className="text-lg font-bold tracking-tight text-[var(--landing-primary)] sm:text-xl"
        >
          Adventure Together
        </button> */}
        <img src="/at.png" alt="logo" className="w-26 h-10" />
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/login"
            className="text-sm font-medium text-[#121212]/80 transition hover:text-[#121212]"
          >
            Connexion
          </Link>
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="rounded-full bg-[var(--landing-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[var(--landing-primary-hover)]"
          >
            Rejoindre
          </button>
        </div>
      </div>
    </header>
  );
}
