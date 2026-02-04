import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, Trophy, Puzzle, Pencil, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MatchingWorksheet } from "./MatchingWorksheet";
import { IdentificationQuiz } from "./IdentificationQuiz";

type WorksheetType = "menu" | "matching" | "quiz";

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
];

export function WorksheetSection() {
  const [activeWorksheet, setActiveWorksheet] = useState<WorksheetType>("menu");

  const renderContent = () => {
    switch (activeWorksheet) {
      case "matching":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              variant="ghost"
              onClick={() => setActiveWorksheet("menu")}
              className="mb-4 rounded-full font-devanagari"
            >
              ← मागे जा
            </Button>
            <MatchingWorksheet />
          </motion.div>
        );
      case "quiz":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              variant="ghost"
              onClick={() => setActiveWorksheet("menu")}
              className="mb-4 rounded-full font-devanagari"
            >
              ← मागे जा
            </Button>
            <IdentificationQuiz />
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
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-kid-pink/20 via-kid-purple/20 to-kid-teal/20 rounded-full px-8 py-4 mb-4">
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
              </div>
              <p className="text-muted-foreground font-devanagari text-lg">
                🌟 खेळा आणि शिका! 🌟
              </p>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute left-4 top-1/4 text-4xl animate-bounce-slow">🎈</div>
            <div className="absolute right-8 top-1/3 text-3xl animate-float">⭐</div>
            <div className="absolute left-1/4 bottom-1/4 text-3xl animate-wiggle">🦋</div>

            {/* Worksheet cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {worksheetItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveWorksheet(item.id as WorksheetType)}
                  className={`
                    relative overflow-hidden rounded-3xl p-6 text-left text-white
                    ${item.color} shadow-playful transition-all duration-300
                  `}
                >
                  {/* Background decorations */}
                  <div className="absolute top-3 right-3 w-16 h-16 rounded-full bg-white/10" />
                  <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-white/10" />
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/5" />

                  {/* Floating emoji */}
                  <motion.div
                    className="absolute top-4 right-4 text-5xl"
                    animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {item.emoji}
                  </motion.div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                        <item.icon className="w-6 h-6" />
                      </div>
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
              className="mt-8 bg-gradient-to-r from-kid-yellow/30 via-kid-orange/30 to-kid-pink/30 rounded-3xl p-6 text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-6 h-6 text-kid-orange" />
                <h3 className="text-xl font-bold font-devanagari">
                  आजचा मजा तथ्य
                </h3>
                <Sparkles className="w-6 h-6 text-kid-orange" />
              </div>
              <p className="font-devanagari text-lg text-foreground/80">
                🎉 मराठी भाषेत १३ स्वर आणि ३६ व्यंजन आहेत! 🎉
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
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl"
              >
                🏆
              </motion.div>
              <p className="font-devanagari text-muted-foreground">
                शिकत रहा, खेळत रहा!
              </p>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
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
