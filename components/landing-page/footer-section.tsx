"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const footerImages = [
  "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516026672322-bc52d61a0490?q=80&w=200&auto=format&fit=crop",
];

export default function FooterSection() {
  return (
    <footer className="bg-[[var(--BRAND-500)]] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Travel Column */}
          <div>
            <h3 className="font-bold text-xl mb-4">Voyage</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="hover:underline">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:underline">
                  Forfaits
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-bold text-xl mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tours" className="hover:underline">
                  Visites Guidées
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:underline">
                  Guides Locaux
                </Link>
              </li>
              <li>
                <Link href="/transport" className="hover:underline">
                  Transport
                </Link>
              </li>
              <li>
                <Link href="/accommodation" className="hover:underline">
                  Hébergement
                </Link>
              </li>
            </ul>
          </div>

          {/* Interests Column */}
          <div>
            <h3 className="font-bold text-xl mb-4">Intérêts</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Plages",
                "Culture",
                "Faune",
                "Histoire",
                "Cuisine",
                "Aventure",
              ].map((interest) => (
                <div
                  key={interest}
                  className="bg-white/20 rounded-lg px-3 py-2 text-sm text-center hover:bg-white/30 cursor-pointer transition-colors"
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-bold text-xl mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">contact@adventuretogether.bj</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">+229 XX XX XX XX</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Cotonou, Benin</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
          {footerImages.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              <Image
                src={img}
                alt={`Gallery ${idx + 1}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center text-sm">
          <p>© 2024 Adventure Together. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
