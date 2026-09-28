import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Truck,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingDown,
  Warehouse,
  Award,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/Forklift/ui/button";
import { ImageLightboxModal } from "@/components/Forklift/ui/ImageLightboxModal";

export function UsedForkliftsShowcase() {
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

  const FLEET_STOCKS = [
    {
      titleLo: "JLG Aerial Platforms",
      titleEn: "JLG Aerial Platforms",
      descLo: "ລົດກະເຊົ້າໄຟຟ້າຂາກະໄກ່ (Scissor Lifts) ແລະ ບູມຍົກ (Boom Lifts) ພ້ອມໃຊ້ງານໃນໄຊທ໌ກໍ່ສ້າງ",
      descEn: "Electric scissor lifts & articulating/telescopic boom lifts ready for construction & maintenance",
      badgeLo: "ລົດກະເຊົ້າສູງ",
      badgeEn: "Access Platforms",
    },
    {
      titleLo: "Jungheinrich Electric",
      titleEn: "Jungheinrich Electric",
      descLo: "ລົດຍົກໄຟຟ້າດຸ່ນດ່ຽງ ແລະ Reach Trucks ນຳເຂົ້າສະພາບນາງຟ້າ ປະຢັດໄຟ ມາດຕະຖານເຢຍລະມັນ",
      descEn: "German-engineered electric counterbalance and reach trucks with immaculate battery health",
      badgeLo: "ລົດໄຟຟ້າສາງ",
      badgeEn: "Electric Warehouse",
    },
    {
      titleLo: "Toyota & Komatsu",
      titleEn: "Toyota & Komatsu",
      descLo: "ລົດຍົກດີເຊວຍອດນິຍົມ 2.5 - 3.5 ໂຕນ ເຄື່ອງຈັກແໜ້ນ ຜ່ານການກວດເຊັກລະບົບ 100%",
      descEn: "Top-tier Japanese diesel workhorses (2.5 - 3.5t) with pristine engine compression and zero leaks",
      badgeLo: "ດີເຊວງານໜັກ",
      badgeEn: "Heavy-Duty Diesel",
    },
    {
      titleLo: "Mitsubishi Certified",
      titleEn: "Mitsubishi Certified",
      descLo: "ລົດຍົກ Mitsubishi Green ມືສອງປັບສະພາບໂຮງງານ ພ້ອມສັນຍາຮັບປະກັນ ແລະ ອາໄຫຼ່ແທ້",
      descEn: "Refurbished Mitsubishi green forklifts conditioned to factory specs with warranty coverage",
      badgeLo: "ປັບສະພາບໂຮງງານ",
      badgeEn: "Factory Conditioned",
    },
  ];

  return (
    <div className="mt-16 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>CERTIFIED PRE-OWNED & REFURBISHED FLEET</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              {isLo ? (
                <>
                  ຈຳໜ່າຍ ລົດຍົກໂຟກສ໌ລິບ <span className="text-yellow-400">ມືສອງ</span> ຕາມສະພາບ ແລະ ສ້ອມແປງແລ້ວ
                </>
              ) : (
                <>
                  Used Forklifts with <span className="text-yellow-400">Refurbished</span> or Conditioned
                </>
              )}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
              {isLo
                ? "ທາງເລືອກທີ່ຄຸ້ມຄ່າສຳລັບທຸລະກິດທີ່ຕ້ອງການຫຼຸດຕົ້ນທຶນ 40-60%. ລົດທຸກຄັນຜ່ານການກວດເຊັກ 12-24 ມາດຕະຖານໂຮງງານ ພ້ອມຮັບປະກັນ ແລະ ສູນບໍລິການ 4S ຮອງຮັບຕະຫຼອດອາຍຸການໃຊ້ງານ."
                : "Cost-effective solution saving 40-60% capital outlay. Every unit passes rigorous 12-24 factory checkpoints, complete with operational warranty and full 4S service support."}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">40-60%</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">{isLo ? "ປະຢັດເງິນລົງທຶນ" : "Capital Savings"}</div>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-black text-yellow-400 font-mono">100%</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">{isLo ? "ກວດເຊັກລະອຽດ" : "Inspection Passed"}</div>
            </div>
          </div>
        </div>

        {/* Official Real Yard Photo Banner */}
        <div 
          onClick={() => setLightbox({
            isOpen: true,
            src: "/images/solutions/used-refurbished-forklifts-yard.png",
            alt: "DK LAO Used Forklift Yard - Refurbished and Conditioned Fleet",
            titleLo: "ສາງລົດຍົກມືສອງ ແລະ ລົດປັບສະພາບມາດຕະຖານໂຮງງານ DK LAO Vientiane Yard",
            titleEn: "DK LAO Refurbished & Conditioned Used Forklifts Fleet Yard",
            subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1132px)",
            subtitleEn: "Click to inspect 2K Ultra-HD resolution image",
          })}
          className="rounded-2xl overflow-hidden border border-white/15 bg-black/50 shadow-2xl relative h-64 sm:h-80 md:h-[400px] cursor-pointer group/img"
        >
          <img
            src="/images/solutions/used-refurbished-forklifts-yard.png"
            alt="DK LAO Used Forklift Yard - Refurbished and Conditioned Fleet"
            fill
            unoptimized
            priority
            className="object-contain p-2 sm:p-4 crisp-diagram group-hover/img:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-xs font-bold text-yellow-400">
            DK LAO OFFICIAL YARD STOCK • VIENTIANE LAOS
          </div>
          <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
            <ZoomIn className="w-3.5 h-3.5 text-yellow-400" />
            <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
          </div>
        </div>

        {/* 4 Available Stock Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FLEET_STOCKS.map((stock, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/40 transition-all">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 mb-2 inline-block">
                {isLo ? stock.badgeLo : stock.badgeEn}
              </span>
              <h4 className="text-base font-extrabold text-white mb-1.5">{isLo ? stock.titleLo : stock.titleEn}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{isLo ? stock.descLo : stock.descEn}</p>
            </div>
          ))}
        </div>

        {/* Bottom Action CTA */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-slate-300 text-center sm:text-left">
            <Warehouse className="w-5 h-5 text-yellow-400 shrink-0" />
            <span>
              {isLo
                ? "ເຊີນເຂົ້າມາຊົມ ແລະ ທົດລອງຂັບລົດຕົວຈິງໄດ້ທີ່ສາງ ດີເຄ ລາວ ຖະໜົນກຳແພງເມືອງ, ບ້ານໜອງໄຮ, ນະຄອນຫຼວງວຽງຈັນ."
                : "Welcome to inspect and test-drive all in-stock units at DK LAO Warehouse Yard, Kamphaengmeuang Rd, Vientiane."}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/8562028023338?text=%E0%BA%AA%E0%BA%B0%E0%BA%9A%E0%BA%B2%E0%BA%8Overlap%E0%BA%94%E0%BA%B5%20%E0%BA%94%E0%BA%B5%E0%BA%87%E0%BA%84%20%E0%BA%A5%E0%BA%B2%E0%BA%A7%2C%20%E0%BA%82%E0%BB%89%E0%BA%B2%E0%BA%9E%E0%BA%B0%E0%BB%80%E0%BA%88%E0%BA%BB%E0%BB%89%E0%BA%B2%E0%BA%AA%E0%BA%BB%E0%BA%99%E0%BB%83%E0%BA%88%E0%BA%AA%E0%BA%AD%E0%BA%9A%E0%BA%96%E0%BA%B2%E0%BA%A1%E0%BA%A5%E0%BA%BB%E0%BA%94%E0%BA%8D%E0%BA%BB%E0%BA%81%E0%BA%A1%E0%BA%B7%E0%BA%AA%E0%BA%AD%E0%BA%87%20Used%20Forklifts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-slate-950 font-bold text-xs transition-all shadow-md"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp: 020 2802 3338</span>
            </a>

            <Button
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-bold text-xs"
              onClick={() => {
                const el = document.getElementById("booking-form");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>{isLo ? "ນັດໝາຍເຂົ້າເບິ່ງລົດ" : "Book Yard Visit"}</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
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
