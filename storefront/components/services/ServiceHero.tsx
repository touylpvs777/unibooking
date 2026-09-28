"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Truck,
  Repeat,
  Wrench,
  Cog,
  Boxes,
  ShieldCheck,
  Zap,
  PhoneCall,
  ArrowRight,
  Clock,
  CheckCircle2,
  Layers,
  Sparkles,
  Calendar,
  Users,
  HeartHandshake,
} from "lucide-react";

export const ServiceHero = ({ isLo }: { isLo: boolean }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative w-full py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border-b border-blue-500/20">
      {/* Dynamic Background Glows & Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[140px] mix-blend-screen animate-pulse duration-10000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-7000 delay-1000"></div>
        <div className="absolute inset-0 bg-[url('/images/company/dklao-hero-banner.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Human-Centric Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm"
          >
            <Users className="w-4 h-4 text-blue-400" />
            <span>{isLo ? "ທີມງານຄົນລາວ ມາດຕະຖານສາກົນ • ສ້າງຕັ້ງ 2010" : "Lao Engineering Craftsmanship • Est. 2010"}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-4"
          >
            {isLo ? (
              <>
                ສູນລົດຟອກລີບ ແລະ ໂຊລູຊັ່ນສາງ 4S<br />
                <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                  ທີ່ດູແລທ່ານດ້ວຍຄວາມຈິງໃຈ
                </span>
              </>
            ) : (
              <>
                DK LAO 4S Forklift Hub &<br />
                <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                  Human-Centered Intralogistics
                </span>
              </>
            )}
          </motion.h1>

          {/* Slogan with Warmth */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl font-bold text-blue-300 mb-6 tracking-wide"
          >
            {isLo
              ? "ຍົກ ຍ້າຍ ຂະຫຍາຍທຸລະກິດຂອງທ່ານ • Lifting – Moving – Growing Your Business"
              : "Lifting – Moving – Growing Your Business • ຍົກ ຍ້າຍ ຂະຫຍາຍທຸລະກິດຂອງທ່ານ"}
          </motion.p>

          {/* Genuine Human Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8"
          >
            {isLo
              ? "ຕະຫຼອດ 16 ປີແຫ່ງການລົງມືເຮັດວຽກຕົວຈິງ, ດີເຄ ລາວ ເຕີບໃຫຍ່ຂຶ້ນຍ້ອນຄວາມໄວ້ວາງໃຈຈາກລູກຄ້າ. ພວກເຮົາເຂົ້າໃຈດີວ່າ ເມື່ອກົນຈັກໃນສາງຢຸດສະງັກ ໝາຍເຖິງຕົ້ນທຶນ ແລະ ເວລາຂອງທ່ານ. ທີມວິສະວະກອນ ແລະ ນາຍຊ່າງຄົນລາວຂອງພວກເຮົາຈຶ່ງພ້ອມຢືນຄຽງຂ້າງ, ຮັບຟັງ, ແລະ ລົງແກ້ໄຂບັນຫາໜ້າງານດ້ວຍຄວາມຮັບຜິດຊອບສູງສຸດ."
              : "Across 16 years of hands-on industrial field work, DK LAO has grown through genuine trust. We understand that every minute of warehouse downtime costs real revenue. That's why our certified team of engineers and master technicians stands ready to assist you on-site with unmatched technical integrity."}
          </motion.p>

          {/* Real Team Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative rounded-3xl overflow-hidden border border-blue-400/30 bg-white/5 backdrop-blur-xl shadow-2xl p-4 sm:p-6 mb-10 text-left"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/9]">
                <Image
                  src="/images/solutions/aftersales-service-workshop-team.png"
                  alt="DK LAO Genuine Aftersales Service and Workshop Team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-xs text-white bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                  <strong>{isLo ? "ພາບທີມງານຊ່າງຕົວຈິງ:" : "Our Real Team on Site:"}</strong>{" "}
                  {isLo
                    ? "ສູນສ້ອມແປງກາງ ແລະ ທີມງານ DKwick Mobile Service ຖະໜົນກຳແພງເມືອງ ນະຄອນຫຼວງວຽງຈັນ"
                    : "Central Workshop & DKwick Mobile Field Response Team on Khamphengmeuang Road, Vientiane"}
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col justify-between h-full space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>{isLo ? "ຄຳໝັ້ນສັນຍາຈາກໃຈນາຍຊ່າງ" : "Technicians' Commitment"}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white leading-snug">
                    {isLo
                      ? "“ພວກເຮົາເບິ່ງແຍງລົດທຸກຄັນ ຄືກັນກັບລົດຂອງພວກເຮົາເອງ”"
                      : "“We care for every client's forklift as if it were our very own”"}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isLo
                      ? "ບໍ່ມີລະບົບຕອບຮັບອັດຕະໂນມັດທີ່ສັບສົນ. ເມື່ອທ່ານໂທຫາ ດີເຄ ລາວ, ທ່ານຈະໄດ້ລົມກັບນາຍຊ່າງ ແລະ ວິສະວະກອນຕົວຈິງ ທີ່ພ້ອມແນະນຳ ແລະ ຊ່ວຍເຫຼືອຢ່າງກົງໄປກົງມາ."
                      : "No complicated automated robot menus. When you call DK LAO, you speak directly with experienced technicians who understand your machinery and solve problems honestly."}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>{isLo ? "ສາຍດ່ວນວິສະວະກອນ:" : "Direct Engineer Hotline:"}</span>
                  <a
                    href="https://wa.me/8562058929299"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    +856 20 5892 9299
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Operational Human Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10 text-left"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-white">{isLo ? "0 ກີບ CAPEX" : "0 LAK CAPEX"}</div>
                <div className="text-[10px] text-slate-300">{isLo ? "ບໍ່ຕ້ອງລົງທຶນກ້ອນໃຫຍ່" : "Preserve Cashflow"}</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-white">{isLo ? "ລົງໄຊທ໌ 2 - 4 ຊມ" : "2 - 4h Dispatch"}</div>
                <div className="text-[10px] text-slate-300">{isLo ? "ຊ່າງມາຮອດໜ້າໂຮງງານ" : "Rapid On-Site Team"}</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0">
                <Repeat className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-white">{isLo ? "Zero Downtime" : "Zero Downtime"}</div>
                <div className="text-[10px] text-slate-300">{isLo ? "ມີລົດສຳຮອງປ່ຽນແທນ" : "Standby Replacement"}</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <Boxes className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-white">{isLo ? "16,000+ ລາຍການ" : "16,000+ Items"}</div>
                <div className="text-[10px] text-slate-300">{isLo ? "ອາໄຫຼ່ແທ້ OEM ພ້ອມສົ່ງ" : "Genuine OEM Stock"}</div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => scrollToSection("booking-form")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black px-8 py-4 rounded-full shadow-xl shadow-blue-500/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 text-base"
            >
              <Calendar className="w-5 h-5" />
              <span>{isLo ? "ປຶກສາວິສະວະກອນ / ຂໍໃບສະເໜີລາຄາ" : "Consult Engineers / Request Quote"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection("detailed-solutions")}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-7 py-4 rounded-full backdrop-blur-md transition-all flex items-center gap-2 hover:scale-105 active:scale-95 text-sm"
            >
              <Layers className="w-5 h-5 text-blue-300" />
              <span>{isLo ? "ສຳຫຼວດທັງ 5 ເສົາຄ້ຳ 4S" : "Explore 5 Pillars"}</span>
            </button>

            <a
              href={
                isLo
                  ? "https://wa.me/8562058929299?text=ສະບາຍດີ%20DK%20LAO%204S%20Forklift%20Hub%20ຕ້ອງການສອບຖາມຂໍ້ມູນການບໍລິການ"
                  : "https://wa.me/8562058929299?text=Hello%20DK%20LAO%204S%20Forklift%20Hub%20Inquiry"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-4 rounded-full shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 text-sm"
            >
              <PhoneCall className="w-5 h-5" />
              <span>WhatsApp: +856 20 5892 9299</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
