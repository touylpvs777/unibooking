"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  ChevronRight,
  ShoppingBag,
  Award,
  Zap,
  BatteryCharging,
  Warehouse,
  Flame,
  Wind,
  Droplets,
  Layers,
  Gauge,
  Cpu,
  Factory,
  Building2,
  Hotel,
  Stethoscope,
  Combine,
  Truck,
  ZoomIn,
} from "lucide-react";
import { ImageLightboxModal } from "@/components/ui/ImageLightboxModal";

export function NilfiskCleaningShowcase() {
  const locale = useLocale();
  const isLo = locale === "lo";

  // Lightbox Modal State
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    src: string;
    alt: string;
    titleLo?: string;
    titleEn?: string;
    subtitleLo?: string;
    subtitleEn?: string;
  }>({
    isOpen: false,
    src: "",
    alt: "",
  });

  // 4 Main Tabs
  const [activeTab, setActiveTab] = useState<
    "scrubbers" | "sweepers" | "industrial_vacs" | "commercial_vacs"
  >("scrubbers");

  // Sub-toggles within tabs
  const [scrubberSubTab, setScrubberSubTab] = useState<"ride_on" | "walk_behind">("ride_on");
  const [industrialSubTab, setIndustrialSubTab] = useState<"swarf_liquids" | "hazardous_dust">("swarf_liquids");
  const [commercialSubTab, setCommercialSubTab] = useState<"wet_dry" | "dry_vacs">("wet_dry");

  // SCRUBBER DRYERS: Heavy Ride-On (Slide 5)
  const RIDE_ON_MODELS = [
    {
      model: "SC8000",
      titleLo: "Widest Cylindrical Scrub Deck in its Class",
      titleEn: "Widest Cylindrical Scrub Deck in its Class",
      descLo: "ລົດຂັດລ້າງພື້ນນັ່ງຂັບຂະໜາດໃຫຍ່ພິເສດ ຫົວຂັດກະບອກສູບກວ້າງສຸດ ຮອງຮັບສາງຂະໜາດໃຫຍ່ 10,000+ m².",
      descEn: "Heavy-duty powerhouse with the widest cylindrical scrub deck, engineered for demanding mega-DCs.",
      badge: "Mega DC Flagship",
    },
    {
      model: "SC6500",
      titleLo: "High Productivity in Extreme Cleaning Environments",
      titleEn: "High Productivity in Extreme Environments",
      descLo: "ປະສິດທິພາບສູງສຸດໃນສະພາບແວດລ້ອມວຽກໜັກ ແລະ ໂຮງງານອຸດສາຫະກຳທີ່ມີຄາບຝັງແໜ້ນ.",
      descEn: "Designed for extreme cleaning challenges with high scrubbing pressure and robust chassis.",
      badge: "Extreme Environments",
    },
    {
      model: "SC6000",
      titleLo: "Efficient Large Area Cleaning",
      titleEn: "Efficient Large Area Cleaning",
      descLo: "ຂັດລ້າງພື້ນທີ່ກວ້າງຢ່າງວ່ອງໄວ ແລະ ປະຢັດນ້ຳ/ນ້ຳຢາດ້ວຍເທັກໂນໂລຢີ SmartFlow™.",
      descEn: "Fast, reliable cleaning of expansive logistics floors with reduced water and detergent consumption.",
      badge: "Large Logistics",
    },
    {
      model: "SC5000",
      titleLo: "The Agile Answer for Dynamic Cleaning Challenges",
      titleEn: "Agile Answer for Dynamic Challenges",
      descLo: "ຄ່ອງຕົວສູງ ລ້ຽວແຄບໄດ້ດີ ເໝາະສຳລັບສາງທີ່ມີການສັນຈອນຂອງລົດຍົກຢ່າງຕໍ່ເນື່ອງ.",
      descEn: "Compact ride-on footprint with exceptional manoeuvrability in high-traffic forklift aisles.",
      badge: "Agile Dynamic",
    },
    {
      model: "BR 755 / 755C / 855",
      titleLo: "Ergonomics & Proven Reliability",
      titleEn: "Focus on Ergonomics and Reliability",
      descLo: "ລຸ້ນຍອດນິຍົມລະດັບສາກົນ ຫ້ອງຄວບຄຸມສະດວກສະບາຍ ທົນທານ ບຳລຸງຮັກສາງ່າຍ.",
      descEn: "Renowned industrial workhorse with ergonomic operator seat and ultra-low maintenance downtime.",
      badge: "Proven Ergonomic",
    },
    {
      model: "SC3500",
      titleLo: "The Mid-Size Solution for High Productivity",
      titleEn: "Mid-Size Solution for High Productivity",
      descLo: "ລົດຂັດພື້ນນັ່ງຂັບຂະໜາດກາງທີ່ໃຫ້ຜົນຜະລິດສູງສຸດ ໃນລາຄາທີ່ຄຸ້ມຄ່າທີ່ສຸດ.",
      descEn: "Cost-effective mid-size ride-on scrubber delivering maximum throughput for medium warehouses.",
      badge: "High Productivity",
    },
  ];

  // SCRUBBERS IN-ACTION ENVIRONMENTS (Slide 5 Gallery)
  const SCRUBBER_ENVIRONMENTS = [
    {
      name: "SC8000",
      locationLo: "ສາງສິນຄ້າ & ລະບົບຊັ້ນວາງ Racking Aisle",
      locationEn: "Heavy-Duty Warehouse Racking Aisles",
      icon: Warehouse,
      descLo: "ຂັດລ້າງພື້ນ Epoxy ຕາມຊ່ອງທາງລົດຍົກ ດູດນ້ຳແຫ້ງທັນທີ ບໍ່ມື່ນ ປອດໄພ 100%.",
      descEn: "Dries floor instantly in high-traffic forklift aisles to prevent tyre skidding.",
    },
    {
      name: "SC2000",
      locationLo: "ໂຖງສຳນັກງານ & ອາຄານທຸລະກິດ (Corporate Lobby)",
      locationEn: "Corporate Lobby & Commercial Halls",
      icon: Building2,
      descLo: "ຂະໜາດ Micro Ride-On ສຽງງຽບພິເສດ ບໍ່ລົບກວນຜູ້ມາຕິດຕໍ່ ແລະ ພະນັກງານ.",
      descEn: "Micro ride-on doubling productivity with whisper-quiet operation in client-facing areas.",
    },
    {
      name: "SC500",
      locationLo: "ໂຮງໝໍ & ສູນການແພດ (Hospital Clean Corridors)",
      locationEn: "Hospital Corridors & Healthcare Facilities",
      icon: Stethoscope,
      descLo: "ມາດຕະຖານອະນາໄມສູງສຸດ ຄວບຄຸມການແຜ່ກະຈາຍຂອງເຊື້ອພະຍາດ ແລະ ສຽງງຽບ SilentMode™.",
      descEn: "Hospital-grade sanitisation with SilentMode™ for noise-sensitive clinical environments.",
    },
    {
      name: "SC351",
      locationLo: "ໂຮງແຮມ 5 ດາວ & ສູນປະຊຸມ (Luxury Hotel Receptions)",
      locationEn: "Luxury Hotel Receptions & Convention Centers",
      icon: Hotel,
      descLo: "ຂັດແລະດູດແຫ້ງໄດ້ທັງເດີນໜ້າ-ຖອຍຫຼັງ ເຂົ້າເຖິງທຸກມຸມໂຕະເຄົາເຕີ ແລະ ຊ່ອງແຄບ.",
      descEn: "Full scrubbing and drying both forward and backward around reception desks and tight corners.",
    },
  ];

  // SCRUBBERS WALK-BEHIND & COMPACT (Slide 4)
  const WALK_BEHIND_MODELS = [
    { model: "SC100", title: "Master of Small Space Cleaning", type: "Upright Compact" },
    { model: "SC250", title: "Scrubbing, Sweeping & Drying Every Corner", type: "Compact Multi-Task" },
    { model: "SC351", title: "Scrubbing & Drying Backwards & Forwards", type: "Bi-Directional" },
    { model: "SC401", title: "High & Consistent Cleaning Performance", type: "Daily Commercial" },
    { model: "SC430 / SC450", title: "Simple, Basic & User-Friendly Operation", type: "Reliable Value" },
    { model: "SC500 / SC530", title: "Cost-Effective, Sustainable & Easy to Service", type: "Eco Sustainable" },
    { model: "BA/CA 551 / 611", title: "Silent, Compact & Easy to Manoeuvre", type: "Ultra-Quiet Walk-Behind" },
    { model: "BA 651 / 751 / 851", title: "Productive as a Ride-On, Great for Walk-Behind", type: "Heavy-Duty Walk-Behind" },
    { model: "SC800", title: "Robust & Thorough for All Heavy Applications", type: "Extreme Industrial" },
    { model: "SC1500", title: "Innovative Stand-On Setting a New Standard", type: "Stand-On Agile" },
    { model: "BR 652 / 752", title: "Super Low Noise Level, Ergonomic & Compact", type: "Compact Ride-On" },
    { model: "SC2000", title: "Micro Ride-On Doubling Output at Walk-Behind Price", type: "Micro Ride-On" },
  ];

  // SWEEPERS FLEET (Slide 6)
  const SWEEPER_MODELS = [
    {
      model: "CS7010",
      type: "Hybrid & ePower Combi Machine",
      descLo: "ນະວັດຕະກຳລົດໄຮບຣິດ ແລະ ໄຟຟ້າຄັນທຳອິດທີ່ 'ກວາດ ແລະ ຂັດລ້າງແຫ້ງ' ພ້ອມກັນໃນຄັນດຽວ ປະຢັດຕົ້ນທຶນໄດ້ມະຫາສານ.",
      descEn: "First Hybrid and ePower driven combi machines combining heavy sweeping and scrubbing in a single pass.",
      badge: "World 1st Combi Hybrid",
    },
    {
      model: "SW8000",
      type: "Heavy Industrial Sweeper",
      descLo: "ລົດກວາດພື້ນລຸ້ນໃຫຍ່ພິເສດ ດູດກວາດຝຸ່ນ ແລະ ຂີ້ເຫຍື້ອໃນລານຈອດລົດໃຕ້ດິນ, ສາງໃຫຍ່ ແລະ ຖະໜົນໂຮງງານ.",
      descEn: "Heavy-duty ride-on sweeper for underground parking, massive logistics bays, and industrial grounds.",
      badge: "Mega Facility Sweeper",
    },
    {
      model: "SR1601",
      type: "Outdoor Scrap & Yard Sweeper",
      descLo: "ທົນທານຕໍ່ເສດເຫຼັກ, ໂລຫະ, ຊີມັງ ແລະ ຂີ້ຝຸ່ນໜາ ໃນລານໂຮງງານຜະລິດໂຄງສ້າງເຫຼັກ ແລະ ທ່າບົກ.",
      descEn: "Engineered for severe outdoor conditions, scrap metal yards, dry bulk facilities, and cement terminals.",
      badge: "Heavy Yard Duty",
    },
    {
      model: "SR1101 / SR1000S",
      type: "Compact & Agile Ride-On",
      descLo: "ລົດກວາດພື້ນນັ່ງຂັບຂະໜາດກາງ ຄ່ອງຕົວສູງ ສຳລັບໂຮງງານໃນຮົ່ມ, ສູນກິລາ ແລະ ໂຮງພິມ.",
      descEn: "Highly versatile mid-size ride-on sweeper for indoor factories, stadiums, and fabrication bays.",
      badge: "Agile Ride-On",
    },
    {
      model: "SW900 & SW751",
      type: "Walk-Behind Commercial Sweepers",
      descLo: "ເຄື່ອງກວາດພື້ນແບບຍ່າງຕາມ ດູດຂີ້ຝຸ່ນບໍ່ຟຸ້ງ ໃຊ້ໃນໂຊຣູມລົດ, ສູນການຄ້າ, ແລະ ໂຮງງານເຈ້ຍ.",
      descEn: "Walk-behind industrial sweepers with traction drive and dust control for retail malls and workshops.",
      badge: "Commercial Walk-Behind",
    },
  ];

  // INDUSTRIAL VACS: SWARF, LIQUIDS & MANUFACTURING (Slide 3)
  const SWARF_APPLICATIONS = [
    {
      model: "VHO200",
      appLo: "ໂຮງກຶງ CNC: ນ້ຳມັນຫຼໍ່ເຢັນ & ເສດເຫຼັກ (Metal Swarf & Coolant)",
      appEn: "CNC Metalworking: Coolant & Metal Swarf",
      descLo: "ດູດນ້ຳມັນຫຼໍ່ເຢັນພ້ອມເສດໂລຫະແຍກອອກຈາກກັນ ພ້ອມວາວປ່ຽນທິດທາງປ່ອຍນ້ຳມັນຄືນຖັງໄວ.",
      descEn: "Recovers cutting fluids and separates metal shavings with divert valve for rapid discharge.",
      tag: "CNC & Machining",
    },
    {
      model: "VHS120",
      appLo: "ສາຍບັນຈຸພັນ: ເສດຟິມ & ເສດຕັດພລາສຕິກ (Packaging & Trimming)",
      appEn: "Packaging Lines: Film & Trim Recovery",
      descLo: "ດູດເສດເສັ້ນໃຍ ແລະ ເສດຟິມພລາສຕິກຕໍ່ເນື່ອງໃນສາຍການຜະລິດ ປ້ອງກັນການຕິດຂັດຂອງເຄື່ອງຈັກ.",
      descEn: "Continuous suction of plastic trims, paper strips, and off-cuts to avoid line jams.",
      tag: "Converting & Packaging",
    },
    {
      model: "VHS120",
      appLo: "ໂຮງງານເບເກີຣີ & ໂຮງໂມ່: ຝຸ່ນແປ້ງລະອຽດ (Flour & Food Powder)",
      appEn: "Bakery & Food Processing: Dry Flour & Powders",
      descLo: "ມາດຕະຖານ Food-Grade ດັກຈັບຝຸ່ນແປ້ງລະອຽດ ປ້ອງກັນການເກີດຝຸ່ນລະເບີດຕາມມາດຕະຖານ ATEX.",
      descEn: "Hygienic collection of fine food powders and flour compliant with food safety standards.",
      tag: "Food & Bakery",
    },
    {
      model: "VHO200",
      appLo: "ໂຮງງານເຄື່ອງດື່ມ & ເຄມີ: ທາດແຫຼວຮົ່ວໄຫຼ (Chemical & Beverage Liquids)",
      appEn: "Chemical & Beverage: Heavy Liquid Recovery",
      descLo: "ດູດທາດແຫຼວປະລິມານຫຼາຍຈາກພື້ນໂຮງງານ ແລະ ຖັງໝັກ ລ້າງສານເຄມີໄດ້ສະອາດໝົດຈົດ.",
      descEn: "High-capacity liquid recovery from processing floors and tanks with chemical-resistant tank.",
      tag: "Beverage & Chemical",
    },
  ];

  // INDUSTRIAL VACS: HAZARDOUS DUST & INFINICLEAN (Slide 2)
  const HAZARDOUS_MODELS = [
    {
      model: "VHS 40 M/H & VHS 42 M/H",
      titleLo: "ດັກຝຸ່ນອັນຕະລາຍ Class M/H ພ້ອມ InfiniClean™",
      titleEn: "Hazardous Dust Class M/H with InfiniClean™",
      descLo: "ເຊື່ອມຕໍ່ກັບເຄື່ອງຕັດຄອນກຣີດ/ຫີນ ດັກຝຸ່ນ Silica ໄດ້ 99.99% ພ້ອມລະບົບເຄາະໄສ້ກອງອັດຕະໂນມັດ.",
      descEn: "Certified for Class M/H dangerous dust with automatic filter cleaning for non-stop masonry grinding.",
      badge: "Silica & Masonry",
    },
    {
      model: "VHB436",
      titleLo: "ແບັດເຕີຣີ Lithium-Ion ໄຮ້ສາຍ (Battery Industrial Vac)",
      titleEn: "Cordless Lithium-Ion Battery Industrial Vacuum",
      descLo: "ເຄື່ອງດູດຝຸ່ນອຸດສາຫະກຳໄຮ້ສາຍ ລຸ້ນທຳອິດທີ່ໃຊ້ແບັດ Lithium-Ion ສາກໄວ ເຄື່ອນຍ້າຍໄດ້ທົ່ວໂຮງງານ.",
      descEn: "First battery-powered industrial vacuum with fast-charging Li-Ion battery for 100% wireless freedom.",
      badge: "Li-Ion Cordless",
    },
    {
      model: "S2 & S3",
      titleLo: "ລະບົບດິຈິຕອລເຕັມຮູບແບບ & ໂຄງສ້າງໂມດູລາ (Digital Modular)",
      titleEn: "First Digital and Fully Modular Industrial Vacuums",
      descLo: "ໜ້າຈໍດິຈິຕອລແຈ້ງເຕືອນສະຖານະໄສ້ກອງ ຖັງຂະໜາດ 50L/100L ປ່ຽນຖົງຂີ້ເຫຍື້ອປອດໄພ Longopac®.",
      descEn: "Real-time digital filter monitoring with fully modular configurations and Longopac® disposal.",
      badge: "Digital Modular",
    },
    {
      model: "T40W",
      titleLo: "ມໍເຕີກຳລັງສູງ 4 kW ພ້ອມລະບົບ InfiniClean™",
      titleEn: "4 kW High Airflow with InfiniClean™ Filtration",
      descLo: "ມໍເຕີອິນດັກຊັນ 4kW ແຮງດູດມະຫາສານ ສຳລັບວຽກຜະລິດໜັກ 24/7 ບໍ່ມີວັນຕັນ.",
      descEn: "4 kW induction motor delivering massive airflow for heavy continuous production lines.",
      badge: "4 kW Continuous Duty",
    },
    {
      model: "GM 80P",
      titleLo: "ໂຄງສ້າງອາລູມີນຽມແຂງແກ່ນລະດັບຕຳນານ (Rigid Construction)",
      titleEn: "Rigid Aluminium Construction for Specialized Jobs",
      descLo: "ນ້ຳໜັກເບົາ ແຂງແກ່ນພິເສດ ມາດຕະຖານຫ້ອງທົດລອງ, ຫ້ອງ Cleanroom ແລະ ສາຍການຜະລິດຢາ.",
      descEn: "Indestructible aluminium drum ideal for laboratories, pharmaceutical cleanrooms, and tech plants.",
      badge: "Cleanroom Legend",
    },
  ];

  // COMMERCIAL WET & DRY VL SERIES (Slide 1)
  const VL_APPLICATIONS = [
    {
      name: "VL 100",
      targetLo: "ເຮືອນຄົວໂຮງແຮມ & ຮ້ານອາຫານ (Commercial Kitchen)",
      targetEn: "Commercial Kitchens & Food Preparation",
      descLo: "ດູດນ້ຳລ້າງພື້ນເຮືອນຄົວ, ຄາບໄຂມັນ ແລະ ນ້ຳແກງຮົ່ວໄຫຼ ຖັງສະແຕນເລດບໍ່ເປັນສະໜິມ.",
      descEn: "Stainless steel tank picks up greasy wash water, spills, and food debris effortlessly.",
    },
    {
      name: "VL 200",
      targetLo: "ອູ່ສ້ອມແປງ & ໂຮງງານ (Workshop & Garage Floors)",
      targetEn: "Automotive Workshops & Maintenance Garages",
      descLo: "ດູດນ້ຳມັນເຄື່ອງ, ນ້ຳຢາລ້າງ ແລະ ເສດດິນຊາຍ ພ້ອມລະບົບກົດປຸ່ມທຳຄວາມສະອາດໄສ້ກອງ.",
      descEn: "Compact wet/dry pickup with Push&Clean filter cleaning for mechanics and workshops.",
    },
    {
      name: "VL 500",
      targetLo: "ໂຮງງານເບຍ & ເຄື່ອງດື່ມ (Brewery & Beverage Plant)",
      targetEn: "Breweries & Beverage Bottling Facilities",
      descLo: "ລະບົບ Ergonomic Tipping System ເທນ້ຳເສຍອອກຈາກຖັງຂະໜາດໃຫຍ່ໄດ້ສະດວກ ໂດຍບໍ່ຕ້ອງຍົກໜັກ.",
      descEn: "Ergonomic tipping system allows fast emptying of large liquid volumes without back strain.",
    },
  ];

  // COMMERCIAL DRY VP SERIES (Slide 5 Previous Batch)
  const VACUUM_MODELS = [
    { model: "VP100", type: "Commercial Compact", descLo: "ອອກແບບຕາມຫຼັກ Ergonomic, ປະຢັດພະລັງງານສູງ, ເໝາະສຳລັບການທຳຄວາມສະອາດປະຈຳວັນ.", descEn: "Ergonomic design for flawless everyday cleaning.", highlight: "Ergonomic & Efficient" },
    { model: "VP300 series", type: "Everyday Workhorse", descLo: "ເຄື່ອງດູດຝຸ່ນຍອດນິຍົມທີ່ໜ້າເຊື່ອຖື, ນ້ຳໜັກເບົາ, ທົນທານ, ລະດັບສຽງງຽບພິເສດ.", descEn: "Reliable everyday vacuum in lightweight design.", highlight: "Lightweight & Reliable" },
    { model: "VP930 / GD930", type: "Legendary Heavy-Duty", descLo: "ລຸ້ນດັງລະດັບຕຳນານ! ທົນທານທີ່ສຸດ, ດູດແຮງ, ມາດຕະຖານໂຮງແຮມ 5 ດາວ ແລະ ໂຮງງານອຸດສາຫະກຳ.", descEn: "Famous workhorse - durable for large areas.", highlight: "The Legendary Workhorse" },
    { model: "VP600 series", type: "Eco Advanced HEPA", descLo: "ນະວັດຕະກຳທຳຄວາມສະອາດທີ່ເປັນມິດກັບສິ່ງແວດລ້ອມ ພ້ອມລະບົບກອງຝຸ່ນລະອຽດ HEPA H13.", descEn: "Eco-friendly cleaning with HEPA H13 filter.", highlight: "HEPA H13 Filtration" },
    { model: "VP600 Battery", type: "Cordless Li-Ion", descLo: "ເຄື່ອງດູດຝຸ່ນໄຮ້ສາຍ 2 ລະດັບຄວາມໄວ ໃຊ້ແບັດ Lithium-Ion ແລ່ນຕໍ່ເນື່ອງໄດ້ເຖິງ 60 ນາທີ.", descEn: "Cordless Li-ion runtime of up to 60 minutes.", highlight: "60-Min Cordless Battery" },
    { model: "VU500", type: "Upright Carpet Master", descLo: "ເຄື່ອງດູດຝຸ່ນແປງຕີພື້ນພົມມາດຕະຖານສູງ ດູດຝຸ່ນຝັງແໜ້ນໃນພົມໄດ້ສະອາດໝົດຈົດ.", descEn: "Exceptional cleaning for low/medium carpets.", highlight: "Carpet Brush Master" },
    { model: "GU 700A", type: "Wide-Track Commercial", descLo: "ເຄື່ອງດູດຝຸ່ນລຸ້ນຕັ້ງ Heavy-Duty ໜ້າກວ້າງພິເສດ ດູດໄວໃນພື້ນທີ່ຂະໜາດໃຫຍ່.", descEn: "Heavy-duty upright vacuum for large halls.", highlight: "Extra-Wide Heavy-Duty" },
    { model: "GD 5/10/FLY & Battery", type: "Backpack Mobility", descLo: "ເຄື່ອງດູດຝຸ່ນສະພາຍຫຼັງ (Backpack) ສະດວກສະບາຍສຳລັບຊ່ອງແຄບ, ໂຮງໜັງ, ເຮືອບິນ, ແລະ ບັນໄດ.", descEn: "Backpack vacuum in corded and battery models.", highlight: "Backpack Mobility" },
  ];

  return (
    <div
      id="nilfisk-cleaning"
      className="mt-16 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden"
    >
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 space-y-10">
        {/* Header Block */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>OFFICIAL NILFISK PROFESSIONAL & INDUSTRIAL CLEANING PARTNER</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            {isLo ? (
              <>
                ມືອາຊີບເລືອກ ອຸປະກອນທຳຄວາມສະອາດ: <span className="text-blue-400">Nilfisk Total Solutions</span>
              </>
            ) : (
              <>
                Professionals Choose: <span className="text-blue-400">Nilfisk Cleaning Solutions</span>
              </>
            )}
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {isLo
              ? "ດີເຄ ລາວ ເປັນຕົວແທນຈຳໜ່າຍ ແລະ ບໍລິການອຸປະກອນທຳຄວາມສະອາດ Nilfisk ອັນດັບ 1 ຂອງໂລກຈາກເດນມາກ. ຄົບວົງຈອນທັງລົດເຊັດຂັດພື້ນແຫ້ງ Scrubber Dryers, ລົດກວາດພື້ນໄຮບຣິດ Sweepers, ເຄື່ອງດູດຝຸ່ນອຸດສາຫະກຳດັກຝຸ່ນອັນຕະລາຍ, ດູດນ້ຳມັນຫຼໍ່ເຢັນ CNC, ແລະ ເຄື່ອງດູດຝຸ່ນ-ດູດນ້ຳມາດຕະຖານ F&B / HACCP."
              : "DK LAO represents global cleaning leader Nilfisk (Denmark). Delivering turnkey floor care: ride-on scrubber dryers, hybrid sweeper combis, hazardous dust industrial vacuums, CNC oil & swarf extractors, and commercial wet/dry units for HACCP, cleanroom, and manufacturing plants."}
          </p>

          {/* 4 Main Tabs Switcher */}
          <div className="flex flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-white/10 border border-white/10 text-xs font-bold mt-3 max-w-3xl mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab("scrubbers")}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === "scrubbers"
                  ? "bg-blue-600 text-white shadow-lg font-black"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>{isLo ? "1. ເຄື່ອງຂັດພື້ນແຫ້ງ (Scrubbers)" : "1. Scrubber Dryers"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("sweepers")}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === "sweepers"
                  ? "bg-amber-600 text-white shadow-lg font-black"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Combine className="w-3.5 h-3.5" />
              <span>{isLo ? "2. ເຄື່ອງກວາດພື້ນ (Sweepers)" : "2. Sweepers & Combi"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("industrial_vacs")}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === "industrial_vacs"
                  ? "bg-indigo-600 text-white shadow-lg font-black"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Factory className="w-3.5 h-3.5" />
              <span>{isLo ? "3. ດູດຝຸ່ນອຸດສາຫະກຳ (Industrial Vacs)" : "3. Industrial Vacuums"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("commercial_vacs")}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === "commercial_vacs"
                  ? "bg-cyan-600 text-white shadow-lg font-black"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>{isLo ? "4. ເຄື່ອງດູດຝຸ່ນເຄິ່ງອຸດສາຫະກຳ (Commercial)" : "4. Commercial Vacuums"}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: SCRUBBER DRYERS (Slides 4 & 5) */}
        {/* ========================================================================= */}
        {activeTab === "scrubbers" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Sub-toggle: Ride-On vs Walk-Behind */}
            <div className="flex justify-center gap-2">
              <button
                type="button"
                onClick={() => setScrubberSubTab("ride_on")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  scrubberSubTab === "ride_on"
                    ? "bg-blue-500 text-white shadow-md font-black"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {isLo ? "ລົດຂັດພື້ນນັ່ງຂັບອຸດສາຫະກຳໜັກ (Heavy Ride-On)" : "Heavy-Duty Industrial Ride-On (SC3500–SC8000)"}
              </button>
              <button
                type="button"
                onClick={() => setScrubberSubTab("walk_behind")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  scrubberSubTab === "walk_behind"
                    ? "bg-blue-500 text-white shadow-md font-black"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {isLo ? "ເຄື່ອງຂັດພື້ນຍ່າງຕາມ & Micro Ride-On (Walk-Behind)" : "Compact & Walk-Behind (SC100–SC2000)"}
              </button>
            </div>

            {/* SubTab 1A: Heavy Ride-On (Slide 5) */}
            {scrubberSubTab === "ride_on" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-white relative group">
                  <div 
                    onClick={() => setLightbox({
                      isOpen: true,
                      src: "/images/solutions/nilfisk-scrubber-dryers-heavy-ride-on.png",
                      alt: "Nilfisk Scrubber Dryers Heavy Industrial Ride-On Lineup - SC3500 to SC8000",
                      titleLo: "ລົດຂັດລ້າງພື້ນອຸດສາຫະກຳໜັກ Nilfisk Heavy Ride-On (SC3500 – SC8000)",
                      titleEn: "Nilfisk Heavy Industrial Ride-On Scrubber Dryers (SC3500–SC8000)",
                      subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1152px)",
                      subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                    })}
                    className="relative aspect-[16/9] w-full cursor-pointer group/img"
                  >
                    <Image
                      src="/images/solutions/nilfisk-scrubber-dryers-heavy-ride-on.png"
                      alt="Nilfisk Scrubber Dryers Heavy Industrial Ride-On Lineup - SC3500 to SC8000"
                      fill
                      unoptimized
                      priority
                      className="object-contain crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                      <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                      <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900/95 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-300 font-bold">
                      <span className="text-blue-400 font-mono">NILFISK HEAVY RIDE-ON SCRUBBER DRYERS</span>
                      <span className="text-slate-600">•</span>
                      <span>{isLo ? "ຂັດລ້າງພື້ນທີ່ກວ້າງ 5,000–10,000 m²/h ພ້ອມດູດແຫ້ງທັນທີ 100%" : "5,000–10,000 m²/h High Throughput with Instant Dry"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Danish Build • Heavy Industrial Duty</span>
                    </div>
                  </div>
                </div>

                {/* 6 Heavy Ride-On Models Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {RIDE_ON_MODELS.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm flex flex-col justify-between hover:border-blue-400/50 hover:bg-blue-500/10 transition-all group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm font-black text-blue-400">
                            {item.model}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                            {item.badge}
                          </span>
                        </div>
                        <h4 className="text-xs font-black text-white group-hover:text-blue-300 transition-colors">
                          {isLo ? item.titleLo : item.titleEn}
                        </h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {isLo ? item.descLo : item.descEn}
                        </p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-bold text-slate-400">
                        <span>Ride-On Series</span>
                        <a href="#booking-form" className="text-blue-400 hover:underline flex items-center gap-0.5">
                          <span>{isLo ? "ຂໍໃບສະເໜີລາຄາ" : "Get Quote"}</span>
                          <ChevronRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 4 In-Action Environments Gallery */}
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span>{isLo ? "ສະຖານທີ່ນຳໃຊ້ຕົວຈິງຕາມມາດຕະຖານສາກົນ (In-Action Applications)" : "Field Verified In-Action Applications"}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {SCRUBBER_ENVIRONMENTS.map((env, idx) => {
                      const IconComp = env.icon;
                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md space-y-2"
                        >
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-mono font-black text-blue-400">{env.name}</div>
                              <div className="text-[10px] text-slate-400">{isLo ? env.locationLo : env.locationEn}</div>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {isLo ? env.descLo : env.descEn}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* SubTab 1B: Compact & Walk-Behind (Slide 4) */}
            {scrubberSubTab === "walk_behind" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-white relative group">
                  <div 
                    onClick={() => setLightbox({
                      isOpen: true,
                      src: "/images/solutions/nilfisk-scrubber-dryers-walk-behind-compact.png",
                      alt: "Nilfisk Walk-Behind and Compact Scrubber Dryers - SC100 to SC2000",
                      titleLo: "ເຄື່ອງຂັດພື້ນຍ່າງຕາມ & Micro Ride-On Nilfisk (SC100 – SC2000)",
                      titleEn: "Nilfisk Walk-Behind and Compact Scrubber Dryers",
                      subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1154px)",
                      subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                    })}
                    className="relative aspect-[16/9] w-full cursor-pointer group/img"
                  >
                    <Image
                      src="/images/solutions/nilfisk-scrubber-dryers-walk-behind-compact.png"
                      alt="Nilfisk Walk-Behind and Compact Scrubber Dryers - SC100 to SC2000"
                      fill
                      unoptimized
                      className="object-contain crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                      <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                      <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900/95 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-300 font-bold">
                      <span className="text-blue-400 font-mono">NILFISK WALK-BEHIND & MICRO RIDE-ON</span>
                      <span className="text-slate-600">•</span>
                      <span>{isLo ? "ຄ່ອງຕົວສູງ ສຳລັບຊ່ອງແຄບ, ໂຮງງານ, ໂຮງໝໍ, ໂຮງແຮມ ແລະ ສາງຂະໜາດກາງ" : "Agile Cleaning for Tight Aisles, Hospitals, Hotels & Facilities"}</span>
                    </div>
                  </div>
                </div>

                {/* Walk-Behind Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {WALK_BEHIND_MODELS.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col justify-between hover:border-blue-400/40 transition-all"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-black text-blue-400">{item.model}</span>
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">{item.type}</span>
                        </div>
                        <p className="text-xs text-slate-200 leading-snug">{item.title}</p>
                      </div>
                      <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Walk-Behind</span>
                        <a href="#booking-form" className="text-blue-400 hover:underline">Inquire →</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SWEEPERS & COMBI MACHINES (Slide 6) */}
        {/* ========================================================================= */}
        {activeTab === "sweepers" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-white relative group">
              <div 
                onClick={() => setLightbox({
                  isOpen: true,
                  src: "/images/solutions/nilfisk-industrial-sweepers-fleet.jpg",
                  alt: "Nilfisk Industrial Sweepers Lineup - CS7010 Combi, SW8000, SR1601, SR1101, SW900",
                  titleLo: "ກອງທັບລົດກວາດ ແລະ ຂັດລ້າງໄຮບຣິດ Nilfisk CS7010 Combi & Industrial Sweepers",
                  titleEn: "Nilfisk Industrial Sweepers Lineup & CS7010 Hybrid Combi",
                  subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1152px)",
                  subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                })}
                className="relative aspect-[16/9] w-full cursor-pointer group/img"
              >
                <Image
                  src="/images/solutions/nilfisk-industrial-sweepers-fleet.jpg"
                  alt="Nilfisk Industrial Sweepers Lineup - CS7010 Combi, SW8000, SR1601, SR1101, SW900"
                  fill
                  unoptimized
                  className="object-contain crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                  <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                </div>
              </div>
              <div className="p-4 bg-slate-900/95 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300 font-bold">
                  <span className="text-amber-400 font-mono">CS7010 HYBRID COMBI & SWEEPERS</span>
                  <span className="text-slate-600">•</span>
                  <span>{isLo ? "ລົດໄຮບຣິດຄັນທຳອິດທີ່ 'ກວາດ ແລະ ຂັດລ້າງແຫ້ງ' ພ້ອມກັນໃນຄັນດຽວ ປະຢັດຕົ້ນທຶນ 50%" : "First Hybrid Combi Sweeper-Scrubber in One Pass"}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Heavy Outdoor Yards & Indoor Arenas</span>
                </div>
              </div>
            </div>

            {/* Sweepers Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SWEEPER_MODELS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm flex flex-col justify-between hover:border-amber-400/50 hover:bg-amber-500/10 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-black text-amber-400">{item.model}</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">{item.badge}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-200">{item.type}</div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{isLo ? item.descLo : item.descEn}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Industrial Sweeping</span>
                    <a href="#booking-form" className="text-amber-400 hover:underline flex items-center gap-0.5">
                      <span>{isLo ? "ນັດທົດສອບລົດ" : "Book Demo"}</span>
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: INDUSTRIAL VACUUMS (Slides 2 & 3) */}
        {/* ========================================================================= */}
        {activeTab === "industrial_vacs" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Sub-toggle: Swarf & Machining vs Hazardous Dust & Heavy Duty */}
            <div className="flex justify-center gap-2">
              <button
                type="button"
                onClick={() => setIndustrialSubTab("swarf_liquids")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  industrialSubTab === "swarf_liquids"
                    ? "bg-indigo-600 text-white shadow-md font-black"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {isLo ? "ດູດນ້ຳມັນຫຼໍ່ເຢັນ, ເສດຂີ້ກຶງ & ອາຫານ (VHS120 & VHO200)" : "Machining Oil, Swarf & Liquids (VHS120 / VHO200)"}
              </button>
              <button
                type="button"
                onClick={() => setIndustrialSubTab("hazardous_dust")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  industrialSubTab === "hazardous_dust"
                    ? "bg-indigo-600 text-white shadow-md font-black"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {isLo ? "ດັກຝຸ່ນອັນຕະລາຍ M/H & ແບັດ Lithium (Heavy Duty & Battery)" : "Hazardous Dust & Li-Ion Battery Vacuums"}
              </button>
            </div>

            {/* SubTab 3A: Machining Oils, Coolants & Swarf (Slide 3) */}
            {industrialSubTab === "swarf_liquids" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-white relative group">
                  <div 
                    onClick={() => setLightbox({
                      isOpen: true,
                      src: "/images/solutions/nilfisk-industrial-vacuums-oil-liquids-swarf.png",
                      alt: "Nilfisk Industrial Vacuums - VHS120 and VHO200 for Swarf, Oil, Packaging, Bakery and Chemical",
                      titleLo: "ເຄື່ອງດູດຝຸ່ນແຍກນ້ຳມັນ ແລະ ເສດໂລຫະ Nilfisk Oil & Swarf Recovery (VHS120, VHO200)",
                      titleEn: "Nilfisk Oil & Swarf Recovery Industrial Vacuums",
                      subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1160px)",
                      subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                    })}
                    className="relative aspect-[16/9] w-full cursor-pointer group/img"
                  >
                    <Image
                      src="/images/solutions/nilfisk-industrial-vacuums-oil-liquids-swarf.png"
                      alt="Nilfisk Industrial Vacuums - VHS120 and VHO200 for Swarf, Oil, Packaging, Bakery and Chemical"
                      fill
                      unoptimized
                      className="object-contain crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                      <ZoomIn className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900/95 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-300 font-bold">
                      <span className="text-indigo-400 font-mono">NILFISK OIL & SWARF RECOVERY</span>
                      <span className="text-slate-600">•</span>
                      <span>{isLo ? "ແຍກເສດໂລຫະ ແລະ ນ້ຳມັນຫຼໍ່ເຢັນ CNC ພ້ອມວາວ Diverting Valve ປ່ອຍນ້ຳມັນໄວ" : "Coolant & Chip Recovery with Rapid Diverting Valve Discharge"}</span>
                    </div>
                  </div>
                </div>

                {/* 4 Swarf & Liquid Applications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SWARF_APPLICATIONS.map((app, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-sm flex flex-col justify-between hover:border-indigo-400/50 hover:bg-indigo-500/10 transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-black text-indigo-400">{app.model}</span>
                          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">{app.tag}</span>
                        </div>
                        <h4 className="text-xs font-black text-white">{isLo ? app.appLo : app.appEn}</h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{isLo ? app.descLo : app.descEn}</p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Industrial Machining Duty</span>
                        <a href="#booking-form" className="text-indigo-400 hover:underline">Consult Specialist →</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SubTab 3B: Hazardous Dust & Battery (Slide 2) */}
            {industrialSubTab === "hazardous_dust" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-white relative group">
                  <div 
                    onClick={() => setLightbox({
                      isOpen: true,
                      src: "/images/solutions/nilfisk-industrial-vacuums-heavy-duty.png",
                      alt: "Nilfisk Industrial Vacuums - GM80P, VHS40/42, VHB436, S2, S3, T40W",
                      titleLo: "ເຄື່ອງດູດຝຸ່ນອັນຕະລາຍ Class M/H & ແບັດ Lithium Nilfisk Heavy-Duty Lineup",
                      titleEn: "Nilfisk Hazardous Dust & Heavy-Duty Vacuums",
                      subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1148px)",
                      subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                    })}
                    className="relative aspect-[16/9] w-full cursor-pointer group/img"
                  >
                    <Image
                      src="/images/solutions/nilfisk-industrial-vacuums-heavy-duty.png"
                      alt="Nilfisk Industrial Vacuums - GM80P, VHS40/42, VHB436, S2, S3, T40W"
                      fill
                      unoptimized
                      className="object-contain crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                      <ZoomIn className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900/95 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-300 font-bold">
                      <span className="text-indigo-400 font-mono">HAZARDOUS DUST & BATTERY VACUUMS</span>
                      <span className="text-slate-600">•</span>
                      <span>{isLo ? "ມາດຕະຖານ Class M/H ສຳລັບຝຸ່ນຕັດຄອນກຣີດ ແລະ ມໍເຕີ 4kW InfiniClean™ 24/7" : "Class M/H Certified for Concrete Dust & 4 kW Continuous InfiniClean™"}</span>
                    </div>
                  </div>
                </div>

                {/* 5 Models Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {HAZARDOUS_MODELS.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col justify-between hover:border-indigo-400/50 transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-black text-indigo-400">{item.model}</span>
                          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">{item.badge}</span>
                        </div>
                        <h4 className="text-xs font-black text-white">{isLo ? item.titleLo : item.titleEn}</h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{isLo ? item.descLo : item.descEn}</p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Certified Dust Control</span>
                        <a href="#booking-form" className="text-indigo-400 hover:underline">Get Specs →</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: COMMERCIAL VACUUMS (WET & DRY VL + DRY VP SERIES) */}
        {/* ========================================================================= */}
        {activeTab === "commercial_vacs" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Sub-toggle: Wet & Dry VL vs Dry VP */}
            <div className="flex justify-center gap-2">
              <button
                type="button"
                onClick={() => setCommercialSubTab("wet_dry")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  commercialSubTab === "wet_dry"
                    ? "bg-teal-600 text-white shadow-md font-black"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {isLo ? "ດູດນ້ຳ-ດູດແຫ້ງ (VL100, VL200, VL500)" : "Commercial Wet & Dry (VL Series)"}
              </button>
              <button
                type="button"
                onClick={() => setCommercialSubTab("dry_vacs")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  commercialSubTab === "dry_vacs"
                    ? "bg-teal-600 text-white shadow-md font-black"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {isLo ? "ດູດຝຸ່ນແຫ້ງ 8 ລຸ້ນ (VP Series & Backpack)" : "Commercial Dry Vacuums (VP Series)"}
              </button>
            </div>

            {/* SubTab 4A: VL Wet & Dry (Slide 1) */}
            {commercialSubTab === "wet_dry" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-white relative group">
                  <div 
                    onClick={() => setLightbox({
                      isOpen: true,
                      src: "/images/solutions/nilfisk-commercial-wet-dry-vl-series.png",
                      alt: "Nilfisk Commercial Wet and Dry Vacuums - VL100, VL200, VL500 Series",
                      titleLo: "ເຄື່ອງດູດຝຸ່ນ ແລະ ນ້ຳອຸດສາຫະກຳ Nilfisk VL Series Wet & Dry",
                      titleEn: "Nilfisk VL Series Commercial Wet & Dry Vacuums",
                      subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1160px)",
                      subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                    })}
                    className="relative aspect-[16/9] w-full cursor-pointer group/img"
                  >
                    <Image
                      src="/images/solutions/nilfisk-commercial-wet-dry-vl-series.png"
                      alt="Nilfisk Commercial Wet and Dry Vacuums - VL100, VL200, VL500 Series"
                      fill
                      unoptimized
                      className="object-contain crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                      <ZoomIn className="w-3.5 h-3.5 text-teal-400" />
                      <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900/95 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-300 font-bold">
                      <span className="text-teal-400 font-mono">NILFISK VL SERIES WET & DRY</span>
                      <span className="text-slate-600">•</span>
                      <span>{isLo ? "ດູດໄດ້ທັງຝຸ່ນ ແລະ ນ້ຳ ພ້ອມລະບົບຖັງເທນ້ຳ Ergonomic Tipping System" : "Wet & Dry Pickup with Ergonomic Tipping System"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Stainless Steel & Engineering Plastic Tanks</span>
                    </div>
                  </div>
                </div>

                {/* 3 Real Field Applications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {VL_APPLICATIONS.map((vl, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-teal-500/20 bg-teal-500/5 backdrop-blur-sm flex flex-col justify-between hover:border-teal-400/50 hover:bg-teal-500/10 transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm font-black text-teal-400">{vl.name}</span>
                          <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold">Field Verified</span>
                        </div>
                        <h4 className="text-xs font-black text-white">{isLo ? vl.targetLo : vl.targetEn}</h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{isLo ? vl.descLo : vl.descEn}</p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Commercial Wet/Dry</span>
                        <a href="#booking-form" className="text-teal-400 hover:underline">Order Unit →</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SubTab 4B: VP Series Dry (Slide 5 of Previous Batch) */}
            {commercialSubTab === "dry_vacs" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-white relative group">
                  <div 
                    onClick={() => setLightbox({
                      isOpen: true,
                      src: "/images/solutions/nilfisk-commercial-vacuum-cleaners.png",
                      alt: "Nilfisk Commercial Vacuum Cleaners Lineup - VP100, VP300, VP930, VP600, VU500, GU700A, GD5",
                      titleLo: "ເຄື່ອງດູດຝຸ່ນແຫ້ງ Nilfisk Commercial Dry Vacuums (VP Series & Backpack)",
                      titleEn: "Nilfisk Commercial Dry Vacuums Lineup",
                      subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1156px)",
                      subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                    })}
                    className="relative aspect-[16/9] w-full cursor-pointer group/img"
                  >
                    <Image
                      src="/images/solutions/nilfisk-commercial-vacuum-cleaners.png"
                      alt="Nilfisk Commercial Vacuum Cleaners Lineup - VP100, VP300, VP930, VP600, VU500, GU700A, GD5"
                      fill
                      unoptimized
                      className="object-contain crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                      <ZoomIn className="w-3.5 h-3.5 text-teal-400" />
                      <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                    </div>
                  </div>
                </div>

                {/* 8 Models Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {VACUUM_MODELS.map((vac, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col justify-between hover:border-cyan-500/50 hover:bg-white/[0.08] transition-all group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-black text-cyan-400">{vac.model}</span>
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">{vac.type}</span>
                        </div>
                        <div className="text-xs font-black text-white group-hover:text-cyan-300 transition-colors">{vac.highlight}</div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{isLo ? vac.descLo : vac.descEn}</p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-bold text-slate-400">
                        <span>Commercial Series</span>
                        <a href="#booking-form" className="text-cyan-400 hover:underline flex items-center gap-0.5">
                          <span>{isLo ? "ສັ່ງຊື້" : "Inquire"}</span>
                          <ChevronRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Nilfisk Consultation & Demo Action Bar */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-cyan-950/60 border border-blue-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-black text-white">
              {isLo ? "ຕ້ອງການທົດສອບເຄື່ອງຂັດພື້ນ ຫຼື ເຄື່ອງດູດຝຸ່ນ Nilfisk ຕົວຈິງທີ່ໂຮງງານຂອງທ່ານ?" : "Request Free On-Site Nilfisk Scrubber or Industrial Vacuum Demo?"}
            </h4>
            <p className="text-xs text-slate-300">
              {isLo
                ? "ທີມງານວິສະວະກອນ DK LAO ພ້ອມນຳເຄື່ອງຂັດພື້ນ Ride-on Scrubber, ລົດກວາດໄຮບຣິດ CS7010 ແລະ ເຄື່ອງດູດຝຸ່ນອຸດສາຫະກຳ Nilfisk ລົງສາທິດປະສິດທິພາບຕົວຈິງເຖິງໂຮງງານຂອງທ່ານຟຣີ."
                : "DK LAO specialists will bring Nilfisk ride-on scrubbers, hybrid combi sweepers, and industrial vacuums for live proof-of-concept testing at your factory."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href={`/${locale}/store?pre_category=nilfisk-cleaning`}
              className="py-2.5 px-4 rounded-xl border border-white/20 hover:bg-white/10 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isLo ? "ເບິ່ງສິນຄ້າ Nilfisk ໃນ Store 🛒" : "Browse Nilfisk in Store 🛒"}</span>
            </Link>
            <a
              href="tel:+8562058929299"
              className="btn-emerald py-2.5 px-4 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>+856 20 5892 9299</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2K High-Resolution Image Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        src={lightbox.src}
        alt={lightbox.alt}
        titleLo={lightbox.titleLo}
        titleEn={lightbox.titleEn}
        subtitleLo={lightbox.subtitleLo}
        subtitleEn={lightbox.subtitleEn}
      />
    </div>
  );
}
