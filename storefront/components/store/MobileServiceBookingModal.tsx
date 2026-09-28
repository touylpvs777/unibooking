"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wrench, CheckCircle2, ShieldCheck, MapPin, Calendar, Smartphone, ArrowRight, Sparkles, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileServiceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHECKLIST_24_POINTS = [
  { group: "1. ເຄື່ອງຈັກ & ລະບົບຂັບເຄື່ອນ", items: ["ລະດັບນ້ຳມັນເຄື່ອງ & ຄວາມໜຽວ", "ລະບົບນ້ຳຫຼໍ່ເຢັນ & ໝໍ້ນ້ຳ", "ສາຍພານໜ້າເຄື່ອງ & ລູກຮອກ", "ລະບົບສາຍໄຟ & ໄດຊາດ/ໄດສະຕາດ"] },
  { group: "2. ລະບົບໄຮໂດຣລິກ & ຍົກສິນຄ້າ", items: ["ລະດັບນ້ຳມັນໄຮໂດຣລິກ & ຊີລກະບອກ", "ສາຍໄຮໂດຣລິກ & ຂໍ້ຕໍ່ກັນຮົ່ວ", "ໂສ້ຍົກ & ລູກປືນເສົາ Mast", "ວາວຄວບຄຸມ Control Valve"] },
  { group: "3. ລະບົບເບຣກ & ຊ່ວງລາງ", items: ["ຄວາມໜາຜ້າເບຣກ & ແມ່ປັ້ມເບຣກ", "ນ້ຳມັນເບຣກ & ສາຍອ່ອນເບຣກ", "ດຸມລໍ້ & ລູກປືນຄອມ້າຫຼັງ", "ສະພາບດອກຢາງຕັນ & ຮອຍແຕກ"] },
  { group: "4. ລະບົບຄວາມປອດໄພ & ໄຟສັນຍານ", items: ["ໄຟໜ້າ, ໄຟຫຼັງ, ໄຟລ້ຽວ, ໄຟກະພິບ", "ສຽງແກ & ສຽງຖອຍຫຼັງ", "ສາຍຮັດນິລະໄພ & ສະວິດເກົ້າອີ້", "ລະບົບຕັດໄຟສຸກເສີນ Emergency Cut-off"] }
];

const PROVINCES = [
  "ນະຄອນຫຼວງວຽງຈັນ (Vientiane Capital)",
  "ແຂວງວຽງຈັນ (Vientiane Province)",
  "ສະຫວັນນະເຂດ (Savannakhet)",
  "ຈຳປາສັກ (Champasak / Pakse)",
  "ຄຳມ່ວນ (Khammouane / Thakhek)",
  "ຫຼວງພະບາງ (Luang Prabang)",
  "ບໍລິຄຳໄຊ (Bolikhamxay)",
  "ໄຊຍະບູລີ (Xayaburi)",
  "ອື່ນໆ (Other Province)"
];

export function MobileServiceBookingModal({ isOpen, onClose }: MobileServiceBookingModalProps) {
  const [vehicleType, setVehicleType] = useState<string>("forklift_diesel");
  const [province, setProvince] = useState<string>(PROVINCES[0]);
  const [factoryName, setFactoryName] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [urgency, setUrgency] = useState<"standard_pm" | "emergency_breakdown">("standard_pm");
  const [notes, setNotes] = useState<string>("");

  const handleBookViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const vehicleLabel =
      vehicleType === "forklift_diesel" ? "ລົດຍົກດີເຊວ (Diesel Forklift)" :
      vehicleType === "forklift_electric" ? "ລົດຍົກໄຟຟ້າ (Electric Forklift / Reach Truck)" :
      vehicleType === "light_ev" ? "ລົດເບົາ / ລົດໄຟຟ້າ EV (Pickup / EV)" : "ເຄື່ອງຈັກໜັກ (Heavy Machinery)";

    const urgencyLabel = urgency === "emergency_breakdown" ? "🚨 ສຸກເສີນ ລົດເສຍຢຸດແລ່ນ (Emergency Breakdown)" : "🛠️ ກວດເຊັກ PM 24 ຈຸດຕາມໄລຍະ (Scheduled PM)";

    const message =
      `ສະບາຍດີ DK Lao / LUD! ຂ້ອຍຕ້ອງການນັດໝາຍທີມຊ່າງ Mobile Service ກວດເຊັກເຖິງສະຖານທີ່:\n\n` +
      `📌 ປະເພດການຮຽກຮ້ອງ: ${urgencyLabel}\n` +
      `🚜 ປະເພດລົດ: ${vehicleLabel}\n` +
      `🏢 ຊື່ໂຮງງານ/ບໍລິສັດ: ${factoryName || "ບໍ່ໄດ້ລະບຸ"}\n` +
      `📍 ສະຖານທີ່/ແຂວງ: ${province}\n` +
      `📞 ເບີໂທຕິດຕໍ່: ${contactPhone || "ກະລຸນາຕິດຕໍ່ກັບຜ່ານເບີນີ້"}\n` +
      `📝 ລາຍລະອຽດອາການ/ຄວາມຕ້ອງການ: ${notes || "ກວດເຊັກທົ່ວໄປ 24 ຈຸດ"}`;

    window.open(`https://wa.me/8562058929299?text=${encodeURIComponent(message)}`, "_blank");
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
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/10 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg shadow-inner">
                  🛠️
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>ບໍລິການກວດເຊັກ 24 ຈຸດ & ຊ່າງ Mobile Service ເຖິງໂຮງງານ</span>
                    <span className="text-[10px] uppercase tracking-wider bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full">
                      On-Site Service
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ທີມວິສະວະກອນພ້ອມລົດເຄື່ອນທີ່ ບໍລິການກວດເຊັກ, ປ່ຽນອາໄຫຼ່ ແລະ PM ທົ່ວປະເທດລາວ
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

            {/* Body */}
            <form onSubmit={handleBookViaWhatsApp} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto scrollbar-thin">
              {/* 24-Points Checklist Overview Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>ລາຍການກວດເຊັກມາດຕະຖານໂຮງງານ 24 ຈຸດ (24-Point OEM Checklist)</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    ຟຣີໃບລາຍງານສຸຂະພາບລົດ (Health Report)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {CHECKLIST_24_POINTS.map((group, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 space-y-1.5">
                      <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                        {group.group}
                      </div>
                      <ul className="space-y-0.5">
                        {group.items.map((item, i) => (
                          <li key={i} className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Urgency Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      ປະເພດການຮຽກຮ້ອງ:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setUrgency("standard_pm")}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                          urgency === "standard_pm"
                            ? "bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 shadow-sm"
                            : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/5"
                        }`}
                      >
                        🛠️ ກວດເຊັກ PM ຕາມຮອບ
                      </button>
                      <button
                        type="button"
                        onClick={() => setUrgency("emergency_breakdown")}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                          urgency === "emergency_breakdown"
                            ? "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 shadow-sm"
                            : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/5"
                        }`}
                      >
                        🚨 ສຸກເສີນ ລົດເສຍ
                      </button>
                    </div>
                  </div>

                  {/* Vehicle Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      ປະເພດລົດ / ເຄື່ອງຈັກ:
                    </label>
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="forklift_diesel">ລົດຍົກດີເຊວ (Diesel Forklift 1.5 - 5.0T)</option>
                      <option value="forklift_electric">ລົດຍົກໄຟຟ້າ / Reach Truck (Battery Forklift)</option>
                      <option value="light_ev">ລົດກະບະ / ລົດໄຟຟ້າ EV (Pickup / SUV / EV)</option>
                      <option value="heavy_machinery">ເຄື່ອງຈັກໜັກ / ລົດຕັກ / ລົດຂຸດ (Heavy Equipment)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Factory / Company Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      ຊື່ໂຮງງານ / ບໍລິສັດ:
                    </label>
                    <input
                      type="text"
                      value={factoryName}
                      onChange={(e) => setFactoryName(e.target.value)}
                      placeholder="ຕົວຢ່າງ: ໂຮງງານ ເບຍລາວ, ບໍ່ແຮ່ພູເບ້ຍ..."
                      className="w-full h-10 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Province */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      ສະຖານທີ່ / ແຂວງ:
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    >
                      {PROVINCES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    ອາການຜິດປົກກະຕິ ຫຼື ອາໄຫຼ່ທີ່ຕ້ອງການໃຫ້ກຽມມານຳ:
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="ຕົວຢ່າງ: ລົດຍົກສະຕາດຕິດຍາກ, ປ້ຳໄຮໂດຣລິກມີສຽງດັງ, ຕ້ອງການໃຫ້ກຽມປ່ຽນຢາງຕັນ 2.5 ໂຕນ..."
                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>ຕອບກັບ ແລະ ຈອງຄິວຊ່າງທັນທີ ພາຍໃນ 15 ນາທີ</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="rounded-xl h-10 text-xs font-bold"
                  >
                    ຍົກເລີກ
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-xl h-10 text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-500/25 flex items-center gap-2"
                  >
                    <span>ນັດໝາຍຊ່າງຜ່ານ WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
