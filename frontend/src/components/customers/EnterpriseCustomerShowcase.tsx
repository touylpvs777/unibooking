
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles,
  Layers,
  Truck,
  Zap
} from "lucide-react";
import { ENTERPRISE_CUSTOMERS } from "@/data/customers";
import type { CustomerClient } from "@/data/customers";

export function EnterpriseCustomerShowcase() {
  const { i18n } = useTranslation();
  const locale = i18n.language || "lo";
  const isLo = locale === "lo";

  const [activeCategory, setActiveCategory] = useState<string>("all");

  const totalCount = ENTERPRISE_CUSTOMERS.length;
  const fmcgCount = ENTERPRISE_CUSTOMERS.filter((c) => c.category === "beverage_fmcg").length;
  const miningCount = ENTERPRISE_CUSTOMERS.filter((c) => c.category === "mining_energy").length;
  const logisticsCount = ENTERPRISE_CUSTOMERS.filter((c) => c.category === "logistics").length;
  const infraCount = ENTERPRISE_CUSTOMERS.filter((c) => c.category === "infrastructure").length;

  const categories = [
    { id: "all", labelLo: `ທັງໝົດ (${totalCount} ອົງກອນ)`, labelEn: `All Clients (${totalCount})` },
    { id: "beverage_fmcg", labelLo: `ອາຫານ, ເຄື່ອງດື່ມ & FMCG (${fmcgCount})`, labelEn: `Food, Beverage & FMCG (${fmcgCount})` },
    { id: "mining_energy", labelLo: `ບໍ່ແຮ່ & ພະລັງງານ (${miningCount})`, labelEn: `Mining & Energy (${miningCount})` },
    { id: "logistics", labelLo: `ໂລຈິສຕິກ & ຂົນສົ່ງ (${logisticsCount})`, labelEn: `Logistics & Ports (${logisticsCount})` },
    { id: "infrastructure", labelLo: `ໂຄງສ້າງພື້ນຖານ & ເທັກໂນໂລຢີ (${infraCount})`, labelEn: `Infrastructure & Tech (${infraCount})` },
  ];

  const filteredCustomers = activeCategory === "all"
    ? ENTERPRISE_CUSTOMERS
    : ENTERPRISE_CUSTOMERS.filter(c => c.category === activeCategory);

  return (
    <section id="our-customers" className="py-20 bg-slate-50/70 dark:bg-slate-950/70 border-b border-slate-200/80 dark:border-white/10 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container px-4 max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>OUR PROVEN CLIENTELE • 100% NATIONWIDE TRUST</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            {isLo ? "ກຸ່ມລູກຄ້າອົງກອນຊັ້ນນຳທີ່ໄວ້ວາງໃຈພວກເຮົາ" : "Trusted by Nation-Leading Enterprises & Concessions"}
          </h2>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {isLo 
              ? "ພວກເຮົາພູມໃຈທີ່ໄດ້ເປັນຄູ່ຄ້າຫຼັກໃນການສະໜອງລົດຍົກໃຫ້ເຊົ່າ, ອາໄຫຼ່ແທ້ OEM ແລະ ລະບົບບໍລິຫານກອງລົດ ໃຫ້ແກ່ 20 ອົງກອນ, ໂຮງງານອຸດສາຫະກຳ ແລະ ໂຄງການສຳປະທານທີ່ໃຫຍ່ທີ່ສຸດໃນ ສປປ ລາວ"
              : "Proudly serving as the primary forklift leasing, OEM spare parts, and fleet management partner for 20 of the largest industrial enterprises and national concessions in Lao PDR."}
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-blue-400"
                }`}
              >
                {isLo ? cat.labelLo : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Customer Logo & Details Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
        >
          <AnimatePresence>
            {filteredCustomers.map((customer) => (
              <motion.div
                key={customer.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 p-5 shadow-sm hover:shadow-xl hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top: Logo Container & Scale Badge */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                      {isLo ? customer.categoryLo.split("&")[0] : customer.categoryEn.split("&")[0]}
                    </span>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md text-right">
                      {isLo ? customer.scaleBadgeLo : customer.scaleBadgeEn}
                    </span>
                  </div>

                  {/* Logo Center Box */}
                  <div className="w-full h-24 rounded-xl bg-slate-50/80 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-center p-3 mb-4 group-hover:bg-blue-50/30 dark:group-hover:bg-blue-950/20 transition-colors">
                    <div className="relative w-full h-full">
                      <img
                        src={customer.logoSrc}
                        alt={isLo ? customer.fullNameLo : customer.fullNameEn}
                        
                        className="object-contain filter transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Company Info */}
                  <h3 className="font-black text-slate-900 dark:text-white text-base leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {isLo ? customer.nameLo : customer.nameEn}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {isLo ? customer.fullNameLo : customer.fullNameEn}
                  </p>
                </div>

                {/* Bottom: Service Provided Callout */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5">
                  <div className="flex items-start gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">
                      {isLo ? customer.serviceTypeLo : customer.serviceTypeEn}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Enterprise Trust Metric Highlights */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-lg grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">20+</div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
              {isLo ? "ອົງກອນຊັ້ນນຳລະດັບປະເທດ" : "Nation-Leading Clients"}
            </div>
            <div className="text-[10px] text-slate-400">{isLo ? "ອຸດສາຫະກຳ, ບໍ່ແຮ່ & ສຳປະທານ" : "FMCG, Mining & Concessions"}</div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
              {isLo ? "Zero Downtime SLA" : "Zero Downtime Guarantee"}
            </div>
            <div className="text-[10px] text-slate-400">{isLo ? "ລົດສຳຮອງປ່ຽນແທນຟຣີ 24/7" : "Free Standby Replacement"}</div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400">150+</div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
              {isLo ? "ຄັນ ລົດຍົກໃນລະບົບ Fleet" : "Forklifts Deployed"}
            </div>
            <div className="text-[10px] text-slate-400">{isLo ? "Toyota, Mitsubishi, Heli, Li-Ion" : "Diesel, Electric & Reach Trucks"}</div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-500 dark:text-amber-400">17+</div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
              {isLo ? "ແຂວງ ທົ່ວປະເທດລາວ" : "Provinces Covered"}
            </div>
            <div className="text-[10px] text-slate-400">{isLo ? "Mobile Service ເຖິງໜ້າໂຮງງານ" : "Rapid On-Site Mobile Support"}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

