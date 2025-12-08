import { motion, AnimatePresence } from "framer-motion";
// ... autres imports (Button, Card, Form, Input, etc.)

// Vous aurez besoin d'un état pour suivre la direction de la transition
// (si vous voulez un glissement intelligent, par exemple, à droite en avant, à gauche en arrière).
// Pour cet exemple, nous allons utiliser une animation simple et unidirectionnelle.

// Définissez la variante d'animation
const pageVariants = {
  initial: {
    opacity: 0,
    x: 50, // Commence légèrement décalé à droite
  },
  in: {
    opacity: 1,
    x: 0, // Arrive à sa position normale
    transition: {
      duration: 0.4,
    },
  },
  out: {
    opacity: 0,
    x: -50, // Glisse vers la gauche en sortant
    transition: {
      duration: 0.3,
    },
  },
};

interface MotionWrapperProps {
  children: React.ReactNode;
  step: number;
}

// Composant wrapper pour chaque étape
export const MotionWrapper = ({ children, step } : MotionWrapperProps) => (
  <motion.div
    key={step} // IMPORTANT : La clé doit changer à chaque étape pour que AnimatePresence fonctionne
    variants={pageVariants}
    initial="initial"
    animate="in"
    exit="out"
    style={{ position: 'relative', width: '100%' }} // Nécessaire pour les transitions de glissement
  >
    {children}
  </motion.div>
);
