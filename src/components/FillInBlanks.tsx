import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, Trophy, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fillBlankQuestions, FillBlankQuestion, vyanjan, swar } from "@/data/marathiLetters";
import { speakMarathi, speakFeedback } from "@/lib/marathiSpeech";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function FillInBlanks() {
  const [currentQuestion, setCurrentQuestion] = useState<FillBlankQuestion | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [questionsAsked, setQuestionsAsked] = useState<FillBlankQuestion[]>([]);

  const allLetters = [...swar.map(s => s.letter), ...vyanjan.map(v => v.letter)];

  const generateQuestion = () => {
    const remaining = fillBlankQuestions.filter(
      q => !questionsAsked.find(asked => asked.word === q.word)
    );
    
    const pool = remaining.length > 0 ? remaining : fillBlankQuestions;
    const question = shuffleArray(pool)[0];
    
    // Generate options - correct answer + 3 wrong ones
    const correctLetter = question.blanks[0].letter;
    const wrongLetters = shuffleArray(
      allLetters.filter(l => l !== correctLetter)
    ).slice(0, 3);
    
    setCurrentQuestion(question);
    setOptions(shuffleArray([correctLetter, ...wrongLetters]));
    setSelectedAnswer(null);
    setIsCorrect(null);
    
    if (remaining.length > 0) {
      setQuestionsAsked(prev => [...prev, question]);
    }
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswer = (letter: string) => {
    if (selectedAnswer || !currentQuestion) return;
    
    setSelectedAnswer(letter);
    setTotalQuestions(prev => prev + 1);
    
    const correct = currentQuestion.blanks[0].letter === letter;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 10);
      
      // Play success sound
      speakFeedback("शाब्बास!");
      
      if ((score + 10) % 50 === 0) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }
    } else {
      // Play correct pronunciation
      setTimeout(() => {
        speakMarathi(currentQuestion.word, { rate: 0.55, pitch: 1.1 });
      }, 500);
    }
  };

  const nextQuestion = () => {
    generateQuestion();
  };

  const resetGame = () => {
    setScore(0);
    setTotalQuestions(0);
    setQuestionsAsked([]);
    generateQuestion();
  };

  const renderWord = () => {
    if (!currentQuestion) return null;
    
    const chars = currentQuestion.word.split("");
    const blankPosition = currentQuestion.blanks[0].position;
    
    return (
      <div className="flex items-center justify-center gap-2 text-5xl font-devanagari font-bold">
        {chars.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={index === blankPosition ? "relative" : ""}
          >
            {index === blankPosition ? (
              <span className={`
                inline-block w-16 h-16 border-4 border-dashed rounded-xl
                flex items-center justify-center
                ${selectedAnswer 
                  ? isCorrect 
                    ? "border-kid-green bg-kid-green/20 text-kid-green" 
                    : "border-kid-red bg-kid-red/20"
                  : "border-primary bg-primary/10 animate-pulse"
                }
              `}>
                {selectedAnswer && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={isCorrect ? "text-kid-green" : "text-kid-red"}
                  >
                    {isCorrect ? currentQuestion.blanks[0].letter : selectedAnswer}
                  </motion.span>
                )}
              </span>
            ) : (
              char
            )}
          </motion.span>
        ))}
      </div>
    );
  };

  if (!currentQuestion) return null;

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
                अप्रतिम! {score} गुण!
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

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-kid-yellow" />
          <span className="text-2xl font-bold font-devanagari">गुण: {score}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={resetGame}
          className="rounded-full gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="font-devanagari">नवीन खेळ</span>
        </Button>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion.word}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-3xl p-6 md:p-8 shadow-card"
      >
        {/* Emoji */}
        <motion.div
          className="text-center mb-4"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-7xl">{currentQuestion.emoji}</span>
        </motion.div>

        {/* Instructions */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-devanagari font-bold text-muted-foreground mb-2">
            रिकाम्या जागी योग्य अक्षर भरा:
          </h3>
        </div>

        {/* Word with blank */}
        <div className="mb-8">{renderWord()}</div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {options.map((letter, index) => {
            const isSelected = selectedAnswer === letter;
            const isCorrectLetter = currentQuestion.blanks[0].letter === letter;
            
            let extraClass = "";
            if (selectedAnswer) {
              if (isCorrectLetter) {
                extraClass = "ring-4 ring-kid-green";
              } else if (isSelected) {
                extraClass = "ring-4 ring-kid-red opacity-60";
              } else {
                extraClass = "opacity-40";
              }
            }

            return (
              <motion.button
                key={letter}
                whileHover={!selectedAnswer ? { scale: 1.05 } : {}}
                whileTap={!selectedAnswer ? { scale: 0.95 } : {}}
                onClick={() => handleAnswer(letter)}
                disabled={!!selectedAnswer}
                className={`
                  relative p-4 rounded-2xl text-white font-devanagari text-4xl font-bold
                  transition-all duration-300 ${optionColors[index]} ${extraClass}
                `}
              >
                {letter}
                {selectedAnswer && isCorrectLetter && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-kid-green flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>
                )}
                {selectedAnswer && isSelected && !isCorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-kid-red flex items-center justify-center">
                      <X className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Feedback */}
        <AnimatePresence mode="wait">
          {selectedAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className={`text-xl font-devanagari font-bold mb-4 ${isCorrect ? "text-kid-green" : "text-kid-red"}`}>
                {isCorrect 
                  ? "🎉 शाब्बास! बरोबर!" 
                  : `❌ चुकले! बरोबर उत्तर: ${currentQuestion.blanks[0].letter}`
                }
              </div>
              
              <div className="flex justify-center gap-4">
                <Button
                  onClick={nextQuestion}
                  size="lg"
                  className="rounded-full font-devanagari gap-2"
                >
                  पुढचा प्रश्न →
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Progress indicator */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-kid-yellow" />
        <span className="font-devanagari text-muted-foreground">
          {totalQuestions} प्रश्न पूर्ण
        </span>
        <Sparkles className="w-4 h-4 text-kid-yellow" />
      </div>
    </div>
  );
}