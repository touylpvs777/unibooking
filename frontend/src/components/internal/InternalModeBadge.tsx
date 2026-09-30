
import React from "react";
import { useInternalMode } from "./InternalModeContext";
import { ShieldAlert, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function InternalModeBadge() {
  const { isInternal, disableInternalMode } = useInternalMode();

  return (
    <AnimatePresence>
      {isInternal && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-red-600 text-white px-4 py-2 rounded-full shadow-2xl border border-red-400"
        >
          <ShieldAlert className="w-5 h-5 animate-pulse" />
          <span className="font-bold text-sm tracking-wide">INTERNAL SALES MODE</span>
          <button 
            onClick={disableInternalMode}
            className="ml-2 bg-red-800/50 hover:bg-red-800 p-1 rounded-full transition-colors"
            title="Exit Internal Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
