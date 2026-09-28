"use client";

import React, { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  KeySquare,
  Wrench,
  Settings,
  PackageSearch,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe2,
  Box,
  Lock,
  Unlock,
  Layers,
} from "lucide-react";

import { BookingProvider } from "@/components/services/BookingContext";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceSalePillar } from "@/components/services/ServiceSalePillar";
import { ServiceRentalPillar } from "@/components/services/ServiceRentalPillar";
import { ServicePMPillar } from "@/components/services/ServicePMPillar";
import { ServicePartsPillar } from "@/components/services/ServicePartsPillar";
import { ServiceEcosystem } from "@/components/services/ServiceEcosystem";
import { ServiceBookingForm } from "@/components/services/ServiceBookingForm";
import { ServiceContact } from "@/components/services/ServiceContact";
import { ServiceChecklistModal } from "@/components/services/ServiceChecklistModal";
import { ServiceCredibilityShowcase } from "@/components/services/ServiceCredibilityShowcase";
import { ServiceWorkshopShowcase } from "@/components/services/ServiceWorkshopShowcase";
import { FieldStoriesShowcase } from "@/components/services/FieldStoriesShowcase";

import { EnterpriseCustomerShowcase } from "@/components/customers/EnterpriseCustomerShowcase";
import { WarehouseAutomationShowcase } from "@/components/services/WarehouseAutomationShowcase";
import { MitsubishiForkliftShowcase } from "@/components/services/MitsubishiForkliftShowcase";
import { JungheinrichEFGShowcase } from "@/components/services/JungheinrichEFGShowcase";
import { RackingAndStorageShowcase } from "@/components/services/RackingAndStorageShowcase";
import { NilfiskCleaningShowcase } from "@/components/services/NilfiskCleaningShowcase";

type TabId = "sale" | "rental" | "service" | "parts" | "ecosystem";

export default function ForkliftServicesHubPage() {
  const locale = useLocale();
  const isLo = locale === "lo";
  const [activeTab, setActiveTab] = useState<TabId>("sale");

  const tabs = [
    {
      id: "sale",
      label: isLo ? "1. ຂາຍລົດ (Sale)" : "1. Sales",
      icon: ShoppingCart,
      desc: isLo
        ? "ລົດຟອກລີບໃໝ່ & ມືສອງຍີ່ປຸ່ນ 1.5t – 10t ຮັບປະກັນສູນແທ້"
        : "New & Japan-Reconditioned Forklifts 1.5t - 10t with Warranty",
      color: "bg-blue-600",
      textColor: "text-blue-600 dark:text-blue-400",
      lightBg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      id: "rental",
      label: isLo ? "2. ເຊົ່າກອງລົດ (Rental)" : "2. Fleet Rental",
      icon: KeySquare,
      desc: isLo
        ? "ເຊົ່າ B2B 1-5 ປີ 0-CAPEX, ຟຣີຊ່າງ PM, ລົດສຳຮອງປ່ຽນທັນທີ"
        : "0-CAPEX 1-5 Year Operating Lease + Free Routine PM & Standby Units",
      color: "bg-indigo-600",
      textColor: "text-indigo-600 dark:text-indigo-400",
      lightBg: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      id: "service",
      label: isLo ? "3. ສູນສ້ອມແປງ (Service)" : "3. Technical Service",
      icon: Wrench,
      desc: isLo
        ? "DKwick Mobile 2-4h ລົງໄຊທ໌ດ່ວນ, ກວດເຊັກ 24 ຈຸດ, ສູນ Overhaul ໃຫຍ່"
        : "DKwick 2-4h Mobile Response, Certified 24-Point PM, Central Overhaul Workshop",
      color: "bg-emerald-600",
      textColor: "text-emerald-600 dark:text-emerald-400",
      lightBg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      id: "parts",
      label: isLo ? "4. ອາໄຫຼ່ OEM (Parts)" : "4. OEM Spare Parts",
      icon: Settings,
      desc: isLo
        ? "ສາງສູນກາງ 16,000+ ລາຍການ, ຢາງຕັນ, ແບັດ Li-Ion, ນ້ຳມັນ NSF H1"
        : "16,000+ Genuine OEM Items, Solid Tires, Li-Ion Cells, NSF H1 Food Oils",
      color: "bg-amber-600",
      textColor: "text-amber-600 dark:text-amber-400",
      lightBg: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      id: "ecosystem",
      label: isLo ? "5. ລະບົບສາງ (Intralogistics)" : "5. Intralogistics & Racking",
      icon: PackageSearch,
      desc: isLo
        ? "ຊັ້ນວາງ Racking LPI, ອຸປະກອນອະນາໄມ Nilfisk, ລົດກະເຊົ້າ JLG, 3D CAD"
        : "Heavy-Duty Racking, Nilfisk Scrubbers, JLG MEWPs & Free 3D CAD Layouts",
      color: "bg-purple-600",
      textColor: "text-purple-600 dark:text-purple-400",
      lightBg: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  const scrollToTabs = (tabId: TabId) => {
    setActiveTab(tabId);
    document.getElementById("detailed-solutions")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Handle URL Hash Deep-linking from Homepage or Navigation (#sale, #rental, #service, #parts, #spare-parts, #booking-form)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#sale") {
        setActiveTab("sale");
        document.getElementById("detailed-solutions")?.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#rental") {
        setActiveTab("rental");
        document.getElementById("detailed-solutions")?.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#service") {
        setActiveTab("service");
        document.getElementById("detailed-solutions")?.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#parts" || hash === "#spare-parts") {
        setActiveTab("parts");
        document.getElementById("detailed-solutions")?.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#ecosystem" || hash === "#automation") {
        setActiveTab("ecosystem");
        document.getElementById("detailed-solutions")?.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#booking-form") {
        document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <BookingProvider>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pt-16 pb-20 overflow-hidden">
        {/* 1. HERO SECTION */}
        <ServiceHero isLo={isLo} />

        {/* Anchor point helpers for direct links */}
        <div id="sale" className="scroll-mt-28"></div>
        <div id="rental" className="scroll-mt-28"></div>
        <div id="service" className="scroll-mt-28"></div>
        <div id="spare-parts" className="scroll-mt-28"></div>
        <div id="parts" className="scroll-mt-28"></div>
        <div id="ecosystem" className="scroll-mt-28"></div>

        {/* 2. 5-PILLAR ECOSYSTEM OVERVIEW (Bento Grid) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>THE 4S HUB ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
              {isLo ? "ລະບົບນິເວດອຸດສາຫະກຳ ແລະ ສາງສິນຄ້າຄົບວົງຈອນ" : "Complete Industrial & Warehouse Ecosystem"}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              {isLo
                ? "ຈາກການຂາຍ-ເຊົ່າລົດຟອກລີບ ໄປຈົນເຖິງການອອກແບບສາງສິນຄ້າອັດຕະໂນມັດ ດີເຄ ລາວ ຄືຜູ້ໃຫ້ບໍລິການ One-Stop B2B Solution ອັນດັບ 1 ໃນ ສປປ ລາວ"
                : "From forklift sales and 0-CAPEX leasing to automated warehouse racking and Nilfisk cleaning, DK LAO is the #1 One-Stop B2B Partner in Lao PDR."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tabs.map((tab, idx) => {
              const Icon = tab.icon;
              return (
                <div
                  key={tab.id}
                  onClick={() => scrollToTabs(tab.id as TabId)}
                  className={`cursor-pointer group relative overflow-hidden rounded-3xl p-8 bg-slate-50/70 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300 ${
                    idx === 4 ? "lg:col-span-2" : ""
                  }`}
                >
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full ${tab.lightBg} opacity-60 group-hover:scale-125 transition-transform duration-500`}
                  ></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg ${tab.color} group-hover:-translate-y-1 transition-transform`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tab.label}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow text-sm leading-relaxed">
                      {tab.desc}
                    </p>

                    <div
                      className={`inline-flex items-center gap-2 font-black text-sm ${tab.textColor} group-hover:gap-3 transition-all mt-auto`}
                    >
                      <span>{isLo ? "ສຳຫຼວດລາຍລະອຽດ" : "Explore Pillar"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. DETAILED SOLUTIONS (Tabs) */}
        <div id="detailed-solutions" className="pt-10">
          <div className="text-center mb-10 max-w-3xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              {isLo ? "ເຈາະເລິກແຕ່ລະບໍລິການ 4S" : "Deep Dive into our 4S Pillars"}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              {isLo
                ? "ເລືອກແຖບດ້ານລຸ່ມເພື່ອເບິ່ງລາຍລະອຽດ, ລຸ້ນລົດ, ແລະ ໂປຣໂມຊັ່ນສຳລັບແຕ່ລະໝວດໝູ່"
                : "Select a tab below to inspect detailed strategies, equipment portfolios, and promotions."}
            </p>
          </div>

          <div className="sticky top-20 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-y border-slate-200 dark:border-slate-800 shadow-sm transition-colors mb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex overflow-x-auto hide-scrollbar">
                <div className="flex space-x-2 sm:space-x-3 py-4 mx-auto min-w-max">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as TabId)}
                        className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                          isActive
                            ? "text-white bg-blue-600 dark:bg-blue-600 shadow-lg shadow-blue-600/30 scale-105"
                            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? "scale-110" : ""}`} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-full overflow-hidden min-h-[50vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full"
              >
                {activeTab === "sale" && <ServiceSalePillar isLo={isLo} />}
                {activeTab === "rental" && <ServiceRentalPillar isLo={isLo} />}
                {activeTab === "service" && <ServicePMPillar isLo={isLo} />}
                {activeTab === "parts" && <ServicePartsPillar isLo={isLo} />}
                {activeTab === "ecosystem" && <ServiceEcosystem isLo={isLo} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 4. FIELD STORIES (Human Craftsmanship & Dedication) */}
        <FieldStoriesShowcase isLo={isLo} />

        {/* 5. TRUST & PARTNERS (Unified Credibility Section) */}
        <div className="mt-12 bg-slate-100/70 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800">
          {/* 5.1 Central Certified Workshop Showcase */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
            <ServiceWorkshopShowcase />
          </div>

          {/* 5.2 Enterprise Customers Showcase */}
          <EnterpriseCustomerShowcase />

          {/* 5.3 Enterprise Credibility Metrics & ISO */}
          <ServiceCredibilityShowcase isLo={isLo} />

          {/* 5.4 Global Partners Showcase */}
          <div className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 font-semibold mb-4 text-xs tracking-wider">
                  <Globe2 className="w-4 h-4" />
                  <span>AUTHORIZED GLOBAL BRAND PRINCIPALS</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                  {isLo ? "ກົນຈັກ ແລະ ອຸປະກອນມາດຕະຖານລະດັບໂລກ" : "World-Class Industrial Equipment"}
                </h2>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                  {isLo
                    ? "ດີເຄ ລາວ ເປັນຕົວແທນຈຳໜ່າຍ ແລະ ສູນບໍລິການຫຼັງການຂາຍຢ່າງເປັນທາງການ ມາດຕະຖານດຽວກັບໂຮງງານແມ່ຕ່າງປະເທດ"
                    : "DK LAO is the certified partner and official after-sales service provider operating strictly to international factory benchmarks."}
                </p>
              </div>

              <div className="space-y-12">
                <MitsubishiForkliftShowcase />
                <JungheinrichEFGShowcase />
                <WarehouseAutomationShowcase />
                <RackingAndStorageShowcase />
                <NilfiskCleaningShowcase />
              </div>
            </div>
          </div>
        </div>

        {/* 5. LEAD GEN / CTA BOOKING FORM */}
        <div className="mt-12">
          <ServiceBookingForm isLo={isLo} />
        </div>

        {/* 6. CONTACT */}
        <div className="mt-12">
          <ServiceContact isLo={isLo} />
        </div>

        {/* MODALS */}
        <ServiceChecklistModal isLo={isLo} />
      </div>

      {/* Hide Scrollbar for Tabs Container */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </BookingProvider>
  );
}
