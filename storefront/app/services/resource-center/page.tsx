"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, CheckCircle2, ChevronRight, BookOpen, Calculator, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResourceCenterPage({ params: { locale } }: { params: { locale: string } }) {
  const isLo = locale === "lo";
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  const resources = [
    {
      id: "checklist-pm",
      titleLo: "Checklist: 30 ຈຸດກວດເຊັກລົດຟອກລີບປະຈຳວັນ",
      titleEn: "Checklist: 30-Point Daily Forklift Inspection",
      typeLo: "ເອກະສານ (PDF)",
      typeEn: "Document (PDF)",
      icon: FileText,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      id: "whitepaper-tco",
      titleLo: "Whitepaper: ວິທີຄຳນວນ TCO ໃຫ້ຄຸ້ມຄ່າທີ່ສຸດ",
      titleEn: "Whitepaper: How to Calculate TCO Effectively",
      typeLo: "ບົດຄວາມວິຊາການ (PDF)",
      typeEn: "Whitepaper (PDF)",
      icon: BookOpen,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
      id: "calc-space",
      titleLo: "Masterclass: ຍຸດທະສາດການເພີ່ມພື້ນທີ່ສາງ 30%",
      titleEn: "Masterclass: Space Optimization Strategies (+30%)",
      typeLo: "ວິດີໂອ + ເອກະສານ",
      typeEn: "Video + Document",
      icon: Calculator,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-100 dark:bg-rose-900/30"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16 relative overflow-hidden">
      
      {/* Animated Glowing Background Mesh */}
      <div className="absolute top-0 left-0 w-full h-[500px] overflow-hidden -z-10 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-100/80 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold mb-6 border border-indigo-200 dark:border-indigo-800 backdrop-blur-sm shadow-sm"
          >
            <Sparkles className="w-5 h-5" />
            <span>{isLo ? "RESOURCE CENTER | ແຫຼ່ງຄວາມຮູ້ B2B" : "RESOURCE CENTER | B2B Knowledge Hub"}</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            {isLo ? "Know-How " : "Know-How "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              as a Service
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            {isLo 
              ? "ດາວໂຫຼດເອກະສານ, Checklist ແລະ Whitepaper ທີ່ຊ່ວຍໃຫ້ທ່ານບໍລິຫານຈັດການສາງສິນຄ້າ ແລະ ລົດຟອກລີບໄດ້ຢ່າງມີປະສິດທິພາບສູງສຸດ." 
              : "Download checklists, whitepapers, and guides to help you optimize your warehouse and forklift fleet operations."}
          </motion.p>
        </div>

        {/* Lead Gen Form + Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-800/50 sticky top-24 relative overflow-hidden group">
              
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white relative z-10">
                {isLo ? "ລົງທະບຽນດາວໂຫຼດຟຣີ!" : "Register to Download Free!"}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 relative z-10">
                {isLo ? "ກະລຸນາປ້ອນອີເມວອົງກອນຂອງທ່ານ ເພື່ອຮັບລິ້ງດາວໂຫຼດເອກະສານທັງໝົດທັນທີ." : "Enter your corporate email to instantly receive download links for all resources."}
              </p>
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit} 
                    className="space-y-4 relative z-10"
                  >
                    <div>
                      <Input 
                        type="email" 
                        placeholder={isLo ? "ອີເມວອົງກອນ (Corporate Email)" : "Corporate Email"} 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-14 rounded-xl text-lg focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition-all shadow-inner"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white h-14 font-bold text-lg rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:shadow-[0_0_25px_rgba(79,70,229,0.6)] transition-all hover:-translate-y-1">
                      {isLo ? "ຮັບລິ້ງດາວໂຫຼດ" : "Get Download Links"}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-8 text-center relative z-10 shadow-lg"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 drop-shadow-md" />
                    </motion.div>
                    <h4 className="font-bold text-xl text-emerald-900 dark:text-emerald-300 mb-2">
                      {isLo ? "ສຳເລັດແລ້ວ!" : "Success!"}
                    </h4>
                    <p className="text-emerald-700 dark:text-emerald-400 text-sm">
                      {isLo ? "ກະລຸນາກວດສອບອີເມວຂອງທ່ານສຳລັບລິ້ງດາວໂຫຼດ." : "Please check your email for the download links."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Resources List */}
          <div className="lg:col-span-2 space-y-5">
            {resources.map((resource, idx) => (
              <motion.div 
                key={resource.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (idx * 0.1) }}
                className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 group hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 cursor-pointer"
              >
                <div className={`p-4 rounded-xl ${resource.bg} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <resource.icon className={`w-8 h-8 ${resource.color}`} />
                </div>
                <div className="flex-grow">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    {isLo ? resource.typeLo : resource.typeEn}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {isLo ? resource.titleLo : resource.titleEn}
                  </h4>
                </div>
                <Button 
                  variant={submitted ? "default" : "outline"} 
                  className={`shrink-0 w-full sm:w-auto rounded-xl transition-all ${submitted ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1" : "opacity-70 group-hover:opacity-100"}`} 
                  disabled={!submitted}
                >
                  {isLo ? "ດາວໂຫຼດ" : "Download"}
                  <Download className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
