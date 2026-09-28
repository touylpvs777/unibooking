import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  X,
  Maximize2,
  Minimize2,
  Move,
  Sparkles,
  ExternalLink
} from "lucide-react";

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  titleLo?: string;
  titleEn?: string;
  subtitleLo?: string;
  subtitleEn?: string;
}

export function ImageLightboxModal({
  isOpen,
  onClose,
  src,
  alt,
  titleLo,
  titleEn,
  subtitleLo,
  subtitleEn,
}: ImageLightboxModalProps) {
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom and position whenever a new image opens
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, src]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
      if (e.key === "0") resetZoom();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, scale]);

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3.5));
  };

  const zoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.25, 0.75);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const setPresetScale = (newScale: number) => {
    setScale(newScale);
    if (newScale <= 1) setPosition({ x: 0, y: 0 });
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-between select-none overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Top Control Bar */}
        <div className="w-full bg-slate-900/80 border-b border-white/10 px-4 py-3 flex items-center justify-between z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>2K Ultra-HD (2048px)</span>
            </div>
            <div>
              {titleLo && (
                <h3 className="text-white font-bold text-sm line-clamp-1">
                  {titleLo}
                </h3>
              )}
              {subtitleLo && (
                <p className="text-slate-400 text-xs hidden sm:block line-clamp-1">
                  {subtitleLo}
                </p>
              )}
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            {/* Scale Indicator */}
            <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-xs font-mono text-slate-300 hidden md:block">
              {Math.round(scale * 100)}%
            </div>

            {/* Quick presets */}
            <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 gap-1">
              <button
                onClick={() => setPresetScale(1)}
                className={`px-2 py-1 text-xs rounded font-medium transition-all ${
                  scale === 1
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
                title="ຂະໜາດຈິງ 100%"
              >
                100%
              </button>
              <button
                onClick={() => setPresetScale(1.5)}
                className={`px-2 py-1 text-xs rounded font-medium transition-all ${
                  scale === 1.5
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
                title="ຊູມ 150%"
              >
                150%
              </button>
              <button
                onClick={() => setPresetScale(2)}
                className={`px-2 py-1 text-xs rounded font-medium transition-all ${
                  scale === 2
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
                title="ຊູມ 200%"
              >
                200%
              </button>
            </div>

            {/* Zoom Controls */}
            <button
              onClick={zoomOut}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
              title="ຊູມອອກ (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <button
              onClick={zoomIn}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
              title="ຊູມເຂົ້າ (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <button
              onClick={resetZoom}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
              title="ຣີເຊັດຂະໜາດ"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Download */}
            <a
              href={src}
              download
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
              title="ດາວໂຫຼດພາບ 2K ຕົ້ນສະບັບ"
            >
              <Download className="w-4 h-4" />
            </a>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all hidden md:block"
              title="ເຕັມຈໍ"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 border border-rose-500/30 text-rose-300 hover:text-white transition-all ml-2"
              title="ປິດ (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Viewer Canvas */}
        <div
          className={`relative flex-1 w-full h-full flex items-center justify-center p-4 overflow-hidden ${
            scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"
          }`}
          onMouseDown={handleMouseDown}
          onWheel={handleWheel}
        >
          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging ? "none" : "transform 0.15s ease-out",
            }}
            className="relative max-w-[90vw] max-h-[82vh] w-auto h-auto flex items-center justify-center shadow-2xl rounded-xl overflow-hidden border border-white/10"
          >
            {/* Using native img to preserve 100% raw uncompressed 2K buffer */}
            <img
              src={src}
              alt={alt}
              className="crisp-diagram object-contain max-w-full max-h-[80vh] w-auto h-auto select-none pointer-events-none rounded-lg"
              draggable={false}
            />
          </div>

          {/* Floating Pan Helper when Zoomed */}
          {scale > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 pointer-events-none backdrop-blur-md"
            >
              <Move className="w-3.5 h-3.5 animate-pulse" />
              <span>ຄລິກ ແລະ ລາກເມົ້າເພື່ອເລື່ອນເບິ່ງລາຍລະອຽດ</span>
            </motion.div>
          )}
        </div>

        {/* Bottom Status Bar */}
        <div className="w-full bg-slate-900/60 border-t border-white/5 px-4 py-2 flex items-center justify-between text-xs text-slate-400 z-20 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <span>
              💡 ໃຊ້ <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white">+</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white">-</kbd> ຫຼື Scroll ເມົ້າເພື່ອຊູມ
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">
              ກົດ <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white">Esc</kbd> ເພື່ອປິດ
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-emerald-400 font-mono text-[11px]">2K Native Lossless</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
