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
    // Play the letter
    const utterance = new SpeechSynthesisUtterance(letter.letter);
    utterance.lang = "mr-IN";
    utterance.rate = 0.5;
    speechSynthesis.speak(utterance);

    // Then play the full word
    setTimeout(() => {
      const wordUtterance = new SpeechSynthesisUtterance(
        `${letter.letter} म्हणजे ${letter.example}`
      );
      wordUtterance.lang = "mr-IN";
      wordUtterance.rate = 0.6;
      speechSynthesis.speak(wordUtterance);
    }, 1000);
  };

  const gradientClass = colorMap[letter.color] || "from-primary to-accent";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md"
          >
            {/* Floating decorations */}
            <motion.div
              className="absolute -top-8 -left-8 text-5xl"
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⭐
            </motion.div>
            <motion.div
              className="absolute -top-6 -right-6 text-4xl"
              animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              🌟
            </motion.div>
            <motion.div
              className="absolute -bottom-6 -left-6 text-4xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🎈
            </motion.div>
            <motion.div
              className="absolute -bottom-8 -right-8 text-5xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              🦋
            </motion.div>

            {/* Main card */}
            <div className={`bg-gradient-to-br ${gradientClass} rounded-[2rem] p-1 shadow-2xl`}>
              <div className="bg-card rounded-[1.8rem] p-6 relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4 w-24 h-24 rounded-full border-4 border-foreground" />
                  <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full border-4 border-foreground" />
                  <div className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full border-4 border-foreground" />
                </div>

                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="absolute top-4 right-4 rounded-full bg-muted/80 hover:bg-muted z-10"
                >
                  <X className="h-5 w-5" />
                </Button>

                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Letter display */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className={`w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-lg mb-4`}
                  >
                    <span className="text-7xl font-devanagari font-bold text-white drop-shadow-lg">
                      {letter.letter}
                    </span>
                  </motion.div>

                  {/* Word display */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Sparkles className="w-5 h-5 text-kid-yellow" />
                      <h2 className="text-2xl font-devanagari font-bold text-foreground">
                        {letter.letter} म्हणजे {letter.example}
                      </h2>
                      <Sparkles className="w-5 h-5 text-kid-yellow" />
                    </div>
                    <p className="text-muted-foreground">({letter.exampleMeaning})</p>
                  </motion.div>

                  {/* Emoji/Image display */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="text-8xl mb-6"
                  >
                    {letter.emoji}
                  </motion.div>

                  {/* Pronunciation button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      onClick={playPronunciation}
                      size="lg"
                      className={`rounded-full gap-3 bg-gradient-to-r ${gradientClass} text-white shadow-lg px-8 py-6 text-lg font-devanagari hover:scale-105 transition-transform`}
                    >
                      <Volume2 className="w-6 h-6" />
                      उच्चार ऐका
                    </Button>
                  </motion.div>

                  {/* Fun message */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
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