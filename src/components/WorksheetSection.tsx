import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, Puzzle, BookOpen, PenLine, ArrowLeft, Hash, Image, Printer, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MatchingWorksheet } from "./MatchingWorksheet";
import { IdentificationQuiz } from "./IdentificationQuiz";
import { FillInBlanks } from "./FillInBlanks";
import { CountingGame } from "./CountingGame";
import { PictureMatch } from "./PictureMatch";

type WorksheetType = "menu" | "matching" | "quiz" | "fillblanks" | "counting" | "picturematch";

const worksheetItems = [
  {
    id: "matching",
    title: "जोड्या लावा",
    description: "अक्षर आणि चित्र जोडा",
    icon: Puzzle,
    color: "bg-kid-pink",
    emoji: "🧩",
  },
  {
    id: "quiz",
    title: "अक्षर ओळखा",
    description: "आवाज ऐकून अक्षर निवडा",
    icon: BookOpen,
    color: "bg-kid-teal",
    emoji: "🎯",
  },
  {
    id: "fillblanks",
    title: "रिकाम्या जागा भरा",
    description: "योग्य अक्षर निवडा",
    icon: PenLine,
    color: "bg-kid-orange",
    emoji: "✏️",
  },
  {
    id: "counting",
    title: "मोजणी खेळ",
    description: "चित्र मोजा आणि अंक निवडा",
    icon: Hash,
    color: "bg-kid-purple",
    emoji: "🔢",
  },
  {
    id: "picturematch",
    title: "चित्र ओळखा",
    description: "चित्र बघा आणि अक्षर निवडा",
    icon: Image,
    color: "bg-kid-green",
    emoji: "🖼️",
  },
];

export function WorksheetSection() {
  const [activeWorksheet, setActiveWorksheet] = useState<WorksheetType>("menu");

  const handlePrintWorksheet = () => {
    window.print();
  };

  const renderBackButton = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center justify-between mb-4"
    >
      <Button
        variant="ghost"
        onClick={() => setActiveWorksheet("menu")}
        className="rounded-full font-devanagari gap-2 hover:bg-primary/10"
      >
        <ArrowLeft className="w-4 h-4" />
        मागे जा
      </Button>
      <Button
        variant="outline"
        onClick={handlePrintWorksheet}
        className="rounded-full font-devanagari gap-2"
      >
        <Printer className="w-4 h-4" />
        प्रिंट करा
      </Button>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeWorksheet) {
      case "matching":
        return (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            {renderBackButton()}
            <MatchingWorksheet />
          </motion.div>
        );
      case "quiz":
        return (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            {renderBackButton()}
            <IdentificationQuiz />
          </motion.div>
        );
      case "fillblanks":
        return (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            {renderBackButton()}
            <FillInBlanks />
          </motion.div>
        );
      case "counting":
        return (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            {renderBackButton()}
            <CountingGame />
          </motion.div>
        );
      case "picturematch":
        return (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            {renderBackButton()}
            <PictureMatch />
          </motion.div>
        );
      default:
        return (
          <div className="max-w-4xl mx-auto">
            {/* Fun header - like reference site */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <motion.div 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-kid-pink/20 via-kid-purple/20 to-kid-teal/20 rounded-full px-8 py-4 mb-4"
              >
                <span className="text-3xl">✏️</span>
                <h2 className="text-2xl md:text-3xl font-bold font-devanagari text-gradient">
                  मराठी कार्यपत्रके
                </h2>
                <span className="text-3xl">📚</span>
              </motion.div>
              <p className="text-muted-foreground font-devanagari text-lg">
                🌟 खेळा आणि शिका! 🌟
              </p>
            </motion.div>

            {/* Progress indicator like reference site */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex justify-center items-center gap-4 mb-6"
            >
              <Button
                variant="default"
                onClick={handlePrintWorksheet}
                className="rounded-full gap-2 font-devanagari bg-kid-teal hover:bg-kid-teal/90"
              >
                <Printer className="w-4 h-4" />
                प्रिंट करा
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="rounded-full gap-2 font-devanagari"
              >
                <RotateCcw className="w-4 h-4" />
                रीसेट
              </Button>
            </motion.div>

            {/* Worksheet cards - styled like reference */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
              {worksheetItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveWorksheet(item.id as WorksheetType)}
                  className={`
                    relative overflow-hidden rounded-3xl p-6 text-left text-white
                    ${item.color} shadow-card transition-shadow duration-200 hover:shadow-hover
                  `}
                >
                  {/* Background decorations */}
                  <div className="absolute top-3 right-3 w-14 h-14 rounded-full bg-white/15" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 rounded-full bg-white/10" />
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-full bg-white/5" />

                  {/* Floating emoji */}
                  <motion.div
                    className="absolute top-4 right-4 text-4xl"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    {item.emoji}
                  </motion.div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/25 flex items-center justify-center">
                        <item.icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold font-devanagari mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/80 font-devanagari text-sm">
                      {item.description}
                    </p>

                    {/* Stars decoration */}
                    <div className="flex gap-1 mt-3">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-white/50 text-white/50" />
                      ))}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Fun facts section - styled like reference */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-gradient-to-r from-kid-yellow/30 via-kid-orange/30 to-kid-pink/30 rounded-3xl p-6 text-center relative overflow-hidden"
            >
              <div className="flex items-center justify-center gap-2 mb-2 relative z-10">
                <Sparkles className="w-5 h-5 text-kid-orange" />
                <h3 className="text-lg font-bold font-devanagari">
                  आजचा मजा तथ्य
                </h3>
                <Sparkles className="w-5 h-5 text-kid-orange" />
              </div>
              <p className="font-devanagari text-base text-foreground/80 relative z-10">
                🎉 मराठी भाषेत १६ स्वर आणि ३६ व्यंजन आहेत! 🎉
              </p>
            </motion.div>

            {/* Encouragement banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 flex items-center justify-center gap-4 text-center"
            >
              <span className="text-2xl">🏆</span>
              <p className="font-devanagari text-muted-foreground text-base">
                शिकत रहा, खेळत रहा!
              </p>
              <span className="text-2xl">🌈</span>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </div>
  );
}