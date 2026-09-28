"use client";

import React from "react";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

interface KnowledgeHubSectionProps {
  onOpenTyreFinder: () => void;
  onOpenFilterFinder: () => void;
  onOpenPartIdentifier: () => void;
  onOpenMobileService: () => void;
}

const KNOWLEDGE_CARDS = [
  {
    id: "tyre",
    badge: "1.5T - 5.0T",
    badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    icon: "🛞",
    title: "ຄູ່ມືຂະໜາດຢາງຕັນ",
    titleEn: "Solid Tyre Guide",
    desc: "ຄິດໄລ່ເບີຢາງໜ້າ-ຫຼັງ OEM ຕາມຂະໜາດໂຕນລົດຍົກ ພ້ອມເລືອກຢາງດຳ/ຢາງຂາວ.",
    actionText: "ເປີດຕົວຊ່ວຍເລືອກ",
    borderColor: "hover:border-amber-500/50 hover:shadow-amber-500/10",
    actionColor: "text-amber-400 group-hover:text-amber-300",
    actionType: "tyre"
  },
  {
    id: "filter",
    badge: "OEM Exact Match",
    badgeColor: "bg-teal-500/20 text-teal-300 border border-teal-500/30",
    icon: "🫁",
    title: "ຕາຕະລາງຊຸດກອງ PM",
    titleEn: "Filter Pack Guide",
    desc: "ກອງເຄື່ອງ, ກອງອາກາດ, ຕອງໂຊລ່າ, ຕອງແອ ສຳລັບ Revo, D-Max, Ranger, Forklift.",
    actionText: "ເບິ່ງຊຸດກອງຄົບຊຸດ",
    borderColor: "hover:border-teal-500/50 hover:shadow-teal-500/10",
    actionColor: "text-teal-400 group-hover:text-teal-300",
    actionType: "filter"
  },
  {
    id: "identifier",
    badge: "VIN & Casting",
    badgeColor: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
    icon: "🔍",
    title: "ວິທີອ່ານເລກປ້ຳ & VIN",
    titleEn: "Part Code & VIN",
    desc: "ຖອດລະຫັດປ້ຳໂລຫະປ້ຳນ້ຳ, ໄດສະຕາດ, ເບຣກ, ລູກປືນ ພ້ອມສົ່ງຮູບໃຫ້ຊ່າງກວດ.",
    actionText: "ຖອດລະຫັດອາໄຫຼ່",
    borderColor: "hover:border-purple-500/50 hover:shadow-purple-500/10",
    actionColor: "text-purple-400 group-hover:text-purple-300",
    actionType: "identifier"
  },
  {
    id: "service",
    badge: "On-Site 24/7",
    badgeColor: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
    icon: "🛠️",
    title: "ກວດເຊັກ 24 ຈຸດ & PM",
    titleEn: "24-Point Inspection",
    desc: "ທີມຊ່າງເຄື່ອນທີ່ ບໍລິການກວດເຊັກ, ປ່ຽນອາໄຫຼ່ ແລະ PM ເຖິງໂຮງງານທົ່ວປະເທດ.",
    actionText: "ນັດໝາຍຊ່າງທັນທີ",
    borderColor: "hover:border-rose-500/50 hover:shadow-rose-500/10",
    actionColor: "text-rose-400 group-hover:text-rose-300",
    actionType: "service"
  }
];

export function KnowledgeHubSection({
  onOpenTyreFinder,
  onOpenFilterFinder,
  onOpenPartIdentifier,
  onOpenMobileService
}: KnowledgeHubSectionProps) {
  const handleCardClick = (type: string) => {
    if (type === "tyre") onOpenTyreFinder();
    else if (type === "filter") onOpenFilterFinder();
    else if (type === "identifier") onOpenPartIdentifier();
    else if (type === "service") onOpenMobileService();
  };

  return (
    <section className="relative rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 shadow-xl overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-0 right-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-white tracking-tight flex items-center gap-2">
              <span>ສູນຄວາມຮູ້ຊ່າງ & ຕົວຊ່ວຍເລືອກອາໄຫຼ່ອັດສະລິຍະ</span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 hidden sm:inline-block">
                Engineering Hub
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>ຄູ່ມືແທ້ 100% ຕາມມາດຕະຖານ OEM</span>
        </div>
      </div>

      {/* 4 Cards in Sleek 4-column Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {KNOWLEDGE_CARDS.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.actionType)}
            className={`group relative text-left p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-md border border-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${card.borderColor} flex flex-col justify-between`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xl p-1.5 rounded-xl bg-white/5 border border-white/10">
                  {card.icon}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xs font-black text-white group-hover:text-emerald-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-[10px] text-slate-400 leading-normal mt-1 line-clamp-2">
                  {card.desc}
                </p>
              </div>
            </div>

            <div className={`pt-2.5 mt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-bold ${card.actionColor} transition-colors`}>
              <span>{card.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
