import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Building2,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  ChevronRight,
  RefreshCw,
  Coins,
  Wrench,
  Award,
  Layers,
  SlidersHorizontal,
  CalendarCheck,
  AlertCircle,
  Truck,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/Forklift/ui/button";
import { ImageLightboxModal } from "@/components/Forklift/ui/ImageLightboxModal";

export function RentalBenefitsShowcase() {
  const { i18n } = useTranslation();
  const locale = i18n.language || "lo";
  const isLo = locale === "lo";
  const [activeTab, setActiveTab] = useState<"benefits" | "matrix">("benefits");

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

  const FIVE_BENEFITS = [
    {
      num: "01",
      titleLo: "ການລົງທຶນທີ່ເປັນສູນ (Zero Capital Investment)",
      titleEn: "Zero Capital Investment",
      descLo: "ລູກຄ້າສາມາດປະຢັດຕົ້ນທຶນການລົງທຶນເລີ່ມຕົ້ນ (CAPEX) ແລະ ນຳໃຊ້ເງິນທຶນທີ່ປະຢັດໄດ້ນັ້ນ ໄປໝູນວຽນຂະຫຍາຍທຸລະກິດຫຼັກ.",
      descEn: "Customers can save upfront investment costs and in turn use the saved capital for business expansion.",
      icon: Coins,
      color: "border-red-500/40 text-red-400 bg-red-500/5",
    },
    {
      num: "02",
      titleLo: "ບໍ່ຕ້ອງເລື່ອງບຳລຸງຮັກສາເອງ (Hassle Free Maintenance)",
      titleEn: "Hassle Free Maintenance",
      descLo: "ທຸກການບໍລິການ, ຄ່າອາໄຫຼ່, ນ້ຳມັນເຄື່ອງ, ຢາງຕັນ ແລະ ຄ່າແຮງງານຊ່າງແມ່ນລວມຢູ່ໃນຂອບເຂດສັນຍາ 100% ໃຫ້ທ່ານສະບາຍໃຈ.",
      descEn: "All services are covered in our scope thereby providing our customers complete peace of mind.",
      icon: Wrench,
      color: "border-amber-500/40 text-amber-400 bg-amber-500/5",
    },
    {
      num: "03",
      titleLo: "ຮັບປະກັນຄຸນນະພາບ (Guaranteed Reliability)",
      titleEn: "Guaranteed Reliability",
      descLo: "ອຸປະກອນ ແລະ ລົດຍົກມາດຕະຖານສູງ ມອບຄວາມໜ້າເຊື່ອຖືສູງສຸດ ພ້ອມທີມງານຊ່າງສະໜັບສະໜູນເພື່ອຫຼຸດເວລາຢຸດງານ (Minimal Downtime).",
      descEn: "Our high-quality equipment offers maximum reliability which is further supported by our manpower for minimal downtime.",
      icon: ShieldCheck,
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/5",
    },
    {
      num: "04",
      titleLo: "ງ່າຍໃນການອັບເກຣດ (Easy Upgradation)",
      titleEn: "Easy Upgradation",
      descLo: "ການເຊົ່າຊ່ວຍກຳຈັດຄວາມສ່ຽງເລື່ອງເຄື່ອງຈັກຫຼ້າສະໄໝ (Technological Obsolescence) ແລະ ໃຫ້ທາງເລືອກໃນການປ່ຽນລົດລຸ້ນໃໝ່ສະເໝີ.",
      descEn: "Renting equipment eliminates the risk of technological obsolescence and gives the client upgradation options at regular intervals.",
      icon: TrendingUp,
      color: "border-blue-500/40 text-blue-400 bg-blue-500/5",
    },
    {
      num: "05",
      titleLo: "ເລືອກໄລຍະການໃຊ້ວຽກ (Operational Flexibility)",
      titleEn: "Operational Flexibility",
      descLo: "ເລືອກເຊົ່າຕາມຄວາມຕ້ອງການຕົວຈິງ ພ້ອມຄວາມຍືດຫຍຸ່ນໃນການເພີ່ມ ຫຼື ຫຼຸດຈຳນວນລົດໃນກອງ Fleet ໃຫ້ສອດຄ່ອງກັບວຽກງານໄດ້ງ່າຍດາຍ.",
      descEn: "Rent as per your needs with the flexibility to scale up or scale down the operations easily.",
      icon: SlidersHorizontal,
      color: "border-purple-500/40 text-purple-400 bg-purple-500/5",
    },
  ];

  const FOUR_QUADRANTS = [
    {
      title: "REDUCE EXPENSIVE BREAKDOWNS",
      titleLo: "ຫຼຸດຜ່ອນບັນຫາລົດເພ ແລະ ຄ່າສ້ອມແປງແພງ",
      desc: "Our fleets are stocked with modern, reliable equipment that undergoes regular maintenance checks by our trained technicians. Prior to each rental, we ensure that high-quality products are delivered at your job site.",
      descLo: "ກອງລົດເຊົ່າໄດ້ຮັບການດູແລຢ່າງສະໝ່ຳສະເໝີໂດຍຊ່າງເຕັກນິກຊ່ຽວຊານ ພ້ອມກວດເຊັກລະອຽດກ່ອນສົ່ງມອບເຖິງໄຊທ໌ງານ.",
      bg: "bg-blue-950/80 border-blue-500/40 text-blue-300",
      accent: "text-blue-400",
    },
    {
      title: "ELIMINATE STORAGE COST",
      titleLo: "ຕັດຄ່າໃຊ້ຈ່າຍ ແລະ ພື້ນທີ່ຈັດເກັບລົດ",
      desc: "Once the project is done, clients will no longer require storage space. Simply notify our experts, we will oversee the equipment storage and pick-up from the job site.",
      descLo: "ເມື່ອຈົບໂຄງການ ທ່ານບໍ່ຈຳເປັນຕ້ອງມີບ່ອນຈອດ ຫຼື ແບກຄ່າເກັບຮັກສາ. ພຽງແຕ່ແຈ້ງເຮົາ ທີມງານຈະເຂົ້າໄປຂົນຍ້າຍລົດກັບທັນທີ.",
      bg: "bg-slate-900/90 border-indigo-500/40 text-indigo-300",
      accent: "text-indigo-400",
    },
    {
      title: "INCREASE YOUR WORK EFFICIENCY",
      titleLo: "ເພີ່ມປະສິດທິພາບການເຮັດວຽກ 100%",
      desc: "Clients can expect the latest and advanced technology available in the market. We hire the best quality brands that are using innovative compatible solutions.",
      descLo: "ລູກຄ້າໄດ້ໃຊ້ລົດຍົກທີ່ມີເຕັກໂນໂລຊີທີ່ທັນສະໄໝ ແລະ ປະຢັດພະລັງງານສູງສຸດຈາກແບຣນອັນດັບ 1 ຂອງໂລກ.",
      bg: "bg-red-950/70 border-red-500/40 text-red-300",
      accent: "text-red-400",
    },
    {
      title: "NO EQUIPMENT OBSOLESCENCE",
      titleLo: "ໝົດຄວາມກັງວົນເລື່ອງຄ່າເສື່ອມລາຄາ",
      desc: "Equipment ownership may be expensive and depreciates in value over time. Renting allows you to use advanced technology without the worry of costly depreciation.",
      descLo: "ການຊື້ລົດເອງຕ້ອງແບກຮັບຄ່າເສື່ອມລາຄາທຸກປີ. ການເຊົ່າຊ່ວຍໃຫ້ທ່ານປ່ຽນຄ່າໃຊ້ຈ່າຍເປັນ OPEX ຫັກພາສີໄດ້ 100% ໂດຍບໍ່ມີຄວາມສ່ຽງ.",
      bg: "bg-slate-950/90 border-white/20 text-slate-300",
      accent: "text-white",
    },
  ];

  return (
    <div className="mt-16 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
            <Coins className="w-4 h-4 text-red-400" />
            <span>FORKLIFT TRUCKS SHORT AND LONG TERM RENTAL</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            {isLo ? (
              <>
                ບໍລິການໃຫ້ເຊົ່າ ລົດຍົກໂຟກສ໌ລິບ: <span className="text-red-400">ໄລຍະສັ້ນ ແລະ ໄລຍະຍາວ</span>
              </>
            ) : (
              <>
                Forklift Trucks Rental: <span className="text-red-400">Short and Long Term Solutions</span>
              </>
            )}
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {isLo
              ? "ປ່ຽນພາລະການລົງທຶນ CAPEX ມາເປັນຄວາມຄ່ອງຕົວທາງການເງິນດ້ວຍສັນຍາເຊົ່າ B2B Fleet 0 LAK. ຟຣີຄ່າບຳລຸງຮັກສາ, ຟຣີອາໄຫຼ່ແທ້, ພ້ອມລົດສຳຮອງປ່ຽນແທນຕະຫຼອດ 24 ຊົ່ວໂມງ."
              : "Eliminate hefty capital outlays and depreciation risks. Our strategic short and long-term rental programs offer total maintenance coverage, flexible terms, and zero plant downtime."}
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 rounded-2xl bg-white/10 border border-white/10 text-xs font-bold mt-2">
            <button
              type="button"
              onClick={() => setActiveTab("benefits")}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === "benefits"
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {isLo ? "5 ຈຸດເດັ່ນຂອງການເຊົ່າ (5 Core Benefits)" : "5 Core Rental Benefits"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("matrix")}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === "matrix"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {isLo ? "4 ມິຕິຄຸນຄ່າທາງທຸລະກິດ (4 Strategic Quadrants)" : "4 Value Matrix Quadrants"}
            </button>
          </div>
        </div>

        {/* TAB 1: 5 Core Benefits (Slide 2) */}
        {activeTab === "benefits" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Slide Banner Image */}
            <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-950 relative group">
              <div 
                onClick={() => setLightbox({
                  isOpen: true,
                  src: "/images/solutions/rental-5-core-benefits.png",
                  alt: "Forklift Trucks Short and Long Term Rental 5 Core Benefits",
                  titleLo: "5 ຜົນປະໂຫຍດຫຼັກຂອງການເຊົ່າລົດຍົກ DK LAO (5 Core Benefits)",
                  titleEn: "Forklift Trucks Short and Long Term Rental 5 Core Benefits",
                  subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1134px)",
                  subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                })}
                className="relative aspect-[16/9] w-full cursor-pointer group/img"
              >
                <img
                  src="/images/solutions/rental-5-core-benefits.png"
                  alt="Forklift Trucks Short and Long Term Rental 5 Core Benefits"
                  
                  unoptimized
                  priority
                  className="object-contain crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                  <ZoomIn className="w-3.5 h-3.5 text-red-400" />
                  <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                </div>
              </div>
            </div>

            {/* 5 Benefits Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FIVE_BENEFITS.map((b) => {
                const IconComponent = b.icon;
                return (
                  <div
                    key={b.num}
                    className={`p-5 rounded-2xl border ${b.color} backdrop-blur-sm flex flex-col justify-between hover:border-red-400/50 transition-all group`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-xl bg-white/10 shrink-0">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xl font-black text-white/30 group-hover:text-white/60 transition-colors">
                          {b.num}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-white leading-snug group-hover:text-red-300 transition-colors">
                        {isLo ? b.titleLo : b.titleEn}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {isLo ? b.descLo : b.descEn}
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-bold text-slate-400">
                      <span>B2B Operational Advantage</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Guaranteed
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Consultation Card */}
              <div className="p-5 rounded-2xl border border-red-500/40 bg-gradient-to-br from-red-950/40 to-slate-900 backdrop-blur-sm flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[10px] font-bold uppercase tracking-wider">
                    0 CAPEX Lease
                  </div>
                  <h4 className="text-sm font-black text-white">
                    {isLo ? "ຂໍໃບສະເໜີລາຄາເຊົ່າ Fleet ລາຍເດືອນ" : "Request Custom Fleet Lease Quotation"}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isLo
                      ? "ເລືອກໄດ້ທັງສັນຍາເຊົ່າໄລຍະສັ້ນ 1-6 ເດືອນ ແລະ ໄລຍະຍາວ 1-5 ປີ ພ້ອມລົດສຳຮອງປ່ຽນແທນຕະຫຼອດສັນຍາ."
                      : "Tailored operational leases for 1-5 years or short-term seasonal peaks with full maintenance and standby replacements."}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/10 flex flex-wrap gap-2">
                  <a
                    href="#booking-form"
                    className="btn-emerald py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <span>{isLo ? "ຂໍໃບສະເໜີລາຄາເຊົ່າ" : "Request RFQ"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="tel:+8562058929299"
                    className="py-2 px-3 rounded-xl border border-white/20 hover:bg-white/10 text-white font-bold text-xs flex items-center gap-1 transition-all"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>ໂທປຶກສາ</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 4 Strategic Value Quadrants (Slide 3) */}
        {activeTab === "matrix" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Slide Banner Image */}
            <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-950 relative group">
              <div 
                onClick={() => setLightbox({
                  isOpen: true,
                  src: "/images/solutions/rental-strategic-value-quadrants.png",
                  alt: "Forklift Trucks Rental 4 Strategic Value Quadrants",
                  titleLo: "4 ມິຕິຄຸນຄ່າທາງຍຸດທະສາດການເຊົ່າລົດຍົກ (Strategic Value Quadrants)",
                  titleEn: "Forklift Trucks Rental 4 Strategic Value Quadrants",
                  subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1122px)",
                  subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                })}
                className="relative aspect-[16/9] w-full cursor-pointer group/img"
              >
                <img
                  src="/images/solutions/rental-strategic-value-quadrants.png"
                  alt="Forklift Trucks Rental 4 Strategic Value Quadrants"
                  
                  unoptimized
                  className="object-contain crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                  <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                  <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                </div>
              </div>
            </div>

            {/* 4 Quadrants 2x2 Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FOUR_QUADRANTS.map((quad, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border ${quad.bg} backdrop-blur-md flex flex-col justify-between hover:scale-[1.01] transition-all`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-black tracking-wider uppercase ${quad.accent}`}>
                        Quadrant {idx + 1}
                      </span>
                      <ShieldCheck className={`w-4 h-4 ${quad.accent}`} />
                    </div>
                    <h4 className="text-base sm:text-lg font-black text-white">
                      {quad.title}
                    </h4>
                    <div className="text-xs font-bold text-slate-300">
                      {quad.titleLo}
                    </div>
                    <p className="text-xs text-slate-300/90 leading-relaxed pt-1">
                      {isLo ? quad.descLo : quad.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-400">Enterprise Impact</span>
                    <span className="text-emerald-400">100% Guaranteed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Synergy Callout */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-slate-300 text-center sm:text-left">
            <RefreshCw className="w-5 h-5 text-blue-400 shrink-0" />
            <span>
              {isLo
                ? "ເຊື່ອມໂຍງຄົບວົງຈອນ 4S: ລູກຄ້າເຊົ່າທຸກຄັນໄດ້ຮັບສິດເຂົ້າກວດເຊັກ PM 12-24 ຈຸດຟຣີ ແລະ ປ່ຽນອາໄຫຼ່ແທ້ 100%."
                : "Connected 4S Synergy: All rental units receive 100% free scheduled PM inspections and certified OEM replacement parts."}
            </span>
          </div>
          <a
            href="#service"
            className="text-blue-400 hover:text-blue-300 font-bold shrink-0 flex items-center gap-1"
          >
            <span>{isLo ? "ເບິ່ງມາດຕະຖານ Service →" : "View Service Standards →"}</span>
          </a>
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

