import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  ChevronRight,
  Truck,
  Wrench,
  Boxes,
  Building2,
  ArrowUpRight,
  TrendingUp,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/Forklift/ui/button";
import { ImageLightboxModal } from "@/components/Forklift/ui/ImageLightboxModal";

export function JLGAccessPlatformsShowcase() {
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

  const JLG_FAMILIES = [
    {
      titleLo: "Electric Scissor Lifts",
      titleEn: "Electric Scissor Lifts",
      subLo: "ລົດກະເຊົ້າຂາກະໄກ່ໄຟຟ້າ",
      subEn: "Clean Indoor Aerial Platforms",
      descLo: "ລົດກະເຊົ້າໄຟຟ້າສຽງງຽບ ບໍ່ມີມົນລະພິດ ຍົກສູງ 6m – 14m ເໝາະສຳລັບວຽກຕິດຕັ້ງລະບົບໄຟຟ້າ, ທໍ່ແອ ແລະ ຊັ້ນວາງໃນສາງສິນຄ້າ.",
      descEn: "Zero-emission electric scissor lifts (6m – 14m working heights) engineered for indoor plant maintenance, MEP works, and cleanrooms.",
      badge: "6m - 14m Reach",
    },
    {
      titleLo: "Articulating Boom Lifts",
      titleEn: "Articulating Boom Lifts",
      subLo: "ລົດກະເຊົ້າບູມຫັກພັບ",
      subEn: "Up-and-Over Reach Booms",
      descLo: "ບູມຍົກຫັກພັບສາມາດຂ້າມສິ່ງກີດຂວາງໄດ້ຢ່າງຄ່ອງຕົວ (Up-and-Over) ເຂົ້າເຖິງທຸກຈຸດອັບຂອງໂຄງສ້າງໂຮງງານ ແລະ ເຄື່ອງຈັກຂະໜາດໃຫຍ່.",
      descEn: "Knuckle booms delivering unparalleled up-and-over positioning to navigate over obstacles, pipes, and heavy factory machinery.",
      badge: "15m - 26m Reach",
    },
    {
      titleLo: "Telescopic Ultra Booms",
      titleEn: "Telescopic Ultra Booms",
      subLo: "ລົດກະເຊົ້າບູມຍືດສູງ (Ultra Boom 1350SJP)",
      subEn: "Maximum Reach & Heavy Capacity",
      descLo: "ບູມຍືດສູງລະດັບມະຫາໂຄງການ (ສູງເຖິງ 40+ ແມັດ) ພ້ອມລະບົບຂັບເຄື່ອນ 4x4 ທົນທານຕໍ່ທຸກສະພາບໜ້າວຽກກໍ່ສ້າງ ແລະ ໄຊທ໌ບໍ່ແຮ່.",
      descEn: "Ultra-heavy boom lifts (up to 40m+ reach) with 4WD rough-terrain traction engineered for industrial mega-projects and mining setups.",
      badge: "Up to 43m Reach",
    },
    {
      titleLo: "Telehandlers (High-Reach Forklifts)",
      titleEn: "Telehandlers (High-Reach Forklifts)",
      subLo: "ລົດຍົກແຂນຍາວອະເນກປະສົງ",
      subEn: "Telescopic Material Handlers",
      descLo: "ລົດຍົກແຂນຍາວ Telescopic ຍົກນ້ຳໜັກ 3 - 5 ໂຕນ ສົ່ງສິນຄ້າຂຶ້ນຊັ້ນສູງ ຫຼື ພື້ນທີ່ລາດຊັນ ພ້ອມອຸປະກອນເສີມ bucket ແລະ ງາ.",
      descEn: "Heavy-duty variable reach telehandlers (3t – 5t capacity) combining rough-terrain forklift power with crane reach flexibility.",
      badge: "3t - 5t Capacity",
    },
  ];

  const FOUR_S_OFFERINGS = [
    {
      labelLo: "ໃໝ່ (New)",
      labelEn: "Brand New Units",
      descLo: "ນຳເຂົ້າລົດກະເຊົ້າ JLG ໃໝ່ແກະກ່ອງ ພ້ອມໃບຮັບປະກັນຈາກໂຮງງານ",
      descEn: "Factory-direct JLG access platforms with manufacturer warranty",
      icon: Sparkles,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    {
      labelLo: "ເກົ່າ (Used / Refurbished)",
      labelEn: "Certified Pre-Owned",
      descLo: "ລົດກະເຊົ້າ JLG ມືສອງປັບສະພາບມາດຕະຖານ ປະຢັດຕົ້ນທຶນ 40-60%",
      descEn: "Certified pre-owned units conditioned to factory safety standards",
      icon: TrendingUp,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    },
    {
      labelLo: "ເຊົ່າ (Rental)",
      labelEn: "Rental Fleets",
      descLo: "ສັນຍາເຊົ່າໄລຍະສັ້ນ-ຍາວ ລາຍວັນ, ລາຍເດືອນ, ລາຍປີ ພ້ອມຊ່າງດູແລ",
      descEn: "Flexible daily, monthly, and yearly rental with complete maintenance",
      icon: Building2,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    },
    {
      labelLo: "ບໍລິການ & ອາໄຫຼ່ (Service & Parts)",
      labelEn: "4S Service & Spares",
      descLo: "ຊ່າງຜູ້ຊ່ຽວຊານ JLG ພ້ອມອາໄຫຼ່ແທ້ 100% (Joysticks, Valves, Seals, Wheels)",
      descEn: "Factory-trained technicians and 100% genuine JLG OEM parts",
      icon: Wrench,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    },
  ];

  return (
    <div className="mt-16 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 space-y-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-orange-400" />
            <span>OFFICIAL JLG ACCESS PLATFORMS 4S TOTAL PARTNER</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            {isLo ? (
              <>
                ຈຳໜ່າຍ ລົດອູ່ສ້ອມແປງ & ລົດກະເຊົ້າ: <span className="text-orange-400">JLG Access Platforms</span>
              </>
            ) : (
              <>
                JLG Access Platforms: <span className="text-orange-400">Complete 4S Aerial Equipment Hub</span>
              </>
            )}
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {isLo
              ? "ດີເຄ ລາວ ພູມໃຈນຳສະເໜີໂຊລູຊັນລົດກະເຊົ້າເຮັດວຽກໃນທີ່ສູງມາດຕະຖານອັນດັບ 1 ຂອງໂລກ 'JLG reaching out™'. ຄົບວົງຈອນທັງຂາຍລົດໃໝ່, ລົດມືສອງປັບສະພາບ, ໃຫ້ເຊົ່າ, ບໍລິການສ້ອມແປງ ແລະ ສູນອາໄຫຼ່ແທ້."
              : "DK LAO delivers premier aerial work platforms engineered by global leader JLG. Offering end-to-end 4S solutions: brand new units, certified reconditioned machines, long/short-term rentals, certified field service, and OEM spares."}
          </p>
        </div>

        {/* Official Banner Image */}
        <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-white relative group">
          <div 
            onClick={() => setLightbox({
              isOpen: true,
              src: "/images/solutions/jlg-access-platforms-4s.png",
              alt: "JLG Access Platform Lineup - Scissor, Boom, Ultra Boom, Telehandler",
              titleLo: "ລົດກະເຊົ້າໄຟຟ້າ ແລະ ບູມຍົກສູງ JLG Access Platforms (4S Hub)",
              titleEn: "JLG Access Platforms Complete 4S Aerial Equipment Hub",
              subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1154px)",
              subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
            })}
            className="relative aspect-[16/9] w-full cursor-pointer group/img"
          >
            <img
              src="/images/solutions/jlg-access-platforms-4s.png"
              alt="JLG Access Platform Lineup - Scissor, Boom, Ultra Boom, Telehandler"
              fill
              unoptimized
              priority
              className="object-contain crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
              <ZoomIn className="w-3.5 h-3.5 text-orange-400" />
              <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
            </div>
          </div>
          <div className="p-4 bg-slate-900/95 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-bold">
              <span className="text-orange-400 font-mono text-sm">JLG reaching out™</span>
              <span className="text-slate-500">|</span>
              <span>{isLo ? "ໃໝ່ • ເກົ່າ • ເຊົ່າ • ບໍລິການ • ອາໄຫຼ່" : "New • Pre-Owned • Rental • Service • Spares"}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>{isLo ? "ມາດຕະຖານ ANSI / OSHA Safety Compliant" : "ANSI / OSHA Certified Aerial Platforms"}</span>
            </div>
          </div>
        </div>

        {/* 4S Offerings Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FOUR_S_OFFERINGS.map((offering, idx) => {
            const IconComp = offering.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border ${offering.color} backdrop-blur-sm flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <IconComp className="w-4 h-4" />
                    <span className="text-xs font-black">{isLo ? offering.labelLo : offering.labelEn}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {isLo ? offering.descLo : offering.descEn}
                  </p>
                </div>
                <div className="pt-2 mt-2 border-t border-white/10 text-[9px] uppercase font-bold text-slate-400">
                  Ready to Dispatch
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Core Families Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {JLG_FAMILIES.map((fam, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col justify-between hover:border-orange-500/50 hover:bg-white/[0.07] transition-all group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-[10px] font-bold font-mono">
                    {fam.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Category {idx + 1}</span>
                </div>
                <div>
                  <h4 className="text-lg font-black text-white group-hover:text-orange-300 transition-colors">
                    {fam.titleEn}
                  </h4>
                  <div className="text-xs font-bold text-orange-400 mt-0.5">
                    {fam.subLo}
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {isLo ? fam.descLo : fam.descEn}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold">{isLo ? "ພ້ອມສົ່ງມອບທັນທີ" : "In-Stock Availability"}</span>
                <a
                  href="#booking-form"
                  className="text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>{isLo ? "ຂໍໃບສະເໜີລາຄາ" : "Request RFQ"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Contact & Rental Action Bar */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-950/60 via-slate-900 to-amber-950/60 border border-orange-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-black text-white">
              {isLo ? "ຕ້ອງການຊື້ ຫຼື ເຊົ່າລົດກະເຊົ້າ JLG ສຳລັບໄຊທ໌ງານຂອງທ່ານ?" : "Need JLG Aerial Platforms for Your High-Bay Operations?"}
            </h4>
            <p className="text-xs text-slate-300">
              {isLo
                ? "ທີມວິສະວະກອນ DK LAO ພ້ອມໃຫ້ຄຳປຶກສາເລືອກລຸ້ນທີ່ເໝາະສົມກັບຄວາມສູງ ແລະ ນ້ຳໜັກບັນທຸກ ຕະຫຼອດ 24/7."
                : "DK LAO aerial engineers offer 24/7 technical sizing consultation for height clearance, reach envelopes, and ground loads."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
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
              <span>{isLo ? "ນັດໝາຍຂໍໃບສະເໜີລາຄາ" : "Book Consultation"}</span>
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
