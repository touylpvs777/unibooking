export interface BulkPricingTier {
  min_qty: number;
  price: number;
}

export interface InventoryItem {
  sku_id: string;
  sku_code: string;
  barcode: string | null;
  part_name: string;
  part_name_lo?: string;
  category: string;
  description?: string;
  description_lo?: string;
  image_url?: string;
  qty_on_hand: number;
  unit_price: number;
  original_price?: number;
  specs?: { [key: string]: string };
  spec_sheet_url?: string;
  lead_time?: string;
  bulk_pricing?: BulkPricingTier[];
  colors?: string[];
  sizes?: string[];
  gallery_images?: string[];
  related_skus?: string[];
  compatible_models?: string[];
  warranty_months?: number;
  currency?: "THB" | "LAK" | "USD";
  pre_category_id?: string;
  brand?: string;
  sub_category?: string;
}

// Enterprise B2B & Industrial Catalog (100% Verified Images & Specifications)
export const INITIAL_CATALOG: InventoryItem[] = [
  // --- Flagship Pre-Category Products: Nilfisk Cleaning ---
  {
    sku_id: "nilfisk-sc8000",
    sku_code: "NIL-SC8000-RIDE",
    barcode: "5711145180001",
    part_name: "Nilfisk SC8000 Heavy-Duty Industrial Ride-On Scrubber Dryer (1220 mm Scrub Path)",
    part_name_lo: "ລົດຂັດລ້າງພື້ນອຸດສາຫະກຳໜັກແບບນັ່ງຂັບ Nilfisk SC8000 (ໜ້າຂັດກວ້າງ 1220 ມມ)",
    category: "Cleaning",
    pre_category_id: "nilfisk-cleaning",
    brand: "Nilfisk",
    sub_category: "Scrubber Dryers",
    description: "Maximum productivity industrial scrubber dryer with 380L solution tank, heavy duty steel frame, and Kubota LPG/Diesel engine for distribution centers and manufacturing plants.",
    description_lo: "ລົດຂັດພື້ນອຸດສາຫະກຳໜັກແບບນັ່ງຂັບ ຖັງນ້ຳ 380 ລິດ ໂຄງສ້າງເຫຼັກໜາພິເສດ ປະສິດທິພາບສູງສຸດ 10,000 m²/h ສຳລັບສາງສິນຄ້າ ແລະ ໂຮງງານໃຫຍ່.",
    image_url: "/images/catalog/real/commercial_floor_scrubber.jpg",
    qty_on_hand: 4,
    unit_price: 685000,
    currency: "THB",
    specs: {
      "Scrub Path": "1220 mm",
      "Productivity": "10,000 m²/h",
      "Tank Capacity": "380 Liters",
      "Origin": "Nilfisk Denmark"
    },
    lead_time: "In Stock (Vientiane Hub)",
    warranty_months: 24,
  },
  {
    sku_id: "nilfisk-cs7010-hybrid",
    sku_code: "NIL-CS7010-HYB",
    barcode: "5711145170102",
    part_name: "Nilfisk CS7010 First Hybrid & ePower Combi Sweeper-Scrubber Machine",
    part_name_lo: "ລົດກວາດ ແລະ ຂັດລ້າງພື້ນແຫ້ງລະບົບໄຮບຣິດ Nilfisk CS7010 (Combi Machine)",
    category: "Sweepers & Combi",
    pre_category_id: "nilfisk-cleaning",
    brand: "Nilfisk",
    sub_category: "Sweepers",
    description: "Pioneering green technology hybrid sweep-scrub machine that slashes fuel consumption by 30% while sweeping and scrubbing in a single pass.",
    description_lo: "ນະວັດຕະກຳລົດກວາດ ແລະ ຂັດພື້ນໄຮບຣິດ/ໄຟຟ້າ CS7010 ປະຢັດນ້ຳມັນ 30% ກວາດ ແລະ ຂັດລ້າງພື້ນແຫ້ງໄດ້ໃນຮອບດຽວ ມາດຕະຖານສາກົນ.",
    image_url: "/images/catalog/real/industrial_ride_on_sweeper.jpg",
    qty_on_hand: 3,
    unit_price: 795000,
    currency: "THB",
    specs: {
      "Technology": "Hybrid & ePower",
      "Working Width": "1540 mm",
      "Debris Hopper": "198 Liters",
      "Features": "Single-pass Sweep & Scrub"
    },
    lead_time: "In Stock (1-2 Days)",
    warranty_months: 24,
  },
  {
    sku_id: "nilfisk-vho200-oil",
    sku_code: "NIL-VHO200-CNC",
    barcode: "5711145120003",
    part_name: "Nilfisk VHO200 Industrial Vacuum for CNC Coolants, Liquids & Metal Swarf (75L/100L)",
    part_name_lo: "ເຄື່ອງດູດຝຸ່ນ-ດູດນ້ຳມັນອຸດສາຫະກຳ Nilfisk VHO200 ສຳລັບນ້ຳມັນຫຼໍ່ເຢັນ CNC ແລະ ເສດໂລຫະ",
    category: "Industrial Vacuums",
    pre_category_id: "nilfisk-cleaning",
    brand: "Nilfisk",
    sub_category: "Industrial Vacuums",
    description: "Specialized oil & swarf vacuum featuring diverting valve for simultaneous liquid suction and discharge with reusable chip filter basket.",
    description_lo: "ເຄື່ອງດູດນ້ຳມັນ ແລະ ເສດຂີ້ກຶງ CNC ພ້ອມວາວ Diverting Valve ດູດ ແລະ ປ່ອຍນ້ຳມັນຫຼໍ່ເຢັນໄດ້ທັນທີ ພ້ອມຕະແກງກັ່ນຕອງເສດເຫຼັກ.",
    image_url: "/images/catalog/real/industrial_vacuum_cleaner_1787993454700.jpg",
    qty_on_hand: 8,
    unit_price: 185000,
    currency: "THB",
    specs: {
      "Capacity": "75 / 100 Liters",
      "Motor Power": "2.4 kW Dual Bypass",
      "Application": "CNC Coolant Recovery & Chips",
      "Feature": "2-Way Diverting Valve"
    },
    lead_time: "In Stock",
    warranty_months: 12,
  },
  {
    sku_id: "nilfisk-vp930-hepa",
    sku_code: "NIL-VP930-HEPA",
    barcode: "5711145193004",
    part_name: "Nilfisk VP930 / GD930 Legendary Commercial HEPA Vacuum Cleaner (15L Steel Container)",
    part_name_lo: "ເຄື່ອງດູດຝຸ່ນລະດັບຕຳນານ Nilfisk VP930 / GD930 ຖັງເຫຼັກ 15L ພ້ອມໄສ້ຕອງ HEPA H13",
    category: "Commercial Vacuums",
    pre_category_id: "nilfisk-cleaning",
    brand: "Nilfisk",
    sub_category: "Commercial Vacuums",
    description: "The world-renowned ultra-quiet commercial dry vacuum with 15L stainless steel drum and certified HEPA H13 filtration for hotels, hospitals, and cleanrooms.",
    description_lo: "ເຄື່ອງດູດຝຸ່ນແຫ້ງຖັງສະແຕນເລດ 15L ສຽງງຽບພິເສດ ລະບົບຕອງ HEPA H13 ມາດຕະຖານໂຮງແຮມ 5 ດາວ, ໂຮງໝໍ, ແລະ ຫ້ອງ Cleanroom.",
    image_url: "/images/catalog/real/commercial_canister_vacuum.jpg",
    qty_on_hand: 25,
    unit_price: 16500,
    currency: "THB",
    specs: {
      "Capacity": "15 Liters",
      "Filter": "HEPA H13 Certified",
      "Sound Level": "53 dB(A) Ultra Quiet",
      "Construction": "Solid Steel Drum"
    },
    lead_time: "In Stock (Immediate)",
    warranty_months: 12,
  },

  // --- Flagship Pre-Category Products: JLG & MHE ---
  {
    sku_id: "jlg-1350sjp-ultra",
    sku_code: "JLG-1350SJP",
    barcode: "885110009001",
    part_name: "JLG 1350SJP Telescopic Ultra Boom Lift (43.3m Working Height, 450kg Dual Capacity)",
    part_name_lo: "ລົດກະເຊົ້າບູມຍືດສູງ Ultra Boom JLG 1350SJP (ຄວາມສູງເຮັດວຽກ 43.3 ແມັດ ຮັບນ້ຳໜັກ 450 ກກ)",
    category: "Access Platforms",
    pre_category_id: "mhe-forklifts",
    brand: "JLG",
    sub_category: "Telescopic Booms",
    description: "World-class ultra-boom reach platform with JibPLUS articulating jib, 4WD powertrain, and 24.38m horizontal reach for major construction and plant maintenance.",
    description_lo: "ລົດກະເຊົ້າບູມຍືດສູງພິເສດ JLG 1350SJP ຍືດສູງ 43.3 ແມັດ ແລະ ຍື່ນແນວນອນ 24.4 ແມັດ ຂັບເຄື່ອນ 4 ລໍ້ ສຳລັບໂຄງການຂະໜາດໃຫຍ່ ແລະ ໂຮງກັ່ນ.",
    image_url: "/images/catalog/real/articulating_boom_lift.jpg",
    qty_on_hand: 2,
    unit_price: 2850000,
    currency: "THB",
    specs: {
      "Working Height": "43.30 m (142 ft)",
      "Horizontal Reach": "24.38 m (80 ft)",
      "Platform Capacity": "450 kg (Dual)",
      "Powertrain": "Deutz Diesel 4WD"
    },
    lead_time: "Available for Sale & Lease",
    warranty_months: 24,
  },
  {
    sku_id: "jlg-1930es-scissor",
    sku_code: "JLG-1930ES",
    barcode: "885110009002",
    part_name: "JLG 1930ES Electric Scissor Lift (7.72m Working Height, Zero Emissions)",
    part_name_lo: "ລົດກະເຊົ້າຂາກະໄກ່ໄຟຟ້າ JLG 1930ES (ຄວາມສູງເຮັດວຽກ 7.72 ແມັດ ໄຮ້ມົນລະພິດ)",
    category: "Access Platforms",
    pre_category_id: "mhe-forklifts",
    brand: "JLG",
    sub_category: "Electric Scissor Lifts",
    description: "Compact electric drive scissor lift with long battery life, non-marking tires, and narrow width that easily fits through standard doorways.",
    description_lo: "ລົດກະເຊົ້າຂາກະໄກ່ໄຟຟ້າ JLG 1930ES ແບັດເຕີຣີທົນທານ 2 ເທົ່າ ຢາງຂາວ Non-marking ລອດຜ່ານປະຕູມາດຕະຖານໄດ້ສະດວກ.",
    image_url: "/images/catalog/real/electric_scissor_lift.jpg",
    qty_on_hand: 6,
    unit_price: 295000,
    currency: "THB",
    specs: {
      "Working Height": "7.72 m",
      "Platform Capacity": "230 kg",
      "Width": "0.76 m (Narrow)",
      "Power": "Electric 24V DC Drive"
    },
    lead_time: "In Stock (Ready to Deliver)",
    warranty_months: 12,
  },

  // --- Flagship Pre-Category Products: Warehousing & Automation ---
  {
    sku_id: "lpi-selective-rack-4t",
    sku_code: "LPI-RACK-SEL-4T",
    barcode: "885110008001",
    part_name: "Heavy-Duty Selective Pallet Racking System (Beam Level 4000 kg Capacity)",
    part_name_lo: "ລະບົບຊັ້ນວາງສາງສິນຄ້າອຸດສາຫະກຳ Selective Pallet Racking (ຮັບນ້ຳໜັກ 4,000 ກກ/ຊັ້ນ)",
    category: "Storage System",
    pre_category_id: "warehouse-storage",
    brand: "LPI / DK LAO",
    sub_category: "Pallet Racking",
    description: "Engineered heavy-duty steel selective racking customizable to any warehouse ceiling height with seismic certified frames and electrostatic powder coat.",
    description_lo: "ຊັ້ນວາງສິນຄ້າອຸດສາຫະກຳເຫຼັກກ້າ High-Tensile ຮັບນ້ຳໜັກ 4 ໂຕນຕໍ່ຊັ້ນ ອອກແບບ CAD 3D ຕາມຂະໜາດສາງ ແລະ ລົດຍົກ ພ້ອມຕິດຕັ້ງທົ່ວປະເທດ.",
    image_url: "/images/catalog/real/pallet_racking_beam.jpg",
    qty_on_hand: 50,
    unit_price: 18500,
    currency: "THB",
    specs: {
      "Beam Capacity": "4,000 kg / Level",
      "Upright Height": "3,000 - 12,000 mm",
      "Finish": "Epoxy Powder Coated",
      "Standards": "FEM / AS4084 Compliant"
    },
    lead_time: "Custom Design (5-7 Days)",
    warranty_months: 36,
  },
  {
    sku_id: "jgh-pallet-shuttle-asrs",
    sku_code: "JGH-SHUTTLE-ASRS",
    barcode: "885110008002",
    part_name: "Radio Pallet Shuttle Automation Compact Storage System (1500 kg Payload)",
    part_name_lo: "ລະບົບສາງອັດຕະໂນມັດ Radio Pallet Shuttle ແລ່ນລາງເລິກ (ຮັບນ້ຳໜັກ 1,500 ກກ)",
    category: "Automated Systems",
    pre_category_id: "warehouse-storage",
    brand: "Jungheinrich / DK LAO",
    sub_category: "Automated Systems",
    description: "High-density semi-automated channel storage shuttle that glides independently along pallet channels, slashing warehouse handling time by 50%.",
    description_lo: "ລົດ Shuttle ອັດສະລິຍະແລ່ນໃນຊ່ອງພາເລັດເລິກ ຄວບຄຸມດ້ວຍ Remote/Wi-Fi ເພີ່ມພື້ນທີ່ຈັດເກັບ 80% ແລະ ຫຼຸດເວລາເຮັດວຽກລົງ 50%.",
    image_url: "/images/solutions/automated-high-bay-racking-shuttle.png",
    qty_on_hand: 6,
    unit_price: 450000,
    currency: "THB",
    specs: {
      "Payload": "1,500 kg",
      "Travel Speed": "0.8 m/s Loaded",
      "Battery": "Lithium-Ion Fast Charge",
      "Operation": "FIFO / LIFO Multi-depth"
    },
    lead_time: "Turnkey Project (Vientiane)",
    warranty_months: 24,
  },

  // --- Flagship Pre-Category Products: Heavy Mining Machinery Spares ---
  {
    sku_id: "hitachi-eh1100-brake-cyl",
    sku_code: "HIT-EH1100-BRK",
    barcode: "885110007001",
    part_name: "Hitachi EH1100 Mining Dump Truck Heavy Brake Caliper & Master Cylinder Assembly",
    part_name_lo: "ຊຸດຄາລິບເປີ ແລະ ແມ່ປ້ຳເບຣກລົດບັນທຸກບໍ່ແຮ່ Hitachi EH1100 (OEM Genuine Parts)",
    category: "Mining Heavy Spares",
    pre_category_id: "heavy-mining-machinery",
    brand: "Hitachi",
    sub_category: "Mining Haul Truck Spares",
    description: "Genuine OEM heavy brake system assembly designed for severe high-load downhill mining hauling with thermal heat dissipating pistons.",
    description_lo: "ອາໄຫຼ່ລະບົບເບຣກແທ້ລົດບັນທຸກບໍ່ແຮ່ຂະໜາດໃຫຍ່ Hitachi EH1100 ທົນຄວາມຮ້ອນ ແລະ ແຮງກົດສູງສຸດ ມາດຕະຖານໄຊທ໌ງານບໍ່ແຮ່ຄຳ-ບໍ່ແຮ່ທອງ.",
    image_url: "/images/solutions/heavy-machinery-mining-spare-parts.jpg",
    qty_on_hand: 5,
    unit_price: 95000,
    currency: "THB",
    specs: {
      "Vehicle": "Hitachi EH1100 Haul Truck",
      "Component": "Hydraulic Brake Assembly",
      "Working Pressure": "210 Bar Heavy Duty",
      "Certification": "OEM Mining Certified"
    },
    lead_time: "In Stock (Express Mining Dispatch)",
    warranty_months: 12,
  },
  {
    sku_id: "cat-c15-piston-liner-kit",
    sku_code: "CAT-C15-PST-KIT",
    barcode: "885110007002",
    part_name: "Caterpillar C15 Heavy Diesel Engine Cylinder Kit (Piston, Rings & Liner Assembly)",
    part_name_lo: "ຊຸດປອກສູບ-ລູກສູບ ເຄື່ອງຈັກດີເຊວ Caterpillar C15 (CAT Genuine Engine Kit)",
    category: "Mining Heavy Spares",
    pre_category_id: "heavy-mining-machinery",
    brand: "Caterpillar",
    sub_category: "Heavy Diesel Engines",
    description: "Genuine Caterpillar C15 overhaul cylinder kit engineered to endure extreme temperature and pressure in mining excavators and generator sets.",
    description_lo: "ຊຸດປອກສູບ ແລະ ລູກສູບເຄື່ອງຈັກ CAT C15 ແທ້ ສຳລັບລົດຂຸດບໍ່ແຮ່, ລົດຕັກ, ແລະ ຈັກປັ່ນໄຟຂະໜາດໃຫຍ່ ຮັບປະກັນຄຸນນະພາບ 100%.",
    image_url: "/images/solutions/heavy-machinery-mining-spare-parts.jpg",
    qty_on_hand: 12,
    unit_price: 48000,
    currency: "THB",
    specs: {
      "Engine Model": "Caterpillar C15 ACERT",
      "Includes": "Piston, Pin, Retainers, Rings, Liner",
      "Origin": "USA / Caterpillar OEM",
      "Durability": "Heavy Mining Duty"
    },
    lead_time: "In Stock (Vientiane Warehouse)",
    warranty_months: 12,
  },
  {
    sku_id: "komatsu-pc1250-hyd-pump",
    sku_code: "KOM-PC1250-PUMP",
    barcode: "885110007003",
    part_name: "Komatsu PC1250 Mining Excavator Main Hydraulic Tandem Piston Pump (HPV210+210)",
    part_name_lo: "ປ້ຳໄຮໂດຣລິກຫຼັກລົດຂຸດບໍ່ແຮ່ Komatsu PC1250 (Main Hydraulic Tandem Pump)",
    category: "Mining Heavy Spares",
    pre_category_id: "heavy-mining-machinery",
    brand: "Komatsu",
    sub_category: "Hydraulic Systems",
    description: "OEM dual variable displacement axial piston pump delivering high-flow hydraulic power to the boom, arm, and bucket of Komatsu PC1250 excavators.",
    description_lo: "ປ້ຳໄຮໂດຼລິກແທ້ Komatsu PC1250 ແຮງດັນສູງ 350 Bar ສົ່ງກຳລັງຂຸດ ແລະ ຍົກໄດຢາກລ່ຽນໄຫຼ ທົນທານຕໍ່ການເຮັດວຽກ 24/7 ໃນບໍ່ແຮ່.",
    image_url: "/images/solutions/heavy-machinery-mining-spare-parts.jpg",
    qty_on_hand: 2,
    unit_price: 345000,
    currency: "THB",
    specs: {
      "Model": "HPV210+210 Dual Pump",
      "Machine": "Komatsu PC1250-7 / PC1250-8",
      "Max Pressure": "34.3 MPa (350 kg/cm²)",
      "Warranty": "12 Months Factory Guarantee"
    },
    lead_time: "In Stock (Site Delivery Available)",
    warranty_months: 12,
  },

  // --- Flagship Pre-Category Products: Forklift Parts & Consumables ---
  {
    sku_id: "mhe-cascade-roll-clamp",
    sku_code: "CAS-ROLL-360",
    barcode: "885110006001",
    part_name: "Cascade 360° Rotating Paper Roll Clamp Attachment for Forklifts (2.5 - 3.5 Ton)",
    part_name_lo: "ງ່າໜີບມ້ວນເຈ້ຍໝຸນ 360° Cascade ສຳລັບລົດຍົກ 2.5 - 3.5 ໂຕນ (Rotating Paper Roll Clamp)",
    category: "Specialized Attachments",
    pre_category_id: "spare-parts-consumables",
    brand: "Cascade / Mitsubishi",
    sub_category: "Attachments",
    description: "Industrial 360-degree continuous rotating paper roll clamp with thin arm profile and regulated hydraulic clamping pressure to prevent roll damage.",
    description_lo: "ອຸປະກອນເສີມງ່າໜີບມ້ວນເຈ້ຍ ໝຸນ 360 ອົງສາ ແຂນບາງພິເສດ ປັບແຮງກົດໄຮໂດຣລິກອັດຕະໂນມັດ ປ້ອງກັນມ້ວນເຈ້ຍບຸບ ມາດຕະຖານໂຮງພິມ ແລະ ໂຮງງານເຈ້ຍ.",
    image_url: "/images/catalog/real/paper_roll_clamp.jpg",
    qty_on_hand: 4,
    unit_price: 145000,
    currency: "THB",
    specs: {
      "Rotation": "360° Continuous",
      "Roll Diameter": "250 - 1300 mm",
      "Forklift Class": "Class II / III (2.5 - 3.5T)",
      "Hydraulic Pressure": "Adjustable Relief Valve"
    },
    lead_time: "In Stock (Installation Included)",
    warranty_months: 12,
  },
  {
    sku_id: "led-safety-arc-halo",
    sku_code: "LED-ARC-RED-360",
    barcode: "885110006002",
    part_name: "Forklift Red Zone Danger Line & Perimeter Arc Halo Safety Light (10-80V Multi-Voltage)",
    part_name_lo: "ໄຟນິລະໄພໂຟກສ໌ລິບ Red Zone Danger Line & Perimeter Arc Halo 360° (ໄຟເລເຊີແດງ)",
    category: "LED Safety Lights",
    pre_category_id: "spare-parts-consumables",
    brand: "DK Safety",
    sub_category: "Safety Lights",
    description: "High-intensity red beam LED projector that casts an unmistakable danger boundary line on warehouse floors to protect pedestrian workers.",
    description_lo: "ໄຟນິລະໄພ LED ສີແດງສ່ອງເສັ້ນເລເຊີລ້ອມຮອບລົດຍົກ 360° ເຕືອນຄົນຍ່າງໃນສາງ ຫຼຸດອຸບັດຕິເຫດລົດຊົນຄົນ 100% ກັນນ້ຳ IP67.",
    image_url: "/images/solutions/led-warning-safety-lights.png",
    qty_on_hand: 40,
    unit_price: 3200,
    currency: "THB",
    specs: {
      "Voltage": "10 - 80V DC Universal",
      "Beam": "Curved Arc Halo / Linear Red Line",
      "Waterproof": "IP67 Die-Cast Aluminum",
      "Certification": "CE / RoHS / OSHA Safety"
    },
    lead_time: "In Stock (Immediate Dispatch)",
    warranty_months: 12,
  },
  {
    sku_id: "forklift-solid-tire-non-marking",
    sku_code: "TIRE-650-10-NM",
    barcode: "885110006003",
    part_name: "Industrial Non-Marking White Solid Forklift Tire 6.50-10 (Cleanroom & Food Grade)",
    part_name_lo: "ຢາງລົດຍົກຕັນສີຂາວ Non-Marking 6.50-10 (ສຳລັບໂຮງງານອາຫານ, ເຄື່ອງດື່ມ & Cleanroom)",
    category: "Wheels",
    pre_category_id: "spare-parts-consumables",
    brand: "Industrial Pro",
    sub_category: "Solid Tires",
    description: "Premium natural rubber white solid tire that leaves zero black marks on epoxy and polished warehouse floors, ideal for Food & Beverage and Pharma facilities.",
    description_lo: "ຢາງຕັນສີຂາວຄຸນນະພາບສູງ ບໍ່ປະຮອຍດຳເທິງພື້ນ Epoxy ແລະ ພື້ນຂັດມັນ ເໝາະສຳລັບໂຮງງານເບຍ, ເຄື່ອງດື່ມ, ຢາປິ່ນປົວພະຍາດ ແລະ ຫ້ອງເຢັນ.",
    image_url: "/images/catalog/forklift_wheel.jpg",
    qty_on_hand: 28,
    unit_price: 7500,
    currency: "THB",
    specs: {
      "Size": "6.50-10 (Rim 5.00F)",
      "Compound": "Non-Marking White Rubber",
      "Pattern": "Lug Deep Tread Anti-Slip",
      "Service": "Hydraulic Press Installation"
    },
    lead_time: "In Stock (Tire Pressing Available)",
    warranty_months: 12,
  },

  // --- Original Hand Pallet & Equipment Catalog ---
  {
    "sku_id": "jns-hl-1001",
    "sku_code": "JNS-HL-1001",
    "barcode": "885110001001",
    "part_name": "Standard Hand Pallet Truck 2.5 Tons - Fork W685xL1150 mm (Double Nylon Rollers)",
    "part_name_lo": "ລົດລາກພາເລດມາດຕະຖານ 2.5 ໂຕນ - ງາ W685xL1150 ມມ (ລໍ້ໄນລ່ອນຄູ່)",
    "category": "Handling & Lifting",
    "description": "Industrial manual hand pallet truck with 2500 kg capacity, heavy duty cast hydraulic pump, and durable double nylon load rollers.",
    "description_lo": "ລົດລາກພາເລດມາດຕະຖານ 2.5 ໂຕນ ໂຄງສ້າງເຫຼັກໜາແໜ້ນ ປ້ຳໄຮໂດຣລິກຫຼໍ່ໜຽວບໍ່ຮົ່ວຊຶມ ລໍ້ໄນລ່ອນຄູ່ທົນທານຕໍ່ການສຽດສີ.",
    "image_url": "/images/jenstore-products/full_standard_hand_pallet_truck_2_5_tons___fork_w685xl1_0.jpg",
    "qty_on_hand": 35,
    "unit_price": 7800,
    "currency": "THB",
    "specs": {
      "Capacity": "2500 kg",
      "Fork Width": "685 mm",
      "Fork Length": "1150 mm",
      "Rollers": "Double Nylon"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7410
      },
      {
        "min_qty": 10,
        "price": 7020
      },
      {
        "min_qty": 20,
        "price": 6630
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1002",
    "sku_code": "JNS-HL-1002",
    "barcode": "885110001002",
    "part_name": "Standard Hand Pallet Truck 2.5 Tons - Fork W685xL1150 mm (Double Polyurethane Rollers)",
    "part_name_lo": "ລົດລາກພາເລດມາດຕະຖານ 2.5 ໂຕນ - ງາ W685xL1150 ມມ (ລໍ້ PU ຄູ່)",
    "category": "Handling & Lifting",
    "description": "Manual hand pallet truck 2500 kg capacity with non-marking quiet polyurethane double rollers for epoxy and polished concrete floors.",
    "description_lo": "ລົດລາກພາເລດ 2.5 ໂຕນ ລໍ້ໂພລີຢູຣີເທນ (PU) ຄູ່ ເລື່ອນງຽບ ບໍ່ເປັນຮອຍເທິງພື້ນ Epoxy ແລະ ພື້ນຂັດມັນ.",
    "image_url": "/images/jenstore-products/full_standard_hand_pallet_truck_2_5_tons___fork_w685xl1_1.jpg",
    "qty_on_hand": 40,
    "unit_price": 8200,
    "currency": "THB",
    "specs": {
      "Capacity": "2500 kg",
      "Fork Width": "685 mm",
      "Fork Length": "1150 mm",
      "Rollers": "Double Polyurethane (PU)"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7790
      },
      {
        "min_qty": 10,
        "price": 7380
      },
      {
        "min_qty": 20,
        "price": 6970
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1003",
    "sku_code": "JNS-HL-1003",
    "barcode": "885110001003",
    "part_name": "Standard Hand Pallet Truck 2.5 Tons - Fork W685xL1150 mm (Single Nylon Roller)",
    "part_name_lo": "ລົດລາກພາເລດ 2.5 ໂຕນ - ງາ W685xL1150 ມມ (ລໍ້ໄນລ່ອນດ່ຽວ)",
    "category": "Handling & Lifting",
    "description": "Pallet truck 2500 kg capacity with single nylon roller for easy turning and smooth entry into open-bottom pallets.",
    "description_lo": "ລົດລາກພາເລດ 2.5 ໂຕນ ລໍ້ໄນລ່ອນດ່ຽວ ລ້ຽວງ່າຍ ເຂົ້າພາເລດໄດ້ສະດວກ ຄຸນນະພາບສູງ.",
    "image_url": "/images/jenstore-products/full_standard_hand_pallet_truck_2_5_tons___fork_w685xl1_2.jpg",
    "qty_on_hand": 30,
    "unit_price": 7500,
    "currency": "THB",
    "specs": {
      "Capacity": "2500 kg",
      "Fork Width": "685 mm",
      "Fork Length": "1150 mm",
      "Rollers": "Single Nylon"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7125
      },
      {
        "min_qty": 10,
        "price": 6750
      },
      {
        "min_qty": 20,
        "price": 6375
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1004",
    "sku_code": "JNS-HL-1004",
    "barcode": "885110001004",
    "part_name": "Standard Hand Pallet Truck 2.5 Tons - Fork W685xL1150 mm (Single PU Roller)",
    "part_name_lo": "ລົດລາກພາເລດ 2.5 ໂຕນ - ງາ W685xL1150 ມມ (ລໍ້ PU ດ່ຽວ)",
    "category": "Handling & Lifting",
    "description": "Pallet truck 2.5 tons with single polyurethane roller for smooth maneuvering and floor protection.",
    "description_lo": "ລົດລາກພາເລດ 2.5 ໂຕນ ລໍ້ PU ດ່ຽວ ປ້ອງກັນພື້ນເປັນຮອຍ ເໝາະສຳລັບໂຮງງານຜະລິດ.",
    "image_url": "/images/jenstore-products/full_standard_hand_pallet_truck_2_5_tons___fork_w685xl1_3.jpg",
    "qty_on_hand": 28,
    "unit_price": 7900,
    "currency": "THB",
    "specs": {
      "Capacity": "2500 kg",
      "Fork Width": "685 mm",
      "Fork Length": "1150 mm",
      "Rollers": "Single PU"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7505
      },
      {
        "min_qty": 10,
        "price": 7110
      },
      {
        "min_qty": 20,
        "price": 6715
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1005",
    "sku_code": "JNS-HL-1005",
    "barcode": "885110001005",
    "part_name": "Narrow Fork Hand Pallet Truck 2.5 Tons - Fork W550xL1150 mm (Double Nylon)",
    "part_name_lo": "ລົດລາກພາເລດງາແຄບ 2.5 ໂຕນ - ງາ W550xL1150 ມມ (ລໍ້ໄນລ່ອນຄູ່)",
    "category": "Handling & Lifting",
    "description": "Narrow fork 550mm hand pallet truck designed for European pallets and compact warehouse aisles.",
    "description_lo": "ລົດລາກພາເລດງາແຄບ 550 ມມ ສຳລັບພາເລດເອີຣົບ (Euro Pallet) ແລະ ຊ່ອງທາງແຄບ.",
    "image_url": "/images/jenstore-products/full_standard_hand_pallet_truck_2_5_tons___fork_w550xl1_4.jpg",
    "qty_on_hand": 35,
    "unit_price": 7800,
    "currency": "THB",
    "specs": {
      "Capacity": "2500 kg",
      "Fork Width": "550 mm",
      "Fork Length": "1150 mm",
      "Rollers": "Double Nylon"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7410
      },
      {
        "min_qty": 10,
        "price": 7020
      },
      {
        "min_qty": 20,
        "price": 6630
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1006",
    "sku_code": "JNS-HL-1006",
    "barcode": "885110001006",
    "part_name": "Narrow Fork Hand Pallet Truck 2.5 Tons - Fork W550xL1150 mm (Double PU)",
    "part_name_lo": "ລົດລາກພາເລດງາແຄບ 2.5 ໂຕນ - ງາ W550xL1150 ມມ (ລໍ້ PU ຄູ່)",
    "category": "Handling & Lifting",
    "description": "Narrow 550mm hand pallet truck with double PU rollers for cleanroom, pharmaceutical, and food warehouse applications.",
    "description_lo": "ລົດລາກພາເລດງາແຄບ 550 ມມ ລໍ້ PU ຄູ່ ເໝາະສຳລັບອຸດສາຫະກຳອາຫານ, ຢາ, ແລະ ຫ້ອງສະອາດ.",
    "image_url": "/images/jenstore-products/full_standard_hand_pallet_truck_2_5_tons___fork_w550xl1_5.jpg",
    "qty_on_hand": 30,
    "unit_price": 8200,
    "currency": "THB",
    "specs": {
      "Capacity": "2500 kg",
      "Fork Width": "550 mm",
      "Fork Length": "1150 mm",
      "Rollers": "Double PU"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7790
      },
      {
        "min_qty": 10,
        "price": 7380
      },
      {
        "min_qty": 20,
        "price": 6970
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1007",
    "sku_code": "JNS-HL-1007",
    "barcode": "885110001007",
    "part_name": "Narrow Fork Hand Pallet Truck 2.5 Tons - Fork W550xL1150 mm (Single Nylon)",
    "part_name_lo": "ລົດລາກພາເລດງາແຄບ 2.5 ໂຕນ - ງາ W550xL1150 ມມ (ລໍ້ໄນລ່ອນດ່ຽວ)",
    "category": "Handling & Lifting",
    "description": "Narrow fork pallet truck with single nylon load roller for high maneuverability in narrow spaces.",
    "description_lo": "ລົດລາກພາເລດງາແຄບ 550 ມມ ລໍ້ໄນລ່ອນດ່ຽວ ເຄື່ອນຍ້າຍຄ່ອງແຄ້ວໃນພື້ນທີ່ຈຳກັດ.",
    "image_url": "/images/jenstore-products/full_standard_hand_pallet_truck_2_5_tons___fork_w550xl1_6.jpg",
    "qty_on_hand": 25,
    "unit_price": 7500,
    "currency": "THB",
    "specs": {
      "Capacity": "2500 kg",
      "Fork Width": "550 mm",
      "Fork Length": "1150 mm",
      "Rollers": "Single Nylon"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7125
      },
      {
        "min_qty": 10,
        "price": 6750
      },
      {
        "min_qty": 20,
        "price": 6375
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1008",
    "sku_code": "JNS-HL-1008",
    "barcode": "885110001008",
    "part_name": "Narrow Fork Hand Pallet Truck 2.5 Tons - Fork W550xL1150 mm (Single PU)",
    "part_name_lo": "ລົດລາກພາເລດງາແຄບ 2.5 ໂຕນ - ງາ W550xL1150 ມມ (ລໍ້ PU ດ່ຽວ)",
    "category": "Handling & Lifting",
    "description": "Narrow fork pallet truck 2500 kg with single polyurethane roller for gentle floor contact.",
    "description_lo": "ລົດລາກພາເລດງາແຄບ 550 ມມ ລໍ້ PU ດ່ຽວ ຫຼຸດສຽງດັງ ບໍ່ທຳລາຍພື້ນຜິວອາຄານ.",
    "image_url": "/images/jenstore-products/full_standard_hand_pallet_truck_2_5_tons___fork_w550xl1_7.jpg",
    "qty_on_hand": 25,
    "unit_price": 7900,
    "currency": "THB",
    "specs": {
      "Capacity": "2500 kg",
      "Fork Width": "550 mm",
      "Fork Length": "1150 mm",
      "Rollers": "Single PU"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7505
      },
      {
        "min_qty": 10,
        "price": 7110
      },
      {
        "min_qty": 20,
        "price": 6715
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1009",
    "sku_code": "JNS-HL-1009",
    "barcode": "885110001009",
    "part_name": "Special Extra Narrow Fork Pallet Truck 2.5 Tons - Fork W520xL1150 mm (Nylon)",
    "part_name_lo": "ລົດລາກພາເລດງາແຄບພິເສດ 2.5 ໂຕນ - ງາ W520xL1150 ມມ (ລໍ້ໄນລ່ອນ)",
    "category": "Handling & Lifting",
    "description": "Extra narrow 520mm hand pallet truck specifically built for mini pallets, display stands, and tight machinery aisles.",
    "description_lo": "ລົດລາກພາເລດງາແຄບພິເສດ 520 ມມ ສຳລັບພາເລດຂະໜາດນ້ອຍ ແລະ ຍົກຍ້າຍໃນຊ່ອງແຄບລະຫວ່າງເຄື່ອງຈັກ.",
    "image_url": "/images/jenstore-products/full_standard_hand_pallet_truck_2_5_tons___fork_w520xl1_8.jpg",
    "qty_on_hand": 20,
    "unit_price": 8500,
    "currency": "THB",
    "specs": {
      "Capacity": "2500 kg",
      "Fork Width": "520 mm",
      "Fork Length": "1150 mm",
      "Rollers": "Double Nylon"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 8075
      },
      {
        "min_qty": 10,
        "price": 7650
      },
      {
        "min_qty": 20,
        "price": 7225
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1010",
    "sku_code": "JNS-HL-1010",
    "barcode": "885110001010",
    "part_name": "Special Extra Narrow Fork Pallet Truck 2.5 Tons - Fork W520xL1150 mm (PU)",
    "part_name_lo": "ລົດລາກພາເລດງາແຄບພິເສດ 2.5 ໂຕນ - ງາ W520xL1150 ມມ (ລໍ້ PU)",
    "category": "Handling & Lifting",
    "description": "Extra narrow 520mm hand pallet truck with polyurethane double wheels for sensitive floors and tight spaces.",
    "description_lo": "ລົດລາກພາເລດງາແຄບພິເສດ 520 ມມ ລໍ້ PU ຄູ່ ສຳລັບຍົກພາເລດນ້ອຍ ເລື່ອນງຽບ.",
    "image_url": "/images/jenstore-products/full_standard_hand_pallet_truck_2_5_tons___fork_w520xl1_9.jpg",
    "qty_on_hand": 20,
    "unit_price": 8900,
    "currency": "THB",
    "specs": {
      "Capacity": "2500 kg",
      "Fork Width": "520 mm",
      "Fork Length": "1150 mm",
      "Rollers": "Double PU"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 8455
      },
      {
        "min_qty": 10,
        "price": 8010
      },
      {
        "min_qty": 20,
        "price": 7565
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1011",
    "sku_code": "JNS-HL-1011",
    "barcode": "885110001011",
    "part_name": "Standard Hand Pallet Truck 2.5 Tons Reinforced Frame (W685 Double Nylon)",
    "part_name_lo": "ລົດລາກພາເລດເຫຼັກໜາພິເສດ 2.5 ໂຕນ - ງາ W685 (ລໍ້ໄນລ່ອນຄູ່) CNS-256DN",
    "category": "Handling & Lifting",
    "description": "Heavy duty industrial pallet truck model CNS-256DN featuring reinforced robotic welding frame, chrome-plated piston rod, and Double Nylon wheels.",
    "description_lo": "ລົດລາກພາເລດລຸ້ນໜາພິເສດ CNS-256DN ໂຄງສ້າງເຊື່ອມດ້ວຍຫຸ່ນຍົນ ຮັບນ້ຳໜັກເຕັມ 2.5 ໂຕນ ແກນກະບອກສູບຊຸບໂຄຣມຽມ ລໍ້ Double Nylon.",
    "image_url": "/images/jenstore-products/jenstore_standard_hand_pallet_truck_2_5_tons___fork_w685xl1_0.jpg",
    "qty_on_hand": 30,
    "unit_price": 7950,
    "currency": "THB",
    "specs": {
      "Model": "CNS-256DN",
      "Capacity": "2500 kg",
      "Fork Dimensions": "685 x 1150 mm",
      "Rollers": "Double Nylon"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7552
      },
      {
        "min_qty": 10,
        "price": 7155
      },
      {
        "min_qty": 20,
        "price": 6758
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1012",
    "sku_code": "JNS-HL-1012",
    "barcode": "885110001012",
    "part_name": "Standard Hand Pallet Truck 2.5 Tons Reinforced Frame (W685 Double PU)",
    "part_name_lo": "ລົດລາກພາເລດເຫຼັກໜາພິເສດ 2.5 ໂຕນ - ງາ W685 (ລໍ້ PU ຄູ່) CNS-256DP",
    "category": "Handling & Lifting",
    "description": "Heavy duty industrial pallet truck model CNS-256DP featuring reinforced robotic welding frame, chrome-plated piston rod, and Double PU wheels.",
    "description_lo": "ລົດລາກພາເລດລຸ້ນໜາພິເສດ CNS-256DP ໂຄງສ້າງເຊື່ອມດ້ວຍຫຸ່ນຍົນ ຮັບນ້ຳໜັກເຕັມ 2.5 ໂຕນ ແກນກະບອກສູບຊຸບໂຄຣມຽມ ລໍ້ Double PU.",
    "image_url": "/images/jenstore-products/jenstore_standard_hand_pallet_truck_2_5_tons___fork_w685xl1_1.jpg",
    "qty_on_hand": 30,
    "unit_price": 8350,
    "currency": "THB",
    "specs": {
      "Model": "CNS-256DP",
      "Capacity": "2500 kg",
      "Fork Dimensions": "685 x 1150 mm",
      "Rollers": "Double PU"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7932
      },
      {
        "min_qty": 10,
        "price": 7515
      },
      {
        "min_qty": 20,
        "price": 7098
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1013",
    "sku_code": "JNS-HL-1013",
    "barcode": "885110001013",
    "part_name": "Standard Hand Pallet Truck 2.5 Tons Reinforced Frame (W685 Single Nylon)",
    "part_name_lo": "ລົດລາກພາເລດເຫຼັກໜາ 2.5 ໂຕນ - ງາ W685 (ລໍ້ໄນລ່ອນດ່ຽວ) CNS-256SN",
    "category": "Handling & Lifting",
    "description": "Heavy duty industrial pallet truck model CNS-256SN featuring reinforced robotic welding frame, chrome-plated piston rod, and Single Nylon wheels.",
    "description_lo": "ລົດລາກພາເລດລຸ້ນໜາພິເສດ CNS-256SN ໂຄງສ້າງເຊື່ອມດ້ວຍຫຸ່ນຍົນ ຮັບນ້ຳໜັກເຕັມ 2.5 ໂຕນ ແກນກະບອກສູບຊຸບໂຄຣມຽມ ລໍ້ Single Nylon.",
    "image_url": "/images/jenstore-products/jenstore_standard_hand_pallet_truck_2_5_tons___fork_w685xl1_2.jpg",
    "qty_on_hand": 30,
    "unit_price": 7650,
    "currency": "THB",
    "specs": {
      "Model": "CNS-256SN",
      "Capacity": "2500 kg",
      "Fork Dimensions": "685 x 1150 mm",
      "Rollers": "Single Nylon"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7268
      },
      {
        "min_qty": 10,
        "price": 6885
      },
      {
        "min_qty": 20,
        "price": 6502
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1014",
    "sku_code": "JNS-HL-1014",
    "barcode": "885110001014",
    "part_name": "Standard Hand Pallet Truck 2.5 Tons Reinforced Frame (W685 Single PU)",
    "part_name_lo": "ລົດລາກພາເລດເຫຼັກໜາ 2.5 ໂຕນ - ງາ W685 (ລໍ້ PU ດ່ຽວ) CNS-256SP",
    "category": "Handling & Lifting",
    "description": "Heavy duty industrial pallet truck model CNS-256SP featuring reinforced robotic welding frame, chrome-plated piston rod, and Single PU wheels.",
    "description_lo": "ລົດລາກພາເລດລຸ້ນໜາພິເສດ CNS-256SP ໂຄງສ້າງເຊື່ອມດ້ວຍຫຸ່ນຍົນ ຮັບນ້ຳໜັກເຕັມ 2.5 ໂຕນ ແກນກະບອກສູບຊຸບໂຄຣມຽມ ລໍ້ Single PU.",
    "image_url": "/images/jenstore-products/jenstore_standard_hand_pallet_truck_2_5_tons___fork_w685xl1_3.jpg",
    "qty_on_hand": 30,
    "unit_price": 8050,
    "currency": "THB",
    "specs": {
      "Model": "CNS-256SP",
      "Capacity": "2500 kg",
      "Fork Dimensions": "685 x 1150 mm",
      "Rollers": "Single PU"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7648
      },
      {
        "min_qty": 10,
        "price": 7245
      },
      {
        "min_qty": 20,
        "price": 6842
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1015",
    "sku_code": "JNS-HL-1015",
    "barcode": "885110001015",
    "part_name": "Narrow Hand Pallet Truck 2.5 Tons Reinforced Frame (W550 Double Nylon)",
    "part_name_lo": "ລົດລາກພາເລດງາແຄບເຫຼັກໜາ 2.5 ໂຕນ - ງາ W550 (ລໍ້ໄນລ່ອນຄູ່) CNS-255DN",
    "category": "Handling & Lifting",
    "description": "Heavy duty industrial pallet truck model CNS-255DN featuring reinforced robotic welding frame, chrome-plated piston rod, and Double Nylon wheels.",
    "description_lo": "ລົດລາກພາເລດລຸ້ນໜາພິເສດ CNS-255DN ໂຄງສ້າງເຊື່ອມດ້ວຍຫຸ່ນຍົນ ຮັບນ້ຳໜັກເຕັມ 2.5 ໂຕນ ແກນກະບອກສູບຊຸບໂຄຣມຽມ ລໍ້ Double Nylon.",
    "image_url": "/images/jenstore-products/jenstore_standard_hand_pallet_truck_2_5_tons___fork_w550xl1_4.jpg",
    "qty_on_hand": 30,
    "unit_price": 7950,
    "currency": "THB",
    "specs": {
      "Model": "CNS-255DN",
      "Capacity": "2500 kg",
      "Fork Dimensions": "550 x 1150 mm",
      "Rollers": "Double Nylon"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7552
      },
      {
        "min_qty": 10,
        "price": 7155
      },
      {
        "min_qty": 20,
        "price": 6758
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1016",
    "sku_code": "JNS-HL-1016",
    "barcode": "885110001016",
    "part_name": "Narrow Hand Pallet Truck 2.5 Tons Reinforced Frame (W550 Double PU)",
    "part_name_lo": "ລົດລາກພາເລດງາແຄບເຫຼັກໜາ 2.5 ໂຕນ - ງາ W550 (ລໍ້ PU ຄູ່) CNS-255DP",
    "category": "Handling & Lifting",
    "description": "Heavy duty industrial pallet truck model CNS-255DP featuring reinforced robotic welding frame, chrome-plated piston rod, and Double PU wheels.",
    "description_lo": "ລົດລາກພາເລດລຸ້ນໜາພິເສດ CNS-255DP ໂຄງສ້າງເຊື່ອມດ້ວຍຫຸ່ນຍົນ ຮັບນ້ຳໜັກເຕັມ 2.5 ໂຕນ ແກນກະບອກສູບຊຸບໂຄຣມຽມ ລໍ້ Double PU.",
    "image_url": "/images/jenstore-products/jenstore_standard_hand_pallet_truck_2_5_tons___fork_w550xl1_5.jpg",
    "qty_on_hand": 30,
    "unit_price": 8350,
    "currency": "THB",
    "specs": {
      "Model": "CNS-255DP",
      "Capacity": "2500 kg",
      "Fork Dimensions": "550 x 1150 mm",
      "Rollers": "Double PU"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7932
      },
      {
        "min_qty": 10,
        "price": 7515
      },
      {
        "min_qty": 20,
        "price": 7098
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1017",
    "sku_code": "JNS-HL-1017",
    "barcode": "885110001017",
    "part_name": "Narrow Hand Pallet Truck 2.5 Tons Reinforced Frame (W550 Single Nylon)",
    "part_name_lo": "ລົດລາກພາເລດງາແຄບ 2.5 ໂຕນ - ງາ W550 (ລໍ້ໄນລ່ອນດ່ຽວ) CNS-255SN",
    "category": "Handling & Lifting",
    "description": "Heavy duty industrial pallet truck model CNS-255SN featuring reinforced robotic welding frame, chrome-plated piston rod, and Single Nylon wheels.",
    "description_lo": "ລົດລາກພາເລດລຸ້ນໜາພິເສດ CNS-255SN ໂຄງສ້າງເຊື່ອມດ້ວຍຫຸ່ນຍົນ ຮັບນ້ຳໜັກເຕັມ 2.5 ໂຕນ ແກນກະບອກສູບຊຸບໂຄຣມຽມ ລໍ້ Single Nylon.",
    "image_url": "/images/jenstore-products/jenstore_standard_hand_pallet_truck_2_5_tons___fork_w550xl1_6.jpg",
    "qty_on_hand": 30,
    "unit_price": 7650,
    "currency": "THB",
    "specs": {
      "Model": "CNS-255SN",
      "Capacity": "2500 kg",
      "Fork Dimensions": "550 x 1150 mm",
      "Rollers": "Single Nylon"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7268
      },
      {
        "min_qty": 10,
        "price": 6885
      },
      {
        "min_qty": 20,
        "price": 6502
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1018",
    "sku_code": "JNS-HL-1018",
    "barcode": "885110001018",
    "part_name": "Narrow Hand Pallet Truck 2.5 Tons Reinforced Frame (W550 Single PU)",
    "part_name_lo": "ລົດລາກພາເລດງາແຄບ 2.5 ໂຕນ - ງາ W550 (ລໍ້ PU ດ່ຽວ) CNS-255SP",
    "category": "Handling & Lifting",
    "description": "Heavy duty industrial pallet truck model CNS-255SP featuring reinforced robotic welding frame, chrome-plated piston rod, and Single PU wheels.",
    "description_lo": "ລົດລາກພາເລດລຸ້ນໜາພິເສດ CNS-255SP ໂຄງສ້າງເຊື່ອມດ້ວຍຫຸ່ນຍົນ ຮັບນ້ຳໜັກເຕັມ 2.5 ໂຕນ ແກນກະບອກສູບຊຸບໂຄຣມຽມ ລໍ້ Single PU.",
    "image_url": "/images/jenstore-products/jenstore_standard_hand_pallet_truck_2_5_tons___fork_w550xl1_7.jpg",
    "qty_on_hand": 30,
    "unit_price": 8050,
    "currency": "THB",
    "specs": {
      "Model": "CNS-255SP",
      "Capacity": "2500 kg",
      "Fork Dimensions": "550 x 1150 mm",
      "Rollers": "Single PU"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7648
      },
      {
        "min_qty": 10,
        "price": 7245
      },
      {
        "min_qty": 20,
        "price": 6842
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1019",
    "sku_code": "JNS-HL-1019",
    "barcode": "885110001019",
    "part_name": "Extra Narrow Hand Pallet Truck 2.5 Tons (W520 Double Nylon)",
    "part_name_lo": "ລົດລາກພາເລດງາແຄບພິເສດ 2.5 ໂຕນ - ງາ W520 (ລໍ້ໄນລ່ອນຄູ່) CNS-2552DN",
    "category": "Handling & Lifting",
    "description": "Heavy duty industrial pallet truck model CNS-2552DN featuring reinforced robotic welding frame, chrome-plated piston rod, and Double Nylon wheels.",
    "description_lo": "ລົດລາກພາເລດລຸ້ນໜາພິເສດ CNS-2552DN ໂຄງສ້າງເຊື່ອມດ້ວຍຫຸ່ນຍົນ ຮັບນ້ຳໜັກເຕັມ 2.5 ໂຕນ ແກນກະບອກສູບຊຸບໂຄຣມຽມ ລໍ້ Double Nylon.",
    "image_url": "/images/jenstore-products/jenstore_standard_hand_pallet_truck_2_5_tons___fork_w520xl1_8.jpg",
    "qty_on_hand": 30,
    "unit_price": 8650,
    "currency": "THB",
    "specs": {
      "Model": "CNS-2552DN",
      "Capacity": "2500 kg",
      "Fork Dimensions": "520 x 1150 mm",
      "Rollers": "Double Nylon"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 8218
      },
      {
        "min_qty": 10,
        "price": 7785
      },
      {
        "min_qty": 20,
        "price": 7352
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1020",
    "sku_code": "JNS-HL-1020",
    "barcode": "885110001020",
    "part_name": "Extra Narrow Hand Pallet Truck 2.5 Tons (W520 Double PU)",
    "part_name_lo": "ລົດລາກພາເລດງາແຄບພິເສດ 2.5 ໂຕນ - ງາ W520 (ລໍ້ PU ຄູ່) CNS-2552DP",
    "category": "Handling & Lifting",
    "description": "Heavy duty industrial pallet truck model CNS-2552DP featuring reinforced robotic welding frame, chrome-plated piston rod, and Double PU wheels.",
    "description_lo": "ລົດລາກພາເລດລຸ້ນໜາພິເສດ CNS-2552DP ໂຄງສ້າງເຊື່ອມດ້ວຍຫຸ່ນຍົນ ຮັບນ້ຳໜັກເຕັມ 2.5 ໂຕນ ແກນກະບອກສູບຊຸບໂຄຣມຽມ ລໍ້ Double PU.",
    "image_url": "/images/jenstore-products/jenstore_standard_hand_pallet_truck_2_5_tons___fork_w520xl1_9.jpg",
    "qty_on_hand": 30,
    "unit_price": 9050,
    "currency": "THB",
    "specs": {
      "Model": "CNS-2552DP",
      "Capacity": "2500 kg",
      "Fork Dimensions": "520 x 1150 mm",
      "Rollers": "Double PU"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 8598
      },
      {
        "min_qty": 10,
        "price": 8145
      },
      {
        "min_qty": 20,
        "price": 7692
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1021",
    "sku_code": "JNS-HL-1021",
    "barcode": "885110001021",
    "part_name": "JUMBO by XILIN Heavy Duty Hand Pallet Truck 3.0 Tons - Yellow Frame (Nylon Rollers)",
    "part_name_lo": "ລົດລາກພາເລດຮັບນ້ຳໜັກສູງ JUMBO by XILIN 3.0 ໂຕນ - ສີເຫຼືອງ (ລໍ້ໄນລ່ອນ)",
    "category": "Handling & Lifting",
    "description": "Heavy duty 3000 kg capacity pallet truck manufactured by XILIN. Reinforced A-frame with solid cast leak-proof hydraulic pump.",
    "description_lo": "ລົດລາກພາເລດຮັບນ້ຳໜັກພິເສດ 3.0 ໂຕນ JUMBO by XILIN ໂຄງສ້າງເຫຼັກໜາພິເສດ ປ້ຳໄຮໂດຣລິກຂະໜາດໃຫຍ່ ບໍ່ຮົ່ວຊຶມ.",
    "image_url": "/images/jenstore-placeholders/product_MTM4NTM0_688c339f28015.webp",
    "qty_on_hand": 25,
    "unit_price": 9800,
    "currency": "THB",
    "specs": {
      "Capacity": "3000 kg",
      "Fork Dimensions": "685 x 1150 mm",
      "Pump": "Heavy Duty Cast",
      "Wheels": "Nylon"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 9310
      },
      {
        "min_qty": 10,
        "price": 8820
      },
      {
        "min_qty": 20,
        "price": 8330
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1022",
    "sku_code": "JNS-HL-1022",
    "barcode": "885110001022",
    "part_name": "JUMBO by XILIN Extra Heavy Duty Hand Pallet Truck 3.5 Tons - Yellow Frame (PU Rollers)",
    "part_name_lo": "ລົດລາກພາເລດຮັບນ້ຳໜັກສູງພິເສດ JUMBO by XILIN 3.5 ໂຕນ - ສີເຫຼືອງ (ລໍ້ PU)",
    "category": "Handling & Lifting",
    "description": "Super heavy duty 3500kg hand pallet truck for heavy metal stamping dies, machinery molds, and dense industrial materials.",
    "description_lo": "ລົດລາກພາເລດຮັບນ້ຳໜັກສູງສຸດ 3.5 ໂຕນ JUMBO by XILIN ສຳລັບຍົກຍ້າຍແມ່ພິມເຫຼັກໜັກ ແລະ ເຄື່ອງຈັກອຸດສາຫະກຳ.",
    "image_url": "/images/jenstore-placeholders/product_MTM4NTMw_688c32c8105b9.webp",
    "qty_on_hand": 20,
    "unit_price": 11500,
    "currency": "THB",
    "specs": {
      "Capacity": "3500 kg",
      "Fork Dimensions": "685 x 1150 mm",
      "Wheels": "Polyurethane"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 10925
      },
      {
        "min_qty": 10,
        "price": 10350
      },
      {
        "min_qty": 20,
        "price": 9775
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1023",
    "sku_code": "JNS-HL-1023",
    "barcode": "885110001023",
    "part_name": "JUMBO by XILIN Premium Hand Pallet Truck 2.5 Tons with Overload Valve - Yellow Frame",
    "part_name_lo": "ລົດລາກພາເລດພຣີມຽມ JUMBO by XILIN 2.5 ໂຕນ ພ້ອມວາວປ້ອງກັນນ້ຳໜັກເກີນ",
    "category": "Handling & Lifting",
    "description": "Premium 2.5-ton pallet truck featuring automatic hydraulic bypass safety valve to prevent overloading and cylinder damage.",
    "description_lo": "ລົດລາກພາເລດ 2.5 ໂຕນ ພ້ອມວາວຕັດນ້ຳໜັກອັດຕະໂນມັດ ເພື່ອຄວາມປອດໄພ ແລະ ຍືດອາຍຸການໃຊ້ງານ.",
    "image_url": "/images/jenstore-placeholders/product_MTM4NTMz_688c33604dabf.webp",
    "qty_on_hand": 25,
    "unit_price": 8800,
    "currency": "THB",
    "specs": {
      "Capacity": "2500 kg",
      "Fork Dimensions": "685 x 1150 mm",
      "Safety Valve": "Overload Bypass Valve"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 8360
      },
      {
        "min_qty": 10,
        "price": 7920
      },
      {
        "min_qty": 20,
        "price": 7480
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1024",
    "sku_code": "JNS-HL-1024",
    "barcode": "885110001024",
    "part_name": "Full Electric Pallet Truck 3.0 Tons (EPS Power Steering) - CBD30RII",
    "part_name_lo": "ລົດລາກພາເລດໄຟຟ້າເຕັມລະບົບ 3.0 ໂຕນ (ພວງມາໄລໄຟຟ້າ EPS) - CBD30RII",
    "category": "Handling & Lifting",
    "description": "Electric powered pallet truck for high efficiency logistics, loading docks, and factory floor distribution.",
    "description_lo": "ລົດລາກພາເລດໄຟຟ້າເຕັມລະບົບ ຊ່ວຍເພີ່ມປະສິດທິພາບການເຮັດວຽກ ຫຼຸດຜ່ອນແຮງງານຄົນ ຂັບຂີ່ງ່າຍ ປອດໄພ.",
    "image_url": "/images/jenstore-products/full_electric_pallet_truck_3_tons__eps____double_roller_0.jpg",
    "qty_on_hand": 12,
    "unit_price": 125000,
    "currency": "THB",
    "specs": {
      "Capacity": "3000 kg",
      "Steering": "EPS Power Steering",
      "Drive": "AC Motor 2.5 kW"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 118750
      },
      {
        "min_qty": 10,
        "price": 112500
      },
      {
        "min_qty": 20,
        "price": 106250
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1025",
    "sku_code": "JNS-HL-1025",
    "barcode": "885110001025",
    "part_name": "Lithium-Ion Powered Electric Pallet Truck 1.5 Tons - Yale MPC15-Li",
    "part_name_lo": "ລົດລາກພາເລດໄຟຟ້າແບັດເຕີຣີລິທຽມ 1.5 ໂຕນ - Yale MPC15-Li",
    "category": "Handling & Lifting",
    "description": "Electric powered pallet truck for high efficiency logistics, loading docks, and factory floor distribution.",
    "description_lo": "ລົດລາກພາເລດໄຟຟ້າເຕັມລະບົບ ຊ່ວຍເພີ່ມປະສິດທິພາບການເຮັດວຽກ ຫຼຸດຜ່ອນແຮງງານຄົນ ຂັບຂີ່ງ່າຍ ປອດໄພ.",
    "image_url": "/images/jenstore-products/full_lithium_ion_powered_pallet_truck_1_5_tons_fork_115_1.jpg",
    "qty_on_hand": 12,
    "unit_price": 35000,
    "currency": "THB",
    "specs": {
      "Capacity": "1500 kg",
      "Battery": "24V / 20Ah Lithium",
      "Brand": "Yale"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 33250
      },
      {
        "min_qty": 10,
        "price": 31500
      },
      {
        "min_qty": 20,
        "price": 29750
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1026",
    "sku_code": "JNS-HL-1026",
    "barcode": "885110001026",
    "part_name": "Full Electric Pallet Truck 1.5 Tons Fork 550x1150 mm - CBD15W-LiX",
    "part_name_lo": "ລົດລາກພາເລດໄຟຟ້າ 1.5 ໂຕນ ງາ 550x1150 ມມ - CBD15W-LiX",
    "category": "Handling & Lifting",
    "description": "Electric powered pallet truck for high efficiency logistics, loading docks, and factory floor distribution.",
    "description_lo": "ລົດລາກພາເລດໄຟຟ້າເຕັມລະບົບ ຊ່ວຍເພີ່ມປະສິດທິພາບການເຮັດວຽກ ຫຼຸດຜ່ອນແຮງງານຄົນ ຂັບຂີ່ງ່າຍ ປອດໄພ.",
    "image_url": "/images/jenstore-products/full_electric_pallet_truck_1_5_tons_fork_550x1150_mm__d_2.jpg",
    "qty_on_hand": 12,
    "unit_price": 29500,
    "currency": "THB",
    "specs": {
      "Capacity": "1500 kg",
      "Fork Dimensions": "550 x 1150 mm",
      "Battery": "24V Lithium"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 28025
      },
      {
        "min_qty": 10,
        "price": 26550
      },
      {
        "min_qty": 20,
        "price": 25075
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1027",
    "sku_code": "JNS-HL-1027",
    "barcode": "885110001027",
    "part_name": "Full Electric Pallet Truck 1.5 Tons Fork 685x1150 mm - CBD15W-LiX Wide",
    "part_name_lo": "ລົດລາກພາເລດໄຟຟ້າ 1.5 ໂຕນ ງາກວ້າງ 685x1150 ມມ - CBD15W-LiX",
    "category": "Handling & Lifting",
    "description": "Electric powered pallet truck for high efficiency logistics, loading docks, and factory floor distribution.",
    "description_lo": "ລົດລາກພາເລດໄຟຟ້າເຕັມລະບົບ ຊ່ວຍເພີ່ມປະສິດທິພາບການເຮັດວຽກ ຫຼຸດຜ່ອນແຮງງານຄົນ ຂັບຂີ່ງ່າຍ ປອດໄພ.",
    "image_url": "/images/jenstore-products/full_electric_pallet_truck_1_5_tons_fork_685x1150_mm__d_3.jpg",
    "qty_on_hand": 12,
    "unit_price": 30500,
    "currency": "THB",
    "specs": {
      "Capacity": "1500 kg",
      "Fork Dimensions": "685 x 1150 mm",
      "Battery": "24V Lithium"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 28975
      },
      {
        "min_qty": 10,
        "price": 27450
      },
      {
        "min_qty": 20,
        "price": 25925
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1028",
    "sku_code": "JNS-HL-1028",
    "barcode": "885110001028",
    "part_name": "Full Electric Pallet Truck 1.5 Tons - Ruyi Ergonomic Handle (CBD15W-0255)",
    "part_name_lo": "ລົດລາກພາເລດໄຟຟ້າ 1.5 ໂຕນ ດ້າວຈັບ Ruyi (CBD15W-0255)",
    "category": "Handling & Lifting",
    "description": "Electric powered pallet truck for high efficiency logistics, loading docks, and factory floor distribution.",
    "description_lo": "ລົດລາກພາເລດໄຟຟ້າເຕັມລະບົບ ຊ່ວຍເພີ່ມປະສິດທິພາບການເຮັດວຽກ ຫຼຸດຜ່ອນແຮງງານຄົນ ຂັບຂີ່ງ່າຍ ປອດໄພ.",
    "image_url": "/images/jenstore-products/full_electric_pallet_truck_1_5_tons___ruyi_handle___cbd_4.jpg",
    "qty_on_hand": 12,
    "unit_price": 28500,
    "currency": "THB",
    "specs": {
      "Capacity": "1500 kg",
      "Handle": "Ruyi Multi-Function",
      "Fork Size": "550 x 1150 mm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 27075
      },
      {
        "min_qty": 10,
        "price": 25650
      },
      {
        "min_qty": 20,
        "price": 24225
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1029",
    "sku_code": "JNS-HL-1029",
    "barcode": "885110001029",
    "part_name": "Full Electric Pallet Truck 1.5 Tons Wide Fork - Ruyi Handle (CBD15W-0268)",
    "part_name_lo": "ລົດລາກພາເລດໄຟຟ້າ 1.5 ໂຕນ ງາກວ້າງ ດ້າວຈັບ Ruyi (CBD15W-0268)",
    "category": "Handling & Lifting",
    "description": "Electric powered pallet truck for high efficiency logistics, loading docks, and factory floor distribution.",
    "description_lo": "ລົດລາກພາເລດໄຟຟ້າເຕັມລະບົບ ຊ່ວຍເພີ່ມປະສິດທິພາບການເຮັດວຽກ ຫຼຸດຜ່ອນແຮງງານຄົນ ຂັບຂີ່ງ່າຍ ປອດໄພ.",
    "image_url": "/images/jenstore-products/full_electric_pallet_truck_1_5_tons___ruyi_handle___cbd_5.jpg",
    "qty_on_hand": 12,
    "unit_price": 29000,
    "currency": "THB",
    "specs": {
      "Capacity": "1500 kg",
      "Handle": "Ruyi Multi-Function",
      "Fork Size": "685 x 1150 mm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 27550
      },
      {
        "min_qty": 10,
        "price": 26100
      },
      {
        "min_qty": 20,
        "price": 24650
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1030",
    "sku_code": "JNS-HL-1030",
    "barcode": "885110001030",
    "part_name": "Full Electric Pallet Truck 1.8 Tons - Ruyi Handle (CBD18W-0255)",
    "part_name_lo": "ລົດລາກພາເລດໄຟຟ້າ 1.8 ໂຕນ ດ້າວຈັບ Ruyi (CBD18W-0255)",
    "category": "Handling & Lifting",
    "description": "Electric powered pallet truck for high efficiency logistics, loading docks, and factory floor distribution.",
    "description_lo": "ລົດລາກພາເລດໄຟຟ້າເຕັມລະບົບ ຊ່ວຍເພີ່ມປະສິດທິພາບການເຮັດວຽກ ຫຼຸດຜ່ອນແຮງງານຄົນ ຂັບຂີ່ງ່າຍ ປອດໄພ.",
    "image_url": "/images/jenstore-products/full_electric_pallet_truck_1_8_tons___ruyi_handle___cbd_6.jpg",
    "qty_on_hand": 12,
    "unit_price": 33000,
    "currency": "THB",
    "specs": {
      "Capacity": "1800 kg",
      "Fork Size": "550 x 1150 mm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 31350
      },
      {
        "min_qty": 10,
        "price": 29700
      },
      {
        "min_qty": 20,
        "price": 28050
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1031",
    "sku_code": "JNS-HL-1031",
    "barcode": "885110001031",
    "part_name": "Full Electric Pallet Truck 1.8 Tons Wide Fork - Ruyi Handle (CBD18W-0268)",
    "part_name_lo": "ລົດລາກພາເລດໄຟຟ້າ 1.8 ໂຕນ ງາກວ້າງ ດ້າວຈັບ Ruyi (CBD18W-0268)",
    "category": "Handling & Lifting",
    "description": "Electric powered pallet truck for high efficiency logistics, loading docks, and factory floor distribution.",
    "description_lo": "ລົດລາກພາເລດໄຟຟ້າເຕັມລະບົບ ຊ່ວຍເພີ່ມປະສິດທິພາບການເຮັດວຽກ ຫຼຸດຜ່ອນແຮງງານຄົນ ຂັບຂີ່ງ່າຍ ປອດໄພ.",
    "image_url": "/images/jenstore-products/full_electric_pallet_truck_1_8_tons___ruyi_handle___cbd_7.jpg",
    "qty_on_hand": 12,
    "unit_price": 33500,
    "currency": "THB",
    "specs": {
      "Capacity": "1800 kg",
      "Fork Size": "685 x 1150 mm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 31825
      },
      {
        "min_qty": 10,
        "price": 30150
      },
      {
        "min_qty": 20,
        "price": 28475
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1032",
    "sku_code": "JNS-HL-1032",
    "barcode": "885110001032",
    "part_name": "Full Electric Pallet Truck 2.0 Tons - Ruyi Handle (CBD20W-0255)",
    "part_name_lo": "ລົດລາກພາເລດໄຟຟ້າ 2.0 ໂຕນ ດ້າວຈັບ Ruyi (CBD20W-0255)",
    "category": "Handling & Lifting",
    "description": "Electric powered pallet truck for high efficiency logistics, loading docks, and factory floor distribution.",
    "description_lo": "ລົດລາກພາເລດໄຟຟ້າເຕັມລະບົບ ຊ່ວຍເພີ່ມປະສິດທິພາບການເຮັດວຽກ ຫຼຸດຜ່ອນແຮງງານຄົນ ຂັບຂີ່ງ່າຍ ປອດໄພ.",
    "image_url": "/images/jenstore-products/full_electric_pallet_truck_2_tons___ruyi_handle___cbd20_8.jpg",
    "qty_on_hand": 12,
    "unit_price": 36000,
    "currency": "THB",
    "specs": {
      "Capacity": "2000 kg",
      "Fork Size": "550 x 1150 mm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 34200
      },
      {
        "min_qty": 10,
        "price": 32400
      },
      {
        "min_qty": 20,
        "price": 30600
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1033",
    "sku_code": "JNS-HL-1033",
    "barcode": "885110001033",
    "part_name": "Full Electric Pallet Truck 2.0 Tons Wide Fork - Ruyi Handle (CBD20W-0268)",
    "part_name_lo": "ລົດລາກພາເລດໄຟຟ້າ 2.0 ໂຕນ ງາກວ້າງ ດ້າວຈັບ Ruyi (CBD20W-0268)",
    "category": "Handling & Lifting",
    "description": "Electric powered pallet truck for high efficiency logistics, loading docks, and factory floor distribution.",
    "description_lo": "ລົດລາກພາເລດໄຟຟ້າເຕັມລະບົບ ຊ່ວຍເພີ່ມປະສິດທິພາບການເຮັດວຽກ ຫຼຸດຜ່ອນແຮງງານຄົນ ຂັບຂີ່ງ່າຍ ປອດໄພ.",
    "image_url": "/images/jenstore-products/full_electric_pallet_truck_2_tons___ruyi_handle___cbd20_9.jpg",
    "qty_on_hand": 12,
    "unit_price": 36500,
    "currency": "THB",
    "specs": {
      "Capacity": "2000 kg",
      "Fork Size": "685 x 1150 mm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 34675
      },
      {
        "min_qty": 10,
        "price": 32850
      },
      {
        "min_qty": 20,
        "price": 31025
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1034",
    "sku_code": "JNS-HL-1034",
    "barcode": "885110001034",
    "part_name": "Electric Walkie Stacker 1.0 Ton Lift 1.6m - CDD10R-E-1669",
    "part_name_lo": "ລົດຍົກສູງໄຟຟ້າ Walkie Stacker 1.0 ໂຕນ ຍົກສູງ 1.6 ແມັດ",
    "category": "Handling & Lifting",
    "description": "Electric walkie stacker for vertical pallet racking, vehicle cargo loading, and tight warehouse stacking.",
    "description_lo": "ລົດຍົກສູງໄຟຟ້າສຳລັບຍົກສິນຄ້າຂຶ້ນຊັ້ນວາງສາງສິນຄ້າ ແລະ ຂົນຖ່າຍຂຶ້ນລົດ ຂັບຂີ່ງ່າຍ ປອດໄພດ້ວຍລະບົບເບກອັດຕະໂນມັດ.",
    "image_url": "/images/jenstore-products/full_electric_walkie_stacker_1_ton_ruyi_handle___cdd10r_0.jpg",
    "qty_on_hand": 8,
    "unit_price": 68000,
    "currency": "THB",
    "specs": {
      "Capacity": "1000 kg",
      "Lift Height": "1600 mm",
      "Mast": "Single Mast"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 64600
      },
      {
        "min_qty": 10,
        "price": 61200
      },
      {
        "min_qty": 20,
        "price": 57800
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1035",
    "sku_code": "JNS-HL-1035",
    "barcode": "885110001035",
    "part_name": "Electric Walkie Stacker 1.0 Ton Lift 2.5m - CDD10R-E-2569 (2-Stage Mast)",
    "part_name_lo": "ລົດຍົກສູງໄຟຟ້າ Walkie Stacker 1.0 ໂຕນ ຍົກສູງ 2.5 ແມັດ (ເສົາ 2 ທ່ອນ)",
    "category": "Handling & Lifting",
    "description": "Electric walkie stacker for vertical pallet racking, vehicle cargo loading, and tight warehouse stacking.",
    "description_lo": "ລົດຍົກສູງໄຟຟ້າສຳລັບຍົກສິນຄ້າຂຶ້ນຊັ້ນວາງສາງສິນຄ້າ ແລະ ຂົນຖ່າຍຂຶ້ນລົດ ຂັບຂີ່ງ່າຍ ປອດໄພດ້ວຍລະບົບເບກອັດຕະໂນມັດ.",
    "image_url": "/images/jenstore-products/full_electric_walkie_stacker_1_ton_ruyi_handle___cdd10r_1.jpg",
    "qty_on_hand": 8,
    "unit_price": 74000,
    "currency": "THB",
    "specs": {
      "Capacity": "1000 kg",
      "Lift Height": "2500 mm",
      "Mast": "2-Stage Duplex"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 70300
      },
      {
        "min_qty": 10,
        "price": 66600
      },
      {
        "min_qty": 20,
        "price": 62900
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1036",
    "sku_code": "JNS-HL-1036",
    "barcode": "885110001036",
    "part_name": "Electric Walkie Stacker 1.0 Ton Lift 3.0m - CDD10R-E-3069 (High Lift)",
    "part_name_lo": "ລົດຍົກສູງໄຟຟ້າ Walkie Stacker 1.0 ໂຕນ ຍົກສູງ 3.0 ແມັດ (ເສົາສູງ)",
    "category": "Handling & Lifting",
    "description": "Electric walkie stacker for vertical pallet racking, vehicle cargo loading, and tight warehouse stacking.",
    "description_lo": "ລົດຍົກສູງໄຟຟ້າສຳລັບຍົກສິນຄ້າຂຶ້ນຊັ້ນວາງສາງສິນຄ້າ ແລະ ຂົນຖ່າຍຂຶ້ນລົດ ຂັບຂີ່ງ່າຍ ປອດໄພດ້ວຍລະບົບເບກອັດຕະໂນມັດ.",
    "image_url": "/images/jenstore-products/full_electric_walkie_stacker_1_ton_ruyi_handle___cdd10r_2.jpg",
    "qty_on_hand": 8,
    "unit_price": 79000,
    "currency": "THB",
    "specs": {
      "Capacity": "1000 kg",
      "Lift Height": "3000 mm",
      "Mast": "2-Stage Duplex"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 75050
      },
      {
        "min_qty": 10,
        "price": 71100
      },
      {
        "min_qty": 20,
        "price": 67150
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1037",
    "sku_code": "JNS-HL-1037",
    "barcode": "885110001037",
    "part_name": "Electric Walkie Stacker 1.2 Tons Lift 1.6m - CDD12R-E-1669",
    "part_name_lo": "ລົດຍົກສູງໄຟຟ້າ Walkie Stacker 1.2 ໂຕນ ຍົກສູງ 1.6 ແມັດ",
    "category": "Handling & Lifting",
    "description": "Electric walkie stacker for vertical pallet racking, vehicle cargo loading, and tight warehouse stacking.",
    "description_lo": "ລົດຍົກສູງໄຟຟ້າສຳລັບຍົກສິນຄ້າຂຶ້ນຊັ້ນວາງສາງສິນຄ້າ ແລະ ຂົນຖ່າຍຂຶ້ນລົດ ຂັບຂີ່ງ່າຍ ປອດໄພດ້ວຍລະບົບເບກອັດຕະໂນມັດ.",
    "image_url": "/images/jenstore-products/full_electric_walkie_stacker_1_2_tons_ruyi_handle___cdd_3.jpg",
    "qty_on_hand": 8,
    "unit_price": 72000,
    "currency": "THB",
    "specs": {
      "Capacity": "1200 kg",
      "Lift Height": "1600 mm",
      "Mast": "Single Mast"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 68400
      },
      {
        "min_qty": 10,
        "price": 64800
      },
      {
        "min_qty": 20,
        "price": 61200
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1038",
    "sku_code": "JNS-HL-1038",
    "barcode": "885110001038",
    "part_name": "Electric Walkie Stacker 1.2 Tons Lift 2.5m - CDD12R-E-2569",
    "part_name_lo": "ລົດຍົກສູງໄຟຟ້າ Walkie Stacker 1.2 ໂຕນ ຍົກສູງ 2.5 ແມັດ",
    "category": "Handling & Lifting",
    "description": "Electric walkie stacker for vertical pallet racking, vehicle cargo loading, and tight warehouse stacking.",
    "description_lo": "ລົດຍົກສູງໄຟຟ້າສຳລັບຍົກສິນຄ້າຂຶ້ນຊັ້ນວາງສາງສິນຄ້າ ແລະ ຂົນຖ່າຍຂຶ້ນລົດ ຂັບຂີ່ງ່າຍ ປອດໄພດ້ວຍລະບົບເບກອັດຕະໂນມັດ.",
    "image_url": "/images/jenstore-products/full_electric_walkie_stacker_1_2_tons_ruyi_handle___cdd_4.jpg",
    "qty_on_hand": 8,
    "unit_price": 78000,
    "currency": "THB",
    "specs": {
      "Capacity": "1200 kg",
      "Lift Height": "2500 mm",
      "Mast": "2-Stage Duplex"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 74100
      },
      {
        "min_qty": 10,
        "price": 70200
      },
      {
        "min_qty": 20,
        "price": 66300
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1039",
    "sku_code": "JNS-HL-1039",
    "barcode": "885110001039",
    "part_name": "Electric Walkie Stacker 1.2 Tons Lift 3.0m - CDD12R-E-3069",
    "part_name_lo": "ລົດຍົກສູງໄຟຟ້າ Walkie Stacker 1.2 ໂຕນ ຍົກສູງ 3.0 ແມັດ",
    "category": "Handling & Lifting",
    "description": "Electric walkie stacker for vertical pallet racking, vehicle cargo loading, and tight warehouse stacking.",
    "description_lo": "ລົດຍົກສູງໄຟຟ້າສຳລັບຍົກສິນຄ້າຂຶ້ນຊັ້ນວາງສາງສິນຄ້າ ແລະ ຂົນຖ່າຍຂຶ້ນລົດ ຂັບຂີ່ງ່າຍ ປອດໄພດ້ວຍລະບົບເບກອັດຕະໂນມັດ.",
    "image_url": "/images/jenstore-products/full_electric_walkie_stacker_1_2_tons_ruyi_handle___cdd_5.jpg",
    "qty_on_hand": 8,
    "unit_price": 83000,
    "currency": "THB",
    "specs": {
      "Capacity": "1200 kg",
      "Lift Height": "3000 mm",
      "Mast": "2-Stage Duplex"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 78850
      },
      {
        "min_qty": 10,
        "price": 74700
      },
      {
        "min_qty": 20,
        "price": 70550
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1040",
    "sku_code": "JNS-HL-1040",
    "barcode": "885110001040",
    "part_name": "Electric Walkie Stacker 1.5 Tons Lift 1.6m - CDD15R-E-1669",
    "part_name_lo": "ລົດຍົກສູງໄຟຟ້າ Walkie Stacker 1.5 ໂຕນ ຍົກສູງ 1.6 ແມັດ",
    "category": "Handling & Lifting",
    "description": "Electric walkie stacker for vertical pallet racking, vehicle cargo loading, and tight warehouse stacking.",
    "description_lo": "ລົດຍົກສູງໄຟຟ້າສຳລັບຍົກສິນຄ້າຂຶ້ນຊັ້ນວາງສາງສິນຄ້າ ແລະ ຂົນຖ່າຍຂຶ້ນລົດ ຂັບຂີ່ງ່າຍ ປອດໄພດ້ວຍລະບົບເບກອັດຕະໂນມັດ.",
    "image_url": "/images/jenstore-products/full_electric_walkie_stacker_1_5_tons_ruyi_handle___cdd_6.jpg",
    "qty_on_hand": 8,
    "unit_price": 78000,
    "currency": "THB",
    "specs": {
      "Capacity": "1500 kg",
      "Lift Height": "1600 mm",
      "Mast": "Single Mast"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 74100
      },
      {
        "min_qty": 10,
        "price": 70200
      },
      {
        "min_qty": 20,
        "price": 66300
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1041",
    "sku_code": "JNS-HL-1041",
    "barcode": "885110001041",
    "part_name": "Electric Walkie Stacker 1.5 Tons Lift 2.5m - CDD15R-E-2569",
    "part_name_lo": "ລົດຍົກສູງໄຟຟ້າ Walkie Stacker 1.5 ໂຕນ ຍົກສູງ 2.5 ແມັດ",
    "category": "Handling & Lifting",
    "description": "Electric walkie stacker for vertical pallet racking, vehicle cargo loading, and tight warehouse stacking.",
    "description_lo": "ລົດຍົກສູງໄຟຟ້າສຳລັບຍົກສິນຄ້າຂຶ້ນຊັ້ນວາງສາງສິນຄ້າ ແລະ ຂົນຖ່າຍຂຶ້ນລົດ ຂັບຂີ່ງ່າຍ ປອດໄພດ້ວຍລະບົບເບກອັດຕະໂນມັດ.",
    "image_url": "/images/jenstore-products/full_electric_walkie_stacker_1_5_tons_ruyi_handle___cdd_7.jpg",
    "qty_on_hand": 8,
    "unit_price": 85000,
    "currency": "THB",
    "specs": {
      "Capacity": "1500 kg",
      "Lift Height": "2500 mm",
      "Mast": "2-Stage Duplex"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 80750
      },
      {
        "min_qty": 10,
        "price": 76500
      },
      {
        "min_qty": 20,
        "price": 72250
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1042",
    "sku_code": "JNS-HL-1042",
    "barcode": "885110001042",
    "part_name": "Electric Walkie Stacker 1.5 Tons Lift 3.0m - CDD15R-E-3069",
    "part_name_lo": "ລົດຍົກສູງໄຟຟ້າ Walkie Stacker 1.5 ໂຕນ ຍົກສູງ 3.0 ແມັດ",
    "category": "Handling & Lifting",
    "description": "Electric walkie stacker for vertical pallet racking, vehicle cargo loading, and tight warehouse stacking.",
    "description_lo": "ລົດຍົກສູງໄຟຟ້າສຳລັບຍົກສິນຄ້າຂຶ້ນຊັ້ນວາງສາງສິນຄ້າ ແລະ ຂົນຖ່າຍຂຶ້ນລົດ ຂັບຂີ່ງ່າຍ ປອດໄພດ້ວຍລະບົບເບກອັດຕະໂນມັດ.",
    "image_url": "/images/jenstore-products/full_electric_walkie_stacker_1_5_tons_ruyi_handle___cdd_8.jpg",
    "qty_on_hand": 8,
    "unit_price": 92000,
    "currency": "THB",
    "specs": {
      "Capacity": "1500 kg",
      "Lift Height": "3000 mm",
      "Mast": "2-Stage Duplex"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 87400
      },
      {
        "min_qty": 10,
        "price": 82800
      },
      {
        "min_qty": 20,
        "price": 78200
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1043",
    "sku_code": "JNS-HL-1043",
    "barcode": "885110001043",
    "part_name": "Electric Walkie Straddle Stacker 1.2 Tons - CTD12R-E-16SL (Adjustable Legs)",
    "part_name_lo": "ລົດຍົກສູງໄຟຟ້າຂາກວ້າງ Straddle Stacker 1.2 ໂຕນ (ຂາປັບໄດ້)",
    "category": "Handling & Lifting",
    "description": "Electric walkie stacker for vertical pallet racking, vehicle cargo loading, and tight warehouse stacking.",
    "description_lo": "ລົດຍົກສູງໄຟຟ້າສຳລັບຍົກສິນຄ້າຂຶ້ນຊັ້ນວາງສາງສິນຄ້າ ແລະ ຂົນຖ່າຍຂຶ້ນລົດ ຂັບຂີ່ງ່າຍ ປອດໄພດ້ວຍລະບົບເບກອັດຕະໂນມັດ.",
    "image_url": "/images/jenstore-products/full_electric_walkie_straddle_stacker_1_2_tons_ruyi_han_9.jpg",
    "qty_on_hand": 8,
    "unit_price": 89000,
    "currency": "THB",
    "specs": {
      "Capacity": "1200 kg",
      "Lift Height": "1600 mm",
      "Straddle Legs": "Adjustable 1000-1400 mm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 84550
      },
      {
        "min_qty": 10,
        "price": 80100
      },
      {
        "min_qty": 20,
        "price": 75650
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1044",
    "sku_code": "JNS-HL-1044",
    "barcode": "885110001044",
    "part_name": "JUMBO Stand-On Electric Tow Tractor 1.5 Tons (Lithium-Ion) - EV 1500",
    "part_name_lo": "ລົດລາກຈູງໄຟຟ້າ JUMBO EV 1500 ຂະໜາດ 1.5 ໂຕນ (ແບັດເຕີຣີລິທຽມ ແບບຢືນຂັບ)",
    "category": "Handling & Lifting",
    "description": "Stand-on electric tow tractor with warning beacon, LED headlights, and quick-hitch towing pin for pulling warehouse trolley trains up to 1500kg.",
    "description_lo": "ລົດລາກຈູງໄຟຟ້າ JUMBO EV 1500 ແບບຢືນຂັບ ພ້ອມໄຟສັນຍານໝູນ, ໄຟໜ້າ LED ແລະ ລະບົບຫົວລາກດ່ວນ ລາກລົດເຂັນໄດ້ເຖິງ 1.5 ໂຕນ.",
    "image_url": "/images/jenstore-placeholders/product_MTQ5MjA0_68e775e2eea0d.webp",
    "qty_on_hand": 4,
    "unit_price": 165000,
    "currency": "THB",
    "specs": {
      "Towing Capacity": "1500 kg",
      "Battery": "24V / 60Ah Lithium-Ion",
      "Max Speed": "7.0 km/h"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 156750
      },
      {
        "min_qty": 10,
        "price": 148500
      },
      {
        "min_qty": 20,
        "price": 140250
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1045",
    "sku_code": "JNS-HL-1045",
    "barcode": "885110001045",
    "part_name": "JUMBO Walk-Behind Electric Tow Tug 1000 kg with Tiller Arm Control",
    "part_name_lo": "ລົດລາກຈູງໄຟຟ້າແບບຍ່າງຕາມ JUMBO 1000 ກິໂລ ພ້ອມດ້າວບັງຄັບ Tiller Arm",
    "category": "Handling & Lifting",
    "description": "Compact walk-behind electric tow tug with ergonomic tiller arm, stepless speed regulation, and universal hitch hook for towing roll cages.",
    "description_lo": "ລົດລາກໄຟຟ້າແບບຍ່າງຕາມ JUMBO 1000 ກິໂລ ດ້າວບັງຄັບ ergonomic ປັບຄວາມໄວໄດ້ລະອຽດ ສຳລັບລາກລົດເຂັນກະບະກົງໃນສາງ.",
    "image_url": "/images/jenstore-placeholders/product_MTQ5MjA2_68e773fc33ea8.webp",
    "qty_on_hand": 6,
    "unit_price": 88000,
    "currency": "THB",
    "specs": {
      "Towing Capacity": "1000 kg",
      "Motor": "DC 24V / 600W",
      "Tiller": "Ergonomic Dual Paddle"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 83600
      },
      {
        "min_qty": 10,
        "price": 79200
      },
      {
        "min_qty": 20,
        "price": 74800
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1046",
    "sku_code": "JNS-HL-1046",
    "barcode": "885110001046",
    "part_name": "JUMBO Heavy Duty Electric Tow Tug 2500 kg for Industrial Production Carts",
    "part_name_lo": "ລົດລາກຈູງໄຟຟ້າໜັກ JUMBO 2500 ກິໂລ ສຳລັບລາກລົດເຂັນເຄື່ອງຈັກ ແລະ ແມ່ພິມ",
    "category": "Handling & Lifting",
    "description": "Heavy industrial electric tow tug with 2500 kg pulling capacity, high torque motor, and heavy solid rubber traction wheels.",
    "description_lo": "ລົດລາກຈູງໄຟຟ້າອຸດສາຫະກຳໜັກ 2500 ກິໂລ ມໍເຕີແຮງບິດສູງ ລໍ້ຢາງຕັນເກາະພື້ນແໜ້ນ ສຳລັບໂຮງງານປະກອບ.",
    "image_url": "/images/jenstore-placeholders/product_MTQ5MjA4_68e774b86a050.webp",
    "qty_on_hand": 3,
    "unit_price": 145000,
    "currency": "THB",
    "specs": {
      "Towing Capacity": "2500 kg",
      "Battery": "24V / 100Ah",
      "Traction Wheels": "Solid Heavy Rubber"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 137750
      },
      {
        "min_qty": 10,
        "price": 130500
      },
      {
        "min_qty": 20,
        "price": 123250
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1047",
    "sku_code": "JNS-HL-1047",
    "barcode": "885110001047",
    "part_name": "JUMBO Heavy Duty Steel Platform Truck 370 kg Single Fixed Handle - NB-101",
    "part_name_lo": "ລົດເຂັນພື້ນເຫຼັກ JUMBO 370 ກິໂລ ມືຈັບດ່ຽວຍຶດແໜ້ນ - NB-101",
    "category": "Handling & Lifting",
    "description": "Industrial heavy duty steel platform trolley with 370kg load capacity, single fixed tubular steel handle, non-slip mat, and rubber bumper.",
    "description_lo": "ລົດເຂັນພື້ນເຫຼັກອຸດສາຫະກຳ JUMBO ຮັບນ້ຳໜັກ 370 ກິໂລ ມືຈັບດ່ຽວຍຶດແໜ້ນ ແຜ່ນຢາງກັນລື່ນ ແລະ ຢາງກັນກະແທກຮອບຄັນ.",
    "image_url": "/images/jenstore-placeholders/product_MjA3OQ_6605375c21921.webp",
    "qty_on_hand": 50,
    "unit_price": 3650,
    "currency": "THB",
    "specs": {
      "Capacity": "370 kg",
      "Platform Size": "920 x 610 mm",
      "Wheels": "130 mm Elastic Rubber"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3468
      },
      {
        "min_qty": 10,
        "price": 3285
      },
      {
        "min_qty": 20,
        "price": 3102
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1048",
    "sku_code": "JNS-HL-1048",
    "barcode": "885110001048",
    "part_name": "JUMBO Heavy Duty Steel Platform Truck 370 kg Double Fixed Handles - NB-102",
    "part_name_lo": "ລົດເຂັນພື້ນເຫຼັກ JUMBO 370 ກິໂລ ມືຈັບຄູ່ຫົວທ້າຍ - NB-102",
    "category": "Handling & Lifting",
    "description": "Dual handle steel platform truck allowing pushing or pulling from either direction without rotating the cart.",
    "description_lo": "ລົດເຂັນພື້ນເຫຼັກ JUMBO 370 ກິໂລ ມືຈັບ 2 ດ້ານ ສະດວກຕໍ່ການຍູ້ ຫຼື ດຶງ ໂດຍບໍ່ຕ້ອງກັບຄັນລົດ.",
    "image_url": "/images/jenstore-placeholders/product_MjA4MA_660537a610d2f.webp",
    "qty_on_hand": 40,
    "unit_price": 4100,
    "currency": "THB",
    "specs": {
      "Capacity": "370 kg",
      "Platform Size": "920 x 610 mm",
      "Handles": "Double Fixed"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3895
      },
      {
        "min_qty": 10,
        "price": 3690
      },
      {
        "min_qty": 20,
        "price": 3485
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1049",
    "sku_code": "JNS-HL-1049",
    "barcode": "885110001049",
    "part_name": "JUMBO Heavy Duty Steel Platform Truck 500 kg with Folding Handle - HB-210",
    "part_name_lo": "ລົດເຂັນພື້ນເຫຼັກ JUMBO 500 ກິໂລ ມືຈັບພັບເກັບໄດ້ - HB-210",
    "category": "Handling & Lifting",
    "description": "Heavy duty steel platform truck with 500kg capacity and fold-down handle for space-saving storage in delivery trucks.",
    "description_lo": "ລົດເຂັນພື້ນເຫຼັກ JUMBO 500 ກິໂລ ມືຈັບພັບເກັບໄດ້ ສະດວກຕໍ່ການຂົນຂຶ້ນລົດບັນທຸກ.",
    "image_url": "/images/jenstore-placeholders/product_MjA4MQ_66d9638e35531.webp",
    "qty_on_hand": 35,
    "unit_price": 4850,
    "currency": "THB",
    "specs": {
      "Capacity": "500 kg",
      "Platform Size": "1170 x 765 mm",
      "Foldable": "Yes"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 4608
      },
      {
        "min_qty": 10,
        "price": 4365
      },
      {
        "min_qty": 20,
        "price": 4122
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1050",
    "sku_code": "JNS-HL-1050",
    "barcode": "885110001050",
    "part_name": "JUMBO Heavy Duty Mesh Cage Steel Platform Truck 500 kg - HB-213",
    "part_name_lo": "ລົດເຂັນພື້ນເຫຼັກພ້ອມກົງຕາໜ່າງ JUMBO 500 ກິໂລ - HB-213",
    "category": "Handling & Lifting",
    "description": "Heavy duty steel platform truck equipped with 4-side removable wire mesh cage to prevent items from falling during transit.",
    "description_lo": "ລົດເຂັນພື້ນເຫຼັກພ້ອມກົງຕາໜ່າງລ້ອມຮອບ 4 ດ້ານ ປ້ອງກັນສິນຄ້າຕົກຫຼົ່ນ ປະຕູຕາໜ່າງເປີດໄດ້ເຄິ່ງໜຶ່ງ.",
    "image_url": "/images/catalog/real/mesh_cage_trolley.jpg",
    "qty_on_hand": 25,
    "unit_price": 6800,
    "currency": "THB",
    "specs": {
      "Capacity": "500 kg",
      "Platform Size": "1170 x 765 mm",
      "Cage Height": "500 mm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 6460
      },
      {
        "min_qty": 10,
        "price": 6120
      },
      {
        "min_qty": 20,
        "price": 5780
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1051",
    "sku_code": "JNS-HL-1051",
    "barcode": "885110001051",
    "part_name": "JUMBO Interlocking Heavy Duty Plastic Dolly Skate 150 kg (Blue)",
    "part_name_lo": "ລົດເຂັນພື້ນພລາສຕິກຕໍ່າ JUMBO Dolly 150 ກິໂລ ແບບຕໍ່ຂະຫຍາຍໄດ້ (ສີຟ້າ)",
    "category": "Handling & Lifting",
    "description": "Interlocking modular plastic dolly skate with 4 swivel casters. Multiple units can connect horizontally or vertically for large crates.",
    "description_lo": "ລົດເຂັນພື້ນພລາສຕິກຕໍ່າ JUMBO 150 ກິໂລ ສາມາດນຳມາຕໍ່ເຊື່ອມກັນໄດ້ທັງລວງຍາວ ແລະ ລວງກວ້າງ ສຳລັບຂົນຍ້າຍລັງສິນຄ້າຂະໜາດໃຫຍ່.",
    "image_url": "/images/jenstore-placeholders/product_MTM2OTU5_697ae82d2a23e.webp",
    "qty_on_hand": 80,
    "unit_price": 1250,
    "currency": "THB",
    "specs": {
      "Capacity": "150 kg",
      "Platform Size": "600 x 400 mm",
      "Casters": "75 mm Swivel"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1188
      },
      {
        "min_qty": 10,
        "price": 1125
      },
      {
        "min_qty": 20,
        "price": 1062
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1052",
    "sku_code": "JNS-HL-1052",
    "barcode": "885110001052",
    "part_name": "Warehouse Order Picking Trolley with Spring-Loaded Safety Ladder Steps",
    "part_name_lo": "ລົດເຂັນຈັດເກັບສິນຄ້າໃນສາງ ພ້ອມຂັ້ນໄດປອດໄພສະປິງ",
    "category": "Handling & Lifting",
    "description": "Multi-tier warehouse order picking trolley with integrated 3-step safety ladder that locks to the floor under user weight.",
    "description_lo": "ລົດເຂັນຈັດເກັບສິນຄ້າ ພ້ອມຂັ້ນໄດ 3 ຂັ້ນ ແບບມີສະປິງລັອກພື້ນອັດຕະໂນມັດເມື່ອຢຽບຂຶ້ນ ປອດໄພສູງສຸດ.",
    "image_url": "/images/jenstore-placeholders/order-picking-trolley-a060600022_2_etvdfnzztwfdjlst.jpg",
    "qty_on_hand": 20,
    "unit_price": 8900,
    "currency": "THB",
    "specs": {
      "Capacity": "300 kg",
      "Ladder Steps": "3 Steps Non-Slip",
      "Shelves": "2 Wire Trays"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 8455
      },
      {
        "min_qty": 10,
        "price": 8010
      },
      {
        "min_qty": 20,
        "price": 7565
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-hl-1053",
    "sku_code": "JNS-HL-1053",
    "barcode": "885110001053",
    "part_name": "Multi-Tier Plastic Tray Service Trolley 150 kg with Aluminum Uprights",
    "part_name_lo": "ລົດເຂັນ 3 ຊັ້ນ ຖາດພລາສຕິກ 150 ກິໂລ ເສົາອາລູມີນຽມ",
    "category": "Handling & Lifting",
    "description": "Ergonomic 3-tier plastic tray utility cart for workshop tools, cleanrooms, and restaurant catering service.",
    "description_lo": "ລົດເຂັນ 3 ຊັ້ນ ຖາດພລາສຕິກ PP ທົນສານເຄມີ ເສົາອາລູມີນຽມ ນ້ຳໜັກເບົາ ລໍ້ເລື່ອນງຽບ.",
    "image_url": "/images/jenstore-placeholders/plastic-tray-trolley-a061350004.jpg",
    "qty_on_hand": 40,
    "unit_price": 2450,
    "currency": "THB",
    "specs": {
      "Capacity": "150 kg",
      "Shelves": "3 Trays",
      "Dimensions": "850 x 480 x 950 mm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2328
      },
      {
        "min_qty": 10,
        "price": 2205
      },
      {
        "min_qty": 20,
        "price": 2082
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1001",
    "sku_code": "JNS-WH-1001",
    "barcode": "885110001054",
    "part_name": "Hi-Tech Heavy Duty Swivel Caster Wheel 100mm (Polyurethane on Cast Iron Core)",
    "part_name_lo": "ລໍ້ອຸດສາຫະກຳໝູນໄດ້ Hi-Tech 100 ມມ (ລໍ້ PU ແກນເຫຼັກຫຼໍ່)",
    "category": "Wheels",
    "description": "Industrial grade Swivel caster wheel model B060101001 with high grade polyurethane tread bonded to cast iron core. Double ball raceway for smooth rotation.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຄຸນນະພາບສູງລຸ້ນ B060101001 ລໍ້ PU ແກນເຫຼັກຫຼໍ່ ຮັບນ້ຳໜັກ 300 kg ລູກປືນຄູ່ໝູນໄດ້ 360 ອົງສາ ທົນທານຕໍ່ນ້ຳມັນ ແລະ ສານເຄມີ.",
    "image_url": "/images/jenstore-placeholders/hi-tech-heavy-duty-castor-wheel-b060101001_1_igndmq1nvidioitz.jpg",
    "qty_on_hand": 80,
    "unit_price": 650,
    "currency": "THB",
    "specs": {
      "Model": "B060101001",
      "Wheel Diameter": "100 mm (4\")",
      "Type": "Swivel",
      "Load Capacity": "300 kg",
      "Bearing": "Precision Double Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 618
      },
      {
        "min_qty": 10,
        "price": 585
      },
      {
        "min_qty": 20,
        "price": 552
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1002",
    "sku_code": "JNS-WH-1002",
    "barcode": "885110001055",
    "part_name": "Hi-Tech Heavy Duty Swivel Caster Wheel 125mm (Polyurethane on Cast Iron Core)",
    "part_name_lo": "ລໍ້ອຸດສາຫະກຳໝູນໄດ້ Hi-Tech 125 ມມ (ລໍ້ PU ແກນເຫຼັກຫຼໍ່)",
    "category": "Wheels",
    "description": "Industrial grade Swivel caster wheel model B060101002 with high grade polyurethane tread bonded to cast iron core. Double ball raceway for smooth rotation.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຄຸນນະພາບສູງລຸ້ນ B060101002 ລໍ້ PU ແກນເຫຼັກຫຼໍ່ ຮັບນ້ຳໜັກ 400 kg ລູກປືນຄູ່ໝູນໄດ້ 360 ອົງສາ ທົນທານຕໍ່ນ້ຳມັນ ແລະ ສານເຄມີ.",
    "image_url": "/images/jenstore-placeholders/hi-tech-heavy-duty-castor-wheel-b060101002_1_6a8tmjgyfnvteb93.jpg",
    "qty_on_hand": 80,
    "unit_price": 780,
    "currency": "THB",
    "specs": {
      "Model": "B060101002",
      "Wheel Diameter": "125 mm (5\")",
      "Type": "Swivel",
      "Load Capacity": "400 kg",
      "Bearing": "Precision Double Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 741
      },
      {
        "min_qty": 10,
        "price": 702
      },
      {
        "min_qty": 20,
        "price": 663
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1003",
    "sku_code": "JNS-WH-1003",
    "barcode": "885110001056",
    "part_name": "Hi-Tech Heavy Duty Swivel Caster Wheel 150mm (Polyurethane on Cast Iron Core)",
    "part_name_lo": "ລໍ້ອຸດສາຫະກຳໝູນໄດ້ Hi-Tech 150 ມມ (ລໍ້ PU ແກນເຫຼັກຫຼໍ່)",
    "category": "Wheels",
    "description": "Industrial grade Swivel caster wheel model B060101003 with high grade polyurethane tread bonded to cast iron core. Double ball raceway for smooth rotation.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຄຸນນະພາບສູງລຸ້ນ B060101003 ລໍ້ PU ແກນເຫຼັກຫຼໍ່ ຮັບນ້ຳໜັກ 500 kg ລູກປືນຄູ່ໝູນໄດ້ 360 ອົງສາ ທົນທານຕໍ່ນ້ຳມັນ ແລະ ສານເຄມີ.",
    "image_url": "/images/jenstore-placeholders/hi-tech-heavy-duty-castor-wheel-b060101003_1_r4tx0p1wduwnuwlu.jpg",
    "qty_on_hand": 80,
    "unit_price": 920,
    "currency": "THB",
    "specs": {
      "Model": "B060101003",
      "Wheel Diameter": "150 mm (6\")",
      "Type": "Swivel",
      "Load Capacity": "500 kg",
      "Bearing": "Precision Double Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 874
      },
      {
        "min_qty": 10,
        "price": 828
      },
      {
        "min_qty": 20,
        "price": 782
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1004",
    "sku_code": "JNS-WH-1004",
    "barcode": "885110001057",
    "part_name": "Hi-Tech Heavy Duty Rigid Fixed Caster Wheel 100mm (Polyurethane)",
    "part_name_lo": "ລໍ້ອຸດສາຫະກຳຕາຍ Hi-Tech 100 ມມ (ລໍ້ PU ບໍ່ໝູນ)",
    "category": "Wheels",
    "description": "Industrial grade Rigid Fixed caster wheel model B060104001 with high grade polyurethane tread bonded to cast iron core. Double ball raceway for smooth rotation.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຄຸນນະພາບສູງລຸ້ນ B060104001 ລໍ້ PU ແກນເຫຼັກຫຼໍ່ ຮັບນ້ຳໜັກ 300 kg ລູກປືນຄູ່ໝູນໄດ້ 360 ອົງສາ ທົນທານຕໍ່ນ້ຳມັນ ແລະ ສານເຄມີ.",
    "image_url": "/images/jenstore-placeholders/hi-tech-heavy-duty-castor-wheel-b060104001_ts0h4xzamipfxk1o.jpg",
    "qty_on_hand": 80,
    "unit_price": 580,
    "currency": "THB",
    "specs": {
      "Model": "B060104001",
      "Wheel Diameter": "100 mm (4\")",
      "Type": "Rigid Fixed",
      "Load Capacity": "300 kg",
      "Bearing": "Precision Double Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 551
      },
      {
        "min_qty": 10,
        "price": 522
      },
      {
        "min_qty": 20,
        "price": 493
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1005",
    "sku_code": "JNS-WH-1005",
    "barcode": "885110001058",
    "part_name": "Hi-Tech Heavy Duty Rigid Fixed Caster Wheel 125mm (Polyurethane)",
    "part_name_lo": "ລໍ້ອຸດສາຫະກຳຕາຍ Hi-Tech 125 ມມ (ລໍ້ PU ບໍ່ໝູນ)",
    "category": "Wheels",
    "description": "Industrial grade Rigid Fixed caster wheel model B060104002 with high grade polyurethane tread bonded to cast iron core. Double ball raceway for smooth rotation.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຄຸນນະພາບສູງລຸ້ນ B060104002 ລໍ້ PU ແກນເຫຼັກຫຼໍ່ ຮັບນ້ຳໜັກ 400 kg ລູກປືນຄູ່ໝູນໄດ້ 360 ອົງສາ ທົນທານຕໍ່ນ້ຳມັນ ແລະ ສານເຄມີ.",
    "image_url": "/images/jenstore-placeholders/hi-tech-heavy-duty-castor-wheel-b060104002_chf5fmuf3hksrqpi.jpg",
    "qty_on_hand": 80,
    "unit_price": 690,
    "currency": "THB",
    "specs": {
      "Model": "B060104002",
      "Wheel Diameter": "125 mm (5\")",
      "Type": "Rigid Fixed",
      "Load Capacity": "400 kg",
      "Bearing": "Precision Double Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 656
      },
      {
        "min_qty": 10,
        "price": 621
      },
      {
        "min_qty": 20,
        "price": 586
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1006",
    "sku_code": "JNS-WH-1006",
    "barcode": "885110001059",
    "part_name": "Hi-Tech Heavy Duty Rigid Fixed Caster Wheel 150mm (Polyurethane)",
    "part_name_lo": "ລໍ້ອຸດສາຫະກຳຕາຍ Hi-Tech 150 ມມ (ລໍ້ PU ບໍ່ໝູນ)",
    "category": "Wheels",
    "description": "Industrial grade Rigid Fixed caster wheel model B060104003 with high grade polyurethane tread bonded to cast iron core. Double ball raceway for smooth rotation.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຄຸນນະພາບສູງລຸ້ນ B060104003 ລໍ້ PU ແກນເຫຼັກຫຼໍ່ ຮັບນ້ຳໜັກ 500 kg ລູກປືນຄູ່ໝູນໄດ້ 360 ອົງສາ ທົນທານຕໍ່ນ້ຳມັນ ແລະ ສານເຄມີ.",
    "image_url": "/images/jenstore-placeholders/hi-tech-heavy-duty-castor-wheel-b060104003_2tc1ymxoskjh9bpe.jpg",
    "qty_on_hand": 80,
    "unit_price": 820,
    "currency": "THB",
    "specs": {
      "Model": "B060104003",
      "Wheel Diameter": "150 mm (6\")",
      "Type": "Rigid Fixed",
      "Load Capacity": "500 kg",
      "Bearing": "Precision Double Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 779
      },
      {
        "min_qty": 10,
        "price": 738
      },
      {
        "min_qty": 20,
        "price": 697
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1007",
    "sku_code": "JNS-WH-1007",
    "barcode": "885110001060",
    "part_name": "Hi-Tech Heavy Duty Swivel Caster with Total Lock Brake 100mm",
    "part_name_lo": "ລໍ້ອຸດສາຫະກຳໝູນມີເບກ Hi-Tech 100 ມມ (ລັອກລໍ້ ແລະ ລັອກໝູນ)",
    "category": "Wheels",
    "description": "Industrial grade Swivel + Total Brake caster wheel model B060106001 with high grade polyurethane tread bonded to cast iron core. Double ball raceway for smooth rotation.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຄຸນນະພາບສູງລຸ້ນ B060106001 ລໍ້ PU ແກນເຫຼັກຫຼໍ່ ຮັບນ້ຳໜັກ 300 kg ລູກປືນຄູ່ໝູນໄດ້ 360 ອົງສາ ທົນທານຕໍ່ນ້ຳມັນ ແລະ ສານເຄມີ.",
    "image_url": "/images/jenstore-placeholders/hi-tech-heavy-duty-castor-wheel-b060106001_1_morilf6jjc81u8uc.jpg",
    "qty_on_hand": 80,
    "unit_price": 790,
    "currency": "THB",
    "specs": {
      "Model": "B060106001",
      "Wheel Diameter": "100 mm (4\")",
      "Type": "Swivel + Total Brake",
      "Load Capacity": "300 kg",
      "Bearing": "Precision Double Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 750
      },
      {
        "min_qty": 10,
        "price": 711
      },
      {
        "min_qty": 20,
        "price": 672
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1008",
    "sku_code": "JNS-WH-1008",
    "barcode": "885110001061",
    "part_name": "Hi-Tech Heavy Duty Swivel Caster with Total Lock Brake 125mm",
    "part_name_lo": "ລໍ້ອຸດສາຫະກຳໝູນມີເບກ Hi-Tech 125 ມມ (ລັອກລໍ້ ແລະ ລັອກໝູນ)",
    "category": "Wheels",
    "description": "Industrial grade Swivel + Total Brake caster wheel model B060106002 with high grade polyurethane tread bonded to cast iron core. Double ball raceway for smooth rotation.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຄຸນນະພາບສູງລຸ້ນ B060106002 ລໍ້ PU ແກນເຫຼັກຫຼໍ່ ຮັບນ້ຳໜັກ 400 kg ລູກປືນຄູ່ໝູນໄດ້ 360 ອົງສາ ທົນທານຕໍ່ນ້ຳມັນ ແລະ ສານເຄມີ.",
    "image_url": "/images/jenstore-placeholders/hi-tech-heavy-duty-castor-wheel-b060106002_1_nczu05th7j5n4gfb.jpg",
    "qty_on_hand": 80,
    "unit_price": 940,
    "currency": "THB",
    "specs": {
      "Model": "B060106002",
      "Wheel Diameter": "125 mm (5\")",
      "Type": "Swivel + Total Brake",
      "Load Capacity": "400 kg",
      "Bearing": "Precision Double Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 893
      },
      {
        "min_qty": 10,
        "price": 846
      },
      {
        "min_qty": 20,
        "price": 799
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1009",
    "sku_code": "JNS-WH-1009",
    "barcode": "885110001062",
    "part_name": "Hi-Tech Heavy Duty Swivel Caster with Total Lock Brake 150mm",
    "part_name_lo": "ລໍ້ອຸດສາຫະກຳໝູນມີເບກ Hi-Tech 150 ມມ (ລັອກລໍ້ ແລະ ລັອກໝູນ)",
    "category": "Wheels",
    "description": "Industrial grade Swivel + Total Brake caster wheel model B060106003 with high grade polyurethane tread bonded to cast iron core. Double ball raceway for smooth rotation.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຄຸນນະພາບສູງລຸ້ນ B060106003 ລໍ້ PU ແກນເຫຼັກຫຼໍ່ ຮັບນ້ຳໜັກ 500 kg ລູກປືນຄູ່ໝູນໄດ້ 360 ອົງສາ ທົນທານຕໍ່ນ້ຳມັນ ແລະ ສານເຄມີ.",
    "image_url": "/images/jenstore-placeholders/hi-tech-heavy-duty-castor-wheel-b060106003_1_oi0pzbmv6sf414tm.jpg",
    "qty_on_hand": 80,
    "unit_price": 1100,
    "currency": "THB",
    "specs": {
      "Model": "B060106003",
      "Wheel Diameter": "150 mm (6\")",
      "Type": "Swivel + Total Brake",
      "Load Capacity": "500 kg",
      "Bearing": "Precision Double Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1045
      },
      {
        "min_qty": 10,
        "price": 990
      },
      {
        "min_qty": 20,
        "price": 935
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1010",
    "sku_code": "JNS-WH-1010",
    "barcode": "885110001063",
    "part_name": "Hi-Tech Super Heavy Duty Forged Steel Swivel Caster Wheel 200mm (800 kg)",
    "part_name_lo": "ລໍ້ອຸດສາຫະກຳໜັກພິເສດເຫຼັກກ້າ Hi-Tech 200 ມມ (ຮັບນ້ຳໜັກ 800 ກິໂລ)",
    "category": "Wheels",
    "description": "Industrial grade Swivel Heavy Forged caster wheel model B060501001 with high grade polyurethane tread bonded to cast iron core. Double ball raceway for smooth rotation.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຄຸນນະພາບສູງລຸ້ນ B060501001 ລໍ້ PU ແກນເຫຼັກຫຼໍ່ ຮັບນ້ຳໜັກ 800 kg ລູກປືນຄູ່ໝູນໄດ້ 360 ອົງສາ ທົນທານຕໍ່ນ້ຳມັນ ແລະ ສານເຄມີ.",
    "image_url": "/images/jenstore-placeholders/hi-tech-heavy-duty-castor-wheel-b060501001_1_om27vsqbbnldqkjn.jpg",
    "qty_on_hand": 80,
    "unit_price": 1850,
    "currency": "THB",
    "specs": {
      "Model": "B060501001",
      "Wheel Diameter": "200 mm (8\")",
      "Type": "Swivel Heavy Forged",
      "Load Capacity": "800 kg",
      "Bearing": "Precision Double Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1758
      },
      {
        "min_qty": 10,
        "price": 1665
      },
      {
        "min_qty": 20,
        "price": 1572
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1011",
    "sku_code": "JNS-WH-1011",
    "barcode": "885110001064",
    "part_name": "Polyurethane Load Wheel for Hand Pallet Truck 80x70 mm (Steel Core with Bearings)",
    "part_name_lo": "ລໍ້ໜ້າລົດລາກພາເລດ PU 80x70 ມມ (ແກນເຫຼັກ ພ້ອມລູກປືນ 6204)",
    "category": "Wheels",
    "description": "Heavy duty 80x70mm polyurethane load roller with steel core and pre-fitted 6204-2RS sealed ball bearings for standard pallet trucks.",
    "description_lo": "ລໍ້ໂພລີຢູຣີເທນ (PU) ໜ້າພາເລດ 80x70 ມມ ແກນເຫຼັກແຂງ ພ້ອມລູກປືນຝາຢາງ 6204-2RS ທົນທານ ບໍ່ເຮັດໃຫ້ພື້ນເປັນຮອຍ.",
    "image_url": "/images/catalog/real/pu_load_wheel_1788013700773.jpg",
    "qty_on_hand": 120,
    "unit_price": 450,
    "currency": "THB",
    "specs": {
      "Dimensions": "80 x 70 mm",
      "Core": "Solid Steel",
      "Tread": "Red Polyurethane 93 Shore A",
      "Bearing": "6204-2RS (ID 20mm)"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 428
      },
      {
        "min_qty": 10,
        "price": 405
      },
      {
        "min_qty": 20,
        "price": 382
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1012",
    "sku_code": "JNS-WH-1012",
    "barcode": "885110001065",
    "part_name": "Polyurethane Steer Wheel for Hand Pallet Truck 180x50 mm (Cast Iron Core)",
    "part_name_lo": "ລໍ້ຫຼັງບັງຄັບລ້ຽວລົດລາກພາເລດ PU 180x50 ມມ (ແກນເຫຼັກຫຼໍ່ ພ້ອມລູກປືນ 6204)",
    "category": "Wheels",
    "description": "Large 180x50mm polyurethane steering wheel for manual pallet trucks. Smooth rolling, high abrasion resistance, and excellent floor protection.",
    "description_lo": "ລໍ້ບັງຄັບລ້ຽວລົດລາກພາເລດຂະໜາດ 180x50 ມມ ເນື້ອ PU ເກຣດພຣີມຽມ ແກນເຫຼັກຫຼໍ່ແຂງແຮງ ຫຼຸດແຮງຍູ້.",
    "image_url": "/images/catalog/real/pu_load_wheel_1788013700773.jpg",
    "qty_on_hand": 80,
    "unit_price": 850,
    "currency": "THB",
    "specs": {
      "Dimensions": "180 x 50 mm",
      "Core": "Cast Iron",
      "Bearing": "6204-2RS (ID 20mm)",
      "Capacity": "1000 kg/wheel"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 808
      },
      {
        "min_qty": 10,
        "price": 765
      },
      {
        "min_qty": 20,
        "price": 722
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1013",
    "sku_code": "JNS-WH-1013",
    "barcode": "885110001066",
    "part_name": "Nylon Load Wheel for Hand Pallet Truck 80x70 mm (Pure White Cast Nylon)",
    "part_name_lo": "ລໍ້ໜ້າລົດລາກພາເລດ ໄນລ່ອນຂາວ 80x70 ມມ (ທົນສານເຄມີ ແລະ ຄວາມຊຸ່ມ)",
    "category": "Wheels",
    "description": "Pure virgin white cast nylon load wheel 80x70mm for harsh environments, chemical washdowns, and cold storage facilities.",
    "description_lo": "ລໍ້ໄນລ່ອນຂາວແທ້ 80x70 ມມ ທົນກົດ-ດ່າງ, ທົນຄວາມຊຸ່ມ ແລະ ຫ້ອງເຢັນ ບໍ່ເກີດສະໜິມ ເຂັນເບົາ.",
    "image_url": "/images/catalog/real/nylon_pallet_roller.jpg",
    "qty_on_hand": 100,
    "unit_price": 380,
    "currency": "THB",
    "specs": {
      "Dimensions": "80 x 70 mm",
      "Material": "Virgin Cast Nylon 6",
      "Bearing": "6204-2RS",
      "Chemical Resistance": "Excellent"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 361
      },
      {
        "min_qty": 10,
        "price": 342
      },
      {
        "min_qty": 20,
        "price": 323
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1014",
    "sku_code": "JNS-WH-1014",
    "barcode": "885110001067",
    "part_name": "Nylon Steer Wheel for Hand Pallet Truck 180x50 mm (Heavy Load Nylon)",
    "part_name_lo": "ລໍ້ຫຼັງບັງຄັບລ້ຽວ ໄນລ່ອນຂາວ 180x50 ມມ (ສຳລັບພື້ນຊີມັງຫຍາບ)",
    "category": "Wheels",
    "description": "Wear-resistant white nylon steer wheel 180x50mm for rough concrete yards and heavy manufacturing floors.",
    "description_lo": "ລໍ້ບັງຄັບລ້ຽວໄນລ່ອນ 180x50 ມມ ທົນຕໍ່ພື້ນຄອນກີດຫຍາບ ແລະ ຮັບນ້ຳໜັກໄດ້ສູງສຸດ.",
    "image_url": "/images/catalog/real/nylon_pallet_roller.jpg",
    "qty_on_hand": 70,
    "unit_price": 720,
    "currency": "THB",
    "specs": {
      "Dimensions": "180 x 50 mm",
      "Material": "Nylon 6",
      "Bearing": "6204-2RS",
      "Capacity": "1200 kg/wheel"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 684
      },
      {
        "min_qty": 10,
        "price": 648
      },
      {
        "min_qty": 20,
        "price": 612
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1015",
    "sku_code": "JNS-WH-1015",
    "barcode": "885110001068",
    "part_name": "Industrial Solid Resilient Forklift Front Tire 28x9-15 (Standard Black)",
    "part_name_lo": "ຍາງຕັນລົດຍົກ Forklift ລໍ້ໜ້າ 28x9-15 (ສີດຳມາດຕະຖານ)",
    "category": "Wheels",
    "description": "Heavy duty 3-layer solid resilient tire for 2.5 - 3.5 ton forklift front drive wheels. Deep lug tread pattern for maximum traction.",
    "description_lo": "ຍາງຕັນອຸດສາຫະກຳ 3 ຊັ້ນ ສຳລັບລໍ້ໜ້າລົດຍົກຂະໜາດ 2.5 - 3.5 ໂຕນ ດອກຢາງເລິກ ເກາະພື້ນດີ ທົນທານຕໍ່ການສຽດສີສູງ.",
    "image_url": "/images/catalog/real/fl_tire_front_1788016243672.jpg",
    "qty_on_hand": 30,
    "unit_price": 8500,
    "currency": "THB",
    "specs": {
      "Size": "28x9-15 (8.15-15)",
      "Type": "Solid Resilient 3-Stage",
      "Position": "Front Drive",
      "Load Rating": "3770 kg"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 8075
      },
      {
        "min_qty": 10,
        "price": 7650
      },
      {
        "min_qty": 20,
        "price": 7225
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1016",
    "sku_code": "JNS-WH-1016",
    "barcode": "885110001069",
    "part_name": "Industrial Solid Rubber Forklift Rear Steering Tire 6.50-10",
    "part_name_lo": "ຍາງຕັນລົດຍົກ Forklift ລໍ້ຫຼັງບັງຄັບລ້ຽວ 6.50-10",
    "category": "Wheels",
    "description": "Premium solid rubber steering tire 6.50-10 for forklift rear steer axles. Exceptional steering stability and heat dissipation.",
    "description_lo": "ຍາງຕັນລໍ້ຫຼັງບັງຄັບລ້ຽວ 6.50-10 ຊ່ວຍໃຫ້ການລ້ຽວໝັ້ນຄົງ ລະບາຍຄວາມຮ້ອນໄດ້ດີ ທົນທານຕໍ່ການໃຊ້ງານໜັກຕໍ່ເນື່ອງ.",
    "image_url": "/images/catalog/real/fl_tire_rear_1788016270413.jpg",
    "qty_on_hand": 40,
    "unit_price": 4600,
    "currency": "THB",
    "specs": {
      "Size": "6.50-10",
      "Type": "Solid Resilient",
      "Position": "Rear Steer",
      "Load Rating": "1900 kg"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 4370
      },
      {
        "min_qty": 10,
        "price": 4140
      },
      {
        "min_qty": 20,
        "price": 3910
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1017",
    "sku_code": "JNS-WH-1017",
    "barcode": "885110001070",
    "part_name": "Heavy Duty Steel Split Wheel Rim Front (5.00F-10 6-Hole PCD 148mm)",
    "part_name_lo": "ກະທະລໍ້ເຫຼັກຜ່າ Forklift ລໍ້ໜ້າ 5.00F-10 (6 ຮູ PCD 148 ມມ)",
    "category": "Wheels",
    "description": "Two-piece bolted split steel wheel rim for easy solid tire installation without heavy hydraulic press machines.",
    "description_lo": "ກະທະລໍ້ເຫຼັກແບບຜ່າ 2 ຊິ້ນ 5.00F-10 ສະດວກຕໍ່ການປ່ຽນຍາງຕັນ ໂດຍບໍ່ຕ້ອງໃຊ້ເຄື່ອງອັດໄຮໂດຣລິກໃຫຍ່.",
    "image_url": "/images/catalog/real/fl_rim_front_1788016327786.jpg",
    "qty_on_hand": 25,
    "unit_price": 3200,
    "currency": "THB",
    "specs": {
      "Rim Size": "5.00F-10",
      "Bolt Holes": "6 Holes",
      "PCD": "148 mm",
      "Center Bore": "110 mm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3040
      },
      {
        "min_qty": 10,
        "price": 2880
      },
      {
        "min_qty": 20,
        "price": 2720
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1018",
    "sku_code": "JNS-WH-1018",
    "barcode": "885110001071",
    "part_name": "Heavy Duty Steel Split Wheel Rim Rear (4.00E-9 6-Hole PCD 140mm)",
    "part_name_lo": "ກະທະລໍ້ເຫຼັກຜ່າ Forklift ລໍ້ຫຼັງ 4.00E-9 (6 ຮູ PCD 140 ມມ)",
    "category": "Wheels",
    "description": "Heavy duty 2-piece split steel rim for rear steering tires on 2.0 - 2.5 ton industrial forklifts.",
    "description_lo": "ກະທະລໍ້ເຫຼັກຜ່າລໍ້ຫຼັງ 4.00E-9 ສຳລັບລົດຍົກ 2.0 - 2.5 ໂຕນ ເຫຼັກໜາພິເສດ ທົນແຮງບິດສູງ.",
    "image_url": "/images/catalog/real/fl_rim_rear_1788016344270.jpg",
    "qty_on_hand": 30,
    "unit_price": 2800,
    "currency": "THB",
    "specs": {
      "Rim Size": "4.00E-9",
      "Bolt Holes": "6 Holes",
      "PCD": "140 mm",
      "Center Bore": "100 mm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2660
      },
      {
        "min_qty": 10,
        "price": 2520
      },
      {
        "min_qty": 20,
        "price": 2380
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1019",
    "sku_code": "JNS-WH-1019",
    "barcode": "885110001072",
    "part_name": "High Tensile Forklift Wheel Stud Nuts M18x1.5 (Grade 10.9 Pack of 10)",
    "part_name_lo": "ນັອດລໍ້ລົດຍົກ Forklift M18x1.5 ເຫຼັກແຂງເກຣດ 10.9 (ຊຸດ 10 ໂຕ)",
    "category": "Wheels",
    "description": "Grade 10.9 zinc phosphate coated heavy duty wheel lug nuts for forklift drive and steer hubs.",
    "description_lo": "ນັອດລໍ້ເຫຼັກກ້າແຂງພິເສດ Grade 10.9 ຂະໜາດ M18x1.5 ຊຸບກັນສະໜິມ ປ້ອງກັນລໍ້ຫຼຸດ ປອດໄພສູງສຸດ.",
    "image_url": "/images/catalog/real/fl_wheel_nut_1788016314490.jpg",
    "qty_on_hand": 100,
    "unit_price": 650,
    "currency": "THB",
    "specs": {
      "Thread": "M18 x 1.5 mm",
      "Grade": "10.9 High Tensile",
      "Quantity": "10 Pcs/Pack"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 618
      },
      {
        "min_qty": 10,
        "price": 585
      },
      {
        "min_qty": 20,
        "price": 552
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1020",
    "sku_code": "JNS-WH-1020",
    "barcode": "885110001073",
    "part_name": "Complete Rear Steering Axle Beam Assembly for 3.0-Ton Forklift",
    "part_name_lo": "ຄານລໍ້ຫຼັງບັງຄັບລ້ຽວລົດຍົກ Forklift 3.0 ໂຕນ (ພ້ອມບຸດ ແລະ ກະບອກສູບ)",
    "category": "Wheels",
    "description": "Heavy cast steel steer axle beam with center pivot pin, tie rods, and kingpin needle bearings for Toyota/Komatsu forklifts.",
    "description_lo": "ຊຸດຄານລ້ຽວຫຼັງລົດຍົກ 3.0 ໂຕນ ຫຼໍ່ຈາກເຫຼັກກ້າພິເສດ ພ້ອມລູກປືນຄໍມ້າ ແລະ ລູກໝາກຄົບຊຸດ.",
    "image_url": "/images/catalog/real/fl_axle_rear_1788016111988.jpg",
    "qty_on_hand": 5,
    "unit_price": 28500,
    "currency": "THB",
    "specs": {
      "Compatibility": "2.5 - 3.0 Ton Forklifts",
      "Material": "Cast Alloy Steel",
      "Includes": "Axle, Pins, Needle Bearings"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 27075
      },
      {
        "min_qty": 10,
        "price": 25650
      },
      {
        "min_qty": 20,
        "price": 24225
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1021",
    "sku_code": "JNS-WH-1021",
    "barcode": "885110001074",
    "part_name": "Forged Alloy Steel Forklift Steering Knuckle Spindle (Left/Right Pair)",
    "part_name_lo": "ຄໍມ້າລໍ້ຫຼັງລົດຍົກ Forklift (ຄູ່ຊ້າຍ-ຂວາ ເຫຼັກຟອດ)",
    "category": "Wheels",
    "description": "Precision machined forged steel steering knuckles for 2.5-3.0 ton forklift rear wheel hubs.",
    "description_lo": "ຄໍມ້າລໍ້ຫຼັງ Forklift ຄູ່ຊ້າຍ-ຂວາ ຂຶ້ນຮູບດ້ວຍການຟອດ (Forged) ແຂງແຮງ ບໍ່ແຕກຫັກ.",
    "image_url": "/images/catalog/real/fl_steer_knuckle_1788017877183.jpg",
    "qty_on_hand": 15,
    "unit_price": 7500,
    "currency": "THB",
    "specs": {
      "Material": "Forged 40Cr Steel",
      "Fitment": "Standard 2.5-3.0T Steer Axle",
      "Includes": "Left & Right Pair"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7125
      },
      {
        "min_qty": 10,
        "price": 6750
      },
      {
        "min_qty": 20,
        "price": 6375
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1022",
    "sku_code": "JNS-WH-1022",
    "barcode": "885110001075",
    "part_name": "Power Steering Hydraulic Cylinder Rebuild Seal Kit",
    "part_name_lo": "ຊຸດຊີລກະບອກສູບພວງມາໄລພາເວີ້ລົດຍົກ Forklift",
    "category": "Wheels",
    "description": "Complete hydraulic cylinder repair seal kit with polyurethane U-cups, PTFE backup rings, and dust wipers.",
    "description_lo": "ຊຸດຊີລສ້ອມແປງກະບອກສູບລ້ຽວໄຮໂດຣລິກ Forklift ເນື້ອ PU ແລະ ໂອຣິງທົນຄວາມຮ້ອນ ປ້ອງກັນການຮົ່ວຊຶມ 100%.",
    "image_url": "/images/catalog/real/fl_steer_seal_kit_1788017137822.jpg",
    "qty_on_hand": 45,
    "unit_price": 1200,
    "currency": "THB",
    "specs": {
      "Material": "Polyurethane / NBR / PTFE",
      "Max Pressure": "250 Bar",
      "Application": "Steer Cylinder"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1140
      },
      {
        "min_qty": 10,
        "price": 1080
      },
      {
        "min_qty": 20,
        "price": 1020
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1023",
    "sku_code": "JNS-WH-1023",
    "barcode": "885110001076",
    "part_name": "Low Rolling Resistance Commercial Radial Fleet Tire 215/55R17 (Reinforced XL)",
    "part_name_lo": "ຍາງລົດບັນທຸກເບົາ ແລະ ລົດໄຟຟ້າຂົນສົ່ງ 215/55R17 (ເສີມຜ້າໃບພິເສດ XL)",
    "category": "Wheels",
    "description": "Fuel-efficient commercial radial tire engineered for logistics electric vans and fleet passenger vehicles.",
    "description_lo": "ຍາງເຣດຽວປະຢັດພະລັງງານ 215/55R17 ສຳລັບລົດຕູ້ຂົນສົ່ງ ແລະ ລົດໄຟຟ້າ fleet ດອກຢາງງຽບ ທົນທານ.",
    "image_url": "/images/catalog/real/aion_y_tire_1787994913656.jpg",
    "qty_on_hand": 40,
    "unit_price": 3200,
    "currency": "THB",
    "specs": {
      "Size": "215/55R17",
      "Load Index": "98W XL",
      "Tread Pattern": "Silent High Traction",
      "Fuel Efficiency": "Grade A"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3040
      },
      {
        "min_qty": 10,
        "price": 2880
      },
      {
        "min_qty": 20,
        "price": 2720
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1024",
    "sku_code": "JNS-WH-1024",
    "barcode": "885110001077",
    "part_name": "Reinforced Heavy Commercial Fleet Radial Tire 225/55R18 (EV Silent Tread)",
    "part_name_lo": "ຍາງລົດຂົນສົ່ງອຸດສາຫະກຳ 225/55R18 (ດອກຢາງລົດສຽງລົບກວນ)",
    "category": "Wheels",
    "description": "Heavy commercial grade tire with reinforced sidewalls to prevent curb scuffing and blowouts under heavy cargo.",
    "description_lo": "ຍາງລົດຂົນສົ່ງສິນຄ້າ 225/55R18 ແກ້ມຢາງໜາພິເສດ ປ້ອງກັນການບາດຕຳ ແລະ ຮອງຮັບນ້ຳໜັກສິນຄ້າໄດ້ດີ.",
    "image_url": "/images/catalog/real/ev_tire_1787946554424.jpg",
    "qty_on_hand": 35,
    "unit_price": 3600,
    "currency": "THB",
    "specs": {
      "Size": "225/55R18",
      "Load Index": "102V XL",
      "Speed Rating": "V (240 km/h)",
      "Sidewall": "Reinforced 2-Ply Polyester"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3420
      },
      {
        "min_qty": 10,
        "price": 3240
      },
      {
        "min_qty": 20,
        "price": 3060
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1025",
    "sku_code": "JNS-WH-1025",
    "barcode": "885110001078",
    "part_name": "Heavy Duty Highway Commercial Radial Fleet Tire 205/65R16C (8-Ply Rating)",
    "part_name_lo": "ຍາງລົດກະບະຂົນສົ່ງສິນຄ້າ 205/65R16C (ຜ້າໃບ 8 ຊັ້ນ)",
    "category": "Wheels",
    "description": "8-ply commercial van tire designed for maximum load carrying and long highway mileage without overheating.",
    "description_lo": "ຍາງລົດກະບະບັນທຸກ 205/65R16C ຜ້າໃບ 8 ຊັ້ນ ຮັບນ້ຳໜັກໄດ້ສູງ ທົນທານຕໍ່ການແລ່ນທາງໄກ ບໍ່ຮ້ອນໄວ.",
    "image_url": "/images/catalog/real/neta_ev_tire_1787992165722.jpg",
    "qty_on_hand": 50,
    "unit_price": 2850,
    "currency": "THB",
    "specs": {
      "Size": "205/65R16C",
      "Ply Rating": "8 PR",
      "Load Index": "107/105T",
      "Max Pressure": "54 PSI"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2708
      },
      {
        "min_qty": 10,
        "price": 2565
      },
      {
        "min_qty": 20,
        "price": 2422
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1026",
    "sku_code": "JNS-WH-1026",
    "barcode": "885110001079",
    "part_name": "Heavy Earthmover OTR Mining Radial Tire 23.5R25 (E-3 / L-3 Rock Tread)",
    "part_name_lo": "ຍາງລົດຕັກ ແລະ ລົດດັ້ມບໍ່ແຮ່ OTR 23.5R25 (ດອກຫີນ E-3/L-3 ທົນບາດຕຳ)",
    "category": "Wheels",
    "description": "Giant off-the-road radial tire for heavy wheel loaders and articulated dump trucks operating in open-pit mines.",
    "description_lo": "ຍາງຂະໜາດໃຫຍ່ສຳລັບລົດຕັກ ແລະ ລົດດັ້ມບໍ່ແຮ່ 23.5R25 ເນື້ອຢາງສູດພິເສດທົນຕໍ່ການບາດຕຳຂອງຫີນຄົມ.",
    "image_url": "/images/catalog/real/mining_otr_tire_1787986357627.jpg",
    "qty_on_hand": 8,
    "unit_price": 145000,
    "currency": "THB",
    "specs": {
      "Size": "23.5R25",
      "TRA Code": "E-3 / L-3",
      "Star Rating": "★★",
      "Application": "Wheel Loader / Dump Truck"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 137750
      },
      {
        "min_qty": 10,
        "price": 130500
      },
      {
        "min_qty": 20,
        "price": 123250
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1027",
    "sku_code": "JNS-WH-1027",
    "barcode": "885110001080",
    "part_name": "Industrial Elastic Rubber Swivel Caster 100mm (Noise Dampening)",
    "part_name_lo": "ລໍ້ຢາງທຳມະຊາດໝູນໄດ້ 100 ມມ (ດູດຊັບແຮງກະແທກ ເລື່ອນງຽບ)",
    "category": "Wheels",
    "description": "Industrial grade caster wheel with 100 mm diameter, Elastic Rubber wheel material, and 150 kg rated load capacity.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຂະໜາດ 100 mm ວັດສະດຸ Elastic Rubber ຮັບນ້ຳໜັກ 150 kg ທົນທານ ມາດຕະຖານໂຮງງານ.",
    "image_url": "/images/catalog/real/rubber_swivel_caster.jpg",
    "qty_on_hand": 60,
    "unit_price": 420,
    "currency": "THB",
    "specs": {
      "Wheel Diameter": "100 mm",
      "Material": "Elastic Rubber",
      "Load Capacity": "150 kg",
      "Bearing": "Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 399
      },
      {
        "min_qty": 10,
        "price": 378
      },
      {
        "min_qty": 20,
        "price": 357
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1028",
    "sku_code": "JNS-WH-1028",
    "barcode": "885110001081",
    "part_name": "Industrial Elastic Rubber Rigid Caster 100mm (Fixed Direction)",
    "part_name_lo": "ລໍ້ຢາງທຳມະຊາດຕາຍ 100 ມມ (ລໍ້ຄົງທີ່)",
    "category": "Wheels",
    "description": "Industrial grade caster wheel with 100 mm diameter, Elastic Rubber wheel material, and 150 kg rated load capacity.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຂະໜາດ 100 mm ວັດສະດຸ Elastic Rubber ຮັບນ້ຳໜັກ 150 kg ທົນທານ ມາດຕະຖານໂຮງງານ.",
    "image_url": "/images/catalog/real/rubber_swivel_caster.jpg",
    "qty_on_hand": 60,
    "unit_price": 360,
    "currency": "THB",
    "specs": {
      "Wheel Diameter": "100 mm",
      "Material": "Elastic Rubber",
      "Load Capacity": "150 kg",
      "Bearing": "Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 342
      },
      {
        "min_qty": 10,
        "price": 324
      },
      {
        "min_qty": 20,
        "price": 306
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1029",
    "sku_code": "JNS-WH-1029",
    "barcode": "885110001082",
    "part_name": "Industrial Elastic Rubber Swivel with Brake 100mm",
    "part_name_lo": "ລໍ້ຢາງທຳມະຊາດໝູນມີເບກ 100 ມມ",
    "category": "Wheels",
    "description": "Industrial grade caster wheel with 100 mm diameter, Elastic Rubber wheel material, and 150 kg rated load capacity.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຂະໜາດ 100 mm ວັດສະດຸ Elastic Rubber ຮັບນ້ຳໜັກ 150 kg ທົນທານ ມາດຕະຖານໂຮງງານ.",
    "image_url": "/images/catalog/real/rubber_swivel_caster.jpg",
    "qty_on_hand": 60,
    "unit_price": 490,
    "currency": "THB",
    "specs": {
      "Wheel Diameter": "100 mm",
      "Material": "Elastic Rubber",
      "Load Capacity": "150 kg",
      "Bearing": "Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 466
      },
      {
        "min_qty": 10,
        "price": 441
      },
      {
        "min_qty": 20,
        "price": 416
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1030",
    "sku_code": "JNS-WH-1030",
    "barcode": "885110001083",
    "part_name": "Industrial Heavy Duty Cast Iron Swivel Caster 150mm (High Temp 300°C)",
    "part_name_lo": "ລໍ້ເຫຼັກຫຼໍ່ລ້ວນໝູນໄດ້ 150 ມມ (ທົນຄວາມຮ້ອນສູງ 300 ອົງສາ)",
    "category": "Wheels",
    "description": "Industrial grade caster wheel with 150 mm diameter, Solid Cast Iron wheel material, and 600 kg rated load capacity.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຂະໜາດ 150 mm ວັດສະດຸ Solid Cast Iron ຮັບນ້ຳໜັກ 600 kg ທົນທານ ມາດຕະຖານໂຮງງານ.",
    "image_url": "/images/jenstore-placeholders/hi-tech-heavy-duty-castor-wheel-b060104001_ts0h4xzamipfxk1o.jpg",
    "qty_on_hand": 60,
    "unit_price": 1250,
    "currency": "THB",
    "specs": {
      "Wheel Diameter": "150 mm",
      "Material": "Solid Cast Iron",
      "Load Capacity": "600 kg",
      "Bearing": "Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1188
      },
      {
        "min_qty": 10,
        "price": 1125
      },
      {
        "min_qty": 20,
        "price": 1062
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1031",
    "sku_code": "JNS-WH-1031",
    "barcode": "885110001084",
    "part_name": "Industrial Heavy Duty Cast Iron Rigid Caster 150mm (High Temp)",
    "part_name_lo": "ລໍ້ເຫຼັກຫຼໍ່ລ້ວນຕາຍ 150 ມມ (ທົນຄວາມຮ້ອນສູງ)",
    "category": "Wheels",
    "description": "Industrial grade caster wheel with 150 mm diameter, Solid Cast Iron wheel material, and 600 kg rated load capacity.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຂະໜາດ 150 mm ວັດສະດຸ Solid Cast Iron ຮັບນ້ຳໜັກ 600 kg ທົນທານ ມາດຕະຖານໂຮງງານ.",
    "image_url": "/images/jenstore-placeholders/hi-tech-heavy-duty-castor-wheel-b060104002_chf5fmuf3hksrqpi.jpg",
    "qty_on_hand": 60,
    "unit_price": 1100,
    "currency": "THB",
    "specs": {
      "Wheel Diameter": "150 mm",
      "Material": "Solid Cast Iron",
      "Load Capacity": "600 kg",
      "Bearing": "Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1045
      },
      {
        "min_qty": 10,
        "price": 990
      },
      {
        "min_qty": 20,
        "price": 935
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1032",
    "sku_code": "JNS-WH-1032",
    "barcode": "885110001085",
    "part_name": "High Load White Nylon Swivel Caster 125mm (Chemical Proof)",
    "part_name_lo": "ລໍ້ໄນລ່ອນຂາວໝູນໄດ້ 125 ມມ (ທົນສານເຄມີ ຮັບນ້ຳໜັກ 400 ກິໂລ)",
    "category": "Wheels",
    "description": "Industrial grade caster wheel with 125 mm diameter, Cast Nylon wheel material, and 400 kg rated load capacity.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຂະໜາດ 125 mm ວັດສະດຸ Cast Nylon ຮັບນ້ຳໜັກ 400 kg ທົນທານ ມາດຕະຖານໂຮງງານ.",
    "image_url": "/images/catalog/real/nylon_pallet_roller.jpg",
    "qty_on_hand": 60,
    "unit_price": 680,
    "currency": "THB",
    "specs": {
      "Wheel Diameter": "125 mm",
      "Material": "Cast Nylon",
      "Load Capacity": "400 kg",
      "Bearing": "Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 646
      },
      {
        "min_qty": 10,
        "price": 612
      },
      {
        "min_qty": 20,
        "price": 578
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1033",
    "sku_code": "JNS-WH-1033",
    "barcode": "885110001086",
    "part_name": "High Load White Nylon Rigid Caster 125mm",
    "part_name_lo": "ລໍ້ໄນລ່ອນຂາວຕາຍ 125 ມມ",
    "category": "Wheels",
    "description": "Industrial grade caster wheel with 125 mm diameter, Cast Nylon wheel material, and 400 kg rated load capacity.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຂະໜາດ 125 mm ວັດສະດຸ Cast Nylon ຮັບນ້ຳໜັກ 400 kg ທົນທານ ມາດຕະຖານໂຮງງານ.",
    "image_url": "/images/catalog/real/nylon_pallet_roller.jpg",
    "qty_on_hand": 60,
    "unit_price": 590,
    "currency": "THB",
    "specs": {
      "Wheel Diameter": "125 mm",
      "Material": "Cast Nylon",
      "Load Capacity": "400 kg",
      "Bearing": "Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 560
      },
      {
        "min_qty": 10,
        "price": 531
      },
      {
        "min_qty": 20,
        "price": 502
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1034",
    "sku_code": "JNS-WH-1034",
    "barcode": "885110001087",
    "part_name": "High Load White Nylon Swivel with Brake 125mm",
    "part_name_lo": "ລໍ້ໄນລ່ອນຂາວໝູນມີເບກ 125 ມມ",
    "category": "Wheels",
    "description": "Industrial grade caster wheel with 125 mm diameter, Cast Nylon wheel material, and 400 kg rated load capacity.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຂະໜາດ 125 mm ວັດສະດຸ Cast Nylon ຮັບນ້ຳໜັກ 400 kg ທົນທານ ມາດຕະຖານໂຮງງານ.",
    "image_url": "/images/catalog/real/nylon_pallet_roller.jpg",
    "qty_on_hand": 60,
    "unit_price": 780,
    "currency": "THB",
    "specs": {
      "Wheel Diameter": "125 mm",
      "Material": "Cast Nylon",
      "Load Capacity": "400 kg",
      "Bearing": "Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 741
      },
      {
        "min_qty": 10,
        "price": 702
      },
      {
        "min_qty": 20,
        "price": 663
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1035",
    "sku_code": "JNS-WH-1035",
    "barcode": "885110001088",
    "part_name": "Stainless Steel 304 Bracket Swivel Caster 100mm (Washdown/Food Grade)",
    "part_name_lo": "ລໍ້ສະແຕນເລດ 304 ໝູນໄດ້ 100 ມມ (ສຳລັບໂຮງງານອາຫານ)",
    "category": "Wheels",
    "description": "Industrial grade caster wheel with 100 mm diameter, PU / SS304 Bracket wheel material, and 250 kg rated load capacity.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຂະໜາດ 100 mm ວັດສະດຸ PU / SS304 Bracket ຮັບນ້ຳໜັກ 250 kg ທົນທານ ມາດຕະຖານໂຮງງານ.",
    "image_url": "/images/jenstore-placeholders/hi-tech-heavy-duty-castor-wheel-b060106001_1_morilf6jjc81u8uc.jpg",
    "qty_on_hand": 60,
    "unit_price": 1450,
    "currency": "THB",
    "specs": {
      "Wheel Diameter": "100 mm",
      "Material": "PU / SS304 Bracket",
      "Load Capacity": "250 kg",
      "Bearing": "Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1378
      },
      {
        "min_qty": 10,
        "price": 1305
      },
      {
        "min_qty": 20,
        "price": 1232
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1036",
    "sku_code": "JNS-WH-1036",
    "barcode": "885110001089",
    "part_name": "Stainless Steel 304 Bracket Swivel with Brake 100mm (Food Grade)",
    "part_name_lo": "ລໍ້ສະແຕນເລດ 304 ໝູນມີເບກ 100 ມມ (ສຳລັບໂຮງງານອາຫານ)",
    "category": "Wheels",
    "description": "Industrial grade caster wheel with 100 mm diameter, PU / SS304 Bracket wheel material, and 250 kg rated load capacity.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຂະໜາດ 100 mm ວັດສະດຸ PU / SS304 Bracket ຮັບນ້ຳໜັກ 250 kg ທົນທານ ມາດຕະຖານໂຮງງານ.",
    "image_url": "/images/jenstore-placeholders/hi-tech-heavy-duty-castor-wheel-b060106002_1_nczu05th7j5n4gfb.jpg",
    "qty_on_hand": 60,
    "unit_price": 1650,
    "currency": "THB",
    "specs": {
      "Wheel Diameter": "100 mm",
      "Material": "PU / SS304 Bracket",
      "Load Capacity": "250 kg",
      "Bearing": "Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1568
      },
      {
        "min_qty": 10,
        "price": 1485
      },
      {
        "min_qty": 20,
        "price": 1402
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1037",
    "sku_code": "JNS-WH-1037",
    "barcode": "885110001090",
    "part_name": "Heavy Duty Twin Wheel Swivel Caster 75mm (Low Profile High Capacity 500kg)",
    "part_name_lo": "ລໍ້ຄູ່ໂປຣໄຟລ໌ຕໍ່າ 75 ມມ (ຮັບນ້ຳໜັກສູງ 500 ກິໂລ)",
    "category": "Wheels",
    "description": "Industrial grade caster wheel with 75 mm diameter, Twin PU Wheel wheel material, and 500 kg rated load capacity.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຂະໜາດ 75 mm ວັດສະດຸ Twin PU Wheel ຮັບນ້ຳໜັກ 500 kg ທົນທານ ມາດຕະຖານໂຮງງານ.",
    "image_url": "/images/jenstore-placeholders/hi-tech-heavy-duty-castor-wheel-b060501001_1_om27vsqbbnldqkjn.jpg",
    "qty_on_hand": 60,
    "unit_price": 980,
    "currency": "THB",
    "specs": {
      "Wheel Diameter": "75 mm",
      "Material": "Twin PU Wheel",
      "Load Capacity": "500 kg",
      "Bearing": "Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 931
      },
      {
        "min_qty": 10,
        "price": 882
      },
      {
        "min_qty": 20,
        "price": 833
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1038",
    "sku_code": "JNS-WH-1038",
    "barcode": "885110001091",
    "part_name": "Pneumatic Air Rubber Swivel Caster 200mm (8\" Outdoor Rough Terrain)",
    "part_name_lo": "ລໍ້ລົມຢາງໝູນໄດ້ 200 ມມ (8 ນິ້ວ ສຳລັບພື້ນດິນ ແລະ ຫີນ)",
    "category": "Wheels",
    "description": "Industrial grade caster wheel with 200 mm diameter, Pneumatic Rubber wheel material, and 200 kg rated load capacity.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຂະໜາດ 200 mm ວັດສະດຸ Pneumatic Rubber ຮັບນ້ຳໜັກ 200 kg ທົນທານ ມາດຕະຖານໂຮງງານ.",
    "image_url": "/images/catalog/real/pneumatic_air_caster.jpg",
    "qty_on_hand": 60,
    "unit_price": 1150,
    "currency": "THB",
    "specs": {
      "Wheel Diameter": "200 mm",
      "Material": "Pneumatic Rubber",
      "Load Capacity": "200 kg",
      "Bearing": "Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1092
      },
      {
        "min_qty": 10,
        "price": 1035
      },
      {
        "min_qty": 20,
        "price": 978
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1039",
    "sku_code": "JNS-WH-1039",
    "barcode": "885110001092",
    "part_name": "Pneumatic Air Rubber Rigid Caster 200mm (8\" Fixed)",
    "part_name_lo": "ລໍ້ລົມຢາງຕາຍ 200 ມມ (8 ນິ້ວ)",
    "category": "Wheels",
    "description": "Industrial grade caster wheel with 200 mm diameter, Pneumatic Rubber wheel material, and 200 kg rated load capacity.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຂະໜາດ 200 mm ວັດສະດຸ Pneumatic Rubber ຮັບນ້ຳໜັກ 200 kg ທົນທານ ມາດຕະຖານໂຮງງານ.",
    "image_url": "/images/catalog/real/pneumatic_air_caster.jpg",
    "qty_on_hand": 60,
    "unit_price": 990,
    "currency": "THB",
    "specs": {
      "Wheel Diameter": "200 mm",
      "Material": "Pneumatic Rubber",
      "Load Capacity": "200 kg",
      "Bearing": "Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 940
      },
      {
        "min_qty": 10,
        "price": 891
      },
      {
        "min_qty": 20,
        "price": 842
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-wh-1040",
    "sku_code": "JNS-WH-1040",
    "barcode": "885110001093",
    "part_name": "Heavy Duty Spring-Loaded Shock Absorbing Swivel Caster 150mm",
    "part_name_lo": "ລໍ້ຕິດສະປິງດູດຊັບແຮງກະແທກ 150 ມມ (ປ້ອງກັນສິນຄ້າແຕກຫັກ)",
    "category": "Wheels",
    "description": "Industrial grade caster wheel with 150 mm diameter, Polyurethane + Spring wheel material, and 450 kg rated load capacity.",
    "description_lo": "ລໍ້ອຸດສາຫະກຳຂະໜາດ 150 mm ວັດສະດຸ Polyurethane + Spring ຮັບນ້ຳໜັກ 450 kg ທົນທານ ມາດຕະຖານໂຮງງານ.",
    "image_url": "/images/jenstore-placeholders/hi-tech-heavy-duty-castor-wheel-b060101002_1_6a8tmjgyfnvteb93.jpg",
    "qty_on_hand": 60,
    "unit_price": 2100,
    "currency": "THB",
    "specs": {
      "Wheel Diameter": "150 mm",
      "Material": "Polyurethane + Spring",
      "Load Capacity": "450 kg",
      "Bearing": "Ball Bearing"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1995
      },
      {
        "min_qty": 10,
        "price": 1890
      },
      {
        "min_qty": 20,
        "price": 1785
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1001",
    "sku_code": "JNS-ST-1001",
    "barcode": "885110001094",
    "part_name": "Stainless Steel 304 Solid 4-Tier Heavy Shelving Rack (W1200 x D500 x H1800 mm)",
    "part_name_lo": "ຊັ້ນວາງສະແຕນເລດ 304 ແຜ່ນຮາບ 4 ຊັ້ນ (W1200 x D500 x H1800 ມມ)",
    "category": "Storage System",
    "description": "Heavy duty commercial grade SUS304 stainless steel solid 4-shelf unit. Rust-proof, hygienic flat surface for food processing and cold rooms.",
    "description_lo": "ຊັ້ນວາງສະແຕນເລດເກຣດ 304 ແທ້ 4 ຊັ້ນ ແຜ່ນຮາບທຳຄວາມສະອາດງ່າຍ ບໍ່ຂຶ້ນສະໜິມ 100% ເໝາະສຳລັບໂຮງງານອາຫານ ແລະ ຫ້ອງເຢັນ.",
    "image_url": "/images/jenstore-placeholders/stainless-steel-shelving-a031200005.jpg",
    "qty_on_hand": 15,
    "unit_price": 14500,
    "currency": "THB",
    "specs": {
      "Material": "Stainless Steel SUS304",
      "Shelves": "4 Solid Tiers",
      "Dimensions": "1200 x 500 x 1800 mm",
      "Load Capacity": "200 kg/tier"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 13775
      },
      {
        "min_qty": 10,
        "price": 13050
      },
      {
        "min_qty": 20,
        "price": 12325
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1002",
    "sku_code": "JNS-ST-1002",
    "barcode": "885110001095",
    "part_name": "Stainless Steel 304 Solid 5-Tier Heavy Shelving Rack (W1500 x D500 x H1800 mm)",
    "part_name_lo": "ຊັ້ນວາງສະແຕນເລດ 304 ແຜ່ນຮາບ 5 ຊັ້ນ (W1500 x D500 x H1800 ມມ)",
    "category": "Storage System",
    "description": "High capacity 5-tier solid stainless steel shelving rack with adjustable shelf heights and leveling feet.",
    "description_lo": "ຊັ້ນວາງສະແຕນເລດ 304 ແຜ່ນຮາບ 5 ຊັ້ນ ປັບລະດັບຄວາມສູງຂອງແຕ່ລະຊັ້ນໄດ້ ຂາຕັ້ງປັບລະດັບພື້ນໄດ້.",
    "image_url": "/images/jenstore-placeholders/stainless-steel-shelving-a031200006.jpg",
    "qty_on_hand": 12,
    "unit_price": 17800,
    "currency": "THB",
    "specs": {
      "Material": "Stainless Steel SUS304",
      "Shelves": "5 Solid Tiers",
      "Dimensions": "1500 x 500 x 1800 mm",
      "Load Capacity": "200 kg/tier"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 16910
      },
      {
        "min_qty": 10,
        "price": 16020
      },
      {
        "min_qty": 20,
        "price": 15130
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1003",
    "sku_code": "JNS-ST-1003",
    "barcode": "885110001096",
    "part_name": "Stainless Steel 304 Wire 4-Tier Ventilated Shelving Unit (W1200 x D450 x H1600 mm)",
    "part_name_lo": "ຊັ້ນວາງສະແຕນເລດ 304 ແບບຕະແກງໂປ່ງ 4 ຊັ້ນ (ລະບາຍອາກາດດີ)",
    "category": "Storage System",
    "description": "Ventilated wire grid stainless shelving that prevents dust accumulation and allows optimal cold air circulation in freezers.",
    "description_lo": "ຊັ້ນວາງສະແຕນເລດຕະແກງໂປ່ງ 4 ຊັ້ນ ລະບາຍອາກາດໄດ້ດີ ຫຼຸດການສະສົມຂອງຝຸ່ນ ລົມເຢັນໄຫຼຜ່ານໄດ້ທົ່ວເຖິງ.",
    "image_url": "/images/jenstore-placeholders/stainless-steel-shelving-a032200005.jpg",
    "qty_on_hand": 20,
    "unit_price": 11500,
    "currency": "THB",
    "specs": {
      "Material": "Stainless Steel SUS304",
      "Shelves": "4 Wire Tiers",
      "Dimensions": "1200 x 450 x 1600 mm",
      "Load Capacity": "150 kg/tier"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 10925
      },
      {
        "min_qty": 10,
        "price": 10350
      },
      {
        "min_qty": 20,
        "price": 9775
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1004",
    "sku_code": "JNS-ST-1004",
    "barcode": "885110001097",
    "part_name": "Stainless Steel 304 Wire 5-Tier Ventilated Shelving Unit (W1500 x D450 x H1800 mm)",
    "part_name_lo": "ຊັ້ນວາງສະແຕນເລດ 304 ແບບຕະແກງໂປ່ງ 5 ຊັ້ນ (W1500 x D450 x H1800 ມມ)",
    "category": "Storage System",
    "description": "Heavy commercial 5-tier wire grid shelving unit certified for pharmaceutical cleanrooms and commercial kitchen dry storage.",
    "description_lo": "ຊັ້ນວາງສະແຕນເລດຕະແກງ 5 ຊັ້ນ ມາດຕະຖານສາກົນສຳລັບຫ້ອງທົດລອງ, ຫ້ອງຢາ ແລະ ສາງອາຫານແຫ້ງ.",
    "image_url": "/images/jenstore-placeholders/stainless-steel-shelving-a032200006.jpg",
    "qty_on_hand": 18,
    "unit_price": 14200,
    "currency": "THB",
    "specs": {
      "Material": "Stainless Steel SUS304",
      "Shelves": "5 Wire Tiers",
      "Dimensions": "1500 x 450 x 1800 mm",
      "Load Capacity": "150 kg/tier"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 13490
      },
      {
        "min_qty": 10,
        "price": 12780
      },
      {
        "min_qty": 20,
        "price": 12070
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1005",
    "sku_code": "JNS-ST-1005",
    "barcode": "885110001098",
    "part_name": "Gas Cylinder Security Storage Cage - 2 Cylinders (Outdoor Lockable Mesh)",
    "part_name_lo": "ກົງເຫຼັກເກັບຖັງແກັສ 2 ຖັງ (ແບບມີຕາໜ່າງລັອກກຸນແຈ ປອດໄພ)",
    "category": "Storage System",
    "description": "Heavy duty outdoor steel cage for safely securing 2 large compressed gas cylinders with safety retaining chains and padlock hasp.",
    "description_lo": "ກົງເຫຼັກເກັບຖັງແກັສອຸດສາຫະກຳ 2 ຖັງ ພ້ອມໂສ້ລັອກກັນລົ້ມ ແລະ ຫູລັອກກຸນແຈ ໂຄງສ້າງເຫຼັກກາວາໄນສ໌ກັນສະໜິມ.",
    "image_url": "/images/jenstore-placeholders/gas-cylinder-storage-cage-f060600001_1_qnmggew5zwvqcpww.jpg",
    "qty_on_hand": 10,
    "unit_price": 7500,
    "currency": "THB",
    "specs": {
      "Capacity": "2 High Pressure Cylinders",
      "Safety Chain": "Dual Retaining Chains",
      "Finish": "Safety Yellow Powder Coat"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7125
      },
      {
        "min_qty": 10,
        "price": 6750
      },
      {
        "min_qty": 20,
        "price": 6375
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1006",
    "sku_code": "JNS-ST-1006",
    "barcode": "885110001099",
    "part_name": "Gas Cylinder Security Storage Cage - 4 Cylinders with Warning Signage",
    "part_name_lo": "ກົງເຫຼັກເກັບຖັງແກັສ 4 ຖັງ ພ້ອມປ້າຍເຕືອນໄພອັນຕະລາຍ",
    "category": "Storage System",
    "description": "Industrial lockable gas cylinder cage holding up to 4 cylinders with expanded steel mesh ventilation walls and OSHA safety signage.",
    "description_lo": "ກົງເຫຼັກເກັບຖັງແກັສ 4 ຖັງ ຝາຕາໜ່າງເຫຼັກຍືດລະບາຍອາກາດໄດ້ຮອບດ້ານ ປ້ອງກັນແກັສສະສົມ ພ້ອມປ້າຍເຕືອນ.",
    "image_url": "/images/jenstore-placeholders/gas-cylinder-storage-cage-f060600002_1_tiuflb1d4oangs1g.jpg",
    "qty_on_hand": 8,
    "unit_price": 10500,
    "currency": "THB",
    "specs": {
      "Capacity": "4 Compressed Gas Bottles",
      "Ventilation": "Expanded Metal Mesh",
      "Dimensions": "900 x 800 x 1800 mm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 9975
      },
      {
        "min_qty": 10,
        "price": 9450
      },
      {
        "min_qty": 20,
        "price": 8925
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1007",
    "sku_code": "JNS-ST-1007",
    "barcode": "885110001100",
    "part_name": "Gas Cylinder Security Storage Cage - 6 Cylinders with Ramp Entry",
    "part_name_lo": "ກົງເຫຼັກເກັບຖັງແກັສ 6 ຖັງ ພ້ອມທາງລາດເຂັນເຂົ້າ-ອອກສະດວກ",
    "category": "Storage System",
    "description": "Large capacity 6-bottle gas cage featuring built-in drop-down ramp for easily rolling heavy oxygen/acetylene tanks inside without lifting.",
    "description_lo": "ກົງເກັບຖັງແກັສ 6 ຖັງ ພ້ອມທາງລາດພັບເປີດ-ປິດ ຍູ້ຖັງແກັສໜັກເຂົ້າ-ອອກໄດ້ສະດວກ ໂດຍບໍ່ຕ້ອງຍົກ.",
    "image_url": "/images/jenstore-placeholders/gas-cylinder-storage-cage-f060600003_2_1ldomzvv0p6z9763.jpg",
    "qty_on_hand": 6,
    "unit_price": 14800,
    "currency": "THB",
    "specs": {
      "Capacity": "6 Industrial Cylinders",
      "Ramp": "Integrated Steel Ramp",
      "Dimensions": "1200 x 900 x 1800 mm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 14060
      },
      {
        "min_qty": 10,
        "price": 13320
      },
      {
        "min_qty": 20,
        "price": 12580
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1008",
    "sku_code": "JNS-ST-1008",
    "barcode": "885110001101",
    "part_name": "Flammable Liquids Safety Storage Cabinet 30 Gallon (Yellow - Double Door Manual)",
    "part_name_lo": "ຕູ້ເກັບສານເຄມີໄວໄຟ 30 ແກລອນ (ສີເຫຼືອງ ປະຕູຄູ່ ກັນໄຟມາດຕະຖານ FM/OSHA)",
    "category": "Storage System",
    "description": "Double-walled 18-gauge steel safety cabinet for flammable solvents and fuels. Features 1.5\" air insulating space, dual flame arrestor vents, and 3-point bullet lock.",
    "description_lo": "ຕູ້ເກັບສານເຄມີໄວໄຟ 30 ແກລອນ ເຫຼັກ 2 ຊັ້ນ ມີຊ່ອງວ່າງກັນຄວາມຮ້ອນ 1.5 ນິ້ວ ລະບົບລັອກ 3 ຈຸດ ປ້ອງກັນໄຟໄໝ້ຕາມມາດຕະຖານ OSHA/NFPA.",
    "image_url": "/images/jenstore-placeholders/hazardous-substance-storage-f060400037_2_uxxsheqw6xrjvfyh.jpg",
    "qty_on_hand": 8,
    "unit_price": 19500,
    "currency": "THB",
    "specs": {
      "Capacity": "30 Gallons (114 Liters)",
      "Certification": "FM / OSHA / NFPA",
      "Doors": "Double Manual",
      "Color": "Safety Yellow"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 18525
      },
      {
        "min_qty": 10,
        "price": 17550
      },
      {
        "min_qty": 20,
        "price": 16575
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1009",
    "sku_code": "JNS-ST-1009",
    "barcode": "885110001102",
    "part_name": "Corrosive Acid & Chemical Storage Cabinet 45 Gallon (Blue - Polyethylene Trays)",
    "part_name_lo": "ຕູ້ເກັບສານກັດກ່ອນ ແລະ ອາຊິດ 45 ແກລອນ (ສີຟ້າ ພ້ອມຖາດຮອງ PE ກັນກົດ)",
    "category": "Storage System",
    "description": "Dedicated safety cabinet for storing harsh acids and corrosives. Equipped with acid-resistant polyethylene shelf liner trays to contain accidental spills.",
    "description_lo": "ຕູ້ເກັບກົດ ແລະ ສານກັດກ່ອນ 45 ແກລອນ ສີຟ້າ ພ້ອມຖາດຮອງພລາສຕິກ Polyethylene ກັນນ້ຳກົດຮົ່ວໄຫຼ ທົນທານສູງ.",
    "image_url": "/images/jenstore-placeholders/hazardous-substance-storage-f060400038-3_cpqurbz4jihiq1sg.jpg",
    "qty_on_hand": 6,
    "unit_price": 24500,
    "currency": "THB",
    "specs": {
      "Capacity": "45 Gallons (170 Liters)",
      "Color": "Safety Blue",
      "Liners": "Acid-Resistant PE Trays",
      "Sump": "50mm Spill Sump"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 23275
      },
      {
        "min_qty": 10,
        "price": 22050
      },
      {
        "min_qty": 20,
        "price": 20825
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1010",
    "sku_code": "JNS-ST-1010",
    "barcode": "885110001103",
    "part_name": "Toxic Substance & Pesticide Safety Storage Cabinet 60 Gallon (Red - Heavy Capacity)",
    "part_name_lo": "ຕູ້ເກັບສານພິດ ແລະ ສານເຄມີອັນຕະລາຍ 60 ແກລອນ (ສີແດງ ຄວາມຈຸສູງ)",
    "category": "Storage System",
    "description": "Heavy 60-gallon industrial toxic substance security cabinet with adjustable spill-catcher galvanized shelves and earth grounding wire connector.",
    "description_lo": "ຕູ້ເກັບສານພິດ ແລະ ທາດເຄມີອັນຕະລາຍ 60 ແກລອນ ຊັ້ນວາງປັບລະດັບໄດ້ ພ້ອມສາຍຕໍ່ລົງດິນປ້ອງກັນໄຟຟ້າສະຖິດ.",
    "image_url": "/images/jenstore-placeholders/hazardous-substance-storage-f060400039_1_5ttmhmlqy8ojwjyn.jpg",
    "qty_on_hand": 5,
    "unit_price": 29800,
    "currency": "THB",
    "specs": {
      "Capacity": "60 Gallons (227 Liters)",
      "Shelves": "2 Galvanized Steel Shelves",
      "Grounding": "Built-in Grounding Connector"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 28310
      },
      {
        "min_qty": 10,
        "price": 26820
      },
      {
        "min_qty": 20,
        "price": 25330
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1011",
    "sku_code": "JNS-ST-1011",
    "barcode": "885110001104",
    "part_name": "MAXXAM Heavy Duty Steel Staff Locker Cabinet 6 Doors",
    "part_name_lo": "ຕູ້ລັອກເກີ້ເຫຼັກ MAXXAM 6 ຊ່ອງ ປະຕູດ່ຽວ ພ້ອມກະແຈ",
    "category": "Storage System",
    "description": "Cold-rolled steel staff locker cabinet with electrostatic anti-scratch powder coating, ventilation louvers, and name card holder on every door.",
    "description_lo": "ຕູ້ລັອກເກີ້ເຫຼັກພົ່ນສີກັນສະໜິມໄຟຟ້າສະຖິດ ມີຊ່ອງລະບາຍອາກາດ ແລະ ຊ່ອງສຽບປ້າຍຊື່ທຸກບານປະຕູ ແຂງແຮງ ປອດໄພ.",
    "image_url": "/images/jenstore-placeholders/product_OTkyOA_6a0bd5b0d6e86.webp",
    "qty_on_hand": 20,
    "unit_price": 5800,
    "currency": "THB",
    "specs": {
      "Compartments": "6 Lockers",
      "Dimensions": "W900 x D450 x H1850 mm",
      "Material": "0.7mm Cold-Rolled Steel",
      "Lock": "Cam Lock with 2 Keys"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 5510
      },
      {
        "min_qty": 10,
        "price": 5220
      },
      {
        "min_qty": 20,
        "price": 4930
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1012",
    "sku_code": "JNS-ST-1012",
    "barcode": "885110001105",
    "part_name": "MAXXAM Heavy Duty Steel Staff Locker Cabinet 9 Doors",
    "part_name_lo": "ຕູ້ລັອກເກີ້ເຫຼັກ MAXXAM 9 ຊ່ອງ (3 ແຖວ x 3 ຊັ້ນ)",
    "category": "Storage System",
    "description": "Cold-rolled steel staff locker cabinet with electrostatic anti-scratch powder coating, ventilation louvers, and name card holder on every door.",
    "description_lo": "ຕູ້ລັອກເກີ້ເຫຼັກພົ່ນສີກັນສະໜິມໄຟຟ້າສະຖິດ ມີຊ່ອງລະບາຍອາກາດ ແລະ ຊ່ອງສຽບປ້າຍຊື່ທຸກບານປະຕູ ແຂງແຮງ ປອດໄພ.",
    "image_url": "/images/jenstore-placeholders/product_OTkyOQ_6a0bd67669508.webp",
    "qty_on_hand": 20,
    "unit_price": 6900,
    "currency": "THB",
    "specs": {
      "Compartments": "9 Lockers",
      "Dimensions": "W900 x D450 x H1850 mm",
      "Material": "0.7mm Cold-Rolled Steel",
      "Lock": "Cam Lock with 2 Keys"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 6555
      },
      {
        "min_qty": 10,
        "price": 6210
      },
      {
        "min_qty": 20,
        "price": 5865
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1013",
    "sku_code": "JNS-ST-1013",
    "barcode": "885110001106",
    "part_name": "MAXXAM Heavy Duty Steel Staff Locker Cabinet 12 Doors",
    "part_name_lo": "ຕູ້ລັອກເກີ້ເຫຼັກ MAXXAM 12 ຊ່ອງ (3 ແຖວ x 4 ຊັ້ນ)",
    "category": "Storage System",
    "description": "Cold-rolled steel staff locker cabinet with electrostatic anti-scratch powder coating, ventilation louvers, and name card holder on every door.",
    "description_lo": "ຕູ້ລັອກເກີ້ເຫຼັກພົ່ນສີກັນສະໜິມໄຟຟ້າສະຖິດ ມີຊ່ອງລະບາຍອາກາດ ແລະ ຊ່ອງສຽບປ້າຍຊື່ທຸກບານປະຕູ ແຂງແຮງ ປອດໄພ.",
    "image_url": "/images/jenstore-placeholders/product_OTkzMA_6a0bd781972ca.webp",
    "qty_on_hand": 20,
    "unit_price": 7800,
    "currency": "THB",
    "specs": {
      "Compartments": "12 Lockers",
      "Dimensions": "W900 x D450 x H1850 mm",
      "Material": "0.7mm Cold-Rolled Steel",
      "Lock": "Cam Lock with 2 Keys"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7410
      },
      {
        "min_qty": 10,
        "price": 7020
      },
      {
        "min_qty": 20,
        "price": 6630
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1014",
    "sku_code": "JNS-ST-1014",
    "barcode": "885110001107",
    "part_name": "MAXXAM Heavy Duty Steel Staff Locker Cabinet 15 Doors",
    "part_name_lo": "ຕູ້ລັອກເກີ້ເຫຼັກ MAXXAM 15 ຊ່ອງ (3 ແຖວ x 5 ຊັ້ນ)",
    "category": "Storage System",
    "description": "Cold-rolled steel staff locker cabinet with electrostatic anti-scratch powder coating, ventilation louvers, and name card holder on every door.",
    "description_lo": "ຕູ້ລັອກເກີ້ເຫຼັກພົ່ນສີກັນສະໜິມໄຟຟ້າສະຖິດ ມີຊ່ອງລະບາຍອາກາດ ແລະ ຊ່ອງສຽບປ້າຍຊື່ທຸກບານປະຕູ ແຂງແຮງ ປອດໄພ.",
    "image_url": "/images/jenstore-placeholders/product_OTkzMQ_6a0bd7cfe6688.webp",
    "qty_on_hand": 20,
    "unit_price": 8600,
    "currency": "THB",
    "specs": {
      "Compartments": "15 Lockers",
      "Dimensions": "W900 x D450 x H1850 mm",
      "Material": "0.7mm Cold-Rolled Steel",
      "Lock": "Cam Lock with 2 Keys"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 8170
      },
      {
        "min_qty": 10,
        "price": 7740
      },
      {
        "min_qty": 20,
        "price": 7310
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1015",
    "sku_code": "JNS-ST-1015",
    "barcode": "885110001108",
    "part_name": "MAXXAM Heavy Duty Steel Staff Locker Cabinet 18 Doors",
    "part_name_lo": "ຕູ້ລັອກເກີ້ເຫຼັກ MAXXAM 18 ຊ່ອງ (3 ແຖວ x 6 ຊັ້ນ)",
    "category": "Storage System",
    "description": "Cold-rolled steel staff locker cabinet with electrostatic anti-scratch powder coating, ventilation louvers, and name card holder on every door.",
    "description_lo": "ຕູ້ລັອກເກີ້ເຫຼັກພົ່ນສີກັນສະໜິມໄຟຟ້າສະຖິດ ມີຊ່ອງລະບາຍອາກາດ ແລະ ຊ່ອງສຽບປ້າຍຊື່ທຸກບານປະຕູ ແຂງແຮງ ປອດໄພ.",
    "image_url": "/images/jenstore-placeholders/product_OTkzMg_6a0bd81f60c6b.webp",
    "qty_on_hand": 20,
    "unit_price": 9500,
    "currency": "THB",
    "specs": {
      "Compartments": "18 Lockers",
      "Dimensions": "W900 x D450 x H1850 mm",
      "Material": "0.7mm Cold-Rolled Steel",
      "Lock": "Cam Lock with 2 Keys"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 9025
      },
      {
        "min_qty": 10,
        "price": 8550
      },
      {
        "min_qty": 20,
        "price": 8075
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1016",
    "sku_code": "JNS-ST-1016",
    "barcode": "885110001109",
    "part_name": "MAXXAM Industrial Two-Door Steel Storage Cupboard with 4 Shelves",
    "part_name_lo": "ຕູ້ເຫຼັກເກັບເອກະສານ ແລະ ອຸປະກອນ 2 ປະຕູ MAXXAM (4 ຊັ້ນວາງ)",
    "category": "Storage System",
    "description": "Cold-rolled steel staff locker cabinet with electrostatic anti-scratch powder coating, ventilation louvers, and name card holder on every door.",
    "description_lo": "ຕູ້ລັອກເກີ້ເຫຼັກພົ່ນສີກັນສະໜິມໄຟຟ້າສະຖິດ ມີຊ່ອງລະບາຍອາກາດ ແລະ ຊ່ອງສຽບປ້າຍຊື່ທຸກບານປະຕູ ແຂງແຮງ ປອດໄພ.",
    "image_url": "/images/jenstore-placeholders/product_OTkzMw_6a0bd87c115f3.webp",
    "qty_on_hand": 20,
    "unit_price": 6200,
    "currency": "THB",
    "specs": {
      "Compartments": "Full Cupboard",
      "Dimensions": "W900 x D450 x H1850 mm",
      "Material": "0.7mm Cold-Rolled Steel",
      "Lock": "Cam Lock with 2 Keys"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 5890
      },
      {
        "min_qty": 10,
        "price": 5580
      },
      {
        "min_qty": 20,
        "price": 5270
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1017",
    "sku_code": "JNS-ST-1017",
    "barcode": "885110001110",
    "part_name": "MAXXAM Multi-Compartment Personal Belongings Steel Locker (Padlock Hasp)",
    "part_name_lo": "ຕູ້ລັອກເກີ້ຝາກເຄື່ອງສ່ວນຕົວ MAXXAM ຫູລັອກສຳລັບສາຍກຸນແຈ",
    "category": "Storage System",
    "description": "Cold-rolled steel staff locker cabinet with electrostatic anti-scratch powder coating, ventilation louvers, and name card holder on every door.",
    "description_lo": "ຕູ້ລັອກເກີ້ເຫຼັກພົ່ນສີກັນສະໜິມໄຟຟ້າສະຖິດ ມີຊ່ອງລະບາຍອາກາດ ແລະ ຊ່ອງສຽບປ້າຍຊື່ທຸກບານປະຕູ ແຂງແຮງ ປອດໄພ.",
    "image_url": "/images/jenstore-placeholders/product_OTkzNA_6a0bd96074359.webp",
    "qty_on_hand": 20,
    "unit_price": 8200,
    "currency": "THB",
    "specs": {
      "Compartments": "Multi-Compartment",
      "Dimensions": "W900 x D450 x H1850 mm",
      "Material": "0.7mm Cold-Rolled Steel",
      "Lock": "Cam Lock with 2 Keys"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7790
      },
      {
        "min_qty": 10,
        "price": 7380
      },
      {
        "min_qty": 20,
        "price": 6970
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1018",
    "sku_code": "JNS-ST-1018",
    "barcode": "885110001111",
    "part_name": "FLEXI Wall-Mounted Perforated Steel Pegboard Panel (900 x 450 mm)",
    "part_name_lo": "ແຜງເຫຼັກເຈາະຮູຕິດຝາ FLEXI Pegboard 900 x 450 ມມ",
    "category": "Storage System",
    "description": "Heavy gauge perforated steel pegboard panel with epoxy finish for hanging tools, wrenches, and workshop equipment.",
    "description_lo": "ແຜງເຫຼັກເຈາະຮູແຂວນເຄື່ອງມືຊ່າງ FLEXI ຕິດຝາ ຂະໜາດ 900x450 ມມ ເຄືອບສີ Epoxy ທົນຮອຍຂູດຂີດ.",
    "image_url": "/images/jenstore-placeholders/product_MTMyNjg_6a0550ff63f85.webp",
    "qty_on_hand": 50,
    "unit_price": 850,
    "currency": "THB",
    "specs": {
      "Dimensions": "900 x 450 mm",
      "Hole Pitch": "25.4 mm (1 Inch)",
      "Material": "Steel Sheet 1.2 mm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 808
      },
      {
        "min_qty": 10,
        "price": 765
      },
      {
        "min_qty": 20,
        "price": 722
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1019",
    "sku_code": "JNS-ST-1019",
    "barcode": "885110001112",
    "part_name": "FLEXI Multi-Tool Pegboard Hook & Bracket Assortment Kit (Set of 30 Pcs)",
    "part_name_lo": "ຊຸດຂໍແຂວນເຄື່ອງມື FLEXI Pegboard ຄົບຊຸດ (30 ຊິ້ນ)",
    "category": "Storage System",
    "description": "Comprehensive 30-piece zinc-plated steel hook set including single hooks, double hooks, pliers holders, and ring tool brackets.",
    "description_lo": "ຊຸດຂໍແຂວນເຄື່ອງມື 30 ຊິ້ນ ເຫຼັກຊຸບຊິງຄ໌ ມີຂໍດ່ຽວ, ຂໍຄູ່, ທີ່ແຂວນຄີມ ແລະ ທີ່ແຂວນກະແຈ ຄົບຊຸດ.",
    "image_url": "/images/jenstore-placeholders/product_MTMyNjk_6a05513deab8b.webp",
    "qty_on_hand": 70,
    "unit_price": 650,
    "currency": "THB",
    "specs": {
      "Quantity": "30 Pieces",
      "Finish": "Bright Zinc Plated",
      "Hook Types": "Single, Double, Ring, Plier Holders"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 618
      },
      {
        "min_qty": 10,
        "price": 585
      },
      {
        "min_qty": 20,
        "price": 552
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1020",
    "sku_code": "JNS-ST-1020",
    "barcode": "885110001113",
    "part_name": "FLEXI Wall-Mounted Louvered Panel for Hanging Storage Bins (900 x 450 mm)",
    "part_name_lo": "ແຜງເຫຼັກບານເກັດຕິດຝາ FLEXI ສຳລັບແຂວນກ່ອງອາໄຫຼ່ 900 x 450 ມມ",
    "category": "Storage System",
    "description": "Heavy steel louvered panel designed to securely mount plastic hanging parts bins and small component boxes.",
    "description_lo": "ແຜງເຫຼັກບານເກັດຕິດຝາສຳລັບແຂວນກ່ອງອາໄຫຼ່ພລາສຕິກ ເພີ່ມຄວາມເປັນລະບຽບໃນການຈັດເກັບນັອດ ແລະ ອຸປະກອນນ້ອຍ.",
    "image_url": "/images/jenstore-placeholders/product_MTMyNzA_6a055188746be.webp",
    "qty_on_hand": 45,
    "unit_price": 890,
    "currency": "THB",
    "specs": {
      "Dimensions": "900 x 450 mm",
      "Compatibility": "FLEXI / Standard Hanging Bins",
      "Finish": "Powder Coated"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 846
      },
      {
        "min_qty": 10,
        "price": 801
      },
      {
        "min_qty": 20,
        "price": 756
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1021",
    "sku_code": "JNS-ST-1021",
    "barcode": "885110001114",
    "part_name": "FLEXI Stackable & Hangable Plastic Parts Storage Bin - Size Small (Blue)",
    "part_name_lo": "ກ່ອງອາໄຫຼ່ພລາສຕິກ FLEXI ແຂວນ ແລະ ວາງຊ້ອນໄດ້ - ຂະໜາດນ້ອຍ (ສີຟ້າ)",
    "category": "Storage System",
    "description": "Durable polypropylene parts bin that stacks securely or hangs on louvered panels. Front label slot included.",
    "description_lo": "ກ່ອງອາໄຫຼ່ພລາສຕິກ PP ທົນທານ ວາງຊ້ອນກັນໄດ້ ຫຼື ແຂວນເທິງແຜງບານເກັດ ມີຊ່ອງສຽບປ້າຍບອກລາຍການ.",
    "image_url": "/images/jenstore-placeholders/product_MTMyODI_6a0551bde983c.webp",
    "qty_on_hand": 300,
    "unit_price": 45,
    "currency": "THB",
    "specs": {
      "Dimensions": "105 x 160 x 75 mm",
      "Material": "Virgin PP",
      "Color": "Blue"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 43
      },
      {
        "min_qty": 10,
        "price": 40
      },
      {
        "min_qty": 20,
        "price": 38
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1022",
    "sku_code": "JNS-ST-1022",
    "barcode": "885110001115",
    "part_name": "FLEXI Stackable & Hangable Plastic Parts Storage Bin - Size Medium (Blue)",
    "part_name_lo": "ກ່ອງອາໄຫຼ່ພລາສຕິກ FLEXI ແຂວນ ແລະ ວາງຊ້ອນໄດ້ - ຂະໜາດກາງ (ສີຟ້າ)",
    "category": "Storage System",
    "description": "Medium sized industrial storage bin for nuts, bolts, fittings, and electronic components.",
    "description_lo": "ກ່ອງອາໄຫຼ່ຂະໜາດກາງສຳລັບນັອດ, ແຫວນ, ຂໍ້ຕໍ່ ແລະ ອຸປະກອນຊ່າງ ຂອບໜາແຂງແຮງ.",
    "image_url": "/images/jenstore-placeholders/product_MTMyODc_6a0551f5653ba.webp",
    "qty_on_hand": 250,
    "unit_price": 75,
    "currency": "THB",
    "specs": {
      "Dimensions": "140 x 240 x 125 mm",
      "Material": "Virgin PP",
      "Load Capacity": "8 kg"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 71
      },
      {
        "min_qty": 10,
        "price": 68
      },
      {
        "min_qty": 20,
        "price": 64
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1023",
    "sku_code": "JNS-ST-1023",
    "barcode": "885110001116",
    "part_name": "FLEXI Stackable & Hangable Plastic Parts Storage Bin - Size Large (Blue)",
    "part_name_lo": "ກ່ອງອາໄຫຼ່ພລາສຕິກ FLEXI ແຂວນ ແລະ ວາງຊ້ອນໄດ້ - ຂະໜາດໃຫຍ່ (ສີຟ້າ)",
    "category": "Storage System",
    "description": "Large plastic parts container with wide front opening for easy hand access to bulk fasteners and machinery spares.",
    "description_lo": "ກ່ອງອາໄຫຼ່ຂະໜາດໃຫຍ່ ປາກກວ້າງ ຈົກເອົາເຄື່ອງມື ແລະ ອາໄຫຼ່ໄດ້ງ່າຍ ວາງຊ້ອນໄດ້ຫຼາຍຊັ້ນ.",
    "image_url": "/images/jenstore-placeholders/product_MTMyODg_6a05522e65785.webp",
    "qty_on_hand": 200,
    "unit_price": 120,
    "currency": "THB",
    "specs": {
      "Dimensions": "205 x 340 x 155 mm",
      "Material": "Virgin PP",
      "Load Capacity": "15 kg"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 114
      },
      {
        "min_qty": 10,
        "price": 108
      },
      {
        "min_qty": 20,
        "price": 102
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1024",
    "sku_code": "JNS-ST-1024",
    "barcode": "885110001117",
    "part_name": "FLEXI Heavy Tool Organizer Rail System with Adjustable Grip Clamps",
    "part_name_lo": "ຮາວແຂວນເຄື່ອງມືໜັກ FLEXI ພ້ອມກິບລັອກປັບລະດັບໄດ້",
    "category": "Storage System",
    "description": "Wall-mounted aluminum track with sliding rubberized clamp grips for holding heavy hammers, pipe wrenches, and power cords.",
    "description_lo": "ຮາວອາລູມີນຽມຕິດຝາ ພ້ອມກິບລັອກຢາງປັບເລື່ອນໄດ້ ສຳລັບແຂວນຄ້ອນຕີ, ກະແຈທໍ່ ແລະ ອຸປະກອນໜັກ.",
    "image_url": "/images/jenstore-placeholders/product_MTMzMzI_677e4dcbb66e8.webp",
    "qty_on_hand": 35,
    "unit_price": 950,
    "currency": "THB",
    "specs": {
      "Length": "1000 mm",
      "Track": "Anodized Aluminum",
      "Clamps": "5 Heavy Rubber Clamps"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 902
      },
      {
        "min_qty": 10,
        "price": 855
      },
      {
        "min_qty": 20,
        "price": 808
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1025",
    "sku_code": "JNS-ST-1025",
    "barcode": "885110001118",
    "part_name": "FLEXI Wall Mount Power Tool Charger & Battery Storage Rack",
    "part_name_lo": "ຊັ້ນວາງເຄື່ອງສາກ ແລະ ແບັດເຕີຣີເຄື່ອງມືໄຟຟ້າຕິດຝາ FLEXI",
    "category": "Storage System",
    "description": "Dedicated wall storage rack with slots for hanging cordless drills, impact drivers, and battery chargers.",
    "description_lo": "ຊັ້ນເຫຼັກຕິດຝາສຳລັບແຂວນສະຫວ່ານໄຮ້ສາຍ, ໄຂຄວງກະແທກ ແລະ ວາງແທ່ນສາກແບັດເຕີຣີຢ່າງເປັນລະບຽບ.",
    "image_url": "/images/jenstore-placeholders/product_MTMzMzM_677e4e05bf61b.webp",
    "qty_on_hand": 30,
    "unit_price": 1350,
    "currency": "THB",
    "specs": {
      "Slots": "4 Power Tool Slots",
      "Top Shelf": "For Multi-Bay Charger",
      "Material": "Powder Coated Steel"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1282
      },
      {
        "min_qty": 10,
        "price": 1215
      },
      {
        "min_qty": 20,
        "price": 1148
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1026",
    "sku_code": "JNS-ST-1026",
    "barcode": "885110001119",
    "part_name": "FLEXI Complete Wall Storage System with Shelves & Bins (Full Workshop Station)",
    "part_name_lo": "ລະບົບແຜງຈັດເກັບອຸປະກອນຕິດຝາຄົບຊຸດ FLEXI (ຊັ້ນວາງ + ກ່ອງອາໄຫຼ່ + ຂໍແຂວນ)",
    "category": "Storage System",
    "description": "Complete modular wall storage workstation kit including pegboards, louvered panels, 16 parts bins, and 20 tool hooks.",
    "description_lo": "ຊຸດແຜງຈັດເກັບອຸປະກອນຕິດຝາຄົບຊຸດ ປະກອບດ້ວຍ pegboard, ແຜງບານເກັດ, ກ່ອງອາໄຫຼ່ 16 ອັນ ແລະ ຂໍແຂວນ 20 ອັນ.",
    "image_url": "/images/jenstore-placeholders/flexi-flexi-wall-mounted-storage-system-d030400009_uapgny8kb9mk3spb.jpg",
    "qty_on_hand": 15,
    "unit_price": 4200,
    "currency": "THB",
    "specs": {
      "Coverage": "1800 x 900 mm",
      "Includes": "Panels, Shelves, 16 Bins, 20 Hooks",
      "System": "FLEXI Modular"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3990
      },
      {
        "min_qty": 10,
        "price": 3780
      },
      {
        "min_qty": 20,
        "price": 3570
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1027",
    "sku_code": "JNS-ST-1027",
    "barcode": "885110001120",
    "part_name": "FLEXI Workshop Wall Organizer Rack with Magnetic Tool Holding Bar",
    "part_name_lo": "ຮາວຈັດເກັບເຄື່ອງມືຊ່າງ FLEXI ພ້ອມແຖບແມ່ເຫຼັກດູດແໜ້ນ",
    "category": "Storage System",
    "description": "Heavy duty tool holder rail combined with powerful dual neodymium magnetic bars for instant tool attachment.",
    "description_lo": "ຮາວຈັດເກັບເຄື່ອງມືຊ່າງ ພ້ອມແຖບແມ່ເຫຼັກພະລັງສູງ ດູດຕິດກະແຈ ແລະ ໄຂຄວງໄດ້ແໜ້ນ ຢິບໃຊ້ສະດວກ.",
    "image_url": "/images/jenstore-placeholders/flexi-flexi-wall-mounted-storage-system-d030400016_eu4rftfayrpah5gy.jpg",
    "qty_on_hand": 40,
    "unit_price": 1100,
    "currency": "THB",
    "specs": {
      "Length": "600 mm",
      "Magnetic Pull": "Strong Neodymium",
      "Finish": "Epoxy Black"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1045
      },
      {
        "min_qty": 10,
        "price": 990
      },
      {
        "min_qty": 20,
        "price": 935
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1028",
    "sku_code": "JNS-ST-1028",
    "barcode": "885110001121",
    "part_name": "Heavy Duty Workshop Mobile Service Cart with Flip-Top Locking Lid - D0206",
    "part_name_lo": "ລົດເຂັນເຄື່ອງມືຊ່າງພ້ອມຝາປິດລັອກໄດ້ Flip-Top JUMBO D0206",
    "category": "Storage System",
    "description": "Mobile service cart with gas-strut flip-top lid that locks to secure diagnostic laptops and expensive precision tools.",
    "description_lo": "ລົດເຂັນເຄື່ອງມືຊ່າງພ້ອມຝາປິດເທິງມີໂຊ໊ກໄຮໂດຣລິກ ແລະ ລະບົບລັອກກະແຈ ສຳລັບເກັບຄອມພິວເຕີກວດເຊັກ ແລະ ເຄື່ອງມືພິເສດ.",
    "image_url": "/images/jenstore-placeholders/workshop-cart-with-flip-top-locking-lid-d020600029.jpg",
    "qty_on_hand": 20,
    "unit_price": 5400,
    "currency": "THB",
    "specs": {
      "Capacity": "200 kg",
      "Top": "Gas-Strut Flip Top with Lock",
      "Wheels": "100mm Swivel with Brake"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 5130
      },
      {
        "min_qty": 10,
        "price": 4860
      },
      {
        "min_qty": 20,
        "price": 4590
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1029",
    "sku_code": "JNS-ST-1029",
    "barcode": "885110001122",
    "part_name": "Heavy Duty Selective Pallet Racking Beam (L2700 mm Capacity 2500 kg/pair)",
    "part_name_lo": "ຄານວາງພາເລດໜັກ Selective Pallet Rack 2700 ມມ (ຮັບນ້ຳໜັກ 2.5 ໂຕນ/ຊັ້ນ)",
    "category": "Storage System",
    "description": "Industrial storage solution type Heavy Beam engineered for heavy warehousing logistics with certified 2500 kg/pair load capacity.",
    "description_lo": "ອຸປະກອນຈັດເກັບສາງສິນຄ້າປະເພດ Heavy Beam ມາດຕະຖານອຸດສາຫະກຳ ຮັບນ້ຳໜັກໄດ້ 2500 kg/pair ແຂງແຮງ ປອດໄພສູງສຸດ.",
    "image_url": "/images/catalog/real/pallet_racking_beam.jpg",
    "qty_on_hand": 20,
    "unit_price": 2650,
    "currency": "THB",
    "specs": {
      "Type": "Heavy Beam",
      "Load Rating": "2500 kg/pair",
      "Finish": "Industrial Epoxy / Galvanized"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2518
      },
      {
        "min_qty": 10,
        "price": 2385
      },
      {
        "min_qty": 20,
        "price": 2252
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1030",
    "sku_code": "JNS-ST-1030",
    "barcode": "885110001123",
    "part_name": "Heavy Duty Pallet Racking Upright Frame (H4500 x D1000 mm 10-Ton Rating)",
    "part_name_lo": "ເສົາໂຄງຊັ້ນວາງພາເລດ Pallet Rack ສູງ 4.5 ແມັດ (ຮັບນ້ຳໜັກ 10 ໂຕນ)",
    "category": "Storage System",
    "description": "Industrial storage solution type Upright Frame engineered for heavy warehousing logistics with certified 10,000 kg load capacity.",
    "description_lo": "ອຸປະກອນຈັດເກັບສາງສິນຄ້າປະເພດ Upright Frame ມາດຕະຖານອຸດສາຫະກຳ ຮັບນ້ຳໜັກໄດ້ 10,000 kg ແຂງແຮງ ປອດໄພສູງສຸດ.",
    "image_url": "/images/catalog/real/pallet_racking_beam.jpg",
    "qty_on_hand": 20,
    "unit_price": 4800,
    "currency": "THB",
    "specs": {
      "Type": "Upright Frame",
      "Load Rating": "10,000 kg",
      "Finish": "Industrial Epoxy / Galvanized"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 4560
      },
      {
        "min_qty": 10,
        "price": 4320
      },
      {
        "min_qty": 20,
        "price": 4080
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1031",
    "sku_code": "JNS-ST-1031",
    "barcode": "885110001124",
    "part_name": "Galvanized Wire Mesh Decking Panel for Pallet Rack (1000 x 1350 mm)",
    "part_name_lo": "ແຜ່ນຕະແກງເຫຼັກຊຸບກາວາໄນສ໌ປູພື້ນຊັ້ນວາງພາເລດ (1000 x 1350 ມມ)",
    "category": "Storage System",
    "description": "Industrial storage solution type Wire Decking engineered for heavy warehousing logistics with certified 1000 kg/panel load capacity.",
    "description_lo": "ອຸປະກອນຈັດເກັບສາງສິນຄ້າປະເພດ Wire Decking ມາດຕະຖານອຸດສາຫະກຳ ຮັບນ້ຳໜັກໄດ້ 1000 kg/panel ແຂງແຮງ ປອດໄພສູງສຸດ.",
    "image_url": "/images/catalog/real/pallet_racking_beam.jpg",
    "qty_on_hand": 20,
    "unit_price": 950,
    "currency": "THB",
    "specs": {
      "Type": "Wire Decking",
      "Load Rating": "1000 kg/panel",
      "Finish": "Industrial Epoxy / Galvanized"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 902
      },
      {
        "min_qty": 10,
        "price": 855
      },
      {
        "min_qty": 20,
        "price": 808
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1032",
    "sku_code": "JNS-ST-1032",
    "barcode": "885110001125",
    "part_name": "Medium Duty Warehouse Longspan Shelving Unit (W2000 x D600 x H2000 mm 4 Tiers)",
    "part_name_lo": "ຊັ້ນວາງສາງຂະໜາດກາງ Longspan 4 ຊັ້ນ (ຮັບນ້ຳໜັກ 300 ກິໂລ/ຊັ້ນ)",
    "category": "Storage System",
    "description": "Industrial storage solution type Longspan Shelving engineered for heavy warehousing logistics with certified 300 kg/tier load capacity.",
    "description_lo": "ອຸປະກອນຈັດເກັບສາງສິນຄ້າປະເພດ Longspan Shelving ມາດຕະຖານອຸດສາຫະກຳ ຮັບນ້ຳໜັກໄດ້ 300 kg/tier ແຂງແຮງ ປອດໄພສູງສຸດ.",
    "image_url": "/images/catalog/real/longspan_shelving_unit.jpg",
    "qty_on_hand": 20,
    "unit_price": 5200,
    "currency": "THB",
    "specs": {
      "Type": "Longspan Shelving",
      "Load Rating": "300 kg/tier",
      "Finish": "Industrial Epoxy / Galvanized"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 4940
      },
      {
        "min_qty": 10,
        "price": 4680
      },
      {
        "min_qty": 20,
        "price": 4420
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1033",
    "sku_code": "JNS-ST-1033",
    "barcode": "885110001126",
    "part_name": "Boltless Steel Utility Shelving Rack (W1000 x D400 x H1800 mm 5 Tiers)",
    "part_name_lo": "ຊັ້ນວາງເຫຼັກອະເນກປະສົງບໍ່ໃຊ້ນັອດ 5 ຊັ້ນ (ປະກອບງ່າຍ)",
    "category": "Storage System",
    "description": "Industrial storage solution type Boltless Rack engineered for heavy warehousing logistics with certified 100 kg/tier load capacity.",
    "description_lo": "ອຸປະກອນຈັດເກັບສາງສິນຄ້າປະເພດ Boltless Rack ມາດຕະຖານອຸດສາຫະກຳ ຮັບນ້ຳໜັກໄດ້ 100 kg/tier ແຂງແຮງ ປອດໄພສູງສຸດ.",
    "image_url": "/images/catalog/real/longspan_shelving_unit.jpg",
    "qty_on_hand": 20,
    "unit_price": 1850,
    "currency": "THB",
    "specs": {
      "Type": "Boltless Rack",
      "Load Rating": "100 kg/tier",
      "Finish": "Industrial Epoxy / Galvanized"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1758
      },
      {
        "min_qty": 10,
        "price": 1665
      },
      {
        "min_qty": 20,
        "price": 1572
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1034",
    "sku_code": "JNS-ST-1034",
    "barcode": "885110001127",
    "part_name": "Heavy Duty Cantilever Storage Rack Single Sided (for Pipes & Long Steel Bars)",
    "part_name_lo": "ຊັ້ນວາງເຫຼັກທໍ່ ແລະ ໄມ້ຍາວ Cantilever Rack ແຂນຍື່ນດ່ຽວ",
    "category": "Storage System",
    "description": "Industrial storage solution type Cantilever Single engineered for heavy warehousing logistics with certified 2000 kg/arm load capacity.",
    "description_lo": "ອຸປະກອນຈັດເກັບສາງສິນຄ້າປະເພດ Cantilever Single ມາດຕະຖານອຸດສາຫະກຳ ຮັບນ້ຳໜັກໄດ້ 2000 kg/arm ແຂງແຮງ ປອດໄພສູງສຸດ.",
    "image_url": "/images/catalog/real/cantilever_storage_rack.jpg",
    "qty_on_hand": 20,
    "unit_price": 14500,
    "currency": "THB",
    "specs": {
      "Type": "Cantilever Single",
      "Load Rating": "2000 kg/arm",
      "Finish": "Industrial Epoxy / Galvanized"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 13775
      },
      {
        "min_qty": 10,
        "price": 13050
      },
      {
        "min_qty": 20,
        "price": 12325
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1035",
    "sku_code": "JNS-ST-1035",
    "barcode": "885110001128",
    "part_name": "Heavy Duty Cantilever Storage Rack Double Sided (High Storage Density)",
    "part_name_lo": "ຊັ້ນວາງເຫຼັກທໍ່ Cantilever Rack ແຂນຍື່ນຄູ່ 2 ດ້ານ",
    "category": "Storage System",
    "description": "Industrial storage solution type Cantilever Double engineered for heavy warehousing logistics with certified 4000 kg/column load capacity.",
    "description_lo": "ອຸປະກອນຈັດເກັບສາງສິນຄ້າປະເພດ Cantilever Double ມາດຕະຖານອຸດສາຫະກຳ ຮັບນ້ຳໜັກໄດ້ 4000 kg/column ແຂງແຮງ ປອດໄພສູງສຸດ.",
    "image_url": "/images/catalog/real/cantilever_storage_rack.jpg",
    "qty_on_hand": 20,
    "unit_price": 21500,
    "currency": "THB",
    "specs": {
      "Type": "Cantilever Double",
      "Load Rating": "4000 kg/column",
      "Finish": "Industrial Epoxy / Galvanized"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 20425
      },
      {
        "min_qty": 10,
        "price": 19350
      },
      {
        "min_qty": 20,
        "price": 18275
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1036",
    "sku_code": "JNS-ST-1036",
    "barcode": "885110001129",
    "part_name": "Collapsible Steel Wire Mesh Pallet Cage (1200 x 1000 x 890 mm 1500 kg)",
    "part_name_lo": "ກະບະກົງເຫຼັກຕາໜ່າງພັບໄດ້ ສຳລັບສາງສິນຄ້າ (1.5 ໂຕນ ວາງຊ້ອນໄດ້)",
    "category": "Storage System",
    "description": "Industrial storage solution type Mesh Pallet Cage engineered for heavy warehousing logistics with certified 1500 kg load capacity.",
    "description_lo": "ອຸປະກອນຈັດເກັບສາງສິນຄ້າປະເພດ Mesh Pallet Cage ມາດຕະຖານອຸດສາຫະກຳ ຮັບນ້ຳໜັກໄດ້ 1500 kg ແຂງແຮງ ປອດໄພສູງສຸດ.",
    "image_url": "/images/jenstore-placeholders/gas-cylinder-storage-cage-f060600001_1_qnmggew5zwvqcpww.jpg",
    "qty_on_hand": 20,
    "unit_price": 3800,
    "currency": "THB",
    "specs": {
      "Type": "Mesh Pallet Cage",
      "Load Rating": "1500 kg",
      "Finish": "Industrial Epoxy / Galvanized"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3610
      },
      {
        "min_qty": 10,
        "price": 3420
      },
      {
        "min_qty": 20,
        "price": 3230
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1037",
    "sku_code": "JNS-ST-1037",
    "barcode": "885110001130",
    "part_name": "Heavy Duty Plastic Industrial Pallet 1200 x 1000 mm (Racking Grade 1.2 Ton)",
    "part_name_lo": "ພາເລດພລາສຕິກອຸດສາຫະກຳ 1200 x 1000 ມມ (ສຳລັບຂຶ້ນຊັ້ນວາງ 1.2 ໂຕນ)",
    "category": "Storage System",
    "description": "Industrial storage solution type Plastic Pallet engineered for heavy warehousing logistics with certified 1200 kg Rack / 4000 kg Static load capacity.",
    "description_lo": "ອຸປະກອນຈັດເກັບສາງສິນຄ້າປະເພດ Plastic Pallet ມາດຕະຖານອຸດສາຫະກຳ ຮັບນ້ຳໜັກໄດ້ 1200 kg Rack / 4000 kg Static ແຂງແຮງ ປອດໄພສູງສຸດ.",
    "image_url": "/images/catalog/real/heavy_duty_plastic_pallet.jpg",
    "qty_on_hand": 20,
    "unit_price": 1450,
    "currency": "THB",
    "specs": {
      "Type": "Plastic Pallet",
      "Load Rating": "1200 kg Rack / 4000 kg Static",
      "Finish": "Industrial Epoxy / Galvanized"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1378
      },
      {
        "min_qty": 10,
        "price": 1305
      },
      {
        "min_qty": 20,
        "price": 1232
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1038",
    "sku_code": "JNS-ST-1038",
    "barcode": "885110001131",
    "part_name": "Industrial Spill Containment Pallet for 4 Oil Drums (Yellow Sump with Drain)",
    "part_name_lo": "ພາເລດກັນນ້ຳມັນຮົ່ວໄຫຼ 4 ຖັງ (ສີເຫຼືອງ ພ້ອມວາວລະບາຍ)",
    "category": "Storage System",
    "description": "Industrial storage solution type Spill Pallet 4-Drum engineered for heavy warehousing logistics with certified 250 Liters Sump load capacity.",
    "description_lo": "ອຸປະກອນຈັດເກັບສາງສິນຄ້າປະເພດ Spill Pallet 4-Drum ມາດຕະຖານອຸດສາຫະກຳ ຮັບນ້ຳໜັກໄດ້ 250 Liters Sump ແຂງແຮງ ປອດໄພສູງສຸດ.",
    "image_url": "/images/catalog/real/drum_spill_pallet.jpg",
    "qty_on_hand": 20,
    "unit_price": 7200,
    "currency": "THB",
    "specs": {
      "Type": "Spill Pallet 4-Drum",
      "Load Rating": "250 Liters Sump",
      "Finish": "Industrial Epoxy / Galvanized"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 6840
      },
      {
        "min_qty": 10,
        "price": 6480
      },
      {
        "min_qty": 20,
        "price": 6120
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1039",
    "sku_code": "JNS-ST-1039",
    "barcode": "885110001132",
    "part_name": "Mobile Wire Mesh Order Sorting Cart with 12 Compartments",
    "part_name_lo": "ລົດເຂັນຕະແກງຄັດແຍກສິນຄ້າ 12 ຊ່ອງ ພ້ອມລໍ້ເລື່ອນ",
    "category": "Storage System",
    "description": "Industrial storage solution type Sorting Cart engineered for heavy warehousing logistics with certified 250 kg load capacity.",
    "description_lo": "ອຸປະກອນຈັດເກັບສາງສິນຄ້າປະເພດ Sorting Cart ມາດຕະຖານອຸດສາຫະກຳ ຮັບນ້ຳໜັກໄດ້ 250 kg ແຂງແຮງ ປອດໄພສູງສຸດ.",
    "image_url": "/images/jenstore-placeholders/workshop-cart-with-flip-top-locking-lid-d020600029.jpg",
    "qty_on_hand": 20,
    "unit_price": 4900,
    "currency": "THB",
    "specs": {
      "Type": "Sorting Cart",
      "Load Rating": "250 kg",
      "Finish": "Industrial Epoxy / Galvanized"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 4655
      },
      {
        "min_qty": 10,
        "price": 4410
      },
      {
        "min_qty": 20,
        "price": 4165
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-st-1040",
    "sku_code": "JNS-ST-1040",
    "barcode": "885110001133",
    "part_name": "Modular Multi-Drawer Small Component Storage Cabinet 40 Drawers",
    "part_name_lo": "ຕູ້ລິ້ນຊັກເກັບອາໄຫຼ່ນ້ອຍ 40 ຊ່ອງ (ໂຄງເຫຼັກ ລິ້ນຊັກໃສ)",
    "category": "Storage System",
    "description": "Industrial storage solution type 40-Drawer Cabinet engineered for heavy warehousing logistics with certified 40 Drawers load capacity.",
    "description_lo": "ອຸປະກອນຈັດເກັບສາງສິນຄ້າປະເພດ 40-Drawer Cabinet ມາດຕະຖານອຸດສາຫະກຳ ຮັບນ້ຳໜັກໄດ້ 40 Drawers ແຂງແຮງ ປອດໄພສູງສຸດ.",
    "image_url": "/images/catalog/real/steel_key_cabinet.jpg",
    "qty_on_hand": 20,
    "unit_price": 3600,
    "currency": "THB",
    "specs": {
      "Type": "40-Drawer Cabinet",
      "Load Rating": "40 Drawers",
      "Finish": "Industrial Epoxy / Galvanized"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3420
      },
      {
        "min_qty": 10,
        "price": 3240
      },
      {
        "min_qty": 20,
        "price": 3060
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1001",
    "sku_code": "JNS-TL-1001",
    "barcode": "885110001134",
    "part_name": "TOOLMAX 7-Drawer Heavy Duty Roller Tool Cabinet (Red - Ball Bearing Slides)",
    "part_name_lo": "ຕູ້ເຄື່ອງມືຊ່າງ 7 ລິ້ນຊັກ TOOLMAX ຕິດລໍ້ (ສີແດງ ລາງລູກປືນໜັກ)",
    "category": "Hand Tools",
    "description": "Professional workshop tool cabinet with full extension ball bearing drawer slides (45kg capacity per drawer), central tumbler lock, and heavy duty swivel casters with brake.",
    "description_lo": "ຕູ້ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ລິ້ນຊັກລາງລູກປືນດຶງອອກໄດ້ເຕັມ (ຮັບນ້ຳໜັກ 45 ກິໂລ/ລິ້ນຊັກ) ລະບົບລັອກສູນກາງ ພ້ອມລໍ້ໝູນມີເບກ.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 15,
    "unit_price": 14500,
    "currency": "THB",
    "specs": {
      "Drawers": "7 Drawers",
      "Dimensions": "W680 x D460 x H995 mm",
      "Color": "Red",
      "Drawer Rating": "45 kg/drawer",
      "Locking": "Central Key Lock"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 13775
      },
      {
        "min_qty": 10,
        "price": 13050
      },
      {
        "min_qty": 20,
        "price": 12325
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1002",
    "sku_code": "JNS-TL-1002",
    "barcode": "885110001135",
    "part_name": "TOOLMAX 7-Drawer Heavy Duty Roller Tool Cabinet (Blue - Ball Bearing Slides)",
    "part_name_lo": "ຕູ້ເຄື່ອງມືຊ່າງ 7 ລິ້ນຊັກ TOOLMAX ຕິດລໍ້ (ສີຟ້າ ລາງລູກປືນໜັກ)",
    "category": "Hand Tools",
    "description": "Professional workshop tool cabinet with full extension ball bearing drawer slides (45kg capacity per drawer), central tumbler lock, and heavy duty swivel casters with brake.",
    "description_lo": "ຕູ້ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ລິ້ນຊັກລາງລູກປືນດຶງອອກໄດ້ເຕັມ (ຮັບນ້ຳໜັກ 45 ກິໂລ/ລິ້ນຊັກ) ລະບົບລັອກສູນກາງ ພ້ອມລໍ້ໝູນມີເບກ.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODQ_69c0fd3e9876c.webp",
    "qty_on_hand": 15,
    "unit_price": 14500,
    "currency": "THB",
    "specs": {
      "Drawers": "7 Drawers",
      "Dimensions": "W680 x D460 x H995 mm",
      "Color": "Blue",
      "Drawer Rating": "45 kg/drawer",
      "Locking": "Central Key Lock"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 13775
      },
      {
        "min_qty": 10,
        "price": 13050
      },
      {
        "min_qty": 20,
        "price": 12325
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1003",
    "sku_code": "JNS-TL-1003",
    "barcode": "885110001136",
    "part_name": "TOOLMAX 7-Drawer Roller Tool Cabinet with Side Lockable Locker Door",
    "part_name_lo": "ຕູ້ເຄື່ອງມືຊ່າງ 7 ລິ້ນຊັກ TOOLMAX ພ້ອມຕູ້ລັອກດ້ານຂ້າງ",
    "category": "Hand Tools",
    "description": "Professional workshop tool cabinet with full extension ball bearing drawer slides (45kg capacity per drawer), central tumbler lock, and heavy duty swivel casters with brake.",
    "description_lo": "ຕູ້ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ລິ້ນຊັກລາງລູກປືນດຶງອອກໄດ້ເຕັມ (ຮັບນ້ຳໜັກ 45 ກິໂລ/ລິ້ນຊັກ) ລະບົບລັອກສູນກາງ ພ້ອມລໍ້ໝູນມີເບກ.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODU_69c0fef28c31a.webp",
    "qty_on_hand": 15,
    "unit_price": 18500,
    "currency": "THB",
    "specs": {
      "Drawers": "7 Drawers + Side Locker",
      "Dimensions": "W880 x D460 x H995 mm",
      "Color": "Black/Red",
      "Drawer Rating": "45 kg/drawer",
      "Locking": "Central Key Lock"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 17575
      },
      {
        "min_qty": 10,
        "price": 16650
      },
      {
        "min_qty": 20,
        "price": 15725
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1004",
    "sku_code": "JNS-TL-1004",
    "barcode": "885110001137",
    "part_name": "TOOLMAX 5-Drawer Mobile Tool Chest with Quick-Lock Drawer Catches",
    "part_name_lo": "ຕູ້ເຄື່ອງມືຊ່າງ 5 ລິ້ນຊັກ TOOLMAX ແບບເຄື່ອນທີ່ ພ້ອມລະບົບລັອກອັດຕະໂນມັດ",
    "category": "Hand Tools",
    "description": "Professional workshop tool cabinet with full extension ball bearing drawer slides (45kg capacity per drawer), central tumbler lock, and heavy duty swivel casters with brake.",
    "description_lo": "ຕູ້ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ລິ້ນຊັກລາງລູກປືນດຶງອອກໄດ້ເຕັມ (ຮັບນ້ຳໜັກ 45 ກິໂລ/ລິ້ນຊັກ) ລະບົບລັອກສູນກາງ ພ້ອມລໍ້ໝູນມີເບກ.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODY_69c0dc602909d.webp",
    "qty_on_hand": 15,
    "unit_price": 11500,
    "currency": "THB",
    "specs": {
      "Drawers": "5 Drawers",
      "Dimensions": "W680 x D460 x H820 mm",
      "Color": "Red",
      "Drawer Rating": "45 kg/drawer",
      "Locking": "Central Key Lock"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 10925
      },
      {
        "min_qty": 10,
        "price": 10350
      },
      {
        "min_qty": 20,
        "price": 9775
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1005",
    "sku_code": "JNS-TL-1005",
    "barcode": "885110001138",
    "part_name": "TOOLMAX Workshop Roller Tool Cabinet 7-Drawer with Top Tray Organizer",
    "part_name_lo": "ຕູ້ເຄື່ອງມືຊ່າງ 7 ລິ້ນຊັກ TOOLMAX ພ້ອມຖາດວາງເຄື່ອງມືດ້ານເທິງ",
    "category": "Hand Tools",
    "description": "Professional workshop tool cabinet with full extension ball bearing drawer slides (45kg capacity per drawer), central tumbler lock, and heavy duty swivel casters with brake.",
    "description_lo": "ຕູ້ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ລິ້ນຊັກລາງລູກປືນດຶງອອກໄດ້ເຕັມ (ຮັບນ້ຳໜັກ 45 ກິໂລ/ລິ້ນຊັກ) ລະບົບລັອກສູນກາງ ພ້ອມລໍ້ໝູນມີເບກ.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODc_69c0ddc15313e.webp",
    "qty_on_hand": 15,
    "unit_price": 15200,
    "currency": "THB",
    "specs": {
      "Drawers": "7 Drawers + Top Tray",
      "Dimensions": "W680 x D460 x H1020 mm",
      "Color": "Blue",
      "Drawer Rating": "45 kg/drawer",
      "Locking": "Central Key Lock"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 14440
      },
      {
        "min_qty": 10,
        "price": 13680
      },
      {
        "min_qty": 20,
        "price": 12920
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1006",
    "sku_code": "JNS-TL-1006",
    "barcode": "885110001139",
    "part_name": "TOOLMAX Mobile Workstation Tool Trolley with Solid Hardwood Worktop",
    "part_name_lo": "ໂຕະເຮັດວຽກຊ່າງຕິດລໍ້ TOOLMAX ໜ້າໄມ້ແຂງແທ້ ພ້ອມລິ້ນຊັກເກັບເຄື່ອງ",
    "category": "Hand Tools",
    "description": "Professional workshop tool cabinet with full extension ball bearing drawer slides (45kg capacity per drawer), central tumbler lock, and heavy duty swivel casters with brake.",
    "description_lo": "ຕູ້ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ລິ້ນຊັກລາງລູກປືນດຶງອອກໄດ້ເຕັມ (ຮັບນ້ຳໜັກ 45 ກິໂລ/ລິ້ນຊັກ) ລະບົບລັອກສູນກາງ ພ້ອມລໍ້ໝູນມີເບກ.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODk_69c0eaa6cd5b1.webp",
    "qty_on_hand": 15,
    "unit_price": 22500,
    "currency": "THB",
    "specs": {
      "Drawers": "Multi-Drawer Workstation",
      "Dimensions": "W1150 x D500 x H950 mm",
      "Color": "Industrial Grey",
      "Drawer Rating": "45 kg/drawer",
      "Locking": "Central Key Lock"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 21375
      },
      {
        "min_qty": 10,
        "price": 20250
      },
      {
        "min_qty": 20,
        "price": 19125
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1007",
    "sku_code": "JNS-TL-1007",
    "barcode": "885110001140",
    "part_name": "TOOLMAX Compact 4-Drawer Service Tool Trolley for Automotive Repair",
    "part_name_lo": "ລົດເຂັນເຄື່ອງມືຊ່າງ 4 ລິ້ນຊັກ TOOLMAX ຂະໜາດກະທັດຮັດ ສຳລັບອູ່ສ້ອມແປງ",
    "category": "Hand Tools",
    "description": "Professional workshop tool cabinet with full extension ball bearing drawer slides (45kg capacity per drawer), central tumbler lock, and heavy duty swivel casters with brake.",
    "description_lo": "ຕູ້ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ລິ້ນຊັກລາງລູກປືນດຶງອອກໄດ້ເຕັມ (ຮັບນ້ຳໜັກ 45 ກິໂລ/ລິ້ນຊັກ) ລະບົບລັອກສູນກາງ ພ້ອມລໍ້ໝູນມີເບກ.",
    "image_url": "/images/jenstore-placeholders/product_MTMwOTA_69c0ef2d756b9.webp",
    "qty_on_hand": 15,
    "unit_price": 8900,
    "currency": "THB",
    "specs": {
      "Drawers": "4 Drawers",
      "Dimensions": "W620 x D400 x H850 mm",
      "Color": "Red",
      "Drawer Rating": "45 kg/drawer",
      "Locking": "Central Key Lock"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 8455
      },
      {
        "min_qty": 10,
        "price": 8010
      },
      {
        "min_qty": 20,
        "price": 7565
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1008",
    "sku_code": "JNS-TL-1008",
    "barcode": "885110001141",
    "part_name": "SANKI Heavy Duty Aluminum Step Ladder 5 Steps with Multifunction Tool Tray",
    "part_name_lo": "ຂັ້ນໄດອາລູມີນຽມ SANKI 5 ຂັ້ນ ແຂງແຮງພິເສດ ພ້ອມຖາດວາງເຄື່ອງມືຊ່າງ",
    "category": "Hand Tools",
    "description": "High quality aircraft grade aluminum A-frame step ladder with wide non-slip ribbed steps, top utility tool tray, and 150 kg industrial duty rating.",
    "description_lo": "ຂັ້ນໄດຊ່າງອາລູມີນຽມ SANKI 5 ຂັ້ນ ຂັ້ນຢຽບກວ້າງກັນລື່ນ ພ້ອມຖາດວາງເຄື່ອງມື ແລະ ຮູສຽບໄຂຄວງດ້ານເທິງ ຮັບນ້ຳໜັກ 150 ກິໂລ.",
    "image_url": "/images/jenstore-placeholders/product_MTM2NjI_6a0fd7cf63735.webp",
    "qty_on_hand": 40,
    "unit_price": 2850,
    "currency": "THB",
    "specs": {
      "Steps": "5 Steps",
      "Height": "1.50 Meters (5 Ft)",
      "Material": "High Tensile Aluminum",
      "Load Rating": "150 kg (Standard EN131)"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2708
      },
      {
        "min_qty": 10,
        "price": 2565
      },
      {
        "min_qty": 20,
        "price": 2422
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1009",
    "sku_code": "JNS-TL-1009",
    "barcode": "885110001142",
    "part_name": "Industrial Piston Air Compressor 3.0 HP / 100 Liters (8 Bar / 115 PSI)",
    "part_name_lo": "ປັ໊ມລົມລູກສູບອຸດສາຫະກຳ 3.0 ແຮງມ້າ / 100 ລິດ (ແຮງດັນ 8 ບາ)",
    "category": "Hand Tools",
    "description": "Cast iron 2-cylinder piston air compressor with 100L receiver tank, automatic pressure switch, and heavy motor with thermal overload protection.",
    "description_lo": "ປັ໊ມລົມລູກສູບ 2 ສູບ ເສື້ອສູບເຫຼັກຫຼໍ່ໜາ ຖັງລົມ 100 ລິດ ມໍເຕີທອງແດງແທ້ 100% ພ້ອມສະວິດອັດຕະໂນມັດ ຕັດ-ຕໍ່ຕາມແຮງດັນ.",
    "image_url": "/images/catalog/real/air_compressor_1787989769249.jpg",
    "qty_on_hand": 18,
    "unit_price": 12800,
    "currency": "THB",
    "specs": {
      "Power": "3.0 HP (2.2 kW)",
      "Tank Capacity": "100 Liters",
      "Working Pressure": "8 Bar (115 PSI)",
      "Air Delivery": "300 L/min"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 12160
      },
      {
        "min_qty": 10,
        "price": 11520
      },
      {
        "min_qty": 20,
        "price": 10880
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1010",
    "sku_code": "JNS-TL-1010",
    "barcode": "885110001143",
    "part_name": "Heavy Duty Belt-Drive Air Compressor 5.5 HP / 150 Liters (10 Bar / 145 PSI)",
    "part_name_lo": "ປັ໊ມລົມສາຍພານອຸດສາຫະກຳ 5.5 ແຮງມ້າ / 150 ລິດ (ແຮງດັນ 10 ບາ)",
    "category": "Hand Tools",
    "description": "Belt-driven 3-cylinder compressor delivering high air volume for industrial workshops, tire changing shops, and pneumatic air tools.",
    "description_lo": "ປັ໊ມລົມລະບົບສາຍພານ 3 ສູບ 5.5 HP ຖັງ 150 ລິດ ແຮງດັນ 10 ບາ ສຳລັບອູ່ສ້ອມແປງ, ຮ້ານປ່ຽນຢາງ ແລະ ເຄື່ອງມືລົມທຸກຊະນິດ.",
    "image_url": "/images/catalog/real/air_compressor_1787993354213.jpg",
    "qty_on_hand": 12,
    "unit_price": 19500,
    "currency": "THB",
    "specs": {
      "Power": "5.5 HP (4.0 kW)",
      "Tank Capacity": "150 Liters",
      "Working Pressure": "10 Bar (145 PSI)",
      "Air Delivery": "550 L/min"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 18525
      },
      {
        "min_qty": 10,
        "price": 17550
      },
      {
        "min_qty": 20,
        "price": 16575
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1011",
    "sku_code": "JNS-TL-1011",
    "barcode": "885110001144",
    "part_name": "High Pressure Industrial Air Compressor 10 HP / 300 Liters (12.5 Bar / 175 PSI)",
    "part_name_lo": "ປັ໊ມລົມແຮງດັນສູງອຸດສາຫະກຳ 10 ແຮງມ້າ / 300 ລິດ (ແຮງດັນ 12.5 ບາ)",
    "category": "Hand Tools",
    "description": "Heavy industrial two-stage compressor built for continuous factory production lines, automated pneumatic machinery, and sandblasting.",
    "description_lo": "ປັ໊ມລົມ 2 ຂັ້ນ (Two-Stage) 10 HP ຖັງໃຫຍ່ 300 ລິດ ແຮງດັນສູງ 12.5 ບາ ສຳລັບສາຍການຜະລິດໂຮງງານ ແລະ ງານພົ່ນຊາຍ.",
    "image_url": "/images/catalog/real/air_compressor_1787995199402.jpg",
    "qty_on_hand": 8,
    "unit_price": 38500,
    "currency": "THB",
    "specs": {
      "Power": "10 HP (7.5 kW) 3-Phase",
      "Tank Capacity": "300 Liters",
      "Working Pressure": "12.5 Bar (175 PSI)",
      "Air Delivery": "1050 L/min"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 36575
      },
      {
        "min_qty": 10,
        "price": 34650
      },
      {
        "min_qty": 20,
        "price": 32725
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1012",
    "sku_code": "JNS-TL-1012",
    "barcode": "885110001145",
    "part_name": "Portable Inverter MMA/ARC Welding Machine 200A (IGBT Digital Display)",
    "part_name_lo": "ຕູ້ຈອດໄຟຟ້າລະບົບອິນເວີເຕີ້ MMA 200A (ຈໍດິຈິຕອນ IGBT)",
    "category": "Hand Tools",
    "description": "Compact portable IGBT inverter stick welder with hot start, arc force, and anti-stick features. Capable of welding 2.6 - 4.0mm electrodes.",
    "description_lo": "ຕູ້ຈອດເຫຼັກອິນເວີເຕີ້ 200A ນ້ຳໜັກເບົາ ກິນໄຟໜ້ອຍ ຈອດງ່າຍ ໄຟລຽບ ບໍ່ຕິດທູບ ຈອດທູບ 2.6 - 4.0 ມມ ໄດ້ຕໍ່ເນື່ອງ.",
    "image_url": "/images/catalog/real/inverter_welding_machine_1787993381339.jpg",
    "qty_on_hand": 35,
    "unit_price": 4200,
    "currency": "THB",
    "specs": {
      "Output Current": "20 - 200A",
      "Voltage": "220V Single Phase",
      "Electrode Size": "1.6 - 4.0 mm",
      "Duty Cycle": "60% @ 200A"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3990
      },
      {
        "min_qty": 10,
        "price": 3780
      },
      {
        "min_qty": 20,
        "price": 3570
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1013",
    "sku_code": "JNS-TL-1013",
    "barcode": "885110001146",
    "part_name": "Heavy Duty Industrial MIG/MAG Inverter Welder 250A (Gas & Gasless Flux-Cored)",
    "part_name_lo": "ຕູ້ຈອດ CO2 / MIG 250A ອຸດສາຫະກຳ (ໃຊ້ໄດ້ທັງມີແກັສ ແລະ ບໍ່ໃຊ້ແກັສ)",
    "category": "Hand Tools",
    "description": "Professional multi-process MIG/MAG/MMA welder supporting 15kg wire spools, 4-roll wire feeder, and digital voltage/wire speed control.",
    "description_lo": "ຕູ້ຈອດ MIG/CO2 ຂະໜາດ 250A ຮອງຮັບກໍ້ລວດຈອດ 15 ກິໂລ ຊຸດຂັບລວດ 4 ລູກກິ້ງ ຈອດເຫຼັກ, ສະແຕນເລດ ແລະ ອາລູມີນຽມໄດ້ສວຍງາມ.",
    "image_url": "/images/catalog/real/welding_machine_1787945607244.jpg",
    "qty_on_hand": 15,
    "unit_price": 16800,
    "currency": "THB",
    "specs": {
      "Current Range": "30 - 250A",
      "Wire Spool": "15 kg (0.8 / 1.0 / 1.2 mm)",
      "Duty Cycle": "60% @ 250A",
      "Voltage": "220V / 380V"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 15960
      },
      {
        "min_qty": 10,
        "price": 15120
      },
      {
        "min_qty": 20,
        "price": 14280
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1014",
    "sku_code": "JNS-TL-1014",
    "barcode": "885110001147",
    "part_name": "ER70S-6 Gas Shielded MIG Welding Wire Spool (Dia 0.8mm / 15 kg)",
    "part_name_lo": "ລວດຈອດ MIG ER70S-6 ຂະໜາດ 0.8 ມມ (ກໍ້ 15 ກິໂລ ເຄືອບທອງແດງ)",
    "category": "Hand Tools",
    "description": "High quality copper coated solid carbon steel welding wire for smooth arc, minimal spatter, and superior weld bead appearance.",
    "description_lo": "ລວດຈອດ CO2 ເຄືອບທອງແດງ ER70S-6 ຂະໜາດ 0.8 ມມ ກໍ້ 15 ກິໂລ ແນວຈອດແໜ້ນ ສະເກັດໄຟໜ້ອຍ ທົນແຮງດຶງສູງ.",
    "image_url": "/images/catalog/real/mig_welding_wire_1787995228846.jpg",
    "qty_on_hand": 80,
    "unit_price": 950,
    "currency": "THB",
    "specs": {
      "AWS Classification": "AWS A5.18 ER70S-6",
      "Wire Diameter": "0.8 mm",
      "Spool Weight": "15 kg",
      "Shielding Gas": "CO2 or Ar+CO2"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 902
      },
      {
        "min_qty": 10,
        "price": 855
      },
      {
        "min_qty": 20,
        "price": 808
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1015",
    "sku_code": "JNS-TL-1015",
    "barcode": "885110001148",
    "part_name": "Cast Iron End-Suction Centrifugal Water Pump 2.2 kW / 3.0 HP (2\" x 2\")",
    "part_name_lo": "ປັ໊ມນ້ຳຫອຍໂຂ່ງເຫຼັກຫຼໍ່ 2.2 kW / 3.0 HP (ທໍ່ເຂົ້າ-ອອກ 2 ນິ້ວ)",
    "category": "Hand Tools",
    "description": "Standard industrial end-suction centrifugal pump with cast iron casing, brass impeller, and stainless steel shaft for factory water supply.",
    "description_lo": "ປັ໊ມນ້ຳຫອຍໂຂ່ງມາດຕະຖານອຸດສາຫະກຳ 3 ແຮງມ້າ ໃບພັດທອງເຫຼືອງ ແກນສະແຕນເລດ ທົນທານ ສົ່ງສູງ ແລະ ໃຫ້ນ້ຳຫຼາຍ.",
    "image_url": "/images/catalog/real/centrifugal_pump_1787989816474.jpg",
    "qty_on_hand": 20,
    "unit_price": 8500,
    "currency": "THB",
    "specs": {
      "Power": "2.2 kW (3.0 HP)",
      "Pipe Size": "2\" x 2\" (50mm)",
      "Max Flow": "500 L/min",
      "Max Head": "32 Meters"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 8075
      },
      {
        "min_qty": 10,
        "price": 7650
      },
      {
        "min_qty": 20,
        "price": 7225
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1016",
    "sku_code": "JNS-TL-1016",
    "barcode": "885110001149",
    "part_name": "Heavy Duty Industrial Water Circulation Pump 5.5 kW / 7.5 HP (3\" x 2.5\")",
    "part_name_lo": "ປັ໊ມນ້ຳອຸດສາຫະກຳແຮງດັນສູງ 5.5 kW / 7.5 HP (ທໍ່ເຂົ້າ 3\" ອອກ 2.5\")",
    "category": "Hand Tools",
    "description": "Heavy duty cooling tower circulation and high-volume transfer pump with mechanical seal and IP55 TEFC motor.",
    "description_lo": "ປັ໊ມນ້ຳໝູນວຽນ Cooling Tower ແລະ ລະບົບນ້ຳໂຮງງານ 7.5 HP ມໍເຕີກັນນ້ຳ IP55 ເຮັດວຽກຕໍ່ເນື່ອງ 24 ຊົ່ວໂມງ.",
    "image_url": "/images/catalog/real/centrifugal_pump_1787993426542.jpg",
    "qty_on_hand": 14,
    "unit_price": 16500,
    "currency": "THB",
    "specs": {
      "Power": "5.5 kW (7.5 HP) 3-Phase",
      "Pipe Size": "80 x 65 mm",
      "Max Flow": "1200 L/min",
      "Max Head": "48 Meters"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 15675
      },
      {
        "min_qty": 10,
        "price": 14850
      },
      {
        "min_qty": 20,
        "price": 14025
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1017",
    "sku_code": "JNS-TL-1017",
    "barcode": "885110001150",
    "part_name": "High Flow Stainless Steel Centrifugal Booster Pump 7.5 kW / 10 HP (4\" x 3\")",
    "part_name_lo": "ປັ໊ມນ້ຳຫອຍໂຂ່ງສະແຕນເລດແຮງດັນສູງ 7.5 kW / 10 HP (ທໍ່ 4\" x 3\")",
    "category": "Hand Tools",
    "description": "High capacity SUS304 stainless steel centrifugal pump for clean water distribution, beverage plants, and boiler feed water.",
    "description_lo": "ປັ໊ມນ້ຳສະແຕນເລດ 304 ປະລິມານນ້ຳສູງ 10 ແຮງມ້າ ສຳລັບໂຮງງານຜະລິດເຄື່ອງດື່ມ ແລະ ລະບົບຈ່າຍນ້ຳຫຼັກ.",
    "image_url": "/images/catalog/real/centrifugal_pump_1787995245344.jpg",
    "qty_on_hand": 8,
    "unit_price": 26800,
    "currency": "THB",
    "specs": {
      "Power": "7.5 kW (10 HP) 3-Phase",
      "Pipe Size": "100 x 80 mm",
      "Max Flow": "2000 L/min",
      "Max Head": "55 Meters"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 25460
      },
      {
        "min_qty": 10,
        "price": 24120
      },
      {
        "min_qty": 20,
        "price": 22780
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1018",
    "sku_code": "JNS-TL-1018",
    "barcode": "885110001151",
    "part_name": "Industrial Square Wall-Mounted Exhaust Ventilation Fan 24 Inch (Louver Shutter)",
    "part_name_lo": "ພັດລົມດູດອາກາດຕິດຝາອຸດສາຫະກຳ 24 ນິ້ວ ພ້ອມບານເກັດເປີດ-ປິດອັດຕະໂນມັດ",
    "category": "Hand Tools",
    "description": "Heavy duty 24\" wall exhaust fan with galvanized steel blades, automatic gravity louvers, and direct-drive industrial motor.",
    "description_lo": "ພັດລົມລະບາຍອາກາດໂຮງງານ 24 ນິ້ວ ໃບພັດເຫຼັກກາວາໄນສ໌ ພ້ອມບານເກັດກັນຝົນເປີດ-ປິດອັດຕະໂນມັດ ດູດລະບາຍຄວາມຮ້ອນ ແລະ ກິ່ນໄດ້ໄວ.",
    "image_url": "/images/catalog/real/industrial_exhaust_fan_1787993439615.jpg",
    "qty_on_hand": 25,
    "unit_price": 4600,
    "currency": "THB",
    "specs": {
      "Fan Blade Diameter": "600 mm (24 Inch)",
      "Air Volume": "8500 m3/h",
      "Power": "370W 220V",
      "Noise": "< 65 dB"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 4370
      },
      {
        "min_qty": 10,
        "price": 4140
      },
      {
        "min_qty": 20,
        "price": 3910
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1019",
    "sku_code": "JNS-TL-1019",
    "barcode": "885110001152",
    "part_name": "3-Phase Cast Iron Squirrel Cage Induction Electric Motor 7.5 kW / 10 HP (1450 RPM)",
    "part_name_lo": "ມໍເຕີໄຟຟ້າ 3 ເຟສ ເສື້ອເຫຼັກຫຼໍ່ 7.5 kW / 10 HP (1450 ຮອບ/ນາທີ IE2)",
    "category": "Hand Tools",
    "description": "Standard industrial 4-pole induction motor with cast iron frame, 100% copper windings, and high efficiency IE2 rating.",
    "description_lo": "ມໍເຕີໄຟຟ້າອຸດສາຫະກຳ 3 ເຟສ 380V ຂະໜາດ 10 ແຮງມ້າ 1450 RPM ຂົດລວດທອງແດງແທ້ ປະຢັດພະລັງງານ IE2.",
    "image_url": "/images/catalog/real/industrial_motor_1787993367799.jpg",
    "qty_on_hand": 16,
    "unit_price": 14500,
    "currency": "THB",
    "specs": {
      "Rated Power": "7.5 kW (10 HP)",
      "Speed": "1450 RPM (4-Pole)",
      "Voltage": "380V 50Hz 3-Phase",
      "Efficiency": "IE2 High Efficiency"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 13775
      },
      {
        "min_qty": 10,
        "price": 13050
      },
      {
        "min_qty": 20,
        "price": 12325
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1020",
    "sku_code": "JNS-TL-1020",
    "barcode": "885110001153",
    "part_name": "Compact Industrial Water Chiller Unit CW-5200 (for Laser Cutters & Spindle Cooling)",
    "part_name_lo": "ເຄື່ອງຫຼໍ່ເຢັນນ້ຳອຸດສາຫະກຳ Industrial Chiller CW-5200 (ຕັດເລເຊີ ແລະ ສະປິນເດີ)",
    "category": "Hand Tools",
    "description": "High precision thermostatic industrial water chiller with 1400W cooling capacity and digital temperature control for CNC machinery.",
    "description_lo": "ເຄື່ອງ Chiller ລະບາຍຄວາມຮ້ອນນ້ຳ CW-5200 ຄວບຄຸມອຸນຫະພູມລະອຽດ ±0.3°C ສຳລັບເຄື່ອງຕັດເລເຊີ ແລະ ຫົວ Spindle CNC.",
    "image_url": "/images/catalog/real/industrial_chiller_1787995257600.jpg",
    "qty_on_hand": 6,
    "unit_price": 28500,
    "currency": "THB",
    "specs": {
      "Cooling Capacity": "1400W (4776 Btu/h)",
      "Tank Capacity": "6 Liters",
      "Precision": "±0.3°C",
      "Voltage": "220V 50Hz"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 27075
      },
      {
        "min_qty": 10,
        "price": 25650
      },
      {
        "min_qty": 20,
        "price": 24225
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1021",
    "sku_code": "JNS-TL-1021",
    "barcode": "885110001154",
    "part_name": "3-Phase AC Magnetic Motor Contactor 32A (220V/380V Coil with Overload Relay)",
    "part_name_lo": "ແມັກເນຕິກຄອນແທັກເຕີ້ 3 ເຟສ 32A ພ້ອມໂອເວີໂຫຼດຣີເລປ້ອງກັນມໍເຕີໄໝ້",
    "category": "Hand Tools",
    "description": "Heavy duty industrial contactor rated for motor starting up to 15 kW with integrated bimetallic thermal overload relay.",
    "description_lo": "ແມັກເນຕິກຄອນແທັກເຕີ້ 32A ພ້ອມໂອເວີໂຫຼດຣີເລ ສຳລັບຄວບຄຸມ ແລະ ປ້ອງກັນມໍເຕີໄຟຟ້າຂະໜາດເຖິງ 15 kW ບໍ່ໃຫ້ໄໝ້.",
    "image_url": "/images/catalog/real/industrial_contactor_1787995211966.jpg",
    "qty_on_hand": 50,
    "unit_price": 1250,
    "currency": "THB",
    "specs": {
      "Current Rating": "32A AC-3",
      "Motor Power": "Up to 15 kW",
      "Coil Voltage": "220V / 380V AC",
      "Protection": "Thermal Overload"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1188
      },
      {
        "min_qty": 10,
        "price": 1125
      },
      {
        "min_qty": 20,
        "price": 1062
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1022",
    "sku_code": "JNS-TL-1022",
    "barcode": "885110001155",
    "part_name": "Professional 150-Piece Mechanics Socket & Tool Set (1/4\", 3/8\", 1/2\" Cr-V)",
    "part_name_lo": "ຊຸດເຄື່ອງມືຊ່າງກົນຈັກ 150 ຊິ້ນ (ລູກບັອກ 1/4, 3/8, 1/2 ນິ້ວ ເຫຼັກ Cr-V ແທ້)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified 150 Pcs Set specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ 150 Pcs Set ວັດສະດຸ Chrome Vanadium.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 5800,
    "currency": "THB",
    "specs": {
      "Capacity": "150 Pcs Set",
      "Material": "Chrome Vanadium",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 5510
      },
      {
        "min_qty": 10,
        "price": 5220
      },
      {
        "min_qty": 20,
        "price": 4930
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1023",
    "sku_code": "JNS-TL-1023",
    "barcode": "885110001156",
    "part_name": "Heavy Duty Twin Hammer Air Impact Wrench 1/2\" (1200 Nm Max Torque)",
    "part_name_lo": "ບັອກລົມ 1/2 ນິ້ວ ຄ້ອນຄູ່ Twin Hammer (ແຮງບິດສູງສຸດ 1200 Nm)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified 1/2\" Drive specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ 1/2\" Drive ວັດສະດຸ 1200 Nm Torque.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 3600,
    "currency": "THB",
    "specs": {
      "Capacity": "1/2\" Drive",
      "Material": "1200 Nm Torque",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3420
      },
      {
        "min_qty": 10,
        "price": 3240
      },
      {
        "min_qty": 20,
        "price": 3060
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1024",
    "sku_code": "JNS-TL-1024",
    "barcode": "885110001157",
    "part_name": "Adjustable Micrometer Click Torque Wrench 1/2\" (40 - 210 Nm)",
    "part_name_lo": "ດ້າວກະແຈປອນວັດແຮງບິດ 1/2 ນິ້ວ (40 - 210 Nm ພ້ອມກ່ອງກັນກະແທກ)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified 1/2\" Drive specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ 1/2\" Drive ວັດສະດຸ 40-210 Nm ±4%.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 1850,
    "currency": "THB",
    "specs": {
      "Capacity": "1/2\" Drive",
      "Material": "40-210 Nm ±4%",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1758
      },
      {
        "min_qty": 10,
        "price": 1665
      },
      {
        "min_qty": 20,
        "price": 1572
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1025",
    "sku_code": "JNS-TL-1025",
    "barcode": "885110001158",
    "part_name": "Heavy Duty Hydraulic Shop Floor Jack 3.0 Tons (Dual Pump Quick Lift)",
    "part_name_lo": "ແມ່ແຮງຕະເຂ້ຍົກລົດ 3.0 ໂຕນ (ປ້ຳຄູ່ ຍົກໄວ ຂະໜາດໂຄງໜາ)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified 3.0 Ton Capacity specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ 3.0 Ton Capacity ວັດສະດຸ Min 75mm / Max 505mm.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 4200,
    "currency": "THB",
    "specs": {
      "Capacity": "3.0 Ton Capacity",
      "Material": "Min 75mm / Max 505mm",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3990
      },
      {
        "min_qty": 10,
        "price": 3780
      },
      {
        "min_qty": 20,
        "price": 3570
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1026",
    "sku_code": "JNS-TL-1026",
    "barcode": "885110001159",
    "part_name": "Hydraulic Shop Press 20 Tons with Pressure Gauge (H-Frame)",
    "part_name_lo": "ແທ່ນອັດໄຮໂດຣລິກ 20 ໂຕນ ພ້ອມເກຈວັດແຮງດັນ (ສຳລັບອັດລູກປືນ)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified 20 Ton Capacity specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ 20 Ton Capacity ວັດສະດຸ H-Frame Steel.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 14500,
    "currency": "THB",
    "specs": {
      "Capacity": "20 Ton Capacity",
      "Material": "H-Frame Steel",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 13775
      },
      {
        "min_qty": 10,
        "price": 13050
      },
      {
        "min_qty": 20,
        "price": 12325
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1027",
    "sku_code": "JNS-TL-1027",
    "barcode": "885110001160",
    "part_name": "Industrial Bench Grinder 8 Inch 550W with Eye Shields (Coarse/Fine Wheels)",
    "part_name_lo": "ມໍເຕີຫີນຈຽນຕັ້ງໂຕະ 8 ນິ້ວ 550W (ພ້ອມຝາກັນສະເກັດ ແລະ ຫີນ 2 ໜ້າ)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified 8\" (200mm) Wheel specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ 8\" (200mm) Wheel ວັດສະດຸ 550W 2950 RPM.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 2950,
    "currency": "THB",
    "specs": {
      "Capacity": "8\" (200mm) Wheel",
      "Material": "550W 2950 RPM",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2802
      },
      {
        "min_qty": 10,
        "price": 2655
      },
      {
        "min_qty": 20,
        "price": 2508
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1028",
    "sku_code": "JNS-TL-1028",
    "barcode": "885110001161",
    "part_name": "Auto-Darkening Solar Powered Welding Helmet (Variable Shade 9-13)",
    "part_name_lo": "ໜ້າກາກຈອດເຫຼັກປັບແສງອັດຕະໂນມັດ ພະລັງງານແສງອາທິດ (Shade 9-13)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified Auto-Darkening specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ Auto-Darkening ວັດສະດຸ 0.1ms Response Time.",
    "image_url": "/images/catalog/real/auto_welding_helmet.jpg",
    "qty_on_hand": 30,
    "unit_price": 1450,
    "currency": "THB",
    "specs": {
      "Capacity": "Auto-Darkening",
      "Material": "0.1ms Response Time",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1378
      },
      {
        "min_qty": 10,
        "price": 1305
      },
      {
        "min_qty": 20,
        "price": 1232
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1029",
    "sku_code": "JNS-TL-1029",
    "barcode": "885110001162",
    "part_name": "Digital Multimeter CAT III 600V True-RMS with Temperature Probe",
    "part_name_lo": "ມິເຕີວັດໄຟຟ້າດິຈິຕອນ True-RMS CAT III 600V (ວັດອຸນຫະພູມ ແລະ ຄວາມຕໍ່ເນື່ອງ)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified CAT III 600V specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ CAT III 600V ວັດສະດຸ True-RMS 6000 Counts.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 1250,
    "currency": "THB",
    "specs": {
      "Capacity": "CAT III 600V",
      "Material": "True-RMS 6000 Counts",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1188
      },
      {
        "min_qty": 10,
        "price": 1125
      },
      {
        "min_qty": 20,
        "price": 1062
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1030",
    "sku_code": "JNS-TL-1030",
    "barcode": "885110001163",
    "part_name": "Industrial Heavy Duty Heat Gun 2000W (Variable Temp 50 - 600°C)",
    "part_name_lo": "ປືນເປົ່າລົມຮ້ອນອຸດສາຫະກຳ 2000W (ປັບອຸນຫະພູມໄດ້ 50 - 600 ອົງສາ)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified 2000W Power specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ 2000W Power ວັດສະດຸ 50-600°C Dual Speed.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 1150,
    "currency": "THB",
    "specs": {
      "Capacity": "2000W Power",
      "Material": "50-600°C Dual Speed",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1092
      },
      {
        "min_qty": 10,
        "price": 1035
      },
      {
        "min_qty": 20,
        "price": 978
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1031",
    "sku_code": "JNS-TL-1031",
    "barcode": "885110001164",
    "part_name": "Precision Vernier Caliper 150mm / 6\" Stainless Steel (0.02mm Accuracy)",
    "part_name_lo": "ເວີເນຍວັດລະອຽດສະແຕນເລດ 150 ມມ (ຄວາມລະອຽດ 0.02 ມມ)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified 150 mm (6\") specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ 150 mm (6\") ວັດສະດຸ 0.02 mm Stainless.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 650,
    "currency": "THB",
    "specs": {
      "Capacity": "150 mm (6\")",
      "Material": "0.02 mm Stainless",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 618
      },
      {
        "min_qty": 10,
        "price": 585
      },
      {
        "min_qty": 20,
        "price": 552
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1032",
    "sku_code": "JNS-TL-1032",
    "barcode": "885110001165",
    "part_name": "Digital Dial Indicator Gauge 0-12.7mm (0.01mm Precision for Runout)",
    "part_name_lo": "ໄດອັນເກຈວັດລະອຽດດິຈິຕອນ 0-12.7 ມມ (ວັດຄວາມສ້ຽວຂອງເພົາ)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified 0 - 12.7 mm specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ 0 - 12.7 mm ວັດສະດຸ 0.01 mm Digital.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 1350,
    "currency": "THB",
    "specs": {
      "Capacity": "0 - 12.7 mm",
      "Material": "0.01 mm Digital",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1282
      },
      {
        "min_qty": 10,
        "price": 1215
      },
      {
        "min_qty": 20,
        "price": 1148
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1033",
    "sku_code": "JNS-TL-1033",
    "barcode": "885110001166",
    "part_name": "Heavy Duty Bench Vise 6 Inch with Swivel Base (Cast Steel)",
    "part_name_lo": "ຄີມຈັບເຫຼັກຕັ້ງໂຕະ 6 ນິ້ວ ຖານໝູນໄດ້ 360 ອົງສາ (ເຫຼັກກ້າຫຼໍ່ໜຽວ)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified 6\" (150mm) Jaws specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ 6\" (150mm) Jaws ວັດສະດຸ Cast Steel 360° Swivel.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 3400,
    "currency": "THB",
    "specs": {
      "Capacity": "6\" (150mm) Jaws",
      "Material": "Cast Steel 360° Swivel",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3230
      },
      {
        "min_qty": 10,
        "price": 3060
      },
      {
        "min_qty": 20,
        "price": 2890
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1034",
    "sku_code": "JNS-TL-1034",
    "barcode": "885110001167",
    "part_name": "Combination Spanner Wrench Set 8 - 32 mm (24 Pieces Mirror Polished)",
    "part_name_lo": "ຊຸດກະແຈແຫວນຂ້າງປາກຕາຍ 8 - 32 ມມ (24 ໂຕ ຂັດເງົາ Cr-V)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified 8 - 32 mm specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ 8 - 32 mm ວັດສະດຸ 24 Pcs Mirror Cr-V.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 2650,
    "currency": "THB",
    "specs": {
      "Capacity": "8 - 32 mm",
      "Material": "24 Pcs Mirror Cr-V",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2518
      },
      {
        "min_qty": 10,
        "price": 2385
      },
      {
        "min_qty": 20,
        "price": 2252
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1035",
    "sku_code": "JNS-TL-1035",
    "barcode": "885110001168",
    "part_name": "Industrial Air Blow Gun with Extended Nozzle and Air Flow Regulator",
    "part_name_lo": "ປືນເປົ່າລົມອຸດສາຫະກຳ ຫົວສີດຍາວ ພ້ອມວາວປັບຄວາມແຮງລົມ",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified Air Blow Gun specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ Air Blow Gun ວັດສະດຸ Max 150 PSI.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 380,
    "currency": "THB",
    "specs": {
      "Capacity": "Air Blow Gun",
      "Material": "Max 150 PSI",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 361
      },
      {
        "min_qty": 10,
        "price": 342
      },
      {
        "min_qty": 20,
        "price": 323
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1036",
    "sku_code": "JNS-TL-1036",
    "barcode": "885110001169",
    "part_name": "Pneumatic Grease Gun 14 oz (Continuous Cycle with Flexible Hose)",
    "part_name_lo": "ກະບອກອັດຈາລະບີລົມ 14 ອອນສ໌ (ຍິງຕໍ່ເນື່ອງ ພ້ອມສາຍອ່ອນ)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified 14 oz (400g) specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ 14 oz (400g) ວັດສະດຸ Pneumatic 4000 PSI.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 1850,
    "currency": "THB",
    "specs": {
      "Capacity": "14 oz (400g)",
      "Material": "Pneumatic 4000 PSI",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1758
      },
      {
        "min_qty": 10,
        "price": 1665
      },
      {
        "min_qty": 20,
        "price": 1572
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1037",
    "sku_code": "JNS-TL-1037",
    "barcode": "885110001170",
    "part_name": "Heavy Duty Manual Lever Grease Gun 500cc (10,000 PSI Working Pressure)",
    "part_name_lo": "ກະບອກອັດຈາລະບີມືໂຍກ 500cc (ແຮງດັນສູງ 10,000 PSI)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified 500 cc specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ 500 cc ວັດສະດຸ Manual Lever 10,000 PSI.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 750,
    "currency": "THB",
    "specs": {
      "Capacity": "500 cc",
      "Material": "Manual Lever 10,000 PSI",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 712
      },
      {
        "min_qty": 10,
        "price": 675
      },
      {
        "min_qty": 20,
        "price": 638
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1038",
    "sku_code": "JNS-TL-1038",
    "barcode": "885110001171",
    "part_name": "Oil Filter Strap Wrench Heavy Duty (Capacity up to 150mm Filters)",
    "part_name_lo": "ກະແຈສາຍຮັດຖອດກອງນ້ຳມັນເຄື່ອງ (ຮອງຮັບກອງຂະໜາດເຖິງ 150 ມມ)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified Up to 150mm specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ Up to 150mm ວັດສະດຸ Steel Handle + Woven Strap.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 450,
    "currency": "THB",
    "specs": {
      "Capacity": "Up to 150mm",
      "Material": "Steel Handle + Woven Strap",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 428
      },
      {
        "min_qty": 10,
        "price": 405
      },
      {
        "min_qty": 20,
        "price": 382
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1039",
    "sku_code": "JNS-TL-1039",
    "barcode": "885110001172",
    "part_name": "Industrial Circlip Plier Set 4 Pieces (Internal/External Straight & Bent)",
    "part_name_lo": "ຊຸດຄີມຖອດປິ້ນລັອກ 4 ໂຕ (ຫຸບ-ຖ່າງ ປາຍກົງ ແລະ ປາຍງໍ)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified 7\" (180mm) specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ 7\" (180mm) ວັດສະດຸ 4 Pcs Cr-V.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 850,
    "currency": "THB",
    "specs": {
      "Capacity": "7\" (180mm)",
      "Material": "4 Pcs Cr-V",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 808
      },
      {
        "min_qty": 10,
        "price": 765
      },
      {
        "min_qty": 20,
        "price": 722
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tl-1040",
    "sku_code": "JNS-TL-1040",
    "barcode": "885110001173",
    "part_name": "Magnetic Pick-Up Tool with Flexible LED Light (Telescopic 800mm)",
    "part_name_lo": "ໄມ້ແມ່ເຫຼັກດູດນັອດປາຍໄຟ LED ສາຍອ່ອນ (ຍືດໄດ້ 800 ມມ)",
    "category": "Hand Tools",
    "description": "Professional workshop tool engineered for industrial technicians and mechanics with certified 800 mm Telescopic specifications.",
    "description_lo": "ເຄື່ອງມືຊ່າງລະດັບມືອາຊີບ ຄຸນນະພາບສູງ ສຳລັບງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາໂຮງງານ ຂະໜາດ 800 mm Telescopic ວັດສະດຸ Magnetic 5 lbs + LED.",
    "image_url": "/images/jenstore-placeholders/product_MTMwODI_69c0fbf8b5eb0.webp",
    "qty_on_hand": 30,
    "unit_price": 280,
    "currency": "THB",
    "specs": {
      "Capacity": "800 mm Telescopic",
      "Material": "Magnetic 5 lbs + LED",
      "Standard": "ISO / DIN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 266
      },
      {
        "min_qty": 10,
        "price": 252
      },
      {
        "min_qty": 20,
        "price": 238
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1001",
    "sku_code": "JNS-SF-1001",
    "barcode": "885110001174",
    "part_name": "HIPPO Heavy Duty Flexible Traffic Delineator Post 750mm (High Reflective Bands)",
    "part_name_lo": "ເສົາຈະລາຈອນຢືດຢຸ່ນ HIPPO 750 ມມ (ແຖບສະທ້ອນແສງ 3 ແຖບ ລົດຢຽບບໍ່ຫັກ)",
    "category": "Safety Equipment",
    "description": "High elasticity polyurethane traffic warning bollard that rebounds immediately after being run over by vehicles. High-intensity reflective bands for night visibility.",
    "description_lo": "ເສົາຈະລາຈອນລົມລຸກ HIPPO ສູງ 750 ມມ ເນື້ອ PU ແຂງແຮງ ຢືດຢຸ່ນສູງ ລົດຢຽບທັບສາມາດດີດຕົວຂຶ້ນເອງໄດ້ ບໍ່ຫັກ ພ້ອມແຖບສະທ້ອນແສງ 3 ແຖບ.",
    "image_url": "/images/jenstore-placeholders/product_ODE2MQ_69e747c89ca3d.webp",
    "qty_on_hand": 100,
    "unit_price": 650,
    "currency": "THB",
    "specs": {
      "Height": "750 mm",
      "Material": "High Elastic Polyurethane",
      "Reflective Tape": "3 Bands High Intensity",
      "Base": "3 Anchor Bolts Included"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 618
      },
      {
        "min_qty": 10,
        "price": 585
      },
      {
        "min_qty": 20,
        "price": 552
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1002",
    "sku_code": "JNS-SF-1002",
    "barcode": "885110001175",
    "part_name": "HIPPO Heavy Duty Rubber Cable Protector Ramp - 2 Channels (Load Capacity 20 Tons)",
    "part_name_lo": "ຢາງປ້ອງກັນສາຍໄຟ HIPPO 2 ຊ່ອງ (ຮັບນ້ຳໜັກລົດບັນທຸກ 20 ໂຕນ)",
    "category": "Safety Equipment",
    "description": "Industrial vulcanized rubber cable ramp with high-visibility yellow PVC flip lid for protecting electric power cables and hoses from heavy forklifts and trucks.",
    "description_lo": "ຮາງຢາງປ້ອງກັນສາຍໄຟ HIPPO 2 ຊ່ອງ ຝາປິດ PVC ສີເຫຼືອງເປີດ-ປິດໄດ້ ຮັບນ້ຳໜັກລົດບັນທຸກໄດ້ 20 ໂຕນ ປ້ອງກັນສາຍໄຟຂາດ.",
    "image_url": "/images/jenstore-placeholders/product_ODI0Mg_69e74c891234b.webp",
    "qty_on_hand": 60,
    "unit_price": 1250,
    "currency": "THB",
    "specs": {
      "Channels": "2 Channels (32 x 32 mm each)",
      "Dimensions": "1000 x 250 x 50 mm",
      "Material": "Vulcanized Rubber + PVC Lid",
      "Load Rating": "20 Tons"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1188
      },
      {
        "min_qty": 10,
        "price": 1125
      },
      {
        "min_qty": 20,
        "price": 1062
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1003",
    "sku_code": "JNS-SF-1003",
    "barcode": "885110001176",
    "part_name": "HIPPO Heavy Duty Rubber Cable Protector Ramp - 3 Channels (Load Capacity 30 Tons)",
    "part_name_lo": "ຢາງປ້ອງກັນສາຍໄຟ HIPPO 3 ຊ່ອງ (ຮັບນ້ຳໜັກ 30 ໂຕນ ຝາປິດສີເຫຼືອງ)",
    "category": "Safety Equipment",
    "description": "Wide 3-channel rubber cable bridge with interlock connectors to join multiple units across wide warehouse roadways.",
    "description_lo": "ຮາງຢາງປ້ອງກັນສາຍໄຟ 3 ຊ່ອງ ຮັບນ້ຳໜັກ 30 ໂຕນ ຕໍ່ກັນໄດ້ຍາວຕາມຕ້ອງການ ດ້ວຍຫົວລັອກ T-Connector.",
    "image_url": "/images/jenstore-placeholders/product_ODI0Mw_69e74d1750f35.webp",
    "qty_on_hand": 45,
    "unit_price": 1850,
    "currency": "THB",
    "specs": {
      "Channels": "3 Channels (35 x 35 mm each)",
      "Dimensions": "1000 x 310 x 55 mm",
      "Material": "Heavy Rubber + PVC Lid",
      "Load Rating": "30 Tons"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1758
      },
      {
        "min_qty": 10,
        "price": 1665
      },
      {
        "min_qty": 20,
        "price": 1572
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1004",
    "sku_code": "JNS-SF-1004",
    "barcode": "885110001177",
    "part_name": "HIPPO Extra Heavy Duty Cable Protector Ramp - 5 Channels (Load Capacity 40 Tons)",
    "part_name_lo": "ຢາງປ້ອງກັນສາຍໄຟ HIPPO 5 ຊ່ອງ (ຮັບນ້ຳໜັກສູງສຸດ 40 ໂຕນ)",
    "category": "Safety Equipment",
    "description": "Heavy commercial 5-channel cable ramp engineered for construction sites, factories, and outdoor events to run multiple high-voltage cables.",
    "description_lo": "ຮາງຢາງປ້ອງກັນສາຍໄຟ 5 ຊ່ອງ ຮັບນ້ຳໜັກ 40 ໂຕນ ສຳລັບໄຊທ໌ງານກໍ່ສ້າງ, ໂຮງງານໃຫຍ່ ແລະ ງານກາງແຈ້ງ.",
    "image_url": "/images/jenstore-placeholders/product_ODI0NA_69e74d4226b24.webp",
    "qty_on_hand": 35,
    "unit_price": 2450,
    "currency": "THB",
    "specs": {
      "Channels": "5 Channels (35 x 35 mm each)",
      "Dimensions": "900 x 500 x 55 mm",
      "Material": "Industrial Rubber + Polyethylene Lid",
      "Load Rating": "40 Tons"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2328
      },
      {
        "min_qty": 10,
        "price": 2205
      },
      {
        "min_qty": 20,
        "price": 2082
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1005",
    "sku_code": "JNS-SF-1005",
    "barcode": "885110001178",
    "part_name": "HIPPO Heavy Duty Rubber Wall Protector Guard (L1000 x W160 x T50 mm)",
    "part_name_lo": "ຢາງກັນກະແທກຕິດຝາກຳແພງ HIPPO (ຍາວ 1 ແມັດ ໜາ 50 ມມ)",
    "category": "Safety Equipment",
    "description": "Thick impact-absorbing rubber bumper strip with yellow reflective film for loading docks, underground parking, and warehouse corridors.",
    "description_lo": "ແຜ່ນຢາງກັນກະແທກຕິດຝາກຳແພງ HIPPO ໜາ 50 ມມ ພ້ອມແຖບສະທ້ອນແສງ ປ້ອງກັນລົດເຂັນ ແລະ ລົດຍົກຕຳຝາ.",
    "image_url": "/images/jenstore-placeholders/product_ODE4OQ_69e74b80ce968.webp",
    "qty_on_hand": 80,
    "unit_price": 890,
    "currency": "THB",
    "specs": {
      "Dimensions": "1000 x 160 x 50 mm",
      "Material": "High Density Rubber",
      "Reflective Tape": "Yellow Chevron"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 846
      },
      {
        "min_qty": 10,
        "price": 801
      },
      {
        "min_qty": 20,
        "price": 756
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1006",
    "sku_code": "JNS-SF-1006",
    "barcode": "885110001179",
    "part_name": "HIPPO Heavy Duty Solid Rubber Loading Dock Bumper Block (W450 x H250 x T100 mm)",
    "part_name_lo": "ຢາງກັນກະແທກທ້າຍລົດບັນທຸກຊ່ອງໂຫຼດສິນຄ້າ HIPPO (ໜາ 100 ມມ)",
    "category": "Safety Equipment",
    "description": "Heavy molded solid rubber dock bumper block designed to absorb impact from reversing semi-trailers and delivery container trucks.",
    "description_lo": "ບ໋ອກຢາງຕັນກັນກະແທກຊ່ອງໂຫຼດສິນຄ້າ (Loading Dock) ໜາ 100 ມມ ດູດຊັບແຮງກະແທກຈາກລົດບັນທຸກໃຫຍ່ ບໍ່ໃຫ້ອາຄານເສຍຫາຍ.",
    "image_url": "/images/jenstore-placeholders/product_ODE5MA_69e74b2f925e1.webp",
    "qty_on_hand": 40,
    "unit_price": 1650,
    "currency": "THB",
    "specs": {
      "Dimensions": "450 x 250 x 100 mm",
      "Material": "Molded Solid NR/SBR Rubber",
      "Mounting": "2 Steel Washer Anchor Holes"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1568
      },
      {
        "min_qty": 10,
        "price": 1485
      },
      {
        "min_qty": 20,
        "price": 1402
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1007",
    "sku_code": "JNS-SF-1007",
    "barcode": "885110001180",
    "part_name": "HIPPO Rubber Column Corner Guard with Chevron Reflective Bands (H800 mm)",
    "part_name_lo": "ຢາງກັນກະແທກມຸມເສົາ HIPPO ສູງ 800 ມມ (ລາຍລູກສອນສະທ້ອນແສງ)",
    "category": "Safety Equipment",
    "description": "Right-angle heavy rubber corner protector for warehouse structural pillars with high-intensity yellow/black warning chevrons.",
    "description_lo": "ຢາງຫຸ້ມມຸມເສົາກັນກະແທກ HIPPO ສູງ 800 ມມ ມຸມ 90 ອົງສາ ແຖບສະທ້ອນແສງລາຍລູກສອນ ເຫັນແຈ້ງຊັດເຈນ.",
    "image_url": "/images/catalog/real/rubber_corner_guard.jpg",
    "qty_on_hand": 90,
    "unit_price": 550,
    "currency": "THB",
    "specs": {
      "Height": "800 mm",
      "Wing Width": "100 x 100 mm",
      "Thickness": "10 mm",
      "Material": "Durable Impact Rubber"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 522
      },
      {
        "min_qty": 10,
        "price": 495
      },
      {
        "min_qty": 20,
        "price": 468
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1008",
    "sku_code": "JNS-SF-1008",
    "barcode": "885110001181",
    "part_name": "HIPPO Heavy Duty Rubber Wheel Chock Small (for Vans & Forklifts)",
    "part_name_lo": "ຢາງຫ້າມລໍ້ HIPPO ຂະໜາດນ້ອຍ (ສຳລັບລົດຕູ້ ແລະ ລົດຍົກ Forklift)",
    "category": "Safety Equipment",
    "description": "High-grip ribbed rubber wedge wheel chock with carrying handle to prevent unintentional vehicle rolling during loading.",
    "description_lo": "ຢາງຂັດລໍ້ HIPPO ຂະໜາດນ້ອຍ ຜິວຢາງມີຮ່ອງເກາະພື້ນແໜ້ນ ພ້ອມຫູຫິ້ວ ປ້ອງກັນລົດໄຫຼຂະນະຈອດໂຫຼດສິນຄ້າ.",
    "image_url": "/images/catalog/real/rubber_wheel_chock.jpg",
    "qty_on_hand": 80,
    "unit_price": 450,
    "currency": "THB",
    "specs": {
      "Dimensions": "200 x 150 x 100 mm",
      "Material": "Recycled Molded Rubber",
      "Tread": "Anti-Slip Ribbed"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 428
      },
      {
        "min_qty": 10,
        "price": 405
      },
      {
        "min_qty": 20,
        "price": 382
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1009",
    "sku_code": "JNS-SF-1009",
    "barcode": "885110001182",
    "part_name": "HIPPO Extra Heavy Duty Truck Wheel Chock Large with Steel Handle & Eyebolt",
    "part_name_lo": "ຢາງຫ້າມລໍ້ລົດບັນທຸກໃຫຍ່ HIPPO ຂະໜາດໃຫຍ່ (ພ້ອມມືຈັບເຫຼັກ ແລະ ຫູຄ້ອງ)",
    "category": "Safety Equipment",
    "description": "Heavy truck wheel chock capable of holding 40-ton loaded tractor-trailers securely on slopes. Fitted with steel carrying handle.",
    "description_lo": "ຢາງຫ້າມລໍ້ລົດບັນທຸກໃຫຍ່ ຮັບນ້ຳໜັກລົດບັນທຸກ 40 ໂຕນ ພ້ອມມືຈັບເຫຼັກສະດວກຕໍ່ການຍົກຍ້າຍ ແລະ ຫູຮ້ອຍເຊືອກ/ໂສ້.",
    "image_url": "/images/catalog/real/rubber_wheel_chock.jpg",
    "qty_on_hand": 60,
    "unit_price": 850,
    "currency": "THB",
    "specs": {
      "Dimensions": "260 x 160 x 190 mm",
      "Weight": "4.5 kg",
      "Material": "Heavy Duty Vulcanized Rubber",
      "Handle": "Integrated Steel Handle"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 808
      },
      {
        "min_qty": 10,
        "price": 765
      },
      {
        "min_qty": 20,
        "price": 722
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1010",
    "sku_code": "JNS-SF-1010",
    "barcode": "885110001183",
    "part_name": "Stainless Steel Retractable Belt Barrier Stanchion Post (2m Red Belt)",
    "part_name_lo": "ເສົາກັ້ນທາງສະແຕນເລດ ສາຍດຶງຜ້າສີແດງ 2 ແມັດ (ລະບົບດຶງກັບອັດຕະໂນມັດ)",
    "category": "Safety Equipment",
    "description": "Polished stainless steel queue barrier post with 2-meter self-retracting nylon belt and heavy cast iron weighted base.",
    "description_lo": "ເສົາກັ້ນທາງສະແຕນເລດເງົາ ສາຍດຶງສີແດງ 2 ແມັດ ດຶງກັບອັດຕະໂນມັດ ຖານເຫຼັກຫຼໍ່ໜາ ຕັ້ງໝັ້ນຄົງ ບໍ່ລົ້ມງ່າຍ.",
    "image_url": "/images/jenstore-placeholders/retractable-barrier-g060385005_nvazoxctutfrbxga.jpg",
    "qty_on_hand": 50,
    "unit_price": 1350,
    "currency": "THB",
    "specs": {
      "Post Height": "900 mm",
      "Belt Length": "2.0 Meters",
      "Belt Color": "Red",
      "Base Diameter": "320 mm Weighted"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1282
      },
      {
        "min_qty": 10,
        "price": 1215
      },
      {
        "min_qty": 20,
        "price": 1148
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1011",
    "sku_code": "JNS-SF-1011",
    "barcode": "885110001184",
    "part_name": "Industrial Safety Lockout-Tagout (LOTO) Padlock (Non-Conductive Red)",
    "part_name_lo": "ແມ່ກຸນແຈນິລະໄພ LOTO ຕົວເຮືອນບໍ່ນຳໄຟຟ້າ (ສີແດງ ພ້ອມປ້າຍເຕືອນ Danger)",
    "category": "Safety Equipment",
    "description": "OSHA compliant safety lockout padlock with non-conductive Xenoy body, 38mm steel shackle, and key-retaining cylinder.",
    "description_lo": "ແມ່ກຸນແຈ Lockout/Tagout ມາດຕະຖານ OSHA ຕົວເຮືອນໄນລ່ອນບໍ່ນຳໄຟຟ້າ ສາຍກຸນແຈເຫຼັກ 38 ມມ ດຶງລູກກຸນແຈອອກບໍ່ໄດ້ຖ້າບໍ່ລັອກ.",
    "image_url": "/images/jenstore-placeholders/padlock-g040200002_2_193k8xdhjviy6zvk.jpg",
    "qty_on_hand": 150,
    "unit_price": 380,
    "currency": "THB",
    "specs": {
      "Shackle Clearance": "38 mm",
      "Body Material": "Non-Conductive Thermoplastic",
      "Standard": "OSHA 1910.147",
      "Color": "Safety Red"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 361
      },
      {
        "min_qty": 10,
        "price": 342
      },
      {
        "min_qty": 20,
        "price": 323
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1012",
    "sku_code": "JNS-SF-1012",
    "barcode": "885110001185",
    "part_name": "Industrial Safety Helmet with Ratchet Suspension - Yellow (ANSI Z89.1 Class E)",
    "part_name_lo": "ໝວກນິລະໄພອຸດສາຫະກຳ ແບບປຸ່ມປັບໝູນ - ສີເຫຼືອງ (ມາດຕະຖານ ANSI Z89.1)",
    "category": "Safety Equipment",
    "description": "High density ABS industrial hard hat with 6-point textile suspension, easy ratchet wheel size adjustment, and sweatband.",
    "description_lo": "ໝວກນິລະໄພ ABS ເກຣດ A ສີເຫຼືອງ ຮອງໃນ 6 ຈຸດ ປັບຂະໜາດດ້ວຍປຸ່ມໝູນ ratchet ປົກປ້ອງແຮງກະແທກ ແລະ ກັນໄຟຟ້າ 20,000V.",
    "image_url": "/images/catalog/real/safety_helmet_1787989844162.jpg",
    "qty_on_hand": 200,
    "unit_price": 380,
    "currency": "THB",
    "specs": {
      "Standard": "ANSI Z89.1 Class E & CE EN397",
      "Material": "High Impact ABS",
      "Adjustment": "Ratchet Dial 52-63cm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 361
      },
      {
        "min_qty": 10,
        "price": 342
      },
      {
        "min_qty": 20,
        "price": 323
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1013",
    "sku_code": "JNS-SF-1013",
    "barcode": "885110001186",
    "part_name": "Steel Toe Heavy Leather Work Safety Boots (Oil & Acid Resistant S1P)",
    "part_name_lo": "ເກີບເຊບຕີ້ໜັງແທ້ຫົວເຫຼັກ S1P (ພື້ນກັນນ້ຳມັນ, ກັນຕະປູແທງ ແລະ ກັນລື່ນ)",
    "category": "Safety Equipment",
    "description": "Genuine cowhide leather safety boots with 200J steel toe cap, puncture-resistant steel midsole plate, and dual density PU outsole.",
    "description_lo": "ເກີບເຊບຕີ້ໜັງແທ້ຫົວເຫຼັກ ຮັບແຮງກະແທກ 200 ຈູນ ພ້ອມແຜ່ນເຫຼັກຮອງພື້ນກັນຕະປູແທງ ພື້ນ PU 2 ຊັ້ນ ທົນນ້ຳມັນ ແລະ ສານເຄມີ.",
    "image_url": "/images/catalog/real/safety_boots_1787992086683.jpg",
    "qty_on_hand": 80,
    "unit_price": 1450,
    "currency": "THB",
    "specs": {
      "Safety Rating": "EN ISO 20345:2011 S1P",
      "Toe Cap": "200 Joule Steel",
      "Midsole": "Anti-Penetration Steel",
      "Sizes": "38 - 46"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1378
      },
      {
        "min_qty": 10,
        "price": 1305
      },
      {
        "min_qty": 20,
        "price": 1232
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1014",
    "sku_code": "JNS-SF-1014",
    "barcode": "885110001187",
    "part_name": "Sport Style Low-Cut Lightweight Safety Shoes S3 (Composite Toe)",
    "part_name_lo": "ເກີບເຊບຕີ້ຊົງສະປອດ ນ້ຳໜັກເບົາ S3 (ຫົວຄອມໂພສິດ ພື້ນ Kevlar ບໍ່ມີໂລຫະ)",
    "category": "Safety Equipment",
    "description": "Modern breathable sneaker-style safety shoes with lightweight composite safety toe and flexible Kevlar anti-penetration midsole.",
    "description_lo": "ເກີບເຊບຕີ້ຊົງສະປອດ ນ້ຳໜັກເບົາ ລະບາຍອາກາດດີ ຫົວຄອມໂພສິດ ແລະ ພື້ນ Kevlar ປອດໂລຫະ 100% ໃສ່ສະບາຍບໍ່ເມື່ອຍຕີນ.",
    "image_url": "/images/catalog/real/safety_shoes_fb_1787986500590.jpg",
    "qty_on_hand": 70,
    "unit_price": 1680,
    "currency": "THB",
    "specs": {
      "Safety Standard": "EN ISO 20345 S3 SRC",
      "Toe": "Metal-Free Composite",
      "Midsole": "Puncture-Proof Kevlar",
      "Sizes": "39 - 45"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1596
      },
      {
        "min_qty": 10,
        "price": 1512
      },
      {
        "min_qty": 20,
        "price": 1428
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1015",
    "sku_code": "JNS-SF-1015",
    "barcode": "885110001188",
    "part_name": "Polycarbonate Anti-Scratch & Anti-Fog Safety Glasses (Clear Lens)",
    "part_name_lo": "ແວ່ນຕານິລະໄພເລນໃສ Polycarbonate (ກັນຮອຍຂູດຂີດ ແລະ ກັນຝ້າ ANSI Z87.1)",
    "category": "Safety Equipment",
    "description": "Wrap-around optical grade clear safety spectacles with anti-fog coating, scratch resistance, and 99.9% UV protection.",
    "description_lo": "ແວ່ນຕານິລະໄພເລນໃສ ມາດຕະຖານ ANSI Z87.1 ເຄືອບສານກັນຝ້າ ແລະ ກັນຮອຍຂີດຂ່ວນ ປ້ອງກັນລັງສີ UV 99.9% ນ້ຳໜັກເບົາ.",
    "image_url": "/images/catalog/real/safety_glasses_1787992054757.jpg",
    "qty_on_hand": 300,
    "unit_price": 120,
    "currency": "THB",
    "specs": {
      "Standard": "ANSI Z87.1 / EN 166",
      "Coating": "Anti-Scratch & Anti-Fog",
      "Lens": "Polycarbonate UV400"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 114
      },
      {
        "min_qty": 10,
        "price": 108
      },
      {
        "min_qty": 20,
        "price": 102
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1016",
    "sku_code": "JNS-SF-1016",
    "barcode": "885110001189",
    "part_name": "Chemical Splash Proof Indirect Vent Safety Goggles (Clear Lens)",
    "part_name_lo": "ແວ່ນຕາຄອບຕາກັນສານເຄມີ ພ້ອມວາວລະບາຍອາກາດທາງອ້ອມ (ກັນນ້ຳກົດກະເດັນ)",
    "category": "Safety Equipment",
    "description": "Sealed chemical splash goggles with soft flexible vinyl body, adjustable headband, and 4 indirect ventilation ports.",
    "description_lo": "ແວ່ນຕາຄອບຕາກັນສານເຄມີ ຂອບຢາງ PVC ນຸ່ມແນບສະໜິດໃບໜ້າ ມີວາວລະບາຍອາກາດທາງອ້ອມ ປ້ອງກັນສານເຄມີ ແລະ ລະອອງນ້ຳກົດ.",
    "image_url": "/images/catalog/real/safety_goggles_1787986528762.jpg",
    "qty_on_hand": 150,
    "unit_price": 250,
    "currency": "THB",
    "specs": {
      "Standard": "EN 166 1B 3 / ANSI Z87.1",
      "Ventilation": "4 Indirect Vents",
      "Material": "Soft PVC Frame + PC Lens"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 238
      },
      {
        "min_qty": 10,
        "price": 225
      },
      {
        "min_qty": 20,
        "price": 212
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1017",
    "sku_code": "JNS-SF-1017",
    "barcode": "885110001190",
    "part_name": "High Visibility Reflective Safety Vest (Fluorescent Lime with Zipper)",
    "part_name_lo": "ເສື້ອສະທ້ອນແສງນິລະໄພ ສີຂຽວສະທ້ອນແສງ ພ້ອມຊິບ ແລະ ຊ່ອງໃສ່ບັດ (EN ISO 20471)",
    "category": "Safety Equipment",
    "description": "Class 2 high-visibility safety vest with 2-inch wide silver reflective tape, front zipper closure, and multi-function chest pockets.",
    "description_lo": "ເສື້ອສະທ້ອນແສງຄຸນນະພາບສູງ ຜ້າໂພລີເອສເຕີລະບາຍອາກາດ ພ້ອມແຖບສະທ້ອນແສງມາດຕະຖານສາກົນ ຊິບໜ້າ ແລະ ຖົງໃສ່ປາກກາ/ວິທະຍຸ.",
    "image_url": "/images/catalog/real/safety_vest_1787989856050.jpg",
    "qty_on_hand": 250,
    "unit_price": 180,
    "currency": "THB",
    "specs": {
      "Standard": "EN ISO 20471 Class 2",
      "Reflective Tape": "50mm High-Gloss Silver",
      "Closure": "Heavy Duty Zipper"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 171
      },
      {
        "min_qty": 10,
        "price": 162
      },
      {
        "min_qty": 20,
        "price": 153
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1018",
    "sku_code": "JNS-SF-1018",
    "barcode": "885110001191",
    "part_name": "Full Body Fall Protection Safety Harness with Shock Absorbing Lanyard",
    "part_name_lo": "ຊຸດສາຍຮັດນິລະໄພເຕັມຕົວ (Full Body Harness) ພ້ອມເຊືອກດູດຊັບແຮງກະແທກ",
    "category": "Safety Equipment",
    "description": "Industrial fall arrest full body harness with dorsal D-ring, quick-connect chest/leg buckles, and 1.8m energy absorbing lanyard.",
    "description_lo": "ຊຸດຮັດນິລະໄພເຕັມຕົວສຳລັບເຮັດວຽກເທິງບ່ອນສູງ ຫ່ວງ D-ring ຫຼັງເຫຼັກຟອດ ພ້ອມເຊືອກເຊບຕີ້ມີຊຸດດູດຊັບແຮງຕົກ (Energy Absorber).",
    "image_url": "/images/catalog/real/safety_harness_1787987815266.jpg",
    "qty_on_hand": 40,
    "unit_price": 2450,
    "currency": "THB",
    "specs": {
      "Standard": "EN 361:2002 & EN 355",
      "Webbing": "High Tenacity Polyester 45mm",
      "Lanyard": "1.8m Shock Absorber with Big Hook"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2328
      },
      {
        "min_qty": 10,
        "price": 2205
      },
      {
        "min_qty": 20,
        "price": 2082
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1019",
    "sku_code": "JNS-SF-1019",
    "barcode": "885110001192",
    "part_name": "Industrial Noise-Cancelling Ear Muffs (NRR 28 dB / SNR 32 dB)",
    "part_name_lo": "ທີ່ຄອບຫູຫຼຸດສຽງອຸດສາຫະກຳ (ຫຼຸດສຽງໄດ້ 28 dB ປັບລະດັບໄດ້ ນ້ຳໜັກເບົາ)",
    "category": "Safety Equipment",
    "description": "Over-the-head hearing protection ear muffs with soft foam-filled cushions and stainless steel headband wire for all-day comfort.",
    "description_lo": "ທີ່ຄອບຫູກັນສຽງດັງໂຮງງານ NRR 28 dB ໂຟມຮອງຫູນຸ່ມພິເສດ ບໍ່ເຈັບຫູ ກ້ານສະແຕນເລດປັບລະດັບໄດ້ ປົກປ້ອງແກ້ວຫູຈາກສຽງເຄື່ອງຈັກ.",
    "image_url": "/images/catalog/real/ear_muffs_1787986544646.jpg",
    "qty_on_hand": 120,
    "unit_price": 420,
    "currency": "THB",
    "specs": {
      "Noise Reduction Rating": "NRR 28 dB / SNR 32 dB",
      "Standard": "ANSI S3.19 / EN 352-1",
      "Cushions": "Acoustic Foam"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 399
      },
      {
        "min_qty": 10,
        "price": 378
      },
      {
        "min_qty": 20,
        "price": 357
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1020",
    "sku_code": "JNS-SF-1020",
    "barcode": "885110001193",
    "part_name": "Level 5 Cut-Resistant HPPE Work Safety Gloves (PU Coated Palm)",
    "part_name_lo": "ຖົງມືກັນບາດລະດັບ 5 HPPE (ເຄືອບ PU ຝາມື ກັນຂອງມີຄົມ ແລະ ແກ້ວ)",
    "category": "Safety Equipment",
    "description": "High performance polyethylene (HPPE) cut level 5 knitted gloves with polyurethane palm coating for superior grip and tactile dexterity.",
    "description_lo": "ຖົງມືເສັ້ນໄຍ HPPE ກັນບາດລະດັບສູງສຸດ Level 5 ເຄືອບ PU ຝາມື ຈັບຊິ້ນງານແໜ້ນ ບໍ່ລື່ນ ສຳລັບງານຕັດເຫຼັກ ແລະ ແຜ່ນແກ້ວ.",
    "image_url": "/images/catalog/real/cut_resistant_gloves_1787992071532.jpg",
    "qty_on_hand": 300,
    "unit_price": 140,
    "currency": "THB",
    "specs": {
      "Standard": "EN 388:2016 (4X43D Cut Level 5)",
      "Material": "HPPE 13-Gauge",
      "Coating": "PU Palm Coated",
      "Sizes": "M, L, XL"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 133
      },
      {
        "min_qty": 10,
        "price": 126
      },
      {
        "min_qty": 20,
        "price": 119
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1021",
    "sku_code": "JNS-SF-1021",
    "barcode": "885110001194",
    "part_name": "Heavy Duty Green Nitrile Chemical Resistant Gloves (13\" Length)",
    "part_name_lo": "ຖົງມືຢາງໄນໄຕລ໌ສີຂຽວ ກັນສານເຄມີ ແລະ ນ້ຳມັນ (ຍາວ 13 ນິ້ວ)",
    "category": "Safety Equipment",
    "description": "Chemical proof green nitrile gauntlets protecting hands against solvents, oils, greases, and strong corrosive liquids.",
    "description_lo": "ຖົງມືຢາງໄນໄຕລ໌ສີຂຽວ ຍາວ 13 ນິ້ວ ທົນທານຕໍ່ສານເຄມີ, ທິນເນີ, ນ້ຳມັນ ແລະ ສານລະລາຍ ຝາມືມີລາຍກັນລື່ນ.",
    "image_url": "/images/catalog/real/nitrile_gloves_1787986515132.jpg",
    "qty_on_hand": 250,
    "unit_price": 110,
    "currency": "THB",
    "specs": {
      "Standard": "EN 374-1:2016 Type A (AJKLPT)",
      "Material": "100% Nitrile 15 Mil",
      "Length": "330 mm (13 Inch)"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 104
      },
      {
        "min_qty": 10,
        "price": 99
      },
      {
        "min_qty": 20,
        "price": 94
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1022",
    "sku_code": "JNS-SF-1022",
    "barcode": "885110001195",
    "part_name": "ABC Dry Chemical Powder Fire Extinguisher 10 lbs / 4.5 kg (with Pressure Gauge & Wall Bracket)",
    "part_name_lo": "ບັ້ງດັບເພີງຜົງເຄມີແຫ້ງ ABC ຂະໜາດ 10 ປອນ / 4.5 ກິໂລ (ພ້ອມຂາແຂວນຕິດຝາ)",
    "category": "Safety Equipment",
    "description": "Multi-purpose dry chemical fire extinguisher suitable for Class A (wood, paper), Class B (flammable liquids), and Class C (electrical) fires.",
    "description_lo": "ບັ້ງດັບເພີງຜົງເຄມີແຫ້ງ ABC 4.5 ກິໂລ ດັບໄຟໄດ້ທັງໄມ້, ຜ້າ, ນ້ຳມັນ, ແກັສ ແລະ ໄຟຟ້າລັດວົງຈອນ ພ້ອມເກຈວັດແຮງດັນ ແລະ ຂາແຂວນ.",
    "image_url": "/images/catalog/real/fire_extinguisher_1787992098343.jpg",
    "qty_on_hand": 60,
    "unit_price": 1250,
    "currency": "THB",
    "specs": {
      "Capacity": "4.5 kg (10 lbs)",
      "Fire Rating": "4A : 20B : C",
      "Discharge Time": "15 Seconds",
      "Standard": "TIS 332 / ISO 9001"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1188
      },
      {
        "min_qty": 10,
        "price": 1125
      },
      {
        "min_qty": 20,
        "price": 1062
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1023",
    "sku_code": "JNS-SF-1023",
    "barcode": "885110001196",
    "part_name": "Wall-Mounted Metal Industrial First Aid Cabinet (3-Shelf Glass Door with Lock)",
    "part_name_lo": "ຕູ້ຢາປະຈຳໂຮງງານໂຄງເຫຼັກຕິດຝາ 3 ຊັ້ນ (ປະຕູແກ້ວມີກະແຈລັອກ)",
    "category": "Safety Equipment",
    "description": "Heavy duty metal first aid medicine cabinet with durable white powder coating, 3 internal shelves, and cross symbol for rapid medical access.",
    "description_lo": "ຕູ້ຢາປະຈຳໂຮງງານໂຄງເຫຼັກພົ່ນສີຂາວ 3 ຊັ້ນ ປະຕູແກ້ວພ້ອມກະແຈລັອກ ເກັບຢາ ແລະ ອຸປະກອນປະຖົມພະຍາບານໄດ້ຄົບຖ້ວນ.",
    "image_url": "/images/catalog/real/first_aid_cabinet_1787987096264.jpg",
    "qty_on_hand": 30,
    "unit_price": 1850,
    "currency": "THB",
    "specs": {
      "Dimensions": "400 x 150 x 500 mm",
      "Material": "Cold Rolled Steel 0.8mm",
      "Shelves": "3 Fixed Metal Shelves"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1758
      },
      {
        "min_qty": 10,
        "price": 1665
      },
      {
        "min_qty": 20,
        "price": 1572
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1024",
    "sku_code": "JNS-SF-1024",
    "barcode": "885110001197",
    "part_name": "Portable Industrial Emergency First Aid Kit Box (Complete 50-Person Set)",
    "part_name_lo": "ກ່ອງປະຖົມພະຍາບານສຸກເສີນເຄື່ອນທີ່ (ຊຸດຄົບວົງຈອນສຳລັບ 50 ຄົນ)",
    "category": "Safety Equipment",
    "description": "Waterproof portable ABS plastic medical box stocked with sterile bandages, antiseptics, trauma dressings, CPR mask, and shears.",
    "description_lo": "ກ່ອງປະຖົມພະຍາບານ ABS ກັນນ້ຳ ພ້ອມອຸປະກອນປິ່ນປົວບາດແຜສຸກເສີນຄົບຊຸດສຳລັບພະນັກງານ 50 ຄົນ ພົກພາສະດວກ.",
    "image_url": "/images/catalog/real/first_aid_kit_1787987108475.jpg",
    "qty_on_hand": 45,
    "unit_price": 1450,
    "currency": "THB",
    "specs": {
      "Capacity": "Up to 50 Persons",
      "Case": "Waterproof ABS with Handle",
      "Contents": "Over 120 Medical Items Included"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1378
      },
      {
        "min_qty": 10,
        "price": 1305
      },
      {
        "min_qty": 20,
        "price": 1232
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1025",
    "sku_code": "JNS-SF-1025",
    "barcode": "885110001198",
    "part_name": "Workplace Thermal & Chemical Burn Treatment Care Kit (Burn Jel & Dressings)",
    "part_name_lo": "ຊຸດປະຖົມພະຍາບານບາດແຜໄຟໄໝ້ ແລະ ນ້ຳຮ້ອນລວກ (ພ້ອມເຈວລະບາຍຄວາມຮ້ອນ)",
    "category": "Safety Equipment",
    "description": "Specialized emergency burn kit containing sterile tea-tree oil hydrogel burn dressings, soothing gel bottles, and conforming bandages.",
    "description_lo": "ຊຸດປິ່ນປົວບາດແຜໄຟໄໝ້ ແລະ ສານເຄມີລວກ ພ້ອມຜ້າປິດແຜ່ເຈວເຢັນ ບັນເທົາຄວາມເຈັບປວດ ແລະ ຫຼຸດອຸນຫະພູມບາດແຜທັນທີ.",
    "image_url": "/images/catalog/real/burn_kit_1787994421467.jpg",
    "qty_on_hand": 40,
    "unit_price": 980,
    "currency": "THB",
    "specs": {
      "Kit Type": "Burn Care Specialized",
      "Includes": "Hydrogel Dressings, Burn Jel, Gauze, Shears",
      "Shelf Life": "3 Years"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 931
      },
      {
        "min_qty": 10,
        "price": 882
      },
      {
        "min_qty": 20,
        "price": 833
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1026",
    "sku_code": "JNS-SF-1026",
    "barcode": "885110001199",
    "part_name": "Emergency Pocket CPR Resuscitation Mask with One-Way Valve & Hard Case",
    "part_name_lo": "ໜ້າກາກຊ່ວຍຫາຍໃຈສຸກເສີນ CPR Pocket Mask (ພ້ອມວາວປ້ອງກັນການໄຫຼຍ້ອນກັບ)",
    "category": "Safety Equipment",
    "description": "Transparent resuscitation CPR mask with one-way bacterial filter valve and elastic head strap to prevent cross-contamination during rescue.",
    "description_lo": "ໜ້າກາກກູ້ຊີບ CPR ແບບພົກພາ ພ້ອມວາວທາງດຽວກັນເຊື້ອໂລກ ແລະ ຊ່ອງຕໍ່ສາຍອົກຊີແຊນ ປອດໄພຕໍ່ທັງຜູ້ຊ່ວຍ ແລະ ຜູ້ປ່ວຍ.",
    "image_url": "/images/catalog/real/cpr_mask_1787994387768.jpg",
    "qty_on_hand": 100,
    "unit_price": 280,
    "currency": "THB",
    "specs": {
      "Valve": "One-Way Filter Valve",
      "Case": "Clamshell Hard Case",
      "Features": "Oxygen Inlet Port"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 266
      },
      {
        "min_qty": 10,
        "price": 252
      },
      {
        "min_qty": 20,
        "price": 238
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1027",
    "sku_code": "JNS-SF-1027",
    "barcode": "885110001200",
    "part_name": "Tactical Hemostatic Trauma Emergency Kit (Combat Tourniquet & Israeli Bandage)",
    "part_name_lo": "ຊຸດຫ້າມເລືອດສຸກເສີນ Trauma Kit (ພ້ອມສາຍຮັດ Tourniquet ແລະ ຜ້າພັນບາດແຜກົດເລືອດ)",
    "category": "Safety Equipment",
    "description": "Rapid trauma response kit equipped with military grade CAT tourniquet, emergency trauma pressure dressing, and compressed gauze.",
    "description_lo": "ຊຸດຫ້າມເລືອດບາດແຜໃຫຍ່ສຸກເສີນ ພ້ອມສາຍຮັດຫ້າມເລືອດ Tourniquet ມືດຽວ ແລະ ຜ້າກົດແຜ Israeli Bandage ຢຸດເລືອດພາຍໃນ 60 ວິນາທີ.",
    "image_url": "/images/catalog/real/trauma_kit_1787994372278.jpg",
    "qty_on_hand": 50,
    "unit_price": 1250,
    "currency": "THB",
    "specs": {
      "Tourniquet": "CAT Gen 7 Windlass",
      "Bandage": "6-Inch Pressure Emergency Bandage",
      "Pouch": "MOLLE Rip-Away"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1188
      },
      {
        "min_qty": 10,
        "price": 1125
      },
      {
        "min_qty": 20,
        "price": 1062
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1028",
    "sku_code": "JNS-SF-1028",
    "barcode": "885110001201",
    "part_name": "Rigid Plastic Spinal Immobilization Stretcher Board with Restraint Straps",
    "part_name_lo": "ກະດານດາມຫຼັງເຄື່ອນຍ້າຍຜູ້ປ່ວຍ Spine Board (ພ້ອມສາຍຮັດນິລະໄພ 3 ເສັ້ນ)",
    "category": "Safety Equipment",
    "description": "High strength polyethylene spine board stretcher compatible with X-ray/CT scans. Features multiple handholds and quick-release straps.",
    "description_lo": "ກະດານດາມກະດູກສັນຫຼັງ Spine Board ພລາສຕິກ HDPE ໜຽວພິເສດ ບໍ່ກີດຂວາງລັງສີ X-Ray ພ້ອມສາຍຮັດນິລະໄພ 3 ເສັ້ນ ແລະ ຊ່ອງຈັບຮອບດ້ານ.",
    "image_url": "/images/catalog/real/stretcher_board_1787994434376.jpg",
    "qty_on_hand": 20,
    "unit_price": 2850,
    "currency": "THB",
    "specs": {
      "Dimensions": "1840 x 450 x 50 mm",
      "Capacity": "180 kg",
      "Material": "High Density Polyethylene (HDPE)",
      "Weight": "7.5 kg"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2708
      },
      {
        "min_qty": 10,
        "price": 2565
      },
      {
        "min_qty": 20,
        "price": 2422
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1029",
    "sku_code": "JNS-SF-1029",
    "barcode": "885110001202",
    "part_name": "Wall-Mounted Dual Spray Emergency Eye Wash Station (Stainless Steel 304 Bowl)",
    "part_name_lo": "ອ່າງລ້າງຕາສຸກເສີນສະແຕນເລດ 304 ຕິດຝາ (ຫົວສີດຄູ່ ພ້ອມວາວເປີດມືໂຍກ)",
    "category": "Safety Equipment",
    "description": "OSHA/ANSI Z358.1 certified emergency eye wash with dual aerated spray heads, dust covers, and push-handle stainless ball valve.",
    "description_lo": "ອ່າງລ້າງຕາສຸກເສີນຕິດຝາ ສະແຕນເລດ 304 ແທ້ ມາດຕະຖານ ANSI Z358.1 ຫົວສີດນ້ຳຄູ່ຟອງນຸ່ມບໍ່ເຈັບຕາ ເປີດງ່າຍດ້ວຍມືໂຍກ.",
    "image_url": "/images/catalog/real/eye_wash_station_1787994359559.jpg",
    "qty_on_hand": 18,
    "unit_price": 3800,
    "currency": "THB",
    "specs": {
      "Standard": "ANSI Z358.1-2014",
      "Material": "Stainless Steel SUS304",
      "Water Pressure": "0.2 - 0.4 MPa",
      "Flow Rate": "> 11.4 L/min"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3610
      },
      {
        "min_qty": 10,
        "price": 3420
      },
      {
        "min_qty": 20,
        "price": 3230
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1030",
    "sku_code": "JNS-SF-1030",
    "barcode": "885110001203",
    "part_name": "Mobile Emergency Chemical & Oil Spill Response Kit 120 Liters (Yellow Wheeled Drum)",
    "part_name_lo": "ຖັງດູດຊັບສານເຄມີ ແລະ ນ້ຳມັນຮົ່ວໄຫຼສຸກເສີນ 120 ລິດ (ຖັງສີເຫຼືອງຕິດລໍ້)",
    "category": "Safety Equipment",
    "description": "Comprehensive 120L mobile emergency spill response kit packed in a heavy duty wheeled polyethylene bin with absorbent pads, socks, pillows, and disposal bags.",
    "description_lo": "ຊຸດອຸປະກອນດູດຊັບສານເຄມີ ແລະ ນ້ຳມັນຮົ່ວໄຫຼສຸກເສີນ 120 ລິດ ພ້ອມແຜ່ນຊັບ, ທ່ອນກັ້ນ ແລະ ຖົງກຳຈັດ ບັນຈຸໃນຖັງສີເຫຼືອງຕິດລໍ້.",
    "image_url": "/images/catalog/real/spill_containment_kit_1787995270912.jpg",
    "qty_on_hand": 15,
    "unit_price": 7800,
    "currency": "THB",
    "specs": {
      "Absorbency": "120 Liters (Oil & Universal)",
      "Container": "120L Mobile Wheelie Bin",
      "Includes": "100 Pads, 8 Socks, 4 Pillows, PPE"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7410
      },
      {
        "min_qty": 10,
        "price": 7020
      },
      {
        "min_qty": 20,
        "price": 6630
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1031",
    "sku_code": "JNS-SF-1031",
    "barcode": "885110001204",
    "part_name": "Industrial Safety Helmet Ratchet - White (Engineer / Executive)",
    "part_name_lo": "ໝວກນິລະໄພອຸດສາຫະກຳ ແບບປຸ່ມປັບໝູນ - ສີຂາວ (ວິສະວະກອນ/ຜູ້ບໍລິຫານ)",
    "category": "Safety Equipment",
    "description": "Workplace safety solution rated ANSI Class E White manufactured from ABS Plastic to safeguard personnel in industrial environments.",
    "description_lo": "ອຸປະກອນຄວາມປອດໄພໂຮງງານ ມາດຕະຖານ ANSI Class E White ວັດສະດຸ ABS Plastic ຊ່ວຍປ້ອງກັນອຸບັດຕິເຫດ ແລະ ສ້າງສະພາບແວດລ້ອມການເຮັດວຽກທີ່ປອດໄພ.",
    "image_url": "/images/catalog/real/safety_helmet_1787989844162.jpg",
    "qty_on_hand": 40,
    "unit_price": 380,
    "currency": "THB",
    "specs": {
      "Rating": "ANSI Class E White",
      "Material": "ABS Plastic",
      "Certification": "Safety Standard Approved"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 361
      },
      {
        "min_qty": 10,
        "price": 342
      },
      {
        "min_qty": 20,
        "price": 323
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1032",
    "sku_code": "JNS-SF-1032",
    "barcode": "885110001205",
    "part_name": "High Visibility Reflective Safety Vest - Orange with Zipper",
    "part_name_lo": "ເສື້ອສະທ້ອນແສງນິລະໄພ ສີສົ້ມສະທ້ອນແສງ ພ້ອມຊິບ (ມາດຕະຖານ EN ISO 20471)",
    "category": "Safety Equipment",
    "description": "Workplace safety solution rated Class 2 Orange manufactured from Polyester to safeguard personnel in industrial environments.",
    "description_lo": "ອຸປະກອນຄວາມປອດໄພໂຮງງານ ມາດຕະຖານ Class 2 Orange ວັດສະດຸ Polyester ຊ່ວຍປ້ອງກັນອຸບັດຕິເຫດ ແລະ ສ້າງສະພາບແວດລ້ອມການເຮັດວຽກທີ່ປອດໄພ.",
    "image_url": "/images/catalog/real/safety_vest_1787989856050.jpg",
    "qty_on_hand": 40,
    "unit_price": 180,
    "currency": "THB",
    "specs": {
      "Rating": "Class 2 Orange",
      "Material": "Polyester",
      "Certification": "Safety Standard Approved"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 171
      },
      {
        "min_qty": 10,
        "price": 162
      },
      {
        "min_qty": 20,
        "price": 153
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1033",
    "sku_code": "JNS-SF-1033",
    "barcode": "885110001206",
    "part_name": "Full Face Protection Clear Polycarbonate Shield with Headgear",
    "part_name_lo": "ໜ້າກາກກັນສະເກັດແບບໃສເຕັມໜ້າ ພ້ອມໂຄງສວມຫົວປັບລະດັບໄດ້",
    "category": "Safety Equipment",
    "description": "Workplace safety solution rated Full Face Shield manufactured from Polycarbonate 2mm to safeguard personnel in industrial environments.",
    "description_lo": "ອຸປະກອນຄວາມປອດໄພໂຮງງານ ມາດຕະຖານ Full Face Shield ວັດສະດຸ Polycarbonate 2mm ຊ່ວຍປ້ອງກັນອຸບັດຕິເຫດ ແລະ ສ້າງສະພາບແວດລ້ອມການເຮັດວຽກທີ່ປອດໄພ.",
    "image_url": "/images/catalog/real/safety_goggles_1787986528762.jpg",
    "qty_on_hand": 40,
    "unit_price": 480,
    "currency": "THB",
    "specs": {
      "Rating": "Full Face Shield",
      "Material": "Polycarbonate 2mm",
      "Certification": "Safety Standard Approved"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 456
      },
      {
        "min_qty": 10,
        "price": 432
      },
      {
        "min_qty": 20,
        "price": 408
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1034",
    "sku_code": "JNS-SF-1034",
    "barcode": "885110001207",
    "part_name": "Half-Face Dual Cartridge Chemical Respirator Mask with A1P2 Filters",
    "part_name_lo": "ໜ້າກາກເຄິ່ງໜ້າກັນສານເຄມີໄສ້ຕອງຄູ່ (ກັນໄອລະເຫີຍສານລະລາຍ ແລະ ຝຸ່ນລະອຽດ)",
    "category": "Safety Equipment",
    "description": "Workplace safety solution rated Dual Cartridge manufactured from Silicone Body to safeguard personnel in industrial environments.",
    "description_lo": "ອຸປະກອນຄວາມປອດໄພໂຮງງານ ມາດຕະຖານ Dual Cartridge ວັດສະດຸ Silicone Body ຊ່ວຍປ້ອງກັນອຸບັດຕິເຫດ ແລະ ສ້າງສະພາບແວດລ້ອມການເຮັດວຽກທີ່ປອດໄພ.",
    "image_url": "/images/catalog/real/chemical_respirator_mask.jpg",
    "qty_on_hand": 40,
    "unit_price": 850,
    "currency": "THB",
    "specs": {
      "Rating": "Dual Cartridge",
      "Material": "Silicone Body",
      "Certification": "Safety Standard Approved"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 808
      },
      {
        "min_qty": 10,
        "price": 765
      },
      {
        "min_qty": 20,
        "price": 722
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1035",
    "sku_code": "JNS-SF-1035",
    "barcode": "885110001208",
    "part_name": "Heavy Duty Cowhide Leather Welding Gauntlets 16 Inch (Heat Resistant)",
    "part_name_lo": "ຖົງມືໜັງຈອດເຫຼັກ 16 ນິ້ວ ໜັງງົວແທ້ທົນຄວາມຮ້ອນ ແລະ ສະເກັດໄຟ",
    "category": "Safety Equipment",
    "description": "Workplace safety solution rated 16\" Length manufactured from Split Cowhide to safeguard personnel in industrial environments.",
    "description_lo": "ອຸປະກອນຄວາມປອດໄພໂຮງງານ ມາດຕະຖານ 16\" Length ວັດສະດຸ Split Cowhide ຊ່ວຍປ້ອງກັນອຸບັດຕິເຫດ ແລະ ສ້າງສະພາບແວດລ້ອມການເຮັດວຽກທີ່ປອດໄພ.",
    "image_url": "/images/catalog/real/cut_resistant_gloves_1787992071532.jpg",
    "qty_on_hand": 40,
    "unit_price": 280,
    "currency": "THB",
    "specs": {
      "Rating": "16\" Length",
      "Material": "Split Cowhide",
      "Certification": "Safety Standard Approved"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 266
      },
      {
        "min_qty": 10,
        "price": 252
      },
      {
        "min_qty": 20,
        "price": 238
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1036",
    "sku_code": "JNS-SF-1036",
    "barcode": "885110001209",
    "part_name": "Aluminized High Temperature Heat Resistant Gloves (Rated up to 500°C)",
    "part_name_lo": "ຖົງມືກັນຄວາມຮ້ອນສູງ 500 ອົງສາ ເຄືອບອາລູມິນຽມສະທ້ອນຄວາມຮ້ອນ",
    "category": "Safety Equipment",
    "description": "Workplace safety solution rated 500°C Heat Rating manufactured from Aramid / Aluminized to safeguard personnel in industrial environments.",
    "description_lo": "ອຸປະກອນຄວາມປອດໄພໂຮງງານ ມາດຕະຖານ 500°C Heat Rating ວັດສະດຸ Aramid / Aluminized ຊ່ວຍປ້ອງກັນອຸບັດຕິເຫດ ແລະ ສ້າງສະພາບແວດລ້ອມການເຮັດວຽກທີ່ປອດໄພ.",
    "image_url": "/images/catalog/real/nitrile_gloves_1787986515132.jpg",
    "qty_on_hand": 40,
    "unit_price": 1250,
    "currency": "THB",
    "specs": {
      "Rating": "500°C Heat Rating",
      "Material": "Aramid / Aluminized",
      "Certification": "Safety Standard Approved"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1188
      },
      {
        "min_qty": 10,
        "price": 1125
      },
      {
        "min_qty": 20,
        "price": 1062
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1037",
    "sku_code": "JNS-SF-1037",
    "barcode": "885110001210",
    "part_name": "Emergency Safety Combination Shower & Eye Wash Station Stainless 304",
    "part_name_lo": "ຊຸດຝັກບົວ ແລະ ອ່າງລ້າງຕາສຸກເສີນຕັ້ງພື້ນ ສະແຕນເລດ 304 ຄົບຊຸດ",
    "category": "Safety Equipment",
    "description": "Workplace safety solution rated ANSI Z358.1 manufactured from SUS304 Complete to safeguard personnel in industrial environments.",
    "description_lo": "ອຸປະກອນຄວາມປອດໄພໂຮງງານ ມາດຕະຖານ ANSI Z358.1 ວັດສະດຸ SUS304 Complete ຊ່ວຍປ້ອງກັນອຸບັດຕິເຫດ ແລະ ສ້າງສະພາບແວດລ້ອມການເຮັດວຽກທີ່ປອດໄພ.",
    "image_url": "/images/catalog/real/eye_wash_station_1787994359559.jpg",
    "qty_on_hand": 40,
    "unit_price": 14500,
    "currency": "THB",
    "specs": {
      "Rating": "ANSI Z358.1",
      "Material": "SUS304 Complete",
      "Certification": "Safety Standard Approved"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 13775
      },
      {
        "min_qty": 10,
        "price": 13050
      },
      {
        "min_qty": 20,
        "price": 12325
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1038",
    "sku_code": "JNS-SF-1038",
    "barcode": "885110001211",
    "part_name": "Traffic Safety Cone 750mm Heavy Rubber Base with Double Reflective Collars",
    "part_name_lo": "ຈວຍຈະລາຈອນ 750 ມມ ຖານຢາງດຳໜັກ ພ້ອມແຖບສະທ້ອນແສງ 2 ແຖບ (ລົດຢຽບບໍ່ລົ້ມ)",
    "category": "Safety Equipment",
    "description": "Workplace safety solution rated 750 mm (30\") manufactured from PVC + Heavy Rubber Base to safeguard personnel in industrial environments.",
    "description_lo": "ອຸປະກອນຄວາມປອດໄພໂຮງງານ ມາດຕະຖານ 750 mm (30\") ວັດສະດຸ PVC + Heavy Rubber Base ຊ່ວຍປ້ອງກັນອຸບັດຕິເຫດ ແລະ ສ້າງສະພາບແວດລ້ອມການເຮັດວຽກທີ່ປອດໄພ.",
    "image_url": "/images/catalog/real/traffic_safety_cone.jpg",
    "qty_on_hand": 40,
    "unit_price": 420,
    "currency": "THB",
    "specs": {
      "Rating": "750 mm (30\")",
      "Material": "PVC + Heavy Rubber Base",
      "Certification": "Safety Standard Approved"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 399
      },
      {
        "min_qty": 10,
        "price": 378
      },
      {
        "min_qty": 20,
        "price": 357
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1039",
    "sku_code": "JNS-SF-1039",
    "barcode": "885110001212",
    "part_name": "Outdoor Convex Safety Security Traffic Mirror 800mm (Unbreakable Polycarbonate)",
    "part_name_lo": "ແວ່ນໂຄ້ງຈະລາຈອນ 800 ມມ ໂພລີຄາບອນເນດແທ້ (ບໍ່ແຕກ ມຸມມອງກວ້າງ 130 ອົງສາ)",
    "category": "Safety Equipment",
    "description": "Workplace safety solution rated Dia 800 mm manufactured from Unbreakable PC to safeguard personnel in industrial environments.",
    "description_lo": "ອຸປະກອນຄວາມປອດໄພໂຮງງານ ມາດຕະຖານ Dia 800 mm ວັດສະດຸ Unbreakable PC ຊ່ວຍປ້ອງກັນອຸບັດຕິເຫດ ແລະ ສ້າງສະພາບແວດລ້ອມການເຮັດວຽກທີ່ປອດໄພ.",
    "image_url": "/images/catalog/real/convex_traffic_mirror.jpg",
    "qty_on_hand": 40,
    "unit_price": 1850,
    "currency": "THB",
    "specs": {
      "Rating": "Dia 800 mm",
      "Material": "Unbreakable PC",
      "Certification": "Safety Standard Approved"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1758
      },
      {
        "min_qty": 10,
        "price": 1665
      },
      {
        "min_qty": 20,
        "price": 1572
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1040",
    "sku_code": "JNS-SF-1040",
    "barcode": "885110001213",
    "part_name": "Safety Lockout Hasps 1.5\" Steel Jaw (6-Padlock Capacity)",
    "part_name_lo": "ຫູລັອກນິລະໄພ LOTO ແບບ 6 ຮູ (ລັອກໄດ້ພ້ອມກັນ 6 ຄົນ)",
    "category": "Safety Equipment",
    "description": "Workplace safety solution rated 6 Holes 1.5\" manufactured from Vinyl Coated Steel to safeguard personnel in industrial environments.",
    "description_lo": "ອຸປະກອນຄວາມປອດໄພໂຮງງານ ມາດຕະຖານ 6 Holes 1.5\" ວັດສະດຸ Vinyl Coated Steel ຊ່ວຍປ້ອງກັນອຸບັດຕິເຫດ ແລະ ສ້າງສະພາບແວດລ້ອມການເຮັດວຽກທີ່ປອດໄພ.",
    "image_url": "/images/catalog/real/first_aid_cabinet_1787987096264.jpg",
    "qty_on_hand": 40,
    "unit_price": 220,
    "currency": "THB",
    "specs": {
      "Rating": "6 Holes 1.5\"",
      "Material": "Vinyl Coated Steel",
      "Certification": "Safety Standard Approved"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 209
      },
      {
        "min_qty": 10,
        "price": 198
      },
      {
        "min_qty": 20,
        "price": 187
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1041",
    "sku_code": "JNS-SF-1041",
    "barcode": "885110001214",
    "part_name": "Aluminum Warning Danger High Voltage Safety Sign (400 x 300 mm)",
    "part_name_lo": "ປ້າຍເຕືອນໄພອັນຕະລາຍໄຟຟ້າແຮງສູງ ອາລູມີນຽມ (400 x 300 ມມ ສະທ້ອນແສງ)",
    "category": "Safety Equipment",
    "description": "Workplace safety solution rated 400 x 300 mm manufactured from Reflective Aluminum to safeguard personnel in industrial environments.",
    "description_lo": "ອຸປະກອນຄວາມປອດໄພໂຮງງານ ມາດຕະຖານ 400 x 300 mm ວັດສະດຸ Reflective Aluminum ຊ່ວຍປ້ອງກັນອຸບັດຕິເຫດ ແລະ ສ້າງສະພາບແວດລ້ອມການເຮັດວຽກທີ່ປອດໄພ.",
    "image_url": "/images/catalog/real/traffic_safety_cone.jpg",
    "qty_on_hand": 40,
    "unit_price": 350,
    "currency": "THB",
    "specs": {
      "Rating": "400 x 300 mm",
      "Material": "Reflective Aluminum",
      "Certification": "Safety Standard Approved"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 332
      },
      {
        "min_qty": 10,
        "price": 315
      },
      {
        "min_qty": 20,
        "price": 298
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1042",
    "sku_code": "JNS-SF-1042",
    "barcode": "885110001215",
    "part_name": "Heavy Duty Fiberglass Fire Extinguishing Blanket (1.8 x 1.8 Meters)",
    "part_name_lo": "ຜ້າຫົ່ມດັບເພີງໄຟເບີກລາສ 1.8 x 1.8 ແມັດ (ທົນຄວາມຮ້ອນ 550 ອົງສາ)",
    "category": "Safety Equipment",
    "description": "Workplace safety solution rated 1.8 x 1.8 m manufactured from Woven Fiberglass to safeguard personnel in industrial environments.",
    "description_lo": "ອຸປະກອນຄວາມປອດໄພໂຮງງານ ມາດຕະຖານ 1.8 x 1.8 m ວັດສະດຸ Woven Fiberglass ຊ່ວຍປ້ອງກັນອຸບັດຕິເຫດ ແລະ ສ້າງສະພາບແວດລ້ອມການເຮັດວຽກທີ່ປອດໄພ.",
    "image_url": "/images/catalog/real/burn_kit_1787994421467.jpg",
    "qty_on_hand": 40,
    "unit_price": 750,
    "currency": "THB",
    "specs": {
      "Rating": "1.8 x 1.8 m",
      "Material": "Woven Fiberglass",
      "Certification": "Safety Standard Approved"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 712
      },
      {
        "min_qty": 10,
        "price": 675
      },
      {
        "min_qty": 20,
        "price": 638
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1043",
    "sku_code": "JNS-SF-1043",
    "barcode": "885110001216",
    "part_name": "Self-Retracting Lifeline (SRL) Fall Arrester Cable 10 Meters",
    "part_name_lo": "ຮອກນິລະໄພດຶງກັບອັດຕະໂນມັດ 10 ແມັດ (ສາຍສະລິງເຫຼັກກ້າ ລັອກທັນທີເມື່ອຕົກ)",
    "category": "Safety Equipment",
    "description": "Workplace safety solution rated 10 Meters Cable manufactured from Steel Wire + Shock Brake to safeguard personnel in industrial environments.",
    "description_lo": "ອຸປະກອນຄວາມປອດໄພໂຮງງານ ມາດຕະຖານ 10 Meters Cable ວັດສະດຸ Steel Wire + Shock Brake ຊ່ວຍປ້ອງກັນອຸບັດຕິເຫດ ແລະ ສ້າງສະພາບແວດລ້ອມການເຮັດວຽກທີ່ປອດໄພ.",
    "image_url": "/images/catalog/real/safety_harness_1787987815266.jpg",
    "qty_on_hand": 40,
    "unit_price": 6800,
    "currency": "THB",
    "specs": {
      "Rating": "10 Meters Cable",
      "Material": "Steel Wire + Shock Brake",
      "Certification": "Safety Standard Approved"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 6460
      },
      {
        "min_qty": 10,
        "price": 6120
      },
      {
        "min_qty": 20,
        "price": 5780
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1044",
    "sku_code": "JNS-SF-1044",
    "barcode": "885110001217",
    "part_name": "Portable 4-Gas Detector Monitor (O2, LEL, CO, H2S with Sound/Light/Vibe Alarm)",
    "part_name_lo": "ເຄື່ອງກວດວັດແກັສອັນຕະລາຍ 4 ຊະນິດ ແບບພົກພາ (O2, LEL, CO, H2S)",
    "category": "Safety Equipment",
    "description": "Workplace safety solution rated 4-Gas Sensor manufactured from Rechargeable Li-Ion to safeguard personnel in industrial environments.",
    "description_lo": "ອຸປະກອນຄວາມປອດໄພໂຮງງານ ມາດຕະຖານ 4-Gas Sensor ວັດສະດຸ Rechargeable Li-Ion ຊ່ວຍປ້ອງກັນອຸບັດຕິເຫດ ແລະ ສ້າງສະພາບແວດລ້ອມການເຮັດວຽກທີ່ປອດໄພ.",
    "image_url": "/images/catalog/real/gas_detector_4gas.jpg",
    "qty_on_hand": 40,
    "unit_price": 8900,
    "currency": "THB",
    "specs": {
      "Rating": "4-Gas Sensor",
      "Material": "Rechargeable Li-Ion",
      "Certification": "Safety Standard Approved"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 8455
      },
      {
        "min_qty": 10,
        "price": 8010
      },
      {
        "min_qty": 20,
        "price": 7565
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-sf-1045",
    "sku_code": "JNS-SF-1045",
    "barcode": "885110001218",
    "part_name": "Confined Space Safety Rescue Tripod with 20m Fall Arrest Winch",
    "part_name_lo": "ຂາຢັ່ງ 3 ຂາ ກູ້ໄພໃນພື້ນທີ່ອັບອາກາດ ພ້ອມລອກສະລິງກູ້ຊີບ 20 ແມັດ",
    "category": "Safety Equipment",
    "description": "Workplace safety solution rated Load 500 kg manufactured from Aluminum Tripod + Winch to safeguard personnel in industrial environments.",
    "description_lo": "ອຸປະກອນຄວາມປອດໄພໂຮງງານ ມາດຕະຖານ Load 500 kg ວັດສະດຸ Aluminum Tripod + Winch ຊ່ວຍປ້ອງກັນອຸບັດຕິເຫດ ແລະ ສ້າງສະພາບແວດລ້ອມການເຮັດວຽກທີ່ປອດໄພ.",
    "image_url": "/images/catalog/real/rescue_tripod_winch.jpg",
    "qty_on_hand": 40,
    "unit_price": 28500,
    "currency": "THB",
    "specs": {
      "Rating": "Load 500 kg",
      "Material": "Aluminum Tripod + Winch",
      "Certification": "Safety Standard Approved"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 27075
      },
      {
        "min_qty": 10,
        "price": 25650
      },
      {
        "min_qty": 20,
        "price": 24225
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1001",
    "sku_code": "JNS-PR-1001",
    "barcode": "885110001219",
    "part_name": "MAXXAM Mobile Double-Sided Magnetic Whiteboard on Stand (120 x 90 cm)",
    "part_name_lo": "ກະດານໄວທ໌ບອດແມ່ເຫຼັກ 2 ໜ້າ MAXXAM ຕິດລໍ້ (120 x 90 ຊມ ໝູນໄດ້ 360 ອົງສາ)",
    "category": "Premises",
    "description": "Reversible double-sided magnetic dry-erase whiteboard on tubular steel stand with 4 locking swivel casters and full-length pen tray.",
    "description_lo": "ກະດານໄວທ໌ບອດແມ່ເຫຼັກ 2 ດ້ານ ຂຽນງ່າຍ ລຶບສະອາດ ໝູນພິກໜ້າ-ຫຼັງໄດ້ 360 ອົງສາ ພ້ອມລາງວາງປາກກາ ແລະ ລໍ້ເລື່ອນມີເບກລັອກ.",
    "image_url": "/images/jenstore-placeholders/product_NTIyMg_6a0a8dc1950f1.webp",
    "qty_on_hand": 25,
    "unit_price": 3200,
    "currency": "THB",
    "specs": {
      "Board Size": "1200 x 900 mm",
      "Sides": "Double-Sided Magnetic",
      "Frame": "Anodized Aluminum",
      "Stand": "Steel with 4 Locking Wheels"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3040
      },
      {
        "min_qty": 10,
        "price": 2880
      },
      {
        "min_qty": 20,
        "price": 2720
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1002",
    "sku_code": "JNS-PR-1002",
    "barcode": "885110001220",
    "part_name": "MAXXAM Mobile Double-Sided Magnetic Whiteboard on Stand (150 x 90 cm)",
    "part_name_lo": "ກະດານໄວທ໌ບອດແມ່ເຫຼັກ 2 ໜ້າ MAXXAM ຕິດລໍ້ (150 x 90 ຊມ ຂາເຫຼັກແຂງແຮງ)",
    "category": "Premises",
    "description": "Reversible double-sided magnetic dry-erase whiteboard on tubular steel stand with 4 locking swivel casters and full-length pen tray.",
    "description_lo": "ກະດານໄວທ໌ບອດແມ່ເຫຼັກ 2 ດ້ານ ຂຽນງ່າຍ ລຶບສະອາດ ໝູນພິກໜ້າ-ຫຼັງໄດ້ 360 ອົງສາ ພ້ອມລາງວາງປາກກາ ແລະ ລໍ້ເລື່ອນມີເບກລັອກ.",
    "image_url": "/images/jenstore-placeholders/product_NTIyMw_6a0a8d9648e6d.webp",
    "qty_on_hand": 25,
    "unit_price": 3850,
    "currency": "THB",
    "specs": {
      "Board Size": "1500 x 900 mm",
      "Sides": "Double-Sided Magnetic",
      "Frame": "Anodized Aluminum",
      "Stand": "Steel with 4 Locking Wheels"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3658
      },
      {
        "min_qty": 10,
        "price": 3465
      },
      {
        "min_qty": 20,
        "price": 3272
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1003",
    "sku_code": "JNS-PR-1003",
    "barcode": "885110001221",
    "part_name": "MAXXAM Mobile Double-Sided Magnetic Whiteboard on Stand (180 x 120 cm)",
    "part_name_lo": "ກະດານໄວທ໌ບອດແມ່ເຫຼັກ 2 ໜ້າ MAXXAM ຕິດລໍ້ (180 x 120 ຊມ ຂະໜາດໃຫຍ່ພິເສດ)",
    "category": "Premises",
    "description": "Reversible double-sided magnetic dry-erase whiteboard on tubular steel stand with 4 locking swivel casters and full-length pen tray.",
    "description_lo": "ກະດານໄວທ໌ບອດແມ່ເຫຼັກ 2 ດ້ານ ຂຽນງ່າຍ ລຶບສະອາດ ໝູນພິກໜ້າ-ຫຼັງໄດ້ 360 ອົງສາ ພ້ອມລາງວາງປາກກາ ແລະ ລໍ້ເລື່ອນມີເບກລັອກ.",
    "image_url": "/images/jenstore-placeholders/product_NTIyNA_6a0a8df2227a3.webp",
    "qty_on_hand": 25,
    "unit_price": 4600,
    "currency": "THB",
    "specs": {
      "Board Size": "1800 x 1200 mm",
      "Sides": "Double-Sided Magnetic",
      "Frame": "Anodized Aluminum",
      "Stand": "Steel with 4 Locking Wheels"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 4370
      },
      {
        "min_qty": 10,
        "price": 4140
      },
      {
        "min_qty": 20,
        "price": 3910
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1004",
    "sku_code": "JNS-PR-1004",
    "barcode": "885110001222",
    "part_name": "Digital Warehouse Thermo-Hygrometer Temperature & Humidity Monitor (Large LCD)",
    "part_name_lo": "ເຄື່ອງວັດອຸນຫະພູມ ແລະ ຄວາມຊຸ່ມດິຈິຕອນປະຈຳສາງ (ຈໍ LCD ໃຫຍ່ ພ້ອມໂມງ)",
    "category": "Premises",
    "description": "Precision warehouse wall monitor displaying indoor temperature, relative humidity, comfort index, and max/min memory.",
    "description_lo": "ເຄື່ອງວັດອຸນຫະພູມ ແລະ ຄວາມຊຸ່ມສຳລັບສາງສິນຄ້າ ຈໍ LCD ຂະໜາດໃຫຍ່ ເຫັນແຈ້ງໄກ ບັນທຶກຄ່າສູງສຸດ-ຕ່ຳສຸດໄດ້.",
    "image_url": "/images/jenstore-placeholders/thermo-hygro-thermometer-e071800010_1_siazrff8v76hnspx.jpg",
    "qty_on_hand": 80,
    "unit_price": 550,
    "currency": "THB",
    "specs": {
      "Temp Range": "-10°C to 50°C",
      "Humidity Range": "10% to 99% RH",
      "Accuracy": "±1°C / ±5% RH",
      "Battery": "1x AAA Included"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 522
      },
      {
        "min_qty": 10,
        "price": 495
      },
      {
        "min_qty": 20,
        "price": 468
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1005",
    "sku_code": "JNS-PR-1005",
    "barcode": "885110001223",
    "part_name": "Commercial 3-Phase Solar On-Grid Inverter 10 kW (Dual MPPT / 380V)",
    "part_name_lo": "ອິນເວີເຕີ້ໂຊລາເຊວ 3 ເຟສ On-Grid 10 kW (Dual MPPT ປະສິດທິພາບ 98.6%)",
    "category": "Premises",
    "description": "High efficiency commercial grid-tied string solar inverter with dual MPPT trackers, IP65 waterproof enclosure, and Wi-Fi monitoring.",
    "description_lo": "ອິນເວີເຕີ້ພະລັງງານແສງອາທິດ 3 ເຟສ 10 kW ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ ລະບົບ Dual MPPT ຕິດຕາມການຜະລິດໄຟຜ່ານມືຖືໄດ້.",
    "image_url": "/images/catalog/real/solar_inverter_1787945369533.jpg",
    "qty_on_hand": 10,
    "unit_price": 34500,
    "currency": "THB",
    "specs": {
      "Rated AC Power": "10,000 W",
      "Max PV Input": "15,000 Wp",
      "MPPT Trackers": "2 Dual MPPT",
      "Efficiency": "98.6% Euro"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 32775
      },
      {
        "min_qty": 10,
        "price": 31050
      },
      {
        "min_qty": 20,
        "price": 29325
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1006",
    "sku_code": "JNS-PR-1006",
    "barcode": "885110001224",
    "part_name": "Integrated All-In-One Solar LED Street Light 150W (Motion Sensor & Remote)",
    "part_name_lo": "ໂຄມໄຟຖະໜົນໂຊລາເຊວ All-In-One 150W (ພ້ອມເຊັນເຊີກວດຈັບການເຄື່ອນໄຫວ ແລະ ຣີໂມດ)",
    "category": "Premises",
    "description": "Self-contained solar street light with monocrystalline panel, long life LiFePO4 battery, 150W high-lumen LED chips, and automatic dusk-to-dawn sensor.",
    "description_lo": "ໄຟຖະໜົນໂຊລາເຊວ 150W ແຜງໂມໂນ ແລະ ແບັດເຕີຣີ LiFePO4 ໃນຕົວ ເຮັດວຽກອັດຕະໂນມັດກາງຄືນ ກັນນ້ຳ IP65 ຕິດຕັ້ງງ່າຍ ບໍ່ຕ້ອງເດີນສາຍໄຟ.",
    "image_url": "/images/catalog/real/solar_street_light_1787989940044.jpg",
    "qty_on_hand": 40,
    "unit_price": 2850,
    "currency": "THB",
    "specs": {
      "LED Power": "150W (18,000 Lumens)",
      "Battery": "LiFePO4 3.2V / 30Ah",
      "Solar Panel": "6V / 25W Mono",
      "Ingress": "IP65 Waterproof"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2708
      },
      {
        "min_qty": 10,
        "price": 2565
      },
      {
        "min_qty": 20,
        "price": 2422
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1007",
    "sku_code": "JNS-PR-1007",
    "barcode": "885110001225",
    "part_name": "High Output Industrial Outdoor LED Flood Light 200W IP66 (Die-Cast Aluminum)",
    "part_name_lo": "ສະປອດໄລ້ LED ອຸດສາຫະກຳກັນນ້ຳ 200W IP66 (ໂຄງອາລູມີນຽມຫຼໍ່ໜາ ລະບາຍຄວາມຮ້ອນດີ)",
    "category": "Premises",
    "description": "Super bright 200W commercial perimeter floodlight with SMD 3030 chips, tempered glass lens, and 120-degree wide beam angle.",
    "description_lo": "ໂຄມສະປອດໄລ້ LED 200W ຄວາມສະຫວ່າງສູງ 24,000 Lumens ສຳລັບລານສາງສິນຄ້າ ແລະ ໄຟຮົ້ວໂຮງງານ ທົນຝົນທົນແດດ IP66.",
    "image_url": "/images/catalog/real/led_flood_light_1787989927255.jpg",
    "qty_on_hand": 50,
    "unit_price": 1850,
    "currency": "THB",
    "specs": {
      "Power": "200W",
      "Brightness": "24,000 Lumens",
      "Color Temp": "6500K Daylight",
      "Protection": "IP66 / IK08"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1758
      },
      {
        "min_qty": 10,
        "price": 1665
      },
      {
        "min_qty": 20,
        "price": 1572
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1008",
    "sku_code": "JNS-PR-1008",
    "barcode": "885110001226",
    "part_name": "Forklift Safety Blue Spotlight LED Pedestrian Warning Lamp (10 - 80V DC)",
    "part_name_lo": "ໄຟສັນຍານສີຟ້າເຕືອນໄພຄົນຍ່າງສຳລັບລົດຍົກ Forklift (10-80V LED Blue Spot)",
    "category": "Premises",
    "description": "Projects a vivid blue spot 5 meters on the ground in front or behind moving forklifts to alert pedestrians around blind warehouse corners.",
    "description_lo": "ໄຟສ່ອງພື້ນສີຟ້າ Blue Spot 10-80V ສາຍແສງລົງພື້ນ 5 ແມັດ ເຕືອນຄົນຍ່າງໃນສາງວ່າກຳລັງມີລົດຍົກແລ່ນມາ ຫຼຸດອຸບັດຕິເຫດ 100%.",
    "image_url": "/images/catalog/real/led_blue_spot_light_1788013961784.jpg",
    "qty_on_hand": 80,
    "unit_price": 850,
    "currency": "THB",
    "specs": {
      "Voltage": "10 - 80V DC Universal",
      "LED": "2x 5W High Power Blue LEDs",
      "Beam": "Focused Spot Beam",
      "Enclosure": "Aluminum IP67"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 808
      },
      {
        "min_qty": 10,
        "price": 765
      },
      {
        "min_qty": 20,
        "price": 722
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1009",
    "sku_code": "JNS-PR-1009",
    "barcode": "885110001227",
    "part_name": "Forklift Front Headlamp Assembly with Steel Guard Cage (12V / 24V)",
    "part_name_lo": "ໂຄມໄຟໜ້າລົດຍົກ Forklift ພ້ອມກົງເຫຼັກປ້ອງກັນກະແທກ (12V/24V)",
    "category": "Premises",
    "description": "Complete replacement front headlight unit equipped with protective steel mesh cage to prevent lens damage from falling cargo.",
    "description_lo": "ຊຸດໂຄມໄຟໜ້າລົດຍົກ ພ້ອມກົງເຫຼັກກັນກະແທກ ປ້ອງກັນສິນຄ້າຕົກໃສ່ໄຟແຕກ ທົນແຮງສັ່ນສະເທືອນສູງ.",
    "image_url": "/images/catalog/real/fl_asm_head_1788016047937.jpg",
    "qty_on_hand": 60,
    "unit_price": 750,
    "currency": "THB",
    "specs": {
      "Voltage": "12V / 24V",
      "Guard": "Welded Steel Wire Cage",
      "Bulb": "H3 Halogen / LED Compatible"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 712
      },
      {
        "min_qty": 10,
        "price": 675
      },
      {
        "min_qty": 20,
        "price": 638
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1010",
    "sku_code": "JNS-PR-1010",
    "barcode": "885110001228",
    "part_name": "Forklift Rear Combination Stop / Tail / Turn Signal Light Assembly",
    "part_name_lo": "ໂຄມໄຟທ້າຍລວມລົດຍົກ Forklift (ໄຟລ້ຽວ + ໄຟເບກ + ໄຟຖອຍ)",
    "category": "Premises",
    "description": "Rear 3-chamber combination vehicle lamp with amber turn, red brake, and clear reverse sections with weatherproof seal.",
    "description_lo": "ໂຄມໄຟທ້າຍລວມ 3 ຫ້ອງ ສີແດງ-ເຫຼືອງ-ຂາວ ຄົບຟັງຊັນ ໄຟເບກ, ໄຟລ້ຽວ ແລະ ໄຟຖອຍຫຼັງ ກັນນ້ຳກັນຝຸ່ນ.",
    "image_url": "/images/catalog/real/fl_asm_tail_1788016060040.jpg",
    "qty_on_hand": 60,
    "unit_price": 680,
    "currency": "THB",
    "specs": {
      "Functions": "Tail, Stop, Turn, Reverse",
      "Voltage": "12V / 24V",
      "Mounting": "Twin Bolt Stud Mount"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 646
      },
      {
        "min_qty": 10,
        "price": 612
      },
      {
        "min_qty": 20,
        "price": 578
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1011",
    "sku_code": "JNS-PR-1011",
    "barcode": "885110001229",
    "part_name": "Corporate Executive Glass Coffee Cup & Saucer Set (Box of 6 Sets)",
    "part_name_lo": "ຊຸດຈອກກາເຟແກ້ວພ້ອມຈານຮອງ ສຳລັບຫ້ອງປະຊຸມຜູ້ບໍລິຫານ (ຊຸດ 6 ຄູ່)",
    "category": "Premises",
    "description": "Clear tempered glass coffee and tea cup set with matching saucers for corporate boardrooms and executive visitor hospitality.",
    "description_lo": "ຊຸດຈອກກາເຟແກ້ວ tempered ເນື້ອໃສພິເສດ ພ້ອມຈານຮອງ ສຳລັບຮັບແຂກຫ້ອງປະຊຸມ ແລະ ຫ້ອງຮັບຮອງ VIP.",
    "image_url": "/images/jenstore-placeholders/glass-coffee-cup-and-saucer-g160500002_2_fbj4waglia3fq3ml.jpg",
    "qty_on_hand": 50,
    "unit_price": 480,
    "currency": "THB",
    "specs": {
      "Quantity": "6 Cups + 6 Saucers",
      "Capacity": "220 ml (7.5 oz)",
      "Material": "Tempered Crystal-Clear Glass"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 456
      },
      {
        "min_qty": 10,
        "price": 432
      },
      {
        "min_qty": 20,
        "price": 408
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1012",
    "sku_code": "JNS-PR-1012",
    "barcode": "885110001230",
    "part_name": "Premium Double-Walled Insulated Heat-Resistant Glass Mug Set (Box of 4 Pcs)",
    "part_name_lo": "ຈອກແກ້ວ 2 ຊັ້ນ ຮັກສາອຸນຫະພູມ Borosilicate (ຊຸດ 4 ໃບ ຈັບບໍ່ຮ້ອນມື)",
    "category": "Premises",
    "description": "Thermal borosilicate double-layer glass mugs that keep coffee hot while remaining cool to the touch on the outside.",
    "description_lo": "ຈອກແກ້ວ 2 ຊັ້ນ Borosilicate ທົນຄວາມຮ້ອນສູງ ຮັກສາຄວາມຮ້ອນ-ເຢັນໄດ້ດີ ຈັບແລ້ວບໍ່ຮ້ອນມື ດີໄຊສ໌ຫຼູຫຼາ.",
    "image_url": "/images/jenstore-placeholders/glass-coffee-cup-and-saucer-g160560001_2_utkrzla2zej2uctf.jpg",
    "qty_on_hand": 40,
    "unit_price": 620,
    "currency": "THB",
    "specs": {
      "Quantity": "4 Glasses",
      "Capacity": "350 ml (12 oz)",
      "Material": "Borosilicate Double Wall Glass"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 589
      },
      {
        "min_qty": 10,
        "price": 558
      },
      {
        "min_qty": 20,
        "price": 527
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1013",
    "sku_code": "JNS-PR-1013",
    "barcode": "885110001231",
    "part_name": "Heavy Base Commercial Drinking Glass Tumbler Set with Non-Slip Silicone Coasters",
    "part_name_lo": "ຊຸດຈອກແກ້ວດື່ມນ້ຳກົ້ນໜາ ພ້ອມແຜ່ນຊິລິໂຄນຮອງຈອກກັນລື່ນ (ຊຸດ 6 ໃບ)",
    "category": "Premises",
    "description": "Durable commercial water tumblers with weighted heavy base and non-scratch silicone desk coasters.",
    "description_lo": "ຈອກດື່ມນ້ຳແກ້ວກົ້ນໜາພິເສດ ຕັ້ງໝັ້ນຄົງ ບໍ່ລົ້ມງ່າຍ ພ້ອມແຜ່ນຊິລິໂຄນຮອງຈອກກັນລື່ນ ສຳລັບໂຕະປະຊຸມ.",
    "image_url": "/images/jenstore-placeholders/glass-tumbler-and-coaster-g160100014_2_404wa1tinegv4j25.jpg",
    "qty_on_hand": 60,
    "unit_price": 390,
    "currency": "THB",
    "specs": {
      "Quantity": "6 Tumblers + 6 Coasters",
      "Capacity": "300 ml",
      "Coaster": "Food-Grade Silicone"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 370
      },
      {
        "min_qty": 10,
        "price": 351
      },
      {
        "min_qty": 20,
        "price": 332
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1014",
    "sku_code": "JNS-PR-1014",
    "barcode": "885110001232",
    "part_name": "High Bay UFO Industrial Warehouse LED Lamp 150W (21,000 Lumens IP65)",
    "part_name_lo": "ໂຄມໄຟໂຮງງານ UFO High Bay LED 150W (ຄວາມສະຫວ່າງ 21,000 Lumens IP65)",
    "category": "Premises",
    "description": "Commercial facility management product rated 150W UFO built with 6500K Daylight for modern enterprise premises.",
    "description_lo": "ອຸປະກອນອາຄານ ແລະ ສະຖານທີ່ ຄຸນນະພາບສູງ ມາດຕະຖານ 150W UFO ວັດສະດຸ 6500K Daylight ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ.",
    "image_url": "/images/catalog/real/led_flood_light_1787989927255.jpg",
    "qty_on_hand": 30,
    "unit_price": 2100,
    "currency": "THB",
    "specs": {
      "Rating": "150W UFO",
      "Specification": "6500K Daylight",
      "Application": "Corporate Premises & Warehouses"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1995
      },
      {
        "min_qty": 10,
        "price": 1890
      },
      {
        "min_qty": 20,
        "price": 1785
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1015",
    "sku_code": "JNS-PR-1015",
    "barcode": "885110001233",
    "part_name": "Outdoor Heavy Duty Mobile Trash Bin with Foot Pedal 120 Liters (Green)",
    "part_name_lo": "ຖັງຂີ້ເຫຍື້ອໃຫຍ່ກາງແຈ້ງ 120 ລິດ ແບບມີຕີນຢຽບເປີດຝາ (ສີຂຽວ ພ້ອມລໍ້ເລື່ອນ)",
    "category": "Premises",
    "description": "Commercial facility management product rated 120 Liters built with Virgin HDPE for modern enterprise premises.",
    "description_lo": "ອຸປະກອນອາຄານ ແລະ ສະຖານທີ່ ຄຸນນະພາບສູງ ມາດຕະຖານ 120 Liters ວັດສະດຸ Virgin HDPE ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ.",
    "image_url": "/images/catalog/real/outdoor_trash_bin_120l.jpg",
    "qty_on_hand": 30,
    "unit_price": 1150,
    "currency": "THB",
    "specs": {
      "Rating": "120 Liters",
      "Specification": "Virgin HDPE",
      "Application": "Corporate Premises & Warehouses"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1092
      },
      {
        "min_qty": 10,
        "price": 1035
      },
      {
        "min_qty": 20,
        "price": 978
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1016",
    "sku_code": "JNS-PR-1016",
    "barcode": "885110001234",
    "part_name": "Color-Coded Waste Recycling Sorting Bin Set of 4 (60 Liters Each)",
    "part_name_lo": "ຊຸດຖັງຂີ້ເຫຍື້ອແຍກປະເພດ 4 ສີ (ຂະໜາດ 60 ລິດ/ຖັງ ພ້ອມສັນຍາລັກ)",
    "category": "Premises",
    "description": "Commercial facility management product rated 4x 60L Bins built with Blue, Green, Yellow, Red for modern enterprise premises.",
    "description_lo": "ອຸປະກອນອາຄານ ແລະ ສະຖານທີ່ ຄຸນນະພາບສູງ ມາດຕະຖານ 4x 60L Bins ວັດສະດຸ Blue, Green, Yellow, Red ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ.",
    "image_url": "/images/catalog/real/outdoor_trash_bin_120l.jpg",
    "qty_on_hand": 30,
    "unit_price": 2650,
    "currency": "THB",
    "specs": {
      "Rating": "4x 60L Bins",
      "Specification": "Blue, Green, Yellow, Red",
      "Application": "Corporate Premises & Warehouses"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2518
      },
      {
        "min_qty": 10,
        "price": 2385
      },
      {
        "min_qty": 20,
        "price": 2252
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1017",
    "sku_code": "JNS-PR-1017",
    "barcode": "885110001235",
    "part_name": "Heavy Duty Rubber Scraper Entrance Door Mat (900 x 1500 mm)",
    "part_name_lo": "ພົມຢາງກັກຝຸ່ນໜ້າປະຕູອາຄານ 900 x 1500 ມມ (ດັກຂີ້ຕົມ ແລະ ນ້ຳໄດ້ດີ)",
    "category": "Premises",
    "description": "Commercial facility management product rated 900 x 1500 mm built with Durable Molded Rubber for modern enterprise premises.",
    "description_lo": "ອຸປະກອນອາຄານ ແລະ ສະຖານທີ່ ຄຸນນະພາບສູງ ມາດຕະຖານ 900 x 1500 mm ວັດສະດຸ Durable Molded Rubber ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ.",
    "image_url": "/images/catalog/real/rubber_conveyor_belt_1787993338719.jpg",
    "qty_on_hand": 30,
    "unit_price": 890,
    "currency": "THB",
    "specs": {
      "Rating": "900 x 1500 mm",
      "Specification": "Durable Molded Rubber",
      "Application": "Corporate Premises & Warehouses"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 846
      },
      {
        "min_qty": 10,
        "price": 801
      },
      {
        "min_qty": 20,
        "price": 756
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1018",
    "sku_code": "JNS-PR-1018",
    "barcode": "885110001236",
    "part_name": "Ergonomic Anti-Fatigue Cushioned Standing Workstation Mat (600 x 900 mm)",
    "part_name_lo": "ແຜ່ນໂຟມຢາງຮອງຢືນກັນເມື່ອຍ 600 x 900 ມມ (ສຳລັບພະນັກງານຢືນເຮັດວຽກ)",
    "category": "Premises",
    "description": "Commercial facility management product rated 600 x 900 mm built with High Density Polyurethane Foam for modern enterprise premises.",
    "description_lo": "ອຸປະກອນອາຄານ ແລະ ສະຖານທີ່ ຄຸນນະພາບສູງ ມາດຕະຖານ 600 x 900 mm ວັດສະດຸ High Density Polyurethane Foam ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ.",
    "image_url": "/images/catalog/real/rubber_conveyor_belt_1787993338719.jpg",
    "qty_on_hand": 30,
    "unit_price": 680,
    "currency": "THB",
    "specs": {
      "Rating": "600 x 900 mm",
      "Specification": "High Density Polyurethane Foam",
      "Application": "Corporate Premises & Warehouses"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 646
      },
      {
        "min_qty": 10,
        "price": 612
      },
      {
        "min_qty": 20,
        "price": 578
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1019",
    "sku_code": "JNS-PR-1019",
    "barcode": "885110001237",
    "part_name": "LED Emergency Exit Sign Light Box with Battery Backup 3 Hours",
    "part_name_lo": "ປ້າຍໄຟທາງອອກສຸກເສີນ LED Exit Sign (ແບັດເຕີຣີສຳຮອງໄຟ 3 ຊົ່ວໂມງ)",
    "category": "Premises",
    "description": "Commercial facility management product rated Emergency Exit built with Backup Battery 3 Hours for modern enterprise premises.",
    "description_lo": "ອຸປະກອນອາຄານ ແລະ ສະຖານທີ່ ຄຸນນະພາບສູງ ມາດຕະຖານ Emergency Exit ວັດສະດຸ Backup Battery 3 Hours ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ.",
    "image_url": "/images/catalog/real/led_flood_light_1787989927255.jpg",
    "qty_on_hand": 30,
    "unit_price": 850,
    "currency": "THB",
    "specs": {
      "Rating": "Emergency Exit",
      "Specification": "Backup Battery 3 Hours",
      "Application": "Corporate Premises & Warehouses"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 808
      },
      {
        "min_qty": 10,
        "price": 765
      },
      {
        "min_qty": 20,
        "price": 722
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1020",
    "sku_code": "JNS-PR-1020",
    "barcode": "885110001238",
    "part_name": "High Speed Automatic Hands-Free Restroom Hand Dryer 1800W Stainless",
    "part_name_lo": "ເຄື່ອງເປົ່າລົມມືອັດຕະໂນມັດ 1800W ສະແຕນເລດ (ລົມແຮງ ແຫ້ງໄວພາຍໃນ 10 ວິນາທີ)",
    "category": "Premises",
    "description": "Commercial facility management product rated 1800W Power built with Brushed SUS304 for modern enterprise premises.",
    "description_lo": "ອຸປະກອນອາຄານ ແລະ ສະຖານທີ່ ຄຸນນະພາບສູງ ມາດຕະຖານ 1800W Power ວັດສະດຸ Brushed SUS304 ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ.",
    "image_url": "/images/catalog/real/commercial_hand_dryer.jpg",
    "qty_on_hand": 30,
    "unit_price": 3400,
    "currency": "THB",
    "specs": {
      "Rating": "1800W Power",
      "Specification": "Brushed SUS304",
      "Application": "Corporate Premises & Warehouses"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3230
      },
      {
        "min_qty": 10,
        "price": 3060
      },
      {
        "min_qty": 20,
        "price": 2890
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1021",
    "sku_code": "JNS-PR-1021",
    "barcode": "885110001239",
    "part_name": "Biometric Fingerprint & RFID Card Time Attendance Recorder",
    "part_name_lo": "ເຄື່ອງສະແກນລາຍນິ້ວມື ແລະ ບັດບັນທຶກເວລາເຂົ້າ-ອອກພະນັກງານ (Wi-Fi + USB)",
    "category": "Premises",
    "description": "Commercial facility management product rated 3000 Users built with Color LCD + Wi-Fi for modern enterprise premises.",
    "description_lo": "ອຸປະກອນອາຄານ ແລະ ສະຖານທີ່ ຄຸນນະພາບສູງ ມາດຕະຖານ 3000 Users ວັດສະດຸ Color LCD + Wi-Fi ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ.",
    "image_url": "/images/catalog/real/biometric_time_attendance.jpg",
    "qty_on_hand": 30,
    "unit_price": 3200,
    "currency": "THB",
    "specs": {
      "Rating": "3000 Users",
      "Specification": "Color LCD + Wi-Fi",
      "Application": "Corporate Premises & Warehouses"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3040
      },
      {
        "min_qty": 10,
        "price": 2880
      },
      {
        "min_qty": 20,
        "price": 2720
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1022",
    "sku_code": "JNS-PR-1022",
    "barcode": "885110001240",
    "part_name": "Industrial 3-Blade Ceiling Fan 56 Inch with Heavy Duty Speed Regulator",
    "part_name_lo": "ພັດລົມເພດານອຸດສາຫະກຳ 3 ໃບພັດ 56 ນິ້ວ ພ້ອມສະວິດປັບຄວາມແຮງ 5 ລະດັບ",
    "category": "Premises",
    "description": "Commercial facility management product rated 56 Inch (1400mm) built with Steel Blades + Copper Motor for modern enterprise premises.",
    "description_lo": "ອຸປະກອນອາຄານ ແລະ ສະຖານທີ່ ຄຸນນະພາບສູງ ມາດຕະຖານ 56 Inch (1400mm) ວັດສະດຸ Steel Blades + Copper Motor ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ.",
    "image_url": "/images/catalog/real/industrial_ceiling_fan.jpg",
    "qty_on_hand": 30,
    "unit_price": 1450,
    "currency": "THB",
    "specs": {
      "Rating": "56 Inch (1400mm)",
      "Specification": "Steel Blades + Copper Motor",
      "Application": "Corporate Premises & Warehouses"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1378
      },
      {
        "min_qty": 10,
        "price": 1305
      },
      {
        "min_qty": 20,
        "price": 1232
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1023",
    "sku_code": "JNS-PR-1023",
    "barcode": "885110001241",
    "part_name": "Heavy Duty Steel Key Cabinet with Numbered Tags & Key Lock (100 Keys)",
    "part_name_lo": "ຕູ້ເກັບລູກກຸນແຈເຫຼັກ 100 ດອກ (ພ້ອມປ້າຍຊື່ ແລະ ເລກກຳກັບ)",
    "category": "Premises",
    "description": "Commercial facility management product rated 100 Key Hooks built with Powder Coated Steel for modern enterprise premises.",
    "description_lo": "ອຸປະກອນອາຄານ ແລະ ສະຖານທີ່ ຄຸນນະພາບສູງ ມາດຕະຖານ 100 Key Hooks ວັດສະດຸ Powder Coated Steel ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ.",
    "image_url": "/images/catalog/real/steel_key_cabinet.jpg",
    "qty_on_hand": 30,
    "unit_price": 1350,
    "currency": "THB",
    "specs": {
      "Rating": "100 Key Hooks",
      "Specification": "Powder Coated Steel",
      "Application": "Corporate Premises & Warehouses"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1282
      },
      {
        "min_qty": 10,
        "price": 1215
      },
      {
        "min_qty": 20,
        "price": 1148
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1024",
    "sku_code": "JNS-PR-1024",
    "barcode": "885110001242",
    "part_name": "Large Silent Sweep Office Wall Clock 16 Inch with Clear Numerals",
    "part_name_lo": "ໂມງແຂວນຝາຫ້ອງການຂະໜາດໃຫຍ່ 16 ນິ້ວ ເຂັມເດີນງຽບ ຕົວເລກໃຫຍ່ເຫັນແຈ້ງ",
    "category": "Premises",
    "description": "Commercial facility management product rated 16 Inch (400mm) built with Silent Quartz Movement for modern enterprise premises.",
    "description_lo": "ອຸປະກອນອາຄານ ແລະ ສະຖານທີ່ ຄຸນນະພາບສູງ ມາດຕະຖານ 16 Inch (400mm) ວັດສະດຸ Silent Quartz Movement ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ.",
    "image_url": "/images/catalog/real/office_wall_clock.jpg",
    "qty_on_hand": 30,
    "unit_price": 450,
    "currency": "THB",
    "specs": {
      "Rating": "16 Inch (400mm)",
      "Specification": "Silent Quartz Movement",
      "Application": "Corporate Premises & Warehouses"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 428
      },
      {
        "min_qty": 10,
        "price": 405
      },
      {
        "min_qty": 20,
        "price": 382
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1025",
    "sku_code": "JNS-PR-1025",
    "barcode": "885110001243",
    "part_name": "Fire Hose Reel Steel Cabinet with 30m Rubber Hose & Brass Jet Spray Nozzle",
    "part_name_lo": "ຕູ້ດັບເພີງໂຄງເຫຼັກພ້ອມສາຍຢາງ 30 ແມັດ ແລະ ຫົວສີດທອງເຫຼືອງຄົບຊຸດ",
    "category": "Premises",
    "description": "Commercial facility management product rated 30m Hose Reel built with 1\" Semi-Rigid Hose for modern enterprise premises.",
    "description_lo": "ອຸປະກອນອາຄານ ແລະ ສະຖານທີ່ ຄຸນນະພາບສູງ ມາດຕະຖານ 30m Hose Reel ວັດສະດຸ 1\" Semi-Rigid Hose ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ.",
    "image_url": "/images/catalog/real/fire_hose_cabinet.jpg",
    "qty_on_hand": 30,
    "unit_price": 8900,
    "currency": "THB",
    "specs": {
      "Rating": "30m Hose Reel",
      "Specification": "1\" Semi-Rigid Hose",
      "Application": "Corporate Premises & Warehouses"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 8455
      },
      {
        "min_qty": 10,
        "price": 8010
      },
      {
        "min_qty": 20,
        "price": 7565
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1026",
    "sku_code": "JNS-PR-1026",
    "barcode": "885110001244",
    "part_name": "Solar LED Floodlight with Separate Monocrystalline Panel 300W",
    "part_name_lo": "ໂຄມໄຟສະປອດໄລ້ໂຊລາເຊວ 300W ແຜງແຍກ (ສາຍຍາວ 5 ແມັດ ພ້ອມຣີໂມດ)",
    "category": "Premises",
    "description": "Commercial facility management product rated 300W Solar built with LiFePO4 36Ah Battery for modern enterprise premises.",
    "description_lo": "ອຸປະກອນອາຄານ ແລະ ສະຖານທີ່ ຄຸນນະພາບສູງ ມາດຕະຖານ 300W Solar ວັດສະດຸ LiFePO4 36Ah Battery ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ.",
    "image_url": "/images/catalog/real/solar_street_light_1787989940044.jpg",
    "qty_on_hand": 30,
    "unit_price": 2200,
    "currency": "THB",
    "specs": {
      "Rating": "300W Solar",
      "Specification": "LiFePO4 36Ah Battery",
      "Application": "Corporate Premises & Warehouses"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2090
      },
      {
        "min_qty": 10,
        "price": 1980
      },
      {
        "min_qty": 20,
        "price": 1870
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1027",
    "sku_code": "JNS-PR-1027",
    "barcode": "885110001245",
    "part_name": "Commercial Stainless Steel Hand Sanitizer Dispenser Stand with Foot Pedal",
    "part_name_lo": "ເສົາສະແຕນເລດກົດເຈວລ້າງມືແບບຕີນຢຽບ (ບໍ່ຕ້ອງໃຊ້ສຳຜັດມື ປອດເຊື້ອ 100%)",
    "category": "Premises",
    "description": "Commercial facility management product rated Foot Pedal Operated built with Stainless Steel 304 for modern enterprise premises.",
    "description_lo": "ອຸປະກອນອາຄານ ແລະ ສະຖານທີ່ ຄຸນນະພາບສູງ ມາດຕະຖານ Foot Pedal Operated ວັດສະດຸ Stainless Steel 304 ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ.",
    "image_url": "/images/catalog/real/automatic_soap_dispenser.jpg",
    "qty_on_hand": 30,
    "unit_price": 1450,
    "currency": "THB",
    "specs": {
      "Rating": "Foot Pedal Operated",
      "Specification": "Stainless Steel 304",
      "Application": "Corporate Premises & Warehouses"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1378
      },
      {
        "min_qty": 10,
        "price": 1305
      },
      {
        "min_qty": 20,
        "price": 1232
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1028",
    "sku_code": "JNS-PR-1028",
    "barcode": "885110001246",
    "part_name": "Heavy Duty UV-Resistant Nylon Cable Ties Assortment Pack (500 Pieces)",
    "part_name_lo": "ສາຍຮັດສາຍໄຟໄນລ່ອນກັນແດດ UV ຂະໜາດ 4\" 6\" 8\" 10\" 12\" (ຊອງ 500 ເສັ້ນ)",
    "category": "Premises",
    "description": "Commercial facility management product rated 500 Pcs Assortment built with UV-Stabilized Nylon 66 for modern enterprise premises.",
    "description_lo": "ອຸປະກອນອາຄານ ແລະ ສະຖານທີ່ ຄຸນນະພາບສູງ ມາດຕະຖານ 500 Pcs Assortment ວັດສະດຸ UV-Stabilized Nylon 66 ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ.",
    "image_url": "/images/catalog/real/strapping_band_roll.jpg",
    "qty_on_hand": 30,
    "unit_price": 280,
    "currency": "THB",
    "specs": {
      "Rating": "500 Pcs Assortment",
      "Specification": "UV-Stabilized Nylon 66",
      "Application": "Corporate Premises & Warehouses"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 266
      },
      {
        "min_qty": 10,
        "price": 252
      },
      {
        "min_qty": 20,
        "price": 238
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1029",
    "sku_code": "JNS-PR-1029",
    "barcode": "885110001247",
    "part_name": "Stainless Steel Wall Smoking Ashtray Receptacle for Outdoor Premises",
    "part_name_lo": "ທີ່ເຂ່ຍຢາສູບສະແຕນເລດຕິດຝາ ສຳລັບພື້ນທີ່ກາງແຈ້ງ (ມີກະແຈລັອກ)",
    "category": "Premises",
    "description": "Commercial facility management product rated Wall Ashtray built with Stainless Steel Weatherproof for modern enterprise premises.",
    "description_lo": "ອຸປະກອນອາຄານ ແລະ ສະຖານທີ່ ຄຸນນະພາບສູງ ມາດຕະຖານ Wall Ashtray ວັດສະດຸ Stainless Steel Weatherproof ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ.",
    "image_url": "/images/catalog/real/outdoor_trash_bin_120l.jpg",
    "qty_on_hand": 30,
    "unit_price": 750,
    "currency": "THB",
    "specs": {
      "Rating": "Wall Ashtray",
      "Specification": "Stainless Steel Weatherproof",
      "Application": "Corporate Premises & Warehouses"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 712
      },
      {
        "min_qty": 10,
        "price": 675
      },
      {
        "min_qty": 20,
        "price": 638
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pr-1030",
    "sku_code": "JNS-PR-1030",
    "barcode": "885110001248",
    "part_name": "Warehouse Perimeter LED Solar Wall Pack Light 50W (Motion Activated)",
    "part_name_lo": "ໂຄມໄຟຕິດຝາຮົ້ວໂຮງງານໂຊລາເຊວ 50W (ເຊັນເຊີກວດຈັບການເຄື່ອນໄຫວອັດຕະໂນມັດ)",
    "category": "Premises",
    "description": "Commercial facility management product rated 50W Solar Wall built with PIR Motion Sensor for modern enterprise premises.",
    "description_lo": "ອຸປະກອນອາຄານ ແລະ ສະຖານທີ່ ຄຸນນະພາບສູງ ມາດຕະຖານ 50W Solar Wall ວັດສະດຸ PIR Motion Sensor ສຳລັບໂຮງງານ ແລະ ອາຄານທຸລະກິດ.",
    "image_url": "/images/catalog/real/solar_street_light_1787989940044.jpg",
    "qty_on_hand": 30,
    "unit_price": 850,
    "currency": "THB",
    "specs": {
      "Rating": "50W Solar Wall",
      "Specification": "PIR Motion Sensor",
      "Application": "Corporate Premises & Warehouses"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 808
      },
      {
        "min_qty": 10,
        "price": 765
      },
      {
        "min_qty": 20,
        "price": 722
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1001",
    "sku_code": "JNS-CL-1001",
    "barcode": "885110001249",
    "part_name": "Heavy Duty Industrial Wet & Dry Vacuum Cleaner 60 Liters (Dual Motor 2000W / Stainless Tank)",
    "part_name_lo": "ເຄື່ອງດູດຝຸ່ນ-ດູດນ້ຳອຸດສາຫະກຳ 60 ລິດ (2 ມໍເຕີ 2000W ຖັງສະແຕນເລດແທ້)",
    "category": "Cleaning",
    "description": "Heavy commercial 2-motor wet/dry vacuum with 60-liter stainless steel tank, washable cartridge filter, drain hose, and full accessory kit.",
    "description_lo": "ເຄື່ອງດູດຝຸ່ນ-ດູດນ້ຳອຸດສາຫະກຳ 60 ລິດ 2 ມໍເຕີ ແຮງດູດສູງ 2000W ຖັງສະແຕນເລດບໍ່ເປັນສະໜິມ ພ້ອມສາຍປ່ອຍນ້ຳຖິ້ມ ແລະ ຫົວດູດຄົບຊຸດ.",
    "image_url": "/images/catalog/real/industrial_vacuum_cleaner_1787993454700.jpg",
    "qty_on_hand": 20,
    "unit_price": 8900,
    "currency": "THB",
    "specs": {
      "Power": "2000W (Dual Independent Motors)",
      "Tank Capacity": "60 Liters Stainless Steel",
      "Airflow": "106 L/sec",
      "Suction Vacuum": "250 mbar"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 8455
      },
      {
        "min_qty": 10,
        "price": 8010
      },
      {
        "min_qty": 20,
        "price": 7565
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1002",
    "sku_code": "JNS-CL-1002",
    "barcode": "885110001250",
    "part_name": "OCTOPUS Rectangular Window & Floor Mop Cleaning Cart with Swivel Wheels & Bottom Drain",
    "part_name_lo": "ລົດເຂັນອຸປະກອນທຳຄວາມສະອາດ OCTOPUS ຊົງສີ່ຫຼ່ຽມ ພ້ອມລໍ້ເລື່ອນ ແລະ ວາວລະບາຍນ້ຳກົ້ນຖັງ",
    "category": "Cleaning",
    "description": "Multi-purpose rectangular janitorial bucket cart with tool hanging clips, caster wheels, and drain valve for commercial window and floor washers.",
    "description_lo": "ລົດເຂັນຖັງທຳຄວາມສະອາດ OCTOPUS ຊົງສີ່ຫຼ່ຽມຍາວ ພ້ອມລໍ້ເລື່ອນ ແລະ ວາວລະບາຍນ້ຳຖິ້ມກົ້ນຖັງ ບໍ່ຕ້ອງຍົກຖັງເທນ້ຳໃຫ້ປວດຫຼັງ.",
    "image_url": "/images/jenstore-placeholders/product_NjgwNw_687720c958561.webp",
    "qty_on_hand": 35,
    "unit_price": 2450,
    "currency": "THB",
    "specs": {
      "Capacity": "45 Liters",
      "Drain": "Bottom Ball Valve Drain",
      "Wheels": "75mm Non-Marking Swivel Casters"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2328
      },
      {
        "min_qty": 10,
        "price": 2205
      },
      {
        "min_qty": 20,
        "price": 2082
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1003",
    "sku_code": "JNS-CL-1003",
    "barcode": "885110001251",
    "part_name": "Commercial Single Mop Wringer Bucket 24 Liters (Yellow - Down-Press Wringer)",
    "part_name_lo": "ຖັງບີບນ້ຳໄມ້ຖູພື້ນ 24 ລິດ (ສີເຫຼືອງ ລະບົບຄັນໂຍກກົດບີບລົງລຸ່ມ)",
    "category": "Cleaning",
    "description": "Heavy duty commercial yellow mop bucket with down-press wringer, 4 non-marking casters, and international caution wet floor imprint.",
    "description_lo": "ຖັງບີບຜ້າຖູພື້ນ 24 ລິດ ສີເຫຼືອງ ຄັນໂຍກກົດລົງລຸ່ມບີບນ້ຳໄດ້ແຫ້ງສະໜິດ ລໍ້ເລື່ອນງຽບ ພ້ອມສັນຍາລັກເຕືອນລະວັງພື້ນລື່ນ.",
    "image_url": "/images/jenstore-placeholders/buckets-mop-wringer-h020100039_1_rbs1yq0pnyitsna5.jpg",
    "qty_on_hand": 60,
    "unit_price": 1450,
    "currency": "THB",
    "specs": {
      "Capacity": "24 Liters",
      "Wringer Type": "Heavy Down-Press",
      "Material": "Impact Resistant Polypropylene"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1378
      },
      {
        "min_qty": 10,
        "price": 1305
      },
      {
        "min_qty": 20,
        "price": 1232
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1004",
    "sku_code": "JNS-CL-1004",
    "barcode": "885110001252",
    "part_name": "Commercial Double Mop Wringer Bucket Cart 36 Liters (Separated Clean & Dirty Water)",
    "part_name_lo": "ລົດເຂັນຖັງບີບນ້ຳໄມ້ຖູພື້ນຖັງຄູ່ 36 ລິດ (ແຍກນ້ຳດີ ແລະ ນ້ຳເປື້ອນ)",
    "category": "Cleaning",
    "description": "Dual-bucket mop cart with 36L total capacity that isolates dirty wastewater from clean detergent solution for superior floor hygiene.",
    "description_lo": "ລົດເຂັນຖັງບີບນ້ຳຖັງຄູ່ 36 ລິດ ແຍກນ້ຳສະອາດ ແລະ ນ້ຳເປື້ອນອອກຈາກກັນ ຊ່ວຍໃຫ້ພື້ນສະອາດແທ້ຈິງ ບໍ່ນຳນ້ຳເປື້ອນກັບມາຖູຊ້ຳ.",
    "image_url": "/images/jenstore-placeholders/buckets-mop-wringer-h020100040_1_v7zbyfvr9ytfrgvq.jpg",
    "qty_on_hand": 40,
    "unit_price": 2850,
    "currency": "THB",
    "specs": {
      "Capacity": "36 Liters (18L Blue + 18L Red)",
      "System": "Clean / Dirty Water Separation",
      "Wringer": "High Efficiency Side-Press"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2708
      },
      {
        "min_qty": 10,
        "price": 2565
      },
      {
        "min_qty": 20,
        "price": 2422
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1005",
    "sku_code": "JNS-CL-1005",
    "barcode": "885110001253",
    "part_name": "Commercial Flat Mop Cleaning Bucket with Integrated Squeegee Drainer Grate",
    "part_name_lo": "ຖັງຊັກ ແລະ ລີດນ້ຳໄມ້ຖູພື້ນຜ້າແປ Flat Mop (ພ້ອມຕະແກງລີດນ້ຳໃນຕົວ)",
    "category": "Cleaning",
    "description": "Rectangular polypropylene wash bucket specifically contoured for 40-60cm microfiber flat mops with internal scraper drainer.",
    "description_lo": "ຖັງຊັກຜ້າຖູພື້ນຊົງຍາວ ສຳລັບຜ້າ Flat Mop ພ້ອມຕະແກງຂູດລີດນ້ຳ ຊັກ ແລະ ລີດແຫ້ງໄດ້ສະດວກໃນຖັງດຽວ.",
    "image_url": "/images/jenstore-placeholders/dust-mop-bucket-h020100033_r3bwl1f54bqftuea.jpg",
    "qty_on_hand": 50,
    "unit_price": 1250,
    "currency": "THB",
    "specs": {
      "Capacity": "22 Liters",
      "Application": "Flat Mop Wash & Squeegee",
      "Dimensions": "550 x 280 x 300 mm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1188
      },
      {
        "min_qty": 10,
        "price": 1125
      },
      {
        "min_qty": 20,
        "price": 1062
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1006",
    "sku_code": "JNS-CL-1006",
    "barcode": "885110001254",
    "part_name": "Heavy Duty Janitorial Side-Press Mop Wringer Bucket 32 Liters (Yellow)",
    "part_name_lo": "ຖັງບີບນ້ຳໄມ້ຖູພື້ນຄັນໂຍກຂ້າງ 32 ລິດ (ສີເຫຼືອງ ໂຄງສ້າງໜາພິເສດ)",
    "category": "Cleaning",
    "description": "High capacity 32L commercial side-press wringer bucket with heavy torsion spring rated for over 50,000 wringing cycles.",
    "description_lo": "ຖັງບີບນ້ຳໄມ້ຖູພື້ນ 32 ລິດ ຄັນໂຍກຂ້າງສະປິງໜາ ໃຊ້ງານໄດ້ຫຼາຍກວ່າ 50,000 ຄັ້ງ ໂຄງສ້າງພລາສຕິກໜຽວພິເສດ.",
    "image_url": "/images/jenstore-placeholders/mop-wringer-h020100005_4_vkvkszzazzqqmo6f.jpg",
    "qty_on_hand": 45,
    "unit_price": 1650,
    "currency": "THB",
    "specs": {
      "Capacity": "32 Liters",
      "Wringer": "Heavy Duty Side-Press",
      "Cycles": "50,000+ Cycles Tested"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1568
      },
      {
        "min_qty": 10,
        "price": 1485
      },
      {
        "min_qty": 20,
        "price": 1402
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1007",
    "sku_code": "JNS-CL-1007",
    "barcode": "885110001255",
    "part_name": "Compact Commercial Mop Bucket 20 Liters on 360° Swivel Wheels",
    "part_name_lo": "ຖັງບີບນ້ຳໄມ້ຖູພື້ນຂະໜາດກະທັດຮັດ 20 ລິດ (ລໍ້ໝູນ 360 ອົງສາ)",
    "category": "Cleaning",
    "description": "Space-saving 20L mop bucket ideal for offices, clinics, retail shops, and small commercial bathrooms.",
    "description_lo": "ຖັງບີບນ້ຳຂະໜາດກະທັດຮັດ 20 ລິດ ນ້ຳໜັກເບົາ ເຂັນງ່າຍ ເໝາະສຳລັບຫ້ອງການ, ຄລີນິກ ແລະ ຮ້ານຄ້າ.",
    "image_url": "/images/jenstore-placeholders/mop-wringer-h020100012_1_xcj6vzohamrbgrwt.jpg",
    "qty_on_hand": 55,
    "unit_price": 1150,
    "currency": "THB",
    "specs": {
      "Capacity": "20 Liters",
      "Wheels": "4 Swivel Casters",
      "Material": "Virgin PP"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1092
      },
      {
        "min_qty": 10,
        "price": 1035
      },
      {
        "min_qty": 20,
        "price": 978
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1008",
    "sku_code": "JNS-CL-1008",
    "barcode": "885110001256",
    "part_name": "Triple-Bucket Hospital & Hotel Janitorial Cleaning Trolley System 81 Liters",
    "part_name_lo": "ລົດເຂັນແມ່ບ້ານໂຮງໝໍ ແລະ ໂຮງແຮມ 3 ຖັງ 81 ລິດ (ລະບົບແຍກໂຊນປອດເຊື້ອ)",
    "category": "Cleaning",
    "description": "Professional hospital grade janitorial cart with three color-coded 27L buckets (81L total), wringer, and waste bag holder for clinical infection control.",
    "description_lo": "ລົດເຂັນແມ່ບ້ານລະດັບໂຮງໝໍ 3 ຖັງ ແຍກ 3 ສີ (ຂະໜາດ 27 ລິດ x 3 = 81 ລິດ) ພ້ອມຖົງເກັບຂີ້ເຫຍື້ອ ປ້ອງກັນການຕິດເຊື້ອຂ້າມພື້ນທີ່.",
    "image_url": "/images/jenstore-placeholders/mop-wringer-with-3-bucket-81-litre-h020100014_krfmrylktdh34ilg.jpg",
    "qty_on_hand": 15,
    "unit_price": 5800,
    "currency": "THB",
    "specs": {
      "Total Capacity": "81 Liters (3x 27L Buckets)",
      "Standard": "Hospital Healthcare Infection Control",
      "Chassis": "Heavy Tubular Steel"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 5510
      },
      {
        "min_qty": 10,
        "price": 5220
      },
      {
        "min_qty": 20,
        "price": 4930
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1009",
    "sku_code": "JNS-CL-1009",
    "barcode": "885110001257",
    "part_name": "Industrial Microfiber Dust Mop 36 Inch with Telescopic Aluminum Handle",
    "part_name_lo": "ໄມ້ດັນຝຸ່ນໄມໂຄຣໄຟເບີ 36 ນິ້ວ ດ້າວອາລູມີນຽມປັບລະດັບ (ຫົວໝູນ 360 ອົງສາ)",
    "category": "Cleaning",
    "description": "Heavy commercial 36\" dust mop with electrostatic microfiber yarn head that traps fine dust without scattering, and 360-degree swivel frame.",
    "description_lo": "ໄມ້ດັນຝຸ່ນຂະໜາດໃຫຍ່ 36 ນິ້ວ ເສັ້ນໄຍໄມໂຄຣໄຟເບີດັກຈັບຝຸ່ນລະອຽດດ້ວຍໄຟຟ້າສະຖິດ ບໍ່ຟຸ້ງກະຈາຍ ດ້າວອາລູມີນຽມແຂງແຮງ.",
    "image_url": "/images/jenstore-placeholders/dust-mop-microfiber-h020920015_tmyurwymvncphuwl.jpg",
    "qty_on_hand": 80,
    "unit_price": 750,
    "currency": "THB",
    "specs": {
      "Width": "36 Inch (90 cm)",
      "Yarn": "Electrostatic Microfiber",
      "Handle": "Telescopic Aluminum 1.5m"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 712
      },
      {
        "min_qty": 10,
        "price": 675
      },
      {
        "min_qty": 20,
        "price": 638
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1010",
    "sku_code": "JNS-CL-1010",
    "barcode": "885110001258",
    "part_name": "Wall-Mounted Broom & Mop Organizer Rack (5 Position Ball Grippers & 6 Hooks)",
    "part_name_lo": "ທີ່ແຂວນໄມ້ກວາດ ແລະ ໄມ້ຖູພື້ນຕິດຝາ (5 ຊ່ອງລັອກລູກກິ້ງ + 6 ຂໍແຂວນ)",
    "category": "Cleaning",
    "description": "Heavy duty wall organizer with rolling rubber balls that automatically adjust to handle thickness to grip mops securely.",
    "description_lo": "ແຜງແຂວນໄມ້ກວາດ-ໄມ້ຖູພື້ນຕິດຝາ ລະບົບລູກກິ້ງຢາງລັອກດ້າວອັດຕະໂນມັດ 5 ຊ່ອງ ແລະ ຂໍແຂວນ 6 ຂໍ ຈັດເກັບອຸປະກອນເປັນລະບຽບ.",
    "image_url": "/images/jenstore-placeholders/cleaning-tool-holder-h029800001-2_uw6walepvpwncfkx.jpg",
    "qty_on_hand": 100,
    "unit_price": 350,
    "currency": "THB",
    "specs": {
      "Capacity": "5 Grippers + 6 Hooks",
      "Material": "ABS Plastic + Non-Slip Rubber",
      "Mounting": "Wall Anchors Included"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 332
      },
      {
        "min_qty": 10,
        "price": 315
      },
      {
        "min_qty": 20,
        "price": 298
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1011",
    "sku_code": "JNS-CL-1011",
    "barcode": "885110001259",
    "part_name": "A-Frame Folding Safety Floor Sign - Caution Wet Floor (English / Thai / Lao)",
    "part_name_lo": "ປ້າຍເຕືອນລະວັງພື້ນລື່ນ ແບບພັບໄດ້ 2 ດ້ານ Caution Wet Floor (ສີເຫຼືອງເຫັນແຈ້ງ)",
    "category": "Cleaning",
    "description": "Bright fluorescent yellow folding floor sign with clear hazard symbol and multi-lingual wet floor warning on both sides.",
    "description_lo": "ປ້າຍເຕືອນລະວັງພື້ນລື່ນຊົງ A-Frame ພັບເກັບງ່າຍ ສີເຫຼືອງສະທ້ອນແສງ ພິມຂໍ້ຄວາມ 2 ດ້ານ ເຕືອນປ້ອງກັນການລົ້ມ.",
    "image_url": "/images/jenstore-placeholders/floor-sign-h070100013_1_y5r7bfd1bckobxpm.jpg",
    "qty_on_hand": 150,
    "unit_price": 280,
    "currency": "THB",
    "specs": {
      "Height": "620 mm",
      "Type": "Double-Sided A-Frame",
      "Material": "Virgin High-Impact Polypropylene"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 266
      },
      {
        "min_qty": 10,
        "price": 252
      },
      {
        "min_qty": 20,
        "price": 238
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1012",
    "sku_code": "JNS-CL-1012",
    "barcode": "885110001260",
    "part_name": "A-Frame Folding Floor Sign - Cleaning in Progress (Yellow Heavy Duty)",
    "part_name_lo": "ປ້າຍເຕືອນກຳລັງທຳຄວາມສະອາດ Cleaning in Progress ແບບພັບໄດ້",
    "category": "Cleaning",
    "description": "Commercial janitorial caution sign indicating ongoing floor scrubbing and maintenance work in corridors and restrooms.",
    "description_lo": "ປ້າຍເຕືອນກຳລັງທຳຄວາມສະອາດ ປ້ອງກັນຄົນຍ່າງຜ່ານຂະນະຖູພື້ນ ຫຼື ຂັດພື້ນ ນ້ຳໜັກເບົາ ພົກພາງ່າຍ.",
    "image_url": "/images/jenstore-placeholders/floor-sign-h070100013-2_f5xnhbrtatynohh1.jpg",
    "qty_on_hand": 120,
    "unit_price": 280,
    "currency": "THB",
    "specs": {
      "Height": "620 mm",
      "Message": "Cleaning in Progress",
      "Color": "Safety Yellow"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 266
      },
      {
        "min_qty": 10,
        "price": 252
      },
      {
        "min_qty": 20,
        "price": 238
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1013",
    "sku_code": "JNS-CL-1013",
    "barcode": "885110001261",
    "part_name": "A-Frame Folding Floor Sign - No Entry / Maintenance Work in Progress",
    "part_name_lo": "ປ້າຍເຕືອນຫ້າມເຂົ້າ / ກຳລັງປັບປຸງສ້ອມແປງ No Entry ແບບພັບໄດ້",
    "category": "Cleaning",
    "description": "Safety barrier warning sign prohibiting unauthorized pedestrian entry into closed restrooms or wet factory production bays.",
    "description_lo": "ປ້າຍເຕືອນຫ້າມເຂົ້າ ຂະນະກຳລັງສ້ອມແປງ ຫຼື ທຳຄວາມສະອາດຫ້ອງນ້ຳ ປ້ອງກັນອຸບັດຕິເຫດ.",
    "image_url": "/images/jenstore-placeholders/floor-sign-h070100013-3_bkrkwqvugkqjr6df.jpg",
    "qty_on_hand": 100,
    "unit_price": 280,
    "currency": "THB",
    "specs": {
      "Height": "620 mm",
      "Message": "No Entry / Maintenance",
      "Color": "Safety Yellow"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 266
      },
      {
        "min_qty": 10,
        "price": 252
      },
      {
        "min_qty": 20,
        "price": 238
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1014",
    "sku_code": "JNS-CL-1014",
    "barcode": "885110001262",
    "part_name": "Industrial Multi-Surface Neutral Floor Cleaner Liquid 20 Liters Pail (Fresh Floral)",
    "part_name_lo": "ນ້ຳຢາຖູພື້ນປະຈຳວັນສູດເຂັ້ມຂຸ້ນ 20 ລິດ (ກິ່ນດອກໄມ້ຫອມ ສູດແຫ້ງໄວ ບໍ່ໜຽວຕີນ)",
    "category": "Cleaning",
    "description": "pH-neutral professional floor cleaning detergent that cuts grime without stripping protective floor finishes or waxes.",
    "description_lo": "ນ້ຳຢາຖູພື້ນສູດເຂັ້ມຂຸ້ນ 20 ລິດ pH ເປັນກາງ ບໍ່ທຳລາຍສານເຄືອບເງົາພື້ນ ແຫ້ງໄວ ຂ້າເຊື້ອໂລກ ແລະ ໃຫ້ກິ່ນຫອມສົດຊື່ນ.",
    "image_url": "/images/jenstore-placeholders/floor-cleaner-h030300027_hej0ptghs6jjugrp.jpg",
    "qty_on_hand": 60,
    "unit_price": 1150,
    "currency": "THB",
    "specs": {
      "Volume": "20 Liters Pail",
      "pH Level": "7.0 (Neutral)",
      "Dilution": "1:60 to 1:120 with Water"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1092
      },
      {
        "min_qty": 10,
        "price": 1035
      },
      {
        "min_qty": 20,
        "price": 978
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1015",
    "sku_code": "JNS-CL-1015",
    "barcode": "885110001263",
    "part_name": "Commercial High-Gloss Acrylic Floor Polish Wax 20 Liters Pail (Slip-Resistant)",
    "part_name_lo": "ນ້ຳຢາເຄືອບເງົາພື້ນອາຄຣີລິກ 20 ລິດ (ເງົາງາມພິເສດ ທົນຮອຍຂູດຂີດ ກັນລື່ນ)",
    "category": "Cleaning",
    "description": "Durable 22% solids acrylic polymer floor finish delivering brilliant wet-look gloss and high scuff resistance for vinyl, terrazzo, and tiles.",
    "description_lo": "ນ້ຳຢາເຄືອບເງົາພື້ນ 20 ລິດ ເນື້ອອາຄຣີລິກ 22% ໃຫ້ຄວາມເງົາງາມແບບ Wet-Look ທົນທານຕໍ່ຮອຍຢາງລົດເຂັນ ແລະ ກັນລື່ນໄດ້ດີ.",
    "image_url": "/images/jenstore-placeholders/floor-finish-h030500015_8vz2b2zvmas5v7ro.jpg",
    "qty_on_hand": 40,
    "unit_price": 2450,
    "currency": "THB",
    "specs": {
      "Volume": "20 Liters Pail",
      "Solids": "22% Acrylic Emulsion",
      "Coverage": "Approx 1000 m2 / Pail"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2328
      },
      {
        "min_qty": 10,
        "price": 2205
      },
      {
        "min_qty": 20,
        "price": 2082
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1016",
    "sku_code": "JNS-CL-1016",
    "barcode": "885110001264",
    "part_name": "Commercial Disinfectant Restroom & Toilet Bowl Cleaner 5 Liters (Acidic Scale Remover)",
    "part_name_lo": "ນ້ຳຢາລ້າງຫ້ອງນ້ຳ ແລະ ຂ້າເຊື້ອໂລກສູດເຂັ້ມຂຸ້ນ 5 ລິດ (ກຳຈັດຄາບຫີນປູນ ແລະ ຄາບເຫຼືອງ)",
    "category": "Cleaning",
    "description": "Powerful disinfectant toilet cleaner formulated to dissolve tough uric acid scale, hard water lime deposits, and eliminate bacteria.",
    "description_lo": "ນ້ຳຢາລ້າງຫ້ອງນ້ຳສູດຂ້າເຊື້ອ 5 ລິດ ຂະຈັດຄາບຫີນປູນ, ຄາບສະໜິມນ້ຳ ແລະ ຄາບເຫຼືອງໄດ້ໝົດຈົດ ດັບກິ່ນອັບໄດ້ດີ.",
    "image_url": "/images/jenstore-placeholders/disinfectant-toilet-cleaner-h030800015_jbhp2oubrqble8hx.jpg",
    "qty_on_hand": 80,
    "unit_price": 450,
    "currency": "THB",
    "specs": {
      "Volume": "5 Liters Gallon",
      "Active": "Hydrochloric Acid & Disinfectant",
      "Action": "Heavy Scale & Bacteria Removal"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 428
      },
      {
        "min_qty": 10,
        "price": 405
      },
      {
        "min_qty": 20,
        "price": 382
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1017",
    "sku_code": "JNS-CL-1017",
    "barcode": "885110001265",
    "part_name": "Heavy Duty Industrial Engine & Factory Floor Degreaser Cleaner 20 Liters",
    "part_name_lo": "ນ້ຳຢາລ້າງຄາບນ້ຳມັນ ແລະ ໄຂມັນອຸດສາຫະກຳສູດໜັກ 20 ລິດ (ລ້າງພື້ນໂຮງງານ ແລະ ເຄື່ອງຈັກ)",
    "category": "Cleaning",
    "description": "Water-based alkaline heavy degreaser designed to emulsify stubborn grease, motor oil, tire marks, and baked-on industrial deposits.",
    "description_lo": "ນ້ຳຢາລ້າງໄຂມັນ ແລະ ຄາບນ້ຳມັນເຄື່ອງສູດເຂັ້ມຂຸ້ນ 20 ລິດ ສູດນ້ຳບໍ່ຕິດໄຟ ລ້າງຄາບຢາງລົດ ແລະ ນ້ຳມັນພື້ນໂຮງງານໄດ້ສະອາດ.",
    "image_url": "/images/jenstore-placeholders/degreaser-h031100008_i8mb1nxzat6jgo25.jpg",
    "qty_on_hand": 50,
    "unit_price": 1450,
    "currency": "THB",
    "specs": {
      "Volume": "20 Liters Pail",
      "Type": "Heavy Duty Alkaline Degreaser",
      "Biodegradable": "Yes"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1378
      },
      {
        "min_qty": 10,
        "price": 1305
      },
      {
        "min_qty": 20,
        "price": 1232
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1018",
    "sku_code": "JNS-CL-1018",
    "barcode": "885110001266",
    "part_name": "Concentrated Commercial Dishwashing Liquid Detergent 20 Liters (Lemon Scent)",
    "part_name_lo": "ນ້ຳຢາລ້າງຈານສູດເຂັ້ມຂຸ້ນສຳລັບຮ້ານອາຫານ ແລະ ໂຮງງານ 20 ລິດ (ກິ່ນໝາກນາວ)",
    "category": "Cleaning",
    "description": "High-foaming grease cutting liquid dish soap for staff canteens, corporate cafeterias, and food processing plants.",
    "description_lo": "ນ້ຳຢາລ້າງຈານສູດເຂັ້ມຂຸ້ນ 20 ລິດ ສຳລັບໂຮງອາຫານໂຮງງານ ແລະ ຮ້ານອາຫານ ລ້າງໄຂມັນໄດ້ສະອາດ ລ້າງອອກງ່າຍ ບໍ່ມີສານຕົກຄ້າງ.",
    "image_url": "/images/jenstore-placeholders/dishwashing-liquid-h031300012_5ntixrd7poqtxmfd.jpg",
    "qty_on_hand": 70,
    "unit_price": 680,
    "currency": "THB",
    "specs": {
      "Volume": "20 Liters Pail",
      "Scent": "Fresh Lemon",
      "Food Contact Grade": "Yes"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 646
      },
      {
        "min_qty": 10,
        "price": 612
      },
      {
        "min_qty": 20,
        "price": 578
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1019",
    "sku_code": "JNS-CL-1019",
    "barcode": "885110001267",
    "part_name": "Alcohol Liquid Hand Sanitizer 75% v/v Hospital Refill Gallon 5 Liters",
    "part_name_lo": "ແອວກໍຮໍນ້ຳລ້າງມື 75% v/v ຂະໜາດແກລອນ 5 ລິດ (ຂ້າເຊື້ອໄວ ບໍ່ຕ້ອງລ້າງນ້ຳ)",
    "category": "Cleaning",
    "description": "Pharmaceutical grade 75% ethyl alcohol liquid hand rub certified to eliminate 99.99% of bacteria, viruses, and germs within 15 seconds.",
    "description_lo": "ແອວກໍຮໍນ້ຳ 75% v/v ຂະໜາດ 5 ລິດ ເກຣດໂຮງໝໍ ແຫ້ງໄວ ບໍ່ໜຽວມື ຂ້າເຊື້ອໄວຣັສ ແລະ ແບັກທີເຣຍ 99.99% ພ້ອມສານບຳລຸງຜິວ.",
    "image_url": "/images/jenstore-placeholders/alcohol-hand-sanitizer-refill-h040800019.jpg",
    "qty_on_hand": 100,
    "unit_price": 550,
    "currency": "THB",
    "specs": {
      "Volume": "5 Liters",
      "Active": "Ethyl Alcohol 75% v/v",
      "Form": "Liquid Refill"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 522
      },
      {
        "min_qty": 10,
        "price": 495
      },
      {
        "min_qty": 20,
        "price": 468
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1020",
    "sku_code": "JNS-CL-1020",
    "barcode": "885110001268",
    "part_name": "Alcohol Gel Hand Sanitizer 75% v/v with Pump Dispenser Bottle (1000 ml)",
    "part_name_lo": "ເຈວແອວກໍຮໍລ້າງມື 75% v/v ຫົວກົດປ້ຳ 1000 ມລ (ມີສານ Aloe Vera ບຳລຸງມື)",
    "category": "Cleaning",
    "description": "Soothing 75% alcohol antiseptic hand gel formulated with vitamin E and aloe vera to protect skin from dryness.",
    "description_lo": "ເຈວລ້າງມືແອວກໍຮໍ 75% ຂະໜາດ 1000 ມລ ຫົວປ້ຳກົດສະດວກ ມີສານສະກັດ Aloe Vera ມືບໍ່ແຫ້ງລອກ ເໝາະສຳລັບວາງໜ້າປະຕູອາຄານ.",
    "image_url": "/images/jenstore-placeholders/alcohol-hand-sanitizer-refill-h040830019.jpg",
    "qty_on_hand": 200,
    "unit_price": 140,
    "currency": "THB",
    "specs": {
      "Volume": "1000 ml",
      "Active": "Ethyl Alcohol 75% v/v",
      "Dispenser": "Pump Bottle"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 133
      },
      {
        "min_qty": 10,
        "price": 126
      },
      {
        "min_qty": 20,
        "price": 119
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1021",
    "sku_code": "JNS-CL-1021",
    "barcode": "885110001269",
    "part_name": "Antibacterial Liquid Hand Soap Gallon 3.8 Liters (Mild Peach Scent)",
    "part_name_lo": "ສະບູແຫຼວລ້າງມືສູດຂ້າເຊື້ອແບັກທີເຣຍ 3.8 ລິດ (ກິ່ນພີດຫອມ ຟອງນຸ່ມ)",
    "category": "Cleaning",
    "description": "Gentle liquid hand soap with antibacterial chloroxylenol agent and moisturizing glycerin for company restrooms.",
    "description_lo": "ສະບູແຫຼວລ້າງມື 3.8 ລິດ ຟອງນຸ່ມລະອຽດ ລ້າງອອກງ່າຍ ຂ້າເຊື້ອແບັກທີເຣຍ ແລະ ບໍ່ເຮັດໃຫ້ຜິວແຫ້ງຕຶງ.",
    "image_url": "/images/jenstore-placeholders/hand-soap-h040600038_yr3brhqagbz8bjhw.jpg",
    "qty_on_hand": 90,
    "unit_price": 380,
    "currency": "THB",
    "specs": {
      "Volume": "3.8 Liters (1 Gallon)",
      "Scent": "Mild Peach",
      "Feature": "Antibacterial + Moisturizer"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 361
      },
      {
        "min_qty": 10,
        "price": 342
      },
      {
        "min_qty": 20,
        "price": 323
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1022",
    "sku_code": "JNS-CL-1022",
    "barcode": "885110001270",
    "part_name": "Oil-Based Dust Mop Dressing & Treatment Liquid 3.8 Liters",
    "part_name_lo": "ນ້ຳຢາເກັບຝຸ່ນ ແລະ ເຄືອບຜ້າດັນຝຸ່ນ 3.8 ລິດ (ຊ່ວຍໃຫ້ຜ້າດູດຝຸ່ນດີຂຶ້ນ 3 ເທົ່າ)",
    "category": "Cleaning",
    "description": "Specialized mineral oil treatment sprayed onto cotton and microfiber dust mops to maximize dust attraction and add subtle floor luster.",
    "description_lo": "ນ້ຳຢາສີດຜ້າດັນຝຸ່ນ 3.8 ລິດ ຊ່ວຍໃຫ້ເສັ້ນໃຍຜ້າດູດຈັບຝຸ່ນລະອຽດໄດ້ດີຂຶ້ນ 3 ເທົ່າ ຝຸ່ນບໍ່ປິວ ແລະ ຊ່ວຍໃຫ້ພື້ນເງົາງາມ.",
    "image_url": "/images/jenstore-placeholders/mop-dressing-h030900014_rnfzvjhbk6cwyfqb.jpg",
    "qty_on_hand": 60,
    "unit_price": 490,
    "currency": "THB",
    "specs": {
      "Volume": "3.8 Liters",
      "Type": "Oil-Based Dust Attractant",
      "Application": "Mop Treatment Spray"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 466
      },
      {
        "min_qty": 10,
        "price": 441
      },
      {
        "min_qty": 20,
        "price": 416
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1023",
    "sku_code": "JNS-CL-1023",
    "barcode": "885110001271",
    "part_name": "Heavy Duty Natural Rubber Household & Janitorial Cleaning Gloves (Yellow Size M)",
    "part_name_lo": "ຖົງມືຢາງທຳຄວາມສະອາດສີເຫຼືອງ ໜາພິເສດ Size M (ພາຍໃນບຸຜ້າກຳມະຫຍີ່)",
    "category": "Cleaning",
    "description": "Tear-resistant yellow latex cleaning gloves with textured non-slip palm grip and soft cotton flock lining for comfort.",
    "description_lo": "ຖົງມືຢາງສີເຫຼືອງສຳລັບແມ່ບ້ານ ໜາພິເສດ ດ້ານໃນບຸຜ້າຝ້າຍນຸ່ມ ຊຶມຊັບເຫື່ອ ຝາມືມີລາຍກັນລື່ນ ຈັບຖ້ວຍ-ຈານບໍ່ແຕກ.",
    "image_url": "/images/jenstore-placeholders/natural-rubber-gloves-h020100034_rdzamtgli4ilpdlh.jpg",
    "qty_on_hand": 300,
    "unit_price": 65,
    "currency": "THB",
    "specs": {
      "Material": "100% Natural Latex",
      "Lining": "Cotton Flock Lined",
      "Size": "Medium (M)"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 62
      },
      {
        "min_qty": 10,
        "price": 58
      },
      {
        "min_qty": 20,
        "price": 55
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1024",
    "sku_code": "JNS-CL-1024",
    "barcode": "885110001272",
    "part_name": "Extra Thick Chemical Resistant Industrial Latex Cleaning Gloves (Orange Size L)",
    "part_name_lo": "ຖົງມືຢາງສີສົ້ມໜາພິເສດ Size L (ສຳລັບງານລ້າງຫ້ອງນ້ຳ ແລະ ຂັດພື້ນ)",
    "category": "Cleaning",
    "description": "Extra thick orange industrial latex gloves providing extended forearm protection against harsh acids, alkalis, and bleaches.",
    "description_lo": "ຖົງມືຢາງສີສົ້ມໜາພິເສດ Size L ຍາວເຖິງເຄິ່ງແຂນ ທົນທານຕໍ່ນ້ຳຢາລ້າງຫ້ອງນ້ຳກົດເຂັ້ມຂຸ້ນ ແລະ ນ້ຳຢາຟອກຂາວ.",
    "image_url": "/images/jenstore-placeholders/natural-rubber-gloves-h020100035_awd8l9qtdjsaoy4i.jpg",
    "qty_on_hand": 250,
    "unit_price": 85,
    "currency": "THB",
    "specs": {
      "Material": "Heavy Natural Latex (20 Mil)",
      "Length": "320 mm",
      "Size": "Large (L)"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 81
      },
      {
        "min_qty": 10,
        "price": 76
      },
      {
        "min_qty": 20,
        "price": 72
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1025",
    "sku_code": "JNS-CL-1025",
    "barcode": "885110001273",
    "part_name": "Commercial Single Disc Floor Scrubber & Polisher 17 Inch 1100W (175 RPM)",
    "part_name_lo": "ເຄື່ອງຂັດພື້ນ ແລະ ລ້າງພື້ນອຸດສາຫະກຳ 17 ນິ້ວ 1100W (ຄວາມໄວ 175 ຮອບ/ນາທີ)",
    "category": "Cleaning",
    "description": "Professional commercial cleaning product specified for 17\" (430mm) Disc made with 1100W Induction Motor to maintain pristine hygiene standards.",
    "description_lo": "ອຸປະກອນ ແລະ ຜະລິດຕະພັນທຳຄວາມສະອາດມາດຕະຖານອົງກອນ ຂະໜາດ 17\" (430mm) Disc ວັດສະດຸ 1100W Induction Motor ຊ່ວຍໃຫ້ສະຖານທີ່ສະອາດ ຖືກສຸຂະອະນາໄມ.",
    "image_url": "/images/catalog/real/commercial_floor_scrubber.jpg",
    "qty_on_hand": 40,
    "unit_price": 16500,
    "currency": "THB",
    "specs": {
      "Capacity": "17\" (430mm) Disc",
      "Material": "1100W Induction Motor",
      "Standard": "Commercial Janitorial Grade"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 15675
      },
      {
        "min_qty": 10,
        "price": 14850
      },
      {
        "min_qty": 20,
        "price": 14025
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1026",
    "sku_code": "JNS-CL-1026",
    "barcode": "885110001274",
    "part_name": "Heavy Duty High Pressure Washer 150 Bar 2200W (Induction Motor with Hose Reel)",
    "part_name_lo": "ເຄື່ອງສີດນ້ຳແຮງດັນສູງ 150 ບາ 2200W (ມໍເຕີອິນດັກຊັ່ນ ທົນທານ ພ້ອມສາຍ 10 ແມັດ)",
    "category": "Cleaning",
    "description": "Professional commercial cleaning product specified for 150 Bar (2175 PSI) made with 2200W Induction to maintain pristine hygiene standards.",
    "description_lo": "ອຸປະກອນ ແລະ ຜະລິດຕະພັນທຳຄວາມສະອາດມາດຕະຖານອົງກອນ ຂະໜາດ 150 Bar (2175 PSI) ວັດສະດຸ 2200W Induction ຊ່ວຍໃຫ້ສະຖານທີ່ສະອາດ ຖືກສຸຂະອະນາໄມ.",
    "image_url": "/images/catalog/real/high_pressure_washer_150bar.jpg",
    "qty_on_hand": 40,
    "unit_price": 7800,
    "currency": "THB",
    "specs": {
      "Capacity": "150 Bar (2175 PSI)",
      "Material": "2200W Induction",
      "Standard": "Commercial Janitorial Grade"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7410
      },
      {
        "min_qty": 10,
        "price": 7020
      },
      {
        "min_qty": 20,
        "price": 6630
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1027",
    "sku_code": "JNS-CL-1027",
    "barcode": "885110001275",
    "part_name": "Professional Commercial Carpet & Upholstery Extractor Vacuum 30 Liters",
    "part_name_lo": "ເຄື່ອງຊັກພົມ ແລະ ເບາະດູດພົ່ນນ້ຳຢາອຸດສາຫະກຳ 30 ລິດ (ຊັກແຫ້ງໄວ)",
    "category": "Cleaning",
    "description": "Professional commercial cleaning product specified for 30L Tank made with Spray Extraction Pump to maintain pristine hygiene standards.",
    "description_lo": "ອຸປະກອນ ແລະ ຜະລິດຕະພັນທຳຄວາມສະອາດມາດຕະຖານອົງກອນ ຂະໜາດ 30L Tank ວັດສະດຸ Spray Extraction Pump ຊ່ວຍໃຫ້ສະຖານທີ່ສະອາດ ຖືກສຸຂະອະນາໄມ.",
    "image_url": "/images/catalog/real/commercial_floor_scrubber.jpg",
    "qty_on_hand": 40,
    "unit_price": 14500,
    "currency": "THB",
    "specs": {
      "Capacity": "30L Tank",
      "Material": "Spray Extraction Pump",
      "Standard": "Commercial Janitorial Grade"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 13775
      },
      {
        "min_qty": 10,
        "price": 13050
      },
      {
        "min_qty": 20,
        "price": 12325
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1028",
    "sku_code": "JNS-CL-1028",
    "barcode": "885110001276",
    "part_name": "Commercial Floor Burnishing Buffing Pads 17 Inch (Box of 5 - Red Spray Buff)",
    "part_name_lo": "ແຜ່ນຂັດເງົາພື້ນ 17 ນິ້ວ ສີແດງ (ກ່ອງ 5 ແຜ່ນ ສຳລັບຂັດເງົາປະຈຳວັນ)",
    "category": "Cleaning",
    "description": "Professional commercial cleaning product specified for 17 Inch (430mm) made with Non-Woven Synthetic Box/5 to maintain pristine hygiene standards.",
    "description_lo": "ອຸປະກອນ ແລະ ຜະລິດຕະພັນທຳຄວາມສະອາດມາດຕະຖານອົງກອນ ຂະໜາດ 17 Inch (430mm) ວັດສະດຸ Non-Woven Synthetic Box/5 ຊ່ວຍໃຫ້ສະຖານທີ່ສະອາດ ຖືກສຸຂະອະນາໄມ.",
    "image_url": "/images/catalog/real/commercial_floor_scrubber.jpg",
    "qty_on_hand": 40,
    "unit_price": 1150,
    "currency": "THB",
    "specs": {
      "Capacity": "17 Inch (430mm)",
      "Material": "Non-Woven Synthetic Box/5",
      "Standard": "Commercial Janitorial Grade"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1092
      },
      {
        "min_qty": 10,
        "price": 1035
      },
      {
        "min_qty": 20,
        "price": 978
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1029",
    "sku_code": "JNS-CL-1029",
    "barcode": "885110001277",
    "part_name": "Commercial Floor Stripping Pads 17 Inch (Box of 5 - Black Heavy Stripper)",
    "part_name_lo": "ແຜ່ນລອກແວັກຊ໌ພື້ນ 17 ນິ້ວ ສີດຳ (ກ່ອງ 5 ແຜ່ນ ລອກຄາບແວັກຊ໌ເກົ່າໄດ້ໝົດຈົດ)",
    "category": "Cleaning",
    "description": "Professional commercial cleaning product specified for 17 Inch (430mm) made with Abrasive Nylon Box/5 to maintain pristine hygiene standards.",
    "description_lo": "ອຸປະກອນ ແລະ ຜະລິດຕະພັນທຳຄວາມສະອາດມາດຕະຖານອົງກອນ ຂະໜາດ 17 Inch (430mm) ວັດສະດຸ Abrasive Nylon Box/5 ຊ່ວຍໃຫ້ສະຖານທີ່ສະອາດ ຖືກສຸຂະອະນາໄມ.",
    "image_url": "/images/catalog/real/commercial_floor_scrubber.jpg",
    "qty_on_hand": 40,
    "unit_price": 1250,
    "currency": "THB",
    "specs": {
      "Capacity": "17 Inch (430mm)",
      "Material": "Abrasive Nylon Box/5",
      "Standard": "Commercial Janitorial Grade"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1188
      },
      {
        "min_qty": 10,
        "price": 1125
      },
      {
        "min_qty": 20,
        "price": 1062
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1030",
    "sku_code": "JNS-CL-1030",
    "barcode": "885110001278",
    "part_name": "Ultra-Fine Microfiber Cleaning Cloths 40x40cm (Assorted Pack of 10 Pcs)",
    "part_name_lo": "ຜ້າເຊັດໄມໂຄຣໄຟເບີຢ່າງໜາ 40x40 ຊມ (ແພັກ 10 ຜືນ 4 ສີ ແຍກການໃຊ້ງານ)",
    "category": "Cleaning",
    "description": "Professional commercial cleaning product specified for 400 x 400 mm made with 80/20 Microfiber 350 GSM to maintain pristine hygiene standards.",
    "description_lo": "ອຸປະກອນ ແລະ ຜະລິດຕະພັນທຳຄວາມສະອາດມາດຕະຖານອົງກອນ ຂະໜາດ 400 x 400 mm ວັດສະດຸ 80/20 Microfiber 350 GSM ຊ່ວຍໃຫ້ສະຖານທີ່ສະອາດ ຖືກສຸຂະອະນາໄມ.",
    "image_url": "/images/catalog/real/lobby_dustpan_broom.jpg",
    "qty_on_hand": 40,
    "unit_price": 280,
    "currency": "THB",
    "specs": {
      "Capacity": "400 x 400 mm",
      "Material": "80/20 Microfiber 350 GSM",
      "Standard": "Commercial Janitorial Grade"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 266
      },
      {
        "min_qty": 10,
        "price": 252
      },
      {
        "min_qty": 20,
        "price": 238
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1031",
    "sku_code": "JNS-CL-1031",
    "barcode": "885110001279",
    "part_name": "Professional Window Cleaning Squeegee with Telescopic Extension Pole (3m)",
    "part_name_lo": "ຊຸດໄມ້ເຊັດແວ່ນພ້ອມດ້າມຕໍ່ຍາວ 3 ແມັດ (ຢາງລີດສະແຕນເລດ + ຜ້າຂົນແກະ)",
    "category": "Cleaning",
    "description": "Professional commercial cleaning product specified for 3.0m Telescopic made with Stainless Squeegee + Washer to maintain pristine hygiene standards.",
    "description_lo": "ອຸປະກອນ ແລະ ຜະລິດຕະພັນທຳຄວາມສະອາດມາດຕະຖານອົງກອນ ຂະໜາດ 3.0m Telescopic ວັດສະດຸ Stainless Squeegee + Washer ຊ່ວຍໃຫ້ສະຖານທີ່ສະອາດ ຖືກສຸຂະອະນາໄມ.",
    "image_url": "/images/catalog/real/lobby_dustpan_broom.jpg",
    "qty_on_hand": 40,
    "unit_price": 890,
    "currency": "THB",
    "specs": {
      "Capacity": "3.0m Telescopic",
      "Material": "Stainless Squeegee + Washer",
      "Standard": "Commercial Janitorial Grade"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 846
      },
      {
        "min_qty": 10,
        "price": 801
      },
      {
        "min_qty": 20,
        "price": 756
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1032",
    "sku_code": "JNS-CL-1032",
    "barcode": "885110001280",
    "part_name": "Heavy Duty Upright Lobby Dustpan & Broom Set with Windproof Cover",
    "part_name_lo": "ຊຸດທີ່ຕັກຂີ້ເຫຍື້ອພ້ອມໄມ້ກວາດແບບມີຝາປິດກັນລົມ (ຕັ້ງໄດ້ເອງ ບໍ່ປິວ)",
    "category": "Cleaning",
    "description": "Professional commercial cleaning product specified for Upright Dustpan made with ABS Plastic + Aluminum Pole to maintain pristine hygiene standards.",
    "description_lo": "ອຸປະກອນ ແລະ ຜະລິດຕະພັນທຳຄວາມສະອາດມາດຕະຖານອົງກອນ ຂະໜາດ Upright Dustpan ວັດສະດຸ ABS Plastic + Aluminum Pole ຊ່ວຍໃຫ້ສະຖານທີ່ສະອາດ ຖືກສຸຂະອະນາໄມ.",
    "image_url": "/images/catalog/real/lobby_dustpan_broom.jpg",
    "qty_on_hand": 40,
    "unit_price": 550,
    "currency": "THB",
    "specs": {
      "Capacity": "Upright Dustpan",
      "Material": "ABS Plastic + Aluminum Pole",
      "Standard": "Commercial Janitorial Grade"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 522
      },
      {
        "min_qty": 10,
        "price": 495
      },
      {
        "min_qty": 20,
        "price": 468
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1033",
    "sku_code": "JNS-CL-1033",
    "barcode": "885110001281",
    "part_name": "Jumbo Roll Stainless Steel Toilet Paper Dispenser (for 9\" Jumbo Rolls)",
    "part_name_lo": "ກ່ອງໃສ່ເຈ້ຍອະນາໄມມ້ວນໃຫຍ່ Jumbo Roll ສະແຕນເລດ 304 (ມີກະແຈລັອກ)",
    "category": "Cleaning",
    "description": "Professional commercial cleaning product specified for 9 Inch Roll made with Brushed Stainless Steel 304 to maintain pristine hygiene standards.",
    "description_lo": "ອຸປະກອນ ແລະ ຜະລິດຕະພັນທຳຄວາມສະອາດມາດຕະຖານອົງກອນ ຂະໜາດ 9 Inch Roll ວັດສະດຸ Brushed Stainless Steel 304 ຊ່ວຍໃຫ້ສະຖານທີ່ສະອາດ ຖືກສຸຂະອະນາໄມ.",
    "image_url": "/images/catalog/real/automatic_soap_dispenser.jpg",
    "qty_on_hand": 40,
    "unit_price": 1150,
    "currency": "THB",
    "specs": {
      "Capacity": "9 Inch Roll",
      "Material": "Brushed Stainless Steel 304",
      "Standard": "Commercial Janitorial Grade"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1092
      },
      {
        "min_qty": 10,
        "price": 1035
      },
      {
        "min_qty": 20,
        "price": 978
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1034",
    "sku_code": "JNS-CL-1034",
    "barcode": "885110001282",
    "part_name": "Touchless Automatic Infrared Sensor Liquid Soap Dispenser 1000ml",
    "part_name_lo": "ເຄື່ອງຈ່າຍສະບູແຫຼວອັດຕະໂນມັດອິນຟຣາເຣດ 1000 ມລ (ບໍ່ຕ້ອງສຳຜັດ)",
    "category": "Cleaning",
    "description": "Professional commercial cleaning product specified for 1000 ml made with Infrared Sensor Battery/DC to maintain pristine hygiene standards.",
    "description_lo": "ອຸປະກອນ ແລະ ຜະລິດຕະພັນທຳຄວາມສະອາດມາດຕະຖານອົງກອນ ຂະໜາດ 1000 ml ວັດສະດຸ Infrared Sensor Battery/DC ຊ່ວຍໃຫ້ສະຖານທີ່ສະອາດ ຖືກສຸຂະອະນາໄມ.",
    "image_url": "/images/catalog/real/automatic_soap_dispenser.jpg",
    "qty_on_hand": 40,
    "unit_price": 1250,
    "currency": "THB",
    "specs": {
      "Capacity": "1000 ml",
      "Material": "Infrared Sensor Battery/DC",
      "Standard": "Commercial Janitorial Grade"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1188
      },
      {
        "min_qty": 10,
        "price": 1125
      },
      {
        "min_qty": 20,
        "price": 1062
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1035",
    "sku_code": "JNS-CL-1035",
    "barcode": "885110001283",
    "part_name": "Programmable Automatic Aerosol Air Freshener Dispenser Machine",
    "part_name_lo": "ເຄື່ອງພົ່ນສະເປຣປັບອາກາດອັດຕະໂນມັດ (ຕັ້ງເວລາພົ່ນໄດ້ 5/15/30 ນາທີ)",
    "category": "Cleaning",
    "description": "Professional commercial cleaning product specified for Aerosol Dispenser made with LCD Programmable Timer to maintain pristine hygiene standards.",
    "description_lo": "ອຸປະກອນ ແລະ ຜະລິດຕະພັນທຳຄວາມສະອາດມາດຕະຖານອົງກອນ ຂະໜາດ Aerosol Dispenser ວັດສະດຸ LCD Programmable Timer ຊ່ວຍໃຫ້ສະຖານທີ່ສະອາດ ຖືກສຸຂະອະນາໄມ.",
    "image_url": "/images/catalog/real/automatic_soap_dispenser.jpg",
    "qty_on_hand": 40,
    "unit_price": 680,
    "currency": "THB",
    "specs": {
      "Capacity": "Aerosol Dispenser",
      "Material": "LCD Programmable Timer",
      "Standard": "Commercial Janitorial Grade"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 646
      },
      {
        "min_qty": 10,
        "price": 612
      },
      {
        "min_qty": 20,
        "price": 578
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1036",
    "sku_code": "JNS-CL-1036",
    "barcode": "885110001284",
    "part_name": "Heavy Duty Industrial Black Garbage Bags 36x45 Inch (Pack of 50 Bags)",
    "part_name_lo": "ຖົງຂີ້ເຫຍື້ອດຳໜາພິເສດ 36x45 ນິ້ວ ສຳລັບຖັງ 120 ລິດ (ແພັກ 50 ໃບ)",
    "category": "Cleaning",
    "description": "Professional commercial cleaning product specified for 36 x 45 Inch made with Heavy Gauge HDPE 50 Pcs to maintain pristine hygiene standards.",
    "description_lo": "ອຸປະກອນ ແລະ ຜະລິດຕະພັນທຳຄວາມສະອາດມາດຕະຖານອົງກອນ ຂະໜາດ 36 x 45 Inch ວັດສະດຸ Heavy Gauge HDPE 50 Pcs ຊ່ວຍໃຫ້ສະຖານທີ່ສະອາດ ຖືກສຸຂະອະນາໄມ.",
    "image_url": "/images/catalog/real/outdoor_trash_bin_120l.jpg",
    "qty_on_hand": 40,
    "unit_price": 320,
    "currency": "THB",
    "specs": {
      "Capacity": "36 x 45 Inch",
      "Material": "Heavy Gauge HDPE 50 Pcs",
      "Standard": "Commercial Janitorial Grade"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 304
      },
      {
        "min_qty": 10,
        "price": 288
      },
      {
        "min_qty": 20,
        "price": 272
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1037",
    "sku_code": "JNS-CL-1037",
    "barcode": "885110001285",
    "part_name": "Bio-Enzymatic Drain Opener & Grease Trap Maintainer 5 Liters",
    "part_name_lo": "ນ້ຳຢາຈຸລິນຊີຍ່ອຍສະຫຼາຍໄຂມັນ ແລະ ທໍ່ຕັນ 5 ລິດ (ກຳຈັດກິ່ນເໝັນທໍ່ລະບາຍນ້ຳ)",
    "category": "Cleaning",
    "description": "Professional commercial cleaning product specified for 5 Liters made with Live Bacterial Enzyme to maintain pristine hygiene standards.",
    "description_lo": "ອຸປະກອນ ແລະ ຜະລິດຕະພັນທຳຄວາມສະອາດມາດຕະຖານອົງກອນ ຂະໜາດ 5 Liters ວັດສະດຸ Live Bacterial Enzyme ຊ່ວຍໃຫ້ສະຖານທີ່ສະອາດ ຖືກສຸຂະອະນາໄມ.",
    "image_url": "/images/catalog/real/transmission_fluid_1787994722473.jpg",
    "qty_on_hand": 40,
    "unit_price": 850,
    "currency": "THB",
    "specs": {
      "Capacity": "5 Liters",
      "Material": "Live Bacterial Enzyme",
      "Standard": "Commercial Janitorial Grade"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 808
      },
      {
        "min_qty": 10,
        "price": 765
      },
      {
        "min_qty": 20,
        "price": 722
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1038",
    "sku_code": "JNS-CL-1038",
    "barcode": "885110001286",
    "part_name": "Stainless Steel Surface Cleaner & Protective Polish Aerosol Spray (500 ml)",
    "part_name_lo": "ສະເປຣທຳຄວາມສະອາດ ແລະ ເຄືອບເງົາສະແຕນເລດ 500 ມລ (ກັນຮອຍນິ້ວມື)",
    "category": "Cleaning",
    "description": "Professional commercial cleaning product specified for 500 ml Aerosol made with Anti-Fingerprint Oil Film to maintain pristine hygiene standards.",
    "description_lo": "ອຸປະກອນ ແລະ ຜະລິດຕະພັນທຳຄວາມສະອາດມາດຕະຖານອົງກອນ ຂະໜາດ 500 ml Aerosol ວັດສະດຸ Anti-Fingerprint Oil Film ຊ່ວຍໃຫ້ສະຖານທີ່ສະອາດ ຖືກສຸຂະອະນາໄມ.",
    "image_url": "/images/catalog/real/transmission_fluid_1787994722473.jpg",
    "qty_on_hand": 40,
    "unit_price": 320,
    "currency": "THB",
    "specs": {
      "Capacity": "500 ml Aerosol",
      "Material": "Anti-Fingerprint Oil Film",
      "Standard": "Commercial Janitorial Grade"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 304
      },
      {
        "min_qty": 10,
        "price": 288
      },
      {
        "min_qty": 20,
        "price": 272
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1039",
    "sku_code": "JNS-CL-1039",
    "barcode": "885110001287",
    "part_name": "Deodorizing Urinal Screen Anti-Splash Mats (Box of 10 - Ocean Breeze)",
    "part_name_lo": "ແຜ່ນຢາງດັບກິ່ນໂຖປັດສະວະຊາຍ ກັນນ້ຳກະເດັນ (ກ່ອງ 10 ແຜ່ນ ກິ່ນຫອມສົດຊື່ນ)",
    "category": "Cleaning",
    "description": "Professional commercial cleaning product specified for Box of 10 Pcs made with Enzymatic Anti-Splash to maintain pristine hygiene standards.",
    "description_lo": "ອຸປະກອນ ແລະ ຜະລິດຕະພັນທຳຄວາມສະອາດມາດຕະຖານອົງກອນ ຂະໜາດ Box of 10 Pcs ວັດສະດຸ Enzymatic Anti-Splash ຊ່ວຍໃຫ້ສະຖານທີ່ສະອາດ ຖືກສຸຂະອະນາໄມ.",
    "image_url": "/images/catalog/real/rubber_conveyor_belt_1787993338719.jpg",
    "qty_on_hand": 40,
    "unit_price": 450,
    "currency": "THB",
    "specs": {
      "Capacity": "Box of 10 Pcs",
      "Material": "Enzymatic Anti-Splash",
      "Standard": "Commercial Janitorial Grade"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 428
      },
      {
        "min_qty": 10,
        "price": 405
      },
      {
        "min_qty": 20,
        "price": 382
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-cl-1040",
    "sku_code": "JNS-CL-1040",
    "barcode": "885110001288",
    "part_name": "Cleanroom Multi-Layer Adhesive Sticky Floor Mat (30 Sheets / Pad)",
    "part_name_lo": "ແຜ່ນກາວດັກຝຸ່ນໜ້າຫ້ອງສະອາດ Sticky Mat (30 ຊັ້ນ/ແຜ່ນ ດັກຝຸ່ນຕິດເກີບ)",
    "category": "Cleaning",
    "description": "Professional commercial cleaning product specified for 600 x 900 mm made with 30 Peel-Off Layers to maintain pristine hygiene standards.",
    "description_lo": "ອຸປະກອນ ແລະ ຜະລິດຕະພັນທຳຄວາມສະອາດມາດຕະຖານອົງກອນ ຂະໜາດ 600 x 900 mm ວັດສະດຸ 30 Peel-Off Layers ຊ່ວຍໃຫ້ສະຖານທີ່ສະອາດ ຖືກສຸຂະອະນາໄມ.",
    "image_url": "/images/catalog/real/rubber_conveyor_belt_1787993338719.jpg",
    "qty_on_hand": 40,
    "unit_price": 650,
    "currency": "THB",
    "specs": {
      "Capacity": "600 x 900 mm",
      "Material": "30 Peel-Off Layers",
      "Standard": "Commercial Janitorial Grade"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 618
      },
      {
        "min_qty": 10,
        "price": 585
      },
      {
        "min_qty": 20,
        "price": 552
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1001",
    "sku_code": "JNS-PK-1001",
    "barcode": "885110001289",
    "part_name": "Heavy Duty Industrial Packaging Workstation Bench with Roll Dispenser & Upper Shelf",
    "part_name_lo": "ໂຕະແພັກເຄື່ອງອຸດສາຫະກຳ JUMBO ພ້ອມແກນໃສ່ມ້ວນຟີມ/ເຈ້ຍ ແລະ ຊັ້ນວາງເທິງ",
    "category": "Packaging",
    "description": "Ergonomic steel packaging table equipped with Kraft paper/bubble wrap spindle bar, upper carton storage shelf, and heavy load capacity.",
    "description_lo": "ໂຕະແພັກສິນຄ້າຂະໜາດໃຫຍ່ ໂຄງເຫຼັກໜາພິເສດ ພ້ອມແກນໃສ່ມ້ວນຟີມຍືດ/ເຈ້ຍກັນກະແທກ ແລະ ຊັ້ນວາງກ່ອງດ້ານເທິງ ຮັບນ້ຳໜັກ 500 ກິໂລ.",
    "image_url": "/images/jenstore-placeholders/packing-bench-j020500008_olaoik6hz6mfzohz.jpg",
    "qty_on_hand": 15,
    "unit_price": 12500,
    "currency": "THB",
    "specs": {
      "Dimensions": "1500 x 800 x 1800 mm",
      "Worktop Capacity": "500 kg",
      "Features": "Spindle Bar + Upper Shelf + Drawer",
      "Finish": "Epoxy Coated"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 11875
      },
      {
        "min_qty": 10,
        "price": 11250
      },
      {
        "min_qty": 20,
        "price": 10625
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1002",
    "sku_code": "JNS-PK-1002",
    "barcode": "885110001290",
    "part_name": "Heavy Duty Rubber EP Conveyor Belt Roll 3-Ply (Width 800mm x Thick 10mm)",
    "part_name_lo": "ສາຍພານລຳລຽງຢາງດຳ EP 3 ຊັ້ນ (ໜ້າງວ້າງ 800 ມມ ໜາ 10 ມມ ທົນແຮງດຶງສູງ)",
    "category": "Packaging",
    "description": "Industrial fabric reinforced EP-400 polyester/nylon multi-ply rubber conveyor belting for bulk aggregate, mining, and factory assembly lines.",
    "description_lo": "ສາຍພານລຳລຽງຢາງດຳເສີມຜ້າໃບ EP 3 ຊັ້ນ ໜ້າກວ້າງ 800 ມມ ທົນແຮງດຶງສູງ ທົນຕໍ່ການສຽດສີ ແລະ ແຮງກະແທກ ໃຊ້ໃນໂຮງງານ ແລະ ບໍ່ຫີນ.",
    "image_url": "/images/catalog/real/conveyor_belt_roll_1787995187053.jpg",
    "qty_on_hand": 10,
    "unit_price": 28500,
    "currency": "THB",
    "specs": {
      "Width": "800 mm",
      "Thickness": "10 mm (Cover 4+2mm)",
      "Fabric Plies": "3-Ply EP-400",
      "Tensile Strength": "400 N/mm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 27075
      },
      {
        "min_qty": 10,
        "price": 25650
      },
      {
        "min_qty": 20,
        "price": 24225
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1003",
    "sku_code": "JNS-PK-1003",
    "barcode": "885110001291",
    "part_name": "Chevron Cleated Incline Rough-Top Rubber Conveyor Belt (Width 600mm)",
    "part_name_lo": "ສາຍພານລຳລຽງລາຍບັ້ງ Chevron 600 ມມ (ສຳລັບລຳລຽງຂຶ້ນບ່ອນສູງຊັນ ກັນສິນຄ້າໄຫຼ)",
    "category": "Packaging",
    "description": "Chevron patterned cleated rubber conveyor belt designed for conveying boxes, bags, and sand up steep inclines up to 35 degrees without slipping.",
    "description_lo": "ສາຍພານລາຍບັ້ງ Chevron ໜ້າກວ້າງ 600 ມມ ສຳລັບລຳລຽງສິນຄ້າ, ກະສອບ ແລະ ວັດສະດຸຂຶ້ນບ່ອນສູງຊັນເຖິງ 35 ອົງສາ ບໍ່ໄຫຼຍ້ອນ.",
    "image_url": "/images/catalog/real/rubber_conveyor_belt_1787993338719.jpg",
    "qty_on_hand": 12,
    "unit_price": 22500,
    "currency": "THB",
    "specs": {
      "Width": "600 mm",
      "Cleat Height": "15 mm Chevron",
      "Incline Angle": "Up to 35°",
      "Tensile Rating": "EP-300"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 21375
      },
      {
        "min_qty": 10,
        "price": 20250
      },
      {
        "min_qty": 20,
        "price": 19125
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1004",
    "sku_code": "JNS-PK-1004",
    "barcode": "885110001292",
    "part_name": "Industrial Classical Wrapped V-Belt (B-Section B68 Heat & Oil Resistant)",
    "part_name_lo": "ສາຍພານລົດ ແລະ ເຄື່ອງຈັກອຸດສາຫະກຳ V-Belt ຮ່ອງ B ເບີ B68 (ທົນຄວາມຮ້ອນ ແລະ ນ້ຳມັນ)",
    "category": "Packaging",
    "description": "High tensile polyester cord wrapped classical V-belt engineered for industrial motors, fans, pumps, and agricultural machinery drives.",
    "description_lo": "ສາຍພານຮ່ອງ B ເບີ B68 ເສັ້ນໃຍໂພລີເອສເຕີແຮງດຶງສູງ ທົນຄວາມຮ້ອນ ແລະ ນ້ຳມັນ ບໍ່ຢືດງ່າຍ ສົ່ງກຳລັງໄດ້ເຕັມປະສິດທິພາບ.",
    "image_url": "/images/catalog/real/v_belt_1787989743529.jpg",
    "qty_on_hand": 100,
    "unit_price": 280,
    "currency": "THB",
    "specs": {
      "Section": "B-Section (Width 17mm x Height 11mm)",
      "Inside Length": "68 Inches (1727 mm)",
      "Standard": "DIN 2215 / ISO 4184"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 266
      },
      {
        "min_qty": 10,
        "price": 252
      },
      {
        "min_qty": 20,
        "price": 238
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1005",
    "sku_code": "JNS-PK-1005",
    "barcode": "885110001293",
    "part_name": "Heavy Duty Ribbed Serpentine Cooling Fan Belt (6PK-1230 EPDM Rubber)",
    "part_name_lo": "ສາຍພານໜ້າເຄື່ອງລົດຍົກ 6PK-1230 ຢາງ EPDM (ທົນຄວາມຮ້ອນສູງ ເກາະມູ່ເລ່ແໜ້ນ)",
    "category": "Packaging",
    "description": "Multi-ribbed serpentine belt made of heat-resistant EPDM rubber with aramid tensile cords to drive water pumps and alternators quietly.",
    "description_lo": "ສາຍພານ 6PK-1230 ເນື້ອຢາງ EPDM ຄຸນນະພາບສູງ ສຳລັບຂັບປັ໊ມນ້ຳ ແລະ ໄດຊາດລົດຍົກ ທົນຄວາມຮ້ອນສູງ ບໍ່ມີສຽງດັງອິ໊ດໆ.",
    "image_url": "/images/catalog/real/fl_fan_belt_1788017046268.jpg",
    "qty_on_hand": 80,
    "unit_price": 420,
    "currency": "THB",
    "specs": {
      "Ribs": "6 Ribs",
      "Length": "1230 mm",
      "Material": "High Grade EPDM Rubber"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 399
      },
      {
        "min_qty": 10,
        "price": 378
      },
      {
        "min_qty": 20,
        "price": 357
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1006",
    "sku_code": "JNS-PK-1006",
    "barcode": "885110001294",
    "part_name": "Galvanized Steel Wire Rope Cable Roll 6x19 IWRC (Dia 12mm x Length 100m)",
    "part_name_lo": "ລວດສະລິງເຫຼັກຊຸບກາວາໄນສ໌ 6x19 IWRC ຂະໜາດ 12 ມມ (ມ້ວນ 100 ແມັດ ໄສ້ເຫຼັກ)",
    "category": "Packaging",
    "description": "High tensile galvanized steel wire rope with Independent Wire Rope Core (IWRC) for hoists, cranes, winches, and heavy rigging.",
    "description_lo": "ລວດສະລິງເຫຼັກຊຸບກາວາໄນສ໌ 12 ມມ ມ້ວນ 100 ແມັດ ໂຄງສ້າງ 6x19 ໄສ້ເຫຼັກແທ້ (IWRC) ທົນແຮງດຶງສູງ ສຳລັບຮອກ, ເຄນ ແລະ ງານຍົກ.",
    "image_url": "/images/catalog/real/wire_rope_1787989880792.jpg",
    "qty_on_hand": 20,
    "unit_price": 5800,
    "currency": "THB",
    "specs": {
      "Diameter": "12 mm",
      "Length": "100 Meters Roll",
      "Construction": "6x19+IWRC (Steel Core)",
      "Breaking Load": "85.6 kN (8.7 Tons)"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 5510
      },
      {
        "min_qty": 10,
        "price": 5220
      },
      {
        "min_qty": 20,
        "price": 4930
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1007",
    "sku_code": "JNS-PK-1007",
    "barcode": "885110001295",
    "part_name": "High Tensile Hex Head Cap Screws & Nuts Grade 8.8 (M16 x 60mm Box of 50 Pcs)",
    "part_name_lo": "ນັອດຫົວກົກເຫຼັກແຂງເກຣດ 8.8 ຂະໜາດ M16 x 60 ມມ ພ້ອມຫົວນັອດ (ກ່ອງ 50 ຊຸດ)",
    "category": "Packaging",
    "description": "Medium carbon alloy steel Grade 8.8 zinc plated bolts and nuts for heavy machinery mounting, structural steel, and flanges.",
    "description_lo": "ນັອດເຫຼັກແຂງ Grade 8.8 ຂະໜາດ M16x60 ມມ ຊຸບຊິງຄ໌ຂາວ ພ້ອມຫົວນັອດ (ກ່ອງ 50 ຊຸດ) ຮັບແຮງດຶງແຮງຕັດສູງ ສຳລັບປະກອບໂຄງສ້າງ.",
    "image_url": "/images/catalog/real/grade_8_bolts_1787995172620.jpg",
    "qty_on_hand": 40,
    "unit_price": 1450,
    "currency": "THB",
    "specs": {
      "Thread Size": "M16 x 2.0 mm",
      "Length": "60 mm",
      "Grade": "Class 8.8 High Tensile",
      "Quantity": "50 Sets (Bolt + Nut + Washers)"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1378
      },
      {
        "min_qty": 10,
        "price": 1305
      },
      {
        "min_qty": 20,
        "price": 1232
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1008",
    "sku_code": "JNS-PK-1008",
    "barcode": "885110001296",
    "part_name": "Heavy Structural Hex Flange Bolts Grade 10.9 (M20 x 80mm Box of 25 Pcs)",
    "part_name_lo": "ນັອດໂຄງສ້າງເຫຼັກໜັກ Grade 10.9 ຂະໜາດ M20 x 80 ມມ (ກ່ອງ 25 ໂຕ ດຳແຂງພິເສດ)",
    "category": "Packaging",
    "description": "High strength Grade 10.9 black oxide structural bolts for mining crusher frames, vibrating screens, and heavy earthmoving attachments.",
    "description_lo": "ນັອດເຫຼັກແຂງພິເສດ Grade 10.9 ຂະໜາດ M20x80 ມມ ລົມດຳກັນສະໜິມ ສຳລັບເຄື່ອງຈັກບໍ່ແຮ່ ແລະ ໂຄງສ້າງທີ່ຮັບແຮງສັ່ນສະເທືອນສູງ.",
    "image_url": "/images/catalog/real/high_tensile_bolt_1787993197960.jpg",
    "qty_on_hand": 35,
    "unit_price": 1850,
    "currency": "THB",
    "specs": {
      "Thread Size": "M20 x 2.5 mm",
      "Length": "80 mm",
      "Grade": "Class 10.9 Extra High Tensile",
      "Quantity": "25 Pcs/Box"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1758
      },
      {
        "min_qty": 10,
        "price": 1665
      },
      {
        "min_qty": 20,
        "price": 1572
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1009",
    "sku_code": "JNS-PK-1009",
    "barcode": "885110001297",
    "part_name": "WD-40 3-IN-ONE Professional Air Conditioner Cleaner Foam Spray (400 ml)",
    "part_name_lo": "ສະເປຣໂຟມລ້າງແອ 3-IN-ONE ໂດຍ WD-40 ຂະໜາດ 400 ມລ (ຂ້າເຊື້ອ ແລະ ດັບກິ່ນອັບ)",
    "category": "Packaging",
    "description": "Professional industrial aerosol spray Air Conditioner Cleaning Foam formulated for preventive maintenance, corrosion prevention, and optimal machinery operation.",
    "description_lo": "ສະເປຣບຳລຸງຮັກສາເຄື່ອງຈັກອຸດສາຫະກຳ Air Conditioner Cleaning Foam ຂະໜາດ 400 ml ປ້ອງກັນສະໜິມ ຫຼຸດການສຽດສີ ຍືດອາຍຸການໃຊ້ງານຂອງອຸປະກອນ.",
    "image_url": "/images/jenstore-placeholders/product_MTI5MzQ_65af9b4025efe.webp",
    "qty_on_hand": 100,
    "unit_price": 280,
    "currency": "THB",
    "specs": {
      "Volume": "400 ml",
      "Product Type": "Air Conditioner Cleaning Foam",
      "Brand": "WD-40 / Specialist"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 266
      },
      {
        "min_qty": 10,
        "price": 252
      },
      {
        "min_qty": 20,
        "price": 238
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1010",
    "sku_code": "JNS-PK-1010",
    "barcode": "885110001298",
    "part_name": "WD-40 Specialist High Performance White Lithium Grease Spray (360 ml)",
    "part_name_lo": "ສະເປຣຈາລະບີຂາວ WD-40 Specialist White Lithium Grease 360 ມລ (ກັນນ້ຳ ແລະ ຄວາມຮ້ອນ)",
    "category": "Packaging",
    "description": "Professional industrial aerosol spray White Lithium Grease Spray formulated for preventive maintenance, corrosion prevention, and optimal machinery operation.",
    "description_lo": "ສະເປຣບຳລຸງຮັກສາເຄື່ອງຈັກອຸດສາຫະກຳ White Lithium Grease Spray ຂະໜາດ 360 ml ປ້ອງກັນສະໜິມ ຫຼຸດການສຽດສີ ຍືດອາຍຸການໃຊ້ງານຂອງອຸປະກອນ.",
    "image_url": "/images/jenstore-placeholders/product_MTI5NDA_697c838c5a21d.webp",
    "qty_on_hand": 100,
    "unit_price": 320,
    "currency": "THB",
    "specs": {
      "Volume": "360 ml",
      "Product Type": "White Lithium Grease Spray",
      "Brand": "WD-40 / Specialist"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 304
      },
      {
        "min_qty": 10,
        "price": 288
      },
      {
        "min_qty": 20,
        "price": 272
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1011",
    "sku_code": "JNS-PK-1011",
    "barcode": "885110001299",
    "part_name": "WD-40 Specialist Fast Acting Industrial Machine Degreaser Spray (450 ml)",
    "part_name_lo": "ສະເປຣລ້າງຄາບນ້ຳມັນເຄື່ອງຈັກ WD-40 Specialist Fast Acting Degreaser 450 ມລ",
    "category": "Packaging",
    "description": "Professional industrial aerosol spray Industrial Fast Acting Degreaser formulated for preventive maintenance, corrosion prevention, and optimal machinery operation.",
    "description_lo": "ສະເປຣບຳລຸງຮັກສາເຄື່ອງຈັກອຸດສາຫະກຳ Industrial Fast Acting Degreaser ຂະໜາດ 450 ml ປ້ອງກັນສະໜິມ ຫຼຸດການສຽດສີ ຍືດອາຍຸການໃຊ້ງານຂອງອຸປະກອນ.",
    "image_url": "/images/jenstore-placeholders/product_MTI5NDI_697c8407372aa.webp",
    "qty_on_hand": 100,
    "unit_price": 340,
    "currency": "THB",
    "specs": {
      "Volume": "450 ml",
      "Product Type": "Industrial Fast Acting Degreaser",
      "Brand": "WD-40 / Specialist"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 323
      },
      {
        "min_qty": 10,
        "price": 306
      },
      {
        "min_qty": 20,
        "price": 289
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1012",
    "sku_code": "JNS-PK-1012",
    "barcode": "885110001300",
    "part_name": "WD-40 Specialist Fast Drying Electrical Contact Cleaner Spray (360 ml)",
    "part_name_lo": "ສະເປຣລ້າງໜ້າສຳຜັດໄຟຟ້າ WD-40 Specialist Contact Cleaner 360 ມລ (ແຫ້ງໄວ ບໍ່ຕິດໄຟ)",
    "category": "Packaging",
    "description": "Professional industrial aerosol spray Electrical Contact Cleaner formulated for preventive maintenance, corrosion prevention, and optimal machinery operation.",
    "description_lo": "ສະເປຣບຳລຸງຮັກສາເຄື່ອງຈັກອຸດສາຫະກຳ Electrical Contact Cleaner ຂະໜາດ 360 ml ປ້ອງກັນສະໜິມ ຫຼຸດການສຽດສີ ຍືດອາຍຸການໃຊ້ງານຂອງອຸປະກອນ.",
    "image_url": "/images/jenstore-placeholders/product_MTI5NDM_697c83e8c6ea8.webp",
    "qty_on_hand": 100,
    "unit_price": 310,
    "currency": "THB",
    "specs": {
      "Volume": "360 ml",
      "Product Type": "Electrical Contact Cleaner",
      "Brand": "WD-40 / Specialist"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 294
      },
      {
        "min_qty": 10,
        "price": 279
      },
      {
        "min_qty": 20,
        "price": 264
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1013",
    "sku_code": "JNS-PK-1013",
    "barcode": "885110001301",
    "part_name": "WD-40 Specialist High Performance Silicone Lubricant Spray (360 ml)",
    "part_name_lo": "ສະເປຣຊິລິໂຄນຫຼໍ່ລື່ນ WD-40 Specialist Silicone Lubricant 360 ມລ (ສຳລັບຢາງ ແລະ ພລາສຕິກ)",
    "category": "Packaging",
    "description": "Professional industrial aerosol spray Water-Resistant Silicone formulated for preventive maintenance, corrosion prevention, and optimal machinery operation.",
    "description_lo": "ສະເປຣບຳລຸງຮັກສາເຄື່ອງຈັກອຸດສາຫະກຳ Water-Resistant Silicone ຂະໜາດ 360 ml ປ້ອງກັນສະໜິມ ຫຼຸດການສຽດສີ ຍືດອາຍຸການໃຊ້ງານຂອງອຸປະກອນ.",
    "image_url": "/images/jenstore-placeholders/product_MTI5NDQ_697c842f7c909.webp",
    "qty_on_hand": 100,
    "unit_price": 310,
    "currency": "THB",
    "specs": {
      "Volume": "360 ml",
      "Product Type": "Water-Resistant Silicone",
      "Brand": "WD-40 / Specialist"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 294
      },
      {
        "min_qty": 10,
        "price": 279
      },
      {
        "min_qty": 20,
        "price": 264
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1014",
    "sku_code": "JNS-PK-1014",
    "barcode": "885110001302",
    "part_name": "Industrial Chain & Cable Heavy Penetrating Lubricant Spray (400 ml)",
    "part_name_lo": "ສະເປຣຫຼໍ່ລື່ນໂສ້ ແລະ ສາຍສະລິງອຸດສາຫະກຳ 400 ມລ (ແຊກຊຶມເລິກ ບໍ່ດີດກະເດັນ)",
    "category": "Packaging",
    "description": "Professional industrial aerosol spray Heavy Duty Chain & Cable Lube formulated for preventive maintenance, corrosion prevention, and optimal machinery operation.",
    "description_lo": "ສະເປຣບຳລຸງຮັກສາເຄື່ອງຈັກອຸດສາຫະກຳ Heavy Duty Chain & Cable Lube ຂະໜາດ 400 ml ປ້ອງກັນສະໜິມ ຫຼຸດການສຽດສີ ຍືດອາຍຸການໃຊ້ງານຂອງອຸປະກອນ.",
    "image_url": "/images/jenstore-placeholders/lubricant-and-cleaner-e020100004_1k47vmhbtvcq2qxm.jpg",
    "qty_on_hand": 100,
    "unit_price": 260,
    "currency": "THB",
    "specs": {
      "Volume": "400 ml",
      "Product Type": "Heavy Duty Chain & Cable Lube",
      "Brand": "WD-40 / Specialist"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 247
      },
      {
        "min_qty": 10,
        "price": 234
      },
      {
        "min_qty": 20,
        "price": 221
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1015",
    "sku_code": "JNS-PK-1015",
    "barcode": "885110001303",
    "part_name": "WD-40 Multi-Use Penetrating Oil & Rust Remover Spray (191 ml Compact)",
    "part_name_lo": "ສະເປຣອະເນກປະສົງ WD-40 ຂະໜາດ 191 ມລ (ໄລ່ຄວາມຊຸ່ມ ຄາຍນັອດຕິດສະໜິມ)",
    "category": "Packaging",
    "description": "Professional industrial aerosol spray Multi-Use Lubricant formulated for preventive maintenance, corrosion prevention, and optimal machinery operation.",
    "description_lo": "ສະເປຣບຳລຸງຮັກສາເຄື່ອງຈັກອຸດສາຫະກຳ Multi-Use Lubricant ຂະໜາດ 191 ml ປ້ອງກັນສະໜິມ ຫຼຸດການສຽດສີ ຍືດອາຍຸການໃຊ້ງານຂອງອຸປະກອນ.",
    "image_url": "/images/jenstore-placeholders/multi-purpose-lubricant-e020100008_nb0chup13jr33roe.jpg",
    "qty_on_hand": 100,
    "unit_price": 140,
    "currency": "THB",
    "specs": {
      "Volume": "191 ml",
      "Product Type": "Multi-Use Lubricant",
      "Brand": "WD-40 / Specialist"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 133
      },
      {
        "min_qty": 10,
        "price": 126
      },
      {
        "min_qty": 20,
        "price": 119
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1016",
    "sku_code": "JNS-PK-1016",
    "barcode": "885110001304",
    "part_name": "WD-40 Multi-Use Product with Smart Straw 2-Way Spray Nozzle (412 ml)",
    "part_name_lo": "ສະເປຣອະເນກປະສົງ WD-40 ຫົວສີດອັດສະລິຍະ Smart Straw 412 ມລ (ສີດກະຈາຍ ຫຼື ສີດເຈາະຈົງ)",
    "category": "Packaging",
    "description": "Professional industrial aerosol spray Smart Straw 2-Way Spray formulated for preventive maintenance, corrosion prevention, and optimal machinery operation.",
    "description_lo": "ສະເປຣບຳລຸງຮັກສາເຄື່ອງຈັກອຸດສາຫະກຳ Smart Straw 2-Way Spray ຂະໜາດ 412 ml ປ້ອງກັນສະໜິມ ຫຼຸດການສຽດສີ ຍືດອາຍຸການໃຊ້ງານຂອງອຸປະກອນ.",
    "image_url": "/images/jenstore-placeholders/multi-purpose-lubricant-e020100010_3evlf363tsc69u7u.jpg",
    "qty_on_hand": 100,
    "unit_price": 260,
    "currency": "THB",
    "specs": {
      "Volume": "412 ml",
      "Product Type": "Smart Straw 2-Way Spray",
      "Brand": "WD-40 / Specialist"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 247
      },
      {
        "min_qty": 10,
        "price": 234
      },
      {
        "min_qty": 20,
        "price": 221
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1017",
    "sku_code": "JNS-PK-1017",
    "barcode": "885110001305",
    "part_name": "Industrial Stretch Film Roll 50cm x 500m (17 Micron High Clarity & Stretch)",
    "part_name_lo": "ຟີມຍືດພັນພາເລດອຸດສາຫະກຳ 50 ຊມ x 500 ແມັດ (ໜາ 17 ໄມຄຣອນ ດຶງຍືດໄດ້ 300%)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for 50cm x 500m made from LLDPE 17 Micron to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ 50cm x 500m ວັດສະດຸ LLDPE 17 Micron ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/stretch_film_roll.jpg",
    "qty_on_hand": 40,
    "unit_price": 220,
    "currency": "THB",
    "specs": {
      "Specification": "50cm x 500m",
      "Material": "LLDPE 17 Micron",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 209
      },
      {
        "min_qty": 10,
        "price": 198
      },
      {
        "min_qty": 20,
        "price": 187
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1018",
    "sku_code": "JNS-PK-1018",
    "barcode": "885110001306",
    "part_name": "Ergonomic Handheld Stretch Film Dispenser Tool with Tension Brake",
    "part_name_lo": "ດ້າມຈັບພັນຟີມຍືດພາເລດ ພ້ອມປຸ່ມປັບແຮງດຶງ (ນ້ຳໜັກເບົາ ພັນງ່າຍ ບໍ່ເຈັບມື)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for For 50cm Film made from Aluminum + Rubber Grip to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ For 50cm Film ວັດສະດຸ Aluminum + Rubber Grip ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/stretch_film_roll.jpg",
    "qty_on_hand": 40,
    "unit_price": 480,
    "currency": "THB",
    "specs": {
      "Specification": "For 50cm Film",
      "Material": "Aluminum + Rubber Grip",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 456
      },
      {
        "min_qty": 10,
        "price": 432
      },
      {
        "min_qty": 20,
        "price": 408
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1019",
    "sku_code": "JNS-PK-1019",
    "barcode": "885110001307",
    "part_name": "Heavy Duty Polypropylene (PP) Strapping Band Roll 15mm x 2000m (Yellow)",
    "part_name_lo": "ສາຍຮັດພາເລດພລາສຕິກ PP 15 ມມ x 2000 ແມັດ (ສີເຫຼືອງ ທົນແຮງດຶງ 250 ກິໂລ)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for 15mm x 2000m made from Virgin PP 250kg Breaking to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ 15mm x 2000m ວັດສະດຸ Virgin PP 250kg Breaking ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/strapping_band_roll.jpg",
    "qty_on_hand": 40,
    "unit_price": 1150,
    "currency": "THB",
    "specs": {
      "Specification": "15mm x 2000m",
      "Material": "Virgin PP 250kg Breaking",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1092
      },
      {
        "min_qty": 10,
        "price": 1035
      },
      {
        "min_qty": 20,
        "price": 978
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1020",
    "sku_code": "JNS-PK-1020",
    "barcode": "885110001308",
    "part_name": "Manual PP/PET Strapping Tensioner & Sealer Tool Set (12 - 19 mm)",
    "part_name_lo": "ຊຸດເຄື່ອງໂຍກດຶງສາຍຮັດ ແລະ ຄີມຢ້ຳກິບເຫຼັກ (ສຳລັບສາຍຮັດ 12-19 ມມ)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for 12 - 19 mm made from Steel Tensioner + Sealer to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ 12 - 19 mm ວັດສະດຸ Steel Tensioner + Sealer ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/strapping_tensioner_tool.jpg",
    "qty_on_hand": 40,
    "unit_price": 1850,
    "currency": "THB",
    "specs": {
      "Specification": "12 - 19 mm",
      "Material": "Steel Tensioner + Sealer",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1758
      },
      {
        "min_qty": 10,
        "price": 1665
      },
      {
        "min_qty": 20,
        "price": 1572
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1021",
    "sku_code": "JNS-PK-1021",
    "barcode": "885110001309",
    "part_name": "Semi-Open Galvanized Steel Strapping Seals / Clips (Box of 1000 Pcs)",
    "part_name_lo": "ກິບເຫຼັກລັອກສາຍຮັດພາເລດ ຊຸບກາວາໄນສ໌ (ກ່ອງ 1000 ໂຕ ເກາະແໜ້ນ ບໍ່ຫຼຸດ)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for Box of 1000 Pcs made from Galvanized Steel 15mm to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ Box of 1000 Pcs ວັດສະດຸ Galvanized Steel 15mm ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/strapping_tensioner_tool.jpg",
    "qty_on_hand": 40,
    "unit_price": 650,
    "currency": "THB",
    "specs": {
      "Specification": "Box of 1000 Pcs",
      "Material": "Galvanized Steel 15mm",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 618
      },
      {
        "min_qty": 10,
        "price": 585
      },
      {
        "min_qty": 20,
        "price": 552
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1022",
    "sku_code": "JNS-PK-1022",
    "barcode": "885110001310",
    "part_name": "Heavy Duty Carton Sealing Tape Gun Dispenser 2 Inch with Adjustable Brake",
    "part_name_lo": "ທີ່ຕັດເທບກາວປິດກ່ອງ 2 ນິ້ວ ພ້ອມປຸ່ມປັບຄວາມຝືດ (ໃບມີດສະແຕນເລດແຫຼມຄົມ)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for 2 Inch (50mm) made from Steel Frame + ABS to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ 2 Inch (50mm) ວັດສະດຸ Steel Frame + ABS ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/opp_packaging_tape.jpg",
    "qty_on_hand": 40,
    "unit_price": 240,
    "currency": "THB",
    "specs": {
      "Specification": "2 Inch (50mm)",
      "Material": "Steel Frame + ABS",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 228
      },
      {
        "min_qty": 10,
        "price": 216
      },
      {
        "min_qty": 20,
        "price": 204
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1023",
    "sku_code": "JNS-PK-1023",
    "barcode": "885110001311",
    "part_name": "Clear OPP Packaging Tape 2 Inch x 100 Meters 45 Micron (Pack of 6 Rolls)",
    "part_name_lo": "ເທບໃສປິດກ່ອງ OPP 2 ນິ້ວ x 100 ແມັດ ໜາ 45 ໄມຄຣອນ (ແພັກ 6 ມ້ວນ ກາວໜຽວແໜ້ນ)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for 2\" x 100m (Pack/6) made from OPP Acrylic Adhesive to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ 2\" x 100m (Pack/6) ວັດສະດຸ OPP Acrylic Adhesive ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/opp_packaging_tape.jpg",
    "qty_on_hand": 40,
    "unit_price": 180,
    "currency": "THB",
    "specs": {
      "Specification": "2\" x 100m (Pack/6)",
      "Material": "OPP Acrylic Adhesive",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 171
      },
      {
        "min_qty": 10,
        "price": 162
      },
      {
        "min_qty": 20,
        "price": 153
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1024",
    "sku_code": "JNS-PK-1024",
    "barcode": "885110001312",
    "part_name": "Brown Kraft Corrugated Shipping Carton Boxes 50x40x30cm (Pack of 20 Pcs)",
    "part_name_lo": "ກ່ອງເຈ້ຍລູກຟູກສີນ້ຳຕານ 5 ຊັ້ນ 50x40x30 ຊມ (ແພັກ 20 ໃບ ຮັບນ້ຳໜັກ 30 ກິໂລ)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for 50 x 40 x 30 cm made from 5-Ply Double Wall Corrugated to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ 50 x 40 x 30 cm ວັດສະດຸ 5-Ply Double Wall Corrugated ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/bubble_wrap_roll.jpg",
    "qty_on_hand": 40,
    "unit_price": 680,
    "currency": "THB",
    "specs": {
      "Specification": "50 x 40 x 30 cm",
      "Material": "5-Ply Double Wall Corrugated",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 646
      },
      {
        "min_qty": 10,
        "price": 612
      },
      {
        "min_qty": 20,
        "price": 578
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1025",
    "sku_code": "JNS-PK-1025",
    "barcode": "885110001313",
    "part_name": "Poly Bubble Wrap Roll 1.0 Meter x 100 Meters (Air Bubble Cushioning)",
    "part_name_lo": "ພລາສຕິກກັນກະແທກ ແອຣ໌ບັບເບິ້ນ 1.0 ແມັດ x 100 ແມັດ (ເມັດລົມແໜ້ນ ບໍ່ແຕກງ່າຍ)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for 1.0m x 100m Roll made from Double Sided Bubble 10mm to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ 1.0m x 100m Roll ວັດສະດຸ Double Sided Bubble 10mm ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/bubble_wrap_roll.jpg",
    "qty_on_hand": 40,
    "unit_price": 650,
    "currency": "THB",
    "specs": {
      "Specification": "1.0m x 100m Roll",
      "Material": "Double Sided Bubble 10mm",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 618
      },
      {
        "min_qty": 10,
        "price": 585
      },
      {
        "min_qty": 20,
        "price": 552
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1026",
    "sku_code": "JNS-PK-1026",
    "barcode": "885110001314",
    "part_name": "Heavy Duty Impulse Heat Sealer Machine 400mm (Metal Body with Extra Heating Wire)",
    "part_name_lo": "ເຄື່ອງຊີລປາກຖົງພລາສຕິກແບບກົດມື 400 ມມ (ໂຄງເຫຼັກ ທົນທານ ພ້ອມລວດອະໄຫຼ່)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for 400 mm Sealing made from Impulse 600W to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ 400 mm Sealing ວັດສະດຸ Impulse 600W ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/strapping_tensioner_tool.jpg",
    "qty_on_hand": 40,
    "unit_price": 1450,
    "currency": "THB",
    "specs": {
      "Specification": "400 mm Sealing",
      "Material": "Impulse 600W",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1378
      },
      {
        "min_qty": 10,
        "price": 1305
      },
      {
        "min_qty": 20,
        "price": 1232
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1027",
    "sku_code": "JNS-PK-1027",
    "barcode": "885110001315",
    "part_name": "Electronic Platform Shipping Weight Scale 150 kg (Stainless Steel Platform LCD)",
    "part_name_lo": "ຊິງຊັ່ງນ້ຳໜັກດິຈິຕອນຕັ້ງພື້ນ 150 ກິໂລ (ຖາດສະແຕນເລດ ຈໍ LCD ພ້ອມແບັດເຕີຣີສຳຮອງ)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for 150 kg / 20g Accuracy made from SUS304 Platter 40x50cm to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ 150 kg / 20g Accuracy ວັດສະດຸ SUS304 Platter 40x50cm ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/heavy_duty_plastic_pallet.jpg",
    "qty_on_hand": 40,
    "unit_price": 2850,
    "currency": "THB",
    "specs": {
      "Specification": "150 kg / 20g Accuracy",
      "Material": "SUS304 Platter 40x50cm",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2708
      },
      {
        "min_qty": 10,
        "price": 2565
      },
      {
        "min_qty": 20,
        "price": 2422
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1028",
    "sku_code": "JNS-PK-1028",
    "barcode": "885110001316",
    "part_name": "Thermal Direct Barcode Shipping Label Rolls 4x6 Inch (Pack of 4 Rolls / 2000 Labels)",
    "part_name_lo": "ສະຕິກເກີ້ບາໂຄ້ດຄວາມຮ້ອນ 4x6 ນິ້ວ (4 ມ້ວນ / 2000 ດວງ ສຳລັບພິມໃບປະໜ້າພັດສະດຸ)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for 4x6\" (100x150mm) made from Direct Thermal (500/roll) to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ 4x6\" (100x150mm) ວັດສະດຸ Direct Thermal (500/roll) ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/opp_packaging_tape.jpg",
    "qty_on_hand": 40,
    "unit_price": 480,
    "currency": "THB",
    "specs": {
      "Specification": "4x6\" (100x150mm)",
      "Material": "Direct Thermal (500/roll)",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 456
      },
      {
        "min_qty": 10,
        "price": 432
      },
      {
        "min_qty": 20,
        "price": 408
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1029",
    "sku_code": "JNS-PK-1029",
    "barcode": "885110001317",
    "part_name": "Heavy Duty Plastic Corner Protectors for Pallet Strapping (Pack of 100 Pcs)",
    "part_name_lo": "ມຸມພລາສຕິກກັນກະແທກຮອງສາຍຮັດພາເລດ (ແພັກ 100 ອັນ ປ້ອງກັນກ່ອງຍຸບ)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for Pack of 100 Pcs made from High Impact Polypropylene to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ Pack of 100 Pcs ວັດສະດຸ High Impact Polypropylene ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/strapping_band_roll.jpg",
    "qty_on_hand": 40,
    "unit_price": 280,
    "currency": "THB",
    "specs": {
      "Specification": "Pack of 100 Pcs",
      "Material": "High Impact Polypropylene",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 266
      },
      {
        "min_qty": 10,
        "price": 252
      },
      {
        "min_qty": 20,
        "price": 238
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1030",
    "sku_code": "JNS-PK-1030",
    "barcode": "885110001318",
    "part_name": "Heavy Duty UV-Resistant Nylon Cable Ties 450mm x 7.6mm (Pack of 100 Pcs)",
    "part_name_lo": "ສາຍຮັດໄນລ່ອນຂະໜາດໃຫຍ່ 450 ມມ x 7.6 ມມ (ແພັກ 100 ເສັ້ນ ທົນແຮງດຶງ 55 ກິໂລ)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for 450 x 7.6 mm made from Nylon 66 (120 lbs Tensile) to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ 450 x 7.6 mm ວັດສະດຸ Nylon 66 (120 lbs Tensile) ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/strapping_band_roll.jpg",
    "qty_on_hand": 40,
    "unit_price": 240,
    "currency": "THB",
    "specs": {
      "Specification": "450 x 7.6 mm",
      "Material": "Nylon 66 (120 lbs Tensile)",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 228
      },
      {
        "min_qty": 10,
        "price": 216
      },
      {
        "min_qty": 20,
        "price": 204
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1031",
    "sku_code": "JNS-PK-1031",
    "barcode": "885110001319",
    "part_name": "High Tensile Steel Strapping Band Coil 19mm x 0.5mm (Ribbon Wound 50 kg)",
    "part_name_lo": "ສາຍຮັດເຫຼັກພືດອຸດສາຫະກຳ 19 ມມ x 0.5 ມມ (ມ້ວນ 50 ກິໂລ ສຳລັບມັດເຫຼັກ ແລະ ໄມ້)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for 19mm x 0.5mm made from High Carbon Steel 50kg to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ 19mm x 0.5mm ວັດສະດຸ High Carbon Steel 50kg ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/strapping_band_roll.jpg",
    "qty_on_hand": 40,
    "unit_price": 3400,
    "currency": "THB",
    "specs": {
      "Specification": "19mm x 0.5mm",
      "Material": "High Carbon Steel 50kg",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3230
      },
      {
        "min_qty": 10,
        "price": 3060
      },
      {
        "min_qty": 20,
        "price": 2890
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1032",
    "sku_code": "JNS-PK-1032",
    "barcode": "885110001320",
    "part_name": "Inflatable Air Cushion Packaging Bubble Film Roll 400mm x 300m",
    "part_name_lo": "ມ້ວນຟີມຖົງລົມກັນກະແທກ Air Cushion 400 ມມ x 300 ແມັດ (ສຳລັບເຄື່ອງຜະລິດລົມ)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for 400mm x 300m made from HDPE Air Pillow Film to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ 400mm x 300m ວັດສະດຸ HDPE Air Pillow Film ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/bubble_wrap_roll.jpg",
    "qty_on_hand": 40,
    "unit_price": 1250,
    "currency": "THB",
    "specs": {
      "Specification": "400mm x 300m",
      "Material": "HDPE Air Pillow Film",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1188
      },
      {
        "min_qty": 10,
        "price": 1125
      },
      {
        "min_qty": 20,
        "price": 1062
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1033",
    "sku_code": "JNS-PK-1033",
    "barcode": "885110001321",
    "part_name": "Pneumatic Industrial Carton Bottom & Top Stapler Machine",
    "part_name_lo": "ປືນຍິງແມັກລົມປິດກົ້ນກ່ອງລູກຟູກອຸດສາຫະກຳ (ຍິງໄວ ແໜ້ນໜາ ສຳລັບກ່ອງໜາ)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for Staple Crown 35mm made from Pneumatic 70-100 PSI to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ Staple Crown 35mm ວັດສະດຸ Pneumatic 70-100 PSI ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/strapping_tensioner_tool.jpg",
    "qty_on_hand": 40,
    "unit_price": 4800,
    "currency": "THB",
    "specs": {
      "Specification": "Staple Crown 35mm",
      "Material": "Pneumatic 70-100 PSI",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 4560
      },
      {
        "min_qty": 10,
        "price": 4320
      },
      {
        "min_qty": 20,
        "price": 4080
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1034",
    "sku_code": "JNS-PK-1034",
    "barcode": "885110001322",
    "part_name": "Manual Void Fill Kraft Paper Packaging Dispenser Station",
    "part_name_lo": "ເຄື່ອງຕັດ ແລະ ດຶງເຈ້ຍຄຣາບກັນກະແທກ Void Fill (ເປັນມິດຕໍ່ສິ່ງແວດລ້ອມ)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for Roll Width 500mm made from Manual Guillotine Cutter to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ Roll Width 500mm ວັດສະດຸ Manual Guillotine Cutter ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/bubble_wrap_roll.jpg",
    "qty_on_hand": 40,
    "unit_price": 3800,
    "currency": "THB",
    "specs": {
      "Specification": "Roll Width 500mm",
      "Material": "Manual Guillotine Cutter",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3610
      },
      {
        "min_qty": 10,
        "price": 3420
      },
      {
        "min_qty": 20,
        "price": 3230
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-pk-1035",
    "sku_code": "JNS-PK-1035",
    "barcode": "885110001323",
    "part_name": "Desktop Heat Shrink Packaging Tunnel Machine with Conveyor (400 x 200mm Chamber)",
    "part_name_lo": "ຕູ້ນົບຟີມຫົດຄວາມຮ້ອນຕັ້ງໂຕະ Shrink Tunnel (ຫ້ອງອົບ 400x200 ມມ ສາຍພານລຳລຽງ)",
    "category": "Packaging",
    "description": "Industrial shipping and packaging product specified for Chamber 400x200mm made from Electric 4.5 kW 220V to secure logistics cargo.",
    "description_lo": "ອຸປະກອນຫຸ້ມຫໍ່ ແລະ ຈັດສົ່ງສິນຄ້າມາດຕະຖານອຸດສາຫະກຳ ຂະໜາດ Chamber 400x200mm ວັດສະດຸ Electric 4.5 kW 220V ຊ່ວຍປ້ອງກັນສິນຄ້າເສຍຫາຍຂະນະຂົນສົ່ງ.",
    "image_url": "/images/catalog/real/stretch_film_roll.jpg",
    "qty_on_hand": 40,
    "unit_price": 18500,
    "currency": "THB",
    "specs": {
      "Specification": "Chamber 400x200mm",
      "Material": "Electric 4.5 kW 220V",
      "Application": "Packaging & Freight Logistics"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 17575
      },
      {
        "min_qty": 10,
        "price": 16650
      },
      {
        "min_qty": 20,
        "price": 15725
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1001",
    "sku_code": "JNS-AC-1001",
    "barcode": "885110001324",
    "part_name": "Deep Groove Ball Bearing Set (6200 / 6300 Series Chrome Steel - Pack of 10)",
    "part_name_lo": "ຊຸດລູກປືນຕະລັບກົມ Deep Groove ຊີຣີສ໌ 6200/6300 (ເຫຼັກກ້າໂຄຣມຽມ ແພັກ 10 ຕະລັບ)",
    "category": "Accessories",
    "description": "High precision ABEC-3 electric motor quality deep groove ball bearings with rubber dust seals (2RS) and pre-lubricated grease.",
    "description_lo": "ລູກປືນມໍເຕີຄຸນນະພາບສູງ ABEC-3 ຝາປິດຢາງກັນຝຸ່ນ 2RS ອັດຈາລະບີພ້ອມໃຊ້ງານ ໝູນງຽບ ທົນຄວາມໄວຮອບສູງ.",
    "image_url": "/images/catalog/real/bearing_set_1787989755742.jpg",
    "qty_on_hand": 60,
    "unit_price": 1450,
    "currency": "THB",
    "specs": {
      "Type": "Deep Groove Ball Bearing",
      "Material": "Chrome Steel GCr15",
      "Precision": "ABEC-3 / P6",
      "Seals": "Dual Rubber Seals 2RS"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1378
      },
      {
        "min_qty": 10,
        "price": 1305
      },
      {
        "min_qty": 20,
        "price": 1232
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1002",
    "sku_code": "JNS-AC-1002",
    "barcode": "885110001325",
    "part_name": "4-Bolt Square Flange Mounted Ball Bearing Unit (UCF 208-24 / Shaft 1.5\" / 40mm)",
    "part_name_lo": "ຕຸ໊ກກະຕາລູກປືນຕິດແປ້ນສີ່ຫຼ່ຽມ 4 ຮູ UCF 208-24 (ຂະໜາດເພົາ 40 ມມ ເສື້ອເຫຼັກຫຼໍ່ໜຽວ)",
    "category": "Accessories",
    "description": "Self-aligning heavy duty cast iron UCF flange bearing unit with grease zerk fitting and set screw locking collar for conveyor shafts.",
    "description_lo": "ຊຸດລູກປືນຕຸ໊ກກະຕາຕິດແປ້ນ 4 ຮູ UCF 208 ເສື້ອເຫຼັກຫຼໍ່ໜຽວ ພ້ອມຫົວອັດຈາລະບີ ແລະ ສະກູລັອກເພົາ ສຳລັບເພົາສາຍພານລຳລຽງ.",
    "image_url": "/images/catalog/real/flange_bearing_1787994582910.jpg",
    "qty_on_hand": 45,
    "unit_price": 850,
    "currency": "THB",
    "specs": {
      "Housing": "Cast Iron HT200",
      "Bearing Insert": "UC 208 Chrome Steel",
      "Shaft Diameter": "40 mm (1-1/2 Inch)",
      "Bolt Size": "M14"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 808
      },
      {
        "min_qty": 10,
        "price": 765
      },
      {
        "min_qty": 20,
        "price": 722
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1003",
    "sku_code": "JNS-AC-1003",
    "barcode": "885110001326",
    "part_name": "Spherical Roller Bearing for Heavy Industrial Vibrating Screens (22218 EK / C3 Brass Cage)",
    "part_name_lo": "ລູກປືນໂຄ້ງ 2 ແຖວ Spherical Roller 22218 EK/C3 (ຮັງທອງເຫຼືອງ ສຳລັບຕະແກງສັ່ນບໍ່ແຮ່)",
    "category": "Accessories",
    "description": "Self-aligning double row spherical roller bearing with tapered bore and machined brass cage built for heavy shock loads and high vibrations.",
    "description_lo": "ລູກປືນໂຄ້ງ 2 ແຖວ 22218 EK ຮັງທອງເຫຼືອງກົນຈັກ ສຳລັບຕະແກງສັ່ນຄັດແຍກຫີນບໍ່ແຮ່ ຮັບແຮງກະແທກ ແລະ ແຮງສັ່ນສະເທືອນໜັກໄດ້ດີຢ້ຽມ.",
    "image_url": "/images/catalog/real/heavy_duty_bearing_1787993170025.jpg",
    "qty_on_hand": 20,
    "unit_price": 3800,
    "currency": "THB",
    "specs": {
      "Model": "22218 EK/C3",
      "Bore": "90 mm Tapered (1:12)",
      "Outer Diameter": "160 mm",
      "Width": "40 mm",
      "Cage": "Solid Brass"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3610
      },
      {
        "min_qty": 10,
        "price": 3420
      },
      {
        "min_qty": 20,
        "price": 3230
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1004",
    "sku_code": "JNS-AC-1004",
    "barcode": "885110001327",
    "part_name": "Cylindrical Roller Heavy Radial Load Bearing (NU 310 ECM / High Speed Brass Cage)",
    "part_name_lo": "ລູກປືນເມັດກະບອກ Cylindrical Roller NU 310 ECM (ຮັບແຮງກົດຕາມລັດສະໝີສູງ)",
    "category": "Accessories",
    "description": "Single row cylindrical roller bearing designed for heavy radial forces in industrial gearboxes, electric motors, and pumps.",
    "description_lo": "ລູກປືນເມັດກະບອກ NU 310 ຮັງທອງເຫຼືອງ ສຳລັບເກຍອຸດສາຫະກຳ ແລະ ເພົາມໍເຕີໃຫຍ່ ຮັບແຮງກົດແນວຕັ້ງໄດ້ມະຫາສານ.",
    "image_url": "/images/catalog/real/roller_bearing_1787994554828.jpg",
    "qty_on_hand": 25,
    "unit_price": 2200,
    "currency": "THB",
    "specs": {
      "Model": "NU 310 ECM",
      "Bore": "50 mm",
      "Outer Diameter": "110 mm",
      "Width": "27 mm",
      "Dynamic Load": "125 kN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2090
      },
      {
        "min_qty": 10,
        "price": 1980
      },
      {
        "min_qty": 20,
        "price": 1870
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1005",
    "sku_code": "JNS-AC-1005",
    "barcode": "885110001328",
    "part_name": "Single Direction Axial Thrust Ball Bearing (51210 / ID 50 x OD 78 x H 22 mm)",
    "part_name_lo": "ລູກປືນກົດແກນຕັ້ງ Thrust Ball Bearing 51210 (ຂະໜາດຮູໃນ 50 ມມ ຮັບແຮງກົດຕາມແກນ)",
    "category": "Accessories",
    "description": "Ground chrome steel axial thrust bearing designed exclusively for high axial thrust loads such as crane hooks, swivel turntables, and press screws.",
    "description_lo": "ລູກປືນກົດແກນ 51210 ເຫຼັກໂຄຣມຽມເຈຍລະໄນລະອຽດ ຮັບແຮງກົດແນວແກນສຳລັບຂໍເຄນ, ຈານໝູນ ແລະ ແມ່ແຮງກົດ.",
    "image_url": "/images/catalog/real/thrust_bearing_1787994570116.jpg",
    "qty_on_hand": 35,
    "unit_price": 850,
    "currency": "THB",
    "specs": {
      "Model": "51210",
      "Bore": "50 mm",
      "Outer Diameter": "78 mm",
      "Height": "22 mm",
      "Axial Load": "58.5 kN"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 808
      },
      {
        "min_qty": 10,
        "price": 765
      },
      {
        "min_qty": 20,
        "price": 722
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1006",
    "sku_code": "JNS-AC-1006",
    "barcode": "885110001329",
    "part_name": "Closed Type Linear Motion Ball Bushing Bearing (LM25UU / Shaft Dia 25mm)",
    "part_name_lo": "ລູກປືນສະໄລ້ແນວເສັ້ນຊື່ Linear Bearing LM25UU (ສຳລັບເພົາກົມ 25 ມມ ເຄື່ອງ CNC)",
    "category": "Accessories",
    "description": "High precision linear motion ball bushing for CNC automation, 3D printers, and industrial pneumatic pick-and-place robots.",
    "description_lo": "ລູກປືນສະໄລ້ແກນກົມ LM25UU ເລື່ອນລຽບ ບໍ່ຕິດຂັດ ສຳລັບເຄື່ອງຈັກອັດຕະໂນມັດ ແລະ ເພົາສະໄລ້ຫຸ່ນຍົນ CNC.",
    "image_url": "/images/catalog/real/linear_bearing_1787994608195.jpg",
    "qty_on_hand": 50,
    "unit_price": 450,
    "currency": "THB",
    "specs": {
      "Model": "LM25UU",
      "Shaft Diameter": "25 mm",
      "Outer Diameter": "40 mm",
      "Length": "59 mm"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 428
      },
      {
        "min_qty": 10,
        "price": 405
      },
      {
        "min_qty": 20,
        "price": 382
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1007",
    "sku_code": "JNS-AC-1007",
    "barcode": "885110001330",
    "part_name": "Sintered Oilless Self-Lubricating Bronze Bushing Sleeve (ID 40 x OD 50 x L 50 mm)",
    "part_name_lo": "ບຸດທອງເຫຼືອງຝັງກຣາໄຟຕ໌ ຫຼໍ່ລື່ນໃນຕົວ (ຮູໃນ 40 x ນອກ 50 x ຍາວ 50 ມມ ບໍ່ຕ້ອງອັດຈາລະບີ)",
    "category": "Accessories",
    "description": "Maintenance-free porous sintered bronze bearing sleeve impregnated with solid graphite lubricants for heavy oscillating machinery pivots.",
    "description_lo": "ບຸດທອງເຫຼືອງແທ້ຝັງສານຫຼໍ່ລື່ນກຣາໄຟຕ໌ ບໍ່ຕ້ອງອັດຈາລະບີ ທົນແຮງກົດ ແລະ ຄວາມຮ້ອນສູງ ສຳລັບຈຸດໝູນແຂນກົນຈັກ.",
    "image_url": "/images/catalog/real/bronze_bushing_1787994598342.jpg",
    "qty_on_hand": 60,
    "unit_price": 550,
    "currency": "THB",
    "specs": {
      "Dimensions": "ID 40 x OD 50 x L 50 mm",
      "Material": "CuSn8 with Graphite Plugs",
      "Max Load": "100 N/mm2"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 522
      },
      {
        "min_qty": 10,
        "price": 495
      },
      {
        "min_qty": 20,
        "price": 468
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1008",
    "sku_code": "JNS-AC-1008",
    "barcode": "885110001331",
    "part_name": "Premium Anti-Wear Industrial Hydraulic Oil ISO VG 46 (20 Liters Pail)",
    "part_name_lo": "ນ້ຳມັນໄຮໂດຣລິກອຸດສາຫະກຳ ISO VG 46 ຂະໜາດ 20 ລິດ (ປ້ອງກັນການສຶກຫຣໍ ຕ້ານການເກີດຟອງ)",
    "category": "Accessories",
    "description": "High-performance zinc-based anti-wear hydraulic fluid providing outstanding oxidation stability and corrosion protection for factory presses and injection molders.",
    "description_lo": "ນ້ຳມັນໄຮໂດຣລິກເບີ 46 ຂະໜາດ 20 ລິດ ຜະສົມສານປ້ອງກັນການສຶກຫຣໍ ຕ້ານການເກີດຟອງ ແລະ ອອກຊິເດຊັ່ນ ສຳລັບເຄື່ອງຈັກໂຮງງານ ແລະ ລົດຍົກ.",
    "image_url": "/images/catalog/real/hydraulic_oil_1787987728754.jpg",
    "qty_on_hand": 80,
    "unit_price": 1850,
    "currency": "THB",
    "specs": {
      "Viscosity": "ISO VG 46",
      "Volume": "20 Liters Pail",
      "Standards": "DIN 51524 Part 2 (HLP) / ISO 11158 (HM)"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1758
      },
      {
        "min_qty": 10,
        "price": 1665
      },
      {
        "min_qty": 20,
        "price": 1572
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1009",
    "sku_code": "JNS-AC-1009",
    "barcode": "885110001332",
    "part_name": "High Viscosity Heavy Industrial Hydraulic Oil ISO VG 68 (20 Liters Pail)",
    "part_name_lo": "ນ້ຳມັນໄຮໂດຣລິກເບີ 68 ຂະໜາດ 20 ລິດ (ສຳລັບເຄື່ອງຈັກໜັກ ແລະ ລະບົບທີ່ເຮັດວຽກກາງແຈ້ງຮ້ອນ)",
    "category": "Accessories",
    "description": "Heavy ISO 68 hydraulic oil designed for high ambient temperature operations, earthmoving equipment, and heavily loaded industrial pumps.",
    "description_lo": "ນ້ຳມັນໄຮໂດຣລິກເບີ 68 ຂະໜາດ 20 ລິດ ຟີມນ້ຳມັນໜາພິເສດ ສຳລັບເຄື່ອງຈັກກົນໜັກກາງແຈ້ງທີ່ເຮັດວຽກໃນສະພາບອາກາດຮ້ອນຈັດ.",
    "image_url": "/images/catalog/real/hydraulic_oil_1787994622684.jpg",
    "qty_on_hand": 70,
    "unit_price": 1950,
    "currency": "THB",
    "specs": {
      "Viscosity": "ISO VG 68",
      "Volume": "20 Liters Pail",
      "Viscosity Index": "> 100",
      "Pour Point": "-24°C"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1852
      },
      {
        "min_qty": 10,
        "price": 1755
      },
      {
        "min_qty": 20,
        "price": 1658
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1010",
    "sku_code": "JNS-AC-1010",
    "barcode": "885110001333",
    "part_name": "Industrial Anti-Wear Hydraulic Oil ISO VG 46 (200 Liters Steel Drum)",
    "part_name_lo": "ນ້ຳມັນໄຮໂດຣລິກ ISO VG 46 ຖັງໃຫຍ່ 200 ລິດ (ສຳລັບສູນບໍລິການ ແລະ ໂຮງງານໃຫຍ່)",
    "category": "Accessories",
    "description": "Bulk 200-liter drum of anti-wear hydraulic oil for high-volume maintenance facilities and industrial plant reservoir top-ups.",
    "description_lo": "ນ້ຳມັນໄຮໂດຣລິກເບີ 46 ຖັງໃຫຍ່ 200 ລິດ ລາຄາປະຢັດ ສຳລັບໂຮງງານອຸດສາຫະກຳ ແລະ ສູນບໍລິການສ້ອມແປງເຄື່ອງຈັກກົນ.",
    "image_url": "/images/catalog/real/hydraulic_oil_drum_1787993185153.jpg",
    "qty_on_hand": 15,
    "unit_price": 16500,
    "currency": "THB",
    "specs": {
      "Volume": "200 Liters (53 Gallons)",
      "Grade": "ISO VG 46 Anti-Wear",
      "Drum Material": "Heavy Steel Drum"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 15675
      },
      {
        "min_qty": 10,
        "price": 14850
      },
      {
        "min_qty": 20,
        "price": 14025
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1011",
    "sku_code": "JNS-AC-1011",
    "barcode": "885110001334",
    "part_name": "Heavy Duty Commercial Diesel Engine Oil SAE 15W-40 CI-4/SL (20 Liters Pail)",
    "part_name_lo": "ນ້ຳມັນເຄື່ອງດີເຊວອຸດສາຫະກຳ SAE 15W-40 CI-4 ຂະໜາດ 20 ລິດ (ສຳລັບລົດບັນທຸກ ແລະ ລົດຍົກ)",
    "category": "Accessories",
    "description": "Heavy duty commercial diesel engine oil providing superior soot handling, piston deposit control, and wear reduction in turbocharged engines.",
    "description_lo": "ນ້ຳມັນເຄື່ອງດີເຊວ 15W-40 CI-4 ຂະໜາດ 20 ລິດ ຄວບຄຸມຂະເໝົ່າດຳ ປ້ອງກັນການສຶກຫຣໍຂອງແຫວນລູກສູບ ສຳລັບລົດບັນທຸກ ແລະ ລົດຍົກດີເຊວ.",
    "image_url": "/images/catalog/real/diesel_engine_oil_1787987716108.jpg",
    "qty_on_hand": 60,
    "unit_price": 2250,
    "currency": "THB",
    "specs": {
      "Viscosity": "SAE 15W-40",
      "API Service": "API CI-4 / SL",
      "Volume": "20 Liters Pail"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2138
      },
      {
        "min_qty": 10,
        "price": 2025
      },
      {
        "min_qty": 20,
        "price": 1912
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1012",
    "sku_code": "JNS-AC-1012",
    "barcode": "885110001335",
    "part_name": "Commercial Fleet Turbo Diesel Lubricating Oil 15W-40 (5 Liters Bottle)",
    "part_name_lo": "ນ້ຳມັນເຄື່ອງດີເຊວເທີ້ໂບ 15W-40 ຂະໜາດ 5 ລິດ (ສຳລັບລົດຕູ້ ແລະ ລົດກະບະ fleet)",
    "category": "Accessories",
    "description": "High performance 5-liter bottle of 15W-40 diesel oil ideal for routine service changes in fleet utility vehicles and light machinery.",
    "description_lo": "ນ້ຳມັນເຄື່ອງດີເຊວ 15W-40 ຂະໜາດ 5 ລິດ ສະດວກຕໍ່ການປ່ຽນຖ່າຍປະຈຳຮອບ ປົກປ້ອງເທີ້ໂບຊາດເຈີ້ ແລະ ວາວເຄື່ອງຈັກ.",
    "image_url": "/images/catalog/real/fl_oil_dsl_1788015707220.jpg",
    "qty_on_hand": 100,
    "unit_price": 580,
    "currency": "THB",
    "specs": {
      "Viscosity": "SAE 15W-40",
      "API Service": "API CI-4 / CH-4",
      "Volume": "5 Liters"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 551
      },
      {
        "min_qty": 10,
        "price": 522
      },
      {
        "min_qty": 20,
        "price": 493
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1013",
    "sku_code": "JNS-AC-1013",
    "barcode": "885110001336",
    "part_name": "Industrial LPG & Gasoline Engine Oil SAE 10W-30 (4 Liters Bottle)",
    "part_name_lo": "ນ້ຳມັນເຄື່ອງລົດຍົກແກັສ LPG ແລະ ແອັດຊັງ 10W-30 ຂະໜາດ 4 ລິດ (ສຳລັບເຄື່ອງຈັກແກັສ)",
    "category": "Accessories",
    "description": "Low ash engine oil specifically engineered for LPG/CNG forklifts to resist valve seat recession and high thermal oxidation.",
    "description_lo": "ນ້ຳມັນເຄື່ອງສຳລັບລົດຍົກລະບົບແກັສ LPG/CNG 10W-30 ຂະໜາດ 4 ລິດ ສູດຂີ້ເທົ່າຕ່ຳ ປ້ອງກັນບ່າວາວສຶກ ແລະ ທົນຄວາມຮ້ອນຫ້ອງເຜົາໄໝ້ສູງ.",
    "image_url": "/images/catalog/real/fl_oil_gas_1788015693995.jpg",
    "qty_on_hand": 80,
    "unit_price": 480,
    "currency": "THB",
    "specs": {
      "Viscosity": "SAE 10W-30",
      "API Service": "API SN / CF",
      "Volume": "4 Liters",
      "Formulation": "Low-Ash Gas Engine Oil"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 456
      },
      {
        "min_qty": 10,
        "price": 432
      },
      {
        "min_qty": 20,
        "price": 408
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1014",
    "sku_code": "JNS-AC-1014",
    "barcode": "885110001337",
    "part_name": "Extreme Pressure Lithium Complex EP-2 High Temp Grease (16 kg Bucket)",
    "part_name_lo": "ຈາລະບີທົນຄວາມຮ້ອນສູງ Lithium Complex EP-2 ຂະໜາດ 16 ກິໂລ (ສີຟ້າ ກັນນ້ຳດີຢ້ຽມ)",
    "category": "Accessories",
    "description": "Heavy duty blue lithium complex EP grease with dropping point over 260°C. Excellent water resistance and mechanical stability under heavy shock loads.",
    "description_lo": "ຈາລະບີສີຟ້າ Lithium Complex EP-2 ຖັງ 16 ກິໂລ ຈຸດຢອດສູງກວ່າ 260 ອົງສາ ທົນແຮງກະແທກ ແລະ ກັນນ້ຳຊະລ້າງດີຢ້ຽມ ສຳລັບລູກປືນໂຮງງານ.",
    "image_url": "/images/catalog/real/industrial_grease_1787989730046.jpg",
    "qty_on_hand": 40,
    "unit_price": 2850,
    "currency": "THB",
    "specs": {
      "NLGI Grade": "NLGI 2",
      "Thickener": "Lithium Complex",
      "Dropping Point": "> 260°C (500°F)",
      "Volume": "16 kg Bucket"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2708
      },
      {
        "min_qty": 10,
        "price": 2565
      },
      {
        "min_qty": 20,
        "price": 2422
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1015",
    "sku_code": "JNS-AC-1015",
    "barcode": "885110001338",
    "part_name": "Heavy Duty Wheel Bearing & Chassis Lithium Grease NLGI 2 Cartridge (400g Tube)",
    "part_name_lo": "ຈາລະບີຫຼອດສຳລັບກະບອກອັດ NLGI 2 ຂະໜາດ 400 ກຣາມ (ສຳລັບລູກປືນລໍ້ ແລະ ຊ່ວງລຸ່ມ)",
    "category": "Accessories",
    "description": "Convenient 400g grease gun cartridge with multipurpose lithium EP grease for clean, mess-free maintenance lubrication of kingpins and chassis fittings.",
    "description_lo": "ຈາລະບີຫຼອດ 400 ກຣາມ ສຳລັບໃສ່ກະບອກອັດຈາລະບີ ສະດວກ ບໍ່ເລິະມື ສຳລັບອັດລູກໝາກ, ລູກປືນລໍ້ ແລະ ຄໍມ້າລົດຍົກ.",
    "image_url": "/images/catalog/real/fl_grease.jpg",
    "qty_on_hand": 200,
    "unit_price": 120,
    "currency": "THB",
    "specs": {
      "Weight": "400 grams Cartridge",
      "NLGI Grade": "NLGI 2",
      "Base": "Lithium EP Base"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 114
      },
      {
        "min_qty": 10,
        "price": 108
      },
      {
        "min_qty": 20,
        "price": 102
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1016",
    "sku_code": "JNS-AC-1016",
    "barcode": "885110001339",
    "part_name": "Long Life Premixed Radiator Coolant 50/50 Green (20 Liters Pail)",
    "part_name_lo": "ນ້ຳຢາຫຼໍ່ເຢັນໝໍ້ນ້ຳພ້ອມໃຊ້ງານ 50/50 ສີຂຽວ 20 ລິດ (ກັນສະໜິມ ປ້ອງກັນນ້ຳຟົດ 125°C)",
    "category": "Accessories",
    "description": "Ethylene glycol based 50/50 premixed heavy duty radiator coolant offering boil-over protection up to 125°C and corrosion inhibition for cast iron and aluminum.",
    "description_lo": "ນ້ຳຢາຫຼໍ່ເຢັນໝໍ້ນ້ຳສູດພ້ອມໃຊ້ງານ 50/50 ຂະໜາດ 20 ລິດ ຈຸດຟົດສູງ 125 ອົງສາ ປ້ອງກັນສະໜິມ ແລະ ຕະກັນໃນໝໍ້ນ້ຳອຸດສາຫະກຳ.",
    "image_url": "/images/catalog/real/coolant_1787994663953.jpg",
    "qty_on_hand": 50,
    "unit_price": 1650,
    "currency": "THB",
    "specs": {
      "Volume": "20 Liters Pail",
      "Mix Ratio": "50/50 Premixed",
      "Boiling Point": "125°C (257°F)",
      "Color": "Fluorescent Green"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1568
      },
      {
        "min_qty": 10,
        "price": 1485
      },
      {
        "min_qty": 20,
        "price": 1402
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1017",
    "sku_code": "JNS-AC-1017",
    "barcode": "885110001340",
    "part_name": "Automatic Transmission Fluid & Torque Converter Oil ATF Dexron III (20 Liters Pail)",
    "part_name_lo": "ນ້ຳມັນເກຍອັດຕະໂນມັດ ແລະ ທອກຄອນເວີເຕີ້ ATF Dexron III ຂະໜາດ 20 ລິດ",
    "category": "Accessories",
    "description": "Premium ATF Dexron III / Mercon fluid formulated for powershift transmissions, torque converters, and hydraulic steering in forklifts and trucks.",
    "description_lo": "ນ້ຳມັນເກຍອໍໂຕ້ ATF Dexron III ຂະໜາດ 20 ລິດ ຊ່ວຍໃຫ້ການປ່ຽນເກຍນຸ່ມນວນ ປ້ອງກັນການລື່ນຂອງຄລັດຊ໌ ສຳລັບລົດຍົກເກຍອໍໂຕ້.",
    "image_url": "/images/catalog/real/fl_fluid_trans_1788015719846.jpg",
    "qty_on_hand": 40,
    "unit_price": 2450,
    "currency": "THB",
    "specs": {
      "Specification": "Dexron III-H / Allison C-4",
      "Volume": "20 Liters Pail",
      "Application": "Forklift Powershift Transmission"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2328
      },
      {
        "min_qty": 10,
        "price": 2205
      },
      {
        "min_qty": 20,
        "price": 2082
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1018",
    "sku_code": "JNS-AC-1018",
    "barcode": "885110001341",
    "part_name": "Extreme Pressure Hypoid Gear & Differential Oil SAE 85W-140 GL-5 (20 Liters Pail)",
    "part_name_lo": "ນ້ຳມັນເກຍ ແລະ ເຟືອງທ້າຍແຮງດັນສູງ SAE 85W-140 GL-5 ຂະໜາດ 20 ລິດ",
    "category": "Accessories",
    "description": "Heavy EP hypoid differential and final drive gear oil providing maximum gear tooth protection against pitting, spalling, and shock loads.",
    "description_lo": "ນ້ຳມັນເຟືອງທ້າຍເບີ 85W-140 GL-5 ຂະໜາດ 20 ລິດ ຟີມນ້ຳມັນແຂງແຮງພິເສດ ປົກປ້ອງແຂ້ວເຟືອງທ້າຍຈາກແຮງບິດສູງ ແລະ ງານໜັກ.",
    "image_url": "/images/catalog/real/fl_fluid_gear_1788015748050.jpg",
    "qty_on_hand": 45,
    "unit_price": 2150,
    "currency": "THB",
    "specs": {
      "Viscosity": "SAE 85W-140",
      "API Service": "API GL-5 / MT-1",
      "Volume": "20 Liters Pail"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2042
      },
      {
        "min_qty": 10,
        "price": 1935
      },
      {
        "min_qty": 20,
        "price": 1828
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1019",
    "sku_code": "JNS-AC-1019",
    "barcode": "885110001342",
    "part_name": "High Performance Mobile Equipment Hydraulic Fluid ISO VG 32 (20 Liters Pail)",
    "part_name_lo": "ນ້ຳມັນໄຮໂດຣລິກອຸປະກອນເຄື່ອນທີ່ ISO VG 32 ຂະໜາດ 20 ລິດ (ໄຫຼລື່ນດີໃນອຸນຫະພູມຕ່ຳ)",
    "category": "Accessories",
    "description": "Low viscosity ISO 32 hydraulic oil for high speed precision hydraulic valves, cold storage forklifts, and sensitive hydraulic controls.",
    "description_lo": "ນ້ຳມັນໄຮໂດຣລິກເບີ 32 ຂະໜາດ 20 ລິດ ໄຫຼລື່ນດີ ຕອບສະໜອງໄວ ສຳລັບລົດຍົກໃນຫ້ອງເຢັນ ແລະ ລະບົບຄວບຄຸມໄຮໂດຣລິກລະອຽດ.",
    "image_url": "/images/catalog/real/fl_fluid_hyd_1788015732088.jpg",
    "qty_on_hand": 50,
    "unit_price": 1850,
    "currency": "THB",
    "specs": {
      "Viscosity": "ISO VG 32",
      "Volume": "20 Liters Pail",
      "Viscosity Index": "> 105"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1758
      },
      {
        "min_qty": 10,
        "price": 1665
      },
      {
        "min_qty": 20,
        "price": 1572
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1020",
    "sku_code": "JNS-AC-1020",
    "barcode": "885110001343",
    "part_name": "Deep Cycle LiFePO4 Lithium Battery Pack 48V 100Ah with Smart BMS",
    "part_name_lo": "ແບັດເຕີຣີລິທຽມ LiFePO4 48V 100Ah ພ້ອມລະບົບ Smart BMS (ສຳລັບລົດຍົກໄຟຟ້າ ແລະ ລະບົບໂຊລາ)",
    "category": "Accessories",
    "description": "48V 100Ah (4.8 kWh) high rate lithium iron phosphate battery module with integrated Bluetooth Smart BMS for electric forklifts and solar storage.",
    "description_lo": "ແບັດເຕີຣີ LiFePO4 48V 100Ah ພະລັງງານ 4.8 kWh ອາຍຸການໃຊ້ງານ 4000+ ຮອບ ພ້ອມລະບົບ Smart BMS ປ້ອງກັນໄຟເກີນ ສາກໄວ.",
    "image_url": "/images/catalog/real/lifepo4_battery_1787945655369.jpg",
    "qty_on_hand": 8,
    "unit_price": 45000,
    "currency": "THB",
    "specs": {
      "Voltage": "48V (51.2V Nominal)",
      "Capacity": "100Ah (5.12 kWh)",
      "Cycle Life": "> 4000 Cycles @ 80% DOD",
      "BMS": "Smart BMS 100A"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 42750
      },
      {
        "min_qty": 10,
        "price": 40500
      },
      {
        "min_qty": 20,
        "price": 38250
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1021",
    "sku_code": "JNS-AC-1021",
    "barcode": "885110001344",
    "part_name": "Commercial Heavy Truck & Generator Starting Battery 12V 200Ah N200",
    "part_name_lo": "ແບັດເຕີຣີລົດບັນທຸກໃຫຍ່ ແລະ ເຄື່ອງປັ່ນໄຟ 12V 200Ah ລຸ້ນ N200 (ກຳລັງສະຕາດສູງ CCA 1200)",
    "category": "Accessories",
    "description": "Heavy duty commercial starting battery N200 (12V 200Ah) with reinforced lead-antimony plates for large diesel generators, cranes, and dump trucks.",
    "description_lo": "ແບັດເຕີຣີລົດບັນທຸກໜັກ 12V 200Ah N200 ແຜ່ນທາດໜາພິເສດ ກຳລັງສະຕາດສູງ CCA 1200 ສຳລັບເຄື່ອງຈັກດີເຊວຂະໜາດໃຫຍ່ ແລະ ເຄື່ອງປັ່ນໄຟ.",
    "image_url": "/images/catalog/real/truck_battery_1787987701312.jpg",
    "qty_on_hand": 20,
    "unit_price": 6800,
    "currency": "THB",
    "specs": {
      "Voltage": "12V",
      "Capacity": "200Ah",
      "CCA Rating": "1200 CCA",
      "Standard": "JIS N200 (210H52)"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 6460
      },
      {
        "min_qty": 10,
        "price": 6120
      },
      {
        "min_qty": 20,
        "price": 5780
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1022",
    "sku_code": "JNS-AC-1022",
    "barcode": "885110001345",
    "part_name": "Electric Vehicle 12V Auxiliary AGM Deep Cycle Battery 45Ah",
    "part_name_lo": "ແບັດເຕີຣີສຳຮອງ 12V AGM ສຳລັບລົດໄຟຟ້າ EV ຂະໜາດ 45Ah (ປິດສະໜິດ ບໍ່ຕ້ອງເຕີມນ້ຳກັ່ນ)",
    "category": "Accessories",
    "description": "Sealed Absorbed Glass Mat (AGM) 12V 45Ah auxiliary battery supplying power to onboard computers, lights, and EV contactors.",
    "description_lo": "ແບັດເຕີຣີ 12V AGM 45Ah ແບບປິດສະໜິດ ສຳລັບລະບົບໄຟຄວບຄຸມ ECU ແລະ ຄອນແທັກເຕີ້ໃນລົດໄຟຟ້າ EV ຈ່າຍໄຟນິ້ງ ສະໝ່ຳສະເໝີ.",
    "image_url": "/images/catalog/real/ev_aux_battery_1787946538086.jpg",
    "qty_on_hand": 30,
    "unit_price": 2800,
    "currency": "THB",
    "specs": {
      "Voltage": "12V",
      "Capacity": "45Ah",
      "Technology": "AGM VRLA Sealed",
      "Maintenance": "100% Maintenance Free"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2660
      },
      {
        "min_qty": 10,
        "price": 2520
      },
      {
        "min_qty": 20,
        "price": 2380
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1023",
    "sku_code": "JNS-AC-1023",
    "barcode": "885110001346",
    "part_name": "Type 2 to Type 2 3-Phase 32A 22kW Heavy Duty EV Fast Charging Cable (5m)",
    "part_name_lo": "ສາຍສາກລົດໄຟຟ້າ EV Type 2 to Type 2 3-Phase 32A 22kW (ຍາວ 5 ແມັດ ສາຍທົນທານ)",
    "category": "Accessories",
    "description": "Heavy duty 22kW 3-phase AC EV charging cable with ergonomic silver-plated Type 2 IEC 62196 plugs, TPU jacket, and IP55 protection.",
    "description_lo": "ສາຍສາກລົດໄຟຟ້າ 3 ເຟສ 32A 22kW ຫົວສຽບ Type 2 ມາດຕະຖານເອີຣົບ ຍາວ 5 ແມັດ ປລັກຊຸບເງິນນຳໄຟຟ້າດີຢ້ຽມ ກັນນ້ຳ IP55.",
    "image_url": "/images/catalog/real/ev_charging_cable_1787946513020.jpg",
    "qty_on_hand": 30,
    "unit_price": 4200,
    "currency": "THB",
    "specs": {
      "Power": "22 kW (3-Phase 32A 415V)",
      "Plugs": "Type 2 to Type 2 (IEC 62196-2)",
      "Length": "5 Meters",
      "Cable": "TPU Flame Retardant"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3990
      },
      {
        "min_qty": 10,
        "price": 3780
      },
      {
        "min_qty": 20,
        "price": 3570
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1024",
    "sku_code": "JNS-AC-1024",
    "barcode": "885110001347",
    "part_name": "Portable Mode 2 EV Charging Cable with LCD Display & CEE Industrial Plug (16A / 3.5kW)",
    "part_name_lo": "ເຄື່ອງສາກລົດໄຟຟ້າພົກພາ 16A 3.5kW ພ້ອມຈໍ LCD ແລະ ປລັກອຸດສາຫະກຳ CEE",
    "category": "Accessories",
    "description": "Adjustable 8A-16A portable EV charger with clear LCD monitoring screen, IP66 waterproof control box, and leakage current protection.",
    "description_lo": "ເຄື່ອງສາກລົດໄຟຟ້າແບບພົກພາ 16A 3.5kW ພ້ອມຈໍ LCD ສະແດງສະຖານະສາກ ປັບກະແສໄຟໄດ້ 8A/10A/13A/16A ປອດໄພດ້ວຍລະບົບຕັດໄຟຮົ່ວ.",
    "image_url": "/images/catalog/real/arcfox_charging_cable_1787991346297.jpg",
    "qty_on_hand": 25,
    "unit_price": 5400,
    "currency": "THB",
    "specs": {
      "Charging Power": "3.5 kW (1-Phase 16A 230V)",
      "Connector": "Type 2 with CEE / Schuko Plug",
      "Display": "OLED Current/Temp Display"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 5130
      },
      {
        "min_qty": 10,
        "price": 4860
      },
      {
        "min_qty": 20,
        "price": 4590
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1025",
    "sku_code": "JNS-AC-1025",
    "barcode": "885110001348",
    "part_name": "Type 2 to GB/T High Current Fast Charging Adapter (32A 250V AC)",
    "part_name_lo": "ຫົວແປງສາຍສາກລົດໄຟຟ້າ Type 2 ເປັນ GB/T (32A 250V ສຳລັບລົດໄຟຟ້າຈີນ)",
    "category": "Accessories",
    "description": "Heavy duty adapter enabling European Type 2 charging stations to plug directly into GB/T Chinese standard electric vehicles.",
    "description_lo": "ຫົວແປງສາຍສາກຈາກຫົວ Type 2 (ສະຖານີສາກທົ່ວໄປ) ເປັນ GB/T ສຳລັບລົດໄຟຟ້າຈີນ (BYD, GAC Aion, Wuling) ຮອງຮັບ 32A.",
    "image_url": "/images/catalog/real/ev_charging_adapter_1787991437929.jpg",
    "qty_on_hand": 40,
    "unit_price": 1850,
    "currency": "THB",
    "specs": {
      "Inlet": "Type 2 Female",
      "Outlet": "GB/T Male",
      "Rating": "32A 250V AC (7.2 kW)",
      "Certification": "CE / RoHS"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1758
      },
      {
        "min_qty": 10,
        "price": 1665
      },
      {
        "min_qty": 20,
        "price": 1572
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1026",
    "sku_code": "JNS-AC-1026",
    "barcode": "885110001349",
    "part_name": "High Voltage Shielded Orange Power Cable Harness (35 mm2 x 5m)",
    "part_name_lo": "ສາຍໄຟແຮງດັນສູງສີສົ້ມມີຊີລກັນກວນ ສຳລັບລົດໄຟຟ້າ 35 mm2 (ຍາວ 5 ແມັດ)",
    "category": "Accessories",
    "description": "Silicone insulated shielded orange high voltage cable rated for 1000V DC operating in electric drivetrains and power distribution units.",
    "description_lo": "ສາຍໄຟແຮງດັນສູງສີສົ້ມ 35 mm2 ມີຊັ້ນຟອຍ ແລະ ຕາໜ່າງກັນຄື້ນລົບກວນ EMI ທົນແຮງດັນ 1000V DC ສຳລັບລົດໄຟຟ້າ ແລະ ອິນເວີເຕີ້.",
    "image_url": "/images/catalog/real/toyota_hv_cable_1787991422275.jpg",
    "qty_on_hand": 20,
    "unit_price": 2850,
    "currency": "THB",
    "specs": {
      "Conductor": "35 mm2 Tinned Copper",
      "Voltage Rating": "1000V DC / 600V AC",
      "Shielding": "Tinned Copper Braid + Foil"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2708
      },
      {
        "min_qty": 10,
        "price": 2565
      },
      {
        "min_qty": 20,
        "price": 2422
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1027",
    "sku_code": "JNS-AC-1027",
    "barcode": "885110001350",
    "part_name": "Forklift Engine Starter Motor 12V 2.8kW (9-Tooth Pinion)",
    "part_name_lo": "ໄດສະຕາດລົດຍົກ Forklift 12V 2.8kW (ເຟືອງ 9 ແຂ້ວ ແຮງບິດສູງ)",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated 12V 2.8kW engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ 12V 2.8kW ວັດສະດຸ Reduction Gear Starter ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_starter_motor_1788016483875.jpg",
    "qty_on_hand": 30,
    "unit_price": 4500,
    "currency": "THB",
    "specs": {
      "Rating": "12V 2.8kW",
      "Component": "Reduction Gear Starter",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 4275
      },
      {
        "min_qty": 10,
        "price": 4050
      },
      {
        "min_qty": 20,
        "price": 3825
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1028",
    "sku_code": "JNS-AC-1028",
    "barcode": "885110001351",
    "part_name": "Forklift Engine Alternator 12V 60A with Internal Voltage Regulator",
    "part_name_lo": "ໄດຊາດລົດຍົກ Forklift 12V 60A ພ້ອມຄັດເອົາท์ໃນຕົວ",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated 12V 60A engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ 12V 60A ວັດສະດຸ Alternator with Vacuum Pump ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_alternator_1788016505466.jpg",
    "qty_on_hand": 30,
    "unit_price": 3800,
    "currency": "THB",
    "specs": {
      "Rating": "12V 60A",
      "Component": "Alternator with Vacuum Pump",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3610
      },
      {
        "min_qty": 10,
        "price": 3420
      },
      {
        "min_qty": 20,
        "price": 3230
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1029",
    "sku_code": "JNS-AC-1029",
    "barcode": "885110001352",
    "part_name": "Heavy Duty Copper-Brass 3-Row Engine Cooling Radiator for Forklift",
    "part_name_lo": "ໝໍ້ນ້ຳລົດຍົກ Forklift ທອງແດງ 3 ຊ່ອງໜາພິເສດ (ລະບາຍຄວາມຮ້ອນດີຢ້ຽມ)",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated 3-Row Copper/Brass engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ 3-Row Copper/Brass ວັດສະດຸ Radiator Core ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_radiator_1788016518095.jpg",
    "qty_on_hand": 30,
    "unit_price": 7800,
    "currency": "THB",
    "specs": {
      "Rating": "3-Row Copper/Brass",
      "Component": "Radiator Core",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7410
      },
      {
        "min_qty": 10,
        "price": 7020
      },
      {
        "min_qty": 20,
        "price": 6630
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1030",
    "sku_code": "JNS-AC-1030",
    "barcode": "885110001353",
    "part_name": "Engine Cast Iron Cooling Water Pump Assembly with Gasket",
    "part_name_lo": "ປັ໊ມນ້ຳຫຼໍ່ເຢັນເຄື່ອງຈັກລົດຍົກ Forklift ເສື້ອເຫຼັກຫຼໍ່ ພ້ອມປະເກັນ",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated Direct Bolt-On engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ Direct Bolt-On ວັດສະດຸ Cast Iron Impeller ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_water_pump_1788016534336.jpg",
    "qty_on_hand": 30,
    "unit_price": 2450,
    "currency": "THB",
    "specs": {
      "Rating": "Direct Bolt-On",
      "Component": "Cast Iron Impeller",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 2328
      },
      {
        "min_qty": 10,
        "price": 2205
      },
      {
        "min_qty": 20,
        "price": 2082
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1031",
    "sku_code": "JNS-AC-1031",
    "barcode": "885110001354",
    "part_name": "Engine Direct-Drive 8-Blade Plastic Radiator Cooling Fan (Dia 420mm)",
    "part_name_lo": "ໃບພັດໝໍ້ນ້ຳລົດຍົກ Forklift 8 ໃບ ຂະໜາດ 420 ມມ (ລົມແຮງ ທົນຄວາມຮ້ອນ)",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated Dia 420 mm (8 Blades) engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ Dia 420 mm (8 Blades) ວັດສະດຸ Nylon Polymer ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_cooling_fan_1788016810610.jpg",
    "qty_on_hand": 30,
    "unit_price": 850,
    "currency": "THB",
    "specs": {
      "Rating": "Dia 420 mm (8 Blades)",
      "Component": "Nylon Polymer",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 808
      },
      {
        "min_qty": 10,
        "price": 765
      },
      {
        "min_qty": 20,
        "price": 722
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1032",
    "sku_code": "JNS-AC-1032",
    "barcode": "885110001355",
    "part_name": "Engine Cooling System Thermostat Valve with Gasket (82°C Opening)",
    "part_name_lo": "ວາວນ້ຳລົດຍົກ Forklift 82 ອົງສາ ພ້ອມປະເກັນກັນຮົ່ວ",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated 82°C (180°F) engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ 82°C (180°F) ວັດສະດຸ Stainless & Copper ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_thermostat_1788016791108.jpg",
    "qty_on_hand": 30,
    "unit_price": 450,
    "currency": "THB",
    "specs": {
      "Rating": "82°C (180°F)",
      "Component": "Stainless & Copper",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 428
      },
      {
        "min_qty": 10,
        "price": 405
      },
      {
        "min_qty": 20,
        "price": 382
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1033",
    "sku_code": "JNS-AC-1033",
    "barcode": "885110001356",
    "part_name": "4-Position Keyed Ignition Starter Switch with 2 Keys for Forklift",
    "part_name_lo": "ສະວິດກຸນແຈສະຕາດລົດຍົກ Forklift 4 ຈັງຫວະ ພ້ອມລູກກຸນແຈ 2 ດອກ",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated 4-Position (Off/On/Preheat/Start) engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ 4-Position (Off/On/Preheat/Start) ວັດສະດຸ Keyed Switch ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_ignition_switch_1788016471204.jpg",
    "qty_on_hand": 30,
    "unit_price": 680,
    "currency": "THB",
    "specs": {
      "Rating": "4-Position (Off/On/Preheat/Start)",
      "Component": "Keyed Switch",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 646
      },
      {
        "min_qty": 10,
        "price": 612
      },
      {
        "min_qty": 20,
        "price": 578
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1034",
    "sku_code": "JNS-AC-1034",
    "barcode": "885110001357",
    "part_name": "Digital Instrument Dashboard Cluster (Hour Meter, Temp, Fuel, Battery)",
    "part_name_lo": "ໜ້າປັດເຮືອນໄມດິຈິຕອນລົດຍົກ Forklift (ໂມງຊົ່ວໂມງ, ຄວາມຮ້ອນ, ນ້ຳມັນ)",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated Digital LCD + Warning LED engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ Digital LCD + Warning LED ວັດສະດຸ Instrument Cluster ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_dash_cluster_1788016412230.jpg",
    "qty_on_hand": 30,
    "unit_price": 3800,
    "currency": "THB",
    "specs": {
      "Rating": "Digital LCD + Warning LED",
      "Component": "Instrument Cluster",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3610
      },
      {
        "min_qty": 10,
        "price": 3420
      },
      {
        "min_qty": 20,
        "price": 3230
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1035",
    "sku_code": "JNS-AC-1035",
    "barcode": "885110001358",
    "part_name": "Hydraulic Brake Master Cylinder with Integrated Fluid Reservoir",
    "part_name_lo": "ແມ່ປັ໊ມເບກຕົວເທິງລົດຍົກ Forklift ພ້ອມກະປຸກນ້ຳມັນເບກໃນຕົວ",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated Bore 3/4 Inch engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ Bore 3/4 Inch ວັດສະດຸ Cast Steel Cylinder ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_master_cylinder_1788018115872.jpg",
    "qty_on_hand": 30,
    "unit_price": 1850,
    "currency": "THB",
    "specs": {
      "Rating": "Bore 3/4 Inch",
      "Component": "Cast Steel Cylinder",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1758
      },
      {
        "min_qty": 10,
        "price": 1665
      },
      {
        "min_qty": 20,
        "price": 1572
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1036",
    "sku_code": "JNS-AC-1036",
    "barcode": "885110001359",
    "part_name": "Hydraulic Brake Wheel Cylinder Assembly (Left / Right)",
    "part_name_lo": "ກະບອກປັ໊ມເບກລໍ້ລົດຍົກ Forklift ຕົວລຸ່ມ (ຊ້າຍ-ຂວາ)",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated Wheel Cylinder 1-1/8\" engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ Wheel Cylinder 1-1/8\" ວັດສະດຸ Hydraulic Brake Actuator ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_wheel_cylinder_1788018295267.jpg",
    "qty_on_hand": 30,
    "unit_price": 850,
    "currency": "THB",
    "specs": {
      "Rating": "Wheel Cylinder 1-1/8\"",
      "Component": "Hydraulic Brake Actuator",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 808
      },
      {
        "min_qty": 10,
        "price": 765
      },
      {
        "min_qty": 20,
        "price": 722
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1037",
    "sku_code": "JNS-AC-1037",
    "barcode": "885110001360",
    "part_name": "Forklift Heavy Duty Primary & Secondary Brake Shoe Lining Set",
    "part_name_lo": "ຊຸດຜ້າເບກລົດຍົກ Forklift 4 ຊິ້ນ (ຜ້າເບກໜາພິເສດ ທົນຄວາມຮ້ອນສູງ)",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated Set of 4 Shoes engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ Set of 4 Shoes ວັດສະດຸ Non-Asbestos Friction Material ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_brake_shoe_1788018100027.jpg",
    "qty_on_hand": 30,
    "unit_price": 1450,
    "currency": "THB",
    "specs": {
      "Rating": "Set of 4 Shoes",
      "Component": "Non-Asbestos Friction Material",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1378
      },
      {
        "min_qty": 10,
        "price": 1305
      },
      {
        "min_qty": 20,
        "price": 1232
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1038",
    "sku_code": "JNS-AC-1038",
    "barcode": "885110001361",
    "part_name": "High Strength Mast Leaf Chain LH1244 (Pitch 19.05mm x 5 Meters)",
    "part_name_lo": "ໂສ້ຍົກເສົາລົດຍົກ Forklift LH1244 ຂະໜາດ 19.05 ມມ (ມ້ວນ 5 ແມັດ)",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated LH1244 (4x4 Lacing) engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ LH1244 (4x4 Lacing) ວັດສະດຸ High Alloy Steel 5 Meters ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_leaf_chain_1788018350850.jpg",
    "qty_on_hand": 30,
    "unit_price": 3200,
    "currency": "THB",
    "specs": {
      "Rating": "LH1244 (4x4 Lacing)",
      "Component": "High Alloy Steel 5 Meters",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3040
      },
      {
        "min_qty": 10,
        "price": 2880
      },
      {
        "min_qty": 20,
        "price": 2720
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1039",
    "sku_code": "JNS-AC-1039",
    "barcode": "885110001362",
    "part_name": "Fork Carriage Sealed Guide Roller Bearing (Dia 110mm)",
    "part_name_lo": "ລູກກິ້ງແຜ່ນງາລົດຍົກ Fork Carriage Roller (ຂະໜາດ 110 ມມ ຝາຊີລກັນຝຸ່ນ)",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated Dia 110 mm engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ Dia 110 mm ວັດສະດຸ High Load Chrome Steel ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_carriage_roller_1788018327384.jpg",
    "qty_on_hand": 30,
    "unit_price": 1250,
    "currency": "THB",
    "specs": {
      "Rating": "Dia 110 mm",
      "Component": "High Load Chrome Steel",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1188
      },
      {
        "min_qty": 10,
        "price": 1125
      },
      {
        "min_qty": 20,
        "price": 1062
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1040",
    "sku_code": "JNS-AC-1040",
    "barcode": "885110001363",
    "part_name": "Outer Mast Heavy Duty Guide Roller Bearing (Dia 125mm)",
    "part_name_lo": "ລູກກິ້ງເສົາລົດຍົກຕົວນອກ Mast Roller (ຂະໜາດ 125 ມມ ທົນແຮງກົດສູງ)",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated Dia 125 mm engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ Dia 125 mm ວັດສະດຸ Carriage Outer Guide ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_mast_roller_1788018307077.jpg",
    "qty_on_hand": 30,
    "unit_price": 1450,
    "currency": "THB",
    "specs": {
      "Rating": "Dia 125 mm",
      "Component": "Carriage Outer Guide",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1378
      },
      {
        "min_qty": 10,
        "price": 1305
      },
      {
        "min_qty": 20,
        "price": 1232
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1041",
    "sku_code": "JNS-AC-1041",
    "barcode": "885110001364",
    "part_name": "Mast Leaf Chain Anchor Clevis Bolt & Pin Assembly",
    "part_name_lo": "ສະລັກຍຶດໂສ້ລົດຍົກ ພ້ອມນັອດປັບຕຶງໂສ້ເສົາ (ຊຸດຄູ່ 2 ອັນ)",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated M20 Threaded Anchor engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ M20 Threaded Anchor ວັດສະດຸ Forged High Tensile Steel ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_chain_anchor_1788018339010.jpg",
    "qty_on_hand": 30,
    "unit_price": 850,
    "currency": "THB",
    "specs": {
      "Rating": "M20 Threaded Anchor",
      "Component": "Forged High Tensile Steel",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 808
      },
      {
        "min_qty": 10,
        "price": 765
      },
      {
        "min_qty": 20,
        "price": 722
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1042",
    "sku_code": "JNS-AC-1042",
    "barcode": "885110001365",
    "part_name": "Forged High-Alloy Steel Forklift Fork Tines (Class II 1070mm Pair)",
    "part_name_lo": "ງາລົດຍົກ Forklift ເຫຼັກຟອດແຂງແຮງສູງ Class II ຍາວ 1070 ມມ (ຄູ່ 2 ເຫຼັ້ມ)",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated Class II (1070 x 100 x 40mm) engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ Class II (1070 x 100 x 40mm) ວັດສະດຸ Capacity 2.5 - 3.0 Tons Pair ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_fork_tine_1788018364222.jpg",
    "qty_on_hand": 30,
    "unit_price": 9500,
    "currency": "THB",
    "specs": {
      "Rating": "Class II (1070 x 100 x 40mm)",
      "Component": "Capacity 2.5 - 3.0 Tons Pair",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 9025
      },
      {
        "min_qty": 10,
        "price": 8550
      },
      {
        "min_qty": 20,
        "price": 8075
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1043",
    "sku_code": "JNS-AC-1043",
    "barcode": "885110001366",
    "part_name": "Ergonomic Full Suspension Forklift Operator Seat with Retractable Seatbelt",
    "part_name_lo": "ເບາະນັ່ງຄົນຂັບລົດຍົກ Forklift ແບບສະປິງໂຊ໊ກອັບເຕັມລະບົບ ພ້ອມສາຍແອວນິລະໄພ",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated Full Suspension Weight Adjust engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ Full Suspension Weight Adjust ວັດສະດຸ Microswitch Safety Interlock ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_operator_seat_1788018505387.jpg",
    "qty_on_hand": 30,
    "unit_price": 4800,
    "currency": "THB",
    "specs": {
      "Rating": "Full Suspension Weight Adjust",
      "Component": "Microswitch Safety Interlock",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 4560
      },
      {
        "min_qty": 10,
        "price": 4320
      },
      {
        "min_qty": 20,
        "price": 4080
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1044",
    "sku_code": "JNS-AC-1044",
    "barcode": "885110001367",
    "part_name": "External Gear High Pressure Main Hydraulic Lift Pump (CBT-F425)",
    "part_name_lo": "ປັ໊ມໄຮໂດຣລິກຍົກຫຼັກລົດຍົກ Forklift CBT-F425 ແຮງດັນ 20 MPa",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated Displacement 25 cc/rev engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ Displacement 25 cc/rev ວັດສະດຸ Pressure 20 MPa (200 Bar) ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_hydraulic_pump_1788017080709.jpg",
    "qty_on_hand": 30,
    "unit_price": 5800,
    "currency": "THB",
    "specs": {
      "Rating": "Displacement 25 cc/rev",
      "Component": "Pressure 20 MPa (200 Bar)",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 5510
      },
      {
        "min_qty": 10,
        "price": 5220
      },
      {
        "min_qty": 20,
        "price": 4930
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1045",
    "sku_code": "JNS-AC-1045",
    "barcode": "885110001368",
    "part_name": "Multi-Spool Hydraulic Directional Control Valve with Pressure Relief (3-Spool)",
    "part_name_lo": "ຊຸດວາວຄອນໂທນໄຮໂດຣລິກ 3 ຕັບ ລົດຍົກ (ຍົກ, ອ່ຽງງາ, ປັບຂ້າງ Side-Shift)",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated 3-Spool Valve Block engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ 3-Spool Valve Block ວັດສະດຸ Max Flow 80 L/min 250 Bar ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_control_valve_1788017095746.jpg",
    "qty_on_hand": 30,
    "unit_price": 7800,
    "currency": "THB",
    "specs": {
      "Rating": "3-Spool Valve Block",
      "Component": "Max Flow 80 L/min 250 Bar",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 7410
      },
      {
        "min_qty": 10,
        "price": 7020
      },
      {
        "min_qty": 20,
        "price": 6630
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1046",
    "sku_code": "JNS-AC-1046",
    "barcode": "885110001369",
    "part_name": "Aluminum Bar & Plate Hydraulic Transmission Oil Cooler Core",
    "part_name_lo": "ຮັງເຜິ້ງອອຍຄູລເລີ້ລະບາຍຄວາມຮ້ອນນ້ຳມັນໄຮໂດຣລິກ ແລະ ເກຍອາລູມີນຽມ",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated Bar & Plate Aluminum engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ Bar & Plate Aluminum ວັດສະດຸ Oil Cooler Core ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_hydraulic_cooler_1788017676931.jpg",
    "qty_on_hand": 30,
    "unit_price": 3400,
    "currency": "THB",
    "specs": {
      "Rating": "Bar & Plate Aluminum",
      "Component": "Oil Cooler Core",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3230
      },
      {
        "min_qty": 10,
        "price": 3060
      },
      {
        "min_qty": 20,
        "price": 2890
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1047",
    "sku_code": "JNS-AC-1047",
    "barcode": "885110001370",
    "part_name": "Hydraulic Lift Cylinder Complete Polyurethane Piston & Rod Seal Kit",
    "part_name_lo": "ຊຸດຊີລກະບອກສູບຍົກໄຮໂດຣລິກ Forklift ເນື້ອ PU ຄົບຊຸດ",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated Lift Cylinder Seal Kit engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ Lift Cylinder Seal Kit ວັດສະດຸ PU U-Cups + Dust Wiper ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_lift_seal_kit_1788017113456.jpg",
    "qty_on_hand": 30,
    "unit_price": 1450,
    "currency": "THB",
    "specs": {
      "Rating": "Lift Cylinder Seal Kit",
      "Component": "PU U-Cups + Dust Wiper",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1378
      },
      {
        "min_qty": 10,
        "price": 1305
      },
      {
        "min_qty": 20,
        "price": 1232
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1048",
    "sku_code": "JNS-AC-1048",
    "barcode": "885110001371",
    "part_name": "Hydraulic Mast Tilt Cylinder Rebuild Oil Seal Kit (Pair for 2 Cylinders)",
    "part_name_lo": "ຊຸດຊີລກະບອກສູບອ່ຽງເສົາ Mast Tilt Cylinder (ຊຸດສຳລັບ 2 ກະບອກ)",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated Tilt Cylinder Seal Kit engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ Tilt Cylinder Seal Kit ວັດສະດຸ Hydraulic Seals Pair ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_tilt_seal_kit_1788017125441.jpg",
    "qty_on_hand": 30,
    "unit_price": 1250,
    "currency": "THB",
    "specs": {
      "Rating": "Tilt Cylinder Seal Kit",
      "Component": "Hydraulic Seals Pair",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1188
      },
      {
        "min_qty": 10,
        "price": 1125
      },
      {
        "min_qty": 20,
        "price": 1062
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1049",
    "sku_code": "JNS-AC-1049",
    "barcode": "885110001372",
    "part_name": "High Pressure 2-Wire Braided Hydraulic Mast Hose (3/8\" x 2400mm 350 Bar)",
    "part_name_lo": "ສາຍໄຮໂດຣລິກເສົາລົດຍົກ 2 ຊັ້ນ 3/8 ນິ້ວ ຍາວ 2.4 ແມັດ ແຮງດັນ 350 ບາ",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated 3/8\" x 2400 mm engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ 3/8\" x 2400 mm ວັດສະດຸ 2-Wire Steel Braid 350 Bar ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_hose_hyd_1788016098753.jpg",
    "qty_on_hand": 30,
    "unit_price": 950,
    "currency": "THB",
    "specs": {
      "Rating": "3/8\" x 2400 mm",
      "Component": "2-Wire Steel Braid 350 Bar",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 902
      },
      {
        "min_qty": 10,
        "price": 855
      },
      {
        "min_qty": 20,
        "price": 808
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1050",
    "sku_code": "JNS-AC-1050",
    "barcode": "885110001373",
    "part_name": "Molded EPDM Upper & Lower Engine Radiator Coolant Hose Set",
    "part_name_lo": "ທໍ່ຢາງໝໍ້ນ້ຳເທິງ-ລຸ່ມ ລົດຍົກ Forklift ເນື້ອ EPDM ເສີມຜ້າໃບ (ຊຸດ 2 ທ່ອນ)",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated Upper & Lower Hose engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ Upper & Lower Hose ວັດສະດຸ EPDM Reinforced ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_hose_rad.jpg",
    "qty_on_hand": 30,
    "unit_price": 650,
    "currency": "THB",
    "specs": {
      "Rating": "Upper & Lower Hose",
      "Component": "EPDM Reinforced",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 618
      },
      {
        "min_qty": 10,
        "price": 585
      },
      {
        "min_qty": 20,
        "price": 552
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1051",
    "sku_code": "JNS-AC-1051",
    "barcode": "885110001374",
    "part_name": "Hydraulic Oil Return Line Spin-On Filter Element (10 Micron)",
    "part_name_lo": "ກອງໄຮໂດຣລິກຂາກັບ Forklift ແບບໝູນປ່ຽນ Spin-On 10 ໄມຄຣອນ",
    "category": "Accessories",
    "description": "OEM specification forklift replacement component rated 10 Micron Beta 200 engineered for maximum uptime and reliability.",
    "description_lo": "ອາໄຫຼ່ແທ້ລົດຍົກ Forklift ມາດຕະຖານ OEM ຂະໜາດ 10 Micron Beta 200 ວັດສະດຸ Thread 1-1/8\"-16 ທົນທານ ພ້ອມປ່ຽນແທນໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/fl_hyd_filter_1788015658158.jpg",
    "qty_on_hand": 30,
    "unit_price": 580,
    "currency": "THB",
    "specs": {
      "Rating": "10 Micron Beta 200",
      "Component": "Thread 1-1/8\"-16",
      "Standard": "OEM Heavy Duty"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 551
      },
      {
        "min_qty": 10,
        "price": 522
      },
      {
        "min_qty": 20,
        "price": 493
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1052",
    "sku_code": "JNS-AC-1052",
    "barcode": "885110001375",
    "part_name": "Hardox 500 Excavator & Loader Bolt-On Bucket Cutting Edge Blade (L2200 x W250 x T25mm)",
    "part_name_lo": "ໃບມີດປາກບຸ້ງກີ໊ລົດຈົກ ແລະ ລົດຕັກ Hardox 500 (ຍາວ 2200 ມມ ໜາ 25 ມມ ແຂງແກ່ນພິເສດ)",
    "category": "Accessories",
    "description": "Wear-resistant Hardox 500 steel bolt-on reversible cutting edge blade for heavy excavator buckets and front wheel loaders.",
    "description_lo": "ໃບມີດປາກບຸ້ງກີ໊ເຫຼັກ Hardox 500 ແທ້ຈາກສະວີເດັນ ໜາ 25 ມມ ປ່ຽນສະຫຼັບດ້ານໄດ້ ທົນການສຽດສີຂອງຫີນ ແລະ ດິນດານ.",
    "image_url": "/images/catalog/real/bucket_cutting_edge_1787987787453.jpg",
    "qty_on_hand": 10,
    "unit_price": 14500,
    "currency": "THB",
    "specs": {
      "Material": "Hardox 500 Abrasion Resistant",
      "Dimensions": "2200 x 250 x 25 mm",
      "Holes": "Countersunk Plow Bolt Holes"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 13775
      },
      {
        "min_qty": 10,
        "price": 13050
      },
      {
        "min_qty": 20,
        "price": 12325
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1053",
    "sku_code": "JNS-AC-1053",
    "barcode": "885110001376",
    "part_name": "Heavy Duty Reinforced Rubber Tracks for Mini Excavators (300 x 52.5 x 84 Links)",
    "part_name_lo": "ສາຍພານຕີນຕະຂາບຢາງເສີມແກນເຫຼັກ ລົດຈົກນ້ອຍ (ຂະໜາດ 300 x 52.5 x 84 ຂໍ້)",
    "category": "Accessories",
    "description": "Continuous steel cord reinforced rubber tracks providing maximum traction and low ground disturbance for 3.0 - 3.5 ton excavators.",
    "description_lo": "ຕີນຕະຂາບຢາງລົດຈົກນ້ອຍ 3-3.5 ໂຕນ ແກນສະລິງເຫຼັກກ້າໄຮ້ຮອຍຕໍ່ ດອກຢາງໜາ ເກາະພື້ນດີ ບໍ່ທຳລາຍພື້ນຖະໜົນ.",
    "image_url": "/images/catalog/real/rubber_tracks_1787987801661.jpg",
    "qty_on_hand": 8,
    "unit_price": 18500,
    "currency": "THB",
    "specs": {
      "Width": "300 mm",
      "Pitch": "52.5 mm",
      "Links": "84 Links",
      "Core": "Jointless Steel Cord"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 17575
      },
      {
        "min_qty": 10,
        "price": 16650
      },
      {
        "min_qty": 20,
        "price": 15725
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1054",
    "sku_code": "JNS-AC-1054",
    "barcode": "885110001377",
    "part_name": "Excavator Sealed & Lubricated Heavy Steel Track Link Chain Assembly (45 Links for 20-Ton)",
    "part_name_lo": "ໂສ້ຕີນຕະຂາບເຫຼັກລົດຈົກ 20 ໂຕນ Sealed & Lubricated (45 ຂໍ້ ພ້ອມບຸດ ແລະ ສະລັກ)",
    "category": "Accessories",
    "description": "Forged boron steel track chain with polyurethane seals retaining grease inside pin and bushing joints to eliminate internal wear.",
    "description_lo": "ໂສ້ແທຣັກເຫຼັກລົດຈົກ 20 ໂຕນ 45 ຂໍ້ ເຫຼັກໂບຣອນຟອດແຂງພິເສດ ລະບົບຊີລກັກເກັບນ້ຳມັນຫຼໍ່ລື່ນ ຍືດອາຍຸການໃຊ້ງານ 2 ເທົ່າ.",
    "image_url": "/images/catalog/real/track_link_1787945633262.jpg",
    "qty_on_hand": 6,
    "unit_price": 38000,
    "currency": "THB",
    "specs": {
      "Links": "45 Links",
      "Machine Class": "20-Ton Excavator (CAT 320 / Komatsu PC200)",
      "Lubrication": "Sealed & Greased"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 36100
      },
      {
        "min_qty": 10,
        "price": 34200
      },
      {
        "min_qty": 20,
        "price": 32300
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1055",
    "sku_code": "JNS-AC-1055",
    "barcode": "885110001378",
    "part_name": "High Manganese Steel Jaw Crusher Fixed & Movable Tooth Plates (Mn18Cr2 Pair)",
    "part_name_lo": "ແຜ່ນແຂ້ວເຄື່ອງບົດຫີນ Jaw Crusher ເຫຼັກມັງການິດສູງ Mn18Cr2 (ຄູ່ແຜ່ນຢູ່ກັບທີ່ ແລະ ແຜ່ນເຄື່ອນທີ່)",
    "category": "Accessories",
    "description": "Extreme impact wear manganese alloy tooth plates engineered for primary jaw crushers processing hard granite and river gravel.",
    "description_lo": "ແຜ່ນແຂ້ວເຄື່ອງໂມ່ຫີນ Mn18Cr2 ທົນແຮງກະແທກມະຫາສານ ຍິ່ງບົດຫີນຍິ່ງແຂງ (Work-Hardening) ທົນທານຕໍ່ການສຽດສີສູງສຸດ.",
    "image_url": "/images/catalog/real/mining_jaw_plate_1787986343879.jpg",
    "qty_on_hand": 4,
    "unit_price": 42000,
    "currency": "THB",
    "specs": {
      "Material": "High Manganese Steel Mn18Cr2",
      "Hardness": "Initial 220 HB (Work-hardens to 500 HB)",
      "Weight": "450 kg/pair"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 39900
      },
      {
        "min_qty": 10,
        "price": 37800
      },
      {
        "min_qty": 20,
        "price": 35700
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1056",
    "sku_code": "JNS-AC-1056",
    "barcode": "885110001379",
    "part_name": "Heavy Duty Centrifugal Mining Slurry Pump for Sand Wash & Tailings (4\" x 3\" High Chrome)",
    "part_name_lo": "ປັ໊ມດູດຂີ້ຕົມ ແລະ ດິນຊາຍບໍ່ແຮ່ Slurry Pump 4x3 ນິ້ວ (ໃບພັດ ແລະ ເສື້ອປັ໊ມ High Chrome A05)",
    "category": "Accessories",
    "description": "Heavy cantilever slurry pump lined with 27% high chromium white iron alloy to pump abrasive gravel slurry and mineral concentrates.",
    "description_lo": "ປັ໊ມດູດດິນຊາຍບໍ່ແຮ່ 4x3 ນິ້ວ ໃບພັດ ແລະ ເສື້ອປັ໊ມໂຄຣມຽມສູງ A05 ທົນການກັດສີຂອງເມັດຊາຍ ແລະ ຫີນແຮ່ ເຮັດວຽກໜັກຕໍ່ເນື່ອງ.",
    "image_url": "/images/catalog/real/mining_slurry_pump_1787986331620.jpg",
    "qty_on_hand": 3,
    "unit_price": 54000,
    "currency": "THB",
    "specs": {
      "Inlet/Outlet": "100 mm / 75 mm (4\" x 3\")",
      "Wear Parts": "A05 High Chrome Alloy (60 HRC)",
      "Max Flow": "180 m3/h"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 51300
      },
      {
        "min_qty": 10,
        "price": 48600
      },
      {
        "min_qty": 20,
        "price": 45900
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1057",
    "sku_code": "JNS-AC-1057",
    "barcode": "885110001380",
    "part_name": "Excavator Axial Piston Hydraulic Main Pump (K3V112DT for 20-Ton Excavators)",
    "part_name_lo": "ປັ໊ມໄຮໂດຣລິກຫຼັກລົດຈົກ 20 ໂຕນ K3V112DT (Variable Piston Pump 35 MPa)",
    "category": "Accessories",
    "description": "Dual variable displacement axial piston main hydraulic pump with pilot pump and regulator for CAT/Komatsu/Doosan 20-ton diggers.",
    "description_lo": "ປັ໊ມໃຫຍ່ໄຮໂດຣລິກລົດຈົກ 20 ໂຕນ K3V112DT ປັ໊ມລູກສູບຄູ່ປັບອັດຕາໄຫຼອັດຕະໂນມັດ ແຮງດັນສູງ 35 MPa ແຮງຂຸດເຕັມກຳລັງ.",
    "image_url": "/images/catalog/real/hydraulic_pump_1787945565960.jpg",
    "qty_on_hand": 4,
    "unit_price": 68000,
    "currency": "THB",
    "specs": {
      "Model": "K3V112DT-1R9N",
      "Displacement": "112 cc x 2",
      "Max Pressure": "34.3 MPa (350 Bar)",
      "Weight": "135 kg"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 64600
      },
      {
        "min_qty": 10,
        "price": 61200
      },
      {
        "min_qty": 20,
        "price": 57800
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1058",
    "sku_code": "JNS-AC-1058",
    "barcode": "885110001381",
    "part_name": "High-Flow Directional Spool Hydraulic Control Valve Assembly (350 Bar / 4-Spool)",
    "part_name_lo": "ຊຸດວາວຄວບຄຸມໄຮໂດຣລິກແຮງດັນສູງ 4 ຕັບ 350 ບາ (ພ້ອມວາວເຊຟຕີ້ຕັດແຮງດັນເກີນ)",
    "category": "Accessories",
    "description": "Proportional monoblock hydraulic valve assembly designed to handle 350 bar operating pressures for drilling rigs and heavy winches.",
    "description_lo": "ຊຸດວາວໄຮໂດຣລິກ 4 ຕັບ ແຮງດັນ 350 ບາ ພ້ອມວາວ Main Relief Valve ສຳລັບເຄື່ອງເຈາະ ແລະ ລອກຍົກໄຮໂດຣລິກໜັກ.",
    "image_url": "/images/catalog/real/hydraulic_valve_1787989831146.jpg",
    "qty_on_hand": 8,
    "unit_price": 14500,
    "currency": "THB",
    "specs": {
      "Pressure Rating": "350 Bar (5075 PSI)",
      "Max Flow": "120 L/min",
      "Spools": "4-Spool Double Acting"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 13775
      },
      {
        "min_qty": 10,
        "price": 13050
      },
      {
        "min_qty": 20,
        "price": 12325
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1059",
    "sku_code": "JNS-AC-1059",
    "barcode": "885110001382",
    "part_name": "Excavator Boom & Arm Heavy Hydraulic Cylinder Oil Seal Repair Kit",
    "part_name_lo": "ຊຸດຊີລກະບອກບູມ ແລະ ອາມລົດຈົກ 20 ໂຕນ (ຊີລນ້ຳມັນ NOK ແທ້ ທົນແຮງດັນ 400 ບາ)",
    "category": "Accessories",
    "description": "Complete cylinder rebuild seal pack containing genuine polyurethane piston seals, rod seals, buffer rings, and double lip dust wipers.",
    "description_lo": "ຊຸດຊີລສ້ອມແປງກະບອກບູມ-ອາມລົດຈົກ 20 ໂຕນ ເນື້ອ PU ເກຣດພຣີມຽມ ທົນແຮງດັນ 400 ບາ ແລະ ຄວາມຮ້ອນສູງ ປ້ອງກັນນ້ຳມັນຮົ່ວ 100%.",
    "image_url": "/images/catalog/real/hydraulic_seal_kit_1787987741309.jpg",
    "qty_on_hand": 20,
    "unit_price": 3800,
    "currency": "THB",
    "specs": {
      "Material": "Polyurethane / PTFE / NBR 90",
      "Max Pressure": "400 Bar",
      "Application": "Boom / Arm / Bucket Cylinder"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 3610
      },
      {
        "min_qty": 10,
        "price": 3420
      },
      {
        "min_qty": 20,
        "price": 3230
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ac-1060",
    "sku_code": "JNS-AC-1060",
    "barcode": "885110001383",
    "part_name": "Anderson SB350 High Current 350A 600V Battery Quick Disconnect Plug (Red/Grey Pair)",
    "part_name_lo": "ຫົວສຽບແບັດເຕີຣີລົດຍົກ Anderson SB350 ຂະໜາດ 350A 600V (ຄູ່ຜູ້-ແມ່ ທົນກະແສໄຟສູງ)",
    "category": "Accessories",
    "description": "Heavy duty 350-amp battery quick disconnect power connector housing with silver-plated copper contacts for electric forklifts and chargers.",
    "description_lo": "ປລັກສຽບສາຍແບັດເຕີຣີລົດຍົກໄຟຟ້າ Anderson SB350 ຂະໜາດ 350A ຫາງປາທອງແດງຊຸບເງິນແທ້ ນຳກະແສໄຟໄດ້ດີ ບໍ່ເກີດປະກາຍໄຟ.",
    "image_url": "/images/catalog/real/anderson_connector_1788014060157.jpg",
    "qty_on_hand": 60,
    "unit_price": 1150,
    "currency": "THB",
    "specs": {
      "Current Rating": "350 Amperes",
      "Voltage Rating": "600 Volts",
      "Wire Gauge": "2/0 AWG (70 mm2)",
      "Contacts": "Silver Plated Copper"
    },
    "lead_time": "In Stock (1-2 Days)",
    "bulk_pricing": [
      {
        "min_qty": 5,
        "price": 1092
      },
      {
        "min_qty": 10,
        "price": 1035
      },
      {
        "min_qty": 20,
        "price": 978
      }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "mft-fd25n",
    "sku_code": "MFT-FD25N",
    "barcode": "885250000025",
    "part_name": "Mitsubishi GRENDiA ES 2.5 Tons Diesel Forklift (FD25N)",
    "part_name_lo": "ລົດຍົກດີເຊວ Mitsubishi GRENDiA ES 2.5 ໂຕນ (FD25N) - ເຄື່ອງຈັກແທ້ S4S ຍີ່ປຸ່ນ",
    "category": "Forklifts",
    "description": "Official Mitsubishi GRENDiA ES 2.5-ton counterbalance diesel forklift. Engineered with the legendary Mitsubishi S4S 3.3L industrial engine, Integrated Presence System (IPS), low noise, and unbeatable fuel efficiency.",
    "description_lo": "ລົດຍົກດີເຊວແທ້ຈາກ Mitsubishi ຍີ່ປຸ່ນ ຂະໜາດ 2.5 ໂຕນ ລຸ້ນຍອດນິຍົມອັນດັບ 1 ເຄື່ອງຈັກ Mitsubishi S4S ແຮງດີ ທົນທານ ປະຢັດນ້ຳມັນ ພ້ອມລະບົບຄວາມປອດໄພ IPS ຕັດການເຮັດວຽກເມື່ອຜູ້ຂັບຂີ່ອອກຈາກບ່ອນນັ່ງ.",
    "image_url": "/images/forklifts/mitsubishi_grendia_green.jpg",
    "gallery_images": [
      "/images/forklifts/fl_mitsubishi_front.jpg",
      "/images/forklifts/fl_view_rear_mitsubishi.jpg",
      "/images/forklifts/fl_mitsubishi_left.jpg",
      "/images/forklifts/fl_mitsubishi_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_mitsubishi_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_mitsubishi_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 8,
    "unit_price": 400000,
    "currency": "THB",
    "specs": {

      "Model": "FD25N (GRENDiA ES Series Japan)",
      "Rated Capacity": "2,500 kg (2.5 Metric Tons)",
      "Load Center": "500 mm Standard",
      "Engine Model": "Mitsubishi S4S 3.3L 4-Cylinder In-line Industrial Diesel",
      "Rated Power": "35.3 kW (47.3 HP) @ 2,250 RPM",
      "Maximum Torque": "170 N·m @ 1,700 RPM",
      "Displacement": "3,331 cc (3.3 Liters)",
      "Fuel Tank Capacity": "66 Liters Heavy-Duty Steel Tank",
      "Emission Standard": "Tier 3 / Euro III Industrial Compliant",
      "Transmission": "Smooth Powershift 1-Speed Automatic with Tor-Con & Inching Control",
      "Mast Lift Height": "3,000 mm Duplex Standard (Option: 4,500 - 6,000 mm Triplex Full-Free)",
      "Mast Tilt Angle": "6° Forward / 12° Backward",
      "Lifting Speed": "530 mm/s (Loaded) / 570 mm/s (Unloaded)",
      "Lowering Speed": "500 mm/s (Controlled Hydraulic Flow Limiter)",
      "Travel Speed": "19.0 km/h (Loaded) / 19.5 km/h (Unloaded)",
      "Gradeability (Max Slope)": "20% (Loaded @ 1.6 km/h)",
      "Minimum Turning Radius": "2,230 mm (Best-in-class maneuverability)",
      "Overall Dimensions (L×W×H)": "2,555 mm (to face) × 1,150 mm × 2,110 mm (Overhead Guard)",
      "Ground Clearance": "135 mm (Center Wheelbase) / 115 mm (Under Mast)",
      "Service Weight": "3,780 kg (High-Stability Heavy Cast Iron Counterweight)",
      "Fork Dimensions": "1,070 × 122 × 40 mm (Class IIA High-Strength Forged Steel)",
      "Attachment Included": "Factory Hydraulic Side-Shift Carriage (±100 mm Travel)",
      "Front Tires": "Solid Puncture-Proof 7.00-12 / 12PR",
      "Rear Tires": "Solid Puncture-Proof 6.00-9 / 10PR (Heavy Cast Steer Axle)",
      "Safety Interlock": "Mitsubishi IPS (Integrated Presence System - Automatic Hydraulic & Drive Lockout)",
      "Cabin Guard": "ISO ROPS/FOPS Certified High-Tensile Steel Structure",
      "Lighting & Warning": "Twin LED Headlights + Rear Working Lamp + Backup Alarm + Strobe Beacon",
      "Pre-Delivery Inspection": "DK Lao Certified PDI 30-Point Standard Pre-Delivery Testing",
      "Quality Certifications": "ISO 9001:2015, ISO 14001, CE Machinery Directive Compliant",
      "Warranty Guarantee": "12 ເດືອນ (12 Months OEM Factory Warranty)",
      "Delivery Lead Time": "ພ້ອມຈັດສົ່ງພາຍໃນ 24-48 ຊົ່ວໂມງ (ສາງນະຄອນຫຼວງວຽງຈັນ) / ນຳເຂົ້າ 30-45 ວັນ"
    },
    "lead_time": "In Stock (Vientiane Hub Dispatch 24-48h)",
    "warranty_months": 12
  },
  {
    "sku_id": "mft-fd30n",
    "sku_code": "MFT-FD30N",
    "barcode": "885300000030",
    "part_name": "Mitsubishi GRENDiA ES 3.0 Tons Diesel Forklift (FD30N)",
    "part_name_lo": "ລົດຍົກດີເຊວ Mitsubishi GRENDiA ES 3.0 ໂຕນ (FD30N) - ລຸ້ນຫຼັກງານໂຮງງານ & ສາງສິນຄ້າ",
    "category": "Forklifts",
    "description": "High-productivity 3.0-ton Mitsubishi GRENDiA ES forklift. Features heavy cast steering axle, 3-stage full-free triplex mast for container stuffing, hydraulic side-shift, and ErgoCentric operator compartment.",
    "description_lo": "ລົດຍົກດີເຊວ 3.0 ໂຕນ Mitsubishi GRENDiA ES ເຄື່ອງຈັກ S4S ກຳລັງສູງ ທົນທານຕໍ່ຝຸ່ນ ແລະ ຄວາມຮ້ອນ ເສົາ Triplex ຍົກໃນຕູ້ຄອນເທນເນີໄດ້ ສະດວກດ້ວຍງາ Side-Shift ເລື່ອນຊ້າຍ-ຂວາອັດຕະໂນມັດ.",
    "image_url": "/images/forklifts/mitsubishi_grendia_green.jpg",
    "gallery_images": [
      "/images/forklifts/fl_mitsubishi_front.jpg",
      "/images/forklifts/fl_view_rear_mitsubishi.jpg",
      "/images/forklifts/fl_mitsubishi_left.jpg",
      "/images/forklifts/fl_mitsubishi_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_mitsubishi_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_mitsubishi_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 12,
    "unit_price": 440000,
    "currency": "THB",
    "specs": {
      "Model": "FD30N (GRENDiA ES Series)",
      "Rated Capacity": "3,000 kg (3.0 Tons)",
      "Load Center": "500 mm",
      "Engine": "Mitsubishi S4S 3.3L Industrial Diesel (35.3 kW / 47.3 HP)",
      "Mast Lift Height": "3,000 mm - 4,500 mm Triplex Container Mast",
      "Fork Dimensions": "1,220 x 125 x 45 mm",
      "Transmission": "Hydraulic Automatic Powershift with Inching Control",
      "Safety System": "IPS Presence System & Seatbelt Interlock",
      "Tires": "Pneumatic or Solid Resilient Available"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "mft-fd35n",
    "sku_code": "MFT-FD35N",
    "barcode": "885350000035",
    "part_name": "Mitsubishi GRENDiA ES 3.5 Tons Diesel Forklift (FD35N)",
    "part_name_lo": "ລົດຍົກດີເຊວ Mitsubishi GRENDiA ES 3.5 ໂຕນ (FD35N) - ງານໜັກອຸດສາຫະກຳ",
    "category": "Forklifts",
    "description": "Heavy-duty 3.5-ton counterbalance forklift from the Mitsubishi GRENDiA ES line. Reinforced chassis, heavy counterweight, and high-flow hydraulics for demanding logistic yards and heavy palletized freight.",
    "description_lo": "ລົດຍົກ 3.5 ໂຕນ Mitsubishi GRENDiA ES ໂຄງສ້າງເຫຼັກໜາແໜ້ນ ເໝາະສຳລັບຍົກສິນຄ້າໜັກຕໍ່ເນື່ອງ ລະບົບໄຮໂດຣລິກແຮງດັນສູງ ຍົກໄດ້ໄວ ແລະ ນິ້ມນວນ.",
    "image_url": "/images/forklifts/mitsubishi_grendia_green.jpg",
    "gallery_images": [
      "/images/forklifts/fl_mitsubishi_front.jpg",
      "/images/forklifts/fl_view_rear_mitsubishi.jpg",
      "/images/forklifts/fl_mitsubishi_left.jpg",
      "/images/forklifts/fl_mitsubishi_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_mitsubishi_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_mitsubishi_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 6,
    "unit_price": 490000,
    "currency": "THB",
    "specs": {
      "Model": "FD35N (GRENDiA ES Series)",
      "Rated Capacity": "3,500 kg (3.5 Tons)",
      "Load Center": "500 mm",
      "Engine": "Mitsubishi S4S High-Output Diesel (38.5 kW)",
      "Mast Lift Height": "3,300 mm Standard / 4,500 mm Triplex",
      "Fork Dimensions": "1,220 x 130 x 50 mm",
      "Braking System": "Hydraulic Drum with Power Assist",
      "Safety": "IPS2 Active Operator Presence with Hydraulic Lockout"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "mft-fd40n3",
    "sku_code": "MFT-FD40N3",
    "barcode": "885400000040",
    "part_name": "Mitsubishi GRENDiA EX 4.0 Tons Heavy Diesel Forklift (FD40N3)",
    "part_name_lo": "ລົດຍົກງານໜັກ Mitsubishi GRENDiA EX 4.0 ໂຕນ (FD40N3) - ເຄື່ອງຈັກ 6 ສູບ S6S",
    "category": "Forklifts",
    "description": "Industrial 4.0-ton counterbalance forklift powered by the robust Mitsubishi S6S 6-cylinder diesel engine. Designed for steel processing, timber mills, and mining logistic depots with dual front drive tires.",
    "description_lo": "ລົດຍົກງານໜັກ 4.0 ໂຕນ Mitsubishi GRENDiA EX ເຄື່ອງຈັກ 6 ສູບ Mitsubishi S6S ແຮງບິດມະຫາສານ ລໍ້ໜ້າຢາງຕັນຄູ່ຮອງຮັບນ້ຳໜັກໄດ້ດີຢ້ຽມ ບໍ່ໂຄງເຄງ ປອດໄພທຸກສະພາບພື້ນຜິວ.",
    "image_url": "/images/forklifts/mitsubishi_heavy_dual.jpg",
    "gallery_images": [
      "/images/forklifts/fl_mitsubishi_front.jpg",
      "/images/forklifts/fl_view_rear_mitsubishi.jpg",
      "/images/forklifts/fl_mitsubishi_left.jpg",
      "/images/forklifts/fl_mitsubishi_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_mitsubishi_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_mitsubishi_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 6,
    "unit_price": 550000,
    "currency": "THB",
    "specs": {
      "Model": "FD40N3 (GRENDiA EX Series)",
      "Rated Capacity": "4,000 kg (4.0 Tons)",
      "Load Center": "500 mm",
      "Engine": "Mitsubishi S6S 5.0L 6-Cylinder Diesel (64 kW / 87 HP)",
      "Mast Lift Height": "3,300 mm - 6,000 mm Duplex/Triplex",
      "Fork Dimensions": "1,220 x 150 x 50 mm",
      "Drive Axle": "Planetary Hub Reduction with Dual Front Solid Tires",
      "Transmission": "Heavy Duty Automatic Powershift"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "mft-fd50n3",
    "sku_code": "MFT-FD50N3",
    "barcode": "885500000050",
    "part_name": "Mitsubishi GRENDiA EX 5.0 Tons Heavy Industrial Forklift (FD50N3)",
    "part_name_lo": "ລົດຍົກງານໜັກພິເສດ Mitsubishi GRENDiA EX 5.0 ໂຕນ (FD50N3) - ໂຮງງານເຫຼັກ & ໄຊທ໌ກໍ່ສ້າງ",
    "category": "Forklifts",
    "description": "5.0-ton heavy production forklift from Mitsubishi GRENDiA EX series. High torque 6-cylinder S6S diesel, heavy cast counterweight, dual solid drive tires, and dual hydraulic lift cylinders for extreme reliability.",
    "description_lo": "ລົດຍົກງານໜັກ 5.0 ໂຕນ Mitsubishi GRENDiA EX ເຄື່ອງຈັກ 6 ສູບ S6S ແທ້ ຍົກກ້ອນຫີນ, ເຫຼັກເສັ້ນ, ຄອນກີດ ໄດ້ຢ່າງໝັ້ນຄົງ ລະບົບລະບາຍຄວາມຮ້ອນຂະໜາດໃຫຍ່ ເຮັດວຽກ 24 ຊົ່ວໂມງບໍ່ຮ້ອນ.",
    "image_url": "/images/forklifts/mitsubishi_heavy_dual.jpg",
    "gallery_images": [
      "/images/forklifts/fl_mitsubishi_front.jpg",
      "/images/forklifts/fl_view_rear_mitsubishi.jpg",
      "/images/forklifts/fl_mitsubishi_left.jpg",
      "/images/forklifts/fl_mitsubishi_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_mitsubishi_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_mitsubishi_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 4,
    "unit_price": 670000,
    "currency": "THB",
    "specs": {
      "Model": "FD50N3 (GRENDiA EX Series)",
      "Rated Capacity": "5,000 kg (5.0 Tons)",
      "Load Center": "600 mm",
      "Engine": "Mitsubishi S6S 5.0L 6-Cylinder Industrial Diesel (64 kW / 87 HP)",
      "Mast Lift Height": "3,500 mm - 6,000 mm Available",
      "Fork Dimensions": "1,520 x 160 x 60 mm",
      "Wheel Configuration": "Dual Front Solid Tires (4 Front + 2 Rear)",
      "Braking": "Hydraulic Vacuum Power Booster Assist"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "mft-fd55n3",
    "sku_code": "MFT-FD55N3",
    "barcode": "885550000055",
    "part_name": "Mitsubishi GRENDiA EX 5.5 Tons Heavy Industrial Forklift (FD55N3)",
    "part_name_lo": "ລົດຍົກງານໜັກພິເສດ Mitsubishi GRENDiA EX 5.5 ໂຕນ (FD55N3) - ຍົກສິນຄ້າໜັກຕໍ່ເນື່ອງ 24/7",
    "category": "Forklifts",
    "description": "5.5-ton flagship heavy counterbalance forklift from Mitsubishi GRENDiA EX. Engineered with high-tensile steel mast, twin high-pressure lift cylinders, and heavy planetary final drive axle for quarry and mining logistics.",
    "description_lo": "ລົດຍົກ 5.5 ໂຕນ Mitsubishi GRENDiA EX ໂຄງສ້າງເສົາເຫຼັກກ້າ High-Tensile ກະບອກໄຮໂດຣລິກຍົກຄູ່ຄຸນນະພາບສູງ ຮອງຮັບງານໜັກໃນໄຊທ໌ບໍ່ແຮ່, ໂຮງງານຊີມັງ ແລະ ທ່າບົກ.",
    "image_url": "/images/forklifts/mitsubishi_heavy_dual.jpg",
    "gallery_images": [
      "/images/forklifts/fl_mitsubishi_front.jpg",
      "/images/forklifts/fl_view_rear_mitsubishi.jpg",
      "/images/forklifts/fl_mitsubishi_left.jpg",
      "/images/forklifts/fl_mitsubishi_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_mitsubishi_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_mitsubishi_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 3,
    "unit_price": 740000,
    "currency": "THB",
    "specs": {
      "Model": "FD55N3 (GRENDiA EX Series)",
      "Rated Capacity": "5,500 kg (5.5 Tons)",
      "Load Center": "600 mm",
      "Engine": "Mitsubishi S6S-T Turbocharged 6-Cylinder (68 kW / 92 HP)",
      "Mast Lift Height": "3,500 mm Heavy Construction",
      "Fork Dimensions": "1,520 x 160 x 65 mm",
      "Drive Axle": "Planetary Hub Reduction Final Drive",
      "Hydraulics": "Twin Lift Cylinders with Flow Limiter"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "mft-fd70n3",
    "sku_code": "MFT-FD70N3",
    "barcode": "885700000070",
    "part_name": "Mitsubishi TREXiA EX 7.0 Tons Port & Mining Heavy Forklift (FD70N3)",
    "part_name_lo": "ລົດຍົກທ່າບົກ & ບໍ່ແຮ່ Mitsubishi TREXiA EX 7.0 ໂຕນ (FD70N3) - ເບຣກປຽກ Wet Disc Brakes",
    "category": "Forklifts",
    "description": "Port and terminal grade 7.0-ton Mitsubishi TREXiA EX heavy forklift. Equipped with Perkins electronically controlled turbo diesel engine, maintenance-free enclosed wet disc brakes, and wide-view duplex mast.",
    "description_lo": "ລົດຍົກທ່າບົກ ແລະ ບໍ່ແຮ່ 7.0 ໂຕນ Mitsubishi TREXiA EX ເຄື່ອງຈັກ Turbo Perkins ລະບົບເບຣກປຽກ Wet Multi-Disc Brakes ປອດໄພສູງສຸດ ບໍ່ຕ້ອງບຳລຸງຮັກສາເລື້ອຍໆ ພ້ອມຫ້ອງຄົນຂັບແອເຢັນສະບາຍ.",
    "image_url": "/images/forklifts/mitsubishi_heavy_dual.jpg",
    "gallery_images": [
      "/images/forklifts/fl_mitsubishi_front.jpg",
      "/images/forklifts/fl_view_rear_mitsubishi.jpg",
      "/images/forklifts/fl_mitsubishi_left.jpg",
      "/images/forklifts/fl_mitsubishi_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_mitsubishi_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_mitsubishi_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 3,
    "unit_price": 910000,
    "currency": "THB",
    "specs": {
      "Model": "FD70N3 (TREXiA EX Series)",
      "Rated Capacity": "7,000 kg (7.0 Tons)",
      "Load Center": "600 mm",
      "Engine": "Perkins 1204F 4.4L Turbo Diesel (85.9 kW / 115 HP)",
      "Mast Lift Height": "4,000 mm Wide-View Duplex",
      "Fork Dimensions": "1,820 x 180 x 70 mm",
      "Braking System": "Enclosed Wet Multi-Disc Brakes",
      "Cabin": "Enclosed Air-Conditioned Deluxe Cabin"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "mft-fd100n3",
    "sku_code": "MFT-FD100N3",
    "barcode": "885800000100",
    "part_name": "Mitsubishi TREXiA EX 10.0 Tons Super Heavy Port Forklift (FD100N3)",
    "part_name_lo": "ລົດຍົກຂະໜາດໃຫຍ່ພິເສດ Mitsubishi TREXiA EX 10.0 ໂຕນ (FD100N3) - ສຳລັບຕູ້ຄອນເທນເນີ & ໂຮງງານເຫຼັກ",
    "category": "Forklifts",
    "description": "Maximum capacity 10.0-ton super heavy industrial forklift from Mitsubishi TREXiA EX. High-output turbo diesel, hydraulic fork positioner with independent side-shift, luxury operator cabin with AC, and rear-view camera radar system.",
    "description_lo": "ລົດຍົກຂະໜາດໃຫຍ່ພິເສດ 10.0 ໂຕນ Mitsubishi TREXiA EX ງາປັບກວ້າງ-ແຄບດ້ວຍໄຮໂດຣລິກ (Fork Positioner) ຫ້ອງຄົນຂັບແອເຢັນ ພ້ອມກ້ອງຖອຍ ແລະ ຣາດາເຕືອນຈຸດບອດ ຮອງຮັບຕູ້ຄອນເທນເນີ ແລະ ເຫຼັກມ້ວນ.",
    "image_url": "/images/forklifts/mitsubishi_heavy_dual.jpg",
    "gallery_images": [
      "/images/forklifts/fl_mitsubishi_front.jpg",
      "/images/forklifts/fl_view_rear_mitsubishi.jpg",
      "/images/forklifts/fl_mitsubishi_left.jpg",
      "/images/forklifts/fl_mitsubishi_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_mitsubishi_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_mitsubishi_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 2,
    "unit_price": 1200000,
    "currency": "THB",
    "specs": {
      "Model": "FD100N3 (TREXiA EX Series)",
      "Rated Capacity": "10,000 kg (10.0 Tons)",
      "Load Center": "600 mm",
      "Engine": "Perkins 1204F High-Output Turbo Diesel (97 kW / 130 HP)",
      "Mast Lift Height": "4,500 mm Heavy Steel Construction",
      "Fork Dimensions": "2,440 x 200 x 80 mm",
      "Attachments": "Hydraulic Fork Positioner + Independent Side-Shift",
      "Cabin": "Luxury Enclosed AC Cabin with Backup Camera & Radar"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "mft-fb18n2t",
    "sku_code": "MFT-FB18N2T",
    "barcode": "885180000018",
    "part_name": "Mitsubishi EDiA EM 1.8 Tons 48V 3-Wheel Electric Forklift (FB18N2T)",
    "part_name_lo": "ລົດຍົກໄຟຟ້າ 3 ລໍ້ Mitsubishi EDiA EM 1.8 ໂຕນ (FB18N2T) - ລ້ຽວແຄບ 360° ບໍ່ມີມົນລະພິດ 100%",
    "category": "Forklifts",
    "description": "Ultra-agile 1.8-ton 3-wheel 48V electric counterbalance forklift from the Mitsubishi EDiA EM range. Features Sensitive Drive System (SDS), 360-degree electric steering with zero turning radius, AutoBoost for ramps, and zero emissions.",
    "description_lo": "ລົດຍົກໄຟຟ້າ 3 ລໍ້ 1.8 ໂຕນ Mitsubishi EDiA EM ລຸ້ນຍອດນິຍົມສຳລັບສາງສິນຄ້າອາຫານ, ຢາ, ແລະ ຫ້ອງເຢັນ ລ້ຽວໄດ້ 360 ອົງສາໃນຊ່ອງທາງແຄບ ລະບົບ AutoBoost ຂຶ້ນທາງຄ້ອຍໄດ້ແຮງ ບໍ່ມີຄວັນພິດ 100%.",
    "image_url": "/images/forklifts/toyota_8fbe_electric.jpg",
    "gallery_images": [
      "/images/forklifts/fl_mitsubishi_front.jpg",
      "/images/forklifts/fl_view_rear_mitsubishi.jpg",
      "/images/forklifts/fl_mitsubishi_left.jpg",
      "/images/forklifts/fl_mitsubishi_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_mitsubishi_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_mitsubishi_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 5,
    "unit_price": 410000,
    "currency": "THB",
    "specs": {
      "Model": "FB18N2T (EDiA EM Series)",
      "Rated Capacity": "1,800 kg (1.8 Tons)",
      "Load Center": "500 mm",
      "Battery System": "48V AC Dual Drive Motor (Li-ion Option Available)",
      "Steering": "360-Degree Electric Steering (Zero Turning Radius)",
      "Mast Lift Height": "3,000 mm - 4,800 mm Triplex Mast",
      "Drive Tech": "Sensitive Drive System (SDS) & AutoBoost Ramp Assist",
      "Emissions": "Zero Emissions / Silent Operation"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "mft-fb25n",
    "sku_code": "MFT-FB25N",
    "barcode": "885250000080",
    "part_name": "Mitsubishi EDiA EX 2.5 Tons 80V Electric Forklift (FB25N - IPX4 Weatherproof)",
    "part_name_lo": "ລົດຍົກໄຟຟ້າ 4 ລໍ້ 80V Mitsubishi EDiA EX 2.5 ໂຕນ (FB25N) - ກັນນ້ຳ IPX4 ລຸຍຝົນໄດ້",
    "category": "Forklifts",
    "description": "Next-generation 80V electric counterbalance forklift from Mitsubishi EDiA EX. IPX4 weatherproof design allows continuous operation in heavy rain outdoors, rivaling IC diesel power while delivering zero emissions and low operating cost.",
    "description_lo": "ລົດຍົກໄຟຟ້າ 4 ລໍ້ 80V ຂະໜາດ 2.5 ໂຕນ Mitsubishi EDiA EX ມາດຕະຖານກັນນ້ຳ IPX4 ສາມາດແລ່ນກາງແຈ້ງທ່າມກາງຝົນຕົກໄດ້ ພະລັງແຮງທຽບເທົ່າລົດນ້ຳມັນ ປະຢັດຕົ້ນທຶນພະລັງງານສູງ ລະບົບເບຣກປຽກໄຮໂດຣລິກ.",
    "image_url": "/images/forklifts/mitsubishi_grendia_green.jpg",
    "gallery_images": [
      "/images/forklifts/fl_mitsubishi_front.jpg",
      "/images/forklifts/fl_view_rear_mitsubishi.jpg",
      "/images/forklifts/fl_mitsubishi_left.jpg",
      "/images/forklifts/fl_mitsubishi_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_mitsubishi_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_mitsubishi_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 4,
    "unit_price": 500000,
    "currency": "THB",
    "specs": {
      "Model": "FB25N (EDiA EX Series)",
      "Rated Capacity": "2,500 kg (2.5 Tons)",
      "Load Center": "500 mm",
      "Battery System": "80V High-Voltage AC Power (Lithium-Ion Ready)",
      "Weatherproofing": "IPX4 Certified Water & Dust Resistance (Outdoor All-Weather)",
      "Mast Lift Height": "3,000 mm - 5,000 mm",
      "Drive Tech": "Dual Drive Motors, Curve Speed Control, Sensitive Drive",
      "Braking": "Regenerative Electric Braking with Sealed Wet Discs"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "mft-rb16n2",
    "sku_code": "MFT-RB16N2",
    "barcode": "885160000016",
    "part_name": "Mitsubishi SENSiA ES 1.6 Tons Reach Truck (RB16N2 - High-Bay 12m Lift)",
    "part_name_lo": "ລົດຍົກ Reach Truck ຍົກສູງ Mitsubishi SENSiA ES 1.6 ໂຕນ (RB16N2) - ລະບົບ Active Sway Control",
    "category": "Forklifts",
    "description": "High-bay warehouse reach truck from the Mitsubishi SENSiA ES range. Lifts up to 12.0 meters with patented Active Sway Control (ASC) eliminating mast sway, vision camera assist, and ultra-precise proportional fingertip hydraulic controls.",
    "description_lo": "ລົດຍົກສາງສິນຄ້າ Reach Truck ຂະໜາດ 1.6 ໂຕນ Mitsubishi SENSiA ES ສຳລັບຊັ້ນວາງສູງເຖິງ 12 ແມັດ ລະບົບ Active Sway Control (ASC) ຕັດອາການໂຄງເຄງຂອງເສົາ ປອດໄພ ແລະ ຍົກວາງສິນຄ້າໄດ້ໄວທີ່ສຸດ.",
    "image_url": "/images/forklifts/toyota_8fbre_reachtruck.jpg",
    "gallery_images": [
      "/images/forklifts/fl_mitsubishi_front.jpg",
      "/images/forklifts/fl_view_rear_mitsubishi.jpg",
      "/images/forklifts/fl_mitsubishi_left.jpg",
      "/images/forklifts/fl_mitsubishi_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_mitsubishi_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_mitsubishi_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 3,
    "unit_price": 540000,
    "currency": "THB",
    "specs": {
      "Model": "RB16N2 (SENSiA ES Series)",
      "Rated Capacity": "1,600 kg (1.6 Tons)",
      "Max Lift Height": "Up to 12,000 mm (12.0 Meters)",
      "Mast Control": "Active Sway Control (ASC) Anti-Sway Technology",
      "Controls": "Multifunctional Ergonomic Joystick with Proportional Valves",
      "Safety": "Height Indicator, Overload Limiter, 360° Vision Cabin"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "mft-pbp20n2",
    "sku_code": "MFT-PBP20N2",
    "barcode": "885200000020",
    "part_name": "Mitsubishi PREMiA ES 2.0 Tons Electric Powered Pallet Truck (PBP20N2)",
    "part_name_lo": "ລົດລາກພາເລດໄຟຟ້າ Mitsubishi PREMiA ES 2.0 ໂຕນ (PBP20N2) - ໂຄງສ້າງເຫຼັກກ້າແຂງແກ່ນ",
    "category": "Forklifts",
    "description": "Pedestrian electric powered pallet truck from Mitsubishi PREMiA ES series. Heavy duty 2000 kg capacity, sealed AC drive motor, ergonomic tiller arm with creep speed function for narrow truck loading.",
    "description_lo": "ລົດລາກພາເລດໄຟຟ້າ 2.0 ໂຕນ Mitsubishi PREMiA ES ຂັບເຄື່ອນດ້ວຍມໍເຕີໄຟຟ້າ AC ບໍ່ຕ້ອງບຳລຸງຮັກສາ ດັກຝຸ່ນກັນນ້ຳ ດຶງລາກສິນຄ້າໜັກໄດ້ສະບາຍ ປຸ່ມກົດ Creep Speed ສຳລັບບັງຄັບໃນພື້ນທີ່ແຄບ.",
    "image_url": "/images/jenstore-products/full_lithium_ion_powered_pallet_truck_1_5_tons_fork_115_1.jpg",
    "gallery_images": [
      "/images/forklifts/fl_mitsubishi_front.jpg",
      "/images/forklifts/fl_view_rear_mitsubishi.jpg",
      "/images/forklifts/fl_mitsubishi_left.jpg",
      "/images/forklifts/fl_mitsubishi_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_mitsubishi_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_mitsubishi_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 8,
    "unit_price": 90000,
    "currency": "THB",
    "specs": {
      "Model": "PBP20N2 (PREMiA ES Series)",
      "Rated Capacity": "2,000 kg (2.0 Tons)",
      "Fork Dimensions": "685 x 1,150 mm (Euro / Standard Pallets)",
      "Drive System": "Sealed AC Drive Motor with Regenerative Braking",
      "Tiller Head": "Ergonomic Control Head with Dual Throttle and Creep Mode",
      "Battery": "24V Industrial Battery with On-Board Smart Charger"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "tyt-8fd25",
    "sku_code": "TYT-8FD25",
    "barcode": "885300000001",
    "part_name": "Toyota 8-Series 2.5 Tons Diesel Forklift (8FD25) with SAS",
    "part_name_lo": "ລົດຍົກດີເຊວ Toyota 8-Series ຂະໜາດ 2.5 ໂຕນ (8FD25) - ລະບົບປ້ອງກັນລົດຂວ້ຳອັດສະລິຍະ SAS",
    "category": "Forklifts",
    "description": "World's #1 Toyota 8-Series 2.5-ton diesel counterbalance forklift. Equipped with Toyota's exclusive System of Active Stability (SAS), 1DZ-III engine, and ergonomic operator cabin.",
    "description_lo": "ລົດຍົກດີເຊວອັນດັບ 1 ຂອງໂລກ Toyota 8-Series ຂະໜາດ 2.5 ໂຕນ (8FD25). ມາພ້ອມລະບົບປ້ອງກັນລົດຂວ້ຳອັດສະລິຍະ SAS (System of Active Stability), ຈັກ Toyota 1DZ-III ແຮງດີປະຢັດນ້ຳມັນ, ເສົາແຂງແຮງມອງເຫັນກວ້າງ.",
    "image_url": "/images/forklifts/toyota_8fd_orange.jpg",
    "gallery_images": [
      "/images/forklifts/fl_toyota_front.jpg",
      "/images/forklifts/fl_view_rear.jpg",
      "/images/forklifts/fl_toyota_left.jpg",
      "/images/forklifts/fl_toyota_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_comp_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_comp_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 6,
    "unit_price": 450000,
    "currency": "THB",
    "specs": {
      "Model": "8FD25 (Toyota 8-Series)",
      "Rated Capacity": "2,500 kg (2.5 Tons)",
      "Lift Height": "3,000 mm (Duplex / Optional Triplex 4.5m)",
      "Engine": "Toyota 1DZ-III Industrial Diesel",
      "Safety System": "Toyota SAS (System of Active Stability) + OPS",
      "Transmission": "Powershift Automatic 1-Speed"
    },
    "lead_time": "In Stock (Vientiane Hub Dispatch 24-48h)",
    "warranty_months": 12
  },
  {
    "sku_id": "tyt-8fd30",
    "sku_code": "TYT-8FD30",
    "barcode": "885300000002",
    "part_name": "Toyota 8-Series 3.0 Tons Diesel Forklift (8FD30) with SAS & Side Shift",
    "part_name_lo": "ລົດຍົກດີເຊວ Toyota 8-Series ຂະໜາດ 3.0 ໂຕນ (8FD30) - ພ້ອມງາເລື່ອນ Side Shift & SAS",
    "category": "Forklifts",
    "description": "Industry benchmark 3.0-ton Toyota diesel counterbalance forklift with high-torque 1ZS engine, hydraulic side-shifter, pneumatic heavy-duty tires, and active mast angle/tilt control.",
    "description_lo": "ລົດຍົກດີເຊວມາດຕະຖານໂລກ Toyota 8FD30 ຮັບນ້ຳໜັກ 3.0 ໂຕນ ຈັກ Toyota 1ZS ແຮງບິດສູງ ພ້ອມງາເລື່ອນໄຮໂດຣລິກ Side Shift ຊ້າຍ-ຂວາ ຄວບຄຸມມຸມອຽງເສົາອັດຕະໂນມັດ ປອດໄພສູງສຸດ.",
    "image_url": "/images/forklifts/toyota_8fd_orange.jpg",
    "gallery_images": [
      "/images/forklifts/fl_toyota_front.jpg",
      "/images/forklifts/fl_view_rear.jpg",
      "/images/forklifts/fl_toyota_left.jpg",
      "/images/forklifts/fl_toyota_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_comp_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_comp_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 7,
    "unit_price": 510000,
    "currency": "THB",
    "specs": {
      "Model": "8FD30 (Toyota 8-Series)",
      "Rated Capacity": "3,000 kg (3.0 Tons)",
      "Lift Height": "3,000 mm - 4,500 mm Container Mast",
      "Engine": "Toyota 1ZS High-Torque Turbo Diesel",
      "Attachment": "Hydraulic Integrated Side Shift",
      "Safety": "Toyota SAS + OPS Seat Switch Interlock"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "tyt-8fd35",
    "sku_code": "TYT-8FD35",
    "barcode": "885300000003",
    "part_name": "Toyota 8-Series 3.5 Tons Heavy Duty Diesel Forklift (8FD35)",
    "part_name_lo": "ລົດຍົກດີເຊວ Toyota 8-Series ຂະໜາດ 3.5 ໂຕນ (8FD35) - ງານໜັກໂຮງງານ ແລະ ສາງກາງແຈ້ງ",
    "category": "Forklifts",
    "description": "Heavy duty 3.5-ton counterbalance forklift engineered for intensive outdoor yard operation, timber mills, and freight logistics. Dual front drive tire options available.",
    "description_lo": "ລົດຍົກງານໜັກ 3.5 ໂຕນ Toyota 8FD35 ອອກແບບສຳລັບງານກາງແຈ້ງທີ່ຕ້ອງການຄວາມທົນທານສູງ ໂຮງເລື່ອຍໄມ້, ຂົນສົ່ງສິນຄ້າໜັກ ແລະ ໂຮງງານຜະລິດ.",
    "image_url": "/images/forklifts/toyota_8fd_orange.jpg",
    "gallery_images": [
      "/images/forklifts/fl_toyota_front.jpg",
      "/images/forklifts/fl_view_rear.jpg",
      "/images/forklifts/fl_toyota_left.jpg",
      "/images/forklifts/fl_toyota_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_comp_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_comp_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 4,
    "unit_price": 570000,
    "currency": "THB",
    "specs": {
      "Model": "8FD35 (Toyota 8-Series)",
      "Rated Capacity": "3,500 kg (3.5 Tons)",
      "Lift Height": "3,000 mm (Duplex / Triplex Optional)",
      "Engine": "Toyota 1ZS Industrial Diesel",
      "Tires": "Heavy Duty Solid / Pneumatic",
      "Safety": "Active Mast Front Tilt Angle Control (SAS)"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "tyt-8fd50n",
    "sku_code": "TYT-8FD50N",
    "barcode": "885300000004",
    "part_name": "Toyota Mid IC 5.0 Tons Heavy Diesel Forklift (8FD50N) Dual Front Tires",
    "part_name_lo": "ລົດຍົກດີເຊວ Toyota Mid IC ຂະໜາດ 5.0 ໂຕນ (8FD50N) - ລໍ້ຄູ່ໜ້າ ງານໜັກອຸດສາຫະກຳ & ບໍ່ແຮ່",
    "category": "Forklifts",
    "description": "Robust 5.0-ton pneumatic IC forklift featuring dual front drive tires, high capacity hydraulic cooling system, and proven Toyota 14Z-II 6-cylinder diesel powertrain.",
    "description_lo": "ລົດຍົກງານໜັກພິເສດ 5.0 ໂຕນ Toyota Mid IC ລໍ້ຄູ່ໜ້າ ເຄື່ອງຈັກ 6 ສູບ Toyota 14Z-II ແຮງມ້າສູງ ລະບົບລະບາຍຄວາມຮ້ອນຂະໜາດໃຫຍ່ ສຳລັບໂຮງງານຊີມັງ, ບໍ່ແຮ່ ແລະ ງານຍົກເຄື່ອງຈັກ.",
    "image_url": "/images/forklifts/toyota_8fd_orange.jpg",
    "gallery_images": [
      "/images/forklifts/fl_toyota_front.jpg",
      "/images/forklifts/fl_view_rear.jpg",
      "/images/forklifts/fl_toyota_left.jpg",
      "/images/forklifts/fl_toyota_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_comp_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_comp_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 3,
    "unit_price": 830000,
    "currency": "THB",
    "specs": {
      "Model": "8FD50N (Mid IC Series)",
      "Rated Capacity": "5,000 kg (5.0 Tons)",
      "Engine": "Toyota 14Z-II 6-Cylinder Diesel (5.2L)",
      "Wheelbase & Tires": "Dual Front Drive Pneumatic Tires",
      "Lift Height": "3,000 mm - 5,500 mm",
      "Brakes": "Hydraulic Power Assisted Brakes"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "tyt-8fd80n",
    "sku_code": "TYT-8FD80N",
    "barcode": "885300000005",
    "part_name": "Toyota Large IC 8.0 Tons Heavy Duty Diesel Forklift (8FD80N)",
    "part_name_lo": "ລົດຍົກດີເຊວ Toyota Large IC ຂະໜາດ 8.0 ໂຕນ (8FD80N) - ຍົກໂຄງສ້າງເຫຼັກ & ຄອນກີດແຜ່ນ",
    "category": "Forklifts",
    "description": "Heavy duty industrial 8000 kg counterbalance forklift designed for precast concrete plants, structural steel yards, and heavy machinery logistics. Heavy cast steer axle.",
    "description_lo": "ລົດຍົກ 8.0 ໂຕນ Toyota Large IC ສຳລັບໂຮງງານຜະລິດເສົາຄອນກີດ, ໂຮງງານເຫຼັກກ້າ, ທ່າເຮືອ ແລະ ໂຄງການກໍ່ສ້າງຂະໜາດໃຫຍ່. ຄານທ້າຍເຫຼັກຫຼໍ່ໜາພິເສດ ທົນທານຕໍ່ແຮງກະແທກ.",
    "image_url": "/images/forklifts/toyota_8fd_orange.jpg",
    "gallery_images": [
      "/images/forklifts/fl_toyota_front.jpg",
      "/images/forklifts/fl_view_rear.jpg",
      "/images/forklifts/fl_toyota_left.jpg",
      "/images/forklifts/fl_toyota_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_comp_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_comp_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 2,
    "unit_price": 1260000,
    "currency": "THB",
    "specs": {
      "Model": "8FD80N (Large IC Series)",
      "Rated Capacity": "8,000 kg (8.0 Tons)",
      "Engine": "Toyota 6-Cylinder Heavy Industrial Diesel",
      "Transmission": "Heavy Duty Automatic with Oil Cooler",
      "Hydraulics": "Triple Hydraulic Pump System",
      "Safety": "Key-Off Lift Lock, SAS Active Mast Stabilization"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "tyt-thd1600",
    "sku_code": "TYT-THD1600",
    "barcode": "885300000006",
    "part_name": "Toyota High-Capacity 16.0 Tons Port & Mining Diesel Forklift (THD1600)",
    "part_name_lo": "ລົດຍົກທ່າບົກ & ບໍ່ແຮ່ Toyota High-Capacity 16.0 ໂຕນ (THD1600) - ຈັກ Cummins 6.7L",
    "category": "Forklifts",
    "description": "High-capacity 16-ton pneumatic forklift built for intermodal dry ports, mineral ore concentrates, and container yard handling. Powered by Cummins 6.7L Tier 4 engine with Dana transmission.",
    "description_lo": "ລົດຍົກຂະໜາດໃຫຍ່ 16.0 ໂຕນ ສຳລັບທ່າບົກທ່ານາແລ້ງ, ສະຖານີລົດໄຟລາວ-ຈີນ, ບໍ່ແຮ່ ແລະ ງານຍົກຕູ້ສິນຄ້າ. ຈັກ Cummins 6.7L Turbo ເກຍ Dana ແຂງແກ່ນທົນທານ.",
    "image_url": "/images/forklifts/forklift_eight_ton_clean.jpg",
    "gallery_images": [
      "/images/forklifts/fl_toyota_front.jpg",
      "/images/forklifts/fl_view_rear.jpg",
      "/images/forklifts/fl_toyota_left.jpg",
      "/images/forklifts/fl_toyota_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_comp_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_comp_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 2,
    "unit_price": 2280000,
    "currency": "THB",
    "specs": {
      "Model": "THD1600 (High-Capacity Pneumatic)",
      "Rated Capacity": "16,000 kg (16.0 Tons @ 600mm / 900mm LC)",
      "Engine": "Cummins QSB 6.7L Turbocharged Diesel (173 HP)",
      "Transmission": "Dana Spicer TE-10 Powershift 3-Speed",
      "Drive Axle": "AxleTech Planetary Heavy Duty Drive Axle",
      "Cabin": "All-Weather Enclosed Cabin with Air Conditioner"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "tyt-thd2400",
    "sku_code": "TYT-THD2400",
    "barcode": "885300000007",
    "part_name": "Toyota High-Capacity 24.0 Tons Heavy Duty Forklift (THD2400)",
    "part_name_lo": "ລົດຍົກຂະໜາດໃຫຍ່ພິເສດ Toyota High-Capacity 24.0 ໂຕນ (THD2400) - ງານຍົກຕູ້ຄອນເທນເນີ & ບໍ່ແຮ່ຂະໜາດໃຫຍ່",
    "category": "Forklifts",
    "description": "Massive 24,000 kg capacity industrial heavy forklift. Perfect for laden container lifting, heavy coil handling, mining extraction machinery, and hydropower component assembly.",
    "description_lo": "ລົດຍົກພະລັງສູງ 24.0 ໂຕນ Toyota THD2400 ສຳລັບງານຍົກຕູ້ຄອນເທນເນີມີສິນຄ້າເຕັມ, ມ້ວນເຫຼັກໃຫຍ່, ເຄື່ອງຈັກບໍ່ແຮ່ ແລະ ອຸປະກອນເຂື່ອນໄຟຟ້າ.",
    "image_url": "/images/forklifts/forklift_eight_ton_clean.jpg",
    "gallery_images": [
      "/images/forklifts/fl_toyota_front.jpg",
      "/images/forklifts/fl_view_rear.jpg",
      "/images/forklifts/fl_toyota_left.jpg",
      "/images/forklifts/fl_toyota_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_comp_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_comp_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 1,
    "unit_price": 3400000,
    "currency": "THB",
    "specs": {
      "Model": "THD2400 (Heavy Duty Series)",
      "Rated Capacity": "24,000 kg (24.0 Tons @ 1200mm LC)",
      "Engine": "Cummins 6.7L Stage V Heavy Diesel (225 HP)",
      "Mast": "Heavy Section Roller Mast with 2400mm Forks",
      "Braking": "Wet Multi-Disc Brakes with Oil Cooler",
      "Instrumentation": "MD4 Touchscreen 7-inch Diagnostic Display"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "tyt-8fbe18",
    "sku_code": "TYT-8FBE18",
    "barcode": "885300000008",
    "part_name": "Toyota 3-Wheel 1.8 Tons Electric Counterbalance Forklift (8FBE18)",
    "part_name_lo": "ລົດຍົກໄຟຟ້າ 3 ລໍ້ Toyota 8-Series 1.8 ໂຕນ (8FBE18) - ວົງລ້ຽວແຄບ ຫມູນໄດ້ 360° ປອດມົນລະພິດ",
    "category": "Forklifts",
    "description": "Ultra-compact 3-wheel electric counterbalance forklift with 48V dual AC drive motors. 360-degree pivot turning for narrow aisle warehouse stacking, food production, and pharmaceutical storage.",
    "description_lo": "ລົດຍົກໄຟຟ້າ 3 ລໍ້ ຂະໜາດ 1.8 ໂຕນ Toyota 8FBE18 ວົງລ້ຽວແຄບສຸດໆ ໝູນກັບຕົວໄດ້ໃນຕູ້ຄອນເທນເນີ ມໍເຕີໄຟຟ້າ AC ຄູ່ 48V ປະຢັດໄຟ ບໍ່ມີຄວັນພິດ ເໝາະກັບສາງອາຫານ ແລະ ຢາ.",
    "image_url": "/images/forklifts/toyota_8fbe_electric.jpg",
    "gallery_images": [
      "/images/forklifts/fl_toyota_front.jpg",
      "/images/forklifts/fl_view_rear.jpg",
      "/images/forklifts/fl_toyota_left.jpg",
      "/images/forklifts/fl_toyota_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_comp_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_comp_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 5,
    "unit_price": 400000,
    "currency": "THB",
    "specs": {
      "Model": "8FBE18 (3-Wheel Electric)",
      "Rated Capacity": "1,800 kg (1.8 Tons)",
      "Battery System": "48V High Capacity Industrial Battery",
      "Drive Motors": "Dual AC Front Drive Motors",
      "Turning Radius": "1,550 mm (Tight Pivot)",
      "Safety": "System of Active Stability for Electric (SAS-e)"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "tyt-8fbn25",
    "sku_code": "TYT-8FBN25",
    "barcode": "885300000009",
    "part_name": "Toyota 8-Series 4-Wheel 2.5 Tons Electric Forklift 80V (8FBN25) IPX4 All-Weather",
    "part_name_lo": "ລົດຍົກໄຟຟ້າ 4 ລໍ້ Toyota 8-Series 2.5 ໂຕນ 80V (8FBN25) - ກັນນ້ຳ IPX4 ໃຊ້ກາງແຈ້ງ ແລະ ຫ້ອງເຢັນ",
    "category": "Forklifts",
    "description": "High performance 80V 4-wheel electric forklift matching the speed and ramp climb power of diesel models. Certified IPX4 water resistance for outdoor rain operation and cold storage up to -30°C.",
    "description_lo": "ລົດຍົກໄຟຟ້າ 80V ຂະໜາດ 2.5 ໂຕນ Toyota 8FBN25 ແຮງເທົ່າລົດຍົກນ້ຳມັນ ຂຶ້ນທາງຊັນໄດ້ດີ ມາດຕະຖານກັນນ້ຳ IPX4 ສາມາດຂັບຕາກຝົນ ແລະ ເຮັດວຽກໃນຫ້ອງເຢັນຕິດລົບ -30°C ໄດ້ສະບາຍ.",
    "image_url": "/images/forklifts/toyota_8fbe_electric.jpg",
    "gallery_images": [
      "/images/forklifts/fl_toyota_front.jpg",
      "/images/forklifts/fl_view_rear.jpg",
      "/images/forklifts/fl_toyota_left.jpg",
      "/images/forklifts/fl_toyota_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_comp_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_comp_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 4,
    "unit_price": 900000,
    "currency": "THB",
    "specs": {
      "Model": "8FBN25 (80V Electric Pneumatic)",
      "Rated Capacity": "2,500 kg (2.5 Tons)",
      "Power System": "80V AC Drive & Lift System",
      "Weather Protection": "IPX4 Water Resistant Certified",
      "Safety": "Toyota SAS-e Automatic Turn Speed Reduction",
      "Options": "Cold Storage & Lithium-Ion Ready"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "tyt-8fbn30",
    "sku_code": "TYT-8FBN30",
    "barcode": "885300000010",
    "part_name": "Toyota 8-Series 4-Wheel 3.0 Tons Electric Forklift 80V (8FBN30)",
    "part_name_lo": "ລົດຍົກໄຟຟ້າ 4 ລໍ້ Toyota 8-Series 3.0 ໂຕນ 80V (8FBN30) - ຍົກໜັກ 3 ໂຕນ ສຽງງຽບ 0% ຄວັນ",
    "category": "Forklifts",
    "description": "Heavy 3000 kg electric forklift designed for 24/7 manufacturing, beverage distribution, and clean production lines. Regenerative braking recuperates battery charge on decel.",
    "description_lo": "ລົດຍົກໄຟຟ້າ 3.0 ໂຕນ Toyota 8FBN30 ພະລັງຍົກສູງ ມໍເຕີໄຟຟ້າ AC 80V ລະບົບດຶງພະລັງງານກັບຄືນເວລາເບຣກ (Regenerative Braking) ໃຊ້ງານໄດ້ຍາວນານຕະຫຼອດກະ ບໍ່ມີສຽງລົບກວນ.",
    "image_url": "/images/forklifts/toyota_8fbe_electric.jpg",
    "gallery_images": [
      "/images/forklifts/fl_toyota_front.jpg",
      "/images/forklifts/fl_view_rear.jpg",
      "/images/forklifts/fl_toyota_left.jpg",
      "/images/forklifts/fl_toyota_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_comp_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_comp_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 3,
    "unit_price": 600000,
    "currency": "THB",
    "specs": {
      "Model": "8FBN30 (Electric Pneumatic)",
      "Rated Capacity": "3,000 kg (3.0 Tons)",
      "Battery": "80V High Capacity Lead-Acid / Li-ion",
      "Hydraulics": "Proportional Electro-Hydraulic Valve Control",
      "Braking": "Oil Cooled Wet Disc Brakes (Maintenance Free)",
      "Mast": "Full Free Triplex Mast up to 6,000 mm"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "tyt-8fbre16",
    "sku_code": "TYT-8FBRE16",
    "barcode": "885300000011",
    "part_name": "Toyota 8-Series 1.6 Tons High-Bay Reach Truck (8FBRE16) Lift 12.5m",
    "part_name_lo": "ລົດຍົກສູງ Reach Truck Toyota 8-Series 1.6 ໂຕນ (8FBRE16) - ຍົກສູງ 12.5 ແມັດ ລະບົບ TLC",
    "category": "Forklifts",
    "description": "Premium warehouse reach truck engineered for ultra-high racking up to 12.5 meters. Features Transitional Lift Control (TLC) for vibration-free lifting and 360-degree electronic progressive steering.",
    "description_lo": "ລົດຍົກສູງ Reach Truck Toyota 1.6 ໂຕນ ຍົກສູງເຖິງ 12.5 ແມັດ ສຳລັບສາງສິນຄ້າ High-Bay Racking. ລະບົບ TLC ຍົກສິນຄ້າຂຶ້ນ-ລົງນຸ່ມນວນບໍ່ມີການສັ່ນໄກວ ພ້ອມກ້ອງ ແລະ ຈໍສະແດງຜົນປາຍງາ.",
    "image_url": "/images/forklifts/toyota_8fbre_reachtruck.jpg",
    "gallery_images": [
      "/images/forklifts/fl_toyota_front.jpg",
      "/images/forklifts/fl_view_rear.jpg",
      "/images/forklifts/fl_toyota_left.jpg",
      "/images/forklifts/fl_toyota_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_comp_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_comp_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 3,
    "unit_price": 550000,
    "currency": "THB",
    "specs": {
      "Model": "8FBRE16 (Reach Truck Series)",
      "Rated Capacity": "1,600 kg (1.6 Tons)",
      "Max Lift Height": "Up to 12,500 mm (12.5 Meters)",
      "Mast Technology": "TLC (Transitional Lift Control) Anti-Shock",
      "Steering": "360° Progressive Electronic Power Steering",
      "Visibility": "Panoramic Overhead Guard & Mast View"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "tyt-8hbw23",
    "sku_code": "TYT-8HBW23",
    "barcode": "885300000012",
    "part_name": "Toyota Electric Walkie Pallet Jack 2.0 Tons (8HBW23) with Click-to-Creep",
    "part_name_lo": "ລົດລາກພາເລດໄຟຟ້າ Toyota 2.0 ໂຕນ (8HBW23) - ລະບົບ Click-to-Creep ຂັບເຄື່ອນໃນທີ່ແຄບສະດວກ",
    "category": "Forklifts",
    "description": "Heavy duty 2000 kg electric walkie pallet truck. Ergonomic steering handle with thumb wheels, regenerative braking, click-to-creep slow maneuvering with handle upright inside container trucks.",
    "description_lo": "ລົດລາກພາເລດໄຟຟ້າ Toyota 8HBW23 ຂະໜາດ 2.0 ໂຕນ ຄັນບັງຄັບ Ergonomic ຈັບຖະໜັດມື ລະບົບ Click-to-Creep ຕັ້ງຄັນບັງຄັບກົງແລ້ວຍັງຂັບເຄື່ອນຊ້າໆໄດ້ ສະດວກສຸດໆໃນທ້າຍລົດບັນທຸກ.",
    "image_url": "/images/forklifts/jungheinrich_eje_pallettruck.jpg",
    "gallery_images": [
      "/images/forklifts/fl_toyota_front.jpg",
      "/images/forklifts/fl_view_rear.jpg",
      "/images/forklifts/fl_toyota_left.jpg",
      "/images/forklifts/fl_toyota_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_comp_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_comp_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 8,
    "unit_price": 92000,
    "currency": "THB",
    "specs": {
      "Model": "8HBW23 (Electric Walkie Series)",
      "Rated Capacity": "2,000 kg (2.0 Tons)",
      "Drive System": "AC Drive Motor with Regenerative Braking",
      "Forks": "685 x 1150 mm Heavy Gauge Box Rail Steel",
      "Special Feature": "Click-to-Creep Vertical Handle Drive",
      "Charger": "Built-in High Frequency Automatic Charger"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "heli-cpcd25-h3",
    "sku_code": "HELI-CPCD25-H3",
    "barcode": "885400000001",
    "part_name": "HELI H3 Series 2.5 Tons Diesel Forklift (CPCD25) Suspended Cabin",
    "part_name_lo": "ລົດຍົກດີເຊວ HELI H3 Series ຂະໜາດ 2.5 ໂຕນ (CPCD25) - ຫ້ອງໂດຍສານລະບົບໂຊກລອຍ ຫຼຸດແຮງສັ່ນ 30%",
    "category": "Forklifts",
    "description": "HELI H3 series 2500 kg diesel counterbalance forklift. Best-selling benchmark in China and Southeast Asia featuring full suspended cabin, load-sensing hydraulic system, and Isuzu C240 powertrain.",
    "description_lo": "ລົດຍົກດີເຊວ HELI H3 ຂະໜາດ 2.5 ໂຕນ ລຸ້ນຍອດນິຍົມອັນດັບ 1 ຂອງ HELI. ຫ້ອງໂດຍສານລະບົບໂຊກລອຍເຕັມຮູບແບບ (Full Floating Cabin) ຫຼຸດແຮງສັ່ນສະເທືອນ 30%, ໄຮໂດຣລິກ Load-Sensing ປະຢັດນ້ຳມັນ.",
    "image_url": "/images/forklifts/heli_h3_red.jpg",
    "gallery_images": [
      "/images/forklifts/fl_heli_front.jpg",
      "/images/forklifts/fl_view_rear_heli.jpg",
      "/images/forklifts/fl_heli_left.jpg",
      "/images/forklifts/fl_heli_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_heli_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_heli_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 8,
    "unit_price": 275000,
    "currency": "THB",
    "specs": {
      "Model": "CPCD25 (HELI H3 Series)",
      "Rated Capacity": "2,500 kg (2.5 Tons)",
      "Engine": "Isuzu C240 / Xinchai 4D29Y Diesel",
      "Lift Height": "3,000 mm (Duplex / Optional Triplex 4.5m)",
      "Cabin": "Suspended Vibration-Isolated Overhead Guard",
      "Hydraulics": "Dynamic Load Sensing Steering & Lift"
    },
    "lead_time": "In Stock (Vientiane Hub Dispatch 24-48h)",
    "warranty_months": 12
  },
  {
    "sku_id": "heli-cpcd30-h3",
    "sku_code": "HELI-CPCD30-H3",
    "barcode": "885400000002",
    "part_name": "HELI H3 Series 3.0 Tons Diesel Forklift (CPCD30) with Side Shift",
    "part_name_lo": "ລົດຍົກດີເຊວ HELI H3 Series ຂະໜາດ 3.0 ໂຕນ (CPCD30) - ພ້ອມງາເລື່ອນ Side Shift",
    "category": "Forklifts",
    "description": "Heavy duty 3.0-ton diesel forklift from HELI H3 series. Equipped with Mitsubishi S4S industrial engine, integrated hydraulic side-shifter, cast steel steer axle, and wide-view mast.",
    "description_lo": "ລົດຍົກດີເຊວ 3.0 ໂຕນ HELI H3 ຈັກ Mitsubishi S4S ທົນທານສູງ ພ້ອມງາເລື່ອນໄຮໂດຣລິກ Side Shift ຊ້າຍ-ຂວາ ມາດຕະຖານໂຮງງານ ຄານລ້ຽວທ້າຍເຫຼັກຫຼໍ່ໜາພິເສດ ລິຂະສິດສະເພາະ HELI.",
    "image_url": "/images/forklifts/heli_h3_red.jpg",
    "gallery_images": [
      "/images/forklifts/fl_heli_front.jpg",
      "/images/forklifts/fl_view_rear_heli.jpg",
      "/images/forklifts/fl_heli_left.jpg",
      "/images/forklifts/fl_heli_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_heli_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_heli_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 9,
    "unit_price": 315000,
    "currency": "THB",
    "specs": {
      "Model": "CPCD30 (HELI H3 Series)",
      "Rated Capacity": "3,000 kg (3.0 Tons)",
      "Engine": "Mitsubishi S4S / Quanchai Diesel",
      "Attachment": "Hydraulic Integrated Side Shift",
      "Mast": "3,000 mm - 4,500 mm Wide View Mast",
      "Steering": "Patented Cast Steer Axle (Waterproof & Dustproof)"
    },
    "lead_time": "In Stock (Vientiane Hub Dispatch 24-48h)",
    "warranty_months": 12
  },
  {
    "sku_id": "heli-cpcd35-h3",
    "sku_code": "HELI-CPCD35-H3",
    "barcode": "885400000003",
    "part_name": "HELI H3 Series 3.5 Tons Heavy Duty Diesel Forklift (CPCD35)",
    "part_name_lo": "ລົດຍົກດີເຊວ HELI H3 Series ຂະໜາດ 3.5 ໂຕນ (CPCD35) - ງານໜັກໂຮງງານ ແລະ ໄຊທ໌ກໍ່ສ້າງ",
    "category": "Forklifts",
    "description": "Rugged 3.5-ton counterbalance forklift designed for continuous container stuffing, steel yards, and quarry sites. Reinforced mast channels and oversized aluminum radiator.",
    "description_lo": "ລົດຍົກງານໜັກ 3.5 ໂຕນ HELI H3 ເສົາເຫຼັກກ້າເສີມພິເສດ ໝໍ້ນ້ຳອາລູມີນຽມຂະໜາດໃຫຍ່ລະບາຍຄວາມຮ້ອນດີເລີດ ເໝາະກັບສະພາບອາກາດຮ້ອນໃນລາວ.",
    "image_url": "/images/forklifts/heli_h3_red.jpg",
    "gallery_images": [
      "/images/forklifts/fl_heli_front.jpg",
      "/images/forklifts/fl_view_rear_heli.jpg",
      "/images/forklifts/fl_heli_left.jpg",
      "/images/forklifts/fl_heli_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_heli_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_heli_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 5,
    "unit_price": 360000,
    "currency": "THB",
    "specs": {
      "Model": "CPCD35 (HELI H3 Series)",
      "Rated Capacity": "3,500 kg (3.5 Tons)",
      "Engine": "Heavy Industrial Diesel (4-Cylinder)",
      "Lift Height": "3,000 mm (Duplex / Triplex 4.5m)",
      "Cooling": "Plate-Fin Heavy Duty Aluminum Radiator",
      "Tires": "Heavy Duty Pneumatic / Solid Option"
    },
    "lead_time": "In Stock (Vientiane Hub Dispatch 24-48h)",
    "warranty_months": 12
  },
  {
    "sku_id": "heli-cpcd50-g3",
    "sku_code": "HELI-CPCD50-G3",
    "barcode": "885400000004",
    "part_name": "HELI G3 Series 5.0 Tons Heavy Duty Diesel Forklift (CPCD50) Dual Front Wheels",
    "part_name_lo": "ລົດຍົກດີເຊວ HELI G3 Series ຂະໜາດ 5.0 ໂຕນ (CPCD50) - ລໍ້ຄູ່ໜ້າ ງານໜັກໂຮງເລື່ອຍ & ຊີມັງ",
    "category": "Forklifts",
    "description": "Heavy duty 5.0-ton forklift from HELI's next-gen G3 series. Dual front drive wheels, high torque industrial diesel, electro-hydraulic directional control, and ergonomic luxury cabin.",
    "description_lo": "ລົດຍົກງານໜັກ 5.0 ໂຕນ HELI ລຸ້ນໃໝ່ຫຼ້າສຸດ G3 Series ລໍ້ຄູ່ໜ້າ ເຄື່ອງຈັກດີເຊວກຳລັງສູງ ເກຍໄຟຟ້າປ່ຽນທິດທາງນຸ່ມນວນ ຫ້ອງໂດຍສານກວ້າງຂວາງ ມຸມມອງຮອບຄັນ.",
    "image_url": "/images/forklifts/heli_h3_red.jpg",
    "gallery_images": [
      "/images/forklifts/fl_heli_front.jpg",
      "/images/forklifts/fl_view_rear_heli.jpg",
      "/images/forklifts/fl_heli_left.jpg",
      "/images/forklifts/fl_heli_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_heli_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_heli_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 4,
    "unit_price": 550000,
    "currency": "THB",
    "specs": {
      "Model": "CPCD50 (HELI G3 Series)",
      "Rated Capacity": "5,000 kg (5.0 Tons)",
      "Engine": "Chaochai / Cummins Industrial Turbo Diesel",
      "Drive Wheels": "Dual Front Drive Pneumatic Tires",
      "Lift Height": "3,000 mm - 5,500 mm",
      "Control": "Electro-Hydraulic Shift with Finger Control"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "heli-cpcd70-g3",
    "sku_code": "HELI-CPCD70-G3",
    "barcode": "885400000005",
    "part_name": "HELI G3 Series 7.0 Tons Port & Industrial Heavy Forklift (CPCD70)",
    "part_name_lo": "ລົດຍົກທ່າບົກ & ບໍ່ແຮ່ HELI G3 Series ຂະໜາດ 7.0 ໂຕນ (CPCD70) - ຈັກ Turbo 6 ສູບ",
    "category": "Forklifts",
    "description": "Powerful 7000 kg pneumatic counterbalance forklift engineered for intermodal terminals, steel manufacturing, and mining supply yards. 6-cylinder turbo diesel with wet disc brakes.",
    "description_lo": "ລົດຍົກຂະໜາດ 7.0 ໂຕນ HELI G3 Series ຈັກ Turbo 6 ສູບ ແຮງດຶງສູງ ສຳລັບທ່າບົກທ່ານາແລ້ງ, ຂົນຖ່າຍສິນຄ້າລົດໄຟລາວ-ຈີນ, ໂຮງງານເຫຼັກ ແລະ ບໍ່ແຮ່. ລະບົບເບຣກແຊ່ນ້ຳມັນ (Wet Disc Brake) ທົນທານບໍ່ຕ້ອງບຳລຸງຮັກສາ.",
    "image_url": "/images/forklifts/heli_h3_red.jpg",
    "gallery_images": [
      "/images/forklifts/fl_heli_front.jpg",
      "/images/forklifts/fl_view_rear_heli.jpg",
      "/images/forklifts/fl_heli_left.jpg",
      "/images/forklifts/fl_heli_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_heli_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_heli_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 3,
    "unit_price": 820000,
    "currency": "THB",
    "specs": {
      "Model": "CPCD70 (HELI G3 Series)",
      "Rated Capacity": "7,000 kg (7.0 Tons)",
      "Engine": "6-Cylinder Heavy Duty Turbo Diesel",
      "Braking System": "Fully Enclosed Wet Multi-Disc Brakes",
      "Transmission": "Heavy Duty Automatic Powershift",
      "Cabin": "Enclosed Air-Conditioned Luxury Cabin"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "heli-cpcd100-g3",
    "sku_code": "HELI-CPCD100-G3",
    "barcode": "885400000006",
    "part_name": "HELI G3 Series 10.0 Tons Super Heavy Duty Forklift (CPCD100)",
    "part_name_lo": "ລົດຍົກຂະໜາດໃຫຍ່ພິເສດ HELI G3 Series 10.0 ໂຕນ (CPCD100) - ຍົກຕູ້ຄອນເທນເນີ & ໂຄງການເຂື່ອນໄຟຟ້າ",
    "category": "Forklifts",
    "description": "Massive 10-ton industrial forklift powered by Cummins 6.7L industrial diesel. Designed for loaded container yard logistics, granite quarry blocks, and hydroelectric dam project components.",
    "description_lo": "ລົດຍົກ 10.0 ໂຕນ HELI G3 ຈັກ Cummins 6.7L Turbo ເກຍອັດຕະໂນມັດ ຮັບນ້ຳໜັກໄດ້ສູງສຸດ 10 ໂຕນ ຍົກຕູ້ຄອນເທນເນີ, ກ້ອນຫີນຂະໜາດໃຫຍ່ ແລະ ອຸປະກອນໂຄງການເຂື່ອນໄຟຟ້າ.",
    "image_url": "/images/forklifts/heli_h3_red.jpg",
    "gallery_images": [
      "/images/forklifts/fl_heli_front.jpg",
      "/images/forklifts/fl_view_rear_heli.jpg",
      "/images/forklifts/fl_heli_left.jpg",
      "/images/forklifts/fl_heli_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_heli_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_heli_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 2,
    "unit_price": 1200000,
    "currency": "THB",
    "specs": {
      "Model": "CPCD100 (HELI G3 Series)",
      "Rated Capacity": "10,000 kg (10.0 Tons)",
      "Engine": "Cummins 6.7L Industrial Turbo Diesel",
      "Transmission": "Intelligent Powershift with Torque Converter",
      "Hydraulic Valves": "Multi-Way Proportional Control Valves",
      "Instrumentation": "CAN-Bus Intelligent Digital Instrument Display"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "heli-cpcd35-rt4",
    "sku_code": "HELI-CPCD35-RT4",
    "barcode": "885400000007",
    "part_name": "HELI G3 Series 3.5 Tons 4WD Rough Terrain Forklift (CPCD35-RT4)",
    "part_name_lo": "ລົດຍົກລຸຍທາງວິບາກ 4WD HELI G3 3.5 ໂຕນ (CPCD35-RT4) - ລຸຍສວນຢາງພາລາ, ໄຮ່ອ້ອຍ & ດິນຕົມ",
    "category": "Forklifts",
    "description": "Dedicated 4-wheel drive rough terrain forklift. Electronic switchable 2WD/4WD, high ground clearance (270mm), limited-slip differential, and deep-tread off-road tires for agricultural and muddy worksites.",
    "description_lo": "ລົດຍົກຂັບເຄື່ອນ 4 ລໍ້ 4WD ມາດຕະຖານລຸຍທາງວິບາກ HELI G3 ສາມາດປັບປ່ຽນ 2WD/4WD ດ້ວຍປຸ່ມໄຟຟ້າ ທ້ອງລົດສູງ 270 ມມ ລຸຍດິນຕົມ, ສວນຢາງພາລາ, ໄຮ່ອ້ອຍ, ໄຊທ໌ກໍ່ສ້າງບໍ່ມີຖະໜົນຄອນກີດ.",
    "image_url": "/images/forklifts/heli_rough_terrain_4wd.jpg",
    "gallery_images": [
      "/images/forklifts/fl_heli_front.jpg",
      "/images/forklifts/fl_view_rear_heli.jpg",
      "/images/forklifts/fl_heli_left.jpg",
      "/images/forklifts/fl_heli_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_heli_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_heli_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 3,
    "unit_price": 485000,
    "currency": "THB",
    "specs": {
      "Model": "CPCD35-RT4 (4WD Rough Terrain)",
      "Rated Capacity": "3,500 kg (3.5 Tons)",
      "Drive System": "Switchable 2WD / 4WD with Limited Slip Diff",
      "Ground Clearance": "270 mm (High Clearance)",
      "Tires": "Large Deep-Tread Off-Road Agricultural Tires",
      "Engine": "High-Torque Heavy Duty Industrial Diesel"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "heli-cpd18-g2",
    "sku_code": "HELI-CPD18-G2",
    "barcode": "885400000008",
    "part_name": "HELI G2 Series 1.8 Tons 3-Wheel Electric Forklift (CPD18-G2)",
    "part_name_lo": "ລົດຍົກໄຟຟ້າ 3 ລໍ້ HELI G2 Series 1.8 ໂຕນ (CPD18-G2) - ວົງລ້ຽວແຄບ ຫມູນ 360° ສາງອາຫານ",
    "category": "Forklifts",
    "description": "High-agility 3-wheel electric counterbalance forklift with 48V dual AC front drive motors. Ultra-tight turning radius for stuffing/unstuffing 20ft/40ft containers and narrow warehouse aisles.",
    "description_lo": "ລົດຍົກໄຟຟ້າ 3 ລໍ້ 1.8 ໂຕນ HELI G2 Series ວົງລ້ຽວແຄບພິເສດ ຫມູນກັບຕົວ 360° ໃນຕູ້ຄອນເທນເນີ ມໍເຕີ AC ຄູ່ 48V ບໍ່ມີສຽງດັງ ບໍ່ມີຄວັນພິດ ມາດຕະຖານສາງອາຫານ ແລະ ຢາ.",
    "image_url": "/images/forklifts/heli_h3_red.jpg",
    "gallery_images": [
      "/images/forklifts/fl_heli_front.jpg",
      "/images/forklifts/fl_view_rear_heli.jpg",
      "/images/forklifts/fl_heli_left.jpg",
      "/images/forklifts/fl_heli_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_heli_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_heli_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 6,
    "unit_price": 290000,
    "currency": "THB",
    "specs": {
      "Model": "CPD18-G2 (3-Wheel Electric)",
      "Rated Capacity": "1,800 kg (1.8 Tons)",
      "Voltage": "48V AC Dual Drive Motor System",
      "Turning Radius": "1,550 mm Tight Radius",
      "Braking": "Magnetic Regenerative Braking",
      "Display": "Color LCD Screen with Diagnostics"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "heli-cpd25-g2-li",
    "sku_code": "HELI-CPD25-G2-LI",
    "barcode": "885400000009",
    "part_name": "HELI G2 Series 2.5 Tons CATL Lithium-ion Electric Forklift (CPD25-G2-Li)",
    "part_name_lo": "ລົດຍົກໄຟຟ້າແບັດເຕີຣີລິດທຽມ HELI G2 2.5 ໂຕນ (CPD25-G2-Li) - ແບັດ CATL ສາກໄວ 2 ຊົ່ວໂມງ ກັນນ້ຳ IPX4",
    "category": "Forklifts",
    "description": "Zero-emission 2.5-ton electric forklift powered by premium CATL 80V Lithium Iron Phosphate (LiFePO4) battery. 2-hour full fast charge, 8-hour continuous runtime, zero maintenance, IPX4 outdoor rainproof.",
    "description_lo": "ລົດຍົກໄຟຟ້າລິດທຽມ 2.5 ໂຕນ HELI G2 ແບັດເຕີຣີ CATL 80V ລະດັບໂລກ ສາກໄວເຕັມພາຍໃນ 2 ຊົ່ວໂມງ ໃຊ້ໄດ້ 8 ຊົ່ວໂມງຕໍ່ເນື່ອງ ບໍ່ຕ້ອງເຕີມນ້ຳກັ່ນ ມາດຕະຖານກັນນ້ຳ IPX4 ຂັບຕາກຝົນໄດ້.",
    "image_url": "/images/forklifts/heli_h3_red.jpg",
    "gallery_images": [
      "/images/forklifts/fl_heli_front.jpg",
      "/images/forklifts/fl_view_rear_heli.jpg",
      "/images/forklifts/fl_heli_left.jpg",
      "/images/forklifts/fl_heli_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_heli_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_heli_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 5,
    "unit_price": 365000,
    "currency": "THB",
    "specs": {
      "Model": "CPD25-G2-Li (Lithium Series)",
      "Rated Capacity": "2,500 kg (2.5 Tons)",
      "Battery": "80V / 202Ah CATL Lithium Iron Phosphate (LiFePO4)",
      "Charging Time": "1.5 - 2 Hours Fast Charge (Opportunity Charging)",
      "Waterproof Rating": "IPX4 Certified Rainproof",
      "Warranty on Battery": "5 Years / 10,000 Hours Battery Warranty"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "heli-cpd30-g2-li",
    "sku_code": "HELI-CPD30-G2-LI",
    "barcode": "885400000010",
    "part_name": "HELI G2 Series 3.0 Tons CATL Lithium-ion Electric Forklift (CPD30-G2-Li)",
    "part_name_lo": "ລົດຍົກໄຟຟ້າແບັດເຕີຣີລິດທຽມ HELI G2 3.0 ໂຕນ (CPD30-G2-Li) - ຍົກໜັກ 3 ໂຕນ ປະຢັດຄ່າໄຟ 70%",
    "category": "Forklifts",
    "description": "Heavy duty 3000 kg electric counterbalance forklift with high-voltage CATL lithium-ion technology. Replaces 3.0T diesel trucks with 70% lower operating and fuel costs, cold storage ready to -30°C.",
    "description_lo": "ລົດຍົກໄຟຟ້າລິດທຽມ 3.0 ໂຕນ HELI G2 ພະລັງຍົກໜັກທຽບເທົ່າລົດຍົກນ້ຳມັນ ແຕ່ຫຼຸດຕົ້ນທຶນພະລັງງານກວ່າ 70% ບໍ່ມີມົນລະພິດ ສາມາດໃຊ້ງານໃນຫ້ອງເຢັນຕິດລົບ -30°C ໄດ້ສະບາຍ.",
    "image_url": "/images/forklifts/heli_h3_red.jpg",
    "gallery_images": [
      "/images/forklifts/fl_heli_front.jpg",
      "/images/forklifts/fl_view_rear_heli.jpg",
      "/images/forklifts/fl_heli_left.jpg",
      "/images/forklifts/fl_heli_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_heli_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_heli_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 4,
    "unit_price": 430000,
    "currency": "THB",
    "specs": {
      "Model": "CPD30-G2-Li (Heavy Lithium)",
      "Rated Capacity": "3,000 kg (3.0 Tons)",
      "Battery": "80V / 271Ah High-Capacity CATL Lithium Battery",
      "Lift Height": "3,000 mm - 6,000 mm Full Free Triplex Mast",
      "Cold Storage": "Available Cold Storage Protection Package (-30°C)",
      "Drive System": "Dual AC Drive Motors with Auto Curve Deceleration"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "heli-cqd16-g2",
    "sku_code": "HELI-CQD16-G2",
    "barcode": "885400000011",
    "part_name": "HELI G2 Series 1.6 Tons High-Bay Reach Truck (CQD16-G2) Lift 12.5m",
    "part_name_lo": "ລົດຍົກສູງ Reach Truck HELI G2 Series 1.6 ໂຕນ (CQD16-G2) - ຍົກສູງ 12.5 ແມັດ ພ້ອມກ້ອງປາຍງາ",
    "category": "Forklifts",
    "description": "High-bay warehouse reach truck engineered for narrow aisle racking up to 12.5 meters. Electronic power steering (EPS), height pre-selection system, fork-tip camera with HD color monitor.",
    "description_lo": "ລົດຍົກສູງ Reach Truck HELI G2 1.6 ໂຕນ ຍົກສູງເຖິງ 12.5 ແມັດ ສຳລັບສາງສິນຄ້າ High-Bay Racking ພວງມາໄລໄຟຟ້າ EPS ນຸ່ມນວນ ລະບົບກ້ອງ ແລະ ຈໍສີປາຍງາ ວາງພາເລດຊັ້ນສູງໄດ້ຢ່າງແມ່ນຍຳ.",
    "image_url": "/images/forklifts/toyota_8fbre_reachtruck.jpg",
    "gallery_images": [
      "/images/forklifts/fl_heli_front.jpg",
      "/images/forklifts/fl_view_rear_heli.jpg",
      "/images/forklifts/fl_heli_left.jpg",
      "/images/forklifts/fl_heli_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_heli_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_heli_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 3,
    "unit_price": 420000,
    "currency": "THB",
    "specs": {
      "Model": "CQD16-G2 (Reach Truck Series)",
      "Rated Capacity": "1,600 kg (1.6 Tons)",
      "Max Lift Height": "Up to 12,500 mm (12.5 Meters)",
      "Steering": "180° / 360° Electronic Power Steering (EPS)",
      "Camera System": "Wireless Fork Camera with High-Res Display",
      "Safety": "Automatic Mast Soft Stop at Height Limit"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "heli-cbd20j-li",
    "sku_code": "HELI-CBD20J-LI",
    "barcode": "885400000012",
    "part_name": "HELI Smart Lion 2.0 Tons Lithium Electric Pallet Truck (CBD20J-Li3)",
    "part_name_lo": "ລົດລາກພາເລດໄຟຟ້າລິດທຽມ HELI Smart Lion 2.0 ໂຕນ (CBD20J-Li3) - ແບັດລິດທຽມຖອດປ່ຽນ 10 ວິນາທີ",
    "category": "Forklifts",
    "description": "The renowned HELI Smart Lion 2000 kg electric walkie pallet truck. Modular plug-and-play 48V lithium battery swappable in 10 seconds, upright handle drive mode, integrated digital battery gauge.",
    "description_lo": "ລົດລາກພາເລດໄຟຟ້າລິດທຽມ HELI Smart Lion ຂະໜາດ 2.0 ໂຕນ ຍອດຂາຍອັນດັບ 1 ແບັດເຕີຣີລິດທຽມ 48V ສາມາດຖອດປ່ຽນໄດ້ພາຍໃນ 10 ວິນາທີ ຂັບເຄື່ອນດ້ວຍຄັນບັງຄັບກົງໃນຕູ້ຄອນເທນເນີໄດ້.",
    "image_url": "/images/jenstore-products/full_lithium_ion_powered_pallet_truck_1_5_tons_fork_115_1.jpg",
    "gallery_images": [
      "/images/forklifts/fl_heli_front.jpg",
      "/images/forklifts/fl_view_rear_heli.jpg",
      "/images/forklifts/fl_heli_left.jpg",
      "/images/forklifts/fl_heli_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_heli_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_heli_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 12,
    "unit_price": 64000,
    "currency": "THB",
    "specs": {
      "Model": "CBD20J-Li3 (Smart Lion Series)",
      "Rated Capacity": "2,000 kg (2.0 Tons)",
      "Battery System": "48V Quick-Swap Lithium-ion (10s swap)",
      "Chassis & Forks": "685 x 1,150 mm Reinforced Box Rail Steel",
      "Operation": "Creep Speed Upright Handle Drive Mode",
      "Weight": "Ultra-lightweight 150 kg (Easy truck tail-lift loading)"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "nfk-sc100",
    "sku_code": "NFK-SC100",
    "barcode": "571549220001",
    "part_name": "Nilfisk SC100 Compact Upright Commercial Scrubber Dryer (310mm)",
    "part_name_lo": "ເຄື່ອງຂັດ-ດູດລ້າງພື້ນອັດຕະໂນມັດແບບຕັ້ງ Nilfisk SC100 (310 ມມ) - ຂັດ ແລະ ດູດແຫ້ງໃນຮອບດຽວ",
    "category": "Cleaning",
    "description": "Compact upright commercial scrubber dryer engineered for fast, hygienic floor care in small shops, cafes, and healthcare clinics. Cleans and dries in a single pass with dual squeegees.",
    "description_lo": "ເຄື່ອງຂັດ-ດູດລ້າງພື້ນຂະໜາດກະທັດຮັດແບບຕັ້ງ Nilfisk SC100 ມາດຕະຖານເດນມາກ. ຂັດ ແລະ ດູດພື້ນແຫ້ງສະໜິດທັນທີໃນຮອບດຽວ ບໍ່ມີນ້ຳຂັງ ປ້ອງກັນລື່ນລົ້ມ ເໝາະກັບຮ້ານອາຫານ, ຄລີນິກ, ແລະ ຮ້ານກາເຟ.",
    "image_url": "/images/catalog/real/commercial_floor_scrubber.jpg",
    "qty_on_hand": 6,
    "unit_price": 32000000,
    "currency": "LAK",
    "specs": {
      "Model": "SC100 Full Package (Nilfisk Denmark)",
      "Scrubbing Width": "310 mm (Cylindrical Brush)",
      "Tank Capacity": "3 Liters (Clean) / 4 Liters (Recovery)",
      "Theoretical Productivity": "620 m²/hour",
      "Squeegee Width": "310 mm Dual Front & Rear Squeegees",
      "Cable Length": "10 Meters Detachable Cord"
    },
    "lead_time": "In Stock (Vientiane Dispatch 24h)",
    "bulk_pricing": [
      { "min_qty": 2, "price": 30400000 }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "nfk-sc401",
    "sku_code": "NFK-SC401",
    "barcode": "571549220002",
    "part_name": "Nilfisk SC401 B Walk-Behind Battery Scrubber Dryer (430mm / 30L)",
    "part_name_lo": "ເຄື່ອງຂັດ-ດູດລ້າງພື້ນໃຊ້ແບັດເຕີຣີ Nilfisk SC401 B (430 ມມ / 30L) - ສຽງງຽບພຽງ 60 dB(A)",
    "category": "Cleaning",
    "description": "Compact battery-powered walk-behind scrubber dryer. Features 430mm disc deck, 30L solution tank, OneTouch control button, and whisper-quiet 60 dB(A) daytime cleaning mode.",
    "description_lo": "ເຄື່ອງຂັດ-ດູດພື້ນໃຊ້ແບັດເຕີຣີ Nilfisk SC401 B ຄວາມກວ້າງຂັດ 430 ມມ ຖັງນ້ຳ 30 ລິດ ລະບົບປຸ່ມກົດ OneTouch ຄວບຄຸມງ່າຍ ສຽງງຽບພຽງ 60 dB(A) ທຳຄວາມສະອາດກາງເວັນໄດ້ສະດວກໃນໂຮງໝໍ, ໂຮງຮຽນ ແລະ ໂຮງແຮມ.",
    "image_url": "/images/catalog/real/commercial_floor_scrubber.jpg",
    "qty_on_hand": 4,
    "unit_price": 88000000,
    "currency": "LAK",
    "specs": {
      "Model": "SC401 B (Walk-Behind Battery)",
      "Scrubbing Width": "430 mm (17-inch Disc Deck)",
      "Tank Capacity": "30 Liters (Clean) / 30 Liters (Recovery)",
      "Productivity Rate": "1,720 m²/hour",
      "Sound Level": "60 ±3 dB(A) Silent Mode",
      "Battery System": "24V Maintenance-Free AGM with On-board Charger"
    },
    "lead_time": "In Stock (Vientiane Dispatch 24h)",
    "bulk_pricing": [
      { "min_qty": 2, "price": 83600000 }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "nfk-sc500",
    "sku_code": "NFK-SC500",
    "barcode": "571549220003",
    "part_name": "Nilfisk SC500 SmartFlow Premium Walk-Behind Scrubber Dryer (530mm / 45L)",
    "part_name_lo": "ເຄື່ອງຂັດ-ດູດລ້າງພື້ນ Nilfisk SC500 SmartFlow (530 ມມ / 45L) - ລະບົບ Ecoflex ປະຢັດນ້ຳຢາ",
    "category": "Cleaning",
    "description": "High-efficiency walk-behind scrubber dryer equipped with SmartFlow automatic water volume adjustment proportional to travel speed, Ecoflex detergent dosing system, and ergonomic traction drive.",
    "description_lo": "ເຄື່ອງຂັດ-ດູດລ້າງພື້ນລະດັບພຣີມຽມ Nilfisk SC500 ລະບົບ SmartFlow ປັບການໄຫຼຂອງນ້ຳອັດຕະໂນມັດຕາມຄວາມໄວການຍ່າງ ລະບົບ Ecoflex ປະຢັດນ້ຳຢາທຳຄວາມສະອາດໄດ້ເຖິງ 50% ຂັບເຄື່ອນດ້ວຍມໍເຕີ Traction Motor.",
    "image_url": "/images/catalog/real/commercial_floor_scrubber.jpg",
    "qty_on_hand": 3,
    "unit_price": 145000000,
    "currency": "LAK",
    "specs": {
      "Model": "SC500 53 B SmartFlow (Nilfisk)",
      "Scrubbing Width": "530 mm (21-inch Disc)",
      "Tank Capacity": "45 Liters (Clean) / 45 Liters (Recovery)",
      "Theoretical Productivity": "2,650 m²/hour",
      "Technology": "SmartFlow + Ecoflex Chemical Mixing System",
      "Drive": "Electric Wheel Traction Drive Forward & Reverse"
    },
    "lead_time": "In Stock (3-5 Days Delivery)",
    "bulk_pricing": [
      { "min_qty": 2, "price": 137750000 }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "nfk-sc2000",
    "sku_code": "NFK-SC2000",
    "barcode": "571549220004",
    "part_name": "Nilfisk SC2000 Micro Ride-On Scrubber Dryer (530mm / 70L / 6 km/h)",
    "part_name_lo": "ເຄື່ອງຂັດ-ດູດລ້າງພື້ນແບບນັ່ງຂັບ Nilfisk SC2000 (530 ມມ / 70L) - ນັ່ງຂັບຄ່ອງຕົວ ຂັບຜ່ານປະຕູໄດ້",
    "category": "Cleaning",
    "description": "Micro ride-on scrubber dryer doubling the productivity of walk-behind units. Navigates standard doorways and tight corridors with 6 km/h travel speed, 70L capacity, and automatic squeegee lift in reverse.",
    "description_lo": "ເຄື່ອງຂັດ-ດູດລ້າງພື້ນແບບນັ່ງຂັບຂະໜາດກະທັດຮັດ Nilfisk SC2000 ເຮັດວຽກໄວກວ່າແບບຍ່າງຕາມ 2 ເທົ່າ ຂັບລອດປະຕູຫ້ອງ ແລະ ທາງຍ່າງແຄບໄດ້ສະດວກ ຄວາມໄວ 6 ກມ/ຊມ ຍົກຢາງດູດຂຶ້ນອັດຕະໂນມັດເມື່ອຖອຍຫຼັງ.",
    "image_url": "/images/catalog/real/commercial_floor_scrubber.jpg",
    "qty_on_hand": 2,
    "unit_price": 265000000,
    "currency": "LAK",
    "specs": {
      "Model": "SC2000 53 B (Micro Ride-On)",
      "Scrubbing Width": "530 mm (21-inch Disc)",
      "Solution / Recovery Tank": "70 Liters / 70 Liters",
      "Max Working Speed": "6.0 km/hour",
      "Productivity Rate": "3,180 m²/hour",
      "Safety Features": "Emergency Stop, Speed Reduction on Turns, SmartKey"
    },
    "lead_time": "In Stock (Vientiane Dispatch 48h)",
    "bulk_pricing": [
      { "min_qty": 2, "price": 251750000 }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "nfk-sc6000",
    "sku_code": "NFK-SC6000",
    "barcode": "571549220005",
    "part_name": "Nilfisk SC6000 Heavy Duty Industrial Ride-On Scrubber Dryer (860mm / 190L)",
    "part_name_lo": "ເຄື່ອງຂັດ-ດູດລ້າງພື້ນໂຮງງານອຸດສາຫະກຳແບບນັ່ງຂັບ Nilfisk SC6000 (860 ມມ / 190L) - ງານໜັກສາງສິນຄ້າ",
    "category": "Cleaning",
    "description": "Heavy industrial ride-on scrubber dryer for vast logistics centers, production plants, and airports. Dual 860mm disc deck, 190L solution tank, heavy cast steel bumper, and 9 km/h speed.",
    "description_lo": "ເຄື່ອງຂັດ-ດູດລ້າງພື້ນຂະໜາດໃຫຍ່ແບບນັ່ງຂັບ Nilfisk SC6000 ສຳລັບສາງສິນຄ້າ, ໂຮງງານຜະລິດ ແລະ ສະໜາມບິນ. ແປງຂັດຄູ່ 860 ມມ ຖັງບັນຈຸນ້ຳ 190 ລິດ ກັນຊົນເຫຼັກກ້າກັນກະແທກ ຮອງຮັບພື້ນທີ່ຂະໜາດໃຫຍ່ກວ່າ 10,000 ຕາແມັດ.",
    "image_url": "/images/catalog/real/commercial_floor_scrubber.jpg",
    "qty_on_hand": 2,
    "unit_price": 580000000,
    "currency": "LAK",
    "specs": {
      "Model": "SC6000 860D (Heavy Industrial Ride-On)",
      "Scrubbing Path": "860 mm (Dual 430mm Discs)",
      "Tank Capacity": "190 Liters (Clean) / 190 Liters (Recovery)",
      "Productivity Rate": "9,450 m²/hour",
      "Brush Pressure": "Up to 135 kg Heavy Scrubbing Force",
      "Construction": "Heavy Duty Steel Frame with Roll-Over Protection"
    },
    "lead_time": "Order on Demand (7-14 Days Delivery)",
    "bulk_pricing": [
      { "min_qty": 2, "price": 551000000 }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "nfk-sw250",
    "sku_code": "NFK-SW250",
    "barcode": "571549220006",
    "part_name": "Nilfisk SW250 Manual Walk-Behind Sweeper (920mm / 38L)",
    "part_name_lo": "ເຄື່ອງກວາດພື້ນດູດຝຸ່ນແບບຍູ້ດ້ວຍມື Nilfisk SW250 (920 ມມ / 38L) - ໄວກວ່າຟອຍກວາດ 6 ເທົ່າ",
    "category": "Cleaning",
    "description": "High-speed manual walk-behind sweeper 6x faster than a traditional broom. Dual rotating side brushes, gear-driven main roller broom, 38L waste hopper, and zero emissions.",
    "description_lo": "ເຄື່ອງກວາດພື້ນແບບຍູ້ດ້ວຍມື Nilfisk SW250 ປະສິດທິພາບສູງ ກວາດໄວກວ່າຟອຍທຳມະດາ 6 ເທົ່າ ແປງກວາດຂ້າງຄູ່ 920 ມມ ຖັງເກັບຂີ້ເຫຍື້ອ 38 ລິດ ກວາດຝຸ່ນ, ໃບໄມ້, ຂີ້ຊາຍ ບໍ່ໃຊ້ໄຟຟ້າ ບໍ່ມີມົນລະພິດ.",
    "image_url": "/images/catalog/real/commercial_floor_scrubber.jpg",
    "qty_on_hand": 10,
    "unit_price": 14500000,
    "currency": "LAK",
    "specs": {
      "Model": "SW250 (Manual Push Sweeper)",
      "Sweeping Width": "920 mm (with 2 Side Brooms)",
      "Hopper Volume": "38 Liters Waste Container",
      "Productivity Rate": "3,680 m²/hour",
      "Drive System": "Gear Driven by Both Main Wheels",
      "Weight": "Ultra-light 20 kg with Foldable Handle"
    },
    "lead_time": "In Stock (Vientiane Dispatch 24h)",
    "bulk_pricing": [
      { "min_qty": 2, "price": 13775000 },
      { "min_qty": 5, "price": 13050000 }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "nfk-sw750",
    "sku_code": "NFK-SW750",
    "barcode": "571549220007",
    "part_name": "Nilfisk SW750 Battery Powered Walk-Behind Sweeper with Vacuum & Filter",
    "part_name_lo": "ເຄື່ອງກວາດດູດຝຸ່ນພື້ນໃຊ້ແບັດເຕີຣີ Nilfisk SW750 - ພ້ອມພັດລົມດູດ ແລະ ໄສ້ຕອງກອງຝຸ່ນ Polyester",
    "category": "Cleaning",
    "description": "Quiet battery walk-behind sweeper combining sweeping and active dust vacuuming. Equipped with washable polyester panel filter, mechanical filter shaker, and built-in onboard charger.",
    "description_lo": "ເຄື່ອງກວາດພື້ນໃຊ້ແບັດເຕີຣີ Nilfisk SW750 ມາພ້ອມລະບົບດູດຝຸ່ນ ແລະ ໄສ້ຕອງກອງຝຸ່ນ Polyester ຊັກລ້າງໄດ້ ລະບົບເຄາະຝຸ່ນໃນຕົວ ສຽງງຽບພຽງ 59 dB(A) ໝໍ້ສາກໃນຕົວ ສຽບໄຟບ້ານ 220V ໄດ້ທັນທີ.",
    "image_url": "/images/catalog/real/commercial_floor_scrubber.jpg",
    "qty_on_hand": 4,
    "unit_price": 58000000,
    "currency": "LAK",
    "specs": {
      "Model": "SW750 Battery (Nilfisk)",
      "Sweeping Path": "720 mm (Main Broom + Side Broom)",
      "Hopper Volume": "60 Liters Waste Capacity",
      "Productivity Rate": "2,880 m²/hour",
      "Filtration": "Washable Polyester Panel Filter (Dust-Free)",
      "Noise Level": "59 dB(A) Super Quiet Operation"
    },
    "lead_time": "In Stock (Vientiane Dispatch 24h)",
    "bulk_pricing": [
      { "min_qty": 2, "price": 55100000 }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "nfk-sr1000s",
    "sku_code": "NFK-SR1000S",
    "barcode": "571549220008",
    "part_name": "Nilfisk SR1000S Compact Ride-On Industrial Sweeper (1000mm / 50L)",
    "part_name_lo": "ເຄື່ອງກວາດດູດຝຸ່ນພື້ນແບບນັ່ງຂັບ Nilfisk SR1000S (1,000 ມມ / 50L) - ວົງລ້ຽວແຄບ ຂຶ້ນທາງຊັນ 20%",
    "category": "Cleaning",
    "description": "High-efficiency compact ride-on sweeper designed for warehouses, loading bays, and multi-story parking. Turns within 155cm radius, climbs 20% ramps, and features electric filter shaker.",
    "description_lo": "ເຄື່ອງກວາດດູດຝຸ່ນແບບນັ່ງຂັບ Nilfisk SR1000S ສຳລັບສາງສິນຄ້າ, ໂຮງງານ ແລະ ລານຈອດລົດ. ວົງລ້ຽວແຄບສຸດໆພຽງ 155 ຊມ ຂັບຂຶ້ນທາງລາດຊັນໄດ້ເຖິງ 20% ລະບົບເຄາະໄສ້ຕອງໄຟຟ້າ ກວາດສະອາດບໍ່ມີຝຸ່ນຟຸ້ງ.",
    "image_url": "/images/catalog/real/commercial_floor_scrubber.jpg",
    "qty_on_hand": 2,
    "unit_price": 245000000,
    "currency": "LAK",
    "specs": {
      "Model": "SR1000S B (Compact Ride-On Sweeper)",
      "Sweeping Width": "1,000 mm (with 2 Side Brooms)",
      "Hopper Capacity": "50 Liters with Roll-Out Wheels",
      "Max Speed": "5.5 km/hour (Productivity 5,500 m²/h)",
      "Gradeability": "20% Ramp Climbing Ability",
      "Filter System": "3 m² Panel Filter with Electric Shaker Motor"
    },
    "lead_time": "In Stock (3-5 Days Delivery)",
    "bulk_pricing": [
      { "min_qty": 2, "price": 232750000 }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "nfk-vp300-hepa",
    "sku_code": "NFK-VP300-HEPA",
    "barcode": "571549220009",
    "part_name": "Nilfisk VP300 HEPA Commercial Dry Vacuum Cleaner (800W / 10L)",
    "part_name_lo": "ເຄື່ອງດູດຝຸ່ນແຫ້ງ Nilfisk VP300 HEPA (800W / 10L) - ໄສ້ຕອງ H13 HEPA ດັກຝຸ່ນ 99.95%",
    "category": "Cleaning",
    "description": "Durable and lightweight commercial dry vacuum cleaner equipped with certified H13 HEPA filter capturing 99.95% of fine particles. Ideal for hotels, schools, offices, and allergy-sensitive zones.",
    "description_lo": "ເຄື່ອງດູດຝຸ່ນແຫ້ງມາດຕະຖານສາກົນ Nilfisk VP300 HEPA ໄສ້ຕອງ H13 HEPA ມາດຕະຖານໂຮງໝໍ ດັກຈັບຝຸ່ນລະອຽດ, ເຊື້ອລາ ແລະ ໄຣຝຸ່ນ 99.95% ນ້ຳໜັກເບົາພຽງ 5.3 kg ສຽງງຽບ 69 dB(A) ທົນທານໃຊ້ງານໄດ້ທັງວັນ.",
    "image_url": "/images/catalog/real/industrial_vacuum_cleaner_1787993454700.jpg",
    "qty_on_hand": 15,
    "unit_price": 8500000,
    "currency": "LAK",
    "specs": {
      "Model": "VP300 HEPA Nordic Edition (Nilfisk)",
      "Rated Power": "800W High Efficiency Fan Motor",
      "Dust Bag Capacity": "10 Liters (Tear-Resistant Fleece)",
      "Filtration": "Certified H13 HEPA Exhaust Filter (99.95% @ 0.3 micron)",
      "Sound Pressure": "69 dB(A) Low Noise",
      "Weight & Cord": "5.3 kg Lightweight with 10m High-Vis Orange Cable"
    },
    "lead_time": "In Stock (Vientiane Dispatch 24h)",
    "bulk_pricing": [
      { "min_qty": 3, "price": 8075000 },
      { "min_qty": 10, "price": 7650000 }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "nfk-attix-33",
    "sku_code": "NFK-ATTIX-33",
    "barcode": "571549220010",
    "part_name": "Nilfisk ATTIX 33-21 IC Heavy Industrial Dust Extractor (InfiniClean / 30L)",
    "part_name_lo": "ເຄື່ອງດູດຝຸ່ນອຸດສາຫະກຳ Nilfisk ATTIX 33-21 IC - ລະບົບ InfiniClean ເຄາະໄສ້ຕອງອັດຕະໂນມັດ",
    "category": "Cleaning",
    "description": "Heavy duty industrial dust extractor featuring InfiniClean automatic filter cleaning every 15 seconds without suction loss. PTFE washable non-stick filter and auto-start socket for power tools.",
    "description_lo": "ເຄື່ອງດູດຝຸ່ນອຸດສາຫະກຳລະດັບສູງ Nilfisk ATTIX 33-21 IC ລະບົບ InfiniClean ເຄາະໄສ້ຕອງອັດຕະໂນມັດທຸກ 15 ວິນາທີ ແຮງດູດບໍ່ຕົກ ໄສ້ຕອງ PTFE ເຄືອບສານກັນຕິດ ຊ່ອງສຽບໄຟ Auto-Start ຕໍ່ເຄື່ອງຕັດ, ເຄື່ອງຂັດໄມ້ ດູດຝຸ່ນທັນທີເມື່ອເປີດເຄື່ອງມື.",
    "image_url": "/images/catalog/real/industrial_vacuum_cleaner_1787993454700.jpg",
    "qty_on_hand": 5,
    "unit_price": 36000000,
    "currency": "LAK",
    "specs": {
      "Model": "ATTIX 33-21 IC (InfiniClean)",
      "Max Power": "1,400W Industrial Turbine",
      "Vacuum Suction": "250 mbar (25 kPa) High Vacuum",
      "Airflow Rate": "4,500 Liters/min",
      "Container Volume": "30 Liters Corrosion-Proof Container",
      "Tool Auto-Start": "Automatic Start/Stop Socket for Power Tools (Max 2400W)"
    },
    "lead_time": "In Stock (Vientiane Dispatch 24h)",
    "bulk_pricing": [
      { "min_qty": 2, "price": 34200000 }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "nfk-vl500-75",
    "sku_code": "NFK-VL500-75",
    "barcode": "571549220011",
    "part_name": "Nilfisk VL500-75 Dual-Motor Industrial Wet & Dry Vacuum Cleaner (75L)",
    "part_name_lo": "ເຄື່ອງດູດຝຸ່ນ & ດູດນ້ຳອຸດສາຫະກຳ 2 ມໍເຕີ Nilfisk VL500-75 (75L) - ລະບົບ DualFilter ດູດພ້ອມກັນ",
    "category": "Cleaning",
    "description": "Heavy duty dual-motor wet and dry vacuum cleaner with 75L capacity. DualFilter system allows simultaneous vacuuming of wet and dry substances without filter change. Tip-out chassis and drain hose.",
    "description_lo": "ເຄື່ອງດູດຝຸ່ນ ແລະ ດູດນ້ຳອຸດສາຫະກຳພະລັງສູງ 2 ມໍເຕີ Nilfisk VL500-75 ຄວາມຈຸໃຫຍ່ 75 ລິດ ລະບົບ DualFilter ດູດທັງຝຸ່ນ ແລະ ນ້ຳໄດ້ພ້ອມກັນ ໂຄງລໍ້ Tip-Out ເທນ້ຳຖິ້ມສະດວກ ພ້ອມທໍ່ລະບາຍນ້ຳຖິ້ມໃນຕົວ.",
    "image_url": "/images/catalog/real/industrial_vacuum_cleaner_1787993454700.jpg",
    "qty_on_hand": 4,
    "unit_price": 48000000,
    "currency": "LAK",
    "specs": {
      "Model": "VL500-75 2 EDF (Dual Motor Wet/Dry)",
      "Rated Power": "2,500W (Dual Independent 1,250W Bypass Motors)",
      "Container Volume": "75 Liters Impact-Resistant Container",
      "Vacuum Suction": "210 mbar Vacuum Pressure",
      "Airflow Rate": "4,320 Liters/min",
      "Chassis": "Ergonomic Tip-Out Emptying Chassis with Front Casters"
    },
    "lead_time": "In Stock (Vientiane Dispatch 24h)",
    "bulk_pricing": [
      { "min_qty": 2, "price": 45600000 }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "nfk-mc-5m",
    "sku_code": "NFK-MC-5M",
    "barcode": "571549220012",
    "part_name": "Nilfisk MC 5M-200/1050 Heavy Commercial High-Pressure Washer (200 Bar / Brass Head)",
    "part_name_lo": "ເຄື່ອງສີດນ້ຳແຮງດັນສູງອຸດສາຫະກຳ Nilfisk MC 5M-200/1050 (200 Bar / ຫົວປັ໊ມທອງເຫຼືອງ)",
    "category": "Cleaning",
    "description": "Heavy duty commercial cold water high-pressure washer. Delivers 200 bar (2900 PSI) and 1050 L/h flow rate with brass cylinder head, 3 full ceramic pistons, and NA5 heavy industrial motor-pump unit.",
    "description_lo": "ເຄື່ອງສີດນ້ຳແຮງດັນສູງລະດັບອຸດສາຫະກຳ Nilfisk MC 5M ແຮງດັນສູງ 200 bar ອັດຕາການໄຫຼ 1,050 ລິດ/ຊົ່ວໂມງ ຫົວປັ໊ມທອງເຫຼືອງແທ້ ລູກສູບເຊຣາມິກ 3 ລູກ ມໍເຕີ 1450 RPM ຮອບຕ່ຳ ທົນທານງານໜັກລ້າງລົດບັນທຸກ, ໂຮງງານ ແລະ ໄຊທ໌ກໍ່ສ້າງ.",
    "image_url": "/images/catalog/real/high_pressure_washer_150bar.jpg",
    "qty_on_hand": 3,
    "unit_price": 62000000,
    "currency": "LAK",
    "specs": {
      "Model": "MC 5M-200/1050 XT (Nilfisk)",
      "Pump Pressure": "200 Bar (2,900 PSI)",
      "Water Flow Rate": "1,050 Liters/hour (17.5 L/min)",
      "Pump Head & Pistons": "Solid Brass Cylinder Head + 3 Full Ceramic Pistons",
      "Motor Speed": "1,450 RPM Low-Speed Industrial Motor (400V 3-Phase)",
      "Hose & Reel": "15 Meters Steel-Reinforced High Pressure Hose on Reel"
    },
    "lead_time": "In Stock (3-5 Days Delivery)",
    "bulk_pricing": [
      { "min_qty": 2, "price": 58900000 }
    ],
    "warranty_months": 12
  },
  {
    "sku_id": "jgh-efg216k",
    "sku_code": "JGH-EFG216K",
    "barcode": "404592100001",
    "part_name": "Jungheinrich EFG 216k 3-Wheel Electric Counterbalance Forklift (1.6T) PureEnergy",
    "part_name_lo": "ລົດຍົກໄຟຟ້າ 3 ລໍ້ Jungheinrich EFG 216k ຂະໜາດ 1.6 ໂຕນ (ເຢຍລະມັນ) - ລະບົບ PureEnergy ວົງລ້ຽວແຄບພິເສດ",
    "category": "Forklifts",
    "description": "German-engineered Jungheinrich EFG 216k 3-wheel electric counterbalance forklift (1600 kg). Features PureEnergy technology with dual AC drive motors, synchronous reluctance technology, compact chassis for ultra-narrow aisles, and automatic curveCONTROL.",
    "description_lo": "ລົດຍົກໄຟຟ້າ 3 ລໍ້ລະດັບພຣີມຽມ Jungheinrich EFG 216k ຂະໜາດ 1.6 ໂຕນ ເທັກໂນໂລຢີ PureEnergy ຈາກເຢຍລະມັນ. ມໍເຕີຄູ່ AC ຂັບເຄື່ອນລໍ້ໜ້າ ວົງລ້ຽວແຄບ 360 ອົງສາ ລະບົບ curveCONTROL ຫຼຸດຄວາມໄວອັດຕະໂນມັດຂະນະເຂົ້າໂຄ້ງ ປອດໄພສູງສຸດໃນສາງສິນຄ້າແຄບ.",
    "image_url": "/images/forklifts/jungheinrich_efg_yellow.jpg",
    "gallery_images": [
      "/images/forklifts/fl_jungheinrich_front.jpg",
      "/images/forklifts/fl_view_rear_jungheinrich.jpg",
      "/images/forklifts/fl_jungheinrich_left.jpg",
      "/images/forklifts/fl_jungheinrich_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_jungheinrich_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_jungheinrich_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 6,
    "unit_price": 390000,
    "currency": "THB",
    "specs": {
      "Model": "EFG 216k (Series 2 PureEnergy)",
      "Rated Capacity": "1,600 kg (1.6 Tons)",
      "Voltage / Battery": "48V / 500-625 Ah (Lithium-ion / Lead Acid)",
      "Drive System": "Dual Front-Wheel AC Drive with Reluctance Motor",
      "Lift Height": "3,000 mm - 6,500 mm (Triplex Mast)",
      "Turning Radius": "1,496 mm (Compact Chassis)",
    "Safety System": "Jungheinrich curveCONTROL + Operator Presence System"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "jgh-efg220",
    "sku_code": "JGH-EFG220",
    "barcode": "404592100002",
    "part_name": "Jungheinrich EFG 220 3-Wheel Electric Forklift (2.0T) High-Capacity Warehouse",
    "part_name_lo": "ລົດຍົກໄຟຟ້າ 3 ລໍ້ Jungheinrich EFG 220 ຂະໜາດ 2.0 ໂຕນ - ຍົກສູງ 6.5 ແມັດ ປະສິດທິພາບສູງ",
    "category": "Forklifts",
    "description": "High-throughput 2.0-ton 3-wheel electric counterbalance forklift from Jungheinrich. Delivers maximum energy efficiency, regenerative braking, effortless electric steering, and high residual capacity at elevated heights.",
    "description_lo": "ລົດຍົກໄຟຟ້າ 3 ລໍ້ 2.0 ໂຕນ Jungheinrich EFG 220 ຮອງຮັບນ້ຳໜັກໄດ້ສູງ ພວງມາໄລໄຟຟ້ານຸ່ມນວນ ລະບົບສາກພະລັງງານຄືນຂະນະເບຣກ (Regenerative Braking) ຊ່ວຍປະຢັດແບັດເຕີຣີ ເຮັດວຽກຕໍ່ເນື່ອງ 2 ກະ ໂດຍບໍ່ຕ້ອງປ່ຽນແບັດ.",
    "image_url": "/images/forklifts/jungheinrich_efg_yellow.jpg",
    "gallery_images": [
      "/images/forklifts/fl_jungheinrich_front.jpg",
      "/images/forklifts/fl_view_rear_jungheinrich.jpg",
      "/images/forklifts/fl_jungheinrich_left.jpg",
      "/images/forklifts/fl_jungheinrich_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_jungheinrich_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_jungheinrich_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 5,
    "unit_price": 435000,
    "currency": "THB",
    "specs": {
      "Model": "EFG 220 (Series 2 Electric)",
      "Rated Capacity": "2,000 kg (2.0 Tons)",
      "Voltage / Battery": "48V / 625-750 Ah",
      "Lift Height": "3,000 mm - 6,500 mm Container Compatible",
      "Drive Technology": "Synchronous Reluctance AC Motors",
      "Safety": "Automatic Electric Parking Brake + curveCONTROL"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "jgh-efg320",
    "sku_code": "JGH-EFG320",
    "barcode": "404592100003",
    "part_name": "Jungheinrich EFG 320 4-Wheel Electric Counterbalance Forklift (2.0T) Dual Motor",
    "part_name_lo": "ລົດຍົກໄຟຟ້າ 4 ລໍ້ Jungheinrich EFG 320 ຂະໜາດ 2.0 ໂຕນ - 2 ມໍເຕີຂັບເຄື່ອນໜ້າ ໝັ້ນຄົງສູງ",
    "category": "Forklifts",
    "description": "Versatile 4-wheel electric counterbalance forklift (2000 kg) by Jungheinrich. Combines agile maneuverability with 4-wheel stability. Dual AC drive motors, wet disc brakes, and PureEnergy control for heavy warehouse pallet logistics.",
    "description_lo": "ລົດຍົກໄຟຟ້າ 4 ລໍ້ 2.0 ໂຕນ Jungheinrich EFG 320 ມໍເຕີຄູ່ AC ແຍກຂັບອິດສະຫຼະ ລໍ້ໜ້າ ໝັ້ນຄົງດີຢ້ຽມ ບໍ່ໂຄງເຄງ ເບຣກແຊ່ນ້ຳມັນບໍ່ຕ້ອງບຳລຸງຮັກສາ ໃຊ້ໄດ້ທັງໃນຮົ່ມ ແລະ ກາງແຈ້ງ.",
    "image_url": "/images/forklifts/jungheinrich_efg_yellow.jpg",
    "gallery_images": [
      "/images/forklifts/fl_jungheinrich_front.jpg",
      "/images/forklifts/fl_view_rear_jungheinrich.jpg",
      "/images/forklifts/fl_jungheinrich_left.jpg",
      "/images/forklifts/fl_jungheinrich_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_jungheinrich_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_jungheinrich_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 7,
    "unit_price": 460000,
    "currency": "THB",
    "specs": {
      "Model": "EFG 320 (Series 3 4-Wheel)",
      "Rated Capacity": "2,000 kg (2.0 Tons)",
      "Drive Motors": "2 x 4.5 kW AC Drive Motors",
      "Lift Height": "3,000 mm - 7,000 mm Triplex Mast",
      "Battery": "48V High Capacity",
      "Steering": "Full AC Electric Power Steering (curveCONTROL)"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "jgh-efg425",
    "sku_code": "JGH-EFG425",
    "barcode": "404592100004",
    "part_name": "Jungheinrich EFG 425 4-Wheel Electric Forklift (2.5T) 80V Heavy Industrial",
    "part_name_lo": "ລົດຍົກໄຟຟ້າ 4 ລໍ້ Jungheinrich EFG 425 ຂະໜາດ 2.5 ໂຕນ (ລະບົບໄຟ 80V) - ງານໜັກອຸດສາຫະກຳ",
    "category": "Forklifts",
    "description": "Heavy-duty 80-volt 4-wheel electric counterbalance forklift (2500 kg). Features Jungheinrich's benchmark 80V architecture, exceptional energy efficiency, high lifting speed, and weatherproof sealed electronics for indoor/outdoor use.",
    "description_lo": "ລົດຍົກໄຟຟ້າລະບົບແຮງດັນສູງ 80V Jungheinrich EFG 425 ຂະໜາດ 2.5 ໂຕນ ແຮງບິດສູງທຽບເທົ່າລົດຍົກນ້ຳມັນ ຍົກໄດ້ໄວ ລະບົບໄຟຟ້າກັນນ້ຳມາດຕະຖານ IP ຕາກຝົນ ແລະ ໃຊ້ງານກາງແຈ້ງໄດ້ສະບາຍ.",
    "image_url": "/images/forklifts/jungheinrich_efg_yellow.jpg",
    "gallery_images": [
      "/images/forklifts/fl_jungheinrich_front.jpg",
      "/images/forklifts/fl_view_rear_jungheinrich.jpg",
      "/images/forklifts/fl_jungheinrich_left.jpg",
      "/images/forklifts/fl_jungheinrich_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_jungheinrich_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_jungheinrich_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 5,
    "unit_price": 510000,
    "currency": "THB",
    "specs": {
      "Model": "EFG 425 (Series 4 80V)",
      "Rated Capacity": "2,500 kg (2.5 Tons)",
      "System Voltage": "80V Heavy Duty AC Architecture",
      "Lift Height": "3,000 mm - 7,500 mm",
      "Hydraulics": "Proportional Hydraulic Valve Control (Solo-PILOT / Multi-PILOT)",
      "Weatherproofing": "Full IP54 Sealed Drive & Electronics Compartment"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "jgh-efg430",
    "sku_code": "JGH-EFG430",
    "barcode": "404592100005",
    "part_name": "Jungheinrich EFG 430 4-Wheel Electric Forklift (3.0T) 80V with Side Shift",
    "part_name_lo": "ລົດຍົກໄຟຟ້າ 4 ລໍ້ Jungheinrich EFG 430 ຂະໜາດ 3.0 ໂຕນ (80V) - ພ້ອມງາເລື່ອນ Side Shift",
    "category": "Forklifts",
    "description": "High-capacity 3.0-ton 80V electric forklift engineered for continuous heavy pallet logistics, manufacturing plants, and beverage industry. Fitted with hydraulic side-shifter and high-visibility panoramic mast.",
    "description_lo": "ລົດຍົກໄຟຟ້າ 80V ຂະໜາດ 3.0 ໂຕນ Jungheinrich EFG 430 ເໝາະສຳລັບໂຮງງານຜະລິດ, ໂຮງງານເຄື່ອງດື່ມ ແລະ ສາງຂະໜາດໃຫຍ່ ພ້ອມງາເລື່ອນໄຮໂດຣລິກ Side Shift ເສົາພາໂນຣາມາເບິ່ງເຫັນຊັດເຈນທຸກມຸມ.",
    "image_url": "/images/forklifts/jungheinrich_efg_yellow.jpg",
    "gallery_images": [
      "/images/forklifts/fl_jungheinrich_front.jpg",
      "/images/forklifts/fl_view_rear_jungheinrich.jpg",
      "/images/forklifts/fl_jungheinrich_left.jpg",
      "/images/forklifts/fl_jungheinrich_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_jungheinrich_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_jungheinrich_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 4,
    "unit_price": 570000,
    "currency": "THB",
    "specs": {
      "Model": "EFG 430 (Series 4 80V)",
      "Rated Capacity": "3,000 kg (3.0 Tons)",
      "System Voltage": "80V AC Technology",
      "Attachment": "Integrated Hydraulic Side-Shifter",
      "Mast": "Triplex Full Free Lift Mast up to 7,500 mm",
      "Operator Control": "Multi-PILOT Joystick with Integrated Direction Switch"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "jgh-efg540",
    "sku_code": "JGH-EFG540",
    "barcode": "404592100006",
    "part_name": "Jungheinrich EFG 540 Heavy 4-Wheel Electric Forklift (4.0T) Dual Drive",
    "part_name_lo": "ລົດຍົກໄຟຟ້າງານໜັກ Jungheinrich EFG 540 ຂະໜາດ 4.0 ໂຕນ (80V) - ຍົກສິນຄ້າໜັກປອດມົນລະພິດ",
    "category": "Forklifts",
    "description": "Flagship 4.0-ton heavy counterbalance electric forklift from Jungheinrich EFG 5-series. 80V high-torque dual motors, high-capacity mast, zero emissions for automotive, paper, and food-grade heavy manufacturing.",
    "description_lo": "ລົດຍົກໄຟຟ້າຂະໜາດໃຫຍ່ 4.0 ໂຕນ Jungheinrich EFG 540 ແຮງບິດມະຫາສານ ປອດມົນລະພິດ 100% ມາດຕະຖານສູງສຸດສຳລັບອຸດສາຫະກຳເຈ້ຍ, ອາຫານ, ແລະ ຊິ້ນສ່ວນຍານຍົນ ລໍ້ຢາງຕັນທົນທານພິເສດ.",
    "image_url": "/images/forklifts/jungheinrich_efg_yellow.jpg",
    "gallery_images": [
      "/images/forklifts/fl_jungheinrich_front.jpg",
      "/images/forklifts/fl_view_rear_jungheinrich.jpg",
      "/images/forklifts/fl_jungheinrich_left.jpg",
      "/images/forklifts/fl_jungheinrich_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_jungheinrich_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_jungheinrich_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 3,
    "unit_price": 730000,
    "currency": "THB",
    "specs": {
      "Model": "EFG 540 (Series 5 Heavy Electric)",
      "Rated Capacity": "4,000 kg (4.0 Tons)",
      "System Voltage": "80V / 930 Ah Battery Capacity",
      "Lift Height": "3,000 mm - 7,000 mm Heavy Mast",
      "Braking System": "Wear-Free Electric Regenerative + Multi-Disc Brakes",
      "Tires": "Heavy Duty Super Elastic Solid Tires"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "jgh-dfg425s",
    "sku_code": "JGH-DFG425S",
    "barcode": "404592100007",
    "part_name": "Jungheinrich DFG 425s Hydrostatic Diesel Forklift (2.5T) Kubota Engine",
    "part_name_lo": "ລົດຍົກດີເຊວໄຮໂດຣສະແຕຕິກ Jungheinrich DFG 425s ຂະໜາດ 2.5 ໂຕນ - ຈັກ Kubota ຂັບເຄື່ອນນຸ່ມນວນ",
    "category": "Forklifts",
    "description": "World-renowned German hydrostatic diesel counterbalance forklift (2500 kg). Features Kubota industrial diesel engine coupled to Jungheinrich's stepless hydrostatic drive for jerk-free acceleration, dynamic braking, and unmatched precision.",
    "description_lo": "ລົດຍົກດີເຊວລະບົບໄຮໂດຣສະແຕຕິກ (Hydrostatic Drive) Jungheinrich DFG 425s ຂະໜາດ 2.5 ໂຕນ ຈັກ Kubota ເຢຍລະມັນ/ຍີ່ປຸ່ນ. ບໍ່ມີຄລັດຊ໌ ແລະ ເກຍກະຕຸກ ອອກໂຕ ແລະ ເບຣກນຸ່ມນວນ ຄວບຄຸມຕຳແໜ່ງງາໄດ້ລະອຽດລະດັບມິນລິແມັດ.",
    "image_url": "/images/forklifts/jungheinrich_efg_yellow.jpg",
    "gallery_images": [
      "/images/forklifts/fl_jungheinrich_front.jpg",
      "/images/forklifts/fl_view_rear_jungheinrich.jpg",
      "/images/forklifts/fl_jungheinrich_left.jpg",
      "/images/forklifts/fl_jungheinrich_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_jungheinrich_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_jungheinrich_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 5,
    "unit_price": 485000,
    "currency": "THB",
    "specs": {
      "Model": "DFG 425s (Hydrostatic 4-Series)",
      "Rated Capacity": "2,500 kg (2.5 Tons)",
      "Drive Type": "Hydrostatic Drive (Stepless Automatic)",
      "Engine": "Kubota V2403 Industrial Diesel",
      "Lift Height": "3,000 mm - 6,500 mm",
      "Special Feature": "Dynamic Hydrostatic Braking without Brake Wear"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "jgh-dfg435s",
    "sku_code": "JGH-DFG435S",
    "barcode": "404592100008",
    "part_name": "Jungheinrich DFG 435s Hydrostatic Diesel Forklift (3.5T) Heavy Duty",
    "part_name_lo": "ລົດຍົກດີເຊວໄຮໂດຣສະແຕຕິກ Jungheinrich DFG 435s ຂະໜາດ 3.5 ໂຕນ - ງານກາງແຈ້ງໜັກ & ໄຊທ໌ກໍ່ສ້າງ",
    "category": "Forklifts",
    "description": "Heavy duty 3.5-ton hydrostatic diesel forklift by Jungheinrich. Designed for harsh outdoor timber, concrete, and freight loading. Infinitely variable speed control, heavy counterweight, and rugged all-weather design.",
    "description_lo": "ລົດຍົກດີເຊວ 3.5 ໂຕນ Jungheinrich DFG 435s ລະບົບຂັບເຄື່ອນ Hydrostatic ທົນທານຕໍ່ຝຸ່ນ ແລະ ຄວາມຮ້ອນ ໝໍ້ນ້ຳອາລູມີນຽມຂະໜາດໃຫຍ່ ເໝາະກັບງານກາງແຈ້ງ, ໂຮງງານຊີມັງ ແລະ ງານໂຫຼດຕູ້ຄອນເທນເນີ.",
    "image_url": "/images/forklifts/jungheinrich_efg_yellow.jpg",
    "gallery_images": [
      "/images/forklifts/fl_jungheinrich_front.jpg",
      "/images/forklifts/fl_view_rear_jungheinrich.jpg",
      "/images/forklifts/fl_jungheinrich_left.jpg",
      "/images/forklifts/fl_jungheinrich_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_jungheinrich_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_jungheinrich_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 4,
    "unit_price": 600000,
    "currency": "THB",
    "specs": {
      "Model": "DFG 435s (Hydrostatic 4-Series)",
      "Rated Capacity": "3,500 kg (3.5 Tons)",
      "Drive System": "Infinitely Variable Hydrostatic Transmission",
      "Engine": "Kubota Turbo Industrial Diesel",
      "Cooling": "High-Efficiency Plate Aluminum Radiator",
      "Mast": "Triplex Container Stuffing Mast"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "jgh-dfg545s",
    "sku_code": "JGH-DFG545S",
    "barcode": "404592100009",
    "part_name": "Jungheinrich DFG 545s Heavy Hydrostatic Diesel Forklift (4.5T) Wet Brakes",
    "part_name_lo": "ລົດຍົກດີເຊວໄຮໂດຣສະແຕຕິກ Jungheinrich DFG 545s ຂະໜາດ 4.5 ໂຕນ - ງານໜັກອຸດສາຫະກຳ & ທ່າບົກ",
    "category": "Forklifts",
    "description": "Massive 4.5-ton heavy hydrostatic diesel forklift engineered for intermodal container yards, steel coils, and structural timber. Maintenance-free wet multi-disc brakes, heavy steer axle, and soundproof operator cabin.",
    "description_lo": "ລົດຍົກງານໜັກພິເສດ 4.5 ໂຕນ Jungheinrich DFG 545s ລະບົບ Hydrostatic ກຳລັງສູງ ເບຣກແຊ່ນ້ຳມັນ Wet Disc Brake ຫ້ອງໂດຍສານຕິດແອຣ໌ປັບອາກາດ ເໝາະສຳລັບທ່າບົກ, ໂຮງງານເຫຼັກ ແລະ ບໍ່ແຮ່.",
    "image_url": "/images/forklifts/jungheinrich_efg_yellow.jpg",
    "gallery_images": [
      "/images/forklifts/fl_jungheinrich_front.jpg",
      "/images/forklifts/fl_view_rear_jungheinrich.jpg",
      "/images/forklifts/fl_jungheinrich_left.jpg",
      "/images/forklifts/fl_jungheinrich_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_jungheinrich_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_jungheinrich_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 3,
    "unit_price": 830000,
    "currency": "THB",
    "specs": {
      "Model": "DFG 545s (Hydrostatic 5-Series)",
      "Rated Capacity": "4,500 kg (4.5 Tons)",
      "Drive Technology": "High-Performance Hydrostatic with Dual Wheel Motors",
      "Engine": "Heavy Duty Industrial Turbo Diesel",
      "Lift Height": "3,000 mm - 6,500 mm",
      "Cabin": "Fully Enclosed Luxury Cabin with Air Conditioning"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "jgh-etv216",
    "sku_code": "JGH-ETV216",
    "barcode": "404592100010",
    "part_name": "Jungheinrich ETV 216 Electric Reach Truck (1.6T) Lift Height 10.7m Narrow Aisle",
    "part_name_lo": "ລົດຍົກສູງແບບ Reach Truck Jungheinrich ETV 216 ຂະໜາດ 1.6 ໂຕນ - ຍົກສູງ 10.7 ແມັດ ຊ່ອງທາງແຄບ",
    "category": "Forklifts",
    "description": "World benchmark electric reach truck from Jungheinrich (1600 kg). Features moving mast, lift heights up to 10.7 meters, narrow aisle operation (down to 2.7m), panoramic overhead guard, and multi-PILOT electric joystick.",
    "description_lo": "ລົດຍົກ Reach Truck ອັນດັບ 1 ຂອງໂລກ Jungheinrich ETV 216 ຂະໜາດ 1.6 ໂຕນ ເສົາເລື່ອນເຂົ້າ-ອອກໄດ້ ຍົກສິນຄ້າໄດ້ສູງເຖິງ 10.7 ແມັດ ແລ່ນໃນຊ່ອງທາງແຄບພຽງ 2.7 ແມັດ ເພີ່ມພື້ນທີ່ຈັດເກັບສິນຄ້າໃນສາງໄດ້ເຖິງ 30%.",
    "image_url": "/images/forklifts/jungheinrich_etv_reachtruck.jpg",
    "gallery_images": [
      "/images/forklifts/fl_jungheinrich_front.jpg",
      "/images/forklifts/fl_view_rear_jungheinrich.jpg",
      "/images/forklifts/fl_jungheinrich_left.jpg",
      "/images/forklifts/fl_jungheinrich_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_jungheinrich_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_jungheinrich_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 4,
    "unit_price": 540000,
    "currency": "THB",
    "specs": {
      "Model": "ETV 216 (Series 2 Reach Truck)",
      "Rated Capacity": "1,600 kg (1.6 Tons)",
      "Lift Height": "Up to 10,700 mm (10.7 Meters Triplex Mast)",
      "Aisle Width Requirement": "2,740 mm (Ast with 800x1200 pallet)",
      "Controls": "Jungheinrich multi-PILOT Joystick with Direction Reversal",
      "Safety": "Mast Transition Cushioning + Curve Control"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "jgh-etv320",
    "sku_code": "JGH-ETV320",
    "barcode": "404592100011",
    "part_name": "Jungheinrich ETV 320 High-Performance Electric Reach Truck (2.0T) Lift 13.0m",
    "part_name_lo": "ລົດຍົກສູງພິເສດ Reach Truck Jungheinrich ETV 320 ຂະໜາດ 2.0 ໂຕນ - ຍົກສູງ 13.0 ແມັດ ສາງໄຮເບຍ໌",
    "category": "Forklifts",
    "description": "High-bay logistics powerhouse Jungheinrich ETV 320 reach truck (2000 kg). Delivers industry-leading lift heights up to 13.0 meters with high residual capacity, motorized mast tilt, and positionCONTROL pre-set rack height selector.",
    "description_lo": "ລົດຍົກ Reach Truck ສະເປັກສູງສຸດ Jungheinrich ETV 320 ຂະໜາດ 2.0 ໂຕນ ຍົກສູງໄດ້ເຖິງ 13.0 ແມັດ ສຳລັບສາງ High-Bay ລະບົບ positionCONTROL ກົດປຸ່ມເລືອກຊັ້ນວາງອັດຕະໂນມັດ ປາຍງາມີກ້ອງກວດຈັບປອດໄພ.",
    "image_url": "/images/forklifts/jungheinrich_etv_reachtruck.jpg",
    "gallery_images": [
      "/images/forklifts/fl_jungheinrich_front.jpg",
      "/images/forklifts/fl_view_rear_jungheinrich.jpg",
      "/images/forklifts/fl_jungheinrich_left.jpg",
      "/images/forklifts/fl_jungheinrich_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_jungheinrich_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_jungheinrich_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 3,
    "unit_price": 645000,
    "currency": "THB",
    "specs": {
      "Model": "ETV 320 (Series 3 High-Bay)",
      "Rated Capacity": "2,000 kg (2.0 Tons)",
      "Lift Height": "Up to 13,000 mm (13 Meters Heavy Mast)",
      "Automation / Assist": "positionCONTROL Auto Shelf Selector + Fork Camera",
      "Battery": "48V 775-930 Ah (Optional Lithium-ion)",
      "Drive Speed": "Up to 14 km/h"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  },
  {
    "sku_id": "jgh-eje116",
    "sku_code": "JGH-EJE116",
    "barcode": "404592100012",
    "part_name": "Jungheinrich EJE 116 Electric Pedestrian Pallet Truck (1.6T) ProTracLink",
    "part_name_lo": "ລົດລາກພາເລັດໄຟຟ້າ Jungheinrich EJE 116 ຂະໜາດ 1.6 ໂຕນ - ລະບົບ ProTracLink ລາກ-ຍົກໄຟຟ້າເຕັມຮູບແບບ",
    "category": "Forklifts",
    "description": "Class-leading electric pedestrian pallet truck (1600 kg) by Jungheinrich. Equipped with maintenance-free 3-phase AC motor, ProTracLink torsion-resistant castor wheels for ramps, crawl speed button, and rapid battery charging.",
    "description_lo": "ລົດລາກພາເລັດໄຟຟ້າລຸ້ນຍອດນິຍົມອັນດັບ 1 ໃນເອີຣົບ Jungheinrich EJE 116 ຂະໜາດ 1.6 ໂຕນ ຂັບເຄື່ອນ ແລະ ຍົກດ້ວຍໄຟຟ້າເຕັມຮູບແບບ ລະບົບ ProTracLink ຂຶ້ນທາງຄ້ອຍໄດ້ໝັ້ນຄົງ ດ້າມຈັບ ergonomic ບັງຄັບງ່າຍ.",
    "image_url": "/images/forklifts/jungheinrich_eje_pallettruck.jpg",
    "gallery_images": [
      "/images/forklifts/fl_jungheinrich_front.jpg",
      "/images/forklifts/fl_view_rear_jungheinrich.jpg",
      "/images/forklifts/fl_jungheinrich_left.jpg",
      "/images/forklifts/fl_jungheinrich_right.jpg",
      "/images/forklifts/fl_comp_tire_front.jpg",
      "/images/forklifts/fl_comp_tire_rear.jpg",
      "/images/forklifts/fl_jungheinrich_dashboard.jpg",
      "/images/forklifts/fl_comp_seat.jpg",
      "/images/forklifts/fl_comp_pedals.jpg",
      "/images/forklifts/fl_comp_levers.jpg",
      "/images/forklifts/fl_jungheinrich_mast.jpg",
      "/images/forklifts/fl_comp_forks.jpg"
    ],
    "qty_on_hand": 8,
    "unit_price": 135000,
    "currency": "THB",
    "specs": {
      "Model": "EJE 116 (Electric Pedestrian)",
      "Rated Capacity": "1,600 kg (1.6 Tons)",
      "Drive Technology": "Maintenance-Free 3-Phase AC Motor",
      "Forks Dimension": "1,150 x 540 mm (Standard Euro / ISO Pallet)",
      "Suspension": "ProTracLink Spring-Loaded Castor Wheels",
      "Safety Feature": "Long Low-Mounted Tiller Arm for Safe Distance"
    },
    "lead_time": "Pre-Order (Factory Direct Import 30-45 Days)",
    "warranty_months": 12
  }
  ,
  {
    "sku_id": "cum-qsg12-400s",
    "sku_code": "CUM-QSG12-400S",
    "barcode": "885110009400",
    "part_name": "Cummins QSG12-G1 400 kVA / 320 kW Industrial Silent Diesel Generator Set",
    "part_name_lo": "ຈັກປັ່ນໄຟຟ້າດີເຊວອຸດສາຫະກຳ Cummins QSG12 400 kVA / 320 kW (ຕູ້ເກັບສຽງ Silent Canopy)",
    "category": "Generators",
    "description": "Heavy-duty 400 kVA (320 kW Standby / 360 kVA 288 kW Prime) industrial diesel generator powered by genuine Cummins QSG12-G1 11.8L 6-cylinder turbocharged engine, Stamford brushless alternator, PowerCommand 2.3 digital control panel, and factory soundproof acoustic enclosure (72 dBA @ 7m).",
    "description_lo": "ຈັກປັ່ນໄຟຟ້າດີເຊວອຸດສາຫະກຳ Cummins ຂະໜາດ 400 kVA / 320 kW (Standby) ແລະ 360 kVA / 288 kW (Prime) ເຄື່ອງຈັກແທ້ QSG12-G1 11.8L 6 ສູບ ເທີໂບຊາດ, ຫົວໄດ Stamford, ຈໍຄວບຄຸມ PowerCommand 2.3, ຕູ້ເກັບສຽງມາດຕະຖານ 72 dBA, ຖັງນ້ຳມັນ 850L ໃນໂຕ ພ້ອມໃຊ້ງານໃນໂຮງງານ ແລະ ອາຄານ.",
    "image_url": "/images/genset/cummins_qsg12_silent.jpg",
    "qty_on_hand": 6,
    "unit_price": 1450000,
    "currency": "THB",
    "specs": {
      "Prime Power": "360 kVA / 288 kW",
      "Standby Power": "400 kVA / 320 kW",
      "Engine Model": "Cummins QSG12-G1 (11.8 Liters, In-line 6-Cylinder)",
      "Alternator": "Stamford Brushless AC",
      "Controller": "Cummins PowerCommand 2.3 LCD",
      "Voltage / Frequency": "400V / 230V, 50Hz, 1500 RPM, 3 Phase",
      "Sound Level": "72 dBA @ 7 meters (Heavy Weatherproof Canopy)",
      "Fuel Consumption": "78 L/h (100% Prime Load)",
      "Fuel Tank Capacity": "850 Liters Base Tank",
      "Dimensions (LxWxH)": "4300 x 1450 x 2200 mm",
      "Dry Weight": "4350 kg"
    },
    "lead_time": "In Stock / Ready for Commissioning (2-3 Days)",
    "warranty_months": 12,
    "gallery_images": [
      "/images/genset/cummins_qsg12_silent.jpg",
      "/images/genset/cummins_qsg12_engine.jpg",
      "/images/genset/cummins_powercommand_panel.jpg",
      "/images/genset/cummins_stamford_alternator.jpg",
      "/images/genset/cummins_radiator_cooling.jpg"
    ]
  },
  {
    "sku_id": "cum-qsg12-500s",
    "sku_code": "CUM-QSG12-500S",
    "barcode": "885110009500",
    "part_name": "Cummins QSG12-G2 500 kVA / 400 kW Industrial Silent Diesel Generator Set",
    "part_name_lo": "ຈັກປັ່ນໄຟຟ້າດີເຊວອຸດສາຫະກຳ Cummins QSG12 500 kVA / 400 kW (ຕູ້ເກັບສຽງ Silent Canopy)",
    "category": "Generators",
    "description": "High-output 500 kVA (400 kW Standby / 450 kVA 360 kW Prime) industrial diesel generator set with Cummins QSG12-G2 electronic fuel injection engine, Stamford alternator, PowerCommand 3.3 paralleling controller, and acoustic sound attenuated canopy.",
    "description_lo": "ຈັກປັ່ນໄຟຟ້າດີເຊວອຸດສາຫະກຳ Cummins ຂະໜາດ 500 kVA / 400 kW (Standby) ແລະ 450 kVA / 360 kW (Prime) ເຄື່ອງຈັກ QSG12-G2 ຫົວສີດອີເລັກໂທຣນິກ, ຫົວໄດ Stamford, ຈໍຄວບຄຸມ PowerCommand 3.3 ຮອງຮັບການຂະໜານເຄື່ອງ (Paralleling), ຕູ້ເກັບສຽງພ້ອມໃຊ້ງານ.",
    "image_url": "/images/genset/cummins_qsg12_silent.jpg",
    "qty_on_hand": 4,
    "unit_price": 1680000,
    "currency": "THB",
    "specs": {
      "Prime Power": "450 kVA / 360 kW",
      "Standby Power": "500 kVA / 400 kW",
      "Engine Model": "Cummins QSG12-G2 (11.8 Liters, In-line 6-Cylinder)",
      "Alternator": "Stamford Brushless AC",
      "Controller": "Cummins PowerCommand 3.3 (Sync & Paralleling)",
      "Voltage / Frequency": "400V / 230V, 50Hz, 1500 RPM, 3 Phase",
      "Sound Level": "73 dBA @ 7 meters (Heavy Weatherproof Canopy)",
      "Fuel Consumption": "94 L/h (100% Prime Load)",
      "Fuel Tank Capacity": "950 Liters Base Tank",
      "Dimensions (LxWxH)": "4500 x 1500 x 2300 mm",
      "Dry Weight": "4680 kg"
    },
    "lead_time": "In Stock (2-3 Days)",
    "warranty_months": 12,
    "gallery_images": [
      "/images/genset/cummins_qsg12_silent.jpg",
      "/images/genset/cummins_qsg12_engine.jpg",
      "/images/genset/cummins_powercommand_panel.jpg",
      "/images/genset/cummins_stamford_alternator.jpg",
      "/images/genset/cummins_radiator_cooling.jpg"
    ]
  },
  {
    "sku_id": "cum-qsg12-360o",
    "sku_code": "CUM-QSG12-360O",
    "barcode": "885110009360",
    "part_name": "Cummins QSG12-G1 360 kVA / 288 kW Industrial Open Skid Diesel Generator Set",
    "part_name_lo": "ຈັກປັ່ນໄຟຟ້າດີເຊວອຸດສາຫະກຳ Cummins QSG12 360 kVA / 288 kW (ແບບແທ່ນເປືອຍ Open Skid ສຳລັບຫ້ອງຈັກ)",
    "category": "Generators",
    "description": "Open skid type industrial diesel generator set designed for indoor plant rooms. Cummins QSG12-G1 engine, Stamford alternator, residential silencer, and PowerCommand 2.3 controller on rigid anti-vibration steel base frame.",
    "description_lo": "ຈັກປັ່ນໄຟຟ້າດີເຊວອຸດສາຫະກຳ Cummins ແບບແທ່ນເປືອຍ Open Skid 360 kVA / 288 kW ສຳລັບຕິດຕັ້ງໃນຫ້ອງຈັກພາຍໃນອາຄານ ເຄື່ອງຈັກ QSG12-G1, ຫົວໄດ Stamford, ໝໍ້ພັກສຽງ Residential, ຈໍຄວບຄຸມ PowerCommand 2.3.",
    "image_url": "/images/genset/cummins_stamford_alternator.jpg",
    "qty_on_hand": 5,
    "unit_price": 1220000,
    "currency": "THB",
    "specs": {
      "Prime Power": "325 kVA / 260 kW",
      "Standby Power": "360 kVA / 288 kW",
      "Engine Model": "Cummins QSG12-G1 (11.8 Liters)",
      "Alternator": "Stamford Brushless AC",
      "Controller": "Cummins PowerCommand 2.3",
      "Voltage / Frequency": "400V / 230V, 50Hz, 1500 RPM, 3 Phase",
      "Structure": "Heavy-Duty Open Skid Base with Anti-Vibration Mounts",
      "Fuel Consumption": "70 L/h (100% Prime Load)",
      "Dimensions (LxWxH)": "3400 x 1350 x 1950 mm",
      "Dry Weight": "3450 kg"
    },
    "lead_time": "In Stock (1-2 Days)",
    "warranty_months": 12,
    "gallery_images": [
      "/images/genset/cummins_stamford_alternator.jpg",
      "/images/genset/cummins_qsg12_engine.jpg",
      "/images/genset/cummins_powercommand_panel.jpg",
      "/images/genset/cummins_radiator_cooling.jpg",
      "/images/genset/cummins_qsg12_silent.jpg"
    ]
  },
  {
    "sku_id": "cum-qsg12-525s",
    "sku_code": "CUM-QSG12-525S",
    "barcode": "885110009525",
    "part_name": "Cummins QSG12 525 kVA / 420 kW Heavy Industrial Standby Silent Generator Set",
    "part_name_lo": "ຈັກປັ່ນໄຟຟ້າດີເຊວອຸດສາຫະກຳ Cummins QSG12 525 kVA / 420 kW (ຕູ້ເກັບສຽງຂະໜາດໃຫຍ່ Super Silent)",
    "category": "Generators",
    "description": "Maximum output 525 kVA (420 kW Standby / 475 kVA 380 kW Prime) heavy industrial diesel generator set with Cummins QSG12 platform, high-capacity cooling package, Stamford alternator, and PowerCommand 3.3 digital management system.",
    "description_lo": "ຈັກປັ່ນໄຟຟ້າຂະໜາດສູງສຸດ 525 kVA / 420 kW (Standby) ສຳລັບໂຮງງານອຸດສາຫະກຳໜັກ, ໂຮງໝໍ, ແລະ ສູນຂໍ້ມູນ (Data Center) ມາດຕະຖານ Cummins QSG12, ໝໍ້ລົມລະບາຍຄວາມຮ້ອນຂະໜາດໃຫຍ່ 50°C, ຕູ້ເກັບສຽງ Super Silent.",
    "image_url": "/images/genset/cummins_qsg12_silent.jpg",
    "qty_on_hand": 3,
    "unit_price": 1890000,
    "currency": "THB",
    "specs": {
      "Prime Power": "475 kVA / 380 kW",
      "Standby Power": "525 kVA / 420 kW",
      "Engine Model": "Cummins QSG12 Platform (11.8 Liters, 6-Cyl Turbo)",
      "Alternator": "Stamford Brushless AC",
      "Controller": "Cummins PowerCommand 3.3",
      "Cooling Package": "Heavy Duty 50°C Ambient Industrial Radiator",
      "Voltage / Frequency": "400V / 230V, 50Hz, 1500 RPM, 3 Phase",
      "Sound Level": "74 dBA @ 7 meters",
      "Fuel Tank Capacity": "1000 Liters Dual Wall Base Tank",
      "Dimensions (LxWxH)": "4600 x 1550 x 2350 mm",
      "Dry Weight": "4850 kg"
    },
    "lead_time": "In Stock / Ready for Delivery (2-3 Days)",
    "warranty_months": 12,
    "gallery_images": [
      "/images/genset/cummins_qsg12_silent.jpg",
      "/images/genset/cummins_qsg12_engine.jpg",
      "/images/genset/cummins_powercommand_panel.jpg",
      "/images/genset/cummins_stamford_alternator.jpg",
      "/images/genset/cummins_radiator_cooling.jpg"
    ]
  },
  
  // --- JENSTORE MOCK PRODUCTS ---
  {
    "sku_id": "jns-ht-001",
    "sku_code": "JNS-HT-001",
    "barcode": "885110009901",
    "part_name": "Stainless Steel Folding Hand Truck 300kg",
    "part_name_lo": "ລົດເຂັນສະແຕນເລດ 4 ລໍ້ ພັບໄດ້ ຮັບນ້ຳໜັກ 300kg",
    "category": "Hand Trucks",
    "pre_category_id": "mhe-forklifts",
    "brand": "Jenbunjerd",
    "sub_category": "Hand Trucks",
    "description": "Premium 304 stainless steel folding hand truck with anti-slip surface and non-marking PU casters.",
    "description_lo": "ລົດເຂັນສະແຕນເລດ 304 ແທ້ ບໍ່ເປັນສຽງ ພັບເກັບໄດ້ ພື້ນກັນມື່ນ ພ້ອມລໍ້ PU ບໍ່ດັງ ບໍ່ທຳລາຍພື້ນ.",
    "image_url": "/images/catalog/real/foldable_platform_trolley.jpg",
    "qty_on_hand": 50,
    "unit_price": 4500,
    "currency": "THB",
    "specs": {
      "Capacity": "300 kg",
      "Material": "SUS304 Stainless Steel",
      "Casters": "5-inch PU (2 Swivel, 2 Fixed)"
    },
    "lead_time": "In Stock",
    "warranty_months": 12
  },
  {
    "sku_id": "jns-bin-001",
    "sku_code": "JNS-BIN-001",
    "barcode": "885110009902",
    "part_name": "Industrial Stackable Plastic Parts Bin (Large)",
    "part_name_lo": "ກ່ອງອາໄຫຼ່ພາດສະຕິກອຸດສາຫະກຳ ຊ້ອນກັນໄດ້ (ຂະໜາດໃຫຍ່)",
    "category": "Plastic Bins",
    "pre_category_id": "warehouse-storage",
    "brand": "Jenbunjerd",
    "sub_category": "Plastic Bins",
    "description": "Heavy-duty polypropylene stackable parts bin for organizing warehouse inventory and workshop components.",
    "description_lo": "ກ່ອງພາດສະຕິກໜາພິເສດ ສຳລັບໃສ່ອາໄຫຼ່ ຊ້ອນກັນໄດ້ສູງ ປະຢັດພື້ນທີ່ ຮັບນ້ຳໜັກໄດ້ຫຼາຍ.",
    "image_url": "/images/catalog/real/stackable_parts_bins.jpg",
    "qty_on_hand": 500,
    "unit_price": 250,
    "currency": "THB",
    "specs": {
      "Dimensions": "400 x 250 x 160 mm",
      "Material": "Co-Polymer PP",
      "Features": "Stackable, Label Holder"
    },
    "lead_time": "In Stock",
    "warranty_months": 0
  },
  {
    "sku_id": "jns-pt-001",
    "sku_code": "JNS-PT-001",
    "barcode": "885110009903",
    "part_name": "Heavy Duty 1/2\" Cordless Impact Wrench 20V",
    "part_name_lo": "ບລັອກແບັດເຕີຣີ 1/2\" 20V ມາດຕະຖານອຸດສາຫະກຳໜັກ",
    "category": "Power Tools",
    "pre_category_id": "spare-parts-consumables",
    "brand": "Makita",
    "sub_category": "Power Tools",
    "description": "Brushless motor cordless impact wrench delivering 1000Nm of fastening torque for heavy machinery maintenance.",
    "description_lo": "ບລັອກໄຟຟ້າບຣັສເລດ (Brushless) ແຮງບິດ 1000Nm ສຳລັບງານຊ່າງໜັກ, ຖອດລໍ້ລົດບັນທຸກ, ແລະ ສ້ອມແປງກົນຈັກ.",
    "image_url": "/images/catalog/real/cordless_hammer_drill.jpg",
    "qty_on_hand": 15,
    "unit_price": 12500,
    "currency": "THB",
    "specs": {
      "Voltage": "20V Max",
      "Max Torque": "1000 Nm",
      "Motor": "Brushless",
      "Drive": "1/2\" Square"
    },
    "lead_time": "In Stock",
    "warranty_months": 12
  },
  {
    "sku_id": "jns-tc-001",
    "sku_code": "JNS-TC-001",
    "barcode": "885110009904",
    "part_name": "7-Drawer Professional Roller Tool Cabinet",
    "part_name_lo": "ຕູ້ເກັບເຄື່ອງມືຊ່າງ 7 ລີ້ນຊັກ ພ້ອມລໍ້ເລື່ອນ",
    "category": "Tool Cabinets",
    "pre_category_id": "spare-parts-consumables",
    "brand": "Jenbunjerd",
    "sub_category": "Tool Cabinets",
    "description": "Professional 7-drawer roller tool cabinet with ball-bearing slides, central locking system, and heavy-duty casters.",
    "description_lo": "ຕູ້ເກັບເຄື່ອງມື 7 ລີ້ນຊັກ ພ້ອມລາງລູກປືນດຶງງ່າຍ ລະບົບລັອກສູນກາງ ແລະ ລໍ້ເລື່ອນຮັບນ້ຳໜັກສູງ ສຳລັບອູ່ຊ່າງມາດຕະຖານ.",
    "image_url": "/images/catalog/real/roller_tool_cabinet.jpg",
    "qty_on_hand": 10,
    "unit_price": 18900,
    "currency": "THB",
    "specs": {
      "Drawers": "7 (Ball-bearing slides)",
      "Capacity": "40kg per drawer",
      "Lock": "Central Key Lock",
      "Casters": "5-inch Heavy Duty"
    },
    "lead_time": "In Stock",
    "warranty_months": 12
  },
  {
    "sku_id": "jns-ts-001",
    "sku_code": "JNS-TS-001",
    "barcode": "885110009905",
    "part_name": "75cm Heavy Duty PVC Traffic Cone with Reflective Collars",
    "part_name_lo": "ກວຍຈະລາຈອນ PVC 75cm ພ້ອມແຖບສະທ້ອນແສງ",
    "category": "Traffic Safety",
    "pre_category_id": "spare-parts-consumables",
    "brand": "DK Safety",
    "sub_category": "Traffic Safety",
    "description": "Flexible and durable PVC traffic cone with high-visibility reflective bands for warehouse and road safety.",
    "description_lo": "ກວຍຈະລາຈອນຢາງ PVC ຢືດຢຸ່ນສູງ ຢຽບບໍ່ແຕກ ສີສົ້ມສົດ ພ້ອມແຖບສະທ້ອນແສງ 3M ເຫັນແຈ້ງໃນເວລາກາງຄືນ.",
    "image_url": "/images/catalog/real/traffic_safety_cone.jpg",
    "qty_on_hand": 200,
    "unit_price": 350,
    "currency": "THB",
    "specs": {
      "Height": "75 cm",
      "Material": "Flexible PVC",
      "Reflective": "2 Bands (3M High Intensity)",
      "Weight": "2.5 kg (Wind Resistant)"
    },
    "lead_time": "In Stock",
    "warranty_months": 0
  },
  // --- Enriched High-Demand Catalog Additions ---
  {
  "sku_id": "jns-ht-1002",
  "sku_code": "JNS-HT-1002",
  "barcode": "885110002002",
  "part_name": "Heavy-Duty Foldable Platform Trolley 300 kg (Steel Deck with Non-slip Mat)",
  "part_name_lo": "ລົດເຂັນ 4 ລໍ້ພື້ນເຫຼັກພັບໄດ້ 300 ກິໂລ (ແຜ່ນຢາງກັນມື່ນ)",
  "category": "Hand Trucks",
  "pre_category_id": "mhe-forklifts",
  "description": "Foldable steel handle platform cart with all-round bumper protection and 5-inch quiet casters.",
  "description_lo": "ລົດເຂັນ 4 ລໍ້ ພື້ນເຫຼັກປູແຜ່ນຢາງກັນມື່ນ ດ້າວຈັບພັບເກັບໄດ້ ຮັບນ້ຳໜັກ 300 kg ລໍ້ TPR 5 ນິ້ວ ງຽບ ບໍ່ມີຮອຍເທິງພື້ນ.",
  "image_url": "/images/catalog/real/foldable_platform_trolley.jpg",
  "qty_on_hand": 35,
  "unit_price": 1850,
  "currency": "THB",
  "specs": {
    "Capacity": "300 kg",
    "Platform Size": "910 x 610 mm",
    "Wheel": "5\" TPR",
    "Type": "Foldable Handle"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-ht-1003",
  "sku_code": "JNS-HT-1003",
  "barcode": "885110002003",
  "part_name": "Industrial Platform Hand Truck 500 kg (Reinforced Steel Frame & Dual Handles)",
  "part_name_lo": "ລົດເຂັນ 4 ລໍ້ເຫຼັກໜາພິເສດ 500 ກິໂລ (ດ້າວຈັບຄູ່ ແຂງແຮງສູງ)",
  "category": "Hand Trucks",
  "pre_category_id": "mhe-forklifts",
  "description": "Heavy-duty industrial transport trolley with dual steel handles and reinforced undercarriage.",
  "description_lo": "ລົດເຂັນໂຮງງານໜັກ 500 kg ໂຄງສ້າງເຫຼັກໜາພິເສດ ດ້າວຈັບສອງດ້ານ ເໝາະສຳລັບໂຮງງານຜະລິດ ແລະ ສາງສິນຄ້າ.",
  "image_url": "/images/catalog/real/foldable_platform_trolley.jpg",
  "qty_on_hand": 20,
  "unit_price": 3200,
  "currency": "THB",
  "specs": {
    "Capacity": "500 kg",
    "Platform Size": "1200 x 750 mm",
    "Wheel": "6\" Heavy PU",
    "Frame": "Reinforced Steel"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-ht-1004",
  "sku_code": "JNS-HT-1004",
  "barcode": "885110002004",
  "part_name": "Foldable Aluminum 2-Wheel Hand Truck 150 kg (Telescopic Handle)",
  "part_name_lo": "ລົດເຂັນ 2 ລໍ້ອະລູມິນຽມພັບໄດ້ 150 ກິໂລ (ນ້ຳໜັກເບົາ ພົກພາສະດວກ)",
  "category": "Hand Trucks",
  "pre_category_id": "mhe-forklifts",
  "description": "Compact lightweight aluminum sack trolley with folding toe plate and telescopic handle.",
  "description_lo": "ລົດເຂັນ 2 ລໍ້ ຜະລິດຈາກອະລູມິນຽມອັລລອຍ ນ້ຳໜັກເບົາພຽງ 5.5 kg ພັບເກັບໃສ່ທ້າຍລົດໄດ້ ສະດວກທຸກການຂົນສົ່ງ.",
  "image_url": "/images/catalog/real/aluminum_hand_truck.jpg",
  "qty_on_hand": 45,
  "unit_price": 1450,
  "currency": "THB",
  "specs": {
    "Capacity": "150 kg",
    "Material": "Aluminum Alloy",
    "Weight": "5.5 kg",
    "Plate": "Folding Nose"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-ht-1005",
  "sku_code": "JNS-HT-1005",
  "barcode": "885110002005",
  "part_name": "Heavy Duty Drum Handling Hand Truck 450 kg (with Safety Chain & 4 Wheels)",
  "part_name_lo": "ລົດເຂັນຖັງນ້ຳມັນ 200 ລິດ ຮັບນ້ຳໜັກ 450 ກິໂລ (ພ້ອມໂສ້ລັອກນິລະໄພ)",
  "category": "Hand Trucks",
  "pre_category_id": "mhe-forklifts",
  "description": "Ergonomic 4-wheel drum truck for moving and dispensing standard 55-gallon / 200L oil drums safely.",
  "description_lo": "ລົດເຂັນຖັງນ້ຳມັນ 200 ລິດ 4 ລໍ້ ພ້ອມໂສ້ຮັດນິລະໄພ ຊ່ວຍຜ່ອນແຮງ 1 ຄົນສາມາດຍົກຍ້າຍຖັງນ້ຳມັນໄດ້ສະບາຍ.",
  "image_url": "/images/catalog/real/drum_handling_truck.jpg",
  "qty_on_hand": 16,
  "unit_price": 4500,
  "currency": "THB",
  "specs": {
    "Capacity": "450 kg",
    "Drum Size": "200 Liters (55 Gallon)",
    "Wheels": "Rubber + Rear Swivel",
    "Safety": "Locking Chain"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-ht-1006",
  "sku_code": "JNS-HT-1006",
  "barcode": "885110002006",
  "part_name": "3-Tier Heavy Duty Utility Service Cart (Swivel Casters with Brake)",
  "part_name_lo": "ລົດເຂັນ 3 ຊັ້ນອະເນກປະສົງ ສຳລັບສາງ ແລະ ໂຮງງານ (ລໍ້ PU ລັອກໄດ້)",
  "category": "Hand Trucks",
  "pre_category_id": "mhe-forklifts",
  "description": "Multi-purpose 3-shelf mobile service cart for tools, parts picking, and warehouse assembly.",
  "description_lo": "ລົດເຂັນ 3 ຊັ້ນ ຮັບນ້ຳໜັກ 250 kg ຂອບຍົກສູງກັນຂອງຕົກ ລໍ້ PU 4 ນິ້ວ ລັອກຄູ່ ເໝາະສຳລັບຈັດສິນຄ້າ & ຊ່າງສ້ອມແປງ.",
  "image_url": "/images/catalog/real/foldable_platform_trolley.jpg",
  "qty_on_hand": 25,
  "unit_price": 2850,
  "currency": "THB",
  "specs": {
    "Capacity": "250 kg",
    "Shelves": "3 Tiers",
    "Dimensions": "850 x 480 x 1000 mm",
    "Wheels": "PU with Brakes"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-ht-1007",
  "sku_code": "JNS-HT-1007",
  "barcode": "885110002007",
  "part_name": "Stainless Steel 304 Platform Trolley 300 kg (Food & Cleanroom Grade)",
  "part_name_lo": "ລົດເຂັນສະແຕນເລດ 304 ຮັບນ້ຳໜັກ 300 ກິໂລ (ມາດຕະຖານອາຫານ & ຢາ)",
  "category": "Hand Trucks",
  "pre_category_id": "mhe-forklifts",
  "description": "Rustproof 100% SUS304 stainless steel flatbed cart for pharmaceutical, cleanroom, and food processing plants.",
  "description_lo": "ລົດເຂັນສະແຕນເລດ SUS 304 ແທ້ 100% ບໍ່ເປັນໝ້ຽງ ທົນຕໍ່ສານເຄມີ ມາດຕະຖານຫ້ອງສະອາດ Cleanroom & GMP.",
  "image_url": "/images/catalog/real/foldable_platform_trolley.jpg",
  "qty_on_hand": 12,
  "unit_price": 5900,
  "currency": "THB",
  "specs": {
    "Capacity": "300 kg",
    "Material": "Stainless Steel SUS304",
    "Platform Size": "900 x 600 mm",
    "Grade": "Pharma/Food"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-ht-1008",
  "sku_code": "JNS-HT-1008",
  "barcode": "885110002008",
  "part_name": "Heavy Duty Wire Mesh Cage Trolley with Double Doors 500 kg",
  "part_name_lo": "ລົດເຂັນກະບະຕາໜ່າງເຫຼັກ 2 ປະຕູ 500 ກິໂລ (ປ້ອງກັນສິນຄ້າຕົກຫຼົ່ນ)",
  "category": "Hand Trucks",
  "pre_category_id": "mhe-forklifts",
  "description": "Enclosed security wire mesh cage trolley with lockable double front doors for high-value warehouse items.",
  "description_lo": "ລົດເຂັນກະບະຕາໜ່າງເຫຼັກ 2 ປະຕູ ສາມາດຄ້ອງກະແຈລັອກໄດ້ ປ້ອງກັນສິນຄ້າສູນຫາຍ ຫຼື ຕົກຫຼົ່ນຂະນະເຄື່ອນຍ້າຍ.",
  "image_url": "/images/catalog/real/mesh_cage_trolley.jpg",
  "qty_on_hand": 15,
  "unit_price": 6800,
  "currency": "THB",
  "specs": {
    "Capacity": "500 kg",
    "Dimensions": "1100 x 700 x 1200 mm",
    "Mesh": "50x50 mm Steel",
    "Doors": "Double Lockable"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-ht-1009",
  "sku_code": "JNS-HT-1009",
  "barcode": "885110002009",
  "part_name": "Compact Foldable Luggage & Box Cart 100 kg",
  "part_name_lo": "ລົດເຂັນກະເປົາ & ກ່ອງພັບເກັບໄດ້ 100 ກິໂລ (ລໍ້ TPR ງຽບ)",
  "category": "Hand Trucks",
  "pre_category_id": "mhe-forklifts",
  "description": "Everyday folding utility hand truck with bungee cord for office deliveries and light parcel handling.",
  "description_lo": "ລົດເຂັນພັບໄດ້ຂະໜາດກະທັດຮັດ ພ້ອມສາຍຢາງຮັດ ຮັບນ້ຳໜັກ 100 kg ເໝາະສຳລັບຫ້ອງການ, ຂົນສົ່ງພັດສະດຸ ແລະ ຮ້ານຄ້າ.",
  "image_url": "/images/catalog/real/aluminum_hand_truck.jpg",
  "qty_on_hand": 50,
  "unit_price": 990,
  "currency": "THB",
  "specs": {
    "Capacity": "100 kg",
    "Weight": "3.8 kg",
    "Feature": "Free Elastic Bungee Cord",
    "Wheel": "Quiet Rubber"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jlg-1930es",
  "sku_code": "JLG-1930ES",
  "barcode": "885110012001",
  "part_name": "JLG 1930ES Electric Scissor Lift (7.72 m Working Height, Indoor Pro)",
  "part_name_lo": "ລົດກະເຊົ້າໄຟຟ້າຂາກະໄກ່ JLG 1930ES (ຄວາມສູງເຮັດວຽກ 7.72 ມ, ງຽບ ໄຮ້ມົນລະພິດ)",
  "category": "Access Platforms",
  "pre_category_id": "mhe-forklifts",
  "brand": "JLG reaching out",
  "description": "Quiet electric drive scissor lift with long duty cycles, zero emissions, and 230 kg platform capacity.",
  "description_lo": "ລົດກະເຊົ້າໄຟຟ້າຂາກະໄກ່ JLG ມາດຕະຖານ USA ຄວາມສູງເຮັດວຽກ 7.72 ມ ຂັບເຄື່ອນດ້ວຍໄຟຟ້າແທ້ ປະຢັດພະລັງງານສູງ.",
  "image_url": "/images/catalog/real/electric_scissor_lift.jpg",
  "qty_on_hand": 5,
  "unit_price": 485000,
  "currency": "THB",
  "specs": {
    "Working Height": "7.72 m",
    "Platform Capacity": "230 kg",
    "Drive": "Electric Front Wheel",
    "Origin": "JLG USA"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jlg-2632es",
  "sku_code": "JLG-2632ES",
  "barcode": "885110012002",
  "part_name": "JLG 2632ES Electric Scissor Lift (9.77 m Working Height)",
  "part_name_lo": "ລົດກະເຊົ້າໄຟຟ້າຂາກະໄກ່ JLG 2632ES (ຄວາມສູງເຮັດວຽກ 9.77 ມ, ແບັດເຕີຣີ Deep-Cycle)",
  "category": "Access Platforms",
  "pre_category_id": "mhe-forklifts",
  "brand": "JLG reaching out",
  "description": "Narrow aisle electric scissor lift designed to pass through standard single doorways with ease.",
  "description_lo": "ລົດກະເຊົ້າໄຟຟ້າຂາກະໄກ່ ຄວາມສູງເຮັດວຽກ 9.77 ມ ຕົວລົດແຄບພຽງ 0.81 ມ ສາມາດຜ່ານປະຕູມາດຕະຖານໄດ້ສະບາຍ.",
  "image_url": "/images/catalog/real/electric_scissor_lift.jpg",
  "qty_on_hand": 4,
  "unit_price": 590000,
  "currency": "THB",
  "specs": {
    "Working Height": "9.77 m",
    "Machine Width": "0.81 m",
    "Platform Capacity": "230 kg",
    "Power": "24V DC Deep Cycle"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jlg-3246es",
  "sku_code": "JLG-3246ES",
  "barcode": "885110012003",
  "part_name": "JLG 3246ES Electric Scissor Lift (11.68 m Working Height)",
  "part_name_lo": "ລົດກະເຊົ້າໄຟຟ້າ JLG 3246ES (ຄວາມສູງ 11.68 ມ, ຮັບນ້ຳໜັກ 320 kg)",
  "category": "Access Platforms",
  "pre_category_id": "mhe-forklifts",
  "brand": "JLG reaching out",
  "description": "High-capacity electric scissor lift with roll-out deck extension for maintenance and MEP installations.",
  "description_lo": "ລົດກະເຊົ້າໄຟຟ້າຂາກະໄກ່ JLG ຄວາມສູງເຮັດວຽກ 11.68 ມ ພື້ນກະເຊົ້າຍືດຂະຫຍາຍໄດ້ ຮັບນ້ຳໜັກໄດ້ເຖິງ 320 kg.",
  "image_url": "/images/catalog/real/electric_scissor_lift.jpg",
  "qty_on_hand": 3,
  "unit_price": 720000,
  "currency": "THB",
  "specs": {
    "Working Height": "11.68 m",
    "Platform Capacity": "320 kg",
    "Extension Deck": "0.91 m",
    "Weight": "2,740 kg"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jlg-e450aj",
  "sku_code": "JLG-E450AJ",
  "barcode": "885110012004",
  "part_name": "JLG E450AJ Electric Articulating Boom Lift (15.72 m Working Height)",
  "part_name_lo": "ລົດກະເຊົ້າບູມຫັກພັບໄຟຟ້າ JLG E450AJ (ຄວາມສູງ 15.72 ມ, ເຮັດວຽກຂ້າມສິ່ງກີດຂວາງ)",
  "category": "Access Platforms",
  "pre_category_id": "mhe-forklifts",
  "brand": "JLG reaching out",
  "description": "Zero-emission articulating electric boom lift with jib for high maneuverability around obstacles.",
  "description_lo": "ລົດກະເຊົ້າບູມຫັກພັບໄຟຟ້າ JLG ຄວາມສູງ 15.72 ມ ໄລຍະເອື້ອມ 7.24 ມ ໝູນກະເຊົ້າໄດ້ 180° ເຂົ້າເຖິງທຸກຈຸດອຸປະສັກ.",
  "image_url": "/images/catalog/real/articulating_boom_lift.jpg",
  "qty_on_hand": 2,
  "unit_price": 1450000,
  "currency": "THB",
  "specs": {
    "Working Height": "15.72 m",
    "Horizontal Outreach": "7.24 m",
    "Up & Over Height": "7.70 m",
    "Power": "48V Electric"
  },
  "lead_time": "In Stock (Vientiane)",
  "warranty_months": 12
},
  {
  "sku_id": "jlg-660sj",
  "sku_code": "JLG-660SJ",
  "barcode": "885110012005",
  "part_name": "JLG 660SJ Telescopic Boom Lift Diesel 4WD (22.31 m Working Height)",
  "part_name_lo": "ລົດກະເຊົ້າບູມຍືດກົງດີເຊວ 4WD JLG 660SJ (ຄວາມສູງ 22.31 ມ, ສຳລັບໂຄງການກໍ່ສ້າງໜັກ)",
  "category": "Access Platforms",
  "pre_category_id": "mhe-forklifts",
  "brand": "JLG reaching out",
  "description": "Heavy-duty rough-terrain diesel telescopic boom with 17.5 m outreach and 4WD oscillating axle.",
  "description_lo": "ລົດກະເຊົ້າບູມຍືດກົງດີເຊວ 4WD JLG 660SJ ຄວາມສູງເຮັດວຽກ 22.31 ມ ໄລຍະເອື້ອມໄກ 17.5 ມ ພ້ອມລຸຍທຸກສະພາບພື້ນທີ່.",
  "image_url": "/images/catalog/real/articulating_boom_lift.jpg",
  "qty_on_hand": 2,
  "unit_price": 2850000,
  "currency": "THB",
  "specs": {
    "Working Height": "22.31 m",
    "Horizontal Outreach": "17.50 m",
    "Engine": "Deutz Diesel",
    "Drive": "4WD Oscillating"
  },
  "lead_time": "In Stock (3-5 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jlg-toucan10e",
  "sku_code": "JLG-TOUCAN10E",
  "barcode": "885110012006",
  "part_name": "JLG Toucan 10E Compact Vertical Mast Lift (10.10 m Working Height)",
  "part_name_lo": "ລົດກະເຊົ້າເສົາຕັ້ງຄອນແພັກ JLG Toucan 10E (ຄວາມສູງ 10.10 ມ, ວົງລ້ຽວແຄບພິເສດ)",
  "category": "Access Platforms",
  "pre_category_id": "mhe-forklifts",
  "brand": "JLG reaching out",
  "description": "Ultra-compact vertical mast lift with articulating jib for tight warehouse maintenance and retail aisles.",
  "description_lo": "ລົດກະເຊົ້າເສົາຕັ້ງໄຟຟ້າ JLG Toucan 10E ຄວາມສູງ 10.10 ມ ວົງລ້ຽວສູນ Zero Tailswing ເໝາະສຳລັບຊ່ອງທາງແຄບໃນສາງ.",
  "image_url": "/images/catalog/real/electric_scissor_lift.jpg",
  "qty_on_hand": 3,
  "unit_price": 890000,
  "currency": "THB",
  "specs": {
    "Working Height": "10.10 m",
    "Horizontal Outreach": "3.38 m",
    "Tailswing": "Zero",
    "Weight": "2,990 kg"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "cum-c55d5",
  "sku_code": "CUM-C55D5",
  "barcode": "885110011001",
  "part_name": "Cummins C55D5 Industrial Silent Diesel Generator 50 kVA / 40 kW (4BTA3.9-G2)",
  "part_name_lo": "ຈັກປັ່ນໄຟຟ້າດີເຊວ Cummins C55D5 50 kVA / 40 kW (ຕູ້ເກັບສຽງ Silent Canopy, ສະຕາດອັດຕະໂນມັດ ATS)",
  "category": "Generators",
  "pre_category_id": "mhe-forklifts",
  "brand": "Cummins Power Generation",
  "description": "Heavy duty silent canopy standby diesel generator set powered by Cummins 4BTA3.9-G2 with Stamford alternator.",
  "description_lo": "ຈັກປັ່ນໄຟຟ້າ Cummins ແທ້ 50 kVA ເຄື່ອງຈັກ 4BTA3.9 ໄດຊາດ Stamford ຕູ້ເກັບສຽງມາດຕະຖານໂຮງງານ 68 dB.",
  "image_url": "/images/catalog/real/cummins_generator_canopy.jpg",
  "qty_on_hand": 4,
  "unit_price": 380000,
  "currency": "THB",
  "specs": {
    "Standby Power": "55 kVA / 44 kW",
    "Prime Power": "50 kVA / 40 kW",
    "Engine": "Cummins 4BTA3.9-G2",
    "Noise": "68 dB(A) @ 7m"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "cum-c110d5",
  "sku_code": "CUM-C110D5",
  "barcode": "885110011002",
  "part_name": "Cummins C110D5 Industrial Silent Diesel Generator 100 kVA / 80 kW (6BT5.9-G2)",
  "part_name_lo": "ຈັກປັ່ນໄຟຟ້າດີເຊວ Cummins C110D5 100 kVA / 80 kW (ຕູ້ເກັບສຽງ ມາດຕະຖານສາກົນ)",
  "category": "Generators",
  "pre_category_id": "mhe-forklifts",
  "brand": "Cummins Power Generation",
  "description": "Reliable 6-cylinder Cummins 6BT5.9-G2 turbo diesel generator set for continuous factory operations.",
  "description_lo": "ຈັກປັ່ນໄຟຟ້າ Cummins 100 kVA 6 ສູບ ເຄື່ອງຈັກ 6BT5.9-G2 ເທີ້ໂບ ລະບົບຄວບຄຸມດິຈິຕອນ ສະຕາດອັດຕະໂນມັດ ATS ພ້ອມໃຊ້.",
  "image_url": "/images/catalog/real/cummins_generator_canopy.jpg",
  "qty_on_hand": 3,
  "unit_price": 520000,
  "currency": "THB",
  "specs": {
    "Standby Power": "110 kVA / 88 kW",
    "Prime Power": "100 kVA / 80 kW",
    "Engine": "Cummins 6BT5.9-G2",
    "Alternator": "Stamford UCI274C"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "cum-c250d5",
  "sku_code": "CUM-C250D5",
  "barcode": "885110011003",
  "part_name": "Cummins C250D5 Industrial Silent Diesel Generator 250 kVA / 200 kW (6CTAA8.3-G2)",
  "part_name_lo": "ຈັກປັ່ນໄຟຟ້າດີເຊວ Cummins C250D5 250 kVA / 200 kW (ລະບົບ PowerCommand ຄວບຄຸມດິຈິຕອນ)",
  "category": "Generators",
  "pre_category_id": "mhe-forklifts",
  "brand": "Cummins Power Generation",
  "description": "High performance 250 kVA diesel generator with PowerCommand 1.1 microprocessor controller for hospital and plant backup.",
  "description_lo": "ຈັກປັ່ນໄຟຟ້າ Cummins 250 kVA ເຄື່ອງຈັກ 6CTAA8.3 ລະບົບ PowerCommand ຮອງຮັບການເຊື່ອມຕໍ່ລະບົບໄຟຟ້າໂຮງງານໃຫຍ່.",
  "image_url": "/images/catalog/real/cummins_generator_canopy.jpg",
  "qty_on_hand": 2,
  "unit_price": 890000,
  "currency": "THB",
  "specs": {
    "Standby Power": "250 kVA / 200 kW",
    "Prime Power": "225 kVA / 180 kW",
    "Engine": "Cummins 6CTAA8.3-G2",
    "Controller": "PowerCommand 1.1"
  },
  "lead_time": "In Stock (3-5 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "cum-c1000d5",
  "sku_code": "CUM-C1000D5",
  "barcode": "885110011004",
  "part_name": "Cummins C1000D5 Containerized Heavy Diesel Generator 1000 kVA / 800 kW (KTA38-G5)",
  "part_name_lo": "ຈັກປັ່ນໄຟຟ້າຂະໜາດໃຫຍ່ຕູ້ຄອນເທນເນີ Cummins C1000D5 1000 kVA / 800 kW (ສຳລັບບໍ່ແຮ່ & ໂຮງງານໃຫຍ່)",
  "category": "Generators",
  "pre_category_id": "mhe-forklifts",
  "brand": "Cummins Power Generation",
  "description": "Massive 20ft containerized 1000 kVA V12 Cummins KTA38-G5 generator for mining sites, data centers, and heavy grids.",
  "description_lo": "ຈັກປັ່ນໄຟຟ້າຂະໜາດຍັກ 1000 kVA V12 Cummins KTA38-G5 ຕູ້ຄອນເທນເນີ 20 ຟຸດ ສຳລັບເຂດບໍ່ແຮ່ ແລະ ໂຮງງານອຸດສາຫະກຳໜັກ.",
  "image_url": "/images/catalog/real/containerized_diesel_generator.jpg",
  "qty_on_hand": 1,
  "unit_price": 3450000,
  "currency": "THB",
  "specs": {
    "Standby Power": "1100 kVA / 880 kW",
    "Prime Power": "1000 kVA / 800 kW",
    "Engine": "Cummins KTA38-G5 V12",
    "Enclosure": "20ft ISO Container"
  },
  "lead_time": "In Stock (5-7 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-bin-1002",
  "sku_code": "JNS-BIN-1002",
  "barcode": "885110023002",
  "part_name": "Stackable Parts Bin Size #1 (L105 x W140 x H75 mm) - Heavy Duty PP",
  "part_name_lo": "ກ່ອງອາໄຫຼ່ຊ້ອນໄດ້ ເບີ 1 (ຂະໜາດ 105x140x75 ມມ) ພາດສະຕິກ PP ໜາ",
  "category": "Plastic Bins",
  "pre_category_id": "warehouse-storage",
  "description": "Compact stackable parts tray bin for screws, electronic parts, and small hardware components.",
  "description_lo": "ກ່ອງອາໄຫຼ່ຊ້ອນກັນໄດ້ ເບີ 1 ພາດສະຕິກ PP ທົນແຮງກະແທກ ພ້ອມຊ່ອງສຽບປ້າຍຊື່ດ້ານໜ້າ ສຳລັບຈັດເກັບນັອດ ແລະ ອຸປະກອນນ້ອຍ.",
  "image_url": "/images/catalog/real/stackable_parts_bins.jpg",
  "qty_on_hand": 500,
  "unit_price": 45,
  "currency": "THB",
  "specs": {
    "Dimensions": "105 x 140 x 75 mm",
    "Material": "PP Copolymer",
    "Color": "Blue / Red / Yellow",
    "Stackable": "Yes with Risers"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-bin-1003",
  "sku_code": "JNS-BIN-1003",
  "barcode": "885110023003",
  "part_name": "Stackable Parts Bin Size #2 (L140 x W220 x H125 mm)",
  "part_name_lo": "ກ່ອງອາໄຫຼ່ຊ້ອນໄດ້ ເບີ 2 (ຂະໜາດ 140x220x125 ມມ) ສີຟ້າ/ສີແດງ",
  "category": "Plastic Bins",
  "pre_category_id": "warehouse-storage",
  "description": "Standard industrial parts bin with reinforced side ribs and front grip handle.",
  "description_lo": "ກ່ອງອາໄຫຼ່ຊ້ອນໄດ້ ເບີ 2 ຂະໜາດຍອດນິຍົມ ສຳລັບຫ້ອງອາໄຫຼ່ ແລະ ສາງເກັບເຄື່ອງມື ຮັບນ້ຳໜັກໄດ້ 15 kg ຕໍ່ຊັ້ນ.",
  "image_url": "/images/catalog/real/stackable_parts_bins.jpg",
  "qty_on_hand": 350,
  "unit_price": 95,
  "currency": "THB",
  "specs": {
    "Dimensions": "140 x 220 x 125 mm",
    "Load Capacity": "15 kg",
    "Stack Load": "60 kg",
    "Material": "Heavy PP"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-bin-1004",
  "sku_code": "JNS-BIN-1004",
  "barcode": "885110023004",
  "part_name": "Jumbo Industrial Parts Storage Bin Size #4 (L300 x W480 x H180 mm)",
  "part_name_lo": "ກ່ອງອາໄຫຼ່ອຸດສາຫະກຳຂະໜາດໃຫຍ່ ເບີ 4 (ຂະໜາດ 300x480x180 ມມ ຮັບນ້ຳໜັກ 30 kg)",
  "category": "Plastic Bins",
  "pre_category_id": "warehouse-storage",
  "description": "Large capacity heavy-duty parts bin for bulky workshop parts, pipes, and electrical fittings.",
  "description_lo": "ກ່ອງອາໄຫຼ່ຈັມໂບ້ ເບີ 4 ຮັບນ້ຳໜັກ 30 kg ປາກກວ້າງ ຢິບງ່າຍ ສາມາດແຂວນແຜງ Louver Panel ຫຼື ວາງເທິງຊັ້ນ Shelving ໄດ້.",
  "image_url": "/images/catalog/real/stackable_parts_bins.jpg",
  "qty_on_hand": 180,
  "unit_price": 240,
  "currency": "THB",
  "specs": {
    "Dimensions": "300 x 480 x 180 mm",
    "Load Capacity": "30 kg",
    "Feature": "Rear Hanging Lip",
    "Material": "Virgin PP"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-bin-1005",
  "sku_code": "JNS-BIN-1005",
  "barcode": "885110023005",
  "part_name": "Heavy Duty Solid Plastic Container Crate 600x400x300 mm",
  "part_name_lo": "ລັງພາດສະຕິກທຶບອຸດສາຫະກຳ 600x400x300 ມມ (ຮັບນ້ຳໜັກ 50 kg ຊ້ອນໄດ້)",
  "category": "Plastic Bins",
  "pre_category_id": "warehouse-storage",
  "description": "Standard Euro size solid plastic container box with ergonomic handgrips and flat base for conveyors.",
  "description_lo": "ລັງພາດສະຕິກທຶບ Euro Standard 600x400x300 ມມ ພື້ນຮາບລຽບແລ່ນສາຍພານໄດ້ ຊ້ອນກັນໄດ້ໝັ້ນຄົງ ຮັບນ້ຳໜັກ 50 kg.",
  "image_url": "/images/catalog/real/solid_plastic_crates.jpg",
  "qty_on_hand": 200,
  "unit_price": 380,
  "currency": "THB",
  "specs": {
    "Dimensions": "600 x 400 x 300 mm",
    "Volume": "55 Liters",
    "Load Capacity": "50 kg",
    "Conveyor Friendly": "Yes"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-bin-1006",
  "sku_code": "JNS-BIN-1006",
  "barcode": "885110023006",
  "part_name": "Ventilated Perforated Plastic Crate 600x400x260 mm",
  "part_name_lo": "ລັງພາດສະຕິກໂປ່ງ 600x400x260 ມມ (ລະບາຍອາກາດດີ ສຳລັບສິນຄ້າກະເສດ & ຫ້ອງເຢັນ)",
  "category": "Plastic Bins",
  "pre_category_id": "warehouse-storage",
  "description": "Perforated mesh plastic crate for cold chain logistics, fruits, vegetables, and food processing.",
  "description_lo": "ລັງພາດສະຕິກໂປ່ງລະບາຍອາກາດດີ ທົນອຸນຫະພູມຕິດລົບ -25°C ຮອດ +60°C ເໝາະສຳລັບຫ້ອງເຢັນ, ຜັກ-ໝາກໄມ້ ແລະ ສິນຄ້າກະເສດ.",
  "image_url": "/images/catalog/real/solid_plastic_crates.jpg",
  "qty_on_hand": 250,
  "unit_price": 290,
  "currency": "THB",
  "specs": {
    "Dimensions": "600 x 400 x 260 mm",
    "Temp Resistance": "-25°C to +60°C",
    "Load": "40 kg",
    "Stackable": "Yes"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-bin-1007",
  "sku_code": "JNS-BIN-1007",
  "barcode": "885110023007",
  "part_name": "Collapsible Foldable Plastic Container Box 600x400x340 mm",
  "part_name_lo": "ລັງພາດສະຕິກພັບໄດ້ 600x400x340 ມມ (ປະຢັດພື້ນທີ່ຂົນສົ່ງຂາກັບ 75%)",
  "category": "Plastic Bins",
  "pre_category_id": "warehouse-storage",
  "description": "Space-saving folding logistics crate that reduces return-trip transport volume by 75%.",
  "description_lo": "ລັງພາດສະຕິກພັບໄດ້ ຂະໜາດ 600x400x340 ມມ ເມື່ອພັບລົງສູງພຽງ 80 ມມ ຊ່ວຍປະຢັດຄ່າຂົນສົ່ງຂາກັບໄດ້ເຖິງ 75%.",
  "image_url": "/images/catalog/real/solid_plastic_crates.jpg",
  "qty_on_hand": 120,
  "unit_price": 550,
  "currency": "THB",
  "specs": {
    "Open Dimensions": "600 x 400 x 340 mm",
    "Folded Height": "80 mm",
    "Volume": "65 L",
    "Volume Reduction": "75%"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-bin-1008",
  "sku_code": "JNS-BIN-1008",
  "barcode": "885110023008",
  "part_name": "Heavy-Duty Rackable Euro Plastic Pallet 1200x1000x150 mm (Steel Reinforced)",
  "part_name_lo": "ພາເລດພາດສະຕິກຂຶ້ນຊັ້ນວາງ Racking 1200x1000 ມມ (ເສີມເຫຼັກ ຮັບນ້ຳໜັກ 1.5 ໂຕນ)",
  "category": "Plastic Bins",
  "pre_category_id": "warehouse-storage",
  "description": "Steel pipe reinforced 3-runner plastic pallet designed for selective beam racks and automated high-bays.",
  "description_lo": "ພາເລດພາດສະຕິກຂຶ້ນຊັ້ນວາງສາງ Selective Racking ເສີມທໍ່ເຫຼັກພາຍໃນ ຮັບນ້ຳໜັກ Dynamic 1.5 ໂຕນ, Static 6 ໂຕນ, Rack 1.2 ໂຕນ.",
  "image_url": "/images/catalog/real/solid_plastic_crates.jpg",
  "qty_on_hand": 80,
  "unit_price": 1650,
  "currency": "THB",
  "specs": {
    "Dimensions": "1200 x 1000 x 150 mm",
    "Racking Load": "1,200 kg",
    "Static Load": "6,000 kg",
    "Internal Steel": "4 Tubes"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-bin-1009",
  "sku_code": "JNS-BIN-1009",
  "barcode": "885110023009",
  "part_name": "ESD Conductive Anti-Static Parts Bin for Electronics (Surface Resistance 10^4-10^6 Ohm)",
  "part_name_lo": "ກ່ອງອາໄຫຼ່ປ້ອງກັນໄຟຟ້າສະຖິດ ESD (ສຳລັບຊິ້ນສ່ວນເອເລັກໂຕຣນິກ)",
  "category": "Plastic Bins",
  "pre_category_id": "warehouse-storage",
  "description": "Conductive black PP bin to protect delicate microchips, PCBs, and semiconductor parts from electrostatic discharge.",
  "description_lo": "ກ່ອງອາໄຫຼ່ປ້ອງກັນໄຟຟ້າສະຖິດ ESD ສີດຳ ຄ່າຄວາມຕ້ານທານ 10^4-10^6 Ohm ປ້ອງກັນຊິບ, PCB ແລະ ໄອຊີ ຈາກຄວາມເສຍຫາຍ.",
  "image_url": "/images/catalog/real/stackable_parts_bins.jpg",
  "qty_on_hand": 150,
  "unit_price": 185,
  "currency": "THB",
  "specs": {
    "Surface Resistance": "10^4 - 10^6 Ohm",
    "Material": "Carbon Conductive PP",
    "Size": "140 x 220 x 125 mm",
    "Standard": "IEC 61340-5-1"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-asrs-1002",
  "sku_code": "JNS-ASRS-1002",
  "barcode": "885110013002",
  "part_name": "Intelligent High-Density Radio Pallet Shuttle System 1500 kg (Li-ion Fast Charging)",
  "part_name_lo": "ລະບົບລົດຮັບ-ສົ່ງສິນຄ້າອັດຕະໂນມັດ Radio Pallet Shuttle 1500 kg (ແບັດ Lithium ສາກໄວ)",
  "category": "Automated Systems",
  "pre_category_id": "warehouse-storage",
  "description": "Autonomous radio-controlled shuttle vehicle for deep-lane pallet storage with WMS remote dispatching.",
  "description_lo": "ລະບົບລົດ Shuttle ອັດສະລິຍະແລ່ນໃນຊ່ອງຊັ້ນວາງເລິກ ຄວບຄຸມດ້ວຍຣີໂມດ/WMS ຮັບນ້ຳໜັກ 1500 kg ປະຢັດພື້ນທີ່ສາງ 300%.",
  "image_url": "/images/catalog/real/radio_pallet_shuttle.jpg",
  "qty_on_hand": 3,
  "unit_price": 420000,
  "currency": "THB",
  "specs": {
    "Pallet Capacity": "1,500 kg",
    "Speed Loaded": "0.8 m/s",
    "Battery": "Lithium-Ion 24V",
    "Charging Time": "3 Hours"
  },
  "lead_time": "Project Turnkey (15-30 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-asrs-1003",
  "sku_code": "JNS-ASRS-1003",
  "barcode": "885110013003",
  "part_name": "Automated AS/RS Mini-Load Stacker Crane System (300 kg Tote / Carton Handling)",
  "part_name_lo": "ລະບົບເຄຣນຈັດເກັບສິນຄ້າອັດຕະໂນມັດ AS/RS Mini-Load 300 kg (ຄວາມໄວສູງ 240 m/min)",
  "category": "Automated Systems",
  "pre_category_id": "warehouse-storage",
  "description": "High-speed automated mini-load AS/RS stacker crane for carton and plastic tote bin storage up to 20m high.",
  "description_lo": "ລະບົບເຄຣນ AS/RS Mini-Load ອັດຕະໂນມັດສຳລັບກ່ອງ ແລະ ລັງສິນຄ້າ ຄວາມສູງເຖິງ 20 ມ ຄວາມໄວລຳລຽງ 240 m/min ແມ່ຍຳ 100%.",
  "image_url": "/images/solutions/automated-high-bay-racking-shuttle.png",
  "qty_on_hand": 2,
  "unit_price": 1850000,
  "currency": "THB",
  "specs": {
    "Payload": "300 kg",
    "Max Height": "20 Meters",
    "Travel Speed": "240 m/min",
    "Interface": "WMS / ERP Direct API"
  },
  "lead_time": "Project Turnkey (30-45 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-asrs-1004",
  "sku_code": "JNS-ASRS-1004",
  "barcode": "885110013004",
  "part_name": "Vertical Lift Module (VLM) PRK-3000 Automatic Parts Carousel (10 m Height)",
  "part_name_lo": "ຕູ້ຈັດເກັບອາໄຫຼ່ອັດຕະໂນມັດແນວຕັ້ງ VLM PRK-3000 (ຄວາມສູງ 10 ມ, ປະຢັດພື້ນທີ່ 85%)",
  "category": "Automated Systems",
  "pre_category_id": "warehouse-storage",
  "description": "Goods-to-person enclosed automated vertical storage elevator with internal extractor and touch-screen picking.",
  "description_lo": "ຕູ້ລິຟເກັບອາໄຫຼ່ອັດຕະໂນມັດແນວຕັ້ງ VLM ຄວາມສູງ 10 ມ ຖາດສິນຄ້າຈະມາຫາຄົນຢິບອັດຕະໂນມັດ ປະຢັດພື້ນທີ່ສາງ 85%.",
  "image_url": "/images/solutions/automated-high-bay-racking-shuttle.png",
  "qty_on_hand": 2,
  "unit_price": 2400000,
  "currency": "THB",
  "specs": {
    "Tray Capacity": "500 kg/tray",
    "Height": "10.0 m",
    "Tray Dimensions": "2450 x 825 mm",
    "Principle": "Goods-to-Person"
  },
  "lead_time": "Project Turnkey (30-45 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-asrs-1005",
  "sku_code": "JNS-ASRS-1005",
  "barcode": "885110013005",
  "part_name": "Autonomous Mobile Robot (AMR) 500 kg with QR/SLAM Navigation",
  "part_name_lo": "ຫຸ່ນຍົນລຳລຽງສິນຄ້າອັດຕະໂນມັດ AMR 500 kg (ລະບົບນຳທາງ SLAM Laser ໄຮ້ແຖບແມ່ເຫຼັກ)",
  "category": "Automated Systems",
  "pre_category_id": "warehouse-storage",
  "description": "Natural feature SLAM navigation AMR robot for cross-docking, tote transfer, and shelf lifting without magnetic tape.",
  "description_lo": "ຫຸ່ນຍົນອັດສະລິຍະ AMR 500 kg ນຳທາງດ້ວຍ LiDAR SLAM Laser ບໍ່ຕ້ອງຕິດເທບແມ່ເຫຼັກ ຫຼົບຫຼີກຄົນ ແລະ ສິ່ງກີດຂວາງໄດ້ເອງ.",
  "image_url": "/images/catalog/real/autonomous_mobile_robot.jpg",
  "qty_on_hand": 4,
  "unit_price": 650000,
  "currency": "THB",
  "specs": {
    "Payload": "500 kg",
    "Navigation": "LiDAR SLAM + QR Fallback",
    "Battery": "Li-ion Auto-docking",
    "Safety": "360° Safety LiDAR"
  },
  "lead_time": "In Stock (10-15 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-asrs-1006",
  "sku_code": "JNS-ASRS-1006",
  "barcode": "885110013006",
  "part_name": "Automated Pallet Roller & Chain Conveyor Transfer Loop",
  "part_name_lo": "ລະບົບສາຍພານລຳລຽງພາເລດອັດຕະໂນມັດ Roller & Chain Loop (ຄວາມໄວ 18 m/min)",
  "category": "Automated Systems",
  "pre_category_id": "warehouse-storage",
  "description": "Heavy-duty motorized roller conveyor section with pneumatic pop-up chain transfer for pallet sorting.",
  "description_lo": "ລະບົບສາຍພານໂລເລີລຳລຽງພາເລດອັດຕະໂນມັດ ພ້ອມຊຸດໂສ້ຍົກປ່ຽນທິດທາງ 90 ອົງສາ ຮັບນ້ຳໜັກ 1.5 ໂຕນຕໍ່ພາເລດ.",
  "image_url": "/images/catalog/real/radio_pallet_shuttle.jpg",
  "qty_on_hand": 5,
  "unit_price": 780000,
  "currency": "THB",
  "specs": {
    "Pallet Load": "1,500 kg/m",
    "Roller Diameter": "89 mm Steel",
    "Speed": "18 m/min",
    "Control": "Siemens S7 PLC"
  },
  "lead_time": "Project Turnkey (20-30 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-asrs-1007",
  "sku_code": "JNS-ASRS-1007",
  "barcode": "885110013007",
  "part_name": "Laser Guided AGV Automated Forklift Counterbalance 2.0 Tons",
  "part_name_lo": "ລົດຍົກອັດຕະໂນມັດ AGV Laser Guided 2.0 ໂຕນ (ເຮັດວຽກ 24/7 ໄຮ້ຄົນຂັບ)",
  "category": "Automated Systems",
  "pre_category_id": "warehouse-storage",
  "description": "Driverless laser guided autonomous forklift for automated truck loading, buffer staging, and racking input.",
  "description_lo": "ລົດຍົກໄຟຟ້າອັດຕະໂນມັດ AGV 2.0 ໂຕນ ນຳທາງດ້ວຍ Laser ຍົກສູງ 4.5 ມ ເຮັດວຽກ 24 ຊົ່ວໂມງໄຮ້ຄົນຂັບ ປອດໄພ 100%.",
  "image_url": "/images/catalog/real/radio_pallet_shuttle.jpg",
  "qty_on_hand": 2,
  "unit_price": 1950000,
  "currency": "THB",
  "specs": {
    "Capacity": "2,000 kg",
    "Lift Height": "4.5 m",
    "Navigation": "Laser Guided (LGV)",
    "Safety": "Laser Scanners + Obstacle Bumper"
  },
  "lead_time": "Project Turnkey (30-45 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "nil-sw8000",
  "sku_code": "NIL-SW8000",
  "barcode": "5711145180008",
  "part_name": "Nilfisk SW8000 Heavy Industrial Ride-On Sweeper (1970 mm Sweep Path)",
  "part_name_lo": "ລົດກວາດພື້ນອຸດສາຫະກຳໜັກແບບນັ່ງຂັບ Nilfisk SW8000 (ໜ້າກວາດ 1970 ມມ, ເຄື່ອງຈັກ Kubota)",
  "category": "Sweepers & Combi",
  "pre_category_id": "nilfisk-cleaning",
  "brand": "Nilfisk",
  "description": "Flagship heavy industrial ride-on sweeper with DustClear multi-stage dust control and 400L high dump hopper.",
  "description_lo": "ລົດກວາດພື້ນອຸດສາຫະກຳໜັກ Nilfisk SW8000 ໜ້າກວ້າງ 1.97 ມ ຖັງເກັບຂີ້ເຫຍື້ອ 400 ລິດ ຍົກເທໄຮໂດຣລິກ ມາດຕະຖານເດນມາກ.",
  "image_url": "/images/catalog/real/industrial_ride_on_sweeper.jpg",
  "qty_on_hand": 2,
  "unit_price": 980000,
  "currency": "THB",
  "specs": {
    "Working Width": "1970 mm",
    "Productivity": "29,550 m²/h",
    "Hopper Volume": "400 Liters",
    "Engine": "Kubota 4-Cylinder"
  },
  "lead_time": "In Stock (3-5 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "nil-sr1601",
  "sku_code": "NIL-SR1601",
  "barcode": "5711145180009",
  "part_name": "Nilfisk SR1601 Industrial Ride-On Dust-Free Sweeper (LPG / Diesel)",
  "part_name_lo": "ລົດກວາດພື້ນອຸດສາຫະກຳ Nilfisk SR1601 (ລະບົບຄວບຄຸມຝຸ່ນ DustGuard 1600 ມມ)",
  "category": "Sweepers & Combi",
  "pre_category_id": "nilfisk-cleaning",
  "brand": "Nilfisk",
  "description": "Highly productive dust-controlled sweeper engineered for logistics parks, parking lots, and heavy manufacturing.",
  "description_lo": "ລົດກວາດພື້ນອຸດສາຫະກຳ Nilfisk SR1601 ລະບົບ DustGuard ສີດລະອອງນ້ຳດັກຝຸ່ນ 100% ກວາດສະອາດໄຮ້ຝຸ່ນຟຸ້ງກະຈາຍ.",
  "image_url": "/images/catalog/real/industrial_ride_on_sweeper.jpg",
  "qty_on_hand": 3,
  "unit_price": 750000,
  "currency": "THB",
  "specs": {
    "Working Width": "1600 mm",
    "Hopper Capacity": "315 Liters",
    "Dust Filter Area": "10 m²",
    "Origin": "Nilfisk Denmark"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "nil-sw900",
  "sku_code": "NIL-SW900",
  "barcode": "5711145180010",
  "part_name": "Nilfisk SW900 Battery Powered Walk-Behind Sweeper (1050 mm Path)",
  "part_name_lo": "ລົດກວາດພື້ນແບັດເຕີຣີແບບຍ່າງຕາມ Nilfisk SW900 (ກວາດໄວ 3,715 m²/h, ງຽບພິເສດ)",
  "category": "Sweepers & Combi",
  "pre_category_id": "nilfisk-cleaning",
  "brand": "Nilfisk",
  "description": "Self-propelled battery walk-behind sweeper with electric filter shaker for indoor workshops and outdoor pathways.",
  "description_lo": "ລົດກວາດພື້ນແບັດເຕີຣີ Nilfisk SW900 ຂັບເຄື່ອນດ້ວຍຕົວເອງ ພ້ອມລະບົບສັ່ນກອງຝຸ່ນໄຟຟ້າ ກວາດໄວ 3,715 m²/h ງຽບ ສະອາດ.",
  "image_url": "/images/catalog/real/manual_push_sweeper.jpg",
  "qty_on_hand": 4,
  "unit_price": 165000,
  "currency": "THB",
  "specs": {
    "Working Width": "1050 mm",
    "Productivity": "3,715 m²/h",
    "Hopper": "60 Liters",
    "Power": "12V Battery Self-propelled"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "nil-sm800",
  "sku_code": "NIL-SM800",
  "barcode": "5711145180011",
  "part_name": "Nilfisk SM800 Manual Push Sweeper (840 mm Sweep Path)",
  "part_name_lo": "ເຄື່ອງກວາດພື້ນແບບຍູ້ດ້ວຍມື Nilfisk SM800 (ບໍ່ໃຊ້ໄຟຟ້າ, ເໝາະກັບໂຮງງານ ແລະ ລານຈອດ)",
  "category": "Sweepers & Combi",
  "pre_category_id": "nilfisk-cleaning",
  "brand": "Nilfisk",
  "description": "Zero electricity maintenance-free dual-brush manual sweeper that picks up leaves, bolts, and metal dust 6x faster than brooms.",
  "description_lo": "ເຄື່ອງກວາດພື້ນແບບຍູ້ດ້ວຍມື Nilfisk SM800 ບໍ່ຕ້ອງສາກໄຟ ແປງກວາດຄູ່ໄວ ກວາດໄວກວ່າຟອຍທຳມະດາ 6 ເທົ່າ.",
  "image_url": "/images/catalog/real/manual_push_sweeper.jpg",
  "qty_on_hand": 8,
  "unit_price": 28500,
  "currency": "THB",
  "specs": {
    "Working Width": "840 mm",
    "Hopper Capacity": "34 Liters",
    "Operation": "Manual Push 6x Speed",
    "Weight": "16 kg"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "nil-sw750",
  "sku_code": "NIL-SW750",
  "barcode": "5711145180012",
  "part_name": "Nilfisk SW750 Compact Battery Sweeper with On-Board Charger",
  "part_name_lo": "ເຄື່ອງກວາດພື້ນແບັດເຕີຣີ Nilfisk SW750 (ພ້ອມເຄື່ອງສາກໃນຕົວ, ສຽງງຽບພຽງ 59 dB)",
  "category": "Sweepers & Combi",
  "pre_category_id": "nilfisk-cleaning",
  "brand": "Nilfisk",
  "description": "Extremely quiet 59 dB(A) battery walk-behind sweeper ideal for daytime cleaning in stores, schools, and offices.",
  "description_lo": "ເຄື່ອງກວາດພື້ນແບັດເຕີຣີ Nilfisk SW750 ສຽງງຽບພິເສດ 59 dB ສາມາດກວາດໃນອາຄານ ແລະ ສາງຂະນະມີຄົນເຮັດວຽກໄດ້.",
  "image_url": "/images/catalog/real/manual_push_sweeper.jpg",
  "qty_on_hand": 5,
  "unit_price": 85000,
  "currency": "THB",
  "specs": {
    "Sweep Path": "720 mm",
    "Sound Level": "59 dB(A)",
    "Productivity": "2,880 m²/h",
    "Charger": "Built-in Onboard"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "nil-vhs120",
  "sku_code": "NIL-VHS120",
  "barcode": "5711145120010",
  "part_name": "Nilfisk VHS120 Heavy-Duty Industrial Vacuum for Fine & Toxic Dust (Class M/H HEPA)",
  "part_name_lo": "ເຄື່ອງດູດຝຸ່ນອຸດສາຫະກຳ Nilfisk VHS120 ສຳລັບຝຸ່ນລະອຽດ & ຝຸ່ນອັນຕະລາຍ (ກັ່ນຕອງ HEPA Class H)",
  "category": "Industrial Vacuums",
  "pre_category_id": "nilfisk-cleaning",
  "brand": "Nilfisk",
  "description": "Compact single-phase vacuum with dual bypass motors and M/H Class certified absolute HEPA filtration.",
  "description_lo": "ເຄື່ອງດູດຝຸ່ນອຸດສາຫະກຳ Nilfisk VHS120 ມໍເຕີ Bypass 2 ຕົວ ກັ່ນຕອງ HEPA Class H ດັກຝຸ່ນອັນຕະລາຍ ແລະ ຊີມັງ 99.995%.",
  "image_url": "/images/catalog/real/industrial_vacuum_cleaner_1787993454700.jpg",
  "qty_on_hand": 6,
  "unit_price": 95000,
  "currency": "THB",
  "specs": {
    "Power": "2.0 kW (2 Motors)",
    "Container": "37 Liters Removable",
    "Filtration": "HEPA 14 Certified",
    "Origin": "Nilfisk Italy"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "nil-vhb436",
  "sku_code": "NIL-VHB436",
  "barcode": "5711145120011",
  "part_name": "Nilfisk VHB436 Cordless Li-Ion Industrial Vacuum (Zero Emission)",
  "part_name_lo": "ເຄື່ອງດູດຝຸ່ນອຸດສາຫະກຳໄຮ້ສາຍ Nilfisk VHB436 (ແບັດ Lithium 36V ດູດແຮງຕໍ່ເນື່ອງ 2 ຊົ່ວໂມງ)",
  "category": "Industrial Vacuums",
  "pre_category_id": "nilfisk-cleaning",
  "brand": "Nilfisk",
  "description": "Battery-operated cordless industrial vacuum with zero trip hazard, high suction, and fast charging.",
  "description_lo": "ເຄື່ອງດູດຝຸ່ນອຸດສາຫະກຳໄຮ້ສາຍ Nilfisk VHB436 ບໍ່ມີສາຍໄຟກີດຂວາງ ແບັດ Lithium 36V ດູດແຮງ ເຄື່ອນຍ້າຍສະດວກທຸກພື້ນທີ່ສາງ.",
  "image_url": "/images/catalog/real/industrial_vacuum_cleaner_1787993454700.jpg",
  "qty_on_hand": 3,
  "unit_price": 145000,
  "currency": "THB",
  "specs": {
    "Battery": "36V Lithium-Ion",
    "Runtime": "Up to 130 min",
    "Container": "50 Liters",
    "Suction": "160 mbar"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "nil-t40w",
  "sku_code": "NIL-T40W",
  "barcode": "5711145120012",
  "part_name": "Nilfisk T40W Plus Three-Phase 4.0 kW Industrial Heavy Vacuum (100L Tank)",
  "part_name_lo": "ເຄື່ອງດູດຝຸ່ນອຸດສາຫະກຳ 3 ເຟສ Nilfisk T40W Plus 4.0 kW (ຖັງ 100 ລິດ ເຮັດວຽກ 24/7)",
  "category": "Industrial Vacuums",
  "pre_category_id": "nilfisk-cleaning",
  "brand": "Nilfisk",
  "description": "Continuous duty three-phase side-channel blower industrial vacuum for non-stop factory production lines.",
  "description_lo": "ເຄື່ອງດູດຝຸ່ນອຸດສາຫະກຳ 3 ເຟສ Nilfisk T40W Plus 4.0 kW Side-Channel Blower ເຮັດວຽກຕໍ່ເນື່ອງ 24/7 ໂດຍບໍ່ຕ້ອງພັກເຄື່ອງ.",
  "image_url": "/images/catalog/real/industrial_vacuum_cleaner_1787993454700.jpg",
  "qty_on_hand": 2,
  "unit_price": 220000,
  "currency": "THB",
  "specs": {
    "Power": "4.0 kW 3-Phase",
    "Container": "100 Liters Drop-Down",
    "Airflow": "520 m³/h",
    "Duty Cycle": "24/7 Non-stop"
  },
  "lead_time": "In Stock (3-5 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "nil-vhw321",
  "sku_code": "NIL-VHW321",
  "barcode": "5711145120013",
  "part_name": "Nilfisk VHW321 Stainless Pharma & Food White-Room Vacuum (GMP Compliant)",
  "part_name_lo": "ເຄື່ອງດູດຝຸ່ນສະແຕນເລດ Nilfisk VHW321 ສຳລັບໂຮງງານຢາ & ອາຫານ (ມາດຕະຖານ GMP)",
  "category": "Industrial Vacuums",
  "pre_category_id": "nilfisk-cleaning",
  "brand": "Nilfisk",
  "description": "Fully stainless steel mirror-polished vacuum cleaner designed specifically for cleanrooms, biotech, and pharmaceutical plants.",
  "description_lo": "ເຄື່ອງດູດຝຸ່ນສະແຕນເລດ Nilfisk VHW321 ຂັດເງົາພິເສດ ບໍ່ສະສົມເຊື້ອ ມາດຕະຖານຫ້ອງສະອາດ Cleanroom Class 100 & GMP.",
  "image_url": "/images/catalog/real/industrial_vacuum_cleaner_1787993454700.jpg",
  "qty_on_hand": 2,
  "unit_price": 180000,
  "currency": "THB",
  "specs": {
    "Material": "Mirror Polish SUS304",
    "Filtration": "HEPA H14",
    "Power": "1.5 kW",
    "Standard": "Pharma GMP"
  },
  "lead_time": "In Stock (2-3 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "nil-atex22",
  "sku_code": "NIL-ATEX22",
  "barcode": "5711145120014",
  "part_name": "Nilfisk CTS22 ATEX Zone 22 Explosion-Proof Vacuum (Combustible Dust)",
  "part_name_lo": "ເຄື່ອງດູດຝຸ່ນກັນລະເບີດ Nilfisk ATEX Zone 22 (ສຳລັບຝຸ່ນລະອອງໄວໄຟໃນໂຮງສີ ແລະ ເຄມີ)",
  "category": "Industrial Vacuums",
  "pre_category_id": "nilfisk-cleaning",
  "brand": "Nilfisk",
  "description": "ATEX certified explosion-proof vacuum for safely recovering explosive powders, flour, carbon black, and plastic dusts.",
  "description_lo": "ເຄື່ອງດູດຝຸ່ນກັນລະເບີດມາດຕະຖານ ATEX Zone 22 ສຳລັບຝຸ່ນລະອອງໄວໄຟ (ແປ້ງ, ຖ່ານ, ສານເຄມີ) ປອດໄພສູງສຸດ.",
  "image_url": "/images/catalog/real/industrial_vacuum_cleaner_1787993454700.jpg",
  "qty_on_hand": 2,
  "unit_price": 295000,
  "currency": "THB",
  "specs": {
    "Certification": "ATEX Zone 22 II 3D",
    "Power": "2.2 kW Side-Channel",
    "Container": "50L Stainless",
    "Anti-Static": "Complete Kit"
  },
  "lead_time": "In Stock (3-5 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "nil-vp300",
  "sku_code": "NIL-VP300",
  "barcode": "5711145160010",
  "part_name": "Nilfisk VP300 Eco Commercial Dry Canister Vacuum (H13 HEPA Filter, 800W)",
  "part_name_lo": "ເຄື່ອງດູດຝຸ່ນອາຄານ Nilfisk VP300 Eco (ກອງ HEPA H13 800W ປະຢັດໄຟ ງຽບ 58 dB)",
  "category": "Commercial Vacuums",
  "pre_category_id": "nilfisk-cleaning",
  "brand": "Nilfisk",
  "description": "Best-selling commercial canister dry vacuum with H13 HEPA filtration and ultra-low noise level of 58 dB(A).",
  "description_lo": "ເຄື່ອງດູດຝຸ່ນອາຄານ Nilfisk VP300 Eco ລຸ້ນຍອດນິຍົມ 800W ກັ່ນຕອງ HEPA H13 ສຽງງຽບ 58 dB ເໝາະສຳລັບໂຮງແຮມ ແລະ ຫ້ອງການ.",
  "image_url": "/images/catalog/real/commercial_canister_vacuum.jpg",
  "qty_on_hand": 25,
  "unit_price": 8900,
  "currency": "THB",
  "specs": {
    "Power": "800 Watts",
    "Dust Bag": "10 Liters",
    "Sound": "58 dB(A)",
    "Filtration": "HEPA H13 Certified"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "nil-vp600",
  "sku_code": "NIL-VP600",
  "barcode": "5711145160011",
  "part_name": "Nilfisk VP600 Premium Commercial Canister Vacuum with Dual Speed",
  "part_name_lo": "ເຄື່ອງດູດຝຸ່ນ Nilfisk VP600 Premium (ປັບຄວາມແຮງ 2 ລະດັບ, ສາຍໄຟຍາວ 15 ມ)",
  "category": "Commercial Vacuums",
  "pre_category_id": "nilfisk-cleaning",
  "brand": "Nilfisk",
  "description": "Ergonomic high-efficiency commercial vacuum with dual speed suction and magnetic dust lid.",
  "description_lo": "ເຄື່ອງດູດຝຸ່ນ Nilfisk VP600 Premium ປັບແຮງດູດໄດ້ 2 ລະດັບ ສາຍໄຟຖອດປ່ຽນໄດ້ ຄວາມຍາວ 15 ມ ດູດພົມ ແລະ ພື້ນແຂງສະອາດເລິກ.",
  "image_url": "/images/catalog/real/commercial_canister_vacuum.jpg",
  "qty_on_hand": 15,
  "unit_price": 14500,
  "currency": "THB",
  "specs": {
    "Power": "350/800W Dual Speed",
    "Cable": "15 Meters Detachable",
    "Filtration": "HEPA H13",
    "Capacity": "10 Liters"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "nil-vp930",
  "sku_code": "NIL-VP930",
  "barcode": "5711145160012",
  "part_name": "Nilfisk VP930 Iconic High-Durability Hotel & Office Vacuum (15L Steel Container)",
  "part_name_lo": "ເຄື່ອງດູດຝຸ່ນ Nilfisk VP930 ລຸ້ນຄລາສສິກຖັງເຫຼັກ 15 ລິດ (ທົນທານສູງສຸດ ມາດຕະຖານໂຮງແຮມ 5 ດາວ)",
  "category": "Commercial Vacuums",
  "pre_category_id": "nilfisk-cleaning",
  "brand": "Nilfisk",
  "description": "The gold standard heavy-duty commercial vacuum cleaner trusted by luxury hotels worldwide with 15L steel container.",
  "description_lo": "ເຄື່ອງດູດຝຸ່ນລະດັບຕຳນານ Nilfisk VP930 ໂຄງສ້າງຖັງເຫຼັກແຂງແກ່ນ 15 ລິດ ມາດຕະຖານໂຮງແຮມ 5 ດາວທົ່ວໂລກ ທົນທານນັບ 10 ປີ.",
  "image_url": "/images/catalog/real/commercial_canister_vacuum.jpg",
  "qty_on_hand": 12,
  "unit_price": 18500,
  "currency": "THB",
  "specs": {
    "Container": "15 Liters Steel",
    "Filtration Area": "12,000 cm² HEPA",
    "Power": "760W",
    "Weight": "7.9 kg"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "nil-vl100-55",
  "sku_code": "NIL-VL100-55",
  "barcode": "5711145160013",
  "part_name": "Nilfisk VL100-55 Wet & Dry Vacuum Cleaner (55L Stainless Tank, 1000W)",
  "part_name_lo": "ເຄື່ອງດູດຝຸ່ນ-ດູດນ້ຳ Nilfisk VL100-55 (ຖັງສະແຕນເລດ 55 ລິດ 1000W ດູດນ້ຳໄວ)",
  "category": "Commercial Vacuums",
  "pre_category_id": "nilfisk-cleaning",
  "brand": "Nilfisk",
  "description": "Versatile stainless steel wet and dry commercial vacuum for spill recovery, car wash, and building maintenance.",
  "description_lo": "ເຄື່ອງດູດຝຸ່ນ-ດູດນ້ຳ Nilfisk VL100-55 ຖັງສະແຕນເລດ 55 ລິດ ດູດນ້ຳໄວ ພ້ອມອຸປະກອນຫົວດູດພື້ນປຽກ-ແຫ້ງຄົບຊຸດ.",
  "image_url": "/images/catalog/real/commercial_canister_vacuum.jpg",
  "qty_on_hand": 18,
  "unit_price": 12900,
  "currency": "THB",
  "specs": {
    "Tank": "55 Liters Stainless",
    "Power": "1000 Watts",
    "Function": "Wet & Dry",
    "Hose Length": "2.5 m"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "nil-vl500-75",
  "sku_code": "NIL-VL500-75",
  "barcode": "5711145160014",
  "part_name": "Nilfisk VL500-75 Dual-Motor Heavy Commercial Wet & Dry Vacuum (75L)",
  "part_name_lo": "ເຄື່ອງດູດຝຸ່ນ-ດູດນ້ຳ Nilfisk VL500-75 ມໍເຕີຄູ່ (ຖັງ 75 ລິດ ພ້ອມສາຍປ່ອຍນ້ຳຖິ້ມ)",
  "category": "Commercial Vacuums",
  "pre_category_id": "nilfisk-cleaning",
  "brand": "Nilfisk",
  "description": "Dual motor 2500W wet/dry vacuum with tipping chassis, drain hose, and dual filtration system.",
  "description_lo": "ເຄື່ອງດູດຝຸ່ນ-ດູດນ້ຳ Nilfisk VL500-75 ມໍເຕີຄູ່ 2500W ແຮງດູດມະຫາສານ ຖັງເທໄດ້ ພ້ອມສາຍປ່ອຍນ້ຳຖິ້ມ ສຳລັບວຽກໜັກ.",
  "image_url": "/images/catalog/real/commercial_canister_vacuum.jpg",
  "qty_on_hand": 8,
  "unit_price": 24500,
  "currency": "THB",
  "specs": {
    "Power": "2500W (Dual Motors)",
    "Capacity": "75 Liters",
    "Chassis": "Tipping with Drain Hose",
    "Filtration": "Dual Wet/Dry Filter"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "att-prc-2500",
  "sku_code": "ATT-PRC-2500",
  "barcode": "885110017001",
  "part_name": "Cascade 360° Continuous Rotation Paper Roll Clamp 2500 kg",
  "part_name_lo": "ງ່າໜີບມ້ວນເຈ້ຍໝູນ 360 ອົງສາ Cascade 2500 kg (ໜ້າສຳຜັດຢາງປ້ອງກັນເຈ້ຍເສຍຫາຍ)",
  "category": "Specialized Attachments",
  "pre_category_id": "spare-parts-consumables",
  "description": "High performance paper roll clamp with thin arm profile, fast 360 rotation, and hydraulic damage-reduction pads.",
  "description_lo": "ງ່າໜີບມ້ວນເຈ້ຍ Cascade ໝູນ 360 ອົງສາຕໍ່ເນື່ອງ ແຂນບາງສວບເຂົ້າຊ່ອງແຄບງ່າຍ ແຜ່ນສຳຜັດຢາງກັນມ້ວນເຈ້ຍບຸບ.",
  "image_url": "/images/catalog/real/paper_roll_clamp.jpg",
  "qty_on_hand": 3,
  "unit_price": 220000,
  "currency": "THB",
  "specs": {
    "Capacity": "2,500 kg",
    "Roll Diameter": "250 - 1600 mm",
    "Rotation": "360° Continuous",
    "Brand": "Cascade USA"
  },
  "lead_time": "In Stock (3-5 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "att-blc-2000",
  "sku_code": "ATT-BLC-2000",
  "barcode": "885110017002",
  "part_name": "Hydraulic Bale Clamp for Cotton, Waste Paper & Foam 2000 kg",
  "part_name_lo": "ງ່າໜີບກ້ອນສິນຄ້າໄຮໂດຣລິກ Bale Clamp 2000 kg (ສຳລັບກ້ອນຝ້າຍ, ເຈ້ຍອັດ, ໂຟມ)",
  "category": "Specialized Attachments",
  "pre_category_id": "spare-parts-consumables",
  "description": "Palletless handling bale clamp for recycling plants, textile mills, and pulp paper bales.",
  "description_lo": "ງ່າໜີບກ້ອນສິນຄ້າໄຮໂດຣລິກ Bale Clamp 2000 kg ຊ່ວຍຍົກຍ້າຍກ້ອນສິນຄ້າໂດຍບໍ່ຕ້ອງໃຊ້ພາເລດ ປະຢັດຕົ້ນທຶນມະຫາສານ.",
  "image_url": "/images/catalog/real/hydraulic_bale_clamp.jpg",
  "qty_on_hand": 4,
  "unit_price": 185000,
  "currency": "THB",
  "specs": {
    "Capacity": "2,000 kg",
    "Opening Range": "550 - 1900 mm",
    "Arm Length": "1200 mm",
    "Mounting": "Class III"
  },
  "lead_time": "In Stock (3-5 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "att-fp-3000",
  "sku_code": "ATT-FP-3000",
  "barcode": "885110017003",
  "part_name": "Fork Positioner with Integral Sideshifter for Class II/III Carriages",
  "part_name_lo": "ຊຸດປັບໄລຍະຫ່າງງ່າລົດຍົກພ້ອມເລື່ອນຂ້າງ Fork Positioner & Side Shift (ປັບດ້ວຍໄຮໂດຣລິກ)",
  "category": "Specialized Attachments",
  "pre_category_id": "spare-parts-consumables",
  "description": "Hydraulically opens and closes forks from the driver seat without manual adjustment, includes sideshift.",
  "description_lo": "ຊຸດປັບງ່າລົດຍົກໄຮໂດຣລິກ ຄົນຂັບສາມາດກົດປັບໄລຍະຫ່າງງ່າ ແລະ ເລື່ອນຊ້າຍ-ຂວາ ຈາກຫ້ອງໂດຍສານໄດ້ທັນທີ.",
  "image_url": "/images/catalog/real/paper_roll_clamp.jpg",
  "qty_on_hand": 6,
  "unit_price": 95000,
  "currency": "THB",
  "specs": {
    "Carriage Class": "Class III (2.5 - 3.5T)",
    "Fork Spread": "260 - 1100 mm",
    "Sideshift Stroke": "+/- 100 mm"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "att-rot-360",
  "sku_code": "ATT-ROT-360",
  "barcode": "885110017004",
  "part_name": "360° Heavy-Duty Invertor Rotator Carriage 2.5 - 3.5 Tons",
  "part_name_lo": "ຊຸດແຜງງ່າໝູນ 360 ອົງສາ Rotator 2.5-3.5 ໂຕນ (ສຳລັບເທສິນຄ້າ, ຖອກນ້ຳ, ເທເສດໂລຫະ)",
  "category": "Specialized Attachments",
  "pre_category_id": "spare-parts-consumables",
  "description": "Continuous revolving rotator attachment for dumping foundry bins, scrap metal boxes, and agricultural produce.",
  "description_lo": "ຊຸດແຜງງ່າໝູນ 360 ອົງສາ Rotator ຮັບນ້ຳໜັກ 3.5 ໂຕນ ສຳລັບເທຖອກເສດໂລຫະ, ຂີ້ເທົ່າ ແລະ ສິນຄ້າກະເສດ.",
  "image_url": "/images/catalog/real/hydraulic_bale_clamp.jpg",
  "qty_on_hand": 3,
  "unit_price": 135000,
  "currency": "THB",
  "specs": {
    "Capacity": "3,500 kg",
    "Rotation": "360° Continuous",
    "Drive": "Heavy Hydraulic Motor",
    "Torque": "5,800 Nm"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "att-dl-400",
  "sku_code": "ATT-DL-400",
  "barcode": "885110017005",
  "part_name": "Double Drum Lifter Attachment for 200L Steel & Plastic Drums (Mechanical Auto-Grip)",
  "part_name_lo": "ອຸປະກອນຍົກຖັງນ້ຳມັນຄູ່ 200 ລິດ Drum Lifter (ລະບົບລັອກອັດຕະໂນມັດ 800 kg)",
  "category": "Specialized Attachments",
  "pre_category_id": "spare-parts-consumables",
  "description": "Fork-mounted mechanical automatic eagle-grip clamp that lifts 2 drums simultaneously without hydraulics.",
  "description_lo": "ອຸປະກອນຍົກຖັງນ້ຳມັນຄູ່ ສວບເຂົ້າກັບງ່າລົດຍົກໄດ້ທັນທີ ລະບົບປາກນົກອິນຊີລັອກອັດຕະໂນມັດ ຍົກໄດ້ພ້ອມກັນ 2 ຖັງ.",
  "image_url": "/images/catalog/real/forklift_drum_grab.jpg",
  "qty_on_hand": 8,
  "unit_price": 28000,
  "currency": "THB",
  "specs": {
    "Capacity": "800 kg (2x 400 kg)",
    "Drum Type": "200L Steel & Rimmed Plastic",
    "Operation": "Mechanical Auto-Grip"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "att-ram-3000",
  "sku_code": "ATT-RAM-3000",
  "barcode": "885110017006",
  "part_name": "Carpet & Steel Coil Boom Ram Pole (3.0 m Length, 2500 kg)",
  "part_name_lo": "ແກນສວບຍົກມ້ວນພົມ & ມ້ວນຄອຍເຫຼັກ Carpet Boom 3 ມ (ເຫຼັກກ້າຮັບນ້ຳໜັກ 2.5 ໂຕນ)",
  "category": "Specialized Attachments",
  "pre_category_id": "spare-parts-consumables",
  "description": "High-tensile forged steel boom pole for lifting rolls of carpet, textiles, steel coils, and hollow cylindrical loads.",
  "description_lo": "ແກນສວບຍົກມ້ວນພົມ & ຄອຍເຫຼັກ Carpet Boom ຄວາມຍາວ 3 ມ ເຫຼັກຫຼໍ່ພິເສດ ຮັບນ້ຳໜັກ 2500 kg ປອດໄພສູງ.",
  "image_url": "/images/catalog/real/hydraulic_bale_clamp.jpg",
  "qty_on_hand": 5,
  "unit_price": 34000,
  "currency": "THB",
  "specs": {
    "Capacity": "2,500 kg",
    "Pole Length": "3,000 mm",
    "Pole Diameter": "90 mm",
    "Mounting": "Class III Carriage"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "led-blu-oval",
  "sku_code": "LED-BLU-OVAL",
  "barcode": "885110018001",
  "part_name": "Blue Oval Spot Warning LED Light 10-80V DC for Forklift Pedestrian Safety",
  "part_name_lo": "ໄຟ Blue Spot ນິລະໄພໂຟກສ໌ລິບ ຮູບວົງລີ 10-80V DC (ເຕືອນຄົນຍ່າງໃນໄລຍະ 5 ມ)",
  "category": "LED Safety Lights",
  "pre_category_id": "spare-parts-consumables",
  "description": "Cree LED 20W focused oval blue spot projecting a clear beam on the warehouse floor 5m ahead/behind forklift.",
  "description_lo": "ໄຟ Blue Spot LED 20W ລຳແສງວົງລີສີຟ້າເຂັ້ມ ສ່ອງລົງພື້ນລ່ວງໜ້າ 5 ມ ເຕືອນຄົນຍ່າງໃນມູມອັບສາຍຕາຂອງສາງ.",
  "image_url": "/images/catalog/real/forklift_blue_spot.jpg",
  "qty_on_hand": 60,
  "unit_price": 1450,
  "currency": "THB",
  "specs": {
    "Voltage": "10-80V DC Universal",
    "Power": "20W High Power Cree",
    "Color": "Blue Spot",
    "Protection": "IP68 Waterproof"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "led-red-line",
  "sku_code": "LED-RED-LINE",
  "barcode": "885110018002",
  "part_name": "Red Zone Danger Area Line Beam LED Light 10-80V (Boundary Warning)",
  "part_name_lo": "ໄຟເສັ້ນສີແດງ Red Zone Danger Line (ສາຍລຳແສງກຳນົດເຂດອັນຕະລາຍຮອບລົດຍົກ)",
  "category": "LED Safety Lights",
  "pre_category_id": "spare-parts-consumables",
  "description": "Projects bright straight red boundary line on the floor to keep pedestrians at a safe distance from forklift rear swing.",
  "description_lo": "ໄຟເສັ້ນສີແດງ Red Zone ສ້າງເສັ້ນແບ່ງເຂດອັນຕະລາຍຂ້າງຕົວລົດຍົກ ປ້ອງກັນຄົນຍ່າງເຂົ້າໃກ້ທ້າຍປັດ ແລະ ຢາງລົດ.",
  "image_url": "/images/catalog/real/forklift_red_zone.jpg",
  "qty_on_hand": 50,
  "unit_price": 1850,
  "currency": "THB",
  "specs": {
    "Voltage": "10-80V DC",
    "Beam Type": "Straight Line Beam",
    "Color": "Vibrant Red",
    "Housing": "Die-cast Aluminum"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "led-grn-arw",
  "sku_code": "LED-GRN-ARW",
  "barcode": "885110018003",
  "part_name": "Green Arrow Directional Warning LED Spot Light (Reversing & Travel Indicator)",
  "part_name_lo": "ໄຟລູກສອນສີຂຽວ Green Arrow LED (ບອກທິດທາງການຖອຍ ແລະ ເຄື່ອນທີ່ຂອງລົດຍົກ)",
  "category": "LED Safety Lights",
  "pre_category_id": "spare-parts-consumables",
  "description": "Crisp green arrow projection on warehouse floor that informs workers clearly which direction the truck is reversing.",
  "description_lo": "ໄຟລູກສອນສີຂຽວ Green Arrow ສ່ອງລົງພື້ນບອກທິດທາງການຖອຍຫຼັງ ແລະ ການເຄື່ອນທີ່ຂອງລົດຍົກ ຫຼຸດອຸບັດຕິເຫດ 90%.",
  "image_url": "/images/solutions/led-warning-safety-lights.png",
  "qty_on_hand": 40,
  "unit_price": 1950,
  "currency": "THB",
  "specs": {
    "Pattern": "Green Directional Arrow",
    "Voltage": "10-80V DC",
    "LED": "High Output Osram",
    "IP Rating": "IP67"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "led-halo-arc",
  "sku_code": "LED-HALO-ARC",
  "barcode": "885110018004",
  "part_name": "360° Safety Halo Arc Curved Red Perimeter Light 10-100V",
  "part_name_lo": "ໄຟເສັ້ນໂຄ້ງ Halo Arc 360 ອົງສາ (ສ້າງວົງແຫວນປ້ອງກັນຮອບທ້າຍລົດຍົກ)",
  "category": "LED Safety Lights",
  "pre_category_id": "spare-parts-consumables",
  "description": "Curved U-shaped red safety boundary light matching the rear counterweight radius perfectly for complete perimeter safety.",
  "description_lo": "ໄຟເສັ້ນໂຄ້ງ Halo Arc ສ້າງແຖບສີແດງໂຄ້ງອ້ອມທ້າຍລົດຍົກ 360 ອົງສາ ຊັດເຈນ ເຫັນໄດ້ງ່າຍຈາກໄລຍະໄກ.",
  "image_url": "/images/catalog/real/forklift_red_zone.jpg",
  "qty_on_hand": 35,
  "unit_price": 2800,
  "currency": "THB",
  "specs": {
    "Pattern": "Curved Halo Arc",
    "Voltage": "10-100V DC",
    "Power": "30W",
    "Certification": "CE / RoHS / E9"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "led-amb-strb",
  "sku_code": "LED-AMB-STRB",
  "barcode": "885110018005",
  "part_name": "Amber Flashing LED Strobe Beacon Warning Light with Magnetic Base 12-48V",
  "part_name_lo": "ໄຟວາບສີສົ້ມ Strobe Beacon ຖານແມ່ເຫຼັກ 12-48V (ມາດຕະຖານໂຮງງານອຸດສາຫະກຳ)",
  "category": "LED Safety Lights",
  "pre_category_id": "spare-parts-consumables",
  "description": "Multi-flash pattern amber rotating beacon light with heavy magnetic base and 12-48V wide voltage input.",
  "description_lo": "ໄຟວາບສີສົ້ມ Strobe Beacon ຖານແມ່ເຫຼັກພ້ອມສາຍ 12-48V ປັບຮູບແບບການກະພິບໄດ້ 3 ແບບ ທົນແດດ ທົນຝົນ IP66.",
  "image_url": "/images/solutions/led-warning-safety-lights.png",
  "qty_on_hand": 75,
  "unit_price": 1200,
  "currency": "THB",
  "specs": {
    "Color": "Amber / Orange",
    "Voltage": "12-48V DC",
    "Base": "Magnetic + Screw Mount",
    "Modes": "Flashing / Rotating"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-pt-1002",
  "sku_code": "JNS-PT-1002",
  "barcode": "885110020002",
  "part_name": "20V Brushless Cordless Hammer Drill & Driver Kit (2x 4.0Ah Li-Ion Batteries)",
  "part_name_lo": "ສະຫວ່ານກະແທກໄຮ້ສາຍ 20V ມໍເຕີ Brushless (ພ້ອມແບັດ 4.0Ah 2 ກ້ອນ & ແທ່ນສາກ)",
  "category": "Power Tools",
  "pre_category_id": "spare-parts-consumables",
  "description": "Heavy-duty 85 Nm brushless hammer drill with metal keyless chuck, 2-speed gearbox, and battery status LED.",
  "description_lo": "ສະຫວ່ານກະແທກໄຮ້ສາຍ 20V ມໍເຕີ Brushless ແຮງບິດສູງ 85 Nm ຫົວຈັບເຫຼັກ 13 ມມ ເຈາະປູນ, ເຫຼັກ, ໄມ້ ພ້ອມແບັດ 2 ກ້ອນ.",
  "image_url": "/images/catalog/real/cordless_hammer_drill.jpg",
  "qty_on_hand": 30,
  "unit_price": 4850,
  "currency": "THB",
  "specs": {
    "Voltage": "20V Max",
    "Max Torque": "85 Nm",
    "Chuck": "13 mm Heavy Metal",
    "Batteries": "2x 4.0Ah Li-ion + Fast Charger"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-pt-1003",
  "sku_code": "JNS-PT-1003",
  "barcode": "885110020003",
  "part_name": "Heavy-Duty Angle Grinder 125 mm (5\") 1400W with Anti-Vibration Handle",
  "part_name_lo": "ເຄື່ອງເຈຍມື 5 ນິ້ວ (125 ມມ) 1400W (ດ້າວຈັບຫຼຸດແຮງສັ່ນສະເທືອນ, ລະບົບປ້ອງກັນສະບັດ)",
  "category": "Power Tools",
  "pre_category_id": "spare-parts-consumables",
  "description": "Industrial angle grinder with copper motor, constant speed electronic governor, and tool-free guard adjustment.",
  "description_lo": "ເຄື່ອງເຈຍມື 5 ນິ້ວ 1400W ມໍເຕີທອງແດງແທ້ ພ້ອມລະບົບ KickBack Stop ປ້ອງກັນການສະບັດ ດ້າວຈັບຫຼຸດແຮງສັ່ນສະເທືອນ.",
  "image_url": "/images/catalog/real/heavy_angle_grinder.jpg",
  "qty_on_hand": 40,
  "unit_price": 2650,
  "currency": "THB",
  "specs": {
    "Power": "1400 Watts",
    "Disc Diameter": "125 mm (5\")",
    "No-load Speed": "11,000 RPM",
    "Safety": "Kickback Protection"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-pt-1004",
  "sku_code": "JNS-PT-1004",
  "barcode": "885110020004",
  "part_name": "SDS-Plus Rotary Hammer Drill 800W (3-Mode: Drill, Hammer, Chisel)",
  "part_name_lo": "ສະຫວ່ານໂລຕາລີ່ SDS-Plus 800W (3 ລະບົບ: ເຈາະ, ກະແທກ, ສະກັດ ພ້ອມດອກ 5 ດອກ)",
  "category": "Power Tools",
  "pre_category_id": "spare-parts-consumables",
  "description": "Professional SDS-plus rotary hammer with 3.0 Joules impact energy, forward/reverse, and heavy carrying case.",
  "description_lo": "ສະຫວ່ານໂລຕາລີ່ SDS-Plus 800W ແຮງກະແທກ 3.0 ຈູນ 3 ລະບົບ (ເຈາະທຳມະດາ, ເຈາະກະແທກ, ສະກັດ) ພ້ອມກ່ອງ ແລະ ດອກ.",
  "image_url": "/images/catalog/real/cordless_hammer_drill.jpg",
  "qty_on_hand": 25,
  "unit_price": 3450,
  "currency": "THB",
  "specs": {
    "Power": "800 Watts",
    "Impact Energy": "3.0 Joules",
    "Max Concrete": "26 mm",
    "Modes": "3-Function"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-pt-1005",
  "sku_code": "JNS-PT-1005",
  "barcode": "885110020005",
  "part_name": "1/2\" High-Torque Cordless Brushless Impact Wrench 1000 Nm (20V Heavy Duty)",
  "part_name_lo": "ບລັອກໄຟຟ້າໄຮ້ສາຍ 1/2\" ແຮງບິດສູງ 1000 Nm (ມໍເຕີ Brushless ຂັນນັອດລໍ້ລົດຍົກ & ກົນຈັກ)",
  "category": "Power Tools",
  "pre_category_id": "spare-parts-consumables",
  "description": "Monster torque 1000 Nm cordless impact wrench with 3 speed modes for industrial machinery, truck lug nuts, and rigging.",
  "description_lo": "ບລັອກລົມໄຟຟ້າໄຮ້ສາຍ 20V ແຮງບິດສູງສຸດ 1000 Nm ມໍເຕີ Brushless ຂັນນັອດລໍ້ລົດຍົກ, ລົດບັນທຸກ ແລະ ກົນຈັກໜັກໄດ້ສະບາຍ.",
  "image_url": "/images/catalog/real/heavy_angle_grinder.jpg",
  "qty_on_hand": 20,
  "unit_price": 6200,
  "currency": "THB",
  "specs": {
    "Anvil": "1/2\" Detent Pin",
    "Max Nut-Busting Torque": "1000 Nm",
    "Speed Modes": "3-Speed Digital",
    "Battery": "2x 5.0Ah"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-pt-1006",
  "sku_code": "JNS-PT-1006",
  "barcode": "885110020006",
  "part_name": "Heavy Duty Metal Cut-Off Chop Saw 355 mm (14\") 2400W",
  "part_name_lo": "ແທ່ນຕັດເຫຼັກ 14 ນິ້ວ (355 ມມ) 2400W (ຖານເຫຼັກໜາ ຕັດແມ່ຍຳ)",
  "category": "Power Tools",
  "pre_category_id": "spare-parts-consumables",
  "description": "High-power metal chop saw with quick-release vise, spindle lock, and heavy pressed-steel base for workshop cutting.",
  "description_lo": "ແທ່ນຕັດເຫຼັກໄຟເບີ 14 ນິ້ວ 2400W ຖານເຫຼັກກ້າໜາ ປາກກາຈັບຊິ້ນງານປົດໄວ ຕັດເຫຼັກເສັ້ນ, ເຫຼັກກ່ອງ ແລະ ທໍ່ແຂງ.",
  "image_url": "/images/catalog/real/heavy_angle_grinder.jpg",
  "qty_on_hand": 15,
  "unit_price": 3850,
  "currency": "THB",
  "specs": {
    "Power": "2400 Watts",
    "Blade Diameter": "355 mm (14\")",
    "No-load Speed": "3,800 RPM",
    "Base": "Heavy Pressed Steel"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-pt-1007",
  "sku_code": "JNS-PT-1007",
  "barcode": "885110020007",
  "part_name": "Variable Speed Industrial Hand Blower & Vacuum 800W",
  "part_name_lo": "ເຄື່ອງເປົ່າລົມ-ດູດຝຸ່ນອຸດສາຫະກຳ 800W (ປັບແຮງລົມໄດ້ 6 ລະດັບ ເປົ່າຕູ້ໄຟ & ເຄື່ອງຈັກ)",
  "category": "Power Tools",
  "pre_category_id": "spare-parts-consumables",
  "description": "Powerful hand-held dual blower/vac for cleaning CNC panels, electrical switchboards, and warehouse dust.",
  "description_lo": "ເຄື່ອງເປົ່າລົມ ແລະ ດູດຝຸ່ນ 800W ປັບຄວາມໄວໄດ້ 6 ລະດັບ ພ້ອມຖົງເກັບຝຸ່ນ ເໝາະສຳລັບເປົ່າຕູ້ຄອນໂທຣລໄຟຟ້າ ແລະ ເຄື່ອງຈັກ.",
  "image_url": "/images/catalog/real/portable_air_blower.jpg",
  "qty_on_hand": 50,
  "unit_price": 1250,
  "currency": "THB",
  "specs": {
    "Power": "800 Watts",
    "Air Volume": "4.5 m³/min",
    "Speed Control": "6 Variable Speeds",
    "Dual Function": "Blow & Suction"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-pt-1008",
  "sku_code": "JNS-PT-1008",
  "barcode": "885110020008",
  "part_name": "Cordless Brushless Reciprocating Sabre Saw 20V (Tool-less Blade Change)",
  "part_name_lo": "ເລື່ອຍຊັກໄຮ້ສາຍ 20V ມໍເຕີ Brushless (ປ່ຽນໃບເລື່ອຍໄວ ຕັດເຫຼັກ/ໄມ້/ທໍ່ PVC)",
  "category": "Power Tools",
  "pre_category_id": "spare-parts-consumables",
  "description": "Heavy-duty cordless reciprocating saw with orbital action, LED worklight, and adjustable pivoting shoe.",
  "description_lo": "ເລື່ອຍຊັກໄຮ້ສາຍ 20V ມໍເຕີ Brushless ປ່ຽນໃບເລື່ອຍໄວໂດຍບໍ່ຕ້ອງໃຊ້ປະແຈ ຕັດທໍ່ເຫຼັກ, ຕັດໄມ້ພາເລດ ແລະ ງານຮື້ຖອນ.",
  "image_url": "/images/catalog/real/heavy_angle_grinder.jpg",
  "qty_on_hand": 18,
  "unit_price": 3900,
  "currency": "THB",
  "specs": {
    "Stroke Length": "28 mm",
    "Stroke Rate": "0-3,000 SPM",
    "Blade Clamp": "Keyless Quick Release",
    "Motor": "Brushless 20V"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-pt-1009",
  "sku_code": "JNS-PT-1009",
  "barcode": "885110020009",
  "part_name": "Industrial Heat Gun 2000W with Digital Temperature Display (50-650°C)",
  "part_name_lo": "ປືນເປົ່າລົມຮ້ອນ 2000W ດິຈິຕອນ 50-650°C (ສຳລັບຫົດທໍ່, ຟີມຫົດ ແລະ ດັດທໍ່)",
  "category": "Power Tools",
  "pre_category_id": "spare-parts-consumables",
  "description": "Precision temperature controlled hot air gun with LCD screen and 4 specialized air nozzle attachments.",
  "description_lo": "ປືນເປົ່າລົມຮ້ອນ 2000W ໜ້າຈໍ LCD ປັບອຸນຫະພູມລະອຽດ 50-650°C ພ້ອມຫົວຕໍ່ 4 ແບບ ສຳລັບຫົດທໍ່ສາຍໄຟ, ຟີມຫົດ ແລະ ດັດທໍ່.",
  "image_url": "/images/catalog/real/industrial_heat_gun.jpg",
  "qty_on_hand": 35,
  "unit_price": 1650,
  "currency": "THB",
  "specs": {
    "Power": "2000 Watts",
    "Temp Range": "50°C - 650°C",
    "Display": "Digital LCD",
    "Airflow": "250-500 L/min"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-tc-1002",
  "sku_code": "JNS-TC-1002",
  "barcode": "885110021002",
  "part_name": "7-Drawer Heavy Duty Roller Tool Cabinet with Ball-Bearing Slides & Central Lock",
  "part_name_lo": "ຕູ້ເຄື່ອງມືຊ່າງລໍ້ເລື່ອນ 7 ລີ້ນຊັກ ພ້ອມລະບົບລັອກກາງ (ລາງລູກປືນຮັບນ້ຳໜັກ 45 kg/ຊັ້ນ)",
  "category": "Tool Cabinets",
  "pre_category_id": "spare-parts-consumables",
  "description": "Professional mobile 7-drawer tool cabinet with EVA foam drawer liners, 5\" heavy casters, and central key lock.",
  "description_lo": "ຕູ້ເຄື່ອງມືຊ່າງລໍ້ເລື່ອນ 7 ລີ້ນຊັກ ໂຄງສ້າງເຫຼັກໜາ 1.2 ມມ ລາງລູກປືນລື່ນໄຫຼ ຮັບນ້ຳໜັກ 45 kg ຕໍ່ລີ້ນຊັກ ພ້ອມກຸນແຈລັອກກາງ.",
  "image_url": "/images/catalog/real/roller_tool_cabinet.jpg",
  "qty_on_hand": 12,
  "unit_price": 16500,
  "currency": "THB",
  "specs": {
    "Drawers": "7 Ball-Bearing Drawers",
    "Overall Size": "680 x 460 x 950 mm",
    "Load Capacity": "400 kg Total",
    "Lock": "Central Key Lock"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-tc-1003",
  "sku_code": "JNS-TC-1003",
  "barcode": "885110021003",
  "part_name": "Heavy-Duty Workshop Steel Workbench 1800x800 mm with Perforated Pegboard & LED",
  "part_name_lo": "ໂຕະເຮັດວຽກຊ່າງອຸດສາຫະກຳ 1800x800 ມມ (ພ້ອມແຜງແຂວນເຄື່ອງມື & ໄຟ LED)",
  "category": "Tool Cabinets",
  "pre_category_id": "spare-parts-consumables",
  "description": "Industrial workstation bench with 1000 kg capacity steel top, hanging tool pegboard, overhead LED light, and power sockets.",
  "description_lo": "ໂຕະເຮັດວຽກຊ່າງອຸດສາຫະກຳ ຂະໜາດ 1800x800 ມມ ຮັບນ້ຳໜັກ 1000 kg ພ້ອມແຜງ Pegboard ແຂວນເຄື່ອງມື, ໄຟ LED ແລະ ປັ໊ກໄຟ.",
  "image_url": "/images/catalog/real/workshop_steel_workbench.jpg",
  "qty_on_hand": 8,
  "unit_price": 22500,
  "currency": "THB",
  "specs": {
    "Tabletop": "1800 x 800 mm (50mm Heavy Steel/Wood)",
    "Capacity": "1,000 kg",
    "Includes": "Pegboard + LED + 4 Sockets",
    "Height": "2000 mm Total"
  },
  "lead_time": "In Stock (2-3 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-tc-1004",
  "sku_code": "JNS-TC-1004",
  "barcode": "885110021004",
  "part_name": "5-Drawer Mobile Mechanic Service Tool Cart with Lockable Top Compartment",
  "part_name_lo": "ລົດເຂັນເຄື່ອງມືຊ່າງ 5 ຊັ້ນ ພ້ອມຝາປິດລັອກໄດ້ (ລໍ້ PU 5 ນິ້ວ ລັອກຄູ່)",
  "category": "Tool Cabinets",
  "pre_category_id": "spare-parts-consumables",
  "description": "Compact service cart with 5 sliding drawers, top tray with gas struts, and heavy side handle for fast shop mobility.",
  "description_lo": "ລົດເຂັນເຄື່ອງມືຊ່າງ 5 ລີ້ນຊັກ ຝາເທິງເປີດດ້ວຍໂຊກໄຮໂດຣລິກ ລັອກໄດ້ ລໍ້ PU 5 ນິ້ວ ລື່ນໄຫຼງຽບ ເໝາະສຳລັບອູ່ສ້ອມ ແລະ ໂຮງງານ.",
  "image_url": "/images/catalog/real/roller_tool_cabinet.jpg",
  "qty_on_hand": 15,
  "unit_price": 8900,
  "currency": "THB",
  "specs": {
    "Drawers": "5 Drawers + Top Tray",
    "Dimensions": "760 x 480 x 920 mm",
    "Top Lid": "Gas Strut Lift",
    "Finish": "Powder Coating"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-tc-1005",
  "sku_code": "JNS-TC-1005",
  "barcode": "885110021005",
  "part_name": "Wall-Mounted Industrial Tool Storage Shadow Board Cabinet with Double Doors",
  "part_name_lo": "ຕູ້ແຂວນຕິດຝາເກັບເຄື່ອງມືຊ່າງ 2 ປະຕູ (ແຜງ Shadow Board ຈັກເກັບເປັນລະບຽບ 5S)",
  "category": "Tool Cabinets",
  "pre_category_id": "spare-parts-consumables",
  "description": "Lockable steel wall cabinet with perforated pegboard back and internal shelves according to 5S lean management standards.",
  "description_lo": "ຕູ້ແຂວນຕິດຝາເກັບເຄື່ອງມືຊ່າງ 2 ປະຕູ ພາຍໃນເປັນແຜງ Pegboard ຈັດເກັບເຄື່ອງມືຕາມມາດຕະຖານ 5ສ ປ້ອງກັນເຄື່ອງມືຫາຍ.",
  "image_url": "/images/catalog/real/workshop_steel_workbench.jpg",
  "qty_on_hand": 20,
  "unit_price": 5800,
  "currency": "THB",
  "specs": {
    "Dimensions": "1200 x 200 x 600 mm",
    "Doors": "Double Steel with Lock",
    "Interior": "Full Pegboard Back",
    "Standard": "5S Visual Workplace"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-tc-1006",
  "sku_code": "JNS-TC-1006",
  "barcode": "885110021006",
  "part_name": "12-Drawer Master Industrial Workshop Storage Center with Hardwood Top (1.8m)",
  "part_name_lo": "ຕູ້ເຄື່ອງມືຊ່າງລະດັບມາສເຕີ 12 ລີ້ນຊັກ ໜ້າໂຕະໄມ້ແທ້ 1.8 ມ (ຮັບນ້ຳໜັກ 1000 kg)",
  "category": "Tool Cabinets",
  "pre_category_id": "spare-parts-consumables",
  "description": "Ultimate workshop combo workbench and 12-drawer cabinet combo with 35mm solid rubberwood top and heavy lockable casters.",
  "description_lo": "ຕູ້ເຄື່ອງມືຊ່າງມາສເຕີ 12 ລີ້ນຊັກ ໜ້າໂຕະໄມ້ຢາງພາລາແທ້ 35 ມມ ຄວາມຍາວ 1.8 ມ ລັອກລວມ ຮັບນ້ຳໜັກລວມ 1000 kg.",
  "image_url": "/images/catalog/real/roller_tool_cabinet.jpg",
  "qty_on_hand": 5,
  "unit_price": 38000,
  "currency": "THB",
  "specs": {
    "Drawers": "12 Extra-Wide Drawers",
    "Length": "1830 mm (72\")",
    "Top": "35 mm Solid Hardwood",
    "Casters": "6x 6\" Heavy Swivel"
  },
  "lead_time": "In Stock (2-3 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-tc-1007",
  "sku_code": "JNS-TC-1007",
  "barcode": "885110021007",
  "part_name": "Multi-Drawer Small Hardware & Parts Storage Cabinet (30 Drawers Clear Front)",
  "part_name_lo": "ຕູ້ລິ້ນຊັກເກັບນັອດ & ອາໄຫຼ່ນ້ອຍ 30 ຊ່ອງ (ຊ່ອງໃສມອງເຫັນງ່າຍ ພ້ອມປ້າຍຊື່)",
  "category": "Tool Cabinets",
  "pre_category_id": "spare-parts-consumables",
  "description": "Steel frame organizing cabinet with 30 transparent durable polystyrene drawers for bolts, nuts, and electronic parts.",
  "description_lo": "ຕູ້ເກັບນັອດ ແລະ ອາໄຫຼ່ 30 ຊ່ອງ ລີ້ນຊັກພາດສະຕິກໃສມອງເຫັນຊິ້ນສ່ວນຊັດເຈນ ໂຄງເຫຼັກພົ່ນສີກັນໝ້ຽງ ວາງຕິດຝາໄດ້.",
  "image_url": "/images/catalog/real/stackable_parts_bins.jpg",
  "qty_on_hand": 40,
  "unit_price": 3200,
  "currency": "THB",
  "specs": {
    "Drawers": "30 Clear PS Drawers",
    "Overall Dimensions": "530 x 220 x 580 mm",
    "Divider": "Includes Dividers",
    "Frame": "Cold Rolled Steel"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-ts-1002",
  "sku_code": "JNS-TS-1002",
  "barcode": "885110022002",
  "part_name": "Heavy Duty Rubber Speed Hump 1000 x 350 x 50 mm (Yellow & Black with Reflectors)",
  "part_name_lo": "ຢາງຊະລໍຄວາມໄວອຸດສາຫະກຳ 1000x350x50 ມມ (ສີເຫຼືອງ-ດຳ ພ້ອມຕາແມວສະທ້ອນແສງ)",
  "category": "Traffic Safety",
  "pre_category_id": "spare-parts-consumables",
  "description": "High-visibility vulcanized rubber speed breaker segment capable of withstanding 40-ton truck traffic with anchor bolts.",
  "description_lo": "ຢາງຊະລໍຄວາມໄວອຸດສາຫະກຳ 1000x350x50 ມມ ທົນແຮງກົດທັບລົດບັນທຸກ 40 ໂຕນ ສີເຫຼືອງ-ດຳສະຫຼັບກັນ ພ້ອມຕາແມວສະທ້ອນແສງກາງຄືນ.",
  "image_url": "/images/catalog/real/rubber_speed_hump.jpg",
  "qty_on_hand": 100,
  "unit_price": 1250,
  "currency": "THB",
  "specs": {
    "Dimensions": "1000 x 350 x 50 mm",
    "Load Rating": "40 Tons Heavy Truck",
    "Material": "Recycled Vulcanized Rubber",
    "Reflectors": "Cat-Eye Glass Beads"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-ts-1003",
  "sku_code": "JNS-TS-1003",
  "barcode": "885110022003",
  "part_name": "Flexible PVC Traffic Safety Cone 75 cm with High-Intensity Prismatic Reflective Collar",
  "part_name_lo": "ກວຍຈະລາຈອນ PVC ຢືດຢຸ່ນ 75 ຊມ (ແຖບສະທ້ອນແສງເພັດ ລົດຢຽບບໍ່ແຕກ)",
  "category": "Traffic Safety",
  "pre_category_id": "spare-parts-consumables",
  "description": "100% premium virgin PVC traffic cone with weighted black rubber base; returns to original shape after vehicle rollover.",
  "description_lo": "ກວຍຈະລາຈອນ PVC 75 ຊມ ແຖບສະທ້ອນແສງ Diamond Grade ລົດຢຽບທັບແລ້ວຄືນຮູບເກົ່າບໍ່ແຕກຫັກ ຖານຢາງໜັກຕ້ານລົມພັດ.",
  "image_url": "/images/catalog/real/traffic_safety_cone.jpg",
  "qty_on_hand": 250,
  "unit_price": 390,
  "currency": "THB",
  "specs": {
    "Height": "750 mm (30\")",
    "Material": "100% Flexible Virgin PVC",
    "Base": "Weighted Heavy Rubber",
    "Reflective": "Double Prismatic Collar"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-ts-1004",
  "sku_code": "JNS-TS-1004",
  "barcode": "885110022004",
  "part_name": "Outdoor Wide-Angle Convex Security Mirror 80 cm (Unbreakable Polycarbonate with Sunshade)",
  "part_name_lo": "ກະຈົກໂຄ້ງຈະລາຈອນໂພລີຄາຣ໌ບອນເນັດ 80 ຊມ (ມຸມກວ້າງ 130° ບໍ່ແຕກ ທົນແດດຝົນ)",
  "category": "Traffic Safety",
  "pre_category_id": "spare-parts-consumables",
  "description": "Virtually unbreakable PC convex mirror with orange ABS hood and heavy-duty steel pole clamp for blind corner visibility.",
  "description_lo": "ກະຈົກໂຄ້ງຈະລາຈອນ 80 ຊມ ເນື້ອໂພລີຄາຣ໌ບອນເນັດບໍ່ແຕກ ມຸມເບິ່ງກວ້າງ 130° ພ້ອມປີກກັນແດດ ແລະ ຊຸດຂາຈັບຕິດເສົາ.",
  "image_url": "/images/catalog/real/convex_traffic_mirror.jpg",
  "qty_on_hand": 35,
  "unit_price": 1650,
  "currency": "THB",
  "specs": {
    "Diameter": "800 mm (32\")",
    "Lens": "Impact-Proof Polycarbonate",
    "Viewing Angle": "130° Ultra-Wide",
    "Bracket": "Includes 2.5\"-3\" Pole Clamp"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-ts-1005",
  "sku_code": "JNS-TS-1005",
  "barcode": "885110022005",
  "part_name": "Heavy Rubber Wheel Chock for Commercial Trucks & Forklifts (with Steel Handle)",
  "part_name_lo": "ຢາງຂັດລໍ້ລົດບັນທຸກ & ລົດຍົກ (ພ້ອມມືຈັບເຫຼັກ ປ້ອງກັນລົດໄຫຼຂະນະຂຶ້ນ-ລົງສິນຄ້າ)",
  "category": "Traffic Safety",
  "pre_category_id": "spare-parts-consumables",
  "description": "High-density molded rubber triangular wheel chock with serrated non-slip bottom and eye-bolt steel handle.",
  "description_lo": "ຢາງຂັດລໍ້ລົດບັນທຸກໜັກ ພື້ນລາຍແຂ້ວກັນມື່ນ ພ້ອມມືຈັບເຫຼັກ ປ້ອງກັນລົດບັນທຸກໄຫຼຂະນະໂຫຼດສິນຄ້າທີ່ Dock.",
  "image_url": "/images/catalog/real/rubber_wheel_chock.jpg",
  "qty_on_hand": 80,
  "unit_price": 650,
  "currency": "THB",
  "specs": {
    "Dimensions": "260 x 160 x 190 mm",
    "Weight": "4.5 kg Heavy Rubber",
    "Handle": "Recessed Steel Eyebolt",
    "Grip": "Aggressive Ribbed Bottom"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-ts-1006",
  "sku_code": "JNS-TS-1006",
  "barcode": "885110022006",
  "part_name": "Heavy Duty Rubber Wall & Column Corner Protector 1000 x 100 x 100 mm (Reflective Stripes)",
  "part_name_lo": "ຢາງກັນກະທົບມູມເສົາ 1000x100 ມມ (ແຖບເຫຼືອງສະທ້ອນແສງ ປ້ອງກັນລົດຍົກຕຳເສົາ)",
  "category": "Traffic Safety",
  "pre_category_id": "spare-parts-consumables",
  "description": "Impact-absorbing 10mm thick rubber column guard with reflective yellow chevron arrows for factory pillars and loading docks.",
  "description_lo": "ຢາງກັນກະທົບມູມເສົາສາງ 1000x100x100 ມມ ຄວາມໜາ 10 ມມ ດູດຊັບແຮງກະທົບຈາກລົດຍົກ ປ້ອງກັນໂຄງສ້າງເສົາ ແລະ ລົດ.",
  "image_url": "/images/catalog/real/rubber_corner_guard.jpg",
  "qty_on_hand": 120,
  "unit_price": 480,
  "currency": "THB",
  "specs": {
    "Length": "1000 mm",
    "Wing Width": "100 x 100 mm",
    "Thickness": "10 mm Rubber",
    "Reflective": "Yellow Arrow Chevrons"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-ts-1007",
  "sku_code": "JNS-TS-1007",
  "barcode": "885110022007",
  "part_name": "Stainless Steel Retractable Belt Crowd Control Stanchion Post (2m Red Belt)",
  "part_name_lo": "ເສົາກັ້ນທາງສະແຕນເລດ ສາຍດຶງກັບອັດຕະໂນມັດ 2 ມ (ສຳລັບກັ້ນເຂດອັນຕະລາຍໃນສາງ)",
  "category": "Traffic Safety",
  "pre_category_id": "spare-parts-consumables",
  "description": "Heavy weighted base stainless queue barrier post with 4-way connecting head and 2-meter self-retracting red belt.",
  "description_lo": "ເສົາກັ້ນເຂດສະແຕນເລດ ສາຍດຶງກັບອັດຕະໂນມັດ 2 ມ ຖານຫຼໍ່ຊີມັງໜັກ 8 kg ຕັ້ງໝັ້ນຄົງ ສຳລັບກັ້ນເຂດອັນຕະລາຍ ແລະ ແຍກຄົນຍ່າງ.",
  "image_url": "/images/catalog/real/safety_helmet_1787989844162.jpg",
  "qty_on_hand": 50,
  "unit_price": 950,
  "currency": "THB",
  "specs": {
    "Post Material": "SUS201 Polished",
    "Belt Length": "2.0 Meters Red",
    "Base Weight": "8.0 kg Weighted",
    "Height": "900 mm"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-ts-1008",
  "sku_code": "JNS-TS-1008",
  "barcode": "885110022008",
  "part_name": "Expandable Mobile Safety Barricade Gate 2.5 m (Yellow/Black Heavy Plastic)",
  "part_name_lo": "ແຜງກັ້ນຍືດ-ຫົດໄດ້ 2.5 ມ (ພາດສະຕິກໜາ ເຕີມນ້ຳຖ່ວງນ້ຳໜັກໄດ້ ພັບເກັບສະດວກ)",
  "category": "Traffic Safety",
  "pre_category_id": "spare-parts-consumables",
  "description": "Portable accordion expanding safety barrier gate that extends to 2.5m; base can be filled with water for wind stability.",
  "description_lo": "ແຜງກັ້ນຍືດ-ຫົດໄດ້ ຍືດອອກໄດ້ເຖິງ 2.5 ມ ພັບເກັບເຫຼືອ 25 ຊມ ຖານເຕີມນ້ຳໄດ້ ພົກພາສະດວກ ສຳລັບປິດພື້ນທີ່ສ້ອມແປງດ່ວນ.",
  "image_url": "/images/catalog/real/safety_helmet_1787989844162.jpg",
  "qty_on_hand": 30,
  "unit_price": 2400,
  "currency": "THB",
  "specs": {
    "Extended Length": "2500 mm (2.5 m)",
    "Folded Width": "250 mm",
    "Height": "960 mm",
    "Feature": "Water/Sand Fillable Base"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "jns-ts-1009",
  "sku_code": "JNS-TS-1009",
  "barcode": "885110022009",
  "part_name": "Fixed Steel Safety Guard Bollard Yellow & Black (1000 mm Height, 114 mm Dia)",
  "part_name_lo": "ເສົາເຫຼັກກັນກະທົບຕິດຕັ້ງພື້ນ 1000x114 ມມ (ເຫຼັກໜາ 4.5 ມມ ປ້ອງກັນເຄື່ອງຈັກ ແລະ ປະຕູສາງ)",
  "category": "Traffic Safety",
  "pre_category_id": "spare-parts-consumables",
  "description": "Surface-mount industrial steel bollard with welded 200x200mm base plate to protect roll-up doors, machinery, and racks.",
  "description_lo": "ເສົາເຫຼັກກັນກະທົບ 1000x114 ມມ ເຫຼັກໜາ 4.5 ມມ ຖານຍຶດພຸກເບຕົງ 4 ຈຸດ ປ້ອງກັນລົດຍົກຊົນປະຕູມ້ວນ, ຕູ້ໄຟ ແລະ ເຄື່ອງຈັກ.",
  "image_url": "/images/catalog/real/safety_helmet_1787989844162.jpg",
  "qty_on_hand": 40,
  "unit_price": 1850,
  "currency": "THB",
  "specs": {
    "Height": "1000 mm",
    "Diameter": "114 mm (4.5\")",
    "Wall Thickness": "4.5 mm Heavy Steel",
    "Mount": "Welded Base Plate 200x200 mm"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "min-eh1100-fd",
  "sku_code": "MIN-EH1100-FD",
  "barcode": "885110019001",
  "part_name": "Hitachi EH1100 Haul Truck Final Drive Planetary Gear Set (OEM Part #4458291)",
  "part_name_lo": "ຊຸດເຟືອງທ້າຍດາວເຄາະ Final Drive ລົດບັນທຸກບໍ່ແຮ່ Hitachi EH1100",
  "category": "Mining Heavy Spares",
  "pre_category_id": "heavy-mining-machinery",
  "brand": "Hitachi / CAT / Komatsu / Cummins",
  "description": "Genuine high-alloy carburized planetary gears and sun gear for Hitachi EH1100-3/5 rigid haul truck rear wheel motors.",
  "description_lo": "ຊຸດເຟືອງດາວເຄາະ Final Drive ແທ້ ສຳລັບລົດບັນທຸກບໍ່ແຮ່ Hitachi EH1100 ເຫຼັກກ້າຊຸບແຂງພິເສດ ທົນແຮງບິດມະຫາສານ.",
  "image_url": "/images/catalog/real/mining_planetary_gear.jpg",
  "qty_on_hand": 2,
  "unit_price": 480000,
  "currency": "THB",
  "specs": {
    "Application": "Hitachi EH1100 Rigid Dump Truck",
    "Part No": "OEM #4458291",
    "Material": "Carburized Alloy Steel",
    "Origin": "Japan"
  },
  "lead_time": "In Stock (3-5 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "min-cat777-brk",
  "sku_code": "MIN-CAT777-BRK",
  "barcode": "885110019002",
  "part_name": "Caterpillar 777 Mining Truck Front & Rear Wet Disc Brake Pack (Friction Discs & Separators)",
  "part_name_lo": "ຊຸດຜ້າເບຣກປຽກ Wet Disc Brake ລົດດັ້ມບໍ່ແຮ່ CAT 777 (ທົນຄວາມຮ້ອນສູງພິເສດ)",
  "category": "Mining Heavy Spares",
  "pre_category_id": "heavy-mining-machinery",
  "brand": "Hitachi / CAT / Komatsu / Cummins",
  "description": "Complete oil-cooled wet disc brake friction plate pack for CAT 777D/E/F/G off-highway haul trucks.",
  "description_lo": "ຊຸດຜ້າເບຣກປຽກລະບາຍຄວາມຮ້ອນດ້ວຍນ້ຳມັນ CAT 777D/E/F/G ທົນແຮງສຽດສີ ແລະ ຄວາມຮ້ອນຂະນະແລ່ນລົງຄ້ອຍບໍ່ແຮ່.",
  "image_url": "/images/catalog/real/wet_disc_brake_pack.jpg",
  "qty_on_hand": 3,
  "unit_price": 320000,
  "currency": "THB",
  "specs": {
    "Machine": "CAT 777D/E/F/G Off-Highway",
    "Type": "Oil-Cooled Wet Multi-Disc",
    "Part Ref": "CAT 207-8890 Series",
    "Origin": "USA"
  },
  "lead_time": "In Stock (3-5 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "min-kom1250-pmp",
  "sku_code": "MIN-KOM1250-PMP",
  "barcode": "885110019003",
  "part_name": "Komatsu PC1250 Hydraulic Main Tandem Piston Pump Assembly (HPV160+160)",
  "part_name_lo": "ປ້ຳໄຮໂດຣລິກຫຼັກລົດຂຸດບໍ່ແຮ່ Komatsu PC1250 Tandem Pump HPV160",
  "category": "Mining Heavy Spares",
  "pre_category_id": "heavy-mining-machinery",
  "brand": "Hitachi / CAT / Komatsu / Cummins",
  "description": "OEM dual variable displacement axial piston pump assembly HPV160 for Komatsu PC1250-7/8 mining excavators.",
  "description_lo": "ປ້ຳໄຮໂດຣລິກຫຼັກຄູ່ Komatsu PC1250-7/8 HPV160+160 ແທ້ ແຮງດັນສູງ 350 Bar ໃຫ້ແຮງຂຸດເຕັມກຳລັງໄຮ້ການຮົ່ວໄຫຼ.",
  "image_url": "/images/solutions/heavy-machinery-mining-spare-parts.jpg",
  "qty_on_hand": 2,
  "unit_price": 650000,
  "currency": "THB",
  "specs": {
    "Model": "Komatsu PC1250-7/8 Excavator",
    "Pump Model": "HPV160+160 Variable Axial",
    "Operating Pressure": "350 Bar (5,076 PSI)"
  },
  "lead_time": "In Stock (5-7 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "min-qsk60-inj",
  "sku_code": "MIN-QSK60-INJ",
  "barcode": "885110019004",
  "part_name": "Cummins QSK60 Modular Common Rail Fuel Injector (OEM Genuine #4307475)",
  "part_name_lo": "ຫົວສີດນ້ຳມັນແທ້ Cummins QSK60 ສຳລັບເຄື່ອງຈັກລົດບັນທຸກບໍ່ແຮ່ 16 ສູບ",
  "category": "Mining Heavy Spares",
  "pre_category_id": "heavy-mining-machinery",
  "brand": "Hitachi / CAT / Komatsu / Cummins",
  "description": "Precision MCRS high pressure electronic fuel injector for 2,500 HP Cummins QSK60 mining diesel engines.",
  "description_lo": "ຫົວສີດນ້ຳມັນຄອມມອນເລວແທ້ Cummins QSK60 ສຳລັບເຄື່ອງຈັກ V16 ລົດບັນທຸກບໍ່ແຮ່ 2,500 ແຮງມ້າ ສີດລະອຽດ ປະຢັດນ້ຳມັນ.",
  "image_url": "/images/solutions/heavy-machinery-mining-spare-parts.jpg",
  "qty_on_hand": 16,
  "unit_price": 48000,
  "currency": "THB",
  "specs": {
    "Engine": "Cummins QSK60 Mining V16",
    "Part Number": "4307475 / 4307475RX",
    "System": "Modular Common Rail (MCRS)",
    "Brand": "Cummins Genuine"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "min-trk-70t",
  "sku_code": "MIN-TRK-70T",
  "barcode": "885110019005",
  "part_name": "Heavy Excavator Track Roller Assembly (Double Flange for 70-90 Ton Excavators)",
  "part_name_lo": "ລູກກິ້ງຕີນຕະຂາບຄູ່ Double Flange ສຳລັບລົດຂຸດ 70-90 ໂຕນ (ຊີລກົນຈັກ Duo-Cone)",
  "category": "Mining Heavy Spares",
  "pre_category_id": "heavy-mining-machinery",
  "brand": "Hitachi / CAT / Komatsu / Cummins",
  "description": "Forged alloy steel bottom track roller with lifetime Duo-Cone mechanical seal and high-pressure grease lubrication.",
  "description_lo": "ລູກກິ້ງຕີນຕະຂາບລຸ່ມ Double Flange ສຳລັບລົດຂຸດ 70-90 ໂຕນ ຊີລ Duo-Cone ປ້ອງກັນຂີ້ຕົມ ແລະ ຝຸ່ນບໍ່ແຮ່ 100%.",
  "image_url": "/images/solutions/heavy-machinery-mining-spare-parts.jpg",
  "qty_on_hand": 24,
  "unit_price": 18500,
  "currency": "THB",
  "specs": {
    "Compatibility": "CAT 374, Komatsu PC800, Hitachi ZX870",
    "Material": "Forged 50Mn Steel HRC 52-58",
    "Seal": "Duo-Cone Mechanical"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "min-hyd-seal",
  "sku_code": "MIN-HYD-SEAL",
  "barcode": "885110019006",
  "part_name": "Complete Hydraulic Cylinder Seal Kit for Heavy Mining Excavators (Parker/Hallite High Pressure 350 Bar)",
  "part_name_lo": "ຊຸດຊີລກະບອກໄຮໂດຣລິກກົນຈັກໜັກບໍ່ແຮ່ 350 Bar (Parker/Hallite ທົນແຮງດັນສູງ)",
  "category": "Mining Heavy Spares",
  "pre_category_id": "heavy-mining-machinery",
  "brand": "Hitachi / CAT / Komatsu / Cummins",
  "description": "Boom, stick, and bucket hydraulic cylinder replacement seal overhaul kit engineered for severe duty mining cycles.",
  "description_lo": "ຊຸດຊີລກະບອກໄຮໂດຣລິກແທ້ Parker/Hallite ສຳລັບກະບອກບູມ, ອາມ ແລະ ບຸ້ງກີລົດຂຸດບໍ່ແຮ່ ທົນແຮງດັນ 350 Bar ໄຮ້ຮອຍຮົ່ວ.",
  "image_url": "/images/solutions/heavy-machinery-mining-spare-parts.jpg",
  "qty_on_hand": 20,
  "unit_price": 14500,
  "currency": "THB",
  "specs": {
    "Pressure Rating": "Up to 350 Bar",
    "Temp Range": "-30°C to +110°C",
    "Material": "Polyurethane / PTFE / NBR",
    "Brand": "Parker / Hallite"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "min-flt-prim",
  "sku_code": "MIN-FLT-PRIM",
  "barcode": "885110019007",
  "part_name": "Heavy-Duty Dual Core Radial Air Intake Primary Filter for Mining Dump Trucks",
  "part_name_lo": "ໝໍ້ຕອງອາກາດຫຼັກ 2 ຊັ້ນ ສຳລັບລົດບັນທຸກບໍ່ແຮ່ (ດັກຝຸ່ນລະອຽດ 99.9% ມາດຕະຖານ Donaldson)",
  "category": "Mining Heavy Spares",
  "pre_category_id": "heavy-mining-machinery",
  "brand": "Hitachi / CAT / Komatsu / Cummins",
  "description": "High-capacity radial seal primary engine air filter capturing 99.9% of dust in extreme open-pit mining environments.",
  "description_lo": "ໝໍ້ຕອງອາກາດເຄື່ອງຈັກລົດບັນທຸກບໍ່ແຮ່ ດັກຈັບຝຸ່ນລະອຽດ 99.9% ປົກປ້ອງເຄື່ອງຈັກ QSK60 / CAT 3516 ຈາກຝຸ່ນຂີ້ຊີກາ.",
  "image_url": "/images/solutions/heavy-machinery-mining-spare-parts.jpg",
  "qty_on_hand": 30,
  "unit_price": 8900,
  "currency": "THB",
  "specs": {
    "Efficiency": "99.9% ISO 5011",
    "Seal Type": "Radial Seal Urethane",
    "Airflow": "High Flow Mining Grade",
    "Brand": "Donaldson / Fleetguard"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "min-slurry-imp",
  "sku_code": "MIN-SLURRY-IMP",
  "barcode": "885110019008",
  "part_name": "High-Chrome Alloy Slurry Pump Impeller for Gold & Copper Ore Processing (Warman 10/8 Equivalent)",
  "part_name_lo": "ໃບພັດປ້ຳດູດແຮ່ High-Chrome Alloy ສຳລັບໂຮງງານລ້າງແຮ່ຄຳ & ທອງແດງ",
  "category": "Mining Heavy Spares",
  "pre_category_id": "heavy-mining-machinery",
  "brand": "Hitachi / CAT / Komatsu / Cummins",
  "description": "27% high chromium white iron wear-resistant impeller for abrasive ore slurry, tailings, and mineral processing pumps.",
  "description_lo": "ໃບພັດປ້ຳດູດແຮ່ High-Chrome 27% ທົນການກັດເຊາະຂອງຫີນ ແລະ ແຮ່ຄຳ-ທອງແດງ ສຳລັບໂຮງແຕ່ງແຮ່.",
  "image_url": "/images/solutions/heavy-machinery-mining-spare-parts.jpg",
  "qty_on_hand": 4,
  "unit_price": 125000,
  "currency": "THB",
  "specs": {
    "Alloy": "High Chrome A05 (27% Cr)",
    "Hardness": "HRC 60-65",
    "Size": "10/8 Pump Equivalent",
    "Application": "Slurry & Tailings"
  },
  "lead_time": "In Stock (3-5 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "fan-ind-24s",
  "sku_code": "FAN-IND-24S",
  "barcode": "885110027001",
  "part_name": "Heavy Duty Industrial Pedestal Stand Fan 24\" (3-Blade Aluminum, 180W, 3-Speed)",
  "part_name_lo": "ພັດລົມອຸດສາຫະກຳຂາຕັ້ງ 24 ນິ້ວ (ໃບພັດອະລູມິນຽມ 3 ໃບ 180W ລົມແຮງ ທົນທານ)",
  "category": "Industrial Fans",
  "pre_category_id": "spare-parts-consumables",
  "description": "All-metal construction industrial pedestal fan with heavy cast iron cross base, 3-speed switch, and thermal fuse motor protection.",
  "description_lo": "ພັດລົມອຸດສາຫະກຳຂາຕັ້ງ 24 ນິ້ວ ໃບພັດອະລູມິນຽມຫຼໍ່ 180W ມໍເຕີທອງແດງແທ້ ປັບຄວາມສູງ ແລະ ປັບສ່າຍ 90 ອົງສາໄດ້ ທົນທານຕໍ່ເນື່ອງ.",
  "image_url": "/images/catalog/real/industrial_stand_fan.jpg",
  "qty_on_hand": 50,
  "unit_price": 2450,
  "currency": "THB",
  "specs": {
    "Blade Size": "24 Inches (600 mm)",
    "Power": "180 Watts Pure Copper",
    "Airflow": "185 m³/min",
    "Speeds": "3 Speeds Oscillating"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "fan-ind-30s",
  "sku_code": "FAN-IND-30S",
  "barcode": "885110027002",
  "part_name": "Heavy Duty Industrial Pedestal Stand Fan 30\" (Cast Iron Base, 280W High CFM)",
  "part_name_lo": "ພັດລົມອຸດສາຫະກຳຂາຕັ້ງ 30 ນິ້ວ ຖານຫຼໍ່ເຫຼັກ (280W ມໍເຕີທອງແດງແທ້ 100%)",
  "category": "Industrial Fans",
  "pre_category_id": "spare-parts-consumables",
  "description": "Maximum airflow 30-inch pedestal fan for factory shop floors, assembly halls, and distribution hubs.",
  "description_lo": "ພັດລົມອຸດສາຫະກຳຂາຕັ້ງ 30 ນິ້ວ 280W ແຮງລົມສູງສຸດ ຖານຫຼໍ່ເຫຼັກກົມໜັກ ຕັ້ງໝັ້ນຄົງ ເຢັນທົ່ວເຖິງພື້ນທີ່ກວ້າງ.",
  "image_url": "/images/catalog/real/industrial_stand_fan.jpg",
  "qty_on_hand": 40,
  "unit_price": 3250,
  "currency": "THB",
  "specs": {
    "Blade Size": "30 Inches (750 mm)",
    "Power": "280 Watts Heavy Motor",
    "Airflow": "290 m³/min",
    "Base": "Round Cast Iron Base"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "fan-ind-30w",
  "sku_code": "FAN-IND-30W",
  "barcode": "885110027003",
  "part_name": "Industrial Wall-Mounted Oscillating Fan 30\" (Heavy Duty Bracket & Pull Switch)",
  "part_name_lo": "ພັດລົມອຸດສາຫະກຳຕິດຝາ 30 ນິ້ວ (ສາຍດຶງປັບສ່າຍ 90° ປະຢັດພື້ນທີ່ໂຮງງານ)",
  "category": "Industrial Fans",
  "pre_category_id": "spare-parts-consumables",
  "description": "Wall bracket mounted 30\" industrial fan that saves floor space while delivering high velocity cooling across workers.",
  "description_lo": "ພັດລົມອຸດສາຫະກຳຕິດຝາ 30 ນິ້ວ ຂາເຫຼັກຍຶດຕິດຝາໜາແໜ້ນ ປະຢັດພື້ນທີ່ທາງຍ່າງໃນໂຮງງານ ສາຍດຶງຄວບຄຸມ 3 ລະດັບ.",
  "image_url": "/images/catalog/real/industrial_stand_fan.jpg",
  "qty_on_hand": 35,
  "unit_price": 3100,
  "currency": "THB",
  "specs": {
    "Blade Size": "30 Inches (750 mm)",
    "Power": "280 Watts",
    "Mounting": "Heavy Duty Wall Bracket",
    "Oscillation": "90° Wide Sweep"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "fan-blw-12",
  "sku_code": "FAN-BLW-12",
  "barcode": "885110027004",
  "part_name": "Portable Industrial Turbo Air Blower / Ventilator 12\" (300 mm, 520W) with 5m Flexible Duct",
  "part_name_lo": "ພັດລົມລະບາຍອາກາດຖັງກົມ 12 ນິ້ວ 520W (ພ້ອມທໍ່ລົມຍືດ 5 ມ ສຳລັບງານໃນທີ່ອັບອາກາດ)",
  "category": "Industrial Fans",
  "pre_category_id": "spare-parts-consumables",
  "description": "Cylindrical high-pressure air ventilator blower with 5m flame-retardant PVC flexible air duct hose for confined spaces.",
  "description_lo": "ພັດລົມລະບາຍອາກາດຖັງກົມ 12 ນິ້ວ (300 ມມ) 520W ພ້ອມທໍ່ລົມຍືດ 5 ມ ດູດ-ເປົ່າອາກາດໃນທໍ່, ຫ້ອງໃຕ້ດິນ ແລະ ທີ່ອັບອາກາດ.",
  "image_url": "/images/catalog/real/portable_air_blower.jpg",
  "qty_on_hand": 25,
  "unit_price": 4800,
  "currency": "THB",
  "specs": {
    "Diameter": "12 Inches (300 mm)",
    "Power": "520 Watts",
    "Air Delivery": "65 m³/min",
    "Included": "5m Flexible PVC Ducting"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "fan-blw-16",
  "sku_code": "FAN-BLW-16",
  "barcode": "885110027005",
  "part_name": "Heavy Duty Portable Air Blower Ventilator 16\" (400 mm, 1100W High Airflow)",
  "part_name_lo": "ພັດລົມດູດ-ເປົ່າອາກາດອຸດສາຫະກຳ 16 ນິ້ວ 1100W (ແຮງລົມ 96 m³/min)",
  "category": "Industrial Fans",
  "pre_category_id": "spare-parts-consumables",
  "description": "High-volume 16-inch industrial ventilator for rapid smoke extraction, welding fume evacuation, and tank ventilation.",
  "description_lo": "ພັດລົມດູດ-ເປົ່າອາກາດ 16 ນິ້ວ 1100W ແຮງລົມສູງ 96 m³/min ດູດຄວັນເຊື່ອມ, ລະບາຍໄອສານເຄມີ ແລະ ລະບາຍຄວາມຮ້ອນໄວ.",
  "image_url": "/images/catalog/real/portable_air_blower.jpg",
  "qty_on_hand": 15,
  "unit_price": 7200,
  "currency": "THB",
  "specs": {
    "Diameter": "16 Inches (400 mm)",
    "Power": "1,100 Watts",
    "Airflow": "96 m³/min",
    "Pressure": "700 Pa"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "fan-evap-80l",
  "sku_code": "FAN-EVAP-80L",
  "barcode": "885110027006",
  "part_name": "Mobile Industrial Evaporative Air Cooler 80L (Airflow 12,000 m³/h, Area 60-80 m²)",
  "part_name_lo": "ພັດລົມໄອເຢັນອຸດສາຫະກຳ 80 ລິດ (ແຮງລົມ 12,000 m³/h ຫຼຸດອຸນຫະພູມ 4-8°C)",
  "category": "Industrial Fans",
  "pre_category_id": "spare-parts-consumables",
  "description": "Heavy-duty mobile evaporative cooler with 80L water tank, 3-sided high efficiency cooling pads, and remote control.",
  "description_lo": "ພັດລົມໄອເຢັນອຸດສາຫະກຳ 80 ລິດ ແຮງລົມ 12,000 m³/h ແຜ່ນຮັງເຜິ້ງ 3 ດ້ານ ຫຼຸດອຸນຫະພູມໄດ້ 4-8°C ເໝາະກັບໂຮງງານເປີດໂລ່ງ.",
  "image_url": "/images/catalog/real/evaporative_air_cooler.jpg",
  "qty_on_hand": 12,
  "unit_price": 9800,
  "currency": "THB",
  "specs": {
    "Water Tank": "80 Liters",
    "Airflow": "12,000 m³/h",
    "Cooling Area": "60 - 80 m²",
    "Power": "380 Watts"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "wld-mma-200",
  "sku_code": "WLD-MMA-200",
  "barcode": "885110026001",
  "part_name": "Inverter MMA/ARC Welder 200A (IGBT Technology, Digital Display, Portable 5.5 kg)",
  "part_name_lo": "ຕູ້ເຊື່ອມໄຟຟ້າ Inverter MMA 200A (ເຕັກໂນໂລຊີ IGBT ດິຈິຕອນ ເຊື່ອມລວດ 2.6-4.0 ມມ)",
  "category": "Welding Equipment",
  "pre_category_id": "spare-parts-consumables",
  "description": "Portable 200A ARC stick welder with Hot Start, Arc Force, and Anti-Stick functions for construction maintenance.",
  "description_lo": "ຕູ້ເຊື່ອມໄຟຟ້າ Inverter 200A IGBT ແທ້ ນ້ຳໜັກເບົາ 5.5 kg ເຊື່ອມລວດ 2.6-4.0 ມມ ໄຟແຮງສະໝ່ຳສະເໝີ ບໍ່ຕິດລວດ.",
  "image_url": "/images/catalog/real/inverter_mma_welder.jpg",
  "qty_on_hand": 35,
  "unit_price": 3850,
  "currency": "THB",
  "specs": {
    "Current Range": "20 - 200A",
    "Electrode": "1.6 - 4.0 mm",
    "Duty Cycle": "60% @ 200A",
    "Technology": "IGBT Inverter"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "wld-tig-250",
  "sku_code": "WLD-TIG-250",
  "barcode": "885110026002",
  "part_name": "Inverter TIG/MMA Pulse Welder 250A (High Frequency Arc Ignition for Stainless & Steel)",
  "part_name_lo": "ຕູ້ເຊື່ອມ Inverter TIG/MMA 250A (ລະບົບ HF Arc ສຳລັບສະແຕນເລດ & ເຫຼັກ ເຊື່ອມງາມໄຮ້ສະເກັດ)",
  "category": "Welding Equipment",
  "pre_category_id": "spare-parts-consumables",
  "description": "Dual-process TIG/MMA welder with high-frequency arc start, post-gas flow timing, and pulse regulation for clean welds.",
  "description_lo": "ຕູ້ເຊື່ອມ TIG ອາກອນ 250A ລະບົບ HF ຈຸດອາກງ່າຍ ຮອຍເຊື່ອມງາມລະອຽດ ສຳລັບທໍ່ສະແຕນເລດ ແລະ ໂລຫະບາງ.",
  "image_url": "/images/catalog/real/inverter_mma_welder.jpg",
  "qty_on_hand": 20,
  "unit_price": 8900,
  "currency": "THB",
  "specs": {
    "Current Range": "10 - 250A",
    "Process": "TIG (Argon) & MMA Stick",
    "Arc Start": "High Frequency (HF)",
    "Duty Cycle": "60% @ 250A"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "wld-mig-250",
  "sku_code": "WLD-MIG-250",
  "barcode": "885110026003",
  "part_name": "Multi-Process Inverter MIG/MAG/MMA Welder 250A (Gas & Gasless Flux-Cored Wire)",
  "part_name_lo": "ຕູ້ເຊື່ອມ MIG 250A ມັລຕິຟັງຊັ່ນ (ເຊື່ອມໄດ້ທັງແບບໃຊ້ແກັສ Co2 ແລະ ບໍ່ໃຊ້ແກັສ Flux Core)",
  "category": "Welding Equipment",
  "pre_category_id": "spare-parts-consumables",
  "description": "Versatile MIG wire-feed welding machine supporting 1kg/5kg spools, gasless flux-cored wire, and solid wire with CO2.",
  "description_lo": "ຕູ້ເຊື່ອມ MIG 250A ລະບົບປ້ອນລວດອັດຕະໂນມັດ ໃສ່ລວດມ້ວນ 1kg/5kg ເຊື່ອມໄວ ຮອຍເຊື່ອມແໜ້ນໜາ ບໍ່ຕ້ອງເຄາະສະແລັກ.",
  "image_url": "/images/catalog/real/inverter_mma_welder.jpg",
  "qty_on_hand": 18,
  "unit_price": 14500,
  "currency": "THB",
  "specs": {
    "Current Range": "30 - 250A",
    "Wire Spool": "1 kg & 5 kg (0.8 / 1.0 mm)",
    "Process": "MIG Gas / MIG Gasless / MMA",
    "Duty Cycle": "60% @ 250A"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "wld-helmet-auto",
  "sku_code": "WLD-HELMET-AUTO",
  "barcode": "885110026004",
  "part_name": "Solar Auto-Darkening Welding Helmet (True Color View, 4 Sensors, DIN 9-13)",
  "part_name_lo": "ໜ້າກາກເຊື່ອມປັບແສງອັດຕະໂນມັດ ພະລັງງານແສງອາທິດ (True Color 4 ເຊັນເຊີ ຕັດແສງ 1/25,000s)",
  "category": "Welding Equipment",
  "pre_category_id": "spare-parts-consumables",
  "description": "True Color optical lens auto-darkening helmet with 1/25,000s switching speed, 4 arc sensors, and grind mode.",
  "description_lo": "ໜ້າກາກເຊື່ອມອັດຕະໂນມັດ True Color ເຫັນສີຈິງສະບາຍຕາ 4 ເຊັນເຊີ ຕັດແສງໄວ 1/25,000 ວິນາທີ ປັບລະດັບແສງ DIN 9-13.",
  "image_url": "/images/catalog/real/auto_welding_helmet.jpg",
  "qty_on_hand": 45,
  "unit_price": 1450,
  "currency": "THB",
  "specs": {
    "Viewing Area": "100 x 93 mm Large",
    "Sensors": "4 Arc Sensors",
    "Switching Speed": "1/25,000 s",
    "Optical Class": "1/1/1/2 True Color"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "wld-torch-mig",
  "sku_code": "WLD-TORCH-MIG",
  "barcode": "885110026005",
  "part_name": "Heavy Duty MIG 24KD Welding Torch 4m (Euro Connector Standard)",
  "part_name_lo": "ສາຍເຊື່ອມ MIG 24KD ຄວາມຍາວ 4 ມ (ຫົວຕໍ່ Euro Connector ມາດຕະຖານສາກົນ)",
  "category": "Welding Equipment",
  "pre_category_id": "spare-parts-consumables",
  "description": "Gas-cooled 250A MIG welding torch with ergonomic handle, durable ball-joint cable support, and Euro central connector.",
  "description_lo": "ສາຍເຊື່ອມ MIG 24KD ຍາວ 4 ມ ຫົວຕໍ່ Euro ມາດຕະຖານສາກົນ ສາຍທອງແດງໜາ ດ້າວຈັບກະຊັບມື ທົນຄວາມຮ້ອນສູງ.",
  "image_url": "/images/catalog/real/mig_welding_torch.jpg",
  "qty_on_hand": 30,
  "unit_price": 1850,
  "currency": "THB",
  "specs": {
    "Model": "MB 24KD Style",
    "Length": "4.0 Meters",
    "Rating": "250A CO2 / 220A Mixed Gas",
    "Duty Cycle": "60%"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "wld-cable-set",
  "sku_code": "WLD-CABLE-SET",
  "barcode": "885110026006",
  "part_name": "Heavy Duty Pure Copper Welding Cable Set 35 mm² (10m Electrode Holder + 5m Earth Clamp)",
  "part_name_lo": "ຊຸດສາຍເຊື່ອມທອງແດງແທ້ 35 sq.mm (ສາຍຄີມຈັບລວດ 10 ມ + ສາຍດິນ 5 ມ)",
  "category": "Welding Equipment",
  "pre_category_id": "spare-parts-consumables",
  "description": "100% pure copper extra-flexible rubber insulated welding cable with 500A brass electrode holder and heavy ground clamp.",
  "description_lo": "ຊຸດສາຍເຊື່ອມທອງແດງແທ້ 35 ຕາລາງມິນລິແມັດ ສາຍຄີມຈັບ 10 ມ + ສາຍດິນ 5 ມ ພ້ອມຫົວຕໍ່ໄວ Euro Dinse 35-50.",
  "image_url": "/images/catalog/real/mig_welding_wire_1787995228846.jpg",
  "qty_on_hand": 25,
  "unit_price": 2650,
  "currency": "THB",
  "specs": {
    "Cable Size": "35 mm² 100% Pure Copper",
    "Holder Cable": "10.0 Meters (500A Holder)",
    "Earth Cable": "5.0 Meters (500A Clamp)",
    "Connector": "Dinse 35-50"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "hst-ele-1t",
  "sku_code": "HST-ELE-1T",
  "barcode": "885110025001",
  "part_name": "Heavy Duty Electric Chain Hoist 1.0 Ton (6m Lift Height, 3-Phase with Motorized Trolley)",
  "part_name_lo": "ລອກໂສ້ໄຟຟ້າ 1.0 ໂຕນ (ຍົກສູງ 6 ມ ພ້ອມລົດແລ່ນໄຟຟ້າ Trolley ມາດຕະຖານ CE/ISO)",
  "category": "Hoists & Lifting",
  "pre_category_id": "mhe-forklifts",
  "description": "Industrial electric chain hoist with FEC G80 alloy chain, electromagnetic disk brake, and motorized I-beam trolley.",
  "description_lo": "ລອກໂສ້ໄຟຟ້າ 1.0 ໂຕນ ຍົກສູງ 6 ມ ພ້ອມລົດແລ່ນເທິງລາງໄອ-ບີມ ໂສ້ເຫຼັກກ້າ G80 ເບຣກແມ່ເຫຼັກໄຟຟ້າຕັດທັນທີເມື່ອໄຟດັບ.",
  "image_url": "/images/catalog/real/electric_chain_hoist.jpg",
  "qty_on_hand": 6,
  "unit_price": 28500,
  "currency": "THB",
  "specs": {
    "Capacity": "1,000 kg (1.0 Ton)",
    "Lifting Height": "6.0 Meters",
    "Lifting Speed": "6.8 m/min",
    "Power": "380V 3-Phase / 50Hz"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "hst-ele-2t",
  "sku_code": "HST-ELE-2T",
  "barcode": "885110025002",
  "part_name": "Heavy Duty Electric Chain Hoist 2.0 Ton (Dual Speed, 6m Lift, Dual Brake System)",
  "part_name_lo": "ລອກໂສ້ໄຟຟ້າ 2.0 ໂຕນ ຄວາມໄວ 2 ລະດັບ (ລະບົບເບຣກຄູ່ Electromagnetic & Mechanical)",
  "category": "Hoists & Lifting",
  "pre_category_id": "mhe-forklifts",
  "description": "Precision 2.0-ton electric chain hoist with dual lifting speeds, overload slip clutch, and 24V pendant control.",
  "description_lo": "ລອກໂສ້ໄຟຟ້າ 2.0 ໂຕນ ຄວາມໄວ 2 ລະດັບ (ຍົກໄວ/ຍົກລະອຽດ) ລະບົບເບຣກຄູ່ ພ້ອມສະວິດສຸກເສີນ Emergency Stop.",
  "image_url": "/images/catalog/real/electric_chain_hoist.jpg",
  "qty_on_hand": 4,
  "unit_price": 38000,
  "currency": "THB",
  "specs": {
    "Capacity": "2,000 kg (2.0 Tons)",
    "Lifting Height": "6.0 Meters",
    "Chain": "Grade 80 Heat-Treated",
    "Control Voltage": "24V Safe Pendant"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "hst-man-1t",
  "sku_code": "HST-MAN-1T",
  "barcode": "885110025003",
  "part_name": "Manual Chain Block Hoist 1.0 Ton (G80 Alloy Steel Chain, 3m Lift)",
  "part_name_lo": "ລອກມືສາວ 1.0 ໂຕນ (ໂສ້ເຫຼັກກ້າ G80 ຍົກ 3 ມ ໂຄງເຫຼັກໜາ ທົນແຮງດຶງສູງ)",
  "category": "Hoists & Lifting",
  "pre_category_id": "mhe-forklifts",
  "description": "Rugged manual chain block with forged safety latch hooks, twin pawl brake system, and hardened G80 load chain.",
  "description_lo": "ລອກມືສາວ 1.0 ໂຕນ ໂສ້ຍາວ 3 ມ ໂຄງສ້າງເຫຼັກກາກບອນໜາ ລະບົບເບຣກລູກປືນຄູ່ ປອດໄພ 100% ບໍ່ຕ້ອງໃຊ້ໄຟຟ້າ.",
  "image_url": "/images/catalog/real/manual_chain_block.jpg",
  "qty_on_hand": 25,
  "unit_price": 2450,
  "currency": "THB",
  "specs": {
    "Capacity": "1,000 kg (1 Ton)",
    "Standard Lift": "3.0 Meters",
    "Chain Grade": "G80 Alloy Steel",
    "Test Load": "1.5 Tons"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "hst-man-2t",
  "sku_code": "HST-MAN-2T",
  "barcode": "885110025004",
  "part_name": "Manual Chain Block Hoist 2.0 Ton (G80 Alloy Steel Chain, 3m Lift)",
  "part_name_lo": "ລອກມືສາວ 2.0 ໂຕນ (ໂສ້ຄູ່ G80 ຮັບນ້ຳໜັກ 2 ໂຕນປອດໄພ)",
  "category": "Hoists & Lifting",
  "pre_category_id": "mhe-forklifts",
  "description": "Double-fall heavy manual chain hoist for mechanical engineering, mining plants, and structural steel erection.",
  "description_lo": "ລອກມືສາວ 2.0 ໂຕນ ໂສ້ຄູ່ G80 ຍົກ 3 ມ ຂະໜາດກະທັດຮັດ ແຕ່ແຂງແຮງສູງ ຜ່ານການທົດສອບ Overload Test 150%.",
  "image_url": "/images/catalog/real/manual_chain_block.jpg",
  "qty_on_hand": 20,
  "unit_price": 3650,
  "currency": "THB",
  "specs": {
    "Capacity": "2,000 kg (2 Tons)",
    "Falls of Chain": "2 Falls",
    "Standard Lift": "3.0 Meters",
    "Safety": "Drop Forged Hooks with Latches"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "hst-lev-15t",
  "sku_code": "HST-LEV-15T",
  "barcode": "885110025005",
  "part_name": "Heavy Duty Ratchet Lever Hoist 1.5 Ton (1.5m Lift, 360° Rotating Handle)",
  "part_name_lo": "ລອກກຳມະລໍໂສ້ 1.5 ໂຕນ (ໂສ້ຍາວ 1.5 ມ ດ້າວໂຍກໝູນ 360 ອົງສາ ສຳລັບດຶງ ແລະ ຍົກ)",
  "category": "Hoists & Lifting",
  "pre_category_id": "mhe-forklifts",
  "description": "Ratchet lever come-along puller for pipe alignment, machinery securing, vehicle recovery, and tight-space pulling.",
  "description_lo": "ລອກກຳມະລໍ 1.5 ໂຕນ ດ້າວໂຍກໝູນ 360 ອົງສາ ສາມາດໃຊ້ດຶງແນວນອນ, ດຶງສະລິງ, ຮັດສິນຄ້າ ຫຼື ຍົກແນວຕັ້ງໄດ້ຢ່າງສະດວກ.",
  "image_url": "/images/catalog/real/manual_chain_block.jpg",
  "qty_on_hand": 30,
  "unit_price": 3200,
  "currency": "THB",
  "specs": {
    "Capacity": "1,500 kg (1.5 Tons)",
    "Lift Length": "1.5 Meters",
    "Lever Action": "360° Ratchet Handle",
    "Free-Wheeling": "Quick Neutral Freewheel"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
},
  {
  "sku_id": "hst-sling-3t",
  "sku_code": "HST-SLING-3T",
  "barcode": "885110025006",
  "part_name": "Double-Ply Polyester Webbing Lifting Sling 3.0 Tons x 4 Meters (Safety Factor 7:1)",
  "part_name_lo": "ສາຍສະລິງຜ້າໃບຍົກສິນຄ້າ 3 ໂຕນ ຍາວ 4 ມ (Polyester 100% ຄ່າຄວາມປອດໄພ 7:1 ມາດຕະຖານ EN)",
  "category": "Hoists & Lifting",
  "pre_category_id": "mhe-forklifts",
  "description": "Heavy duty yellow double-ply synthetic webbing sling with reinforced eye loops for damage-free lifting of machinery and painted loads.",
  "description_lo": "ສາຍສະລິງຜ້າໃບຍົກສິນຄ້າ 3 ໂຕນ (ສີເຫຼືອງ) ຍາວ 4 ມ ເສັ້ນໃຍ Polyester ແທ້ 100% ຫູຄ້ອງເສີມໜາ ບໍ່ເຮັດໃຫ້ຊິ້ນງານເປັນຮອຍ.",
  "image_url": "/images/catalog/real/polyester_webbing_sling.jpg",
  "qty_on_hand": 80,
  "unit_price": 650,
  "currency": "THB",
  "specs": {
    "Working Load Limit": "3,000 kg (3 Tons)",
    "Length": "4.0 Meters",
    "Safety Factor": "7:1",
    "Standard": "EN 1492-1 / CE"
  },
  "lead_time": "In Stock (1-2 Days)",
  "warranty_months": 12
}
];

export const RENTAL_CATALOG: InventoryItem[] = [
  {
    "sku_id": "rnt-cat-320",
    "sku_code": "RNT-CAT-320",
    "barcode": null,
    "part_name": "CAT 320 Hydraulic Excavator (Rental / Day)",
    "part_name_lo": "ລົດຈົກ CAT 320 ຂະໜາດ 20 ໂຕນ (ເຊົ່າລາຍວັນ ພ້ອມຄົນຂັບມືອາຊີບ)",
    "category": "Equipment Rental",
    "description": "Heavy duty 20-ton Caterpillar 320 hydraulic excavator for mining, road construction, land clearing, and bulk earthmoving. Delivered with certified operator.",
    "description_lo": "ລົດຈົກ CAT 320 ຂະໜາດ 20 ໂຕນ ບຸ້ງກີ໊ 0.9 ຄິວ ສຳລັບງານຂຸດດິນ, ງານບໍ່ແຮ່, ບຸກເບີກພື້ນທີ່ ພ້ອມຄົນຂັບມືອາຊີບ ແລະ ທີມງານເຊີວິດ 24/7.",
    "image_url": "/images/catalog/real/cat_320_excavator_1787945334578.jpg",
    "qty_on_hand": 4,
    "unit_price": 3800000,
    "currency": "LAK",
    "specs": {
      "Operating Weight": "22,500 kg",
      "Engine Power": "122 kW (164 HP)",
      "Bucket Capacity": "0.91 m3",
      "Rental Term": "Daily / Monthly Available"
    },
    "lead_time": "Available for Dispatch",
    "warranty_months": 0
  },
  {
    "sku_id": "rnt-whl-950",
    "sku_code": "RNT-WHL-950",
    "barcode": null,
    "part_name": "CAT 950 Heavy Wheel Loader 3.3 m3 Bucket (Rental / Day)",
    "part_name_lo": "ລົດຕັກ CAT 950 ຂະໜາດບຸ້ງກີ໊ 3.3 ຄິວ (ເຊົ່າລາຍວັນ ສຳລັບຕັກຫີນ-ຊາຍ)",
    "category": "Equipment Rental",
    "description": "Heavy production wheel loader featuring 3.3 cubic meter rock/material bucket, high breakout force, and fast cycle times for batching plants and quarries.",
    "description_lo": "ລົດຕັກ CAT 950 ບຸ້ງກີ໊ 3.3 ຄິວ ກຳລັງສູງ ເຮັດຮອບໄວ ສຳລັບໂຮງໂມ່ຫີນ, ໂຮງງານຄອນກີດ ແລະ ຕັກແຮ່ທາດຂຶ້ນລົດບັນທຸກ.",
    "image_url": "/images/catalog/real/wheel_loader_1787987830274.jpg",
    "qty_on_hand": 3,
    "unit_price": 3200000,
    "currency": "LAK",
    "specs": {
      "Operating Weight": "19,200 kg",
      "Bucket Capacity": "3.3 m3",
      "Net Power": "186 kW (250 HP)",
      "Service": "Fuel / Dry Hire Available"
    },
    "lead_time": "Available for Dispatch",
    "warranty_months": 0
  },
  {
    "sku_id": "rnt-crn-50t",
    "sku_code": "RNT-CRN-50T",
    "barcode": null,
    "part_name": "Rough Terrain Mobile Hydraulic Telescopic Crane 50 Tons (Rental / Day)",
    "part_name_lo": "ລົດເຄນລໍ້ຢາງເຄື່ອນທີ່ 50 ໂຕນ Rough Terrain (ເຊົ່າລາຍວັນ ຍົກໂຄງສ້າງໜັກ)",
    "category": "Equipment Rental",
    "description": "All-terrain 50-ton mobile hydraulic crane with 43-meter 5-section telescopic boom, 4-wheel drive, and certified rigger/operator crew.",
    "description_lo": "ລົດເຄນລໍ້ຢາງ 50 ໂຕນ ແຂນບູມຍືດໄຮໂດຣລິກ 43 ແມັດ ຂັບເຄື່ອນ 4 ລໍ້ ລຸຍໄດ້ທຸກພື້ນທີ່ ພ້ອມຄົນຂັບມີໃບຢັ້ງຢືນ ປອດໄພ 100%.",
    "image_url": "/images/catalog/real/rough_terrain_crane_1787987842267.jpg",
    "qty_on_hand": 2,
    "unit_price": 5500000,
    "currency": "LAK",
    "specs": {
      "Max Lifting Capacity": "50,000 kg",
      "Max Boom Length": "43.0 Meters",
      "Drive System": "4x4x4 All-Wheel Steer",
      "Certification": "Safety Certified Inspected"
    },
    "lead_time": "Advance Booking 24h",
    "warranty_months": 0
  },
  {
    "sku_id": "rnt-gen-150k",
    "sku_code": "RNT-GEN-150K",
    "barcode": null,
    "part_name": "Silent Cummins Industrial Diesel Generator Set 150 kVA / 120 kW (Rental / Day)",
    "part_name_lo": "ເຄື່ອງປັ່ນໄຟຟ້າດີເຊວ Cummins 150 kVA / 120 kW ແບບຕູ້ເກັບສຽງ (ເຊົ່າລາຍວັນ)",
    "category": "Equipment Rental",
    "description": "Ultra-silent soundproof canopy diesel generator set delivering continuous 3-phase 380V power for mining camps, factory shutdowns, and outdoor events.",
    "description_lo": "ເຄື່ອງປັ່ນໄຟຟ້າດີເຊວ Cummins 150 kVA ຕູ້ເກັບສຽງ Super Silent ສຽງງຽບ ຈ່າຍໄຟສະໝ່ຳສະເໝີ 3 ເຟສ 380V ພ້ອມລະບົບ ATS ແລະ ຖັງນ້ຳມັນໃນຕົວ.",
    "image_url": "/images/catalog/real/diesel_generator_1787945358504.jpg",
    "qty_on_hand": 5,
    "unit_price": 1800000,
    "currency": "LAK",
    "specs": {
      "Prime Power": "150 kVA (120 kW)",
      "Voltage": "380V / 220V 50Hz 3-Phase",
      "Sound Level": "68 dBA @ 7m",
      "Engine": "Cummins 6BTA5.9-G2"
    },
    "lead_time": "Available for Dispatch",
    "warranty_months": 0
  },
  {
    "sku_id": "rnt-fl-toy30",
    "sku_code": "RNT-FL-TOY30",
    "barcode": null,
    "part_name": "Toyota 8FD30 Heavy Duty 3.0-Ton Diesel Forklift (Rental / Day)",
    "part_name_lo": "ລົດຍົກ Toyota 8FD30 ຂະໜາດ 3.0 ໂຕນ ດີເຊວ (ເຊົ່າລາຍວັນ/ລາຍເດືອນ ເສົາສູງ 3 ແມັດ)",
    "category": "Equipment Rental",
    "description": "World-leading Toyota 8-Series 3000kg diesel counterbalance forklift equipped with SAS (System of Active Stability) and pneumatic tires.",
    "description_lo": "ລົດຍົກດີເຊວ Toyota 8FD30 ຮັບນ້ຳໜັກ 3.0 ໂຕນ ເສົາສູງ 3 ແມັດ ລະບົບປ້ອງກັນລົດຂວ້ຳອັດສະລິຍະ SAS ປະຢັດນ້ຳມັນ ເຮັດວຽກຄ່ອງແຄ້ວ.",
    "image_url": "/images/forklifts/toyota_8fd_orange.jpg",
    "qty_on_hand": 8,
    "unit_price": 950000,
    "currency": "LAK",
    "specs": {
      "Rated Capacity": "3000 kg",
      "Lift Height": "3000 mm (Duplex Mast)",
      "Engine": "Toyota 1DZ-II Diesel",
      "Safety": "Toyota SAS System"
    },
    "lead_time": "Immediate Dispatch",
    "warranty_months": 0
  },
  {
    "sku_id": "rnt-fl-kom30",
    "sku_code": "RNT-FL-KOM30",
    "barcode": null,
    "part_name": "Komatsu FD30-17 3.0-Ton Diesel Forklift with Side Shift (Rental / Day)",
    "part_name_lo": "ລົດຍົກ Komatsu FD30-17 ຂະໜາດ 3.0 ໂຕນ ພ້ອມງາເລື່ອນຊ້າຍ-ຂວາ Side Shift",
    "category": "Equipment Rental",
    "description": "High reliability Komatsu 3.0-ton diesel forklift featuring integrated hydraulic side-shifter for rapid container and racking pallet loading.",
    "description_lo": "ລົດຍົກດີເຊວ Komatsu 3.0 ໂຕນ ພ້ອມລະບົບ Side Shift ເລື່ອນງາຊ້າຍ-ຂວາດ້ວຍໄຮໂດຣລິກ ຈັດຮຽງສິນຄ້າໃນຕູ້ຄອນເທນເນີໄດ້ໄວ.",
    "image_url": "/images/forklifts/komatsu_fd30_yellow.jpg",
    "qty_on_hand": 6,
    "unit_price": 1050000,
    "currency": "LAK",
    "specs": {
      "Rated Capacity": "3000 kg",
      "Attachment": "Hydraulic Side Shift",
      "Lift Height": "3000 mm",
      "Engine": "Komatsu 4D94LE"
    },
    "lead_time": "Immediate Dispatch",
    "warranty_months": 0
  },
  {
    "sku_id": "rnt-fl-hel35",
    "sku_code": "RNT-FL-HEL35",
    "barcode": null,
    "part_name": "Heli 3.5-Ton Industrial Diesel Forklift with Triplex 4.5m Full Free Mast (Rental / Day)",
    "part_name_lo": "ລົດຍົກ Heli 3.5 ໂຕນ ດີເຊວ ເສົາສູງ 4.5 ແມັດ 3 ທ່ອນ Full Free Lift",
    "category": "Equipment Rental",
    "description": "Heavy 3.5-ton forklift with 3-stage full free lift mast allowing high pallet stacking inside low-ceiling shipping containers.",
    "description_lo": "ລົດຍົກ Heli 3.5 ໂຕນ ເສົາ 3 ທ່ອນ ຍົກສູງ 4.5 ແມັດ ແບບ Full Free Lift ຍົກງາສູງໄດ້ໂດຍເສົາບໍ່ໂຜ່ ຕັກສິນຄ້າໃນຕູ້ຄອນເທນເນີສະດວກ.",
    "image_url": "/images/forklifts/heli_h3_red.jpg",
    "qty_on_hand": 5,
    "unit_price": 1200000,
    "currency": "LAK",
    "specs": {
      "Rated Capacity": "3500 kg",
      "Lift Height": "4500 mm (Triplex Mast)",
      "Free Lift": "1150 mm",
      "Engine": "Isuzu C240 Diesel"
    },
    "lead_time": "Immediate Dispatch",
    "warranty_months": 0
  },
  {
    "sku_id": "rnt-fl-tcm25",
    "sku_code": "RNT-FL-TCM25",
    "barcode": null,
    "part_name": "TCM 2.5-Ton Compact Container Stuffer Diesel Forklift (Rental / Day)",
    "part_name_lo": "ລົດຍົກ TCM 2.5 ໂຕນ ຂະໜາດກະທັດຮັດ ສຳລັບຕັກສິນຄ້າໃນຕູ້ຄອນເທນເນີ",
    "category": "Equipment Rental",
    "description": "Compact Japanese TCM 2.5-ton forklift with low overhead guard profile specifically designed for drive-in container devanning.",
    "description_lo": "ລົດຍົກ TCM 2.5 ໂຕນ ຫຼັງຄາໂປຣໄຟລ໌ຕໍ່າ ຖືກອອກແບບມາເພື່ອແລ່ນເຂົ້າ-ອອກຕູ້ຄອນເທນເນີໄດ້ຢ່າງຄ່ອງຕົວ ວ່ອງໄວ.",
    "image_url": "/images/forklifts/tcm_fd25_yellow.jpg",
    "qty_on_hand": 7,
    "unit_price": 850000,
    "currency": "LAK",
    "specs": {
      "Rated Capacity": "2500 kg",
      "Overhead Guard Height": "2050 mm",
      "Mast": "Full Free Container Mast",
      "Transmission": "Automatic Powershift"
    },
    "lead_time": "Immediate Dispatch",
    "warranty_months": 0
  },
  {
    "sku_id": "rnt-fl-mit30",
    "sku_code": "RNT-FL-MIT30",
    "barcode": null,
    "part_name": "Mitsubishi 3.0-Ton Heavy Duty Forklift with Dual Front Solid Tires (Rental / Day)",
    "part_name_lo": "ລົດຍົກ Mitsubishi 3.0 ໂຕນ ຢາງຕັນຄູ່ໜ້າ (ສຳລັບພື້ນທີ່ບໍ່ລຽບ ແລະ ງານໜັກ)",
    "category": "Equipment Rental",
    "description": "Heavy duty counterbalance forklift with dual front solid wheels providing superior stability when carrying wide, heavy off-center loads.",
    "description_lo": "ລົດຍົກ Mitsubishi 3.0 ໂຕນ ລໍ້ໜ້າຢາງຕັນຄູ່ ເພີ່ມຄວາມໝັ້ນຄົງສູງສຸດ ເມື່ອຍົກສິນຄ້າກວ້າງ ຫຼື ແລ່ນເທິງພື້ນດິນບໍ່ສະເໝີ.",
    "image_url": "/images/forklifts/mitsubishi_heavy_dual.jpg",
    "qty_on_hand": 4,
    "unit_price": 1100000,
    "currency": "LAK",
    "specs": {
      "Rated Capacity": "3000 kg",
      "Front Tires": "Dual Solid Resilient",
      "Lift Height": "3500 mm",
      "Engine": "Mitsubishi S4S Industrial"
    },
    "lead_time": "Immediate Dispatch",
    "warranty_months": 0
  }
];
