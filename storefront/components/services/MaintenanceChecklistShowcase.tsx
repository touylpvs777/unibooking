"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  ChevronRight,
  PhoneCall,
  Sparkles,
  SlidersHorizontal,
  Layers,
  BatteryCharging,
  Gauge,
  Eye,
  Paintbrush,
  Printer,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageLightboxModal } from "@/components/ui/ImageLightboxModal";

interface MaintenanceChecklistProps {
  onOpenInspectionModal?: () => void;
}

interface ChecklistItem {
  id: number;
  part: 1 | 2;
  titleLo: string;
  titleEn: string;
  descLo: string;
  descEn: string;
  checksLo: string[];
  checksEn: string[];
  color: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Part 1: Powertrain, Electrical & Operational (Orange Series)
  {
    id: 1,
    part: 1,
    titleLo: "1. ການກະກຽມ ແລະ ທຳຄວາມສະອາດ (Preparation & Cleaning)",
    titleEn: "1. Preparation & Cleaning",
    descLo: "ລ້າງທຳຄວາມສະອາດຄາບນ້ຳມັນ, ຂີ້ຝຸ່ນ, ແລະ ສິ່ງເປິເປື້ອນອອກຈາກຕົວລົດ ເພື່ອໃຫ້ສາມາດກວດເຊັກຮອຍແຕກ ແລະ ການຮົ່ວໄຫຼໄດ້ຊັດເຈນ.",
    descEn: "High-pressure degreasing and chassis wash to expose hairline cracks, leaks, and structural stress points.",
    checksLo: ["ລ້າງອັດສີດຄາບນ້ຳມັນ", "ເປົ່າລົມແຫ້ງທຸກຈຸດເຊື່ອມຕໍ່", "ກວດສອບຮອຍຮົ່ວຊຶມເບື້ອງຕົ້ນ"],
    checksEn: ["High-pressure degreasing", "Air blow-drying electrical pins", "Initial leak inspection"],
    color: "border-amber-500/40 bg-amber-500/5 text-amber-400",
  },
  {
    id: 2,
    part: 1,
    titleLo: "2. ເຄື່ອງຈັກ (The Engine)",
    titleEn: "2. The Engine",
    descLo: "ກວດກາກຳລັງອັດກະບອກສູບ, ລະດັບນ້ຳມັນເຄື່ອງ, ໄສ້ກອງອາກາດ, ສາຍພານໜ້າເຄື່ອງ, ແລະ ລະບົບລະບາຍຄວາມຮ້ອນ (Radiator).",
    descEn: "Inspection of engine compression, industrial oil viscosity, air filter restriction, alternator belts, and cooling radiator.",
    checksLo: ["ລະດັບ ແລະ ຄຸນນະພາບນ້ຳມັນເຄື່ອງ", "ຄວາມຕຶງຂອງສາຍພານພັດລົມ", "ລະບົບນ້ຳຫຼໍ່ເຢັນ ແລະ ທໍ່ຢາງ"],
    checksEn: ["Engine oil level & viscosity", "Fan & alternator belt tension", "Coolant system & radiator hoses"],
    color: "border-amber-500/40 bg-amber-500/5 text-amber-400",
  },
  {
    id: 3,
    part: 1,
    titleLo: "3. ໝໍ້ໄຟລົດຍົກນ້ຳມັນ (Battery of Engine-Powered Forklift)",
    titleEn: "3. Starter Battery of Engine Forklift",
    descLo: "ກວດເຊັກແຮງດັນໄຟຟ້າສະຕາດ (CCA), ຂົ້ວແບັດເຕີຣີ, ສາຍດິນ, ແລະ ນ້ຳກົດສຳລັບລົດຍົກລະບົບດີເຊວ ແລະ LPG.",
    descEn: "Cranking amps (CCA) load test, terminal corrosion check, and alternator charging voltage for combustion engines.",
    checksLo: ["ຄ່າແຮງດັນ Cold Cranking Amps (CCA)", "ຄວາມສະອາດຂົ້ວບວກ-ລົບ", "ລະບົບໄດສາກ (Alternator Output)"],
    checksEn: ["Cold Cranking Amps (CCA)", "Terminal corrosion cleaning", "Alternator charging output"],
    color: "border-amber-500/40 bg-amber-500/5 text-amber-400",
  },
  {
    id: 4,
    part: 1,
    titleLo: "4. ມໍເຕີໄຟຟ້າ: ຂັບເຄື່ອນ & ປ້ຳ (Electric Motors: Traction & Pump)",
    titleEn: "4. Electric Motors: Traction & Pump",
    descLo: "ກວດກາແປງຖ່ານ (Carbon Brushes), ສຽງລູກປືນ, ຄ່າຄວາມຕ້ານທານ Insulation, ແລະ ອຸນຫະພູມມໍເຕີຂັບເຄື່ອນ ແລະ ມໍເຕີປ້ຳໄຮໂດຼລິກ.",
    descEn: "Inspection of commutator wear, bearing noise, thermal sensors, and insulation resistance for drive and pump motors.",
    checksLo: ["ແປງຖ່ານ ແລະ ຄອມມິວເຕເຕີ", "ອຸນຫະພູມການເຮັດວຽກປົກກະຕິ", "ສາຍສົ່ງກຳລັງໄຟຟ້າແຮງສູງ"],
    checksEn: ["Carbon brush wear limits", "Operating motor temperature", "Heavy-gauge motor cables"],
    color: "border-amber-500/40 bg-amber-500/5 text-amber-400",
  },
  {
    id: 5,
    part: 1,
    titleLo: "5. ໝໍ້ໄຟ & ເຄື່ອງສາກລົດໄຟຟ້າ (Battery & Charger of Electric Forklift)",
    titleEn: "5. Traction Battery & Charger",
    descLo: "ກວດສອບຄວາມຖ່ວງຈຳເພາະນ້ຳກົດທຸກ Cell, ສາຍສຽບ Anderson Plugs, ແລະ ລະບົບຕັດໄຟອັດຕະໂນມັດຂອງຕູ້ສາກ High-Frequency.",
    descEn: "Electrolyte specific gravity per cell, inter-cell connector resistance, Anderson connectors, and charger auto shut-off.",
    checksLo: ["ກວດຄ່າຄວາມຖ່ວງນ້ຳກົດທຸກ Cell", "ສະພາບສາຍສຽບ Anderson", "ລະບົບຕູ້ສາກຕັດໄຟອັດຕະໂນມັດ"],
    checksEn: ["Specific gravity hydrometer test", "Anderson connector condition", "Automatic charger shut-off test"],
    color: "border-amber-500/40 bg-amber-500/5 text-amber-400",
  },
  {
    id: 6,
    part: 1,
    titleLo: "6. ໄຟສັນຍານ, ສາຍຮັດນິລະໄພ & ອຸປະກອນເສີມ (Lights, Seatbelt & Accessories)",
    titleEn: "6. Lights, Seatbelt & Safety Gadgets",
    descLo: "ທົດສອບໄຟໜ້າ LED, ໄຟທ້າຍ, ໄຟສຸກເສີນ, ໄຊເຣນຖອຍຫຼັງ, ລະບົບລັອກສາຍຮັດນິລະໄພ OPS, ແລະ ແກຣກເຕືອນໄພ.",
    descEn: "Operational check of LED headlights, reverse beeper, strobe beacon, blue safety spotlight, and seatbelt interlock (OPS).",
    checksLo: ["ໄຟສ່ອງສະຫວ່າງ LED & ໄຟຖອຍ", "ສັນຍານສຽງ Siren ຖອຍຫຼັງ", "ລະບົບລັອກສາຍແອວນິລະໄພ OPS"],
    checksEn: ["LED headlights & tail lamps", "Reverse safety beeper", "Operator Presence Sensing (OPS)"],
    color: "border-amber-500/40 bg-amber-500/5 text-amber-400",
  },

  // Part 2: Structural, Chassis & Hydraulics (Green Series)
  {
    id: 7,
    part: 2,
    titleLo: "7. ຢາງລົດ (Tyres)",
    titleEn: "7. Tyres",
    descLo: "ກວດກາຄວາມເລິກດອກຢາງ, ຮອຍແຕກແຍກຂອງຢາງຕັນ, ຄວາມແໜ້ນຂອງນັອດລໍ້ (Wheel Torque), ແລະ ຄວາມດຸ່ນດ່ຽງສອງຂ້າງ.",
    descEn: "Tire tread depth, solid tire chunking/cracking, wheel rim integrity, and lug nut torque specification.",
    checksLo: ["ຄວາມເລິກດອກຢາງຕາມມາດຕະຖານ", "ແຮງຂັນນັອດລໍ້ຕາມສະເປັກ", "ກວດສອບຮອຍແຕກຢາງຕັນ"],
    checksEn: ["Tread wear gauge check", "Wheel lug nut torque spec", "Solid tire chunking inspection"],
    color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-400",
  },
  {
    id: 8,
    part: 2,
    titleLo: "8. ເສົາຕັກ ແລະ ສ້ອມຕັກ (Mast & Forks)",
    titleEn: "8. Mast & Forks",
    descLo: "ວັດແທກຄວາມຄົດງໍຂອງງ່າຍົກ (Fork Heel Wear ບໍ່ເກີນ 10%), ຄວາມຢືດຂອງໂສ້ຍົກ (Chain Elongation), ແລະ ລູກປືນເສົາ Mast Rollers.",
    descEn: "Caliper measurement of fork heel wear (<10%), lift chain pitch elongation, mast play, and tilt cylinder pins.",
    checksLo: ["ຄວາມໜາງ່າຍົກ Fork Caliper", "ຄວາມຢືດຂອງໂສ້ຍົກ (ບໍ່ເກີນ 3%)", "ລູກປືນຮາງເສົາ Mast Rollers"],
    checksEn: ["Fork heel caliper wear test", "Lift chain elongation gauge", "Mast guide roller play"],
    color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-400",
  },
  {
    id: 9,
    part: 2,
    titleLo: "9. ໂຕຖັງລົດ (The Chassis)",
    titleEn: "9. The Chassis",
    descLo: "ກວດກາຄວາມສົມບູນຂອງໂຄງສ້າງຫຼັກ, ຕຸ້ມຖ່ວງນ້ຳໜັກ (Counterweight Bolts), ແລະ ໂຄງຫຼັງຄານິລະໄພ (Overhead Guard - OHG).",
    descEn: "Structural frame crack inspection, counterweight mounting bolts, overhead guard structural weld integrity.",
    checksLo: ["ໂຄງຫຼັງຄານິລະໄພ Overhead Guard", "ນັອດຍຶດຕຸ້ມຖ່ວງ Counterweight", "ຮອຍຈອດໂຄງສ້າງຫຼັກ Chassis"],
    checksEn: ["Overhead Guard (OHG) welds", "Counterweight mounting bolts", "Chassis weld stress inspection"],
    color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-400",
  },
  {
    id: 10,
    part: 2,
    titleLo: "10. ລະບົບໄຮໂດຣລິກ (The Hydraulics)",
    titleEn: "10. The Hydraulics",
    descLo: "ກວດກາແຮງດັນປ້ຳ Main Pump, ການຮົ່ວຊຶມຂອງກະບອກສູບ Lift & Tilt Cylinders, ສາຍຢາງໄຮໂດຼລິກ, ແລະ ລະດັບນ້ຳມັນ ISO VG.",
    descEn: "Main relief valve pressure test, lift/tilt cylinder seal bypass check, hydraulic hose cracking, and oil clarity.",
    checksLo: ["ແຮງດັນປ້ຳໄຮໂດຼລິກ (Relief Valve)", "ຊີລກະບອກສູບຍົກ ແລະ ອຽງ", "ສະພາບສາຍຢາງທົນແຮງດັນສູງ"],
    checksEn: ["Main relief valve pressure", "Lift/tilt cylinder seal bypass", "High-pressure hose integrity"],
    color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-400",
  },
  {
    id: 11,
    part: 2,
    titleLo: "11. ລະບົບເບຣກ (The Brakes)",
    titleEn: "11. The Brakes",
    descLo: "ທົດສອບໄລຍະຢຸດຂອງເບຣກຕີນ (Service Brake), ຄວາມແໜ້ນຂອງເບຣກມື (Parking Brake Holding on 15% Ramp), ແລະ ລະດັບນ້ຳມັນເບຣກ.",
    descEn: "Service brake deceleration test, mechanical parking brake holding force on 15% incline, and master cylinder fluid level.",
    checksLo: ["ປະສິດທິພາບເບຣກຕີນຂະນະບັນທຸກ", "ເບຣກມືຄຸ້ມກັນທາງລາດຊັນ 15%", "ຄວາມໜາຜ້າເບຣກ ແລະ ຈານເບຣກ"],
    checksEn: ["Loaded service brake test", "Handbrake hold on 15% incline", "Brake shoe lining thickness"],
    color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-400",
  },
  {
    id: 12,
    part: 2,
    titleLo: "12. ການເຮັດສີ & ຕິດແທບສັນຍາລັກ (Painting & Decals)",
    titleEn: "12. Painting & Safety Decals",
    descLo: "ກວດກາປ້າຍ Load Capacity Chart, ປ້າຍເຕືອນອັນຕະລາຍ, ແທບສະທ້ອນແສງ, ແລະ ການທຳສີປ້ອງກັນສະໜິມມາດຕະຖານໂຮງງານ.",
    descEn: "Legibility of load capacity data plate, mandatory safety warning decals, reflective markings, and anti-corrosion paint.",
    checksLo: ["ປ້າຍບອກພິກັດນ້ຳໜັກ Load Chart", "ສະຕິກເກີເຕືອນໄພອັນຕະລາຍຄົບ", "ສີປ້ອງກັນສະໜິມຮອບຕົວລົດ"],
    checksEn: ["Legible load capacity data plate", "Mandatory OSHA safety decals", "Industrial protective coating"],
    color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-400",
  },
];

export function MaintenanceChecklistShowcase({ onOpenInspectionModal }: MaintenanceChecklistProps = {}) {
  const locale = useLocale();
  const isLo = locale === "lo";
  const [selectedPart, setSelectedPart] = useState<"all" | 1 | 2>("all");

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

  const filteredItems = CHECKLIST_ITEMS.filter((item) => {
    if (selectedPart === "all") return true;
    return item.part === selectedPart;
  });

  return (
    <div className="mt-16 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 space-y-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>DK LAO FORKLIFT MAINTENANCE PROTOCOL</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            {isLo ? (
              <>
                ມາດຕະຖານກວດກາ <span className="text-amber-400">ລົດຍົກໂຟກສ໌ລິບ 12 ລະບົບ</span> (Forklift Maintenance Checklist)
              </>
            ) : (
              <>
                Comprehensive <span className="text-amber-400">12-Point Maintenance</span> Checklist
              </>
            )}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isLo
              ? "ມາດຕະຖານການກວດເຊັກທີ່ຖອດແບບຈາກສູນບໍລິການ Mitsubishi & Jungheinrich ສາກົນ ຄຸ້ມຄອງຄົບທັງ 12 ຈຸດສຳຄັນ ເພື່ອໃຫ້ລົດຍົກຂອງທ່ານພ້ອມໃຊ້ງານ ແລະ ປອດໄພ 100%."
              : "Standardized 12-point inspection protocol derived from Mitsubishi & Jungheinrich factory standards, guaranteeing peak operational reliability and workplace safety."}
          </p>

          {/* Part Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setSelectedPart("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedPart === "all" ? "bg-white text-slate-900 shadow-md" : "bg-white/10 text-slate-300 hover:bg-white/15"
              }`}
            >
              {isLo ? "ທັງໝົດ (12 ລະບົບ)" : "All 12 Checkpoints"}
            </button>

            <button
              onClick={() => setSelectedPart(1)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedPart === 1 ? "bg-amber-500 text-slate-950 shadow-md" : "bg-white/10 text-slate-300 hover:bg-white/15"
              }`}
            >
              <span>Part 1:</span>
              <span>{isLo ? "ເຄື່ອງຈັກ, ລະບົບໄຟຟ້າ & ອຸປະກອນ (1-6)" : "Engine & Electrical (1-6)"}</span>
            </button>

            <button
              onClick={() => setSelectedPart(2)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedPart === 2 ? "bg-emerald-500 text-slate-950 shadow-md" : "bg-white/10 text-slate-300 hover:bg-white/15"
              }`}
            >
              <span>Part 2:</span>
              <span>{isLo ? "ໂຄງສ້າງ, ໄຮໂດຼລິກ & ເບຣກ (7-12)" : "Chassis & Hydraulics (7-12)"}</span>
            </button>
          </div>
        </div>

        {/* Official Slides Banners (Part 1 & Part 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div 
            onClick={() => setLightbox({
              isOpen: true,
              src: "/images/solutions/maintenance-checklist-part1.png",
              alt: "Forklift Maintenance Checklist Part 1 - Engine, Electrical, Lights",
              titleLo: "ໃບກວດເຊັກບຳລຸງຮັກສາລົດຍົກ 12 ຈຸດ Part 1 (ຈຸດທີ 1-6)",
              titleEn: "Forklift Maintenance Checklist Part 1 (Points 1-6)",
              subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1142px)",
              subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
            })}
            className="rounded-2xl overflow-hidden border border-amber-500/30 bg-black/40 shadow-xl relative h-64 sm:h-80 cursor-pointer group/img"
          >
            <Image
              src="/images/solutions/maintenance-checklist-part1.png"
              alt="Forklift Maintenance Checklist Part 1 - Engine, Electrical, Lights"
              fill
              unoptimized
              priority
              className="object-contain p-2 sm:p-3 crisp-diagram group-hover/img:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-[11px] font-bold text-amber-400">
              OFFICIAL CHECKLIST • PART 1 (POINTS 1-6)
            </div>
            <div className="absolute top-3 right-3 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
              <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
              <span>{isLo ? "🔍 ຊູມ 2K" : "🔍 Zoom 2K"}</span>
            </div>
          </div>

          <div 
            onClick={() => setLightbox({
              isOpen: true,
              src: "/images/solutions/maintenance-checklist-part2.png",
              alt: "Forklift Maintenance Checklist Part 2 - Tyres, Mast, Chassis, Hydraulics, Brakes",
              titleLo: "ໃບກວດເຊັກບຳລຸງຮັກສາລົດຍົກ 12 ຈຸດ Part 2 (ຈຸດທີ 7-12)",
              titleEn: "Forklift Maintenance Checklist Part 2 (Points 7-12)",
              subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1148px)",
              subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
            })}
            className="rounded-2xl overflow-hidden border border-emerald-500/30 bg-black/40 shadow-xl relative h-64 sm:h-80 cursor-pointer group/img"
          >
            <Image
              src="/images/solutions/maintenance-checklist-part2.png"
              alt="Forklift Maintenance Checklist Part 2 - Tyres, Mast, Chassis, Hydraulics, Brakes"
              fill
              unoptimized
              className="object-contain p-2 sm:p-3 crisp-diagram group-hover/img:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-[11px] font-bold text-emerald-400">
              OFFICIAL CHECKLIST • PART 2 (POINTS 7-12)
            </div>
            <div className="absolute top-3 right-3 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
              <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isLo ? "🔍 ຊູມ 2K" : "🔍 Zoom 2K"}</span>
            </div>
          </div>
        </div>

        {/* Grid of 12 Detailed Checkpoints */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${item.color}`}>
                    {item.part === 1 ? "PART 1" : "PART 2"}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">CHECKPOINT #{item.id}</span>
                </div>

                <h4 className="text-base font-black text-white mb-2">{isLo ? item.titleLo : item.titleEn}</h4>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">{isLo ? item.descLo : item.descEn}</p>

                <div className="space-y-1.5 p-3 rounded-xl bg-black/40 border border-white/5 mb-4">
                  {(isLo ? item.checksLo : item.checksEn).map((chk, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-slate-300 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{chk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold">{isLo ? "ມາດຕະຖານ Mobile Service" : "Mobile Service Ready"}</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Passed
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-slate-300 text-center sm:text-left">
            <FileCheck2 className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              {isLo
                ? "ຕ້ອງການໃຫ້ທີມຊ່າງ DK LAO ເຂົ້າກວດເຊັກລົດຍົກໂຮງງານຂອງທ່ານຕາມມາດຕະຖານ 12 ຈຸດນີ້ບໍ?"
                : "Need DK LAO certified mobile technicians to perform this 12-point checklist at your facility?"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onOpenInspectionModal && (
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 hover:bg-white/10 text-white font-bold text-xs"
                onClick={onOpenInspectionModal}
              >
                <Printer className="w-3.5 h-3.5 mr-1.5 text-sky-400" />
                <span>{isLo ? "ພິມໃບຢັ້ງຢືນ SOP 24 ຈຸດ" : "Print 24-Point SOP Certificate"}</span>
              </Button>
            )}

            <Button
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"
              onClick={() => {
                const el = document.getElementById("booking-form");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>{isLo ? "ນັດໝາຍຊ່າງກວດເຊັກ (Mobile Service)" : "Book 12-Point Inspection"}</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>

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
    </div>
  );
}
