"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { MapPin, Calendar, DollarSign, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { GradualSpacing } from "@/components/shared/text-animations/gradual-spacing";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transformations
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yForeground1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const yForeground2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const scaleForeground = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  // Mobile parallax (plus subtil)
  const yMobile = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      className="relative bg-white pt-20 pb-10 lg:pt-28 lg:pb-16 overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Main Background Image with Overlay */}
      <motion.div
        style={{ y: yBackground, opacity }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hills-1.jpg"
          alt="Background Hills"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/60" />
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div
          style={{ y: yBackground }}
          className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-blue-50 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "60%"]) }}
          className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-3xl opacity-30"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 relative z-20"
          >
            <div className="space-y-2">
              <GradualSpacing
                text="Créez des"
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight"
              />
              <GradualSpacing
                text="Souvenirs"
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight"
              />
              <GradualSpacing
                text="Inoubliables"
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-[[var(--BRAND-500)]] leading-tight"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 max-w-md"
            >
              Découvrez la beauté de l'Afrique de l'Ouest. Des expériences
              inoubliables, des aventures authentiques et des découvertes
              uniques vous attendent au Bénin.
            </motion.p>

            {/* Search Bar - Décommenté et corrigé */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-white p-4 rounded-2xl shadow-xl border border-gray-100 backdrop-blur-sm bg-white/80"
            >
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Destination"
                  className="bg-transparent border-none outline-none text-sm w-full"
                />
              </div>

              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Date"
                  className="bg-transparent border-none outline-none text-sm w-full"
                />
              </div>

              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Budget"
                  className="bg-transparent border-none outline-none text-sm w-full"
                />
              </div>

              <Button className="bg-[[var(--BRAND-500)]] hover:bg-[#4096ea] text-white px-8 rounded-xl shadow-lg shadow-blue-200 transition-all hover:scale-105">
                <Search className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Reserved space for layout */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Right Images Container - Desktop */}
      <div className="absolute bottom-0 right-0 w-full lg:w-[50%] h-full hidden lg:block pointer-events-none z-20">
        {/* Photo Album Grid - Background Layer */}
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], ["0%", "40%"]),
            opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0.7]),
            transform: "rotate(-25deg)",
            transformOrigin: "center center",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="absolute bottom-[10%] right-[15%] w-[85%] h-[70%] z-10 mb-20"
        >
          <div className="grid grid-cols-3 gap-3 w-full h-full p-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <Image
                src="/images/pendjari.jpg"
                alt="Photo 1"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative rounded-xl overflow-hidden shadow-xl border-4 border-white"
            >
              <Image
                src="/images/sejour-1.jpg"
                alt="Photo 2"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* Row 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative rounded-xl overflow-hidden shadow-xl border-4 border-white"
            >
              <Image
                src="/images/pirogue.png"
                alt="Photo 3"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* Row 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative rounded-xl overflow-hidden shadow-xl border-4 border-white"
            >
              <Image
                src="/images/tourists-1.png"
                alt="Photo 4"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="col-span-2 relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <Image
                src="/images/ouidah.jpeg"
                alt="Photo 5"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </div>
        </motion.div>

        {/* Foreground Amazon Image - Parallax Effect */}
        <motion.div
          style={{ y: yForeground1, scale: scaleForeground }}
          initial={{ opacity: 0, x: 100, scale: 1.2 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.2,
          }}
          className="absolute bottom-0 right-[-10%] w-[45%] h-[80%] z-30"
        >
          <Image
            src="/images/amazone-2.png"
            alt="Amazone du Bénin"
            fill
            className="object-contain object-bottom drop-shadow-2xl"
            priority
          />
        </motion.div>

        {/* Foreground Bio Guera Image - Parallax Effect (Offset) */}
        <motion.div
          style={{
            y: yForeground2,
            scale: scaleForeground,
          }}
          initial={{ opacity: 0, x: 50, scale: 1.1 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.4,
          }}
          className="absolute bottom-0 right-[15%] w-[65%] h-[35%] z-20"
        >
          <Image
            src="/images/bio-guera-1.png"
            alt="Bio Guera"
            fill
            className="object-contain object-bottom drop-shadow-2xl"
            priority
          />
        </motion.div>
      </div>

      {/* Mobile Images Container - Parallax Mobile */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] lg:hidden pointer-events-none z-20">
        {/* Photo Album Grid - Mobile Background Layer */}
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], ["0%", "25%"]),
            transform: "rotate(-25deg)",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="absolute bottom-[5%] left-[10%] right-[10%] h-[80%] z-5"
        >
          <div className="grid grid-cols-2 gap-2 w-full h-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative rounded-lg overflow-hidden shadow-lg border-2 border-white"
            >
              <Image
                src="/images/hills-1.jpg"
                alt="Photo mobile 1"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative rounded-lg overflow-hidden shadow-lg border-2 border-white"
            >
              <Image
                src="/images/hills-1.jpg"
                alt="Photo mobile 2"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative rounded-lg overflow-hidden shadow-lg border-2 border-white"
            >
              <Image
                src="/images/hills-1.jpg"
                alt="Photo mobile 3"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative rounded-lg overflow-hidden shadow-lg border-2 border-white"
            >
              <Image
                src="/images/hills-1.jpg"
                alt="Photo mobile 4"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          style={{ y: yMobile }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.3,
          }}
          className="absolute bottom-0 right-[5%] w-[45%] h-full z-10"
        >
          <Image
            src="/images/amazone-2.png"
            alt="Amazone du Bénin"
            fill
            className="object-contain object-bottom drop-shadow-xl"
            priority
          />
        </motion.div>

        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "15%"]) }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.5,
          }}
          className="absolute bottom-0 left-[5%] w-[40%] h-[90%] z-10"
        >
          <Image
            src="/images/bio-guera-1.png"
            alt="Bio Guera"
            fill
            className="object-contain object-bottom drop-shadow-xl"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
