import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Warehouse,
  Boxes,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Award,
  Bot,
  ArrowRight,
  SlidersHorizontal,
  ZoomIn,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Forklift/ui/button";
import { ImageLightboxModal } from "@/components/Forklift/ui/ImageLightboxModal";

export function RackingAndStorageShowcase() {
  const { i18n } = useTranslation();
  const locale = i18n.language || "lo";
  const isLo = locale === "lo";
  const [activeTab, setActiveTab] = useState<"center3d" | "rackingTypes" | "automated">("center3d");

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

  // 6 Specialized Racking Systems from Slide 2
  const RACKING_SYSTEMS = [
    {
      id: "single-bay",
      titleLo: "Single Bay Racking (ຊັ້ນວາງມາດຕະຖານຊ່ອງດ່ຽວ)",
      titleEn: "Single Bay Pallet Racking",
      descLo: "ໂຄງສ້າງຊັ້ນວາງຊ່ອງດ່ຽວເໝາະສຳລັບສາງຊ່ອງແຄບ (VNA) ແລະ ລົດ Reach Truck ເຂົ້າເຖິງສິນຄ້າໄດ້ 100% ທຸກພາເລັດ.",
      descEn: "Standard single-entry pallet racks designed for narrow aisle (VNA) and reach trucks with 100% immediate pallet selectivity.",
      badgeLo: "ຄວາມຄ່ອງຕົວ 100%",
      badgeEn: "100% Selectivity",
      color: "border-blue-500/30 bg-blue-500/5 text-blue-400",
    },
    {
      id: "shelving",
      titleLo: "Industrial Shelving (ຊັ້ນວາງສິນຄ້າຂະໜາດກາງ-ນ້ອຍ)",
      titleEn: "Multi-Tier Industrial Shelving",
      descLo: "ຊັ້ນວາງເຫຼັກສຳລັບສິນຄ້າກ່ອງ, ອາໄຫຼ່ ແລະ ອຸປະກອນຂະໜາດນ້ອຍ ພ້ອມທາງຍ່າງ ແລະ ລົດກະເຊົ້າ Order Picker.",
      descEn: "Medium & light-duty modular steel shelving paired with order-picking access for high-speed SKU fulfillment.",
      badgeLo: "ເກັບອາໄຫຼ່ & ກ່ອງ",
      badgeEn: "Small Parts & Bins",
      color: "border-amber-500/30 bg-amber-500/5 text-amber-400",
    },
    {
      id: "cantilever",
      titleLo: "Cantilever Racking (ຊັ້ນວາງແຂນຍື່ນສຳລັບສິນຄ້າຍາວ)",
      titleEn: "Cantilever Heavy Racks",
      descLo: "ຊັ້ນວາງແຂນຍື່ນບໍ່ມີເສົາກີດຂວາງດ້ານໜ້າ ເໝາະສຳລັບທໍ່ເຫຼັກ, ໄມ້ແປຮູບ, ທໍ່ PVC, ແລະ ວັດສະດຸກໍ່ສ້າງຍາວພິເສດ.",
      descEn: "Column-arm cantilever system with unobstructed front access for long loads: steel bars, lumber, PVC pipes, and sheets.",
      badgeLo: "ສິນຄ້າຍາວພິເສດ",
      badgeEn: "Long Material Storage",
      color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
    },
    {
      id: "mezzanine",
      titleLo: "Mezzanine Platform Multi-Tier (ຊັ້ນລອຍໂຄງສ້າງເຫຼັກ)",
      titleEn: "Multi-Tier Structural Mezzanine",
      descLo: "ຊັ້ນລອຍໂຄງສ້າງເຫຼັກ Heavy-Duty ຂະຫຍາຍພື້ນທີ່ໃຊ້ສອຍແນວດິ່ງ 2-3 ເທົ່າ ໂດຍບໍ່ຕ້ອງລົງທຶນສ້າງຕຶກສາງໃໝ່.",
      descEn: "Heavy-duty structural steel mezzanine platforms doubling or tripling floor footprint without civil construction costs.",
      badgeLo: "ເພີ່ມພື້ນທີ່ 2-3 ເທົ່າ",
      badgeEn: "2X-3X Usable Space",
      color: "border-purple-500/30 bg-purple-500/5 text-purple-400",
    },
    {
      id: "mobile-racking",
      titleLo: "Mobile Racking (ຊັ້ນວາງເຄື່ອນທີ່ເທິງລາງໄຟຟ້າ)",
      titleEn: "Motorized Mobile Pallet Racking",
      descLo: "ຊັ້ນວາງເລື່ອນເທິງລາງພື້ນຄວບຄຸມດ້ວຍໄຟຟ້າ ເປີດຊ່ອງທາງສະເພາະເວລາໃຊ້ງານ ປະຢັດເນື້ອທີ່ສາງສູງສຸດ 80-90%.",
      descEn: "Motorized heavy racks on floor rails creating aisles on-demand, increasing warehouse cubic capacity up to 80-90%.",
      badgeLo: "ປະຢັດພື້ນທີ່ 80%",
      badgeEn: "80% Space Savings",
      color: "border-indigo-500/30 bg-indigo-500/5 text-indigo-400",
    },
    {
      id: "action-warehouse",
      titleLo: "Turnkey Turnout & Engineering (ວິສະວະກຳສາງຄົບວົງຈອນ)",
      titleEn: "Turnkey Warehouse Integration",
      descLo: "ບໍລິການອອກແບບ 3D CAD, ຄຳນວນໂຄງສ້າງຮັບນ້ຳໜັກຕາມມາດຕະຖານ FEM/EN, ຕິດຕັ້ງ ແລະ ທົດສອບ Load Test 100%.",
      descEn: "Full turnkey service: 3D CAD layout, FEM/EN seismic structural engineering, on-site erection, and certified load testing.",
      badgeLo: "ມາດຕະຖານ FEM/EN",
      badgeEn: "FEM / EN Certified",
      color: "border-teal-500/30 bg-teal-500/5 text-teal-400",
    },
  ];

  // 5 Automated & High-Bay Systems from Slide 3
  const AUTOMATED_SYSTEMS = [
    {
      id: "shuttle",
      titleLo: "Compact Storage Shuttle System (ລົດ Shuttle ລາງເລິກ)",
      titleEn: "Radio Pallet Shuttle System",
      descLo: "ຫຸ່ນຍົນ Shuttle ໄຮ້ສາຍແລ່ນໃນລາງຊັ້ນວາງເລິກ (Drive-In Deep Lane) ບັນທຸກພາເລັດອັດຕະໂນມັດ ວ່ອງໄວ ແລະ ປອດໄພ.",
      descEn: "Semi-automated radio pallet shuttle navigating deep storage channels for ultra-high-density FIFO/LIFO buffering.",
      techLo: "ຄວາມໄວສູງ • ແບັດ Li-ion • ຄວບຄຸມໄລຍະໄກ",
      techEn: "High-Speed • Li-Ion Battery • Remote Controlled",
      color: "border-blue-500/40 bg-blue-500/5 text-blue-400",
    },
    {
      id: "mini-load",
      titleLo: "Automatic Small Parts Storage (AS/RS Mini-Load)",
      titleEn: "Automated Mini-Load AS/RS",
      descLo: "ເຄຣນອັດຕະໂນມັດຈັດເກັບ ແລະ ຈ່າຍກ່ອງສິນຄ້າ/ອາໄຫຼ່ຂະໜາດນ້ອຍ ດ້ວຍຄວາມໄວສູງ ເຊື່ອມຕໍ່ກັບສາຍພານລຳລຽງ.",
      descEn: "Automated high-speed stacker crane for tote and carton handling connected directly to conveyor sorting loops.",
      techLo: "ຄວາມໄວ 6m/s • ເຊື່ອມຕໍ່ WMS • ໄຮ້ຄົນຂັບ 100%",
      techEn: "6m/s Speed • WMS Integration • 100% Unmanned",
      color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-400",
    },
    {
      id: "high-bay",
      titleLo: "High Bay Racking (ສາງຊັ້ນວາງສູງພິເສດ 30-40 ແມັດ)",
      titleEn: "High-Bay Clad-Rack Warehouse",
      descLo: "ອາຄານສາງທີ່ໃຊ້ໂຄງສ້າງຊັ້ນວາງເປັນເສົາຫຼັກຂອງຕຶກ (Silo Building) ສູງເຖິງ 40 ແມັດ ຮອງຮັບສິນຄ້າໄດ້ຫຼາຍໝື່ນພາເລັດ.",
      descEn: "Building-clad high-bay warehouse structures up to 40 meters utilizing full vertical volume for tens of thousands of pallets.",
      techLo: "ຄວາມສູງ 40m • ທົນແຜ່ນດິນໄຫວ • ຄວາມຈຸສູງສຸດ",
      techEn: "Up to 40m • Seismic Proof • Maximum Capacity",
      color: "border-amber-500/40 bg-amber-500/5 text-amber-400",
    },
    {
      id: "prk-lift",
      titleLo: "Lift System – Jungheinrich PRK (ຕູ້ລິບຈັດເກັບແນວດິ່ງ)",
      titleEn: "Jungheinrich PRK Vertical Lift Module",
      descLo: "ຕູ້ລິບອັດສະລິຍະ Vertical Carousel ນຳສິນຄ້າມາຫາຄົນ (Goods-to-Person) ປະຢັດພື້ນທີ່ສາງໄດ້ເຖິງ 85%.",
      descEn: "Vertical Lift Module (VLM) delivering goods-to-person ergonomics while reclaiming up to 85% of valuable floor space.",
      techLo: "Goods-to-Person • ປະຢັດພື້ນທີ່ 85% • ປອດໄພສູງ",
      techEn: "Goods-to-Person • 85% Space Reclaimed • Ultra-Safe",
      color: "border-purple-500/40 bg-purple-500/5 text-purple-400",
    },
    {
      id: "mega-dc",
      titleLo: "Mega DC Turnkey Integration (ສູນກະຈາຍສິນຄ້າຂະໜາດໃຫຍ່)",
      titleEn: "Mega Logistics Distribution Center",
      descLo: "ການປະສານງານຄົບວົງຈອນລະຫວ່າງຊັ້ນວາງ, ກອງລົດຍົກໄຟຟ້າ, ເຄຣນ AS/RS, ແລະ ຊອບແວຄຸ້ມຄອງສາງ WMS/WCS.",
      descEn: "Holistic mega distribution hub synergy synchronizing racking, electric reach fleets, AS/RS cranes, and WMS/WCS software.",
      techLo: "WMS/WCS • 24/7 Shift • Zero Bottlenecks",
      techEn: "WMS/WCS • 24/7 Operations • Zero Bottlenecks",
      color: "border-teal-500/40 bg-teal-500/5 text-teal-400",
    },
  ];

  return (
    <div className="mt-16 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <Boxes className="w-4 h-4 text-amber-400" />
            <span>DK LAO ADVANCED RACKING & STORAGE SYSTEMS</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            {isLo ? (
              <>
                ຊັ້ນວາງສິນຄ້າ & ຖາດສິນຄ້າ: <span className="text-amber-400">Racking and Shelving Solutions</span>
              </>
            ) : (
              <>
                Industrial Storage: <span className="text-amber-400">Racking & Shelving Systems</span>
              </>
            )}
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {isLo
              ? "ດີເຄ ລາວ ສະໜອງລະບົບຊັ້ນວາງອຸດສາຫະກຳຄົບວົງຈອນ: ຕັ້ງແຕ່ຊັ້ນວາງມາດຕະຖານ Single Bay, Cantilever, Mezzanine ຊັ້ນລອຍ ຈົນເຖິງລະບົບສາງອັດຕະໂນມັດ Radio Shuttle, AS/RS, ແລະ ຕູ້ລິບ Jungheinrich PRK."
              : "DK LAO delivers enterprise-grade industrial racking and automated storage: from selective Single Bay racks, Cantilever, and structural Mezzanines to Radio Pallet Shuttles, AS/RS mini-loads, and Jungheinrich PRK vertical lift modules."}
          </p>

          {/* 3 Tab Switcher */}
          <div className="inline-flex flex-wrap p-1 rounded-2xl bg-white/10 border border-white/10 text-xs font-bold mt-2 gap-1 justify-center">
            <button
              type="button"
              onClick={() => setActiveTab("center3d")}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === "center3d"
                  ? "bg-amber-500 text-slate-950 shadow-lg font-black"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {isLo ? "1. ພາບລວມສາງ 3D (Logistics Center)" : "1. 3D Logistics Center"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("rackingTypes")}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === "rackingTypes"
                  ? "bg-blue-600 text-white shadow-lg font-black"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {isLo ? "2. 6 ຮູບແບບຊັ້ນວາງ (Racking Types)" : "2. 6 Specialized Racks"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("automated")}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === "automated"
                  ? "bg-emerald-600 text-white shadow-lg font-black"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {isLo ? "3. 5 ລະບົບສາງອັດສະລິຍະ (Automated AS/RS)" : "3. Automated AS/RS & Shuttle"}
            </button>
          </div>
        </div>

        {/* TAB 1: 3D Logistics Center Racking (Slide 1) */}
        {activeTab === "center3d" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-950 relative group">
              <div 
                onClick={() => setLightbox({
                  isOpen: true,
                  src: "/images/solutions/racking-shelving-3d-logistics-center.png",
                  alt: "Warehouse Racking and Shelving 3D Logistics Center",
                  titleLo: "ສູນໂລຈິສຕິກ 3D ແລະ ລະບົບຊັ້ນວາງສິນຄ້າຄົບວົງຈອນ (Logistics Center 3D)",
                  titleEn: "Warehouse Racking and Shelving 3D Logistics Center",
                  subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1152px)",
                  subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                })}
                className="relative aspect-[16/9] w-full cursor-pointer group/img"
              >
                <img
                  src="/images/solutions/racking-shelving-3d-logistics-center.png"
                  alt="Warehouse Racking and Shelving 3D Logistics Center"
                  fill
                  unoptimized
                  priority
                  className="object-contain crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                  <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                </div>
              </div>
              <div className="p-4 bg-slate-900/95 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300 font-bold">
                  <span className="text-amber-400 font-mono">HIGH-DENSITY 3D RACKING INFRASTRUCTURE</span>
                  <span className="text-slate-600">•</span>
                  <span>{isLo ? "ລະບົບຊັ້ນວາງມາດຕະຖານສາກົນ ສຳລັບສາງອຸດສາຫະກຳ" : "International Standard Industrial Racking Systems"}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>FEM / EN 15512 Seismic & Load Certified</span>
                </div>
              </div>
            </div>

            {/* Quick 3 Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-1">
                <div className="text-amber-400 font-black text-sm">{isLo ? "ເພີ່ມຄວາມຈຸສາງ 40-80%" : "40-80% Capacity Boost"}</div>
                <p className="text-xs text-slate-300">{isLo ? "ອອກແບບຊັ້ນວາງແນວດິ່ງສູງ 6m – 40m ນຳໃຊ້ພື້ນທີ່ສາງຄຸ້ມຄ່າສູງສຸດ." : "Vertical storage engineering up to 40m utilizing 100% of cubic warehouse volume."}</p>
              </div>
              <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-1">
                <div className="text-blue-400 font-black text-sm">{isLo ? "ປອດໄພຕາມມາດຕະຖານສາກົນ" : "Certified Safety Standards"}</div>
                <p className="text-xs text-slate-300">{isLo ? "ເຫຼັກກ້າ High-Tensile Steel ພ້ອມແຜງກັນກະແທກ ແລະ ທົດສອບ Load Test 100%." : "High-tensile certified steel with column crash protectors and factory load certification."}</p>
              </div>
              <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-1">
                <div className="text-emerald-400 font-black text-sm">{isLo ? "Turnkey Design & 3D CAD" : "Turnkey 3D CAD Planning"}</div>
                <p className="text-xs text-slate-300">{isLo ? "ທີມວິສະວະກອນ DK LAO ສຳຫຼວດໄຊທ໌ງານຕົວຈິງ ແລະ ອອກແບບແຜນຜັງ 3D ຟຣີ." : "Free on-site laser survey, 3D CAD modeling, and ROI throughput optimization."}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 6 Specialized Racking Types (Slide 2) */}
        {activeTab === "rackingTypes" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-white relative group">
              <div 
                onClick={() => setLightbox({
                  isOpen: true,
                  src: "/images/solutions/racking-systems-6-types.png",
                  alt: "6 Specialized Racking Systems - Single Bay, Shelving, Cantilever, Mezzanine, Mobile Racking",
                  titleLo: "6 ປະເພດຊັ້ນວາງສິນຄ້າອຸດສາຫະກຳສະເພາະທາງ (6 Racking Systems)",
                  titleEn: "6 Specialized Industrial Racking Systems",
                  subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1166px)",
                  subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                })}
                className="relative aspect-[16/9] w-full cursor-pointer group/img"
              >
                <img
                  src="/images/solutions/racking-systems-6-types.png"
                  alt="6 Specialized Racking Systems - Single Bay, Shelving, Cantilever, Mezzanine, Mobile Racking"
                  fill
                  unoptimized
                  className="object-contain crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                  <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {RACKING_SYSTEMS.map((rack) => (
                <div
                  key={rack.id}
                  className={`p-5 rounded-2xl border ${rack.color} backdrop-blur-sm flex flex-col justify-between hover:border-amber-400/50 transition-all group`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-wider">
                        {isLo ? rack.badgeLo : rack.badgeEn}
                      </span>
                      <Boxes className="w-4 h-4 opacity-70" />
                    </div>
                    <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                      {isLo ? rack.titleLo : rack.titleEn}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isLo ? rack.descLo : rack.descEn}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-bold text-slate-400">
                    <span>Industrial Heavy Duty</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Turnkey Ready
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: 5 Automated Storage Systems (Slide 3) */}
        {activeTab === "automated" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-white relative group">
              <div 
                onClick={() => setLightbox({
                  isOpen: true,
                  src: "/images/solutions/automated-high-bay-racking-shuttle.png",
                  alt: "Automated High-Bay Racking, Shuttle System & PRK Vertical Lift",
                  titleLo: "5 ລະບົບສາງອັດຕະໂນມັດ Automated AS/RS, Pallet Shuttle & Vertical Lift",
                  titleEn: "5 Automated Storage Systems (High-Bay AS/RS & Shuttle)",
                  subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1140px)",
                  subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                })}
                className="relative aspect-[16/9] w-full cursor-pointer group/img"
              >
                <img
                  src="/images/solutions/automated-high-bay-racking-shuttle.png"
                  alt="Automated High-Bay Racking, Shuttle System & PRK Vertical Lift"
                  fill
                  unoptimized
                  className="object-contain crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                  <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {AUTOMATED_SYSTEMS.map((sys) => (
                <div
                  key={sys.id}
                  className={`p-5 rounded-2xl border ${sys.color} backdrop-blur-sm flex flex-col justify-between hover:scale-[1.01] transition-all group`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-black font-mono">
                        Automation 4.0
                      </span>
                      <Cpu className="w-4 h-4 opacity-70" />
                    </div>
                    <h4 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors">
                      {isLo ? sys.titleLo : sys.titleEn}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isLo ? sys.descLo : sys.descEn}
                    </p>
                    <div className="p-2 rounded-xl bg-black/20 text-[10px] font-mono text-slate-300">
                      {isLo ? sys.techLo : sys.techEn}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-bold text-slate-400">
                    <span>Automated AS/RS</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Certified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Turnkey Callout */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-blue-950/60 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-black text-white">
              {isLo ? "ຕ້ອງການສຳຫຼວດໄຊທ໌ງານ ແລະ ອອກແບບຊັ້ນວາງສາງສິນຄ້າຟຣີ?" : "Request Free On-Site Racking Survey & 3D CAD Design?"}
            </h4>
            <p className="text-xs text-slate-300">
              {isLo
                ? "ວິສະວະກອນ DK LAO ພ້ອມລົງພື້ນທີ່ວັດແທກຕົວຈິງ ແລະ ສະເໜີແຜນຜັງຊັ້ນວາງທີ່ເພີ່ມຄວາມຈຸສູງສຸດ."
                : "DK LAO racking engineers provide free site measurements, structural load calculations, and tailored 3D CAD layouts."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href={`/${locale}/store?pre_category=warehouse-storage`}
              className="py-2.5 px-4 rounded-xl border border-white/20 hover:bg-white/10 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>{isLo ? "ເລືອກຊື້ຊັ້ນວາງໃນ Store 🛒" : "Browse Racking in Store 🛒"}</span>
            </Link>
            <a
              href="tel:+8562058929299"
              className="btn-emerald py-2.5 px-4 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>+856 20 5892 9299</span>
            </a>
            <a
              href="#booking-form"
              className="py-2.5 px-4 rounded-xl border border-white/20 hover:bg-white/10 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <span>{isLo ? "ນັດໝາຍວິສະວະກອນສາງ" : "Book Racking Consultation"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
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
    </div>
  );
}
