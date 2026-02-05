import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Eraser, RotateCcw, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TracingCanvasProps {
  letter: string;
  onComplete?: () => void;
}

const colors = [
  { name: "केशरी", value: "#f97316" },
  { name: "गुलाबी", value: "#ec4899" },
  { name: "निळा", value: "#3b82f6" },
  { name: "हिरवा", value: "#22c55e" },
  { name: "जांभळा", value: "#a855f7" },
  { name: "लाल", value: "#ef4444" },
];

export function TracingCanvas({ letter, onComplete }: TracingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState(colors[0].value);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const drawGuideLetter = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw guide letter (large, faded)
    ctx.font = "bold 200px 'Noto Sans Devanagari', sans-serif";
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter, canvas.width / 2, canvas.height / 2);

    // Draw dotted outline
    ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 8]);
    ctx.strokeText(letter, canvas.width / 2, canvas.height / 2);
    ctx.setLineDash([]);
  }, [letter]);

  useEffect(() => {
    drawGuideLetter();
  }, [drawGuideLetter]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    if (!coords) return;

    setIsDrawing(true);
    lastPoint.current = coords;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || !lastPoint.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const coords = getCoordinates(e);
    if (!coords) return;

    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    lastPoint.current = coords;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPoint.current = null;
  };

  const clearCanvas = () => {
    drawGuideLetter();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <motion.canvas
          ref={canvasRef}
          width={320}
          height={320}
          className="tracing-canvas border-4 border-dashed border-primary/30 rounded-3xl bg-card shadow-card"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
        
        {/* Letter indicator */}
        <motion.div
          className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-primary shadow-playful flex items-center justify-center"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-2xl font-devanagari font-bold text-primary-foreground">
            {letter}
          </span>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={clearCanvas}
          className="rounded-full h-12 w-12"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="rounded-full h-12 w-12"
            style={{ borderColor: currentColor }}
          >
            <Palette className="h-5 w-5" style={{ color: currentColor }} />
          </Button>

          {showColorPicker && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-card p-3 rounded-2xl shadow-hover flex gap-2"
            >
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => {
                    setCurrentColor(color.value);
                    setShowColorPicker(false);
                  }}
                  className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                    currentColor === color.value ? "ring-2 ring-offset-2 ring-foreground" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </motion.div>
          )}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={clearCanvas}
          className="rounded-full h-12 w-12"
        >
          <Eraser className="h-5 w-5" />
        </Button>
      </div>

      <p className="text-sm text-muted-foreground font-devanagari">
        बोटाने किंवा माउसने अक्षर काढा
      </p>
    </div>
  );
}
