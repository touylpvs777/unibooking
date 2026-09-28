import React from "react";
import { motion } from "framer-motion";
import { KeySquare, TrendingDown, Clock, ShieldCheck, Wrench, RefreshCw, CheckCircle2, ShieldAlert, BookOpen, Percent, Handshake, Info, Award, Truck } from "lucide-react";
import { Button } from "@/components/Forklift/ui/button";
import { useBookingContext } from "./BookingContext";

export const ServiceRentalPillar = ({ isLo }: { isLo: boolean }) => {
  const { handleBookConsultation } = useBookingContext();

  const rentalTypes = [
    {
      id: "long-term",
      icon: TrendingDown,
      titleLo: "ເຊົ່າໄລຍະຍາວ (Long-term Operating Lease)",
      titleEn: "Long-term Operating Lease",
      descLo: "ສັນຍາ 1-5 ປີ ສຳລັບໂຮງງານ ແລະ ສາງສິນຄ້າທີ່ຕ້ອງການກອງລົດມາດຕະຖານ. ປ່ຽນຄ່າໃຊ້ຈ່າຍຈາກ CAPEX ມາເປັນ OPEX ສາມາດຫັກອາກອນລາຍຈ່າຍໄດ້ 100%.",
      descEn: "1-5 year operating leases for manufacturing and logistics hubs. Convert capital expenditure to OPEX with 100% corporate tax deductibility.",
      featuresLo: ["Zero CAPEX (ບໍ່ຕ້ອງຈົມເງິນກ້ອນໃຫຍ່)", "ຄຸ້ມຄອງຄ່າບຳລຸງຮັກສາ ແລະ ອາໄຫຼ່ແທ້ຟຣີ 100%", "ຟຣີ ປະກັນໄພຕົວລົດ ແລະ ອຸບັດຕິເຫດ", "ມີລົດສຳຮອງປ່ຽນແທນເວລາເປ່ເພ (Zero Downtime)"]
    },
    {
      id: "short-term",
      icon: Clock,
      titleLo: "ເຊົ່າໄລຍະສັ້ນ (Short-term Project Rental)",
      titleEn: "Short-term Project Rental",
      descLo: "ສຳລັບວຽກໂຄງການພິເສດ, ຊ່ວງ High Season, ຫຼື ຕູ້ຄອນເທນເນີເຂົ້າຫຼາຍ. ຄວບຄຸມຕົ້ນທຶນໄດ້ແນ່ນອນ ລົດພ້ອມລົງໜ້າງານທັນທີ.",
      descEn: "Flexible rental terms for seasonal peaks, infrastructure projects, and overflow handling with rapid deployment.",
      featuresLo: ["ໄລຍະເວລາຢືດຢຸ່ນ (ລາຍວັນ, ລາຍອາທິດ, ລາຍເດືອນ)", "ລົດຜ່ານການກວດເຊັກຄວາມປອດໄພ 24 ຈຸດກ່ອນຈັດສົ່ງ", "ບໍລິການພ້ອມພະນັກງານຂັບຂີ່ມືອາຊີບ (ຖ້າຕ້ອງການ)"]
    }
  ];

  return (
    <div className="py-16 bg-white dark:bg-slate-900 transition-colors border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-semibold mb-4"
          >
            <KeySquare className="w-5 h-5" />
            <span>{isLo ? "2. RENTAL | ການເຊົ່າລົດຍົກລະດັບອົງກອນ & ບໍລິຫານກອງລົດ" : "2. ENTERPRISE FLEET LEASING & RENTAL"}</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            {isLo ? "ເຊົ່າລົດຍົກແບບ Zero CAPEX & ຄວາມອຸ່ນໃຈສູງສຸດ" : "Zero CAPEX Fleet Leasing Solutions"}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {isLo 
              ? "ຕອບໂຈດຜູ້ບໍລິຫານ (CFO & Operation Directors) ທີ່ຕ້ອງການຄວບຄຸມຕົ້ນທຶນການດຳເນີນງານຢ່າງຊັດເຈນ. ຕັດຄວາມກັງວົນເລື່ອງລົດເພ, ຄ່າອາໄຫຼ່ແພງ ແລະ ບັນຫາຊ່າງ." 
              : "Tailored for CFOs and Operations Directors seeking predictable operating costs, guaranteed vehicle uptime, and zero maintenance headaches."}
          </p>
        </div>

        {/* FLEET PEACE-OF-MIND BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden border border-indigo-700/40"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold mb-6 tracking-wide backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {isLo ? "ຄວາມສະບາຍໃຈຂອງຜູ້ບໍລິຫານ (EXECUTIVE PEACE-OF-MIND)" : "EXECUTIVE PEACE-OF-MIND GUARANTEE"}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-1 lg:col-span-2">
                <h3 className="text-2xl lg:text-4xl font-black mb-4 tracking-tight">
                  {isLo ? "ແພັກເກັດການເຊົ່າລວມທຸກຢ່າງ (All-Inclusive Fleet Lease)" : "All-Inclusive Fleet Rental Solution"}
                </h3>
                <p className="text-indigo-200 text-base lg:text-lg mb-6 max-w-2xl leading-relaxed">
                  {isLo 
                    ? "ຈ່າຍຄ່າເຊົ່າລາຍເດືອນຄົງທີ່ ບໍລິສັດຂອງທ່ານຈະໄດ້ຮັບການດູແລຄົບທຸກຢ່າງ ໂດຍບໍ່ມີຄ່າໃຊ້ຈ່າຍແອບແຝງແມ້ແຕ່ກີບດຽວ." 
                    : "A fixed, predictable monthly fee that covers all servicing, genuine wear-and-tear components, and replacement trucks."}
                </p>
                <ul className="space-y-4 mb-4">
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "Zero Maintenance Liability: " : "Zero Maintenance Liability: "}</strong>
                      {isLo ? "ຟຣີ ຄ່າແຮງຊ່າງ, ຄ່ານ້ຳມັນເຄື່ອງ, ນ້ຳມັນໄຮໂດຣລິກ ແລະ ອາໄຫຼ່ສິ້ນເປືອງທຸກຊິ້ນຕະຫຼອດສັນຍາ" : "Free labor, oils, hydraulic fluids, and wear parts throughout the entire lease."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "Standby Replacement Unit: " : "Standby Replacement Guarantee: "}</strong>
                      {isLo ? "ຫາກລົດມີບັນຫາຕ້ອງສ້ອມແປງເກີນ 4 ຊົ່ວໂມງ, DK LAO ຈັດສົ່ງລົດສຳຮອງໄປປ່ຽນທັນທີ" : "If repairs exceed 4 hours, a backup forklift is deployed immediately to eliminate downtime."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "Tax-Deductible OPEX: " : "Tax-Deductible OPEX: "}</strong>
                      {isLo ? "ຄ່າເຊົ່າສາມາດນຳໄປຫັກເປັນລາຍຈ່າຍບໍລິສັດໄດ້ 100% ຕາມກົດໝາຍສ່ວຍສາອາກອນ ສປປ ລາວ" : "100% corporate tax deductible under Lao PDR revenue regulations."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "Fleet Telematics & PM Report: " : "Fleet Telematics & PM Reports: "}</strong>
                      {isLo ? "ລາຍງານປະຫວັດການບຳລຸງຮັກສາ ແລະ ຊົ່ວໂມງແລ່ນແບບໂປ່ງໃສທຸກເດືອນ" : "Transparent monthly hour meter logs and certified maintenance records."}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center gap-4 bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
                <h4 className="font-bold text-xl mb-1 text-center text-indigo-300">
                  {isLo ? "ລົດສຳຮອງປະຈຳໜ້າງານ" : "Dedicated Standby"}
                </h4>
                <div className="flex items-start gap-3 text-sm text-indigo-100 leading-relaxed">
                  <RefreshCw className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
                  <span>
                    {isLo 
                      ? "ສຳລັບລູກຄ້າ Fleet ຂະໜາດໃຫຍ່, DK LAO ສະແຕນບາຍ (Standby) ລົດສຳຮອງໄວ້ໃນສາງຂອງທ່ານເລີຍ ເພື່ອຮັບປະກັນວຽກບໍ່ມີມື້ສະດຸດ." 
                      : "For enterprise fleets, we position dedicated backup units directly inside your distribution facility."}
                  </span>
                </div>
                <Button 
                  onClick={() => handleBookConsultation(isLo ? "ປຶກສາແພັກເກັດເຊົ່າລົດຍົກ (Rental Fleet)" : "Consult Fleet Rental Options")}
                  className="w-full mt-4 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold py-6 text-base lg:text-lg rounded-xl shadow-lg transition-all hover:scale-[1.02]"
                >
                  {isLo ? "ປຶກສາແພັກເກັດເຊົ່າລົດຍົກ" : "Consult Fleet Rental Options"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Know-How Section */}
        <div className="mb-16 bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-indigo-500" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {isLo ? "ຄຳແນະນຳດ້ານການເງິນ: ການຊື້ (CAPEX) vs ການເຊົ່າ (OPEX)" : "Financial Advisory: Purchasing (CAPEX) vs Leasing (OPEX)"}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700 dark:text-slate-300">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border-l-4 border-red-500">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2"><TrendingDown className="w-5 h-5 text-red-500"/>ການຊື້ (CAPEX)</h4>
              <p className="text-sm leading-relaxed">
                {isLo ? "ເວລາຊື້ລົດ ຕົ້ນທຶນແອບແຝງ (Hidden Costs) ທີ່ຄົນມັກລືມຄິດຄື: ຄ່າຈ້າງຊ່າງ, ຄ່າອາໄຫຼ່, ຄ່າລົດຍົກເສຍເວລາລໍຖ້າສ້ອມແປງ (Downtime cost) ເຊິ່ງອາດສູງເຖິງ 30% ຂອງລາຄາລົດໃນ 5 ປີ." : "Buying incurs hidden costs: mechanic payroll, spare parts, and downtime costs which can equal 30% of the forklift's value over 5 years."}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2"><Handshake className="w-5 h-5 text-green-500"/>ການເຊົ່າ (OPEX)</h4>
              <p className="text-sm leading-relaxed">
                {isLo ? "ຄ່າເຊົ່າທີ່ຈ່າຍລວມທຸກຢ່າງແລ້ວ (All-Inclusive). ບໍລິສັດສາມາດເອົາເງິນກ້ອນໄປລົງທຶນຂະຫຍາຍທຸລະກິດຫຼັກ (Core Business) ແທນທີ່ຈະເອົາມາຈົມກັບຊັບສິນທີ່ເສື່ອມລາຄາທຸກປີ." : "Rental is all-inclusive. Free up your working capital to invest in your core business instead of depreciating assets."}
              </p>
            </div>
          </div>
        </div>

        {/* Rental Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {rentalTypes.map((type, idx) => {
            const Icon = type.icon;
            return (
              <motion.div 
                key={type.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-600/20">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {isLo ? type.titleLo : type.titleEn}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 min-h-[90px]">
                  {isLo ? type.descLo : type.descEn}
                </p>
                <ul className="space-y-3">
                  {type.featuresLo.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Legal Binding SLA */}
        <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 lg:p-12 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="text-center mb-10 relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <ShieldAlert className="w-8 h-8 text-indigo-400" />
              {isLo ? "ສັນຍາຄຸ້ມຄອງຜູກມັດທາງກົດໝາຍ (Legal Binding SLA)" : "Legal Binding SLA Guarantee"}
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {isLo 
                ? "ເອກະສານສັນຍາ B2B ທີ່ຊັດເຈນ (Place & Product Strategy) ຮັບປະກັນວ່າຖ້າລົດເປ່ເພເກີນ 4 ຊົ່ວໂມງ ພວກເຮົາຈະສົ່ງລົດຄັນໃໝ່ໄປປ່ຽນໃຫ້ທັນທີ ເພື່ອບໍ່ໃຫ້ວຽກຂອງທ່ານສະດຸດ." 
                : "Clear B2B SLAs guarantee that if a breakdown exceeds 4 hours, a replacement unit is deployed immediately."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {[
              { title: "2 Hours", descLo: "ເວລາຕອບສະໜອງຂອງຊ່າງ (Response Time)", descEn: "Mechanic Response Time", icon: Clock },
              { title: "Zero", descLo: "ຄ່າໃຊ້ຈ່າຍອາໄຫຼ່ ແລະ ຄ່າແຮງງານສ້ອມແປງ", descEn: "Cost for Parts & Labor", icon: Wrench },
              { title: "100%", descLo: "ມີລົດປ່ຽນແທນໃນກໍລະນີສ້ອມແປງໜັກ", descEn: "Replacement Unit for heavy repairs", icon: RefreshCw },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 text-center">
                  <div className="w-12 h-12 bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-400 mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-black text-white mb-2">{item.title}</div>
                  <div className="text-sm text-slate-400">{isLo ? item.descLo : item.descEn}</div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
