import React from "react";
import { Settings, Truck, Sparkles, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SERVICES = [
  {
    id: "spare-parts",
    icon: Settings,
    title_lo: "ສູນລວມອາໄຫຼ່ & ສາງ Consignment",
    title_en: "Heavy Machinery & Consignment Hub",
    description_lo: "ຈັດຈຳໜ່າຍອາໄຫຼ່ແທ້ 100% ພ້ອມໂຊລູຊັ່ນຕັ້ງຕູ້ສະຕັອກອາໄຫຼ່ Consignment ໄວ້ໃນໂຮງງານຂອງທ່ານໂດຍກົງ.",
    description_en: "100% OEM spare parts distributor with dedicated on-site factory consignment depot solutions.",
    badge_lo: "OEM 100% • ສາງໂຮງງານ",
    badge_en: "100% Genuine • Consignment",
    color: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderGlow: "group-hover:border-blue-500/50",
    target: "spare-parts",
  },
  {
    id: "rental",
    icon: Truck,
    title_lo: "ໃຫ້ເຊົ່າລົດຟອກລີບ 0 CAPEX",
    title_en: "0 CAPEX Fleet Lease",
    description_lo: "ບໍລິການໃຫ້ເຊົ່າລົດຟອກລີບໄລຍະຍາວ 1-5 ປີ ຄ່າເຊົ່າລວມຄ່າບຳລຸງຮັກສາ, ປ່ຽນຢາງ, ແລະ ລົດສຳຮອງ 100%.",
    description_en: "1-5 year full-service operational lease with 100% free parts, tire replacement, and standby units.",
    badge_lo: "0 ກີບ CAPEX",
    badge_en: "100% OPEX",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    borderGlow: "group-hover:border-emerald-500/50",
    target: "rental",
  },
  {
    id: "nilfisk",
    icon: Sparkles,
    title_lo: "ໂຄງສ້າງການບໍລິຫານ 360°",
    title_en: "360° Management Ecosystem",
    description_lo: "ລະບົບບໍລິຫານຈັດການ Fleet ຄົບວົງຈອນ: IoT Telematics, ຊ່າງປະຈຳໂຮງງານ, ແລະ 1 ໃບແຈ້ງໜີ້ລວມທຸກບໍລິການ.",
    description_en: "Integrated fleet ecosystem: IoT telematics, resident technicians, and single consolidated enterprise billing.",
    badge_lo: "ການບໍລິຫານ 360°",
    badge_en: "360° Fleet Care",
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-600 dark:text-purple-400",
    borderGlow: "group-hover:border-purple-500/50",
    target: "management-ecosystem",
  },
  {
    id: "maintenance",
    icon: Zap,
    title_lo: "ສູນສ້ອມ Mobile Service & PM",
    title_en: "Mobile Service & PM 24-Point",
    description_lo: "ທີມຊ່າງເຄື່ອນທີ່ລົງກວດເຊັກເຖິງໂຮງງານ 24-48h ພ້ອມໃບຢັ້ງຢືນມາດຕະຖານຄວາມປອດໄພ ISO/OSHA 24 ຈຸດ.",
    description_en: "Rapid on-site mobile service within 2-4 hours with standard 24-point ISO/OSHA safety certification.",
    badge_lo: "SLA 2-4 ຊົ່ວໂມງ",
    badge_en: "2-4h SLA",
    color: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderGlow: "group-hover:border-amber-500/50",
    target: "service",
  },
];

export function ServiceHighlights() {
  const { i18n } = useTranslation();
  const locale = i18n.language || "lo";
  const isLao = locale === "lo";

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#005BAC] dark:text-blue-400 text-xs font-black uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Industrial Engineering Solutions</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {isLao ? "4 ບໍລິການຫຼັກລະດັບອົງກອນຂອງພວກເຮົາ" : "Our 4 Core Enterprise Services"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-xs md:text-sm mt-2 font-normal">
            {isLao
              ? "ຕອບໂຈດທຸກຄວາມຕ້ອງການຂອງອຸດສາຫະກຳໜັກ ແລະ ໂຮງງານດ້ວຍມາດຕະຖານການບໍລິການລະດັບສາກົນ"
              : "Meeting institutional demands with international engineering standards and rapid on-site logistics."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.id} href={`/${locale}/services#${service.target}`} className="group relative block">
                {/* Adaptive Glass Card */}
                <div className={`relative p-6 h-full flex flex-col rounded-3xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl ${service.borderGlow}`}>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${service.color} border border-slate-200/50 dark:border-white/10 transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className={`w-6 h-6 ${service.iconColor}`} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {isLao ? service.badge_lo : service.badge_en}
                    </span>
                  </div>
                  
                  <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-[#005BAC] dark:group-hover:text-blue-400 transition-colors">
                    {isLao ? service.title_lo : service.title_en}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1 leading-relaxed">
                    {isLao ? service.description_lo : service.description_en}
                  </p>
                  
                  <div className="mt-auto pt-3 border-t border-slate-100 dark:border-white/5 flex items-center text-xs md:text-sm font-bold text-[#005BAC] dark:text-blue-400">
                    <span>{isLao ? "ເຂົ້າສູ່ລະບົບການບໍລິຫານ 4S" : "Explore 4S Solution"}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
