import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, RotateCcw, Trophy, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { swar, vyanjan, MarathiLetter } from "@/data/marathiLetters";

const cardColors = [
  "bg-kid-red",
  "bg-kid-blue",
  "bg-kid-orange",
  "bg-kid-yellow",
  "bg-kid-teal",
  "bg-kid-purple",
  "bg-kid-pink",
  "bg-kid-green",
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface Question {
  letter: MarathiLetter;
  options: MarathiLetter[];
}

export function PictureMatch() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [questions, setQuestions] = useState<Question[]>(() => generateQuestions());

  function generateQuestions(): Question[] {
    const allLetters = [...swar, ...vyanjan];
    return shuffleArray(allLetters).slice(0, 8).map((letter) => {
      const wrongOptions = shuffleArray(
        allLetters.filter((l) => l.letter !== letter.letter)
      ).slice(0, 3);
      const options = shuffleArray([letter, ...wrongOptions]);
      return { letter, options };
    });
  }

  const playPronunciation = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "mr-IN";
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const handleAnswer = (option: MarathiLetter) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(option.letter);
    const correct = option.letter === questions[currentQuestion].letter.letter;
    setIsCorrect(correct);

    if (correct) {
      setScore((s) => s + 10);
      playPronunciation("शाब्बास!");
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((c) => c + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowCelebration(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setQuestions(generateQuestions());
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowCelebration(false);
  };

  const current = questions[currentQuestion];

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-kid-yellow" />
          <span className="text-2xl font-bold font-devanagari">गुण: {score}</span>
        </div>
        <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full">
          <span className="font-devanagari text-muted-foreground">
            प्रश्न {currentQuestion + 1}/{questions.length}
          </span>
        </div>
        <Button variant="outline" size="sm" onClick={resetGame} className="rounded-full gap-2">
          <RotateCcw className="w-4 h-4" />
          <span className="font-devanagari">नवीन</span>
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
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="bg-card p-8 rounded-3xl shadow-hover text-center"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-8xl mb-4"
              >
                🏆
              </motion.div>
              <h2 className="text-3xl font-bold font-devanagari text-gradient mb-2">
                उत्तम!
              </h2>
              <p className="text-xl font-devanagari text-muted-foreground mb-4">
                तुम्ही खूप छान खेळलात!
              </p>
              <div className="flex items-center justify-center gap-2 text-2xl font-bold mb-6">
                <span className="font-devanagari">एकूण गुण: {score}</span>
              </div>
              <Button onClick={resetGame} className="rounded-full gap-2">
                <RotateCcw className="w-4 h-4" />
                <span className="font-devanagari">पुन्हा खेळा</span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-3xl p-8 shadow-card mb-8 text-center"
      >
        <p className="text-muted-foreground font-devanagari mb-4 text-lg">
          🖼️ चित्र बघा आणि योग्य अक्षर निवडा!
        </p>

        <motion.div
          className="text-8xl mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          {current.letter.emoji}
        </motion.div>

        <p className="text-2xl font-devanagari font-bold text-primary mb-4">
          {current.letter.example}
        </p>

        <Button
          variant="outline"
          onClick={() => playPronunciation(current.letter.example)}
          className="rounded-full gap-2 font-devanagari"
        >
          <Volume2 className="w-5 h-5" />
          उच्चार ऐका
        </Button>
      </motion.div>

      {/* Answer options */}
      <div className="grid grid-cols-2 gap-4">
        {current.options.map((option, index) => {
          const isSelected = selectedAnswer === option.letter;
          const isCorrectAnswer = option.letter === current.letter.letter;
          const colorClass = cardColors[index % cardColors.length];

          return (
            <motion.button
              key={option.letter}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: selectedAnswer === null ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`
                relative p-6 rounded-2xl text-white font-bold transition-all
                ${colorClass}
                ${isSelected && isCorrect ? "ring-4 ring-kid-green shadow-playful" : ""}
                ${isSelected && !isCorrect ? "ring-4 ring-kid-red opacity-60" : ""}
                ${selectedAnswer !== null && isCorrectAnswer && !isSelected ? "ring-4 ring-kid-green" : ""}
              `}
            >
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-white/20" />

              <span className="text-5xl font-devanagari block">{option.letter}</span>

              {isSelected && isCorrect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-kid-green flex items-center justify-center"
                >
                  <Check className="w-5 h-5 text-white" />
                </motion.div>
              )}
              {isSelected && !isCorrect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-kid-red flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {isCorrect !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-6 p-4 rounded-2xl text-center font-devanagari text-lg ${
              isCorrect ? "bg-kid-green/20 text-kid-green" : "bg-kid-red/20 text-kid-red"
            }`}
          >
            {isCorrect
              ? "🎉 शाब्बास! बरोबर!"
              : `❌ नाही, बरोबर उत्तर: ${current.letter.letter}`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
