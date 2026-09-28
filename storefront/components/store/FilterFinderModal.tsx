"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Info, Sparkles, ShoppingBag, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFilterCriteria: (query: string, subsystem: string) => void;
}

interface VehicleFilterSet {
  id: string;
  name: string;
  nameLo: string;
  category: "pickup" | "forklift" | "ev";
  engine: string;
  oilFilter: { oem: string; brand: string; price: number; desc: string };
  airFilter: { oem: string; brand: string; price: number; desc: string };
  fuelFilter?: { oem: string; brand: string; price: number; desc: string };
  cabinFilter?: { oem: string; brand: string; price: number; desc: string };
  bundleDiscountPercent: number;
  icon: string;
}

const VEHICLE_FILTER_SETS: VehicleFilterSet[] = [
  {
    id: "revo",
    name: "Toyota Hilux Revo / Fortuner (2.4L / 2.8L)",
    nameLo: "ໂຕໂຢຕ້າ ໄຮລັກ ຣີໂວ / ຟໍຈູນເນີ (ເຄື່ອງ 1GD / 2GD)",
    category: "pickup",
    engine: "1GD-FTV (2.8L) / 2GD-FTV (2.4L) VN Turbo",
    oilFilter: {
      oem: "90915-YZZD2 / 90915-20003",
      brand: "Toyota Genuine / Denso",
      price: 9.50,
      desc: "ໝໍ້ຕອງນ້ຳມັນເຄື່ອງແທ້ສູນ ວາວ Bypass ມາດຕະຖານປ້ອງກັນເຄື່ອງສວຽນ"
    },
    airFilter: {
      oem: "17801-0L040",
      brand: "Toyota OEM / Donaldson",
      price: 16.00,
      desc: "ຕອງອາກາດເສັ້ນໃຍພິເສດ ດັກຝຸ່ນລະອຽດ 99.8% ຊ່ວຍໃຫ້ເຄື່ອງຈັກຫາຍໃຈສະດວກ"
    },
    fuelFilter: {
      oem: "23390-0L070",
      brand: "Toyota Genuine Fuel Screen",
      price: 14.50,
      desc: "ຕອງໂຊລ່າແຍກນ້ຳ ປ້ອງກັນປ້ຳ Common Rail ແລະ ຫົວສີດຕັນ"
    },
    cabinFilter: {
      oem: "87139-0K010",
      brand: "Denso CN95 Carbon HEPA",
      price: 12.00,
      desc: "ໝໍ້ຕອງແອຄາບອນ ດັກກິ່ນອັບ ປ້ອງກັນຝຸ່ນ PM2.5 ແລະ ເຊື້ອແບັກທີເຣຍ"
    },
    bundleDiscountPercent: 15,
    icon: "🛻"
  },
  {
    id: "dmax",
    name: "Isuzu D-Max / MU-X (1.9 Ddi / 3.0 Ddi BluePower)",
    nameLo: "ອີຊູຊຸ ດີແມັກ / ມິວ-ເອັກ (ເຄື່ອງ 1.9 / 3.0 BluePower)",
    category: "pickup",
    engine: "RZ4E-TC (1.9L) / 4JJ3-TCX (3.0L) Common Rail",
    oilFilter: {
      oem: "8-98165071-0 / 8-97309927-0",
      brand: "Isuzu Genuine / Mahle",
      price: 9.00,
      desc: "ໝໍ້ຕອງນ້ຳມັນເຄື່ອງແທ້ Isuzu ທົນແຮງດັນສູງ ສຳລັບເຄື່ອງ BluePower"
    },
    airFilter: {
      oem: "8-98140266-0",
      brand: "Isuzu Genuine / Donaldson",
      price: 15.50,
      desc: "ຕອງອາກາດແທ້ຊ່ວຍໃຫ້ອັດຕາເລັ່ງຕອບສະໜອງດີ ປະຢັດນ້ຳມັນ"
    },
    fuelFilter: {
      oem: "8-98159693-0",
      brand: "Isuzu Genuine Fuel Element",
      price: 13.50,
      desc: "ຕອງນ້ຳມັນເຊື້ອໄຟໂຊລ່າດັກນ້ຳລະດັບໄມຄຣອນ"
    },
    cabinFilter: {
      oem: "8-98139428-0",
      brand: "Isuzu PM2.5 Bio-Guard",
      price: 11.50,
      desc: "ກອງແອໃນຫ້ອງໂດຍສານປ້ອງກັນມົນລະພິດ ແລະ ຝຸ່ນລະອອງ"
    },
    bundleDiscountPercent: 15,
    icon: "🚙"
  },
  {
    id: "ranger",
    name: "Ford Ranger / Raptor / Everest (2.0L Bi-Turbo / Single)",
    nameLo: "ຟອດ ເຣນເຈີ / ແຣັບເຕີ / ເອເວີເຣສ (2.0L Bi-Turbo / 3.2L)",
    category: "pickup",
    engine: "2.0L EcoBlue Bi-Turbo / 3.2L Duratorq",
    oilFilter: {
      oem: "BB3Q-6744-BA / JU2Z-6731-A",
      brand: "Ford Motorcraft Genuine",
      price: 11.00,
      desc: "ໄສ້ຕອງນ້ຳມັນເຄື່ອງ Ford Motorcraft ແທ້ ມາດຕະຖານໂຮງງານ"
    },
    airFilter: {
      oem: "EB3G-9601-AA",
      brand: "Ford Motorcraft / Donaldson",
      price: 18.50,
      desc: "ຕອງອາກາດທົນແຮງດູດສູງສຳລັບລະບົບ Bi-Turbo"
    },
    fuelFilter: {
      oem: "JB3Z-9365-A",
      brand: "Ford Motorcraft Diesel Filter",
      price: 22.00,
      desc: "ຊຸດຕອງໂຊລ່າລະບົບຄູ່ ປ້ອງກັນປ້ຳແຮງດັນສູງສຸດ 2,500 Bar"
    },
    cabinFilter: {
      oem: "AB39-19N619-AA",
      brand: "Motorcraft Activated Carbon",
      price: 13.00,
      desc: "ຕອງແອຄາບອນດັບກິ່ນ ແລະ ກັ່ນຕອງລະອອງເກສອນ"
    },
    bundleDiscountPercent: 15,
    icon: "🛻"
  },
  {
    id: "fl_toyota",
    name: "Toyota Forklift 7FD / 8FD (1.5 - 3.5 Ton)",
    nameLo: "ລົດຍົກ ໂຕໂຢຕ້າ 7FD / 8FD (ເຄື່ອງ 1DZ, 2Z, 4Y)",
    category: "forklift",
    engine: "Toyota 1DZ-II (Diesel) / 4Y (Gasoline/LPG)",
    oilFilter: {
      oem: "15601-76008-71 / 15600-76005",
      brand: "Toyota Forklift Genuine / Aisin",
      price: 12.50,
      desc: "ໝໍ້ຕອງນ້ຳມັນເຄື່ອງລົດຍົກ ໂຕໂຢຕ້າ ທົນຄວາມຮ້ອນ ແລະ ແຮງດັນຕໍ່ເນື່ອງ"
    },
    airFilter: {
      oem: "17741-23600-71 / 17743-23600",
      brand: "Donaldson Dual Element (2 ຊັ້ນ)",
      price: 28.00,
      desc: "ຕອງອາກາດ 2 ຊັ້ນ (ຊັ້ນນອກ + ຊັ້ນໃນ) ທົນຝຸ່ນໜັກໃນສາງ ແລະ ໄຊດ໌ງານ"
    },
    fuelFilter: {
      oem: "23303-76002-71",
      brand: "Toyota Forklift Fuel Strainer",
      price: 16.00,
      desc: "ຕອງນ້ຳມັນກາຊວນປ້ອງກັນປ້ຳແຍັກ ແລະ ປ້ຳໂຊລ່າລົດຍົກ"
    },
    cabinFilter: {
      oem: "67501-23320-71",
      brand: "Hydraulic Return Line Filter",
      price: 24.00,
      desc: "ໝໍ້ຕອງນ້ຳມັນໄຮໂດຣລິກຂາກັບ ປົກປ້ອງຊຸດວາວ ແລະ ກະບອກສູບ"
    },
    bundleDiscountPercent: 15,
    icon: "🚜"
  },
  {
    id: "fl_komatsu",
    name: "Komatsu Forklift FD20/FD25/FD30 (-16 / -17)",
    nameLo: "ລົດຍົກ ໂຄມັດສຸ FD25 / FD30 (ເຄື່ອງ 4D94LE / 4D98E)",
    category: "forklift",
    engine: "Komatsu 4D94LE / Yanmar 4TNE98 Diesel",
    oilFilter: {
      oem: "129150-35153 / YM129150-35150",
      brand: "Komatsu Genuine / Yanmar OEM",
      price: 13.00,
      desc: "ໝໍ້ຕອງນ້ຳມັນເຄື່ອງມາດຕະຖານ Yanmar/Komatsu ແທ້"
    },
    airFilter: {
      oem: "3EB-01-25210",
      brand: "Donaldson Heavy Duty RadialSeal",
      price: 27.50,
      desc: "ຕອງອາກາດ RadialSeal ຊີລຢາງແໜ້ນໜາ ບໍ່ມີຝຸ່ນຮົ່ວເຂົ້າເຄື່ອງ"
    },
    fuelFilter: {
      oem: "119810-55650",
      brand: "Komatsu Diesel Filter Cartridge",
      price: 15.00,
      desc: "ຕອງໂຊລ່າຄຸນນະພາບສູງ ປ້ອງກັນຫົວສີດ Zexel/Bosch"
    },
    cabinFilter: {
      oem: "3EB-66-11711",
      brand: "Hydraulic Suction Filter",
      price: 22.50,
      desc: "ຕອງດູດນ້ຳມັນໄຮໂດຣລິກລົດຍົກ ປ້ອງກັນປ້ຳໄຮໂດຣລິກຫຼັກ"
    },
    bundleDiscountPercent: 15,
    icon: "🚜"
  },
  {
    id: "byd_ev",
    name: "BYD Atto 3 / Dolphin / Seal (Electric Vehicle)",
    nameLo: "ບີວາຍດີ Atto 3 / Dolphin / Seal (ລົດໄຟຟ້າ 100%)",
    category: "ev",
    engine: "BYD Permanent Magnet Synchronous Motor & Blade Battery",
    oilFilter: {
      oem: "BYD-GBX-FLUID-FLT",
      brand: "BYD Genuine EV Gearbox Filter",
      price: 24.00,
      desc: "ໝໍ້ຕອງນ້ຳມັນເກຍຫຼຸດຮອບມໍເຕີໄຟຟ້າ E-Axle (ປ່ຽນທຸກ 40,000 km)"
    },
    airFilter: {
      oem: "BYD-BAT-VENT-FLT",
      brand: "BYD Battery Pack Breather Valve",
      price: 18.00,
      desc: "ວາວຕອງລະບາຍອາກາດກັນນ້ຳ IP67 ສຳລັບຊຸດແບັດເຕີຣີ Blade Battery"
    },
    cabinFilter: {
      oem: "SC-8107010 / BYD-HEPA-CN95",
      brand: "BYD CN95 Medical Grade HEPA",
      price: 16.50,
      desc: "ກອງແອ HEPA CN95 ແທ້ ດັກຝຸ່ນ PM0.3, ເຊື້ອໄວຣັສ ແລະ ກິ່ນຄັວນ"
    },
    bundleDiscountPercent: 12,
    icon: "⚡"
  },
  {
    id: "tesla_ev",
    name: "Tesla Model 3 / Model Y (Electric Vehicle)",
    nameLo: "ເທສລາ Model 3 / Model Y (ລົດໄຟຟ້າ 100%)",
    category: "ev",
    engine: "Tesla Dual Motor AWD / RWD & 400V Heat Pump",
    oilFilter: {
      oem: "1095038-00-A",
      brand: "Tesla Drive Unit Oil Filter",
      price: 28.00,
      desc: "ໝໍ້ຕອງນ້ຳມັນຫຼໍ່ລື່ນມໍເຕີຂັບເຄື່ອນໜ້າ-ຫຼັງ Tesla Drive Unit"
    },
    airFilter: {
      oem: "1107681-00-A",
      brand: "Tesla HEPA Bioweapon Defense Filter",
      price: 38.00,
      desc: "ໝໍ້ຕອງອາກາດ HEPA ຂະໜາດໃຫຍ່ລະບົບ Bioweapon Defense Mode"
    },
    cabinFilter: {
      oem: "1107683-00-A",
      brand: "Tesla Activated Carbon Cabin Filter",
      price: 19.50,
      desc: "ຊຸດກອງແອຄາບອນຄູ່ (Dual Pack) ດັກກິ່ນອັບ ແລະ ມົນລະພິດ"
    },
    bundleDiscountPercent: 12,
    icon: "⚡"
  }
];

export function FilterFinderModal({ isOpen, onClose, onSelectFilterCriteria }: FilterFinderModalProps) {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("revo");
  const [activeCategoryTab, setActiveCategoryTab] = useState<"all" | "pickup" | "forklift" | "ev">("all");

  const currentVehicle = VEHICLE_FILTER_SETS.find((v) => v.id === selectedVehicleId) || VEHICLE_FILTER_SETS[0];

  const totalIndividualPrice =
    currentVehicle.oilFilter.price +
    currentVehicle.airFilter.price +
    (currentVehicle.fuelFilter?.price || 0) +
    (currentVehicle.cabinFilter?.price || 0);

  const bundlePrice = totalIndividualPrice * (1 - currentVehicle.bundleDiscountPercent / 100);

  const handleApplyFilter = (searchTerm?: string) => {
    const query = searchTerm || currentVehicle.name.split(" ")[0]; // e.g. Toyota or Isuzu or BYD
    onSelectFilterCriteria(query, "filter");
    onClose();
  };

  const filteredVehicleList =
    activeCategoryTab === "all"
      ? VEHICLE_FILTER_SETS
      : VEHICLE_FILTER_SETS.filter((v) => v.category === activeCategoryTab);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10 my-8"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/10 bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-lg shadow-inner">
                  🫁
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>ຕົວຊ່ວຍເລືອກໝໍ້ຕອງຕາມລຸ້ນລົດ (Maintenance Filter Finder)</span>
                    <span className="text-[10px] uppercase tracking-wider bg-teal-600 text-white font-bold px-2 py-0.5 rounded-full">
                      100% Exact Match
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ເລືອກລຸ້ນລົດຂອງທ່ານ ລະບົບຈະສະແດງລະຫັດ OEM ແລະ ຊຸດກອງແທ້ທີ່ກົງຮຸ່ນ 100%
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto scrollbar-thin">
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2">
                {[
                  { id: "all", label: "✨ ທຸກປະເພດລົດ" },
                  { id: "pickup", label: "🛻 ລົດກະບະ & SUV (Pickups)" },
                  { id: "forklift", label: "🚜 ລົດຍົກ (Forklifts)" },
                  { id: "ev", label: "⚡ ລົດໄຟຟ້າ (EVs)" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategoryTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeCategoryTab === tab.id
                        ? "bg-teal-600 text-white shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* STEP 1: Vehicle Selector Grid */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-black">1</span>
                  <span>ກົດເລືອກລຸ້ນລົດຂອງທ່ານ (Select Your Vehicle Model):</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {filteredVehicleList.map((vehicle) => {
                    const isSelected = selectedVehicleId === vehicle.id;
                    return (
                      <button
                        key={vehicle.id}
                        onClick={() => setSelectedVehicleId(vehicle.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                          isSelected
                            ? "bg-teal-500/10 border-teal-500 text-slate-900 dark:text-white shadow-md ring-2 ring-teal-500/30"
                            : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{vehicle.icon}</span>
                            <span className="font-bold text-xs truncate max-w-[170px]">{vehicle.name}</span>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 truncate">
                          {vehicle.engine}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Recommended Maintenance Filter Pack Display */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-teal-500/30 shadow-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-teal-400" />
                      <span className="text-sm font-black text-teal-400">
                        ຊຸດໝໍ້ຕອງບຳລຸງຮັກສາສຳລັບ: {currentVehicle.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      ເຄື່ອງຈັກ: <span className="text-slate-300 font-semibold">{currentVehicle.engine}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-teal-500/20 border border-teal-500/30 px-3 py-1 rounded-xl text-right">
                    <span className="text-[10px] text-teal-300 uppercase font-bold">ຊື້ຍົກຊຸດຫຼຸດ {currentVehicle.bundleDiscountPercent}%:</span>
                    <span className="text-sm font-black text-emerald-400">${bundlePrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* 4 Filters Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 1. Oil Filter */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1 relative hover:border-teal-500/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                        <span>🛢️ 1. ຕອງນ້ຳມັນເຄື່ອງ (Engine Oil Filter)</span>
                      </span>
                      <span className="text-xs font-black text-emerald-400">${currentVehicle.oilFilter.price.toFixed(2)}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded w-fit">
                      OEM: {currentVehicle.oilFilter.oem}
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight">
                      {currentVehicle.oilFilter.desc}
                    </div>
                  </div>

                  {/* 2. Air Filter */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1 relative hover:border-teal-500/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                        <span>💨 2. ຕອງອາກາດ (Engine Air Filter)</span>
                      </span>
                      <span className="text-xs font-black text-emerald-400">${currentVehicle.airFilter.price.toFixed(2)}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded w-fit">
                      OEM: {currentVehicle.airFilter.oem}
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight">
                      {currentVehicle.airFilter.desc}
                    </div>
                  </div>

                  {/* 3. Fuel Filter */}
                  {currentVehicle.fuelFilter && (
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1 relative hover:border-teal-500/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                          <span>⛽ 3. ຕອງໂຊລ່າແຍກນ້ຳ (Fuel / Diesel Filter)</span>
                        </span>
                        <span className="text-xs font-black text-emerald-400">${currentVehicle.fuelFilter.price.toFixed(2)}</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded w-fit">
                        OEM: {currentVehicle.fuelFilter.oem}
                      </div>
                      <div className="text-[10px] text-slate-400 leading-tight">
                        {currentVehicle.fuelFilter.desc}
                      </div>
                    </div>
                  )}

                  {/* 4. Cabin Filter */}
                  {currentVehicle.cabinFilter && (
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1 relative hover:border-teal-500/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                          <span>❄️ 4. ຕອງແອ HEPA / ໄຮໂດຣລິກ (Cabin / Return Filter)</span>
                        </span>
                        <span className="text-xs font-black text-emerald-400">${currentVehicle.cabinFilter.price.toFixed(2)}</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded w-fit">
                        OEM: {currentVehicle.cabinFilter.oem}
                      </div>
                      <div className="text-[10px] text-slate-400 leading-tight">
                        {currentVehicle.cabinFilter.desc}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50">
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-500 shrink-0" />
                <span>ຮັບປະກັນສິນຄ້າແທ້ OEM 100% ໃສ່ບໍ່ພໍດີຍິນດີປ່ຽນຄືນ</span>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="rounded-xl h-10 text-xs font-bold"
                >
                  ຍົກເລີກ
                </Button>
                <Button
                  onClick={() => handleApplyFilter()}
                  className="rounded-xl h-10 text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-500/25 flex items-center gap-2"
                >
                  <span>ເບິ່ງຊຸດໝໍ້ຕອງສຳລັບລົດຄັນນີ້</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
