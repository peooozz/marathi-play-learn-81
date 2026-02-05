import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, Puzzle, BookOpen, PenLine, ArrowLeft, Hash, Image } from "lucide-react";
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

  const renderBackButton = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Button
        variant="ghost"
        onClick={() => setActiveWorksheet("menu")}
        className="mb-4 rounded-full font-devanagari gap-2 hover:bg-primary/10"
      >
        <ArrowLeft className="w-4 h-4" />
        मागे जा
      </Button>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeWorksheet) {
      case "matching":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {renderBackButton()}
            <MatchingWorksheet />
          </motion.div>
        );
      case "quiz":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {renderBackButton()}
            <IdentificationQuiz />
          </motion.div>
        );
      case "fillblanks":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {renderBackButton()}
            <FillInBlanks />
          </motion.div>
        );
      case "counting":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {renderBackButton()}
            <CountingGame />
          </motion.div>
        );
      case "picturematch":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {renderBackButton()}
            <PictureMatch />
          </motion.div>
        );
      default:
        return (
          <div className="max-w-4xl mx-auto">
            {/* Fun header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <motion.div 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-kid-pink/20 via-kid-purple/20 to-kid-teal/20 rounded-full px-8 py-4 mb-4"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  ✏️
                </motion.span>
                <h2 className="text-2xl md:text-3xl font-bold font-devanagari text-gradient">
                  मराठी कार्यपत्रके
                </h2>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-4xl"
                >
                  📚
                </motion.span>
              </motion.div>
              <p className="text-muted-foreground font-devanagari text-lg">
                🌟 खेळा आणि शिका! 🌟
              </p>
            </motion.div>

            {/* Decorative floating elements */}
            <motion.div 
              className="absolute left-4 top-1/4 text-4xl"
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🎈
            </motion.div>
            <motion.div 
              className="absolute right-8 top-1/3 text-3xl"
              animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              ⭐
            </motion.div>
            <motion.div 
              className="absolute left-1/4 bottom-1/4 text-3xl"
              animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🦋
            </motion.div>
            <motion.div 
              className="absolute right-1/4 bottom-1/3 text-3xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              🌈
            </motion.div>

            {/* Worksheet cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {worksheetItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 30, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    rotate: [0, -2, 2, 0],
                    transition: { rotate: { duration: 0.3 } }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveWorksheet(item.id as WorksheetType)}
                  className={`
                    relative overflow-hidden rounded-3xl p-6 text-left text-white
                    ${item.color} shadow-playful transition-shadow duration-300 hover:shadow-hover
                  `}
                >
                  {/* Background decorations */}
                  <motion.div 
                    className="absolute top-3 right-3 w-16 h-16 rounded-full bg-white/15"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-white/10" />
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/5" />

                  {/* Floating emoji */}
                  <motion.div
                    className="absolute top-4 right-4 text-5xl"
                    animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {item.emoji}
                  </motion.div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div 
                        className="w-12 h-12 rounded-2xl bg-white/25 flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className="w-6 h-6" />
                      </motion.div>
                    </div>

                    <h3 className="text-2xl font-bold font-devanagari mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/80 font-devanagari">
                      {item.description}
                    </p>

                    {/* Stars decoration */}
                    <div className="flex gap-1 mt-4">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                        >
                          <Star className="w-5 h-5 fill-white/50 text-white/50" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Fun facts section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 bg-gradient-to-r from-kid-yellow/30 via-kid-orange/30 to-kid-pink/30 rounded-3xl p-6 text-center relative overflow-hidden"
            >
              <motion.div
                className="absolute -top-4 -left-4 text-6xl opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                ⭐
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 text-6xl opacity-20"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                🌟
              </motion.div>
              
              <div className="flex items-center justify-center gap-2 mb-3 relative z-10">
                <Sparkles className="w-6 h-6 text-kid-orange" />
                <h3 className="text-xl font-bold font-devanagari">
                  आजचा मजा तथ्य
                </h3>
                <Sparkles className="w-6 h-6 text-kid-orange" />
              </div>
              <p className="font-devanagari text-lg text-foreground/80 relative z-10">
                🎉 मराठी भाषेत १६ स्वर आणि ३६ व्यंजन आहेत! 🎉
              </p>
            </motion.div>

            {/* Encouragement banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center justify-center gap-4 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl"
              >
                🏆
              </motion.div>
              <p className="font-devanagari text-muted-foreground text-lg">
                शिकत रहा, खेळत रहा!
              </p>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl"
              >
                🌈
              </motion.div>
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
