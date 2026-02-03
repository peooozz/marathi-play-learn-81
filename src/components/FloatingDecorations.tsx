import { motion } from "framer-motion";

const decorations = [
  { emoji: "🦋", x: "5%", y: "10%", delay: 0 },
  { emoji: "🌸", x: "8%", y: "40%", delay: 0.5 },
  { emoji: "🎈", x: "4%", y: "70%", delay: 1 },
  { emoji: "🌻", x: "92%", y: "15%", delay: 1.5 },
  { emoji: "🎀", x: "95%", y: "50%", delay: 2 },
  { emoji: "🍀", x: "90%", y: "80%", delay: 2.5 },
  { emoji: "⭐", x: "50%", y: "5%", delay: 0.3 },
  { emoji: "🌈", x: "85%", y: "8%", delay: 1.2 },
];

export function FloatingDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {decorations.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl opacity-40"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: item.delay,
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
