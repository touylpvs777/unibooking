export interface PreCategory {
  id: string;
  slug: string;
  name: string;
  name_lo: string;
  description: string;
  description_lo: string;
  iconName: "Truck" | "Archive" | "SprayCan" | "Settings" | "Pickaxe";
  badge_lo: string;
  badge_en: string;
  accentColor: string;
}

export interface StoreCategory {
  id: number;
  pre_category_id: string;
  name: string;
  name_lo: string;
  description: string;
  image: string;
  link: string;
  brand?: string;
}

export const PRE_CATEGORIES: PreCategory[] = [
  {
    id: "mhe-forklifts",
    slug: "mhe-forklifts",
    name: "MHE & Aerial Platforms",
    name_lo: "ລົດຍົກ & ລົດກະເຊົ້າອຸດສາຫະກຳ",
    description: "Counterbalance Forklifts, Reach Trucks, Hand Pallet Trucks, JLG Aerial Platforms, and Cummins Gensets.",
    description_lo: "ລົດຍົກໂຟກສ໌ລິບ ດີເຊວ, ໄຟຟ້າ, ແກັສ (Mitsubishi, Jungheinrich, Toyota), ລົດກະເຊົ້າ JLG, ແລະ ຈັກປັ່ນໄຟຟ້າ Cummins.",
    iconName: "Truck",
    badge_lo: "120+ ລຸ້ນພ້ອມສົ່ງ",
    badge_en: "120+ Units In-Stock",
    accentColor: "from-blue-600 to-indigo-700",
  },
  {
    id: "warehouse-storage",
    slug: "warehouse-storage",
    name: "Warehousing & Automation",
    name_lo: "ລະບົບສາງ & ຊັ້ນວາງອັດສະລິຍະ",
    description: "Industrial Racking, Automated AS/RS, Radio Shuttle Systems, Steel Mezzanines, and Packaging Equipment.",
    description_lo: "ຊັ້ນວາງສິນຄ້າອຸດສາຫະກຳ (Selective, Cantilever, Drive-in), ລະບົບສາງອັດຕະໂນມັດ Radio Shuttle, AS/RS, ແລະ ອຸປະກອນຫຸ້ມຫໍ່.",
    iconName: "Archive",
    badge_lo: "ອອກແບບ 3D CAD ຟຣີ",
    badge_en: "Free 3D Layout",
    accentColor: "from-emerald-600 to-teal-700",
  },
  {
    id: "nilfisk-cleaning",
    slug: "nilfisk-cleaning",
    name: "Nilfisk Cleaning Solutions",
    name_lo: "ອຸປະກອນທຳຄວາມສະອາດ Nilfisk",
    description: "Professional Floor Scrubbers, Industrial Sweepers, CNC Oil/Swarf Vacuums, and Commercial Vacuums from Denmark.",
    description_lo: "ອຸປະກອນທຳຄວາມສະອາດອຸດສາຫະກຳອັນດັບ 1 ຈາກເດນມາກ: ເຄື່ອງຂັດພື້ນແຫ້ງ, ລົດກວາດພື້ນ, ເຄື່ອງດູດຝຸ່ນ CNC, ແລະ ດູດນ້ຳ-ດູດແຫ້ງ.",
    iconName: "SprayCan",
    badge_lo: "ມາດຕະຖານເດນມາກ",
    badge_en: "Danish Quality",
    accentColor: "from-cyan-600 to-blue-700",
  },
  {
    id: "spare-parts-consumables",
    slug: "spare-parts-consumables",
    name: "Forklift Parts & Consumables",
    name_lo: "ອາໄຫຼ່ແທ້ລົດຍົກ & ຂອງແຫຼວ",
    description: "Genuine OEM parts for 10 world brands, Solid Tires, Traction Batteries, Oils & Fluids, Filters, and Safety Lights.",
    description_lo: "ສູນອາໄຫຼ່ແທ້ 10 ແບຣນໂລກ (16,000+ ລາຍການ), ຢາງຕັນດຳ/ຂາວ, ໝໍ້ໄຟ, ນ້ຳມັນໄຮໂດຣລິກ, ໄຟນິລະໄພ LED, ແລະ ອຸປະກອນເສີມ.",
    iconName: "Settings",
    badge_lo: "ອາໄຫຼ່ແທ້ 100% OEM",
    badge_en: "100% Genuine OEM",
    accentColor: "from-amber-600 to-orange-700",
  },
  {
    id: "heavy-mining-machinery",
    slug: "heavy-mining-machinery",
    name: "Heavy Machinery & Mining Spares",
    name_lo: "ອາໄຫຼ່ກົນຈັກໜັກ & ບໍ່ແຮ່ (35+ ແບຣນ)",
    description: "Heavy-duty mining dump truck components, hydraulic pumps, diesel engines (Hitachi, CAT, Cummins, Komatsu, Volvo).",
    description_lo: "ອາໄຫຼ່ລົດບັນທຸກບໍ່ແຮ່ (Hitachi EH1100, CAT 777), ອາໄຫຼ່ລົດຂຸດ Komatsu, ເຄື່ອງຈັກ Cummins/CAT, ປ້ຳໄຮໂດຣລິກ ແລະ ຊີນກົນຈັກ.",
    iconName: "Pickaxe",
    badge_lo: "35+ ແບຣນລະດັບໂລກ",
    badge_en: "35+ Global Brands",
    accentColor: "from-rose-600 to-red-800",
  },
];

export const STORE_CATEGORIES: StoreCategory[] = [
  // --- 1. MHE & Aerial Platforms ---
  {
    id: 1,
    pre_category_id: "mhe-forklifts",
    name: "Forklifts",
    name_lo: "ລົດຍົກອຸດສາຫະກຳ (Forklifts)",
    description: "ລົດຍົກດີເຊວ, ລົດຍົກໄຟຟ້າ, ລົດ Reach Truck ຈາກ Mitsubishi, Jungheinrich, Toyota, HELI ພ້ອມສູນບໍລິການ.",
    image: "/images/forklifts/toyota_8fd_orange.jpg",
    link: "/lo/store?category=Forklifts",
    brand: "Mitsubishi / Jungheinrich / Toyota",
  },
  {
    id: 2,
    pre_category_id: "mhe-forklifts",
    name: "Handling & Lifting",
    name_lo: "ອຸປະກອນຍົກຍ້າຍ (Hand Pallet)",
    description: "ລົດຍົກ Hand Pallet 2.5-3.0T, Electric Walkie, ລົດເຂັນ ແລະ ອຸປະກອນຍົກຍ້າຍສິນຄ້າຄຸນນະພາບສູງ.",
    image: "/images/categories/handling_lifting_clean.jpg",
    link: "/lo/store?category=Handling%20%26%20Lifting",
  },
  {
    id: 24,
    pre_category_id: "mhe-forklifts",
    name: "Hand Trucks",
    name_lo: "ລົດເຂັນອະເນກປະສົງ (Hand Trucks)",
    description: "ລົດເຂັນສະແຕນເລດ, ລົດເຂັນ 2 ລໍ້, ລົດເຂັນ 4 ລໍ້ ພັບໄດ້ ສຳລັບສາງ ແລະ ໂຮງງານ.",
    image: "/images/catalog/real/foldable_platform_trolley.jpg",
    link: "/lo/store?category=Hand%20Trucks",
  },
  {
    id: 25,
    pre_category_id: "mhe-forklifts",
    name: "Hoists & Lifting",
    name_lo: "ລອກໂສ້ & ອຸປະກອນຍົກຫ້ອຍ (Hoists & Cranes)",
    description: "ລອກໂສ້ໄຟຟ້າ, ລອກມືສາວ, ລອກໂສ້ກຳມະລໍ, ແລະ ສາຍສະລິງຍົກສິນຄ້າ ມາດຕະຖານ CE.",
    image: "/images/catalog/real/electric_chain_hoist.jpg",
    link: "/lo/store?category=Hoists%20%26%20Lifting",
  },
  {
    id: 12,
    pre_category_id: "mhe-forklifts",
    name: "Access Platforms",
    name_lo: "ລົດກະເຊົ້າໄຟຟ້າ (JLG Aerial Work)",
    description: "ລົດກະເຊົ້າຂາກະໄກ່ໄຟຟ້າ (Scissor Lifts), ບູມຫັກພັບ, Telescopic Ultra Booms, ແລະ Telehandlers ມາດຕະຖານ JLG.",
    image: "/images/catalog/real/electric_scissor_lift.jpg",
    link: "/lo/store?category=Access%20Platforms",
    brand: "JLG reaching out",
  },
  {
    id: 11,
    pre_category_id: "mhe-forklifts",
    name: "Generators",
    name_lo: "ຈັກປັ່ນໄຟຟ້າ (Cummins Genset)",
    description: "ຈັກປັ່ນໄຟຟ້າດີເຊວອຸດສາຫະກຳ Cummins QSG12 (288 - 420 kW) ຕູ້ເກັບສຽງ Silent Canopy ແລະ ລະບົບ PowerCommand.",
    image: "/images/genset/cummins_qsg12_silent.jpg",
    link: "/lo/store?category=Generators",
    brand: "Cummins Power Generation",
  },

  // --- 2. Warehousing & Automation ---
  {
    id: 4,
    pre_category_id: "warehouse-storage",
    name: "Storage System",
    name_lo: "ລະບົບຊັ້ນວາງສາງ (Racking & Shelving)",
    description: "ຊັ້ນວາງສິນຄ້າ Selective Rack, Cantilever, Drive-in, Longspan Shelving, ແລະ Mezzanine Floor.",
    image: "/images/catalog/real/pallet_racking_beam.jpg",
    link: "/lo/store?category=Storage%20System",
  },
  {
    id: 23,
    pre_category_id: "warehouse-storage",
    name: "Plastic Bins",
    name_lo: "ລັງພາດສະຕິກ & ກ່ອງອາໄຫຼ່ (Plastic Bins)",
    description: "ກ່ອງອາໄຫຼ່ຊ້ອນກັນໄດ້, ລັງພາດສະຕິກອຸດສາຫະກຳ, ແລະ ພາເລດພາດສະຕິກ ຮັບນ້ຳໜັກສູງ.",
    image: "/images/catalog/real/solid_plastic_crates.jpg",
    link: "/lo/store?category=Plastic%20Bins",
  },
  {
    id: 13,
    pre_category_id: "warehouse-storage",
    name: "Automated Systems",
    name_lo: "ລະບົບສາງອັດສະລິຍະ (AS/RS & Shuttle)",
    description: "Radio Pallet Shuttle System, AS/RS Mini-Load Stacker Cranes, Vertical Lift Module (PRK), ແລະ ໂມເດວ Turnkey.",
    image: "/images/catalog/real/radio_pallet_shuttle.jpg",
    link: "/lo/store?category=Automated%20Systems",
  },
  {
    id: 9,
    pre_category_id: "warehouse-storage",
    name: "Packaging",
    name_lo: "ອຸປະກອນຫຸ້ມຫໍ່ (Packaging & Wrap)",
    description: "ຟີມຍືດພັນພາເລັດ Stretch Film, ສາຍຮັດພາດສະຕິກ, ເຄື່ອງຮັດກ່ອງ ແລະ ອຸປະກອນ Packing.",
    image: "/images/catalog/real/stretch_film_roll.jpg",
    link: "/lo/store?category=Packaging",
  },

  // --- 3. Nilfisk Cleaning Solutions ---
  {
    id: 8,
    pre_category_id: "nilfisk-cleaning",
    name: "Cleaning",
    name_lo: "ເຄື່ອງຂັດລ້າງພື້ນ (Scrubber Dryers)",
    description: "ລົດຂັດລ້າງພື້ນແບບນັ່ງຂັບ SC3500-SC8000 ແລະ ແບບຍ່າງຕາມ SC100-SC2000 ນະວັດຕະກຳ Nilfisk ເດນມາກ.",
    image: "/images/catalog/real/commercial_floor_scrubber.jpg",
    link: "/lo/store?category=Cleaning",
    brand: "Nilfisk",
  },
  {
    id: 14,
    pre_category_id: "nilfisk-cleaning",
    name: "Sweepers & Combi",
    name_lo: "ເຄື່ອງກວາດພື້ນ (Sweepers & Combi)",
    description: "CS7010 First Hybrid Combi machine (ກວາດ ແລະ ຂັດໃນຄັນດຽວ) ແລະ ກອງລົດກວາດ SW8000, SR1601, SW900.",
    image: "/images/catalog/real/industrial_ride_on_sweeper.jpg",
    link: "/lo/store?category=Sweepers%20%26%20Combi",
    brand: "Nilfisk",
  },
  {
    id: 15,
    pre_category_id: "nilfisk-cleaning",
    name: "Industrial Vacuums",
    name_lo: "ເຄື່ອງດູດຝຸ່ນອຸດສາຫະກຳ (Industrial Vacs)",
    description: "VHO200 & VHS120 ດູດນ້ຳມັນຫຼໍ່ເຢັນ CNC, ດູດຝຸ່ນອັນຕະລາຍ Class M/H HEPA, ແລະ ແບັດ Lithium VHB436.",
    image: "/images/catalog/real/industrial_vacuum_cleaner_1787993454700.jpg",
    link: "/lo/store?category=Industrial%20Vacuums",
    brand: "Nilfisk",
  },
  {
    id: 16,
    pre_category_id: "nilfisk-cleaning",
    name: "Commercial Vacuums",
    name_lo: "ເຄື່ອງດູດຝຸ່ນ-ດູດນ້ຳ (Commercial Vacs)",
    description: "VL100/200/500 Wet & Dry ຖັງສະແຕນເລດ ແລະ VP Series (VP100, VP300, VP930, VP600 HEPA).",
    image: "/images/catalog/real/commercial_canister_vacuum.jpg",
    link: "/lo/store?category=Commercial%20Vacuums",
    brand: "Nilfisk",
  },

  // --- 4. Forklift Parts & Consumables ---
  {
    id: 3,
    pre_category_id: "spare-parts-consumables",
    name: "Wheels",
    name_lo: "ຢາງຕັນ & ລໍ້ອຸດສາຫະກຳ (Solid Tires)",
    description: "ຢາງຕັນອຸດສາຫະກຳດຳ ແລະ ຢາງຂາວ Non-marking ຂະໜາດ 5.00-8, 6.00-9, 6.50-10, 7.00-12 ພ້ອມບໍລິການອັດຢາງ.",
    image: "/images/catalog/real/rubber_swivel_caster.jpg",
    link: "/lo/store?category=Wheels",
  },
  {
    id: 10,
    pre_category_id: "spare-parts-consumables",
    name: "Accessories",
    name_lo: "ອາໄຫຼ່ແທ້ 10 ແບຣນ (OEM Spare Parts)",
    description: "ອາໄຫຼ່ແທ້ Mitsubishi, Jungheinrich, Toyota, Nissan, Komatsu, Clark, Hyster, CAT, Hyundai, Yale.",
    image: "/images/categories/accessories_clean.jpg",
    link: "/lo/store?category=Accessories",
  },
  {
    id: 17,
    pre_category_id: "spare-parts-consumables",
    name: "Specialized Attachments",
    name_lo: "ອຸປະກອນເສີມພິເສດ (Forklift Attachments)",
    description: "ງ່າໜີບມ້ວນເຈ້ຍ Paper Roll Clamp, ງ່າໜີບກ້ອນສິນຄ້າ Bale Clamp, Side Shifter, Fork Positioner, Rotating Fork.",
    image: "/images/catalog/real/paper_roll_clamp.jpg",
    link: "/lo/store?category=Specialized%20Attachments",
  },
  {
    id: 18,
    pre_category_id: "spare-parts-consumables",
    name: "LED Safety Lights",
    name_lo: "ໄຟນິລະໄພໂຟກສ໌ລິບ (LED Safety Light)",
    description: "Blue Spot Warning Beam, Red Zone Danger Line, ແລະ Perimeter Halo Arc 360° ປ້ອງກັນອຸບັດຕິເຫດໃນໂຮງງານ.",
    image: "/images/catalog/real/forklift_blue_spot.jpg",
    link: "/lo/store?category=LED%20Safety%20Lights",
  },
  {
    id: 5,
    pre_category_id: "spare-parts-consumables",
    name: "Hand Tools",
    name_lo: "ເຄື່ອງມືຊ່າງ (Hand Tools)",
    description: "ປະແຈ Torque Wrench, ຄີມ, ໄຂຄວງ, ແລະ ຊຸດເຄື່ອງມືມາດຕະຖານໂຮງງານ.",
    image: "/images/categories/tools_clean.jpg",
    link: "/lo/store?category=Hand%20Tools",
  },
  {
    id: 20,
    pre_category_id: "spare-parts-consumables",
    name: "Power Tools",
    name_lo: "ເຄື່ອງມືໄຟຟ້າ (Power Tools)",
    description: "ສະຫວ່ານໄຟຟ້າ, ເຄື່ອງເຈຍ, ເຄື່ອງຂັດ, ບລັອກໄຟຟ້າ ມາດຕະຖານອຸດສາຫະກຳໜັກ.",
    image: "/images/catalog/real/cordless_hammer_drill.jpg",
    link: "/lo/store?category=Power%20Tools",
  },
  {
    id: 21,
    pre_category_id: "spare-parts-consumables",
    name: "Tool Cabinets",
    name_lo: "ຕູ້ເກັບເຄື່ອງມືຊ່າງ (Tool Cabinets)",
    description: "ຕູ້ເກັບເຄື່ອງມືຊ່າງລໍ້ເລື່ອນ Shadow Board ແລະ ໂຕະເຮັດວຽກຊ່າງ Heavy Duty.",
    image: "/images/catalog/real/roller_tool_cabinet.jpg",
    link: "/lo/store?category=Tool%20Cabinets",
  },
  {
    id: 26,
    pre_category_id: "spare-parts-consumables",
    name: "Welding Equipment",
    name_lo: "ອຸປະກອນເຊື່ອມໂລຫະ (Welding Equipment)",
    description: "ເຄື່ອງເຊື່ອມໄຟຟ້າ Inverter TIG/MIG/MMA, ໜ້າກາກເຊື່ອມອັດຕະໂນມັດ ແລະ ອຸປະກອນເຊື່ອມ.",
    image: "/images/catalog/real/inverter_mma_welder.jpg",
    link: "/lo/store?category=Welding%20Equipment",
  },
  {
    id: 6,
    pre_category_id: "spare-parts-consumables",
    name: "Safety Equipment",
    name_lo: "ອຸປະກອນຄວາມປອດໄພ (PPE)",
    description: "ເກີບເຊັບຕີ້, ໝວກນິລະໄພ, ແວ່ນຕາ, ຖົງມື ແລະ ອຸປະກອນ PPE ມາດຕະຖານ ISO/OSHA.",
    image: "/images/catalog/real/safety_helmet_1787989844162.jpg",
    link: "/lo/store?category=Safety%20Equipment",
  },
  {
    id: 22,
    pre_category_id: "spare-parts-consumables",
    name: "Traffic Safety",
    name_lo: "ອຸປະກອນຈະລາຈອນ (Traffic Safety)",
    description: "ກວຍຈະລາຈອນ, ປ້າຍເຕືອນ, ກະຈົກໂຄ້ງ, ແລະ ອຸປະກອນຈັດການພື້ນທີ່ລົດຍົກໃນສາງ.",
    image: "/images/catalog/real/rubber_speed_hump.jpg",
    link: "/lo/store?category=Traffic%20Safety",
  },
  {
    id: 7,
    pre_category_id: "spare-parts-consumables",
    name: "Premises",
    name_lo: "ອຸປະກອນອາຄານ (Premises)",
    description: "ຖັງຂີ້ເຫຍື້ອແຍກປະເພດ 120L/240L, ແລະ ອຸປະກອນຮັກສາຄວາມສະອາດພາຍໃນອາຄານ.",
    image: "/images/catalog/real/outdoor_trash_bin_120l.jpg",
    link: "/lo/store?category=Premises",
  },
  {
    id: 27,
    pre_category_id: "spare-parts-consumables",
    name: "Industrial Fans",
    name_lo: "ພັດລົມອຸດສາຫະກຳ (Industrial Fans)",
    description: "ພັດລົມອຸດສາຫະກຳຂາຕັ້ງ 24-30 ນິ້ວ, ພັດລົມຕິດຝາ ແລະ ພັດລົມລະບາຍອາກາດ Blower ໂຮງງານ.",
    image: "/images/catalog/real/industrial_stand_fan.jpg",
    link: "/lo/store?category=Industrial%20Fans",
  },

  // --- 5. Heavy Machinery & Mining Spares ---
  {
    id: 19,
    pre_category_id: "heavy-mining-machinery",
    name: "Mining Heavy Spares",
    name_lo: "ອາໄຫຼ່ກົນຈັກບໍ່ແຮ່ (35+ ແບຣນໂລກ)",
    description: "ອາໄຫຼ່ລົດບັນທຸກບໍ່ແຮ່ Hitachi EH1100, CAT, Komatsu, Cummins, Atlas Copco, Sandvik, Liebherr, Detroit Diesel.",
    image: "/images/catalog/real/mining_planetary_gear.jpg",
    link: "/lo/store?category=Mining%20Heavy%20Spares",
    brand: "Hitachi / CAT / Komatsu / Cummins",
  },
];
