"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { DollarSign, Coins, RefreshCw, TrendingUp, Info, Check, ShieldCheck, Lock, Unlock, KeyRound, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ExchangeRateTicker() {
  const { exchangeRates, updateRates, isAdminMode, setAdminMode } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [customTHB, setCustomTHB] = useState(exchangeRates.THB.toString());
  const [customUSD, setCustomUSD] = useState(exchangeRates.USD.toString());
  const [isSaved, setIsSaved] = useState(false);

  // Security PIN state for Admin Mode
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  const handleAdminToggleClick = () => {
    if (isAdminMode) {
      // If currently unlocked, lock it immediately without PIN
      setAdminMode(false);
      setIsEditing(false);
    } else {
      // Must authenticate to enter admin mode
      setPinInput("");
      setPinError("");
      setShowPinModal(true);
    }
  };

  const handleRateAdjustClick = () => {
    if (!isAdminMode) {
      setPinInput("");
      setPinError("");
      setShowPinModal(true);
    } else {
      setIsEditing(!isEditing);
    }
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    // Master staff PIN: 6789 (also accept admin, 8888, 123456)
    const validPins = ["6789", "admin", "8888", "123456"];
    if (validPins.includes(pinInput.trim())) {
      setAdminMode(true);
      setShowPinModal(false);
      setPinInput("");
      setPinError("");
    } else {
      setPinError("ລະຫັດ PIN ບໍ່ຖືກຕ້ອງ! ຂໍສະຫງວນສິດສະເພາະເຈົ້າໜ້າທີ່ພາຍໃນ (PIN ເລີ່ມຕົ້ນ: 6789)");
    }
  };

  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    const thb = parseFloat(customTHB);
    const usd = parseFloat(customUSD);
    if (!isNaN(thb) && !isNaN(usd) && thb > 0 && usd > 0) {
      updateRates({ THB: thb, USD: usd });
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        setIsEditing(false);
      }, 1200);
    }
  };

  const handleReset = () => {
    updateRates({ THB: 650, USD: 22000 });
    setCustomTHB("650");
    setCustomUSD("22000");
    setIsEditing(false);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/30 p-4 md:p-5 text-white shadow-xl shadow-emerald-950/20 mb-6">
      {/* Background Ambient Glows */}
      <div className="absolute -top-12 -left-12 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Left Side: Title & Live Pulse */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex-shrink-0 shadow-inner">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-black tracking-wider text-emerald-400 uppercase">
                ອັດຕາແລກປ່ຽນອອນໄລປັດຈຸບັນ (Live FX Rates)
              </span>
              <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                {exchangeRates.lastUpdated}
              </span>
            </div>
            <h2 className="text-sm md:text-base font-extrabold text-white mt-0.5">
              ອັດຕາແລກປ່ຽນອ້າງອີງສາກົນ ບາດ (THB) &amp; ໂດລາ (USD) ➡️ ແປງເປັນເງິນກີບ (LAK) Real-Time
            </h2>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              *ລາຄາສິນຄ້າທັງໝົດໃນລະບົບກຳນົດຕາມສະກຸນເງິນອ້າງອີງ ບາດ ແລະ ໂດລາ, ຄິດໄລ່ເປັນເງິນກີບອັດຕະໂນມັດຕາມອັດຕາແລກປ່ຽນຕະຫຼາດ
            </p>
          </div>
        </div>

        {/* Center / Right Side: Active Rate Badges */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          
          {/* THB Card */}
          <div className="flex-1 sm:flex-initial bg-slate-900/90 border border-white/10 hover:border-emerald-500/50 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-md transition-all">
            <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 font-black text-xs flex items-center justify-center border border-blue-500/30">
              ฿
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">1 ບາດໄທ (THB)</div>
              <div className="text-sm md:text-base font-black font-mono text-white flex items-baseline gap-1">
                <span>≈ {exchangeRates.THB.toLocaleString()}</span>
                <span className="text-xs text-emerald-400 font-sans">ກີບ (LAK)</span>
              </div>
            </div>
          </div>

          {/* USD Card */}
          <div className="flex-1 sm:flex-initial bg-slate-900/90 border border-white/10 hover:border-emerald-500/50 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-md transition-all">
            <div className="w-7 h-7 rounded-lg bg-emerald-600/20 text-emerald-400 font-black text-xs flex items-center justify-center border border-emerald-500/30">
              $
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">1 ໂດລາສະຫະລັດ (USD)</div>
              <div className="text-sm md:text-base font-black font-mono text-white flex items-baseline gap-1">
                <span>≈ {exchangeRates.USD.toLocaleString()}</span>
                <span className="text-xs text-emerald-400 font-sans">ກີບ (LAK)</span>
              </div>
            </div>
          </div>

          {/* Staff Lock / Admin Cost Intelligence Toggle */}
          <button
            type="button"
            onClick={handleAdminToggleClick}
            className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
              isAdminMode
                ? "bg-amber-500/25 border-amber-500/60 text-amber-300 hover:bg-rose-500/20 hover:border-rose-500/40 hover:text-rose-300 shadow-lg shadow-amber-500/10"
                : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-400 hover:text-slate-200"
            }`}
            title={isAdminMode ? "ຄລິກເພື່ອລັອກ ແລະ ກັບສູ່ມຸມມອງລູກຄ້າ" : "ສຳລັບເຈົ້າໜ້າທີ່ພາຍໃນ (Admin Only)"}
          >
            {isAdminMode ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>🔐 ໂໝດແອັດມີນ</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>ພະນັກງານ</span>
              </>
            )}
          </button>

          {/* Rate Adjustment Trigger Button (Protected) */}
          <button
            type="button"
            onClick={handleRateAdjustClick}
            className="px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            title={isAdminMode ? "ປັບແຕ່ງອັດຕາແລກປ່ຽນອອນໄລ" : "ສຳລັບແອັດມີນປັບອັດຕາ"}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isEditing ? 'text-emerald-400 rotate-180 transition-transform' : ''}`} />
            <span className="hidden sm:inline">ປັບອັດຕາ</span>
          </button>
        </div>
      </div>

      {/* Collapsible Rate Editor / Custom Calculator (Admin Only) */}
      <AnimatePresence>
        {isEditing && isAdminMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSaveRates} className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300">1 ບາດ (THB):</span>
                <input
                  type="number"
                  step="1"
                  value={customTHB}
                  onChange={(e) => setCustomTHB(e.target.value)}
                  className="w-24 h-9 rounded-lg bg-slate-950 border border-white/15 px-2.5 text-xs font-mono font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
                <span className="text-xs text-slate-400">ກີບ</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300">1 USD:</span>
                <input
                  type="number"
                  step="10"
                  value={customUSD}
                  onChange={(e) => setCustomUSD(e.target.value)}
                  className="w-28 h-9 rounded-lg bg-slate-950 border border-white/15 px-2.5 text-xs font-mono font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
                <span className="text-xs text-slate-400">ກີບ</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  {isSaved ? <Check className="w-3.5 h-3.5" /> : null}
                  <span>{isSaved ? "ບັນທຶກແລ້ວ!" : "ບັນທຶກອັດຕາໃໝ່"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="h-9 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  ຄ່າເລີ່ມຕົ້ນ (650 / 22,000)
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔐 Admin & Staff PIN Verification Modal */}
      <AnimatePresence>
        {showPinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-sm rounded-2xl bg-slate-900 border border-amber-500/40 p-5 shadow-2xl text-white relative"
            >
              <button
                type="button"
                onClick={() => setShowPinModal(false)}
                className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">ຢືນຢັນສິດທິພະນັກງານ</h3>
                  <p className="text-xs text-amber-400/90 font-medium">Staff &amp; Admin PIN Verification</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                ໂຄງສ້າງຕົ້ນທຶນໂຮງງານ ແລະ ກຳໄລພາຍໃນ ສະຫງວນສິດສະເພາະເຈົ້າໜ້າທີ່. ກະລຸນາໃສ່ລະຫັດ PIN ເພື່ອປົດລັອກ:
              </p>

              <form onSubmit={handleVerifyPin} className="space-y-3">
                <div>
                  <input
                    type="password"
                    autoFocus
                    placeholder="ໃສ່ລະຫັດ PIN (ເຊັ່ນ: 6789)"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      if (pinError) setPinError("");
                    }}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-amber-500/40 text-sm font-mono text-center tracking-widest text-amber-300 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                  />
                  {pinError && (
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] text-rose-400">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{pinError}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 h-10 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>ປົດລັອກໂໝດແອັດມີນ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPinModal(false)}
                    className="h-10 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors"
                  >
                    ຍົກເລີກ
                  </button>
                </div>

                <p className="text-[10px] text-center text-slate-500 pt-1">
                  *ລະຫັດເລີ່ມຕົ້ນສຳລັບເຈົ້າໜ້າທີ່ພາຍໃນ: <span className="text-slate-400 font-mono">6789</span>
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
