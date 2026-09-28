import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, ShieldCheck, RefreshCw, BatteryCharging, Factory, ArrowRight, CheckCircle2, ShieldAlert, Award, Lightbulb, MapPin } from "lucide-react";
import { Button } from "@/components/Forklift/ui/button";
import { useBookingContext } from "./BookingContext";
import { TCOCalculator } from "./TCOCalculator";
import { useInternalMode } from "@/components/internal/InternalModeContext";

export const ServiceSalePillar = ({ isLo }: { isLo: boolean }) => {
  const { handleBookConsultation } = useBookingContext();
  const { isInternal } = useInternalMode();

  const categories = [
    {
      id: "ev",
      icon: BatteryCharging,
      titleLo: "ລົດຍົກໄຟຟ້າ (Li-ion EV)",
      titleEn: "Lithium-ion EV Forklifts",
      descLo: "ປະຢັດພະລັງງານສູງສຸດ, ບໍ່ມີຄວັນພິດ ແລະ ສຽງງຽບ. ເໝາະສຳລັບໂຮງງານອາຫານ (F&B), ຢາປິ່ນປົວພະຍາດ ແລະ ສາງໃນຮົ່ມ. ໄດ້ມາດຕະຖານຄວາມປອດໄພ ISO 45001.",
      descEn: "Maximum energy efficiency, zero emissions, and silent operation. Ideal for F&B factories, cleanrooms, and indoor warehouses. ISO 45001 certified.",
      featuresLo: ["ຮັບນ້ຳໜັກ 1.5 - 5 ໂຕນ", "ລະບົບ Operator Presence System (OPS)", "ແບັດ Li-ion ອາຍຸການໃຊ້ງານ 10 ປີ+", "ກັນນ້ຳ IP65 ມາດຕະຖານສາກົນ"],
      internalData: { margin: "25%", stock: 12, cost: "$18,500" }
    },
    {
      id: "diesel",
      icon: Factory,
      titleLo: "ລົດຍົກເຄື່ອງຈັກ (Diesel/IC)",
      titleEn: "Internal Combustion (IC) Forklifts",
      descLo: "ກຳລັງແຮງມ້າສູງ, ອອກແບບມາສຳລັບວຽກໜັກນອກອາຄານ, ໂຮງສີເຂົ້າ, ໂຮງເລື່ອຍ, ໂຄງການກໍ່ສ້າງ ແລະ ບໍ່ແຮ່. ຜ່ານການກວດສອບ PDI ເຂັ້ມງວດກ່ອນສົ່ງມອບ.",
      descEn: "High torque and power output for heavy outdoor operations: rice mills, lumber yards, construction, and mining. Rigorous Pre-Delivery Inspection (PDI).",
      featuresLo: ["ຮັບນ້ຳໜັກ 2.5 - 10 ໂຕນ", "ເຄື່ອງຈັກຍີ່ປຸ່ນແທ້ 100% (Isuzu/Mitsubishi)", "ຫຼຸດການສິ້ນເປືອງນ້ຳມັນ 15% ດ້ວຍປ້ຳ High-Pressure", "ລະບົບກັນລົດໄຫຼ (Anti-roll back) ເທິງທາງຄ້ອຍ"],
      internalData: { margin: "18%", stock: 34, cost: "$14,200" }
    },
    {
      id: "reach",
      icon: ArrowRight,
      titleLo: "ລົດຍົກທາງແຄບ (Reach Trucks)",
      titleEn: "Reach Trucks & VNA",
      descLo: "ອອກແບບສະເພາະສຳລັບຊ່ອງທາງແຄບ (Very Narrow Aisle). ຊ່ວຍເພີ່ມພື້ນທີ່ຈັດເກັບສິນຄ້າ (Space Optimization) ໄດ້ສູງສຸດ.",
      descEn: "Engineered specifically for Very Narrow Aisle (VNA) warehouses to maximize vertical storage density.",
      featuresLo: ["ຍົກສູງສຸດ 12 ແມັດ", "ວົງລ້ຽວແຄບພິເສດ ຫຼຸດຄວາມສ່ຽງຕຳຊັ້ນວາງ", "ເພີ່ມພື້ນທີ່ຈັດເກັບໃນສາງ 30-50%", "ກ້ອງມອງພາບໜ້າງາ Camera System ປ້ອງກັນການຕຳກັນ"],
      internalData: { margin: "32%", stock: 5, cost: "$22,000" }
    }
  ];

  return (
    <div className="py-16 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold mb-4"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{isLo ? "1. SALE | ການຈັດຊື້ & ທີ່ປຶກສາວິສະວະກຳລົດຍົກ" : "1. SALES & FLEET PROCUREMENT ADVISORY"}</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            {isLo ? "ສູນລວມລົດຟອກລີບຄຸນນະພາບມາດຕະຖານສາກົນ" : "Certified Industrial Forklift Solutions"}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {isLo 
              ? "ພວກເຮົາບໍ່ພຽງແຕ່ຂາຍລົດ, ແຕ່ເຮົາໃຫ້ຄຳປຶກສາດ້ານວິສະວະກຳ (Engineering Consultation) ເລືອກລົດໃຫ້ກົງກັບນ້ຳໜັກຍົກ, ລັກສະນະພື້ນທີ່, ແລະ ໄລຍະຄືນທຶນ (TCO) ທີ່ຄຸ້ມຄ່າທີ່ສຸດ." 
              : "We provide consultative engineering support to select the exact right equipment for your load requirements, operating surface, and total cost of ownership (TCO)."}
          </p>
        </div>

        {/* CARE PACKAGE BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden border border-blue-600/40"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold mb-6 tracking-wide backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              {isLo ? "ແພັກເກັດການດູແລຄົບວົງຈອນ (COMPREHENSIVE ENGINEERING CARE)" : "COMPREHENSIVE ENGINEERING CARE PACKAGE"}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-1 lg:col-span-2">
                <h3 className="text-2xl lg:text-4xl font-black mb-4 tracking-tight">
                  {isLo ? "ຄຳໝັ້ນສັນຍາການດູແລລູກຄ້າອົງກອນ (B2B Fleet Commitment)" : "Exclusive B2B Enterprise Care Commitment"}
                </h3>
                <p className="text-blue-100 text-base lg:text-lg mb-6 max-w-2xl leading-relaxed">
                  {isLo 
                    ? "ຊື້ລົດຍົກກັບ DK LAO ທ່ານຈະໄດ້ຮັບການດູແລຄົບວົງຈອນຕັ້ງແຕ່ວັນທຳອິດ ຈົນຕະຫຼອດອາຍຸການໃຊ້ງານ ໂດຍທີມວິສະວະກອນປະຈຳສູນ Khamphengmeuang Hub." 
                    : "Acquiring equipment with DK LAO guarantees end-to-end support throughout its entire lifecycle by certified factory engineers."}
                </p>
                <ul className="space-y-4 mb-4">
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "ຮັບປະກັນສູນແທ້: " : "Full Factory Warranty: "}</strong>
                      {isLo ? "ຮັບປະກັນຕົວລົດ ແລະ ແບັດເຕີຣີ Li-Ion 1-5 ປີເຕັມ (ຂຶ້ນກັບລຸ້ນລົດ)" : "1 to 5 years comprehensive chassis and Li-ion battery warranty."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "ຟຣີ ຊຸດບຳລຸງຮັກສາ PM: " : "Complimentary 2-Year PM: "}</strong>
                      {isLo ? "ຟຣີ ບຳລຸງຮັກສາປ້ອງກັນ 2 ປີ ຫຼື 4,000 ຊົ່ວໂມງ ພ້ອມນ້ຳມັນ ແລະ ອາໄຫຼ່ແທ້ 100%" : "Free 2-year or 4,000h routine PM with 100% genuine filters and fluids."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "ໂຄງການ Trade-In: " : "Fair Trade-In Program: "}</strong>
                      {isLo ? "ຮັບປະເມີນລາຄາລົດເກົ່າທຸກຍີ່ຫໍ້ ເພື່ອປ່ຽນເປັນລົດລຸ້ນໃໝ່ ໃຫ້ມູນຄ່າທີ່ຍຸຕິທຳ" : "Fair valuation trade-in program for legacy equipment of any brand."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "ຝຶກອົບຮົມຄົນຂັບໜ້າງານ: " : "Certified Operator Training: "}</strong>
                      {isLo ? "ຟຣີ ຫຼັກສູດການຂັບຂີ່ປອດໄພ ແລະ ການກວດເຊັກປະຈຳວັນ ພ້ອມອອກໃບຢັ້ງຢືນ" : "Free on-site safe driving & daily inspection certification for your drivers."}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center gap-4 bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
                <h4 className="font-bold text-xl mb-1 text-center text-yellow-300">
                  {isLo ? "ການຈັດສົ່ງ & ທົດສອບລະບົບ" : "Nationwide Delivery"}
                </h4>
                <div className="flex items-start gap-3 text-sm text-blue-50 leading-relaxed">
                  <MapPin className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                  <span>
                    {isLo 
                      ? "ຈັດສົ່ງ ແລະ ທົດສອບລະບົບໜ້າງານ (On-Site Commissioning) ທົ່ວ 18 ແຂວງ ພ້ອມນາຍຊ່າງໄປແນະນຳວິທີໃຊ້ງານຕົວຈິງ." 
                      : "Nationwide on-site commissioning and driver orientation across all 18 Lao provinces."}
                  </span>
                </div>
                <Button 
                  onClick={() => handleBookConsultation(isLo ? "ປຶກສາວິສະວະກອນເລືອກຊື້ລົດຍົກ (Sale Advisory)" : "Consult Forklift Selection Specialist")}
                  className="w-full mt-4 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold py-6 text-base lg:text-lg rounded-xl shadow-lg transition-all hover:scale-[1.02]"
                >
                  {isLo ? "ນັດໝາຍປຶກສາວິສະວະກອນເລືອກລົດ" : "Schedule Equipment Consultation"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Know-How Section */}
        <div className="mb-16 bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8 text-amber-500" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {isLo ? "ຄຳແນະນຳຈາກວິສະວະກອນ: ວິທີເລືອກລົດຍົກໃຫ້ກົງກັບໜ້າງານ" : "Engineering Advisory: Choosing the Right Forklift"}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700 dark:text-slate-300">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-blue-600 dark:text-blue-400">EV Lithium-ion (ອນາຄົດແຫ່ງໂລຈິສຕິກ)</h4>
              <p className="text-sm leading-relaxed">
                {isLo ? "ຖ້າສາງຂອງທ່ານເປັນລະບົບປິດ (Indoor) ຫຼື ກ່ຽວຂ້ອງກັບອາຫານ, ຢາ (F&B, Pharma). ການລົງທຶນກັບ EV ຈະຄຸ້ມຄ່າກວ່າໃນໄລຍະຍາວ ເພາະຫຼຸດຄ່າພະລັງງານໄດ້ເຖິງ 70% ເມື່ອທຽບກັບນ້ຳມັນ ແລະ ບໍ່ມີມົນລະພິດ. (TCO ຕ່ຳທີ່ສຸດໃນໄລຍະ 5 ປີ)." : "Ideal for F&B/Pharma indoor ops. Reduces energy costs by 70%. Lowest TCO over 5 years."}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-amber-600 dark:text-amber-400">Diesel/IC (ຈອມພະລັງງານໜັກ)</h4>
              <p className="text-sm leading-relaxed">
                {isLo ? "ຖ້າໜ້າງານເປັນດິນແດງ, ທາງຊັນ, ຫຼື ຕ້ອງຍົກສິນຄ້ານ້ຳໜັກ 5-10 ໂຕນຂຶ້ນໄປ ຕໍ່ເນື່ອງທັງວັນທັງຄືນ. ເຄື່ອງຈັກກາຊວນຕອບໂຈດທີ່ສຸດ ເພາະເຕີມນ້ຳມັນແລ້ວລຸຍວຽກຕໍ່ໄດ້ທັນທີ ບໍ່ຕ້ອງລໍຖ້າສາກໄຟ." : "Best for outdoor, uneven terrain, and heavy-duty 5-10T loads. No charging downtime."}
              </p>
            </div>
          </div>
        </div>

        {/* TCO Calculator Tool */}
        <TCOCalculator isLo={isLo} />

        {/* Categories Grid (Product Strategy) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div 
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-600/20">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {isLo ? cat.titleLo : cat.titleEn}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 min-h-[100px]">
                  {isLo ? cat.descLo : cat.descEn}
                </p>
                <ul className="space-y-3 mb-6">
                  {cat.featuresLo.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {isInternal && (
                  <div className="mt-4 pt-4 border-t border-red-500/30 bg-red-50 dark:bg-red-950/20 p-4 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" />
                      INTERNAL
                    </div>
                    <h4 className="text-xs font-bold text-red-700 dark:text-red-400 uppercase mb-2 tracking-wider">Sales Enablement Data</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex flex-col">
                        <span className="text-slate-500 text-[10px] uppercase">Base Cost</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">{cat.internalData.cost}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-500 text-[10px] uppercase">Target Margin</span>
                        <span className="font-mono font-bold text-green-600 dark:text-green-400">{cat.internalData.margin}</span>
                      </div>
                      <div className="flex flex-col col-span-2 mt-1">
                        <span className="text-slate-500 text-[10px] uppercase">Live Stock (Vientiane Hub)</span>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${cat.internalData.stock > 10 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">{cat.internalData.stock} Units Available</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  );
};
