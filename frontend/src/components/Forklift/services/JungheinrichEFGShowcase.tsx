import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  BatteryCharging,
  Clock,
  TrendingDown,
  TrendingUp,
  Award,
  CheckCircle2,
  PhoneCall,
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
  Flame,
  Droplets,
  Truck,
  Layers,
  ArrowUpRight,
  Sparkles,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/Forklift/ui/button";
import { ImageLightboxModal } from "@/components/Forklift/ui/ImageLightboxModal";

interface ForkliftModel {
  series: string;
  submodels?: string;
  origin: "germany" | "china";
  originLabelLo: string;
  originLabelEn: string;
  flag: string;
  liftHeight: string;
  capacity: string;
  voltage: string;
  voltageType: "48v" | "80v";
  wheels: "3-wheel" | "4-wheel";
  highlightLo: string;
  highlightEn: string;
  applicationsLo: string;
  applicationsEn: string;
}

const EFG_MODELS: ForkliftModel[] = [
  // Germany Flagships 🇩🇪
  {
    series: "EFG 112",
    origin: "germany",
    originLabelLo: "ມາດຕະຖານເຢຍລະມັນ (Germany)",
    originLabelEn: "German Engineered",
    flag: "🇩🇪",
    liftHeight: "2,300 – 7,000 mm",
    capacity: "1.2 t",
    voltage: "48 V",
    voltageType: "48v",
    wheels: "3-wheel",
    highlightLo: "ລົດຍົກ 3 ລໍ້ ໄຟຟ້າຂະໜາດກະທັດຮັດພິເສດ ລ້ຽວວົງແຄບສຸດ",
    highlightEn: "Ultra-compact 3-wheel electric, smallest turning radius",
    applicationsLo: "ສາງສິນຄ້າຊ່ອງທາງແຄບ, ທ່າໂຫຼດຕູ້ຄອນເທນເນີ, ຂົນຍ້າຍພາຍໃນອາຄານ",
    applicationsEn: "Narrow aisles, container loading, compact indoor facilities",
  },
  {
    series: "EFG 213-220",
    origin: "germany",
    originLabelLo: "ມາດຕະຖານເຢຍລະມັນ (Germany)",
    originLabelEn: "German Engineered",
    flag: "🇩🇪",
    liftHeight: "2,900 – 7,000 mm",
    capacity: "1.3 – 2.0 t",
    voltage: "48 V",
    voltageType: "48v",
    wheels: "3-wheel",
    highlightLo: "ລົດຍົກ 3 ລໍ້ ມໍເຕີຄູ່ Dual-Motor AC ຂັບເຄື່ອນໜ້າ ຄ່ອງຕົວສູງ",
    highlightEn: "Dual-motor front AC drive, superior maneuverability",
    applicationsLo: "ສາງສິນຄ້າອຸປະໂພກ-ບໍລິໂພກ (FMCG), ສູນກະຈາຍສິນຄ້າ, ໂຮງງານຜະລິດ",
    applicationsEn: "FMCG warehouses, logistics distribution centers, manufacturing",
  },
  {
    series: "EFG 316-320",
    origin: "germany",
    originLabelLo: "ມາດຕະຖານເຢຍລະມັນ (Germany)",
    originLabelEn: "German Engineered",
    flag: "🇩🇪",
    liftHeight: "2,900 – 7,000 mm",
    capacity: "1.6 – 2.0 t",
    voltage: "48 V",
    voltageType: "48v",
    wheels: "4-wheel",
    highlightLo: "ລົດຍົກ 4 ລໍ້ ດຸ່ນດ່ຽງສູງສຸດ ແລ່ນຂ້າມຣ້ຳ ແລະ ພື້ນຜິວບໍ່ລຽບໄດ້ດີ",
    highlightEn: "4-wheel high stability, smooth ramp and rough floor transit",
    applicationsLo: "ງານຂົນຍ້າຍທັງໃນ ແລະ ນອກອາຄານ, ຂຶ້ນລົງຣ້ຳຂົນຖ່າຍສິນຄ້າ",
    applicationsEn: "Indoor & outdoor material handling, dock ramps, loading bays",
  },
  {
    series: "EFG 425-S30",
    origin: "germany",
    originLabelLo: "ມາດຕະຖານເຢຍລະມັນ (Germany)",
    originLabelEn: "German Engineered",
    flag: "🇩🇪",
    liftHeight: "2,900 – 7,500 mm",
    capacity: "2.5 – 3.0 t",
    voltage: "80 V",
    voltageType: "80v",
    wheels: "4-wheel",
    highlightLo: "ລະບົບໄຟ 80V ພະລັງງານສູງ ທຽບເທົ່າລົດຍົກນ້ຳມັນ ແຕ່ປອດມົນລະພິດ 100%",
    highlightEn: "High-performance 80V system, diesel power with zero emissions",
    applicationsLo: "ໂຮງງານເຄື່ອງດື່ມ, ໂຮງງານຊີມັງ, ອຸດສາຫະກຳໜັກ ແລະ ສາງໃຫຍ່",
    applicationsEn: "Beverage plants, cement works, heavy manufacturing & bulk storage",
  },
  {
    series: "EFG 535-S50",
    origin: "germany",
    originLabelLo: "ມາດຕະຖານເຢຍລະມັນ (Germany)",
    originLabelEn: "German Engineered",
    flag: "🇩🇪",
    liftHeight: "2,480 – 7,500 mm",
    capacity: "3.5 – 5.0 t",
    voltage: "80 V",
    voltageType: "80v",
    wheels: "4-wheel",
    highlightLo: "ລົດຍົກໄຟຟ້າຮຸ່ນໃຫຍ່ສຸດ 5 ໂຕນ ພະລັງງານ 80V ຮອງຮັບອຸປະກອນເສີມໜັກ",
    highlightEn: "Flagship 5.0t 80V electric workhorse, supports heavy attachments",
    applicationsLo: "ອຸດສາຫະກຳບໍ່ແຮ່, ເຫຼັກ, ເຈ້ຍມ້ວນ (Paper Rolls), ສາງສິນຄ້າໜັກພິເສດ",
    applicationsEn: "Mining sector, steel fabrication, paper roll handling, heavy yards",
  },

  // China Efficiency Series 🇨🇳
  {
    series: "EFG BB",
    submodels: "216k",
    origin: "china",
    originLabelLo: "ລຸ້ນຄຸ້ມຄ່າປະສິດທິພາບສູງ (China Efficiency)",
    originLabelEn: "High-Efficiency Value Line",
    flag: "🇨🇳",
    liftHeight: "3,000 – 6,500 mm",
    capacity: "1.6 t",
    voltage: "48 V",
    voltageType: "48v",
    wheels: "3-wheel",
    highlightLo: "ລົດຍົກ 3 ລໍ້ ລຸ້ນປະຢັດຕົ້ນທຶນ ມາດຕະຖານສາກົນ Jungheinrich",
    highlightEn: "Cost-effective 3-wheel model with genuine Jungheinrich engineering",
    applicationsLo: "ທຸລະກິດຂະໜາດກາງ ແລະ ນ້ອຍ (SME), ສາງສິນຄ້າທົ່ວໄປ",
    applicationsEn: "SMEs, general storage warehouses, retail distribution",
  },
  {
    series: "EFG MB",
    submodels: "216k / 218k / 220",
    origin: "china",
    originLabelLo: "ລຸ້ນຄຸ້ມຄ່າປະສິດທິພາບສູງ (China Efficiency)",
    originLabelEn: "High-Efficiency Value Line",
    flag: "🇨🇳",
    liftHeight: "3,000 – 6,500 mm",
    capacity: "1.6 – 2.0 t",
    voltage: "48 V",
    voltageType: "48v",
    wheels: "3-wheel",
    highlightLo: "ລົດຍົກ 3 ລໍ້ ປະສິດທິພາບສູງ ຄຸ້ມຄ່າການລົງທຶນສູງສຸດສຳລັບກອງລົດເຊົ່າ",
    highlightEn: "High productivity 3-wheel, optimal ROI for rental and operations",
    applicationsLo: "ສາງສິນຄ້າອຸດສາຫະກຳ, ສູນຂົນສົ່ງສິນຄ້າ, ໂຮງງານປະກອບ",
    applicationsEn: "Industrial warehouses, transport hubs, assembly lines",
  },
  {
    series: "EFG BC",
    submodels: "316 / 320 / 325k / 325 / 330",
    origin: "china",
    originLabelLo: "ລຸ້ນຄຸ້ມຄ່າປະສິດທິພາບສູງ (China Efficiency)",
    originLabelEn: "High-Efficiency Value Line",
    flag: "🇨🇳",
    liftHeight: "3,000 – 6,500 mm",
    capacity: "1.6 – 3.0 t",
    voltage: "48 V",
    voltageType: "48v",
    wheels: "4-wheel",
    highlightLo: "ລົດຍົກ 4 ລໍ້ ຫຼາກຫຼາຍຂະໜາດໂຫຼດ 1.6-3.0t ແຂງແຮງ, ທົນທານ",
    highlightEn: "4-wheel workhorse across 1.6-3.0t capacities, rugged durability",
    applicationsLo: "ໂຮງງານອຸດສາຫະກຳທົ່ວໄປ, ສາງວັດສະດຸກໍ່ສ້າງ, ຄັງສິນຄ້າທ່າບົກ",
    applicationsEn: "General manufacturing, building materials, inland dry ports",
  },
  {
    series: "EFG MC",
    submodels: "316k / 316 / 320 / 325 / 330",
    origin: "china",
    originLabelLo: "ລຸ້ນຄຸ້ມຄ່າປະສິດທິພາບສູງ (China Efficiency)",
    originLabelEn: "High-Efficiency Value Line",
    flag: "🇨🇳",
    liftHeight: "3,000 – 6,500 mm",
    capacity: "1.6 – 3.0 t",
    voltage: "48 V",
    voltageType: "48v",
    wheels: "4-wheel",
    highlightLo: "ລົດຍົກ 4 ລໍ້ ຮຸ່ນຍອດນິຍົມສຳລັບການໃຊ້ງານຫຼາຍກະ (Multi-Shift)",
    highlightEn: "Popular 4-wheel series engineered for intensive multi-shift cycles",
    applicationsLo: "ສູນກະຈາຍສິນຄ້າຂະໜາດໃຫຍ່, ສາງຂົນສົ່ງຂ້າມແດນ, ໂຮງງານຜະລິດ 24/7",
    applicationsEn: "Large logistics hubs, cross-border forwarding, 24/7 production plants",
  },
];

export function JungheinrichEFGShowcase() {
  const { i18n } = useTranslation();
  const locale = i18n.language || "lo";
  const isLo = locale === "lo";
  const [activeTab, setActiveTab] = useState<"counterbalance" | "lithium">("counterbalance");
  const [originFilter, setOriginFilter] = useState<"all" | "germany" | "china">("all");

  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    src: string;
    alt: string;
    titleLo?: string;
    titleEn?: string;
    subtitleLo?: string;
    subtitleEn?: string;
  }>({
    isOpen: false,
    src: "",
    alt: "",
  });
  const [activeSubTab, setActiveSubTab] = useState<"portfolio" | "li-ion">("portfolio");

  const filteredModels = EFG_MODELS.filter((model) => {
    if (originFilter === "all") return true;
    return model.origin === originFilter;
  });

  return (
    <section id="jungheinrich-efg" className="py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container px-4 max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Award className="w-4 h-4 text-yellow-400" />
            <span>DK LAO • JUNGHEINRICH OFFICIAL COUNTERBALANCE & LI-ION PORTFOLIO</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            {isLo ? (
              <>
                ກອງລົດຍົກໄຟຟ້າດຸ່ນດ່ຽງ <span className="text-yellow-400">EFG ຄົບ 9 ຊີຣີສ໌</span> & ເທັກໂນໂລຊີ <span className="text-emerald-400">Lithium-Ion</span>
              </>
            ) : (
              <>
                Extensive Counterbalance <span className="text-yellow-400">EFG Portfolio</span> & <span className="text-emerald-400">Li-Ion Technology</span>
              </>
            )}
          </h2>

          <p className="text-slate-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {isLo
              ? "ຕອບໂຈດທຸກຄວາມຕ້ອງການຍົກຍ້າຍສິນຄ້າດ້ວຍລົດຍົກໄຟຟ້າ Jungheinrich ມາດຕະຖານເຢຍລະມັນ (🇩🇪) ແລະ ລຸ້ນຄຸ້ມຄ່າປະສິດທິພາບສູງ (🇨🇳) ພ້ອມແບັດເຕີຣີ Lithium-Ion ຮັບປະກັນເຕັມ 5 ປີ."
              : "Meeting all material handling demands with Jungheinrich electric counterbalance forklifts from Germany (🇩🇪) and high-efficiency series (🇨🇳), powered by 5-year guaranteed Lithium-Ion technology."}
          </p>

          {/* Sub Tab Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveSubTab("portfolio")}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeSubTab === "portfolio"
                  ? "bg-yellow-500 text-slate-950 shadow-lg shadow-yellow-500/25 scale-105"
                  : "bg-white/10 text-slate-300 hover:bg-white/15 border border-white/10"
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>{isLo ? "1. ຕາຕະລາງສະເປັກ EFG 9 ລຸ້ນ (🇩🇪/🇨🇳)" : "1. EFG Portfolio Matrix (🇩🇪/🇨🇳)"}</span>
            </button>

            <button
              onClick={() => setActiveSubTab("li-ion")}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeSubTab === "li-ion"
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-105"
                  : "bg-white/10 text-slate-300 hover:bg-white/15 border border-white/10"
              }`}
            >
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>{isLo ? "2. Lithium-Ion & ຮັບປະກັນ 5 ປີ (ປະຢັດ >80%)" : "2. Li-Ion & 5-Year Guarantee (>80% ROI)"}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SUBTAB 1: COUNTERBALANCE EFG PORTFOLIO MATRIX */}
        {/* ========================================================================= */}
        {activeSubTab === "portfolio" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Origin Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <SlidersHorizontal className="w-4 h-4 text-yellow-400" />
                <span>{isLo ? "ກັ່ນກອງຕາມສາຍການຜະລິດ:" : "Filter by Manufacturing Origin:"}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setOriginFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    originFilter === "all"
                      ? "bg-white text-slate-900 shadow-md"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {isLo ? "ທັງໝົດ (9 ຊີຣີສ໌)" : "All (9 Series)"}
                </button>

                <button
                  onClick={() => setOriginFilter("germany")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    originFilter === "germany"
                      ? "bg-yellow-500 text-slate-950 shadow-md"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <span>🇩🇪</span>
                  <span>{isLo ? "ເຢຍລະມັນ (Germany Flagships • 5 ລຸ້ນ)" : "Germany Flagships (5 Models)"}</span>
                </button>

                <button
                  onClick={() => setOriginFilter("china")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    originFilter === "china"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <span>🇨🇳</span>
                  <span>{isLo ? "ລຸ້ນຄຸ້ມຄ່າປະສິດທິພາບສູງ (China • 4 ລຸ້ນ)" : "China Value Lines (4 Models)"}</span>
                </button>
              </div>
            </div>

            {/* Official Slide Banner Preview */}
            <div className="relative rounded-3xl overflow-hidden border border-yellow-500/30 shadow-2xl bg-black/40 group">
              <div 
                onClick={() => setLightbox({
                  isOpen: true,
                  src: "/images/solutions/counterbalance-portfolio-efg.png",
                  alt: "DK LAO Jungheinrich Counterbalance Portfolio EFG Series",
                  titleLo: "ກອງລົດຍົກໄຟຟ້າ Jungheinrich Counterbalance EFG Portfolio (1.4 – 5.0 Tons)",
                  titleEn: "Jungheinrich Counterbalance EFG Series Portfolio",
                  subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1166px)",
                  subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                })}
                className="relative h-64 sm:h-80 md:h-96 w-full cursor-pointer group/img"
              >
                <img
                  src="/images/solutions/counterbalance-portfolio-efg.png"
                  alt="DK LAO Jungheinrich Counterbalance Portfolio EFG Series"
                  fill
                  unoptimized
                  priority
                  className="object-contain p-2 sm:p-4 crisp-diagram transition-transform duration-700 group-hover/img:scale-[1.02]"
                />
                <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                  <ZoomIn className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                </div>
              </div>
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-xs font-bold text-yellow-400">
                <Award className="w-3.5 h-3.5" />
                <span>OFFICIAL DK LAO JUNGHEINRICH SLIDE SPECIFICATION</span>
              </div>
            </div>

            {/* Comprehensive Grid of EFG Models */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredModels.map((model, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-yellow-500/50 hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Model Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="text-xl font-black text-white group-hover:text-yellow-400 transition-colors flex items-center gap-2">
                          <span>{model.series}</span>
                          <span className="text-base">{model.flag}</span>
                        </div>
                        {model.submodels && (
                          <div className="text-xs font-mono text-slate-400 mt-0.5">
                            Sub-models: {model.submodels}
                          </div>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          model.origin === "germany"
                            ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                            : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        }`}
                      >
                        {model.wheels}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {isLo ? model.highlightLo : model.highlightEn}
                    </p>

                    {/* Spec Tags */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/40 border border-white/5 mb-4 text-center">
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400">
                          {isLo ? "ຄວາມສູງຍົກ" : "Lift Height"}
                        </span>
                        <span className="text-xs font-extrabold text-yellow-400">
                          {model.liftHeight}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400">
                          {isLo ? "ນ້ຳໜັກຍົກ" : "Capacity"}
                        </span>
                        <span className="text-xs font-extrabold text-white">
                          {model.capacity}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400">
                          {isLo ? "ແຮງດັນໄຟ" : "Voltage"}
                        </span>
                        <span
                          className={`text-xs font-black ${
                            model.voltageType === "80v" ? "text-red-400" : "text-emerald-400"
                          }`}
                        >
                          {model.voltage}
                        </span>
                      </div>
                    </div>

                    {/* Ideal Applications */}
                    <div className="mb-4">
                      <span className="block text-[11px] font-bold text-slate-400 mb-1">
                        {isLo ? "🎯 ເໝາະສຳລັບ:" : "🎯 Recommended for:"}
                      </span>
                      <p className="text-xs text-slate-300 leading-normal">
                        {isLo ? model.applicationsLo : model.applicationsEn}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <a
                      href={`https://wa.me/8562028023338?text=${encodeURIComponent(
                        isLo
                          ? `ສະບາຍດີ ດີເຄ ລາວ, ຂ້າພະເຈົ້າສົນໃຈສອບຖາມຂໍ້ມູນລົດຍົກໄຟຟ້າ Jungheinrich ${model.series} (${model.capacity}, ${model.liftHeight}).`
                          : `Hello DK LAO, I would like to inquire about Jungheinrich ${model.series} (${model.capacity}, ${model.liftHeight}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400 hover:text-green-300 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{isLo ? "ຖາມສະເປັກ WhatsApp" : "WhatsApp Inquiry"}</span>
                    </a>

                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-yellow-500/30 text-yellow-400 hover:bg-yellow-500 hover:text-slate-950 transition-all"
                      onClick={() => {
                        const el = document.getElementById("booking-form");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <span>{isLo ? "ຂໍໃບສະເໜີລາຄາ" : "Get Quote"}</span>
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 2: LITHIUM-ION TECHNOLOGY & 5-YEAR GUARANTEE */}
        {/* ========================================================================= */}
        {activeSubTab === "li-ion" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {/* Top Strategic Callouts: 80% Cost Saving & 5-Year Guarantee */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Card 1: 80% Cost Savings vs Diesel & LPG */}
              <div className="rounded-3xl p-8 border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 via-slate-900 to-black relative overflow-hidden shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 text-xs font-extrabold w-fit mb-4">
                    <TrendingDown className="w-4 h-4 text-emerald-400" />
                    <span>OPERATING COST REDUCTION & HIGHER EFFICIENCY</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    {isLo ? (
                      <>
                        ປະຢັດຄ່າໃຊ້ຈ່າຍໄດ້ຫຼາຍກວ່າ <span className="text-yellow-400 text-4xl sm:text-5xl">80%</span>
                      </>
                    ) : (
                      <>
                        Save Over <span className="text-yellow-400 text-4xl sm:text-5xl">80%</span> Operating Costs
                      </>
                    )}
                  </h3>
                  <p className="text-lg font-bold text-slate-200 mb-6">
                    {isLo ? "ເມື່ອທຽບກັບ ນ້ຳມັນ (Diesel) ແລະ ແກັສ (LPG)" : "Compared to Diesel and LPG Fuel Operations"}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isLo ? "ບໍ່ມີຄ່ານ້ຳມັນເຊື້ອເພີງລາຍເດືອນທີ່ຜັນຜວນສູງ (Zero Fuel Volatility)" : "Eliminate rising monthly diesel & gas expenses"}</span>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isLo ? "ບໍ່ມີຄ່າປ່ຽນນ້ຳມັນເຄື່ອງ, ຫົວທຽນ, ໄສ້ກອງ, ແລະ ສ້ອມແປງເຄື່ອງຈັກ" : "Zero engine oil changes, spark plugs, and engine overhauls"}</span>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isLo ? "ປອດຄວັນພິດ 100% ມາດຕະຖານໂຮງງານອາຫານ, ເຄື່ອງດື່ມ, ແລະ ຢາປົວພະຍາດ" : "100% zero exhaust emissions for food, pharma, and clean facilities"}</span>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setLightbox({
                    isOpen: true,
                    src: "/images/solutions/li-ion-80-percent-cost-savings.png",
                    alt: "Save more than 80% costs with Jungheinrich Li-Ion",
                    titleLo: "ປະຢັດຕົ້ນທຶນຫຼາຍກວ່າ 80% ດ້ວຍເທັກໂນໂລຢີ Jungheinrich Li-Ion",
                    titleEn: "Save More than 80% Operating Costs with Li-Ion",
                    subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1144px)",
                    subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                  })}
                  className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 relative h-48 sm:h-56 cursor-pointer group/img"
                >
                  <img
                    src="/images/solutions/li-ion-80-percent-cost-savings.png"
                    alt="Save more than 80% costs with Jungheinrich Li-Ion"
                    fill
                    unoptimized
                    className="object-contain p-2 crisp-diagram group-hover/img:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                    <ZoomIn className="w-3 h-3 text-emerald-400" />
                    <span>{isLo ? "🔍 ຊູມ 2K" : "🔍 Zoom 2K"}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: 5 Years Full Guarantee on Batteries & Cells */}
              <div className="rounded-3xl p-8 border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-black relative overflow-hidden shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold w-fit mb-4">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>OFFICIAL 5-YEAR UNCONDITIONAL CONFIDENCE</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    {isLo ? (
                      <>
                        ພວກເຮົາກ້າຮັບປະກັນ <span className="text-emerald-400 text-4xl sm:text-5xl">5 ປີ</span>
                      </>
                    ) : (
                      <>
                        We Dare to Guarantee <span className="text-emerald-400 text-4xl sm:text-5xl">5 Years</span>
                      </>
                    )}
                  </h3>
                  <p className="text-lg font-bold text-slate-200 mb-6">
                    {isLo ? "ໝໍ້ໄຟ ແລະ ເຊວໝໍ້ໄຟ (Batteries & Battery Cells 100%)" : "Full Coverage on Batteries and Individual Battery Cells"}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isLo ? "ຮັບປະກັນທັງຕົວ Battery Module ແລະ Cell ພາຍໃນ ຍາວນານເຖິງ 5 ປີ" : "Covers complete battery module and internal cell chemistry for 5 years"}</span>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isLo ? "100% Satisfaction Guaranteed: ໝັ້ນໃຈໃນກຳລັງຂັບເຄື່ອນເຕັມປະສິດທິພາບ" : "100% Satisfaction Guaranteed with full conversion rights"}</span>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isLo ? "ບໍ່ຕ້ອງເຕີມນ້ຳກັ່ນ (Maintenance-Free), ບໍ່ມີໄອລະເຫີຍກົດອັນຕະລາຍ" : "Maintenance-free design: zero distilled water topping, zero acid fumes"}</span>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setLightbox({
                    isOpen: true,
                    src: "/images/solutions/li-ion-5-years-guarantee.png",
                    alt: "5 Years Guarantee on Li-Ion Batteries and Cells",
                    titleLo: "ຮັບປະກັນໝໍ້ໄຟ ແລະ ເຊວ Lithium-Ion ຍາວນານເຖິງ 5 ປີເຕັມ",
                    titleEn: "5 Years Unconditional Guarantee on Batteries & Cells",
                    subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1154px)",
                    subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                  })}
                  className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 relative h-48 sm:h-56 cursor-pointer group/img"
                >
                  <img
                    src="/images/solutions/li-ion-5-years-guarantee.png"
                    alt="5 Years Guarantee on Li-Ion Batteries and Cells"
                    fill
                    unoptimized
                    className="object-contain p-2 crisp-diagram group-hover/img:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                    <ZoomIn className="w-3 h-3 text-emerald-400" />
                    <span>{isLo ? "🔍 ຊູມ 2K" : "🔍 Zoom 2K"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fast Charging Comparison: 1.25 Hours vs 8-10 Hours */}
            <div className="rounded-3xl p-8 md:p-10 border border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>REVOLUTIONARY CHARGING SPEED</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {isLo ? (
                      <>
                        ສາກເຕັມ 100% ໃນ <span className="text-yellow-400">1.25 ຊົ່ວໂມງ</span> ໃຊ້ງານໄດ້ຍາວນານ <span className="text-emerald-400">8-10 ຊົ່ວໂມງ</span>
                      </>
                    ) : (
                      <>
                        100% Full Charge in <span className="text-yellow-400">1.25 Hours</span> for <span className="text-emerald-400">8-10 Hours</span> Runtime
                      </>
                    )}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {isLo
                      ? "ເທັກໂນໂລຊີ Opportunity Charging ຊ່ວຍໃຫ້ທ່ານສາກແບັດໄດ້ທຸກເວລາ (ເຊັ່ນ: ຕອນພັກບ່ຽງ 15-30 ນາທີ) ໂດຍບໍ່ທຳລາຍອາຍຸແບັດເຕີຣີ ແລະ ບໍ່ຕ້ອງລໍຖ້າໃຫ້ແບັດໝົດຄືແບັດນ້ຳກົດ."
                      : "Opportunity charging enables rapid top-ups during short 15-30 min breaks without battery degradation, keeping your multi-shift fleet running continuously."}
                  </p>

                  <div className="pt-2">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-yellow-400">Li-ION Fast Charge:</span>
                        <span className="font-mono font-black text-white">1.25 - 2 Hours (100%)</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div className="bg-yellow-400 h-full rounded-full w-full" />
                      </div>

                      <div className="flex items-center justify-between text-xs pt-2">
                        <span className="font-bold text-slate-400">Traditional Lead-Acid:</span>
                        <span className="font-mono text-slate-400">8 - 10 Hours (100%)</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div className="bg-slate-600 h-full rounded-full w-[25%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div 
                    onClick={() => setLightbox({
                      isOpen: true,
                      src: "/images/solutions/li-ion-fast-charge-comparison.png",
                      alt: "Li-Ion Fast Charge Comparison Chart",
                      titleLo: "ປຽບທຽບຄວາມໄວການສາກ: Lithium-Ion 1.25 ຊົ່ວໂມງ vs Lead-Acid 8-10 ຊົ່ວໂມງ",
                      titleEn: "Li-Ion Fast Charge Comparison Chart (1.25h vs 8-10h)",
                      subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1148px)",
                      subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                    })}
                    className="rounded-2xl overflow-hidden border border-white/10 bg-black/50 relative h-72 sm:h-96 cursor-pointer group/img"
                  >
                    <img
                      src="/images/solutions/li-ion-fast-charge-comparison.png"
                      alt="Li-Ion Fast Charge Comparison Chart"
                      fill
                      unoptimized
                      className="object-contain p-4 crisp-diagram group-hover/img:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                      <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                      <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Triple Electric Fleet Showcase: EFG, EKX, ETV */}
            <div className="rounded-3xl p-8 md:p-10 border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-slate-900 to-black">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <div className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-1">
                  THE DAWN OF A NEW AGE
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {isLo ? "ກອງລົດຍົກໄຟຟ້າ Lithium-Ion ຄົບທຸກຮູບແບບສາງ" : "Complete Lithium-Ion Fleet for Every Warehouse"}
                </h3>
              </div>

              <div 
                onClick={() => setLightbox({
                  isOpen: true,
                  src: "/images/solutions/jungheinrich-li-ion-dawn.png",
                  alt: "Jungheinrich Lithium-Ion Triple Fleet: EFG, EKX, ETV",
                  titleLo: "ຍຸກໃໝ່ແຫ່ງການຂັບເຄື່ອນ: Jungheinrich Lithium-Ion Triple Fleet (EFG, EKX, ETV)",
                  titleEn: "The Dawn of a New Age - Complete Li-Ion Fleet",
                  subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1122px)",
                  subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                })}
                className="rounded-2xl overflow-hidden border border-white/10 bg-black/60 relative h-64 sm:h-80 md:h-[420px] mb-8 cursor-pointer group/img"
              >
                <img
                  src="/images/solutions/jungheinrich-li-ion-dawn.png"
                  alt="Jungheinrich Lithium-Ion Triple Fleet: EFG, EKX, ETV"
                  fill
                  unoptimized
                  className="object-contain p-4 crisp-diagram group-hover/img:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                  <ZoomIn className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                </div>
              </div>

              {/* 3 Fleet Types Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs font-bold text-yellow-400 block mb-1">EFG SERIES</span>
                  <span className="text-sm font-extrabold text-white block">Counterbalance Forklifts</span>
                  <span className="text-xs text-slate-400">1.2 – 5.0t • 48V / 80V</span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs font-bold text-yellow-400 block mb-1">ETV SERIES</span>
                  <span className="text-sm font-extrabold text-white block">Electric Reach Trucks</span>
                  <span className="text-xs text-slate-400">ຍົກສູງ 13m • ຊ່ອງທາງແຄບ</span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs font-bold text-yellow-400 block mb-1">EKX SERIES</span>
                  <span className="text-sm font-extrabold text-white block">High-Rack VNA Stackers</span>
                  <span className="text-xs text-slate-400">ຍົກສູງ 18m • ລະບົບ Man-Up</span>
                </div>
              </div>
            </div>

            {/* Bottom Strategic CTA */}
            <div className="rounded-3xl p-8 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-slate-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-1 text-center md:text-left">
                <div className="text-xs font-black uppercase tracking-wider text-slate-900">
                  {isLo ? "ປ່ຽນຜ່ານສູ່ພະລັງງານສີຂຽວ ຫຼຸດຕົ້ນທຶນ 80%" : "TRANSITION TO GREEN POWER • SAVE 80% COSTS"}
                </div>
                <h4 className="text-2xl font-black text-slate-950">
                  {isLo ? "ພ້ອມຍົກລະດັບກອງລົດຍົກສາງຂອງທ່ານແລ້ວຫຼືຍັງ?" : "Ready to Upgrade Your Warehouse Fleet to Li-Ion?"}
                </h4>
                <p className="text-xs font-semibold text-slate-800">
                  {isLo
                    ? "ປຶກສາວິສະວະກອນ DK LAO ຟຣີ ເພື່ອຄຳນວນ ROI ແລະ ໄລຍະເວລາຄືນທຶນພາຍໃນ 24 ຊົ່ວໂມງ."
                    : "Free consultation with DK LAO engineers for customized fleet ROI calculation within 24 hours."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="https://wa.me/8562028023338?text=%E0%BA%AA%E0%BA%B0%E0%BA%9A%E0%BA%B2%E0%BA%8Overlap%E0%BA%94%E0%BA%B5%20%E0%BA%94%E0%BA%B5%E0%BA%87%E0%BA%84%20%E0%BA%A5%E0%BA%B2%E0%BA%A7%2C%20%E0%BA%82%E0%BB%89%E0%BA%B2%E0%BA%9E%E0%BA%B0%E0%BB%80%E0%BA%88%E0%BA%BB%E0%BB%89%E0%BA%B2%E0%BA%AA%E0%BA%BB%E0%BA%99%E0%BB%83%E0%BA%88%E0%BA%AA%E0%BA%AD%E0%BA%9A%E0%BA%96%E0%BA%B2%E0%BA%A1%E0%BB%82%E0%BA%8A%E0%BA%A5%E0%BA%B9%E0%BA%8A%E0%BA%B1%E0%BA%99%20Lithium-Ion%20%E0%BA%A3%E0%BA%B1%E0%BA%9A%E0%BA%9B%E0%BA%B0%E0%BA%81%E0%BA%B1%E0%BA%99%205%20%E0%BA%9B%E0%BA%B5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-white font-bold text-xs hover:bg-slate-900 transition-all shadow-lg"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: 020 2802 3338</span>
                </a>

                <Button
                  onClick={() => {
                    const el = document.getElementById("booking-form");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-5 py-3 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 shadow-md"
                >
                  <span>{isLo ? "ຂໍໃບສະເໜີລາຄາ 4S" : "Request 4S Proposal"}</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

          </motion.div>
        )}

      </div>

      {/* 2K High-Resolution Image Lightbox Modal */}
      <imgLightboxModal
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        src={lightbox.src}
        alt={lightbox.alt}
        titleLo={lightbox.titleLo}
        titleEn={lightbox.titleEn}
        subtitleLo={lightbox.subtitleLo}
        subtitleEn={lightbox.subtitleEn}
      />
    </section>
  );
}
