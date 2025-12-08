"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsletterSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Abonnez-vous pour recevoir nos
              <br />
              <span className="text-[[var(--BRAND-500)]]">Dernières Actualités</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Restez informé des offres exclusives, des guides de destination et
              des conseils d'initiés pour explorer l'Afrique de l'Ouest.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Entrez votre email"
              className="flex-1 px-6 py-4 rounded-full border border-gray-300 outline-none focus:border-[[var(--BRAND-500)]] focus:ring-2 focus:ring-[[var(--BRAND-500)]]/20"
            />
            <Button className="bg-[[var(--BRAND-500)]] hover:bg-[#4096ea] text-white px-8 py-4 rounded-full">
              S'abonner
              <Send className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
