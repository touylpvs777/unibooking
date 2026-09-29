import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Cpu,
  Truck,
  Box,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Bot,
  Warehouse,
  ShieldCheck,
  Zap,
  Wrench,
  BarChart3,
  ExternalLink,
  ChevronRight,
  ZoomIn,
} from "lucide-react";
import { ImageLightboxModal } from "@/components/Forklift/ui/ImageLightboxModal";

export function WarehouseAutomationShowcase() {
  const { i18n } = useTranslation();
  const locale = i18n.language || "lo";
  const isLo = locale === "lo";
  const [activeTab, setActiveTab] = useState<"ecosystem" | "portfolio" | "automation" | "solutions3d">("ecosystem");
  const [selectedEcosystemNode, setSelectedEcosystemNode] = useState<number>(0);

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

  // 11 Turnkey Warehouse Solutions from Slide 5
  const WAREHOUSE_3D_SOLUTIONS = [
    {
      num: 1,
      titleLo: "ໝໍ້ໄຟສຳລັບອຸປະກອນຄ່ຽນຖ່າຍສິນຄ້າ",
      titleEn: "Battery Handling Equipment",
      descLo: "ລະບົບຍົກປ່ຽນແບັດເຕີຣີ, ຕູ້ສາກໄວອຸດສາຫະກຳ ແລະ ແທ່ນສາກແບັດ Lithium-Ion / Lead-Acid.",
      descEn: "Battery roll-out extractor stations, rapid charger banks, and Li-ion power packs.",
      categoryLo: "ພະລັງງານ & ແບັດເຕີຣີ",
      categoryEn: "Power Systems",
    },
    {
      num: 2,
      titleLo: "ລະບົບພື້ນ ແລະ ເສັ້ນນຳສາຍຕາ",
      titleEn: "Floor and Line Marking",
      descLo: "ສີຕີເສັ້ນ Epoxy / PU ແບ່ງຊ່ອງທາງແລ່ນລົດຍົກ, ເຂດຄົນຍ່າງ, ແລະ ຈຸດຈອດພາເລັດມາດຕະຖານ 5S.",
      descEn: "Heavy-duty epoxy traffic lane markings, pedestrian walkways, and 5S pallet staging outlines.",
      categoryLo: "ຄວາມປອດໄພພື້ນສາງ",
      categoryEn: "Floor Safety",
    },
    {
      num: 3,
      titleLo: "ອຸປະກອນທົ່ວໄປໃນສາງ",
      titleEn: "General Warehouse Equipment",
      descLo: "ລົດລາກພາເລັດໄຮໂດຣລິກ (Hand Pallet Trucks), ຂັ້ນໄດຍົກເຄື່ອນທີ່, ແລະ ລົດຍູ້ສິນຄ້າອະເນກປະສົງ.",
      descEn: "Hand pallet jacks, mobile warehouse safety ladders, and industrial platform carts.",
      categoryLo: "ອຸປະກອນພື້ນຖານ",
      categoryEn: "Basic Equipment",
    },
    {
      num: 4,
      titleLo: "ຕູ້ລັອກເກີ, ຕູ້ເອກະສານ ແລະ ຊັ້ນວາງ",
      titleEn: "Lockers, Cabinets and Cupboards",
      descLo: "ຕູ້ເຫຼັກເກັບເອກະສານກັນໄຟ, ຕູ້ລັອກເກີພະນັກງານ, ແລະ ຕູ້ເກັບເຄື່ອງມືຊ່າງມາດຕະຖານໂຮງງານ.",
      descEn: "Heavy-gauge steel lockers, fire-resistant filing cabinets, and lockable tool storage cupboards.",
      categoryLo: "ເຟີນີເຈີອຸດສາຫະກຳ",
      categoryEn: "Industrial Furniture",
    },
    {
      num: 5,
      titleLo: "ຕູ້ເກັບເຄື່ອງ ແລະ ຊັ້ນວາງເຄື່ອງໃຊ້ປະຈຳ",
      titleEn: "Storage Containers and Picking Bins",
      descLo: "ລັງຢາງອຸດສາຫະກຳ, ກ່ອງຈັດເກັບອາໄຫຼ່ ແລະ ຊັ້ນວາງ Picking Bins ສຳລັບງານສັ່ງຈ່າຍສິນຄ້າໄວ.",
      descEn: "Stackable industrial plastic crates, modular picking bins, and small parts organizers.",
      categoryLo: "ກ່ອງເກັບອາໄຫຼ່",
      categoryEn: "Small Parts Storage",
    },
    {
      num: 6,
      titleLo: "ຊັ້ນວາງສິນຄ້າ ແລະ ຖາດສິນຄ້າ",
      titleEn: "Racking and Shelving",
      descLo: "ຊັ້ນວາງ Heavy-Duty Selective Racks, Drive-In Racks, Cantilever ແລະ ຖາດຮອງພາເລັດມາດຕະຖານ.",
      descEn: "Heavy-duty pallet racking, drive-in systems, medium-duty shelving, and steel decks.",
      categoryLo: "ຊັ້ນວາງສິນຄ້າຫຼັກ",
      categoryEn: "Heavy Storage Racks",
    },
    {
      num: 7,
      titleLo: "ອຸປະກອນປ້ອງກັນບຸກຄົນ (PPE)",
      titleEn: "Personal Protection Equipment (PPE)",
      descLo: "ໝວກນິລະໄພ, ເສື້ອສະທ້ອນແສງ, ເກີບຫົວດັງເຫຼັກ, ແວ່ນຕາກັນຝຸ່ນ ແລະ ຖົງມືກັນບາດ.",
      descEn: "OSHA-compliant hard hats, high-visibility reflective vests, steel-toe boots, and safety gloves.",
      categoryLo: "ອຸປະກອນເຊັບຕີ້",
      categoryEn: "Safety Gear",
    },
    {
      num: 8,
      titleLo: "ຄວາມປອດໄພສາງສິນຄ້າ ແລະ ການຄຸ້ມຄອງຄົນ",
      titleEn: "Warehouse Safety & Pedestrian Protection",
      descLo: "ຮົ້ວກັ້ນກັນກະແທກ (Safety Crash Barriers), ຕາໜ່າງກັນສິນຄ້າຕົກ, ແລະ ປະຕູນິລະໄພທາງຍ່າງ.",
      descEn: "Impact-absorbing polymer crash barriers, rack-end protectors, and pedestrian safety gates.",
      categoryLo: "ແຜງກັ້ນນິລະໄພ",
      categoryEn: "Barriers & Protection",
    },
    {
      num: 9,
      titleLo: "ໂຕະເຮັດວຽກ, ໂຕະສ້ອມແປງ ແລະ ເຄື່ອງຫຸ້ມຫໍ່",
      titleEn: "Workbenches, Workstations & Shrink Wrap",
      descLo: "ໂຕະແພັກກິ້ງສິນຄ້າປັບລະດັບ, ເຄື່ອງພັນຟິມພາເລັດ (Stretch Wrapper), ແລະ ສະຖານີກວດສອບ QC.",
      descEn: "Ergonomic packing workbenches, semi-automatic turntable stretch wrappers, and QC stations.",
      categoryLo: "ສະຖານີແພັກສິນຄ້າ",
      categoryEn: "Packaging Stations",
    },
    {
      num: 10,
      titleLo: "ປ້າຍສັນຍາລັກ ແລະ ປ້າຍບອກ ໃນສາງສິນຄ້າ",
      titleEn: "Warehouse Signs and Labels",
      descLo: "ປ້າຍເຕືອນອັນຕະລາຍ, ປ້າຍລະຫັດຊັ້ນວາງ Barcode/QR Code, ແລະ ປ້າຍບອກທາງອອກສຸກເສີນ.",
      descEn: "High-visibility warning signs, aisle location placards, rack barcode/QR labels, and exit signs.",
      categoryLo: "ປ້າຍເຕືອນ & ບາໂຄ້ດ",
      categoryEn: "Signage & Labeling",
    },
    {
      num: 11,
      titleLo: "ຊຸ້ມຈຸດເກັບອຸປະກອນ ແລະ ຊັ້ນລອຍ",
      titleEn: "Pick Tower and Mezzanines",
      descLo: "ຊັ້ນລອຍໂຄງສ້າງເຫຼັກ (Multi-tier Structural Mezzanine) ຂະຫຍາຍພື້ນທີ່ໃຊ້ສອຍແນວດິ່ງ 2-3 ເທົ່າ.",
      descEn: "Multi-tier structural steel mezzanines and pick towers doubling or tripling vertical warehouse capacity.",
      categoryLo: "ຊັ້ນລອຍຕໍ່ເຕີມ",
      categoryEn: "Mezzanine Expansion",
    },
  ];

  // 10 Warehouse Ecosystem Nodes from Slide 1
  const ECOSYSTEM_NODES = [
    {
      id: "racks",
      titleLo: "1. ລະບົບຊັ້ນວາງ & ພາເລັດ (Warehouse Racks & Pallets)",
      titleEn: "1. Warehouse Racks & Pallets",
      descLo: "ລະບົບຊັ້ນວາງ Heavy Duty (LPI Group) ທຸກຮູບແບບ: Selective, Drive-in, Cantilever, ແລະ Mezzanine ພ້ອມພາເລັດມາດຕະຖານ.",
      descEn: "Heavy-duty racking systems (Selective, Drive-In, Cantilever, Mezzanine) paired with standard industrial pallets.",
      icon: Box,
      tagLo: "ໂຄງສ້າງສາງສິນຄ້າ",
      tagEn: "Storage Structure",
    },
    {
      id: "fork-trucks",
      titleLo: "2. ລົດຍົກສາງ & ລົດຟອກລີບ (Fork Trucks & Reach Trucks)",
      titleEn: "2. Fork Trucks & Reach Trucks",
      descLo: "ກອງລົດຍົກສາງ Jungheinrich Reach Trucks ແລະ ລົດຍົກດຸ່ນດ່ຽງ Mitsubishi ທີ່ອອກແບບສຳລັບຊ່ອງທາງແຄບ ແລະ ວຽກໜັກ.",
      descEn: "Jungheinrich Reach Trucks and Mitsubishi Counterbalanced Forklifts engineered for narrow aisles and heavy cycles.",
      icon: Truck,
      tagLo: "ອຸປະກອນຍົກຍ້າຍຫຼັກ",
      tagEn: "Core Material Handling",
    },
    {
      id: "manager",
      titleLo: "3. ສູນຄວບຄຸມ & ຜູ້ຈັດການສາງ (Warehouse Manager WMS)",
      titleEn: "3. Warehouse Manager Control",
      descLo: "ສູນບັນຊາການບໍລິຫານສາງ ແລະ ຊອບແວ WMS ຕິດຕາມສະຖານະສິນຄ້າ, ຕຳແໜ່ງຈັດເກັບ, ແລະ ການສັ່ງງານກອງລົດຍົກແບບ Real-Time.",
      descEn: "Operations command center & WMS tracking inventory, slotting locations, and forklift dispatch in real time.",
      icon: BarChart3,
      tagLo: "ສູນບັນຊາການ",
      tagEn: "Operations Command",
    },
    {
      id: "cargo-flow",
      titleLo: "4. ສາຍທານສິນຄ້າຂາເຂົ້າ-ອອກ (Warehousing Cargo Flow)",
      titleEn: "4. Warehousing Cargo Logistics",
      descLo: "ລະບົບໄຫຼວຽນສິນຄ້າ Inbound / Outbound ທີ່ຖືກຈັດລະບຽບຕາມມາດຕະຖານ FIFO/LIFO ປ້ອງກັນສິນຄ້າຕົກຄ້າງ.",
      descEn: "Seamless inbound/outbound logistics flow structured with FIFO/LIFO standards to prevent operational bottlenecks.",
      icon: Layers,
      tagLo: "ການໄຫຼວຽນສິນຄ້າ",
      tagEn: "Cargo Logistics",
    },
    {
      id: "scrubbers",
      titleLo: "5. ເຄື່ອງຂັດລ້າງພື້ນ & ດູດຝຸ່ນ (Floor Cleaning Machines)",
      titleEn: "5. Nilfisk Floor Cleaning Machines",
      descLo: "ເຄື່ອງຂັດພື້ນອັດຕະໂນມັດ ແລະ ດູດຝຸ່ນ Nilfisk (ເດນມາກ) ມາດຕະຖານ Food-Grade/Cleanroom ຮັກສາຄວາມສະອາດ ແລະ ຫຼຸດຝຸ່ນເກາະສິນຄ້າ 100%.",
      descEn: "Nilfisk (Denmark) industrial floor scrubbers & sweepers ensuring cleanroom/food-grade standards with zero floor dust.",
      icon: Sparkles,
      tagLo: "ຄວາມສະອາດ & ອະນາໄມ",
      tagEn: "Sanitation & Cleaning",
    },
    {
      id: "cranes",
      titleLo: "6. ເຄຣນຂົວເໜືອຫົວ (Overhead Crane Systems)",
      titleEn: "6. Overhead Crane Systems",
      descLo: "ເຄຣນຂົວໄຟຟ້າ ແລະ ລະບົບຍົກເໜືອຫົວສຳລັບສິນຄ້າໜັກພິເສດ, ແຜ່ນເຫຼັກ, ໂຄງສ້າງເຄື່ອງຈັກໃຫຍ່ໃນໂຮງງານອຸດສາຫະກຳ.",
      descEn: "Heavy-duty electric overhead traveling (EOT) cranes and hoists for oversized cargo, steel plates, and plant equipment.",
      icon: Warehouse,
      tagLo: "ງານຍົກໜັກພິເສດ",
      tagEn: "Heavy Lifting",
    },
    {
      id: "dock-loading",
      titleLo: "7. ຈຸດຂົນຖ່າຍສິນຄ້າ (Loading & Unloading Cargo)",
      titleEn: "7. Loading & Unloading Cargo Docks",
      descLo: "ຂົວໂຫຼດສິນຄ້າ Dock Levelers, ຣ້ຳຂຶ້ນຕູ້, ແລະ ລົດລາກພາເລັດໄຟຟ້າຊ່ວຍໃຫ້ການຖ່າຍສິນຄ້າຂຶ້ນ-ລົງຕູ້ຄອນເທນເນີໄວຂຶ້ນ 300%.",
      descEn: "Dock levelers, mobile yard ramps, and electric pallet jacks expediting container loading/unloading by up to 300%.",
      icon: Truck,
      tagLo: "ທ່າໂຫຼດສິນຄ້າ",
      tagEn: "Docking & Loading",
    },
    {
      id: "container-lift",
      titleLo: "8. ລົດຍົກຕູ້ຄອນເທນເນີ (Container Lift & Reach Stackers)",
      titleEn: "8. Container Lifts & Port Equipment",
      descLo: "ລົດຍົກຕູ້ຄອນເທນເນີຂະໜາດໃຫຍ່ ສຳລັບທ່າບົກ Dry Port, ສາງຂົນສົ່ງສິນຄ້າຂ້າມແດນ, ແລະ ເຂດເສດຖະກິດພິເສດ (SEZ).",
      descEn: "Heavy port reach stackers and container handlers serving dry ports, cross-border terminals, and special economic zones.",
      icon: ShieldCheck,
      tagLo: "ໂລຈິສຕິກທ່າບົກ",
      tagEn: "Dry Port Logistics",
    },
    {
      id: "pressure-wash",
      titleLo: "9. ເຄື່ອງສີດລ້າງແຮງດັນສູງ (Washer Pressure Machines)",
      titleEn: "9. Washer Pressure Machines",
      descLo: "ເຄື່ອງສີດນ້ຳແຮງດັນສູງອຸດສາຫະກຳ ລ້າງຂີ້ຕົມ, ຂີ້ຝຸ່ນ ແລະ ຄາບນ້ຳມັນ ປົກປັກຮັກສາສະພາບກອງລົດຍົກ ແລະ ອຸປະກອນທຸກມື້.",
      descEn: "High-pressure industrial washers removing slurry, dust, and grease to preserve fleet aesthetics and operational life.",
      icon: Wrench,
      tagLo: "ບຳລຸງຮັກສາກອງລົດ",
      tagEn: "Fleet Maintenance",
    },
    {
      id: "conveyors",
      titleLo: "10. ລະບົບສາຍພານລຳລຽງ (Conveyor Belt Systems)",
      titleEn: "10. Conveyor Belt Systems",
      descLo: "ສາຍພານລຳລຽງ ແລະ ຄັດແຍກສິນຄ້າອັດຕະໂນມັດ ເຊື່ອມຕໍ່ໂດຍກົງຈາກສາຍການຜະລິດສູ່ຊັ້ນວາງສາງ ຢ່າງຕໍ່ເນື່ອງ.",
      descEn: "Automated roller & belt conveyors connecting production lines directly to warehouse storage buffers.",
      icon: Zap,
      tagLo: "ສາຍພານອັດຕະໂນມັດ",
      tagEn: "Automated Conveying",
    },
  ];

  // 5 Portfolio Categories from Slide 3
  const PORTFOLIO_GROUPS = [
    {
      titleLo: "1. ອຸປະກອນສາງສິນຄ້າ (Warehousing Equipment)",
      titleEn: "1. Warehousing Equipment",
      itemsLo: [
        "Pedestrian Trucks (ລົດລາກພາເລັດໄຟຟ້າແບບຍ່າງຕາມ)",
        "Reach Trucks (ລົດຍົກສາງສິນຄ້າເສົາສູງ 6-12m)",
        "Stackers (ລົດຍົກຊ້ອນພາເລັດໄຟຟ້າ)",
        "Order Pickers (ລົດຍົກເລືອກສິນຄ້າຕາມອໍເດີ)",
        "High-Rack VNA Stackers (ລົດຍົກຊ່ອງແຄບລະບົບລາງ)",
        "Hand Pallet Trucks (ລົດລາກພາເລັດມືໂຍກ 2.5-3.0T)",
        "Tow Tractors & Trailers (ລົດລາກຈູງອຸດສາຫະກຳ)",
      ],
      itemsEn: [
        "Pedestrian Electric Pallet Trucks",
        "Reach Trucks (6-12m Mast Heights)",
        "Electric Walkie & Rider Stackers",
        "Order Pickers for Fast Bin Fulfillment",
        "High-Rack VNA Man-Up Stackers",
        "Hand Pallet Trucks (2.5-3.0T)",
        "Industrial Tow Tractors & Trailer Trains",
      ],
      color: "border-blue-500/30 bg-blue-500/5",
      badgeLo: "Jungheinrich / DK LAO",
      badgeEn: "Jungheinrich / DK LAO",
    },
    {
      titleLo: "2. ລົດຍົກດຸ່ນດ່ຽງ (Counterbalanced Trucks)",
      titleEn: "2. Counterbalanced Forklifts",
      itemsLo: [
        "Electric Counterbalanced Forklifts (3-Wheel & 4-Wheel, 1.5 - 3.5T)",
        "Mitsubishi Heavy-Duty Diesel Forklifts (2.5 - 10.0T)",
        "Mitsubishi LPG / Gasoline Dual-Fuel Forklifts",
        "Container Handling Heavy Forklifts (10 - 25T)",
      ],
      itemsEn: [
        "Electric Counterbalanced Forklifts (3/4-Wheel, 1.5-3.5T)",
        "Mitsubishi Heavy-Duty Diesel Forklifts (2.5-10.0T)",
        "Mitsubishi LPG / Dual-Fuel Forklifts",
        "Heavy Container Handling Forklifts (10-25T)",
      ],
      color: "border-emerald-500/30 bg-emerald-500/5",
      badgeLo: "Mitsubishi Forklifts",
      badgeEn: "Mitsubishi Forklifts",
    },
    {
      titleLo: "3. ລົດກະເຊົ້າ & ອຸປະກອນເຮັດວຽກເທິງບ່ອນສູງ (JLG Access Platforms)",
      titleEn: "3. JLG Access Platforms & Telehandlers",
      itemsLo: [
        "JLG Scissor Lifts (ລົດກະເຊົ້າຂາກະໄກໄຟຟ້າ ເຮັດວຽກສູງ 8-16m)",
        "JLG Telescopic Boom Lifts (ລົດກະເຊົ້າບູມຍາວ 16-43m)",
        "JLG Articulating Z-Booms (ລົດກະເຊົ້າບູມພັບ ຫັກລ້ຽວອ້ອມສິ່ງກີດຂວາງ)",
        "JLG Telehandlers (ລົດຍົກກະເຊົ້າບູມຍາວ Rough-Terrain)",
      ],
      itemsEn: [
        "JLG Electric Scissor Lifts (8-16m Working Heights)",
        "JLG Telescopic Boom Lifts (16-43m Reach)",
        "JLG Articulating Booms (Knuckle Z-Booms)",
        "JLG Rough-Terrain Heavy Telehandlers",
      ],
      color: "border-amber-500/30 bg-amber-500/5",
      badgeLo: "JLG Access Official",
      badgeEn: "JLG Access Official",
    },
    {
      titleLo: "4. ໂຊລູຊັນສະເພາະອຸດສາຫະກຳ & ພະລັງງານ (Special Solutions & Energy)",
      titleEn: "4. Specialized Solutions & Energy Systems",
      itemsLo: [
        "Ex-Proof Forklifts (ລົດຍົກປ້ອງກັນປະກາຍໄຟ ສຳລັບສາງສານເຄມີ/ນ້ຳມັນ)",
        "Cold Storage Forklifts (ລົດຍົກຫ້ອງເຢັນທົນອຸນຫະພູມ -30°C)",
        "Industrial Lithium-Ion Batteries (ແບັດເຕີຣີ Li-Ion ໄວກວ່າ, ທົນກວ່າ)",
        "High-Frequency Fast Chargers (ຕູ້ສາກໄວອັດສະລິຍະ ຫຼຸດຄ່າໄຟ 30%)",
      ],
      itemsEn: [
        "Explosion-Proof (Ex-Proof) Forklifts for Chemical & Gas Depots",
        "Cold Storage Forklifts (-30°C Freeze Resistance)",
        "Industrial Lithium-Ion Battery Systems",
        "High-Frequency Intelligent Fast Chargers (30% Energy Savings)",
      ],
      color: "border-purple-500/30 bg-purple-500/5",
      badgeLo: "Custom Engineering",
      badgeEn: "Custom Engineering",
    },
    {
      titleLo: "5. ບໍລິການຫຼັງການຂາຍ & ອາໄຫຼ່ແທ້ (After-Sales & Attachments)",
      titleEn: "5. After-Sales Services & OEM Attachments",
      itemsLo: [
        "Service SLA ດ່ວນ 2-4 ຊົ່ວໂມງ ພ້ອມ Mobile Service Van",
        "ສາງອາໄຫຼ່ແທ້ OEM ຫຼາຍກວ່າ 16,000 ລາຍການໃນສະຕ໋ອກ",
        "ອຸປະກອນເສີມ Attachments: Paper Roll Clamp, Bale Clamp, Side Shifter, Rotator",
        "ສັນຍາບຳລຸງຮັກສາປ້ອງກັນ PM Contract ຕາມຮອບ 250h-2,000h",
      ],
      itemsEn: [
        "Rapid 2-4h Service SLA with Mobile Service Vans",
        "Over 16,000+ Genuine OEM Spare Parts in Stock",
        "Specialized Attachments: Paper Roll Clamps, Bale Clamps, Side Shifters, Rotators",
        "Scheduled Preventive Maintenance (PM) Contracts (250h-2,000h)",
      ],
      color: "border-teal-500/30 bg-teal-500/5",
      badgeLo: "DK LAO Service",
      badgeEn: "DK LAO Service",
    },
  ];

  // 3 Automation Groups from Slide 4
  const AUTOMATION_GROUPS = [
    {
      titleLo: "1. ລະບົບອັດຕະໂນມັດ (Automated Systems)",
      titleEn: "1. Automated Systems",
      descLo: "ປ່ຽນສາງສິນຄ້າທຳມະດາໃຫ້ເປັນສາງອັດສະລິຍະໄຮ້ຄົນຂັບ ດ້ວຍຫຸ່ນຍົນ AGV/AMR ແລະ ເຄຣນ AS/RS.",
      descEn: "Transforming standard facilities into lights-out smart warehouses with AGVs, AMRs, and AS/RS cranes.",
      featuresLo: [
        "Mobile Robots (AGV / AMR) — ຫຸ່ນຍົນອັດຕະໂນມັດຂົນຍ້າຍພາເລັດດ້ວຍ LIDAR SLAM ໄຮ້ຄົນຂັບ",
        "Stacker Cranes (AS/RS) — ເຄຣນຈັດເກັບສິນຄ້າອັດຕະໂນມັດໃນຊັ້ນວາງສູງເຖິງ 30-40 ແມັດ",
        "Conveyor Systems — ລະບົບສາຍພານລຳລຽງ ແລະ ຄັດແຍກສິນຄ້າອັດສະລິຍະ",
      ],
      featuresEn: [
        "Mobile Robots (AGV / AMR) — Autonomous mobile robots with LIDAR SLAM navigation",
        "Stacker Cranes (AS/RS) — Automated high-bay storage & retrieval up to 40 meters",
        "Conveyor Systems — Intelligent roller and sorting conveyor lines",
      ],
      icon: Bot,
      color: "text-blue-500",
    },
    {
      titleLo: "2. ລະບົບຊັ້ນວາງສິນຄ້າອັດສະລິຍະ (Smart Racking Solutions)",
      titleEn: "2. Smart Racking Solutions",
      descLo: "ອອກແບບ ແລະ ຕິດຕັ້ງລະບົບຊັ້ນວາງມາດຕະຖານສາກົນ LPI Racking ທີ່ເພີ່ມພື້ນທີ່ຈັດເກັບສິນຄ້າສູງສຸດ 400%.",
      descEn: "Engineered high-density LPI Racking systems maximizing warehouse volumetric cubic capacity by up to 400%.",
      featuresLo: [
        "Selective Pallet Racking (ຊັ້ນວາງພາເລັດມາດຕະຖານ ເຂົ້າເຖິງໄດ້ 100%)",
        "Drive-In / Drive-Through Racks (ຊັ້ນວາງຄວາມໜາແໜ້ນສູງສຳລັບສິນຄ້າປະເພດດຽວກັນ)",
        "Radio Shuttle Racking (ລະບົບຊັ້ນວາງພ້ອມລົດ Shuttle ໄຟຟ້າແລ່ນໃນລາງ)",
        "Mezzanine Floors (ຊັ້ນລອຍໂຄງສ້າງເຫຼັກເພີ່ມພື້ນທີ່ 2-3 ເທົ່າ)",
      ],
      featuresEn: [
        "Selective Pallet Racking (100% direct pallet accessibility)",
        "Drive-In / Drive-Through Racks (High-density bulk storage)",
        "Radio Shuttle Racking (Semi-automated radio-controlled shuttle carts)",
        "Heavy-Duty Structural Steel Mezzanines (2-3x vertical floor multiplication)",
      ],
      icon: Warehouse,
      color: "text-emerald-500",
    },
    {
      titleLo: "3. ລະບົບດິຈິຕອລ & ຊອບແວຄຸ້ມຄອງ (Digitalization & Software)",
      titleEn: "3. Digitalization & Software Suite",
      descLo: "ເຊື່ອມຕໍ່ທຸກເຄື່ອງຈັກ, ກອງລົດ, ແລະ ສິນຄ້າເຂົ້າສູ່ແພລດຟອມດິຈິຕອລອັນດຽວ ພ້ອມລະບົບ AI ຄວາມປອດໄພ.",
      descEn: "Connecting machinery, fleet telematics, and inventory onto a single digital plane with AI safety oversight.",
      featuresLo: [
        "Warehouse Management (WMS) — ຊອບແວຄຸ້ມຄອງສະຕ໋ອກ, ບາໂຄດ, RFID ແລະ FIFO",
        "Fleet Management (FMS) — ລະບົບ Telematics ຕິດຕາມຊົ່ວໂມງແລ່ນ, ແບັດເຕີຣີ, ແລະ ການສັ່ນສະເທືອນ",
        "Communication Interfaces — ເຊື່ອມຕໍ່ API / ERP (SAP, Oracle, Odoo) ແບບໄຮ້ຮອຍຕໍ່",
        "AI Safety & Assistance Systems — ກ້ອງ AI ກວດຈັບຄົນ, ໄຟເລເຊີເຕືອນໄພ, ລະບົບລັອກຄວາມໄວອັດຕະໂນມັດ",
      ],
      featuresEn: [
        "Warehouse Management (WMS) — Inventory, barcode, RFID & dynamic bin slotting",
        "Fleet Management (FMS) — Real-time telematics, impact sensors & battery telemetry",
        "Communication Interfaces — Seamless API/ERP integration (SAP, Oracle, Odoo)",
        "AI Safety Systems — Pedestrian-detection AI cameras, blue spots & zone speed limiters",
      ],
      icon: Cpu,
      color: "text-purple-500",
    },
  ];

  return (
    <section id="warehouse-solutions" className="py-24 relative overflow-hidden bg-slate-900 text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-600/20 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      </div>

      <div className="container px-4 max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-extrabold uppercase tracking-widest mb-4">
            <Warehouse className="w-4 h-4" />
            <span>DK LAO • TOTAL WAREHOUSE & AUTOMATION SOLUTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
            {isLo ? (
              <>
                ໂຊລູຊັນຄຸ້ມຄອງສາງສິນຄ້າ & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">ລະບົບອັດຕະໂນມັດຄົບວົງຈອນ</span>
              </>
            ) : (
              <>
                Total Warehouse Management & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">Automation Solutions</span>
              </>
            )}
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            {isLo
              ? "ດີເຄ ລາວ ສົ່ງມອບໂຊລູຊັນ One-Stop ມາດຕະຖານສາກົນ: ຕັ້ງແຕ່ລະບົບຊັ້ນວາງ, ກອງລົດຍົກ, ເຄື່ອງຂັດພື້ນ Nilfisk, ລົດກະເຊົ້າ JLG ຈົນເຖິງຫຸ່ນຍົນອັດຕະໂນມັດ AGV/AMR ແລະ ຊອບແວ WMS ອັດສະລິຍະ."
              : "DK LAO delivers world-class one-stop solutions: from high-density racking, forklift fleets, Nilfisk floor scrubbers, and JLG access platforms to AGV/AMR mobile robots and smart WMS software."}
          </p>
        </div>

        {/* 3 Main View Tabs Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab("ecosystem")}
            className={`px-5 py-3 rounded-2xl font-bold text-sm md:text-base flex items-center gap-2.5 transition-all ${
              activeTab === "ecosystem"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-white/10"
            }`}
          >
            <Layers className="w-5 h-5" />
            <span>{isLo ? "1. ຜັງລະບົບສາງຄົບວົງຈອນ (Warehouse Ecosystem)" : "1. Warehouse Ecosystem Diagram"}</span>
          </button>

          <button
            onClick={() => setActiveTab("portfolio")}
            className={`px-5 py-3 rounded-2xl font-bold text-sm md:text-base flex items-center gap-2.5 transition-all ${
              activeTab === "portfolio"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-white/10"
            }`}
          >
            <Truck className="w-5 h-5" />
            <span>{isLo ? "2. ໝວດໝູ່ຜະລິດຕະພັນຄົບເຊັດ (MHE Portfolio)" : "2. Full Products & Solutions"}</span>
          </button>

          <button
            onClick={() => setActiveTab("automation")}
            className={`px-5 py-3 rounded-2xl font-bold text-sm md:text-base flex items-center gap-2.5 transition-all ${
              activeTab === "automation"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-white/10"
            }`}
          >
            <Cpu className="w-5 h-5" />
            <span>{isLo ? "3. ລະບົບອັດຕະໂນມັດ & ດິຈິຕອລ (Automation 4.0)" : "3. Automation & Digital 4.0"}</span>
          </button>

          <button
            onClick={() => setActiveTab("solutions3d")}
            className={`px-5 py-3 rounded-2xl font-bold text-sm md:text-base flex items-center gap-2.5 transition-all ${
              activeTab === "solutions3d"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-105"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-white/10"
            }`}
          >
            <Warehouse className="w-5 h-5" />
            <span>{isLo ? "4. ໂຊລູຊັນສາງ 3D ຄົບ 11 ໝວດ (3D Solutions)" : "4. 3D Warehouse & Handling"}</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <AnimatePresence mode="wait">
          {/* TAB 1: 10-NODE WAREHOUSE ECOSYSTEM */}
          {activeTab === "ecosystem" && (
            <motion.div
              key="ecosystem"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {/* Graphic Banner Display */}
              <div className="rounded-3xl overflow-hidden border border-white/10 bg-slate-950/60 p-4 md:p-6 shadow-2xl relative">
                <div 
                  onClick={() => setLightbox({
                    isOpen: true,
                    src: "/images/solutions/warehouse-management-solutions.png",
                    alt: "DK LAO Warehouse Management Solutions Architecture",
                    titleLo: "10 ໂຊລູຊັນລະບົບສາງສິນຄ້າອັດສະລິຍະ DK LAO Warehouse Ecosystem",
                    titleEn: "DK LAO 10-Point Modern Warehouse Management Ecosystem",
                    subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1152px)",
                    subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                  })}
                  className="relative h-[340px] sm:h-[420px] md:h-[500px] w-full rounded-2xl overflow-hidden bg-slate-950/40 cursor-pointer group/img"
                >
                  <img
                    src="/images/solutions/warehouse-management-solutions.png"
                    alt="DK LAO Warehouse Management Solutions Architecture"
                    
                    unoptimized
                    priority
                    className="object-contain p-2 crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                    <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 px-2 text-xs text-slate-400">
                  <span className="font-semibold text-white">
                    {isLo ? "ແຜນຜັງສະແດງການເຊື່ອມໂຍງ 10 ໂຊລູຊັນໃນສາງສິນຄ້າທັນສະໄໝ ຂອງ ດີເຄ ລາວ" : "DK LAO 10-Point Integrated Modern Warehouse Ecosystem Blueprint"}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 font-bold">www.dklao.com</span>
                    <span>•</span>
                    <span>WhatsApp: 020 2802 3338 / 2323 1922</span>
                  </div>
                </div>
              </div>

              {/* 10 Interactive Nodes Grid */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl md:text-2xl font-black text-white flex items-center gap-3">
                    <span className="w-2.5 h-6 rounded-full bg-blue-500" />
                    {isLo ? "ລາຍລະອຽດ 10 ໂຊລູຊັນຫຼັກໃນລະບົບສາງ (10 Core Nodes)" : "10 Core Warehouse Solution Nodes"}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {isLo ? "ຄລິກເພື່ອເບິ່ງລາຍລະອຽດ" : "Click to inspect details"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {ECOSYSTEM_NODES.map((node, index) => {
                    const NodeIcon = node.icon;
                    const isSelected = selectedEcosystemNode === index;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedEcosystemNode(index)}
                        className={`p-5 rounded-2xl text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                          isSelected
                            ? "bg-blue-600/20 border-2 border-blue-500 shadow-xl shadow-blue-500/20 scale-[1.02]"
                            : "bg-slate-800/50 hover:bg-slate-800 border border-white/10"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="p-2 rounded-xl bg-white/10 text-blue-400">
                              <NodeIcon className="w-5 h-5" />
                            </span>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                              {isLo ? node.tagLo : node.tagEn}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-sm text-white mb-2 leading-snug">
                            {isLo ? node.titleLo : node.titleEn}
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                            {isLo ? node.descLo : node.descEn}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-blue-400">
                          <span>{isLo ? "ອ່ານເພີ່ມ" : "Learn More"}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: COMPLETE EQUIPMENT PORTFOLIO */}
          {activeTab === "portfolio" && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Graphic Overview Banners */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="rounded-3xl overflow-hidden border border-white/10 bg-slate-950/60 p-4 shadow-xl">
                  <div 
                    onClick={() => setLightbox({
                      isOpen: true,
                      src: "/images/solutions/material-handling-sales-rental.png",
                      alt: "DK LAO Material Handling Equipment Range",
                      titleLo: "ກຸ່ມອຸປະກອນຄ່ຽນຖ່າຍສິນຄ້າ ຂາຍ & ໃຫ້ເຊົ່າ (Material Handling Sales & Rental)",
                      titleEn: "Material Handling Sales & Rental Lineup",
                      subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1150px)",
                      subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                    })}
                    className="relative h-[260px] sm:h-[320px] w-full rounded-2xl overflow-hidden bg-slate-950/30 cursor-pointer group/img"
                  >
                    <img
                      src="/images/solutions/material-handling-sales-rental.png"
                      alt="DK LAO Material Handling Equipment Range"
                      
                      unoptimized
                      className="object-contain p-2 crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                      <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                      <span>{isLo ? "🔍 ຊູມ 2K" : "🔍 Zoom 2K"}</span>
                    </div>
                  </div>
                  <div className="p-3 text-center">
                    <span className="text-xs font-bold text-slate-300">
                      {isLo ? "ລົດຍົກດີເຊວ Mitsubishi, ໄຟຟ້າ Jungheinrich ແລະ ລົດກະເຊົ້າ JLG" : "Mitsubishi Diesel, Jungheinrich Electric, and JLG Aerial Platforms"}
                    </span>
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden border border-white/10 bg-slate-950/60 p-4 shadow-xl">
                  <div 
                    onClick={() => setLightbox({
                      isOpen: true,
                      src: "/images/solutions/products-solutions-portfolio.png",
                      alt: "DK LAO Product and Service Portfolio",
                      titleLo: "ໂຄງສ້າງກຸ່ມຜະລິດຕະພັນ ແລະ ໂຊລູຊັນລະບົບສາງ (Products & Solutions Portfolio)",
                      titleEn: "DK LAO Complete Products & Solutions Portfolio",
                      subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1142px)",
                      subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                    })}
                    className="relative h-[260px] sm:h-[320px] w-full rounded-2xl overflow-hidden bg-slate-950/30 cursor-pointer group/img"
                  >
                    <img
                      src="/images/solutions/products-solutions-portfolio.png"
                      alt="DK LAO Product and Service Portfolio"
                      
                      unoptimized
                      className="object-contain p-2 crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                      <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                      <span>{isLo ? "🔍 ຊູມ 2K" : "🔍 Zoom 2K"}</span>
                    </div>
                  </div>
                  <div className="p-3 text-center">
                    <span className="text-xs font-bold text-slate-300">
                      {isLo ? "ຜັງໂຄງສ້າງສິນຄ້າ ແລະ ລະບົບພະລັງງານ Lithium-Ion ຄົບວົງຈອນ" : "Full Structured Portfolio & Industrial Energy Systems"}
                    </span>
                  </div>
                </div>
              </div>

              {/* 5 Categorized Portfolio Groups */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PORTFOLIO_GROUPS.map((group, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-3xl border backdrop-blur-md shadow-xl transition-all hover:border-blue-500/50 ${group.color}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white">
                        {isLo ? group.badgeLo : group.badgeEn}
                      </span>
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    </div>

                    <h4 className="text-lg font-black text-white mb-4 leading-tight">
                      {isLo ? group.titleLo : group.titleEn}
                    </h4>

                    <ul className="space-y-2.5">
                      {(isLo ? group.itemsLo : group.itemsEn).map((item, iIdx) => (
                        <li key={iIdx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                          <span className="text-blue-400 font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: AUTOMATION & DIGITAL INDUSTRY 4.0 */}
          {activeTab === "automation" && (
            <motion.div
              key="automation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Graphic Banner */}
              <div className="rounded-3xl overflow-hidden border border-white/10 bg-slate-950/60 p-4 md:p-6 shadow-2xl">
                <div 
                  onClick={() => setLightbox({
                    isOpen: true,
                    src: "/images/solutions/automation-digital-solutions.png",
                    alt: "DK LAO Automation and Digital Solutions",
                    titleLo: "ລະບົບອັດຕະໂນມັດ AGV/AMR, AS/RS ແລະ ຊອບແວສາງ WMS/FMS",
                    titleEn: "Automation Systems (AGV/AMR, AS/RS) & Digital Software",
                    subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1134px)",
                    subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                  })}
                  className="relative h-[280px] sm:h-[380px] md:h-[460px] w-full rounded-2xl overflow-hidden bg-slate-950/40 cursor-pointer group/img"
                >
                  <img
                    src="/images/solutions/automation-digital-solutions.png"
                    alt="DK LAO Automation and Digital Solutions"
                    
                    unoptimized
                    priority
                    className="object-contain p-2 crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                    <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                  </div>
                </div>
                <div className="mt-3 text-center text-xs text-slate-400 font-medium">
                  {isLo
                    ? "ລະບົບຫຸ່ນຍົນ AGV/AMR, ເຄຣນຈັດເກັບສູງ AS/RS, ສາຍພານລຳລຽງ, ຊັ້ນວາງສິນຄ້າ ແລະ ຊອບແວດິຈິຕອລ WMS / FMS"
                    : "Automated Systems (AGV/AMR), AS/RS Stacker Cranes, Conveyors, Racks & Digital Software Suite (WMS/FMS)"}
                </div>
              </div>

              {/* 3 Pillar Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {AUTOMATION_GROUPS.map((autoGroup, aIdx) => {
                  const AutoIcon = autoGroup.icon;
                  return (
                    <div
                      key={aIdx}
                      className="p-8 rounded-3xl bg-slate-800/60 border border-white/10 hover:border-blue-500/50 transition-all shadow-2xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                          <AutoIcon className={`w-7 h-7 ${autoGroup.color}`} />
                        </div>
                        <h4 className="text-xl font-black text-white mb-3">
                          {isLo ? autoGroup.titleLo : autoGroup.titleEn}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed mb-6 font-normal">
                          {isLo ? autoGroup.descLo : autoGroup.descEn}
                        </p>

                        <div className="space-y-3 pt-4 border-t border-white/10">
                          {(isLo ? autoGroup.featuresLo : autoGroup.featuresEn).map((feat, fIdx) => (
                            <div key={fIdx} className="text-xs text-slate-200 flex items-start gap-2.5 leading-relaxed">
                              <span className="text-emerald-400 font-black mt-0.5">✓</span>
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-4">
                        <a
                          href="#booking-form"
                          className="block w-full py-3 px-4 rounded-xl text-center text-xs font-bold bg-white/10 hover:bg-blue-600 text-white transition-colors"
                        >
                          {isLo ? "ຂໍຄຳປຶກສາລະບົບນີ້ →" : "Request System Proposal →"}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 4: 11 WAREHOUSE & MATERIAL HANDLING 3D SOLUTIONS (SLIDE 5) */}
          {activeTab === "solutions3d" && (
            <motion.div
              key="solutions3d"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {/* Official 3D Isometric Banner */}
              <div className="rounded-3xl overflow-hidden border border-white/15 bg-slate-950/80 p-4 md:p-6 shadow-2xl relative">
                <div 
                  onClick={() => setLightbox({
                    isOpen: true,
                    src: "/images/solutions/warehouse-material-handling-3d.png",
                    alt: "DK LAO Warehouse and Material Handling 3D Solutions",
                    titleLo: "11 ໝວດໝູ່ໂຊລູຊັນສາງສິນຄ້າຄົບວົງຈອນ 3D (Warehouse 3D Infrastructure)",
                    titleEn: "11 Complete Warehouse Facility Solutions 3D",
                    subtitleLo: "ຄລິກເພື່ອຊູມເບິ່ງສະເປັກລະດັບ 2K Ultra-HD (2048 x 1144px)",
                    subtitleEn: "Click to inspect 2K Ultra-HD resolution diagram",
                  })}
                  className="relative h-[340px] sm:h-[460px] md:h-[580px] w-full rounded-2xl overflow-hidden bg-white cursor-pointer group/img"
                >
                  <img
                    src="/images/solutions/warehouse-material-handling-3d.png"
                    alt="DK LAO Warehouse and Material Handling 3D Solutions"
                    
                    unoptimized
                    priority
                    className="object-contain crisp-diagram group-hover/img:scale-[1.01] transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                    <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isLo ? "🔍 ຊູມພາບ 2K" : "🔍 Zoom 2K"}</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-900/90 backdrop-blur-md border-t border-white/10 mt-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-300 font-bold">
                    <span className="text-emerald-400 font-mono">DK LAO WAREHOUSE 3D INFRASTRUCTURE</span>
                    <span className="text-slate-600">•</span>
                    <span>{isLo ? "11 ໝວດໝູ່ໂຊລູຊັນສາງສິນຄ້າຄົບວົງຈອນ" : "11 Complete Warehouse Facility Solutions"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-amber-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Turnkey Design, Supply & Installation</span>
                  </div>
                </div>
              </div>

              {/* 11 Turnkey Elements Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {WAREHOUSE_3D_SOLUTIONS.map((sol) => (
                  <div
                    key={sol.num}
                    className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/50 hover:bg-white/[0.08] transition-all group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold font-mono">
                          #{String(sol.num).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">
                          {isLo ? sol.categoryLo : sol.categoryEn}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors">
                        {isLo ? sol.titleLo : sol.titleEn}
                      </h4>
                      <div className="text-[11px] font-semibold text-emerald-400/80">
                        {isLo ? sol.titleEn : sol.titleLo}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">
                        {isLo ? sol.descLo : sol.descEn}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400">
                      <span>Turnkey Solution</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Available
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unified Bottom Call-to-Action */}
        <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-950/60 to-slate-900 border border-blue-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <h3 className="text-2xl md:text-3xl font-black text-white">
              {isLo
                ? "ຕ້ອງການອອກແບບສາງສິນຄ້າ ຫຼື ປັບປຸງກອງລົດຍົກໂຮງງານຂອງທ່ານ?"
                : "Need Warehouse Engineering or Modern Material Handling Upgrades?"}
            </h3>
            <p className="text-sm md:text-base text-slate-300">
              {isLo
                ? "ທີມງານວິສະວະກອນ DK LAO ພ້ອມລົງສຳຫຼວດໄຊທ໌ງານຕົວຈິງ, ວາງຜັງ Layout 3D, ແລະ ຄຳນວນ ROI ຄວາມຄຸ້ມຄ່າໃຫ້ຟຣີ."
                : "DK LAO warehouse engineering team is ready for site surveys, 3D CAD layout planning, and free ROI feasibility studies."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="#booking-form"
                className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 transition-all scale-105"
              >
                {isLo ? "ນັດໝາຍວິສະວະກອນສາງສິນຄ້າ (Book Consultation)" : "Book Engineering Consultation"}
              </a>

              <a
                href="https://wa.me/8562028023338"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-green-600/20 hover:bg-green-600/30 text-green-300 border border-green-500/40 font-bold text-sm flex items-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp: +856 20 2802 3338</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2K High-Resolution Image Lightbox Modal */}
      <imgLightboxModal
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        src={lightbox.src}
        alt={lightbox.alt}
        titleLo={lightbox.titleLo}
        titleEn={lightbox.titleEn}
        subtitleLo={lightbox.subtitleLo}
        subtitleEn={lightbox.subtitleEn}
      />
    </section>
  );
}

