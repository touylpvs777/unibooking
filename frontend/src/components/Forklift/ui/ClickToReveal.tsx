import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import { Button } from "@/components/Forklift/ui/button";

interface ClickToRevealProps {
  children: React.ReactNode;
  isLo: boolean;
  buttonTextLo?: string;
  buttonTextEn?: string;
}

export function ClickToReveal({ 
  children, 
  isLo, 
  buttonTextLo = "ຄລິກເພື່ອເບິ່ງໂປຣໂມຊັ່ນລັບ", 
  buttonTextEn = "Click to Reveal Secret Promo" 
}: ClickToRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Blurred Content */}
      <motion.div
        animate={{
          filter: isRevealed ? "blur(0px)" : "blur(8px)",
          opacity: isRevealed ? 1 : 0.4,
        }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none select-none transition-all"
        style={{ pointerEvents: isRevealed ? "auto" : "none", userSelect: isRevealed ? "auto" : "none" }}
      >
        {children}
      </motion.div>

      {/* Reveal Overlay */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/10 dark:bg-slate-900/40 backdrop-blur-[2px]"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setIsRevealed(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.5)] font-bold text-lg px-8 py-6 rounded-full border border-indigo-400/50 flex items-center gap-2 group"
              >
                <Lock className="w-5 h-5 group-hover:hidden" />
                <Unlock className="w-5 h-5 hidden group-hover:block text-indigo-200" />
                {isLo ? buttonTextLo : buttonTextEn}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
