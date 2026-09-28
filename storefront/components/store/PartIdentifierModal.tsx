"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Camera, MessageCircle, HelpCircle, CheckCircle2, ArrowRight, ShieldCheck, FileText, Smartphone, Wrench, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PartIdentifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSearchCriteria: (query: string, subsystem?: string) => void;
}

const SAMPLE_CHASSIS_LOOKUPS: { [key: string]: { model: string; engine: string; catalogQuery: string; desc: string } } = {
  "8FD25": {
    model: "Toyota Forklift 8FD25 (2.5 Ton Diesel)",
    engine: "Toyota 1DZ-II (2,486 cc)",
    catalogQuery: "Toyota 8FD",
    desc: "ລົດຍົກດີເຊວ 2.5 ໂຕນ ລຸ້ນຍອດນິຍົມ ໃຊ້ຢາງໜ້າ 28x9-15, ກອງນ້ຳມັນ 15601-76008-71"
  },
  "8FD30": {
    model: "Toyota Forklift 8FD30 (3.0 Ton Diesel)",
    engine: "Toyota 1DZ-II (2,486 cc) / 2Z",
    catalogQuery: "Toyota 8FD",
    desc: "ລົດຍົກດີເຊວ 3.0 ໂຕນ Heavy Duty ໃຊ້ປ້ຳໄຮໂດຣລິກ 67110-36880-71"
  },
  "FD25-16": {
    model: "Komatsu Forklift FD25-16 / FD25-17",
    engine: "Komatsu 4D94LE / Yanmar 4TNE98",
    catalogQuery: "Komatsu FD",
    desc: "ລົດຍົກ ໂຄມັດສຸ 2.5 ໂຕນ ໃຊ້ກອງເຄື່ອງ 129150-35153, ໃບພັດລົມ 8 ໃບ"
  },
  "FD30-17": {
    model: "Komatsu Forklift FD30-17 (3.0 Ton)",
    engine: "Komatsu 4D98E Yanmar Diesel",
    catalogQuery: "Komatsu FD",
    desc: "ລົດຍົກ ໂຄມັດສຸ 3.0 ໂຕນ ໃຊ້ປ້ຳແຍັກ Zexel/Bosch ແລະ ຊຸດຄລັດ"
  },
  "MRO": {
    model: "Toyota Hilux Revo / Fortuner (2.4L / 2.8L)",
    engine: "1GD-FTV / 2GD-FTV Common Rail",
    catalogQuery: "Revo",
    desc: "ເລກຄັດຊີຂຶ້ນຕົ້ນ MRO... ເປັນລົດ Toyota Hilux Revo ຜະລິດໄທ/ລາວ ໃຊ້ນ້ຳມັນ 5W-30/15W-40"
  },
  "MP1": {
    model: "Isuzu D-Max / MU-X (1.9 / 3.0 BluePower)",
    engine: "RZ4E-TC (1.9L) / 4JJ3-TCX (3.0L)",
    catalogQuery: "D-Max",
    desc: "ເລກຄັດຊີຂຶ້ນຕົ້ນ MP1... ເປັນລົດ Isuzu D-Max ໃຊ້ຜ້າເບຣກ 8-97368980-0"
  },
  "MNB": {
    model: "Ford Ranger / Raptor (2.0L Bi-Turbo)",
    engine: "2.0L EcoBlue Bi-Turbo 10-Speed AT",
    catalogQuery: "Ranger",
    desc: "ເລກຄັດຊີຂຶ້ນຕົ້ນ MNB... ເປັນລົດ Ford Ranger T6/Next-Gen ໃຊ້ກອງເຄື່ອງ BB3Q-6744-BA"
  },
  "LC0": {
    model: "BYD Atto 3 / Dolphin / Seal (EV 100%)",
    engine: "BYD Permanent Magnet Motor 150kW",
    catalogQuery: "BYD",
    desc: "ເລກຄັດຊີຂຶ້ນຕົ້ນ LC0... ເປັນລົດໄຟຟ້າ BYD ໃຊ້ກອງແອ CN95, ຢາງ EV 215/55R18"
  }
};

const STAMPED_CODE_GUIDES = [
  {
    partType: "🛢️ ປ້ຳນ້ຳ & ວາວ (Water Pump & Valve)",
    whereToLook: "ສັງເກດເບິ່ງຕົວເລກປ້ຳນູນ (Casting) ເທິງເນື້ອອາລູມີນຽມ",
    exampleCodes: "AISIN, WPT-140, GWT-119A, 16100-",
    howToIdentify: "ລະຫັດ 4-5 ໂຕທຳອິດຄືເບີລຸ້ນ ພຽງແຕ່ພິມເບີນີ້ລົງໃນຊ່ອງ Search ຈະພົບສິນຄ້າທັນທີ"
  },
  {
    partType: "⚡ ໄດສະຕາດ & ໄດຊາດ (Starter & Alternator)",
    whereToLook: "ປ້າຍໂລຫະ (Nameplate) ຫຼື ເລກຍິງເລເຊີຂ້າງເສື້ອໄດ",
    exampleCodes: "DENSO 228000-, MITSUBISHI M008T, 28100-",
    howToIdentify: "ບອກແຮງດັນ (12V/24V), ຈຳນວນແຂ້ວເຟືອງ (9T, 10T, 11T) ແລະ ກຳລັງໄຟ (2.2kW, 2.8kW)"
  },
  {
    partType: "🛑 ຜ້າເບຣກ & ຈານເບຣກ (Brake Pads & Rotors)",
    whereToLook: "ຫຼັງແຜ່ນເຫຼັກຜ້າເບຣກ ຫຼື ຂອບຈານເບຣກ (Laser Etch)",
    exampleCodes: "AK D1184, ADVICS, 04465-0K240, BREMBO",
    howToIdentify: "ເລກ Akebono/OEM ຈະບອກຄວາມໜາ ແລະ ລຸ້ນລົດທີ່ໃສ່ໄດ້ທັນທີ"
  },
  {
    partType: "⚙️ ລູກປືນ (Bearings & Hub)",
    whereToLook: "ເລກປ້ຳຂອບແຫວນເຫຼັກ (Outer Ring Face)",
    exampleCodes: "KOYO 6205-2RS, NSK 30209, NTN DAC3568",
    howToIdentify: "ລະຫັດ 4 ຫຼັກບອກຂະໜາດ: ຮູໃນ (ID) x ວົງນອກ (OD) x ຄວາມໜາ (Width)"
  },
  {
    partType: "🎗️ ສາຍພານ (Fan Belts & Timing)",
    whereToLook: "ຕົວໜັງສືສີຂາວ/ເຫຼືອງເທິງຫຼັງສາຍພານ",
    exampleCodes: "7PK1515, 6PK1880, REC-3350, 143RU25.4",
    howToIdentify: "7PK = 7 ຮ່ອງ, 1515 = ຄວາມຍາວ 1,515 ມິນລິແມັດ"
  }
];

export function PartIdentifierModal({ isOpen, onClose, onSelectSearchCriteria }: PartIdentifierModalProps) {
  const [activeTab, setActiveTab] = useState<"chassis" | "stamped" | "whatsapp">("chassis");
  const [chassisInput, setChassisInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  const handleChassisSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chassisInput.trim()) return;

    const inputUpper = chassisInput.trim().toUpperCase();
    
    // Find matched sample
    let matchedKey = Object.keys(SAMPLE_CHASSIS_LOOKUPS).find((k) =>
      inputUpper.startsWith(k) || inputUpper.includes(k)
    );

    if (matchedKey) {
      setSearchResult(SAMPLE_CHASSIS_LOOKUPS[matchedKey]);
      setNotFound(false);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  const handleApplyChassisResult = () => {
    if (searchResult) {
      onSelectSearchCriteria(searchResult.catalogQuery);
      onClose();
    }
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `ສະບາຍດີ DK Lao / LUD! ຂ້ອຍມີອາໄຫຼ່ ຕ້ອງການໃຫ້ຊ່ວຍກວດສອບວ່າແມ່ນຍີ່ຫໍ້ໃດ ແລະ ໃຊ້ກັບລົດລຸ້ນໃດ:\n- ຂໍ້ຄວາມ/ລະຫັດເທິງອາໄຫຼ່: ${chassisInput || "ກະລຸນາເບິ່ງຮູບທີ່ຕິດຄັດ"}`
    );
    window.open(`https://wa.me/8562058929299?text=${text}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10 my-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/10 bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-lg shadow-inner">
                  🔍
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>ຕົວຊ່ວຍລະບຸອາໄຫຼ່ & ລຸ້ນລົດ (Smart Part Identifier)</span>
                    <span className="text-[10px] uppercase tracking-wider bg-purple-600 text-white font-bold px-2 py-0.5 rounded-full">
                      Expert Assist
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ວິທີຄົ້ນຫາອາໄຫຼ່ເມື່ອບໍ່ຮູ້ຍີ່ຫໍ້ ຫຼື ບໍ່ຮູ້ວ່າໃຊ້ກັບລົດລຸ້ນໃດ
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/30 p-2 gap-1.5">
              {[
                { id: "chassis", label: "1. ເລກຄັດຊີ VIN / Chassis", icon: FileText },
                { id: "stamped", label: "2. ເບິ່ງລະຫັດປ້ຳໂລຫະ (Casting)", icon: Wrench },
                { id: "whatsapp", label: "3. ຖ່າຍຮູບໃຫ້ຊ່າງກວດ (WhatsApp)", icon: Camera }
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm border border-slate-200/60 dark:border-white/10"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Body Content */}
            <div className="p-6 max-h-[68vh] overflow-y-auto scrollbar-thin">
              {/* TAB 1: Chassis / VIN Lookup */}
              {activeTab === "chassis" && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      ປ້ອນເລກຄັດຊີ (VIN 17 ຫຼັກ) ຫຼື ຊື່ລຸ້ນລົດຍົກ (ເຊັ່ນ: 8FD25, FD30-17, MRO..., MP1...):
                    </label>
                    <form onSubmit={handleChassisSearch} className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={chassisInput}
                          onChange={(e) => setChassisInput(e.target.value)}
                          placeholder="ຕົວຢ່າງ: 8FD25, FD25-16, MRO..., MP1..., LC0..."
                          className="w-full h-11 pl-4 pr-10 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 uppercase"
                        />
                        <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                      </div>
                      <Button
                        type="submit"
                        className="h-11 px-5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-500/20"
                      >
                        ກວດສອບ
                      </Button>
                    </form>

                    {/* Quick Example Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                      <span className="text-[11px] text-slate-400 font-semibold">ກົດທົດລອງ:</span>
                      {["8FD25", "FD25-16", "MRO (Revo)", "MP1 (D-Max)", "LC0 (BYD)"].map((sample) => (
                        <button
                          key={sample}
                          type="button"
                          onClick={() => {
                            const key = sample.split(" ")[0];
                            setChassisInput(key);
                            setSearchResult(SAMPLE_CHASSIS_LOOKUPS[key]);
                            setNotFound(false);
                          }}
                          className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-white/5 transition-colors"
                        >
                          {sample}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Result Card */}
                  {searchResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-purple-500/30 shadow-xl space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-bold text-emerald-400 uppercase">
                            ຖອດລະຫັດສຳເລັດ 100% (Decoded Match):
                          </span>
                        </div>
                        <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-mono font-bold">
                          OEM Verified
                        </span>
                      </div>

                      <div>
                        <div className="text-base font-black text-white">{searchResult.model}</div>
                        <div className="text-xs text-purple-300 font-semibold mt-0.5">
                          ເຄື່ອງຈັກ: {searchResult.engine}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                          {searchResult.desc}
                        </p>
                      </div>

                      <Button
                        onClick={handleApplyChassisResult}
                        className="w-full h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 mt-2"
                      >
                        <span>ເບິ່ງອາໄຫຼ່ທັງໝົດທີ່ກົງກັບລົດຄັນນີ້</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  )}

                  {notFound && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs space-y-2">
                      <div className="font-bold flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4" />
                        <span>ບໍ່ພົບຂໍ້ມູນເລກຄັດຊີນີ້ໃນຖານຂໍ້ມູນອັດຕະໂນມັດ</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        ບໍ່ຕ້ອງກັງວົນ! ທ່ານສາມາດກົດແທັບ <b>"3. ຖ່າຍຮູບໃຫ້ຊ່າງກວດ"</b> ເພື່ອສົ່ງຮູບເລກຄັດຊີ ຫຼື ຮູບອາໄຫຼ່ໃຫ້ທີມວິສະວະກອນ DK Lao ຊ່ວຍຖອດລະຫັດຜ່ານລະບົບໂຮງງານໄດ້ຟຣີ 100%.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Stamped / Casting Codes Guide */}
              {activeTab === "stamped" && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    ເຖິງວ່າກ່ອງອາໄຫຼ່ຈະເສຍ ຫຼື ປ້າຍຫຼຸດ, ເກືອບ 95% ຂອງອາໄຫຼ່ແທ້ <b>ຈະມີຕົວເລກປ້ຳຝັງລົງໃນເນື້ອໂລຫະ</b> ຕາມຈຸດຕ່າງໆດັ່ງນີ້:
                  </div>

                  <div className="space-y-3">
                    {STAMPED_CODE_GUIDES.map((guide, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {guide.partType}
                          </span>
                          <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full font-bold">
                            {guide.exampleCodes}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-300">
                          <span className="font-semibold text-slate-500 dark:text-slate-400">ຈຸດທີ່ຕ້ອງເບິ່ງ:</span> {guide.whereToLook}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-white/5">
                          💡 <b>ວິທີອ່ານ:</b> {guide.howToIdentify}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: WhatsApp Photo Assistance */}
              {activeTab === "whatsapp" && (
                <div className="space-y-5 text-center py-2">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-3xl mx-auto shadow-inner">
                    📸
                  </div>

                  <div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white">
                      ຖ່າຍຮູບອາໄຫຼ່ເກົ່າ ສົ່ງໃຫ້ທີມວິສະວະກອນຊ່ວຍເຊັກ
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
                      ຖ້າບໍ່ແນ່ໃຈເລີຍ ພຽງແຕ່ຖ່າຍຮູບອາໄຫຼ່ 3 ມຸມ (ດ້ານໜ້າ, ດ້ານຫຼັງ, ແລະ ຈຸດທີ່ມີຕົວເລກປ້ຳ) ສົ່ງຜ່ານ WhatsApp ທີມງານຊ່າງຈະຕອບກັບພາຍໃນ 5-10 ນາທີ!
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-left max-w-md mx-auto space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>ສິ່ງທີ່ຄວນຖ່າຍສົ່ງໃຫ້ຊ່າງ:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                      <li>ຮູບໂຕອາໄຫຼ່ທັງໝົດແບບເຕັມໂຕ</li>
                      <li>ຮູບຊູມຕົວເລກ/ຕົວໜັງສືທີ່ປ້ຳເທິງເນື້ອເຫຼັກ</li>
                      <li>ຮູບປ້າຍຊື່ລົດ ຫຼື ເລກຄັດຊີ (ຖ້າມີ)</li>
                    </ul>
                  </div>

                  <Button
                    onClick={handleWhatsAppRedirect}
                    className="h-12 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl shadow-emerald-500/25 inline-flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>ສົ່ງຮູບຫາຊ່າງຜ່ານ WhatsApp ທັນທີ</span>
                  </Button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50">
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
                <span>ທີມວິສະວະກອນ DK Lao & LUD ພ້ອມໃຫ້ຄຳປຶກສາຟຣີ 24/7</span>
              </div>

              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-xl h-10 text-xs font-bold"
              >
                ປິດໜ້າຕ່າງ
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
