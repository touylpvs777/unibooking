"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Clock, Wrench, ShieldCheck, ArrowRight, Building2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function ForkliftRentalPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-24 mb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-900/40 z-10" />
          {/* Fallback pattern if no image */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-6">
              <Truck className="w-4 h-4" /> ບໍລິການໃຫ້ເຊົ່າລົດຟອກລີບໄລຍະຍາວ
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              ເພີ່ມປະສິດທິພາບໂຮງງານດ້ວຍ<br/><span className="text-emerald-400">ລົດຟອກລີບຄຸນນະພາບສູງ</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
              ຕອບໂຈດທຸກການຍົກຍ້າຍໃນໂຮງງານອຸດສາຫະກຳ ແລະ ຄັງສິນຄ້າ. ພ້ອມບໍລິການ On-site Service ຕະຫຼອດອາຍຸສັນຍາ ແລະ ມີລົດສຳຮອງໃຫ້ໃຊ້ເມື່ອລົດມີບັນຫາ (Zero Downtime Guarantee).
            </p>
            <div className="flex gap-4">
              <a href="#quote-form">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-6 rounded-full text-lg font-semibold">
                  ຂໍໃບສະເໜີລາຄາ
                </Button>
              </a>
              <Link href="/lo/store">
                <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white px-8 py-6 rounded-full text-lg">
                  ເບິ່ງລາຍການອາໄຫຼ່
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Why Choose Us - SLA Guarantee */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">ມາດຕະຖານການບໍລິການ (SLA Guarantee)</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">ພວກເຮົາເຂົ້າໃຈວ່າທຸກນາທີໃນໂຮງງານມີຄ່າ ເຮົາຈຶ່ງອອກແບບບໍລິການເພື່ອບໍ່ໃຫ້ວຽກຂອງທ່ານສະດຸດ.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-white/5 hover:border-emerald-500/50 transition-colors">
              <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">24-Hour Response</h3>
              <p className="text-slate-600 dark:text-slate-400">ຮັບປະກັນທີມຊ່າງເຕັກນິກເຂົ້າສ້ອມແປງເຖິງໜ້າໂຮງງານ (On-site) ພາຍໃນ 24 ຊົ່ວໂມງຫຼັງໄດ້ຮັບແຈ້ງເຫດ.</p>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-white/5 hover:border-emerald-500/50 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">ຈຸດເດັ່ນ</div>
              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">ລົດສຳຮອງປ່ຽນແທນທັນທີ</h3>
              <p className="text-slate-600 dark:text-slate-400">ໃນກໍລະນີລົດຕ້ອງໃຊ້ເວລາສ້ອມແປງດົນ ພວກເຮົາຈະສົ່ງລົດຟອກລີບສຳຮອງໄປປ່ຽນໃຫ້ໃຊ້ງານຊົ່ວຄາວທັນທີ (Zero Downtime).</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-white/5 hover:border-emerald-500/50 transition-colors">
              <div className="w-14 h-14 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Wrench className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">ບຳລຸງຮັກສາຟຣີ (PM)</h3>
              <p className="text-slate-600 dark:text-slate-400">ລວມຄ່າບຳລຸງຮັກສາ (Preventive Maintenance), ປ່ຽນຖ່າຍນ້ຳມັນເຄື່ອງ ແລະ ອາໄຫຼ່ທຸກຊະນິດ ຕະຫຼອດອາຍຸສັນຍາ.</p>
            </div>
          </div>
        </section>

        {/* Our Fleet - Types of Forklifts */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">ປະເພດລົດຟອກລີບຂອງພວກເຮົາ (Our Fleet)</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">ລົດທຸກຄັນຜ່ານການກວດເຊັກສະພາບ 100% ກ່ອນສົ່ງເຖິງໂຮງງານຂອງທ່ານ ພ້ອມໃຫ້ຄຳປຶກສາເພື່ອເລືອກລົດໃຫ້ເໝາະສົມກັບໜ້າວຽກ.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Diesel Forklift */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-white/5 overflow-hidden group">
              <div className="h-64 overflow-hidden relative">
                <Image 
                  src="/images/rental/diesel.jpg" 
                  alt="Heavy Duty Diesel Forklift" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold mb-4">
                  ງານໜັກ (Heavy Duty)
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">ລົດຟອກລີບ ກາຊວນ (Diesel Forklift)</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  ເໝາະສຳລັບງານນອກອາຄານ (Outdoor) ແລະ ງານຍົກນ້ຳໜັກຫຼາຍເຊັ່ນ: ວັດສະດຸກໍ່ສ້າງ, ໄມ້, ຫຼື ຕູ້ຄອນເທນເນີ. ທົນທານ ພະລັງງານສູງ.
                </p>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"/> ຂະໜາດ: 2.5 - 10 ໂຕນຂຶ້ນໄປ</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"/> ລວມຄ່າບຳລຸງຮັກສາເຄື່ອງຈັກ</li>
                </ul>
              </div>
            </div>

            {/* Electric Forklift */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-white/5 overflow-hidden group">
              <div className="h-64 overflow-hidden relative">
                <Image 
                  src="/images/rental/electric.jpg" 
                  alt="Electric Lithium-ion Forklift" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold mb-4">
                  ເປັນມິດກັບສິ່ງແວດລ້ອມ (Eco-Friendly)
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">ລົດຟອກລີບ ໄຟຟ້າ (Electric / Lithium)</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  ເໝາະສຳລັບງານພາຍໃນອາຄານ (Indoor), ຄັງສິນຄ້າອາຫານ, ເຄື່ອງດື່ມ, ແລະ ຢາ ທີ່ຕ້ອງການຄວາມສະອາດ ປາສະຈາກຄັວນ ແລະ ສຽງລົບກວນ.
                </p>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"/> ຂະໜາດ: 1.5 - 3.5 ໂຕນ</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"/> ແບັດເຕີຣີລີທຽມ ຊາດໄວ ໃຊ້ງານໄດ້ດົນ</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Form & Trusted By Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start" id="quote-form">
          {/* RFQ Form */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-white/5">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">ຕິດຕໍ່ຂໍໃບສະເໜີລາຄາເຊົ່າ</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">ທີມງານຝ່າຍຂາຍ B2B ຂອງພວກເຮົາຈະຕິດຕໍ່ກັບພາຍໃນ 1 ຊົ່ວໂມງ.</p>
            
            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-emerald-500 mb-2">ສົ່ງຂໍ້ມູນສຳເລັດແລ້ວ!</h4>
                <p className="text-slate-400 text-sm">ພວກເຮົາໄດ້ຮັບຂໍ້ມູນຄວາມຕ້ອງການຂອງທ່ານແລ້ວ. ພະນັກງານຝ່າຍຂາຍກຳລັງກະກຽມໃບສະເໜີລາຄາ.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">ຊື່ບໍລິສັດ/ໂຮງງານ <span className="text-rose-500">*</span></label>
                    <input type="text" required className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" placeholder="ບໍລິສັດ..." />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">ຊື່ຜູ້ຕິດຕໍ່ <span className="text-rose-500">*</span></label>
                    <input type="text" required className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" placeholder="ຊື່ຂອງທ່ານ..." />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">ເບີໂທຕິດຕໍ່ <span className="text-rose-500">*</span></label>
                  <input type="tel" required className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" placeholder="020 XXXXXXXX" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">ປະເພດລົດທີ່ຕ້ອງການ</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-700 dark:text-slate-300">
                    <option>ລົດຟອກລີບ ກາຊວນ (Diesel) - 2.5 ໂຕນຂຶ້ນໄປ</option>
                    <option>ລົດຟອກລີບ ໄຟຟ້າ (Electric/Lithium) - ສຳລັບພາຍໃນ</option>
                    <option>ລົດຟອກລີບ LPG</option>
                    <option>ປຶກສາທີມງານເພື່ອປະເມີນໜ້າວຽກກ່ອນ</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">ລາຍລະອຽດໜ້າວຽກ (ທາງເລືອກ)</label>
                  <textarea rows={3} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" placeholder="ເຊົ່າຈັກຄັນ? ເຊົ່າຈັກປີ? ສະພາບພື້ນທີ່ເປັນແນວໃດ?"></textarea>
                </div>
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg py-6 mt-4 font-bold text-base">
                  ຂໍໃບສະເໜີລາຄາດ່ວນ <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            )}
          </div>

          {/* Trusted By Clients */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">ໄວ້ໃຈໂດຍໂຮງງານຊັ້ນນຳ</h3>
              <p className="text-slate-600 dark:text-slate-400">
                ກວ່າ 10 ປີທີ່ພວກເຮົາໃຫ້ບໍລິການປ່ອຍເຊົ່າລົດຟອກລີບໃຫ້ແກ່ອຸດສາຫະກຳອາຫານ, ເຄື່ອງດື່ມ, ແລະ ບໍ່ແຮ່ຂະໜາດໃຫຍ່. ພວກເຮົາພ້ອມເປັນສ່ວນໜຶ່ງໃນຄວາມສຳເລັດຂອງທ່ານ.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {["ບໍ່ຄໍາເຊໂປນ", "ບໍ່ຄໍາພູເບ້ຍ", "ໂຮງງານເບຍລາວ", "ໂຮງງານຢາສູບ", "HOYA", "Betagro", "CP", "Pepsi", "Coca-Cola"].map((client) => (
                <div key={client} className="bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-xl p-4 flex items-center justify-center text-center">
                  <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">{client}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mt-8 flex gap-4 items-start">
              <div className="p-3 bg-blue-500/20 text-blue-500 rounded-full shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">ຕ້ອງການທີ່ປຶກສາດ່ວນ?</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">ທີມວິສະວະກອນພວກເຮົາພ້ອມລົງປະເມີນໜ້າວຽກໃຫ້ຟຣີ ໂດຍບໍ່ມີຄ່າໃຊ້ຈ່າຍ.</p>
                <a href="tel:+8562058929299" className="font-bold text-blue-500 hover:underline">ໂທ & WhatsApp: 020 5892 9299</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
