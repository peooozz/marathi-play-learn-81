import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Pencil, FileText, HelpCircle, Volume2, RotateCcw, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlashCard } from "@/components/FlashCard";
import { TracingCanvas } from "@/components/TracingCanvas";
import { MatchingWorksheet } from "@/components/MatchingWorksheet";
import { IdentificationQuiz } from "@/components/IdentificationQuiz";
import { FloatingDecorations } from "@/components/FloatingDecorations";
import { swar, vyanjan, MarathiLetter, allLetters } from "@/data/marathiLetters";
import { Progress } from "@/components/ui/progress";

export default function Index() {
  const [selectedLetter, setSelectedLetter] = useState<MarathiLetter>(swar[0]);
  const [showLetterType, setShowLetterType] = useState<"swar" | "vyanjan">("swar");
  const [worksheetProgress, setWorksheetProgress] = useState(0);

  const handleLetterSelect = (letter: MarathiLetter) => {
    setSelectedLetter(letter);
  };

  return (
    <div className="min-h-screen gradient-warm relative">
      <FloatingDecorations />

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl p-6 shadow-card text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold font-devanagari mb-2">
              अक्षर गिरवायला शिका!
            </h1>
            <p className="text-muted-foreground font-devanagari">
              मराठी अक्षरे गिरवून सराव करा
            </p>
          </motion.div>
        </div>
      </header>

      {/* Rainbow Title */}
      <div className="text-center py-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-5xl font-bold font-devanagari inline-flex items-center gap-3"
        >
          <span className="text-4xl">🌈</span>
          <span className="text-gradient">मराठी मूळाक्षरे शिका!</span>
          <span className="text-4xl">⭐</span>
        </motion.h2>
        <p className="text-muted-foreground font-devanagari mt-2">
          🌟 चित्र आणि उच्चार पाहण्यासाठी अक्षरावर क्लिक करा! 🌟
        </p>
      </div>

      {/* Main Content with Tabs */}
      <main className="relative z-10 px-4 pb-12">
        <div className="container mx-auto max-w-5xl">
          <Tabs defaultValue="flashcards" className="w-full">
            {/* Tab Navigation */}
            <TabsList className="w-full justify-center bg-card/80 backdrop-blur rounded-full p-2 mb-8 shadow-card">
              <TabsTrigger 
                value="flashcards" 
                className="rounded-full px-4 md:px-6 py-3 font-devanagari gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">अक्षरे</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tracing" 
                className="rounded-full px-4 md:px-6 py-3 font-devanagari gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Pencil className="w-4 h-4" />
                <span className="hidden sm:inline">लिखाण</span>
              </TabsTrigger>
              <TabsTrigger 
                value="matching" 
                className="rounded-full px-4 md:px-6 py-3 font-devanagari gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">जोड्या</span>
              </TabsTrigger>
              <TabsTrigger 
                value="quiz" 
                className="rounded-full px-4 md:px-6 py-3 font-devanagari gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <HelpCircle className="w-4 h-4" />
                <span className="hidden sm:inline">प्रश्नमंजुषा</span>
              </TabsTrigger>
            </TabsList>

            {/* Flashcards Tab */}
            <TabsContent value="flashcards" className="mt-0">
              {/* Letter type toggle */}
              <div className="flex justify-center mb-6">
                <div className="bg-card rounded-full p-1 shadow-card inline-flex">
                  <Button
                    variant={showLetterType === "swar" ? "default" : "ghost"}
                    onClick={() => setShowLetterType("swar")}
                    className="rounded-full font-devanagari px-6"
                  >
                    स्वर
                  </Button>
                  <Button
                    variant={showLetterType === "vyanjan" ? "default" : "ghost"}
                    onClick={() => setShowLetterType("vyanjan")}
                    className="rounded-full font-devanagari px-6"
                  >
                    व्यंजन
                  </Button>
                </div>
              </div>

              {/* Letter grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={showLetterType}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3 md:gap-4 max-w-4xl mx-auto"
                >
                  {(showLetterType === "swar" ? swar : vyanjan).map((letter, index) => (
                    <FlashCard
                      key={letter.letter}
                      letter={letter}
                      index={index}
                      onSelect={handleLetterSelect}
                      isSelected={selectedLetter.letter === letter.letter}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Pronunciation hint */}
              <p className="text-center text-sm text-muted-foreground mt-6 font-devanagari">
                💡 टीप: उच्चार ऐकण्यासाठी पुन्हा ऐका बटण दाबा.
              </p>
            </TabsContent>

            {/* Tracing Tab */}
            <TabsContent value="tracing" className="mt-0">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
                  {/* Letter selector */}
                  <div className="w-full lg:w-auto">
                    <h3 className="text-lg font-bold font-devanagari mb-3 text-center lg:text-left">
                      अक्षर निवडा:
                    </h3>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 lg:flex-col lg:max-h-[400px] lg:overflow-y-auto lg:pr-2">
                      {allLetters.slice(0, 24).map((letter, index) => {
                        const colors = ["bg-kid-red", "bg-kid-blue", "bg-kid-orange", "bg-kid-teal", "bg-kid-purple", "bg-kid-pink", "bg-kid-yellow", "bg-kid-green"];
                        const bgColor = colors[index % colors.length];
                        
                        return (
                          <motion.button
                            key={letter.letter}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedLetter(letter)}
                            className={`
                              w-11 h-11 rounded-xl font-devanagari text-lg font-bold transition-all text-white
                              ${selectedLetter.letter === letter.letter
                                ? `${bgColor} ring-2 ring-foreground/30 shadow-playful`
                                : `${bgColor} opacity-70 hover:opacity-100`
                              }
                            `}
                          >
                            {letter.letter}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tracing canvas */}
                  <div className="flex-1 flex justify-center">
                    <TracingCanvas letter={selectedLetter.letter} />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Matching Tab */}
            <TabsContent value="matching" className="mt-0">
              <div className="max-w-4xl mx-auto">
                <MatchingWorksheet />
              </div>
            </TabsContent>

            {/* Quiz Tab */}
            <TabsContent value="quiz" className="mt-0">
              <IdentificationQuiz />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-muted-foreground font-devanagari flex items-center justify-center gap-2">
            <span className="text-2xl">📚</span>
            मराठी शिका - लहान मुलांसाठी
            <span className="text-2xl">❤️</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
