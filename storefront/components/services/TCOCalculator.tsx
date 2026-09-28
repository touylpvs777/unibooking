"use client";
import React, { useState, useEffect } from "react";
import { Calculator, TrendingDown, TrendingUp, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import { ClickToReveal } from "@/components/ui/ClickToReveal";

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (val) => setDisplayValue(Math.round(val)),
    });
    return controls.stop;
  }, [value]);

  const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "LAK", maximumFractionDigits: 0 }).format(displayValue);
  return <span>{formatted}</span>;
}

export const TCOCalculator = ({ isLo }: { isLo: boolean }) => {
  const [forkliftPrice, setForkliftPrice] = useState<number>(300000000); // 300M LAK
  const [years, setYears] = useState<number>(5);
  const [maintenanceYearly, setMaintenanceYearly] = useState<number>(20000000); // 20M LAK
  const [leaseMonthly, setLeaseMonthly] = useState<number>(6000000); // 6M LAK

  // Buy (CAPEX)
  const totalCapex = forkliftPrice + (maintenanceYearly * years);
  
  // Lease (OPEX)
  const totalOpex = leaseMonthly * 12 * years;
  
  const savings = totalCapex - totalOpex;

  const formatLAK = (val: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "LAK", maximumFractionDigits: 0 }).format(val);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50 my-12"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
          <Calculator className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            {isLo ? "TCO Calculator: ປຽບທຽບຊື້ vs ເຊົ່າ" : "TCO Calculator: Buy vs Lease"}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isLo ? "ປັບແຕ່ງຕົວເລກເພື່ອເບິ່ງຄວາມຄຸ້ມຄ່າຂອງການເຊົ່າລົດໃນໄລຍະຍາວ" : "Adjust the inputs to see the long-term benefits of leasing"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Inputs */}
        <div className="space-y-8">
          {/* Price Input */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {isLo ? "ລາຄາລົດຟອກລີບໃໝ່ (LAK)" : "New Forklift Price (LAK)"}
              </label>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{formatLAK(forkliftPrice)}</span>
            </div>
            <input 
              type="range" 
              min="100000000" 
              max="1000000000" 
              step="10000000"
              value={forkliftPrice} 
              onChange={(e) => setForkliftPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600 mb-3"
            />
          </div>

          {/* Years Input */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {isLo ? "ໄລຍະເວລາພິຈາລະນາ (ປີ)" : "Timeframe (Years)"}
              </label>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{years} {isLo ? "ປີ" : "Years"}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              step="1"
              value={years} 
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600 mb-3"
            />
          </div>

          {/* Maintenance Input */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {isLo ? "ຄ່າບຳລຸງຮັກສາ/ປີ (LAK)" : "Yearly Maintenance (LAK)"}
              </label>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{formatLAK(maintenanceYearly)}</span>
            </div>
            <input 
              type="range" 
              min="5000000" 
              max="50000000" 
              step="1000000"
              value={maintenanceYearly} 
              onChange={(e) => setMaintenanceYearly(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600 mb-3"
            />
          </div>

          {/* Lease Input */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {isLo ? "ຄ່າເຊົ່າລົດ/ເດືອນ (LAK)" : "Monthly Lease (LAK)"}
              </label>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{formatLAK(leaseMonthly)}</span>
            </div>
            <input 
              type="range" 
              min="2000000" 
              max="20000000" 
              step="500000"
              value={leaseMonthly} 
              onChange={(e) => setLeaseMonthly(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600 mb-3"
            />
          </div>
        </div>

        {/* Results */}
        <ClickToReveal 
          isLo={isLo} 
          buttonTextLo="ປົດລັອກຜົນການຄຳນວນ ROI" 
          buttonTextEn="Unlock ROI Calculation"
        >
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 flex flex-col justify-center border border-slate-200 dark:border-slate-700 shadow-inner relative overflow-hidden group h-full">
            <div className="absolute inset-0 bg-indigo-500/5 dark:bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"></div>
            
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-700">
                <span className="font-semibold text-slate-600 dark:text-slate-400">
                  {isLo ? "ຕົ້ນທຶນການຊື້ລົດ (CAPEX)" : "Buy (CAPEX) Total:"}
                </span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  <AnimatedNumber value={totalCapex} />
                </span>
              </div>
              
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-700">
                <span className="font-semibold text-slate-600 dark:text-slate-400">
                  {isLo ? "ຕົ້ນທຶນການເຊົ່າ (OPEX)" : "Lease (OPEX) Total:"}
                </span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  <AnimatedNumber value={totalOpex} />
                </span>
              </div>

              <motion.div 
                key={savings > 0 ? "save" : "loss"}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`p-6 rounded-2xl text-center shadow-lg transition-colors ${savings > 0 ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800" : "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800"}`}
              >
                <div className="text-sm font-bold uppercase tracking-wider mb-2">
                  {isLo 
                    ? (savings > 0 ? "ການເຊົ່າປະຢັດເງິນໃຫ້ທ່ານ" : "ການຊື້ປະຢັດເງິນໃຫ້ທ່ານ") 
                    : (savings > 0 ? "Leasing Saves You" : "Buying Saves You")}
                </div>
                <div className="text-4xl font-black flex items-center justify-center gap-2">
                  {savings > 0 ? <TrendingDown className="w-8 h-8" /> : <TrendingUp className="w-8 h-8" />}
                  <AnimatedNumber value={Math.abs(savings)} />
                </div>
              </motion.div>
            </div>
          </div>
        </ClickToReveal>
      </div>
    </motion.div>
  );
};
