import React from "react";
import { ShieldCheck, Truck, FileText, Wrench, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function EnterpriseGuarantees() {
  const { i18n } = useTranslation();
  const locale = i18n.language || "lo";
  const isLao = locale === "lo";

  const guarantees = [
    {
      icon: ShieldCheck,
      color: "emerald",
      title_lo: "ອາໄຫຼ່ແທ້ OEM 100%",
      desc_lo: "ນຳເຂົ້າຈາກໂຮງງານຜູ້ຜະລິດໂດຍກົງ",
      title_en: "100% Genuine OEM Certified",
      desc_en: "Direct from factory manufacturers",
      href: `/${locale}/services#spare-parts`,
    },
    {
      icon: Truck,
      color: "sky",
      title_lo: "ຈັດສົ່ງດ່ວນທົ່ວປະເທດ",
      desc_lo: "ຈັດສົ່ງພາຍໃນມື້ດຽວໃນນະຄອນຫຼວງ",
      title_en: "Express Nationwide Dispatch",
      desc_en: "Same-day delivery in Vientiane capital",
      href: `/${locale}/services#sale`,
    },
    {
      icon: FileText,
      color: "amber",
      title_lo: "ໃບເກັບເງິນອາກອນຖືກຕ້ອງ",
      desc_lo: "ຫັກອາກອນ ແລະ ເຂົ້າບັນຊີບໍລິສັດໄດ້ 100%",
      title_en: "Official Lao VAT Invoices",
      desc_en: "Full tax deduction compliance",
      href: `/${locale}/services#management-ecosystem`,
    },
    {
      icon: Wrench,
      color: "purple",
      title_lo: "ທີມຊ່າງ PM ເຄື່ອນທີ່ 24/7",
      desc_lo: "ຊ່າງຊຳນານງານພ້ອມລົງໄຊງານດ່ວນ",
      title_en: "24/7 Mobile Service PM",
      desc_en: "On-site maintenance & emergency support",
      href: `/${locale}/services#service`,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 my-6">
      {guarantees.map((g, idx) => {
        const Icon = g.icon;
        return (
          <Link
            key={idx}
            href={g.href}
            className="group flex items-center justify-between p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-sm transition-all duration-300 hover:border-blue-500/50 dark:hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  g.color === "emerald"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : g.color === "sky"
                    ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20"
                    : g.color === "amber"
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                    : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-xs md:text-sm font-black text-slate-900 dark:text-white truncate group-hover:text-[#005BAC] dark:group-hover:text-blue-400 transition-colors">
                  {isLao ? g.title_lo : g.title_en}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {isLao ? g.desc_lo : g.desc_en}
                </span>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0 ml-1 hidden sm:block" />
          </Link>
        );
      })}
    </div>
  );
}
