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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.015, type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ scale: 1.08, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-2xl ${colorClass} p-1
        shadow-card hover:shadow-hover
        transition-shadow duration-200 overflow-hidden
        aspect-square w-full max-w-[120px]
      `}
    >
      {/* Decorative circle */}
      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white/25" />
      <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-white/20" />
      
      {/* Letter */}
      <div className="flex flex-col items-center justify-center h-full text-white">
        <span className="text-4xl md:text-5xl font-devanagari font-bold drop-shadow-md">
          {letter.letter}
        </span>
        <span className="text-xs md:text-sm font-devanagari mt-1 opacity-90 truncate max-w-full px-1">
          {letter.example}
        </span>
      </div>

      {/* Sound indicator */}
      <div className="absolute bottom-2 right-2">
        <Volume2 className="w-4 h-4 text-white/70" />
      </div>
    </motion.div>
  );
}
