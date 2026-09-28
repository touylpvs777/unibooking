import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  PackageCheck, 
  Warehouse, 
  ShieldCheck, 
  Sun, 
  Wrench, 
  Check, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  FileText,
  Percent
} from "lucide-react";
import { Button } from "@/components/Forklift/ui/button";
import { RFQModal } from "./RFQModal";

interface ProjectPackagesSectionProps {
  isLao?: boolean;
}

interface PackageItem {
  id: string;
  titleLo: string;
  titleEn: string;
  badgeLo: string;
  badgeEn: string;
  icon: any;
  color: string;
  originalPrice: number;
  bundlePrice: number;
  savings: string;
  includesLo: string[];
  includesEn: string[];
}

const PACKAGES_DATA: PackageItem[] = [
  {
    id: "warehouse-starter",
    titleLo: "ຊຸດເປີດສາງສິນຄ້າຄົບວົງຈອນ (Warehouse Starter Solution)",
    titleEn: "Turnkey Warehouse Starter Solution",
    badgeLo: "🔥 B2B ຂາຍດີອັນດັບ 1",
    badgeEn: "🔥 B2B Bestseller",
    icon: Warehouse,
    color: "from-blue-600 to-indigo-700",
    originalPrice: 45000000,
    bundlePrice: 38250000,
    savings: "-15% (ປະຢັດ 6,750,000 ₭)",
    includesLo: [
      "ລົດລາກ Hand Pallet 2.5 ໂຕນ (2 ຄັນ)",
      "ຊັ້ນວາງສິນຄ້າ Longspan Shelving Unit (4 ຊຸດ)",
      "ລໍ້ PU ອຸດສາຫະກຳ Heavy Duty (16 ອັນ)",
      "ຖັງຂີ້ເຫຍື້ອ ແລະ ອຸປະກອນຄວາມສະອາດສາງ (2 ຊຸດ)",
      "ຟຣີຄ່າແຮງງານປະກອບ ແລະ ຕິດຕັ້ງໜ້າວຽກ",
    ],
    includesEn: [
      "Standard Hand Pallet Truck 2.5T (2 units)",
      "Longspan Heavy Duty Shelving Racks (4 sets)",
      "Industrial PU Swivel Casters (16 units)",
      "Outdoor Trash & Facility Safety Bins (2 units)",
      "Free on-site assembly and installation",
    ],
  },
  {
    id: "factory-safety",
    titleLo: "ຊຸດຄວາມປອດໄພໂຮງງານມາດຕະຖານ (Factory Safety & PPE Kit)",
    titleEn: "Factory Safety & Compliance PPE Kit",
    badgeLo: "🛡️ ມາດຕະຖານ OHSAS / ISO",
    badgeEn: "🛡️ ISO / OHSAS Compliant",
    icon: ShieldCheck,
    color: "from-emerald-600 to-teal-700",
    originalPrice: 18500000,
    bundlePrice: 15725000,
    savings: "-15% (ປະຢັດ 2,775,000 ₭)",
    includesLo: [
      "ໝວກນິລະໄພມາດຕະຖານ CE (25 ໃບ)",
      "ເສື້ອສະທ້ອນແສງຄຸນນະພາບສູງ (25 ຜືນ)",
      "ເກີບເຊັບຕີ້ຫົວເຫຼັກກັນຕຳ (15 ຄູ່)",
      "ຊຸດປະຖົມພະຍາບານ & Spill Kit ແກ້ໄຂສານເຄມີ (2 ຊຸດ)",
      "ປ້າຍເຕືອນຄວາມປອດໄພພາຍໃນໂຮງງານ 10 ຈຸດ",
    ],
    includesEn: [
      "Certified Industrial Safety Helmets (25 pcs)",
      "High-Visibility Reflective Safety Vests (25 pcs)",
      "Steel-Toe Anti-Puncture Safety Boots (15 pairs)",
      "Industrial First Aid & Spill Clean-up Kit (2 sets)",
      "Factory Safety Hazard Warning Signs (10 pcs)",
    ],
  },
  {
    id: "solar-epc",
    titleLo: "ຊຸດລະບົບໂຊລ້າເຊວ 50kW ໂຮງງານ & ຟາມ (Solar Commercial Kit)",
    titleEn: "Commercial Solar 50kW EPC Turnkey Kit",
    badgeLo: "⚡ ຫຼຸດຄ່າໄຟ 40-60%",
    badgeEn: "⚡ Reduce Electricity 40-60%",
    icon: Sun,
    color: "from-amber-500 to-orange-600",
    originalPrice: 320000000,
    bundlePrice: 272000000,
    savings: "-15% (ປະຢັດ 48,000,000 ₭)",
    includesLo: [
      "String Inverter 50kW ສາມເຟດ ຄຸນນະພາບສູງ (1 ຊຸດ)",
      "ແຜງ Mono PERC Tier-1 550W+ (110 ແຜງ)",
      "ໂຄງສ້າງອາລູມີນຽມຍຶດຫຼັງຄາ & ສາຍໄຟ Solar DC/AC ຄົບຊຸດ",
      "ຕູ້ Combiner Box & Surge Protection ປ້ອງກັນຟ້າຜ່າ",
      "ຟຣີ ວິສະວະກອນສຳຫຼວດອອກແບບ ແລະ ຍື່ນເອກະສານ",
    ],
    includesEn: [
      "Commercial 50kW 3-Phase String Inverter (1 unit)",
      "Tier-1 550W+ Mono PERC Solar Panels (110 panels)",
      "Heavy-duty Aluminum Roof Mounting Structure & Cables",
      "DC/AC Combiner Box with Lightning Surge Protection",
      "Free site engineering survey & connection design",
    ],
  },
  {
    id: "fleet-workshop",
    titleLo: "ຊຸດບຳລຸງຮັກສາລົດຂົນສົ່ງ & ບໍ່ແຮ່ (Fleet Workshop Kit)",
    titleEn: "Heavy Fleet & Mining Workshop Kit",
    badgeLo: "🚜 ເຄື່ອງມືຊ່າງຄົບວົງຈອນ",
    badgeEn: "🚜 Heavy Duty Mine Grade",
    icon: Wrench,
    color: "from-purple-600 to-indigo-800",
    originalPrice: 68000000,
    bundlePrice: 57800000,
    savings: "-15% (ປະຢັດ 10,200,000 ₭)",
    includesLo: [
      "ຕູ້ເຄື່ອງມືຊ່າງ 7 ຊັ້ນ ພ້ອມອຸປະກອນຄົບຊຸດ 250+ ຊິ້ນ (1 ຕູ້)",
      "ແມ່ແຮງໄຮໂດຣລິກຂະໜາດ 50 ໂຕນ ສຳລັບລົດບັນທຸກ (2 ອັນ)",
      "ບ໋ອກລົມຂະໜາດ 1 ນິ້ວ ແຮງບິດສູງສຳລັບຖອດລໍ້ໃຫຍ່ (1 ຊຸດ)",
      "ຊຸດປ່ຽນໄສ້ກອງ ແລະ ອຸປະກອນອັດຈາລະບີແຮງດັນສູງ",
      "ຮັບປະກັນເຄື່ອງມື 12 ເດືອນ ພ້ອມອາໄຫຼ່ປ່ຽນ",
    ],
    includesEn: [
      "7-Drawer Heavy Duty Mobile Tool Trolley 250+ pcs",
      "50-Ton Heavy Duty Truck Hydraulic Bottle Jacks (2 pcs)",
      "High-Torque 1-Inch Air Impact Wrench Kit",
      "High-Pressure Grease & Oil Filter Service Kit",
      "12-Month Industrial Tool Warranty with spare parts",
    ],
  },
];

export function ProjectPackagesSection({ isLao = true }: ProjectPackagesSectionProps) {
  const [selectedPackageForRfq, setSelectedPackageForRfq] = useState<PackageItem | null>(null);

  return (
    <section className="my-10 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-wider mb-3 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isLao ? "ຊຸດໂຄງການອຸດສາຫະກຳຄົບວົງຈອນ" : "B2B Turnkey Project Solutions"}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            {isLao ? "ຊື້ຍົກຊຸດໂຄງການ ຮັບສ່ວນຫຼຸດພິເສດ 15%" : "Order Turnkey Bundles & Save 15%"}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {isLao
              ? "ແພັກເກດສິນຄ້າທີ່ຈັດໄວ້ສະເພາະສຳລັບສາງສິນຄ້າ, ໂຮງງານ, ບໍ່ແຮ່ ແລະ ລະບົບໂຊລ້າເຊວ ພ້ອມໃຫ້ຄຳປຶກສາ ແລະ ຕິດຕັ້ງໂດຍວິສະວະກອນ LUD"
              : "Pre-configured equipment packages for warehouses, factories, mining and solar projects with dedicated LUD engineering support."}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <Percent className="w-4 h-4 text-emerald-400" />
          <span>{isLao ? "ລວມພາສີ • ອອກໃບກຳກັບພາສີໄດ້" : "Tax Invoice & Corporate Terms"}</span>
        </div>
      </div>

      {/* 4 Packages Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {PACKAGES_DATA.map((pkg) => {
          const IconComponent = pkg.icon;
          const title = isLao ? pkg.titleLo : pkg.titleEn;
          const badge = isLao ? pkg.badgeLo : pkg.badgeEn;
          const includes = isLao ? pkg.includesLo : pkg.includesEn;

          return (
            <motion.div
              key={pkg.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col justify-between rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 p-5 shadow-lg transition-all"
            >
              <div>
                {/* Badge & Icon */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {badge}
                  </span>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pkg.color} text-white flex items-center justify-center shadow-md`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-extrabold text-white leading-snug mb-3">
                  {title}
                </h3>

                {/* Price Display */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/60 mb-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-0.5">
                    <span className="line-through">{pkg.originalPrice.toLocaleString()} ₭</span>
                    <span className="text-emerald-400 font-bold">{pkg.savings}</span>
                  </div>
                  <div className="text-xl font-black text-emerald-400">
                    {pkg.bundlePrice.toLocaleString()} <span className="text-xs text-white">₭</span>
                  </div>
                </div>

                {/* Items Included */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-bold text-slate-300 block mb-2">
                    {isLao ? "ສິ່ງທີ່ບັນຈຸໃນແພັກເກດ:" : "Package Inclusions:"}
                  </span>
                  {includes.map((inc, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-tight">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-slate-700/60 mt-auto">
                <Button
                  onClick={() => setSelectedPackageForRfq(pkg)}
                  className="w-full h-10 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  <FileText className="w-4 h-4" />
                  <span>{isLao ? "ຂໍໃບສະເໜີລາຄາຊຸດນີ້ (RFQ)" : "Request Package Quote"}</span>
                </Button>

                <a
                  href={`https://wa.me/8562058929299?text=${encodeURIComponent(
                    isLao
                      ? `ສະບາຍດີ LUD, ຂ້າພະເຈົ້າສົນໃຈສັ່ງຊື້/ສອບຖາມ:\n• ແພັກເກດ: ${pkg.titleLo}\n• ລາຄາຊຸດ: ${pkg.bundlePrice.toLocaleString()} ₭\nຕ້ອງການໃຫ້ວິສະວະກອນຕິດຕໍ່ກັບ`
                      : `Hello LUD, I am interested in:\n• Package: ${pkg.titleEn}\n• Price: ${pkg.bundlePrice.toLocaleString()} LAK\nPlease contact me for consultation.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-9 rounded-xl text-[11px] font-bold bg-slate-700/70 hover:bg-emerald-600 text-slate-200 hover:text-white border border-slate-600 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{isLao ? "ສອບຖາມດ່ວນຜ່ານ WhatsApp" : "Inquire via WhatsApp"}</span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* RFQ Modal Integration for Selected Package */}
      {selectedPackageForRfq && (
        <RFQModal
          isOpen={true}
          onClose={() => setSelectedPackageForRfq(null)}
          item={{
            sku_id: selectedPackageForRfq.id,
            sku_code: `PKG-${selectedPackageForRfq.id.toUpperCase()}`,
            part_name: selectedPackageForRfq.titleEn,
            part_name_lo: selectedPackageForRfq.titleLo,
            category: "Project Packages",
            qty_on_hand: 10,
            unit_price: selectedPackageForRfq.bundlePrice,
          } as any}
        />
      )}
    </section>
  );
}
