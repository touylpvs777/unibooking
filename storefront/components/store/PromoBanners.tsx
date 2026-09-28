"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, Wrench, FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from 'next-intl';

export function PromoBanners() {
  const locale = useLocale();
  const isLao = locale === 'lo';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Banner 1: Hand Pallet Inquiries */}
      <motion.div 
        whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        className="rounded-xl p-6 md:p-8 text-white flex flex-col h-full shadow-sm relative overflow-hidden bg-blue-600 transition-all duration-300"
      >
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center" 
          style={{ backgroundImage: "url('/images/jenstore-products/jenstore_standard_hand_pallet_truck_2_5_tons___fork_w550xl1_5.jpg')" }} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/90 to-transparent" />
        <div className="relative z-10 flex flex-col h-full max-w-[60%]">
          <MessageCircle className="w-8 h-8 mb-4 text-blue-100" />
          <h3 className="text-2xl font-black mb-2 text-white shadow-sm">
            {isLao ? "ສອບຖາມຂໍ້ມູນ Hand Pallet" : "Inquire Hand Pallet Trucks"}
          </h3>
          <p className="text-blue-50 text-sm mb-6 flex-1 font-medium">
            {isLao 
              ? "ສອບຖາມສະເປັກລົດຍົກ, ຂໍໃບສະເໜີລາຄາ ແລະ ສັ່ງຊື້ຜ່ານທາງ WhatsApp ໄດ້ຢ່າງສະດວກສະບາຍ ພ້ອມທີມງານໃຫ້ຄຳປຶກສາ."
              : "Inquire specifications, request formal quotation, and order via WhatsApp directly with our dedicated technical team."}
          </p>
          <Button className="bg-white text-blue-700 hover:bg-blue-50 self-start font-bold rounded-lg shadow-sm">
            {isLao ? ">> ສົນທະນາເລີຍ <<" : ">> Chat with Sales <<"}
          </Button>
        </div>
      </motion.div>

      {/* Banner 2: PM Service */}
      <motion.div 
        whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        className="rounded-xl p-6 md:p-8 text-white flex flex-col h-full shadow-sm relative overflow-hidden bg-[#0A58CA] transition-all duration-300"
      >
        <div 
          className="absolute inset-0 opacity-50 mix-blend-overlay bg-cover bg-center" 
          style={{ backgroundImage: "url('/images/jenstore-products/jenstore_standard_hand_pallet_truck_2_5_tons___fork_w685xl1_1.jpg')" }} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent" />
        <div className="relative z-10 flex flex-col h-full max-w-[60%]">
          <Wrench className="w-8 h-8 mb-4 text-blue-100" />
          <h3 className="text-2xl font-black mb-2 text-white shadow-sm">
            {isLao ? "ບໍລິການຊ່ອມບຳລຸງ (PM)" : "Preventive Maintenance (PM)"}
          </h3>
          <p className="text-blue-50 text-sm mb-6 flex-1 font-medium">
            {isLao
              ? "LUD Mobile Service - ບໍລິການກວດເຊັກສະພາບ ແລະ ຊ່ອມບຳລຸງລົດຍົກ Hand Pallet ເຖິງໂຮງງານຂອງທ່ານ."
              : "LUD Mobile Service - On-site inspection, diagnostics, and preventive maintenance delivered straight to your warehouse."}
          </p>
          <Button className="bg-white text-blue-800 hover:bg-blue-50 self-start font-bold rounded-lg shadow-sm">
            {isLao ? ">> ນັດໝາຍຊ່າງ PM <<" : ">> Book PM Service <<"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
