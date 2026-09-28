"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  Wrench,
  Boxes,
  Zap,
  Flame,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  PhoneCall,
  SlidersHorizontal,
  ExternalLink,
  Layers,
  Sparkles,
  Award,
  Package,
  ArrowRight,
  Maximize2,
  RotateCw,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageLightboxModal } from "@/components/ui/ImageLightboxModal";

interface PowertrainCard {
  id: string;
  nameLo: string;
  nameEn: string;
  fuelType: "diesel" | "lpg" | "electric-3w" | "electric-4w";
  fuelBadgeLo: string;
  fuelBadgeEn: string;
  liftHeight: string;
  capacity: string;
  voltage: string;
  descLo: string;
  descEn: string;
  highlightsLo: string[];
  highlightsEn: string[];
  badgeColor: string;
}

const POWERTRAIN_DATA: PowertrainCard[] = [
  {
    id: "diesel",
    nameLo: "ລົດຍົກດຸ່ນດ່ຽງ ດີເຊວ (Diesel Counterbalance)",
    nameEn: "Diesel Counterbalance Trucks",
    fuelType: "diesel",
    fuelBadgeLo: "ງານໜັກພິເສດ ສູງສຸດ 10 ໂຕນ",
    fuelBadgeEn: "Heavy-Duty up to 10 Tons",
    liftHeight: "3,300 – 7,660 mm",
    capacity: "2.0 – 5.5 t & 6.0 – 10.0 t",
    voltage: "ເຄື່ອງຈັກດີເຊວມາດຕະຖານຍີ່ປຸ່ນ",
    descLo: "ລົດຍົກພະລັງງານສູງສຸດ ອອກແບບສຳລັບງານກາງແຈ້ງ, ລານຕູ້ຄອນເທນເນີ, ໂຮງງານເຫຼັກ ແລະ ບໍ່ແຮ່.",
    descEn: "Maximum torque workhorse engineered for rough outdoor yards, container depots, steel mills, and mining operations.",
    highlightsLo: [
      "ກຳລັງຍົກໜັກສູງສຸດ 10 ໂຕນ ພ້ອມໂຄງສ້າງເຫຼັກກ້າ High-Tensile Steel",
      "ເຄື່ອງຈັກ Mitsubishi Diesel ທົນທານ, ປະຢັດນ້ຳມັນ, ຊ່ອມບຳລຸງງ່າຍ",
      "ລະບົບລະບາຍຄວາມຮ້ອນຂະໜາດໃຫຍ່ ສຳລັບອາກາດຮ້ອນຈັດໃນ ສປປ ລາວ",
    ],
    highlightsEn: [
      "Heavy load capacity up to 10 tons with high-tensile chassis",
      "Durable Mitsubishi industrial diesel engine with proven low fuel consumption",
      "Heavy-duty tropical cooling package engineered for Laos climate",
    ],
    badgeColor: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  },
  {
    id: "lpg",
    nameLo: "ລົດຍົກດຸ່ນດ່ຽງ ແກັສ (LPG Counterbalance)",
    nameEn: "LPG Counterbalance Trucks",
    fuelType: "lpg",
    fuelBadgeLo: "ພະລັງງານສະອາດ ທັງໃນ-ນອກອາຄານ",
    fuelBadgeEn: "Clean-Burning Indoor/Outdoor",
    liftHeight: "3,300 – 7,655 mm",
    capacity: "1.5 – 3.5 t & 4.0 – 5.5 t",
    voltage: "ລະບົບແກັສ LPG ສາກົນ",
    descLo: "ລົດຍົກແກັສ LPG ເຜົາໄໝ້ສົມບູນ ໄອເສຍຕ່ຳ ເໝາະສຳລັບໂຮງງານທີ່ຕ້ອງການທັງພະລັງງານ ແລະ ຄວາມສະອາດ.",
    descEn: "Clean-burning LPG counterbalance delivering high acceleration with low emissions for indoor/outdoor versatility.",
    highlightsLo: [
      "ປ່ຽນຖັງແກັສສະດວກພາຍໃນ 2 ນາທີ ບໍ່ຕ້ອງລໍຖ້າສາກໄຟ",
      "ຄວັນໄອເສຍຕ່ຳກວ່ານ້ຳມັນ ໃຊ້ງານໃນອາຄານທີ່ມີການລະບາຍອາກາດໄດ້",
      "ອັດຕາເລັ່ງ ແລະ ແຮງບິດໄວ ເຮັດຮອບວຽກໄດ້ຢ່າງຕໍ່ເນື່ອງ",
    ],
    highlightsEn: [
      "Quick 2-minute cylinder swap with zero charging downtime",
      "Significantly lower emissions suitable for ventilated indoor facilities",
      "Rapid acceleration and torque response for high-cycle throughput",
    ],
    badgeColor: "border-blue-500/40 bg-blue-500/10 text-blue-400",
  },
  {
    id: "electric-3w",
    nameLo: "ລົດຍົກໄຟຟ້າ 3 ລໍ້ (Electric 3-Wheel)",
    nameEn: "Electric 3-Wheel Counterbalance",
    fuelType: "electric-3w",
    fuelBadgeLo: "ຄ່ອງຕົວສູງສຸດ 48 Volt",
    fuelBadgeEn: "Agile 48 Volt Dual Drive",
    liftHeight: "3,290 – 7,625 mm",
    capacity: "1.5 – 3.5 t & 4.0 – 5.5 t",
    voltage: "48 Volt AC System",
    descLo: "ລົດຍົກໄຟຟ້າ 3 ລໍ້ ລ້ຽວວົງແຄບສຸດໆ ອອກແບບສຳລັບສາງສິນຄ້າທີ່ຕ້ອງການຄວາມວ່ອງໄວ ແລະ ປອດມົນລະພິດ.",
    descEn: "Ultra-agile 3-wheel electric with class-leading turning radius for tight aisle maneuvering and zero emissions.",
    highlightsLo: [
      "ລະບົບມໍເຕີຄູ່ Dual-Motor Front Drive ລ້ຽວໄດ້ເຖິງ 100 ອົງສາ",
      "ປອດຄວັນພິດ 100% ສຽງງຽບ ສະດວກສະບາຍຕໍ່ຜູ້ຂັບຂີ່",
      "ຮອງຮັບທັງແບັດເຕີຣີ Lead-Acid ແລະ Lithium-Ion",
    ],
    highlightsEn: [
      "Dual-motor front drive with near 100-degree steer axle angle",
      "100% zero exhaust emissions and quiet operation for clean zones",
      "Compatible with both heavy lead-acid and modern Li-Ion batteries",
    ],
    badgeColor: "border-teal-500/40 bg-teal-500/10 text-teal-400",
  },
  {
    id: "electric-4w",
    nameLo: "ລົດຍົກໄຟຟ້າ 4 ລໍ້ (Electric 4-Wheel)",
    nameEn: "Electric 4-Wheel Counterbalance",
    fuelType: "electric-4w",
    fuelBadgeLo: "ພະລັງງານສູງ 80 Volt Heavy-Duty",
    fuelBadgeEn: "High-Power 80 Volt Heavy-Duty",
    liftHeight: "3,290 – 7,625 mm",
    capacity: "2.5 – 3.5 t & 4.0 – 5.5 t",
    voltage: "80 Volt High-Output AC",
    descLo: "ລົດຍົກໄຟຟ້າ 4 ລໍ້ ພະລັງງານ 80V ດຸ່ນດ່ຽງສູງ ແລ່ນຂ້າມຣ້ຳລຽບນຽນ ຮອງຮັບງານໜັກທຽບເທົ່າລົດນ້ຳມັນ.",
    descEn: "High-output 80V 4-wheel electric delivering extreme stability, smooth ramp climbing, and diesel-rivaling power.",
    highlightsLo: [
      "ພະລັງງານ 80 Volt ແຮງບິດສູງ ຮອງຮັບການຍົກສິນຄ້າໜັກເຖິງ 5.5 ໂຕນ",
      "ຄວາມໝັ້ນຄົງສູງສຸດຂະນະແລ່ນເທິງພື້ນຜິວບໍ່ລຽບ ຫຼື ທາງລາດຊັນ",
      "ລະບົບຄວບຄຸມອັດສະລິຍະ ຊ່ວຍປະຢັດພະລັງງານ ແລະ ຍືດອາຍຸການໃຊ້ງານ",
    ],
    highlightsEn: [
      "80-Volt high-torque electric powertrain lifting up to 5.5 tons",
      "Maximum 4-wheel stability over uneven warehouse floors and ramps",
      "Intelligent motor controller maximizing energy regeneration",
    ],
    badgeColor: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  },
];

const WAREHOUSE_LINEUP = [
  {
    titleLo: "1. ລົດລາກພາເລັດໄຟຟ້າ (Powered Pallet Trucks)",
    titleEn: "1. Powered Pallet Trucks",
    descLo: "ລົດລາກພາເລັດໄຟຟ້າຂະໜາດກະທັດຮັດ: ແບບຍ່າງຕາມ (Pedestrian), ແບບມີແປ້ນຢືນຂັບ (Platform), ແລະ ແບບຂັບຂີ່ (Ride-On).",
    descEn: "Electric pedestrian, foldable platform, and heavy-duty ride-on pallet trucks for fast dock loading.",
    capacity: "1.6 – 3.0 t",
    badgeLo: "ວຽກຖ່າຍສິນຄ້າ & ໂຫຼດຕູ້",
    badgeEn: "Loading & Horizontal Transit",
  },
  {
    titleLo: "2. ລົດຍົກຈັດຊ້ອນພາເລັດ (Stackers)",
    titleEn: "2. Electric Pallet Stackers",
    descLo: "ລົດຍົກຈັດຊ້ອນພາເລັດໄຟຟ້າ: ແບບຍ່າງຕາມ, ແບບມີໂຄງຫຼັງຄາຄຸ້ມກັນ (Overhead Guard), ແລະ ແບບຂາກວ້າງ Straddle.",
    descEn: "Pedestrian stackers, platform stackers with overhead guard, and straddle models for narrow-aisle storage.",
    capacity: "1.2 – 2.0 t",
    badgeLo: "ຍົກຊັ້ນວາງລະດັບກາງ",
    badgeEn: "Mid-Level Racking",
  },
  {
    titleLo: "3. ລົດຍົກ Reach Trucks & Multi-Way (ຫຼາຍທິດທາງ)",
    titleEn: "3. Reach & Multi-Way Trucks",
    descLo: "ລົດຍົກສາງຊ່ອງທາງແຄບ Reach Truck ແລະ ລົດຍົກ 4 ທິດທາງ (Multi-Way) ສຳລັບຍົກສິນຄ້າຍາວ ເຊັ່ນ: ທໍ່ເຫຼັກ, ໄມ້, ແຜ່ນອາລູມີນຽມ.",
    descEn: "Pantograph & moving mast reach trucks plus 4-directional multi-way trucks for long loads like pipes and timber.",
    capacity: "1.4 – 2.5 t",
    badgeLo: "ຍົກສູງ & ສິນຄ້າຍາວ",
    badgeEn: "High-Reach & Long Loads",
  },
  {
    titleLo: "4. ລົດຍົກຢິບສິນຄ້າ (Order Pickers)",
    titleEn: "4. Order Pickers",
    descLo: "ລົດຍົກຢິບສິນຄ້າລະດັບຕ່ຳ (Low-Level) ແລະ ລະດັບສູງຄົນຂັບຍົກຂຶ້ນພ້ອມ (Man-Up High-Level) ສຳລັບສູນກະຈາຍສິນຄ້າ E-Commerce.",
    descEn: "Low-level fast order pickers and vertical high-level man-up order pickers for intensive fulfillment centers.",
    capacity: "1.0 – 2.5 t",
    badgeLo: "ສູນກະຈາຍສິນຄ້າ E-Commerce",
    badgeEn: "Fulfillment & Picking",
  },
];

const SPECIALIZED_ATTACHMENTS = [
  {
    nameLo: "Side Shifter (ງ່າເລື່ອນຊ້າຍ-ຂວາ)",
    nameEn: "Side Shifter",
    descLo: "ເລື່ອນງ່າຍົກໄປຊ້າຍ-ຂວາ ໄດ້ຢ່າງແມ່ນຢຳ ໂດຍບໍ່ຕ້ອງຖອຍລົດຂຍັບ ຊ່ວຍປະຢັດເວລາຈັດຮຽງພາເລັດ 40%.",
    descEn: "Lateral fork shifting left and right without maneuvering the forklift, saving up to 40% pallet alignment time.",
  },
  {
    nameLo: "Hinged Fork (ງ່າພັບເທໄດ້)",
    nameEn: "Hinged Fork",
    descLo: "ງ່າຍົກທີ່ສາມາດພັບງໍຂຶ້ນ-ລົງ ສຳລັບຕິດບຸ້ງກີ໋ (Bucket) ຕັກດິນ, ຫີນ, ຊາຍ, ຫຼື ເທຖອກສິນຄ້າກະສິກຳ.",
    descEn: "Hydraulic hinged forks tilting up/down, compatible with scoops and buckets for loose bulk materials.",
  },
  {
    nameLo: "Fork Positioner (ລະບົບປັບໄລຍະຫ່າງງ່າ)",
    nameEn: "Fork Positioner",
    descLo: "ປັບຂະຫຍາຍ ແລະ ຫຍໍ້ໄລຍະຫ່າງຂອງງ່າງ່າຍໆດ້ວຍລະບົບໄຮໂດຼລິກຈາກຫ້ອງຄົນຂັບ ບໍ່ຕ້ອງລົງມາຍູ້ດ້ວຍມື.",
    descEn: "Hydraulic fork spread adjustment directly from the cab, instantly accommodating varying pallet widths.",
  },
  {
    nameLo: "Rotating Fork (ງ່າໝຸນ 360 ອົງສາ)",
    nameEn: "Rotating Fork",
    descLo: "ງ່າຍົກໝຸນໄດ້ຮອບທິດທາງ 360° ສຳລັບເທຖອກຖັງຂີ້ເຫຍື້ອ, ຖັງສານເຄມີ, ເສດໂລຫະ, ແລະ ວັດຖຸດິບ.",
    descEn: "Continuous 360-degree rotation for dumping bins, liquid containers, scrap metal, and industrial raw materials.",
  },
  {
    nameLo: "Rotating Roll Clamp (ງ່າໜີບມ້ວນເຈ້ຍ 360°)",
    nameEn: "Rotating Roll Clamp",
    descLo: "ງ່າໜີບມ້ວນເຈ້ຍ, ມ້ວນເຫຼັກ, ມ້ວນຟິມ ໝຸນ 360° ພ້ອມລະບົບຄວບຄຸມແຮງໜີບອັດສະລິຍະ ບໍ່ເຮັດໃຫ້ມ້ວນເສຍຮູບ.",
    descEn: "360-degree rotating paper roll clamps with intelligent pressure regulation to prevent roll out-of-round deformation.",
  },
  {
    nameLo: "Load Stabilizer (ແຜງກົດທັບປ້ອງກັນສິນຄ້າລົ້ມ)",
    nameEn: "Load Stabilizer",
    descLo: "ແຜງກົດທັບດ້ານເທິງພາເລັດ ສຳລັບສິນຄ້າທີ່ແຕກຫັກງ່າຍ ເຊັ່ນ: ລັງຂວດແກ້ວ, ເຄື່ອງດື່ມ, ກະປ໋ອງ.",
    descEn: "Hydraulic top clamping plate securing unstable and fragile stacked loads such as beverage crates and glass bottles.",
  },
  {
    nameLo: "Bale Clamp (ງ່າໜີບກ້ອນສິນຄ້າ)",
    nameEn: "Bale Clamp",
    descLo: "ງ່າໜີບກ້ອນສິນຄ້າໂດຍບໍ່ຕ້ອງໃຊ້ພາເລັດ ເຊັ່ນ: ກ້ອນຝ້າຍ, ເຈ້ຍອັດແໜ້ນ, ຢາງພາລາ, ຂີ້ເຫຍື້ອຣີໄຊເຄິນ.",
    descEn: "Pallet-less handling clamp designed for cotton bales, compacted waste paper, natural rubber, and recycling materials.",
  },
];

export function MitsubishiForkliftShowcase() {
  const locale = useLocale();
  const isLo = locale === "lo";
  const [activeTab, setActiveTab] = useState<"powertrains" | "warehouse" | "attachments">("powertrains");

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

  return (
    <section id="mitsubishi-forklifts" className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/3 w-[650px] h-[650px] bg-emerald-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container px-4 max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-sm">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>DK LAO • MITSUBISHI FORKLIFT TRUCKS OFFICIAL SOLUTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            {isLo ? (
              <>
                ລົດຍົກໂຟກສ໌ລິບ <span className="text-emerald-400">Mitsubishi Forklift Trucks</span> & ອຸປະກອນເສີມ <span className="text-teal-400">Attachments</span>
              </>
            ) : (
              <>
                <span className="text-emerald-400">Mitsubishi Forklift Trucks</span> & Specialized <span className="text-teal-400">Attachments</span>
              </>
            )}
          </h2>

          <p className="text-slate-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {isLo
              ? "Powerful Efficiency. ຄຸນນະພາບມາດຕະຖານຍີ່ປຸ່ນ ຊ່ວຍເພີ່ມເວລາປະຕິບັດງານ (Increased Uptime) ຄົບທັງ 4 ລະບົບຂັບເຄື່ອນ (ດີເຊວສູງສຸດ 10 ໂຕນ, LPG, ໄຟຟ້າ 48V/80V) ພ້ອມອຸປະກອນເສີມຫຼາກຫຼາຍ."
              : "Powerful Efficiency. High quality components and easy maintenance mean increased uptime across Diesel (up to 10t), LPG, Electric 48V/80V, and specialized industrial attachments."}
          </p>

          {/* 3 Main View Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab("powertrains")}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                activeTab === "powertrains"
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-105"
                  : "bg-white/10 text-slate-300 hover:bg-white/15 border border-white/10"
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>{isLo ? "1. 4 ລະບົບຂັບເຄື່ອນດຸ່ນດ່ຽງ (Diesel 10t, LPG, Electric)" : "1. 4 Powertrains Counterbalance"}</span>
            </button>

            <button
              onClick={() => setActiveTab("warehouse")}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                activeTab === "warehouse"
                  ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-105"
                  : "bg-white/10 text-slate-300 hover:bg-white/15 border border-white/10"
              }`}
            >
              <Boxes className="w-4 h-4" />
              <span>{isLo ? "2. ອຸປະກອນສາງໄຟຟ້າສີຂຽວ (Warehouse Lineup)" : "2. Warehouse Lineup"}</span>
            </button>

            <button
              onClick={() => setActiveTab("attachments")}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                activeTab === "attachments"
                  ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-105"
                  : "bg-white/10 text-slate-300 hover:bg-white/15 border border-white/10"
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>{isLo ? "3. 7 ອຸປະກອນເສີມພິເສດ (Attachments & Forks)" : "3. 7 Attachments & Accessories"}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: 4 POWERTRAINS COUNTERBALANCE */}
        {/* ========================================================================= */}
        {activeTab === "powertrains" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            {/* Slide 1 & 2 Visual Banners */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div 
                onClick={() => setLightbox({
                  isOpen: true,
                  src: "/images/solutions/mitsubishi-powerful-efficiency.png",
                  alt: "Mitsubishi Forklift Trucks Powerful Efficiency",
                  titleLo: "ລົດຍົກ Mitsubishi Forklift Trucks Powerful Efficiency",
                  titleEn: "Mitsubishi Forklift Trucks Powerful Efficiency",
                  subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1150px)",
                  subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                })}
                className="rounded-3xl overflow-hidden border border-emerald-500/30 bg-black/40 shadow-2xl relative h-64 sm:h-80 cursor-pointer group/img"
              >
                <Image
                  src="/images/solutions/mitsubishi-powerful-efficiency.png"
                  alt="Mitsubishi Forklift Trucks Powerful Efficiency"
                  fill
                  unoptimized
                  priority
                  className="object-contain p-3 crisp-diagram group-hover/img:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-[11px] font-bold text-emerald-400">
                  POWERFUL EFFICIENCY • MITSUBISHI QUALITY
                </div>
                <div className="absolute top-3 right-3 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                  <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isLo ? "🔍 ຊູມ 2K" : "🔍 Zoom 2K"}</span>
                </div>
              </div>

              <div 
                onClick={() => setLightbox({
                  isOpen: true,
                  src: "/images/solutions/mitsubishi-powertrain-matrix.png",
                  alt: "Mitsubishi Forklift Trucks Powertrain Matrix",
                  titleLo: "ຕາຕະລາງປຽບທຽບ 4 ລະບົບຂັບເຄື່ອນ Mitsubishi (Powertrain Matrix)",
                  titleEn: "Mitsubishi 4 Powertrains Perfect Fit Matrix",
                  subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1144px)",
                  subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                })}
                className="rounded-3xl overflow-hidden border border-emerald-500/30 bg-black/40 shadow-2xl relative h-64 sm:h-80 cursor-pointer group/img"
              >
                <Image
                  src="/images/solutions/mitsubishi-powertrain-matrix.png"
                  alt="Mitsubishi Forklift Trucks Powertrain Matrix"
                  fill
                  unoptimized
                  className="object-contain p-3 crisp-diagram group-hover/img:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-[11px] font-bold text-teal-400">
                  4 POWERTRAINS • PERFECT FIT MATRIX
                </div>
                <div className="absolute top-3 right-3 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                  <ZoomIn className="w-3.5 h-3.5 text-teal-400" />
                  <span>{isLo ? "🔍 ຊູມ 2K" : "🔍 Zoom 2K"}</span>
                </div>
              </div>
            </div>

            {/* 4 Powertrains Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {POWERTRAIN_DATA.map((card) => (
                <div
                  key={card.id}
                  className="rounded-3xl border border-white/10 bg-white/5 p-7 hover:border-emerald-500/50 hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${card.badgeColor}`}>
                        {isLo ? card.fuelBadgeLo : card.fuelBadgeEn}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {card.voltage}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                      {isLo ? card.nameLo : card.nameEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                      {isLo ? card.descLo : card.descEn}
                    </p>

                    {/* Technical Specs Block */}
                    <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-black/40 border border-white/5 mb-6 text-center">
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400">
                          {isLo ? "ຄວາມສູງຍົກ (Lift Height)" : "Lift Height"}
                        </span>
                        <span className="text-sm font-black text-emerald-400">
                          {card.liftHeight}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400">
                          {isLo ? "ນ້ຳໜັກຍົກ (Capacity)" : "Capacity Range"}
                        </span>
                        <span className="text-sm font-black text-white">
                          {card.capacity}
                        </span>
                      </div>
                    </div>

                    {/* Highlights Checklist */}
                    <div className="space-y-2 mb-6">
                      {(isLo ? card.highlightsLo : card.highlightsEn).map((hl, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <a
                      href={`https://wa.me/8562028023338?text=${encodeURIComponent(
                        isLo
                          ? `ສະບາຍດີ ດີເຄ ລາວ, ຂ້າພະເຈົ້າສົນໃຈສອບຖາມຂໍ້ມູນລົດຍົກ Mitsubishi ${card.nameLo}.`
                          : `Hello DK LAO, I would like to inquire about Mitsubishi ${card.nameEn}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400 hover:text-green-300 transition-colors"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>{isLo ? "ສອບຖາມ WhatsApp ດ່ວນ" : "WhatsApp Inquiry"}</span>
                    </a>

                    <Button
                      size="sm"
                      className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs"
                      onClick={() => {
                        const el = document.getElementById("booking-form");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <span>{isLo ? "ຂໍໃບສະເໜີລາຄາ" : "Get Proposal"}</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MITSUBISHI WAREHOUSE LINEUP */}
        {/* ========================================================================= */}
        {activeTab === "warehouse" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            {/* Slide 3 Visual Banner */}
            <div 
              onClick={() => setLightbox({
                isOpen: true,
                src: "/images/solutions/mitsubishi-warehouse-lineup.png",
                alt: "Mitsubishi Warehouse Lineup - Pallet Trucks, Stackers, Reach Trucks, Order Pickers",
                titleLo: "ລົດຍົກສາງໄຟຟ້າ Mitsubishi Green Warehouse Electric Fleet",
                titleEn: "Mitsubishi Green Warehouse Electric Fleet",
                subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1160px)",
                subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
              })}
              className="rounded-3xl overflow-hidden border border-teal-500/30 bg-black/40 shadow-2xl relative h-64 sm:h-80 md:h-96 cursor-pointer group/img"
            >
              <Image
                src="/images/solutions/mitsubishi-warehouse-lineup.png"
                alt="Mitsubishi Warehouse Lineup - Pallet Trucks, Stackers, Reach Trucks, Order Pickers"
                fill
                unoptimized
                className="object-contain p-3 crisp-diagram group-hover/img:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-xs font-bold text-teal-400">
                MITSUBISHI GREEN WAREHOUSE ELECTRIC FLEET
              </div>
              <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                <ZoomIn className="w-3.5 h-3.5 text-teal-400" />
                <span>{isLo ? "🔍 ຊູມ 2K" : "🔍 Zoom 2K"}</span>
              </div>
            </div>

            {/* 4 Warehouse Equipment Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WAREHOUSE_LINEUP.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/10 bg-white/5 p-7 hover:border-teal-500/50 hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/15 border border-teal-500/30 text-teal-300">
                        {isLo ? item.badgeLo : item.badgeEn}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        Capacity: {item.capacity}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white mb-2">
                      {isLo ? item.titleLo : item.titleEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                      {isLo ? item.descLo : item.descEn}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-semibold text-teal-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isLo ? "ມາດຕະຖານໂຮງງານຍີ່ປຸ່ນ" : "Japanese Engineering"}</span>
                    </span>

                    <Button
                      size="sm"
                      variant="outline"
                      className="border-teal-500/30 text-teal-300 hover:bg-teal-500 hover:text-slate-950 text-xs font-bold"
                      onClick={() => {
                        const el = document.getElementById("booking-form");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <span>{isLo ? "ສອບຖາມສະເປັກ" : "Inquire Specs"}</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: 7 SPECIALIZED ATTACHMENTS & HEAVY APPLICATIONS */}
        {/* ========================================================================= */}
        {activeTab === "attachments" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {/* Top Banners: Slide 4 & Slide 5 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div 
                onClick={() => setLightbox({
                  isOpen: true,
                  src: "/images/solutions/mhe-attachments-application.png",
                  alt: "Industrial Attachments - Multiple Load Handlers, Paper Roll Clamps, Carton Clamps",
                  titleLo: "ອຸປະກອນເສີມລົດຍົກສຳລັບທຸກການນຳໃຊ້ (Whatever The Application, We Can Handle It)",
                  titleEn: "Industrial Attachments for Diverse Applications",
                  subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1128px)",
                  subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                })}
                className="rounded-3xl overflow-hidden border border-amber-500/30 bg-black/40 shadow-2xl relative h-64 sm:h-80 cursor-pointer group/img"
              >
                <Image
                  src="/images/solutions/mhe-attachments-application.png"
                  alt="Industrial Attachments - Multiple Load Handlers, Paper Roll Clamps, Carton Clamps"
                  fill
                  unoptimized
                  className="object-contain p-3 crisp-diagram group-hover/img:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-[11px] font-bold text-amber-400">
                  WHATEVER THE APPLICATION, WE CAN HANDLE IT
                </div>
                <div className="absolute top-3 right-3 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                  <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isLo ? "🔍 ຊູມ 2K" : "🔍 Zoom 2K"}</span>
                </div>
              </div>

              <div 
                onClick={() => setLightbox({
                  isOpen: true,
                  src: "/images/solutions/mhe-7-specialized-attachments.png",
                  alt: "7 Specialized Forklift Attachments on Mitsubishi Green Forklifts",
                  titleLo: "7 ອຸປະກອນເສີມສະເພາະທາງລະດັບອຸດສາຫະກຳ (7 Core Specialized Attachments)",
                  titleEn: "7 Core Specialized Forklift Attachments",
                  subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1142px)",
                  subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                })}
                className="rounded-3xl overflow-hidden border border-amber-500/30 bg-black/40 shadow-2xl relative h-64 sm:h-80 cursor-pointer group/img"
              >
                <Image
                  src="/images/solutions/mhe-7-specialized-attachments.png"
                  alt="7 Specialized Forklift Attachments on Mitsubishi Green Forklifts"
                  fill
                  unoptimized
                  className="object-contain p-3 crisp-diagram group-hover/img:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-[11px] font-bold text-amber-400">
                  7 CORE SPECIALIZED ATTACHMENTS
                </div>
                <div className="absolute top-3 right-3 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                  <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isLo ? "🔍 ຊູມ 2K" : "🔍 Zoom 2K"}</span>
                </div>
              </div>
            </div>

            {/* Heavy Applications 4 Cards */}
            <div className="rounded-3xl p-8 border border-white/10 bg-white/5 backdrop-blur-xl">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-amber-400" />
                <span>{isLo ? "ອຸປະກອນເສີມສະເພາະອຸດສາຫະກຳຂະໜາດໃຫຍ່ (Heavy Application Solutions)" : "Heavy Industrial Application Attachments"}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <span className="text-xs font-bold text-amber-400 block">MULTIPLE LOAD HANDLERS</span>
                  <h4 className="text-sm font-extrabold text-white">ຍົກ 2-4 ພາເລັດພ້ອມກັນ</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isLo ? "ສຳລັບໂຮງງານຜະລິດເຄື່ອງດື່ມ, ໂຮງງານບັນຈຸຂວດ/ກະປ໋ອງ ຊ່ວຍໂຫຼດຕູ້ໄວຂຶ້ນ 300%." : "Handle 2-4 pallets simultaneously, boosting trailer loading speed by 300%."}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <span className="text-xs font-bold text-amber-400 block">PAPER ROLL CLAMPS</span>
                  <h4 className="text-sm font-extrabold text-white">ງ່າໜີບມ້ວນເຈ້ຍຂະໜາດໃຫຍ່</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isLo ? "ສຳລັບໂຮງງານເຈ້ຍ, ໂຮງພິມ, ສາງບັນຈຸພັນ ໝຸນ 360° ພ້ອມປ້ອງກັນມ້ວນເຈ້ຍເສຍຫາຍ." : "Engineered for paper mills, printing, and packaging plants with 360-degree rotation."}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <span className="text-xs font-bold text-amber-400 block">CARTON & WHITE GOODS</span>
                  <h4 className="text-sm font-extrabold text-white">ງ່າໜີບກ່ອງ & ເຄື່ອງໃຊ້ໄຟຟ້າ</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isLo ? "ຍົກຍ້າຍຕູ້ເຢັນ, ເຄື່ອງຊັກຜ້າ, ສິນຄ້າໃນກ່ອງໃຫຍ່ໂດຍບໍ່ຕ້ອງໃຊ້ພາເລັດ ປະຢັດຕົ້ນທຶນ 100%." : "Pallet-less handling for refrigerators, washers, and large boxed consumer electronics."}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <span className="text-xs font-bold text-amber-400 block">SPECIALTY PRODUCTS</span>
                  <h4 className="text-sm font-extrabold text-white">ງ່າຈັບພິເສດສະເພາະທາງ</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isLo ? "ງ່າສວມຍົກທໍ່ເຫຼັກ, ງ່າຈັບຖັງນ້ຳມັນ 200L, ງ່າຍົກວົງລໍ້ ແລະ ໂຄງສ້າງສະເພາະ." : "Custom forks for steel pipes, 200L drum grabbers, wheel clamps, and bespoke attachments."}
                  </p>
                </div>
              </div>
            </div>

            {/* 7 Core Attachments Detail Grid */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-400" />
                <span>{isLo ? "7 ປະເພດອຸປະກອນເສີມຍອດນິຍົມ (7 Core Attachments Breakdown)" : "7 Core Specialized Attachments Breakdown"}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SPECIALIZED_ATTACHMENTS.map((att, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-amber-500/40 hover:bg-white/[0.08] transition-all"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span>{att.nameEn}</span>
                    </div>

                    <h4 className="text-base font-extrabold text-white mb-2">
                      {isLo ? att.nameLo : att.nameEn}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isLo ? att.descLo : att.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Consultation CTA */}
            <div className="rounded-3xl p-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-1 text-center md:text-left">
                <div className="text-xs font-black uppercase tracking-wider text-emerald-200">
                  {isLo ? "ປຶກສາວິສະວະກອນເລືອກ ATTACHMENT ໃຫ້ກົງກັບສິນຄ້າ" : "MATCH THE PERFECT ATTACHMENT TO YOUR CARGO"}
                </div>
                <h4 className="text-2xl font-black text-white">
                  {isLo ? "ຕ້ອງການອຸປະກອນເສີມສະເພາະດ້ານສຳລັບໂຮງງານຂອງທ່ານ?" : "Need Custom Attachments for Your Manufacturing Plant?"}
                </h4>
                <p className="text-xs text-emerald-100">
                  {isLo
                    ? "ທີມງານ DK LAO ພ້ອມລົງສຳຫຼວດໄຊທ໌ງານ ແລະ ແນະນຳຂະໜາດງ່າຍົກ/ອຸປະກອນເສີມທີ່ຕອບໂຈດ 100%."
                    : "DK LAO technical team offers on-site application surveys to recommend the optimal attachment combination."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="https://wa.me/8562028023338?text=%E0%BA%AA%E0%BA%B0%E0%BA%9A%E0%BA%B2%E0%BA%8Overlap%E0%BA%94%E0%BA%B5%20%E0%BA%94%E0%BA%B5%E0%BA%87%E0%BA%84%20%E0%BA%A5%E0%BA%B2%E0%BA%A7%2C%20%E0%BA%82%E0%BB%89%E0%BA%B2%E0%BA%9E%E0%BA%B0%E0%BB%80%E0%BA%88%E0%BA%BB%E0%BB%89%E0%BA%B2%E0%BA%AA%E0%BA%BB%E0%BA%99%E0%BB%83%E0%BA%88%E0%BA%AA%E0%BA%AD%E0%BA%9A%E0%BA%96%E0%BA%B2%E0%BA%A1%E0%BA%AD%E0%BA%B8%E0%BA%9B%E0%BA%B0%E0%BA%81%E0%BA%AD%E0%BA%99%E0%BB%80%E0%BA%AA%E0%BA%B5%E0%BA%A1%20Attachments"
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
                  <span>{isLo ? "ຂໍໃບສະເໜີລາຄາ Attachments" : "Request Quote"}</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

          </motion.div>
        )}

      </div>

      {/* 2K High-Resolution Image Lightbox Modal */}
      <ImageLightboxModal
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
