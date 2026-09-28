import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, Settings, Truck, ShieldCheck, CheckCircle2, ChevronRight, Check, MapPin, Gauge, Info, Settings2, ListTodo, CircleAlert, FileCheck2, Zap, BatteryCharging, Percent } from "lucide-react";
import { Button } from "@/components/Forklift/ui/button";
import { useBookingContext } from "./BookingContext";
import { PM_PACKAGES } from "@/data/servicesData";

export const ServicePMPillar = ({ isLo }: { isLo: boolean }) => {
  const { 
    selectedForkliftType, setSelectedForkliftType,
    selectedHoursIndex, setSelectedHoursIndex,
    pmViewMode, setPmViewMode,
    handleBookPackage,
    handleBookConsultation
  } = useBookingContext();

  const activePackage = PM_PACKAGES[selectedForkliftType][selectedHoursIndex];
  const packageName = isLo ? activePackage.nameLo : activePackage.nameEn;
  const packageDesc = isLo ? activePackage.descriptionLo : activePackage.descriptionEn;
  const packageDuration = isLo ? activePackage.durationLo : activePackage.durationEn;
  const packageParts = isLo ? activePackage.partsReplacedLo : activePackage.partsReplacedEn;
  const packageFluids = isLo ? activePackage.fluidReplacedLo : activePackage.fluidReplacedEn;
  const packageInspections = isLo ? activePackage.inspectionsLo : activePackage.inspectionsEn;

  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 font-semibold mb-4"
          >
            <FileCheck2 className="w-5 h-5" />
            <span>{isLo ? "3. SERVICE & PM | ມາດຕະຖານງານສ້ອມບຳລຸງ & ການດູແລເອົາໃຈໃສ່" : "3. TECHNICAL SERVICE & PREVENTIVE CRAFTSMANSHIP"}</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            {isLo ? "ມາດຕະຖານສູນບໍລິການ (Service Quality ISO 9001)" : "Enterprise Grade Service Standards"}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {isLo 
              ? "ພວກເຮົາບໍ່ພຽງແຕ່ປ່ຽນຖ່າຍນ້ຳມັນ, ແຕ່ທຸກໆຄັ້ງທີ່ລົງໜ້າງານ ທີມງານຊ່າງ DK LAO ຈະກວດສອບຄວາມປອດໄພຢ່າງລະອຽດ ເພື່ອປ້ອງກັນອຸບັດຕິເຫດ ແລະ ຢຸດບັນຫາລົດເພກ່ອນທີ່ຈະເກີດຂຶ້ນ." 
              : "Beyond routine oil changes, every DK LAO technician conducts a comprehensive safety audit to prevent component failure and ensure zero operational downtime."}
          </p>
        </div>

        {/* SERVICE EXCELLENCE BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-gradient-to-r from-rose-900 via-slate-900 to-rose-950 rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden border border-rose-700/40"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 text-xs font-bold mb-6 tracking-wide backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {isLo ? "ມາດຕະຖານງານສ້ອມບຳລຸງລະດັບສູນ (CERTIFIED SERVICE EXCELLENCE)" : "CERTIFIED SERVICE EXCELLENCE COMMITMENT"}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-1 lg:col-span-2">
                <h3 className="text-2xl lg:text-4xl font-black mb-4 tracking-tight">
                  {isLo ? "ຄຳໝັ້ນສັນຍາດ້ານຄຸນນະພາບງານບໍລິການ (Service Quality Guarantee)" : "Engineering Service Quality Guarantee"}
                </h3>
                <p className="text-rose-100 text-base lg:text-lg mb-6 max-w-2xl leading-relaxed">
                  {isLo 
                    ? "ທຸກຂັ້ນຕອນການສ້ອມແປງມີໃບກວດເຊັກມາດຕະຖານ, ອາໄຫຼ່ແທ້ຖືກຕ້ອງຕາມສະເປັກ, ແລະ ຜ່ານການກວດສອບຄ່າແຮງຂັນ Torque 100%." 
                    : "Every overhaul procedure adheres to rigid factory inspection checklists, calibrated torque ratings, and zero counterfeit tolerances."}
                </p>
                <ul className="space-y-4 mb-4">
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "ໃບກວດເຊັກລະອຽດ 24-30 ຈຸດ: " : "Certified 24-30 Point Audit: "}</strong>
                      {isLo ? "ກວດເຊັກລະບົບໄຮໂດຣລິກ, ໂສ້ຍົກ, ເບຣກ, ລະບົບໄຟ ແລະ ຄວາມປອດໄພ ພ້ອມລາຍເຊັນນາຍຊ່າງ" : "Comprehensive mechanical, hydraulic, brake, and safety audits signed off by lead mechanics."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "ອາໄຫຼ່ແທ້ 100% Zero Fake: " : "100% Genuine OEM Spares: "}</strong>
                      {isLo ? "ບໍ່ໃຊ້ອາໄຫຼ່ທຽມເດັດຂາດ. ຮັບປະກັນງານສ້ອມແປງ ແລະ ອາໄຫຼ່ໃໝ່ 6 - 12 ເດືອນ" : "Strict zero counterfeit policy. 6 to 12 months warranty on all replacement parts and overhaul labor."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "ໜ່ວຍເຄື່ອນທີ່ DKwick Mobile: " : "DKwick Rapid Mobile Units: "}</strong>
                      {isLo ? "ລົດ Service Van ພ້ອມນາຍຊ່າງລົງໜ້າງານດ່ວນພາຍໃນ 2-4 ຊົ່ວໂມງ ໃນເຂດນະຄອນຫຼວງວຽງຈັນ" : "Fully-equipped mobile service vans deployed on-site within 2-4 hours across Vientiane."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "ພິເສດສຳລັບລູກຄ້າໃໝ່: " : "First Service Welcome Offer: "}</strong>
                      {isLo ? "ຮັບສ່ວນຫຼຸດ 50% ຄ່າແຮງງານ ສຳລັບການເຮັດ PM ຮອບທຳອິດ ເພື່ອທົດລອງມາດຕະຖານສູນແທ້" : "50% off labor on your first scheduled PM service to experience factory-certified quality."}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center gap-4 bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
                <h4 className="font-bold text-xl mb-1 text-center text-rose-200">
                  {isLo ? "ໜ່ວຍບໍລິການເຄື່ອນທີ່ DKwick" : "DKwick Mobile Team"}
                </h4>
                <div className="flex items-start gap-3 text-sm text-rose-100 leading-relaxed">
                  <Truck className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />
                  <span>
                    {isLo 
                      ? "ລົດ Service Van ພ້ອມເຄື່ອງມືວິເຄາະບັນຫາ, ປ້ຳອັດຈາຣະບີແຮງດັນສູງ, ແລະ ຊຸດອາໄຫຼ່ສຸກເສີນ ພ້ອມອອກໜ້າງານທັນທີ." 
                      : "Mobile vans equipped with hydraulic diagnostic tools, high-pressure greasing systems, and emergency spares."}
                  </span>
                </div>
                <Button 
                  onClick={() => handleBookConsultation(isLo ? "ນັດໝາຍທີມຊ່າງລົງກວດເຊັກໜ້າງານ (PM Service)" : "Schedule On-site Service Inspection")}
                  className="w-full mt-4 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold py-6 text-base lg:text-lg rounded-xl shadow-lg transition-all hover:scale-[1.02]"
                >
                  {isLo ? "ນັດໝາຍທີມຊ່າງລົງກວດເຊັກໜ້າງານ" : "Schedule On-site Service Call"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Know-How Section */}
        <div className="mb-16 bg-white dark:bg-slate-800/80 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-rose-500" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {isLo ? "ຄຳແນະນຳຈາກຫົວໜ້າຊ່າງ: ເທັກນິກການຍືດອາຍຸລົດຍົກ ໃຫ້ໃຊ້ງານໄດ້ຍາວນານເກີນ 10 ປີ" : "Chief Technician Advisory: Extending Forklift Lifespan Over 10 Years"}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700 dark:text-slate-300">
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl shadow-sm border-l-4 border-amber-500">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2"><BatteryCharging className="w-5 h-5 text-amber-500"/>ການດູແລແບັດເຕີຣີ (Battery Care)</h4>
              <p className="text-sm leading-relaxed">
                {isLo ? "ສຳລັບລົດໄຟຟ້າ, ແບັດເຕີຣີຄືຫົວໃຈ. ບໍ່ຄວນປ່ອຍໃຫ້ແບັດເຕີຣີເຫຼືອຕ່ຳກວ່າ 20% ແລ້ວຈຶ່ງສາກ (Deep Discharge) ເພາະຈະເຮັດໃຫ້ເຊລແບັດເສື່ອມໄວ. ຖ້າເປັນ Lead-Acid ຕ້ອງໝັ່ນເຕີມນ້ຳກັ່ນທຸກອາທິດ, ຖ້າເປັນ Li-ion ສາມາດສາກທຸກຄັ້ງທີ່ວ່າງ (Opportunity Charging)." : "Never let battery drop below 20% (Deep Discharge). For Li-ion, use Opportunity Charging during breaks to extend cell life."}
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2"><Settings className="w-5 h-5 text-blue-500"/>ການປ່ຽນນ້ຳມັນໄຮໂດຣລິກ (Hydraulic Fluid)</h4>
              <p className="text-sm leading-relaxed">
                {isLo ? "ນ້ຳມັນໄຮໂດຣລິກທີ່ເຊື່ອມສະພາບຈະເຮັດໃຫ້ກະບອກຍົກ (Cylinder) ແລະ ຊີນ (Seal) ຂາດໄວ ອາດພາໃຫ້ເກີດອຸບັດຕິເຫດສິນຄ້າຕົກລົ່ນ. ຄວນປ່ຽນຖ່າຍທຸກໆ 1,200 ຊົ່ວໂມງ ຫຼື ຕາມຄຳແນະນຳຂອງນາຍຊ່າງຢ່າງເຄັ່ງຄັດ." : "Degraded hydraulic fluid causes seal failure and dropped loads. Always replace every 1,200 hours to ensure maximum lifting capacity and safety."}
              </p>
            </div>
          </div>
        </div>

        {/* PM Calculator UI */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
          
          <div className="bg-slate-100 dark:bg-slate-800 p-6 lg:p-8 flex flex-col md:flex-row gap-6 items-center justify-between border-b border-slate-200 dark:border-slate-700">
            <div className="flex gap-2 p-1.5 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setSelectedForkliftType("diesel")}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${selectedForkliftType === "diesel" ? "bg-slate-900 dark:bg-rose-600 text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
              >
                {isLo ? "Diesel / LPG" : "Diesel / IC"}
              </button>
              <button
                onClick={() => setSelectedForkliftType("electric")}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${selectedForkliftType === "electric" ? "bg-slate-900 dark:bg-cyan-600 text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
              >
                {isLo ? "Electric / EV" : "Electric / EV"}
              </button>
            </div>
          </div>

          <div className="p-6 lg:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {PM_PACKAGES[selectedForkliftType].map((pkg, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedHoursIndex(idx)}
                  className={`relative p-6 rounded-2xl text-left border-2 transition-all ${
                    selectedHoursIndex === idx 
                      ? "border-rose-600 bg-rose-50/50 dark:border-rose-500 dark:bg-rose-900/20 shadow-lg"
                      : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  {selectedHoursIndex === idx && (
                    <div className="absolute top-4 right-4 text-rose-600 dark:text-rose-400">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  )}
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{pkg.label}</h4>
                  <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 line-clamp-1">{isLo ? pkg.nameLo : pkg.nameEn}</div>
                </button>
              ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 lg:p-8 border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col lg:flex-row gap-8 justify-between items-start mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold mb-3 uppercase tracking-wider">
                    {isLo ? activePackage.badgeLo : activePackage.badgeEn}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{packageName}</h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">{packageDesc}</p>
                </div>
                <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
                    <Gauge className="w-5 h-5 text-rose-600" />
                    <span>{isLo ? "ເວລາປະມານ:" : "Estimated Time:"} {packageDuration}</span>
                  </div>
                  <Button 
                    onClick={() => handleBookPackage(selectedHoursIndex, activePackage.nameLo, activePackage.nameEn, activePackage.label, isLo)}
                    className="w-full lg:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold py-6 px-8 rounded-xl shadow-lg shadow-rose-600/20"
                  >
                    {isLo ? "ນັດໝາຍສູນບໍລິການເລີຍ" : "Book This Service Now"}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-blue-500" />
                    {isLo ? "ອາໄຫຼ່ທີ່ປ່ຽນໃໝ່" : "Parts Replaced"}
                  </h4>
                  <ul className="space-y-3">
                    {packageParts.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <ListTodo className="w-5 h-5 text-amber-500" />
                    {isLo ? "ຈຸດກວດເຊັກສຳຄັນ (ISO)" : "Key Inspections (ISO)"}
                  </h4>
                  <ul className="space-y-3">
                    {packageInspections.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-rose-50 dark:bg-rose-950/50 p-6 rounded-xl border border-rose-100 dark:border-rose-900">
                  <h4 className="text-rose-900 dark:text-rose-100 font-bold text-lg mb-4 flex items-center gap-2">
                    <CircleAlert className="w-5 h-5 text-rose-500" />
                    {isLo ? "ນ້ຳມັນທີ່ໃຊ້ (ISO)" : "Fluids Used (ISO)"}
                  </h4>
                  <ul className="space-y-3">
                    {packageFluids.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-rose-800 dark:text-rose-300">
                        <Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
