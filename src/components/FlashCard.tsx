import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { MarathiLetter } from "@/data/marathiLetters";

interface FlashCardProps {
  letter: MarathiLetter;
  index: number;
  onClick: () => void;
}

// Vibrant colors matching the reference site
const flashcardColors = [
  "bg-kid-red",
  "bg-kid-blue", 
  "bg-kid-orange",
  "bg-kid-yellow",
  "bg-kid-teal",
  "bg-kid-purple",
  "bg-kid-pink",
  "bg-kid-green",
];

export function FlashCard({ letter, index, onClick }: FlashCardProps) {
  const colorClass = flashcardColors[index % flashcardColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: index * 0.02, type: "spring", stiffness: 200 }}
      whileHover={{ 
        scale: 1.1, 
        y: -10,
        rotate: [0, -2, 2, 0],
        transition: { rotate: { duration: 0.3 } }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-2xl ${colorClass} p-1
        shadow-card hover:shadow-hover
        transition-shadow duration-300 overflow-hidden
        aspect-square w-full max-w-[120px]
      `}
    >
      {/* Decorative circles */}
      <motion.div 
        className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white/25"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-white/20"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      
      {/* Letter */}
      <div className="flex flex-col items-center justify-center h-full text-white">
        <motion.span 
          className="text-4xl md:text-5xl font-devanagari font-bold drop-shadow-md"
          whileHover={{ scale: 1.1 }}
        >
          {letter.letter}
        </motion.span>
        <span className="text-xs md:text-sm font-devanagari mt-1 opacity-90 truncate max-w-full px-1">
          {letter.example}
        </span>
      </div>

      {/* Sound indicator */}
      <motion.div
        className="absolute bottom-2 right-2"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Volume2 className="w-4 h-4 text-white/70" />
      </motion.div>
    </motion.div>
  );
}
