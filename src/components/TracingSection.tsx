import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, Printer } from "lucide-react";
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
  const printRef = useRef<HTMLDivElement>(null);

  const playPronunciation = (letter: MarathiLetter) => {
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    // Play the letter first
    const letterUtterance = new SpeechSynthesisUtterance(letter.letter);
    letterUtterance.lang = "mr-IN";
    letterUtterance.rate = 0.4;
    letterUtterance.pitch = 1.1;
    speechSynthesis.speak(letterUtterance);

    // Then play the word after a short delay
    setTimeout(() => {
      const wordUtterance = new SpeechSynthesisUtterance(`${letter.letter} म्हणजे ${letter.example}`);
      wordUtterance.lang = "mr-IN";
      wordUtterance.rate = 0.5;
      wordUtterance.pitch = 1.0;
      speechSynthesis.speak(wordUtterance);
    }, 800);
  };

  const handlePrint = () => {
    const printContent = `
      <!DOCTYPE html>
      <html lang="mr">
      <head>
        <meta charset="UTF-8">
        <title>मराठी अक्षर गिरवा - ${selectedLetter.letter}</title>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap" rel="stylesheet">
        <style>
          @page { margin: 1cm; }
          body { 
            font-family: 'Noto Sans Devanagari', sans-serif; 
            text-align: center; 
            padding: 20px;
          }
          h1 { font-size: 24px; margin-bottom: 10px; }
          .letter-display { 
            font-size: 180px; 
            font-weight: bold; 
            color: #e0e0e0;
            margin: 20px 0;
            line-height: 1;
          }
          .word-display { font-size: 28px; margin: 15px 0; }
          .emoji-display { font-size: 60px; margin: 10px 0; }
          .tracing-box {
            width: 300px;
            height: 300px;
            border: 3px dashed #999;
            border-radius: 20px;
            margin: 20px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 200px;
            font-weight: bold;
            color: #ddd;
          }
          .practice-lines {
            margin-top: 30px;
          }
          .practice-line {
            height: 80px;
            border-bottom: 2px dashed #ccc;
            margin: 10px 0;
            display: flex;
            align-items: center;
            padding-left: 20px;
            font-size: 60px;
            color: #eee;
          }
          .footer { 
            margin-top: 30px; 
            font-size: 14px; 
            color: #666;
          }
        </style>
      </head>
      <body>
        <h1>✏️ अक्षर गिरवा ✏️</h1>
        <div class="word-display">${selectedLetter.letter} म्हणजे ${selectedLetter.example}</div>
        <div class="emoji-display">${selectedLetter.emoji}</div>
        <div class="tracing-box">${selectedLetter.letter}</div>
        <div class="practice-lines">
          <div class="practice-line">${selectedLetter.letter}</div>
          <div class="practice-line">${selectedLetter.letter}</div>
          <div class="practice-line">${selectedLetter.letter}</div>
        </div>
        <div class="footer">📚 मराठी शिका - लहान मुलांसाठी ❤️</div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  const currentLetters = showLetterType === "swar" ? swar : vyanjan;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/98 backdrop-blur-sm z-50 overflow-y-auto"
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
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handlePrint}
                className="rounded-full gap-2 font-devanagari"
              >
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">प्रिंट करा</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={onClose}
                className="rounded-full h-12 w-12"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
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
                स्वर ({swar.length})
              </Button>
              <Button
                variant={showLetterType === "vyanjan" ? "default" : "ghost"}
                onClick={() => {
                  setShowLetterType("vyanjan");
                  setSelectedLetter(vyanjan[0]);
                }}
                className="rounded-full font-devanagari px-8 py-2 text-lg"
              >
                व्यंजन ({vyanjan.length})
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
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.015 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedLetter(letter);
                        playPronunciation(letter);
                      }}
                      className={`
                        relative aspect-square rounded-xl ${colorClass} p-1 text-white
                        transition-all duration-200
                        ${isSelected ? "ring-4 ring-foreground/30 shadow-playful scale-105" : "shadow-card"}
                      `}
                    >
                      <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white/20" />
                      
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="text-2xl md:text-3xl font-devanagari font-bold drop-shadow-md">
                          {letter.letter}
                        </span>
                        <span className="text-[10px] md:text-xs font-devanagari opacity-90 truncate max-w-full px-0.5">
                          {letter.example}
                        </span>
                      </div>

                      <Volume2 className="absolute bottom-1 right-1 w-3 h-3 text-white/60" />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Tracing canvas - centered */}
            <div className="lg:w-[420px] flex flex-col items-center" ref={printRef}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-3xl p-6 shadow-card w-full"
              >
                <div className="text-center mb-4">
                  <span className="text-6xl font-devanagari font-bold text-primary">
                    {selectedLetter.letter}
                  </span>
                  <p className="text-muted-foreground font-devanagari mt-1 text-lg">
                    {selectedLetter.letter} म्हणजे {selectedLetter.example} {selectedLetter.emoji}
                  </p>
                </div>

                <div className="flex justify-center">
                  <TracingCanvas letter={selectedLetter.letter} />
                </div>

                <Button
                  variant="outline"
                  onClick={() => playPronunciation(selectedLetter)}
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