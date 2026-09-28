import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, ShieldCheck, Activity, Wrench, 
  TrendingDown, AlertCircle, CheckCircle2, Clock,
  BatteryCharging, MapPin, Download, PhoneCall,
  Sparkles, FileText, ChevronRight, Gauge, HelpCircle
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { Button } from "@/components/Forklift/ui/button";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Mock Data for Charts
const trendData = [
  { month: "Jan", cost: 14500000 },
  { month: "Feb", cost: 13200000 },
  { month: "Mar", cost: 12800000 },
  { month: "Apr", cost: 10500000 },
  { month: "May", cost: 9200000 },
  { month: "Jun", cost: 7800000 }, // Steady drop via EP Lithium Fleet transition
];

const fleetData = [
  { name: "EP Li-Ion Forklift", value: 14, color: "#10b981" },
  { name: "Heavy Diesel 5-10T", value: 6, color: "#3b82f6" },
  { name: "Reach Truck 12.5M", value: 4, color: "#f59e0b" },
];

interface MachineUnit {
  id: string;
  model: string;
  brand: string;
  type: string;
  location: string;
  locationLo: string;
  hourMeter: number;
  batteryHealth?: number;
  pmStatus: "good" | "due_soon" | "overdue";
  nextPmHours: number;
}

const FLEET_UNITS: MachineUnit[] = [
  {
    id: "FL-EP-01",
    model: "CPD25L1S 2.5T Lithium",
    brand: "EP Equipment",
    type: "Electric Li-Ion",
    location: "Vientiane Central Warehouse",
    locationLo: "ສາງສູນກາງ ວຽງຈັນ (KM 14)",
    hourMeter: 1240,
    batteryHealth: 98,
    pmStatus: "good",
    nextPmHours: 260
  },
  {
    id: "FL-EP-02",
    model: "CPD30L2 3.0T Heavy EV",
    brand: "EP Equipment",
    type: "Electric Li-Ion",
    location: "Savan-Seno SEZ Facility",
    locationLo: "ເຂດເສດຖະກິດພິເສດ ສະຫວັນ-ເຊໂນ",
    hourMeter: 2180,
    batteryHealth: 95,
    pmStatus: "due_soon",
    nextPmHours: 20
  },
  {
    id: "FL-EP-03",
    model: "CQD20RVF 2.0T Reach Truck",
    brand: "EP Equipment",
    type: "High-Rack Reach Truck",
    location: "Beerlao Logistics Hub",
    locationLo: "ສາງເບຍລາວ ນະຄອນຫຼວງ",
    hourMeter: 890,
    batteryHealth: 99,
    pmStatus: "good",
    nextPmHours: 360
  },
  {
    id: "FL-DS-04",
    model: "FD35T 3.5T Rugged Diesel",
    brand: "DK Heavy",
    type: "IC Heavy Duty",
    location: "Sepon Copper/Gold Mine",
    locationLo: "ບໍ່ຄຳ/ທອງ ເຊໂປນ (Sepon)",
    hourMeter: 4820,
    pmStatus: "good",
    nextPmHours: 180
  },
  {
    id: "FL-DS-05",
    model: "FD50T 5.0T Industrial Diesel",
    brand: "DK Heavy",
    type: "IC Heavy Duty",
    location: "Sepon Heavy Crushing Station",
    locationLo: "ສະຖານີໂມ້ຫີນ ເຊໂປນ",
    hourMeter: 5120,
    pmStatus: "due_soon",
    nextPmHours: 15
  },
  {
    id: "FL-EP-06",
    model: "EPT20-15ET2 Pallet Mover",
    brand: "EP Equipment",
    type: "Electric Walkie",
    location: "Betagro Agro Farm",
    locationLo: "ຟາມລ້ຽງສັດ ເບທາໂກຣ",
    hourMeter: 430,
    batteryHealth: 100,
    pmStatus: "good",
    nextPmHours: 570
  }
];

export default function ClientDashboardPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "lo";
  const isLo = locale === "lo";

  const [activeTab, setActiveTab] = useState<"fleet" | "telemetry" | "pm">("fleet");
  const [filterType, setFilterType] = useState<string>("all");

  const formatCurrency = (value: number) => `₭ ${(value / 1000000).toFixed(1)}M`;

  const filteredUnits = FLEET_UNITS.filter(unit => {
    if (filterType === "all") return true;
    if (filterType === "ev") return unit.type.includes("Electric");
    if (filterType === "diesel") return unit.type.includes("Heavy Duty");
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Human Assurance */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Link href={`/${locale}`} className="hover:text-emerald-600 transition-colors">
              {isLo ? "ໜ້າຫຼັກ" : "Home"}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/services`} className="hover:text-emerald-600 transition-colors">
              {isLo ? "ສູນບໍລິການ 4S" : "4S Services"}
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-semibold">
              {isLo ? "ສູນຄຸ້ມຄອງກອງກົນຈັກລູກຄ້າອົງກອນ" : "Fleet Telemetry Hub"}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            {isLo ? "ລະບົບເຊື່ອມຕໍ່ສົດກັບກອງລົດສັນຍາເຊົ່າ/ຊື້ (Live Sync 10s)" : "Telemetry Live Sync (10s Interval)"}
          </div>
        </div>

        {/* Corporate Client Header Banner */}
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-2xl shadow-md shadow-emerald-500/20">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    SEPON MINING & PHU BIA LOGISTICS
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    VIP 4S Tier 1
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-0.5">
                  {isLo 
                    ? "ສັນຍາເຊົ່າລວມບຳລຸງຮັກສາຄົບວົງຈອນ (Full Comprehensive Rental Contract) • ລະຫັດອົງກອນ: SEPON-001" 
                    : "Full Comprehensive Fleet Contract • Account ID: SEPON-001"}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                {isLo ? "ຮັບປະກັນຊ່າງສຸກເສີນເຖິງໜ້າງານພາຍໃນ 2 ຊົ່ວໂມງ" : "2-Hour Emergency SLA Guaranteed"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-teal-500" />
                {isLo ? "ສູນຊ່າງປະຈຳການ: DK LAO ວຽງຈັນ & ສາຂາພາກໃຕ້" : "Dedicated Workshop: Vientiane & Southern Hub"}
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <a
              href="https://wa.me/8562058929299?text=Urgent%20Forklift%20Service%20Request%20for%20SEPON-001"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-emerald inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20"
            >
              <Wrench className="w-4 h-4" />
              {isLo ? "ຮຽກຊ່າງສຸກເສີນ (DKwick Dispatch)" : "Request Emergency Dispatch"}
            </a>
            <a
              href="tel:+8562058929299"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 text-sm font-semibold transition-all"
            >
              <PhoneCall className="w-4 h-4 text-emerald-500" />
              +856 20 5892 9299
            </a>
          </div>
        </div>

        {/* 4 Key Fleet Telemetry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 16 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            className="glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isLo ? "ຈຳນວນກົນຈັກທັງໝົດ" : "Active Fleet"}
              </h3>
              <div className="w-10 h-10 rounded-2xl bg-blue-500/15 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">24 {isLo ? "ຄັນ" : "Units"}</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 
              {isLo ? "100% ພ້ອມປະຕິບັດງານ (0 ເສຍ/ຈອດ)" : "100% Operational Ready"}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 16 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }} 
            className="glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isLo ? "ຄວາມພ້ອມໃຊ້ງານກອງລົດ (Uptime)" : "Fleet Uptime"}
              </h3>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">99.2%</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5 rotate-180" /> 
              {isLo ? "ສູງກວ່າມາດຕະຖານສັນຍາ SLA (98%)" : "+1.2% Above SLA Target (98%)"}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 16 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }} 
            className="glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isLo ? "ແຜນ PM 30 ຈຸດ ສຳເລັດແລ້ວ" : "Preventive Maintenance"}
              </h3>
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Wrench className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">18 {isLo ? "ຮອບ" : "Runs"}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> 
              {isLo ? "ຮອບຖັດໄປໃນ 15 ຊົ່ວໂມງແລ່ນ" : "Next PM cycle in 15 operating hours"}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 16 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }} 
            className="glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl -mr-6 -mt-6" />
            <div className="flex items-center justify-between mb-3 relative z-10">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isLo ? "ປະຢັດຕົ້ນທຶນນ້ຳມັນສະສົມ" : "YTD Fuel Cost Saved"}
              </h3>
              <div className="w-10 h-10 rounded-2xl bg-teal-500/15 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <TrendingDown className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 relative z-10">₭ 45.2M</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium relative z-10">
              {isLo ? "ຜົນຈາກການປ່ຽນມາໃຊ້ EP Lithium EV 14 ຄັນ" : "Saved via transition to 14 EP Li-Ion Units"}
            </div>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Trend Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.45 }} 
            className="lg:col-span-2 glass-card p-6 md:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-emerald-500" />
                  {isLo ? "ແນວໂນ້ມຄ່າໃຊ້ຈ່າຍບຳລຸງຮັກສາ 6 ເດືອນຜ່ານມາ" : "Fleet Maintenance Cost Trend (Last 6 Months)"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {isLo ? "ຄ່າໃຊ້ຈ່າຍຫຼຸດລົງຢ່າງຕໍ່ເນື່ອງຈາກການບຳລຸງຮັກສາເຊີງປ້ອງກັນ (PM) ໂດຍ DK LAO" : "Steady reduction achieved through rigorous preventive scheduling and Li-Ion zero-battery-maintenance."}
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                -46% Expense
              </span>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tickFormatter={formatCurrency} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <RechartsTooltip 
                    formatter={(value: any) => [`₭ ${(Number(value)).toLocaleString()}`, isLo ? "ຄ່າໃຊ້ຈ່າຍບຳລຸງຮັກສາ" : "Maintenance Cost"]}
                    contentStyle={{ 
                      borderRadius: '16px', 
                      backgroundColor: '#0f172a',
                      borderColor: '#1e293b',
                      color: '#fff',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.3)' 
                    }}
                  />
                  <Area type="monotone" dataKey="cost" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCost)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Breakdown Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.5 }} 
            className="glass-card p-6 md:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {isLo ? "ສັດສ່ວນປະເພດກົນຈັກໃນກອງ" : "Fleet Composition"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                {isLo ? "ສັດສ່ວນກົນຈັກໄຟຟ້າ EP Lithium 58% ຂອງທັງໝົດ" : "58% converted to zero-emission EP Lithium power."}
              </p>
            </div>

            <div className="h-[220px] w-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fleetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={6}
                    dataKey="value"
                    stroke="none"
                  >
                    {fleetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      backgroundColor: '#0f172a',
                      borderColor: '#1e293b',
                      color: '#fff' 
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-500">{isLo ? "ມາດຕະຖານສິ່ງແວດລ້ອມ ESG:" : "ESG Compliance:"}</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Class A Zero-Emission</span>
            </div>
          </motion.div>
        </div>

        {/* Fleet Machinery Telemetry List Table */}
        <div className="glass-card rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8 border-b border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Gauge className="w-5 h-5 text-emerald-500" />
                {isLo ? "ຕາຕະລາງລາຍລະອຽດສະຖານະກົນຈັກລາຍຄັນ" : "Individual Machinery Telemetry & PM Schedule"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isLo ? "ກວດສອບຊົ່ວໂມງແລ່ນ, ສຸຂະພາບແບັດເຕີຣີ Lithium, ແລະ ຈຸດປະຈຳການ" : "Real-time hour meters, battery health metrics, and facility assignment."}
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setFilterType("all")} 
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  filterType === "all" ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300"
                }`}
              >
                {isLo ? "ທັງໝົດ (24)" : "All (24)"}
              </button>
              <button 
                onClick={() => setFilterType("ev")} 
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  filterType === "ev" ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300"
                }`}
              >
                {isLo ? "ລົດໄຟຟ້າ Lithium" : "Electric Li-Ion"}
              </button>
              <button 
                onClick={() => setFilterType("diesel")} 
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  filterType === "diesel" ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300"
                }`}
              >
                {isLo ? "ລົດນ້ຳມັນ Heavy" : "Heavy IC"}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">{isLo ? "ລະຫັດກົນຈັກ" : "Unit ID"}</th>
                  <th className="px-6 py-4 font-semibold">{isLo ? "ລຸ້ນ & ຍີ່ຫໍ້" : "Model & Brand"}</th>
                  <th className="px-6 py-4 font-semibold">{isLo ? "ຈຸດປະຈຳການ" : "Operating Location"}</th>
                  <th className="px-6 py-4 font-semibold">{isLo ? "ຊົ່ວໂມງແລ່ນ (Hours)" : "Hour Meter"}</th>
                  <th className="px-6 py-4 font-semibold">{isLo ? "ສຸຂະພາບແບັດ/ເຄື່ອງ" : "Health / Battery"}</th>
                  <th className="px-6 py-4 font-semibold">{isLo ? "ຮອບ PM ຖັດໄປ" : "PM Status"}</th>
                  <th className="px-6 py-4 font-semibold text-right">{isLo ? "ປະຕິບັດ" : "Action"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm">
                {filteredUnits.map((unit) => (
                  <tr key={unit.id} className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-white">
                      {unit.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 dark:text-white">{unit.model}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{unit.brand} • {unit.type}</div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{isLo ? unit.locationLo : unit.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-900 dark:text-white font-medium">
                      {unit.hourMeter.toLocaleString()} hrs
                    </td>
                    <td className="px-6 py-4">
                      {unit.batteryHealth ? (
                        <div className="flex items-center gap-2">
                          <BatteryCharging className="w-4 h-4 text-emerald-500" />
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{unit.batteryHealth}% SOH</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isLo ? "ປົກກະຕິ (Diesel Engine)" : "Engine Nominal"}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {unit.pmStatus === "good" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          {isLo ? `ອີກ ${unit.nextPmHours} hrs` : `In ${unit.nextPmHours} hrs`}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                          <Clock className="w-3 h-3" />
                          {isLo ? `ຮອບດ່ວນ: ອີກ ${unit.nextPmHours} hrs` : `Due in ${unit.nextPmHours} hrs`}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={`https://wa.me/8562058929299?text=Schedule%20PM%20Service%20for%20Unit%20${unit.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 hover:underline"
                      >
                        {isLo ? "ນັດໝາຍຊ່າງ" : "Book PM"}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Human Support & Workshop Certification Pledge Card */}
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold">
                {isLo ? "ໃບຢັ້ງຢືນມາດຕະຖານການບຳລຸງຮັກສາ (PM Safety & Audit Certificate)" : "Official PM Safety & Maintenance Certification"}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
                {isLo 
                  ? "ດາວໂຫຼດໃບລາຍງານຜົນການກວດເຊັກ 30 ຈຸດ ເພື່ອຍື່ນກວດສອບມາດຕະຖານຄວາມປອດໄພຂອງໂຮງງານ (ISO 9001 / Mining Safety Audit)"
                  : "Download 30-point inspection compliance reports for ISO 9001, mining safety, and insurance audits."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => alert(isLo ? "ກຳລັງດາວໂຫຼດໃບຢັ້ງຢືນ PM Audit Report (PDF)..." : "Downloading PM Audit Report (PDF)...")}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs md:text-sm font-bold inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              {isLo ? "ດາວໂຫຼດລາຍງານ (PDF)" : "Download Audit PDF"}
            </button>
            <Link
              href={`/${locale}/contact`}
              className="btn-emerald px-5 py-3 rounded-xl text-xs md:text-sm font-bold inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              {isLo ? "ຕິດຕໍ່ວິສະວະກອນ" : "Contact Engineer"}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
