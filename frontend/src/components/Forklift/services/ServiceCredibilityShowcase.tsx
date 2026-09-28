import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, CheckCircle2, Clock, Users, Wrench } from "lucide-react";

export const ServiceCredibilityShowcase = ({ isLo }: { isLo: boolean }) => {
  const metrics = [
    {
      id: "years",
      icon: Award,
      value: "10+",
      label: isLo ? "ປີແຫ່ງປະສົບການ" : "Years of Experience",
      desc: isLo ? "ຊ່ຽວຊານດ້ານອຸດສາຫະກຳ" : "Industry Expertise"
    },
    {
      id: "units",
      icon: Wrench,
      value: "500+",
      label: isLo ? "ເຄື່ອງຈັກທີ່ດູແລ" : "Machines Maintained",
      desc: isLo ? "ທົ່ວປະເທດລາວ" : "Across Lao PDR"
    },
    {
      id: "parts",
      icon: ShieldCheck,
      value: "100%",
      label: isLo ? "ອາໄຫຼ່ແທ້" : "Genuine Parts",
      desc: isLo ? "ຮັບປະກັນຄຸນນະພາບ" : "Quality Guaranteed"
    },
    {
      id: "uptime",
      icon: Clock,
      value: "24/7",
      label: isLo ? "ບໍລິການສຸກເສີນ" : "Emergency Support",
      desc: isLo ? "ພ້ອມແກ້ໄຂບັນຫາສະເໝີ" : "Always Ready"
    }
  ];

  const certifications = [
    {
      id: "iso9001",
      name: "ISO 9001:2015",
      desc: isLo ? "ລະບົບຄຸ້ມຄອງຄຸນນະພາບມາດຕະຖານສາກົນ" : "Quality Management System"
    },
    {
      id: "iso45001",
      name: "ISO 45001:2018",
      desc: isLo ? "ມາດຕະຖານຄວາມປອດໄພ ແລະ ອາຊີວະອະນາໄມ" : "Occupational Health & Safety"
    }
  ];

  return (
    <div className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold mb-4">
            <ShieldCheck className="w-5 h-5" />
            <span>{isLo ? "ຄວາມໜ້າເຊື່ອຖືລະດັບອົງກອນ" : "ENTERPRISE CREDIBILITY"}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            {isLo ? "ມາດຕະຖານທີ່ທຸລະກິດຊັ້ນນຳໄວ້ວາງໃຈ" : "Standards Trusted by Industry Leaders"}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {isLo 
              ? "ພວກເຮົາຢຶດໝັ້ນໃນຄຸນນະພາບ, ຄວາມປອດໄພ ແລະ ການບໍລິການທີ່ເປັນເລີດ ເພື່ອໃຫ້ທຸລະກິດຂອງທ່ານດຳເນີນໄປຢ່າງບໍ່ສະດຸດ" 
              : "We are committed to quality, safety, and operational excellence to keep your business running smoothly."}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div 
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800"
              >
                <div className="w-14 h-14 mx-auto bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                  {metric.value}
                </div>
                <div className="font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {metric.label}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {metric.desc}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications Row */}
        <div className="bg-slate-900 dark:bg-black rounded-3xl p-8 md:p-12 relative overflow-hidden text-center md:text-left">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {isLo ? "ຮັບຮອງມາດຕະຖານສາກົນ ISO" : "ISO International Certifications"}
              </h3>
              <p className="text-slate-400 text-lg">
                {isLo 
                  ? "ຮັບປະກັນຄຸນນະພາບການບໍລິການ ແລະ ມາດຕະຖານຄວາມປອດໄພລະດັບສູງສຸດ ສຳລັບທຸກໂຄງການອຸດສາຫະກຳ" 
                  : "Ensuring the highest standards of service quality and occupational safety for all industrial projects."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 shrink-0">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-center gap-4 bg-slate-800/50 border border-slate-700 rounded-2xl p-5 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{cert.name}</div>
                    <div className="text-sm text-slate-400">{cert.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
