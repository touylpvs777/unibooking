import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ENTERPRISE_CUSTOMERS } from "@/data/customers";

export function TrustedPartners() {
  const { i18n } = useTranslation();
  const locale = i18n.language || "lo";
  const isLao = locale === "lo";

  return (
    <section className="py-14 relative overflow-hidden bg-slate-50/70 dark:bg-slate-950/60 border-y border-slate-200/80 dark:border-white/10 my-8">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 dark:from-slate-950 via-transparent to-slate-50 dark:to-slate-950 z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center relative z-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#005BAC] dark:text-blue-400 text-xs font-black uppercase tracking-wider mb-2.5 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>OUR PROVEN ENTERPRISE CUSTOMERS</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {isLao ? "ໄດ້ຮັບຄວາມໄວ້ວາງໃຈຈາກ 20 ອົງກອນຊັ້ນນຳລະດັບປະເທດ" : "Trusted by 20 Nation-Leading Enterprises & Concessions"}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2 text-xs md:text-sm max-w-2xl mx-auto">
          {isLao
            ? "ພວກເຮົາເປັນຜູ້ນຳສະໜອງລົດຍົກໃຫ້ເຊົ່າ 0 CAPEX, ອາໄຫຼ່ແທ້ OEM ແລະ ບໍລິການບຳລຸງຮັກສາ PM ແກ່ໂຮງງານ ແລະ ໂຄງການສຳປະທານທົ່ວປະເທດລາວ"
            : "Leading provider of 0-CAPEX forklift leasing, certified OEM spares, and PM services across Lao PDR."}
        </p>
      </div>

      <div className="flex overflow-hidden relative z-0 py-2">
        <motion.div
          animate={{ x: [0, -2600] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          className="flex gap-4 items-center whitespace-nowrap pl-4"
        >
          {/* Repeat array for seamless infinite marquee */}
          {[...ENTERPRISE_CUSTOMERS, ...ENTERPRISE_CUSTOMERS, ...ENTERPRISE_CUSTOMERS].map((client, idx) => (
            <div
              key={idx}
              className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-lg hover:border-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 shrink-0"
            >
              <div className="w-14 h-10 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-center p-1.5 shrink-0">
                <div className="relative w-full h-full">
                  <img
                    src={client.logoSrc}
                    alt={isLao ? client.nameLo : client.nameEn}
                    
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col text-left pr-2">
                <span className="font-extrabold text-slate-900 dark:text-white text-xs md:text-sm">
                  {isLao ? client.nameLo : client.nameEn}
                </span>
                <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                  {isLao ? client.scaleBadgeLo : client.scaleBadgeEn}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

