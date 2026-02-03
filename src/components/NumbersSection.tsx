import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { ankh } from "@/data/marathiLetters";

export function NumbersSection() {
  const playPronunciation = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "mr-IN";
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const colors = [
    "kid-orange", "kid-pink", "kid-teal", "kid-purple", "kid-yellow",
    "kid-green", "kid-blue", "kid-red", "kid-orange", "kid-pink", "kid-teal"
  ];

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-3">
      {ankh.map((num, index) => (
        <motion.div
          key={num.value}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05, type: "spring" }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => playPronunciation(num.word)}
          className={`
            cursor-pointer p-3 rounded-2xl border-2 text-center
            bg-${colors[index]}/10 text-${colors[index]} border-${colors[index]}/30
            hover:bg-${colors[index]}/20 transition-all shadow-card hover:shadow-hover
          `}
        >
          <span className="text-3xl md:text-4xl font-devanagari font-bold block">
            {num.number}
          </span>
          <span className="text-xs font-devanagari opacity-80">{num.word}</span>
        </motion.div>
      ))}
    </div>
  );
}
