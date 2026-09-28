import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Boxes,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  ShoppingBag,
  Sparkles,
  Award,
  ChevronRight,
  Eye,
  ExternalLink,
  Truck,
  ArrowRight,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/Forklift/ui/button";
import { ImageLightboxModal } from "@/components/Forklift/ui/ImageLightboxModal";

const SUPPORTED_BRANDS = [
  { name: "Mitsubishi Forklift Trucks", origin: "Japan", highlight: "Official Authorized Partner" },
  { name: "Jungheinrich", origin: "Germany", highlight: "Official Authorized Partner" },
  { name: "Toyota Forklift", origin: "Japan", highlight: "Full OEM Lineup Support" },
  { name: "Nissan Forklift (UniCarriers)", origin: "Japan", highlight: "Engine & Transmission Parts" },
  { name: "Komatsu", origin: "Japan", highlight: "Heavy Machinery & Hydraulics" },
  { name: "Clark", origin: "USA", highlight: "Legacy & Modern Forklift Parts" },
  { name: "Hyster-Yale Group", origin: "USA", highlight: "Container & Heavy Reachstackers" },
  { name: "CAT Lift Trucks", origin: "USA", highlight: "Industrial Fleet Powertrains" },
  { name: "Hyundai Heavy Industries", origin: "Korea", highlight: "Construction & Yard Forklifts" },
  { name: "Yale", origin: "USA", highlight: "Warehouse Electric Stackers" },
];

export function MultiBrandPartsShowcase() {
  const { i18n } = useTranslation();
  const locale = i18n.language || "lo";
  const isLo = locale === "lo";

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
    <div className="mt-16 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Ambience glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 space-y-12">
        
        {/* ========================================================================= */}
        {/* 1. MULTI-BRAND OEM SPARE PARTS (10 GLOBAL BRANDS) */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
              <Boxes className="w-4 h-4 text-blue-400" />
              <span>UNIVERSAL MULTI-BRAND OEM SPARE PARTS HUB</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              {isLo ? (
                <>
                  ອາໄຫຼ່ແທ້ຄອບຄຸມ <span className="text-blue-400">10 ແບຣນຊັ້ນນຳຂອງໂລກ</span> (Multi-Brand Hub)
                </>
              ) : (
                <>
                  Universal Genuine Parts Covering <span className="text-blue-400">10 Global Brands</span>
                </>
              )}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isLo
                ? "DK LAO ບໍ່ພຽງແຕ່ເປັນຕົວແທນ Mitsubishi & Jungheinrich, ແຕ່ຍັງເປັນສູນອາໄຫຼ່ຄົບວົງຈອນສຳລັບລົດຍົກຍີ່ປຸ່ນ, ເອີຣົບ, ແລະ ອາເມລິກາ ຫຼາຍກວ່າ 16,000 ລາຍການໃນສະຕ໋ອກ."
                : "DK LAO is your universal one-stop spare parts center, providing 16,000+ in-stock components for Japanese, European, and American forklift fleets."}
            </p>
          </div>

          {/* Official Slide 3 Banner: Cutaway + 10 Brands */}
          <div 
            onClick={() => setLightbox({
              isOpen: true,
              src: "/images/solutions/multi-brand-spare-parts.png",
              alt: "Multi-Brand Forklift Spare Parts & Accessories - 10 Global Brands",
              titleLo: "ສູນອາໄຫຼ່ລົດຍົກແທ້ຄົບວົງຈອນ 10 ແບຣນລະດັບໂລກ (16,000+ ລາຍການ)",
              titleEn: "Universal Genuine Parts Covering 10 Global Brands",
              subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1138px)",
              subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
            })}
            className="rounded-2xl overflow-hidden border border-blue-500/30 bg-black/40 shadow-2xl relative h-64 sm:h-80 md:h-[400px] cursor-pointer group/img"
          >
            <img
              src="/images/solutions/multi-brand-spare-parts.png"
              alt="Multi-Brand Forklift Spare Parts & Accessories - 10 Global Brands"
              fill
              unoptimized
              priority
              className="object-contain p-2 sm:p-4 crisp-diagram group-hover/img:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-400">
              OFFICIAL MULTI-BRAND PARTS SUPPLY • 16,000+ ITEMS
            </div>
            <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
              <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
              <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
            </div>
          </div>

          {/* 10 Supported Brands Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {SUPPORTED_BRANDS.map((brand, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 text-center transition-all"
              >
                <div className="text-xs font-black text-white mb-0.5">{brand.name}</div>
                <div className="text-[10px] text-blue-400 font-bold uppercase">{brand.origin}</div>
                <div className="text-[10px] text-slate-400 mt-1">{brand.highlight}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. LED WARNING SAFETY LIGHTS FOR FORKLIFTS */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-white/10 space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>ACTIVE PLANT SAFETY ECOSYSTEM</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isLo ? (
                <>
                  ລະບົບໄຟນິລະໄພ <span className="text-red-400">LED Warning Safety Light</span> ສຳລັບລົດຍົກ
                </>
              ) : (
                <>
                  <span className="text-red-400">LED Warning Safety Lights</span> for Forklifts
                </>
              )}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isLo
                ? "ປ້ອງກັນອຸບັດຕິເຫດຄົນຍ່າງໃນສາງສິນຄ້າ 100%. ສ່ອງແສງລຳແສງສີຟ້າ ແລະ ເສັ້ນແດງກຳນົດເຂດອັນຕະລາຍຮອບຕົວລົດ (Danger Perimeter) ເຫັນຊັດເຈນທຸກມຸມບອດ."
                : "Prevent warehouse pedestrian collisions. Intense blue spot beams and red perimeter boundary halos clearly define no-go zones around moving forklifts."}
            </p>
          </div>

          {/* Official Slide 4 Banner: LED Safety Lights in Action */}
          <div 
            onClick={() => setLightbox({
              isOpen: true,
              src: "/images/solutions/led-warning-safety-lights.png",
              alt: "LED Warning Safety Light for Forklifts - Blue Spot, Red Zone, Perimeter Halo",
              titleLo: "ລະບົບໄຟ LED ນິລະໄພ ແລະ ເຂດອັນຕະລາຍຮອບຕົວລົດຍົກ (Blue Spot & Red Zone)",
              titleEn: "LED Warning Safety Lights for Forklifts",
              subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1146px)",
              subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
            })}
            className="rounded-2xl overflow-hidden border border-red-500/30 bg-black/40 shadow-2xl relative h-64 sm:h-80 md:h-[380px] cursor-pointer group/img"
          >
            <img
              src="/images/solutions/led-warning-safety-lights.png"
              alt="LED Warning Safety Light for Forklifts - Blue Spot, Red Zone, Perimeter Halo"
              fill
              unoptimized
              className="object-contain p-2 sm:p-4 crisp-diagram group-hover/img:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-xs font-bold text-red-400">
              LED SAFETY LIGHTS IN ACTION • WAREHOUSE COMPLIANCE
            </div>
            <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
              <ZoomIn className="w-3.5 h-3.5 text-red-400" />
              <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
            </div>
          </div>

          {/* 3 Safety Lighting Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-bold text-blue-400 block">1. BLUE SPOT BEAM</span>
              <h4 className="text-sm font-extrabold text-white">ລູກສອນ & ຈຸດສີຟ້າສ່ອງພື້ນ</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isLo
                  ? "ສ່ອງລຳແສງສີຟ້າລົງພື້ນລ່ວງໜ້າ 5-8 ແມັດ ເຕືອນຄົນຍ່າງໃນຈຸດຕັດ, ທາງແຍກບອດ, ແລະ ປະຕູສາງ."
                  : "Projects high-intensity blue beam 5-8 meters ahead/behind to warn cross-aisle workers before the forklift appears."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-bold text-red-400 block">2. RED ZONE DANGER LINE</span>
              <h4 className="text-sm font-extrabold text-white">ແຖບເສັ້ນສີແດງຄຸ້ມກັນຂ້າງລົດ</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isLo
                  ? "ສ່ອງແຖບແສງສີແດງຂະໜານທັງສອງຂ້າງຕົວລົດ ເພື່ອກຳນົດໄລຍະຫ່າງທີ່ປອດໄພ ຫ້າມຄົນຍ່າງເຂົ້າໃກ້."
                  : "Creates an unmistakable red side boundary line, keeping pedestrians outside the vehicle pinch point."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-bold text-red-400 block">3. PERIMETER HALO ARC</span>
              <h4 className="text-sm font-extrabold text-white">ເຄິ່ງວົງມົນ & ກອບສີ່ຫຼ່ຽມແດງ</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isLo
                  ? "ສ້າງກອບແສງໂຄ້ງຮອບທ້າຍລົດ ເຕືອນວົງລ້ຽວທ້າຍປັດ (Rear Swing Danger Zone) ປ້ອງກັນການຊົນຄົນງານ."
                  : "Rear curved arc warning pedestrians of rear-end swing radius during tight warehouse corner turns."}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. HEAVY MACHINERY & MINING SPARE PARTS EXPERTS (35+ GLOBAL OEM BRANDS) */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-white/10 space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>HEAVY MACHINERY SPARE PARTS EXPERTS • 35+ GLOBAL OEM BRANDS</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isLo ? (
                <>
                  ຈຳໜ່າຍ <span className="text-amber-400">ອາໄຫຼ່ ກົນຈັກໜັກອຸດສາຫະກຳ & ບໍ່ແຮ່</span> (Heavy Machinery Experts)
                </>
              ) : (
                <>
                  Heavy Machinery & Mining <span className="text-amber-400">Spare Parts Experts</span>
                </>
              )}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isLo
                ? "DK LAO ຜູ້ຊ່ຽວຊານສະໜອງອາໄຫຼ່ແທ້ OEM ສຳລັບກົນຈັກໜັກບໍ່ແຮ່, ລົດບັນທຸກຍັກ, ລົດຂຸດເຈາະ ແລະ ໂຮງງານຊີມັງຂະໜາດໃຫຍ່ (MMG Lane Xang, Phu Bia Mining, KCL Cement, Phonesack Group). ຄອບຄຸມຫຼາຍກວ່າ 35 ແບຣນຊັ້ນນຳຂອງໂລກ."
                : "Specialized OEM spare parts supply for heavy mining haul trucks (Hitachi, Caterpillar, Komatsu), giant excavators, crushers, and cement plants across Laos."}
            </p>
          </div>

          {/* Official Slide Banner: Mining Dump Truck + 35+ Brands */}
          <div 
            onClick={() => setLightbox({
              isOpen: true,
              src: "/images/solutions/heavy-machinery-mining-spare-parts.jpg",
              alt: "Heavy Machinery Spare Parts Experts - Mining Dump Trucks and 35+ Global Brands",
              titleLo: "ສູນອາໄຫຼ່ກົນຈັກໜັກບໍ່ແຮ່ ແລະ ລົດບັນທຸກຍັກ 35+ ແບຣນຊັ້ນນຳ",
              titleEn: "Heavy Machinery & Mining Spare Parts Experts - 35+ Global Brands",
              subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1146px)",
              subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
            })}
            className="rounded-2xl overflow-hidden border border-amber-500/30 bg-black/40 shadow-2xl relative h-64 sm:h-80 md:h-[400px] cursor-pointer group/img"
          >
            <img
              src="/images/solutions/heavy-machinery-mining-spare-parts.jpg"
              alt="Heavy Machinery Spare Parts Experts - Mining Dump Trucks and 35+ Global Brands"
              fill
              unoptimized
              className="object-contain p-2 sm:p-4 crisp-diagram group-hover/img:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-400">
              MINING & HEAVY INDUSTRY FLEET SUPPORT • 35+ OEM BRANDS
            </div>
            <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
              <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
              <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
            </div>
          </div>

          {/* 35+ Brands Pills */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 text-center uppercase tracking-wider">
              {isLo ? "ແບຣນກົນຈັກໜັກ ແລະ ເຄື່ອງຈັກອຸດສາຫະກຳທີ່ຮອງຮັບອາໄຫຼ່ແທ້:" : "Supported Global Heavy Machinery & Engine Brands:"}
            </div>
            <div className="flex flex-wrap justify-center gap-1.5 max-w-5xl mx-auto">
              {[
                "HITACHI", "CATERPILLAR", "CUMMINS", "KOMATSU", "ATLAS COPCO",
                "MACK", "INGERSOLL RAND", "TEREX", "MTU", "JCB", "HYUNDAI HEAVY",
                "FREIGHTLINER", "CNH", "BOBCAT", "YANMAR", "JOHN DEERE", "KAWASAKI KCM",
                "PERKINS", "TAKEUCHI", "MUSTANG", "MITSUBISHI HEAVY", "KUBOTA", "VERSATILE",
                "LIEBHERR", "TIGERCAT", "ISUZU DIESEL", "VOLVO CONSTRUCTION", "VOLVO PENTA",
                "WAUKESHA", "INTERNATIONAL", "ALLISON TRANSMISSION", "GROVE", "SANDVIK",
                "DITCH WITCH", "DETROIT DIESEL", "VERMEER", "DEUTZ"
              ].map((brand, bIdx) => (
                <span
                  key={bIdx}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] sm:text-xs font-black text-slate-300 hover:border-amber-400/50 hover:text-amber-300 transition-all cursor-default"
                >
                  {brand}
                </span>
              ))}
            </div>
            <div className="pt-2 flex justify-center">
              <Link
                href={`/${locale}/store?pre_category=heavy-mining-machinery`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20"
              >
                <ShoppingBag className="w-4 h-4 text-slate-950" />
                <span>{isLo ? "ເລືອກຊື້ອາໄຫຼ່ກົນຈັກບໍ່ແຮ່ໃນ Store 🛒" : "Browse Mining Spares in Store 🛒"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA to Store & WhatsApp */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-black text-white">
              {isLo ? "ຕ້ອງການສັ່ງຊື້ອາໄຫຼ່ແທ້ ຫຼື ຕິດຕັ້ງໄຟນິລະໄພ LED?" : "Order Genuine Spare Parts or LED Safety Kits?"}
            </h4>
            <p className="text-xs text-blue-100">
              {isLo
                ? "ເຊັກສະຕັອກອາໄຫຼ່ໄດ້ທັນທີໃນ Store ຫຼື ສົ່ງຮູບ Nameplate ມາຍັງ WhatsApp ເພື່ອໃຫ້ຊ່າງທຽບເບີອາໄຫຼ່."
                : "Browse live store inventory or send your forklift nameplate photo via WhatsApp for exact part matching."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href={`/${locale}/store?pre_category=spare-parts-consumables`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition-all shadow-md"
            >
              <ShoppingBag className="w-4 h-4 text-blue-600" />
              <span>{isLo ? "ເລືອກຊື້ໃນ Store 🛒" : "Shop in Store 🛒"}</span>
            </Link>

            <a
              href="https://wa.me/8562028023338?text=%E0%BA%AA%E0%BA%B0%E0%BA%9A%E0%BA%B2%E0%BA%8Overlap%E0%BA%94%E0%BA%B5%20%E0%BA%94%E0%BA%B5%E0%BA%87%E0%BA%84%20%E0%BA%A5%E0%BA%B2%E0%BA%A7%2C%20%E0%BA%82%E0%BB%89%E0%BA%B2%E0%BA%9E%E0%BA%B0%E0%BB%80%E0%BA%88%E0%BA%BB%E0%BB%89%E0%BA%B2%E0%BA%AA%E0%BA%BB%E0%BA%99%E0%BB%83%E0%BA%88%E0%BA%AA%E0%BA%AD%E0%BA%9A%E0%BA%96%E0%BA%B2%E0%BA%A1%E0%BA%AD%E0%BA%B2%E0%BB%84%E0%BA%AB%E0%BB%88%20Spare%20Parts%20%E0%BB%81%E0%BA%A5%E0%BA%B0%20%E0%BB%84%E0%BA%9F%E0%BA%99%E0%BA%B4%E0%BA%A5%E0%BA%B0%E0%BA%97%E0%BA%9E%20LED"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold text-xs hover:bg-slate-900 transition-all shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: 020 2802 3338</span>
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
