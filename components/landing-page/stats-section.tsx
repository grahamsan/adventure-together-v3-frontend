"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "5+", label: "Années d'expérience" },
  { value: "20+", label: "Destinations couvertes" },
  { value: "500+", label: "Explorateurs satisfaits" },
];

export default function StatsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="text-5xl lg:text-6xl font-bold text-[[var(--BRAND-500)]] mb-3">
                {stat.value}
              </div>
              <div className="text-lg text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
