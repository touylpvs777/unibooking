import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, HelpCircle, ArrowRight, Truck, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/Forklift/ui/button";

interface TyreFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTyreCriteria: (query: string, subsystem: string) => void;
}

interface ForkliftSizeProfile {
  id: string;
  tonnage: string;
  tonnageLabel: string;
  description: string;
  popularBrands: string[];
  frontSize: string;
  rearSize: string;
  rimFront: string;
  rimRear: string;
  icon: string;
}

const FORKLIFT_PROFILES: ForkliftSizeProfile[] = [
  {
    id: "1.5t",
    tonnage: "1.5T - 1.8T",
    tonnageLabel: "1.5 - 1.8 ໂຕນ (ລົດຍົກຂະໜາດນ້ອຍ)",
    description: "ເໝາະສຳລັບໂຮງງານຂະໜາດກາງ, ສາງກະຈາຍສິນຄ້າ ແລະ ຕູ້ຄອນເທນເນີ",
    popularBrands: ["Toyota 7/8FD15", "Komatsu FD15", "TCM FD15", "Heli CPCD15"],
    frontSize: "6.50-10",
    rearSize: "5.00-8",
    rimFront: "5.00F-10",
    rimRear: "3.00D-8",
    icon: "🚜"
  },
  {
    id: "2.5t",
    tonnage: "2.0T - 2.5T",
    tonnageLabel: "2.0 - 2.5 ໂຕນ (ລຸ້ນຍອດນິຍົມທີ່ສຸດໃນລາວ 🔥)",
    description: "ລຸ້ນມາດຕະຖານທີ່ໃຊ້ຫຼາຍທີ່ສຸດໃນສາງສິນຄ້າ ແລະ ໂຮງງານທົ່ວໄປ",
    popularBrands: ["Toyota 8FD25", "Komatsu FD25-16/17", "TCM FD25T3", "Heli CPCD25", "Hangcha CPCD25"],
    frontSize: "28x9-15 (8.15-15) ຫຼື 7.00-12",
    rearSize: "6.50-10",
    rimFront: "7.00-15 / 5.00S-12",
    rimRear: "5.00F-10",
    icon: "🏆"
  },
  {
    id: "3.0t",
    tonnage: "3.0T - 3.5T",
    tonnageLabel: "3.0 - 3.5 ໂຕນ (ລຸ້ນໃຊ້ງານໜັກ Heavy Duty)",
    description: "ສຳລັບຍົກສິນຄ້າໜັກ, ໂຮງງານເຫຼັກ, ໄຊດ໌ກໍ່ສ້າງ ແລະ ໂຮງເລື່ອຍໄມ້",
    popularBrands: ["Toyota 8FD30", "Komatsu FD30-16/17", "TCM FD30T3", "Mitsubishi FD30N", "Heli CPCD30/35"],
    frontSize: "28x9-15 (8.15-15)",
    rearSize: "6.50-10",
    rimFront: "7.00-15",
    rimRear: "5.00F-10",
    icon: "💪"
  },
  {
    id: "5.0t",
    tonnage: "4.0T - 5.0T",
    tonnageLabel: "4.0 - 5.0 ໂຕນ (ລົດຍົກຂະໜາດໃຫຍ່ Super Heavy)",
    description: "ສຳລັບວຽກບໍ່ແຮ່, ຍົກຕູ້ຄອນເທນເນີ, ໂຮງງານຊີມັງ ແລະ ທ່າບົກ",
    popularBrands: ["Toyota 8FD50", "Komatsu FD50", "TCM FD50", "Heli CPCD50"],
    frontSize: "300-15 (8.25-15)",
    rearSize: "7.00-12",
    rimFront: "8.00-15",
    rimRear: "5.00S-12",
    icon: "🏗️"
  },
  {
    id: "reach_truck",
    tonnage: "Reach Truck / EV",
    tonnageLabel: "ລົດຍົກໄຟຟ້າຂາຢັ່ງ / ລົດລາກປາເລັດໄຟຟ້າ (PU Wheels)",
    description: "ລົດຍົກໃນສາງແຄບ, ສາງຫ້ອງເຢັນ ໃຊ້ລໍ້ໂພລີຢູຣີເທນ (Polyurethane Wheels)",
    popularBrands: ["Toyota 7FBRE", "Jungheinrich", "BT Reflex", "Crown", "Nichiyu"],
    frontSize: "Load Wheel PU (ລໍ້ໜ້າ 285x100 / 254x102)",
    rearSize: "Drive Wheel PU (ລໍ້ຂັບ 343x140)",
    rimFront: "Steel Core",
    rimRear: "Steel Core",
    icon: "⚡"
  }
];

export function TyreFinderModal({ isOpen, onClose, onSelectTyreCriteria }: TyreFinderModalProps) {
  const [selectedProfileId, setSelectedProfileId] = useState<string>("2.5t");
  const [selectedPosition, setSelectedPosition] = useState<"both" | "front" | "rear">("both");
  const [tyreColor, setTyreColor] = useState<"black" | "white_non_marking">("black");

  const currentProfile = FORKLIFT_PROFILES.find((p) => p.id === selectedProfileId) || FORKLIFT_PROFILES[1];

  const handleApplyFilter = () => {
    let query = "";
    if (selectedProfileId === "reach_truck") {
      query = "PU";
    } else if (selectedPosition === "front") {
      query = currentProfile.frontSize.split(" ")[0]; // e.g. 28x9-15 or 6.50-10
    } else if (selectedPosition === "rear") {
      query = currentProfile.rearSize.split(" ")[0]; // e.g. 6.50-10 or 5.00-8
    } else {
      // both / full set
      query = currentProfile.frontSize.split(" ")[0];
    }

    if (tyreColor === "white_non_marking") {
      query += " Non-Marking";
    }

    onSelectTyreCriteria(query, "tire");
    onClose();
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
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/10 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-[#005BAC] dark:text-blue-400 flex items-center justify-center font-bold text-lg shadow-inner">
                  🛞
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>ຕົວຊ່ວຍເລືອກຂະໜາດຢາງຕັນ (Solid Tyre Finder)</span>
                    <span className="text-[10px] uppercase tracking-wider bg-[#005BAC] text-white font-bold px-2 py-0.5 rounded-full">
                      Smart Guide
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ເລືອກຂະໜາດໂຕນຂອງລົດຍົກ ລະບົບຈະຄິດໄລ່ຂະໜາດຢາງທີ່ຖືກຕ້ອງໃຫ້ອັດຕະໂນມັດ 100%
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

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto scrollbar-thin">
              {/* STEP 1: Select Tonnage */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#005BAC] text-white flex items-center justify-center text-[10px] font-black">1</span>
                  <span>ເລືອກຂະໜາດໂຕນຂອງລົດຍົກ (Forklift Capacity):</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FORKLIFT_PROFILES.map((profile) => {
                    const isSelected = selectedProfileId === profile.id;
                    return (
                      <button
                        key={profile.id}
                        onClick={() => setSelectedProfileId(profile.id)}
                        className={`p-4 rounded-2xl border text-left transition-all relative ${
                          isSelected
                            ? "bg-blue-500/10 border-[#005BAC] text-slate-900 dark:text-white shadow-md ring-2 ring-[#005BAC]/30"
                            : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{profile.icon}</span>
                            <span className="font-bold text-sm">{profile.tonnageLabel}</span>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#005BAC] shrink-0 mt-0.5" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                          {profile.description}
                        </p>
                        <div className="mt-2 text-[10px] text-[#005BAC] dark:text-blue-400 font-semibold">
                          ລຸ້ນຍອດນິຍົມ: {profile.popularBrands.slice(0, 3).join(", ")}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Recommended Size Result Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-[#005BAC]/30 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                      ຂະໜາດຢາງທີ່ຖືກຕ້ອງສຳລັບລົດ {currentProfile.tonnage}:
                    </span>
                  </div>
                  <span className="text-[11px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-bold">
                    ມາດຕະຖານໂຮງງານ OEM
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Front Tyre */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="text-[11px] text-slate-400 font-bold uppercase">ລໍ້ໜ້າ (Front Drive Wheels):</div>
                    <div className="text-base font-black text-blue-400">{currentProfile.frontSize}</div>
                    <div className="text-[10px] text-slate-400">ຂະໜາດກະທະລໍ້: {currentProfile.rimFront}</div>
                  </div>

                  {/* Rear Tyre */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="text-[11px] text-slate-400 font-bold uppercase">ລໍ້ຫຼັງ (Rear Steer Wheels):</div>
                    <div className="text-base font-black text-sky-400">{currentProfile.rearSize}</div>
                    <div className="text-[10px] text-slate-400">ຂະໜາດກະທະລໍ້: {currentProfile.rimRear}</div>
                  </div>
                </div>

                {/* STEP 3: Sub-options (Position & Color) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                  {/* Position selector */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-2">
                      ຕ້ອງການຊື້ສະເພາະລໍ້ໃດ?
                    </label>
                    <div className="flex gap-1.5">
                      {[
                        { id: "both", label: "ຄົບ 4 ລໍ້ (Full Set)" },
                        { id: "front", label: "ສະເພາະລໍ້ໜ້າ" },
                        { id: "rear", label: "ສະເພາະລໍ້ຫຼັງ" }
                      ].map((pos) => (
                        <button
                          key={pos.id}
                          onClick={() => setSelectedPosition(pos.id as any)}
                          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                            selectedPosition === pos.id
                              ? "bg-[#005BAC] text-white shadow-sm"
                              : "bg-white/10 text-slate-300 hover:bg-white/20"
                          }`}
                        >
                          {pos.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tyre Color/Type selector */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-2">
                      ປະເພດຢາງ & ສະພາບພື້ນ:
                    </label>
                    <div className="flex gap-1.5">
                      {[
                        { id: "black", label: "⚫ ສີດຳ (ໂຮງງານທົ່ວໄປ)" },
                        { id: "white_non_marking", label: "⚪ ສີຂາວ (Non-Marking)" }
                      ].map((col) => (
                        <button
                          key={col.id}
                          onClick={() => setTyreColor(col.id as any)}
                          className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                            tyreColor === col.id
                              ? "bg-sky-500 text-white shadow-sm"
                              : "bg-white/10 text-slate-300 hover:bg-white/20"
                          }`}
                        >
                          {col.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50">
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#005BAC] shrink-0" />
                <span>ຮັບປະກັນຢາງຕັນ 3 ຊັ້ນ ແທ້ 100% ບໍ່ຢ້ານຕະປູຊອດ</span>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="rounded-xl h-10 text-xs font-bold"
                >
                  ຍົກເລີກ
                </Button>
                <Button
                  onClick={handleApplyFilter}
                  className="rounded-xl h-10 text-xs font-bold bg-[#E1251B] hover:bg-red-700 text-white shadow-lg shadow-red-500/25 flex items-center gap-2"
                >
                  <span>ເບິ່ງຢາງທີ່ກົງກັບລົດຂອງຂ້ອຍ</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
