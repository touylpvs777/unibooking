import React from "react";
import { motion } from "framer-motion";
import { Settings, Battery, CircleDashed, ShieldCheck, Box, RefreshCw, CheckCircle2, Search, Gift, PackageOpen, BadgeDollarSign } from "lucide-react";
import { Button } from "@/components/Forklift/ui/button";
import { useBookingContext } from "./BookingContext";

export const ServicePartsPillar = ({ isLo }: { isLo: boolean }) => {
  const { handleBookConsultation } = useBookingContext();

  const partsCategories = [
    {
      id: "traction-battery",
      icon: Battery,
      titleLo: "ໝໍ້ໄຟລົດຍົກໄຟຟ້າ (Traction Batteries)",
      titleEn: "Traction Batteries & Li-ion",
      descLo: "ນຳເຂົ້າໂດຍກົງຈາກໂຮງງານຜູ້ຜະລິດ (OEM Factory Direct). ຮັບປະກັນອາຍຸການໃຊ້ງານຍາວນານກວ່າ 3-5 ປີ.",
      descEn: "Direct OEM factory import ensuring maximum lifecycle of 3-5+ years.",
      featuresLo: ["ຮັບປະກັນຄຸນນະພາບສູງສຸດ 3 ປີ", "ບໍລິການຟື້ນຟູສະພາບໝໍ້ໄຟ (Battery Regeneration)", "ມີທີມຊ່າງຕິດຕັ້ງເຖິງໜ້າງານ"]
    },
    {
      id: "solid-tire",
      icon: CircleDashed,
      titleLo: "ຢາງຕັນ ແລະ ຢາງລົມ (Industrial Tires)",
      titleEn: "Solid & Pneumatic Tires",
      descLo: "ຢາງອຸດສາຫະກຳຄຸນນະພາບສູງ ທົນທານຕໍ່ການສຽດສີ ເໝາະສຳລັບໂຮງງານຊີມັງ, ບໍ່ແຮ່, ແລະ ສາງສິນຄ້າທົ່ວໄປ.",
      descEn: "High-durability industrial tires engineered for heavy-duty environments (Mining, Cement).",
      featuresLo: ["ຢາງຕັນ (Solid), ຢາງລົມ (Pneumatic)", "ຢາງບໍ່ຖິ້ມຮອຍ (Non-marking) ສຳລັບສາງອາຫານ", "ບໍລິການອັດຢາງ-ປ່ຽນຢາງເຖິງທີ່"]
    },
    {
      id: "lubricant",
      icon: Settings,
      titleLo: "ນ້ຳມັນໄຮໂດຣລິກ ແລະ ນ້ຳມັນເຄື່ອງ",
      titleEn: "Premium Lubricants",
      descLo: "ນ້ຳມັນຫຼໍ່ລື່ນມາດຕະຖານ ISO 9001 ທີ່ອອກແບບມາສຳລັບລົດຟອກລີບໂດຍສະເພາະ ເພື່ອຮັກສາອາຍຸການໃຊ້ງານ.",
      descEn: "ISO 9001 certified lubricants formulated exclusively for forklifts.",
      featuresLo: ["ນ້ຳມັນໄຮໂດຣລິກ (AW46, AW68)", "ນ້ຳມັນເຄື່ອງສຳລັບລົດກາຊວນ ແລະ ເບນຊິນ", "ກອງນ້ຳມັນ (Oil Filters) ແທ້ 100%"]
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 font-semibold mb-4"
          >
            <Settings className="w-5 h-5" />
            <span>{isLo ? "4. PARTS | ສາງອາໄຫຼ່ແທ້ OEM 16,000+ ລາຍການ" : "4. GENUINE OEM SPARE PARTS HUB"}</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            {isLo ? "ຄັງອາໄຫຼ່ 16,000+ SKU ຄວບຄຸມດ້ວຍ WMS" : "16,000+ SKUs WMS Managed Inventory"}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {isLo 
              ? "ສູນລວມອາໄຫຼ່ລົດຍົກທຸກຍີ່ຫໍ້ທີ່ໃຫຍ່ທີ່ສຸດໃນ ສປປ ລາວ ບໍລິຫານຈັດການດ້ວຍລະບົບ Barcode WMS ສາມາດກວດສອບເລກ Part Number ແລະ ຈຳນວນສະຕັອກໄດ້ທັນທີ." 
              : "The largest multi-brand forklift spare parts distribution center in Lao PDR, managed under a Barcode WMS inventory system."}
          </p>
        </div>

        {/* GENUINE PARTS COMMITMENT BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-gradient-to-r from-amber-900 via-slate-900 to-amber-950 rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden border border-amber-700/40"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-6 tracking-wide backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {isLo ? "ຄຳໝັ້ນສັນຍາເລື່ອງອາໄຫຼ່ແທ້ 100% (100% GENUINE OEM ASSURANCE)" : "100% GENUINE OEM ASSURANCE GUARANTEE"}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-1 lg:col-span-2">
                <h3 className="text-2xl lg:text-4xl font-black mb-4 tracking-tight">
                  {isLo ? "ສາງອາໄຫຼ່ແທ້ສູນກາງ ພ້ອມຈັດສົ່ງທົ່ວປະເທດ" : "Centralized Genuine Spares Hub & Nationwide Dispatch"}
                </h3>
                <p className="text-amber-100 text-base lg:text-lg mb-6 max-w-2xl leading-relaxed">
                  {isLo 
                    ? "ພວກເຮົາສະຕັອກອາໄຫຼ່ແທ້ຫຼາຍກວ່າ 16,000 ລາຍການ ເພື່ອໃຫ້ລົດຍົກຂອງທ່ານກັບມາເຮັດວຽກໄດ້ໄວທີ່ສຸດ ໂດຍບໍ່ຕ້ອງລໍຖ້າສັ່ງຈາກຕ່າງປະເທດເປັນເດືອນໆ." 
                    : "Maintaining over 16,000 SKUs in our central warehouse to ensure rapid turnaround without weeks of overseas procurement delay."}
                </p>
                <ul className="space-y-4 mb-4">
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "ນຳເຂົ້າໂດຍກົງຈາກໂຮງງານ OEM: " : "Direct OEM Factory Imports: "}</strong>
                      {isLo ? "ສຳລັບ Mitsubishi, Nichiyu, TCM, Toyota, Jungheinrich ແລະ JLG ພ້ອມ Serial Number ແທ້" : "Genuine components for Mitsubishi, Nichiyu, TCM, Toyota, Jungheinrich, and JLG."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "ຮັບປະກັນ Zero Fake 100%: " : "Zero Counterfeit Policy: "}</strong>
                      {isLo ? "ກວດເຊັກ ແລະ ຮັບປະກັນຄຸນນະພາບ ຫາກພົບອາໄຫຼ່ທຽມຍິນດີຊົດເຊີຍມູນຄ່າ 10 ເທົ່າ" : "Strict 100% genuine assurance backed by a 10x compensation guarantee."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "ຈັດສົ່ງດ່ວນ 18 ແຂວງ: " : "Nationwide 24-48h Dispatch: "}</strong>
                      {isLo ? "ສາງສູນກາງຖະໜົນກຳແພງເມືອງ (T4) ພ້ອມກະຈາຍອາໄຫຼ່ພາຍໃນ 24-48 ຊົ່ວໂມງ" : "Rapid distribution from our T4 Central Hub to all 18 provinces within 24-48 hours."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-base lg:text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{isLo ? "ໂຄງການ Consignment Stock: " : "On-site Consignment Program: "}</strong>
                      {isLo ? "ສຳລັບລູກຄ້າໂຮງງານໃຫຍ່ ສາມາດວາງສະຕັອກອາໄຫຼ່ສຸກເສີນໄວ້ທີ່ສາງຂອງທ່ານເລີຍ" : "Critical spare parts stationed on-site at your facility for immediate emergency access."}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center gap-4 bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
                <h4 className="font-bold text-xl mb-1 text-center text-amber-300">
                  {isLo ? "ກວດເຊັກເລກອາໄຫຼ່ (VIN)" : "VIN Search & Match"}
                </h4>
                <div className="flex items-start gap-3 text-sm text-amber-100 leading-relaxed">
                  <BadgeDollarSign className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <span>
                    {isLo 
                      ? "ພຽງແຕ່ສົ່ງຮູບ Plate ເລກຕົວຖັງ ຫຼື ເລກ Part Number ມາຍັງທີມງານວິສະວະກອນ DK LAO, ພວກເຮົາຈະກວດເຊັກສະຕັອກໃຫ້ພາຍໃນ 15 ນາທີ." 
                      : "Send us your chassis nameplate photo or part number for a guaranteed stock check within 15 minutes."}
                  </span>
                </div>
                <Button 
                  onClick={() => handleBookConsultation(isLo ? "ສອບຖາມ ຫຼື ສັ່ງຈອງອາໄຫຼ່ແທ້ (Parts Support)" : "Inquire Genuine Spare Parts")}
                  className="w-full mt-4 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold py-6 text-base lg:text-lg rounded-xl shadow-lg transition-all hover:scale-[1.02]"
                >
                  {isLo ? "ສອບຖາມ ຫຼື ສັ່ງຈອງອາໄຫຼ່ແທ້" : "Inquire Genuine Spare Parts"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Know-How Section */}
        <div className="mb-16 bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-8 h-8 text-cyan-600" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {isLo ? "ຄຳແນະນຳຈາກວິສະວະກອນ: ວິທີເບິ່ງອາໄຫຼ່ແທ້ vs ອາໄຫຼ່ທຽມ (Risk Mitigation)" : "Engineering Advisory: Identifying Genuine Parts vs Counterfeits"}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700 dark:text-slate-300">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border-l-4 border-red-500">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-red-500"/>ອັນຕະລາຍຂອງອາໄຫຼ່ທຽມ</h4>
              <p className="text-sm leading-relaxed">
                {isLo ? "ອາໄຫຼ່ທຽມອາດມີລາຄາຖືກກວ່າ 30-50% ແຕ່ອາຍຸການໃຊ້ງານສັ້ນກວ່າ 3 ເທົ່າ. ທີ່ຮ້າຍແຮງກວ່ານັ້ນຄື ກອງນ້ຳມັນທຽມອາດເຮັດໃຫ້ເຄື່ອງຈັກພັງ (Engine Knocking) ເຊິ່ງຄ່າສ້ອມແປງແພງກວ່າຄ່າອາໄຫຼ່ເຖິງ 100 ເທົ່າ!" : "Fake parts may be 50% cheaper but fail 3x faster. Fake oil filters can completely destroy engines, costing 100x more to repair!"}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border-l-4 border-emerald-500">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/>ສັງເກດຈຸດໃດແດ່?</h4>
              <p className="text-sm leading-relaxed">
                {isLo ? "1. ກ່ອງຫຸ້ມຫໍ່ຕ້ອງມີ Hologram ແລະ Serial Number ທີ່ເຊັກກັບໂຮງງານໄດ້. 2. ວັດສະດຸໂລຫະຂອງອາໄຫຼ່ແທ້ຈະມີຄວາມມື່ນ ແລະ ບໍ່ມີຮອຍເສ້ຍ (Machining Marks). 3. ຊື້ກັບຕົວແທນຈຳໜ່າຍ (Authorized Dealer) ທີ່ເຊື່ອຖືໄດ້ເທົ່ານັ້ນ." : "Check for Holograms, Serial Numbers, and smooth machining marks. Only purchase from Authorized Dealers."}
              </p>
            </div>
          </div>
        </div>

        {/* Categories Grid (Product Strategy) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {partsCategories.map((cat, idx) => {
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
                <div className="w-14 h-14 bg-cyan-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-cyan-600/20">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {isLo ? cat.titleLo : cat.titleEn}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 min-h-[100px]">
                  {isLo ? cat.descLo : cat.descEn}
                </p>
                <ul className="space-y-3">
                  {cat.featuresLo.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* B2B Consignment Stock (Place Strategy) */}
        <div className="bg-gradient-to-r from-slate-900 to-cyan-950 dark:from-slate-950 dark:to-cyan-950/80 rounded-3xl p-8 lg:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-semibold mb-6 border border-cyan-500/30">
                <Box className="w-4 h-4" />
                {isLo ? "B2B EXCLUSIVE PROGRAM" : "B2B EXCLUSIVE PROGRAM"}
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 leading-tight">
                {isLo ? "ໂຄງການ Consignment Stock (Vendor Managed Inventory)" : "Consignment Stock (VMI Strategy)"}
              </h3>
              <p className="text-slate-300 text-lg mb-8">
                {isLo 
                  ? "ກົນລະຍຸດການຈັດການລະບົບຕ່ອງໂສ້ອຸປະທານ (Place Strategy): ພວກເຮົາຈະນຳເອົາອາໄຫຼ່ສິ້ນເປືອງໄປຕັ້ງເປັນ 'ສາງຍ່ອຍ' ໄວ້ໃນໂຮງງານຂອງທ່ານ. ທ່ານສາມາດເບີກອາໄຫຼ່ໄປໃຊ້ໄດ້ທັນທີ (Zero Wait Time) ແລະ ຊຳລະເງິນສະເພາະຊິ້ນສ່ວນທີ່ຖືກນຳໃຊ້ໄປແລ້ວໃນແຕ່ລະເດືອນ."
                  : "Supply Chain Excellence (Place Strategy): We establish a mini-warehouse of fast-moving parts directly inside your facility. Enjoy Zero Wait Time—use the parts instantly and only pay for what you consume monthly."}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-cyan-100">
                  <CheckCircle2 className="w-6 h-6 text-cyan-400 shrink-0" />
                  <span className="font-medium">{isLo ? "ຫຼຸດຄ່າໃຊ້ຈ່າຍໃນການເກັບສະຕັອກອາໄຫຼ່ (Zero Inventory Cost)" : "Zero Inventory Holding Costs"}</span>
                </li>
                <li className="flex items-center gap-3 text-cyan-100">
                  <CheckCircle2 className="w-6 h-6 text-cyan-400 shrink-0" />
                  <span className="font-medium">{isLo ? "ແກ້ໄຂບັນຫາສາຍການຜະລິດຢຸດຊະງັກເນື່ອງຈາກລໍຖ້າອາໄຫຼ່" : "Eliminate Downtime waiting for parts"}</span>
                </li>
                <li className="flex items-center gap-3 text-cyan-100">
                  <CheckCircle2 className="w-6 h-6 text-cyan-400 shrink-0" />
                  <span className="font-medium">{isLo ? "ມີທີມງານເຂົ້າກວດນັບສະຕັອກ ແລະ ເຕີມອາໄຫຼ່ໃຫ້ທຸກເດືອນ" : "Monthly automated stock replenishment by our team"}</span>
                </li>
              </ul>
              <Button 
                onClick={() => handleBookConsultation(isLo ? "ສົນໃຈໂຄງການ Consignment Stock ສຳລັບໂຮງງານ" : "Inquire about Consignment Stock Program")}
                className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg shadow-cyan-600/40 w-full sm:w-auto"
              >
                {isLo ? "ສະໝັກເຂົ້າຮ່ວມໂຄງການ" : "Apply for Consignment Program"}
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Warehouse Inventory" 
                className="rounded-2xl border-2 border-cyan-500/30 relative z-10 object-cover h-[400px] w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-slate-900 border border-cyan-500/30 p-4 rounded-xl shadow-xl z-20 flex items-center gap-4">
                <RefreshCw className="w-8 h-8 text-cyan-400" />
                <div>
                  <div className="text-cyan-400 font-bold text-xl">Auto-Refill</div>
                  <div className="text-slate-400 text-sm">Every 30 Days</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
