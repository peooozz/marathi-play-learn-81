import { motion } from "framer-motion";

// Simplified floating decorations for better performance
const decorations = [
  { emoji: "🦋", x: "5%", y: "10%" },
  { emoji: "🌸", x: "8%", y: "40%" },
  { emoji: "🎈", x: "4%", y: "70%" },
  { emoji: "🌻", x: "92%", y: "15%" },
  { emoji: "🎀", x: "95%", y: "50%" },
  { emoji: "🍀", x: "90%", y: "80%" },
  { emoji: "⭐", x: "85%", y: "8%" },
];

export function FloatingDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {decorations.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl opacity-40"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}
