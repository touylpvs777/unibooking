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
  specs?: { [key: string]: string };
  spec_sheet_url?: string;
  lead_time?: string;
  bulk_pricing?: BulkPricingTier[];
  colors?: string[];
  sizes?: string[];
  gallery_images?: string[];
  related_skus?: string[];
}

// Enterprise Catalog for Industrial Parts & Heavy Machinery Equipment
export const INITIAL_CATALOG: InventoryItem[] = [
  {
    sku_id: 'ind-001',
    sku_code: 'CAT-FLT-8800',
    barcode: '8850123001',
    part_name: 'High-Efficiency Industrial Engine Filter',
    part_name_lo: 'ໝໍ້ຕອງນ້ຳມັນເຄື່ອງຈັກໜັກ ປະສິດທິພາບສູງ (CAT/Komatsu)',
    category: 'Parts & Components',
    description: 'Heavy duty multi-layer oil filter designed for extreme mining and construction diesel engines.',
    description_lo: 'ໝໍ້ຕອງນ້ຳມັນເຄື່ອງຄຸນນະພາບສູງ ຮອງຮັບເຄື່ອງຈັກກາຊວນໜັກ ສຳລັບວຽກບໍ່ແຮ່ ແລະ ກໍ່ສ້າງ.',
    image_url: '/images/catalog/real/modal_cat_flt_8800_viewport_1788006492943.png',
    qty_on_hand: 45,
    unit_price: 25.3,
    specs: {'Brand': 'CAT', 'Model': 'C15-Pro', 'Size': '10 kg, Heavy Duty', 'Application': 'Volvo D13 Heavy Duty'},
    spec_sheet_url: '/specs/cat-flt-8800.pdf',
    lead_time: 'In Stock (1-2 Days)',
    bulk_pricing: [
      { min_qty: 10, price: 22.0 },
      { min_qty: 50, price: 19.0 }
    ],
    related_skus: ['ind-015', 'ind-004']
  },
  {
    sku_id: 'ind-002',
    sku_code: 'HYD-PMP-550',
    barcode: '8850123002',
    part_name: 'High-Pressure Hydraulic Piston Pump',
    part_name_lo: 'ປ້ຳໄຮໂດຣລິກແຮງດັນສູງ ສຳລັບລົດຈົກ ແລະ ລົດຂຸດ (Hydraulic Pump)',
    category: 'Hydraulics & Pneumatics',
    description: 'Variable displacement axial piston pump for heavy excavators and industrial hydraulic machinery.',
    description_lo: 'ປ້ຳໄຮໂດຣລິກແກນລູກສູບ ໃຫ້ແຮງດັນສະໝ່ຳສະເໝີ ທົນທານຕໍ່ການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/burn_kit_1787994421467.jpg',
    qty_on_hand: 8,
    unit_price: 111.81,
    specs: {'Brand': 'Parker', 'Model': 'A10V', 'Size': '200 Bar, High Flow', 'Application': 'Industrial Hydraulic Presses'},
    spec_sheet_url: '/specs/hyd-pmp-550.pdf',
    lead_time: 'Ships in 3-5 Days',
    bulk_pricing: [
      { min_qty: 5, price: 270.0 }
    ],
    related_skus: ['ind-007', 'ind-014']
  },
  {
    sku_id: 'ind-003',
    sku_code: 'EXC-TRK-700',
    barcode: '8850123003',
    part_name: 'Forged Steel Excavator Track Link Assembly',
    part_name_lo: 'ສາຍພານຕີນຕະຂາບເຫຼັກກ້າ ລົດຈົກໜັກ (Track Link Chain)',
    category: 'Heavy Equipment & Machinery',
    description: 'Heat-treated alloy steel track links built for abrasive rocky terrains and mining sites.',
    description_lo: 'ໂສ້ຕີນຕະຂາບເຫຼັກກ້າຊຸບແຂງ ພິເສດສຳລັບໜ້າວຽກຫີນ ແລະ ບໍ່ແຮ່.',
    image_url: '/images/catalog/real/thrust_bearing_1787994570116.jpg',
    qty_on_hand: 14,
    unit_price: 19.55,
    specs: {'Brand': 'ITR', 'Model': 'J350', 'Size': 'Heat Treated 40mm', 'Application': 'CAT 320D / Komatsu PC200'},
    spec_sheet_url: '/specs/exc-trk-700.pdf',
    lead_time: 'In Stock (1-3 Days)',
    related_skus: ['ind-013', 'ind-002']
  },
  {
    sku_id: 'ind-004',
    sku_code: 'BRK-CER-990',
    barcode: '8850123004',
    part_name: 'Ceramic Heavy Duty Brake Pad Set',
    part_name_lo: 'ຜ້າເບຣກເຊລາມິກ ທົນຄວາມຮ້ອນສູງ ສຳລັບລົດບັນທຸກໜັກ (Brake Pads)',
    category: 'Parts & Components',
    description: 'Premium carbon-metallic brake pads engineered for heavy commercial trucks and dumpers.',
    description_lo: 'ຜ້າເບຣກຄຸນນະພາບສູງ ບໍ່ເກີດສຽງດັງ ທົນຄວາມຮ້ອນໄດ້ສູງເຖິງ 750°C.',
    image_url: '/images/catalog/real/ibeam_steel_1787994462788.jpg',
    qty_on_hand: 80,
    unit_price: 19.55,
    specs: {'Brand': 'Volvo OEM', 'Model': 'ISX-Series', 'Size': '40 kg, Heavy Duty', 'Application': 'Volvo D13 Heavy Duty'},
    spec_sheet_url: '/specs/brk-cer-990.pdf',
    lead_time: 'In Stock (1-2 Days)',
    bulk_pricing: [
      { min_qty: 10, price: 17.0 },
      { min_qty: 20, price: 15.0 }
    ]
  },
  {
    sku_id: 'ind-005',
    sku_code: 'SLR-INV-50K',
    barcode: '8850123005',
    part_name: 'Commercial Solar 50kW String Inverter',
    part_name_lo: 'ອິນເວີເຕີໂຊລາເຊວ 50kW ລະດັບໂຄງການອຸດສາຫະກຳ (Industrial Inverter)',
    category: 'EV & Electrical Systems',
    description: 'Three-phase grid-tied solar inverter with 98.8% max efficiency and smart remote monitoring.',
    description_lo: 'ອິນເວີເຕີ 3 ເຟສ ສຳລັບໂຄງການໂຊລາຟາມ ແລະ ໂຮງງານອຸດສາຫະກຳ ປະສິດທິພາບສູງ 98.8%.',
    image_url: '/images/catalog/real/arcfox_alpha_fluid_1787994887698.jpg',
    qty_on_hand: 12,
    unit_price: 80.5,
    specs: {'Brand': 'Bosch', 'Model': 'IND-4535', 'Size': 'Standard Fitment (3 kg)', 'Application': 'Universal Commercial Compatibility'},
    spec_sheet_url: '/specs/slr-inv-50k.pdf',
    lead_time: 'Pre-order (14-21 Days)',
    related_skus: ['ind-012', 'ind-011']
  },
  {
    sku_id: 'ind-006',
    sku_code: 'MIN-BLT-300',
    barcode: '8850123006',
    part_name: 'High Tensile Conveyor Belt (Mining Grade)',
    part_name_lo: 'ສາຍພານລຳລຽງແຮ່ທາດ ທົນແຮງດຶງສູງ (Mining Conveyor Belt)',
    category: 'Heavy Equipment & Machinery',
    description: 'Steel cord reinforced rubber conveyor belt for high volume aggregate and mineral transport.',
    description_lo: 'ສາຍພານຢາງເສີມສາຍສະລິງເຫຼັກກ້າ ສຳລັບລຳລຽງຫີນ ແລະ ແຮ່ທາດໄລຍະໄກ.',
    image_url: '/images/catalog/real/industrial_chiller_1787995257600.jpg',
    qty_on_hand: 25,
    unit_price: 80.5,
    specs: {'Brand': 'CAT', 'Model': 'PC200-8', 'Size': 'Heat Treated 30mm', 'Application': 'CAT 320D / Komatsu PC200'},
    spec_sheet_url: '/specs/min-blt-300.pdf',
    lead_time: 'In Stock (2-3 Days)'
  },
  {
    sku_id: 'ind-007',
    sku_code: 'HYD-CYL-180',
    barcode: '8850123007',
    part_name: 'Double-Acting Hydraulic Cylinder Arm',
    part_name_lo: 'ກະບອກສູບໄຮໂດຣລິກສອງທາງ ສຳລັບບູມລົດຈົກ (Hydraulic Cylinder)',
    category: 'Hydraulics & Pneumatics',
    description: 'Chrome-plated rod heavy duty boom and bucket hydraulic cylinder with premium NOK seals.',
    description_lo: 'ກະບອກໄຮໂດຣລິກແກນຊຸບໂຄຣມຽມໜາ ພ້ອມຊີລກັນຮົ່ວຄຸນນະພາບສູງ ຈາກຍີ່ປຸ່ນ.',
    image_url: '/images/catalog/real/mig_welding_wire_1787995228846.jpg',
    qty_on_hand: 6,
    unit_price: 80.5,
    specs: {'Brand': 'Danfoss', 'Model': 'Series 2H', 'Size': '100 Bar, High Flow', 'Application': 'Industrial Hydraulic Presses'},
    spec_sheet_url: '/specs/hyd-cyl-180.pdf',
    lead_time: 'Ships in 7 Days'
  },
  {
    sku_id: 'ind-008',
    sku_code: 'TLS-TRQ-1500',
    barcode: '8850123008',
    part_name: 'Digital High-Torque Impact Wrench Kit',
    part_name_lo: 'ຊຸດໄຂຄວງລົມ/ໄຟຟ້າ ດິຈິຕອນ ແຮງບິດສູງ 1500Nm (Heavy Torque Kit)',
    category: 'Tools, Safety & Medical',
    description: 'Industrial grade brushless impact wrench with dual lithium-ion 21V batteries and socket set.',
    description_lo: 'ເຄື່ອງຂັນນັອດແຮງບິດສູງ 1500Nm ສຳລັບງານສ້ອມແປງເຄື່ອງຈັກໜັກ ແລະ ໂຄງສ້າງເຫຼັກ.',
    image_url: '/images/catalog/real/first_aid_cabinet_1787987096264.jpg',
    qty_on_hand: 32,
    unit_price: 80.5,
    specs: {'Brand': 'Bosch', 'Model': 'IND-7715', 'Size': 'Standard Fitment (5 kg)', 'Application': 'Universal Commercial Compatibility'},
    spec_sheet_url: '/specs/tls-trq-1500.pdf',
    lead_time: 'In Stock (1-2 Days)',
    colors: ['ດຳ (Black)', 'ເຫຼືອງ (Yellow)', 'ຂຽວ (Green)'],
    sizes: ['ມາດຕະຖານ (Standard)', 'ຍາວພິເສດ (Extended Anvil)'],
    bulk_pricing: [
      { min_qty: 5, price: 70.0 },
      { min_qty: 15, price: 64.0 }
    ],
    related_skus: ['ind-004', 'ind-001']
  },
  {
    sku_id: 'ind-009',
    sku_code: 'GEN-DSL-100K',
    barcode: '8850123009',
    part_name: 'Industrial Diesel Generator 100kVA',
    part_name_lo: 'ເຄື່ອງປັ່ນໄຟກາຊວນ 3 ເຟສ 100kVA (Diesel Generator)',
    category: 'Heavy Equipment & Machinery',
    description: 'Heavy duty soundproof diesel generator set for continuous industrial and construction site power.',
    description_lo: 'ເຄື່ອງປັ່ນໄຟກາຊວນຕູ້ເກັບສຽງ ປະສິດທິພາບສູງ ໃຊ້ສຳລັບໂຮງງານ ຫຼື ໄຊດ໌ງານກໍ່ສ້າງ.',
    image_url: '/images/catalog/real/store_page_view_1787944254540.png',
    qty_on_hand: 3,
    unit_price: 69.35,
    specs: {'Brand': 'Komatsu', 'Model': 'PC200-8', 'Size': 'Heat Treated 30mm', 'Application': 'Volvo Wheel Loaders'},
    spec_sheet_url: '/specs/gen-dsl-100k.pdf',
    lead_time: 'Ships in 7-10 Days',
    bulk_pricing: [
      { min_qty: 2, price: 2360.0 }
    ],
    related_skus: ['ind-010', 'ind-008']
  },
  {
    sku_id: 'ind-010',
    sku_code: 'WLD-MIG-500A',
    barcode: '8850123010',
    part_name: 'Industrial MIG Welding Machine 500A',
    part_name_lo: 'ຕູ້ຈອດອຸດສາຫະກຳ MIG/MAG 500A (Welding Machine)',
    category: 'Tools, Safety & Medical',
    description: 'High performance inverter-based MIG/MAG welding machine for heavy steel fabrication.',
    description_lo: 'ຕູ້ຈອດ 500A ລະບົບອິນເວີເຕີສຳລັບງານເຊື່ອມໂຄງສ້າງເຫຼັກຂະໜາດໃຫຍ່ ແລະ ຕໍ່ເຮືອ.',
    image_url: '/images/catalog/real/nitrile_gloves_1787986515132.jpg',
    qty_on_hand: 15,
    unit_price: 181.7,
    specs: {'Brand': 'SKF', 'Model': 'IND-7507', 'Size': 'Standard Fitment (45 kg)', 'Application': 'Universal Commercial Compatibility'},
    spec_sheet_url: '/specs/wld-mig-500a.pdf',
    lead_time: 'In Stock (1-2 Days)'
  },
  {
    sku_id: 'ind-011',
    sku_code: 'PMP-SUB-15HP',
    barcode: '8850123011',
    part_name: 'Submersible Deep Well Water Pump 15HP',
    part_name_lo: 'ປ້ຳນ້ຳບາດານ 3 ເຟສ ຂະໜາດ 15 ມ້າ (Submersible Pump)',
    category: 'EV & Electrical Systems',
    description: 'Stainless steel deep well submersible pump for agricultural irrigation and mining dewatering.',
    description_lo: 'ປ້ຳຊຳເມີດສະແຕນເລດ 15 ມ້າ ດູດນ້ຳເລິກ ໃຊ້ສຳລັບການກະເສດ ຫຼື ສູບນ້ຳອອກຈາກບໍ່ແຮ່.',
    image_url: '/images/catalog/real/portland_cement_bag_1787993158262.jpg',
    qty_on_hand: 20,
    unit_price: 181.7,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-2402', 'Size': 'Standard Fitment (46 kg)', 'Application': 'Universal Commercial Compatibility'},
    spec_sheet_url: '/specs/pmp-sub-15hp.pdf',
    lead_time: 'In Stock (1-3 Days)',
    bulk_pricing: [
      { min_qty: 5, price: 158.0 },
      { min_qty: 10, price: 144.0 }
    ]
  },
  {
    sku_id: 'ind-012',
    sku_code: 'BTR-LFP-48V',
    barcode: '8850123012',
    part_name: 'Lithium-ion LiFePO4 Server Rack Battery 48V',
    part_name_lo: 'ແບັດເຕີຣີ ລິທຽມໄອອອນ 48V 100Ah ສຳລັບລະບົບໂຊລາ (Lithium Battery)',
    category: 'EV & Electrical Systems',
    description: 'Deep cycle lithium iron phosphate (LiFePO4) energy storage battery for solar off-grid systems.',
    description_lo: 'ແບັດເຕີຣີລິທຽມ LiFePO4 ຄຸນນະພາບສູງ ສຳລັບເກັບພະລັງງານແສງອາທິດ ມີອາຍຸການໃຊ້ງານດົນນານກວ່າ 6000 ຮອບ.',
    image_url: '/images/catalog/real/truck_battery_1787987701312.jpg',
    qty_on_hand: 40,
    unit_price: 78.61,
    specs: {'Brand': 'Parker', 'Model': 'IND-3477', 'Size': 'Standard Fitment (14 kg)', 'Application': 'Universal Commercial Compatibility'},
    spec_sheet_url: '/specs/btr-lfp-48v.pdf',
    lead_time: 'In Stock (1-2 Days)',
    bulk_pricing: [
      { min_qty: 4, price: 250.0 },
      { min_qty: 10, price: 220.0 }
    ]
  },
  {
    sku_id: 'ind-013',
    sku_code: 'EXC-BKT-T30',
    barcode: '8850123013',
    part_name: 'Forged Excavator Bucket Teeth (Standard)',
    part_name_lo: 'ແຂ້ວລົດຈົກ ເຫຼັກຟັອດທົນທານ (Excavator Bucket Teeth)',
    category: 'Heavy Equipment & Machinery',
    description: 'High abrasion resistant forged steel bucket teeth for PC200/CAT320 excavators.',
    description_lo: 'ແຂ້ວລົດຈົກ ເຫຼັກຟັອດພິເສດ ທົນທານຕໍ່ການສຽດສີສູງ ສຳລັບລົດຈົກ PC200 ຫາ CAT320.',
    image_url: '/images/catalog/real/trauma_kit_1787994372278.jpg',
    qty_on_hand: 120,
    unit_price: 5.06,
    specs: {'Brand': 'ITR', 'Model': 'PC200-8', 'Size': 'Heat Treated 40mm', 'Application': 'CAT 320D / Komatsu PC200'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 4.4 },
      { min_qty: 50, price: 3.6 }
    ]
  },
  {
    sku_id: 'ind-014',
    sku_code: 'HYD-HOS-4W',
    barcode: '8850123014',
    part_name: '4-Wire High Pressure Hydraulic Hose',
    part_name_lo: 'ສາຍໄຮໂດຣລິກ 4 ຊັ້ນ ແຮງດັນສູງ (Hydraulic Hose 4-Wire)',
    category: 'Hydraulics & Pneumatics',
    description: 'EN 856 4SH multi-spiral wire reinforced hydraulic hose for extreme high-pressure applications.',
    description_lo: 'ສາຍໄຮໂດຣລິກເສີມລວດ 4 ຊັ້ນ ທົນແຮງດັນສູງພິເສດ ສຳລັບເຄື່ອງຈັກໜັກ ແລະ ລົດຂຸດ.',
    image_url: '/images/catalog/real/forklift_wheel_1787945554947.jpg',
    qty_on_hand: 500,
    unit_price: 3.1,
    specs: {'Brand': 'Eaton', 'Model': 'Series 2H', 'Size': '100 Bar, High Flow', 'Application': '20-Ton Excavators'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 20, price: 2.7 },
      { min_qty: 100, price: 2.2 }
    ]
  },
  {
    sku_id: 'ind-015',
    sku_code: 'FLT-AIR-HD9',
    barcode: '8850123015',
    part_name: 'Heavy Duty Primary Air Filter Element',
    part_name_lo: 'ໝໍ້ຕອງອາກາດ ເຄື່ອງຈັກໜັກ (Heavy Duty Air Filter)',
    category: 'Parts & Components',
    description: 'Radial seal primary air filter with nano-fiber technology for dusty mining environments.',
    description_lo: 'ໝໍ້ຕອງອາກາດປະສິດທິພາບສູງ ສຳລັບລົດບັນທຸກ ແລະ ລົດຂຸດ ໃນພື້ນທີ່ຂີ້ຝຸ່ນໜາເຊັ່ນ ບໍ່ແຮ່.',
    image_url: '/images/catalog/real/specs_table_1787943984002.png',
    qty_on_hand: 65,
    unit_price: 9.2,
    specs: {'Brand': 'Cummins', 'Model': 'D13-Spec', 'Size': '20 kg, Heavy Duty', 'Application': 'Cummins ISX / ISL Engines'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 8.0 },
      { min_qty: 25, price: 7.0 }
    ]
  },
  {
    sku_id: 'ind-016',
    sku_code: 'ALT-24V-80A',
    barcode: '8850123016',
    part_name: '24V 80A Heavy Duty Alternator',
    part_name_lo: 'ໄດຊາດ 24V 80A ສຳລັບລົດຈົກ/ລົດບັນທຸກ (Alternator 24V)',
    category: 'Parts & Components',
    description: 'Brushless heavy duty alternator designed to withstand high vibration in earthmoving equipment.',
    description_lo: 'ໄດຊາດ 24V 80A ອອກແບບມາເພື່ອທົນທານຕໍ່ແຮງສັ່ນສະເທືອນສຳລັບເຄື່ອງຈັກໜັກ.',
    image_url: '/images/catalog/real/forklift_side_1787945419504.jpg',
    qty_on_hand: 18,
    unit_price: 46.0,
    specs: {'Brand': 'Mahle', 'Model': 'D13-Spec', 'Size': '30 kg, Heavy Duty', 'Application': 'Cummins ISX / ISL Engines'},
    lead_time: 'In Stock (1-2 Days)',
    bulk_pricing: [
      { min_qty: 5, price: 40.0 }
    ]
  },
  {
    sku_id: 'ev-001',
    sku_code: 'EV-CBL-T2-22KW',
    barcode: '8850123017',
    part_name: 'Premium EV Charging Cable Type 2 (22kW)',
    part_name_lo: 'ສາຍສາກລົດໄຟຟ້າ Type 2 ຂະໜາດ 22kW (EV Charging Cable)',
    category: 'EV & Electrical Systems',
    description: 'High-quality 32A 22kW three-phase Type 2 EV charging cable with ergonomic connectors.',
    description_lo: 'ສາຍສາກລົດ EV Type 2 ຄຸນນະພາບສູງ ຮອງຮັບການສາກໄວ 22kW 3 ເຟສ ສຳລັບລົດໄຟຟ້າທຸກລຸ້ນ.',
    image_url: '/images/catalog/real/readymix_concrete_1787994475610.jpg',
    qty_on_hand: 50,
    unit_price: 39.1,
    specs: {'Brand': 'SKF', 'Model': 'IND-6921', 'Size': 'Standard Fitment (37 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 5, price: 34.0 },
      { min_qty: 20, price: 31.0 }
    ],
    related_skus: ['ev-003']
  },
  {
    sku_id: 'ev-002',
    sku_code: 'EV-FLT-HEPA',
    barcode: '8850123018',
    part_name: 'EV HEPA Cabin Air Filter',
    part_name_lo: 'ໝໍ້ຕອງແອ HEPA ສຳລັບລົດໄຟຟ້າ (EV Cabin Filter)',
    category: 'EV & Electrical Systems',
    description: 'Medical-grade HEPA cabin air filter for electric vehicles, blocking PM2.5, odors, and allergens.',
    description_lo: 'ໝໍ້ຕອງແອ HEPA ປະສິດທິພາບສູງ ກອງຝຸ່ນ PM2.5 ແລະ ກິ່ນ ພິເສດສຳລັບລົດ EV.',
    image_url: '/images/catalog/real/coolant_1787994663953.jpg',
    qty_on_hand: 120,
    unit_price: 6.9,
    specs: {'Brand': 'Bosch', 'Model': 'IND-6498', 'Size': 'Standard Fitment (8 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 6.0 },
      { min_qty: 50, price: 5.0 }
    ]
  },
  {
    sku_id: 'ev-003',
    sku_code: 'EV-BTR-12V-AGM',
    barcode: '8850123019',
    part_name: '12V AGM Auxiliary Battery for EV',
    part_name_lo: 'ແບັດເຕີຣີ 12V AGM ສຳລັບລະບົບລົດໄຟຟ້າ (EV Aux Battery)',
    category: 'EV & Electrical Systems',
    description: 'High-durability 12V AGM battery to power internal electronics and control systems of electric vehicles.',
    description_lo: 'ແບັດເຕີຣີ 12V ລະບົບ AGM ທົນທານສູງ ສຳລັບຈ່າຍໄຟໃຫ້ລະບົບຄວບຄຸມ ແລະ ອຸປະກອນພາຍໃນລົດ EV.',
    image_url: '/images/catalog/real/air_compressor_1787993354213.jpg',
    qty_on_hand: 35,
    unit_price: 31.05,
    specs: {'Brand': 'Cummins', 'Model': 'IND-6099', 'Size': 'Standard Fitment (50 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock (1-2 Days)',
    bulk_pricing: [
      { min_qty: 5, price: 27.0 },
      { min_qty: 20, price: 24.0 }
    ]
  },
  {
    sku_id: 'ev-004',
    sku_code: 'EV-TIR-235-45R18',
    barcode: '8850123020',
    part_name: 'EV-Specific Low Rolling Resistance Tire',
    part_name_lo: 'ຢາງລົດ EV ປະຢັດພະລັງງານ (EV Tire 235/45R18)',
    category: 'EV & Electrical Systems',
    description: 'Acoustic tech tires specially designed for electric vehicles, offering low rolling resistance for maximum range and low noise.',
    description_lo: 'ຢາງລົດຍົນອອກແບບສະເພາະສຳລັບລົດໄຟຟ້າ ຊ່ວຍເພີ່ມໄລຍະທາງ (Range) ແລະ ຫຼຸດສຽງລົບກວນພາຍໃນຫ້ອງໂດຍສານ.',
    image_url: '/images/catalog/real/safety_goggles_1787986528762.jpg',
    qty_on_hand: 80,
    unit_price: 44.85,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-7051', 'Size': 'Standard Fitment (8 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock (1-2 Days)',
    bulk_pricing: [
      { min_qty: 4, price: 39.0 },
      { min_qty: 20, price: 35.0 }
    ]
  },
  {
    sku_id: 'ev-005',
    sku_code: 'EV-FLUID-BRK',
    barcode: '8850123021',
    part_name: 'EV Brake Fluid DOT 4 Low Viscosity',
    part_name_lo: 'ນ້ຳມັນເບຣກລົດ EV DOT 4 (EV Brake Fluid)',
    category: 'EV & Electrical Systems',
    description: 'Specialized low-viscosity DOT 4 brake fluid optimized for electric vehicles with regenerative braking systems.',
    description_lo: 'ນ້ຳມັນເບຣກ DOT 4 ສູດ Low Viscosity ອອກແບບສະເພາະສຳລັບລະບົບເບຣກຂອງລົດໄຟຟ້າ (EV) ທີ່ໃຊ້ລະບົບ Regenerative Braking.',
    image_url: '/images/catalog/real/mining_slurry_pump_1787986331620.jpg',
    qty_on_hand: 150,
    unit_price: 4.6,
    specs: {'Brand': 'SKF', 'Model': 'IND-7296', 'Size': 'Standard Fitment (6 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 12, price: 4.0 },
      { min_qty: 48, price: 3.6 }
    ]
  },
  {
    sku_id: 'ev-006',
    sku_code: 'EV-COOL-BTR',
    barcode: '8850123022',
    part_name: 'EV Battery Coolant Premium Antifreeze',
    part_name_lo: 'ນ້ຳຢາຫຼໍ່ເຢັນແບັດເຕີຣີລົດ EV (EV Battery Coolant)',
    category: 'EV & Electrical Systems',
    description: 'Advanced thermal management coolant tailored to maintain optimal temperatures for high-voltage EV battery packs.',
    description_lo: 'ນ້ຳຢາຫຼໍ່ເຢັນຊັ້ນດີ ອອກແບບສະເພາະສຳລັບຮັກສາອຸນຫະພູມແບັດເຕີຣີລົດໄຟຟ້າ (EV) ໃຫ້ເຮັດວຽກໄດ້ເຕັມປະສິດທິພາບ.',
    image_url: '/images/catalog/real/welding_machine_1787945607244.jpg',
    qty_on_hand: 200,
    unit_price: 7.82,
    specs: {'Brand': 'Bosch', 'Model': 'IND-9793', 'Size': 'Standard Fitment (44 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 6, price: 6.8 },
      { min_qty: 24, price: 6.0 }
    ]
  },
  {
    sku_id: 'ind-017',
    sku_code: 'PMP-SLR-1210',
    barcode: '8850123023',
    part_name: 'Heavy Duty Centrifugal Slurry Pump',
    part_name_lo: 'ປ້ຳດູດຂີ້ຕົມ/ນ້ຳແຮ່ ອຸດສາຫະກຳ (Slurry Pump)',
    category: 'Heavy Equipment & Machinery',
    description: '12/10 heavy duty centrifugal slurry pump with high chrome alloy wear parts for abrasive mining applications.',
    description_lo: 'ປ້ຳຫອຍໂຂ່ງດູດຂີ້ຕົມ ແລະ ແຮ່ທາດ ພ້ອມໃບພັດເຫຼັກລໍ່ High Chrome ທົນທານຕໍ່ການສຽດສີສູງ ສຳລັບໂຮງງານແຕ່ງແຮ່.',
    image_url: '/images/catalog/real/search_results_forklift_1787945902300.png',
    qty_on_hand: 2,
    unit_price: 58.42,
    specs: {'Brand': 'CAT', 'Model': 'HD-Track', 'Size': 'Heat Treated 30mm', 'Application': 'Mining Dump Trucks'},
    lead_time: 'Pre-order (30 Days)',
    bulk_pricing: []
  },
  {
    sku_id: 'ind-018',
    sku_code: 'MN-JAW-400',
    barcode: '8850123024',
    part_name: 'Manganese Steel Jaw Crusher Plate',
    part_name_lo: 'ແຜ່ນເຫຼັກບົດຫີນ ສຳລັບເຄື່ອງໂມ້ (Jaw Crusher Plate)',
    category: 'Heavy Equipment & Machinery',
    description: 'High manganese steel (Mn18Cr2) fixed and movable jaw plates for primary rock crushing.',
    description_lo: 'ແຜ່ນເຫຼັກແມງການີສສູງ ສຳລັບເຄື່ອງບົດຫີນ/ແຮ່ ທົນແຮງກະແທກ ແລະ ການສຽດສີໄດ້ດີເລີດ.',
    image_url: '/images/catalog/real/solar_inverter_1787945369533.jpg',
    qty_on_hand: 24,
    unit_price: 54.75,
    specs: {'Brand': 'Berco', 'Model': 'PC200-8', 'Size': 'Heat Treated 30mm', 'Application': 'Mining Dump Trucks'},
    lead_time: 'In Stock (3-5 Days)',
    bulk_pricing: [
      { min_qty: 4, price: 220.0 }
    ]
  },
  {
    sku_id: 'ind-019',
    sku_code: 'OTR-TIR-295R25',
    barcode: '8850123025',
    part_name: 'OTR Dump Truck Tire 29.5R25',
    part_name_lo: 'ຢາງລົດບັນທຸກໜັກໃນບໍ່ແຮ່ (OTR Tire 29.5R25)',
    category: 'Heavy Equipment & Machinery',
    description: 'Radial OTR earthmover tire with aggressive E-4 rock tread pattern for articulated dump trucks and loaders.',
    description_lo: 'ຢາງລົດດຳ້/ລົດຕັກ OTR ຂະໜາດ 29.5R25 ດອກຢາງເລິກພິເສດ ກັນຫີນບາດ ແລະ ທົນທານຕໍ່ການຮັບນ້ຳໜັກສູງ.',
    image_url: '/images/catalog/real/ev_brake_fluid_1787947002763.jpg',
    qty_on_hand: 16,
    unit_price: 78.06,
    specs: {'Brand': 'Komatsu', 'Model': 'PC200-8', 'Size': 'Heat Treated 30mm', 'Application': 'Volvo Wheel Loaders'},
    lead_time: 'In Stock (1-2 Days)',
    bulk_pricing: [
      { min_qty: 4, price: 540.0 },
      { min_qty: 12, price: 510.0 }
    ]
  },
  {
    sku_id: 'ind-020',
    sku_code: 'SAF-SHO-FDB',
    barcode: '8850123026',
    part_name: 'Food & Beverage Grade Safety Shoes (Steel Toe)',
    part_name_lo: 'ເກີບເຊັບຕີ້ຫົວເຫຼັກກັນມື່ນ ສຳລັບໂຮງງານອາຫານ/ເຄື່ອງດື່ມ (Safety Shoes)',
    category: 'Tools, Safety & Medical',
    description: 'White slip-resistant steel-toe boots designed specifically for the rigorous hygiene and safety standards of food, beverage, and pharmaceutical manufacturing.',
    description_lo: 'ເກີບເຊັບຕີ້ຫົວເຫຼັກສີຂາວ ກັນນ້ຳ ກັນມື່ນ ໄດ້ມາດຕະຖານຄວາມສະອາດ (Food Grade) ສຳລັບໂຮງງານເບຍ, ໂຮງງານຢາ, ແລະ ອາຫານ.',
    image_url: '/images/catalog/real/aion_ev_coolant_1787991371969.jpg',
    qty_on_hand: 85,
    unit_price: 9.2,
    specs: {'Brand': 'Parker', 'Model': 'IND-8072', 'Size': 'Standard Fitment (15 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock (1-2 Days)',
    bulk_pricing: [
      { min_qty: 10, price: 8.0 },
      { min_qty: 50, price: 7.0 }
    ],
    sizes: ['EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44']
  },
  {
    sku_id: 'ind-021',
    sku_code: 'SAF-GLV-NIT',
    barcode: '8850123027',
    part_name: 'Industrial Nitrile Disposable Gloves (Box of 100)',
    part_name_lo: 'ຖົງມືຢາງໄນໄຕຣ ສຳລັບອຸດສາຫະກຳ (Nitrile Gloves)',
    category: 'Tools, Safety & Medical',
    description: 'Chemical-resistant and food-safe blue nitrile disposable gloves. Powder-free and latex-free.',
    description_lo: 'ຖົງມືຢາງສີຟ້າ ປາສະຈາກແປ້ງ ກັນສານເຄມີ ແລະ ປອດໄພສຳລັບສຳຜັດອາຫານ (Food Safe). 1 ກ່ອງມີ 100 ຊິ້ນ.',
    image_url: '/images/catalog/real/honda_inverter_coolant_1787991385806.jpg',
    qty_on_hand: 300,
    unit_price: 2.42,
    specs: {'Brand': 'Parker', 'Model': 'IND-1943', 'Size': 'Standard Fitment (10 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 20, price: 2.1 },
      { min_qty: 100, price: 1.7 }
    ],
    sizes: ['M', 'L', 'XL']
  },
  {
    sku_id: 'ind-022',
    sku_code: 'SAF-GOG-CLR',
    barcode: '8850123028',
    part_name: 'Anti-Fog Chemical Splash Safety Goggles',
    part_name_lo: 'ແວ່ນຕາເຊັບຕີ້ກັນສານເຄມີ ປ້ອງກັນໝອກ (Safety Goggles)',
    category: 'Tools, Safety & Medical',
    description: 'Clear industrial safety goggles with rubber seal and anti-fog coating to protect eyes from chemical splashes and dust.',
    description_lo: 'ແວ່ນຕາເຊັບຕີ້ ແບບມີຂອບຢາງແນບໜ້າກັນນ້ຳກະເດັນ ແລະ ກັນຝຸ່ນ. ເລນໃສເຄືອບສານກັນໝອກ (Anti-Fog).',
    image_url: '/images/catalog/real/tesla_wiper_blades_1787992139928.jpg',
    qty_on_hand: 150,
    unit_price: 3.45,
    specs: {'Brand': 'SKF', 'Model': 'IND-4710', 'Size': 'Standard Fitment (47 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 20, price: 3.0 }
    ]
  },
  {
    sku_id: 'ind-023',
    sku_code: 'SAF-EAR-MF',
    barcode: '8850123029',
    part_name: 'Industrial Noise Canceling Ear Muffs',
    part_name_lo: 'ທີ່ຄອບຫູກັນສຽງດັງ (Industrial Ear Muffs)',
    category: 'Tools, Safety & Medical',
    description: 'High-visibility yellow ear defenders providing excellent hearing protection in noisy environments like bottling plants or heavy manufacturing.',
    description_lo: 'ອຸປະກອນຄອບຫູລົດສຽງດັງສຳລັບໂຮງງານອຸດສາຫະກຳ ເຊັ່ນ ໂຮງງານບັນຈຸຂວດ ເພື່ອປ້ອງກັນອັນຕະລາຍຕໍ່ການໄດ້ຍິນ.',
    image_url: '/images/catalog/real/industrial_motor_1787993367799.jpg',
    qty_on_hand: 60,
    unit_price: 5.06,
    specs: {'Brand': 'Cummins', 'Model': 'IND-4766', 'Size': 'Standard Fitment (7 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 4.4 },
      { min_qty: 50, price: 3.8 }
    ]
  },
  {
    sku_id: 'ind-024',
    sku_code: 'MED-CAB-001',
    barcode: '8850123030',
    part_name: 'Wall-Mounted Industrial First Aid & Medicine Cabinet',
    part_name_lo: 'ຕູ້ຢາປະຈຳໂຮງງານ ແບບຕິດຝາພ້ອມຢາສາມັນ (First Aid Cabinet)',
    category: 'Tools, Safety & Medical',
    description: 'Sturdy white steel cabinet with glass door. Comes pre-stocked with essential industrial first aid supplies and basic medicines for factory floors.',
    description_lo: 'ຕູ້ຢາເຫຼັກສີຂາວແບບຕິດຝາ ພ້ອມອຸປະກອນປະຖົມພະຍາບານ ແລະ ຢາສາມັນປະຈຳບ້ານຄົບຊຸດ ສຳລັບຕິດຕັ້ງໃນໂຮງງານອຸດສາຫະກຳ.',
    image_url: '/images/catalog/real/bronze_bushing_1787994598342.jpg',
    qty_on_hand: 12,
    unit_price: 7.4,
    specs: {'Brand': 'Cummins', 'Model': 'IND-1253', 'Size': 'Standard Fitment (7 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock (1-3 Days)',
    bulk_pricing: []
  },
  {
    sku_id: 'ind-025',
    sku_code: 'MED-KIT-001',
    barcode: '8850123031',
    part_name: 'Portable Industrial First Aid Kit (Large)',
    part_name_lo: 'ຊຸດປະຖົມພະຍາບານອຸດສາຫະກຳ ແບບພົກພາ (First Aid Kit)',
    category: 'Tools, Safety & Medical',
    description: 'Heavy-duty waterproof plastic case containing comprehensive trauma and first aid supplies for construction sites and remote mining camps.',
    description_lo: 'ກ່ອງຢາປະຖົມພະຍາບານແບບພົກພາ ກັນນ້ຳ ແລະ ກັນກະແທກ (Heavy Duty). ບັນຈຸອຸປະກອນເຮັດແຜ ແລະ ຢາພື້ນຖານຄົບຖ້ວນ ສຳລັບໄຊດ໌ງານກໍ່ສ້າງ ແລະ ບໍ່ແຮ່.',
    image_url: '/images/catalog/real/mining_jaw_plate_1787986343879.jpg',
    qty_on_hand: 45,
    unit_price: 13.8,
    specs: {'Brand': 'Cummins', 'Model': 'IND-9184', 'Size': 'Standard Fitment (12 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 5, price: 12.0 }
    ]
  },
  {
    sku_id: 'ind-026',
    sku_code: 'BTR-TRK-100AH',
    barcode: '8850123032',
    part_name: 'Heavy-Duty Commercial Truck Battery 12V 100Ah',
    part_name_lo: 'ໝໍ້ໄຟລົດບັນທຸກ 12V 100Ah ຊະນິດເຕີມນ້ຳກັ່ນ (Truck Battery)',
    category: 'Parts & Components',
    description: 'High cranking power 12V 100Ah lead-acid battery designed for heavy commercial trucks and industrial machinery.',
    description_lo: 'ແບັດເຕີຣີລົດບັນທຸກ 12V 100Ah ແບບນ້ຳ ທົນທານຕໍ່ການໃຊ້ງານໜັກ ແລະ ໃຫ້ກຳລັງສະຕາດສູງ.',
    image_url: '/images/catalog/real/toyota_hv_cable_1787991422275.jpg',
    qty_on_hand: 55,
    unit_price: 21.85,
    specs: {'Brand': 'Volvo OEM', 'Model': 'ISX-Series', 'Size': '30 kg, Heavy Duty', 'Application': 'CAT C15 ACERT'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 19.0 },
      { min_qty: 50, price: 17.0 }
    ]
  },
  {
    sku_id: 'ind-027',
    sku_code: 'OIL-DSL-15W40',
    barcode: '8850123033',
    part_name: 'Premium 15W-40 Diesel Engine Oil (200L Drum)',
    part_name_lo: 'ນ້ຳມັນເຄື່ອງກາຊວນ 15W-40 ຂະໜາດ 200 ລິດ (Engine Oil Drum)',
    category: 'Parts & Components',
    description: 'Heavy-duty CI-4/SL 15W-40 multigrade diesel engine oil providing superior protection against wear and soot build-up.',
    description_lo: 'ນ້ຳມັນເຄື່ອງລົດບັນທຸກ ແລະ ລົດຈົກ ເກຣດ 15W-40 ປ້ອງກັນການສຶກຫໍຼ ແລະ ເຂม่า ໄດ້ດີເລີດ ບັນຈຸໃນຖັງໃຫຍ່ 200 ລິດ.',
    image_url: '/images/catalog/real/product_2_specs_1788007011418.png',
    qty_on_hand: 120,
    unit_price: 142.6,
    specs: {'Brand': 'Cummins', 'Model': 'C15-Pro', 'Size': '40 kg, Heavy Duty', 'Application': 'Volvo D13 Heavy Duty'},
    lead_time: 'In Stock (1-2 Days)',
    bulk_pricing: [
      { min_qty: 5, price: 124.0 },
      { min_qty: 20, price: 116.0 }
    ]
  },
  {
    sku_id: 'ind-028',
    sku_code: 'OIL-HYD-VG68',
    barcode: '8850123034',
    part_name: 'Hydraulic Oil ISO VG 68 (200L Drum)',
    part_name_lo: 'ນ້ຳມັນໄຮໂດຣລິກ ເບີ 68 ຂະໜາດ 200 ລິດ (Hydraulic Oil)',
    category: 'Hydraulics & Pneumatics',
    description: 'Anti-wear (AW) hydraulic fluid ISO VG 68 formulated for high-pressure industrial and mobile equipment.',
    description_lo: 'ນ້ຳມັນໄຮໂດຣລິກ ເບີ 68 ປະສົມສານປ້ອງກັນການສຶກຫໍຼ ສຳລັບລະບົບໄຮໂດຣລິກແຮງດັນສູງໃນລົດຈົກ.',
    image_url: '/images/catalog/real/high_tensile_bolt_1787993197960.jpg',
    qty_on_hand: 85,
    unit_price: 105.8,
    specs: {'Brand': 'Parker', 'Model': 'Series 2H', 'Size': '300 Bar, High Flow', 'Application': 'Industrial Hydraulic Presses'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 5, price: 92.0 },
      { min_qty: 20, price: 86.0 }
    ]
  },
  {
    sku_id: 'ind-029',
    sku_code: 'SEAL-CYL-EXC',
    barcode: '8850123035',
    part_name: 'Excavator Hydraulic Cylinder Seal Kit',
    part_name_lo: 'ຊຸດຊີລກະບອກໄຮໂດຣລິກ ລົດຈົກ (Hydraulic Seal Kit)',
    category: 'Hydraulics & Pneumatics',
    description: 'Complete polyurethane and NBR seal kit for repairing excavator boom and bucket hydraulic cylinders.',
    description_lo: 'ຊຸດປະທັບຕາກັນຮົ່ວ (Seal Kit) ຄຸນນະພາບສູງ ສຳລັບສ້ອມແປງກະບອກໄຮໂດຣລິກບູມລົດຈົກ.',
    image_url: '/images/catalog/real/after_related_click_1787944325885.png',
    qty_on_hand: 200,
    unit_price: 17.25,
    specs: {'Brand': 'Parker', 'Model': 'A10V', 'Size': '100 Bar, High Flow', 'Application': 'Mobile Cranes'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 15.0 },
      { min_qty: 50, price: 13.0 }
    ]
  },
  {
    sku_id: 'ind-030',
    sku_code: 'BLD-LDR-2500',
    barcode: '8850123036',
    part_name: 'Wheel Loader Bucket Cutting Edge',
    part_name_lo: 'ແຜ່ນມີດຕັດປາກບຸ້ງກີ໋ ລົດຕັກ (Bucket Cutting Edge)',
    category: 'Heavy Equipment & Machinery',
    description: 'Bolt-on reversible heavy-duty steel cutting edge for wheel loader buckets. High abrasion resistance.',
    description_lo: 'ແຜ່ນເຫຼັກຕັດປາກບຸ້ງກີ໋ລົດຕັກ ແບບຂັນນັອດ ສາມາດປີ້ນໃຊ້ໄດ້ສອງດ້ານ ທົນທານຕໍ່ການຂູດຂີດ.',
    image_url: '/images/catalog/real/fire_extinguisher_1787992098343.jpg',
    qty_on_hand: 40,
    unit_price: 66.7,
    specs: {'Brand': 'ITR', 'Model': 'HD-Track', 'Size': 'Heat Treated 30mm', 'Application': 'Volvo Wheel Loaders'},
    lead_time: 'In Stock (1-3 Days)',
    bulk_pricing: [
      { min_qty: 5, price: 58.0 }
    ]
  },
  {
    sku_id: 'ind-031',
    sku_code: 'TRK-RUB-300',
    barcode: '8850123037',
    part_name: 'Mini Excavator Rubber Tracks (300x52.5x80)',
    part_name_lo: 'ຕີນຕະຂາບຢາງ ລົດຈົກນ້ອຍ (Rubber Tracks)',
    category: 'Heavy Equipment & Machinery',
    description: 'Continuous steel cord rubber tracks engineered for mini excavators to minimize vibration and ground damage.',
    description_lo: 'ຕີນຕະຂາບຢາງເສີມສະລິງເຫຼັກພາຍໃນ ສຳລັບລົດຈົກນ້ອຍ ຊ່ວຍຫຼຸດແຮງສັ່ນສະເທືອນ ແລະ ບໍ່ເຮັດໃຫ້ພື້ນຫົນທາງເປ່ເພ.',
    image_url: '/images/catalog/real/system_maintenance_1787942571293.png',
    qty_on_hand: 16,
    unit_price: 119.6,
    specs: {'Brand': 'CAT', 'Model': 'J350', 'Size': 'Heat Treated 40mm', 'Application': 'Volvo Wheel Loaders'},
    lead_time: 'In Stock (3 Days)',
    bulk_pricing: [
      { min_qty: 2, price: 104.0 },
      { min_qty: 10, price: 96.0 }
    ]
  },
  {
    sku_id: 'ind-032',
    sku_code: 'SAF-HRN-FB',
    barcode: '8850123038',
    part_name: 'Full Body Safety Harness with Double Lanyard',
    part_name_lo: 'ຊຸດກັນຕົກເຕັມຕົວ ພ້ອມເຊືອກຄູ່ ແລະ ຕົວດູດຊັບແຮງກະແທກ (Safety Harness)',
    category: 'Tools, Safety & Medical',
    description: 'Industrial fall protection full body harness featuring 5 point adjustment, double lanyards, and shock absorber.',
    description_lo: 'ຊຸດເຂັມຂັດນິລະໄພກັນຕົກແບບເຕັມຕົວ ພ້ອມເຊືອກກ່ຽວຄູ່ ແລະ ຕົວຊັບແຮງກະແທກ ສຳລັບເຮັດວຽກເທິງບ່ອນສູງ.',
    image_url: '/images/catalog/real/rebar_steel_1787994446883.jpg',
    qty_on_hand: 120,
    unit_price: 19.55,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-5602', 'Size': 'Standard Fitment (6 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 17.0 },
      { min_qty: 50, price: 15.0 }
    ]
  },
  {
    sku_id: 'ind-033',
    sku_code: 'LUB-GRS-20KG',
    barcode: '8850123039',
    part_name: 'Heavy-Duty Lithium Complex Grease (20kg)',
    part_name_lo: 'ຈາລະບີ ລິທຽມຄອມເພລັກສ໌ ຖັງ 20kg (Lithium Grease)',
    category: 'Parts & Components',
    description: 'High temperature, extreme pressure (EP) lithium complex grease for heavy machinery bearings and joints.',
    description_lo: 'ຈາລະບີທົນຄວາມຮ້ອນສູງ ແລະ ຮັບແຮງກົດດັນໄດ້ດີເລີດ ສຳລັບຫຼໍ່ລື່ນລູກປືນ ແລະ ຂໍ່ຕໍ່ລົດຈົກລົດດຳ້.',
    image_url: '/images/catalog/real/ev_battery_coolant_1787947012559.jpg',
    qty_on_hand: 40,
    unit_price: 28.75,
    specs: {'Brand': 'Mahle', 'Model': 'ISX-Series', 'Size': '40 kg, Heavy Duty', 'Application': 'Cummins ISX / ISL Engines'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 5, price: 25.0 },
      { min_qty: 20, price: 22.0 }
    ]
  },
  {
    sku_id: 'ind-034',
    sku_code: 'BELT-V-B90',
    barcode: '8850123040',
    part_name: 'Heavy-Duty Industrial V-Belt',
    part_name_lo: 'ສາຍພານເຄື່ອງຈັກໜັກ V-Belt (Transmission Belt)',
    category: 'Parts & Components',
    description: 'Classical wrapped V-belt engineered for reliable power transmission in industrial motors and crushers.',
    description_lo: 'ສາຍພານ V-Belt ຄຸນນະພາບສູງ ທົນທານຕໍ່ການສຽດສີ ແລະ ແຮງດຶງ ສຳລັບມໍເຕີ ແລະ ເຄື່ອງໂມ້.',
    image_url: '/images/catalog/real/forklift_rear_1787945500664.jpg',
    qty_on_hand: 150,
    unit_price: 4.6,
    specs: {'Brand': 'Cummins', 'Model': 'D13-Spec', 'Size': '40 kg, Heavy Duty', 'Application': 'Cummins ISX / ISL Engines'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 4.0 },
      { min_qty: 50, price: 3.6 }
    ]
  },
  {
    sku_id: 'ind-035',
    sku_code: 'BRG-TRB-32218',
    barcode: '8850123041',
    part_name: 'Industrial Tapered Roller Bearing Set',
    part_name_lo: 'ຊຸດລູກປືນອຸດສາຫະກຳ (Tapered Roller Bearing)',
    category: 'Parts & Components',
    description: 'Premium alloy steel tapered roller bearing designed to handle combined radial and thrust loads.',
    description_lo: 'ລູກປືນອຸດສາຫະກຳປະເພດ Tapered ທົນແຮງກົດທັບ ແລະ ແຮງບິດໄດ້ດີ ສຳລັບເພົາລົດບັນທຸກ ແລະ ເຄື່ອງຈັກໃຫຍ່.',
    image_url: '/images/catalog/real/metal_roofing_1787994488453.jpg',
    qty_on_hand: 85,
    unit_price: 13.34,
    specs: {'Brand': 'CAT', 'Model': 'C15-Pro', 'Size': '20 kg, Heavy Duty', 'Application': 'Cummins ISX / ISL Engines'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 11.6 },
      { min_qty: 30, price: 10.4 }
    ]
  },
  {
    sku_id: 'ind-036',
    sku_code: 'AIR-CMP-50HP',
    barcode: '8850123042',
    part_name: 'Rotary Screw Air Compressor (50HP)',
    part_name_lo: 'ປ້ຳລົມແບບສະກູ ອຸດສາຫະກຳ 50 ແຮງມ້າ (Air Compressor)',
    category: 'Heavy Equipment & Machinery',
    description: 'High-efficiency 50HP rotary screw air compressor providing continuous, reliable air for factory automation.',
    description_lo: 'ປ້ຳລົມສະກູ ຂະໜາດ 50 ແຮງມ້າ ໃຫ້ລົມແຮງສະໝ່ຳສະເໝີ ແລະ ສຽງງຽບ ສຳລັບໃຊ້ໃນໂຮງງານອຸດສາຫະກຳ.',
    image_url: '/images/catalog/real/arcfox_charging_cable_1787991346297.jpg',
    qty_on_hand: 4,
    unit_price: 180.0,
    specs: {'Brand': 'Berco', 'Model': 'PC200-8', 'Size': 'Heat Treated 50mm', 'Application': 'CAT 320D / Komatsu PC200'},
    lead_time: 'Ships in 7 Days',
    bulk_pricing: []
  },
  {
    sku_id: 'ind-037',
    sku_code: 'PMP-CEN-4IN',
    barcode: '8850123043',
    part_name: 'Industrial Centrifugal Water Pump (4-Inch)',
    part_name_lo: 'ປ້ຳນ້ຳຫອຍໂຂ່ງ ອຸດສາຫະກຳ ຂະໜາດ 4 ນິ້ວ (Centrifugal Pump)',
    category: 'Heavy Equipment & Machinery',
    description: 'High-volume cast iron centrifugal pump ideal for agricultural irrigation, mining, and factory cooling towers.',
    description_lo: 'ປ້ຳນ້ຳຫອຍໂຂ່ງເຫຼັກລໍ່ ຂະໜາດ 4 ນິ້ວ ສູບນ້ຳໄດ້ປະລິມານຫຼາຍ ສຳລັບການກະເສດ, ໂຮງງານ ແລະ ບໍ່ແຮ່.',
    image_url: '/images/catalog/real/store_products_1_1788007486784.png',
    qty_on_hand: 12,
    unit_price: 165.6,
    specs: {'Brand': 'CAT', 'Model': 'J350', 'Size': 'Heat Treated 50mm', 'Application': 'Volvo Wheel Loaders'},
    lead_time: 'In Stock (2 Days)',
    bulk_pricing: [
      { min_qty: 3, price: 144.0 }
    ]
  },
  {
    sku_id: 'ind-038',
    sku_code: 'HYD-VLV-M4',
    barcode: '8850123044',
    part_name: 'Hydraulic Directional Control Valve Block',
    part_name_lo: 'ວາວຄວບຄຸມໄຮໂດຣລິກ ແບບຫຼາຍພອດ (Control Valve Block)',
    category: 'Hydraulics & Pneumatics',
    description: 'Multi-spool hydraulic directional control valve for smooth and precise operation of excavator and crane hydraulics.',
    description_lo: 'ຊຸດວາວຄວບຄຸມໄຮໂດຣລິກ ໃຊ້ສຳລັບຄວບຄຸມການເຄື່ອນໄຫວຂອງລົດຂຸດ ຫຼື ລົດເຄນ ໃຫ້ມີຄວາມຊັດເຈນ.',
    image_url: '/images/catalog/real/centrifugal_pump_1787989816474.jpg',
    qty_on_hand: 25,
    unit_price: 71.3,
    specs: {'Brand': 'Rexroth', 'Model': 'A10V', 'Size': '100 Bar, High Flow', 'Application': 'Mobile Cranes'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 5, price: 62.0 }
    ]
  },
  {
    sku_id: 'ind-039',
    sku_code: 'SAF-HLM-YLW',
    barcode: '8850123045',
    part_name: 'Industrial Safety Hard Hat (Helmet)',
    part_name_lo: 'ໝວກເຊັບຕີ້ ອຸດສາຫະກຳ (Safety Helmet)',
    category: 'Tools, Safety & Medical',
    description: 'Impact-resistant ABS plastic safety helmet with 6-point suspension and adjustable chin strap for maximum head protection.',
    description_lo: 'ໝວກເຊັບຕີ້ຢາງ ABS ທົນແຮງກະແທກ ພ້ອມສາຍຮັດຄາງ ປ້ອງກັນອັນຕະລາຍໃນເຂດກໍ່ສ້າງ ແລະ ໂຮງງານ.',
    image_url: '/images/catalog/real/store_products_3_1788007501517.png',
    qty_on_hand: 500,
    unit_price: 2.76,
    specs: {'Brand': 'SKF', 'Model': 'IND-3277', 'Size': 'Standard Fitment (30 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 50, price: 2.4 },
      { min_qty: 200, price: 2.0 }
    ]
  },
  {
    sku_id: 'ind-040',
    sku_code: 'SAF-VST-HIV',
    barcode: '8850123046',
    part_name: 'High-Visibility Reflective Safety Vest',
    part_name_lo: 'ເສື້ອເຊັບຕີ້ ສະທ້ອນແສງ (Reflective Safety Vest)',
    category: 'Tools, Safety & Medical',
    description: 'Neon orange/yellow breathable mesh safety vest with 2-inch wide reflective strips for day and night visibility.',
    description_lo: 'ເສື້ອເຊັບຕີ້ຕາໜ່າງ ສີສະທ້ອນແສງ ພ້ອມແຖບສີເງິນ ຮັບປະກັນຄວາມປອດໄພທັງກາງເວັນແລະກາງຄືນ.',
    image_url: '/images/catalog/real/industrial_exhaust_fan_1787993439615.jpg',
    qty_on_hand: 400,
    unit_price: 1.61,
    specs: {'Brand': 'Parker', 'Model': 'IND-8731', 'Size': 'Standard Fitment (24 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 50, price: 1.4 },
      { min_qty: 200, price: 1.1 }
    ]
  },
  {
    sku_id: 'ind-041',
    sku_code: 'MN-ROP-32MM',
    barcode: '8850123047',
    part_name: 'Heavy-Duty Steel Wire Rope (32mm)',
    part_name_lo: 'ສາຍສະລິງເຫຼັກກ້າ ອຸດສາຫະກຳ 32mm (Steel Wire Rope)',
    category: 'Heavy Equipment & Machinery',
    description: 'High tensile 32mm steel wire rope suitable for heavy cranes, mining hoists, and marine towing applications.',
    description_lo: 'ສາຍສະລິງເຫຼັກກ້າ ຂະໜາດ 32 ມິນລິແມັດ ທົນແຮງດຶງສູງ ສຳລັບລົດເຄນໜັກ ແລະ ວຽກບໍ່ແຮ່.',
    image_url: '/images/catalog/real/inverter_welding_machine_1787993381339.jpg',
    qty_on_hand: 10,
    unit_price: 96.6,
    specs: {'Brand': 'CAT', 'Model': 'HD-Track', 'Size': 'Heat Treated 40mm', 'Application': 'CAT 320D / Komatsu PC200'},
    lead_time: 'In Stock (1-3 Days)',
    bulk_pricing: [
      { min_qty: 3, price: 84.0 }
    ]
  },
  {
    sku_id: 'ind-042',
    sku_code: 'SLR-LED-200W',
    barcode: '8850123048',
    part_name: 'Industrial LED Flood Light (200W)',
    part_name_lo: 'ສະປອດໄລ້ LED ອຸດສາຫະກຳ 200W (LED Flood Light)',
    category: 'EV & Electrical Systems',
    description: 'Ultra-bright 200W LED flood light with IP66 waterproof rating, ideal for illuminating large factory yards and construction sites.',
    description_lo: 'ໂຄມໄຟສະປອດໄລ້ 200W ສະຫວ່າງພິເສດ ກັນນ້ຳ IP66 ສຳລັບເຍືອງເດີ່ນໂຮງງານ ແລະ ໄຊດ໌ງານກໍ່ສ້າງກາງຄືນ.',
    image_url: '/images/catalog/real/ev_charging_adapter_1787991437929.jpg',
    qty_on_hand: 60,
    unit_price: 21.85,
    specs: {'Brand': 'SKF', 'Model': 'IND-6255', 'Size': 'Standard Fitment (1 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 19.0 },
      { min_qty: 30, price: 17.0 }
    ]
  },
  {
    sku_id: 'ind-043',
    sku_code: 'SLR-STR-ALL',
    barcode: '8850123049',
    part_name: 'All-in-One Solar Street Light',
    part_name_lo: 'ໂຄມໄຟຖະໜົນ ໂຊລາເຊວ ປະສົມປະສານ (Solar Street Light)',
    category: 'EV & Electrical Systems',
    description: 'Commercial grade integrated solar street light combining high-efficiency solar panel, LED, and lithium battery.',
    description_lo: 'ໂຄມໄຟຖະໜົນໂຊລາເຊວແບບ All-in-one ຕິດຕັ້ງງ່າຍ ສະຫວ່າງຮອດເຊົ້າ ສຳລັບທາງເຂົ້າໂຮງງານ ຫຼື ບໍ່ແຮ່.',
    image_url: '/images/catalog/real/leapmotor_c11_filter_1787994899596.jpg',
    qty_on_hand: 45,
    unit_price: 39.1,
    specs: {'Brand': 'Bosch', 'Model': 'IND-5751', 'Size': 'Standard Fitment (30 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 34.0 },
      { min_qty: 40, price: 31.0 }
    ]
  },
  {
    sku_id: 'ind-044',
    sku_code: 'TOY-BRK-FRT',
    barcode: '8850123050',
    part_name: 'Toyota Genuine Front Brake Pads',
    part_name_lo: 'ຜ້າເບຣກໜ້າ ແທ້ສູນ ໂຕໂຢຕ້າ (Toyota Genuine Brake Pads)',
    category: 'Parts & Components',
    description: 'High-quality OEM front brake pad set offering reliable stopping power and low dust for Toyota Hilux and Fortuner.',
    description_lo: 'ຜ້າເບຣກໜ້າແທ້ສູນ ສຳລັບ Toyota Hilux Revo ແລະ Fortuner ໝັ້ນໃຈທຸກການເບຣກ ບໍ່ກິນຈານເບຣກ.',
    image_url: '/images/catalog/real/hydraulic_oil_drum_1787993185153.jpg',
    qty_on_hand: 85,
    unit_price: 9.2,
    specs: { 'Brand': 'Toyota OEM', 'Application': 'Hilux/Fortuner', 'Material': 'Ceramic/Semi-Metallic' },
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 8.0 }
    ]
  },
  {
    sku_id: 'ind-045',
    sku_code: 'HON-AIR-FLT',
    barcode: '8850123051',
    part_name: 'Honda Genuine Engine Air Filter',
    part_name_lo: 'ຕອງແອເຄື່ອງຈັກ ແທ້ສູນ ຮອນດ້າ (Honda Air Filter)',
    category: 'Parts & Components',
    description: 'Premium OEM engine air filter ensuring clean air intake for optimal performance in Honda CR-V and Civic models.',
    description_lo: 'ຕອງແອເຄື່ອງຈັກແທ້ສູນ ສຳລັບ Honda CR-V ແລະ Civic ຊ່ວຍໃຫ້ເຄື່ອງຈັກເຮັດວຽກເຕັມປະສິດທິພາບ ປະຢັດນ້ຳມັນ.',
    image_url: '/images/catalog/real/spill_containment_kit_1787995270912.jpg',
    qty_on_hand: 120,
    unit_price: 4.6,
    specs: { 'Brand': 'Honda OEM', 'Application': 'CR-V/Civic', 'Filter Type': 'Paper/Fiber' },
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 20, price: 4.0 }
    ]
  },
  {
    sku_id: 'ind-046',
    sku_code: 'ICR-CAB-HEP',
    barcode: '8850123052',
    part_name: 'iCar HEPA Cabin Air Filter',
    part_name_lo: 'ຕອງແອໃນເກັງ HEPA ສຳລັບ iCar (Cabin Air Filter)',
    category: 'EV & Electrical Systems',
    description: 'Advanced HEPA cabin air filter with active carbon layer to block PM2.5 and odors, specifically for iCar 03.',
    description_lo: 'ຕອງແອໃນເກັງ HEPA ພ້ອມຊັ້ນຄາບອນ ສຳລັບ iCar 03 ຊ່ວຍກັ່ນຕອງຝຸ່ນ PM2.5 ແລະ ກິ່ນບໍ່ພຶງປະສົງ ໃຫ້ອາກາດບໍລິສຸດ.',
    image_url: '/images/catalog/real/modal_scrolled_view_1787944300936.png',
    qty_on_hand: 60,
    unit_price: 5.52,
    specs: { 'Brand': 'iCar', 'Filter Class': 'HEPA H11', 'Feature': 'Active Carbon' },
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 15, price: 4.8 }
    ]
  },
  {
    sku_id: 'ind-047',
    sku_code: 'JAE-LED-H7',
    barcode: '8850123053',
    part_name: 'Jaecoo LED Headlight Bulb Upgrade Kit',
    part_name_lo: 'ຫຼອດໄຟໜ້າ LED ປະສິດທິພາບສູງ ສຳລັບ Jaecoo (LED Headlight)',
    category: 'EV & Electrical Systems',
    description: 'High-brightness LED headlight bulbs with active cooling fans, providing superior nighttime visibility for Jaecoo J7.',
    description_lo: 'ຊຸດຫຼອດໄຟໜ້າ LED ຄວາມສະຫວ່າງສູງ ພ້ອມພັດລົມລະບາຍຄວາມຮ້ອນໃນຕົວ ສຳລັບ Jaecoo J7.',
    image_url: '/images/catalog/real/stretcher_board_1787994434376.jpg',
    qty_on_hand: 40,
    unit_price: 3.0,
    specs: { 'Brand': 'Jaecoo Compatible', 'Luminance': '12000LM/Pair', 'Color Temp': '6000K Pure White' },
    lead_time: 'In Stock',
    bulk_pricing: []
  },
  {
    sku_id: 'ind-048',
    sku_code: 'ARC-CBL-T2',
    barcode: '8850123054',
    part_name: 'Arcfox Type 2 to Type 2 EV Charging Cable',
    part_name_lo: 'ສາຍສາກ EV Type 2 to Type 2 (EV Charging Cable)',
    category: 'EV & Electrical Systems',
    description: 'Premium 22kW 3-phase EV charging cable, heavy-duty and weather resistant, designed for Arcfox Alpha series.',
    description_lo: 'ສາຍສາກລົດໄຟຟ້າ Type 2 ຫາ Type 2 ຂະໜາດ 22kW ຮອງຮັບໄຟ 3 ເຟດ ສາຍຍາວ 5 ແມັດ ທົນທານ ປອດໄພສູງ ສຳລັບ Arcfox.',
    image_url: '/images/catalog/real/jaecoo_j7_coolant_1787994876651.jpg',
    qty_on_hand: 25,
    unit_price: 37.95,
    specs: {'Brand': 'Cummins', 'Model': 'IND-8418', 'Size': 'Standard Fitment (14 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 5, price: 33.0 }
    ]
  },
  {
    sku_id: 'ind-049',
    sku_code: 'LPM-AGM-12V',
    barcode: '8850123055',
    part_name: 'Leapmotor 12V Auxiliary AGM Battery',
    part_name_lo: 'ແບັດເຕີຣີ 12V AGM ສຳລັບລົດ EV (Leapmotor Aux Battery)',
    category: 'EV & Electrical Systems',
    description: 'Deep cycle AGM 12V auxiliary battery, providing stable low-voltage power for Leapmotor C11 electronics.',
    description_lo: 'ແບັດເຕີຣີ 12V ລະບົບ AGM ສຳລັບຈ່າຍໄຟລ້ຽງລະບົບເອເລັກໂຕຣນິກໃນລົດ Leapmotor C11 ທົນທານ ແລະ ປອດໄພ.',
    image_url: '/images/catalog/real/hydraulic_oil_1787994622684.jpg',
    qty_on_hand: 35,
    unit_price: 5.8,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-8257', 'Size': 'Standard Fitment (46 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: []
  },
  {
    sku_id: 'ind-050',
    sku_code: 'AIO-CLN-EV',
    barcode: '8850123056',
    part_name: 'Aion EV Battery Coolant (Low-Conductivity)',
    part_name_lo: 'ນ້ຳຢາຫຼໍ່ເຢັນແບັດເຕີຣີ EV ແບບບໍ່ຊັກນຳໄຟຟ້າ (Aion EV Coolant)',
    category: 'EV & Electrical Systems',
    description: 'Specialized low-conductivity thermal management fluid to maintain optimal temperature for GAC Aion high-voltage batteries.',
    description_lo: 'ນ້ຳຢາຫຼໍ່ເຢັນສູດພິເສດ ບໍ່ຊັກນຳໄຟຟ້າ ສຳລັບລະບາຍຄວາມຮ້ອນແບັດເຕີຣີ High Voltage ຂອງລົດ GAC Aion.',
    image_url: '/images/catalog/real/plywood_sheet_1787994500566.jpg',
    qty_on_hand: 150,
    unit_price: 6.9,
    specs: {'Brand': 'SKF', 'Model': 'IND-6389', 'Size': 'Standard Fitment (41 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 6.0 },
      { min_qty: 50, price: 5.0 }
    ]
  },
  {
    sku_id: 'ind-051',
    sku_code: 'HON-CLN-HYB',
    barcode: '8850123057',
    part_name: 'Honda Genuine Hybrid Inverter Coolant',
    part_name_lo: 'ນ້ຳຢາຫຼໍ່ເຢັນອິນເວີເຕີ ແທ້ສູນ ຮອນດ້າ (Hybrid Inverter Coolant)',
    category: 'EV & Electrical Systems',
    description: 'Honda original formulated coolant specifically designed for the power control unit (inverter) in e:HEV hybrid systems.',
    description_lo: 'ນ້ຳຢາຫຼໍ່ເຢັນແທ້ສູນ Honda ສູດສະເພາະສຳລັບລະບາຍຄວາມຮ້ອນໃຫ້ກັບອິນເວີເຕີ ໃນລະບົບລົດໄຮບຣິດ e:HEV.',
    image_url: '/images/catalog/real/cut_resistant_gloves_1787992071532.jpg',
    qty_on_hand: 80,
    unit_price: 6.44,
    specs: { 'Volume': '4 Liters', 'Brand': 'Honda OEM', 'Color': 'Blue' },
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 5.6 }
    ]
  },
  {
    sku_id: 'ind-052',
    sku_code: 'TOY-HVC-35M',
    barcode: '8850123058',
    part_name: 'Toyota High-Voltage Cable Harness',
    part_name_lo: 'ສາຍໄຟ High Voltage ໂຕໂຢຕ້າ (HV Cable Harness)',
    category: 'EV & Electrical Systems',
    description: 'Shielded orange high-voltage cable assembly for safe power routing between the battery and inverter on Toyota EV/Hybrids.',
    description_lo: 'ຊຸດສາຍໄຟແຮງດັນສູງສີສົ້ມ ພ້ອມສະນວນກັນກວນ ສຳລັບເຊື່ອມຕໍ່ລະບົບແບັດເຕີຣີ ແລະ ມໍເຕີ ໃນລົດ Toyota Hybrid/EV.',
    image_url: '/images/catalog/real/store_top_layout_1788007514358.png',
    qty_on_hand: 12,
    unit_price: 12.8,
    specs: {'Brand': 'Bosch', 'Model': 'IND-6412', 'Size': 'Standard Fitment (35 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 7 Days',
    bulk_pricing: []
  },
  {
    sku_id: 'ind-053',
    sku_code: 'EV-ADP-CCS2GBT',
    barcode: '8850123059',
    part_name: 'CCS2 to GB/T DC Fast Charging Adapter',
    part_name_lo: 'ຫົວແປງສາກໄວ DC ຈາກ CCS2 ເປັນ GB/T (EV Fast Charge Adapter)',
    category: 'EV & Electrical Systems',
    description: 'Heavy-duty adapter allowing EVs with GB/T ports (like Aion, Leapmotor) to use standard CCS2 public DC fast chargers.',
    description_lo: 'ຫົວແປງສາກດ່ວນ DC ສຳລັບລົດນຳເຂົ້າຈີນ (ພອດ GB/T) ເພື່ອໃຫ້ສາມາດໃຊ້ງານຕູ້ສາກສາທາລະນະແບບ CCS2 ໄດ້ຢ່າງປອດໄພ.',
    image_url: '/images/catalog/real/diesel_generator_1787945358504.jpg',
    qty_on_hand: 50,
    unit_price: 54.05,
    specs: {'Brand': 'Parker', 'Model': 'IND-5089', 'Size': 'Standard Fitment (23 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 5, price: 47.0 },
      { min_qty: 20, price: 42.0 }
    ]
  },
  {
    sku_id: 'ind-054',
    sku_code: 'SAF-GLS-AFG',
    barcode: '8850123060',
    part_name: 'Industrial Safety Glasses (Anti-Fog)',
    part_name_lo: 'ແວ່ນຕາເຊັບຕີ້ ກັນຝ້າ (Safety Glasses)',
    category: 'Tools, Safety & Medical',
    description: 'Lightweight safety glasses with anti-fog and UV400 protection. Essential for factory and automotive workshops.',
    description_lo: 'ແວ່ນຕາເຊັບຕີ້ ນ້ຳໜັກເບົາ ເຄືອບສານກັນຝ້າ ແລະ ກັນ UV ເໝາະສຳລັບຊ່າງ ແລະ ພະນັກງານໂຮງງານ.',
    image_url: '/images/catalog/real/store_products_2_1788007493419.png',
    qty_on_hand: 200,
    unit_price: 2.07,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-9433', 'Size': 'Standard Fitment (41 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 50, price: 1.8 }
    ]
  },
  {
    sku_id: 'ind-055',
    sku_code: 'SAF-GLV-LV5',
    barcode: '8850123061',
    part_name: 'Level 5 Cut-Resistant Work Gloves',
    part_name_lo: 'ຖົງມືກັນບາດ ລະດັບ 5 (Cut-Resistant Gloves)',
    category: 'Tools, Safety & Medical',
    description: 'High-performance cut-resistant gloves with nitrile palm coating for excellent grip in oily environments.',
    description_lo: 'ຖົງມືກັນບາດລະດັບ 5 ເຄືອບຢາງ Nitrile ທີ່ຝາມື ຊ່ວຍກັນມື່ນໃນການຈັບບາຍຊິ້ນສ່ວນທີ່ມີນ້ຳມັນ.',
    image_url: '/images/catalog/real/solar_street_light_1787989940044.jpg',
    qty_on_hand: 350,
    unit_price: 1.49,
    specs: {'Brand': 'SKF', 'Model': 'IND-3723', 'Size': 'Standard Fitment (39 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 100, price: 1.3 }
    ]
  },
  {
    sku_id: 'ind-056',
    sku_code: 'SAF-BOT-STL',
    barcode: '8850123062',
    part_name: 'Steel Toe Safety Boots',
    part_name_lo: 'ເກີບເຊັບຕີ້ ຫົວເຫຼັກ (Safety Boots)',
    category: 'Tools, Safety & Medical',
    description: 'Heavy-duty leather safety boots with steel toe cap and oil-resistant anti-slip sole for industrial environments.',
    description_lo: 'ເກີບເຊັບຕີ້ໜັງແທ້ ຫົວເຫຼັກກັນກະແທກ ພື້ນຢາງກັນມື່ນ ແລະ ກັນນ້ຳມັນ ສຳລັບເຂດກໍ່ສ້າງ ແລະ ໂຮງງານ.',
    image_url: '/images/catalog/real/cat_320_excavator_1787945334578.jpg',
    qty_on_hand: 80,
    unit_price: 8.97,
    specs: {'Brand': 'SKF', 'Model': 'IND-6530', 'Size': 'Standard Fitment (34 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 20, price: 7.8 }
    ]
  },
  {
    sku_id: 'ind-057',
    sku_code: 'SAF-EXT-4KG',
    barcode: '8850123063',
    part_name: '4kg ABC Dry Chemical Fire Extinguisher',
    part_name_lo: 'ບັ້ງມອດໄຟ ສານເຄມີແຫ້ງ 4kg (Fire Extinguisher)',
    category: 'Tools, Safety & Medical',
    description: 'Multi-purpose ABC dry chemical fire extinguisher, suitable for solid, liquid, and electrical fires in facilities or EVs.',
    description_lo: 'ບັ້ງມອດໄຟຊະນິດຜົງເຄມີແຫ້ງ ABC ຂະໜາດ 4kg ດັບໄຟໄດ້ທຸກປະເພດ ລວມທັງໄຟຟ້າລັດວົງຈອນ.',
    image_url: '/images/catalog/real/aion_y_tire_1787994913656.jpg',
    qty_on_hand: 120,
    unit_price: 4.83,
    specs: {'Brand': 'SKF', 'Model': 'IND-3629', 'Size': 'Standard Fitment (12 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 30, price: 4.2 }
    ]
  },
  {
    sku_id: 'ind-058',
    sku_code: 'BYD-CAB-HEP',
    barcode: '8850123064',
    part_name: 'BYD Genuine HEPA Cabin Air Filter',
    part_name_lo: 'ຕອງແອໃນເກັງ HEPA ສຳລັບ BYD (Cabin Air Filter)',
    category: 'EV & Electrical Systems',
    description: 'Premium HEPA cabin filter designed to capture PM2.5 and allergens for BYD Atto 3, Dolphin, and Seal.',
    description_lo: 'ຕອງແອໃນເກັງ HEPA ແທ້ສູນສຳລັບ BYD Atto 3, Dolphin, Seal ກັ່ນຕອງຝຸ່ນ PM2.5 ແລະ ສານກໍ່ພູມແພ້.',
    image_url: '/images/catalog/real/rough_terrain_crane_1787987842267.jpg',
    qty_on_hand: 150,
    unit_price: 4.14,
    specs: { 'Brand': 'BYD OEM', 'Filter Class': 'HEPA', 'Application': 'Atto 3 / Dolphin / Seal' },
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 20, price: 3.6 }
    ]
  },
  {
    sku_id: 'ind-059',
    sku_code: 'TSL-WIP-SET',
    barcode: '8850123065',
    part_name: 'Tesla Model 3/Y Premium Wiper Blade Set',
    part_name_lo: 'ໃບປັດນ້ຳຝົນ ຊິລິໂຄນ ສຳລັບ Tesla (Wiper Blade Set)',
    category: 'EV & Electrical Systems',
    description: 'Aerodynamic frameless silicone wiper blades providing silent and streak-free operation for Tesla Model 3 and Model Y.',
    description_lo: 'ໃບປັດນ້ຳຝົນຊິລິໂຄນແບບບໍ່ມີໂຄງ ປັດສະອາດ ງຽບ ບໍ່ມີສຽງລົບກວນ ສຳລັບ Tesla Model 3 ແລະ Model Y.',
    image_url: '/images/catalog/real/safety_vest_1787989856050.jpg',
    qty_on_hand: 90,
    unit_price: 6.67,
    specs: { 'Brand': 'EV-Tech', 'Material': 'Silicone', 'Application': 'Model 3 / Model Y' },
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 15, price: 5.8 }
    ]
  },
  {
    sku_id: 'ind-060',
    sku_code: 'MG-12V-BAT',
    barcode: '8850123066',
    part_name: 'MG Genuine 12V Auxiliary Battery',
    part_name_lo: 'ແບັດເຕີຣີ 12V ສຳລັບລົດ MG (12V Auxiliary Battery)',
    category: 'EV & Electrical Systems',
    description: 'OEM replacement 12V lead-acid auxiliary battery for powering vehicle electronics in MG4 and MG ZS EV.',
    description_lo: 'ແບັດເຕີຣີ 12V ລະບົບລ້ຽງໄຟ ແທ້ສູນສຳລັບລົດໄຟຟ້າ MG4 ແລະ MG ZS EV.',
    image_url: '/images/catalog/real/modal_cat_flt_8800_1788006488735.png',
    qty_on_hand: 40,
    unit_price: 4.4,
    specs: { 'Brand': 'MG OEM', 'Voltage': '12V', 'Application': 'MG4 / ZS EV' },
    lead_time: 'In Stock',
    bulk_pricing: []
  },
  {
    sku_id: 'ind-061',
    sku_code: 'NET-TIR-EV',
    barcode: '8850123067',
    part_name: 'Neta V EV-Specific Low Rolling Resistance Tire',
    part_name_lo: 'ຢາງລົດ EV Neta V (EV Specific Tire)',
    category: 'EV & Electrical Systems',
    description: 'High-performance tire tailored for Neta V, featuring low rolling resistance to maximize battery range and reduce noise.',
    description_lo: 'ຢາງລົດຍົນສູດພິເສດສຳລັບລົດໄຟຟ້າ Neta V ຫຼຸດແຮງສຽດທານ ເພີ່ມໄລຍະທາງແລ່ນ ແລະ ລົດສຽງລົບກວນ.',
    image_url: '/images/catalog/real/ear_muffs_1787986544646.jpg',
    qty_on_hand: 120,
    unit_price: 20.24,
    specs: {'Brand': 'SKF', 'Model': 'IND-4720', 'Size': 'Standard Fitment (45 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 4, price: 17.6 },
      { min_qty: 20, price: 16.4 }
    ]
  },
  {
    sku_id: 'ind-062',
    sku_code: 'WUL-CBL-AC2',
    barcode: '8850123068',
    part_name: 'Wuling Type 2 to GB/T AC Charging Cable',
    part_name_lo: 'ສາຍສາກ AC Type 2 to GB/T ສຳລັບ Wuling (AC Charging Cable)',
    category: 'EV & Electrical Systems',
    description: 'Durable 7kW AC charging cable (Type 2 to GB/T) essential for charging Wuling Air EV and Binguo at public stations.',
    description_lo: 'ສາຍສາກ AC 7kW ຈາກຫົວ Type 2 ເປັນ GB/T ສຳລັບສາກລົດ Wuling Air EV / Binguo ຕາມຕູ້ສາທາລະນະ.',
    image_url: '/images/catalog/real/linear_bearing_1787994608195.jpg',
    qty_on_hand: 65,
    unit_price: 25.3,
    specs: {'Brand': 'Cummins', 'Model': 'IND-4210', 'Size': 'Standard Fitment (36 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 22.0 }
    ]
  },
  {
    sku_id: 'ind-063',
    sku_code: 'CHA-BRK-FRT',
    barcode: '8850123069',
    part_name: 'Changan Deepal Ceramic Front Brake Pads',
    part_name_lo: 'ຜ້າເບຣກໜ້າ ເຊລາມິກ ສຳລັບ Changan Deepal (Ceramic Brake Pads)',
    category: 'EV & Electrical Systems',
    description: 'Premium ceramic front brake pads for Changan Deepal L07 and S07, offering fade-resistant braking and low dust.',
    description_lo: 'ຜ້າເບຣກໜ້າເຊລາມິກຄຸນນະພາບສູງ ຝຸ່ນໜ້ອຍ ເບຣກໜຶບ ໝັ້ນໃຈ ສຳລັບ Changan Deepal L07 ແລະ S07.',
    image_url: '/images/catalog/real/electric_forklift_modal_1787946311753.png',
    qty_on_hand: 55,
    unit_price: 13.34,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-1692', 'Size': 'Standard Fitment (8 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 15, price: 11.6 }
    ]
  },
  {
    sku_id: 'ind-064',
    sku_code: 'BMT-CEM-001',
    barcode: '8850123070',
    part_name: 'Portland Cement Type I/II (50kg)',
    part_name_lo: 'ປູນຊີມັງປອດແລນ ປະເພດ I/II (50kg)',
    category: 'Construction & Facility',
    description: 'Industrial grade Portland cement for heavy construction, foundations, and reinforced concrete structures.',
    description_lo: 'ປູນຊີມັງອຸດສາຫະກຳ ສຳລັບງານກໍ່ສ້າງຂະໜາດໃຫຍ່, ງານເທພື້ນ ແລະ ໂຄງສ້າງທີ່ຕ້ອງການຄວາມແຂງແຮງສູງ.',
    image_url: '/images/catalog/real/wheel_loader_1787987830274.jpg',
    qty_on_hand: 500,
    unit_price: 1.38,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-2897', 'Size': 'Standard Fitment (39 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [ { min_qty: 100, price: 1.2 }, { min_qty: 500, price: 1.1 } ]
  },
  {
    sku_id: 'ind-065',
    sku_code: 'BRG-HVY-22320',
    barcode: '8850123071',
    part_name: 'SKF Heavy-Duty Spherical Roller Bearing',
    part_name_lo: 'ລູກປືນສະເຟຍຣິກຄອນ ຮັບແຮງສູງ SKF',
    category: 'Parts & Components',
    description: 'Self-aligning spherical roller bearing designed to handle heavy radial and axial loads in harsh industrial environments.',
    description_lo: 'ລູກປືນອຸດສາຫະກຳຂະໜາດໃຫຍ່ ອອກແບບມາເພື່ອຮັບນ້ຳໜັກ ແລະ ແຮງສັ່ນສະເທືອນສູງ.',
    image_url: '/images/catalog/real/initial_product_grid_1787945828255.png',
    qty_on_hand: 24,
    unit_price: 96.6,
    specs: { 'Brand': 'SKF', 'Model': '22320 E/C3', 'Inside Diameter': '100mm' },
    lead_time: 'In Stock'
  },
  {
    sku_id: 'ind-066',
    sku_code: 'LUB-HYD-AW68',
    barcode: '8850123072',
    part_name: 'Premium Hydraulic Oil AW-68 (200L Drum)',
    part_name_lo: 'ນ້ຳມັນໄຮໂດຣລິກ ເກຣດພຣີມຽມ AW-68 (ຖັງ 200 ລິດ)',
    category: 'Parts & Components',
    description: 'Anti-wear hydraulic oil providing excellent protection and oxidation stability for heavy machinery systems.',
    description_lo: 'ນ້ຳມັນໄຮໂດຣລິກ ຄຸນນະພາບສູງ ປ້ອງກັນການສຶກຫຣໍ ເໝາະສຳລັບລະບົບໄຮໂດຣລິກຂອງລົດຈົກ ແລະ ເຄື່ອງຈັກໂຮງງານ.',
    image_url: '/images/catalog/real/rubber_conveyor_belt_1787993338719.jpg',
    qty_on_hand: 15,
    unit_price: 96.6,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-5205', 'Size': 'Standard Fitment (7 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [ { min_qty: 5, price: 84.0 } ]
  },
  {
    sku_id: 'ind-067',
    sku_code: 'FAS-HT-M36',
    barcode: '8850123073',
    part_name: 'High Tensile Hex Bolt & Nut (M36 x 200mm)',
    part_name_lo: 'ນ໋ອດເຫຼັກກ້າ ແລະ ໝາກແຫວນ M36 (ຮັບແຮງດຶງສູງ)',
    category: 'Parts & Components',
    description: 'Grade 8.8 high-tensile bolt and nut set, ideal for heavy steel structures and machinery mounting.',
    description_lo: 'ນ໋ອດເຫຼັກກ້າເກຣດ 8.8 ຂະໜາດໃຫຍ່ ສຳລັບຍຶດໂຄງສ້າງເຫຼັກ ແລະ ເຄື່ອງຈັກໜັກ.',
    image_url: '/images/catalog/real/search_results_typing_1787945877099.png',
    qty_on_hand: 1200,
    unit_price: 2.76,
    specs: {'Brand': 'Parker', 'Model': 'IND-4998', 'Size': 'Standard Fitment (34 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [ { min_qty: 100, price: 2.4 } ]
  },
  {
    sku_id: 'ind-068',
    sku_code: 'CNV-RUB-800',
    barcode: '8850123074',
    part_name: 'Industrial Rubber Conveyor Belt (800mm x 10m)',
    part_name_lo: 'ສາຍພານຢາງລຳລຽງອຸດສາຫະກຳ ຂະໜາດ 800mm',
    category: 'Construction & Facility',
    description: 'Heavy-duty multi-ply rubber conveyor belt designed for mining, quarry, and aggregate transport.',
    description_lo: 'ສາຍພານລຳລຽງຢາງ ຄຸນນະພາບສູງ ທົນທານຕໍ່ການສຽດສີ ເໝາະສຳລັບໂຮງງານໂม่ຫີນ ແລະ ບໍ່ແຮ່.',
    image_url: '/images/catalog/real/wire_rope_1787989880792.jpg',
    qty_on_hand: 5,
    unit_price: 66.7,
    specs: {'Brand': 'Parker', 'Model': 'IND-8168', 'Size': 'Standard Fitment (33 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 3 Days'
  },
  {
    sku_id: 'ind-069',
    sku_code: 'PNM-CMP-50HP',
    barcode: '8850123075',
    part_name: '50HP Rotary Screw Air Compressor',
    part_name_lo: 'ເຄື່ອງປ້ຳລົມແບບສະກູດ 50HP ສຳລັບໂຮງງານ',
    category: 'Hydraulics & Pneumatics',
    description: 'Continuous-duty 50 horsepower rotary screw air compressor delivering reliable industrial air supply.',
    description_lo: 'ປ້ຳລົມອຸດສາຫະກຳ ຂະໜາດ 50 ແຮງມ້າ ສາມາດຈ່າຍລົມໄດ້ຢ່າງຕໍ່ເນື່ອງ ປະຢັດພະລັງງານ.',
    image_url: '/images/catalog/real/ev_tire_1787946554424.jpg',
    qty_on_hand: 2,
    unit_price: 66.7,
    specs: {'Brand': 'Bosch', 'Model': 'IND-8277', 'Size': 'Standard Fitment (16 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 7 Days'
  },
  {
    sku_id: 'ind-070',
    sku_code: 'ELE-MOT-3PH',
    barcode: '8850123076',
    part_name: 'ABB 3-Phase Induction Motor (15 kW)',
    part_name_lo: 'ມໍເຕີໄຟຟ້າ 3 ເຟສ ABB ຂະໜາດ 15 kW',
    category: 'EV & Electrical Systems',
    description: 'High-efficiency IE3 cast iron induction motor for pumps, fans, and heavy-duty industrial machinery.',
    description_lo: 'ມໍເຕີໄຟຟ້າ 3 ເຟສ ປະຢັດພະລັງງານສູງ (IE3) ໂຄງສ້າງເຫຼັກຫຼໍ່ ທົນທານຕໍ່ການໃຊ້ງານໜັກ.',
    image_url: '/images/catalog/real/icar_03_cable_1787994865682.jpg',
    qty_on_hand: 8,
    unit_price: 66.7,
    specs: {'Brand': 'SKF', 'Model': 'IND-6364', 'Size': 'Standard Fitment (24 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock'
  },
  {
    sku_id: 'ind-071',
    sku_code: 'WLD-INV-400A',
    barcode: '8850123077',
    part_name: '400A Heavy-Duty Inverter Welding Machine',
    part_name_lo: 'ຕູ້ຈອດອິນເວີເຕີ 400A (ສຳລັບງານໜັກ)',
    category: 'Construction & Facility',
    description: 'Professional grade 400A MMA/TIG inverter welder capable of continuous thick metal fabrication.',
    description_lo: 'ຕູ້ຈອດໄຟຟ້າອຸດສາຫະກຳ ກະແສໄຟ 400 ອຳແປ ສາມາດຈອດເຫຼັກໜາໄດ້ຢ່າງຕໍ່ເນື່ອງ.',
    image_url: '/images/catalog/real/fuel_filter_1787994647541.jpg',
    qty_on_hand: 12,
    unit_price: 66.7,
    specs: {'Brand': 'Cummins', 'Model': 'IND-2884', 'Size': 'Standard Fitment (37 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock'
  },
  {
    sku_id: 'ind-072',
    sku_code: 'PMP-CEN-100M',
    barcode: '8850123078',
    part_name: 'Industrial Centrifugal Water Pump (100m Head)',
    part_name_lo: 'ປ້ຳນ້ຳຫອຍໂຂ່ງ ອຸດສາຫະກຳ (ດັນສູງ 100 ແມັດ)',
    category: 'Hydraulics & Pneumatics',
    description: 'High-pressure centrifugal pump designed for industrial water supply, cooling towers, and irrigation.',
    description_lo: 'ປ້ຳນ້ຳອຸດສາຫະກຳ ສາມາດດັນນ້ຳໄດ້ສູງ ແລະ ໃຫ້ປະລິມານນ້ຳຫຼາຍ ເໝາະສຳລັບໂຮງງານ ແລະ ກະສິກຳ.',
    image_url: '/images/catalog/real/wuling_type2_cable_1787992189196.jpg',
    qty_on_hand: 6,
    unit_price: 66.7,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-9263', 'Size': 'Standard Fitment (24 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock'
  },
  {
    sku_id: 'ind-073',
    sku_code: 'HVC-EXH-50IN',
    barcode: '8850123079',
    part_name: '50-Inch Industrial Exhaust Fan',
    part_name_lo: 'ພັດລົມລະບາຍອາກາດໂຮງງານ ຂະໜາດ 50 ນິ້ວ',
    category: 'Construction & Facility',
    description: 'Large galvanized steel exhaust fan for warehouse ventilation and industrial cooling applications.',
    description_lo: 'ພັດລົມລະບາຍອາກາດຂະໜາດໃຫຍ່ ໂຄງສ້າງເຫຼັກກາວາໄນ ປ້ອງກັນຂີ້ໝ້ຽງ ສຳລັບລະບາຍຄວາມຮ້ອນໃນໂຮງງານ.',
    image_url: '/images/catalog/real/flange_bearing_1787994582910.jpg',
    qty_on_hand: 20,
    unit_price: 66.7,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-6391', 'Size': 'Standard Fitment (16 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [ { min_qty: 10, price: 58.0 } ]
  },
  {
    sku_id: 'ind-074',
    sku_code: 'CLN-VAC-60L',
    barcode: '8850123080',
    part_name: '60L Heavy-Duty Wet/Dry Industrial Vacuum',
    part_name_lo: 'ເຄື່ອງດູດຝຸ່ນ-ດູດນ້ຳ ອຸດສາຫະກຳ (ຖັງ 60 ລິດ)',
    category: 'Construction & Facility',
    description: 'Twin-motor 60L stainless steel wet/dry vacuum cleaner for factory floors and construction site cleanup.',
    description_lo: 'ເຄື່ອງດູດຝຸ່ນ ແລະ ດູດນ້ຳ ມໍເຕີຄູ່ ແຮງດູດສູງ ຖັງສະແຕນເລດ 60 ລິດ ທົນທານຕໍ່ການໃຊ້ງານໜັກ.',
    image_url: '/images/catalog/real/modal_brk_cer_990_specs_1788006668502.png',
    qty_on_hand: 15,
    unit_price: 43.85,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-3736', 'Size': 'Standard Fitment (6 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock'
  },

  // Batch 2: Medical & First Aid
  {
    sku_id: 'med-001',
    sku_code: 'MED-EYE-01',
    barcode: '8850123020',
    part_name: 'Eye Wash Station',
    part_name_lo: 'ສະຖານີລ້າງຕາສຸກເສີນ',
    category: 'Tools, Safety & Medical',
    description: 'Wall-mounted emergency eye wash station.',
    description_lo: 'ສະຖານີລ້າງຕາສຸກເສີນແບບຕິດຝາ',
    image_url: '/images/catalog/real/eye_wash_station_1787994359559.jpg',
    qty_on_hand: 20,
    unit_price: 18.0
  },
  {
    sku_id: 'med-002',
    sku_code: 'MED-TRM-02',
    barcode: '8850123021',
    part_name: 'Trauma First Aid Kit',
    part_name_lo: 'ຊຸດປະຖົມພະຍາບານການບາດເຈັບ',
    category: 'Tools, Safety & Medical',
    description: 'Advanced trauma kit for severe injuries.',
    description_lo: 'ຊຸດປະຖົມພະຍາບານສຳລັບການບາດເຈັບຮ້າຍແຮງ',
    image_url: '/images/catalog/real/first_aid_kit_1787987108475.jpg',
    qty_on_hand: 15,
    unit_price: 18.0
  },
  {
    sku_id: 'med-003',
    sku_code: 'MED-CPR-03',
    barcode: '8850123022',
    part_name: 'CPR Pocket Mask',
    part_name_lo: 'ໜ້າກາກ CPR',
    category: 'Tools, Safety & Medical',
    description: 'Professional CPR pocket mask with one-way valve.',
    description_lo: 'ໜ້າກາກ CPR ພ້ອມວາວທາງດຽວ',
    image_url: '/images/catalog/real/cpr_mask_1787994387768.jpg',
    qty_on_hand: 50,
    unit_price: 18.0
  },
  {
    sku_id: 'med-004',
    sku_code: 'MED-BRN-04',
    barcode: '8850123023',
    part_name: 'Burn Care Kit',
    part_name_lo: 'ຊຸດປະຖົມພະຍາບານບາດແຜໄຟໄໝ້',
    category: 'Tools, Safety & Medical',
    description: 'Specialized kit for treating burn injuries.',
    description_lo: 'ຊຸດປະຖົມພະຍາບານສຳລັບບາດແຜໄຟໄໝ້ນ້ຳຮ້ອນລວກ',
    image_url: '/images/catalog/real/burn_kit_1787994421467.jpg',
    qty_on_hand: 30,
    unit_price: 18.0
  },
  {
    sku_id: 'med-005',
    sku_code: 'MED-STR-05',
    barcode: '8850123024',
    part_name: 'Spinal Board Stretcher',
    part_name_lo: 'ເປຫາມຄົນເຈັບແບບແຂງ',
    category: 'Tools, Safety & Medical',
    description: 'Heavy duty plastic spinal board stretcher.',
    description_lo: 'ເປຫາມຄົນເຈັບພລາສຕິກແຂງສຳລັບການບາດເຈັບກະດູກສັນຫຼັງ',
    image_url: '/images/catalog/real/stretcher_board_1787994434376.jpg',
    qty_on_hand: 10,
    unit_price: 18.0
  },

  // Batch 3: Construction Materials
  {
    sku_id: 'con-001',
    sku_code: 'CON-RBR-12',
    barcode: '8850123025',
    part_name: 'Steel Rebar 12mm',
    part_name_lo: 'ເຫຼັກເສັ້ນ 12mm',
    category: 'Construction & Facility',
    description: 'Deformed steel rebar for concrete reinforcement.',
    description_lo: 'ເຫຼັກເສັ້ນສຳລັບວຽກໂຄງສ້າງ',
    image_url: '/images/catalog/real/rebar_steel_1787994446883.jpg',
    qty_on_hand: 1000,
    unit_price: 18.0
  },
  {
    sku_id: 'con-002',
    sku_code: 'CON-IBM-20',
    barcode: '8850123026',
    part_name: 'Steel I-Beam 200x100',
    part_name_lo: 'ເຫຼັກຮູບປະພັນ I-Beam',
    category: 'Construction & Facility',
    description: 'Structural steel I-Beam for heavy construction.',
    description_lo: 'ເຫຼັກ I-Beam ສຳລັບໂຄງສ້າງຫຼັກ',
    image_url: '/images/catalog/real/ibeam_steel_1787994462788.jpg',
    qty_on_hand: 100,
    unit_price: 18.0
  },
  {
    sku_id: 'con-003',
    sku_code: 'CON-RMC-01',
    barcode: '8850123027',
    part_name: 'Ready-Mix Concrete',
    part_name_lo: 'ຊີມັງປະສົມສຳເລັດຮູບ',
    category: 'Construction & Facility',
    description: 'High-strength ready-mix concrete per cubic meter.',
    description_lo: 'ຊີມັງປະສົມສຳເລັດຮູບຕໍ່ແມັດກ້ອນ',
    image_url: '/images/catalog/real/readymix_concrete_1787994475610.jpg',
    qty_on_hand: 500,
    unit_price: 18.0
  },
  {
    sku_id: 'con-004',
    sku_code: 'CON-RFS-01',
    barcode: '8850123028',
    part_name: 'Corrugated Metal Roofing',
    part_name_lo: 'ສັງກະສີມຸງຫຼັງຄາ',
    category: 'Construction & Facility',
    description: 'Galvanized corrugated metal roofing sheet.',
    description_lo: 'ສັງກະສີມຸງຫຼັງຄາກັນໝ້ຽງ',
    image_url: '/images/catalog/real/metal_roofing_1787994488453.jpg',
    qty_on_hand: 500,
    unit_price: 18.0
  },
  {
    sku_id: 'con-005',
    sku_code: 'CON-PLY-18',
    barcode: '8850123029',
    part_name: 'Marine Plywood 18mm',
    part_name_lo: 'ໄມ້ອັດກັນນ້ຳ 18mm',
    category: 'Construction & Facility',
    description: 'Water-resistant marine grade plywood.',
    description_lo: 'ໄມ້ອັດກັນນ້ຳສຳລັບວຽກກໍ່ສ້າງ',
    image_url: '/images/catalog/real/plywood_sheet_1787994500566.jpg',
    qty_on_hand: 300,
    unit_price: 18.0
  },

  // Batch 4: Bearings & Bushings
  {
    sku_id: 'brg-001',
    sku_code: 'BRG-RLR-01',
    barcode: '8850123030',
    part_name: 'Cylindrical Roller Bearing',
    part_name_lo: 'ລູກປືນແບບລູກກິ້ງ',
    category: 'Parts & Components',
    description: 'High capacity cylindrical roller bearing.',
    description_lo: 'ລູກປືນແບບລູກກິ້ງຮັບນ້ຳໜັກສູງ',
    image_url: '/images/catalog/real/roller_bearing_1787994554828.jpg',
    qty_on_hand: 150,
    unit_price: 18.0
  },
  {
    sku_id: 'brg-002',
    sku_code: 'BRG-THR-01',
    barcode: '8850123031',
    part_name: 'Thrust Bearing',
    part_name_lo: 'ລູກປືນກັນຮຸນ',
    category: 'Parts & Components',
    description: 'Industrial thrust bearing for heavy loads.',
    description_lo: 'ລູກປືນກັນຮຸນສຳລັບວຽກໜັກ',
    image_url: '/images/catalog/real/thrust_bearing_1787994570116.jpg',
    qty_on_hand: 100,
    unit_price: 18.0
  },
  {
    sku_id: 'brg-003',
    sku_code: 'BRG-FLG-01',
    barcode: '8850123032',
    part_name: 'Mounted Flange Bearing',
    part_name_lo: 'ລູກປືນຕຸກກະຕາ',
    category: 'Parts & Components',
    description: 'Mounted bearing unit with cast iron housing.',
    description_lo: 'ລູກປືນຕຸກກະຕາພ້ອມເສື້ອ',
    image_url: '/images/catalog/real/flange_bearing_1787994582910.jpg',
    qty_on_hand: 200,
    unit_price: 18.0
  },
  {
    sku_id: 'brg-004',
    sku_code: 'BRG-BSH-01',
    barcode: '8850123033',
    part_name: 'Sintered Bronze Bushing',
    part_name_lo: 'ບູຊທອງເຫຼືອງ',
    category: 'Parts & Components',
    description: 'Self-lubricating sintered bronze bushing.',
    description_lo: 'ບູຊທອງເຫຼືອງຫຼໍ່ລື່ນໃນຕົວ',
    image_url: '/images/catalog/real/bronze_bushing_1787994598342.jpg',
    qty_on_hand: 500,
    unit_price: 18.0
  },
  {
    sku_id: 'brg-005',
    sku_code: 'BRG-LIN-01',
    barcode: '8850123034',
    part_name: 'Linear Motion Bearing',
    part_name_lo: 'ລູກປືນລາງເລື່ອນ',
    category: 'Parts & Components',
    description: 'Linear motion slide block bearing.',
    description_lo: 'ລູກປືນສຳລັບລາງເລື່ອນ',
    image_url: '/images/catalog/real/linear_bearing_1787994608195.jpg',
    qty_on_hand: 120,
    unit_price: 18.0
  },

  // Batch 5: Filters & Fluids
  {
    sku_id: 'fld-001',
    sku_code: 'FLD-HYD-46',
    barcode: '8850123035',
    part_name: 'Hydraulic Oil ISO 46 (20L)',
    part_name_lo: 'ນ້ຳມັນໄຮໂດຼລິກ ISO 46',
    category: 'Parts & Components',
    description: 'Premium anti-wear hydraulic oil.',
    description_lo: 'ນ້ຳມັນໄຮໂດຼລິກຄຸນນະພາບສູງ ຖັງ 20 ລິດ',
    image_url: '/images/catalog/real/hydraulic_oil_1787987728754.jpg',
    qty_on_hand: 80,
    unit_price: 18.0
  },
  {
    sku_id: 'fld-002',
    sku_code: 'FLT-AIR-01',
    barcode: '8850123036',
    part_name: 'Heavy Duty Air Filter',
    part_name_lo: 'ໄສ້ຕອງອາກາດວຽກໜັກ',
    category: 'Parts & Components',
    description: 'High capacity air filter element for construction equipment.',
    description_lo: 'ໄສ້ຕອງອາກາດສຳລັບລົດກົນຈັກໜັກ',
    image_url: '/images/catalog/real/air_filter_1787994635974.jpg',
    qty_on_hand: 150,
    unit_price: 18.0
  },
  {
    sku_id: 'fld-003',
    sku_code: 'FLT-FUL-01',
    barcode: '8850123037',
    part_name: 'Diesel Fuel Filter',
    part_name_lo: 'ໄສ້ຕອງນ້ຳມັນກາຊວນ',
    category: 'Parts & Components',
    description: 'Spin-on diesel fuel filter with water separator.',
    description_lo: 'ໄສ້ຕອງນ້ຳມັນກາຊວນແບບໝຸນ',
    image_url: '/images/catalog/real/fuel_filter_1787994647541.jpg',
    qty_on_hand: 200,
    unit_price: 18.0
  },
  {
    sku_id: 'fld-004',
    sku_code: 'FLD-CLN-01',
    barcode: '8850123038',
    part_name: 'Engine Antifreeze/Coolant (1 Gal)',
    part_name_lo: 'ນ້ຳຍາຫຼໍ່ເຢັນເຄື່ອງຈັກ',
    category: 'Parts & Components',
    description: 'Pre-mixed engine coolant 50/50.',
    description_lo: 'ນ້ຳຍາຫຼໍ່ເຢັນເຄື່ອງຈັກແບບປະສົມສຳເລັດ',
    image_url: '/images/catalog/real/aion_ev_coolant_1787991371969.jpg',
    qty_on_hand: 300,
    unit_price: 18.0
  },
  {
    sku_id: 'fld-005',
    sku_code: 'FLD-TRN-01',
    barcode: '8850123039',
    part_name: 'Heavy Duty Transmission Fluid (5L)',
    part_name_lo: 'ນ້ຳມັນເກຍອັດຕະໂນມັດ',
    category: 'Parts & Components',
    description: 'Synthetic heavy duty transmission fluid.',
    description_lo: 'ນ້ຳມັນເກຍສັງເຄາະສຳລັບລົດບັນທຸກໜັກ',
    image_url: '/images/catalog/real/heavy_duty_bearing_1787993170025.jpg',
    qty_on_hand: 120,
    unit_price: 18.0
  },
  
  // Batch 6: Electric Vehicle (EV) Parts - Expanding Brand Variety
  {
    sku_id: 'ev-020',
    sku_code: 'EV-TYT-01',
    barcode: '8850123040',
    part_name: 'Toyota bZ4X Cabin Air Filter',
    part_name_lo: 'ໄສ້ຕອງແອ Toyota bZ4X',
    category: 'EV & Electrical Systems',
    description: 'Genuine cabin air filter for Toyota bZ4X.',
    description_lo: 'ໄສ້ຕອງແອແທ້ສຳລັບ Toyota bZ4X',
    image_url: '/images/catalog/real/toyota_bz4x_filter_1787994838401.jpg',
    qty_on_hand: 50,
    unit_price: 18.0
  },
  {
    sku_id: 'ev-021',
    sku_code: 'EV-HND-01',
    barcode: '8850123041',
    part_name: 'Honda e:NS1 Brake Pads',
    part_name_lo: 'ຜ້າເບກ Honda e:NS1',
    category: 'EV & Electrical Systems',
    description: 'Front and rear brake pads for Honda e:NS1.',
    description_lo: 'ຜ້າເບກໜ້າ ແລະ ຫຼັງສຳລັບ Honda e:NS1',
    image_url: '/images/catalog/real/brake_pads_1787945576130.jpg',
    qty_on_hand: 40,
    unit_price: 18.0
  },
  {
    sku_id: 'ev-022',
    sku_code: 'EV-ICR-01',
    barcode: '8850123042',
    part_name: 'iCar 03 Portable Charging Cable',
    part_name_lo: 'ສາຍສາກພົກພາ iCar 03',
    category: 'EV & Electrical Systems',
    description: 'Portable Type 2 charging cable for iCar 03.',
    description_lo: 'ສາຍສາກພົກພາ Type 2 ສຳລັບ iCar 03',
    image_url: '/images/catalog/real/icar_03_cable_1787994865682.jpg',
    qty_on_hand: 15,
    unit_price: 18.0
  },
  {
    sku_id: 'ev-023',
    sku_code: 'EV-JAC-01',
    barcode: '8850123043',
    part_name: 'Jaecoo J7 PHEV Battery Coolant',
    part_name_lo: 'ນ້ຳຍາຫຼໍ່ເຢັນແບັດເຕີຣີ Jaecoo J7',
    category: 'EV & Electrical Systems',
    description: 'Specialized battery coolant for Jaecoo J7 PHEV.',
    description_lo: 'ນ້ຳຍາຫຼໍ່ເຢັນແບັດເຕີຣີສະເພາະສຳລັບ Jaecoo J7 PHEV',
    image_url: '/images/catalog/real/jaecoo_j7_coolant_1787994876651.jpg',
    qty_on_hand: 60,
    unit_price: 18.0
  },
  {
    sku_id: 'ev-024',
    sku_code: 'EV-ARC-01',
    barcode: '8850123044',
    part_name: 'Arcfox Alpha T Brake Fluid',
    part_name_lo: 'ນ້ຳມັນເບກ Arcfox Alpha T',
    category: 'EV & Electrical Systems',
    description: 'DOT 4 performance brake fluid for Arcfox Alpha T.',
    description_lo: 'ນ້ຳມັນເບກປະສິດທິພາບສູງ DOT 4 ສຳລັບ Arcfox Alpha T',
    image_url: '/images/catalog/real/arcfox_alpha_fluid_1787994887698.jpg',
    qty_on_hand: 80,
    unit_price: 18.0
  },
  {
    sku_id: 'ev-025',
    sku_code: 'EV-LPM-01',
    barcode: '8850123045',
    part_name: 'Leapmotor C11 HEPA Filter',
    part_name_lo: 'ໄສ້ຕອງແອ HEPA Leapmotor C11',
    category: 'EV & Electrical Systems',
    description: 'High-efficiency particulate air filter for Leapmotor C11.',
    description_lo: 'ໄສ້ຕອງແອປະສິດທິພາບສູງສຳລັບ Leapmotor C11',
    image_url: '/images/catalog/real/leapmotor_c11_filter_1787994899596.jpg',
    qty_on_hand: 100,
    unit_price: 18.0
  },
  {
    sku_id: 'ev-026',
    sku_code: 'EV-AIN-01',
    barcode: '8850123046',
    part_name: 'Aion Y Plus EV Tire',
    part_name_lo: 'ຢາງລົດ Aion Y Plus',
    category: 'EV & Electrical Systems',
    description: 'Low rolling resistance tire specifically for Aion Y Plus.',
    description_lo: 'ຢາງລົດໄຟຟ້າແຮງສຽດທານຕ່ຳສຳລັບ Aion Y Plus',
    image_url: '/images/catalog/real/aion_y_tire_1787994913656.jpg',
    qty_on_hand: 200,
    unit_price: 18.0
  }

,
  // Final Batch to ensure variety across ALL categories
  {
    sku_id: 'fst-002',
    sku_code: 'FST-BLT-08',
    barcode: '8850123047',
    part_name: 'Grade 8 Hex Bolt Box',
    part_name_lo: 'ນັອດກຽວ ຫົວຫົກຫຼ່ຽມ ເກຣດ 8 (ຍົກກ່ອງ)',
    category: 'Parts & Components',
    description: 'High tensile strength Grade 8 hex bolts for heavy machinery.',
    description_lo: 'ນັອດກຽວຮັບແຮງດຶງສູງ ເກຣດ 8 ສຳລັບເຄື່ອງຈັກໜັກ',
    image_url: '/images/catalog/real/grade_8_bolts_1787995172620.jpg',
    qty_on_hand: 50,
    unit_price: 18.0
  },
  {
    sku_id: 'cnv-002',
    sku_code: 'CNV-BLT-50',
    barcode: '8850123048',
    part_name: 'Heavy Duty Conveyor Belt Roll',
    part_name_lo: 'ສາຍພານລຳລຽງແບບໜັກ',
    category: 'Construction & Facility',
    description: 'Reinforced rubber conveyor belt for mining applications.',
    description_lo: 'ສາຍພານລຳລຽງຢາງເສີມໃຍເຫຼັກສຳລັບງານບໍ່ແຮ່',
    image_url: '/images/catalog/real/conveyor_belt_roll_1787995187053.jpg',
    qty_on_hand: 5,
    unit_price: 18.0
  },
  {
    sku_id: 'pnm-002',
    sku_code: 'PNM-CMP-02',
    barcode: '8850123049',
    part_name: 'Industrial Air Compressor',
    part_name_lo: 'ປ້ຳລົມອຸດສາຫະກຳ',
    category: 'Hydraulics & Pneumatics',
    description: 'Heavy duty pneumatic air compressor unit.',
    description_lo: 'ປ້ຳລົມອຸດສາຫະກຳສຳລັບວຽກໜັກ',
    image_url: '/images/catalog/real/air_compressor_1787989769249.jpg',
    qty_on_hand: 3,
    unit_price: 18.0
  },
  {
    sku_id: 'elc-002',
    sku_code: 'ELC-CNT-03',
    barcode: '8850123050',
    part_name: '3-Phase Magnetic Contactor',
    part_name_lo: 'ແມັກເນຕິກຄອນແທັກເຕີ 3 ເຟດ',
    category: 'EV & Electrical Systems',
    description: 'Industrial 3-phase magnetic contactor for motor control.',
    description_lo: 'ແມັກເນຕິກຄອນແທັກເຕີສຳລັບຄວບຄຸມມໍເຕີອຸດສາຫະກຳ',
    image_url: '/images/catalog/real/industrial_contactor_1787995211966.jpg',
    qty_on_hand: 40,
    unit_price: 18.0
  },
  {
    sku_id: 'wld-002',
    sku_code: 'WLD-MIG-15',
    barcode: '8850123051',
    part_name: 'MIG Welding Wire Spool 15kg',
    part_name_lo: 'ລວດຈອດ MIG 15kg',
    category: 'Construction & Facility',
    description: 'Copper coated steel MIG welding wire 0.8mm.',
    description_lo: 'ລວດຈອດ MIG ເຄືອບທອງແດງ ຂະໜາດ 0.8mm',
    image_url: '/images/catalog/real/mig_welding_wire_1787995228846.jpg',
    qty_on_hand: 100,
    unit_price: 18.0
  },
  {
    sku_id: 'pmp-002',
    sku_code: 'PMP-CNT-10',
    barcode: '8850123052',
    part_name: 'Centrifugal Water Pump',
    part_name_lo: 'ປ້ຳນ້ຳຫອຍໂຂ່ງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Heavy duty cast iron centrifugal water pump.',
    description_lo: 'ປ້ຳນ້ຳຫອຍໂຂ່ງເຫຼັກຫຼໍ່ສຳລັບອຸດສາຫະກຳ',
    image_url: '/images/catalog/real/centrifugal_pump_1787989816474.jpg',
    qty_on_hand: 8,
    unit_price: 18.0
  },
  {
    sku_id: 'hvc-002',
    sku_code: 'HVC-CHL-05',
    barcode: '8850123053',
    part_name: 'Industrial Water Chiller',
    part_name_lo: 'ເຄື່ອງທຳຄວາມເຢັນນ້ຳອຸດສາຫະກຳ (Chiller)',
    category: 'Construction & Facility',
    description: 'High capacity water chiller unit for industrial cooling.',
    description_lo: 'ເຄື່ອງທຳຄວາມເຢັນນ້ຳສຳລັບລະບົບຫຼໍ່ເຢັນໂຮງງານ',
    image_url: '/images/catalog/real/industrial_chiller_1787995257600.jpg',
    qty_on_hand: 2,
    unit_price: 18.0
  },
  {
    sku_id: 'cln-002',
    sku_code: 'CLN-SPL-01',
    barcode: '8850123054',
    part_name: 'Chemical Spill Containment Kit',
    part_name_lo: 'ຊຸດອຸປະກອນຮັບມືສານເຄມີຮົ່ວໄຫຼ',
    category: 'Construction & Facility',
    description: 'Emergency kit for industrial chemical and oil spills.',
    description_lo: 'ຊຸດອຸປະກອນສຸກເສີນສຳລັບຄວບຄຸມນ້ຳມັນ ແລະ ສານເຄມີຮົ່ວໄຫຼ',
    image_url: '/images/catalog/real/spill_containment_kit_1787995270912.jpg',
    qty_on_hand: 15,
    unit_price: 18.0
  }

,
  {
    sku_id: 'gen-1000',
    sku_code: 'AUTO-GEN-1000',
    barcode: '8854726754',
    part_name: 'Pro-Grade Crusher Jaw',
    part_name_lo: 'ຫົວເຈາະຫີນ ຄວາມຈຸສູງ',
    category: 'Heavy Equipment & Machinery',
    description: 'Professional-grade pro-grade crusher jaw engineered for maximum durability in harsh environments. Perfect for heavy duty operations requiring reliable performance. Backed by industry-leading warranty and certified to international standards.',
    description_lo: 'ຫົວເຈາະຫີນ ຄວາມຈຸສູງ ລະດັບອຸດສາຫະກຳ ຖືກອອກແບບມາເພື່ອຄວາມທົນທານສູງສຸດໃນສະພາບແວດລ້ອມທີ່ໂຫດຮ້າຍ. ເໝາະສຳລັບວຽກໜັກທີ່ຕ້ອງການປະສິດທິພາບທີ່ເຊື່ອຖືໄດ້. ຮັບປະກັນຄຸນນະພາບຊັ້ນນຳ ແລະ ໄດ້ຮັບມາດຕະຖານສາກົນ.',
    image_url: '/images/catalog/real/cpr_mask_1787994387768.jpg',
    qty_on_hand: 424,
    unit_price: 43.85,
    specs: {'Brand': 'Parker', 'Model': 'IND-8708', 'Size': 'Standard Fitment (35 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 38.13 },
      { min_qty: 50, price: 34.12 }
    ]
  },
  {
    sku_id: 'gen-1001',
    sku_code: 'AUTO-GEN-1001',
    barcode: '8858346110',
    part_name: 'Advanced High Voltage Cable',
    part_name_lo: 'ເຊວແບັດເຕີຣີ ຂັ້ນສູງ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES advanced high voltage cable. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຊວແບັດເຕີຣີ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/centrifugal_pump_1787995245344.jpg',
    qty_on_hand: 81,
    unit_price: 72.97,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-1306', 'Size': 'Standard Fitment (36 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 63.45 },
      { min_qty: 50, price: 56.77 }
    ]
  },
  {
    sku_id: 'gen-1002',
    sku_code: 'AUTO-GEN-1002',
    barcode: '8859958621',
    part_name: 'Compact Conveyor Roller',
    part_name_lo: 'ຕະແກງຄັດແຍກ ມາດຕະຖານ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES compact conveyor roller. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຕະແກງຄັດແຍກ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/safety_glasses_1787992054757.jpg',
    qty_on_hand: 135,
    unit_price: 44.8,
    specs: {'Brand': 'Berco', 'Model': 'IND-3024', 'Size': 'Standard Fitment (14 kg)', 'Application': 'Volvo Wheel Loaders'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 38.96 },
      { min_qty: 50, price: 34.86 }
    ]
  },
  {
    sku_id: 'gen-1003',
    sku_code: 'AUTO-GEN-1003',
    barcode: '8853202945',
    part_name: 'Pro-Grade AC Compressor',
    part_name_lo: 'ນ້ຳຢາແອ ລະດັບໂປຣ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES pro-grade ac compressor. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳຢາແອ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/leapmotor_agm_battery_1787991358674.jpg',
    qty_on_hand: 397,
    unit_price: 92.8,
    specs: {'Brand': 'SKF', 'Model': 'IND-6304', 'Size': 'Standard Fitment (9 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 80.7 },
      { min_qty: 50, price: 72.2 }
    ]
  },
  {
    sku_id: 'gen-1004',
    sku_code: 'AUTO-GEN-1004',
    barcode: '8853081441',
    part_name: 'Standard EV Charging Station',
    part_name_lo: 'ສາຍໄຟແຮງສູງ ພຣີມຽມ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES standard ev charging station. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສາຍໄຟແຮງສູງ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/track_link_1787945633262.jpg',
    qty_on_hand: 174,
    unit_price: 72.46,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-3352', 'Size': 'Standard Fitment (8 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 63.01 },
      { min_qty: 50, price: 56.38 }
    ]
  },
  {
    sku_id: 'gen-1005',
    sku_code: 'AUTO-GEN-1005',
    barcode: '8854042317',
    part_name: 'Heavy Duty Hydraulic Pump',
    part_name_lo: 'ກະບອກໄຮໂດຼລິກ ຂະໜາດນ້ອຍ',
    category: 'Hydraulics & Pneumatics',
    description: 'Kawasaki K3V112DT axial piston pump. The industry standard dual main pump for 20-ton class excavators, delivering reliable power up to 343 Bar.',
    description_lo: 'ປ້ຳໄຮໂດຼລິກຫຼັກ Kawasaki K3V112DT (ປ້ຳນິ້ວ). ມາດຕະຖານໂຮງງານສຳລັບລົດຂຸດ 20 ໂຕນ (PC200, 320D) ສ້າງແຮງດັນ 343 Bar.',
    image_url: '/images/catalog/real/toyota_bz4x_filter_1787994838401.jpg',
    qty_on_hand: 292,
    unit_price: 47.12,
    specs: {'Brand': 'Kawasaki', 'Model': 'K3V112DT', 'Size': '112 cc/rev, 343 Bar', 'Application': 'Komatsu PC200-8, CAT 320D'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 40.97 },
      { min_qty: 50, price: 36.66 }
    ]
  },
  {
    sku_id: 'gen-1006',
    sku_code: 'AUTO-GEN-1006',
    barcode: '8858915963',
    part_name: 'Advanced Trash Bin',
    part_name_lo: 'ແຜ່ນຊັບນ້ຳມັນ ຂັ້ນສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES advanced trash bin. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ແຜ່ນຊັບນ້ຳມັນ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_initial_page_1788007481417.png',
    qty_on_hand: 250,
    unit_price: 7.53,
    specs: {'Brand': 'SKF', 'Model': 'IND-6152', 'Size': 'Standard Fitment (36 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 6.55 },
      { min_qty: 50, price: 5.86 }
    ]
  },
  {
    sku_id: 'gen-1007',
    sku_code: 'AUTO-GEN-1007',
    barcode: '8854026521',
    part_name: 'Advanced Return Idler',
    part_name_lo: 'ຢາງກັນຝຸ່ນ ມາດຕະຖານ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES advanced return idler. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຢາງກັນຝຸ່ນ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/grade_8_bolts_1787995172620.jpg',
    qty_on_hand: 304,
    unit_price: 20.14,
    specs: {'Brand': 'SKF', 'Model': 'IND-3626', 'Size': 'Standard Fitment (16 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 17.51 },
      { min_qty: 50, price: 15.66 }
    ]
  },
  {
    sku_id: 'gen-1008',
    sku_code: 'AUTO-GEN-1008',
    barcode: '8856146254',
    part_name: 'Advanced High Voltage Cable',
    part_name_lo: 'ກ່ອງຄວບຄຸມມໍເຕີ ມາດຕະຖານ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES advanced high voltage cable. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ກ່ອງຄວບຄຸມມໍເຕີ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/heavy_duty_bearing_1787993170025.jpg',
    qty_on_hand: 244,
    unit_price: 1.64,
    specs: {'Brand': 'Cummins', 'Model': 'IND-9580', 'Size': 'Standard Fitment (47 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 1.43 },
      { min_qty: 50, price: 1.28 }
    ]
  },
  {
    sku_id: 'gen-1009',
    sku_code: 'AUTO-GEN-1009',
    barcode: '8859575772',
    part_name: 'Standard Nylon Bushing',
    part_name_lo: 'ລູກປືນກົມ ລະດັບໂປຣ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES standard nylon bushing. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກປືນກົມ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/diesel_engine_oil_1787987716108.jpg',
    qty_on_hand: 52,
    unit_price: 3.19,
    specs: {'Brand': 'SKF', 'Model': 'IND-8431', 'Size': 'Standard Fitment (26 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 2.77 },
      { min_qty: 50, price: 2.48 }
    ]
  },
  {
    sku_id: 'gen-1010',
    sku_code: 'AUTO-GEN-1010',
    barcode: '8854707508',
    part_name: 'Premium Light Tower (Rental)',
    part_name_lo: 'ລົດຍົກ Scissor Lift (ເຊົ່າ) ລະດັບໂປຣ',
    category: 'Equipment Rental',
    description: 'Genuine OEM/OES premium light tower (rental). Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລົດຍົກ Scissor Lift (ເຊົ່າ) ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_page_top_1787942795711.png',
    qty_on_hand: 58,
    unit_price: 86.02,
    specs: {'Brand': 'SKF', 'Model': 'IND-3578', 'Size': 'Standard Fitment (11 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 74.8 },
      { min_qty: 50, price: 66.93 }
    ]
  },
  {
    sku_id: 'gen-1011',
    sku_code: 'AUTO-GEN-1011',
    barcode: '8852098384',
    part_name: 'Pro-Grade Track Chain',
    part_name_lo: 'ແຂ້ວລົດຂຸດ ອຸດສາຫະກຳ',
    category: 'Heavy Equipment & Machinery',
    description: 'Berco sealed and lubricated track (SALT) chain (49 links). Premium Italian manufacturing guarantees extended undercarriage life for Komatsu excavators.',
    description_lo: 'ໂສ້ແທຣັກ Berco (ອິຕາລີ) ແບບມີຊີລກັນນ້ຳມັນ 49 ຂໍ້ ສຳລັບລົດຂຸດ Komatsu PC200. ລະບົບຫຼໍ່ລື່ນພາຍໃນຊ່ວຍຍືດອາຍຸຊ່ວງລຸ່ມໄດ້ຫຼາຍເທົ່າຕົວ.',
    image_url: '/images/catalog/real/forklift_main_1787945346855.jpg',
    qty_on_hand: 47,
    unit_price: 83.23,
    specs: {'Brand': 'Berco', 'Model': 'CR5543', 'Size': '49 Links, Pitch: 216mm', 'Application': 'Komatsu PC200-8, PC220'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 72.37 },
      { min_qty: 50, price: 64.75 }
    ]
  },
  {
    sku_id: 'gen-1012',
    sku_code: 'AUTO-GEN-1012',
    barcode: '8859083418',
    part_name: 'Premium Relay',
    part_name_lo: 'ຣີເລ ອຸດສາຫະກຳ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES premium relay. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຣີເລ ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/lifepo4_battery_1787945655369.jpg',
    qty_on_hand: 437,
    unit_price: 72.02,
    specs: {'Brand': 'SKF', 'Model': 'IND-6052', 'Size': 'Standard Fitment (27 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 62.63 },
      { min_qty: 50, price: 56.04 }
    ]
  },
  {
    sku_id: 'gen-1013',
    sku_code: 'AUTO-GEN-1013',
    barcode: '8856547174',
    part_name: 'Heavy Duty Refrigerant Gas',
    part_name_lo: 'ພັດລົມລະບາຍຄວາມຮ້ອນ ພຣີມຽມ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES heavy duty refrigerant gas. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ພັດລົມລະບາຍຄວາມຮ້ອນ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/mg_12v_battery_1787992153571.jpg',
    qty_on_hand: 20,
    unit_price: 37.12,
    specs: {'Brand': 'Cummins', 'Model': 'IND-9761', 'Size': 'Standard Fitment (26 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 32.28 },
      { min_qty: 50, price: 28.88 }
    ]
  },
  {
    sku_id: 'gen-1014',
    sku_code: 'AUTO-GEN-1014',
    barcode: '8852907784',
    part_name: 'Industrial Ball Bearing',
    part_name_lo: 'ລູກປືນຕຸກກະຕາ ຂະໜາດນ້ອຍ',
    category: 'Parts & Components',
    description: 'Genuine SKF 6210-2RS deep groove ball bearing with C3 clearance. Rubber sealed on both sides and pre-lubricated with high-temperature grease.',
    description_lo: 'ລູກປືນກົມ SKF 6210-2RS ແທ້ (ໄລຍະຫ່າງ C3). ມີຊີລຢາງປິດທັງສອງດ້ານ ແລະ ບັນຈຸຈາລະບີທົນຄວາມຮ້ອນ ເໝາະສຳລັບມໍເຕີໄຟຟ້າຮອບຈັດ.',
    image_url: '/images/catalog/real/icar_cabin_filter_1787991309425.jpg',
    qty_on_hand: 432,
    unit_price: 30.21,
    specs: {'Brand': 'SKF', 'Model': '6210-2RS1/C3', 'Size': 'ID: 50, OD: 90, W: 20mm', 'Application': 'Industrial Electric Motors, Pumps'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 26.27 },
      { min_qty: 50, price: 23.5 }
    ]
  },
  {
    sku_id: 'gen-1015',
    sku_code: 'AUTO-GEN-1015',
    barcode: '8856204195',
    part_name: 'Premium Plasma Cutter Tip',
    part_name_lo: 'ຄີມຈັບລວດຈອດ ລະດັບໂປຣ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES premium plasma cutter tip. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຄີມຈັບລວດຈອດ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/industrial_grease_1787989730046.jpg',
    qty_on_hand: 464,
    unit_price: 106.65,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-7855', 'Size': 'Standard Fitment (22 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 92.74 },
      { min_qty: 50, price: 82.97 }
    ]
  },
  {
    sku_id: 'gen-1016',
    sku_code: 'AUTO-GEN-1016',
    barcode: '8857390959',
    part_name: 'Advanced Cable Tie',
    part_name_lo: 'ພາວເວີຊັບພາຍ ລະດັບໂປຣ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES advanced cable tie. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ພາວເວີຊັບພາຍ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/led_flood_light_1787989927255.jpg',
    qty_on_hand: 468,
    unit_price: 73.74,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-5062', 'Size': 'Standard Fitment (27 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 64.12 },
      { min_qty: 50, price: 57.37 }
    ]
  },
  {
    sku_id: 'gen-1017',
    sku_code: 'AUTO-GEN-1017',
    barcode: '8853592872',
    part_name: 'Standard Control Valve',
    part_name_lo: 'ປ້ຳໄຮໂດຼລິກ ຂະໜາດນ້ອຍ',
    category: 'Hydraulics & Pneumatics',
    description: 'Danfoss PVG 32 proportional directional control valve. 3-spool configuration with load-sensing capabilities, rated for 80 L/min.',
    description_lo: 'ວາວຄວບຄຸມທິດທາງໄຮໂດຼລິກ Danfoss PVG 32 (3 ແກນ). ມີລະບົບ Load-sensing ຊ່ວຍປະຢັດພະລັງງານ ຮອງຮັບການໄຫຼ 80 L/min.',
    image_url: '/images/catalog/real/air_compressor_1787995199402.jpg',
    qty_on_hand: 161,
    unit_price: 7.42,
    specs: {'Brand': 'Danfoss', 'Model': 'PVG 32', 'Size': '3-Spool, 80 L/min', 'Application': 'Forestry and Construction Machinery'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 6.45 },
      { min_qty: 50, price: 5.77 }
    ]
  },
  {
    sku_id: 'gen-1018',
    sku_code: 'AUTO-GEN-1018',
    barcode: '8859497627',
    part_name: 'Heavy Duty TIG Torch',
    part_name_lo: 'ຫົວຕັດພາດສະມ່າ ອຸດສາຫະກຳ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES heavy duty tig torch. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫົວຕັດພາດສະມ່າ ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/conveyor_belt_roll_1787995187053.jpg',
    qty_on_hand: 410,
    unit_price: 68.33,
    specs: {'Brand': 'Bosch', 'Model': 'IND-6540', 'Size': 'Standard Fitment (6 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 59.42 },
      { min_qty: 50, price: 53.16 }
    ]
  },
  {
    sku_id: 'gen-1019',
    sku_code: 'AUTO-GEN-1019',
    barcode: '8856688368',
    part_name: 'High Capacity Air Hose',
    part_name_lo: 'ໂຊລິນອຍວາວ ແບບໜັກ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES high capacity air hose. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໂຊລິນອຍວາວ ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/neta_ev_tire_1787992165722.jpg',
    qty_on_hand: 237,
    unit_price: 54.77,
    specs: {'Brand': 'Parker', 'Model': 'IND-5337', 'Size': 'Standard Fitment (27 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 47.63 },
      { min_qty: 50, price: 42.62 }
    ]
  },
  {
    sku_id: 'gen-1020',
    sku_code: 'AUTO-GEN-1020',
    barcode: '8855897501',
    part_name: 'Industrial Relay',
    part_name_lo: 'ພາວເວີຊັບພາຍ ຂະໜາດນ້ອຍ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES industrial relay. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ພາວເວີຊັບພາຍ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/modal_exc_trk_700_specs_1788006619191.png',
    qty_on_hand: 10,
    unit_price: 60.83,
    specs: {'Brand': 'Cummins', 'Model': 'IND-4328', 'Size': 'Standard Fitment (4 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 52.9 },
      { min_qty: 50, price: 47.33 }
    ]
  },
  {
    sku_id: 'gen-1021',
    sku_code: 'AUTO-GEN-1021',
    barcode: '8854638319',
    part_name: 'Industrial Power Supply',
    part_name_lo: 'ເບກເກີ ຂັ້ນສູງ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES industrial power supply. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເບກເກີ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/industrial_vacuum_cleaner_1787993454700.jpg',
    qty_on_hand: 206,
    unit_price: 57.06,
    specs: {'Brand': 'Bosch', 'Model': 'IND-9269', 'Size': 'Standard Fitment (24 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 49.62 },
      { min_qty: 50, price: 44.4 }
    ]
  },
  {
    sku_id: 'gen-1022',
    sku_code: 'AUTO-GEN-1022',
    barcode: '8858551927',
    part_name: 'Standard Check Valve',
    part_name_lo: 'ວາວປີກຜີເສື້ອ ຂະໜາດນ້ອຍ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES standard check valve. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ວາວປີກຜີເສື້ອ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/hydraulic_pump_1787945565960.jpg',
    qty_on_hand: 135,
    unit_price: 61.02,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-8705', 'Size': 'Standard Fitment (25 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 53.06 },
      { min_qty: 50, price: 47.47 }
    ]
  },
  {
    sku_id: 'gen-1023',
    sku_code: 'AUTO-GEN-1023',
    barcode: '8859134205',
    part_name: 'Industrial Solar Cable',
    part_name_lo: 'ສາຍໄຟໂຊລ່າ ຄວາມຈຸສູງ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES industrial solar cable. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສາຍໄຟໂຊລ່າ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/modal_cat_flt_8800_specs_1788006501403.png',
    qty_on_hand: 181,
    unit_price: 57.17,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-1326', 'Size': 'Standard Fitment (20 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 49.71 },
      { min_qty: 50, price: 44.48 }
    ]
  },
  {
    sku_id: 'gen-1024',
    sku_code: 'AUTO-GEN-1024',
    barcode: '8859643232',
    part_name: 'Advanced EV AC Compressor',
    part_name_lo: 'ບອດ BMS EV ແບບໜັກ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES advanced ev ac compressor. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ບອດ BMS EV ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/rubber_tracks_1787987801661.jpg',
    qty_on_hand: 138,
    unit_price: 81.37,
    specs: {'Brand': 'Bosch', 'Model': 'IND-4799', 'Size': 'Standard Fitment (20 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 70.76 },
      { min_qty: 50, price: 63.31 }
    ]
  },
  {
    sku_id: 'gen-1025',
    sku_code: 'AUTO-GEN-1025',
    barcode: '8855815461',
    part_name: 'Pro-Grade Charge Controller',
    part_name_lo: 'ແບັດເຕີຣີ Deep Cycle ຄວາມຈຸສູງ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES pro-grade charge controller. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ແບັດເຕີຣີ Deep Cycle ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/jaecoo_led_headlight_1787991324547.jpg',
    qty_on_hand: 303,
    unit_price: 48.24,
    specs: {'Brand': 'SKF', 'Model': 'IND-1474', 'Size': 'Standard Fitment (12 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 41.95 },
      { min_qty: 50, price: 37.53 }
    ]
  },
  {
    sku_id: 'gen-1026',
    sku_code: 'AUTO-GEN-1026',
    barcode: '8852731143',
    part_name: 'Pro-Grade Push Broom',
    part_name_lo: 'ນ້ຳຍາລ້າງຄາບນ້ຳມັນ ພຣີມຽມ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES pro-grade push broom. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳຍາລ້າງຄາບນ້ຳມັນ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/product_1_details_1788006980550.png',
    qty_on_hand: 20,
    unit_price: 64.0,
    specs: {'Brand': 'Bosch', 'Model': 'IND-5105', 'Size': 'Standard Fitment (5 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 55.65 },
      { min_qty: 50, price: 49.79 }
    ]
  },
  {
    sku_id: 'gen-1027',
    sku_code: 'AUTO-GEN-1027',
    barcode: '8851735282',
    part_name: 'High Capacity Cable Tie',
    part_name_lo: 'ຣີເລ ແບບໜັກ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES high capacity cable tie. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຣີເລ ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/hydraulic_valve_1787989831146.jpg',
    qty_on_hand: 99,
    unit_price: 6.5,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-8769', 'Size': 'Standard Fitment (3 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 5.65 },
      { min_qty: 50, price: 5.05 }
    ]
  },
  {
    sku_id: 'gen-1028',
    sku_code: 'AUTO-GEN-1028',
    barcode: '8857479320',
    part_name: 'Compact Scissor Lift (Rental)',
    part_name_lo: 'ລົດຍົກ Scissor Lift (ເຊົ່າ) ອຸດສາຫະກຳ',
    category: 'Equipment Rental',
    description: 'Genuine OEM/OES compact scissor lift (rental). Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລົດຍົກ Scissor Lift (ເຊົ່າ) ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/first_product_hover_1787944260980.png',
    qty_on_hand: 75,
    unit_price: 97.42,
    specs: {'Brand': 'Bosch', 'Model': 'IND-9419', 'Size': 'Standard Fitment (26 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 84.71 },
      { min_qty: 50, price: 75.79 }
    ]
  },
  {
    sku_id: 'gen-1029',
    sku_code: 'AUTO-GEN-1029',
    barcode: '8856070522',
    part_name: 'Heavy Duty Masonry Anchor',
    part_name_lo: 'ນັອດກຽວຕະຫຼອດ ອຸດສາຫະກຳ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES heavy duty masonry anchor. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນັອດກຽວຕະຫຼອດ ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/safety_shoes_fb_1787986500590.jpg',
    qty_on_hand: 178,
    unit_price: 8.59,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-4507', 'Size': 'Standard Fitment (39 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 7.47 },
      { min_qty: 50, price: 6.68 }
    ]
  },
  {
    sku_id: 'gen-1030',
    sku_code: 'AUTO-GEN-1030',
    barcode: '8856428233',
    part_name: 'Heavy Duty Scissor Lift (Rental)',
    part_name_lo: 'ລົດຍົກ Scissor Lift (ເຊົ່າ) ຂັ້ນສູງ',
    category: 'Equipment Rental',
    description: 'Genuine OEM/OES heavy duty scissor lift (rental). Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລົດຍົກ Scissor Lift (ເຊົ່າ) ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/air_compressor_1787989769249.jpg',
    qty_on_hand: 340,
    unit_price: 7.97,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-3808', 'Size': 'Standard Fitment (22 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 6.93 },
      { min_qty: 50, price: 6.2 }
    ]
  },
  {
    sku_id: 'gen-1031',
    sku_code: 'AUTO-GEN-1031',
    barcode: '8854813038',
    part_name: 'Standard AC Compressor',
    part_name_lo: 'ພັດລົມລະບາຍຄວາມຮ້ອນ ຄວາມຈຸສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES standard ac compressor. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ພັດລົມລະບາຍຄວາມຮ້ອນ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/modal_cat_flt_8800_specs_1788006801075.png',
    qty_on_hand: 112,
    unit_price: 103.76,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-5419', 'Size': 'Standard Fitment (26 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 90.23 },
      { min_qty: 50, price: 80.73 }
    ]
  },
  {
    sku_id: 'gen-1032',
    sku_code: 'AUTO-GEN-1032',
    barcode: '8854547509',
    part_name: 'Compact OBC Charger',
    part_name_lo: 'ເຄື່ອງຊາດ OBC ຄວາມຈຸສູງ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES compact obc charger. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຄື່ອງຊາດ OBC ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/transmission_fluid_1787994722473.jpg',
    qty_on_hand: 160,
    unit_price: 25.79,
    specs: {'Brand': 'Bosch', 'Model': 'IND-2064', 'Size': 'Standard Fitment (46 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 22.43 },
      { min_qty: 50, price: 20.07 }
    ]
  },
  {
    sku_id: 'gen-1033',
    sku_code: 'AUTO-GEN-1033',
    barcode: '8853790032',
    part_name: 'High Capacity Charge Controller',
    part_name_lo: 'ສາຍໄຟໂຊລ່າ ພຣີມຽມ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES high capacity charge controller. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສາຍໄຟໂຊລ່າ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/modal_hyd_pmp_550_specs_1788006553851.png',
    qty_on_hand: 229,
    unit_price: 24.55,
    specs: {'Brand': 'Parker', 'Model': 'IND-5686', 'Size': 'Standard Fitment (34 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 21.35 },
      { min_qty: 50, price: 19.1 }
    ]
  },
  {
    sku_id: 'gen-1034',
    sku_code: 'AUTO-GEN-1034',
    barcode: '8854194196',
    part_name: 'High Capacity Rock Drill Bit',
    part_name_lo: 'ຫົວເຈາະຫີນ ຄວາມຈຸສູງ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES high capacity rock drill bit. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫົວເຈາະຫີນ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/modal_cat_flt_8800_viewport_1788006492943.png',
    qty_on_hand: 51,
    unit_price: 71.67,
    specs: {'Brand': 'ITR', 'Model': 'IND-4673', 'Size': 'Standard Fitment (5 kg)', 'Application': 'Mining Dump Trucks'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 62.32 },
      { min_qty: 50, price: 55.76 }
    ]
  },
  {
    sku_id: 'gen-1035',
    sku_code: 'AUTO-GEN-1035',
    barcode: '8856175850',
    part_name: 'Compact Industrial Degreaser',
    part_name_lo: 'ຖັງຂີ້ເຫຍື້ອ ຂະໜາດນ້ອຍ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES compact industrial degreaser. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຖັງຂີ້ເຫຍື້ອ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/burn_kit_1787994421467.jpg',
    qty_on_hand: 183,
    unit_price: 73.89,
    specs: {'Brand': 'Cummins', 'Model': 'IND-9592', 'Size': 'Standard Fitment (12 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 64.25 },
      { min_qty: 50, price: 57.49 }
    ]
  },
  {
    sku_id: 'gen-1036',
    sku_code: 'AUTO-GEN-1036',
    barcode: '8852863281',
    part_name: 'Heavy Duty Trash Bin',
    part_name_lo: 'ຖັງຂີ້ເຫຍື້ອ ລະດັບໂປຣ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES heavy duty trash bin. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຖັງຂີ້ເຫຍື້ອ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/thrust_bearing_1787994570116.jpg',
    qty_on_hand: 74,
    unit_price: 41.65,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-3521', 'Size': 'Standard Fitment (5 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 36.22 },
      { min_qty: 50, price: 32.41 }
    ]
  },
  {
    sku_id: 'gen-1037',
    sku_code: 'AUTO-GEN-1037',
    barcode: '8859171560',
    part_name: 'Pro-Grade Medical Gloves',
    part_name_lo: 'ກະເປົ໋າປະຖົມພະຍາບານ ລະດັບໂປຣ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES pro-grade medical gloves. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ກະເປົ໋າປະຖົມພະຍາບານ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/ibeam_steel_1787994462788.jpg',
    qty_on_hand: 324,
    unit_price: 48.41,
    specs: {'Brand': 'SKF', 'Model': 'IND-6662', 'Size': 'Standard Fitment (7 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 42.1 },
      { min_qty: 50, price: 37.67 }
    ]
  },
  {
    sku_id: 'gen-1038',
    sku_code: 'AUTO-GEN-1038',
    barcode: '8857603669',
    part_name: 'Compact Oil Filter',
    part_name_lo: 'ໄສ້ຕອງນ້ຳມັນເຄື່ອງ ຂະໜາດນ້ອຍ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES compact oil filter. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໄສ້ຕອງນ້ຳມັນເຄື່ອງ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/arcfox_alpha_fluid_1787994887698.jpg',
    qty_on_hand: 368,
    unit_price: 32.55,
    specs: {'Brand': 'SKF', 'Model': 'IND-7055', 'Size': 'Standard Fitment (13 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 28.3 },
      { min_qty: 50, price: 25.32 }
    ]
  },
  {
    sku_id: 'gen-1039',
    sku_code: 'AUTO-GEN-1039',
    barcode: '8854147237',
    part_name: 'Advanced Diaphragm Pump',
    part_name_lo: 'ປ້ຳໄດອະແຟມ ມາດຕະຖານ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES advanced diaphragm pump. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ປ້ຳໄດອະແຟມ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/industrial_chiller_1787995257600.jpg',
    qty_on_hand: 452,
    unit_price: 57.67,
    specs: {'Brand': 'Cummins', 'Model': 'IND-8485', 'Size': 'Standard Fitment (10 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 50.15 },
      { min_qty: 50, price: 44.87 }
    ]
  },
  {
    sku_id: 'gen-1040',
    sku_code: 'AUTO-GEN-1040',
    barcode: '8854686715',
    part_name: 'High Capacity Control Valve',
    part_name_lo: 'ວາວຄວບຄຸມ ລະດັບໂປຣ',
    category: 'Hydraulics & Pneumatics',
    description: 'Danfoss PVG 32 proportional directional control valve. 3-spool configuration with load-sensing capabilities, rated for 80 L/min.',
    description_lo: 'ວາວຄວບຄຸມທິດທາງໄຮໂດຼລິກ Danfoss PVG 32 (3 ແກນ). ມີລະບົບ Load-sensing ຊ່ວຍປະຢັດພະລັງງານ ຮອງຮັບການໄຫຼ 80 L/min.',
    image_url: '/images/catalog/real/mig_welding_wire_1787995228846.jpg',
    qty_on_hand: 204,
    unit_price: 2.42,
    specs: {'Brand': 'Danfoss', 'Model': 'PVG 32', 'Size': '3-Spool, 80 L/min', 'Application': 'Forestry and Construction Machinery'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 2.1 },
      { min_qty: 50, price: 1.88 }
    ]
  },
  {
    sku_id: 'gen-1041',
    sku_code: 'AUTO-GEN-1041',
    barcode: '8859212200',
    part_name: 'High Capacity Cable Tie',
    part_name_lo: 'ສາຍເຄເບິ້ນທາຍ ລະດັບໂປຣ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES high capacity cable tie. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສາຍເຄເບິ້ນທາຍ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/first_aid_cabinet_1787987096264.jpg',
    qty_on_hand: 156,
    unit_price: 83.98,
    specs: {'Brand': 'SKF', 'Model': 'IND-1833', 'Size': 'Standard Fitment (47 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 73.03 },
      { min_qty: 50, price: 65.35 }
    ]
  },
  {
    sku_id: 'gen-1042',
    sku_code: 'AUTO-GEN-1042',
    barcode: '8853915488',
    part_name: 'Heavy Duty Pressure Valve',
    part_name_lo: 'ວາວປັບແຮງດັນ ຄວາມຈຸສູງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Bosch Rexroth DBW10 direct-acting pressure relief valve. Adjustable 50-315 Bar with a maximum flow capacity of 120 L/min.',
    description_lo: 'ວາວລະບາຍແຮງດັນ Bosch Rexroth ແທ້ (DBW10). ສາມາດປັບຕັ້ງໄດ້ 50-315 Bar ຮອງຮັບການໄຫຼ 120 L/min ຕອບສະໜອງໄວ.',
    image_url: '/images/catalog/real/store_page_view_1787944254540.png',
    qty_on_hand: 172,
    unit_price: 9.05,
    specs: {'Brand': 'Bosch Rexroth', 'Model': 'DBW10', 'Size': 'G 3/4 inch, 120 L/min', 'Application': 'Industrial Hydraulic Power Units'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 7.87 },
      { min_qty: 50, price: 7.04 }
    ]
  },
  {
    sku_id: 'gen-1043',
    sku_code: 'AUTO-GEN-1043',
    barcode: '8851512064',
    part_name: 'Industrial Power Supply',
    part_name_lo: 'ເທີມິນອລບັອກ ຂັ້ນສູງ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES industrial power supply. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເທີມິນອລບັອກ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/nitrile_gloves_1787986515132.jpg',
    qty_on_hand: 215,
    unit_price: 53.43,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-5416', 'Size': 'Standard Fitment (21 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 46.46 },
      { min_qty: 50, price: 41.57 }
    ]
  },
  {
    sku_id: 'gen-1044',
    sku_code: 'AUTO-GEN-1044',
    barcode: '8856855807',
    part_name: 'Heavy Duty Battery Cell',
    part_name_lo: 'ສາຍໄຟແຮງສູງ ຂະໜາດນ້ອຍ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES heavy duty battery cell. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສາຍໄຟແຮງສູງ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/portland_cement_bag_1787993158262.jpg',
    qty_on_hand: 107,
    unit_price: 54.16,
    specs: {'Brand': 'Parker', 'Model': 'IND-4878', 'Size': 'Standard Fitment (2 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 47.1 },
      { min_qty: 50, price: 42.14 }
    ]
  },
  {
    sku_id: 'gen-1045',
    sku_code: 'AUTO-GEN-1045',
    barcode: '8855932024',
    part_name: 'Standard Transmission Fluid',
    part_name_lo: 'ໄສ້ຕອງແອ ຂັ້ນສູງ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES standard transmission fluid. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໄສ້ຕອງແອ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/truck_battery_1787987701312.jpg',
    qty_on_hand: 166,
    unit_price: 27.53,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-2643', 'Size': 'Standard Fitment (50 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 23.94 },
      { min_qty: 50, price: 21.42 }
    ]
  },
  {
    sku_id: 'gen-1046',
    sku_code: 'AUTO-GEN-1046',
    barcode: '8857584233',
    part_name: 'Compact Welding Glove',
    part_name_lo: 'ຖົງມືຈອດ ແບບໜັກ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES compact welding glove. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຖົງມືຈອດ ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/trauma_kit_1787994372278.jpg',
    qty_on_hand: 10,
    unit_price: 106.67,
    specs: {'Brand': 'Cummins', 'Model': 'IND-2377', 'Size': 'Standard Fitment (44 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 92.76 },
      { min_qty: 50, price: 83.0 }
    ]
  },
  {
    sku_id: 'gen-1047',
    sku_code: 'AUTO-GEN-1047',
    barcode: '8852141539',
    part_name: 'Advanced Sterile Gauze',
    part_name_lo: 'ຜ້າເຊັດຂ້າເຊື້ອ ພຣີມຽມ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES advanced sterile gauze. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຜ້າເຊັດຂ້າເຊື້ອ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/forklift_wheel_1787945554947.jpg',
    qty_on_hand: 208,
    unit_price: 47.17,
    specs: {'Brand': 'SKF', 'Model': 'IND-1876', 'Size': 'Standard Fitment (26 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 41.02 },
      { min_qty: 50, price: 36.71 }
    ]
  },
  {
    sku_id: 'gen-1048',
    sku_code: 'AUTO-GEN-1048',
    barcode: '8852278158',
    part_name: 'Premium Mini Excavator (Rental)',
    part_name_lo: 'ລົດຕັກນ້ອຍ (ເຊົ່າ) ແບບໜັກ',
    category: 'Equipment Rental',
    description: 'Genuine OEM/OES premium mini excavator (rental). Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລົດຕັກນ້ອຍ (ເຊົ່າ) ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/specs_table_1787943984002.png',
    qty_on_hand: 53,
    unit_price: 62.86,
    specs: {'Brand': 'Cummins', 'Model': 'IND-5190', 'Size': 'Standard Fitment (14 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 54.66 },
      { min_qty: 50, price: 48.91 }
    ]
  },
  {
    sku_id: 'gen-1049',
    sku_code: 'AUTO-GEN-1049',
    barcode: '8858736993',
    part_name: 'Compact Track Chain',
    part_name_lo: 'ບຸ້ງກີ໋ລົດຕັກ ຂັ້ນສູງ',
    category: 'Heavy Equipment & Machinery',
    description: 'Berco sealed and lubricated track (SALT) chain (49 links). Premium Italian manufacturing guarantees extended undercarriage life for Komatsu excavators.',
    description_lo: 'ໂສ້ແທຣັກ Berco (ອິຕາລີ) ແບບມີຊີລກັນນ້ຳມັນ 49 ຂໍ້ ສຳລັບລົດຂຸດ Komatsu PC200. ລະບົບຫຼໍ່ລື່ນພາຍໃນຊ່ວຍຍືດອາຍຸຊ່ວງລຸ່ມໄດ້ຫຼາຍເທົ່າຕົວ.',
    image_url: '/images/catalog/real/forklift_side_1787945419504.jpg',
    qty_on_hand: 80,
    unit_price: 11.42,
    specs: {'Brand': 'Berco', 'Model': 'CR5543', 'Size': '49 Links, Pitch: 216mm', 'Application': 'Komatsu PC200-8, PC220'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 9.93 },
      { min_qty: 50, price: 8.89 }
    ]
  },
  {
    sku_id: 'gen-1050',
    sku_code: 'AUTO-GEN-1050',
    barcode: '8859351312',
    part_name: 'Advanced Control Valve',
    part_name_lo: 'ສາຍໄຮໂດຼລິກ ຄວາມຈຸສູງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Danfoss PVG 32 proportional directional control valve. 3-spool configuration with load-sensing capabilities, rated for 80 L/min.',
    description_lo: 'ວາວຄວບຄຸມທິດທາງໄຮໂດຼລິກ Danfoss PVG 32 (3 ແກນ). ມີລະບົບ Load-sensing ຊ່ວຍປະຢັດພະລັງງານ ຮອງຮັບການໄຫຼ 80 L/min.',
    image_url: '/images/catalog/real/readymix_concrete_1787994475610.jpg',
    qty_on_hand: 121,
    unit_price: 58.89,
    specs: {'Brand': 'Danfoss', 'Model': 'PVG 32', 'Size': '3-Spool, 80 L/min', 'Application': 'Forestry and Construction Machinery'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 51.21 },
      { min_qty: 50, price: 45.82 }
    ]
  },
  {
    sku_id: 'gen-1051',
    sku_code: 'AUTO-GEN-1051',
    barcode: '8852616266',
    part_name: 'Heavy Duty Air Regulator',
    part_name_lo: 'ສາຍລົມ ແບບໜັກ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES heavy duty air regulator. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສາຍລົມ ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/coolant_1787994663953.jpg',
    qty_on_hand: 317,
    unit_price: 86.35,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-1880', 'Size': 'Standard Fitment (18 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 75.09 },
      { min_qty: 50, price: 67.18 }
    ]
  },
  {
    sku_id: 'gen-1052',
    sku_code: 'AUTO-GEN-1052',
    barcode: '8857513190',
    part_name: 'Advanced Steel Toe Boots',
    part_name_lo: 'ເກີບຫົວເຫຼັກ ພຣີມຽມ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES advanced steel toe boots. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເກີບຫົວເຫຼັກ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/air_compressor_1787993354213.jpg',
    qty_on_hand: 184,
    unit_price: 32.9,
    specs: {'Brand': 'Bosch', 'Model': 'IND-4444', 'Size': 'Standard Fitment (17 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 28.61 },
      { min_qty: 50, price: 25.6 }
    ]
  },
  {
    sku_id: 'gen-1053',
    sku_code: 'AUTO-GEN-1053',
    barcode: '8859619975',
    part_name: 'Advanced Trash Bin',
    part_name_lo: 'ແຜ່ນຊັບນ້ຳມັນ ມາດຕະຖານ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES advanced trash bin. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ແຜ່ນຊັບນ້ຳມັນ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/safety_goggles_1787986528762.jpg',
    qty_on_hand: 116,
    unit_price: 44.56,
    specs: {'Brand': 'SKF', 'Model': 'IND-3702', 'Size': 'Standard Fitment (3 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 38.75 },
      { min_qty: 50, price: 34.67 }
    ]
  },
  {
    sku_id: 'gen-1054',
    sku_code: 'AUTO-GEN-1054',
    barcode: '8857897211',
    part_name: 'High Capacity Butterfly Valve',
    part_name_lo: 'ປ້ຳໄດອະແຟມ ອຸດສາຫະກຳ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES high capacity butterfly valve. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ປ້ຳໄດອະແຟມ ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/mining_slurry_pump_1787986331620.jpg',
    qty_on_hand: 414,
    unit_price: 84.04,
    specs: {'Brand': 'Bosch', 'Model': 'IND-1707', 'Size': 'Standard Fitment (2 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 73.08 },
      { min_qty: 50, price: 65.39 }
    ]
  },
  {
    sku_id: 'gen-1055',
    sku_code: 'AUTO-GEN-1055',
    barcode: '8858850239',
    part_name: 'Standard Dozer Blade',
    part_name_lo: 'ແຂ້ວລົດຂຸດ ຂັ້ນສູງ',
    category: 'Heavy Equipment & Machinery',
    description: 'Reversible boron steel cutting edge for CAT D8T semi-U blades. Heat-treated to HB500 for double the service life in abrasive material.',
    description_lo: 'ໃບມີດລົດດຸດ CAT D8T (Semi-U). ຜະລິດຈາກເຫຼັກໂບຣອນຊຸບແຂງ HB500 ສາມາດສະຫຼັບດ້ານໃຊ້ງານໄດ້ ຊ່ວຍຍືດອາຍຸການໃຊ້ງານເຖິງ 2 ເທົ່າ.',
    image_url: '/images/catalog/real/welding_machine_1787945607244.jpg',
    qty_on_hand: 481,
    unit_price: 38.04,
    specs: {'Brand': 'Caterpillar', 'Model': 'D8T SU-Blade Edge', 'Size': 'Thickness: 25mm', 'Application': 'CAT D8T Bulldozer'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 33.08 },
      { min_qty: 50, price: 29.6 }
    ]
  },
  {
    sku_id: 'gen-1056',
    sku_code: 'AUTO-GEN-1056',
    barcode: '8853204863',
    part_name: 'Premium Deep Cycle Battery',
    part_name_lo: 'ເຄື່ອງຄວບຄຸມການຊາດ ຄວາມຈຸສູງ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES premium deep cycle battery. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຄື່ອງຄວບຄຸມການຊາດ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/search_results_forklift_1787945902300.png',
    qty_on_hand: 463,
    unit_price: 78.94,
    specs: {'Brand': 'Parker', 'Model': 'IND-8693', 'Size': 'Standard Fitment (14 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 68.64 },
      { min_qty: 50, price: 61.41 }
    ]
  },
  {
    sku_id: 'gen-1057',
    sku_code: 'AUTO-GEN-1057',
    barcode: '8854083930',
    part_name: 'Standard Concrete Block',
    part_name_lo: 'ດິນບັອກ ມາດຕະຖານ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES standard concrete block. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ດິນບັອກ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/solar_inverter_1787945369533.jpg',
    qty_on_hand: 479,
    unit_price: 55.57,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-1538', 'Size': 'Standard Fitment (41 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 48.32 },
      { min_qty: 50, price: 43.23 }
    ]
  },
  {
    sku_id: 'gen-1058',
    sku_code: 'AUTO-GEN-1058',
    barcode: '8859223032',
    part_name: 'Compact Crusher Jaw',
    part_name_lo: 'ຫົວເຈາະຫີນ ຄວາມຈຸສູງ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES compact crusher jaw. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫົວເຈາະຫີນ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/ev_brake_fluid_1787947002763.jpg',
    qty_on_hand: 57,
    unit_price: 61.05,
    specs: {'Brand': 'Berco', 'Model': 'IND-2967', 'Size': 'Standard Fitment (14 kg)', 'Application': 'Volvo Wheel Loaders'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 53.09 },
      { min_qty: 50, price: 47.5 }
    ]
  },
  {
    sku_id: 'gen-1059',
    sku_code: 'AUTO-GEN-1059',
    barcode: '8858070903',
    part_name: 'Standard Motor Controller',
    part_name_lo: 'ກ່ອງຄວບຄຸມມໍເຕີ ຄວາມຈຸສູງ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES standard motor controller. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ກ່ອງຄວບຄຸມມໍເຕີ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/aion_ev_coolant_1787991371969.jpg',
    qty_on_hand: 281,
    unit_price: 21.6,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-5893', 'Size': 'Standard Fitment (20 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 18.78 },
      { min_qty: 50, price: 16.8 }
    ]
  },
  {
    sku_id: 'gen-1060',
    sku_code: 'AUTO-GEN-1060',
    barcode: '8858366010',
    part_name: 'High Capacity Check Valve',
    part_name_lo: 'ເກດວາວ ຂະໜາດນ້ອຍ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES high capacity check valve. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເກດວາວ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/honda_inverter_coolant_1787991385806.jpg',
    qty_on_hand: 189,
    unit_price: 85.28,
    specs: {'Brand': 'Bosch', 'Model': 'IND-5748', 'Size': 'Standard Fitment (39 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 74.16 },
      { min_qty: 50, price: 66.36 }
    ]
  },
  {
    sku_id: 'gen-1061',
    sku_code: 'AUTO-GEN-1061',
    barcode: '8858920202',
    part_name: 'Industrial Bandage Roll',
    part_name_lo: 'ຜ້າເຊັດຂ້າເຊື້ອ ອຸດສາຫະກຳ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES industrial bandage roll. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຜ້າເຊັດຂ້າເຊື້ອ ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/tesla_wiper_blades_1787992139928.jpg',
    qty_on_hand: 244,
    unit_price: 61.64,
    specs: {'Brand': 'Parker', 'Model': 'IND-1525', 'Size': 'Standard Fitment (18 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 53.6 },
      { min_qty: 50, price: 47.96 }
    ]
  },
  {
    sku_id: 'gen-1062',
    sku_code: 'AUTO-GEN-1062',
    barcode: '8855319649',
    part_name: 'Pro-Grade Washer Set',
    part_name_lo: 'ນັອດກຽວໄມ້ ພຣີມຽມ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES pro-grade washer set. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນັອດກຽວໄມ້ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/industrial_motor_1787993367799.jpg',
    qty_on_hand: 51,
    unit_price: 61.08,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-6333', 'Size': 'Standard Fitment (15 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 53.11 },
      { min_qty: 50, price: 47.52 }
    ]
  },
  {
    sku_id: 'gen-1063',
    sku_code: 'AUTO-GEN-1063',
    barcode: '8852409925',
    part_name: 'Standard Clutch Kit',
    part_name_lo: 'ປະເກັນເກຍ ລະດັບໂປຣ',
    category: 'Parts & Components',
    description: 'Eaton 430mm (17") commercial clutch kit. Rated for 2500 Nm maximum torque, designed specifically for Cummins ISX powered heavy-duty trucks.',
    description_lo: 'ຊຸດຄັດ Eaton ຂະໜາດ 430mm (17 ນິ້ວ) ແທ້. ຮອງຮັບແຮງບິດສູງສຸດເຖິງ 2500 Nm ອອກແບບສຳລັບລົດບັນທຸກຈັກ Cummins ISX ໂດຍສະເພາະ.',
    image_url: '/images/catalog/real/bronze_bushing_1787994598342.jpg',
    qty_on_hand: 36,
    unit_price: 77.37,
    specs: {'Brand': 'Eaton', 'Model': 'Easy Pedal Advantage', 'Size': '430mm (17 inch), 2 inch 10 Spline', 'Application': 'Cummins ISX, Peterbilt, Kenworth'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 67.28 },
      { min_qty: 50, price: 60.2 }
    ]
  },
  {
    sku_id: 'gen-1064',
    sku_code: 'AUTO-GEN-1064',
    barcode: '8852916045',
    part_name: 'Industrial Tapered Roller Bearing',
    part_name_lo: 'ບູຊໄນລ່ອນ ມາດຕະຖານ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES industrial tapered roller bearing. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ບູຊໄນລ່ອນ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/mining_jaw_plate_1787986343879.jpg',
    qty_on_hand: 374,
    unit_price: 93.25,
    specs: {'Brand': 'SKF', 'Model': 'IND-2639', 'Size': 'Standard Fitment (49 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 81.09 },
      { min_qty: 50, price: 72.56 }
    ]
  },
  {
    sku_id: 'gen-1065',
    sku_code: 'AUTO-GEN-1065',
    barcode: '8851899426',
    part_name: 'Advanced Absorbent Pad',
    part_name_lo: 'ແປງຍູ້ພື້ນ ອຸດສາຫະກຳ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES advanced absorbent pad. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ແປງຍູ້ພື້ນ ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/toyota_hv_cable_1787991422275.jpg',
    qty_on_hand: 260,
    unit_price: 33.61,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-3568', 'Size': 'Standard Fitment (6 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 29.23 },
      { min_qty: 50, price: 26.15 }
    ]
  },
  {
    sku_id: 'gen-1066',
    sku_code: 'AUTO-GEN-1066',
    barcode: '8855774493',
    part_name: 'Advanced Check Valve',
    part_name_lo: 'ເຊັກວາວ ມາດຕະຖານ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES advanced check valve. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຊັກວາວ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/product_2_specs_1788007011418.png',
    qty_on_hand: 401,
    unit_price: 16.89,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-2287', 'Size': 'Standard Fitment (17 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 14.69 },
      { min_qty: 50, price: 13.15 }
    ]
  },
  {
    sku_id: 'gen-1067',
    sku_code: 'AUTO-GEN-1067',
    barcode: '8851555802',
    part_name: 'Pro-Grade Battery Cell',
    part_name_lo: 'ຕູ້ຊາດ EV ພຣີມຽມ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES pro-grade battery cell. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຕູ້ຊາດ EV ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/high_tensile_bolt_1787993197960.jpg',
    qty_on_hand: 159,
    unit_price: 61.63,
    specs: {'Brand': 'Bosch', 'Model': 'IND-8806', 'Size': 'Standard Fitment (28 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 53.59 },
      { min_qty: 50, price: 47.95 }
    ]
  },
  {
    sku_id: 'gen-1068',
    sku_code: 'AUTO-GEN-1068',
    barcode: '8857877050',
    part_name: 'Compact Boom Lift (Rental)',
    part_name_lo: 'ລົດຕັກນ້ອຍ (ເຊົ່າ) ພຣີມຽມ',
    category: 'Equipment Rental',
    description: 'Genuine OEM/OES compact boom lift (rental). Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລົດຕັກນ້ອຍ (ເຊົ່າ) ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/after_related_click_1787944325885.png',
    qty_on_hand: 160,
    unit_price: 5.74,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-2569', 'Size': 'Standard Fitment (19 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 4.99 },
      { min_qty: 50, price: 4.46 }
    ]
  },
  {
    sku_id: 'gen-1069',
    sku_code: 'AUTO-GEN-1069',
    barcode: '8855783217',
    part_name: 'Compact Bandage Roll',
    part_name_lo: 'ກະເປົ໋າປະຖົມພະຍາບານ ອຸດສາຫະກຳ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES compact bandage roll. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ກະເປົ໋າປະຖົມພະຍາບານ ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/fire_extinguisher_1787992098343.jpg',
    qty_on_hand: 394,
    unit_price: 40.8,
    specs: {'Brand': 'Cummins', 'Model': 'IND-7776', 'Size': 'Standard Fitment (20 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 35.48 },
      { min_qty: 50, price: 31.75 }
    ]
  },
  {
    sku_id: 'gen-1070',
    sku_code: 'AUTO-GEN-1070',
    barcode: '8852223117',
    part_name: 'Standard EV AC Compressor',
    part_name_lo: 'ເຄື່ອງຊາດ OBC ລະດັບໂປຣ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES standard ev ac compressor. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຄື່ອງຊາດ OBC ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/system_maintenance_1787942571293.png',
    qty_on_hand: 170,
    unit_price: 62.69,
    specs: {'Brand': 'Cummins', 'Model': 'IND-4311', 'Size': 'Standard Fitment (41 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 54.51 },
      { min_qty: 50, price: 48.78 }
    ]
  },
  {
    sku_id: 'gen-1071',
    sku_code: 'AUTO-GEN-1071',
    barcode: '8851187384',
    part_name: 'Industrial Control Valve',
    part_name_lo: 'ປ້ຳໄຮໂດຼລິກ ຂັ້ນສູງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Danfoss PVG 32 proportional directional control valve. 3-spool configuration with load-sensing capabilities, rated for 80 L/min.',
    description_lo: 'ວາວຄວບຄຸມທິດທາງໄຮໂດຼລິກ Danfoss PVG 32 (3 ແກນ). ມີລະບົບ Load-sensing ຊ່ວຍປະຢັດພະລັງງານ ຮອງຮັບການໄຫຼ 80 L/min.',
    image_url: '/images/catalog/real/rebar_steel_1787994446883.jpg',
    qty_on_hand: 369,
    unit_price: 104.49,
    specs: {'Brand': 'Danfoss', 'Model': 'PVG 32', 'Size': '3-Spool, 80 L/min', 'Application': 'Forestry and Construction Machinery'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 90.86 },
      { min_qty: 50, price: 81.3 }
    ]
  },
  {
    sku_id: 'gen-1072',
    sku_code: 'AUTO-GEN-1072',
    barcode: '8853904399',
    part_name: 'Standard Welding Helmet',
    part_name_lo: 'ຫົວຈອດ TIG ພຣີມຽມ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES standard welding helmet. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫົວຈອດ TIG ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/ev_battery_coolant_1787947012559.jpg',
    qty_on_hand: 59,
    unit_price: 95.45,
    specs: {'Brand': 'Cummins', 'Model': 'IND-6831', 'Size': 'Standard Fitment (44 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 83.0 },
      { min_qty: 50, price: 74.26 }
    ]
  },
  {
    sku_id: 'gen-1073',
    sku_code: 'AUTO-GEN-1073',
    barcode: '8857686865',
    part_name: 'Industrial Mini Excavator (Rental)',
    part_name_lo: 'ລົດຂຸດນ້ອຍ (ເຊົ່າ) ມາດຕະຖານ',
    category: 'Equipment Rental',
    description: 'Genuine OEM/OES industrial mini excavator (rental). Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລົດຂຸດນ້ອຍ (ເຊົ່າ) ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/forklift_rear_1787945500664.jpg',
    qty_on_hand: 51,
    unit_price: 67.65,
    specs: {'Brand': 'SKF', 'Model': 'IND-9890', 'Size': 'Standard Fitment (28 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 58.83 },
      { min_qty: 50, price: 52.63 }
    ]
  },
  {
    sku_id: 'gen-1074',
    sku_code: 'AUTO-GEN-1074',
    barcode: '8855522935',
    part_name: 'Advanced Hydraulic Pump',
    part_name_lo: 'ສາຍໄຮໂດຼລິກ ອຸດສາຫະກຳ',
    category: 'Hydraulics & Pneumatics',
    description: 'Kawasaki K3V112DT axial piston pump. The industry standard dual main pump for 20-ton class excavators, delivering reliable power up to 343 Bar.',
    description_lo: 'ປ້ຳໄຮໂດຼລິກຫຼັກ Kawasaki K3V112DT (ປ້ຳນິ້ວ). ມາດຕະຖານໂຮງງານສຳລັບລົດຂຸດ 20 ໂຕນ (PC200, 320D) ສ້າງແຮງດັນ 343 Bar.',
    image_url: '/images/catalog/real/metal_roofing_1787994488453.jpg',
    qty_on_hand: 495,
    unit_price: 42.73,
    specs: {'Brand': 'Kawasaki', 'Model': 'K3V112DT', 'Size': '112 cc/rev, 343 Bar', 'Application': 'Komatsu PC200-8, CAT 320D'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 37.16 },
      { min_qty: 50, price: 33.25 }
    ]
  }
,
  {
    sku_id: 'gen-2000',
    sku_code: 'AUTO-GEN-2000',
    barcode: '8855766895',
    part_name: 'Commercial Air Hose',
    part_name_lo: 'ຫົວເຕີມລົມ ຄວາມຈຸສູງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES commercial air hose. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫົວເຕີມລົມ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/arcfox_charging_cable_1787991346297.jpg',
    qty_on_hand: 338,
    unit_price: 117.5,
    specs: {'Brand': 'Cummins', 'Model': 'IND-9081', 'Size': 'Standard Fitment (49 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 102.17 },
      { min_qty: 50, price: 91.41 }
    ]
  },
  {
    sku_id: 'gen-2001',
    sku_code: 'AUTO-GEN-2001',
    barcode: '8859366534',
    part_name: 'Commercial Inverter Coolant Pump',
    part_name_lo: 'ຄອມແອ EV ພຣີມຽມ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES commercial inverter coolant pump. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຄອມແອ EV ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_products_1_1788007486784.png',
    qty_on_hand: 71,
    unit_price: 132.82,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-9535', 'Size': 'Standard Fitment (30 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 115.5 },
      { min_qty: 50, price: 103.34 }
    ]
  },
  {
    sku_id: 'gen-2002',
    sku_code: 'AUTO-GEN-2002',
    barcode: '8853260920',
    part_name: 'Elite Cement Bag',
    part_name_lo: 'ຊີມັງຖົງ ແບບໜັກ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES elite cement bag. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຊີມັງຖົງ ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/centrifugal_pump_1787989816474.jpg',
    qty_on_hand: 417,
    unit_price: 207.51,
    specs: {'Brand': 'Cummins', 'Model': 'IND-2187', 'Size': 'Standard Fitment (8 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 180.44 },
      { min_qty: 50, price: 161.45 }
    ]
  },
  {
    sku_id: 'gen-2003',
    sku_code: 'AUTO-GEN-2003',
    barcode: '8858236289',
    part_name: 'Rugged Starter Motor',
    part_name_lo: 'ເພົາລູກບ້ຽວ ຂະໜາດນ້ອຍ',
    category: 'Parts & Components',
    description: 'Bosch 7.5kW 24V starter motor (11-tooth). Engineered for Mercedes-Benz Actros OM501LA engines, ensuring reliable cranking in extreme environments.',
    description_lo: 'ໄດສະຕາດແທ້ Bosch ກຳລັງສູງ 7.5kW 24V ພ້ອມເຟືອງ 11 ແຂ້ວ. ສຳລັບລົດບັນທຸກ Mercedes-Benz Actros ຮັບປະກັນການສະຕາດຕິດງ່າຍໃນທຸກສະພາບອາກາດ.',
    image_url: '/images/catalog/real/store_products_3_1788007501517.png',
    qty_on_hand: 310,
    unit_price: 144.27,
    specs: {'Brand': 'Bosch', 'Model': '0986021230', 'Size': '7.5 kW, 11-Teeth', 'Application': 'Mercedes-Benz Actros (OM501LA)'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 125.45 },
      { min_qty: 50, price: 112.25 }
    ]
  },
  {
    sku_id: 'gen-2004',
    sku_code: 'AUTO-GEN-2004',
    barcode: '8851933261',
    part_name: 'Precision Fall Arrester',
    part_name_lo: 'ຫີນເຈຍ ຂັ້ນສູງ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES precision fall arrester. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫີນເຈຍ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/industrial_exhaust_fan_1787993439615.jpg',
    qty_on_hand: 315,
    unit_price: 186.81,
    specs: {'Brand': 'SKF', 'Model': 'IND-7973', 'Size': 'Standard Fitment (9 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 162.44 },
      { min_qty: 50, price: 145.34 }
    ]
  },
  {
    sku_id: 'gen-2005',
    sku_code: 'AUTO-GEN-2005',
    barcode: '8854329058',
    part_name: 'Commercial Camshaft',
    part_name_lo: 'ຢາງແທ່ນເຄື່ອງ ຄວາມແມ່ນຍຳສູງ',
    category: 'Parts & Components',
    description: 'Genuine Caterpillar C15 ACERT camshaft. Manufactured from chilled cast iron with induction-hardened lobes for precise valve timing under heavy loads.',
    description_lo: 'ເພົາລູກບ້ຽວແທ້ Caterpillar ສຳລັບເຄື່ອງຈັກ CAT C15 ACERT. ເຫຼັກຫຼໍ່ແຂງພິເສດ ຊ່ວຍຄວບຄຸມຈັງຫວະວາວໄດ້ຢ່າງແມ່ນຍຳ ຮັບວຽກໜັກໄດ້ດີ.',
    image_url: '/images/catalog/real/inverter_welding_machine_1787993381339.jpg',
    qty_on_hand: 457,
    unit_price: 139.32,
    specs: {'Brand': 'Caterpillar', 'Model': '332-7231', 'Size': 'HRC 50, Chilled Cast Iron', 'Application': 'CAT C15 ACERT Engine'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 121.15 },
      { min_qty: 50, price: 108.4 }
    ]
  },
  {
    sku_id: 'gen-2006',
    sku_code: 'AUTO-GEN-2006',
    barcode: '8855885153',
    part_name: 'Standard Directional Valve',
    part_name_lo: 'ມໍເຕີໄຮໂດຼລິກ ອຸດສາຫະກຳ',
    category: 'Hydraulics & Pneumatics',
    description: 'Vickers DG4V-3 solenoid-operated directional valve. Standard CETOP 3 mounting, 24V DC coils, rated for 60 L/min and 350 Bar.',
    description_lo: 'ໂຊລິນອຍວາວ Vickers ມາດຕະຖານ CETOP 3. ໃຊ້ໄຟ 24V DC ຮອງຮັບການໄຫຼ 60 L/min ແລະ ແຮງດັນ 350 Bar ສຳລັບເຄື່ອງຈັກໂຮງງານ.',
    image_url: '/images/catalog/real/ev_charging_adapter_1787991437929.jpg',
    qty_on_hand: 209,
    unit_price: 151.5,
    specs: {'Brand': 'Vickers (Eaton)', 'Model': 'DG4V-3', 'Size': 'CETOP 3, 24V DC', 'Application': 'Factory Automation Systems'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 131.74 },
      { min_qty: 50, price: 117.87 }
    ]
  },
  {
    sku_id: 'gen-2007',
    sku_code: 'AUTO-GEN-2007',
    barcode: '8858638571',
    part_name: 'Ultra Solenoid Valve',
    part_name_lo: 'ສາຍລົມ ຂັ້ນສູງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES ultra solenoid valve. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສາຍລົມ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/leapmotor_c11_filter_1787994899596.jpg',
    qty_on_hand: 272,
    unit_price: 25.27,
    specs: {'Brand': 'Cummins', 'Model': 'IND-7028', 'Size': 'Standard Fitment (16 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 21.97 },
      { min_qty: 50, price: 19.66 }
    ]
  },
  {
    sku_id: 'gen-2008',
    sku_code: 'AUTO-GEN-2008',
    barcode: '8854594774',
    part_name: 'Ultra Flange Unit',
    part_name_lo: 'ລູກປືນກັນຮຸນ ສຳລັບການຄ້າ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES ultra flange unit. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກປືນກັນຮຸນ ສຳລັບການຄ້າ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/hydraulic_oil_drum_1787993185153.jpg',
    qty_on_hand: 199,
    unit_price: 118.05,
    specs: {'Brand': 'Bosch', 'Model': 'IND-2843', 'Size': 'Standard Fitment (49 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 102.65 },
      { min_qty: 50, price: 91.85 }
    ]
  },
  {
    sku_id: 'gen-2009',
    sku_code: 'AUTO-GEN-2009',
    barcode: '8852116080',
    part_name: 'Compact Cooling Tower Fill',
    part_name_lo: 'ເທີໂມສະຕັດ ຂະໜາດນ້ອຍ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES compact cooling tower fill. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເທີໂມສະຕັດ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/spill_containment_kit_1787995270912.jpg',
    qty_on_hand: 481,
    unit_price: 85.7,
    specs: {'Brand': 'Parker', 'Model': 'IND-9919', 'Size': 'Standard Fitment (19 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 74.52 },
      { min_qty: 50, price: 66.68 }
    ]
  },
  {
    sku_id: 'gen-2010',
    sku_code: 'AUTO-GEN-2010',
    barcode: '8857681267',
    part_name: 'Advanced Transmission Gasket',
    part_name_lo: 'ສາຍພານທາມມິ່ງ ສຳລັບການຄ້າ',
    category: 'Parts & Components',
    description: 'Genuine ZF complete transmission gasket set for Ecosplit 4 gearboxes. Uses high-temperature Viton specifically formulated to withstand synthetic gear oils.',
    description_lo: 'ຊຸດປະເກັນເກຍແທ້ ຈາກ ZF ສຳລັບເກຍລຸ້ນ Ecosplit 4. ວັດສະດຸ Viton ທົນຄວາມຮ້ອນສູງ ປ້ອງກັນການຮົ່ວຊຶມຂອງນ້ຳມັນເກຍສັງເຄາະ.',
    image_url: '/images/catalog/real/modal_scrolled_view_1787944300936.png',
    qty_on_hand: 414,
    unit_price: 20.56,
    specs: {'Brand': 'ZF', 'Model': 'Ecosplit 4 Gasket Set', 'Size': 'Viton High-Temp', 'Application': 'ZF 16-Speed Manual Transmissions'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 17.88 },
      { min_qty: 50, price: 16.0 }
    ]
  },
  {
    sku_id: 'gen-2011',
    sku_code: 'AUTO-GEN-2011',
    barcode: '8859731556',
    part_name: 'Pro-Grade Absorbent Pad',
    part_name_lo: 'ເຄື່ອງຂັດພື້ນ ມາດຕະຖານ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES pro-grade absorbent pad. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຄື່ອງຂັດພື້ນ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/stretcher_board_1787994434376.jpg',
    qty_on_hand: 469,
    unit_price: 14.06,
    specs: {'Brand': 'Bosch', 'Model': 'IND-7028', 'Size': 'Standard Fitment (34 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 12.23 },
      { min_qty: 50, price: 10.95 }
    ]
  },
  {
    sku_id: 'gen-2012',
    sku_code: 'AUTO-GEN-2012',
    barcode: '8851823430',
    part_name: 'Rugged Clutch Kit',
    part_name_lo: 'ໄດສະຕາດ ຄວາມແມ່ນຍຳສູງ',
    category: 'Parts & Components',
    description: 'Eaton 430mm (17") commercial clutch kit. Rated for 2500 Nm maximum torque, designed specifically for Cummins ISX powered heavy-duty trucks.',
    description_lo: 'ຊຸດຄັດ Eaton ຂະໜາດ 430mm (17 ນິ້ວ) ແທ້. ຮອງຮັບແຮງບິດສູງສຸດເຖິງ 2500 Nm ອອກແບບສຳລັບລົດບັນທຸກຈັກ Cummins ISX ໂດຍສະເພາະ.',
    image_url: '/images/catalog/real/jaecoo_j7_coolant_1787994876651.jpg',
    qty_on_hand: 18,
    unit_price: 44.42,
    specs: {'Brand': 'Eaton', 'Model': 'Easy Pedal Advantage', 'Size': '430mm (17 inch), 2 inch 10 Spline', 'Application': 'Cummins ISX, Peterbilt, Kenworth'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 38.63 },
      { min_qty: 50, price: 34.56 }
    ]
  },
  {
    sku_id: 'gen-2013',
    sku_code: 'AUTO-GEN-2013',
    barcode: '8856031967',
    part_name: 'Commercial Timing Belt',
    part_name_lo: 'ສາຍພານທາມມິ່ງ ອຸດສາຫະກຳ',
    category: 'Parts & Components',
    description: 'Gates FleetRunner heavy-duty timing belt for Toyota 1KD/2KD engines. Reinforced with HNBR and glass cord for a reliable 150,000km service interval.',
    description_lo: 'ສາຍພານທາມມິ່ງແທ້ Gates FleetRunner ສຳລັບລົດກະບະ Toyota 1KD/2KD (Vigo/Revo). ເສີມໃຍແກ້ວທົນທານສູງ ອາຍຸການໃຊ້ງານ 150,000 ກິໂລແມັດ.',
    image_url: '/images/catalog/real/hydraulic_oil_1787994622684.jpg',
    qty_on_hand: 273,
    unit_price: 3.69,
    specs: {'Brand': 'Gates', 'Model': 'T321HD', 'Size': '153 Teeth, 32mm Width', 'Application': 'Toyota Hilux Vigo / Revo (1KD/2KD)'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 3.21 },
      { min_qty: 50, price: 2.87 }
    ]
  },
  {
    sku_id: 'gen-2014',
    sku_code: 'AUTO-GEN-2014',
    barcode: '8856903527',
    part_name: 'Compact Air Blow Gun',
    part_name_lo: 'ໂຊລິນອຍວາວ ສຸດຍອດ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES compact air blow gun. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໂຊລິນອຍວາວ ສຸດຍອດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/plywood_sheet_1787994500566.jpg',
    qty_on_hand: 271,
    unit_price: 154.48,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-4121', 'Size': 'Standard Fitment (49 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 134.33 },
      { min_qty: 50, price: 120.19 }
    ]
  },
  {
    sku_id: 'gen-2015',
    sku_code: 'AUTO-GEN-2015',
    barcode: '8857298498',
    part_name: 'Ultra OBC Charger',
    part_name_lo: 'ຫົວຊາດ EV ຂະໜາດນ້ອຍ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES ultra obc charger. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫົວຊາດ EV ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/cut_resistant_gloves_1787992071532.jpg',
    qty_on_hand: 466,
    unit_price: 30.6,
    specs: {'Brand': 'SKF', 'Model': 'IND-6847', 'Size': 'Standard Fitment (4 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 26.61 },
      { min_qty: 50, price: 23.81 }
    ]
  },
  {
    sku_id: 'gen-2016',
    sku_code: 'AUTO-GEN-2016',
    barcode: '8857624444',
    part_name: 'Industrial Gate Valve',
    part_name_lo: 'ເກດວາວ ພຣີມຽມ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES industrial gate valve. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເກດວາວ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_top_layout_1788007514358.png',
    qty_on_hand: 389,
    unit_price: 4.65,
    specs: {'Brand': 'SKF', 'Model': 'IND-3274', 'Size': 'Standard Fitment (33 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 4.04 },
      { min_qty: 50, price: 3.61 }
    ]
  },
  {
    sku_id: 'gen-2017',
    sku_code: 'AUTO-GEN-2017',
    barcode: '8855667393',
    part_name: 'Pro-Grade Bucket Pin',
    part_name_lo: 'ແຂ້ວລົດຂຸດ ສຳລັບການຄ້າ',
    category: 'Heavy Equipment & Machinery',
    description: 'KTS 80mm bucket pin machined from 42CrMo alloy steel. High-frequency quenched to resist extreme bending and shearing forces in rock digging.',
    description_lo: 'ສະຫຼັກບຸ້ງກີ໋ KTS ຂະໜາດ 80mm ຍາວ 450mm ຜະລິດຈາກເຫຼັກ 42CrMo. ຊຸບແຂງຜິວນອກແຕ່ແກນກາງໜຽວ ເພື່ອທົນທານຕໍ່ແຮງຕັດຂາດ.',
    image_url: '/images/catalog/real/diesel_generator_1787945358504.jpg',
    qty_on_hand: 173,
    unit_price: 200.72,
    specs: {'Brand': 'KTS', 'Model': 'BP-80X450', 'Size': 'Dia: 80mm, L: 450mm', 'Application': 'Standard 20-Ton Class Buckets'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 174.54 },
      { min_qty: 50, price: 156.17 }
    ]
  },
  {
    sku_id: 'gen-2018',
    sku_code: 'AUTO-GEN-2018',
    barcode: '8851259807',
    part_name: 'Standard Brake Fluid',
    part_name_lo: 'ໄສ້ຕອງນ້ຳມັນເຊື້ອໄຟ ແບບໜັກ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES standard brake fluid. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໄສ້ຕອງນ້ຳມັນເຊື້ອໄຟ ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_products_2_1788007493419.png',
    qty_on_hand: 446,
    unit_price: 160.49,
    specs: {'Brand': 'Bosch', 'Model': 'IND-8948', 'Size': 'Standard Fitment (16 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 139.56 },
      { min_qty: 50, price: 124.87 }
    ]
  },
  {
    sku_id: 'gen-2019',
    sku_code: 'AUTO-GEN-2019',
    barcode: '8853967498',
    part_name: 'Standard Steel Angle',
    part_name_lo: 'ນັ່ງຮ້ານ ສຸດຍອດ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES standard steel angle. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນັ່ງຮ້ານ ສຸດຍອດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/solar_street_light_1787989940044.jpg',
    qty_on_hand: 411,
    unit_price: 166.19,
    specs: {'Brand': 'SKF', 'Model': 'IND-6889', 'Size': 'Standard Fitment (7 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 144.51 },
      { min_qty: 50, price: 129.3 }
    ]
  },
  {
    sku_id: 'gen-2020',
    sku_code: 'AUTO-GEN-2020',
    barcode: '8852040713',
    part_name: 'Premium Scissor Lift (Rental)',
    part_name_lo: 'ລົດຍົກ Scissor Lift (ເຊົ່າ) ແບບໜັກ',
    category: 'Equipment Rental',
    description: 'Genuine OEM/OES premium scissor lift (rental). Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລົດຍົກ Scissor Lift (ເຊົ່າ) ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/cat_320_excavator_1787945334578.jpg',
    qty_on_hand: 81,
    unit_price: 46.23,
    specs: {'Brand': 'Cummins', 'Model': 'IND-6799', 'Size': 'Standard Fitment (2 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 40.2 },
      { min_qty: 50, price: 35.97 }
    ]
  },
  {
    sku_id: 'gen-2021',
    sku_code: 'AUTO-GEN-2021',
    barcode: '8851502116',
    part_name: 'High Capacity Thermal Pad',
    part_name_lo: 'ກ່ອງແບັດເຕີຣີ EV ອຸດສາຫະກຳ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES high capacity thermal pad. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ກ່ອງແບັດເຕີຣີ EV ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/aion_y_tire_1787994913656.jpg',
    qty_on_hand: 313,
    unit_price: 149.84,
    specs: {'Brand': 'Bosch', 'Model': 'IND-1959', 'Size': 'Standard Fitment (16 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 130.3 },
      { min_qty: 50, price: 116.59 }
    ]
  },
  {
    sku_id: 'gen-2022',
    sku_code: 'AUTO-GEN-2022',
    barcode: '8851108561',
    part_name: 'Pro-Grade Transmission Fluid',
    part_name_lo: 'ນ້ຳຍາຫຼໍ່ເຢັນ ມາດຕະຖານ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES pro-grade transmission fluid. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳຍາຫຼໍ່ເຢັນ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/rough_terrain_crane_1787987842267.jpg',
    qty_on_hand: 360,
    unit_price: 113.91,
    specs: {'Brand': 'Cummins', 'Model': 'IND-7745', 'Size': 'Standard Fitment (12 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 99.05 },
      { min_qty: 50, price: 88.63 }
    ]
  },
  {
    sku_id: 'gen-2023',
    sku_code: 'AUTO-GEN-2023',
    barcode: '8856304861',
    part_name: 'Heavy-Spec Light Tower (Rental)',
    part_name_lo: 'ລົດຍົກ Forklift (ເຊົ່າ) ພຣີມຽມ',
    category: 'Equipment Rental',
    description: 'Genuine OEM/OES heavy-spec light tower (rental). Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລົດຍົກ Forklift (ເຊົ່າ) ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/safety_vest_1787989856050.jpg',
    qty_on_hand: 217,
    unit_price: 161.48,
    specs: {'Brand': 'Parker', 'Model': 'IND-3963', 'Size': 'Standard Fitment (36 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 140.42 },
      { min_qty: 50, price: 125.64 }
    ]
  },
  {
    sku_id: 'gen-2024',
    sku_code: 'AUTO-GEN-2024',
    barcode: '8855790510',
    part_name: 'Premium Cabin Filter',
    part_name_lo: 'ນ້ຳມັນໄຮໂດຼລິກ ISO 46 ທົນທານ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES premium cabin filter. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳມັນໄຮໂດຼລິກ ISO 46 ທົນທານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/modal_cat_flt_8800_1788006488735.png',
    qty_on_hand: 345,
    unit_price: 202.72,
    specs: {'Brand': 'SKF', 'Model': 'IND-6008', 'Size': 'Standard Fitment (17 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 176.28 },
      { min_qty: 50, price: 157.73 }
    ]
  },
  {
    sku_id: 'gen-2025',
    sku_code: 'AUTO-GEN-2025',
    barcode: '8854777531',
    part_name: 'Heavy Duty Motorized Pulley',
    part_name_lo: 'ຢາງປາດສາຍພານ ພິເສດ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES heavy duty motorized pulley. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຢາງປາດສາຍພານ ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/ear_muffs_1787986544646.jpg',
    qty_on_hand: 453,
    unit_price: 102.2,
    specs: {'Brand': 'Bosch', 'Model': 'IND-4240', 'Size': 'Standard Fitment (34 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 88.87 },
      { min_qty: 50, price: 79.52 }
    ]
  },
  {
    sku_id: 'gen-2026',
    sku_code: 'AUTO-GEN-2026',
    barcode: '8858641773',
    part_name: 'Performance Sprocket',
    part_name_lo: 'ໂຣເລີ້ ລະດັບໂປຣ',
    category: 'Heavy Equipment & Machinery',
    description: 'ITR heavy-duty drive sprocket with 21 teeth for Hitachi ZX200. Deep induction hardened (HRC 50) to prevent premature wear in abrasive soil.',
    description_lo: 'ສະປ໋ອກເກັດຂັບເຄື່ອນ ITR 21 ແຂ້ວ ສຳລັບ Hitachi ZX200. ຜ່ານການຊຸບແຂງດ້ວຍຄວາມຖີ່ສູງທົ່ວທຸກແຂ້ວ ເພື່ອປ້ອງກັນການສຶກຫຣໍກ່ອນກຳນົດ.',
    image_url: '/images/catalog/real/linear_bearing_1787994608195.jpg',
    qty_on_hand: 21,
    unit_price: 54.94,
    specs: {'Brand': 'ITR', 'Model': 'SP-200', 'Size': '21 Teeth', 'Application': 'Hitachi ZX200-1/3/5'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 47.77 },
      { min_qty: 50, price: 42.74 }
    ]
  },
  {
    sku_id: 'gen-2027',
    sku_code: 'AUTO-GEN-2027',
    barcode: '8857244757',
    part_name: 'Compact Trash Bin',
    part_name_lo: 'ຊຸດເກັບກູ້ສານເຄມີ ສຸດຍອດ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES compact trash bin. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຊຸດເກັບກູ້ສານເຄມີ ສຸດຍອດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/electric_forklift_modal_1787946311753.png',
    qty_on_hand: 107,
    unit_price: 144.62,
    specs: {'Brand': 'SKF', 'Model': 'IND-7473', 'Size': 'Standard Fitment (1 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 125.76 },
      { min_qty: 50, price: 112.52 }
    ]
  },
  {
    sku_id: 'gen-2028',
    sku_code: 'AUTO-GEN-2028',
    barcode: '8859118649',
    part_name: 'Ultra EV Battery Disconnect',
    part_name_lo: 'ສະວິດໄລ່ໄຟແບັດເຕີຣີ ສຸດຍອດ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES ultra ev battery disconnect. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສະວິດໄລ່ໄຟແບັດເຕີຣີ ສຸດຍອດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/wheel_loader_1787987830274.jpg',
    qty_on_hand: 429,
    unit_price: 36.14,
    specs: {'Brand': 'Parker', 'Model': 'IND-2086', 'Size': 'Standard Fitment (7 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 31.43 },
      { min_qty: 50, price: 28.12 }
    ]
  },
  {
    sku_id: 'gen-2029',
    sku_code: 'AUTO-GEN-2029',
    barcode: '8859212043',
    part_name: 'Compact Dozer Blade',
    part_name_lo: 'ແວ່ນຕາກະຈົກລົດ ປະສິດທິພາບສູງ',
    category: 'Heavy Equipment & Machinery',
    description: 'Reversible boron steel cutting edge for CAT D8T semi-U blades. Heat-treated to HB500 for double the service life in abrasive material.',
    description_lo: 'ໃບມີດລົດດຸດ CAT D8T (Semi-U). ຜະລິດຈາກເຫຼັກໂບຣອນຊຸບແຂງ HB500 ສາມາດສະຫຼັບດ້ານໃຊ້ງານໄດ້ ຊ່ວຍຍືດອາຍຸການໃຊ້ງານເຖິງ 2 ເທົ່າ.',
    image_url: '/images/catalog/real/initial_product_grid_1787945828255.png',
    qty_on_hand: 386,
    unit_price: 124.94,
    specs: {'Brand': 'Caterpillar', 'Model': 'D8T SU-Blade Edge', 'Size': 'Thickness: 25mm', 'Application': 'CAT D8T Bulldozer'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 108.64 },
      { min_qty: 50, price: 97.2 }
    ]
  },
  {
    sku_id: 'gen-2030',
    sku_code: 'AUTO-GEN-2030',
    barcode: '8853933899',
    part_name: 'Heavy Duty Evaporator Coil',
    part_name_lo: 'ເອັກສະແປນຊັນວາວ ສຸດຍອດ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES heavy duty evaporator coil. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເອັກສະແປນຊັນວາວ ສຸດຍອດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/rubber_conveyor_belt_1787993338719.jpg',
    qty_on_hand: 341,
    unit_price: 21.47,
    specs: {'Brand': 'Cummins', 'Model': 'IND-8880', 'Size': 'Standard Fitment (16 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 18.67 },
      { min_qty: 50, price: 16.71 }
    ]
  },
  {
    sku_id: 'gen-2031',
    sku_code: 'AUTO-GEN-2031',
    barcode: '8854070003',
    part_name: 'Heavy-Spec Metering Pump',
    part_name_lo: 'ເຊັກວາວ ພຣີມຽມ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES heavy-spec metering pump. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຊັກວາວ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/search_results_typing_1787945877099.png',
    qty_on_hand: 388,
    unit_price: 12.3,
    specs: {'Brand': 'Bosch', 'Model': 'IND-8815', 'Size': 'Standard Fitment (1 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 10.7 },
      { min_qty: 50, price: 9.57 }
    ]
  },
  {
    sku_id: 'gen-2032',
    sku_code: 'AUTO-GEN-2032',
    barcode: '8859693175',
    part_name: 'Ultra Telehandler (Rental)',
    part_name_lo: 'ລົດຍົກ Scissor Lift (ເຊົ່າ) ອຸດສາຫະກຳ',
    category: 'Equipment Rental',
    description: 'Genuine OEM/OES ultra telehandler (rental). Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລົດຍົກ Scissor Lift (ເຊົ່າ) ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/wire_rope_1787989880792.jpg',
    qty_on_hand: 188,
    unit_price: 97.29,
    specs: {'Brand': 'Parker', 'Model': 'IND-2667', 'Size': 'Standard Fitment (2 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 84.6 },
      { min_qty: 50, price: 75.7 }
    ]
  },
  {
    sku_id: 'gen-2033',
    sku_code: 'AUTO-GEN-2033',
    barcode: '8855537242',
    part_name: 'Industrial Steel Angle',
    part_name_lo: 'ສັງກະສີມຸງຫຼັງຄາ ຄວາມຈຸສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES industrial steel angle. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສັງກະສີມຸງຫຼັງຄາ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/ev_tire_1787946554424.jpg',
    qty_on_hand: 382,
    unit_price: 3.9,
    specs: {'Brand': 'Bosch', 'Model': 'IND-2199', 'Size': 'Standard Fitment (35 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 3.39 },
      { min_qty: 50, price: 3.03 }
    ]
  },
  {
    sku_id: 'gen-2034',
    sku_code: 'AUTO-GEN-2034',
    barcode: '8859653023',
    part_name: 'Heavy Duty Carriage Bolt',
    part_name_lo: 'ພຸກເຫຼັກ ຂັ້ນສູງ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES heavy duty carriage bolt. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ພຸກເຫຼັກ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/icar_03_cable_1787994865682.jpg',
    qty_on_hand: 187,
    unit_price: 71.35,
    specs: {'Brand': 'Bosch', 'Model': 'IND-8420', 'Size': 'Standard Fitment (50 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 62.04 },
      { min_qty: 50, price: 55.51 }
    ]
  },
  {
    sku_id: 'gen-2035',
    sku_code: 'AUTO-GEN-2035',
    barcode: '8853731972',
    part_name: 'High Capacity EV Battery Enclosure',
    part_name_lo: 'ກ່ອງລວມໄຟແຮງສູງ ປະສິດທິພາບສູງ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES high capacity ev battery enclosure. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ກ່ອງລວມໄຟແຮງສູງ ປະສິດທິພາບສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/fuel_filter_1787994647541.jpg',
    qty_on_hand: 249,
    unit_price: 83.75,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-4861', 'Size': 'Standard Fitment (16 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 72.83 },
      { min_qty: 50, price: 65.17 }
    ]
  },
  {
    sku_id: 'gen-2036',
    sku_code: 'AUTO-GEN-2036',
    barcode: '8854513791',
    part_name: 'Standard Screen Mesh',
    part_name_lo: 'ລູກກິ້ງສາຍພານ ມາດຕະຖານ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES standard screen mesh. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກກິ້ງສາຍພານ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/wuling_type2_cable_1787992189196.jpg',
    qty_on_hand: 85,
    unit_price: 142.98,
    specs: {'Brand': 'Komatsu', 'Model': 'IND-7823', 'Size': 'Standard Fitment (12 kg)', 'Application': 'Mining Dump Trucks'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 124.33 },
      { min_qty: 50, price: 111.25 }
    ]
  },
  {
    sku_id: 'gen-2037',
    sku_code: 'AUTO-GEN-2037',
    barcode: '8853327684',
    part_name: 'Standard Hydraulic Filter',
    part_name_lo: 'ວາວຄວບຄຸມ ຄວາມແມ່ນຍຳສູງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Donaldson return line hydraulic filter assembly. Uses a 10-micron absolute synthetic element to protect sensitive hydraulic components.',
    description_lo: 'ຊຸດກອງໄຮໂດຼລິກ Donaldson ຄວາມລະອຽດ 10 ໄມຄຣອນ. ໃຊ້ໄສ້ກອງໃຍສັງເຄາະ ເພື່ອປົກປ້ອງຊິ້ນສ່ວນໄຮໂດຼລິກທີ່ອ່ອນໄຫວພາຍໃນລະບົບ.',
    image_url: '/images/catalog/real/flange_bearing_1787994582910.jpg',
    qty_on_hand: 353,
    unit_price: 157.93,
    specs: {'Brand': 'Donaldson', 'Model': 'P164378', 'Size': '10 µm Absolute, 150 L/min', 'Application': 'General Hydraulic Reservoirs'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 137.33 },
      { min_qty: 50, price: 122.87 }
    ]
  },
  {
    sku_id: 'gen-2038',
    sku_code: 'AUTO-GEN-2038',
    barcode: '8858499106',
    part_name: 'Advanced Drill Rod',
    part_name_lo: 'ຫົວເຈາະທັງສະເຕນ ລະດັບໂປຣ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES advanced drill rod. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫົວເຈາະທັງສະເຕນ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/modal_brk_cer_990_specs_1788006668502.png',
    qty_on_hand: 34,
    unit_price: 96.8,
    specs: {'Brand': 'Komatsu', 'Model': 'IND-5844', 'Size': 'Standard Fitment (30 kg)', 'Application': 'Mining Dump Trucks'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 84.17 },
      { min_qty: 50, price: 75.31 }
    ]
  },
  {
    sku_id: 'gen-2039',
    sku_code: 'AUTO-GEN-2039',
    barcode: '8852730016',
    part_name: 'Pro-Grade Rebar 16mm',
    part_name_lo: 'ດິນບັອກ ລະດັບໂປຣ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES pro-grade rebar 16mm. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ດິນບັອກ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/mining_otr_tire_1787986357627.jpg',
    qty_on_hand: 493,
    unit_price: 136.99,
    specs: {'Brand': 'Cummins', 'Model': 'IND-5976', 'Size': 'Standard Fitment (4 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 119.12 },
      { min_qty: 50, price: 106.58 }
    ]
  },
  {
    sku_id: 'gen-2040',
    sku_code: 'AUTO-GEN-2040',
    barcode: '8856145041',
    part_name: 'Precision Rebar 16mm',
    part_name_lo: 'ເຫຼັກໂຕຊີ ລະດັບໂປຣ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES precision rebar 16mm. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຫຼັກໂຕຊີ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/first_aid_kit_1787987108475.jpg',
    qty_on_hand: 490,
    unit_price: 95.28,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-2811', 'Size': 'Standard Fitment (30 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 82.85 },
      { min_qty: 50, price: 74.13 }
    ]
  },
  {
    sku_id: 'gen-2041',
    sku_code: 'AUTO-GEN-2041',
    barcode: '8858971741',
    part_name: 'Rugged Air Blow Gun',
    part_name_lo: 'ຕົວເກັບສຽງລົມ ຄວາມແມ່ນຍຳສູງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES rugged air blow gun. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຕົວເກັບສຽງລົມ ຄວາມແມ່ນຍຳສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/safety_harness_1787987815266.jpg',
    qty_on_hand: 166,
    unit_price: 55.42,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-8479', 'Size': 'Standard Fitment (37 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 48.19 },
      { min_qty: 50, price: 43.12 }
    ]
  },
  {
    sku_id: 'gen-2042',
    sku_code: 'AUTO-GEN-2042',
    barcode: '8854791418',
    part_name: 'Commercial Grease Tube',
    part_name_lo: 'ຈາລະບີ ສຳລັບການຄ້າ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES commercial grease tube. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຈາລະບີ ສຳລັບການຄ້າ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/ev_aux_battery_1787946538086.jpg',
    qty_on_hand: 50,
    unit_price: 131.35,
    specs: {'Brand': 'Bosch', 'Model': 'IND-7196', 'Size': 'Standard Fitment (43 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 114.22 },
      { min_qty: 50, price: 102.2 }
    ]
  },
  {
    sku_id: 'gen-2043',
    sku_code: 'AUTO-GEN-2043',
    barcode: '8855924809',
    part_name: 'Performance Floor Scrubber',
    part_name_lo: 'ໄມ້ຖູພື້ນພ້ອມຖັງ ພຣີມຽມ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES performance floor scrubber. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໄມ້ຖູພື້ນພ້ອມຖັງ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/hydraulic_oil_1787987728754.jpg',
    qty_on_hand: 411,
    unit_price: 103.24,
    specs: {'Brand': 'Bosch', 'Model': 'IND-9804', 'Size': 'Standard Fitment (25 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 89.77 },
      { min_qty: 50, price: 80.32 }
    ]
  },
  {
    sku_id: 'gen-2044',
    sku_code: 'AUTO-GEN-2044',
    barcode: '8857286259',
    part_name: 'Commercial Transmission Gasket',
    part_name_lo: 'ເພົາລູກບ້ຽວ ຄວາມຈຸສູງ',
    category: 'Parts & Components',
    description: 'Genuine ZF complete transmission gasket set for Ecosplit 4 gearboxes. Uses high-temperature Viton specifically formulated to withstand synthetic gear oils.',
    description_lo: 'ຊຸດປະເກັນເກຍແທ້ ຈາກ ZF ສຳລັບເກຍລຸ້ນ Ecosplit 4. ວັດສະດຸ Viton ທົນຄວາມຮ້ອນສູງ ປ້ອງກັນການຮົ່ວຊຶມຂອງນ້ຳມັນເກຍສັງເຄາະ.',
    image_url: '/images/catalog/real/eye_wash_station_1787994359559.jpg',
    qty_on_hand: 197,
    unit_price: 20.11,
    specs: {'Brand': 'ZF', 'Model': 'Ecosplit 4 Gasket Set', 'Size': 'Viton High-Temp', 'Application': 'ZF 16-Speed Manual Transmissions'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 17.49 },
      { min_qty: 50, price: 15.65 }
    ]
  },
  {
    sku_id: 'gen-2045',
    sku_code: 'AUTO-GEN-2045',
    barcode: '8851624563',
    part_name: 'Precision Plasma Cutter Tip',
    part_name_lo: 'ຖົງມືຈອດ ແບບໜັກ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES precision plasma cutter tip. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຖົງມືຈອດ ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/forklift_modal_view_1787946266906.png',
    qty_on_hand: 158,
    unit_price: 168.84,
    specs: {'Brand': 'Parker', 'Model': 'IND-8859', 'Size': 'Standard Fitment (38 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 146.82 },
      { min_qty: 50, price: 131.37 }
    ]
  },
  {
    sku_id: 'gen-2046',
    sku_code: 'AUTO-GEN-2046',
    barcode: '8854273681',
    part_name: 'Ultra Diaphragm Pump',
    part_name_lo: 'ເກດວາວ ຂະໜາດນ້ອຍ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES ultra diaphragm pump. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເກດວາວ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_sidebar_view_1788007533329.png',
    qty_on_hand: 51,
    unit_price: 155.92,
    specs: {'Brand': 'Cummins', 'Model': 'IND-8833', 'Size': 'Standard Fitment (23 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 135.58 },
      { min_qty: 50, price: 121.31 }
    ]
  },
  {
    sku_id: 'gen-2047',
    sku_code: 'AUTO-GEN-2047',
    barcode: '8853333294',
    part_name: 'Advanced Starter Motor',
    part_name_lo: 'ເພົາຂໍ້ຫວ່ຽງ ສຸດຍອດ',
    category: 'Parts & Components',
    description: 'Bosch 7.5kW 24V starter motor (11-tooth). Engineered for Mercedes-Benz Actros OM501LA engines, ensuring reliable cranking in extreme environments.',
    description_lo: 'ໄດສະຕາດແທ້ Bosch ກຳລັງສູງ 7.5kW 24V ພ້ອມເຟືອງ 11 ແຂ້ວ. ສຳລັບລົດບັນທຸກ Mercedes-Benz Actros ຮັບປະກັນການສະຕາດຕິດງ່າຍໃນທຸກສະພາບອາກາດ.',
    image_url: '/images/catalog/real/engine_filter_1787945715120.jpg',
    qty_on_hand: 106,
    unit_price: 37.25,
    specs: {'Brand': 'Bosch', 'Model': '0986021230', 'Size': '7.5 kW, 11-Teeth', 'Application': 'Mercedes-Benz Actros (OM501LA)'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 32.39 },
      { min_qty: 50, price: 28.98 }
    ]
  },
  {
    sku_id: 'gen-2048',
    sku_code: 'AUTO-GEN-2048',
    barcode: '8857783479',
    part_name: 'Precision EV Battery Disconnect',
    part_name_lo: 'ບອດ BMS EV ພິເສດ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES precision ev battery disconnect. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ບອດ BMS EV ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/centrifugal_pump_1787993426542.jpg',
    qty_on_hand: 210,
    unit_price: 165.97,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-1666', 'Size': 'Standard Fitment (27 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 144.32 },
      { min_qty: 50, price: 129.13 }
    ]
  },
  {
    sku_id: 'gen-2049',
    sku_code: 'AUTO-GEN-2049',
    barcode: '8851905354',
    part_name: 'Elite Ball Bearing',
    part_name_lo: 'ລູກປືນກັນຮຸນ ຂັ້ນສູງ',
    category: 'Parts & Components',
    description: 'Genuine SKF 6210-2RS deep groove ball bearing with C3 clearance. Rubber sealed on both sides and pre-lubricated with high-temperature grease.',
    description_lo: 'ລູກປືນກົມ SKF 6210-2RS ແທ້ (ໄລຍະຫ່າງ C3). ມີຊີລຢາງປິດທັງສອງດ້ານ ແລະ ບັນຈຸຈາລະບີທົນຄວາມຮ້ອນ ເໝາະສຳລັບມໍເຕີໄຟຟ້າຮອບຈັດ.',
    image_url: '/images/catalog/real/ev_charging_cable_1787946513020.jpg',
    qty_on_hand: 382,
    unit_price: 139.21,
    specs: {'Brand': 'SKF', 'Model': '6210-2RS1/C3', 'Size': 'ID: 50, OD: 90, W: 20mm', 'Application': 'Industrial Electric Motors, Pumps'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 121.05 },
      { min_qty: 50, price: 108.3 }
    ]
  },
  {
    sku_id: 'gen-2050',
    sku_code: 'AUTO-GEN-2050',
    barcode: '8857856134',
    part_name: 'Ultra Butterfly Valve',
    part_name_lo: 'ບານວາວ ຄວາມຈຸສູງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES ultra butterfly valve. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ບານວາວ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/product_grid_top_1787945833899.png',
    qty_on_hand: 169,
    unit_price: 176.43,
    specs: {'Brand': 'SKF', 'Model': 'IND-7229', 'Size': 'Standard Fitment (25 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 153.42 },
      { min_qty: 50, price: 137.28 }
    ]
  },
  {
    sku_id: 'gen-2051',
    sku_code: 'AUTO-GEN-2051',
    barcode: '8853356834',
    part_name: 'Premium Linear Guide Block',
    part_name_lo: 'ລູກປືນກົມ ສຸດຍອດ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES premium linear guide block. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກປືນກົມ ສຸດຍອດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/ev_cabin_filter_1787946526501.jpg',
    qty_on_hand: 251,
    unit_price: 13.41,
    specs: {'Brand': 'Parker', 'Model': 'IND-8268', 'Size': 'Standard Fitment (39 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 11.66 },
      { min_qty: 50, price: 10.43 }
    ]
  },
  {
    sku_id: 'gen-2052',
    sku_code: 'AUTO-GEN-2052',
    barcode: '8858853145',
    part_name: 'Performance Pillow Block Bearing',
    part_name_lo: 'ລູກປືນຕຸກກະຕາ ພິເສດ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES performance pillow block bearing. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກປືນຕຸກກະຕາ ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/forklift_interior_1787945515932.jpg',
    qty_on_hand: 487,
    unit_price: 172.58,
    specs: {'Brand': 'Bosch', 'Model': 'IND-3209', 'Size': 'Standard Fitment (17 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 150.07 },
      { min_qty: 50, price: 134.27 }
    ]
  },
  {
    sku_id: 'gen-2053',
    sku_code: 'AUTO-GEN-2053',
    barcode: '8853976438',
    part_name: 'Ultra Medical Splint',
    part_name_lo: 'ແຜ່ນກັນ CPR ຂະໜາດນ້ອຍ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES ultra medical splint. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ແຜ່ນກັນ CPR ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/changan_brake_pads_1787992203831.jpg',
    qty_on_hand: 124,
    unit_price: 128.75,
    specs: {'Brand': 'SKF', 'Model': 'IND-8134', 'Size': 'Standard Fitment (32 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 111.96 },
      { min_qty: 50, price: 100.18 }
    ]
  },
  {
    sku_id: 'gen-2054',
    sku_code: 'AUTO-GEN-2054',
    barcode: '8854522231',
    part_name: 'Heavy-Spec Excavator Tooth',
    part_name_lo: 'ສະປ໋ອກເກັດ ປະສິດທິພາບສູງ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine CAT J350 heavy-duty penetration tooth. Forged from impact-resistant alloy steel to handle rocky terrain without snapping.',
    description_lo: 'ແຂ້ວບຸ້ງກີ໋ລົດຂຸດ CAT 320 ລຸ້ນ J350 ແທ້. ຫຼໍ່ຈາກເຫຼັກກ້າປະສົມຮອງຮັບແຮງກະແທກສູງ ສາມາດເຈາະຊັ້ນຫີນໄດ້ຢ່າງມີປະສິດທິພາບ.',
    image_url: '/images/catalog/real/roller_bearing_1787994554828.jpg',
    qty_on_hand: 47,
    unit_price: 45.11,
    specs: {'Brand': 'Caterpillar', 'Model': '1U3352 (J350)', 'Size': '245mm L, 5.2kg', 'Application': 'CAT 320D, 320E, 323F'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 39.23 },
      { min_qty: 50, price: 35.1 }
    ]
  },
  {
    sku_id: 'gen-2055',
    sku_code: 'AUTO-GEN-2055',
    barcode: '8851803503',
    part_name: 'High Capacity Drill Rod',
    part_name_lo: 'ກ້ານເຈາະ ລະດັບໂປຣ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES high capacity drill rod. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ກ້ານເຈາະ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/safety_helmet_1787989844162.jpg',
    qty_on_hand: 109,
    unit_price: 36.22,
    specs: {'Brand': 'ITR', 'Model': 'IND-5644', 'Size': 'Standard Fitment (29 kg)', 'Application': 'CAT 320D / Komatsu PC200'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 31.5 },
      { min_qty: 50, price: 28.19 }
    ]
  },
  {
    sku_id: 'gen-2056',
    sku_code: 'AUTO-GEN-2056',
    barcode: '8853470800',
    part_name: 'Advanced Hand Sanitizer Station',
    part_name_lo: 'ຊຸດເກັບກູ້ສານເຄມີ ຄວາມຈຸສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES advanced hand sanitizer station. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຊຸດເກັບກູ້ສານເຄມີ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/air_filter_1787994635974.jpg',
    qty_on_hand: 447,
    unit_price: 15.26,
    specs: {'Brand': 'Bosch', 'Model': 'IND-9774', 'Size': 'Standard Fitment (18 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 13.27 },
      { min_qty: 50, price: 11.88 }
    ]
  },
  {
    sku_id: 'gen-2057',
    sku_code: 'AUTO-GEN-2057',
    barcode: '8851065227',
    part_name: 'Pro-Grade Alternator',
    part_name_lo: 'ແຫວນລູກສູບ ມາດຕະຖານ',
    category: 'Parts & Components',
    description: 'OEM Denso 24V 150A heavy-duty alternator. Direct replacement for Hino 500/700 series trucks. Features internal dual cooling fans and solid-state voltage regulator.',
    description_lo: 'ໄດຊາດແທ້ (OEM) ຈາກໂຮງງານ Denso ລະບົບ 24V 150A ສຳລັບເຄື່ອງຈັກ Hino 500/700 ໂດຍກົງ. ພ້ອມພັດລົມລະບາຍຄວາມຮ້ອນຄູ່ໃນຕົວ.',
    image_url: '/images/catalog/real/honda_ens1_brakes_1787994851547.jpg',
    qty_on_hand: 251,
    unit_price: 112.25,
    specs: {'Brand': 'Denso', 'Model': '0201-1520 (24V 150A)', 'Size': '8-Groove Pulley, 8.5 kg', 'Application': 'Hino 500/700 Series (J08E Engine)'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 97.61 },
      { min_qty: 50, price: 87.33 }
    ]
  },
  {
    sku_id: 'gen-2058',
    sku_code: 'AUTO-GEN-2058',
    barcode: '8857564660',
    part_name: 'Advanced Cabin Glass',
    part_name_lo: 'ສະປ໋ອກເກັດ ຂະໜາດນ້ອຍ',
    category: 'Heavy Equipment & Machinery',
    description: 'Pilkington laminated front windshield for Volvo EC210B. DOT certified to prevent shattering, protecting operators from flying debris.',
    description_lo: 'ແວ່ນຕາກະຈົກໜ້າລົດຂຸດ Volvo EC210B ແບບນິລະໄພລາມິເນດ. ປ້ອງກັນການແຕກກະຈາຍ ຊ່ວຍປົກປ້ອງຄົນຂັບຈາກເສດຫີນ ພ້ອມໃຫ້ວິໄສທັດຊັດເຈນ.',
    image_url: '/images/catalog/real/hydraulic_seal_kit_1787987741309.jpg',
    qty_on_hand: 326,
    unit_price: 125.52,
    specs: {'Brand': 'Pilkington', 'Model': 'Safety Glass Laminated', 'Size': '6.76mm Thick', 'Application': 'Volvo EC210B Excavator'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 109.15 },
      { min_qty: 50, price: 97.66 }
    ]
  },
  {
    sku_id: 'gen-2059',
    sku_code: 'AUTO-GEN-2059',
    barcode: '8859246094',
    part_name: 'Precision Sterile Gauze',
    part_name_lo: 'ຜ້າກັອດປອດເຊື້ອ ແບບໜັກ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES precision sterile gauze. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຜ້າກັອດປອດເຊື້ອ ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/new_items_grid_1787988727833.png',
    qty_on_hand: 439,
    unit_price: 120.96,
    specs: {'Brand': 'Bosch', 'Model': 'IND-7346', 'Size': 'Standard Fitment (34 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 105.18 },
      { min_qty: 50, price: 94.11 }
    ]
  },
  {
    sku_id: 'gen-2060',
    sku_code: 'AUTO-GEN-2060',
    barcode: '8859879000',
    part_name: 'Ultra Starter Motor',
    part_name_lo: 'ເພົາຂັບ ແບບໜັກ',
    category: 'Parts & Components',
    description: 'Bosch 7.5kW 24V starter motor (11-tooth). Engineered for Mercedes-Benz Actros OM501LA engines, ensuring reliable cranking in extreme environments.',
    description_lo: 'ໄດສະຕາດແທ້ Bosch ກຳລັງສູງ 7.5kW 24V ພ້ອມເຟືອງ 11 ແຂ້ວ. ສຳລັບລົດບັນທຸກ Mercedes-Benz Actros ຮັບປະກັນການສະຕາດຕິດງ່າຍໃນທຸກສະພາບອາກາດ.',
    image_url: '/images/catalog/real/bearing_set_1787989755742.jpg',
    qty_on_hand: 56,
    unit_price: 174.0,
    specs: {'Brand': 'Bosch', 'Model': '0986021230', 'Size': '7.5 kW, 11-Teeth', 'Application': 'Mercedes-Benz Actros (OM501LA)'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 151.3 },
      { min_qty: 50, price: 135.38 }
    ]
  },
  {
    sku_id: 'gen-2061',
    sku_code: 'AUTO-GEN-2061',
    barcode: '8859744046',
    part_name: 'Premium Chiller Unit',
    part_name_lo: 'ນ້ຳຢາແອ ຄວາມແມ່ນຍຳສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES premium chiller unit. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳຢາແອ ຄວາມແມ່ນຍຳສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/industrial_contactor_1787995211966.jpg',
    qty_on_hand: 228,
    unit_price: 56.07,
    specs: {'Brand': 'Cummins', 'Model': 'IND-7121', 'Size': 'Standard Fitment (40 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 48.76 },
      { min_qty: 50, price: 43.63 }
    ]
  },
  {
    sku_id: 'gen-2062',
    sku_code: 'AUTO-GEN-2062',
    barcode: '8856790179',
    part_name: 'Heavy Duty Medical Splint',
    part_name_lo: 'ຜ້າກັອດປອດເຊື້ອ ຂັ້ນສູງ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES heavy duty medical splint. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຜ້າກັອດປອດເຊື້ອ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/safety_boots_1787992086683.jpg',
    qty_on_hand: 354,
    unit_price: 14.06,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-6894', 'Size': 'Standard Fitment (21 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 12.23 },
      { min_qty: 50, price: 10.94 }
    ]
  },
  {
    sku_id: 'gen-2063',
    sku_code: 'AUTO-GEN-2063',
    barcode: '8854954053',
    part_name: 'Pro-Grade EV Battery Enclosure',
    part_name_lo: 'ປ້ຳນ້ຳອິນເວີເຕີ ຄວາມຈຸສູງ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES pro-grade ev battery enclosure. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ປ້ຳນ້ຳອິນເວີເຕີ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/product_grid_more_1787945844402.png',
    qty_on_hand: 244,
    unit_price: 111.83,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-2388', 'Size': 'Standard Fitment (26 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 97.24 },
      { min_qty: 50, price: 87.01 }
    ]
  },
  {
    sku_id: 'gen-2064',
    sku_code: 'AUTO-GEN-2064',
    barcode: '8852192281',
    part_name: 'Performance Medical Splint',
    part_name_lo: 'ນ້ຳຍາລ້າງຕາ ສຳລັບການຄ້າ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES performance medical splint. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳຍາລ້າງຕາ ສຳລັບການຄ້າ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/v_belt_1787989743529.jpg',
    qty_on_hand: 425,
    unit_price: 180.58,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-3289', 'Size': 'Standard Fitment (11 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 157.03 },
      { min_qty: 50, price: 140.5 }
    ]
  },
  {
    sku_id: 'gen-2065',
    sku_code: 'AUTO-GEN-2065',
    barcode: '8852550407',
    part_name: 'Compact Solar Cable',
    part_name_lo: 'ຕູ້ລວມໄຟ ຂະໜາດນ້ອຍ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES compact solar cable. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຕູ້ລວມໄຟ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/bucket_cutting_edge_1787987787453.jpg',
    qty_on_hand: 29,
    unit_price: 60.11,
    specs: {'Brand': 'Parker', 'Model': 'IND-3545', 'Size': 'Standard Fitment (3 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 52.27 },
      { min_qty: 50, price: 46.77 }
    ]
  },
  {
    sku_id: 'gen-2066',
    sku_code: 'AUTO-GEN-2066',
    barcode: '8855998694',
    part_name: 'Rugged Cooling Tower Fill',
    part_name_lo: 'ຄອມເພຣສເຊີແອ ສຳລັບການຄ້າ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES rugged cooling tower fill. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຄອມເພຣສເຊີແອ ສຳລັບການຄ້າ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/honda_air_filter_1787991282848.jpg',
    qty_on_hand: 239,
    unit_price: 204.06,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-1659', 'Size': 'Standard Fitment (38 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 177.44 },
      { min_qty: 50, price: 158.76 }
    ]
  },
  {
    sku_id: 'gen-2067',
    sku_code: 'AUTO-GEN-2067',
    barcode: '8858859486',
    part_name: 'Heavy-Spec Electrode Holder',
    part_name_lo: 'ຖົງມືຈອດ ລະດັບໂປຣ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES heavy-spec electrode holder. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຖົງມືຈອດ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/brake_pads_1787945576130.jpg',
    qty_on_hand: 59,
    unit_price: 204.91,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-2555', 'Size': 'Standard Fitment (1 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 178.18 },
      { min_qty: 50, price: 159.42 }
    ]
  },
  {
    sku_id: 'gen-2068',
    sku_code: 'AUTO-GEN-2068',
    barcode: '8851233989',
    part_name: 'Compact Metering Pump',
    part_name_lo: 'ວາວລະບາຍແຮງດັນ ມາດຕະຖານ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES compact metering pump. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ວາວລະບາຍແຮງດັນ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/build_error_page_1787943728324.png',
    qty_on_hand: 465,
    unit_price: 138.13,
    specs: {'Brand': 'Cummins', 'Model': 'IND-1655', 'Size': 'Standard Fitment (48 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 120.11 },
      { min_qty: 50, price: 107.47 }
    ]
  },
  {
    sku_id: 'gen-2069',
    sku_code: 'AUTO-GEN-2069',
    barcode: '8854392203',
    part_name: 'Pro-Grade Sterile Gauze',
    part_name_lo: 'ກະເປົ໋າປະຖົມພະຍາບານ ແບບໜັກ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES pro-grade sterile gauze. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ກະເປົ໋າປະຖົມພະຍາບານ ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/byd_cabin_filter_1787992122987.jpg',
    qty_on_hand: 315,
    unit_price: 188.92,
    specs: {'Brand': 'Bosch', 'Model': 'IND-5164', 'Size': 'Standard Fitment (40 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 164.28 },
      { min_qty: 50, price: 146.98 }
    ]
  },
  {
    sku_id: 'gen-2070',
    sku_code: 'AUTO-GEN-2070',
    barcode: '8855789002',
    part_name: 'Pro-Grade Power Supply',
    part_name_lo: 'ດອກໄຟສັນຍານ ແບບໜັກ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES pro-grade power supply. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ດອກໄຟສັນຍານ ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/forklift_lift_1787945527846.jpg',
    qty_on_hand: 498,
    unit_price: 153.29,
    specs: {'Brand': 'Cummins', 'Model': 'IND-8450', 'Size': 'Standard Fitment (41 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 133.3 },
      { min_qty: 50, price: 119.27 }
    ]
  },
  {
    sku_id: 'gen-2071',
    sku_code: 'AUTO-GEN-2071',
    barcode: '8854316669',
    part_name: 'Industrial Brass Bushing',
    part_name_lo: 'ລາງເລື່ອນເສັ້ນກົງ ສຳລັບການຄ້າ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES industrial brass bushing. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລາງເລື່ອນເສັ້ນກົງ ສຳລັບການຄ້າ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/product_1_specs_1788006986056.png',
    qty_on_hand: 96,
    unit_price: 80.81,
    specs: {'Brand': 'SKF', 'Model': 'IND-6467', 'Size': 'Standard Fitment (24 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 70.27 },
      { min_qty: 50, price: 62.87 }
    ]
  },
  {
    sku_id: 'gen-2072',
    sku_code: 'AUTO-GEN-2072',
    barcode: '8856549506',
    part_name: 'Advanced Sprocket',
    part_name_lo: 'ລໍ້ໄອເດີ້ ພິເສດ',
    category: 'Heavy Equipment & Machinery',
    description: 'ITR heavy-duty drive sprocket with 21 teeth for Hitachi ZX200. Deep induction hardened (HRC 50) to prevent premature wear in abrasive soil.',
    description_lo: 'ສະປ໋ອກເກັດຂັບເຄື່ອນ ITR 21 ແຂ້ວ ສຳລັບ Hitachi ZX200. ຜ່ານການຊຸບແຂງດ້ວຍຄວາມຖີ່ສູງທົ່ວທຸກແຂ້ວ ເພື່ອປ້ອງກັນການສຶກຫຣໍກ່ອນກຳນົດ.',
    image_url: '/images/catalog/real/toyota_brake_pads_1787991270192.jpg',
    qty_on_hand: 315,
    unit_price: 189.93,
    specs: {'Brand': 'ITR', 'Model': 'SP-200', 'Size': '21 Teeth', 'Application': 'Hitachi ZX200-1/3/5'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 165.16 },
      { min_qty: 50, price: 147.77 }
    ]
  },
  {
    sku_id: 'gen-2073',
    sku_code: 'AUTO-GEN-2073',
    barcode: '8856387725',
    part_name: 'Elite Contactor',
    part_name_lo: 'ເທີມິນອລບັອກ ພິເສດ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES elite contactor. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເທີມິນອລບັອກ ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_page_absolute_top_1787942806854.png',
    qty_on_hand: 428,
    unit_price: 159.19,
    specs: {'Brand': 'SKF', 'Model': 'IND-8445', 'Size': 'Standard Fitment (47 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 138.43 },
      { min_qty: 50, price: 123.86 }
    ]
  },
  {
    sku_id: 'gen-2074',
    sku_code: 'AUTO-GEN-2074',
    barcode: '8859875158',
    part_name: 'Premium Hydraulic Hose',
    part_name_lo: 'ວາວບັງຄັບທິດທາງ ອຸດສາຫະກຳ',
    category: 'Hydraulics & Pneumatics',
    description: 'Gates MegaSys M2T two-wire braided hydraulic hose (SAE 100 R2AT). Highly flexible and abrasion-resistant, rated up to 215 Bar.',
    description_lo: 'ສາຍໄຮໂດຼລິກເສີມລວດ 2 ຊັ້ນ Gates MegaSys. ໂຄ້ງງໍໄດ້ດີ ທົນທານຕໍ່ການຂູດຂີດ ຮອງຮັບແຮງດັນເຮັດວຽກ 215 Bar ສຳລັບລົດຈົກ.',
    image_url: '/images/catalog/real/cpr_mask_1787994387768.jpg',
    qty_on_hand: 185,
    unit_price: 99.58,
    specs: {'Brand': 'Gates', 'Model': 'MegaSys M2T', 'Size': 'ID: 3/4 inch (19mm), 215 Bar', 'Application': 'Excavators, Mobile Cranes'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 86.59 },
      { min_qty: 50, price: 77.47 }
    ]
  },
  {
    sku_id: 'gen-2075',
    sku_code: 'AUTO-GEN-2075',
    barcode: '8858720609',
    part_name: 'Standard Cutting Edge',
    part_name_lo: 'ໂສ້ແທຣັກ ອຸດສາຫະກຳ',
    category: 'Heavy Equipment & Machinery',
    description: 'BYG 30mm bolt-on cutting edge made from HB500 heat-treated boron steel. Offers superior wear resistance for wheel loader buckets.',
    description_lo: 'ໃບມີດຕັດລຸ່ມບຸ້ງກີ໋ BYG ໜາ 30mm ສຳລັບລົດຕັກ Volvo. ຜະລິດຈາກເຫຼັກໂບຣອນຊຸບແຂງ (HB500) ທົນທານຕໍ່ການສຶກຫຣໍໄດ້ດີເລີດ.',
    image_url: '/images/catalog/real/centrifugal_pump_1787995245344.jpg',
    qty_on_hand: 350,
    unit_price: 129.2,
    specs: {'Brand': 'BYG', 'Model': 'CE-HB500', 'Size': 'Thickness: 30mm', 'Application': 'Volvo L120F Wheel Loader'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 112.35 },
      { min_qty: 50, price: 100.52 }
    ]
  },
  {
    sku_id: 'gen-2076',
    sku_code: 'AUTO-GEN-2076',
    barcode: '8854585099',
    part_name: 'Advanced Centrifugal Pump',
    part_name_lo: 'ວາວປີກຜີເສື້ອ ພິເສດ',
    category: 'Hydraulics & Pneumatics',
    description: 'Grundfos NB series end-suction centrifugal pump. Cast iron body with a stainless steel impeller, powered by a highly efficient 7.5kW IE3 motor.',
    description_lo: 'ປ້ຳນ້ຳຫອຍໂຂ່ງ Grundfos ສາມາດຈ່າຍນ້ຳ 50 m³/h ທີ່ຄວາມສູງ 32 ແມັດ. ໃບພັດສະແຕນເລດ ພ້ອມມໍເຕີປະຢັດໄຟ IE3 7.5kW.',
    image_url: '/images/catalog/real/safety_glasses_1787992054757.jpg',
    qty_on_hand: 480,
    unit_price: 159.04,
    specs: {'Brand': 'Grundfos', 'Model': 'NB 50-200/219', 'Size': '50 m³/h @ 32m Head', 'Application': 'Factory Cooling Towers, HVAC'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 138.3 },
      { min_qty: 50, price: 123.74 }
    ]
  },
  {
    sku_id: 'gen-2077',
    sku_code: 'AUTO-GEN-2077',
    barcode: '8851677408',
    part_name: 'Compact Cabin Filter',
    part_name_lo: 'ໄສ້ຕອງນ້ຳມັນເຊື້ອໄຟ ຂັ້ນສູງ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES compact cabin filter. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໄສ້ຕອງນ້ຳມັນເຊື້ອໄຟ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/leapmotor_agm_battery_1787991358674.jpg',
    qty_on_hand: 312,
    unit_price: 16.33,
    specs: {'Brand': 'Cummins', 'Model': 'IND-5026', 'Size': 'Standard Fitment (39 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 14.2 },
      { min_qty: 50, price: 12.71 }
    ]
  },
  {
    sku_id: 'gen-2078',
    sku_code: 'AUTO-GEN-2078',
    barcode: '8856933002',
    part_name: 'Industrial Electrode Holder',
    part_name_lo: 'ຫົວຈອດ TIG ຄວາມຈຸສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES industrial electrode holder. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫົວຈອດ TIG ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/track_link_1787945633262.jpg',
    qty_on_hand: 292,
    unit_price: 14.98,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-8132', 'Size': 'Standard Fitment (22 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 13.03 },
      { min_qty: 50, price: 11.66 }
    ]
  },
  {
    sku_id: 'gen-2079',
    sku_code: 'AUTO-GEN-2079',
    barcode: '8851758312',
    part_name: 'Heavy Duty Sterile Gauze',
    part_name_lo: 'ຖົງມືແພດ ຄວາມແມ່ນຍຳສູງ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES heavy duty sterile gauze. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຖົງມືແພດ ຄວາມແມ່ນຍຳສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/toyota_bz4x_filter_1787994838401.jpg',
    qty_on_hand: 338,
    unit_price: 130.55,
    specs: {'Brand': 'Parker', 'Model': 'IND-4535', 'Size': 'Standard Fitment (13 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 113.52 },
      { min_qty: 50, price: 101.57 }
    ]
  },
  {
    sku_id: 'gen-2080',
    sku_code: 'AUTO-GEN-2080',
    barcode: '8858955842',
    part_name: 'Commercial Pressure Valve',
    part_name_lo: 'ວາວປັບແຮງດັນ ຂະໜາດນ້ອຍ',
    category: 'Hydraulics & Pneumatics',
    description: 'Bosch Rexroth DBW10 direct-acting pressure relief valve. Adjustable 50-315 Bar with a maximum flow capacity of 120 L/min.',
    description_lo: 'ວາວລະບາຍແຮງດັນ Bosch Rexroth ແທ້ (DBW10). ສາມາດປັບຕັ້ງໄດ້ 50-315 Bar ຮອງຮັບການໄຫຼ 120 L/min ຕອບສະໜອງໄວ.',
    image_url: '/images/catalog/real/store_initial_page_1788007481417.png',
    qty_on_hand: 33,
    unit_price: 151.69,
    specs: {'Brand': 'Bosch Rexroth', 'Model': 'DBW10', 'Size': 'G 3/4 inch, 120 L/min', 'Application': 'Industrial Hydraulic Power Units'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 131.9 },
      { min_qty: 50, price: 118.02 }
    ]
  },
  {
    sku_id: 'gen-2081',
    sku_code: 'AUTO-GEN-2081',
    barcode: '8855834582',
    part_name: 'Heavy Duty Gear Oil',
    part_name_lo: 'ນ້ຳມັນໄຮໂດຼລິກ ISO 46 ປະສິດທິພາບສູງ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES heavy duty gear oil. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳມັນໄຮໂດຼລິກ ISO 46 ປະສິດທິພາບສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/grade_8_bolts_1787995172620.jpg',
    qty_on_hand: 306,
    unit_price: 188.86,
    specs: {'Brand': 'Cummins', 'Model': 'IND-6812', 'Size': 'Standard Fitment (48 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 164.23 },
      { min_qty: 50, price: 146.95 }
    ]
  },
  {
    sku_id: 'gen-2082',
    sku_code: 'AUTO-GEN-2082',
    barcode: '8856531573',
    part_name: 'Performance Submersible Pump',
    part_name_lo: 'ວາວປີກຜີເສື້ອ ລະດັບໂປຣ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES performance submersible pump. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ວາວປີກຜີເສື້ອ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/heavy_duty_bearing_1787993170025.jpg',
    qty_on_hand: 390,
    unit_price: 169.0,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-1523', 'Size': 'Standard Fitment (5 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 146.96 },
      { min_qty: 50, price: 131.49 }
    ]
  },
  {
    sku_id: 'gen-2083',
    sku_code: 'AUTO-GEN-2083',
    barcode: '8851119957',
    part_name: 'Commercial Tungsten Bit',
    part_name_lo: 'ໝວກກັນກະທົບບໍ່ແຮ່ ຄວາມຈຸສູງ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES commercial tungsten bit. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໝວກກັນກະທົບບໍ່ແຮ່ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/diesel_engine_oil_1787987716108.jpg',
    qty_on_hand: 326,
    unit_price: 23.36,
    specs: {'Brand': 'Berco', 'Model': 'IND-4116', 'Size': 'Standard Fitment (34 kg)', 'Application': 'Volvo Wheel Loaders'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 20.31 },
      { min_qty: 50, price: 18.17 }
    ]
  },
  {
    sku_id: 'gen-2084',
    sku_code: 'AUTO-GEN-2084',
    barcode: '8854807861',
    part_name: 'Industrial Ground Clamp',
    part_name_lo: 'ຄີມຈັບລວດຈອດ ທົນທານ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES industrial ground clamp. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຄີມຈັບລວດຈອດ ທົນທານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_page_top_1787942795711.png',
    qty_on_hand: 243,
    unit_price: 111.89,
    specs: {'Brand': 'Bosch', 'Model': 'IND-9320', 'Size': 'Standard Fitment (44 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 97.3 },
      { min_qty: 50, price: 87.06 }
    ]
  },
  {
    sku_id: 'gen-2085',
    sku_code: 'AUTO-GEN-2085',
    barcode: '8859276811',
    part_name: 'Standard Medical Splint',
    part_name_lo: 'ແຜ່ນກັນ CPR ສຸດຍອດ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES standard medical splint. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ແຜ່ນກັນ CPR ສຸດຍອດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/forklift_main_1787945346855.jpg',
    qty_on_hand: 65,
    unit_price: 135.02,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-5926', 'Size': 'Standard Fitment (25 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 117.41 },
      { min_qty: 50, price: 105.05 }
    ]
  },
  {
    sku_id: 'gen-2086',
    sku_code: 'AUTO-GEN-2086',
    barcode: '8855812927',
    part_name: 'Pro-Grade MC4 Connector',
    part_name_lo: 'ຂໍ້ຕໍ່ MC4 ພຣີມຽມ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES pro-grade mc4 connector. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຂໍ້ຕໍ່ MC4 ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/lifepo4_battery_1787945655369.jpg',
    qty_on_hand: 395,
    unit_price: 162.95,
    specs: {'Brand': 'Cummins', 'Model': 'IND-6072', 'Size': 'Standard Fitment (50 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 141.7 },
      { min_qty: 50, price: 126.79 }
    ]
  },
  {
    sku_id: 'gen-2087',
    sku_code: 'AUTO-GEN-2087',
    barcode: '8853067061',
    part_name: 'Commercial Threaded Rod',
    part_name_lo: 'ນັອດກຽວໄມ້ ສຳລັບວຽກໜັກ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES commercial threaded rod. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນັອດກຽວໄມ້ ສຳລັບວຽກໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/mg_12v_battery_1787992153571.jpg',
    qty_on_hand: 62,
    unit_price: 36.25,
    specs: {'Brand': 'SKF', 'Model': 'IND-7001', 'Size': 'Standard Fitment (24 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 31.52 },
      { min_qty: 50, price: 28.2 }
    ]
  },
  {
    sku_id: 'gen-2088',
    sku_code: 'AUTO-GEN-2088',
    barcode: '8853546642',
    part_name: 'Precision Mantle and Bowl Liner',
    part_name_lo: 'ເບົ້າໂม่ຫີນ ຂະໜາດນ້ອຍ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES precision mantle and bowl liner. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເບົ້າໂม่ຫີນ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/icar_cabin_filter_1787991309425.jpg',
    qty_on_hand: 331,
    unit_price: 130.51,
    specs: {'Brand': 'Berco', 'Model': 'IND-1862', 'Size': 'Standard Fitment (2 kg)', 'Application': 'CAT 320D / Komatsu PC200'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 113.49 },
      { min_qty: 50, price: 101.54 }
    ]
  },
  {
    sku_id: 'gen-2089',
    sku_code: 'AUTO-GEN-2089',
    barcode: '8853642076',
    part_name: 'Standard Vibratory Roller (Rental)',
    part_name_lo: 'ລົດຍົກ Forklift (ເຊົ່າ) ຂະໜາດນ້ອຍ',
    category: 'Equipment Rental',
    description: 'Genuine OEM/OES standard vibratory roller (rental). Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລົດຍົກ Forklift (ເຊົ່າ) ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/industrial_grease_1787989730046.jpg',
    qty_on_hand: 103,
    unit_price: 94.37,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-4554', 'Size': 'Standard Fitment (9 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 82.06 },
      { min_qty: 50, price: 73.42 }
    ]
  },
  {
    sku_id: 'gen-2090',
    sku_code: 'AUTO-GEN-2090',
    barcode: '8852362141',
    part_name: 'Pro-Grade Excavator Tooth',
    part_name_lo: 'ສະປ໋ອກເກັດ ແບບໜັກ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine CAT J350 heavy-duty penetration tooth. Forged from impact-resistant alloy steel to handle rocky terrain without snapping.',
    description_lo: 'ແຂ້ວບຸ້ງກີ໋ລົດຂຸດ CAT 320 ລຸ້ນ J350 ແທ້. ຫຼໍ່ຈາກເຫຼັກກ້າປະສົມຮອງຮັບແຮງກະແທກສູງ ສາມາດເຈາະຊັ້ນຫີນໄດ້ຢ່າງມີປະສິດທິພາບ.',
    image_url: '/images/catalog/real/led_flood_light_1787989927255.jpg',
    qty_on_hand: 97,
    unit_price: 128.89,
    specs: {'Brand': 'Caterpillar', 'Model': '1U3352 (J350)', 'Size': '245mm L, 5.2kg', 'Application': 'CAT 320D, 320E, 323F'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 112.08 },
      { min_qty: 50, price: 100.28 }
    ]
  },
  {
    sku_id: 'gen-2091',
    sku_code: 'AUTO-GEN-2091',
    barcode: '8856541407',
    part_name: 'Precision DC-DC Converter',
    part_name_lo: 'ເຊວແບັດເຕີຣີ ຄວາມແມ່ນຍຳສູງ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES precision dc-dc converter. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຊວແບັດເຕີຣີ ຄວາມແມ່ນຍຳສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/air_compressor_1787995199402.jpg',
    qty_on_hand: 226,
    unit_price: 46.0,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-3369', 'Size': 'Standard Fitment (50 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 40.0 },
      { min_qty: 50, price: 35.79 }
    ]
  },
  {
    sku_id: 'gen-2092',
    sku_code: 'AUTO-GEN-2092',
    barcode: '8855153643',
    part_name: 'Standard Roofing Sheet',
    part_name_lo: 'ເຫຼັກໂຕຊີ ພິເສດ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES standard roofing sheet. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຫຼັກໂຕຊີ ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/conveyor_belt_roll_1787995187053.jpg',
    qty_on_hand: 18,
    unit_price: 124.19,
    specs: {'Brand': 'Parker', 'Model': 'IND-7331', 'Size': 'Standard Fitment (12 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 107.99 },
      { min_qty: 50, price: 96.62 }
    ]
  },
  {
    sku_id: 'gen-2093',
    sku_code: 'AUTO-GEN-2093',
    barcode: '8857571775',
    part_name: 'Advanced Respirator Mask',
    part_name_lo: 'ເກີບຫົວເຫຼັກ ຂະໜາດນ້ອຍ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES advanced respirator mask. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເກີບຫົວເຫຼັກ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/neta_ev_tire_1787992165722.jpg',
    qty_on_hand: 415,
    unit_price: 78.64,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-6501', 'Size': 'Standard Fitment (49 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 68.38 },
      { min_qty: 50, price: 61.18 }
    ]
  },
  {
    sku_id: 'gen-2094',
    sku_code: 'AUTO-GEN-2094',
    barcode: '8857523225',
    part_name: 'Compact Drive Pulley',
    part_name_lo: 'ສາຍພານວີ ຄວາມຈຸສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES compact drive pulley. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສາຍພານວີ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/modal_exc_trk_700_specs_1788006619191.png',
    qty_on_hand: 338,
    unit_price: 77.9,
    specs: {'Brand': 'Parker', 'Model': 'IND-9490', 'Size': 'Standard Fitment (11 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 67.74 },
      { min_qty: 50, price: 60.61 }
    ]
  },
  {
    sku_id: 'gen-2095',
    sku_code: 'AUTO-GEN-2095',
    barcode: '8859227647',
    part_name: 'Elite Ear Defenders',
    part_name_lo: 'ບັອກລົມ ຂະໜາດນ້ອຍ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES elite ear defenders. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ບັອກລົມ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/industrial_vacuum_cleaner_1787993454700.jpg',
    qty_on_hand: 58,
    unit_price: 150.97,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-7634', 'Size': 'Standard Fitment (42 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 131.28 },
      { min_qty: 50, price: 117.46 }
    ]
  },
  {
    sku_id: 'gen-2096',
    sku_code: 'AUTO-GEN-2096',
    barcode: '8854048705',
    part_name: 'Performance Metering Pump',
    part_name_lo: 'ເຊັກວາວ ຂັ້ນສູງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES performance metering pump. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຊັກວາວ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/hydraulic_pump_1787945565960.jpg',
    qty_on_hand: 339,
    unit_price: 68.93,
    specs: {'Brand': 'SKF', 'Model': 'IND-1095', 'Size': 'Standard Fitment (49 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 59.94 },
      { min_qty: 50, price: 53.63 }
    ]
  },
  {
    sku_id: 'gen-2097',
    sku_code: 'AUTO-GEN-2097',
    barcode: '8854208704',
    part_name: 'Standard Thermal Pad',
    part_name_lo: 'ຫົວຊາດ EV ອຸດສາຫະກຳ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES standard thermal pad. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫົວຊາດ EV ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/modal_cat_flt_8800_specs_1788006501403.png',
    qty_on_hand: 242,
    unit_price: 6.12,
    specs: {'Brand': 'Bosch', 'Model': 'IND-3251', 'Size': 'Standard Fitment (24 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 5.32 },
      { min_qty: 50, price: 4.76 }
    ]
  },
  {
    sku_id: 'gen-2098',
    sku_code: 'AUTO-GEN-2098',
    barcode: '8852766961',
    part_name: 'Compact EV Relay',
    part_name_lo: 'ກ່ອງຄວບຄຸມມໍເຕີ ແບບໜັກ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES compact ev relay. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ກ່ອງຄວບຄຸມມໍເຕີ ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/rubber_tracks_1787987801661.jpg',
    qty_on_hand: 377,
    unit_price: 76.28,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-5034', 'Size': 'Standard Fitment (40 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 66.33 },
      { min_qty: 50, price: 59.35 }
    ]
  },
  {
    sku_id: 'gen-2099',
    sku_code: 'AUTO-GEN-2099',
    barcode: '8852403665',
    part_name: 'Precision Steel Toe Boots',
    part_name_lo: 'ທີ່ອຸດຫູ ແບບໜັກ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES precision steel toe boots. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ທີ່ອຸດຫູ ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/jaecoo_led_headlight_1787991324547.jpg',
    qty_on_hand: 296,
    unit_price: 148.72,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-5680', 'Size': 'Standard Fitment (50 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 129.32 },
      { min_qty: 50, price: 115.71 }
    ]
  },
  {
    sku_id: 'gen-2100',
    sku_code: 'AUTO-GEN-2100',
    barcode: '8855680688',
    part_name: 'Advanced Onboard Charger',
    part_name_lo: 'ຣີເລ EV ສຸດຍອດ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES advanced onboard charger. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຣີເລ EV ສຸດຍອດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/product_1_details_1788006980550.png',
    qty_on_hand: 485,
    unit_price: 180.8,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-4273', 'Size': 'Standard Fitment (22 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 157.22 },
      { min_qty: 50, price: 140.67 }
    ]
  },
  {
    sku_id: 'gen-2101',
    sku_code: 'AUTO-GEN-2101',
    barcode: '8851209808',
    part_name: 'Standard Bandage Roll',
    part_name_lo: 'ນ້ຳຍາລ້າງຕາ ທົນທານ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES standard bandage roll. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳຍາລ້າງຕາ ທົນທານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/hydraulic_valve_1787989831146.jpg',
    qty_on_hand: 384,
    unit_price: 63.08,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-2295', 'Size': 'Standard Fitment (10 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 54.85 },
      { min_qty: 50, price: 49.08 }
    ]
  },
  {
    sku_id: 'gen-2102',
    sku_code: 'AUTO-GEN-2102',
    barcode: '8851171128',
    part_name: 'Ultra Safety Harness',
    part_name_lo: 'ໝວກນິລະໄພ ຂະໜາດນ້ອຍ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES ultra safety harness. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໝວກນິລະໄພ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/first_product_hover_1787944260980.png',
    qty_on_hand: 438,
    unit_price: 121.65,
    specs: {'Brand': 'Cummins', 'Model': 'IND-7811', 'Size': 'Standard Fitment (31 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 105.78 },
      { min_qty: 50, price: 94.64 }
    ]
  },
  {
    sku_id: 'gen-2103',
    sku_code: 'AUTO-GEN-2103',
    barcode: '8859264999',
    part_name: 'Commercial Trash Bin',
    part_name_lo: 'ໄມ້ຖູພື້ນພ້ອມຖັງ ຄວາມແມ່ນຍຳສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES commercial trash bin. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໄມ້ຖູພື້ນພ້ອມຖັງ ຄວາມແມ່ນຍຳສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/safety_shoes_fb_1787986500590.jpg',
    qty_on_hand: 198,
    unit_price: 132.57,
    specs: {'Brand': 'Bosch', 'Model': 'IND-5839', 'Size': 'Standard Fitment (25 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 115.28 },
      { min_qty: 50, price: 103.14 }
    ]
  },
  {
    sku_id: 'gen-2104',
    sku_code: 'AUTO-GEN-2104',
    barcode: '8855576689',
    part_name: 'Ultra Forklift (Rental)',
    part_name_lo: 'ລົດຕັກນ້ອຍ (ເຊົ່າ) ຄວາມແມ່ນຍຳສູງ',
    category: 'Equipment Rental',
    description: 'Genuine OEM/OES ultra forklift (rental). Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລົດຕັກນ້ອຍ (ເຊົ່າ) ຄວາມແມ່ນຍຳສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/air_compressor_1787989769249.jpg',
    qty_on_hand: 85,
    unit_price: 182.36,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-5585', 'Size': 'Standard Fitment (36 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 158.57 },
      { min_qty: 50, price: 141.88 }
    ]
  },
  {
    sku_id: 'gen-2105',
    sku_code: 'AUTO-GEN-2105',
    barcode: '8855548967',
    part_name: 'Standard Linear Guide Block',
    part_name_lo: 'ລູກປືນຕຸກກະຕາ ຄວາມແມ່ນຍຳສູງ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES standard linear guide block. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກປືນຕຸກກະຕາ ຄວາມແມ່ນຍຳສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/modal_cat_flt_8800_specs_1788006801075.png',
    qty_on_hand: 328,
    unit_price: 168.01,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-6069', 'Size': 'Standard Fitment (10 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 146.1 },
      { min_qty: 50, price: 130.72 }
    ]
  },
  {
    sku_id: 'gen-2106',
    sku_code: 'AUTO-GEN-2106',
    barcode: '8855337478',
    part_name: 'Heavy Duty Traction Motor Rotor',
    part_name_lo: 'ແຜ່ນລະບາຍຄວາມຮ້ອນ ລະດັບໂປຣ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES heavy duty traction motor rotor. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ແຜ່ນລະບາຍຄວາມຮ້ອນ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/transmission_fluid_1787994722473.jpg',
    qty_on_hand: 464,
    unit_price: 94.52,
    specs: {'Brand': 'SKF', 'Model': 'IND-3640', 'Size': 'Standard Fitment (6 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 82.19 },
      { min_qty: 50, price: 73.54 }
    ]
  },
  {
    sku_id: 'gen-2107',
    sku_code: 'AUTO-GEN-2107',
    barcode: '8859037749',
    part_name: 'High Capacity Refrigerant Gas',
    part_name_lo: 'ແຜ່ນກັ່ນນ້ຳຄູລິ້ງທາວເວີ ປະສິດທິພາບສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES high capacity refrigerant gas. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ແຜ່ນກັ່ນນ້ຳຄູລິ້ງທາວເວີ ປະສິດທິພາບສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/modal_hyd_pmp_550_specs_1788006553851.png',
    qty_on_hand: 388,
    unit_price: 35.2,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-3446', 'Size': 'Standard Fitment (14 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 30.61 },
      { min_qty: 50, price: 27.38 }
    ]
  },
  {
    sku_id: 'gen-2108',
    sku_code: 'AUTO-GEN-2108',
    barcode: '8855947612',
    part_name: 'Rugged Cutting Edge',
    part_name_lo: 'ສະປ໋ອກເກັດ ສຳລັບວຽກໜັກ',
    category: 'Heavy Equipment & Machinery',
    description: 'BYG 30mm bolt-on cutting edge made from HB500 heat-treated boron steel. Offers superior wear resistance for wheel loader buckets.',
    description_lo: 'ໃບມີດຕັດລຸ່ມບຸ້ງກີ໋ BYG ໜາ 30mm ສຳລັບລົດຕັກ Volvo. ຜະລິດຈາກເຫຼັກໂບຣອນຊຸບແຂງ (HB500) ທົນທານຕໍ່ການສຶກຫຣໍໄດ້ດີເລີດ.',
    image_url: '/images/catalog/real/modal_cat_flt_8800_viewport_1788006492943.png',
    qty_on_hand: 122,
    unit_price: 49.22,
    specs: {'Brand': 'BYG', 'Model': 'CE-HB500', 'Size': 'Thickness: 30mm', 'Application': 'Volvo L120F Wheel Loader'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 42.8 },
      { min_qty: 50, price: 38.29 }
    ]
  },
  {
    sku_id: 'gen-2109',
    sku_code: 'AUTO-GEN-2109',
    barcode: '8858938326',
    part_name: 'Compact Drive Shaft',
    part_name_lo: 'ເພົາຂັບ ແບບໜັກ',
    category: 'Parts & Components',
    description: 'Genuine Spicer SPL250 series drive shaft assembly. Manufactured from 1045 carbon steel and dynamic G16 balanced for Volvo FMX and Scania R-Series heavy haulage applications.',
    description_lo: 'ຊຸດເພົາຂັບລົດແທ້ Spicer SPL250. ຜະລິດຈາກເຫຼັກຄາບອນ 1045 ຜ່ານການບາລານແບບໄດນາມິກ ສຳລັບລົດບັນທຸກໜັກ Volvo FMX ແລະ Scania ໂດຍສະເພາະ.',
    image_url: '/images/catalog/real/burn_kit_1787994421467.jpg',
    qty_on_hand: 122,
    unit_price: 24.08,
    specs: {'Brand': 'Spicer / Dana', 'Model': 'SPL250 Series', 'Size': 'L: 1250mm, Spline: 24', 'Application': 'Volvo FMX, Scania R-Series (Heavy Haulage)'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 20.94 },
      { min_qty: 50, price: 18.74 }
    ]
  },
  {
    sku_id: 'gen-2110',
    sku_code: 'AUTO-GEN-2110',
    barcode: '8857816508',
    part_name: 'Commercial Deep Cycle Battery',
    part_name_lo: 'ເຄື່ອງເພີ່ມປະສິດທິພາບໂຊລ່າ ສຳລັບວຽກໜັກ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES commercial deep cycle battery. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຄື່ອງເພີ່ມປະສິດທິພາບໂຊລ່າ ສຳລັບວຽກໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/thrust_bearing_1787994570116.jpg',
    qty_on_hand: 267,
    unit_price: 160.77,
    specs: {'Brand': 'Cummins', 'Model': 'IND-5090', 'Size': 'Standard Fitment (14 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 139.8 },
      { min_qty: 50, price: 125.08 }
    ]
  },
  {
    sku_id: 'gen-2111',
    sku_code: 'AUTO-GEN-2111',
    barcode: '8851833960',
    part_name: 'Performance EV Battery Disconnect',
    part_name_lo: 'ສະວິດໄລ່ໄຟແບັດເຕີຣີ ສຳລັບການຄ້າ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES performance ev battery disconnect. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສະວິດໄລ່ໄຟແບັດເຕີຣີ ສຳລັບການຄ້າ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/ibeam_steel_1787994462788.jpg',
    qty_on_hand: 117,
    unit_price: 6.12,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-6046', 'Size': 'Standard Fitment (50 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 5.32 },
      { min_qty: 50, price: 4.76 }
    ]
  },
  {
    sku_id: 'gen-2112',
    sku_code: 'AUTO-GEN-2112',
    barcode: '8853745652',
    part_name: 'Commercial Crusher Jaw',
    part_name_lo: 'ໝວກກັນກະທົບບໍ່ແຮ່ ມາດຕະຖານ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES commercial crusher jaw. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໝວກກັນກະທົບບໍ່ແຮ່ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/arcfox_alpha_fluid_1787994887698.jpg',
    qty_on_hand: 219,
    unit_price: 86.4,
    specs: {'Brand': 'CAT', 'Model': 'IND-1444', 'Size': 'Standard Fitment (32 kg)', 'Application': 'CAT 320D / Komatsu PC200'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 75.13 },
      { min_qty: 50, price: 67.22 }
    ]
  },
  {
    sku_id: 'gen-2113',
    sku_code: 'AUTO-GEN-2113',
    barcode: '8857333903',
    part_name: 'High Capacity Burn Dressing',
    part_name_lo: 'ຜ້າເຊັດຂ້າເຊື້ອ ມາດຕະຖານ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES high capacity burn dressing. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຜ້າເຊັດຂ້າເຊື້ອ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/industrial_chiller_1787995257600.jpg',
    qty_on_hand: 277,
    unit_price: 85.36,
    specs: {'Brand': 'Bosch', 'Model': 'IND-4200', 'Size': 'Standard Fitment (24 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 74.23 },
      { min_qty: 50, price: 66.42 }
    ]
  },
  {
    sku_id: 'gen-2114',
    sku_code: 'AUTO-GEN-2114',
    barcode: '8851550851',
    part_name: 'Pro-Grade Gear Oil',
    part_name_lo: 'ໄສ້ຕອງອາກາດ ລະດັບໂປຣ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES pro-grade gear oil. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໄສ້ຕອງອາກາດ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/mig_welding_wire_1787995228846.jpg',
    qty_on_hand: 210,
    unit_price: 21.7,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-3372', 'Size': 'Standard Fitment (26 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 18.87 },
      { min_qty: 50, price: 16.88 }
    ]
  },
  {
    sku_id: 'gen-2115',
    sku_code: 'AUTO-GEN-2115',
    barcode: '8859260310',
    part_name: 'Standard EV Relay',
    part_name_lo: 'ກ່ອງຄວບຄຸມມໍເຕີ ສຳລັບວຽກໜັກ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES standard ev relay. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ກ່ອງຄວບຄຸມມໍເຕີ ສຳລັບວຽກໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/first_aid_cabinet_1787987096264.jpg',
    qty_on_hand: 366,
    unit_price: 111.14,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-6128', 'Size': 'Standard Fitment (10 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 96.64 },
      { min_qty: 50, price: 86.47 }
    ]
  },
  {
    sku_id: 'gen-2116',
    sku_code: 'AUTO-GEN-2116',
    barcode: '8859544739',
    part_name: 'Commercial Respirator Mask',
    part_name_lo: 'ແວ່ນຕານິລະໄພ ພຣີມຽມ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES commercial respirator mask. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ແວ່ນຕານິລະໄພ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_page_view_1787944254540.png',
    qty_on_hand: 136,
    unit_price: 200.66,
    specs: {'Brand': 'Bosch', 'Model': 'IND-1514', 'Size': 'Standard Fitment (23 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 174.49 },
      { min_qty: 50, price: 156.12 }
    ]
  },
  {
    sku_id: 'gen-2117',
    sku_code: 'AUTO-GEN-2117',
    barcode: '8859992562',
    part_name: 'Premium Electrode Holder',
    part_name_lo: 'ເກດວັດແກັດ ຂັ້ນສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES premium electrode holder. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເກດວັດແກັດ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/nitrile_gloves_1787986515132.jpg',
    qty_on_hand: 427,
    unit_price: 89.75,
    specs: {'Brand': 'Cummins', 'Model': 'IND-4096', 'Size': 'Standard Fitment (19 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 78.04 },
      { min_qty: 50, price: 69.82 }
    ]
  },
  {
    sku_id: 'gen-2118',
    sku_code: 'AUTO-GEN-2118',
    barcode: '8856774602',
    part_name: 'Ultra Metering Pump',
    part_name_lo: 'ວາວປີກຜີເສື້ອ ມາດຕະຖານ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES ultra metering pump. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ວາວປີກຜີເສື້ອ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/portland_cement_bag_1787993158262.jpg',
    qty_on_hand: 369,
    unit_price: 82.91,
    specs: {'Brand': 'SKF', 'Model': 'IND-6232', 'Size': 'Standard Fitment (33 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 72.1 },
      { min_qty: 50, price: 64.51 }
    ]
  },
  {
    sku_id: 'gen-2119',
    sku_code: 'AUTO-GEN-2119',
    barcode: '8856615552',
    part_name: 'Heavy-Spec Plywood Sheet',
    part_name_lo: 'ເຫຼັກສາກ ລະດັບໂປຣ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES heavy-spec plywood sheet. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຫຼັກສາກ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/truck_battery_1787987701312.jpg',
    qty_on_hand: 272,
    unit_price: 190.57,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-1656', 'Size': 'Standard Fitment (43 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 165.71 },
      { min_qty: 50, price: 148.27 }
    ]
  },
  {
    sku_id: 'gen-2120',
    sku_code: 'AUTO-GEN-2120',
    barcode: '8856304440',
    part_name: 'Heavy-Spec Air Hose',
    part_name_lo: 'ສາຍລົມ ຂັ້ນສູງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES heavy-spec air hose. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສາຍລົມ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/trauma_kit_1787994372278.jpg',
    qty_on_hand: 111,
    unit_price: 185.36,
    specs: {'Brand': 'Parker', 'Model': 'IND-6451', 'Size': 'Standard Fitment (19 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 161.18 },
      { min_qty: 50, price: 144.22 }
    ]
  },
  {
    sku_id: 'gen-2121',
    sku_code: 'AUTO-GEN-2121',
    barcode: '8855201011',
    part_name: 'Precision Air Blow Gun',
    part_name_lo: 'ຫົວເຕີມລົມ ແບບໜັກ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES precision air blow gun. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫົວເຕີມລົມ ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/forklift_wheel_1787945554947.jpg',
    qty_on_hand: 38,
    unit_price: 75.21,
    specs: {'Brand': 'Parker', 'Model': 'IND-2295', 'Size': 'Standard Fitment (26 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 65.4 },
      { min_qty: 50, price: 58.51 }
    ]
  },
  {
    sku_id: 'gen-2122',
    sku_code: 'AUTO-GEN-2122',
    barcode: '8856817740',
    part_name: 'Rugged Cleaning Cart',
    part_name_lo: 'ລົດເຂັນທຳຄວາມສະອາດ ສຳລັບການຄ້າ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES rugged cleaning cart. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລົດເຂັນທຳຄວາມສະອາດ ສຳລັບການຄ້າ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/specs_table_1787943984002.png',
    qty_on_hand: 449,
    unit_price: 127.52,
    specs: {'Brand': 'Parker', 'Model': 'IND-5110', 'Size': 'Standard Fitment (36 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 110.89 },
      { min_qty: 50, price: 99.22 }
    ]
  },
  {
    sku_id: 'gen-2123',
    sku_code: 'AUTO-GEN-2123',
    barcode: '8858086063',
    part_name: 'Heavy-Spec Ball Valve',
    part_name_lo: 'ວາວລະບາຍແຮງດັນ ປະສິດທິພາບສູງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES heavy-spec ball valve. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ວາວລະບາຍແຮງດັນ ປະສິດທິພາບສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/forklift_side_1787945419504.jpg',
    qty_on_hand: 268,
    unit_price: 89.55,
    specs: {'Brand': 'Parker', 'Model': 'IND-1692', 'Size': 'Standard Fitment (17 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 77.87 },
      { min_qty: 50, price: 69.67 }
    ]
  },
  {
    sku_id: 'gen-2124',
    sku_code: 'AUTO-GEN-2124',
    barcode: '8859743942',
    part_name: 'Advanced Gypsum Board',
    part_name_lo: 'ແຜ່ນກັນຊຶມ ອຸດສາຫະກຳ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES advanced gypsum board. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ແຜ່ນກັນຊຶມ ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/readymix_concrete_1787994475610.jpg',
    qty_on_hand: 464,
    unit_price: 35.7,
    specs: {'Brand': 'Bosch', 'Model': 'IND-9413', 'Size': 'Standard Fitment (27 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 31.04 },
      { min_qty: 50, price: 27.77 }
    ]
  },
  {
    sku_id: 'gen-2125',
    sku_code: 'AUTO-GEN-2125',
    barcode: '8856097089',
    part_name: 'Compact Carriage Bolt',
    part_name_lo: 'ພຸກເຫຼັກ ລະດັບໂປຣ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES compact carriage bolt. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ພຸກເຫຼັກ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/coolant_1787994663953.jpg',
    qty_on_hand: 22,
    unit_price: 26.76,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-3830', 'Size': 'Standard Fitment (26 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 23.27 },
      { min_qty: 50, price: 20.82 }
    ]
  },
  {
    sku_id: 'gen-2126',
    sku_code: 'AUTO-GEN-2126',
    barcode: '8857710222',
    part_name: 'Advanced Crusher Jaw',
    part_name_lo: 'ທໍ່ລະບາຍອາກາດ ພຣີມຽມ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES advanced crusher jaw. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ທໍ່ລະບາຍອາກາດ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/air_compressor_1787993354213.jpg',
    qty_on_hand: 185,
    unit_price: 177.3,
    specs: {'Brand': 'Komatsu', 'Model': 'IND-8601', 'Size': 'Standard Fitment (48 kg)', 'Application': 'Volvo Wheel Loaders'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 154.17 },
      { min_qty: 50, price: 137.94 }
    ]
  },
  {
    sku_id: 'gen-2127',
    sku_code: 'AUTO-GEN-2127',
    barcode: '8852659376',
    part_name: 'Pro-Grade Cabin Glass',
    part_name_lo: 'ໃບມີດລົດດຸດ ສຳລັບວຽກໜັກ',
    category: 'Heavy Equipment & Machinery',
    description: 'Pilkington laminated front windshield for Volvo EC210B. DOT certified to prevent shattering, protecting operators from flying debris.',
    description_lo: 'ແວ່ນຕາກະຈົກໜ້າລົດຂຸດ Volvo EC210B ແບບນິລະໄພລາມິເນດ. ປ້ອງກັນການແຕກກະຈາຍ ຊ່ວຍປົກປ້ອງຄົນຂັບຈາກເສດຫີນ ພ້ອມໃຫ້ວິໄສທັດຊັດເຈນ.',
    image_url: '/images/catalog/real/safety_goggles_1787986528762.jpg',
    qty_on_hand: 426,
    unit_price: 153.38,
    specs: {'Brand': 'Pilkington', 'Model': 'Safety Glass Laminated', 'Size': '6.76mm Thick', 'Application': 'Volvo EC210B Excavator'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 133.37 },
      { min_qty: 50, price: 119.33 }
    ]
  },
  {
    sku_id: 'gen-2128',
    sku_code: 'AUTO-GEN-2128',
    barcode: '8852114728',
    part_name: 'Ultra Indicator Light',
    part_name_lo: 'ເທີມິນອລບັອກ ພຣີມຽມ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES ultra indicator light. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເທີມິນອລບັອກ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/mining_slurry_pump_1787986331620.jpg',
    qty_on_hand: 395,
    unit_price: 69.15,
    specs: {'Brand': 'Cummins', 'Model': 'IND-7232', 'Size': 'Standard Fitment (37 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 60.13 },
      { min_qty: 50, price: 53.8 }
    ]
  },
  {
    sku_id: 'gen-2129',
    sku_code: 'AUTO-GEN-2129',
    barcode: '8854858992',
    part_name: 'Industrial Refrigerant Gas',
    part_name_lo: 'ເຄື່ອງທຳຄວາມເຢັນ Chiller ແບບໜັກ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES industrial refrigerant gas. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຄື່ອງທຳຄວາມເຢັນ Chiller ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/welding_machine_1787945607244.jpg',
    qty_on_hand: 68,
    unit_price: 11.6,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-4862', 'Size': 'Standard Fitment (23 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 10.09 },
      { min_qty: 50, price: 9.03 }
    ]
  },
  {
    sku_id: 'gen-2130',
    sku_code: 'AUTO-GEN-2130',
    barcode: '8851170062',
    part_name: 'Ultra Gear Oil',
    part_name_lo: 'ໄສ້ຕອງອາກາດ ມາດຕະຖານ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES ultra gear oil. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໄສ້ຕອງອາກາດ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/search_results_forklift_1787945902300.png',
    qty_on_hand: 233,
    unit_price: 52.21,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-3282', 'Size': 'Standard Fitment (27 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 45.4 },
      { min_qty: 50, price: 40.62 }
    ]
  },
  {
    sku_id: 'gen-2131',
    sku_code: 'AUTO-GEN-2131',
    barcode: '8855704931',
    part_name: 'Heavy Duty Welding Glove',
    part_name_lo: 'ຜ້າມ່ານກັນແສງຈອດ ສຳລັບວຽກໜັກ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES heavy duty welding glove. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຜ້າມ່ານກັນແສງຈອດ ສຳລັບວຽກໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/solar_inverter_1787945369533.jpg',
    qty_on_hand: 24,
    unit_price: 129.28,
    specs: {'Brand': 'Cummins', 'Model': 'IND-7905', 'Size': 'Standard Fitment (20 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 112.42 },
      { min_qty: 50, price: 100.58 }
    ]
  },
  {
    sku_id: 'gen-2132',
    sku_code: 'AUTO-GEN-2132',
    barcode: '8859466264',
    part_name: 'Elite Engine Mount',
    part_name_lo: 'ເພົາຂັບ ພິເສດ',
    category: 'Parts & Components',
    description: 'Lemförder hydraulic-damped engine mount for MAN TGA/TGS trucks. Effectively isolates low-frequency diesel engine vibrations to protect the chassis.',
    description_lo: 'ຢາງແທ່ນເຄື່ອງແທ້ Lemförder ແບບໄຮໂດຼລິກ ສຳລັບລົດບັນທຸກ MAN TGA/TGS. ຊ່ວຍດູດຊັບແຮງສັ່ນສະເທືອນຈາກຈັກກາຊວນ ປ້ອງກັນໂຄງລົດເສຍຫາຍ.',
    image_url: '/images/catalog/real/ev_brake_fluid_1787947002763.jpg',
    qty_on_hand: 425,
    unit_price: 204.48,
    specs: {'Brand': 'Lemförder', 'Model': '30456 01', 'Size': 'Load Cap: 1500kg', 'Application': 'MAN TGA / TGS Trucks'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 177.81 },
      { min_qty: 50, price: 159.09 }
    ]
  },
  {
    sku_id: 'gen-2133',
    sku_code: 'AUTO-GEN-2133',
    barcode: '8856265909',
    part_name: 'Heavy-Spec Pneumatic Cylinder',
    part_name_lo: 'ກະບອກລົມ ພິເສດ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES heavy-spec pneumatic cylinder. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ກະບອກລົມ ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/aion_ev_coolant_1787991371969.jpg',
    qty_on_hand: 16,
    unit_price: 30.15,
    specs: {'Brand': 'SKF', 'Model': 'IND-7594', 'Size': 'Standard Fitment (41 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 26.22 },
      { min_qty: 50, price: 23.46 }
    ]
  },
  {
    sku_id: 'gen-2134',
    sku_code: 'AUTO-GEN-2134',
    barcode: '8851455335',
    part_name: 'Commercial Medical Splint',
    part_name_lo: 'ຖົງມືແພດ ສຳລັບວຽກໜັກ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES commercial medical splint. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຖົງມືແພດ ສຳລັບວຽກໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/honda_inverter_coolant_1787991385806.jpg',
    qty_on_hand: 106,
    unit_price: 82.79,
    specs: {'Brand': 'SKF', 'Model': 'IND-9327', 'Size': 'Standard Fitment (14 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 71.99 },
      { min_qty: 50, price: 64.41 }
    ]
  },
  {
    sku_id: 'gen-2135',
    sku_code: 'AUTO-GEN-2135',
    barcode: '8852257411',
    part_name: 'Compact Ventilation Tube',
    part_name_lo: 'ຕະແກງຄັດແຍກ ແບບໜັກ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES compact ventilation tube. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຕະແກງຄັດແຍກ ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/tesla_wiper_blades_1787992139928.jpg',
    qty_on_hand: 398,
    unit_price: 143.23,
    specs: {'Brand': 'Berco', 'Model': 'IND-4224', 'Size': 'Standard Fitment (46 kg)', 'Application': 'Mining Dump Trucks'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 124.55 },
      { min_qty: 50, price: 111.43 }
    ]
  },
  {
    sku_id: 'gen-2136',
    sku_code: 'AUTO-GEN-2136',
    barcode: '8853329110',
    part_name: 'Industrial Ear Defenders',
    part_name_lo: 'ປະແຈປອນ ພຣີມຽມ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES industrial ear defenders. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ປະແຈປອນ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/industrial_motor_1787993367799.jpg',
    qty_on_hand: 416,
    unit_price: 150.47,
    specs: {'Brand': 'Bosch', 'Model': 'IND-8395', 'Size': 'Standard Fitment (7 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 130.84 },
      { min_qty: 50, price: 117.07 }
    ]
  },
  {
    sku_id: 'gen-2137',
    sku_code: 'AUTO-GEN-2137',
    barcode: '8855751565',
    part_name: 'Rugged Off-grid Inverter',
    part_name_lo: 'ເຄື່ອງເພີ່ມປະສິດທິພາບໂຊລ່າ ທົນທານ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES rugged off-grid inverter. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຄື່ອງເພີ່ມປະສິດທິພາບໂຊລ່າ ທົນທານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/bronze_bushing_1787994598342.jpg',
    qty_on_hand: 140,
    unit_price: 175.23,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-7219', 'Size': 'Standard Fitment (2 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 152.37 },
      { min_qty: 50, price: 136.33 }
    ]
  },
  {
    sku_id: 'gen-2138',
    sku_code: 'AUTO-GEN-2138',
    barcode: '8857460558',
    part_name: 'Performance Transmission Fluid',
    part_name_lo: 'ນ້ຳມັນເກຍ ພິເສດ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES performance transmission fluid. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳມັນເກຍ ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/mining_jaw_plate_1787986343879.jpg',
    qty_on_hand: 11,
    unit_price: 111.08,
    specs: {'Brand': 'Bosch', 'Model': 'IND-9299', 'Size': 'Standard Fitment (4 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 96.59 },
      { min_qty: 50, price: 86.42 }
    ]
  },
  {
    sku_id: 'gen-2139',
    sku_code: 'AUTO-GEN-2139',
    barcode: '8857444626',
    part_name: 'Standard Pillow Block Bearing',
    part_name_lo: 'ບູຊທອງເຫຼືອງ ພຣີມຽມ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES standard pillow block bearing. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ບູຊທອງເຫຼືອງ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/toyota_hv_cable_1787991422275.jpg',
    qty_on_hand: 214,
    unit_price: 168.41,
    specs: {'Brand': 'Bosch', 'Model': 'IND-3821', 'Size': 'Standard Fitment (32 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 146.44 },
      { min_qty: 50, price: 131.02 }
    ]
  },
  {
    sku_id: 'gen-2140',
    sku_code: 'AUTO-GEN-2140',
    barcode: '8854384481',
    part_name: 'Advanced Troughing Idler',
    part_name_lo: 'ຕຽງຮັບແຮງກະແທກ ຂັ້ນສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES advanced troughing idler. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຕຽງຮັບແຮງກະແທກ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/product_2_specs_1788007011418.png',
    qty_on_hand: 432,
    unit_price: 106.33,
    specs: {'Brand': 'SKF', 'Model': 'IND-6936', 'Size': 'Standard Fitment (28 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 92.46 },
      { min_qty: 50, price: 82.73 }
    ]
  },
  {
    sku_id: 'gen-2141',
    sku_code: 'AUTO-GEN-2141',
    barcode: '8858580732',
    part_name: 'Precision Spherical Bearing',
    part_name_lo: 'ລູກປືນກົມ ສຳລັບວຽກໜັກ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES precision spherical bearing. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກປືນກົມ ສຳລັບວຽກໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/high_tensile_bolt_1787993197960.jpg',
    qty_on_hand: 188,
    unit_price: 191.43,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-9433', 'Size': 'Standard Fitment (49 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 166.46 },
      { min_qty: 50, price: 148.94 }
    ]
  },
  {
    sku_id: 'gen-2142',
    sku_code: 'AUTO-GEN-2142',
    barcode: '8852420147',
    part_name: 'Advanced EV BMS',
    part_name_lo: 'ແຜ່ນລະບາຍຄວາມຮ້ອນ ຂະໜາດນ້ອຍ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES advanced ev bms. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ແຜ່ນລະບາຍຄວາມຮ້ອນ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/after_related_click_1787944325885.png',
    qty_on_hand: 462,
    unit_price: 65.45,
    specs: {'Brand': 'SKF', 'Model': 'IND-6591', 'Size': 'Standard Fitment (46 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 56.91 },
      { min_qty: 50, price: 50.92 }
    ]
  },
  {
    sku_id: 'gen-2143',
    sku_code: 'AUTO-GEN-2143',
    barcode: '8855274362',
    part_name: 'Pro-Grade Air Hose',
    part_name_lo: 'ສາຍລົມ ລະດັບໂປຣ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES pro-grade air hose. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສາຍລົມ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/fire_extinguisher_1787992098343.jpg',
    qty_on_hand: 218,
    unit_price: 41.49,
    specs: {'Brand': 'Parker', 'Model': 'IND-2636', 'Size': 'Standard Fitment (34 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 36.08 },
      { min_qty: 50, price: 32.28 }
    ]
  },
  {
    sku_id: 'gen-2144',
    sku_code: 'AUTO-GEN-2144',
    barcode: '8858170667',
    part_name: 'Premium Battery Cell',
    part_name_lo: 'ຕູ້ຊາດ EV ພຣີມຽມ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES premium battery cell. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຕູ້ຊາດ EV ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/system_maintenance_1787942571293.png',
    qty_on_hand: 144,
    unit_price: 6.27,
    specs: {'Brand': 'Bosch', 'Model': 'IND-4971', 'Size': 'Standard Fitment (17 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 5.45 },
      { min_qty: 50, price: 4.88 }
    ]
  },
  {
    sku_id: 'gen-2145',
    sku_code: 'AUTO-GEN-2145',
    barcode: '8852266666',
    part_name: 'Rugged EV Charging Station',
    part_name_lo: 'ອອນບອດຊາດເຈີ ທົນທານ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES rugged ev charging station. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ອອນບອດຊາດເຈີ ທົນທານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/rebar_steel_1787994446883.jpg',
    qty_on_hand: 105,
    unit_price: 49.66,
    specs: {'Brand': 'Bosch', 'Model': 'IND-9369', 'Size': 'Standard Fitment (22 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 43.18 },
      { min_qty: 50, price: 38.64 }
    ]
  },
  {
    sku_id: 'gen-2146',
    sku_code: 'AUTO-GEN-2146',
    barcode: '8854227473',
    part_name: 'Industrial Flange Unit',
    part_name_lo: 'ບູຊທອງເຫຼືອງ ລະດັບໂປຣ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES industrial flange unit. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ບູຊທອງເຫຼືອງ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/ev_battery_coolant_1787947012559.jpg',
    qty_on_hand: 224,
    unit_price: 79.64,
    specs: {'Brand': 'Parker', 'Model': 'IND-2229', 'Size': 'Standard Fitment (4 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 69.25 },
      { min_qty: 50, price: 61.96 }
    ]
  },
  {
    sku_id: 'gen-2147',
    sku_code: 'AUTO-GEN-2147',
    barcode: '8855252912',
    part_name: 'Rugged Eye Wash Solution',
    part_name_lo: 'ຜ້າກັອດປອດເຊື້ອ ລະດັບໂປຣ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES rugged eye wash solution. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຜ້າກັອດປອດເຊື້ອ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/forklift_rear_1787945500664.jpg',
    qty_on_hand: 93,
    unit_price: 44.65,
    specs: {'Brand': 'Cummins', 'Model': 'IND-1023', 'Size': 'Standard Fitment (37 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 38.83 },
      { min_qty: 50, price: 34.74 }
    ]
  },
  {
    sku_id: 'gen-2148',
    sku_code: 'AUTO-GEN-2148',
    barcode: '8854339800',
    part_name: 'High Capacity Traction Motor Rotor',
    part_name_lo: 'ໂຣເຕີມໍເຕີຂັບເຄື່ອນ ລະດັບໂປຣ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES high capacity traction motor rotor. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໂຣເຕີມໍເຕີຂັບເຄື່ອນ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/metal_roofing_1787994488453.jpg',
    qty_on_hand: 413,
    unit_price: 4.54,
    specs: {'Brand': 'Cummins', 'Model': 'IND-6565', 'Size': 'Standard Fitment (22 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 3.95 },
      { min_qty: 50, price: 3.54 }
    ]
  },
  {
    sku_id: 'gen-2149',
    sku_code: 'AUTO-GEN-2149',
    barcode: '8859421518',
    part_name: 'High Capacity Cooling Tower Fill',
    part_name_lo: 'ນ້ຳຢາແອ ປະສິດທິພາບສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES high capacity cooling tower fill. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳຢາແອ ປະສິດທິພາບສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/arcfox_charging_cable_1787991346297.jpg',
    qty_on_hand: 445,
    unit_price: 115.51,
    specs: {'Brand': 'Parker', 'Model': 'IND-5999', 'Size': 'Standard Fitment (9 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 100.44 },
      { min_qty: 50, price: 89.87 }
    ]
  },
  {
    sku_id: 'gen-2150',
    sku_code: 'AUTO-GEN-2150',
    barcode: '8852852518',
    part_name: 'Precision Track Roller',
    part_name_lo: 'ໃບມີດຕັດ ພິເສດ',
    category: 'Heavy Equipment & Machinery',
    description: 'ITR double flange bottom track roller for Komatsu PC200. Forged from 40Mn2 steel with lifetime seals to withstand constant submersion in mud.',
    description_lo: 'ໂຣເລີ້ລຸ່ມແບບປີກຄູ່ ITR ສຳລັບລົດຂຸດ Komatsu PC200. ຟອດຈາກເຫຼັກ 40Mn2 ພ້ອມຊີລກັນນ້ຳ ທົນທານຕໍ່ການແຊ່ໃນຂີ້ຕົມ ແລະ ນ້ຳຕະຫຼອດເວລາ.',
    image_url: '/images/catalog/real/store_products_1_1788007486784.png',
    qty_on_hand: 55,
    unit_price: 76.21,
    specs: {'Brand': 'ITR', 'Model': 'TR-DF-200', 'Size': 'Double Flange', 'Application': 'Komatsu PC200, PC210'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 66.27 },
      { min_qty: 50, price: 59.3 }
    ]
  },
  {
    sku_id: 'gen-2151',
    sku_code: 'AUTO-GEN-2151',
    barcode: '8858606472',
    part_name: 'Advanced Air Diffuser',
    part_name_lo: 'ເຄື່ອງທຳຄວາມເຢັນ Chiller ຂະໜາດນ້ອຍ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES advanced air diffuser. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຄື່ອງທຳຄວາມເຢັນ Chiller ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/centrifugal_pump_1787989816474.jpg',
    qty_on_hand: 297,
    unit_price: 69.18,
    specs: {'Brand': 'Bosch', 'Model': 'IND-7273', 'Size': 'Standard Fitment (20 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 60.16 },
      { min_qty: 50, price: 53.82 }
    ]
  },
  {
    sku_id: 'gen-2152',
    sku_code: 'AUTO-GEN-2152',
    barcode: '8859288721',
    part_name: 'Pro-Grade Burn Dressing',
    part_name_lo: 'ກະເປົ໋າປະຖົມພະຍາບານ ປະສິດທິພາບສູງ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES pro-grade burn dressing. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ກະເປົ໋າປະຖົມພະຍາບານ ປະສິດທິພາບສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_products_3_1788007501517.png',
    qty_on_hand: 92,
    unit_price: 96.08,
    specs: {'Brand': 'SKF', 'Model': 'IND-6637', 'Size': 'Standard Fitment (17 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 83.55 },
      { min_qty: 50, price: 74.76 }
    ]
  },
  {
    sku_id: 'gen-2153',
    sku_code: 'AUTO-GEN-2153',
    barcode: '8855494239',
    part_name: 'Heavy-Spec Boom Lift (Rental)',
    part_name_lo: 'ເຄື່ອງປ້ຳລົມ (ເຊົ່າ) ສຳລັບວຽກໜັກ',
    category: 'Equipment Rental',
    description: 'Genuine OEM/OES heavy-spec boom lift (rental). Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຄື່ອງປ້ຳລົມ (ເຊົ່າ) ສຳລັບວຽກໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/industrial_exhaust_fan_1787993439615.jpg',
    qty_on_hand: 336,
    unit_price: 59.01,
    specs: {'Brand': 'Bosch', 'Model': 'IND-9064', 'Size': 'Standard Fitment (34 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 51.31 },
      { min_qty: 50, price: 45.91 }
    ]
  },
  {
    sku_id: 'gen-2154',
    sku_code: 'AUTO-GEN-2154',
    barcode: '8855975851',
    part_name: 'Precision Electrode Holder',
    part_name_lo: 'ຄີມຈັບກຣາວ ພິເສດ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES precision electrode holder. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຄີມຈັບກຣາວ ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/inverter_welding_machine_1787993381339.jpg',
    qty_on_hand: 459,
    unit_price: 148.23,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-3684', 'Size': 'Standard Fitment (35 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 128.9 },
      { min_qty: 50, price: 115.33 }
    ]
  },
  {
    sku_id: 'gen-2155',
    sku_code: 'AUTO-GEN-2155',
    barcode: '8855926532',
    part_name: 'Elite Torque Wrench',
    part_name_lo: 'ແວ່ນຕານິລະໄພ ອຸດສາຫະກຳ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES elite torque wrench. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ແວ່ນຕານິລະໄພ ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/ev_charging_adapter_1787991437929.jpg',
    qty_on_hand: 60,
    unit_price: 27.83,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-1623', 'Size': 'Standard Fitment (47 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 24.2 },
      { min_qty: 50, price: 21.65 }
    ]
  },
  {
    sku_id: 'gen-2156',
    sku_code: 'AUTO-GEN-2156',
    barcode: '8851848774',
    part_name: 'Advanced Cooling Tower Fill',
    part_name_lo: 'ໜ້າກາກແອ ສຳລັບການຄ້າ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES advanced cooling tower fill. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໜ້າກາກແອ ສຳລັບການຄ້າ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/leapmotor_c11_filter_1787994899596.jpg',
    qty_on_hand: 185,
    unit_price: 187.75,
    specs: {'Brand': 'Parker', 'Model': 'IND-9080', 'Size': 'Standard Fitment (26 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 163.26 },
      { min_qty: 50, price: 146.07 }
    ]
  },
  {
    sku_id: 'gen-2157',
    sku_code: 'AUTO-GEN-2157',
    barcode: '8856978324',
    part_name: 'Performance EV AC Compressor',
    part_name_lo: 'ສະວິດໄລ່ໄຟແບັດເຕີຣີ ທົນທານ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES performance ev ac compressor. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສະວິດໄລ່ໄຟແບັດເຕີຣີ ທົນທານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/hydraulic_oil_drum_1787993185153.jpg',
    qty_on_hand: 150,
    unit_price: 192.26,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-4603', 'Size': 'Standard Fitment (2 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 167.18 },
      { min_qty: 50, price: 149.58 }
    ]
  },
  {
    sku_id: 'gen-2158',
    sku_code: 'AUTO-GEN-2158',
    barcode: '8855878173',
    part_name: 'Pro-Grade U-Bolt',
    part_name_lo: 'ນັອດກຽວໄມ້ ທົນທານ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES pro-grade u-bolt. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນັອດກຽວໄມ້ ທົນທານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/spill_containment_kit_1787995270912.jpg',
    qty_on_hand: 386,
    unit_price: 138.78,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-8561', 'Size': 'Standard Fitment (22 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 120.68 },
      { min_qty: 50, price: 107.98 }
    ]
  },
  {
    sku_id: 'gen-2159',
    sku_code: 'AUTO-GEN-2159',
    barcode: '8859718260',
    part_name: 'Elite Timing Belt',
    part_name_lo: 'ຢາງແທ່ນເຄື່ອງ ມາດຕະຖານ',
    category: 'Parts & Components',
    description: 'Gates FleetRunner heavy-duty timing belt for Toyota 1KD/2KD engines. Reinforced with HNBR and glass cord for a reliable 150,000km service interval.',
    description_lo: 'ສາຍພານທາມມິ່ງແທ້ Gates FleetRunner ສຳລັບລົດກະບະ Toyota 1KD/2KD (Vigo/Revo). ເສີມໃຍແກ້ວທົນທານສູງ ອາຍຸການໃຊ້ງານ 150,000 ກິໂລແມັດ.',
    image_url: '/images/catalog/real/modal_scrolled_view_1787944300936.png',
    qty_on_hand: 135,
    unit_price: 76.34,
    specs: {'Brand': 'Gates', 'Model': 'T321HD', 'Size': '153 Teeth, 32mm Width', 'Application': 'Toyota Hilux Vigo / Revo (1KD/2KD)'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 66.38 },
      { min_qty: 50, price: 59.39 }
    ]
  },
  {
    sku_id: 'gen-2160',
    sku_code: 'AUTO-GEN-2160',
    barcode: '8851909639',
    part_name: 'Compact Centrifugal Pump',
    part_name_lo: 'ປ້ຳຈຸ່ມ ຄວາມແມ່ນຍຳສູງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Grundfos NB series end-suction centrifugal pump. Cast iron body with a stainless steel impeller, powered by a highly efficient 7.5kW IE3 motor.',
    description_lo: 'ປ້ຳນ້ຳຫອຍໂຂ່ງ Grundfos ສາມາດຈ່າຍນ້ຳ 50 m³/h ທີ່ຄວາມສູງ 32 ແມັດ. ໃບພັດສະແຕນເລດ ພ້ອມມໍເຕີປະຢັດໄຟ IE3 7.5kW.',
    image_url: '/images/catalog/real/stretcher_board_1787994434376.jpg',
    qty_on_hand: 498,
    unit_price: 10.82,
    specs: {'Brand': 'Grundfos', 'Model': 'NB 50-200/219', 'Size': '50 m³/h @ 32m Head', 'Application': 'Factory Cooling Towers, HVAC'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 9.41 },
      { min_qty: 50, price: 8.42 }
    ]
  },
  {
    sku_id: 'gen-2161',
    sku_code: 'AUTO-GEN-2161',
    barcode: '8855450066',
    part_name: 'Compact Seal Kit',
    part_name_lo: 'ປ້ຳໄຮໂດຼລິກ ພຣີມຽມ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine NOK boom cylinder seal kit for Hitachi ZX200-3. Includes premium polyurethane rod seals and PTFE piston seals for a factory rebuild.',
    description_lo: 'ຊຸດຊີລກະບອກບູມແທ້ ຍີ່ຫໍ້ NOK ສຳລັບລົດຂຸດ Hitachi ZX200-3. ປະກອບດ້ວຍ ຊີລແກນ (PU) ແລະ ຊີລລູກສູບ (PTFE) ມາດຕະຖານໂຮງງານ.',
    image_url: '/images/catalog/real/jaecoo_j7_coolant_1787994876651.jpg',
    qty_on_hand: 436,
    unit_price: 81.62,
    specs: {'Brand': 'NOK', 'Model': 'Boom Cylinder Kit', 'Size': 'Standard Fit', 'Application': 'Hitachi ZX200-3 Boom Cylinder'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 70.97 },
      { min_qty: 50, price: 63.5 }
    ]
  },
  {
    sku_id: 'gen-2162',
    sku_code: 'AUTO-GEN-2162',
    barcode: '8853017435',
    part_name: 'Ultra Idler Wheel',
    part_name_lo: 'ບຸ້ງກີ໋ລົດຕັກ ສຳລັບການຄ້າ',
    category: 'Heavy Equipment & Machinery',
    description: 'Berco front idler assembly for CAT 320 excavators. Synthetic oil filled and sealed with lifetime floating seals for zero maintenance operation.',
    description_lo: 'ລໍ້ໄອເດີ້ໜ້າ Berco ແທ້ສຳລັບ CAT 320. ບັນຈຸນ້ຳມັນສັງເຄາະພາຍໃນ ພ້ອມຊີລກັນຝຸ່ນແບບ Floating Seal ໃຊ້ງານຍາວນານໂດຍບໍ່ຕ້ອງບຳລຸງຮັກສາ.',
    image_url: '/images/catalog/real/hydraulic_oil_1787994622684.jpg',
    qty_on_hand: 474,
    unit_price: 133.33,
    specs: {'Brand': 'Berco', 'Model': 'ID-CAT320', 'Size': 'Bimetal Bushing', 'Application': 'Caterpillar 320C/320D'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 115.94 },
      { min_qty: 50, price: 103.73 }
    ]
  },
  {
    sku_id: 'gen-2163',
    sku_code: 'AUTO-GEN-2163',
    barcode: '8856772390',
    part_name: 'Commercial Chiller Unit',
    part_name_lo: 'ພັດລົມລະບາຍຄວາມຮ້ອນ ລະດັບໂປຣ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES commercial chiller unit. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ພັດລົມລະບາຍຄວາມຮ້ອນ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/plywood_sheet_1787994500566.jpg',
    qty_on_hand: 382,
    unit_price: 32.2,
    specs: {'Brand': 'SKF', 'Model': 'IND-1024', 'Size': 'Standard Fitment (45 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 28.0 },
      { min_qty: 50, price: 25.05 }
    ]
  },
  {
    sku_id: 'gen-2164',
    sku_code: 'AUTO-GEN-2164',
    barcode: '8853995158',
    part_name: 'Rugged Pressure Washer',
    part_name_lo: 'ໄມ້ຖູພື້ນພ້ອມຖັງ ສຳລັບວຽກໜັກ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES rugged pressure washer. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໄມ້ຖູພື້ນພ້ອມຖັງ ສຳລັບວຽກໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/cut_resistant_gloves_1787992071532.jpg',
    qty_on_hand: 152,
    unit_price: 122.85,
    specs: {'Brand': 'Cummins', 'Model': 'IND-4234', 'Size': 'Standard Fitment (7 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 106.83 },
      { min_qty: 50, price: 95.59 }
    ]
  },
  {
    sku_id: 'gen-2165',
    sku_code: 'AUTO-GEN-2165',
    barcode: '8853784362',
    part_name: 'Performance Return Idler',
    part_name_lo: 'ຢາງກັນຝຸ່ນ ຄວາມແມ່ນຍຳສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES performance return idler. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຢາງກັນຝຸ່ນ ຄວາມແມ່ນຍຳສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_top_layout_1788007514358.png',
    qty_on_hand: 138,
    unit_price: 16.61,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-6802', 'Size': 'Standard Fitment (4 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 14.44 },
      { min_qty: 50, price: 12.92 }
    ]
  },
  {
    sku_id: 'gen-2166',
    sku_code: 'AUTO-GEN-2166',
    barcode: '8857515147',
    part_name: 'Commercial Transmission Fluid',
    part_name_lo: 'ນ້ຳມັນເຟືອງທ້າຍ ພຣີມຽມ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES commercial transmission fluid. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳມັນເຟືອງທ້າຍ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/diesel_generator_1787945358504.jpg',
    qty_on_hand: 95,
    unit_price: 12.41,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-5979', 'Size': 'Standard Fitment (44 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 10.79 },
      { min_qty: 50, price: 9.65 }
    ]
  },
  {
    sku_id: 'gen-2167',
    sku_code: 'AUTO-GEN-2167',
    barcode: '8859261656',
    part_name: 'Heavy Duty Mining Helmet',
    part_name_lo: 'ເບົ້າໂม่ຫີນ ພິເສດ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES heavy duty mining helmet. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເບົ້າໂม่ຫີນ ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_products_2_1788007493419.png',
    qty_on_hand: 479,
    unit_price: 118.99,
    specs: {'Brand': 'Berco', 'Model': 'IND-1758', 'Size': 'Standard Fitment (47 kg)', 'Application': 'Volvo Wheel Loaders'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 103.47 },
      { min_qty: 50, price: 92.58 }
    ]
  },
  {
    sku_id: 'gen-2168',
    sku_code: 'AUTO-GEN-2168',
    barcode: '8855280482',
    part_name: 'Rugged Metering Pump',
    part_name_lo: 'ບານວາວ ສຳລັບການຄ້າ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES rugged metering pump. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ບານວາວ ສຳລັບການຄ້າ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/solar_street_light_1787989940044.jpg',
    qty_on_hand: 28,
    unit_price: 142.47,
    specs: {'Brand': 'Parker', 'Model': 'IND-1172', 'Size': 'Standard Fitment (31 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 123.89 },
      { min_qty: 50, price: 110.85 }
    ]
  },
  {
    sku_id: 'gen-2169',
    sku_code: 'AUTO-GEN-2169',
    barcode: '8855683410',
    part_name: 'Commercial Timing Pulley',
    part_name_lo: 'ລູກກິ້ງຮອງຮັບ ຂັ້ນສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES commercial timing pulley. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກກິ້ງຮອງຮັບ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/cat_320_excavator_1787945334578.jpg',
    qty_on_hand: 256,
    unit_price: 67.22,
    specs: {'Brand': 'Cummins', 'Model': 'IND-7766', 'Size': 'Standard Fitment (11 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 58.45 },
      { min_qty: 50, price: 52.3 }
    ]
  },
  {
    sku_id: 'gen-2170',
    sku_code: 'AUTO-GEN-2170',
    barcode: '8855030359',
    part_name: 'Heavy Duty Camshaft',
    part_name_lo: 'ສາຍພານທາມມິ່ງ ຂະໜາດນ້ອຍ',
    category: 'Parts & Components',
    description: 'Genuine Caterpillar C15 ACERT camshaft. Manufactured from chilled cast iron with induction-hardened lobes for precise valve timing under heavy loads.',
    description_lo: 'ເພົາລູກບ້ຽວແທ້ Caterpillar ສຳລັບເຄື່ອງຈັກ CAT C15 ACERT. ເຫຼັກຫຼໍ່ແຂງພິເສດ ຊ່ວຍຄວບຄຸມຈັງຫວະວາວໄດ້ຢ່າງແມ່ນຍຳ ຮັບວຽກໜັກໄດ້ດີ.',
    image_url: '/images/catalog/real/aion_y_tire_1787994913656.jpg',
    qty_on_hand: 283,
    unit_price: 200.23,
    specs: {'Brand': 'Caterpillar', 'Model': '332-7231', 'Size': 'HRC 50, Chilled Cast Iron', 'Application': 'CAT C15 ACERT Engine'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 174.11 },
      { min_qty: 50, price: 155.79 }
    ]
  },
  {
    sku_id: 'gen-2171',
    sku_code: 'AUTO-GEN-2171',
    barcode: '8851453056',
    part_name: 'Ultra Steel Toe Boots',
    part_name_lo: 'ເກີບຫົວເຫຼັກ ຂັ້ນສູງ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES ultra steel toe boots. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເກີບຫົວເຫຼັກ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/rough_terrain_crane_1787987842267.jpg',
    qty_on_hand: 393,
    unit_price: 113.61,
    specs: {'Brand': 'Cummins', 'Model': 'IND-4911', 'Size': 'Standard Fitment (4 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 98.79 },
      { min_qty: 50, price: 88.39 }
    ]
  },
  {
    sku_id: 'gen-2172',
    sku_code: 'AUTO-GEN-2172',
    barcode: '8854908882',
    part_name: 'Commercial Cement Bag',
    part_name_lo: 'ສັງກະສີມຸງຫຼັງຄາ ຄວາມຈຸສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES commercial cement bag. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສັງກະສີມຸງຫຼັງຄາ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/safety_vest_1787989856050.jpg',
    qty_on_hand: 302,
    unit_price: 41.25,
    specs: {'Brand': 'Cummins', 'Model': 'IND-1014', 'Size': 'Standard Fitment (16 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 35.87 },
      { min_qty: 50, price: 32.09 }
    ]
  },
  {
    sku_id: 'gen-2173',
    sku_code: 'AUTO-GEN-2173',
    barcode: '8854762518',
    part_name: 'Ultra Evaporator Coil',
    part_name_lo: 'ນ້ຳຢາແອ ລະດັບໂປຣ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES ultra evaporator coil. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳຢາແອ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/modal_cat_flt_8800_1788006488735.png',
    qty_on_hand: 86,
    unit_price: 107.58,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-5992', 'Size': 'Standard Fitment (38 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 93.55 },
      { min_qty: 50, price: 83.71 }
    ]
  },
  {
    sku_id: 'gen-2174',
    sku_code: 'AUTO-GEN-2174',
    barcode: '8855710174',
    part_name: 'Pro-Grade Cutting Edge',
    part_name_lo: 'ໃບມີດຕັດ ສຸດຍອດ',
    category: 'Heavy Equipment & Machinery',
    description: 'BYG 30mm bolt-on cutting edge made from HB500 heat-treated boron steel. Offers superior wear resistance for wheel loader buckets.',
    description_lo: 'ໃບມີດຕັດລຸ່ມບຸ້ງກີ໋ BYG ໜາ 30mm ສຳລັບລົດຕັກ Volvo. ຜະລິດຈາກເຫຼັກໂບຣອນຊຸບແຂງ (HB500) ທົນທານຕໍ່ການສຶກຫຣໍໄດ້ດີເລີດ.',
    image_url: '/images/catalog/real/ear_muffs_1787986544646.jpg',
    qty_on_hand: 263,
    unit_price: 94.63,
    specs: {'Brand': 'BYG', 'Model': 'CE-HB500', 'Size': 'Thickness: 30mm', 'Application': 'Volvo L120F Wheel Loader'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 82.29 },
      { min_qty: 50, price: 73.63 }
    ]
  },
  {
    sku_id: 'gen-2175',
    sku_code: 'AUTO-GEN-2175',
    barcode: '8858307815',
    part_name: 'Elite Tourniquet',
    part_name_lo: 'ເຝືອກອ່ອນ ມາດຕະຖານ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES elite tourniquet. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຝືອກອ່ອນ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/linear_bearing_1787994608195.jpg',
    qty_on_hand: 294,
    unit_price: 18.26,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-2227', 'Size': 'Standard Fitment (24 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 15.88 },
      { min_qty: 50, price: 14.21 }
    ]
  },
  {
    sku_id: 'gen-2176',
    sku_code: 'AUTO-GEN-2176',
    barcode: '8856320133',
    part_name: 'Compact Ear Defenders',
    part_name_lo: 'ອຸປະກອນກັນຕົກ ຂັ້ນສູງ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES compact ear defenders. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ອຸປະກອນກັນຕົກ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/electric_forklift_modal_1787946311753.png',
    qty_on_hand: 129,
    unit_price: 22.05,
    specs: {'Brand': 'Parker', 'Model': 'IND-7803', 'Size': 'Standard Fitment (16 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 19.17 },
      { min_qty: 50, price: 17.15 }
    ]
  },
  {
    sku_id: 'gen-2177',
    sku_code: 'AUTO-GEN-2177',
    barcode: '8851099346',
    part_name: 'Heavy Duty PTC Heater',
    part_name_lo: 'ຮີດເຕີ PTC ມາດຕະຖານ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES heavy duty ptc heater. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຮີດເຕີ PTC ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/wheel_loader_1787987830274.jpg',
    qty_on_hand: 179,
    unit_price: 37.78,
    specs: {'Brand': 'Cummins', 'Model': 'IND-1310', 'Size': 'Standard Fitment (39 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 32.85 },
      { min_qty: 50, price: 29.39 }
    ]
  },
  {
    sku_id: 'gen-2178',
    sku_code: 'AUTO-GEN-2178',
    barcode: '8855024763',
    part_name: 'Standard Boom Lift (Rental)',
    part_name_lo: 'ລົດຂຸດນ້ອຍ (ເຊົ່າ) ຂັ້ນສູງ',
    category: 'Equipment Rental',
    description: 'Genuine OEM/OES standard boom lift (rental). Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລົດຂຸດນ້ອຍ (ເຊົ່າ) ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/initial_product_grid_1787945828255.png',
    qty_on_hand: 473,
    unit_price: 52.43,
    specs: {'Brand': 'Cummins', 'Model': 'IND-6672', 'Size': 'Standard Fitment (41 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 45.59 },
      { min_qty: 50, price: 40.79 }
    ]
  },
  {
    sku_id: 'gen-2179',
    sku_code: 'AUTO-GEN-2179',
    barcode: '8851046788',
    part_name: 'Pro-Grade Cabin Filter',
    part_name_lo: 'ນ້ຳຍາຫຼໍ່ເຢັນ ພິເສດ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES pro-grade cabin filter. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳຍາຫຼໍ່ເຢັນ ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/rubber_conveyor_belt_1787993338719.jpg',
    qty_on_hand: 246,
    unit_price: 14.59,
    specs: {'Brand': 'Cummins', 'Model': 'IND-8936', 'Size': 'Standard Fitment (25 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 12.69 },
      { min_qty: 50, price: 11.36 }
    ]
  },
  {
    sku_id: 'gen-2180',
    sku_code: 'AUTO-GEN-2180',
    barcode: '8857172708',
    part_name: 'Ultra Needle Roller Bearing',
    part_name_lo: 'ລູກປືນກັນຮຸນ ສຳລັບການຄ້າ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES ultra needle roller bearing. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກປືນກັນຮຸນ ສຳລັບການຄ້າ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/search_results_typing_1787945877099.png',
    qty_on_hand: 401,
    unit_price: 166.29,
    specs: {'Brand': 'SKF', 'Model': 'IND-4187', 'Size': 'Standard Fitment (31 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 144.6 },
      { min_qty: 50, price: 129.38 }
    ]
  },
  {
    sku_id: 'gen-2181',
    sku_code: 'AUTO-GEN-2181',
    barcode: '8853080176',
    part_name: 'Performance MC4 Connector',
    part_name_lo: 'ຂາຍຶດແຜງ ສຳລັບການຄ້າ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES performance mc4 connector. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຂາຍຶດແຜງ ສຳລັບການຄ້າ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/wire_rope_1787989880792.jpg',
    qty_on_hand: 236,
    unit_price: 79.94,
    specs: {'Brand': 'SKF', 'Model': 'IND-9032', 'Size': 'Standard Fitment (3 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 69.51 },
      { min_qty: 50, price: 62.19 }
    ]
  },
  {
    sku_id: 'gen-2182',
    sku_code: 'AUTO-GEN-2182',
    barcode: '8851301487',
    part_name: 'Pro-Grade Mantle and Bowl Liner',
    part_name_lo: 'ຕະແກງຄັດແຍກ ຂະໜາດນ້ອຍ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES pro-grade mantle and bowl liner. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຕະແກງຄັດແຍກ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/ev_tire_1787946554424.jpg',
    qty_on_hand: 55,
    unit_price: 38.26,
    specs: {'Brand': 'Komatsu', 'Model': 'IND-4166', 'Size': 'Standard Fitment (41 kg)', 'Application': 'CAT 320D / Komatsu PC200'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 33.27 },
      { min_qty: 50, price: 29.77 }
    ]
  },
  {
    sku_id: 'gen-2183',
    sku_code: 'AUTO-GEN-2183',
    barcode: '8855811588',
    part_name: 'Rugged Battery Cell',
    part_name_lo: 'DC-DC ຕົວແປງໄຟ ພິເສດ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES rugged battery cell. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ DC-DC ຕົວແປງໄຟ ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/icar_03_cable_1787994865682.jpg',
    qty_on_hand: 468,
    unit_price: 201.09,
    specs: {'Brand': 'Cummins', 'Model': 'IND-8996', 'Size': 'Standard Fitment (26 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 174.86 },
      { min_qty: 50, price: 156.45 }
    ]
  },
  {
    sku_id: 'gen-2184',
    sku_code: 'AUTO-GEN-2184',
    barcode: '8859632486',
    part_name: 'Heavy Duty Plasma Cutter Tip',
    part_name_lo: 'ຫົວຕັດພາດສະມ່າ ແບບໜັກ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES heavy duty plasma cutter tip. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫົວຕັດພາດສະມ່າ ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/fuel_filter_1787994647541.jpg',
    qty_on_hand: 473,
    unit_price: 194.96,
    specs: {'Brand': 'SKF', 'Model': 'IND-5423', 'Size': 'Standard Fitment (25 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 169.53 },
      { min_qty: 50, price: 151.68 }
    ]
  },
  {
    sku_id: 'gen-2185',
    sku_code: 'AUTO-GEN-2185',
    barcode: '8855199998',
    part_name: 'Precision Wood Screw',
    part_name_lo: 'ນັອດກຽວໄມ້ ຂັ້ນສູງ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES precision wood screw. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນັອດກຽວໄມ້ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/wuling_type2_cable_1787992189196.jpg',
    qty_on_hand: 433,
    unit_price: 49.15,
    specs: {'Brand': 'Parker', 'Model': 'IND-3043', 'Size': 'Standard Fitment (1 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 42.74 },
      { min_qty: 50, price: 38.24 }
    ]
  },
  {
    sku_id: 'gen-2186',
    sku_code: 'AUTO-GEN-2186',
    barcode: '8851615831',
    part_name: 'Rugged Brass Bushing',
    part_name_lo: 'ລູກປືນຕຸກກະຕາໝອນ ລະດັບໂປຣ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES rugged brass bushing. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກປືນຕຸກກະຕາໝອນ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/flange_bearing_1787994582910.jpg',
    qty_on_hand: 385,
    unit_price: 150.7,
    specs: {'Brand': 'Cummins', 'Model': 'IND-8033', 'Size': 'Standard Fitment (19 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 131.04 },
      { min_qty: 50, price: 117.25 }
    ]
  },
  {
    sku_id: 'gen-2187',
    sku_code: 'AUTO-GEN-2187',
    barcode: '8851961600',
    part_name: 'Ultra Solar Optimizer',
    part_name_lo: 'ຂາຍຶດແຜງ ພຣີມຽມ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES ultra solar optimizer. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຂາຍຶດແຜງ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/modal_brk_cer_990_specs_1788006668502.png',
    qty_on_hand: 304,
    unit_price: 179.6,
    specs: {'Brand': 'Cummins', 'Model': 'IND-2624', 'Size': 'Standard Fitment (30 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 156.17 },
      { min_qty: 50, price: 139.73 }
    ]
  },
  {
    sku_id: 'gen-2188',
    sku_code: 'AUTO-GEN-2188',
    barcode: '8851498116',
    part_name: 'Performance Steel Angle',
    part_name_lo: 'ຊີມັງຖົງ ມາດຕະຖານ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES performance steel angle. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຊີມັງຖົງ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/mining_otr_tire_1787986357627.jpg',
    qty_on_hand: 369,
    unit_price: 12.57,
    specs: {'Brand': 'Cummins', 'Model': 'IND-2568', 'Size': 'Standard Fitment (37 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 10.93 },
      { min_qty: 50, price: 9.78 }
    ]
  },
  {
    sku_id: 'gen-2189',
    sku_code: 'AUTO-GEN-2189',
    barcode: '8853582845',
    part_name: 'Heavy Duty Tungsten Bit',
    part_name_lo: 'ຫົວເຈາະຫີນ ທົນທານ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES heavy duty tungsten bit. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫົວເຈາະຫີນ ທົນທານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/first_aid_kit_1787987108475.jpg',
    qty_on_hand: 402,
    unit_price: 42.96,
    specs: {'Brand': 'ITR', 'Model': 'IND-2074', 'Size': 'Standard Fitment (25 kg)', 'Application': 'Volvo Wheel Loaders'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 37.36 },
      { min_qty: 50, price: 33.42 }
    ]
  },
  {
    sku_id: 'gen-2190',
    sku_code: 'AUTO-GEN-2190',
    barcode: '8857075860',
    part_name: 'Premium Coolant Premix',
    part_name_lo: 'ໄສ້ຕອງນ້ຳມັນເຊື້ອໄຟ ພຣີມຽມ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES premium coolant premix. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໄສ້ຕອງນ້ຳມັນເຊື້ອໄຟ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/safety_harness_1787987815266.jpg',
    qty_on_hand: 63,
    unit_price: 80.73,
    specs: {'Brand': 'SKF', 'Model': 'IND-5513', 'Size': 'Standard Fitment (38 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 70.2 },
      { min_qty: 50, price: 62.81 }
    ]
  },
  {
    sku_id: 'gen-2191',
    sku_code: 'AUTO-GEN-2191',
    barcode: '8857173494',
    part_name: 'Elite Check Valve',
    part_name_lo: 'ປ້ຳໄດອະແຟມ ທົນທານ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES elite check valve. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ປ້ຳໄດອະແຟມ ທົນທານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/ev_aux_battery_1787946538086.jpg',
    qty_on_hand: 436,
    unit_price: 172.36,
    specs: {'Brand': 'Parker', 'Model': 'IND-9707', 'Size': 'Standard Fitment (21 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 149.88 },
      { min_qty: 50, price: 134.11 }
    ]
  },
  {
    sku_id: 'gen-2192',
    sku_code: 'AUTO-GEN-2192',
    barcode: '8852548591',
    part_name: 'Rugged Seal Kit',
    part_name_lo: 'ສາຍໄຮໂດຼລິກ ພຣີມຽມ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine NOK boom cylinder seal kit for Hitachi ZX200-3. Includes premium polyurethane rod seals and PTFE piston seals for a factory rebuild.',
    description_lo: 'ຊຸດຊີລກະບອກບູມແທ້ ຍີ່ຫໍ້ NOK ສຳລັບລົດຂຸດ Hitachi ZX200-3. ປະກອບດ້ວຍ ຊີລແກນ (PU) ແລະ ຊີລລູກສູບ (PTFE) ມາດຕະຖານໂຮງງານ.',
    image_url: '/images/catalog/real/hydraulic_oil_1787987728754.jpg',
    qty_on_hand: 161,
    unit_price: 203.91,
    specs: {'Brand': 'NOK', 'Model': 'Boom Cylinder Kit', 'Size': 'Standard Fit', 'Application': 'Hitachi ZX200-3 Boom Cylinder'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 177.31 },
      { min_qty: 50, price: 158.65 }
    ]
  },
  {
    sku_id: 'gen-2193',
    sku_code: 'AUTO-GEN-2193',
    barcode: '8859906959',
    part_name: 'Performance DC-DC Converter',
    part_name_lo: 'ຕູ້ຊາດ EV ລະດັບໂປຣ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES performance dc-dc converter. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຕູ້ຊາດ EV ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/eye_wash_station_1787994359559.jpg',
    qty_on_hand: 456,
    unit_price: 83.34,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-2554', 'Size': 'Standard Fitment (41 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 72.47 },
      { min_qty: 50, price: 64.84 }
    ]
  },
  {
    sku_id: 'gen-2194',
    sku_code: 'AUTO-GEN-2194',
    barcode: '8856998336',
    part_name: 'Ultra Nylon Bushing',
    part_name_lo: 'ລູກປືນເຂັມ ແບບໜັກ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES ultra nylon bushing. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກປືນເຂັມ ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/forklift_modal_view_1787946266906.png',
    qty_on_hand: 450,
    unit_price: 192.99,
    specs: {'Brand': 'Bosch', 'Model': 'IND-9868', 'Size': 'Standard Fitment (24 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 167.82 },
      { min_qty: 50, price: 150.16 }
    ]
  },
  {
    sku_id: 'gen-2195',
    sku_code: 'AUTO-GEN-2195',
    barcode: '8855719339',
    part_name: 'Ultra HVAC Compressor EV',
    part_name_lo: 'ຮີດເຕີ PTC ປະສິດທິພາບສູງ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES ultra hvac compressor ev. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຮີດເຕີ PTC ປະສິດທິພາບສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_sidebar_view_1788007533329.png',
    qty_on_hand: 145,
    unit_price: 178.5,
    specs: {'Brand': 'Bosch', 'Model': 'IND-3493', 'Size': 'Standard Fitment (22 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 155.22 },
      { min_qty: 50, price: 138.88 }
    ]
  },
  {
    sku_id: 'gen-2196',
    sku_code: 'AUTO-GEN-2196',
    barcode: '8855623809',
    part_name: 'Performance Chiller Unit',
    part_name_lo: 'ເອັກສະແປນຊັນວາວ ອຸດສາຫະກຳ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES performance chiller unit. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເອັກສະແປນຊັນວາວ ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/engine_filter_1787945715120.jpg',
    qty_on_hand: 316,
    unit_price: 82.12,
    specs: {'Brand': 'SKF', 'Model': 'IND-7491', 'Size': 'Standard Fitment (41 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 71.41 },
      { min_qty: 50, price: 63.89 }
    ]
  },
  {
    sku_id: 'gen-2197',
    sku_code: 'AUTO-GEN-2197',
    barcode: '8851746083',
    part_name: 'Standard Cabin Filter',
    part_name_lo: 'ໄສ້ຕອງອາກາດ ພິເສດ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES standard cabin filter. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໄສ້ຕອງອາກາດ ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/centrifugal_pump_1787993426542.jpg',
    qty_on_hand: 207,
    unit_price: 81.99,
    specs: {'Brand': 'Bosch', 'Model': 'IND-6171', 'Size': 'Standard Fitment (40 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 71.3 },
      { min_qty: 50, price: 63.79 }
    ]
  },
  {
    sku_id: 'gen-2198',
    sku_code: 'AUTO-GEN-2198',
    barcode: '8855005028',
    part_name: 'Compact Mining Helmet',
    part_name_lo: 'ຫົວເຈາະຫີນ ຂັ້ນສູງ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES compact mining helmet. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫົວເຈາະຫີນ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/ev_charging_cable_1787946513020.jpg',
    qty_on_hand: 356,
    unit_price: 54.21,
    specs: {'Brand': 'CAT', 'Model': 'IND-3793', 'Size': 'Standard Fitment (32 kg)', 'Application': 'Volvo Wheel Loaders'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 47.14 },
      { min_qty: 50, price: 42.17 }
    ]
  },
  {
    sku_id: 'gen-2199',
    sku_code: 'AUTO-GEN-2199',
    barcode: '8858019395',
    part_name: 'High Capacity Relay',
    part_name_lo: 'ເທີມິນອລບັອກ ທົນທານ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES high capacity relay. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເທີມິນອລບັອກ ທົນທານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/product_grid_top_1787945833899.png',
    qty_on_hand: 309,
    unit_price: 58.63,
    specs: {'Brand': 'Bosch', 'Model': 'IND-4174', 'Size': 'Standard Fitment (10 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 50.98 },
      { min_qty: 50, price: 45.62 }
    ]
  },
  {
    sku_id: 'gen-2200',
    sku_code: 'AUTO-GEN-2200',
    barcode: '8857652337',
    part_name: 'Standard Lock Nut',
    part_name_lo: 'ນັອດກຽວຕະຫຼອດ ອຸດສາຫະກຳ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES standard lock nut. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນັອດກຽວຕະຫຼອດ ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/ev_cabin_filter_1787946526501.jpg',
    qty_on_hand: 261,
    unit_price: 92.87,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-6404', 'Size': 'Standard Fitment (14 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 80.76 },
      { min_qty: 50, price: 72.26 }
    ]
  },
  {
    sku_id: 'gen-2201',
    sku_code: 'AUTO-GEN-2201',
    barcode: '8859918137',
    part_name: 'Performance Hydraulic Hose',
    part_name_lo: 'ວາວຄວບຄຸມ ລະດັບໂປຣ',
    category: 'Hydraulics & Pneumatics',
    description: 'Gates MegaSys M2T two-wire braided hydraulic hose (SAE 100 R2AT). Highly flexible and abrasion-resistant, rated up to 215 Bar.',
    description_lo: 'ສາຍໄຮໂດຼລິກເສີມລວດ 2 ຊັ້ນ Gates MegaSys. ໂຄ້ງງໍໄດ້ດີ ທົນທານຕໍ່ການຂູດຂີດ ຮອງຮັບແຮງດັນເຮັດວຽກ 215 Bar ສຳລັບລົດຈົກ.',
    image_url: '/images/catalog/real/forklift_interior_1787945515932.jpg',
    qty_on_hand: 18,
    unit_price: 41.32,
    specs: {'Brand': 'Gates', 'Model': 'MegaSys M2T', 'Size': 'ID: 3/4 inch (19mm), 215 Bar', 'Application': 'Excavators, Mobile Cranes'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 35.93 },
      { min_qty: 50, price: 32.14 }
    ]
  },
  {
    sku_id: 'gen-2202',
    sku_code: 'AUTO-GEN-2202',
    barcode: '8854207040',
    part_name: 'Standard Air Hose',
    part_name_lo: 'ກະບອກລົມ ສຳລັບວຽກໜັກ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES standard air hose. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ກະບອກລົມ ສຳລັບວຽກໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/changan_brake_pads_1787992203831.jpg',
    qty_on_hand: 276,
    unit_price: 193.2,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-8188', 'Size': 'Standard Fitment (50 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 168.0 },
      { min_qty: 50, price: 150.32 }
    ]
  },
  {
    sku_id: 'gen-2203',
    sku_code: 'AUTO-GEN-2203',
    barcode: '8855362390',
    part_name: 'Rugged Idler Wheel',
    part_name_lo: 'ໃບມີດຕັດ ພຣີມຽມ',
    category: 'Heavy Equipment & Machinery',
    description: 'Berco front idler assembly for CAT 320 excavators. Synthetic oil filled and sealed with lifetime floating seals for zero maintenance operation.',
    description_lo: 'ລໍ້ໄອເດີ້ໜ້າ Berco ແທ້ສຳລັບ CAT 320. ບັນຈຸນ້ຳມັນສັງເຄາະພາຍໃນ ພ້ອມຊີລກັນຝຸ່ນແບບ Floating Seal ໃຊ້ງານຍາວນານໂດຍບໍ່ຕ້ອງບຳລຸງຮັກສາ.',
    image_url: '/images/catalog/real/roller_bearing_1787994554828.jpg',
    qty_on_hand: 471,
    unit_price: 8.73,
    specs: {'Brand': 'Berco', 'Model': 'ID-CAT320', 'Size': 'Bimetal Bushing', 'Application': 'Caterpillar 320C/320D'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 7.59 },
      { min_qty: 50, price: 6.79 }
    ]
  },
  {
    sku_id: 'gen-2204',
    sku_code: 'AUTO-GEN-2204',
    barcode: '8856516169',
    part_name: 'Commercial Terminal Block',
    part_name_lo: 'ເບກເກີ ຂະໜາດນ້ອຍ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES commercial terminal block. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເບກເກີ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/safety_helmet_1787989844162.jpg',
    qty_on_hand: 300,
    unit_price: 126.36,
    specs: {'Brand': 'SKF', 'Model': 'IND-2405', 'Size': 'Standard Fitment (26 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 109.88 },
      { min_qty: 50, price: 98.31 }
    ]
  },
  {
    sku_id: 'gen-2205',
    sku_code: 'AUTO-GEN-2205',
    barcode: '8858655184',
    part_name: 'Heavy-Spec Refrigerant Gas',
    part_name_lo: 'ເຄື່ອງທຳຄວາມເຢັນ Chiller ສຸດຍອດ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES heavy-spec refrigerant gas. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຄື່ອງທຳຄວາມເຢັນ Chiller ສຸດຍອດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/air_filter_1787994635974.jpg',
    qty_on_hand: 494,
    unit_price: 178.25,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-2339', 'Size': 'Standard Fitment (33 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 155.0 },
      { min_qty: 50, price: 138.68 }
    ]
  },
  {
    sku_id: 'gen-2206',
    sku_code: 'AUTO-GEN-2206',
    barcode: '8859882564',
    part_name: 'Heavy Duty Hydraulic Filter',
    part_name_lo: 'ບັອກວາວ ປະສິດທິພາບສູງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Donaldson return line hydraulic filter assembly. Uses a 10-micron absolute synthetic element to protect sensitive hydraulic components.',
    description_lo: 'ຊຸດກອງໄຮໂດຼລິກ Donaldson ຄວາມລະອຽດ 10 ໄມຄຣອນ. ໃຊ້ໄສ້ກອງໃຍສັງເຄາະ ເພື່ອປົກປ້ອງຊິ້ນສ່ວນໄຮໂດຼລິກທີ່ອ່ອນໄຫວພາຍໃນລະບົບ.',
    image_url: '/images/catalog/real/honda_ens1_brakes_1787994851547.jpg',
    qty_on_hand: 50,
    unit_price: 47.4,
    specs: {'Brand': 'Donaldson', 'Model': 'P164378', 'Size': '10 µm Absolute, 150 L/min', 'Application': 'General Hydraulic Reservoirs'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 41.22 },
      { min_qty: 50, price: 36.88 }
    ]
  },
  {
    sku_id: 'gen-2207',
    sku_code: 'AUTO-GEN-2207',
    barcode: '8852373106',
    part_name: 'Precision Onboard Charger',
    part_name_lo: 'ຕູ້ຊາດ EV ອຸດສາຫະກຳ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES precision onboard charger. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຕູ້ຊາດ EV ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/hydraulic_seal_kit_1787987741309.jpg',
    qty_on_hand: 178,
    unit_price: 72.3,
    specs: {'Brand': 'Cummins', 'Model': 'IND-7652', 'Size': 'Standard Fitment (16 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 62.87 },
      { min_qty: 50, price: 56.25 }
    ]
  },
  {
    sku_id: 'gen-2208',
    sku_code: 'AUTO-GEN-2208',
    barcode: '8856138555',
    part_name: 'Elite Solenoid Valve',
    part_name_lo: 'ປືນເປົ່າລົມ ພຣີມຽມ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES elite solenoid valve. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ປືນເປົ່າລົມ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/new_items_grid_1787988727833.png',
    qty_on_hand: 23,
    unit_price: 123.5,
    specs: {'Brand': 'Parker', 'Model': 'IND-4984', 'Size': 'Standard Fitment (21 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 107.39 },
      { min_qty: 50, price: 96.08 }
    ]
  },
  {
    sku_id: 'gen-2209',
    sku_code: 'AUTO-GEN-2209',
    barcode: '8855190734',
    part_name: 'Standard Industrial Degreaser',
    part_name_lo: 'ແຜ່ນຊັບນ້ຳມັນ ສຸດຍອດ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES standard industrial degreaser. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ແຜ່ນຊັບນ້ຳມັນ ສຸດຍອດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/bearing_set_1787989755742.jpg',
    qty_on_hand: 237,
    unit_price: 145.07,
    specs: {'Brand': 'Parker', 'Model': 'IND-8044', 'Size': 'Standard Fitment (17 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 126.15 },
      { min_qty: 50, price: 112.87 }
    ]
  },
  {
    sku_id: 'gen-2210',
    sku_code: 'AUTO-GEN-2210',
    barcode: '8855834366',
    part_name: 'Heavy Duty Check Valve',
    part_name_lo: 'ບານວາວ ປະສິດທິພາບສູງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES heavy duty check valve. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ບານວາວ ປະສິດທິພາບສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/industrial_contactor_1787995211966.jpg',
    qty_on_hand: 160,
    unit_price: 75.04,
    specs: {'Brand': 'Bosch', 'Model': 'IND-2951', 'Size': 'Standard Fitment (24 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 65.25 },
      { min_qty: 50, price: 58.38 }
    ]
  },
  {
    sku_id: 'gen-2211',
    sku_code: 'AUTO-GEN-2211',
    barcode: '8854503340',
    part_name: 'Compact Brake Fluid',
    part_name_lo: 'ນ້ຳມັນເຟືອງທ້າຍ ສຳລັບການຄ້າ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES compact brake fluid. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳມັນເຟືອງທ້າຍ ສຳລັບການຄ້າ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/safety_boots_1787992086683.jpg',
    qty_on_hand: 300,
    unit_price: 157.62,
    specs: {'Brand': 'Bosch', 'Model': 'IND-9466', 'Size': 'Standard Fitment (42 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 137.06 },
      { min_qty: 50, price: 122.63 }
    ]
  },
  {
    sku_id: 'gen-2212',
    sku_code: 'AUTO-GEN-2212',
    barcode: '8859919661',
    part_name: 'Standard Pressure Valve',
    part_name_lo: 'ວາວບັງຄັບທິດທາງ ພິເສດ',
    category: 'Hydraulics & Pneumatics',
    description: 'Bosch Rexroth DBW10 direct-acting pressure relief valve. Adjustable 50-315 Bar with a maximum flow capacity of 120 L/min.',
    description_lo: 'ວາວລະບາຍແຮງດັນ Bosch Rexroth ແທ້ (DBW10). ສາມາດປັບຕັ້ງໄດ້ 50-315 Bar ຮອງຮັບການໄຫຼ 120 L/min ຕອບສະໜອງໄວ.',
    image_url: '/images/catalog/real/product_grid_more_1787945844402.png',
    qty_on_hand: 153,
    unit_price: 168.81,
    specs: {'Brand': 'Bosch Rexroth', 'Model': 'DBW10', 'Size': 'G 3/4 inch, 120 L/min', 'Application': 'Industrial Hydraulic Power Units'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 146.79 },
      { min_qty: 50, price: 131.34 }
    ]
  },
  {
    sku_id: 'gen-2213',
    sku_code: 'AUTO-GEN-2213',
    barcode: '8856983911',
    part_name: 'Rugged Solenoid Valve',
    part_name_lo: 'ກະບອກລົມ ອຸດສາຫະກຳ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES rugged solenoid valve. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ກະບອກລົມ ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/v_belt_1787989743529.jpg',
    qty_on_hand: 170,
    unit_price: 189.11,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-8077', 'Size': 'Standard Fitment (10 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 164.44 },
      { min_qty: 50, price: 147.13 }
    ]
  },
  {
    sku_id: 'gen-2214',
    sku_code: 'AUTO-GEN-2214',
    barcode: '8859144512',
    part_name: 'Ultra Floor Scrubber',
    part_name_lo: 'ຖັງຂີ້ເຫຍື້ອ ພິເສດ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES ultra floor scrubber. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຖັງຂີ້ເຫຍື້ອ ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/bucket_cutting_edge_1787987787453.jpg',
    qty_on_hand: 241,
    unit_price: 3.61,
    specs: {'Brand': 'Parker', 'Model': 'IND-3819', 'Size': 'Standard Fitment (7 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 3.14 },
      { min_qty: 50, price: 2.81 }
    ]
  },
  {
    sku_id: 'gen-2215',
    sku_code: 'AUTO-GEN-2215',
    barcode: '8851384427',
    part_name: 'Advanced Chiller Unit',
    part_name_lo: 'ທໍ່ແອ ພິເສດ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES advanced chiller unit. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ທໍ່ແອ ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/honda_air_filter_1787991282848.jpg',
    qty_on_hand: 495,
    unit_price: 159.19,
    specs: {'Brand': 'Cummins', 'Model': 'IND-7539', 'Size': 'Standard Fitment (3 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 138.43 },
      { min_qty: 50, price: 123.86 }
    ]
  },
  {
    sku_id: 'gen-2216',
    sku_code: 'AUTO-GEN-2216',
    barcode: '8855601710',
    part_name: 'Industrial Diaphragm Pump',
    part_name_lo: 'ປ້ຳໄດອະແຟມ ຂັ້ນສູງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES industrial diaphragm pump. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ປ້ຳໄດອະແຟມ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/brake_pads_1787945576130.jpg',
    qty_on_hand: 78,
    unit_price: 108.03,
    specs: {'Brand': 'Cummins', 'Model': 'IND-2859', 'Size': 'Standard Fitment (22 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 93.94 },
      { min_qty: 50, price: 84.05 }
    ]
  },
  {
    sku_id: 'gen-2217',
    sku_code: 'AUTO-GEN-2217',
    barcode: '8856434690',
    part_name: 'Standard Chiller Unit',
    part_name_lo: 'ເຄື່ອງທຳຄວາມເຢັນ Chiller ອຸດສາຫະກຳ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES standard chiller unit. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຄື່ອງທຳຄວາມເຢັນ Chiller ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/build_error_page_1787943728324.png',
    qty_on_hand: 355,
    unit_price: 151.8,
    specs: {'Brand': 'SKF', 'Model': 'IND-3509', 'Size': 'Standard Fitment (17 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 132.0 },
      { min_qty: 50, price: 118.1 }
    ]
  },
  {
    sku_id: 'gen-2218',
    sku_code: 'AUTO-GEN-2218',
    barcode: '8851848037',
    part_name: 'Standard High Voltage Cable',
    part_name_lo: 'ຣີເລ EV ສຳລັບວຽກໜັກ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES standard high voltage cable. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຣີເລ EV ສຳລັບວຽກໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/byd_cabin_filter_1787992122987.jpg',
    qty_on_hand: 353,
    unit_price: 105.31,
    specs: {'Brand': 'Bosch', 'Model': 'IND-1393', 'Size': 'Standard Fitment (48 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 91.57 },
      { min_qty: 50, price: 81.93 }
    ]
  },
  {
    sku_id: 'gen-2219',
    sku_code: 'AUTO-GEN-2219',
    barcode: '8853924378',
    part_name: 'High Capacity Thrust Bearing',
    part_name_lo: 'ລູກປືນໜ້າແປນ ພຣີມຽມ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES high capacity thrust bearing. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກປືນໜ້າແປນ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/forklift_lift_1787945527846.jpg',
    qty_on_hand: 493,
    unit_price: 142.16,
    specs: {'Brand': 'Bosch', 'Model': 'IND-3683', 'Size': 'Standard Fitment (27 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 123.62 },
      { min_qty: 50, price: 110.61 }
    ]
  },
  {
    sku_id: 'gen-2220',
    sku_code: 'AUTO-GEN-2220',
    barcode: '8857486202',
    part_name: 'Pro-Grade Pneumatic Muffler',
    part_name_lo: 'ສາຍລົມ ປະສິດທິພາບສູງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES pro-grade pneumatic muffler. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສາຍລົມ ປະສິດທິພາບສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/product_1_specs_1788006986056.png',
    qty_on_hand: 50,
    unit_price: 50.02,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-5624', 'Size': 'Standard Fitment (25 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 43.5 },
      { min_qty: 50, price: 38.92 }
    ]
  },
  {
    sku_id: 'gen-2221',
    sku_code: 'AUTO-GEN-2221',
    barcode: '8854987907',
    part_name: 'Premium Traction Motor Rotor',
    part_name_lo: 'ໂຣເຕີມໍເຕີຂັບເຄື່ອນ ຂັ້ນສູງ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES premium traction motor rotor. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໂຣເຕີມໍເຕີຂັບເຄື່ອນ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/toyota_brake_pads_1787991270192.jpg',
    qty_on_hand: 477,
    unit_price: 98.61,
    specs: {'Brand': 'SKF', 'Model': 'IND-4728', 'Size': 'Standard Fitment (17 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 85.75 },
      { min_qty: 50, price: 76.72 }
    ]
  },
  {
    sku_id: 'gen-2222',
    sku_code: 'AUTO-GEN-2222',
    barcode: '8857232258',
    part_name: 'Rugged Thermal Pad',
    part_name_lo: 'ກ່ອງແບັດເຕີຣີ EV ລະດັບໂປຣ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES rugged thermal pad. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ກ່ອງແບັດເຕີຣີ EV ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_page_absolute_top_1787942806854.png',
    qty_on_hand: 316,
    unit_price: 161.3,
    specs: {'Brand': 'Cummins', 'Model': 'IND-1863', 'Size': 'Standard Fitment (39 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 140.26 },
      { min_qty: 50, price: 125.5 }
    ]
  },
  {
    sku_id: 'gen-2223',
    sku_code: 'AUTO-GEN-2223',
    barcode: '8854746179',
    part_name: 'High Capacity Lock Nut',
    part_name_lo: 'ພຸກເບັ່ງ ພຣີມຽມ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES high capacity lock nut. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ພຸກເບັ່ງ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/cpr_mask_1787994387768.jpg',
    qty_on_hand: 66,
    unit_price: 97.22,
    specs: {'Brand': 'Bosch', 'Model': 'IND-5666', 'Size': 'Standard Fitment (12 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 84.54 },
      { min_qty: 50, price: 75.64 }
    ]
  },
  {
    sku_id: 'gen-2224',
    sku_code: 'AUTO-GEN-2224',
    barcode: '8855334562',
    part_name: 'Commercial Hard Hat',
    part_name_lo: 'ບັອກລົມ ສຳລັບວຽກໜັກ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES commercial hard hat. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ບັອກລົມ ສຳລັບວຽກໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/centrifugal_pump_1787995245344.jpg',
    qty_on_hand: 265,
    unit_price: 205.01,
    specs: {'Brand': 'Cummins', 'Model': 'IND-9536', 'Size': 'Standard Fitment (29 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 178.27 },
      { min_qty: 50, price: 159.5 }
    ]
  },
  {
    sku_id: 'gen-2225',
    sku_code: 'AUTO-GEN-2225',
    barcode: '8851875800',
    part_name: 'Precision Grease Tube',
    part_name_lo: 'ຈາລະບີ ແບບໜັກ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES precision grease tube. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຈາລະບີ ແບບໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/safety_glasses_1787992054757.jpg',
    qty_on_hand: 374,
    unit_price: 15.26,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-4247', 'Size': 'Standard Fitment (24 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 13.27 },
      { min_qty: 50, price: 11.87 }
    ]
  },
  {
    sku_id: 'gen-2226',
    sku_code: 'AUTO-GEN-2226',
    barcode: '8858126376',
    part_name: 'Commercial V-Belt',
    part_name_lo: 'ຢາງປາດສາຍພານ ສຳລັບວຽກໜັກ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES commercial v-belt. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຢາງປາດສາຍພານ ສຳລັບວຽກໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/leapmotor_agm_battery_1787991358674.jpg',
    qty_on_hand: 498,
    unit_price: 116.92,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-3146', 'Size': 'Standard Fitment (47 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 101.67 },
      { min_qty: 50, price: 90.97 }
    ]
  },
  {
    sku_id: 'gen-2227',
    sku_code: 'AUTO-GEN-2227',
    barcode: '8854427519',
    part_name: 'Compact Tapered Roller Bearing',
    part_name_lo: 'ລູກປືນເຂັມ ຄວາມຈຸສູງ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES compact tapered roller bearing. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກປືນເຂັມ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/track_link_1787945633262.jpg',
    qty_on_hand: 95,
    unit_price: 26.51,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-1455', 'Size': 'Standard Fitment (34 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 23.05 },
      { min_qty: 50, price: 20.62 }
    ]
  },
  {
    sku_id: 'gen-2228',
    sku_code: 'AUTO-GEN-2228',
    barcode: '8859719789',
    part_name: 'Performance Contactor',
    part_name_lo: 'ໂມດູນ PLC ພຣີມຽມ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES performance contactor. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໂມດູນ PLC ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/toyota_bz4x_filter_1787994838401.jpg',
    qty_on_hand: 264,
    unit_price: 10.32,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-6299', 'Size': 'Standard Fitment (32 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 8.97 },
      { min_qty: 50, price: 8.02 }
    ]
  },
  {
    sku_id: 'gen-2229',
    sku_code: 'AUTO-GEN-2229',
    barcode: '8859428728',
    part_name: 'Industrial Air Hose',
    part_name_lo: 'ກະບອກລົມ ຄວາມຈຸສູງ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES industrial air hose. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ກະບອກລົມ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_initial_page_1788007481417.png',
    qty_on_hand: 91,
    unit_price: 195.44,
    specs: {'Brand': 'SKF', 'Model': 'IND-9765', 'Size': 'Standard Fitment (6 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 169.95 },
      { min_qty: 50, price: 152.06 }
    ]
  },
  {
    sku_id: 'gen-2230',
    sku_code: 'AUTO-GEN-2230',
    barcode: '8851230408',
    part_name: 'Performance Screen Mesh',
    part_name_lo: 'ຫົວເຈາະຫີນ ທົນທານ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES performance screen mesh. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫົວເຈາະຫີນ ທົນທານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/grade_8_bolts_1787995172620.jpg',
    qty_on_hand: 260,
    unit_price: 185.14,
    specs: {'Brand': 'Komatsu', 'Model': 'IND-1723', 'Size': 'Standard Fitment (20 kg)', 'Application': 'Mining Dump Trucks'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 160.99 },
      { min_qty: 50, price: 144.04 }
    ]
  },
  {
    sku_id: 'gen-2231',
    sku_code: 'AUTO-GEN-2231',
    barcode: '8859677871',
    part_name: 'Standard Pneumatic Muffler',
    part_name_lo: 'ຕົວປັບແຮງດັນລົມ ສຸດຍອດ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES standard pneumatic muffler. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຕົວປັບແຮງດັນລົມ ສຸດຍອດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/heavy_duty_bearing_1787993170025.jpg',
    qty_on_hand: 72,
    unit_price: 174.21,
    specs: {'Brand': 'Parker', 'Model': 'IND-8381', 'Size': 'Standard Fitment (48 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 151.49 },
      { min_qty: 50, price: 135.54 }
    ]
  },
  {
    sku_id: 'gen-2232',
    sku_code: 'AUTO-GEN-2232',
    barcode: '8853284186',
    part_name: 'Rugged Medical Gloves',
    part_name_lo: 'ຜ້າກັອດປອດເຊື້ອ ຂັ້ນສູງ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES rugged medical gloves. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຜ້າກັອດປອດເຊື້ອ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/diesel_engine_oil_1787987716108.jpg',
    qty_on_hand: 386,
    unit_price: 117.81,
    specs: {'Brand': 'Cummins', 'Model': 'IND-1698', 'Size': 'Standard Fitment (28 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 102.44 },
      { min_qty: 50, price: 91.66 }
    ]
  },
  {
    sku_id: 'gen-2233',
    sku_code: 'AUTO-GEN-2233',
    barcode: '8856485665',
    part_name: 'Compact Thermal Pad',
    part_name_lo: 'ສະວິດໄລ່ໄຟແບັດເຕີຣີ ລະດັບໂປຣ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES compact thermal pad. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສະວິດໄລ່ໄຟແບັດເຕີຣີ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_page_top_1787942795711.png',
    qty_on_hand: 457,
    unit_price: 81.83,
    specs: {'Brand': 'Parker', 'Model': 'IND-9944', 'Size': 'Standard Fitment (28 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 71.16 },
      { min_qty: 50, price: 63.67 }
    ]
  },
  {
    sku_id: 'gen-2234',
    sku_code: 'AUTO-GEN-2234',
    barcode: '8852440883',
    part_name: 'Heavy Duty Ground Clamp',
    part_name_lo: 'ຫົວຈອດ TIG ອຸດສາຫະກຳ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES heavy duty ground clamp. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫົວຈອດ TIG ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/forklift_main_1787945346855.jpg',
    qty_on_hand: 481,
    unit_price: 28.96,
    specs: {'Brand': 'SKF', 'Model': 'IND-2095', 'Size': 'Standard Fitment (10 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 25.18 },
      { min_qty: 50, price: 22.53 }
    ]
  },
  {
    sku_id: 'gen-2235',
    sku_code: 'AUTO-GEN-2235',
    barcode: '8853122019',
    part_name: 'Performance Troughing Idler',
    part_name_lo: 'ຕຽງຮັບແຮງກະແທກ ປະສິດທິພາບສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES performance troughing idler. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຕຽງຮັບແຮງກະແທກ ປະສິດທິພາບສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/lifepo4_battery_1787945655369.jpg',
    qty_on_hand: 328,
    unit_price: 111.69,
    specs: {'Brand': 'SKF', 'Model': 'IND-5103', 'Size': 'Standard Fitment (39 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 97.12 },
      { min_qty: 50, price: 86.9 }
    ]
  },
  {
    sku_id: 'gen-2236',
    sku_code: 'AUTO-GEN-2236',
    barcode: '8851444250',
    part_name: 'Elite High Voltage Cable',
    part_name_lo: 'ກ່ອງຄວບຄຸມມໍເຕີ ມາດຕະຖານ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES elite high voltage cable. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ກ່ອງຄວບຄຸມມໍເຕີ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/mg_12v_battery_1787992153571.jpg',
    qty_on_hand: 282,
    unit_price: 195.58,
    specs: {'Brand': 'Parker', 'Model': 'IND-8748', 'Size': 'Standard Fitment (40 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 170.07 },
      { min_qty: 50, price: 152.17 }
    ]
  },
  {
    sku_id: 'gen-2237',
    sku_code: 'AUTO-GEN-2237',
    barcode: '8851847436',
    part_name: 'Elite Track Chain',
    part_name_lo: 'ໂຣເລີ້ ສຳລັບວຽກໜັກ',
    category: 'Heavy Equipment & Machinery',
    description: 'Berco sealed and lubricated track (SALT) chain (49 links). Premium Italian manufacturing guarantees extended undercarriage life for Komatsu excavators.',
    description_lo: 'ໂສ້ແທຣັກ Berco (ອິຕາລີ) ແບບມີຊີລກັນນ້ຳມັນ 49 ຂໍ້ ສຳລັບລົດຂຸດ Komatsu PC200. ລະບົບຫຼໍ່ລື່ນພາຍໃນຊ່ວຍຍືດອາຍຸຊ່ວງລຸ່ມໄດ້ຫຼາຍເທົ່າຕົວ.',
    image_url: '/images/catalog/real/icar_cabin_filter_1787991309425.jpg',
    qty_on_hand: 69,
    unit_price: 169.02,
    specs: {'Brand': 'Berco', 'Model': 'CR5543', 'Size': '49 Links, Pitch: 216mm', 'Application': 'Komatsu PC200-8, PC220'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 146.97 },
      { min_qty: 50, price: 131.5 }
    ]
  },
  {
    sku_id: 'gen-2238',
    sku_code: 'AUTO-GEN-2238',
    barcode: '8855189455',
    part_name: 'Ultra Refrigerant Gas',
    part_name_lo: 'ເອັກສະແປນຊັນວາວ ພຣີມຽມ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES ultra refrigerant gas. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເອັກສະແປນຊັນວາວ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/industrial_grease_1787989730046.jpg',
    qty_on_hand: 25,
    unit_price: 3.12,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-5667', 'Size': 'Standard Fitment (25 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 2.71 },
      { min_qty: 50, price: 2.42 }
    ]
  },
  {
    sku_id: 'gen-2239',
    sku_code: 'AUTO-GEN-2239',
    barcode: '8851974148',
    part_name: 'Heavy Duty First Aid Bag',
    part_name_lo: 'ຜ້າກັອດປອດເຊື້ອ ລະດັບໂປຣ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES heavy duty first aid bag. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຜ້າກັອດປອດເຊື້ອ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/led_flood_light_1787989927255.jpg',
    qty_on_hand: 27,
    unit_price: 131.51,
    specs: {'Brand': 'Cummins', 'Model': 'IND-2767', 'Size': 'Standard Fitment (10 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 114.36 },
      { min_qty: 50, price: 102.32 }
    ]
  },
  {
    sku_id: 'gen-2240',
    sku_code: 'AUTO-GEN-2240',
    barcode: '8855410843',
    part_name: 'Ultra Antiseptic Wipes',
    part_name_lo: 'ນ້ຳຍາລ້າງຕາ ພິເສດ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES ultra antiseptic wipes. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳຍາລ້າງຕາ ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/air_compressor_1787995199402.jpg',
    qty_on_hand: 275,
    unit_price: 142.73,
    specs: {'Brand': 'Bosch', 'Model': 'IND-9878', 'Size': 'Standard Fitment (5 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 124.11 },
      { min_qty: 50, price: 111.05 }
    ]
  },
  {
    sku_id: 'gen-2241',
    sku_code: 'AUTO-GEN-2241',
    barcode: '8853897704',
    part_name: 'Performance High Voltage Cable',
    part_name_lo: 'ສາຍໄຟແຮງສູງ ພິເສດ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES performance high voltage cable. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສາຍໄຟແຮງສູງ ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/conveyor_belt_roll_1787995187053.jpg',
    qty_on_hand: 356,
    unit_price: 124.73,
    specs: {'Brand': 'Bosch', 'Model': 'IND-7857', 'Size': 'Standard Fitment (3 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 108.46 },
      { min_qty: 50, price: 97.04 }
    ]
  },
  {
    sku_id: 'gen-2242',
    sku_code: 'AUTO-GEN-2242',
    barcode: '8854418886',
    part_name: 'High Capacity Submersible Pump',
    part_name_lo: 'ເຊັກວາວ ພຣີມຽມ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES high capacity submersible pump. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຊັກວາວ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/neta_ev_tire_1787992165722.jpg',
    qty_on_hand: 154,
    unit_price: 6.09,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-3916', 'Size': 'Standard Fitment (18 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 5.3 },
      { min_qty: 50, price: 4.74 }
    ]
  },
  {
    sku_id: 'gen-2243',
    sku_code: 'AUTO-GEN-2243',
    barcode: '8852720385',
    part_name: 'Elite Wood Screw',
    part_name_lo: 'ນັອດຫົວຄຣິ່ງວົງກົມ ຄວາມຈຸສູງ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES elite wood screw. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນັອດຫົວຄຣິ່ງວົງກົມ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/modal_exc_trk_700_specs_1788006619191.png',
    qty_on_hand: 464,
    unit_price: 96.36,
    specs: {'Brand': 'Cummins', 'Model': 'IND-3634', 'Size': 'Standard Fitment (10 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 83.79 },
      { min_qty: 50, price: 74.97 }
    ]
  },
  {
    sku_id: 'gen-2244',
    sku_code: 'AUTO-GEN-2244',
    barcode: '8853335430',
    part_name: 'Commercial Gas Regulator',
    part_name_lo: 'ຄີມຈັບກຣາວ ພິເສດ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES commercial gas regulator. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຄີມຈັບກຣາວ ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/industrial_vacuum_cleaner_1787993454700.jpg',
    qty_on_hand: 444,
    unit_price: 26.51,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-8087', 'Size': 'Standard Fitment (28 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 23.05 },
      { min_qty: 50, price: 20.62 }
    ]
  },
  {
    sku_id: 'gen-2245',
    sku_code: 'AUTO-GEN-2245',
    barcode: '8859556513',
    part_name: 'Advanced Nylon Bushing',
    part_name_lo: 'ລູກປືນເຂັມ ທົນທານ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES advanced nylon bushing. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກປືນເຂັມ ທົນທານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/hydraulic_pump_1787945565960.jpg',
    qty_on_hand: 13,
    unit_price: 103.74,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-6563', 'Size': 'Standard Fitment (16 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 90.21 },
      { min_qty: 50, price: 80.71 }
    ]
  },
  {
    sku_id: 'gen-2246',
    sku_code: 'AUTO-GEN-2246',
    barcode: '8856797130',
    part_name: 'Commercial Ventilation Tube',
    part_name_lo: 'ຄາງກະໄຕເຄື່ອງໂม่ ຄວາມແມ່ນຍຳສູງ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES commercial ventilation tube. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຄາງກະໄຕເຄື່ອງໂม่ ຄວາມແມ່ນຍຳສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/modal_cat_flt_8800_specs_1788006501403.png',
    qty_on_hand: 493,
    unit_price: 49.42,
    specs: {'Brand': 'Komatsu', 'Model': 'IND-3692', 'Size': 'Standard Fitment (37 kg)', 'Application': 'CAT 320D / Komatsu PC200'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 42.97 },
      { min_qty: 50, price: 38.45 }
    ]
  },
  {
    sku_id: 'gen-2247',
    sku_code: 'AUTO-GEN-2247',
    barcode: '8853125455',
    part_name: 'Standard Steel Channel',
    part_name_lo: 'ນັ່ງຮ້ານ ມາດຕະຖານ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES standard steel channel. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນັ່ງຮ້ານ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/rubber_tracks_1787987801661.jpg',
    qty_on_hand: 268,
    unit_price: 35.45,
    specs: {'Brand': 'Bosch', 'Model': 'IND-1237', 'Size': 'Standard Fitment (20 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 30.83 },
      { min_qty: 50, price: 27.58 }
    ]
  },
  {
    sku_id: 'gen-2248',
    sku_code: 'AUTO-GEN-2248',
    barcode: '8859161625',
    part_name: 'Ultra Ball Bearing',
    part_name_lo: 'ລູກປືນເຕເປີ ແບບໜັກ',
    category: 'Parts & Components',
    description: 'Genuine SKF 6210-2RS deep groove ball bearing with C3 clearance. Rubber sealed on both sides and pre-lubricated with high-temperature grease.',
    description_lo: 'ລູກປືນກົມ SKF 6210-2RS ແທ້ (ໄລຍະຫ່າງ C3). ມີຊີລຢາງປິດທັງສອງດ້ານ ແລະ ບັນຈຸຈາລະບີທົນຄວາມຮ້ອນ ເໝາະສຳລັບມໍເຕີໄຟຟ້າຮອບຈັດ.',
    image_url: '/images/catalog/real/jaecoo_led_headlight_1787991324547.jpg',
    qty_on_hand: 262,
    unit_price: 182.78,
    specs: {'Brand': 'SKF', 'Model': '6210-2RS1/C3', 'Size': 'ID: 50, OD: 90, W: 20mm', 'Application': 'Industrial Electric Motors, Pumps'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 158.94 },
      { min_qty: 50, price: 142.21 }
    ]
  },
  {
    sku_id: 'gen-2249',
    sku_code: 'AUTO-GEN-2249',
    barcode: '8858987463',
    part_name: 'Heavy-Spec Screen Mesh',
    part_name_lo: 'ເບົ້າໂม่ຫີນ ຄວາມແມ່ນຍຳສູງ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES heavy-spec screen mesh. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເບົ້າໂม่ຫີນ ຄວາມແມ່ນຍຳສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/product_1_details_1788006980550.png',
    qty_on_hand: 478,
    unit_price: 162.5,
    specs: {'Brand': 'ITR', 'Model': 'IND-4574', 'Size': 'Standard Fitment (17 kg)', 'Application': 'CAT 320D / Komatsu PC200'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 141.3 },
      { min_qty: 50, price: 126.43 }
    ]
  },
  {
    sku_id: 'gen-2250',
    sku_code: 'AUTO-GEN-2250',
    barcode: '8854636442',
    part_name: 'Compact V-Belt',
    part_name_lo: 'ລູກກິ້ງຮູບຕົວວີ ທົນທານ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES compact v-belt. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກກິ້ງຮູບຕົວວີ ທົນທານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/hydraulic_valve_1787989831146.jpg',
    qty_on_hand: 68,
    unit_price: 153.74,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-9276', 'Size': 'Standard Fitment (50 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 133.69 },
      { min_qty: 50, price: 119.62 }
    ]
  },
  {
    sku_id: 'gen-2251',
    sku_code: 'AUTO-GEN-2251',
    barcode: '8854960922',
    part_name: 'Pro-Grade Spill Kit',
    part_name_lo: 'ແຜ່ນຊັບນ້ຳມັນ ລະດັບໂປຣ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES pro-grade spill kit. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ແຜ່ນຊັບນ້ຳມັນ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/first_product_hover_1787944260980.png',
    qty_on_hand: 257,
    unit_price: 82.57,
    specs: {'Brand': 'SKF', 'Model': 'IND-2390', 'Size': 'Standard Fitment (10 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 71.8 },
      { min_qty: 50, price: 64.24 }
    ]
  },
  {
    sku_id: 'gen-2252',
    sku_code: 'AUTO-GEN-2252',
    barcode: '8855116621',
    part_name: 'Heavy-Spec Rock Drill Bit',
    part_name_lo: 'ທໍ່ລະບາຍອາກາດ ຄວາມແມ່ນຍຳສູງ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES heavy-spec rock drill bit. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ທໍ່ລະບາຍອາກາດ ຄວາມແມ່ນຍຳສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/safety_shoes_fb_1787986500590.jpg',
    qty_on_hand: 450,
    unit_price: 3.92,
    specs: {'Brand': 'ITR', 'Model': 'IND-3568', 'Size': 'Standard Fitment (23 kg)', 'Application': 'Volvo Wheel Loaders'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 3.41 },
      { min_qty: 50, price: 3.05 }
    ]
  },
  {
    sku_id: 'gen-2253',
    sku_code: 'AUTO-GEN-2253',
    barcode: '8856515898',
    part_name: 'Elite Drill Rod',
    part_name_lo: 'ລູກກິ້ງສາຍພານ ພຣີມຽມ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES elite drill rod. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກກິ້ງສາຍພານ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/air_compressor_1787989769249.jpg',
    qty_on_hand: 262,
    unit_price: 89.49,
    specs: {'Brand': 'Berco', 'Model': 'IND-5029', 'Size': 'Standard Fitment (14 kg)', 'Application': 'CAT 320D / Komatsu PC200'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 77.82 },
      { min_qty: 50, price: 69.63 }
    ]
  },
  {
    sku_id: 'gen-2254',
    sku_code: 'AUTO-GEN-2254',
    barcode: '8855552239',
    part_name: 'Precision Indicator Light',
    part_name_lo: 'ໂມດູນ PLC ຂະໜາດນ້ອຍ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES precision indicator light. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໂມດູນ PLC ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/modal_cat_flt_8800_specs_1788006801075.png',
    qty_on_hand: 411,
    unit_price: 39.66,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-3496', 'Size': 'Standard Fitment (38 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 34.49 },
      { min_qty: 50, price: 30.86 }
    ]
  },
  {
    sku_id: 'gen-2255',
    sku_code: 'AUTO-GEN-2255',
    barcode: '8852879066',
    part_name: 'Elite Linear Guide Block',
    part_name_lo: 'ລາງເລື່ອນເສັ້ນກົງ ຄວາມຈຸສູງ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES elite linear guide block. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລາງເລື່ອນເສັ້ນກົງ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/transmission_fluid_1787994722473.jpg',
    qty_on_hand: 299,
    unit_price: 168.31,
    specs: {'Brand': 'SKF', 'Model': 'IND-1816', 'Size': 'Standard Fitment (6 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 146.36 },
      { min_qty: 50, price: 130.96 }
    ]
  },
  {
    sku_id: 'gen-2256',
    sku_code: 'AUTO-GEN-2256',
    barcode: '8859755942',
    part_name: 'Heavy-Spec Hard Hat',
    part_name_lo: 'ເກີບຫົວເຫຼັກ ສຳລັບວຽກໜັກ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES heavy-spec hard hat. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເກີບຫົວເຫຼັກ ສຳລັບວຽກໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/modal_hyd_pmp_550_specs_1788006553851.png',
    qty_on_hand: 337,
    unit_price: 198.5,
    specs: {'Brand': 'Cummins', 'Model': 'IND-4366', 'Size': 'Standard Fitment (6 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 172.61 },
      { min_qty: 50, price: 154.44 }
    ]
  },
  {
    sku_id: 'gen-2257',
    sku_code: 'AUTO-GEN-2257',
    barcode: '8856275311',
    part_name: 'Performance Hydraulic Pump',
    part_name_lo: 'ປ້ຳໄຮໂດຼລິກ ພຣີມຽມ',
    category: 'Hydraulics & Pneumatics',
    description: 'Kawasaki K3V112DT axial piston pump. The industry standard dual main pump for 20-ton class excavators, delivering reliable power up to 343 Bar.',
    description_lo: 'ປ້ຳໄຮໂດຼລິກຫຼັກ Kawasaki K3V112DT (ປ້ຳນິ້ວ). ມາດຕະຖານໂຮງງານສຳລັບລົດຂຸດ 20 ໂຕນ (PC200, 320D) ສ້າງແຮງດັນ 343 Bar.',
    image_url: '/images/catalog/real/modal_cat_flt_8800_viewport_1788006492943.png',
    qty_on_hand: 400,
    unit_price: 106.48,
    specs: {'Brand': 'Kawasaki', 'Model': 'K3V112DT', 'Size': '112 cc/rev, 343 Bar', 'Application': 'Komatsu PC200-8, CAT 320D'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 92.59 },
      { min_qty: 50, price: 82.85 }
    ]
  },
  {
    sku_id: 'gen-2258',
    sku_code: 'AUTO-GEN-2258',
    barcode: '8851652152',
    part_name: 'Performance Grease Tube',
    part_name_lo: 'ນ້ຳມັນໄຮໂດຼລິກ ISO 46 ສຳລັບການຄ້າ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES performance grease tube. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳມັນໄຮໂດຼລິກ ISO 46 ສຳລັບການຄ້າ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/burn_kit_1787994421467.jpg',
    qty_on_hand: 431,
    unit_price: 175.21,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-4893', 'Size': 'Standard Fitment (30 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 152.36 },
      { min_qty: 50, price: 136.32 }
    ]
  },
  {
    sku_id: 'gen-2259',
    sku_code: 'AUTO-GEN-2259',
    barcode: '8856453890',
    part_name: 'Compact Slurry Pump',
    part_name_lo: 'ຫົວເຈາະທັງສະເຕນ ທົນທານ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES compact slurry pump. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫົວເຈາະທັງສະເຕນ ທົນທານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/thrust_bearing_1787994570116.jpg',
    qty_on_hand: 74,
    unit_price: 176.64,
    specs: {'Brand': 'CAT', 'Model': 'IND-8879', 'Size': 'Standard Fitment (32 kg)', 'Application': 'CAT 320D / Komatsu PC200'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 153.6 },
      { min_qty: 50, price: 137.43 }
    ]
  },
  {
    sku_id: 'gen-2260',
    sku_code: 'AUTO-GEN-2260',
    barcode: '8858464712',
    part_name: 'Performance AC Compressor',
    part_name_lo: 'ພັດລົມລະບາຍຄວາມຮ້ອນ ຄວາມແມ່ນຍຳສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES performance ac compressor. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ພັດລົມລະບາຍຄວາມຮ້ອນ ຄວາມແມ່ນຍຳສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/ibeam_steel_1787994462788.jpg',
    qty_on_hand: 236,
    unit_price: 112.77,
    specs: {'Brand': 'Bosch', 'Model': 'IND-8422', 'Size': 'Standard Fitment (18 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 98.06 },
      { min_qty: 50, price: 87.74 }
    ]
  },
  {
    sku_id: 'gen-2261',
    sku_code: 'AUTO-GEN-2261',
    barcode: '8858753817',
    part_name: 'Commercial Roofing Sheet',
    part_name_lo: 'ນັ່ງຮ້ານ ທົນທານ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES commercial roofing sheet. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນັ່ງຮ້ານ ທົນທານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/arcfox_alpha_fluid_1787994887698.jpg',
    qty_on_hand: 185,
    unit_price: 119.24,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-9632', 'Size': 'Standard Fitment (28 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 103.69 },
      { min_qty: 50, price: 92.78 }
    ]
  },
  {
    sku_id: 'gen-2262',
    sku_code: 'AUTO-GEN-2262',
    barcode: '8856109087',
    part_name: 'Performance Indicator Light',
    part_name_lo: 'ໂມດູນ PLC ມາດຕະຖານ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES performance indicator light. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ໂມດູນ PLC ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/industrial_chiller_1787995257600.jpg',
    qty_on_hand: 367,
    unit_price: 168.61,
    specs: {'Brand': 'Cummins', 'Model': 'IND-8300', 'Size': 'Standard Fitment (14 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 146.62 },
      { min_qty: 50, price: 131.19 }
    ]
  },
  {
    sku_id: 'gen-2263',
    sku_code: 'AUTO-GEN-2263',
    barcode: '8853999690',
    part_name: 'Precision Drill Rod',
    part_name_lo: 'ຫົວເຈາະທັງສະເຕນ ປະສິດທິພາບສູງ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES precision drill rod. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຫົວເຈາະທັງສະເຕນ ປະສິດທິພາບສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/mig_welding_wire_1787995228846.jpg',
    qty_on_hand: 222,
    unit_price: 42.48,
    specs: {'Brand': 'Berco', 'Model': 'IND-9372', 'Size': 'Standard Fitment (2 kg)', 'Application': 'Mining Dump Trucks'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 36.94 },
      { min_qty: 50, price: 33.05 }
    ]
  },
  {
    sku_id: 'gen-2264',
    sku_code: 'AUTO-GEN-2264',
    barcode: '8859028095',
    part_name: 'Premium Bucket Pin',
    part_name_lo: 'ໂສ້ແທຣັກ ຄວາມແມ່ນຍຳສູງ',
    category: 'Heavy Equipment & Machinery',
    description: 'KTS 80mm bucket pin machined from 42CrMo alloy steel. High-frequency quenched to resist extreme bending and shearing forces in rock digging.',
    description_lo: 'ສະຫຼັກບຸ້ງກີ໋ KTS ຂະໜາດ 80mm ຍາວ 450mm ຜະລິດຈາກເຫຼັກ 42CrMo. ຊຸບແຂງຜິວນອກແຕ່ແກນກາງໜຽວ ເພື່ອທົນທານຕໍ່ແຮງຕັດຂາດ.',
    image_url: '/images/catalog/real/first_aid_cabinet_1787987096264.jpg',
    qty_on_hand: 180,
    unit_price: 120.5,
    specs: {'Brand': 'KTS', 'Model': 'BP-80X450', 'Size': 'Dia: 80mm, L: 450mm', 'Application': 'Standard 20-Ton Class Buckets'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 104.78 },
      { min_qty: 50, price: 93.75 }
    ]
  },
  {
    sku_id: 'gen-2265',
    sku_code: 'AUTO-GEN-2265',
    barcode: '8855517936',
    part_name: 'Heavy Duty Solar Optimizer',
    part_name_lo: 'ຂໍ້ຕໍ່ MC4 ຂະໜາດນ້ອຍ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES heavy duty solar optimizer. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຂໍ້ຕໍ່ MC4 ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_page_view_1787944254540.png',
    qty_on_hand: 341,
    unit_price: 23.79,
    specs: {'Brand': 'SKF', 'Model': 'IND-2903', 'Size': 'Standard Fitment (22 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 20.69 },
      { min_qty: 50, price: 18.51 }
    ]
  },
  {
    sku_id: 'gen-2266',
    sku_code: 'AUTO-GEN-2266',
    barcode: '8859997421',
    part_name: 'Pro-Grade Scaffolding Frame',
    part_name_lo: 'ແຜ່ນກັນຊຶມ ຂະໜາດນ້ອຍ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES pro-grade scaffolding frame. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ແຜ່ນກັນຊຶມ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/nitrile_gloves_1787986515132.jpg',
    qty_on_hand: 187,
    unit_price: 161.31,
    specs: {'Brand': 'SKF', 'Model': 'IND-8096', 'Size': 'Standard Fitment (13 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 140.27 },
      { min_qty: 50, price: 125.5 }
    ]
  },
  {
    sku_id: 'gen-2267',
    sku_code: 'AUTO-GEN-2267',
    barcode: '8852990667',
    part_name: 'Standard Generators 100kVA (Rental)',
    part_name_lo: 'ເຄື່ອງປ້ຳລົມ (ເຊົ່າ) ທົນທານ',
    category: 'Equipment Rental',
    description: 'Genuine OEM/OES standard generators 100kva (rental). Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຄື່ອງປ້ຳລົມ (ເຊົ່າ) ທົນທານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/portland_cement_bag_1787993158262.jpg',
    qty_on_hand: 192,
    unit_price: 58.63,
    specs: {'Brand': 'Cummins', 'Model': 'IND-3263', 'Size': 'Standard Fitment (35 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 50.98 },
      { min_qty: 50, price: 45.61 }
    ]
  },
  {
    sku_id: 'gen-2268',
    sku_code: 'AUTO-GEN-2268',
    barcode: '8853878667',
    part_name: 'Precision Contactor',
    part_name_lo: 'ດອກໄຟສັນຍານ ຂັ້ນສູງ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES precision contactor. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ດອກໄຟສັນຍານ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/truck_battery_1787987701312.jpg',
    qty_on_hand: 470,
    unit_price: 32.4,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-8962', 'Size': 'Standard Fitment (49 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 28.17 },
      { min_qty: 50, price: 25.2 }
    ]
  },
  {
    sku_id: 'gen-2269',
    sku_code: 'AUTO-GEN-2269',
    barcode: '8852559556',
    part_name: 'Rugged Crusher Jaw',
    part_name_lo: 'ຄາງກະໄຕເຄື່ອງໂม่ ສຳລັບວຽກໜັກ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES rugged crusher jaw. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຄາງກະໄຕເຄື່ອງໂม่ ສຳລັບວຽກໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/trauma_kit_1787994372278.jpg',
    qty_on_hand: 195,
    unit_price: 148.75,
    specs: {'Brand': 'CAT', 'Model': 'IND-1482', 'Size': 'Standard Fitment (4 kg)', 'Application': 'Mining Dump Trucks'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 129.35 },
      { min_qty: 50, price: 115.73 }
    ]
  },
  {
    sku_id: 'gen-2270',
    sku_code: 'AUTO-GEN-2270',
    barcode: '8859308804',
    part_name: 'Advanced Scaffolding Frame',
    part_name_lo: 'ເຫຼັກເສັ້ນ 16mm ປະສິດທິພາບສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES advanced scaffolding frame. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຫຼັກເສັ້ນ 16mm ປະສິດທິພາບສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/forklift_wheel_1787945554947.jpg',
    qty_on_hand: 410,
    unit_price: 138.75,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-7903', 'Size': 'Standard Fitment (27 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 120.65 },
      { min_qty: 50, price: 107.95 }
    ]
  },
  {
    sku_id: 'gen-2271',
    sku_code: 'AUTO-GEN-2271',
    barcode: '8857590084',
    part_name: 'Elite Industrial Degreaser',
    part_name_lo: 'ລົດເຂັນທຳຄວາມສະອາດ ຄວາມແມ່ນຍຳສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES elite industrial degreaser. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລົດເຂັນທຳຄວາມສະອາດ ຄວາມແມ່ນຍຳສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/specs_table_1787943984002.png',
    qty_on_hand: 134,
    unit_price: 4.27,
    specs: {'Brand': 'Cummins', 'Model': 'IND-6407', 'Size': 'Standard Fitment (32 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 3.71 },
      { min_qty: 50, price: 3.32 }
    ]
  },
  {
    sku_id: 'gen-2272',
    sku_code: 'AUTO-GEN-2272',
    barcode: '8853042638',
    part_name: 'Rugged Solar Panel 400W',
    part_name_lo: 'ອິນເວີເຕີອອຟກິດ ສຸດຍອດ',
    category: 'EV & Electrical Systems',
    description: 'Jinko Solar Tiger Pro 400W Monocrystalline PERC panel. Features half-cell technology for higher efficiency and superior shading tolerance.',
    description_lo: 'ແຜງໂຊລ່າເຊວ Jinko Solar 400W ຊະນິດ Monocrystalline PERC (Half-cell). ໃຫ້ປະສິດທິພາບສູງເຖິງ 21.3% ເໝາະສຳລັບຕິດຕັ້ງເທິງຫຼັງຄາໂຮງງານ.',
    image_url: '/images/catalog/real/forklift_side_1787945419504.jpg',
    qty_on_hand: 187,
    unit_price: 30.44,
    specs: {'Brand': 'Jinko Solar', 'Model': 'Tiger Pro 54HC', 'Size': '1722x1134x30mm, 21.3% Eff', 'Application': 'Industrial & Commercial Rooftops'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 26.47 },
      { min_qty: 50, price: 23.68 }
    ]
  },
  {
    sku_id: 'gen-2273',
    sku_code: 'AUTO-GEN-2273',
    barcode: '8856121470',
    part_name: 'Advanced Timing Belt',
    part_name_lo: 'ໄດຊາດ ລະດັບໂປຣ',
    category: 'Parts & Components',
    description: 'Gates FleetRunner heavy-duty timing belt for Toyota 1KD/2KD engines. Reinforced with HNBR and glass cord for a reliable 150,000km service interval.',
    description_lo: 'ສາຍພານທາມມິ່ງແທ້ Gates FleetRunner ສຳລັບລົດກະບະ Toyota 1KD/2KD (Vigo/Revo). ເສີມໃຍແກ້ວທົນທານສູງ ອາຍຸການໃຊ້ງານ 150,000 ກິໂລແມັດ.',
    image_url: '/images/catalog/real/readymix_concrete_1787994475610.jpg',
    qty_on_hand: 384,
    unit_price: 56.45,
    specs: {'Brand': 'Gates', 'Model': 'T321HD', 'Size': '153 Teeth, 32mm Width', 'Application': 'Toyota Hilux Vigo / Revo (1KD/2KD)'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 49.09 },
      { min_qty: 50, price: 43.92 }
    ]
  },
  {
    sku_id: 'gen-2274',
    sku_code: 'AUTO-GEN-2274',
    barcode: '8853610198',
    part_name: 'Compact Mini Excavator (Rental)',
    part_name_lo: 'ເສົາໄຟເຍືອງທາງ (ເຊົ່າ) ອຸດສາຫະກຳ',
    category: 'Equipment Rental',
    description: 'Genuine OEM/OES compact mini excavator (rental). Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເສົາໄຟເຍືອງທາງ (ເຊົ່າ) ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/coolant_1787994663953.jpg',
    qty_on_hand: 311,
    unit_price: 192.38,
    specs: {'Brand': 'Cummins', 'Model': 'IND-8298', 'Size': 'Standard Fitment (23 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 167.29 },
      { min_qty: 50, price: 149.68 }
    ]
  },
  {
    sku_id: 'gen-2275',
    sku_code: 'AUTO-GEN-2275',
    barcode: '8853645882',
    part_name: 'Compact Eye Wash Solution',
    part_name_lo: 'ຜ້າເຊັດຂ້າເຊື້ອ ຄວາມແມ່ນຍຳສູງ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES compact eye wash solution. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຜ້າເຊັດຂ້າເຊື້ອ ຄວາມແມ່ນຍຳສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/air_compressor_1787993354213.jpg',
    qty_on_hand: 355,
    unit_price: 38.36,
    specs: {'Brand': 'Bosch', 'Model': 'IND-9888', 'Size': 'Standard Fitment (29 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 33.36 },
      { min_qty: 50, price: 29.85 }
    ]
  },
  {
    sku_id: 'gen-2276',
    sku_code: 'AUTO-GEN-2276',
    barcode: '8851986845',
    part_name: 'Advanced Dozer Blade',
    part_name_lo: 'ໃບມີດຕັດ ສຸດຍອດ',
    category: 'Heavy Equipment & Machinery',
    description: 'Reversible boron steel cutting edge for CAT D8T semi-U blades. Heat-treated to HB500 for double the service life in abrasive material.',
    description_lo: 'ໃບມີດລົດດຸດ CAT D8T (Semi-U). ຜະລິດຈາກເຫຼັກໂບຣອນຊຸບແຂງ HB500 ສາມາດສະຫຼັບດ້ານໃຊ້ງານໄດ້ ຊ່ວຍຍືດອາຍຸການໃຊ້ງານເຖິງ 2 ເທົ່າ.',
    image_url: '/images/catalog/real/safety_goggles_1787986528762.jpg',
    qty_on_hand: 49,
    unit_price: 157.06,
    specs: {'Brand': 'Caterpillar', 'Model': 'D8T SU-Blade Edge', 'Size': 'Thickness: 25mm', 'Application': 'CAT D8T Bulldozer'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 136.57 },
      { min_qty: 50, price: 122.19 }
    ]
  },
  {
    sku_id: 'gen-2277',
    sku_code: 'AUTO-GEN-2277',
    barcode: '8859714944',
    part_name: 'Compact DC-DC Converter',
    part_name_lo: 'ຣີເລ EV ພິເສດ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES compact dc-dc converter. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຣີເລ EV ພິເສດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/mining_slurry_pump_1787986331620.jpg',
    qty_on_hand: 233,
    unit_price: 63.39,
    specs: {'Brand': 'Bosch', 'Model': 'IND-3399', 'Size': 'Standard Fitment (28 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 55.12 },
      { min_qty: 50, price: 49.31 }
    ]
  },
  {
    sku_id: 'gen-2278',
    sku_code: 'AUTO-GEN-2278',
    barcode: '8852168030',
    part_name: 'Heavy Duty Impact Bed',
    part_name_lo: 'ມູເລ້ທາມມິ່ງ ຂະໜາດນ້ອຍ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES heavy duty impact bed. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ມູເລ້ທາມມິ່ງ ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/welding_machine_1787945607244.jpg',
    qty_on_hand: 150,
    unit_price: 200.12,
    specs: {'Brand': 'Cummins', 'Model': 'IND-4801', 'Size': 'Standard Fitment (39 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 174.02 },
      { min_qty: 50, price: 155.7 }
    ]
  },
  {
    sku_id: 'gen-2279',
    sku_code: 'AUTO-GEN-2279',
    barcode: '8857928047',
    part_name: 'Compact Mantle and Bowl Liner',
    part_name_lo: 'ຄາງກະໄຕເຄື່ອງໂม่ ປະສິດທິພາບສູງ',
    category: 'Heavy Equipment & Machinery',
    description: 'Genuine OEM/OES compact mantle and bowl liner. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຄາງກະໄຕເຄື່ອງໂม่ ປະສິດທິພາບສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/search_results_forklift_1787945902300.png',
    qty_on_hand: 305,
    unit_price: 126.67,
    specs: {'Brand': 'Komatsu', 'Model': 'IND-9027', 'Size': 'Standard Fitment (33 kg)', 'Application': 'Volvo Wheel Loaders'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 110.15 },
      { min_qty: 50, price: 98.55 }
    ]
  },
  {
    sku_id: 'gen-2280',
    sku_code: 'AUTO-GEN-2280',
    barcode: '8851037327',
    part_name: 'Ultra Cleaning Cart',
    part_name_lo: 'ນ້ຳຍາລ້າງຄາບນ້ຳມັນ ສຳລັບວຽກໜັກ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES ultra cleaning cart. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳຍາລ້າງຄາບນ້ຳມັນ ສຳລັບວຽກໜັກ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/solar_inverter_1787945369533.jpg',
    qty_on_hand: 378,
    unit_price: 117.05,
    specs: {'Brand': 'Parker', 'Model': 'IND-3138', 'Size': 'Standard Fitment (17 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 101.78 },
      { min_qty: 50, price: 91.07 }
    ]
  },
  {
    sku_id: 'gen-2281',
    sku_code: 'AUTO-GEN-2281',
    barcode: '8853897578',
    part_name: 'Compact Solar Optimizer',
    part_name_lo: 'ສາຍໄຟໂຊລ່າ ລະດັບໂປຣ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES compact solar optimizer. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສາຍໄຟໂຊລ່າ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/ev_brake_fluid_1787947002763.jpg',
    qty_on_hand: 208,
    unit_price: 165.78,
    specs: {'Brand': 'Bosch', 'Model': 'IND-4466', 'Size': 'Standard Fitment (16 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 144.16 },
      { min_qty: 50, price: 128.99 }
    ]
  },
  {
    sku_id: 'gen-2282',
    sku_code: 'AUTO-GEN-2282',
    barcode: '8852646456',
    part_name: 'High Capacity Needle Roller Bearing',
    part_name_lo: 'ລູກປືນຕຸກກະຕາໝອນ ລະດັບໂປຣ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES high capacity needle roller bearing. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກປືນຕຸກກະຕາໝອນ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/aion_ev_coolant_1787991371969.jpg',
    qty_on_hand: 436,
    unit_price: 90.31,
    specs: {'Brand': 'Parker', 'Model': 'IND-9969', 'Size': 'Standard Fitment (10 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 78.53 },
      { min_qty: 50, price: 70.27 }
    ]
  },
  {
    sku_id: 'gen-2283',
    sku_code: 'AUTO-GEN-2283',
    barcode: '8858246226',
    part_name: 'Industrial Absorbent Pad',
    part_name_lo: 'ນ້ຳຍາລ້າງຄາບນ້ຳມັນ ພຣີມຽມ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES industrial absorbent pad. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ນ້ຳຍາລ້າງຄາບນ້ຳມັນ ພຣີມຽມ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/honda_inverter_coolant_1787991385806.jpg',
    qty_on_hand: 329,
    unit_price: 89.54,
    specs: {'Brand': 'Cummins', 'Model': 'IND-8453', 'Size': 'Standard Fitment (33 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 77.86 },
      { min_qty: 50, price: 69.66 }
    ]
  },
  {
    sku_id: 'gen-2284',
    sku_code: 'AUTO-GEN-2284',
    barcode: '8852681689',
    part_name: 'Precision Spill Kit',
    part_name_lo: 'ເຄື່ອງສີດນ້ຳແຮງດັນສູງ ອຸດສາຫະກຳ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES precision spill kit. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຄື່ອງສີດນ້ຳແຮງດັນສູງ ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/tesla_wiper_blades_1787992139928.jpg',
    qty_on_hand: 114,
    unit_price: 146.59,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-7757', 'Size': 'Standard Fitment (45 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 127.47 },
      { min_qty: 50, price: 114.06 }
    ]
  },
  {
    sku_id: 'gen-2285',
    sku_code: 'AUTO-GEN-2285',
    barcode: '8859949464',
    part_name: 'Performance Generators 100kVA (Rental)',
    part_name_lo: 'ເຄື່ອງປັ່ນໄຟ 100kVA (ເຊົ່າ) ຄວາມແມ່ນຍຳສູງ',
    category: 'Equipment Rental',
    description: 'Genuine OEM/OES performance generators 100kva (rental). Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຄື່ອງປັ່ນໄຟ 100kVA (ເຊົ່າ) ຄວາມແມ່ນຍຳສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/industrial_motor_1787993367799.jpg',
    qty_on_hand: 317,
    unit_price: 67.36,
    specs: {'Brand': 'SKF', 'Model': 'IND-2002', 'Size': 'Standard Fitment (45 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 58.57 },
      { min_qty: 50, price: 52.41 }
    ]
  },
  {
    sku_id: 'gen-2286',
    sku_code: 'AUTO-GEN-2286',
    barcode: '8852854531',
    part_name: 'Pro-Grade Cement Bag',
    part_name_lo: 'ສັງກະສີມຸງຫຼັງຄາ ລະດັບໂປຣ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES pro-grade cement bag. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສັງກະສີມຸງຫຼັງຄາ ລະດັບໂປຣ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/bronze_bushing_1787994598342.jpg',
    qty_on_hand: 428,
    unit_price: 132.28,
    specs: {'Brand': 'SKF', 'Model': 'IND-1084', 'Size': 'Standard Fitment (31 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 115.03 },
      { min_qty: 50, price: 102.92 }
    ]
  },
  {
    sku_id: 'gen-2287',
    sku_code: 'AUTO-GEN-2287',
    barcode: '8857231842',
    part_name: 'Pro-Grade Drive Pulley',
    part_name_lo: 'ຢາງປາດສາຍພານ ມາດຕະຖານ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES pro-grade drive pulley. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຢາງປາດສາຍພານ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/mining_jaw_plate_1787986343879.jpg',
    qty_on_hand: 321,
    unit_price: 172.21,
    specs: {'Brand': 'Parker', 'Model': 'IND-1885', 'Size': 'Standard Fitment (9 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 149.75 },
      { min_qty: 50, price: 133.98 }
    ]
  },
  {
    sku_id: 'gen-2288',
    sku_code: 'AUTO-GEN-2288',
    barcode: '8854278432',
    part_name: 'Industrial Track Roller',
    part_name_lo: 'ແວ່ນຕາກະຈົກລົດ ສຸດຍອດ',
    category: 'Heavy Equipment & Machinery',
    description: 'ITR double flange bottom track roller for Komatsu PC200. Forged from 40Mn2 steel with lifetime seals to withstand constant submersion in mud.',
    description_lo: 'ໂຣເລີ້ລຸ່ມແບບປີກຄູ່ ITR ສຳລັບລົດຂຸດ Komatsu PC200. ຟອດຈາກເຫຼັກ 40Mn2 ພ້ອມຊີລກັນນ້ຳ ທົນທານຕໍ່ການແຊ່ໃນຂີ້ຕົມ ແລະ ນ້ຳຕະຫຼອດເວລາ.',
    image_url: '/images/catalog/real/toyota_hv_cable_1787991422275.jpg',
    qty_on_hand: 109,
    unit_price: 99.35,
    specs: {'Brand': 'ITR', 'Model': 'TR-DF-200', 'Size': 'Double Flange', 'Application': 'Komatsu PC200, PC210'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 86.39 },
      { min_qty: 50, price: 77.3 }
    ]
  },
  {
    sku_id: 'gen-2289',
    sku_code: 'AUTO-GEN-2289',
    barcode: '8851902004',
    part_name: 'High Capacity Eye Wash Solution',
    part_name_lo: 'ສາຍຮັດຫ້າມເລືອດ ຂັ້ນສູງ',
    category: 'Tools, Safety & Medical',
    description: 'Genuine OEM/OES high capacity eye wash solution. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ສາຍຮັດຫ້າມເລືອດ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/product_2_specs_1788007011418.png',
    qty_on_hand: 103,
    unit_price: 161.05,
    specs: {'Brand': 'Bosch', 'Model': 'IND-4093', 'Size': 'Standard Fitment (24 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 140.04 },
      { min_qty: 50, price: 125.3 }
    ]
  },
  {
    sku_id: 'gen-2290',
    sku_code: 'AUTO-GEN-2290',
    barcode: '8851392211',
    part_name: 'Performance Air Diffuser',
    part_name_lo: 'ແຜ່ນກັ່ນນ້ຳຄູລິ້ງທາວເວີ ຂັ້ນສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES performance air diffuser. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ແຜ່ນກັ່ນນ້ຳຄູລິ້ງທາວເວີ ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/high_tensile_bolt_1787993197960.jpg',
    qty_on_hand: 320,
    unit_price: 177.19,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-5784', 'Size': 'Standard Fitment (29 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 154.08 },
      { min_qty: 50, price: 137.86 }
    ]
  },
  {
    sku_id: 'gen-2291',
    sku_code: 'AUTO-GEN-2291',
    barcode: '8854353554',
    part_name: 'Heavy Duty Inverter Coolant Pump',
    part_name_lo: 'ຄອມແອ EV ຂະໜາດນ້ອຍ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES heavy duty inverter coolant pump. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ຄອມແອ EV ຂະໜາດນ້ອຍ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/after_related_click_1787944325885.png',
    qty_on_hand: 186,
    unit_price: 98.51,
    specs: {'Brand': 'Parker', 'Model': 'IND-1365', 'Size': 'Standard Fitment (43 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 85.66 },
      { min_qty: 50, price: 76.65 }
    ]
  },
  {
    sku_id: 'gen-2292',
    sku_code: 'AUTO-GEN-2292',
    barcode: '8857549625',
    part_name: 'Heavy Duty Thermostat',
    part_name_lo: 'ທໍ່ແອ ອຸດສາຫະກຳ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES heavy duty thermostat. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ທໍ່ແອ ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/fire_extinguisher_1787992098343.jpg',
    qty_on_hand: 275,
    unit_price: 85.5,
    specs: {'Brand': 'Cummins', 'Model': 'IND-9019', 'Size': 'Standard Fitment (6 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 74.35 },
      { min_qty: 50, price: 66.53 }
    ]
  },
  {
    sku_id: 'gen-2293',
    sku_code: 'AUTO-GEN-2293',
    barcode: '8855952369',
    part_name: 'Ultra Gypsum Board',
    part_name_lo: 'ເຫຼັກໂຕຊີ ສຸດຍອດ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES ultra gypsum board. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຫຼັກໂຕຊີ ສຸດຍອດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/system_maintenance_1787942571293.png',
    qty_on_hand: 454,
    unit_price: 125.28,
    specs: {'Brand': 'Parker', 'Model': 'IND-3420', 'Size': 'Standard Fitment (24 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'In Stock',
    bulk_pricing: [
      { min_qty: 10, price: 108.94 },
      { min_qty: 50, price: 97.47 }
    ]
  },
  {
    sku_id: 'gen-2294',
    sku_code: 'AUTO-GEN-2294',
    barcode: '8855287527',
    part_name: 'Heavy-Spec Butterfly Valve',
    part_name_lo: 'ເຊັກວາວ ມາດຕະຖານ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES heavy-spec butterfly valve. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຊັກວາວ ມາດຕະຖານ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/rebar_steel_1787994446883.jpg',
    qty_on_hand: 371,
    unit_price: 174.65,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-5733', 'Size': 'Standard Fitment (38 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 151.87 },
      { min_qty: 50, price: 135.88 }
    ]
  },
  {
    sku_id: 'gen-2295',
    sku_code: 'AUTO-GEN-2295',
    barcode: '8851873677',
    part_name: 'Pro-Grade Flange Unit',
    part_name_lo: 'ລາງເລື່ອນເສັ້ນກົງ ສຸດຍອດ',
    category: 'Parts & Components',
    description: 'Genuine OEM/OES pro-grade flange unit. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລາງເລື່ອນເສັ້ນກົງ ສຸດຍອດ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/ev_battery_coolant_1787947012559.jpg',
    qty_on_hand: 158,
    unit_price: 156.62,
    specs: {'Brand': 'Cummins', 'Model': 'IND-5762', 'Size': 'Standard Fitment (8 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 136.19 },
      { min_qty: 50, price: 121.85 }
    ]
  },
  {
    sku_id: 'gen-2296',
    sku_code: 'AUTO-GEN-2296',
    barcode: '8858170662',
    part_name: 'Ultra Check Valve',
    part_name_lo: 'ເຊັກວາວ ອຸດສາຫະກຳ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES ultra check valve. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເຊັກວາວ ອຸດສາຫະກຳ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/forklift_rear_1787945500664.jpg',
    qty_on_hand: 107,
    unit_price: 143.06,
    specs: {'Brand': 'Bosch', 'Model': 'IND-6645', 'Size': 'Standard Fitment (49 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 124.4 },
      { min_qty: 50, price: 111.31 }
    ]
  },
  {
    sku_id: 'gen-2297',
    sku_code: 'AUTO-GEN-2297',
    barcode: '8855940057',
    part_name: 'Industrial Off-grid Inverter',
    part_name_lo: 'ແຜງໂຊລ່າ 400W ຂັ້ນສູງ',
    category: 'EV & Electrical Systems',
    description: 'Genuine OEM/OES industrial off-grid inverter. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ແຜງໂຊລ່າ 400W ຂັ້ນສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/metal_roofing_1787994488453.jpg',
    qty_on_hand: 204,
    unit_price: 159.49,
    specs: {'Brand': 'Caterpillar', 'Model': 'IND-9158', 'Size': 'Standard Fitment (41 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '2-3 Days',
    bulk_pricing: [
      { min_qty: 10, price: 138.69 },
      { min_qty: 50, price: 124.09 }
    ]
  },
  {
    sku_id: 'gen-2298',
    sku_code: 'AUTO-GEN-2298',
    barcode: '8856274936',
    part_name: 'Elite Drive Pulley',
    part_name_lo: 'ລູກກິ້ງຮູບຕົວວີ ຄວາມຈຸສູງ',
    category: 'Construction & Facility',
    description: 'Genuine OEM/OES elite drive pulley. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ລູກກິ້ງຮູບຕົວວີ ຄວາມຈຸສູງ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/arcfox_charging_cable_1787991346297.jpg',
    qty_on_hand: 60,
    unit_price: 108.79,
    specs: {'Brand': 'Bosch', 'Model': 'IND-4749', 'Size': 'Standard Fitment (25 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: '1 Week',
    bulk_pricing: [
      { min_qty: 10, price: 94.6 },
      { min_qty: 50, price: 84.64 }
    ]
  },
  {
    sku_id: 'gen-2299',
    sku_code: 'AUTO-GEN-2299',
    barcode: '8852494610',
    part_name: 'Heavy-Spec Check Valve',
    part_name_lo: 'ເກດວາວ ສຳລັບການຄ້າ',
    category: 'Hydraulics & Pneumatics',
    description: 'Genuine OEM/OES heavy-spec check valve. Engineered with precision components to meet strict manufacturer tolerances. Designed for extended service life in commercial applications.',
    description_lo: 'ຊິ້ນສ່ວນ ເກດວາວ ສຳລັບການຄ້າ ແທ້ ລະດັບອຸດສາຫະກຳ (OEM/OES). ຜະລິດດ້ວຍມາດຕະຖານທີ່ຊັດເຈນທີ່ສຸດ ເພື່ອຮັບປະກັນການໃຊ້ງານທີ່ຍາວນານ ແລະ ເຊື່ອຖືໄດ້ໃນສະພາບການເຮັດວຽກໜັກ.',
    image_url: '/images/catalog/real/store_products_1_1788007486784.png',
    qty_on_hand: 469,
    unit_price: 2.32,
    specs: {'Brand': 'Bosch', 'Model': 'IND-9849', 'Size': 'Standard Fitment (46 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Ships in 24h',
    bulk_pricing: [
      { min_qty: 10, price: 2.02 },
      { min_qty: 50, price: 1.81 }
    ]
  }
];

export const RENTAL_CATALOG: InventoryItem[] = [
  {
    sku_id: 'rnd-001',
    sku_code: 'RNT-CAT-320',
    barcode: null,
    part_name: 'CAT 320 Excavator (Rental / Day)',
    part_name_lo: 'ລົດຈົກ CAT 320 (ເຊົ່າລາຍວັນ)',
    category: 'Equipment Rental',
    description: 'Heavy duty 20-ton excavator available for daily or monthly rent. Includes certified operator and fuel.',
    description_lo: 'ບໍລິການໃຫ້ເຊົ່າລົດຈົກ CAT 320 ຂະໜາດ 20 ໂຕນ ສຳລັບວຽກຂຸດຄົ້ນ ແລະ ກໍ່ສ້າງ (ລວມຄົນຂັບ).',
    image_url: '/images/catalog/real/centrifugal_pump_1787989816474.jpg',
    qty_on_hand: 5,
    unit_price: 50.6,
    specs: {'Brand': 'Cummins', 'Model': 'IND-9627', 'Size': 'Standard Fitment (26 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Available Now',
    bulk_pricing: [
      { min_qty: 7, price: 44.0 },
      { min_qty: 30, price: 36.0 }
    ]
  },
  {
    sku_id: 'rnd-002',
    sku_code: 'RNT-DMP-10W',
    barcode: null,
    part_name: '10-Wheel Dump Truck (Rental / Day)',
    part_name_lo: 'ລົດດຳ້ 10 ລໍ້ (ເຊົ່າລາຍວັນ)',
    category: 'Equipment Rental',
    description: '15 cubic meter heavy duty dump truck for earthmoving, sand, and aggregate transport.',
    description_lo: 'ລົດບັນທຸກດຳ້ 10 ລໍ້ ສຳລັບຂົນດິນ, ຫີນ, ຊາຍ ຂະໜາດກະບະ 15 ແມັດກ້ອນ (ລວມຄົນຂັບ).',
    image_url: '/images/catalog/real/store_products_3_1788007501517.png',
    qty_on_hand: 12,
    unit_price: 36.8,
    specs: {'Brand': 'Bosch', 'Model': 'IND-7322', 'Size': 'Standard Fitment (20 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Available Now',
    bulk_pricing: [
      { min_qty: 7, price: 32.0 },
      { min_qty: 30, price: 28.0 }
    ]
  },
  {
    sku_id: 'rnd-003',
    sku_code: 'RNT-BLD-D8',
    barcode: null,
    part_name: 'Bulldozer D8 Class (Rental / Day)',
    part_name_lo: 'ລົດດຸດດິນ D8 (ເຊົ່າລາຍວັນ)',
    category: 'Equipment Rental',
    description: 'High power crawler dozer for heavy land clearing, mining, and road construction.',
    description_lo: 'ລົດດຸດດິນຂະໜາດໃຫຍ່ ສຳລັບວຽກບຸກເບີກພື້ນທີ່, ເຮັດທາງ, ແລະ ບໍ່ແຮ່ (ລວມຄົນຂັບ).',
    image_url: '/images/catalog/real/industrial_exhaust_fan_1787993439615.jpg',
    qty_on_hand: 3,
    unit_price: 73.6,
    specs: {'Brand': 'SKF', 'Model': 'IND-9356', 'Size': 'Standard Fitment (4 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Available Now',
    bulk_pricing: [
      { min_qty: 7, price: 64.0 }
    ]
  },
  {
    sku_id: 'rnd-004',
    sku_code: 'RNT-CRN-25T',
    barcode: null,
    part_name: 'Mobile Truck Crane 25 Ton (Rental / Day)',
    part_name_lo: 'ລົດເຄນ 25 ໂຕນ (ເຊົ່າລາຍວັນ)',
    category: 'Equipment Rental',
    description: '25-ton lifting capacity mobile hydraulic truck crane for construction and steel erection.',
    description_lo: 'ລົດເຄນຍົກຂອງໜັກ 25 ໂຕນ ສຳລັບວຽກກໍ່ສ້າງ, ຍົກໂຄງສ້າງເຫຼັກ, ແລະ ຍ້າຍເຄື່ອງຈັກ.',
    image_url: '/images/catalog/real/inverter_welding_machine_1787993381339.jpg',
    qty_on_hand: 4,
    unit_price: 62.1,
    specs: {'Brand': 'Parker', 'Model': 'IND-9078', 'Size': 'Standard Fitment (27 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Reserve 1 Day in Advance',
    bulk_pricing: [
      { min_qty: 7, price: 54.0 }
    ]
  },
  {
    sku_id: 'rnd-005',
    sku_code: 'RNT-TYT-8FG40N',
    barcode: null,
    part_name: 'Toyota 4T LPG Forklift (Rental)',
    part_name_lo: 'ລົດຍົກ Toyota 4T ລະບົບແກັສ LPG (ເຊົ່າ)',
    category: 'Equipment Rental',
    description: 'Toyota 8FG40N 4.0 Ton LPG Forklift. Reliable material handling for warehouses and logistics. Features an ergonomic cabin, advanced safety system (SAS), and powerful low-emission engine.',
    description_lo: 'ລົດຍົກ (Forklift) ແບຣນ Toyota ຂະໜາດ 4 ໂຕນ ລະບົບແກັສ LPG ສຳລັບວຽກສາງສິນຄ້າ ແລະ ຂົນສົ່ງ. ມາພ້ອມລະບົບຄວາມປອດໄພ SAS ແລະ ເຄື່ອງຈັກປະຢັດພະລັງງານ.',
    image_url: '/images/catalog/real/ev_charging_adapter_1787991437929.jpg',
    gallery_images: [
      '/images/catalog/forklift_side.jpg',
      '/images/catalog/forklift_rear.jpg',
      '/images/catalog/forklift_interior.jpg',
      '/images/catalog/forklift_lift.jpg',
      '/images/catalog/forklift_wheel.jpg'
    ],
    qty_on_hand: 3,
    unit_price: 57.5,
    specs: {'Brand': 'SKF', 'Model': 'IND-9676', 'Size': 'Standard Fitment (41 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Available Now'
  },
  {
    sku_id: 'rnd-006',
    sku_code: 'RNT-TYT-8FB25',
    barcode: null,
    part_name: 'Toyota 2.5T Electric Forklift (Rental)',
    part_name_lo: 'ລົດຍົກ Toyota 2.5T ລະບົບໄຟຟ້າ (ເຊົ່າ)',
    category: 'Equipment Rental',
    description: 'Zero-emission 2.5 Ton electric forklift for indoor warehouse operations. Includes battery charger.',
    description_lo: 'ລົດຍົກລະບົບໄຟຟ້າ 2.5 ໂຕນ ປາສະຈາກມົນລະພິດ ເໝາະສຳລັບໃຊ້ງານພາຍໃນສາງ.',
    image_url: '/images/catalog/real/leapmotor_c11_filter_1787994899596.jpg',
    qty_on_hand: 5,
    unit_price: 57.5,
    specs: {'Brand': 'SKF', 'Model': 'IND-7479', 'Size': 'Standard Fitment (17 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Available Now'
  },
  {
    sku_id: 'rnd-007',
    sku_code: 'RNT-MIT-CF13F',
    barcode: null,
    part_name: 'Mitsubishi 3.0T LPG Forklift (Rental)',
    part_name_lo: 'ລົດຍົກ Mitsubishi 3.0T ລະບົບແກັສ LPG (ເຊົ່າ)',
    category: 'Equipment Rental',
    description: 'Mitsubishi CF13F 3.0 Ton LPG Forklift (Used/Refurbished). Excellent for heavy outdoor lifting.',
    description_lo: 'ລົດຍົກ Mitsubishi 3.0 ໂຕນ ລະບົບແກັສ LPG ໃຊ້ງານທົນທານ ເໝາະກັບທັງໃນຮົ່ມ ແລະ ກາງແຈ້ງ.',
    image_url: '/images/catalog/real/hydraulic_oil_drum_1787993185153.jpg',
    qty_on_hand: 2,
    unit_price: 57.5,
    specs: {'Brand': 'Parker', 'Model': 'IND-1569', 'Size': 'Standard Fitment (2 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Available Now'
  },
  {
    sku_id: 'rnd-008',
    sku_code: 'RNT-LDR-5T',
    barcode: null,
    part_name: '5-Ton Wheel Loader (Rental / Day)',
    part_name_lo: 'ລົດຕັກ 5 ໂຕນ (ເຊົ່າລາຍວັນ)',
    category: 'Equipment Rental',
    description: 'Standard 5-ton capacity wheel loader for aggregate handling and quarry operations. Fuel and operator included.',
    description_lo: 'ລົດຕັກລໍ້ຢາງ ຂະໜາດ 5 ໂຕນ ສຳລັບຕັກຫີນ, ຊາຍ ແລະ ວຽກກໍ່ສ້າງທົ່ວໄປ (ລວມຄົນຂັບ ແລະ ນ້ຳມັນ).',
    image_url: '/images/catalog/real/spill_containment_kit_1787995270912.jpg',
    qty_on_hand: 2,
    unit_price: 57.5,
    specs: {'Brand': 'Genuine OEM', 'Model': 'IND-7601', 'Size': 'Standard Fitment (1 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Available Now',
    bulk_pricing: [
      { min_qty: 7, price: 50.0 }
    ]
  },
  {
    sku_id: 'rnd-009',
    sku_code: 'RNT-CRN-RT15',
    barcode: null,
    part_name: '15-Ton Rough Terrain Crane (Rental / Day)',
    part_name_lo: 'ລົດເຄນ 15 ໂຕນ ແບບຂັບເຄື່ອນ 4 ລໍ້ ໄຊດ໌ງານກໍ່ສ້າງ (ເຊົ່າລາຍວັນ)',
    category: 'Equipment Rental',
    description: '15-ton mobile rough terrain crane with off-road tires and 4-wheel drive, perfect for uneven construction sites.',
    description_lo: 'ລົດເຄນຍົກຂອງ 15 ໂຕນ ອອກແບບມາສຳລັບພື້ນທີ່ບໍ່ລຽບ ແລະ ໄຊດ໌ງານກໍ່ສ້າງ ສາມາດຂັບເຄື່ອນໄດ້ທຸກສະພາບຜິວ.',
    image_url: '/images/catalog/real/modal_scrolled_view_1787944300936.png',
    qty_on_hand: 1,
    unit_price: 66.7,
    specs: {'Brand': 'SKF', 'Model': 'IND-6088', 'Size': 'Standard Fitment (22 kg)', 'Application': 'Universal Commercial Compatibility'},
    lead_time: 'Available Now',
    bulk_pricing: [
      { min_qty: 7, price: 58.0 }
    ]
  }
];
