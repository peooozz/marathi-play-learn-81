import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Pencil, FileText, Hash, ChevronDown, Volume2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LetterCard } from "@/components/LetterCard";
import { TracingCanvas } from "@/components/TracingCanvas";
import { MatchingWorksheet } from "@/components/MatchingWorksheet";
import { NumbersSection } from "@/components/NumbersSection";
import { swar, vyanjan, MarathiLetter, allLetters } from "@/data/marathiLetters";

type Section = "hero" | "letters" | "tracing" | "worksheet" | "numbers";

const floatingElements = [
  { emoji: "🌟", delay: 0, x: "10%", y: "15%" },
  { emoji: "📚", delay: 0.5, x: "85%", y: "12%" },
  { emoji: "✏️", delay: 1, x: "12%", y: "70%" },
  { emoji: "🎨", delay: 1.5, x: "88%", y: "75%" },
  { emoji: "🌈", delay: 2, x: "50%", y: "8%" },
];

const navItems = [
  { id: "letters" as Section, icon: BookOpen, label: "अक्षरे" },
  { id: "tracing" as Section, icon: Pencil, label: "लिखाण" },
  { id: "worksheet" as Section, icon: FileText, label: "कार्यपत्रक" },
  { id: "numbers" as Section, icon: Hash, label: "अंक" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [selectedLetter, setSelectedLetter] = useState<MarathiLetter>(swar[0]);
  const [showLetterType, setShowLetterType] = useState<"swar" | "vyanjan">("swar");
  
  const sectionsRef = useRef<Record<Section, HTMLElement | null>>({
    hero: null,
    letters: null,
    tracing: null,
    worksheet: null,
    numbers: null,
  });

  const scrollToSection = (section: Section) => {
    setActiveSection(section);
    sectionsRef.current[section]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLetterSelect = (letter: MarathiLetter) => {
    setSelectedLetter(letter);
    // Auto-scroll to tracing section
    setTimeout(() => scrollToSection("tracing"), 300);
  };

  return (
    <div className="min-h-screen gradient-warm overflow-x-hidden">
      {/* Floating decorations */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className="fixed text-4xl pointer-events-none opacity-20 hidden md:block z-0"
          style={{ left: el.x, top: el.y }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {el.emoji}
        </motion.div>
      ))}

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection("hero")}
            >
              <motion.span
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl"
              >
                📚
              </motion.span>
              <h1 className="text-xl md:text-2xl font-bold text-gradient font-devanagari">
                मराठी शिका
              </h1>
            </motion.div>

            {/* Nav Items */}
            <div className="flex items-center gap-1 md:gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => scrollToSection(item.id)}
                  className="rounded-full gap-1 md:gap-2 px-2 md:px-4"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden sm:inline font-devanagari">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={(el) => (sectionsRef.current.hero = el)}
        className="relative py-16 md:py-24 px-4"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-7xl md:text-9xl mb-6"
            >
              📖
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-devanagari">
              <span className="text-gradient">मराठी शिका!</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8 font-devanagari">
              लहान मुलांसाठी मराठी अक्षरे, अंक आणि शब्द शिकण्याचा मजेदार मार्ग!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("letters")}
                className="rounded-full text-lg px-8 gap-2 shadow-playful font-devanagari"
              >
                <Sparkles className="w-5 h-5" />
                शिकायला सुरुवात करा
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("worksheet")}
                className="rounded-full text-lg px-8 gap-2 font-devanagari"
              >
                <FileText className="w-5 h-5" />
                कार्यपत्रक
              </Button>
            </div>
          </motion.div>

          {/* Preview letters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {swar.slice(0, 6).map((letter, i) => (
                <motion.div
                  key={letter.letter}
                  whileHover={{ scale: 1.1, rotate: [-5, 5, 0] }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  onClick={() => {
                    setSelectedLetter(letter);
                    scrollToSection("letters");
                  }}
                  className="w-14 h-14 md:w-18 md:h-18 rounded-2xl bg-card shadow-card flex items-center justify-center cursor-pointer hover:shadow-hover transition-all"
                >
                  <span className="text-2xl md:text-3xl font-devanagari font-bold text-primary">
                    {letter.letter}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={() => scrollToSection("letters")}
              className="mt-6 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-devanagari"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span>सर्व अक्षरे पहा</span>
              <ChevronDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Letters Section */}
      <section
        ref={(el) => (sectionsRef.current.letters = el)}
        className="py-16 px-4 bg-card/50"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-devanagari text-gradient mb-2">
              अक्षरे शिका
            </h2>
            <p className="text-muted-foreground font-devanagari">
              अक्षरावर क्लिक करा आणि उच्चार ऐका
            </p>
          </motion.div>

          {/* Letter type toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={showLetterType === "swar" ? "default" : "outline"}
              onClick={() => setShowLetterType("swar")}
              className="rounded-full font-devanagari"
            >
              स्वर ({swar.length})
            </Button>
            <Button
              variant={showLetterType === "vyanjan" ? "default" : "outline"}
              onClick={() => setShowLetterType("vyanjan")}
              className="rounded-full font-devanagari"
            >
              व्यंजन ({vyanjan.length})
            </Button>
          </div>

          {/* Letters grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={showLetterType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4"
            >
              {(showLetterType === "swar" ? swar : vyanjan).map((letter, index) => (
                <LetterCard
                  key={letter.letter}
                  letter={letter}
                  index={index}
                  onSelect={handleLetterSelect}
                  isSelected={selectedLetter.letter === letter.letter}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Tracing Section */}
      <section
        ref={(el) => (sectionsRef.current.tracing = el)}
        className="py-16 px-4"
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-devanagari text-gradient mb-2">
              लिहायला शिका
            </h2>
            <p className="text-muted-foreground font-devanagari">
              अक्षर काढण्याचा सराव करा
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* Letter selector */}
            <div className="flex flex-wrap justify-center gap-2 lg:flex-col lg:max-h-96 lg:overflow-y-auto lg:pr-4">
              {allLetters.slice(0, 20).map((letter) => (
                <motion.button
                  key={letter.letter}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedLetter(letter)}
                  className={`
                    w-12 h-12 rounded-xl font-devanagari text-xl font-bold transition-all
                    ${
                      selectedLetter.letter === letter.letter
                        ? "bg-primary text-primary-foreground shadow-playful"
                        : "bg-card border-2 border-border hover:border-primary"
                    }
                  `}
                >
                  {letter.letter}
                </motion.button>
              ))}
            </div>

            {/* Tracing canvas */}
            <TracingCanvas letter={selectedLetter.letter} />
          </div>
        </div>
      </section>

      {/* Worksheet Section */}
      <section
        ref={(el) => (sectionsRef.current.worksheet = el)}
        className="py-16 px-4 bg-card/50"
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-devanagari text-gradient mb-2">
              जोड्या लावा
            </h2>
            <p className="text-muted-foreground font-devanagari">
              अक्षर आणि चित्र जुळवा
            </p>
          </motion.div>

          <MatchingWorksheet />
        </div>
      </section>

      {/* Numbers Section */}
      <section
        ref={(el) => (sectionsRef.current.numbers = el)}
        className="py-16 px-4"
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-devanagari text-gradient mb-2">
              अंक शिका
            </h2>
            <p className="text-muted-foreground font-devanagari">
              अंकावर क्लिक करा आणि उच्चार ऐका
            </p>
          </motion.div>

          <NumbersSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-card border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-muted-foreground"
          >
            <span className="text-2xl">📚</span>
            <span className="font-devanagari">मराठी शिका - लहान मुलांसाठी</span>
            <span className="text-2xl">❤️</span>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
