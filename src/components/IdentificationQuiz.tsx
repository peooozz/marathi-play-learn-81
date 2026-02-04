import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Volume2, RotateCcw, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allLetters, MarathiLetter } from "@/data/marathiLetters";
import { Progress } from "@/components/ui/progress";

interface QuizQuestion {
  correctLetter: MarathiLetter;
  options: MarathiLetter[];
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateQuestion(): QuizQuestion {
  const shuffled = shuffleArray(allLetters);
  const correctLetter = shuffled[0];
  const wrongOptions = shuffled.slice(1, 4);
  const options = shuffleArray([correctLetter, ...wrongOptions]);
  return { correctLetter, options };
}

export function IdentificationQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>(generateQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const playSound = useCallback((letter: string) => {
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.lang = "mr-IN";
    utterance.rate = 0.6;
    speechSynthesis.speak(utterance);
  }, []);

  const playQuestionSound = useCallback(() => {
    playSound(currentQuestion.correctLetter.letter);
  }, [currentQuestion.correctLetter.letter, playSound]);

  useEffect(() => {
    const timer = setTimeout(() => {
      playQuestionSound();
    }, 500);
    return () => clearTimeout(timer);
  }, [currentQuestion, playQuestionSound]);

  const handleAnswer = (letter: MarathiLetter) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(letter.letter);
    setTotalQuestions(prev => prev + 1);
    
    if (letter.letter === currentQuestion.correctLetter.letter) {
      setIsCorrect(true);
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      
      if ((streak + 1) % 5 === 0) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }
    } else {
      setIsCorrect(false);
      setStreak(0);
      playSound(currentQuestion.correctLetter.letter);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion(generateQuestion());
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const resetQuiz = () => {
    setCurrentQuestion(generateQuestion());
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setTotalQuestions(0);
    setStreak(0);
  };

  const progress = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  const optionColors = [
    "bg-kid-red hover:bg-kid-red/90",
    "bg-kid-blue hover:bg-kid-blue/90",
    "bg-kid-orange hover:bg-kid-orange/90",
    "bg-kid-teal hover:bg-kid-teal/90",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
              exit={{ scale: 0 }}
              className="bg-card p-8 rounded-3xl shadow-playful text-center"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold font-devanagari text-gradient">
                शाबास! {streak} सलग बरोबर!
              </h3>
              <div className="flex justify-center gap-2 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-warning fill-warning" />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-4 mb-6 shadow-card"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-warning" />
            <span className="font-devanagari font-bold text-lg">
              गुण: {score}/{totalQuestions}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground font-devanagari">
              सलग: {streak}
            </span>
            <div className="flex">
              {[...Array(Math.min(streak, 5))].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-warning fill-warning" />
              ))}
            </div>
          </div>
        </div>
        <Progress value={progress} className="h-3" />
      </motion.div>

      {/* Quiz card */}
      <motion.div
        key={currentQuestion.correctLetter.letter}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-3xl p-6 md:p-8 shadow-card"
      >
        {/* Question */}
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-devanagari font-bold mb-4 text-muted-foreground">
            हे अक्षर ओळखा:
          </h3>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playQuestionSound}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-2xl shadow-playful"
          >
            <Volume2 className="w-8 h-8" />
            <span className="text-lg font-devanagari font-bold">उच्चार ऐका</span>
          </motion.button>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === option.letter;
            const isCorrectAnswer = option.letter === currentQuestion.correctLetter.letter;
            
            let borderClass = "";
            if (selectedAnswer) {
              if (isCorrectAnswer) {
                borderClass = "ring-4 ring-success";
              } else if (isSelected && !isCorrect) {
                borderClass = "ring-4 ring-destructive opacity-60";
              }
            }

            return (
              <motion.button
                key={option.letter}
                whileHover={!selectedAnswer ? { scale: 1.05 } : {}}
                whileTap={!selectedAnswer ? { scale: 0.95 } : {}}
                onClick={() => handleAnswer(option)}
                disabled={!!selectedAnswer}
                className={`
                  relative p-6 rounded-2xl text-white font-devanagari text-4xl md:text-5xl font-bold
                  transition-all duration-300 ${optionColors[index]} ${borderClass}
                  ${selectedAnswer && !isCorrectAnswer && !isSelected ? "opacity-40" : ""}
                `}
              >
                {option.letter}
                
                {selectedAnswer && isCorrectAnswer && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <CheckCircle2 className="w-8 h-8 text-success fill-white" />
                  </motion.div>
                )}
                
                {selectedAnswer && isSelected && !isCorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <XCircle className="w-8 h-8 text-destructive fill-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Feedback & Next */}
        <AnimatePresence mode="wait">
          {selectedAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className={`text-xl font-devanagari font-bold mb-4 ${isCorrect ? "text-success" : "text-destructive"}`}>
                {isCorrect ? "🎉 बरोबर!" : `❌ चुकले! बरोबर उत्तर: ${currentQuestion.correctLetter.letter}`}
              </div>
              
              <div className="flex justify-center gap-4">
                <Button
                  onClick={nextQuestion}
                  size="lg"
                  className="rounded-full font-devanagari gap-2"
                >
                  पुढचा प्रश्न →
                </Button>
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  size="lg"
                  className="rounded-full font-devanagari gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  पुन्हा सुरू करा
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
