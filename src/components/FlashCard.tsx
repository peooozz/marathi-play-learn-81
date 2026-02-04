import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { MarathiLetter } from "@/data/marathiLetters";

interface FlashCardProps {
  letter: MarathiLetter;
  index: number;
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

export function FlashCard({ letter, index }: FlashCardProps) {
  const colorClass = flashcardColors[index % flashcardColors.length];
  
  const playPronunciation = () => {
    const utterance = new SpeechSynthesisUtterance(letter.letter);
    utterance.lang = "mr-IN";
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08, y: -8 }}
      whileTap={{ scale: 0.95 }}
      onClick={playPronunciation}
      className={`
        relative cursor-pointer rounded-2xl ${colorClass} p-1
        shadow-card hover:shadow-hover
        transition-all duration-300 overflow-hidden
        aspect-square w-full max-w-[120px]
      `}
    >
      {/* Decorative circles */}
      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white/20" />
      <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-white/15" />
      
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
      <motion.div
        className="absolute bottom-2 right-2"
        whileHover={{ scale: 1.2 }}
      >
        <Volume2 className="w-4 h-4 text-white/70" />
      </motion.div>
    </motion.div>
  );
}
