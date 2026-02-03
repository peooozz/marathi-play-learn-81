import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, Trophy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { matchingPairs, MatchingPair } from "@/data/marathiLetters";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function MatchingWorksheet() {
  const [currentPairs, setCurrentPairs] = useState<MatchingPair[]>([]);
  const [shuffledImages, setShuffledImages] = useState<MatchingPair[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [wrongMatch, setWrongMatch] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const initializeGame = () => {
    const selected = shuffleArray(matchingPairs).slice(0, 6);
    setCurrentPairs(selected);
    setShuffledImages(shuffleArray(selected));
    setSelectedLetter(null);
    setMatches({});
    setWrongMatch(null);
    setScore(0);
    setShowCelebration(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleLetterClick = (letter: string) => {
    if (matches[letter]) return;
    setSelectedLetter(letter);
    setWrongMatch(null);
  };

  const handleImageClick = (pair: MatchingPair) => {
    if (!selectedLetter) return;
    if (Object.values(matches).includes(pair.image)) return;

    if (pair.letter === selectedLetter) {
      // Correct match!
      const newMatches = { ...matches, [selectedLetter]: pair.image };
      setMatches(newMatches);
      setScore((s) => s + 10);
      setSelectedLetter(null);

      // Play success sound effect
      const utterance = new SpeechSynthesisUtterance("शाब्बास!");
      utterance.lang = "mr-IN";
      speechSynthesis.speak(utterance);

      // Check if all matched
      if (Object.keys(newMatches).length === currentPairs.length) {
        setShowCelebration(true);
      }
    } else {
      // Wrong match
      setWrongMatch(pair.image);
      setTimeout(() => setWrongMatch(null), 500);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-kid-yellow" />
          <span className="text-2xl font-bold font-devanagari">गुण: {score}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={initializeGame}
          className="rounded-full gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="font-devanagari">नवीन खेळ</span>
        </Button>
      </div>

      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowCelebration(false)}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="bg-card p-8 rounded-3xl shadow-hover text-center"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-8xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-bold font-devanagari text-gradient mb-2">
                शाब्बास!
              </h2>
              <p className="text-xl font-devanagari text-muted-foreground mb-4">
                तुम्ही सर्व जोड्या लावल्या!
              </p>
              <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                <Sparkles className="w-6 h-6 text-kid-yellow" />
                <span className="font-devanagari">एकूण गुण: {score}</span>
              </div>
              <Button
                onClick={initializeGame}
                className="mt-6 rounded-full gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="font-devanagari">पुन्हा खेळा</span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <p className="text-center text-muted-foreground font-devanagari mb-6">
        अक्षर निवडा आणि त्याचे चित्र जोडा
      </p>

      {/* Game area */}
      <div className="grid grid-cols-2 gap-8">
        {/* Letters column */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold font-devanagari text-center mb-4">अक्षरे</h3>
          {currentPairs.map((pair, index) => (
            <motion.button
              key={pair.letter}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleLetterClick(pair.letter)}
              disabled={!!matches[pair.letter]}
              className={`
                w-full p-4 rounded-2xl text-center transition-all font-devanagari text-3xl font-bold
                ${
                  matches[pair.letter]
                    ? "bg-kid-green/20 text-kid-green border-2 border-kid-green"
                    : selectedLetter === pair.letter
                    ? "bg-primary text-primary-foreground shadow-playful scale-105"
                    : "bg-card border-2 border-border hover:border-primary hover:shadow-card"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <span>{pair.letter}</span>
                {matches[pair.letter] && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 rounded-full bg-kid-green flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Images column */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold font-devanagari text-center mb-4">चित्रे</h3>
          {shuffledImages.map((pair, index) => {
            const isMatched = Object.values(matches).includes(pair.image);
            const isWrong = wrongMatch === pair.image;

            return (
              <motion.button
                key={pair.image}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: isWrong ? [0, -10, 10, -10, 10, 0] : 0 
                }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleImageClick(pair)}
                disabled={isMatched || !selectedLetter}
                className={`
                  w-full p-4 rounded-2xl text-center transition-all
                  ${
                    isMatched
                      ? "bg-kid-green/20 border-2 border-kid-green"
                      : isWrong
                      ? "bg-kid-red/20 border-2 border-kid-red"
                      : "bg-card border-2 border-border hover:border-primary hover:shadow-card"
                  }
                  ${!selectedLetter && !isMatched ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{pair.image}</span>
                    <span className="font-devanagari text-lg">{pair.word}</span>
                  </div>
                  {isMatched && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 rounded-full bg-kid-green flex items-center justify-center"
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                  {isWrong && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 rounded-full bg-kid-red flex items-center justify-center"
                    >
                      <X className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
