import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Filter, Plus } from 'lucide-react';

export interface AddNewSectionProps {
  userFullName: string;
}

type Gender = 'male' | 'female' | 'other';

const getGreeting = (gender: Gender): string => {
  const hour = new Date().getHours();
  const suffix = gender === 'female' ? 'e' : gender === 'male' ? '' : '·e';

  if (hour >= 5 && hour < 12) return `Aube enchantée, cher${suffix} vagabond${suffix}`;
  if (hour >= 12 && hour < 18) return `Après-midi doré, compagnon${suffix} d'évasion`;
  if (hour >= 18 && hour < 22) return `Bonsoir, explorateur${suffix} des soirées`;
  return `Bonne nuit, âme vagabonde des rêves`;
};

export default function AddNewSection({ userFullName }: AddNewSectionProps) {
  const [showGreeting, setShowGreeting] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const greeting = getGreeting('male');

  useEffect(() => {
    // Afficher le greeting pendant 2.5 secondes
    const greetingTimer = setTimeout(() => {
      setShowGreeting(false);
    }, 2500);

    // Afficher les boutons après la sortie du greeting
    const buttonsTimer = setTimeout(() => {
      setShowButtons(true);
    }, 3100); // 2500ms + 600ms pour l'animation de sortie

    return () => {
      clearTimeout(greetingTimer);
      clearTimeout(buttonsTimer);
    };
  }, []);

  return (
    <div
      className="sticky top-0 z-20 mb-8 mt-4 w-full lg:w-[40vw] min-h-[60px]
      rounded-full flex items-center justify-center px-4 py-3"
    >
      <style>{`
        :root {
          --BRAND-500: #f4a261;
        }
      `}</style>

      <AnimatePresence mode="wait">
        {showGreeting && (
          <motion.div
            key="greeting"
            initial={{ 
              y: -20, 
              scale: 0.5, 
              opacity: 0 
            }}
            animate={{ 
              y: 0, 
              scale: 1, 
              opacity: 1,
              transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1] // Courbe d'animation smooth (easeOutExpo)
              }
            }}
            exit={{ 
              y: 20, 
              scale: 0.5, 
              opacity: 0,
              transition: {
                duration: 0.6,
                ease: [0.7, 0, 0.84, 0] // Courbe d'animation smooth (easeInExpo)
              }
            }}
            className="w-full"
          >
            <h1 className="text-[var(--BRAND-500)] text-center text-lg font-semibold">
              {greeting} !
            </h1>
          </motion.div>
        )}

        {showButtons && (
          <motion.div
            key="buttons"
            initial={{ 
              y: -20, 
              scale: 0.5, 
              opacity: 0 
            }}
            animate={{ 
              y: 0, 
              scale: 1, 
              opacity: 1,
              transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
            className="flex items-center gap-3 justify-center bg-white rounded-full p-1 w-fit"
          >
            <Button 
              variant="outline" 
              className="bg-[var(--BRAND-500)] text-white hover:bg-amber-700 hover:text-white backdrop-blur-sm transition-all"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
            <Button 
              variant="default"
              className="bg-white text-[var(--BRAND-500)] border border-[var(--BRAND-500)] hover:bg-amber-700 hover:text-white font-semibold transition-all shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}