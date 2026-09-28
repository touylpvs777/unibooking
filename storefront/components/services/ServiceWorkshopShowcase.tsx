import React, { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Clock,
  PhoneCall,
  Sparkles,
  ChevronRight,
  Warehouse,
  Flame,
  Settings,
  BatteryCharging,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageLightboxModal } from "@/components/ui/ImageLightboxModal";

export function ServiceWorkshopShowcase() {
  const locale = useLocale();
  const isLo = locale === "lo";

  const WORKSHOP_PILLARS = [
    {
      titleLo: "ຊ່ອງກວດເຊັກມາດຕະຖານສູນ (Bays 1 & 2)",
      titleEn: "Certified Inspection Bays (Bays 1 & 2)",
      descLo: "ພື້ນທີ່ສ້ອມບຳລຸງຂະໜາດໃຫຍ່ ພ້ອມເສັ້ນແບ່ງເຂດຄວາມປອດໄພສີເຫຼືອງ ແລະ ຊ່ອງຍົກກວດເຊັກໃຕ້ທ້ອງລົດ.",
      descEn: "Heavy-duty epoxy-coated maintenance bays with dedicated vehicle stalls and chassis inspection pits.",
      icon: Warehouse,
      color: "border-blue-500/30 text-blue-400 bg-blue-500/5",
    },
    {
      titleLo: "ຕູ້ທົດສອບ & ສາກແບັດເຕີຣີນິລະໄພ",
      titleEn: "Battery Testing & Recharging Station",
      descLo: "ຕູ້ຕາໜ່າງນິລະໄພສຳລັບທົດສອບກະແສໄຟ, ຄ່າແຮງດັນ ແລະ ສາກແບັດເຕີຣີ Traction ຢ່າງປອດໄພ.",
      descEn: "Explosion-safe caged test chamber for high-voltage traction battery discharge & charging diagnostics.",
      icon: BatteryCharging,
      color: "border-amber-500/30 text-amber-400 bg-amber-500/5",
    },
    {
      titleLo: "ເຄຣນຍົກເຄື່ອງຈັກ & ລະບົບໄຮໂດຣລິກ",
      titleEn: "Mobile Hydraulic Engine Hoists",
      descLo: "ລົດເຄຣນໄຮໂດຣລິກເຄື່ອນທີ່ສຳລັບຍົກເຄື່ອງຈັກ, ເກຍ ແລະ ປ້ຳໄຮໂດຣລິກຂະໜາດໃຫຍ່ເຖິງ 5-10 ໂຕນ.",
      descEn: "Heavy-duty mobile engine cranes and gantry hoists for swift powertrain and hydraulic pump overhauls.",
      icon: Settings,
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
    },
    {
      titleLo: "ອຸປະກອນຍົກປ່ຽນແບັດ & ຖັງຈ່າຍນ້ຳມັນ",
      titleEn: "Battery Lifter & Lube Dispensers",
      descLo: "ລະບົບຍົກປ່ຽນແບັດເຕີຣີລົດໄຟຟ້າວ່ອງໄວ ແລະ ຖັງຈ່າຍນ້ຳມັນເຄື່ອງ/ໄຮໂດຣລິກແຮງດັນສູງມາດຕະຖານໂຮງງານ.",
      descEn: "Specialized hydraulic battery extractors paired with pneumatic oil dispensing drums for zero spillage.",
      icon: Wrench,
      color: "border-purple-500/30 text-purple-400 bg-purple-500/5",
    },
    {
      titleLo: "ຕູ້ເຄື່ອງມືພິເສດ Shadow Board (Torque Controlled)",
      titleEn: "Calibrated Shadow Board Tool Cabinet",
      descLo: "ຕູ້ເຄື່ອງມືມາດຕະຖານສາກົນ ຄວບຄຸມດ້ວຍລະບົບ Shadow Board ພ້ອມດ້າມຂັນປອນ (Torque Wrench) ຜ່ານການ Calibrate.",
      descEn: "ISO-compliant shadow board tool cabinet with calibrated torque wrenches and factory diagnostic instruments.",
      icon: Award,
      color: "border-rose-500/30 text-rose-400 bg-rose-500/5",
    },
  ];

  return (
    <div className="mt-16 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 space-y-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-4 h-4 text-blue-400" />
            <span>DK LAO CERTIFIED WORKSHOP & SERVICE INFRASTRUCTURE</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            {isLo ? (
              <>
                ບໍລິການຫຼັງການຂາຍ ແລະ ເຊົ່າ: <span className="text-blue-400">ອູ່ສ້ອມແປງ & ທີມຊ່າງມາດຕະຖານສູນ</span>
              </>
            ) : (
              <>
                Aftersales Service & Rental: <span className="text-blue-400">Certified Workshop & Team</span>
              </>
            )}
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {isLo
              ? "ສູນບໍລິການ ແລະ ອູ່ສ້ອມແປງລົດຍົກມາດຕະຖານສາກົນແຫ່ງດຽວໃນ ສປປ ລາວ ພ້ອມທີມງານວິສະວະກອນຊ່ຽວຊານ, ຊ່ອງຈອດກວດເຊັກລະດັບອຸດສາຫະກຳ, ແລະ ເຄື່ອງມືພິເສດຄວບຄຸມຄ່າແຮງຂັນ Torque 100%."
              : "Premier enterprise forklift workshop in Lao PDR equipped with dedicated service bays, certified technicians, hydraulic engine hoists, and ISO-calibrated shadow board instrumentation."}
          </p>
        </div>

        {/* 5 Workshop Infrastructure Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WORKSHOP_PILLARS.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border ${pillar.color} backdrop-blur-sm flex flex-col justify-between hover:border-blue-400/50 transition-all group`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white/10 shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                      {isLo ? pillar.titleLo : pillar.titleEn}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isLo ? pillar.descLo : pillar.descEn}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-bold text-slate-400">
                  <span>Standard SOP</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Certified
                  </span>
                </div>
              </div>
            );
          })}

          {/* Quick Contact & Workshop Visit Card */}
          <div className="p-5 rounded-2xl border border-blue-500/40 bg-gradient-to-br from-blue-900/40 to-slate-900 backdrop-blur-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                Enterprise Support
              </div>
              <h4 className="text-sm font-black text-white">
                {isLo ? "ນັດໝາຍຢ້ຽມຊົມສູນບໍລິການ ຫຼື ສົ່ງລົດເຂົ້າອູ່" : "Schedule Facility Visit & Mobile Service"}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isLo
                  ? "ຍິນດີຕ້ອນຮັບລູກຄ້າອົງກອນ ແລະ ໂຮງງານໃຫຍ່ ເຂົ້າກວດສອບຄວາມພ້ອມຂອງອູ່ສ້ອມແປງ ແລະ ສະຕ໋ອກອາໄຫຼ່."
                  : "We welcome corporate audits & plant delegations to inspect our workshop bays, diagnostic tools, and parts depot."}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-white/10 flex flex-wrap gap-2">
              <a
                href="tel:+8562058929299"
                className="btn-emerald py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+856 20 5892 9299</span>
              </a>
              <a
                href="#booking-form"
                className="py-2 px-3 rounded-xl border border-white/20 hover:bg-white/10 text-white font-bold text-xs flex items-center gap-1 transition-all"
              >
                <span>{isLo ? "ນັດໝາຍເຂົ້າສູນ" : "Book Workshop"}</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom SLA Assurance Banner */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-slate-300 text-center sm:text-left">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              {isLo
                ? "ຮັບປະກັນລົດສຳຮອງປ່ຽນແທນ (Zero-Downtime Standby Unit) ພາຍໃນ 24 ຊົ່ວໂມງ ຫາກການສ້ອມແປງໃຊ້ເວລາເກີນກຳນົດ."
                : "Guaranteed Zero-Downtime standby replacement forklift delivered to your site within 24 hours if overhaul exceeds SLA."}
            </span>
          </div>
          <a
            href="https://wa.me/8562058929299"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-bold shrink-0 flex items-center gap-1"
          >
            <span>WhatsApp Technician Line</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>


    </div>
  );
}
