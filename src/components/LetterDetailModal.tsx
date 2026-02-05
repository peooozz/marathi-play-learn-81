import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarathiLetter } from "@/data/marathiLetters";

interface LetterDetailModalProps {
  letter: MarathiLetter | null;
  isOpen: boolean;
  onClose: () => void;
}

const colorMap: Record<string, string> = {
  "kid-red": "from-kid-red to-kid-pink",
  "kid-pink": "from-kid-pink to-kid-purple",
  "kid-teal": "from-kid-teal to-kid-blue",
  "kid-purple": "from-kid-purple to-kid-pink",
  "kid-yellow": "from-kid-yellow to-kid-orange",
  "kid-green": "from-kid-green to-kid-teal",
  "kid-blue": "from-kid-blue to-kid-purple",
  "kid-orange": "from-kid-orange to-kid-red",
};

export function LetterDetailModal({ letter, isOpen, onClose }: LetterDetailModalProps) {
  if (!letter) return null;

  const playPronunciation = () => {
    // Cancel any ongoing speech
    speechSynthesis.cancel();

    // Play the letter with proper Marathi pronunciation
    const letterUtterance = new SpeechSynthesisUtterance(letter.letter);
    letterUtterance.lang = "mr-IN";
    letterUtterance.rate = 0.4;
    letterUtterance.pitch = 1.1;
    speechSynthesis.speak(letterUtterance);

    // Then play the full word after a delay
    setTimeout(() => {
      const wordUtterance = new SpeechSynthesisUtterance(
        `${letter.letter} म्हणजे ${letter.example}`
      );
      wordUtterance.lang = "mr-IN";
      wordUtterance.rate = 0.5;
      wordUtterance.pitch = 1.0;
      speechSynthesis.speak(wordUtterance);
    }, 800);
  };

  const gradientClass = colorMap[letter.color] || "from-primary to-accent";

  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={handleModalClick}
            className="relative w-full max-w-md"
          >
            {/* Floating decorations - simplified for performance */}
            <motion.div
              className="absolute -top-6 -left-6 text-4xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              ⭐
            </motion.div>
            <motion.div
              className="absolute -top-4 -right-4 text-3xl"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🌟
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 text-3xl"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎈
            </motion.div>
            <motion.div
              className="absolute -bottom-6 -right-6 text-4xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              🦋
            </motion.div>

            {/* Main card */}
            <div className={`bg-gradient-to-br ${gradientClass} rounded-[2rem] p-1 shadow-2xl`}>
              <div className="bg-card rounded-[1.8rem] p-6 relative overflow-hidden">
                {/* Background pattern - simplified */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4 w-20 h-20 rounded-full border-4 border-foreground" />
                  <div className="absolute bottom-4 right-4 w-28 h-28 rounded-full border-4 border-foreground" />
                </div>

                {/* Close button - improved visibility and clickability */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="absolute top-3 right-3 rounded-full bg-muted hover:bg-muted/80 z-20 h-10 w-10"
                >
                  <X className="h-5 w-5" />
                </Button>

                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Letter display */}
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className={`w-28 h-28 mx-auto rounded-3xl bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-lg mb-4`}
                  >
                    <span className="text-6xl font-devanagari font-bold text-white drop-shadow-lg">
                      {letter.letter}
                    </span>
                  </motion.div>

                  {/* Word display */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-5"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-kid-yellow" />
                      <h2 className="text-xl font-devanagari font-bold text-foreground">
                        {letter.letter} म्हणजे {letter.example}
                      </h2>
                      <Sparkles className="w-4 h-4 text-kid-yellow" />
                    </div>
                    <p className="text-muted-foreground text-sm">({letter.exampleMeaning})</p>
                  </motion.div>

                  {/* Emoji/Image display */}
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-7xl mb-5"
                  >
                    {letter.emoji}
                  </motion.div>

                  {/* Pronunciation button */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      onClick={playPronunciation}
                      size="lg"
                      className={`rounded-full gap-3 bg-gradient-to-r ${gradientClass} text-white shadow-lg px-6 py-5 text-base font-devanagari hover:scale-105 transition-transform`}
                    >
                      <Volume2 className="w-5 h-5" />
                      उच्चार ऐका
                    </Button>
                  </motion.div>

                  {/* Fun message */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 text-muted-foreground font-devanagari text-sm"
                  >
                    🎉 शाब्बास! शिकत रहा! 🎉
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}