import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Send,
  PhoneCall,
  Building2,
  MapPin,
  Truck,
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Repeat,
  Wrench,
  Cog,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { useBookingContext } from "./BookingContext";

export const ServiceBookingForm = ({ isLo }: { isLo: boolean }) => {
  const {
    companyName,
    setCompanyName,
    phone,
    setPhone,
    province,
    setProvince,
    brand,
    setBrand,
    urgency,
    setUrgency,
    issueDetails,
    setIssueDetails,
    handleBookingSubmit,
  } = useBookingContext();

  const provinces = [
    { id: "vientiane", name: "ນະຄອນຫຼວງວຽງຈັນ (Vientiane Capital)" },
    { id: "vientiane_prov", name: "ແຂວງ ວຽງຈັນ (Vientiane Province)" },
    { id: "luangprabang", name: "ແຂວງ ຫຼວງພະບາງ (Luang Prabang)" },
    { id: "savannakhet", name: "ແຂວງ ສະຫວັນນະເຂດ (Savannakhet)" },
    { id: "champasak", name: "ແຂວງ ຈຳປາສັກ (Champasak)" },
    { id: "khammouane", name: "ແຂວງ ຄຳມ່ວນ (Khammouane)" },
    { id: "bolikhamxay", name: "ແຂວງ ບໍລິຄຳໄຊ (Bolikhamxay)" },
    { id: "bokeo", name: "ແຂວງ ບໍ່ແກ້ວ (Bokeo / Golden Triangle)" },
    { id: "luangnamtha", name: "ແຂວງ ຫຼວງນ້ຳທາ (Luang Namtha)" },
    { id: "oudomxay", name: "ແຂວງ ອຸດົມໄຊ (Oudomxay)" },
    { id: "phongsaly", name: "ແຂວງ ຜົ້ງສາລີ (Phongsaly)" },
    { id: "xayabury", name: "ແຂວງ ໄຊຍະບູລີ (Xayabury)" },
    { id: "xiengkhouang", name: "ແຂວງ ຊຽງຂວາງ (Xiengkhouang)" },
    { id: "houaphanh", name: "ແຂວງ ຫົວພັນ (Houaphanh)" },
    { id: "saravane", name: "ແຂວງ ສາລະວັນ (Saravane)" },
    { id: "sekong", name: "ແຂວງ ເຊກອງ (Sekong)" },
    { id: "attapeu", name: "ແຂວງ ອັດຕະປື (Attapeu)" },
    { id: "xaisomboun", name: "ແຂວງ ໄຊສົມບູນ (Xaisomboun)" },
  ];

  const brands = [
    "Mitsubishi Forklift Trucks",
    "Jungheinrich",
    "Toyota Material Handling",
    "Heli Forklift",
    "Komatsu",
    "Nilfisk Industrial Cleaning",
    "JLG Access Equipment",
    "LPI Racking Systems",
    "Other / ຍີ່ຫໍ້ອື່ນໆ",
  ];

  const urgencyOptions = [
    {
      id: "sale_inquiry",
      icon: ShoppingCart,
      titleLo: "1. ຊື້ລົດຟອກລີບ (Sale)",
      titleEn: "1. Forklift Sales",
      subLo: "ລົດໃໝ່/ມືສອງຍີ່ປຸ່ນ ຮັບປະກັນສູນ",
      subEn: "New & Certified Pre-Owned Units",
      color: "blue",
    },
    {
      id: "rental_b2b",
      icon: Repeat,
      titleLo: "2. ເຊົ່າກອງລົດ 0-CAPEX (Rental)",
      titleEn: "2. 0-CAPEX Fleet Lease",
      subLo: "ເຊົ່າ B2B 1-5 ປີ ລວມລົດສຳຮອງ",
      subEn: "1-5 Year Operating Lease + Standby",
      color: "indigo",
    },
    {
      id: "standard",
      icon: Wrench,
      titleLo: "3. ສ້ອມແປງ & PM (Service)",
      titleEn: "3. Mobile Service & PM",
      subLo: "DKwick 2-4h ລົງໄຊທ໌ດ່ວນ / ກວດ 24 ຈຸດ",
      subEn: "2-4h Rapid Dispatch & PM Checklist",
      color: "emerald",
    },
    {
      id: "spare_parts",
      icon: Cog,
      titleLo: "4. ອາໄຫຼ່ແທ້ OEM (Spare Parts)",
      titleEn: "4. Genuine OEM Spares",
      subLo: "ຢາງຕັນ, ແບັດ Li-Ion, ນ້ຳມັນ NSF H1",
      subEn: "Solid Tires, Batteries & Hydraulic Oils",
      color: "amber",
    },
  ];

  return (
    <section
      id="booking-form"
      className="py-20 bg-slate-100/80 dark:bg-slate-900/60 border-t border-slate-200/80 dark:border-white/10 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{isLo ? "ສູນບໍລິການລູກຄ້າ B2B • ຕອບກັບໄວພາຍໃນ 30 ນາທີ" : "B2B Client Desk • 30-Minute Rapid Response"}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4"
          >
            {isLo ? "ຂໍໃບສະເໜີລາຄາ & ນັດໝາຍຊ່າງດ່ວນ" : "Request Quotation & Service Booking"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            {isLo
              ? "ກະລຸນາເລືອກໝວດໝູ່ບໍລິການ 4S ທີ່ທ່ານສົນໃຈ ແລະ ປ້ອນຂໍ້ມູນຕິດຕໍ່. ທີມວິສະວະກອນ ດີເຄ ລາວ ຈະຕິດຕໍ່ກັບພ້ອມໃບສະເໜີລາຄາທາງການທັນທີ."
              : "Select your desired 4S solution and enter your contact details. Our engineering specialists will respond promptly with official B2B proposals."}
          </motion.p>
        </div>

        {/* Booking Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-2xl"
        >
          <form onSubmit={(e) => handleBookingSubmit(e, isLo)} className="space-y-8">
            {/* 1. 4S Pillar Selection */}
            <div>
              <label className="block text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                {isLo ? "1. ເລືອກປະເພດຄວາມຕ້ອງການ (Select 4S Category):" : "1. Select 4S Service Category:"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {urgencyOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = urgency === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setUrgency(opt.id as any)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? "bg-blue-50/80 dark:bg-blue-950/40 border-blue-600 shadow-md ring-2 ring-blue-500/20"
                          : "bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-white/10 hover:border-slate-400"
                      }`}
                    >
                      <div
                        className={`p-2.5 rounded-xl shrink-0 ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-black text-sm text-slate-900 dark:text-white">
                          {isLo ? opt.titleLo : opt.titleEn}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {isLo ? opt.subLo : opt.subEn}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Company Name & Contact Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  <Building2 className="w-4 h-4 inline mr-1.5 text-blue-600 dark:text-blue-400" />
                  {isLo ? "ຊື່ບໍລິສັດ / ໂຮງງານ / ອົງກອນ *" : "Company / Enterprise Name *"}
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={isLo ? "ເຊັ່ນ: ບໍລິສັດ ເບຍລາວ ຈຳກັດ" : "e.g. Lao Brewery Co., Ltd."}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  <PhoneCall className="w-4 h-4 inline mr-1.5 text-emerald-600 dark:text-emerald-400" />
                  {isLo ? "ເບີໂທຕິດຕໍ່ / WhatsApp *" : "Phone Number / WhatsApp *"}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={isLo ? "ເຊັ່ນ: 020 5892 9299" : "e.g. +856 20 5892 9299"}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 3. Location Province & Forklift Brand */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4 inline mr-1.5 text-indigo-600 dark:text-indigo-400" />
                  {isLo ? "ແຂວງ / ທີ່ຕັ້ງໂຮງງານ:" : "Location / Province:"}
                </label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {provinces.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  <Truck className="w-4 h-4 inline mr-1.5 text-amber-500" />
                  {isLo ? "ຍີ່ຫໍ້ລົດຍົກທີ່ສົນໃຈ ຫຼື ນຳໃຊ້:" : "Forklift Brand of Interest:"}
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4. Details / Requirements */}
            <div>
              <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                <FileText className="w-4 h-4 inline mr-1.5 text-blue-600 dark:text-blue-400" />
                {isLo
                  ? "ລາຍລະອຽດຄວາມຕ້ອງການ / ຈຳນວນຄັນ / ອາໄຫຼ່ / ອາການລົດ:"
                  : "Scope of Requirements / Fleet Count / Spare Parts / Symptoms:"}
              </label>
              <textarea
                rows={3}
                value={issueDetails}
                onChange={(e) => setIssueDetails(e.target.value)}
                placeholder={
                  isLo
                    ? "ເຊັ່ນ: ຕ້ອງການເຊົ່າລົດຍົກໄຟຟ້າ 2.5 ໂຕນ ຈຳນວນ 2 ຄັນ ສຳລັບສາງເຢັນ ໄລຍະ 2 ປີ ພ້ອມລົດສຳຮອງປ່ຽນທັນທີ..."
                    : "e.g. Requesting quote for 2 units of 2.5-ton electric forklifts on a 2-year lease with standby units..."
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* 5. Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-base shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <PhoneCall className="w-5 h-5" />
                <span>
                  {isLo
                    ? "ສົ່ງຄຳຮ້ອງຂໍໃບສະເໜີລາຄາຜ່ານ WhatsApp ສາຍດ່ວນ"
                    : "Submit Request via Direct WhatsApp Hotline"}
                </span>
                <Send className="w-4 h-4 ml-1" />
              </button>
            </div>
          </form>

          {/* Guarantee Badges */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs text-slate-600 dark:text-slate-400 font-semibold">
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>{isLo ? "ໃບສະເໜີລາຄາທາງການ B2B" : "Official B2B Quotations"}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{isLo ? "ຕອບກັບພາຍໃນ 30 ນາທີ" : "Rapid 30-Min Response"}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>{isLo ? "ໃຫ້ຄຳປຶກສາວິສະວະກອນຟຣີ" : "Free Engineering Consultation"}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
