import React from "react";
import { motion } from "framer-motion";
import { Layers, Warehouse, MonitorCog, ShieldCheck, CheckCircle2, ChevronRight, Settings, Target, Maximize, TrendingUp, HandCoins } from "lucide-react";
import { Button } from "@/components/Forklift/ui/button";
import { useBookingContext } from "./BookingContext";
import { ECOSYSTEM_PILLARS } from "@/data/servicesData";

export const ServiceEcosystem = ({ isLo }: { isLo: boolean }) => {
  const { handleBookConsultation } = useBookingContext();

  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-900 transition-colors border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-400 font-semibold mb-4"
          >
            <Layers className="w-5 h-5" />
            <span>{isLo ? "5. ECOSYSTEM | ການອອກແບບລະບົບສາງ & ການຈັດການວັດສະດຸຄົບວົງຈອນ" : "5. WAREHOUSE SYSTEMS DESIGN & INTRALOGISTICS"}</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            {isLo ? "ທີ່ປຶກສາລະບົບສາງ ແລະ ການຈັດການວັດສະດຸຄົບວົງຈອນ" : "End-to-End Intralogistics & Warehouse Systems"}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {isLo 
              ? "ພວກເຮົາບໍ່ພຽງແຕ່ຂາຍລົດຍົກ, ແຕ່ເຮົາຊ່ວຍອອກແບບ ແລະ ເຊື່ອມໂຍງອົງປະກອບທັງໝົດໃນສາງ: ລົດຍົກ, ຊັ້ນວາງສິນຄ້າ (Racking), ເຄື່ອງອະນາໄມອຸດສາຫະກຳ, ແລະ ຄວາມປອດໄພ ISO 45001." 
              : "Connecting every element of your supply chain: material handling forklifts, engineered racking systems, industrial cleaning equipment, and ISO 45001 safety compliance."}
          </p>
        </div>

        {/* COLLABORATIVE WAREHOUSE ENGINEERING BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden border border-emerald-700/40"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold mb-6 tracking-wide backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {isLo ? "ການຮ່ວມມືອອກແບບສາງສິນຄ້າ (COLLABORATIVE WAREHOUSE ENGINEERING)" : "COLLABORATIVE WAREHOUSE ENGINEERING"}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-1 lg:col-span-2">
                <h3 className="text-2xl lg:text-4xl font-black mb-4 tracking-tight">
                  {isLo ? "ວິສະວະກຳສາງສິນຄ້າຄົບວົງຈອນ: ຈາກ 3D Layout ຈົນເຖິງຕິດຕັ້ງ" : "Comprehensive Warehouse Turnkey Engineering"}
                </h3>
                <p className="text-emerald-100 text-base lg:text-lg mb-6 max-w-2xl leading-relaxed">
                  {isLo 
                    ? "ທີມວິສະວະກອນ DK LAO ພ້ອມລົງໜ້າງານວັດແທກພື້ນທີ່ ແລະ ອອກແບບແຜນຜັງສາງ 3D AutoCAD ໃຫ້ຟຣີ ເພື່ອໃຫ້ລົດຍົກ, ຊັ້ນວາງ Racking, ແລະ ເສັ້ນທາງຂົນສົ່ງເຮັດວຽກປະສານກັນຢ່າງສົມບູນ." 
                    : "Complimentary on-site surveys and 3D AutoCAD simulations by DK LAO engineers to optimize your aisle widths, racking heights, and traffic flows."}
                </p>
                <ul className="space-y-4 mb-4">
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "ຟຣີ ສຳຫຼວດ ແລະ ອອກແບບ 3D CAD: " : "Complimentary 3D CAD Design: "}</strong>
                      {isLo ? "ວັດແທກຄວາມກວ້າງທາງແລ່ນ, ຈຸດລ້ຽວ, ຄວາມສູງເພດານ, ແລະ ຈຸດຮັບນ້ຳໜັກພື້ນຄົບຖ້ວນ" : "Full measurement of aisle turning radii, ceiling clearance, and floor load capacities."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "ລະບົບຊັ້ນວາງ Racking ມາດຕະຖານສາກົນ: " : "Engineered Heavy-Duty Racking: "}</strong>
                      {isLo ? "Selective, Drive-In, VNA, Cantilever ແລະ Double Deep ຕິດຕັ້ງໂດຍຊ່າງຊ່ຽວຊານ" : "Selective, Drive-in, VNA, and Cantilever racking systems installed to international standards."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "Turnkey Solutions ຄົບວົງຈອນ: " : "Integrated Turnkey Fleet: "}</strong>
                      {isLo ? "ລົດຍົກ Mitsubishi/Jungheinrich + ຊັ້ນວາງ + ລົດກະເຊົ້າ JLG + ເຄື່ອງຂັດພື້ນ Nilfisk" : "Forklifts + Racking + JLG MEWPs + Nilfisk Industrial Floor Scrubbers."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "ມາດຕະຖານຄວາມປອດໄພ ISO 45001: " : "ISO 45001 Safety Standards: "}</strong>
                      {isLo ? "ຕິດຕັ້ງ Column Protectors ກັນຕຳ, ປ້າຍບອກນ້ຳໜັກ Load Signs ແລະ ລະບົບໄຟສັນຍານ" : "Installation of column guard protectors, certified load signs, and pedestrian warning beacons."}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center gap-4 bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
                <h4 className="font-bold text-xl mb-1 text-center text-emerald-300">
                  {isLo ? "ສຳຫຼວດໜ້າງານຟຣີ" : "Complimentary Site Audit"}
                </h4>
                <div className="flex items-start gap-3 text-sm text-emerald-100 leading-relaxed">
                  <Target className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <span>
                    {isLo 
                      ? "ວິສະວະກອນ DK LAO ພ້ອມລົງໜ້າງານວັດແທກພື້ນທີ່ຈິງ ແລະ ສົ່ງແບບ 3D Simulation ພາຍໃນ 3-5 ວັນລັດຖະການ ໂດຍບໍ່ມີຄ່າໃຊ້ຈ່າຍ." 
                      : "Our in-house engineers will conduct on-site laser measurements and produce a 3D layout simulation within 3-5 business days."}
                  </span>
                </div>
                <Button 
                  onClick={() => handleBookConsultation(isLo ? "ນັດໝາຍວິສະວະກອນລົງສຳຫຼວດສາງ (Warehouse Audit)" : "Schedule On-site Warehouse Audit")}
                  className="w-full mt-4 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold py-6 text-base lg:text-lg rounded-xl shadow-lg transition-all hover:scale-[1.02]"
                >
                  {isLo ? "ນັດໝາຍວິສະວະກອນລົງສຳຫຼວດສາງ" : "Schedule On-site Warehouse Audit"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Know-How Section */}
        <div className="mb-16 bg-white dark:bg-slate-800/80 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Maximize className="w-8 h-8 text-teal-600 dark:text-teal-400" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {isLo ? "ຫຼັກການວິສະວະກຳສາງ: ການເພີ່ມພື້ນທີ່ ແລະ ຈຸດກຸ້ມທຶນ" : "Warehouse Engineering Principles: Density & ROI Optimization"}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700 dark:text-slate-300">
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                  {isLo ? "ການອອກແບບຜັງສາງແບບ VNA (Very Narrow Aisle)" : "VNA Layout Optimization"}
                </h4>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {isLo 
                  ? "ປ່ຽນຈາກຊັ້ນວາງພື້ນແບບດັ້ງເດີມ ມາເປັນຊັ້ນວາງລະບົບ VNA ຄູ່ກັບລົດ Reach Truck ວົງລ້ຽວແຄບ ຊ່ວຍເພີ່ມຄວາມຈຸຈັດເກັບສິນຄ້າໄດ້ເຖິງ 30-50% ໃນເນື້ອທີ່ເກົ່າ ໂດຍບໍ່ຕ້ອງເສຍເງິນຊື້ທີ່ດິນໃໝ່." 
                  : "Transitioning to VNA racking and narrow-aisle Reach Trucks increases storage density by 30-50% within the exact same building footprint."}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">
                  <HandCoins className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                  {isLo ? "ການວິເຄາະຈຸດກຸ້ມທຶນ (ROI Payback Analysis)" : "ROI Payback Analysis"}
                </h4>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {isLo 
                  ? "ການລົງທຶນປັບປຸງ Layout ແລະ ເລືອກລົດຍົກທີ່ກົງກັບວຽກ ຊ່ວຍຫຼຸດເວລາໃນການຂົນຍ້າຍສິນຄ້າ ແລະ ຫຼຸດຄວາມເສຍຫາຍຂອງສິນຄ້າ. ຈຸດກຸ້ມທຶນສະເລ່ຍພຽງ 1-2 ປີ ຈາກຕົ້ນທຶນການດຳເນີນງານທີ່ຫຼຸດລົງ." 
                  : "Optimizing layout and equipment match reduces internal cycle times and product damage, typically yielding full capital payback within 1-2 years."}
              </p>
            </div>
          </div>
        </div>

        {/* ECOSYSTEM PILLARS LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ECOSYSTEM_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 hover:border-fuchsia-500 dark:hover:border-fuchsia-500 hover:shadow-xl hover:-translate-y-2 transition-all group"
              >
                <div className="w-16 h-16 bg-fuchsia-100 dark:bg-fuchsia-900/30 rounded-2xl flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400 mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {isLo ? pillar.titleLo : pillar.titleEn}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 flex-grow">
                  {isLo ? pillar.descLo : pillar.descEn}
                </p>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {pillar.highlightsLo.map((highlight, i) => (
                      <span key={i} className="text-xs font-semibold bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-md">
                        {isLo ? highlight : pillar.highlightsEn[i]}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  );
};
