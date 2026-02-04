import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TracingCanvas } from "@/components/TracingCanvas";
import { swar, vyanjan, MarathiLetter } from "@/data/marathiLetters";

interface TracingSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export function TracingSection({ isOpen, onClose }: TracingSectionProps) {
  const [showLetterType, setShowLetterType] = useState<"swar" | "vyanjan">("swar");
  const [selectedLetter, setSelectedLetter] = useState<MarathiLetter>(swar[0]);

  const playPronunciation = (letter: string) => {
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.lang = "mr-IN";
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const currentLetters = showLetterType === "swar" ? swar : vyanjan;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto"
      >
        <div className="container mx-auto max-w-6xl px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl md:text-3xl font-bold font-devanagari text-gradient"
            >
              ✏️ अक्षर गिरवा
            </motion.h2>
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              className="rounded-full h-12 w-12"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Letter type toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-card rounded-full p-1.5 shadow-card inline-flex">
              <Button
                variant={showLetterType === "swar" ? "default" : "ghost"}
                onClick={() => {
                  setShowLetterType("swar");
                  setSelectedLetter(swar[0]);
                }}
                className="rounded-full font-devanagari px-8 py-2 text-lg"
              >
                स्वर
              </Button>
              <Button
                variant={showLetterType === "vyanjan" ? "default" : "ghost"}
                onClick={() => {
                  setShowLetterType("vyanjan");
                  setSelectedLetter(vyanjan[0]);
                }}
                className="rounded-full font-devanagari px-8 py-2 text-lg"
              >
                व्यंजन
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Letter grid */}
            <motion.div
              key={showLetterType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1"
            >
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2 md:gap-3">
                {currentLetters.map((letter, index) => {
                  const colorClass = flashcardColors[index % flashcardColors.length];
                  const isSelected = selectedLetter.letter === letter.letter;

                  return (
                    <motion.button
                      key={letter.letter}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.02 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedLetter(letter);
                        playPronunciation(letter.letter);
                      }}
                      className={`
                        relative aspect-square rounded-xl ${colorClass} p-1 text-white
                        transition-all duration-200
                        ${isSelected ? "ring-4 ring-foreground/30 shadow-playful scale-105" : "shadow-card"}
                      `}
                    >
                      {/* Decorative dots */}
                      <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white/20" />
                      
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="text-2xl md:text-3xl font-devanagari font-bold drop-shadow-md">
                          {letter.letter}
                        </span>
                        <span className="text-[10px] md:text-xs font-devanagari opacity-90 truncate max-w-full px-0.5">
                          {letter.example}
                        </span>
                      </div>

                      {/* Sound indicator */}
                      <Volume2 className="absolute bottom-1 right-1 w-3 h-3 text-white/60" />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Tracing canvas */}
            <div className="lg:w-[400px] flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-3xl p-6 shadow-card w-full"
              >
                <div className="text-center mb-4">
                  <span className="text-6xl font-devanagari font-bold text-primary">
                    {selectedLetter.letter}
                  </span>
                  <p className="text-muted-foreground font-devanagari mt-1">
                    {selectedLetter.example}
                  </p>
                </div>

                <TracingCanvas letter={selectedLetter.letter} />

                <Button
                  variant="outline"
                  onClick={() => playPronunciation(selectedLetter.letter)}
                  className="w-full mt-4 rounded-full gap-2 font-devanagari"
                >
                  <Volume2 className="w-5 h-5" />
                  उच्चार ऐका
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
