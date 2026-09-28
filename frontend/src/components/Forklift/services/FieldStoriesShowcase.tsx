import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  HeartHandshake, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Wrench, 
  Sparkles,
  ArrowUpRight,
  Truck,
  Building2,
  Factory,
  Layers
} from "lucide-react";
import { Button } from "@/components/Forklift/ui/button";
import { useBookingContext } from "./BookingContext";

interface FieldStoriesProps {
  isLo: boolean;
}

export function FieldStoriesShowcase({ isLo }: FieldStoriesProps) {
  const { handleBookConsultation } = useBookingContext();

  const stories = [
    {
      id: "beerlao",
      categoryLo: "ວຽກດ່ວນ 24/7 | ສາງສິນຄ້າ & ໂລຈິສຕິກ",
      categoryEn: "24/7 Rapid Response | Logistics & FMCG",
      clientLo: "ໂຮງງານເບຍລາວ (Lao Brewery Co., Ltd.)",
      clientEn: "Lao Brewery Co., Ltd.",
      locationLo: "ນະຄອນຫຼວງວຽງຈັນ (Vientiane)",
      locationEn: "Vientiane Capital",
      titleLo: "ພາລະກິດສຸກເສີນ 2 ຊົ່ວໂມງ ຊ່ວງ High Season ປີໃໝ່ລາວ",
      titleEn: "2-Hour Turnaround During Peak New Year Logistics",
      problemLo: "ໃນຊ່ວງເທສະການປີໃໝ່ລາວ ຍອດຂົນສົ່ງສິນຄ້າເພີ່ມຂຶ້ນ 3 ເທົ່າ, ສາຍການຂົນສົ່ງແລ່ນ 24 ຊົ່ວໂມງ. ລົດຍົກ 3 ໂຕນຄັນຫຼັກເກີດບັນຫາແຮງດັນໄຮໂດຣລິກຕົກກະທັນຫັນຕອນ 19:30 ໂມງ.",
      problemEn: "Triple logistics volume during Lao New Year festival. A primary 3-ton forklift suffered an unexpected hydraulic pressure drop at 19:30 PM, threatening to halt the dispatch line.",
      actionLo: "ທີມຊ່າງ DKwick Mobile Service ເດີນທາງຮອດໜ້າງານພາຍໃນ 40 ນາທີ ພ້ອມລົດ Service Van, ຊຸດຊີລແທ້ ແລະ ເຄື່ອງມືທົດສອບແຮງດັນ. ທຳການປ່ຽນຊຸດຊີລ ແລະ ທົດສອບ Load Test ຈົນລົດກັບມາແລ່ນໄດ້ຕອນ 21:30 ໂມງ — ສາຍການຂົນສົ່ງບໍ່ສະດຸດ.",
      actionEn: "DKwick Mobile van arrived on-site in 40 minutes with genuine seal kits and high-pressure testers. Rebuilt cylinders and verified 100% load test by 21:30 PM — zero logistics downtime.",
      impactLo: "Zero Logistics Interruption — ຈັດສົ່ງສິນຄ້າທັນເວລາ 100%",
      impactEn: "Zero Logistics Interruption — 100% on-time delivery",
      image: "/images/solutions/aftersales-service-workshop-team.png",
      badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    },
    {
      id: "mining",
      categoryLo: "ວຽກໜັກບໍ່ແຮ່ | ພູສູງ & ທາງຊັນ",
      categoryEn: "Heavy-Duty Mining | Remote Mountain Site",
      clientLo: "ໂຄງການບໍ່ແຮ່ ພູເບ້ຍ & ເຊໂປນ (Phu Bia & Sepon)",
      clientEn: "Phu Bia Mining & Lane Xang Minerals",
      locationLo: "ແຂວງໄຊສົມບູນ & ສະຫວັນນະເຂດ",
      locationEn: "Xaisomboun & Savannakhet",
      titleLo: "ຈັດສົ່ງລົດ Diesel Heavy-Duty 7 ໂຕນ ຂຶ້ນພູສູງ ແລະ ຝຶກອົບຮົມໜ້າງານ 3 ມື້",
      titleEn: "Deploying 7-Ton Heavy Diesel Forklifts to Mountain Mines with 3-Day Training",
      problemLo: "ສະພາບເສັ້ນທາງດິນແດງຊັນໃນລະດູຝົນ ແລະ ມາດຕະຖານຄວາມປອດໄພຂອງບໍ່ແຮ່ລະດັບສາກົນທີ່ເຂັ້ມງວດທີ່ສຸດ (Zero Tolerance on Safety).",
      problemEn: "Steep muddy roads during monsoon season paired with rigorous international mine safety standards (Zero Tolerance on Safety).",
      actionLo: "DK LAO ຄວບຄຸມການຂົນສົ່ງເທິງລົດ Low-bed ພ້ອມສົ່ງທີມວິສະວະກອນອາວຸໂສຂຶ້ນໄປຢູ່ໜ້າງານ 3 ມື້ ເພື່ອ Commissioning, ປັບແຕ່ງລະບົບກອງອາກາດ Heavy-Duty ສຳລັບຝຸ່ນລະອຽດ, ແລະ ຝຶກອົບຮົມຄົນຂັບຂອງບໍ່ແຮ່ໃຫ້ໄດ້ໃບຢັ້ງຢືນ.",
      actionEn: "Delivered via low-bed convoy with senior engineers stationing on-site for 3 days to commission heavy cyclonic air filters and conduct certified steep-incline operator training.",
      impactLo: "100% Mine Safety Compliance — ຜ່ານມາດຕະຖານຄວາມປອດໄພບໍ່ແຮ່ສາກົນ",
      impactEn: "100% Mine Safety Compliance — zero incidents recorded",
      image: "/images/solutions/heavy-machinery-mining-spare-parts.jpg",
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    },
    {
      id: "food-cleanroom",
      categoryLo: "ອາຫານ & ຫ້ອງເຢັນ | ພະລັງງານສະອາດ",
      categoryEn: "Food & Cold-Chain | Zero Emission Cleanroom",
      clientLo: "ເຄືອໂຮງງານ CP Laos & Betagro (ສາງຄວບຄຸມອຸນຫະພູມ)",
      clientEn: "CP Laos & Betagro Cold-Chain Facilities",
      locationLo: "ເຂດອຸດສາຫະກຳນະຄອນຫຼວງວຽງຈັນ",
      locationEn: "Vientiane Industrial Zone",
      titleLo: "ການປ່ຽນຜ່ານສູ່ກອງລົດ Lithium-ion 100% ປາສະຈາກຄວັນພິດ ແລະ ກິ່ນນ້ຳມັນ",
      titleEn: "100% Lithium-Ion Clean Fleet Transition for Food-Grade Processing",
      problemLo: "ໂຮງງານອາຫານຕ້ອງການປາສະຈາກຄວັນພິດ ແລະ ກິ່ນນ້ຳມັນ 100% ຕາມມາດຕະຖານ GMP/HACCP ແຕ່ກັງວົນເລື່ອງອາຍຸແບັດເຕີຣີ ແລະ ການເຮັດວຽກຕໍ່ເນື່ອງ 3 ກະ.",
      problemEn: "Strict food safety regulations (GMP/HACCP) demanded zero exhaust and zero oil mist across a continuous 3-shift cold-chain packing operation.",
      actionLo: "DK LAO ວາງລະບົບ Opportunity Charging ດ້ວຍແບັດ Li-ion CATL ທີ່ສາກເຕັມໃນຊ່ວງພັກ 30 ນາທີ, ພ້ອມເລືອກລົດຍົກກັນນ້ຳ IP65 ສຳລັບຫ້ອງເຢັນ -20°C ແລະ ຕິດຕາມສະຖານະແບັດເຕີຣີຜ່ານ Telematics.",
      actionEn: "Architected an Opportunity Charging routine with CATL Li-ion cells charging during 30-min meal breaks, deployed IP65 cold-storage trucks rated for -20°C, and provided IoT telematics.",
      impactLo: "ຫຼຸດຄ່າພະລັງງານ 70% ແລະ ຜ່ານມາດຕະຖານ GMP/HACCP 100%",
      impactEn: "70% energy cost reduction + flawless GMP/HACCP audit",
      image: "/images/solutions/counterbalance-portfolio-efg.png",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{isLo ? "ເລື່ອງລາວຈາກໜ້າງານ & ຄວາມມຸ່ງໝັ້ນ" : "STORIES FROM THE FIELD: CRAFTSMANSHIP & CARE"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {isLo ? (
              <>
                ເລື່ອງລາວຈາກໜ້າງານ: <span className="text-blue-600 dark:text-blue-400">ຫົວໃຈນັກວິສະວະກອນ</span>
              </>
            ) : (
              <>
                Stories from the Field: <span className="text-blue-600 dark:text-blue-400">Dedicated Engineering Care</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {isLo
              ? "ເບື້ອງຫຼັງຄວາມສຳເລັດຂອງລູກຄ້າອຸດສາຫະກຳ ແລະ ໂລຈິສຕິກຊັ້ນນຳໃນ ສປປ ລາວ ຄືທີມງານວິສະວະກອນ ແລະ ນາຍຊ່າງ DK LAO ທີ່ພ້ອມລົງໜ້າງານຕົວຈິງ ດູແລເອົາໃຈໃສ່ດ້ວຍຄວາມຈິງໃຈ."
              : "Behind every seamless logistics operation in Lao PDR is our team of dedicated mechanics and engineers who show up on-site with craftsmanship and genuine commitment."}
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {stories.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-white dark:bg-slate-800/90 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image Banner */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={isLo ? item.titleLo : item.titleEn}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${item.badgeColor}`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    {isLo ? item.categoryLo : item.categoryEn}
                  </span>
                </div>

                {/* Location */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                  <span className="flex items-center gap-1 text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {isLo ? item.locationLo : item.locationEn}
                  </span>
                  <span className="text-slate-300 font-mono text-[11px] truncate max-w-[150px]">
                    {isLo ? item.clientLo : item.clientEn}
                  </span>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-snug">
                    {isLo ? item.titleLo : item.titleEn}
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <strong className="text-slate-900 dark:text-white block mb-1 font-semibold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-rose-500" />
                        {isLo ? "ສິ່ງທ້າທາຍໜ້າງານ:" : "On-Site Challenge:"}
                      </strong>
                      <p className="leading-relaxed">
                        {isLo ? item.problemLo : item.problemEn}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/30">
                      <strong className="text-blue-900 dark:text-blue-300 block mb-1 font-semibold flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        {isLo ? "ການແກ້ໄຂຂອງ DK LAO:" : "DK LAO Execution:"}
                      </strong>
                      <p className="leading-relaxed text-blue-950 dark:text-blue-200">
                        {isLo ? item.actionLo : item.actionEn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Impact Pill */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{isLo ? item.impactLo : item.impactEn}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lead Technician Pledge Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 border border-blue-900/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                <Award className="w-4 h-4 text-blue-400" />
                <span>{isLo ? "ຄຳໝັ້ນສັນຍາຈາກໃຈນາຍຊ່າງ DK LAO" : "ENGINEERING CRAFTSMANSHIP PLEDGE"}</span>
              </div>
              
              <blockquote className="text-lg sm:text-xl md:text-2xl font-semibold italic text-slate-100 leading-relaxed">
                {isLo
                  ? "“ທຸກໆຄັ້ງທີ່ພວກເຮົາຂັນນັອດ ຫຼື ກວດເຊັກລົດຍົກ, ພວກເຮົາຄິດສະເໝີວ່າ ຄວາມປອດໄພຂອງຄົນຂັບ ແລະ ຄວາມສຳເລັດຂອງທຸລະກິດລູກຄ້າແມ່ນຢູ່ໃນມືຂອງພວກເຮົາ. ພວກເຮົາບໍ່ເຄີຍປະນີປະນອມກັບຄຸນນະພາບ ແລະ ອາໄຫຼ່ແທ້.”"
                  : "“Every bolt we torque and every mast we inspect carries the safety of the operator and the trust of our client. We never compromise on factory standards or genuine spare parts.”"}
              </blockquote>

              <div className="flex items-center gap-3 pt-2 text-sm text-slate-400">
                <span className="font-bold text-white">
                  {isLo ? "ທີມວິສະວະກອນບໍລິການ DK LAO" : "DK LAO Service Engineering Team"}
                </span>
                <span>•</span>
                <span>{isLo ? "ສູນສ້ອມແປງກາງ ຖະໜົນກຳແພງເມືອງ (T4 Hub)" : "Khamphengmeuang T4 Central Workshop"}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Button
                onClick={() => handleBookConsultation(isLo ? "ປຶກສາວິສະວະກອນໜ້າງານ (Field Story)" : "Consult Engineering Support")}
                className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold py-6 px-8 text-base rounded-xl shadow-lg transition-all hover:scale-105"
              >
                {isLo ? "ນັດໝາຍວິສະວະກອນລົງໜ້າງານ" : "Schedule On-Site Consultation"}
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
