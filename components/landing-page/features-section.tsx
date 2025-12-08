"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Heart, Clock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Meilleur Prix Garanti",
    description:
      "Nous offrons des tarifs compétitifs sur tous nos circuits et expériences en Afrique de l'Ouest.",
  },
  {
    icon: Heart,
    title: "Expériences Uniques",
    description:
      "Des activités soigneusement sélectionnées pour découvrir la culture et la nature béninoise authentique.",
  },
  {
    icon: Clock,
    title: "Support 24/7",
    description:
      "Notre équipe est disponible à tout moment pour vous assister durant votre voyage.",
  },
];

export default function PlanTripSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Image
              src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=1000&auto=format&fit=crop"
              alt="Coastal View"
              width={600}
              height={700}
              className="rounded-3xl object-cover w-full shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[[var(--BRAND-500)]] rounded-full opacity-20 blur-2xl" />
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Planifiez Votre Voyage{" "}
                <span className="text-[[var(--BRAND-500)]]">Avec Nous</span>
              </h2>
              <p className="text-gray-600">
                Découvrez le meilleur du Bénin avec nos circuits conçus par des
                experts et nos services de voyage personnalisés.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-[[var(--BRAND-500)]]/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-[[var(--BRAND-500)]]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
