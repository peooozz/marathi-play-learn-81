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
  const letterMaskRef = useRef<ImageData | null>(null);

  const createLetterMask = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create temporary canvas for mask
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    // Draw solid letter on temp canvas for mask detection
    tempCtx.fillStyle = "#000000";
    tempCtx.font = "bold 220px 'Noto Sans Devanagari', sans-serif";
    tempCtx.textAlign = "center";
    tempCtx.textBaseline = "middle";
    tempCtx.fillText(letter, tempCanvas.width / 2, tempCanvas.height / 2);

    // Store the mask data
    letterMaskRef.current = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  }, [letter]);

  const drawGuideLetter = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas with white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw guide letter (large, faded) - centered
    ctx.font = "bold 220px 'Noto Sans Devanagari', sans-serif";
    ctx.fillStyle = "rgba(200, 200, 200, 0.4)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter, canvas.width / 2, canvas.height / 2);

    // Draw dotted outline for tracing guide
    ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.strokeText(letter, canvas.width / 2, canvas.height / 2);
    ctx.setLineDash([]);

    // Create mask for boundary detection
    createLetterMask();
  }, [letter, createLetterMask]);

  useEffect(() => {
    drawGuideLetter();
  }, [drawGuideLetter]);

  const isPointInLetter = (x: number, y: number): boolean => {
    if (!letterMaskRef.current) return true;
    
    const maskData = letterMaskRef.current;
    const pixelIndex = (Math.floor(y) * maskData.width + Math.floor(x)) * 4;
    
    // Check if pixel is part of the letter (alpha > 0 means it's part of letter)
    // We'll be more lenient - allow drawing within 20px of letter bounds
    const checkRadius = 20;
    for (let dx = -checkRadius; dx <= checkRadius; dx++) {
      for (let dy = -checkRadius; dy <= checkRadius; dy++) {
        const checkX = Math.floor(x + dx);
        const checkY = Math.floor(y + dy);
        if (checkX >= 0 && checkX < maskData.width && checkY >= 0 && checkY < maskData.height) {
          const idx = (checkY * maskData.width + checkX) * 4;
          if (maskData.data[idx + 3] > 0) {
            return true;
          }
        }
      }
    }
    return false;
  };

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

    // Only start drawing if point is within or near the letter
    if (isPointInLetter(coords.x, coords.y)) {
      setIsDrawing(true);
      lastPoint.current = coords;
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || !lastPoint.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const coords = getCoordinates(e);
    if (!coords) return;

    // Only draw if point is within or near the letter boundary
    if (!isPointInLetter(coords.x, coords.y)) {
      return;
    }

    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 18;
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
      <div className="relative flex justify-center">
        <motion.canvas
          ref={canvasRef}
          width={350}
          height={350}
          className="tracing-canvas border-4 border-dashed border-primary/30 rounded-3xl bg-white shadow-card"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
        
        {/* Letter indicator */}
        <motion.div
          className="absolute -top-4 -right-4 w-14 h-14 rounded-2xl bg-primary shadow-playful flex items-center justify-center"
          animate={{ rotate: [0, -3, 3, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-xl font-devanagari font-bold text-primary-foreground">
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
              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-card p-3 rounded-2xl shadow-hover flex gap-2 z-10"
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
        अक्षराच्या आत बोटाने किंवा माउसने गिरवा
      </p>
    </div>
  );
}