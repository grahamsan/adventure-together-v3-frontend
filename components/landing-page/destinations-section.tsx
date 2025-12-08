"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    name: "Ganvié",
    image:
      "https://images.unsplash.com/photo-1568632234165-4f91ae0f2e08?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    reviews: 245,
    description:
      "La plus grande cité lacustre d'Afrique avec ses maisons sur pilotis",
  },
  {
    name: "Ouidah",
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    reviews: 189,
    description: "La route des esclaves et la Porte du Non-Retour",
  },
  {
    name: "Pendjari",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    reviews: 312,
    description: "Parc national avec éléphants, lions et faune africaine",
  },
  {
    name: "Grand Popo",
    image:
      "https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    reviews: 156,
    description: "Plages immaculées et paradis des sports nautiques",
  },
  {
    name: "Abomey",
    image:
      "https://images.unsplash.com/photo-1588699366699-de11080bad6c?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    reviews: 203,
    description:
      "Palais Royaux - Site classé au patrimoine mondial de l'UNESCO",
  },
  {
    name: "Porto-Novo",
    image:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    reviews: 142,
    description: "Capitale avec architecture coloniale et musées",
  },
];

export default function DestinationsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nos Destinations <span className="text-[[var(--BRAND-500)]]">Populaires</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les lieux les plus beaux et authentiques du Bénin, des
            sites historiques aux merveilles naturelles.
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[[var(--BRAND-500)]] text-[[var(--BRAND-500)]]" />
                    <span className="text-sm font-semibold">
                      {destination.rating}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <h3 className="font-bold text-xl text-gray-900">
                      {destination.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {destination.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {destination.reviews} avis
                    </span>
                    <Button
                      variant="ghost"
                      className="text-[[var(--BRAND-500)]] hover:text-[#4096ea] hover:bg-[[var(--BRAND-500)]]/10"
                    >
                      Explorer →
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
