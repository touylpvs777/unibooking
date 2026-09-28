"use client";

import React from 'react';
import Link from 'next/link';
import { Building2, Package, Truck, HeartPulse, Microscope, Snowflake, ShoppingCart, Hotel } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

const INDUSTRIES = [
  { id: 1, name: "ໂຮງງານອຸດສາຫະກຳ", nameEn: "Factory & Manufacturing", subLo: "ໂຮງງານ & ການຜະລິດ", subEn: "Industrial Plants", image: "/images/industries/industry_factory_1788171784630.jpg" },
  { id: 2, name: "ໂລຈິສຕິກ & ຄັງສິນຄ້າ", nameEn: "Logistics & Warehousing", subLo: "ສາງ & ຂົນສົ່ງ", subEn: "Storage & Distribution", image: "/images/industries/industry_logistics_1788171796220.jpg" },
  { id: 3, name: "ການແພດ & ໂຮງໝໍ", nameEn: "Medical & Healthcare", subLo: "ໂຮງໝໍ & ຄລີນິກ", subEn: "Cleanroom & Clinics", image: "/images/industries/industry_medical_1788171811394.jpg" },
  { id: 4, name: "ໂຮງແຮມ & ຮ້ານອາຫານ", nameEn: "Hospitality & Food", subLo: "ຮ້ານອາຫານ & ບໍລິການ", subEn: "Hotels & Kitchens", image: "/images/industries/industry_hospitality_1788171900303.jpg" },
  { id: 5, name: "ຫ້ອງທົດລອງ", nameEn: "Laboratory & R&D", subLo: "ວິໄຈ & ວິທະຍາສາດ", subEn: "Precision & Science", image: "/images/industries/industry_laboratory_1788171916572.jpg" },
  { id: 6, name: "ຫ້ອງເຢັນ", nameEn: "Cold Storage", subLo: "ຄວບຄຸມອຸນຫະພູມ", subEn: "Temperature Controlled", image: "/images/industries/industry_coldroom_1788171929995.jpg" },
  { id: 7, name: "ອີຄອມເມີຊ", nameEn: "E-Commerce & Retail", subLo: "ສິນຄ້າອອນລາຍ & ຄ້າປີກ", subEn: "Fulfillment Centers", image: "/images/industries/industry_ecommerce_1788171948262.jpg" },
  { id: 8, name: "ການບັນຈຸພັນ", nameEn: "Packaging & Assembly", subLo: "ສາຍການຜະລິດ", subEn: "Automated Packaging", image: "/images/industries/industry_packaging_1788171960987.jpg" },
];

export function IndustrySolutionsGrid() {
  const locale = useLocale();
  const isLao = locale === 'lo';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          {isLao ? "🏭 ກຸ່ມສິນຄ້າແຍກຕາມອຸດສາຫະກຳ" : "🏭 Solutions by Industry"}{" "}
          <span className="text-slate-400 dark:text-slate-500 text-sm font-normal hidden sm:inline">
            {isLao ? "(Industry Solutions)" : "(Tailored Machinery)"}
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {INDUSTRIES.map((industry, idx) => (
          <Link 
            key={industry.id} 
            href={`/${locale}/store?industry=${encodeURIComponent(industry.nameEn)}`}
            className="group block"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.05 }}
              className="relative overflow-hidden rounded-2xl h-40 md:h-48 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" 
                style={{ backgroundImage: `url('${industry.image}')` }} 
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col items-center text-center">
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors drop-shadow-md">
                  {isLao ? industry.name : industry.nameEn}
                </h3>
                <p className="text-[10px] md:text-xs text-slate-300 mt-1 uppercase tracking-wider">
                  {isLao ? industry.subLo : industry.subEn}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
