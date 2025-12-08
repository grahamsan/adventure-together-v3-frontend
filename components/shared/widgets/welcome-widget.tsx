"use client";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Sun, Moon, Cloud, Star } from "lucide-react";

export default function WelcomeWidget() {
  const [greeting, setGreeting] = useState("");
  const [period, setPeriod] = useState<"morning" | "afternoon" | "evening" | "night">("morning");
  const [userName] = useState("Alex");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting("Bonjour");
        setPeriod("morning");
      } else if (hour >= 12 && hour < 18) {
        setGreeting("Bon après-midi");
        setPeriod("afternoon");
      } else if (hour >= 18 && hour < 22) {
        setGreeting("Bonsoir");
        setPeriod("evening");
      } else {
        setGreeting("Bonne nuit");
        setPeriod("night");
      }
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const getBackgroundGradient = () => {
    switch (period) {
      case "morning": return "bg-gradient-to-br from-blue-300 via-blue-200 to-yellow-200";
      case "afternoon": return "bg-gradient-to-br from-blue-400 via-orange-200 to-yellow-300";
      case "evening": return "bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500";
      case "night": return "bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900";
    }
  };

  return (
    <Card className={`relative overflow-hidden ${getBackgroundGradient()} border-none shadow-lg transition-all duration-1000`}>
      <div className="relative p-4 h-[140px] flex flex-col justify-center">
        <div className="absolute inset-0 overflow-hidden">
          {(period === "morning" || period === "afternoon") && (
            <div className="absolute top-3 right-4 animate-bounce-slow">
              <Sun className="w-10 h-10 text-yellow-400 animate-spin-slow drop-shadow-lg" />
            </div>
          )}
          {period === "night" && (
            <>
              <div className="absolute top-3 right-4">
                <Moon className="w-10 h-10 text-yellow-100 drop-shadow-lg" />
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="absolute animate-twinkle" style={{ top: `${Math.random() * 60 + 20}%`, left: `${Math.random() * 80 + 10}%`, animationDelay: `${Math.random() * 3}s` }}>
                  <Star className="w-2 h-2 text-yellow-100 fill-yellow-100" />
                </div>
              ))}
            </>
          )}
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-1">
            {greeting}, {userName} !
          </h2>
        </div>
      </div>
    </Card>
  );
}
