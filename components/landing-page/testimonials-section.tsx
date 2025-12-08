"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Max Skuhrava",
    role: "Blogueur Voyage",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    quote:
      "Adventure Together m'a offert l'expérience la plus authentique d'Afrique de l'Ouest. Des villages sur pilotis de Ganvié à la faune de la Pendjari, chaque moment était magique. Les guides étaient compétents et passionnés par leur culture.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Témoignages <span className="text-[[var(--BRAND-500)]]">Clients</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden">
              <Image
                src={testimonials[0].image}
                alt={testimonials[0].name}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[[var(--BRAND-500)]] rounded-full opacity-10 blur-3xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Quote className="w-12 h-12 text-[[var(--BRAND-500)]] opacity-50" />
            <p className="text-lg text-gray-700 leading-relaxed">
              {testimonials[0].quote}
            </p>
            <div>
              <h4 className="font-bold text-xl text-gray-900">
                {testimonials[0].name}
              </h4>
              <p className="text-gray-600">{testimonials[0].role}</p>
            </div>

            {/* Navigation Dots */}
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full ${
                    idx === 0 ? "bg-[[var(--BRAND-500)]]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
