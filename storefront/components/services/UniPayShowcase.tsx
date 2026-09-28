"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { WalletIcon, QrCodeIcon, MonitorSmartphoneIcon, TrendingUpIcon, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UniPayShowcase() {
  const t = useTranslations("UniPay");
  const [activeTab, setActiveTab] = useState<"wallet" | "qr" | "pos" | "analytics">("wallet");

  const tabs = [
    { id: "wallet", icon: WalletIcon, title: t("w_title"), desc: t("w_desc"), color: "emerald" },
    { id: "qr", icon: QrCodeIcon, title: t("qr_title"), desc: t("qr_desc"), color: "teal" },
    { id: "pos", icon: MonitorSmartphoneIcon, title: t("pos_title"), desc: t("pos_desc"), color: "blue" },
    { id: "analytics", icon: TrendingUpIcon, title: t("an_title"), desc: t("an_desc"), color: "indigo" },
  ] as const;

  return (
    <section className="relative w-full py-24 bg-white border-t border-border/50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald-400/10 to-teal-400/10 blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-400/10 to-emerald-400/10 blur-3xl"
        />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 font-semibold text-sm tracking-wide">
            {t.has("badge") ? t("badge") : "Next-Gen FinTech Ecosystem"}
          </div>
          <h2 className="text-4xl font-extrabold tracking-tighter sm:text-6xl text-slate-900 mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
              {t.has("title") ? t("title").split(" ")[0] : "UniPay+"}
            </span> {t.has("title") ? t("title").split(" ").slice(1).join(" ") : "Platform"}
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">{t("desc")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Tabs - Left Side */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-start gap-5 p-6 rounded-3xl transition-all text-left overflow-hidden ${
                    isActive 
                      ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] scale-[1.02]" 
                      : "bg-white/40 hover:bg-white/80 hover:shadow-md border border-slate-100 hover:scale-[1.01]"
                  }`}
                >
                  {/* Active Highlight Border */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabBorder"
                      className="absolute inset-0 border-2 border-emerald-500 rounded-3xl"
                    />
                  )}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent rounded-3xl pointer-events-none" />
                  )}

                  <div className={`relative z-10 p-4 rounded-2xl transition-colors duration-500 ${
                    isActive 
                      ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30" 
                      : "bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600"
                  }`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  
                  <div className="relative z-10 flex-1">
                    <h4 className={`text-xl font-bold mb-1 transition-colors duration-500 ${
                      isActive ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
                    }`}>
                      {tab.title}
                    </h4>
                    <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                      isActive ? "text-slate-600" : "text-slate-500"
                    }`}>
                      {tab.desc}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Phone Mockup - Right Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="relative w-[320px] h-[650px] bg-slate-900 rounded-[3.5rem] shadow-[0_0_50px_rgba(16,185,129,0.15)] border-[10px] border-slate-800 overflow-hidden flex flex-col">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[130px] h-[30px] bg-slate-800 rounded-b-2xl z-30 flex justify-center items-center gap-3">
                <div className="w-12 h-1.5 bg-black/50 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-emerald-500/30 rounded-full"></div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="w-full h-12 px-7 pt-3 flex justify-between items-center text-white text-xs font-semibold z-20 relative">
                <span>9:41</span>
                <div className="flex gap-2 items-center">
                  <div className="flex gap-0.5 items-end h-3">
                    <div className="w-0.5 h-1.5 bg-white rounded-sm"></div>
                    <div className="w-0.5 h-2 bg-white rounded-sm"></div>
                    <div className="w-0.5 h-2.5 bg-white rounded-sm"></div>
                    <div className="w-0.5 h-3 bg-white rounded-sm"></div>
                  </div>
                  <div className="w-4 h-3 bg-white rounded-sm relative">
                    <div className="absolute -right-1 top-1 w-1 h-1 bg-white rounded-r-sm"></div>
                  </div>
                </div>
              </div>

              {/* Dynamic Screen Content */}
              <div className="flex-1 relative overflow-hidden bg-white">
                <AnimatePresence mode="wait">
                  
                  {activeTab === "wallet" && (
                    <motion.div 
                      key="wallet"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="p-5 h-full flex flex-col"
                    >
                      <div className="relative bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-3xl p-6 shadow-xl mb-8 overflow-hidden">
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="relative z-10">
                          <p className="text-emerald-50 font-medium text-sm mb-2 opacity-80">{t.has("total_balance") ? t("total_balance") : "Total Balance"}</p>
                          <h2 className="text-3xl font-bold tracking-tight mb-6">₭ 12,540,000</h2>
                          <div className="flex justify-between items-center">
                            <p className="text-emerald-100 font-mono text-sm tracking-widest">•••• 8832</p>
                            <div className="flex -space-x-2">
                              <div className="w-6 h-6 rounded-full bg-white/20"></div>
                              <div className="w-6 h-6 rounded-full bg-white/40"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 flex items-center justify-center shadow-sm hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"><ArrowUpRight size={22}/></div>
                          <span className="text-xs font-semibold text-slate-600">{t.has("send") ? t("send") : "Send"}</span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm hover:bg-emerald-100 transition-colors cursor-pointer"><QrCodeIcon size={22}/></div>
                          <span className="text-xs font-semibold text-emerald-700">{t.has("scan") ? t("scan") : "Scan"}</span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 flex items-center justify-center shadow-sm hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"><ArrowDownRight size={22}/></div>
                          <span className="text-xs font-semibold text-slate-600">{t.has("receive") ? t("receive") : "Receive"}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 bg-slate-50 -mx-5 px-5 pt-6 rounded-t-3xl border-t border-slate-100">
                        <div className="flex justify-between items-center mb-5">
                          <h3 className="font-bold text-slate-800 text-lg">{t.has("recent") ? t("recent") : "Recent"}</h3>
                          <span className="text-emerald-600 text-xs font-semibold cursor-pointer">{t.has("see_all") ? t("see_all") : "See All"}</span>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-4">
                              <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><ArrowDownRight size={18}/></div>
                              <div><p className="text-sm font-bold text-slate-800">Phonesavanh</p><p className="text-xs text-slate-400">18:42, Today</p></div>
                            </div>
                            <span className="text-sm font-bold text-emerald-600">+₭ 350K</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-4">
                              <div className="w-11 h-11 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center"><ArrowUpRight size={18}/></div>
                              <div><p className="text-sm font-bold text-slate-800">EDL Bill</p><p className="text-xs text-slate-400">09:15, Yesterday</p></div>
                            </div>
                            <span className="text-sm font-bold text-slate-700">-₭ 120K</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "qr" && (
                    <motion.div 
                      key="qr"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="h-full bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/40 via-slate-900 to-slate-900"></div>
                      
                      <motion.div 
                        animate={{ boxShadow: ["0px 0px 0px 0px rgba(16,185,129,0)", "0px 0px 50px 10px rgba(16,185,129,0.3)", "0px 0px 0px 0px rgba(16,185,129,0)"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="z-20 w-56 h-56 border-2 border-emerald-500/50 rounded-3xl relative flex items-center justify-center bg-white/5 backdrop-blur-sm"
                      >
                        {/* Scanning Line */}
                        <motion.div 
                          animate={{ top: ["10%", "90%", "10%"] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                          className="absolute left-4 right-4 h-1 bg-emerald-400 shadow-[0_0_15px_#34d399] rounded-full z-30"
                        />
                        {/* Corner markers */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-3xl"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-3xl"></div>
                        
                        <QrCodeIcon className="w-20 h-20 text-white/20" />
                      </motion.div>
                      
                      <div className="z-20 mt-12 text-center">
                        <p className="text-white/80 font-medium mb-2 text-sm tracking-wide">{t.has("align_qr") ? t("align_qr") : "Align QR Code to scan"}</p>
                        <div className="inline-block px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-emerald-400 font-bold text-lg tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                          {t.has("lapnet_supported") ? t("lapnet_supported") : "LAPNet Supported"}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "pos" && (
                    <motion.div 
                      key="pos"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="p-5 h-full flex flex-col bg-slate-50"
                    >
                      <div className="flex justify-between items-center mb-6 pt-4">
                        <h3 className="font-bold text-slate-800 text-xl">{t.has("current_order") ? t("current_order") : "Current Order"}</h3>
                        <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-md">{t.has("table_12") ? t("table_12") : "Table 12"}</span>
                      </div>
                      
                      <div className="flex-1 bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col">
                        <div className="space-y-4 flex-1">
                          <div className="flex justify-between items-center group">
                            <div className="flex flex-col"><span className="text-slate-800 font-semibold">{t.has("product_1") ? t("product_1") : "Lao Coffee (x2)"}</span><span className="text-xs text-slate-400">{t.has("product_1_desc") ? t("product_1_desc") : "Ice, Less Sugar"}</span></div>
                            <span className="font-bold text-slate-900">₭ 50,000</span>
                          </div>
                          <div className="flex justify-between items-center group">
                            <div className="flex flex-col"><span className="text-slate-800 font-semibold">{t.has("product_2") ? t("product_2") : "Khao Piak Sen"}</span><span className="text-xs text-slate-400">{t.has("product_2_desc") ? t("product_2_desc") : "Pork, Extra Veg"}</span></div>
                            <span className="font-bold text-slate-900">₭ 35,000</span>
                          </div>
                          <div className="flex justify-between items-center group">
                            <div className="flex flex-col"><span className="text-slate-800 font-semibold">{t.has("product_3") ? t("product_3") : "Beer Lao Gold"}</span></div>
                            <span className="font-bold text-slate-900">₭ 20,000</span>
                          </div>
                        </div>
                        
                        <div className="border-t-2 border-dashed border-slate-200 pt-4 mt-6">
                          <div className="flex justify-between text-sm mb-2"><span className="text-slate-500 font-medium">{t.has("subtotal") ? t("subtotal") : "Subtotal"}</span><span className="font-bold text-slate-700">₭ 105,000</span></div>
                          <div className="flex justify-between text-xs mb-4"><span className="text-slate-400">{t.has("vat") ? t("vat") : "VAT (10%)"}</span><span className="text-slate-500">₭ 10,500</span></div>
                          
                          <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                            <span className="font-bold text-emerald-800">{t.has("total") ? t("total") : "Total"}</span>
                            <span className="font-bold text-emerald-600 text-2xl">₭ 115,500</span>
                          </div>
                        </div>
                      </div>
                      
                      <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl mt-5 shadow-lg active:scale-95 transition-all text-lg flex items-center justify-center gap-2">
                        <QrCodeIcon size={20} /> {t.has("checkout") ? t("checkout") : "Checkout"}
                      </button>
                    </motion.div>
                  )}

                  {activeTab === "analytics" && (
                    <motion.div 
                      key="analytics"
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(10px)" }}
                      transition={{ duration: 0.5 }}
                      className="p-5 h-full flex flex-col bg-slate-50"
                    >
                      <h3 className="font-bold text-slate-800 text-xl mb-5 pt-2">{t.has("store_perf") ? t("store_perf") : "Store Performance"}</h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-3"><TrendingUpIcon size={16}/></div>
                          <p className="text-xs text-slate-500 font-medium mb-1">{t.has("gross_revenue") ? t("gross_revenue") : "Gross Revenue"}</p>
                          <p className="font-bold text-slate-900 text-lg">₭ 4.2M</p>
                          <p className="text-xs font-bold text-emerald-500 mt-2">+12.5% <span className="text-slate-400 font-normal">{t.has("vs_yest") ? t("vs_yest") : "vs yest"}</span></p>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-3"><WalletIcon size={16}/></div>
                          <p className="text-xs text-slate-500 font-medium mb-1">{t.has("transactions") ? t("transactions") : "Transactions"}</p>
                          <p className="font-bold text-slate-900 text-lg">127</p>
                          <p className="text-xs font-bold text-emerald-500 mt-2">+8.3% <span className="text-slate-400 font-normal">{t.has("vs_yest") ? t("vs_yest") : "vs yest"}</span></p>
                        </div>
                      </div>
                      
                      <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                          <p className="text-sm font-bold text-slate-800">{t.has("sales_trend") ? t("sales_trend") : "Sales Trend"}</p>
                          <select className="text-xs border-none bg-slate-50 rounded-md py-1 px-2 text-slate-600 outline-none font-medium">
                            <option>{t.has("today") ? t("today") : "Today"}</option>
                            <option>{t.has("week") ? t("week") : "Week"}</option>
                          </select>
                        </div>
                        
                        <div className="flex-1 relative flex items-end">
                          {/* Animated Chart Bars */}
                          <div className="w-full h-full flex justify-between items-end px-2 pb-2 gap-2">
                            {[30, 50, 80, 60, 100, 40, 20].map((height, i) => (
                              <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                                className="w-full bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t-md relative group"
                              >
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] py-1 px-2 rounded pointer-events-none">
                                  {height}k
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between mt-3 text-[10px] text-slate-400 font-medium px-2">
                          <span>8A</span><span>10A</span><span>12P</span><span>2P</span><span>4P</span><span>6P</span><span>8P</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-300 rounded-full z-40 pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
