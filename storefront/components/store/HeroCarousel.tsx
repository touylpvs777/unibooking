"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Truck, Zap, PhoneCall, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

interface HeroSlide {
  id: number;
  image: string;
  badge: string;
  badgeColor: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  specs: string[];
  ctaText: string;
  ctaTextEn: string;
  link: string;
  whatsAppMsg: string;
  theme: "emerald" | "blue" | "teal" | "amber";
}

export function HeroCarousel() {
  const locale = useLocale();
  const isLao = locale === "lo";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      image: "/images/solutions/jungheinrich-li-ion-dawn.png",
      badge: isLao ? "⚡ 100% LITHIUM-ION • ZERO-EMISSION" : "⚡ 100% LITHIUM-ION • ZERO-EMISSION",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      title: "ລົດຍົກໄຟຟ້າ EP & JUNGHEINRICH LITHIUM-ION",
      titleEn: "EP & JUNGHEINRICH 100% LITHIUM-ION FLEET",
      subtitle: "ຍຸກໃໝ່ແຫ່ງການປະຢັດຕົ້ນທຶນ: ຫຼຸດຄ່າພະລັງງານສູງສຸດ 80%, ສາກໄວ 2 ຊົ່ວໂມງ Opportunity Charging, ປອດຄວັນພິດ 100%, ປະກັນແບັດເຕີຣີ 5 ປີ.",
      subtitleEn: "Next-generation green warehouse intralogistics: up to 80% fuel cost savings, 2h opportunity fast-charging, zero toxic emissions, and 5-year battery warranty.",
      specs: isLao 
        ? ["1.5T - 3.5T", "ປະກັນແບັດ 5 ປີ", "ສາກໄວ 2 ຊມ", "0 ຄວັນພິດ"] 
        : ["1.5T - 3.5T Capacity", "5-Year Battery Warranty", "2h Fast Charge", "Zero Emissions"],
      ctaText: "ຂໍໃບສະເໜີລາຄາ B2B",
      ctaTextEn: "Request B2B Quote",
      link: `/${locale}/catalog?category=electric`,
      whatsAppMsg: "ສະບາຍດີ ຕ້ອງການຂໍໃບສະເໜີລາຄາ ລົດຍົກໄຟຟ້າ Lithium-Ion",
      theme: "emerald",
    },
    {
      id: 2,
      image: "/images/solutions/mitsubishi-powerful-efficiency.png",
      badge: isLao ? "🇯🇵 MITSUBISHI FORKLIFT TRUCKS JAPAN" : "🇯🇵 MITSUBISHI FORKLIFT TRUCKS JAPAN",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      title: "MITSUBISHI GRENDiA 1.5 - 10 ໂຕນ ງານໜັກອຸດສາຫະກຳ",
      titleEn: "MITSUBISHI GRENDiA 1.5 - 10 TON HEAVY INDUSTRIAL",
      subtitle: "ນຳເຂົ້າຈາກຍີ່ປຸ່ນແທ້ 100%: ທົນທານແກ່ນສານ ສຳລັບໂຮງງານຊີມັງ, ບໍ່ແຮ່ Phu Bia / Sepon, ແລະ ໂຮງງານແປຮູບໄມ້ ພ້ອມສູນສ້ອມໃຫຍ່ຖະໜົນກຳແພງເມືອງ.",
      subtitleEn: "100% Genuine Japanese Heavy Duty: Built rugged for cement plants, mining sites, and heavy logistics with full Khamphengmeuang central overhaul backing.",
      specs: isLao 
        ? ["1.5T - 10T", "Japan Powertrain", "PM 30 ຈຸດ", "ອາໄຫຼ່ແທ້ 100%"] 
        : ["1.5T - 10T", "Genuine Japan Engine", "30-Point PM", "100% OEM Spares"],
      ctaText: "ເລືອກເບິ່ງລຸ້ນ Mitsubishi",
      ctaTextEn: "Explore Mitsubishi",
      link: `/${locale}/catalog?brand=mitsubishi`,
      whatsAppMsg: "ສະບາຍດີ ຕ້ອງການສອບຖາມ ລົດຍົກ Mitsubishi Heavy Duty",
      theme: "blue",
    },
    {
      id: 3,
      image: "/images/solutions/nilfisk-professional-cleaning-fleet.png",
      badge: isLao ? "🇩🇰 NILFISK DENMARK • ມາດຕະຖານ GMP/HACCP" : "🇩🇰 NILFISK DENMARK • GMP/HACCP CERTIFIED",
      badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/40",
      title: "ເຄື່ອງຂັດລ້າງພື້ນ & ດູດຝຸ່ນໂຮງງານ NILFISK",
      titleEn: "NILFISK INDUSTRIAL SCRUBBERS & VACUUMS",
      subtitle: "ມາດຕະຖານສຸຂະອະນາໄມອັນດັບ 1 ຈາກເດນມາກ: ເຄື່ອງຂັດ-ດູດອັດຕະໂນມັດ, ລົດກວາດພື້ນ Ride-on, ແລະ ເຄື່ອງດູດນ້ຳມັນ/ຝຸ່ນ CNC ສຳລັບ Beerlao, Betagro.",
      subtitleEn: "World-class Danish hygiene standard: automatic ride-on scrubber dryers, industrial sweepers, and CNC oil/swarf vacuums for food & beverage plants.",
      specs: isLao 
        ? ["Ride-on & Walk-behind", "ມາດຕະຖານ GMP/HACCP", "ແຮງດູດສູງ", "ສູນບໍລິການແທ້"] 
        : ["Ride-on & Walk-Behind", "GMP / HACCP Food Grade", "High Suction", "Factory Authorized"],
      ctaText: "ເບິ່ງເຄື່ອງຂັດພື້ນ Nilfisk",
      ctaTextEn: "Explore Nilfisk",
      link: `/${locale}/catalog?category=cleaning`,
      whatsAppMsg: "ສະບາຍດີ ຕ້ອງການຂໍໃບສະເໜີລາຄາ ເຄື່ອງຂັດລ້າງພື້ນ Nilfisk",
      theme: "teal",
    },
    {
      id: 4,
      image: "/images/solutions/automated-high-bay-racking-shuttle.png",
      badge: isLao ? "🏗️ LPI RACKING • ມາດຕະຖານສາກົນ AS 4084" : "🏗️ LPI RACKING • AS 4084 INTERNATIONAL STANDARD",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      title: "ລະບົບຊັ້ນວາງສາງສິນຄ້າໜັກ & ໂຊລູຊັ່ນ 3D CAD",
      titleEn: "HEAVY DUTY INDUSTRIAL RACKING & 3D CAD LAYOUT",
      subtitle: "ເພີ່ມພື້ນທີ່ຈັດເກັບສິນຄ້າໄດ້ສູງສຸດ 60%: Selective Racking, Drive-In, Radio Shuttle ແລະ ບໍລິການອອກແບບແປນສາງ 3D AutoCAD ຟຣີໂດຍວິສະວະກອນ.",
      subtitleEn: "Maximize warehouse storage density up to 60%: Selective, Drive-in, Radio Shuttle automated high-bay racking with complimentary 3D CAD layout simulation.",
      specs: isLao 
        ? ["ມາດຕະຖານ AS 4084", "Radio Shuttle", "ອອກແບບ 3D ຟຣີ", "ຮັບນ້ຳໜັກ 1-3 ໂຕນ/Pallet"] 
        : ["AS 4084 Standard", "Radio Shuttle AS/RS", "Free 3D Layout", "1-3 Tons / Pallet"],
      ctaText: "ປຶກສາວິສະວະກອນສາງ",
      ctaTextEn: "Consult Warehouse Engineer",
      link: `/${locale}/catalog?category=racking`,
      whatsAppMsg: "ສະບາຍດີ ຕ້ອງການປຶກສາອອກແບບລະບົບຊັ້ນວາງສາງ Racking 3D",
      theme: "amber",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  const activeSlide = heroSlides[currentIndex];

  return (
    <div 
      className="relative w-full h-[480px] sm:h-[540px] md:h-[580px] lg:h-[620px] overflow-hidden rounded-3xl sm:rounded-[2.5rem] shadow-2xl bg-slate-950 border border-slate-800 dark:border-white/10 group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Stack with Rock-Solid CSS Crossfade Transitions */}
      {heroSlides.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
              <img
                src={slide.image}
                alt={isLao ? slide.title : slide.titleEn}
                className={`w-full h-full object-cover object-center transition-transform duration-10000 ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              />
              {/* Cinematic Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/40 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
              {/* Tech Grid Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 z-10" />
            </div>

            {/* Slide Content Box */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20">
              <div className="max-w-3xl">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-md mb-4 text-xs font-black tracking-wider uppercase shadow-md transition-all">
                  <span className={`w-2 h-2 rounded-full ${
                    slide.theme === 'emerald' ? 'bg-emerald-400 animate-ping' :
                    slide.theme === 'blue' ? 'bg-blue-400 animate-ping' :
                    slide.theme === 'teal' ? 'bg-teal-400 animate-ping' :
                    'bg-amber-400 animate-ping'
                  }`} />
                  <span className={slide.badgeColor}>{slide.badge}</span>
                </div>

                {/* Main Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight tracking-tight drop-shadow-md">
                  {isLao ? slide.title : slide.titleEn}
                </h2>

                {/* Subtitle */}
                <p className="text-sm sm:text-base md:text-lg text-slate-200 mb-6 font-normal leading-relaxed max-w-2xl drop-shadow">
                  {isLao ? slide.subtitle : slide.subtitleEn}
                </p>

                {/* Spec Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  {slide.specs.map((spec, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md text-[11px] sm:text-xs font-bold text-slate-200 shadow-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link href={slide.link}>
                    <button
                      type="button"
                      className={`h-12 sm:h-13 px-6 sm:px-8 rounded-xl font-bold text-white text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                        slide.theme === "emerald" ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/40" :
                        slide.theme === "blue" ? "bg-blue-600 hover:bg-blue-500 shadow-blue-900/40" :
                        slide.theme === "teal" ? "bg-teal-600 hover:bg-teal-500 shadow-teal-900/40" :
                        "bg-amber-600 hover:bg-amber-500 shadow-amber-900/40"
                      }`}
                    >
                      <span>{isLao ? slide.ctaText : slide.ctaTextEn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>

                  <a
                    href={`https://wa.me/8562058929299?text=${encodeURIComponent(slide.whatsAppMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 sm:h-13 px-4 sm:px-5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-md"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp 4S</span>
                  </a>

                  <div className="hidden xl:flex items-center gap-2 pl-2 text-xs font-semibold text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{isLao ? "ຮັບປະກັນສູນແທ້ 100%" : "Authorized Warranty"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Manual Navigation Controls (Left & Right Arrows) */}
      <button 
        type="button"
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/60 hover:bg-slate-900/90 border border-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 shadow-lg"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      
      <button 
        type="button"
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/60 hover:bg-slate-900/90 border border-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 shadow-lg"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators (Bottom Dots/Pills) */}
      <div className="absolute bottom-5 sm:bottom-8 left-6 sm:left-10 md:left-16 lg:left-20 flex items-center gap-2 sm:gap-3 z-30">
        {heroSlides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="py-2 cursor-pointer group"
            >
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  isActive 
                    ? "w-8 sm:w-12 bg-white shadow-md shadow-white/30" 
                    : "w-2.5 sm:w-3 bg-white/40 group-hover:bg-white/70"
                }`} 
              />
            </button>
          );
        })}
      </div>

      {/* Slide Index Pill */}
      <div className="absolute bottom-5 sm:bottom-8 right-6 sm:right-10 z-30 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-white/10 text-white text-xs font-mono backdrop-blur-md">
        <span className="font-bold text-sky-400">0{currentIndex + 1}</span>
        <span className="text-slate-500">/</span>
        <span className="text-slate-400">0{heroSlides.length}</span>
      </div>
    </div>
  );
}
