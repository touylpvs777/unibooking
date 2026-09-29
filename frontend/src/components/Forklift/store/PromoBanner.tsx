import React, { useState } from "react";
import { X, Sparkles, ShieldCheck, ArrowRight, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const { i18n } = useTranslation();
  const locale = i18n.language || "lo";
  const isLao = locale === "lo";

  if (!isVisible) return null;

  return (
    <>
    <div style={{height: '100px', backgroundColor: 'yellow', color: 'black', fontSize: '24px'}}>YELLOW BLOCK IN PROMOBANNER</div>
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          className="relative z-30 mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-0.5 shadow-xl shadow-black/20 border border-emerald-500/30"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-teal-500/10 opacity-70 animate-pulse pointer-events-none" />

          <div className="relative flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 rounded-[0.95rem] bg-slate-950/85 backdrop-blur-md">
            {/* Left Content */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                <span className="bg-emerald-600 text-white px-2.5 py-0.5 rounded-md text-[11px] font-black tracking-wider uppercase shadow-sm">
                  🏭 DK LAO 4S B2B
                </span>
                <span className="font-extrabold text-white">
                  {isLao
                    ? "ສູນລົດຟອກລີບ ແລະ ອາໄຫຼ່ແທ້ OEM 16,000+ ລາຍການ (Mitsubishi • Jungheinrich • Nilfisk • JLG)"
                    : "Forklift 4S Hub & 16,000+ OEM Parts (Mitsubishi • Jungheinrich • Nilfisk • JLG)"}
                </span>
                <span className="text-emerald-400 hidden lg:inline font-semibold">
                  &bull; {isLao ? "ຮັບ Volume Discount ພິເສດສຳລັບໃບສັ່ງຊື້ອົງກອນ B2B PO" : "Special Volume Discounts for Corporate B2B POs"}
                </span>
              </div>
            </div>

            {/* Right Action & Close Button */}
            <div className="flex items-center gap-3">
              <a
                href={
                  isLao
                    ? "https://wa.me/8562058929299?text=ສະບາຍດີ%20ຕ້ອງການສອບຖາມໃບສະເໜີລາຄາ%20B2B%20PO%20ສຳລັບອົງກອນ"
                    : "https://wa.me/8562058929299?text=Hello%2C%20I%20would%20like%20to%20request%20a%20Corporate%20B2B%20PO%20quotation"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-900/40"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isLao ? "ຂໍໃບສະເໜີລາຄາ B2B" : "Request B2B Quote"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setIsVisible(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title={isLao ? "ປິດ" : "Close"}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

