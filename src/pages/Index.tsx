import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, FileText, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlashCard } from "@/components/FlashCard";
import { WorksheetSection } from "@/components/WorksheetSection";
import { TracingSection } from "@/components/TracingSection";
import { FloatingDecorations } from "@/components/FloatingDecorations";
import { LetterDetailModal } from "@/components/LetterDetailModal";
import { swar, vyanjan, MarathiLetter } from "@/data/marathiLetters";
import { speakMarathi } from "@/lib/marathiSpeech";

export default function Index() {
  const [showLetterType, setShowLetterType] = useState<"swar" | "vyanjan">("swar");
  const [isTracingOpen, setIsTracingOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<MarathiLetter | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLetterClick = (letter: MarathiLetter) => {
    setSelectedLetter(letter);
    setIsModalOpen(true);
    
    // Play proper Marathi female pronunciation
    speakMarathi(letter.letter, { rate: 0.4, pitch: 1.2 });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLetter(null);
  };

  return (
    <div className="min-h-screen gradient-warm relative">
      <FloatingDecorations />

      {/* Header with Tracing Button */}
      <header className="relative z-10 pt-8 pb-4 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.button
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setIsTracingOpen(true)}
            className="w-full bg-card rounded-3xl p-6 shadow-card text-center cursor-pointer hover:shadow-hover transition-all duration-200 border-2 border-transparent hover:border-primary/30"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-3xl">✏️</span>
              <h1 className="text-3xl md:text-4xl font-bold font-devanagari">
                अक्षर गिरवायला शिका!
              </h1>
              <span className="text-3xl">📝</span>
            </div>
            <p className="text-muted-foreground font-devanagari flex items-center justify-center gap-2">
              <Pencil className="w-4 h-4" />
              मराठी अक्षरे गिरवून सराव करा - येथे क्लिक करा
            </p>
          </motion.button>
        </div>
      </header>

      {/* Tracing Section Modal */}
      <TracingSection isOpen={isTracingOpen} onClose={() => setIsTracingOpen(false)} />
      
      {/* Letter Detail Modal */}
      <LetterDetailModal 
        letter={selectedLetter} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />

      {/* Rainbow Title */}
      <div className="text-center py-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-5xl font-bold font-devanagari inline-flex items-center gap-3"
        >
          <span className="text-4xl">🌈</span>
          <span className="text-gradient">मराठी मूळाक्षरे शिका!</span>
          <span className="text-4xl">⭐</span>
        </motion.h2>
        <motion.p 
          className="text-muted-foreground font-devanagari mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          🌟 चित्र आणि उच्चार पाहण्यासाठी अक्षरावर क्लिक करा! 🌟
        </motion.p>
      </div>

      {/* Main Content with Tabs */}
      <main className="relative z-10 px-4 pb-12">
        <div className="container mx-auto max-w-5xl">
          <Tabs defaultValue="flashcards" className="w-full">
            {/* Tab Navigation */}
            <TabsList className="w-full justify-center bg-card/80 backdrop-blur rounded-full p-2 mb-8 shadow-card">
              <TabsTrigger 
                value="flashcards" 
                className="rounded-full px-6 md:px-8 py-3 font-devanagari gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <BookOpen className="w-4 h-4" />
                <span>अक्षरे</span>
              </TabsTrigger>
              <TabsTrigger 
                value="worksheets" 
                className="rounded-full px-6 md:px-8 py-3 font-devanagari gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <FileText className="w-4 h-4" />
                <span>कार्यपत्रके</span>
              </TabsTrigger>
            </TabsList>

            {/* Flashcards Tab */}
            <TabsContent value="flashcards" className="mt-0">
              {/* Letter type toggle */}
              <div className="flex justify-center mb-6">
                <motion.div 
                  className="bg-card rounded-full p-1 shadow-card inline-flex"
                  whileHover={{ scale: 1.01 }}
                >
                  <Button
                    variant={showLetterType === "swar" ? "default" : "ghost"}
                    onClick={() => setShowLetterType("swar")}
                    className="rounded-full font-devanagari px-6"
                  >
                    स्वर ({swar.length})
                  </Button>
                  <Button
                    variant={showLetterType === "vyanjan" ? "default" : "ghost"}
                    onClick={() => setShowLetterType("vyanjan")}
                    className="rounded-full font-devanagari px-6"
                  >
                    व्यंजन ({vyanjan.length})
                  </Button>
                </motion.div>
              </div>

              {/* Letter grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={showLetterType}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3 md:gap-4 max-w-4xl mx-auto"
                >
                  {(showLetterType === "swar" ? swar : vyanjan).map((letter, index) => (
                    <FlashCard
                      key={letter.letter}
                      letter={letter}
                      index={index}
                      onClick={() => handleLetterClick(letter)}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            {/* Worksheets Tab */}
            <TabsContent value="worksheets" className="mt-0">
              <WorksheetSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}