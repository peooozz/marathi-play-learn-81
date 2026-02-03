import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { MarathiLetter } from "@/data/marathiLetters";

interface LetterCardProps {
  letter: MarathiLetter;
  index: number;
  onSelect?: (letter: MarathiLetter) => void;
  isSelected?: boolean;
}

export function LetterCard({ letter, index, onSelect, isSelected }: LetterCardProps) {
  const playPronunciation = () => {
    // Use Web Speech API for pronunciation
    const utterance = new SpeechSynthesisUtterance(letter.letter);
    utterance.lang = "mr-IN";
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const colorClasses: Record<string, string> = {
    "kid-orange": "bg-kid-orange/10 text-kid-orange border-kid-orange/30 hover:bg-kid-orange/20",
    "kid-pink": "bg-kid-pink/10 text-kid-pink border-kid-pink/30 hover:bg-kid-pink/20",
    "kid-teal": "bg-kid-teal/10 text-kid-teal border-kid-teal/30 hover:bg-kid-teal/20",
    "kid-purple": "bg-kid-purple/10 text-kid-purple border-kid-purple/30 hover:bg-kid-purple/20",
    "kid-yellow": "bg-kid-yellow/10 text-kid-yellow border-kid-yellow/30 hover:bg-kid-yellow/20",
    "kid-green": "bg-kid-green/10 text-kid-green border-kid-green/30 hover:bg-kid-green/20",
    "kid-blue": "bg-kid-blue/10 text-kid-blue border-kid-blue/30 hover:bg-kid-blue/20",
    "kid-red": "bg-kid-red/10 text-kid-red border-kid-red/30 hover:bg-kid-red/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.03, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect?.(letter)}
      className={`
        letter-card cursor-pointer p-4 rounded-2xl border-2 
        ${colorClasses[letter.color] || colorClasses["kid-orange"]}
        ${isSelected ? "ring-4 ring-primary shadow-hover" : "shadow-card"}
        transition-all duration-300
      `}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-5xl md:text-6xl font-devanagari font-bold">
          {letter.letter}
        </span>
        
        <div className="text-center">
          <p className="font-devanagari text-sm opacity-80">{letter.example}</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            playPronunciation();
          }}
          className="p-2 rounded-full bg-card shadow-sm hover:shadow-md transition-shadow"
        >
          <Volume2 className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
