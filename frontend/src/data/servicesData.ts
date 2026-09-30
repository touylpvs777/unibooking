import { RefreshCw, LifeBuoy, Activity, Warehouse, GraduationCap, Receipt } from "lucide-react";

// Forklift Periodic Maintenance Data Model (Modeled after Mitsubishi Motors Maintenance Schedule)
export interface PMPackage {
  hours: number;
  label: string;
  nameLo: string;
  nameEn: string;
  badgeLo: string;
  badgeEn: string;
  descriptionLo: string;
  descriptionEn: string;
  durationLo: string;
  durationEn: string;
  partsReplacedLo: string[];
  partsReplacedEn: string[];
  fluidReplacedLo: string[];
  fluidReplacedEn: string[];
  inspectionsLo: string[];
  inspectionsEn: string[];
  estimatedCostLak: string;
  popular?: boolean;
}

export const PM_PACKAGES: Record<string, PMPackage[]> = {
  diesel: [
    {
      hours: 250,
      label: "250 Hours",
      nameLo: "ກວດເຊັກຮອບເລີ່ມຕົ້ນ (Initial PM)",
      nameEn: "Initial Inspection (250h PM)",
      badgeLo: "Minor Service",
      badgeEn: "Minor Service",
      descriptionLo: "ກວດເຊັກທົ່ວໄປ, ປ່ຽນຖ່າຍນ້ຳມັນເຄື່ອງ ແລະ ໄສ້ກອງນ້ຳມັນເຄື່ອງ, ອັດຈາຣະບີທຸກຈຸດໝຸນເພື່ອຄວາມຄ່ອງຕົວ.",
      descriptionEn: "Basic preventive service: engine oil & filter change, chassis & mast point greasing for smooth operation.",
      durationLo: "1.5 - 2.0 ຊົ່ວໂມງ",
      durationEn: "1.5 - 2.0 Hours",
      partsReplacedLo: ["ໄສ້ກອງນ້ຳມັນເຄື່ອງ (Engine Oil Filter)", "ແຫວນຮອງນັອດຖ່າຍ"],
      partsReplacedEn: ["OEM Engine Oil Filter", "Drain Plug Crush Washer"],
      fluidReplacedLo: ["ນ້ຳມັນເຄື່ອງດີເຊວມາດຕະຖານ 15W-40 (8-10L)", "ອັດຈາຣະບີລູກປືນຄອມ້າ ແລະ ເສົາຍົກ"],
      fluidReplacedEn: ["15W-40 Heavy-Duty Diesel Engine Oil (8-10L)", "High-Pressure Chassis & Mast Grease"],
      inspectionsLo: ["ກວດເຊັກລະດັບນ້ຳມັນໄຮໂດຣລິກ", "ກວດເຊັກສາຍພານໜ້າເຄື່ອງ", "ກວດເຊັກລົມຢາງ ແລະ ດອກຢາງ", "ກວດເຊັກໄຟສັນຍານ ແລະ ສຽງແກ"],
      inspectionsEn: ["Hydraulic fluid level check", "Fan & alternator drive belt tension", "Tire tread condition & lug torque", "Warning lights, indicators & horn check"],
      estimatedCostLak: "₭ 1,850,000 - ₭ 2,400,000"
    },
    {
      hours: 500,
      label: "500 Hours",
      nameLo: "ບຳລຸງຮັກສາໄລຍະກາງ (Standard PM)",
      nameEn: "Standard Periodic Maintenance (500h PM)",
      badgeLo: "Recommended",
      badgeEn: "Recommended",
      popular: true,
      descriptionLo: "ກວດເຊັກລະບົບຈ່າຍນ້ຳມັນເຊື້ອເພີງ, ປ່ຽນກອງດັກນ້ຳ ແລະ ກອງອາກາດ ເພື່ອປະສິດທິພາບການເຜົາໄໝ້ ແລະ ປະຢັດນ້ຳມັນ.",
      descriptionEn: "Fuel system inspection: water separator & air filter replacement for maximum combustion efficiency and fuel economy.",
      durationLo: "2.5 - 3.5 ຊົ່ວໂມງ",
      durationEn: "2.5 - 3.5 Hours",
      partsReplacedLo: ["ໄສ້ກອງນ້ຳມັນເຄື່ອງ (Oil Filter)", "ໄສ້ກອງນ້ຳມັນໂຊລາ (Fuel Filter)", "ກອງດັກນ້ຳ (Water Separator)", "ກອງອາກາດ (Air Filter)"],
      partsReplacedEn: ["Engine Oil Filter", "Diesel Fuel Filter", "Water Separator Element", "Engine Air Intake Filter"],
      fluidReplacedLo: ["ນ້ຳມັນເຄື່ອງດີເຊວ 15W-40", "ນ້ຳມັນເບຣກ DOT3", "ນ້ຳຫຼໍ່ເຢັນໝໍ້ນ້ຳ (Coolant Top-up)"],
      fluidReplacedEn: ["15W-40 Diesel Engine Oil", "DOT3 Brake Fluid", "Radiator Coolant Top-Up"],
      inspectionsLo: ["ກວດເຊັກຄວາມໜາຜ້າເບຣກ", "ກວດເຊັກແຮງດັນໄຮໂດຣລິກ", "ກວດເຊັກສາຍໄຮໂດຣລິກ ແລະ ຂໍ້ຕໍ່", "ກວດສອບຄວາມຕຶງຂອງໂສ້ຍົກ Mast"],
      inspectionsEn: ["Brake shoe & pad thickness inspection", "Hydraulic relief valve pressure test", "Hose lines & fittings leakage check", "Mast lift chain tension & elongation test"],
      estimatedCostLak: "₭ 3,200,000 - ₭ 4,100,000"
    },
    {
      hours: 1000,
      label: "1,000 Hours",
      nameLo: "ບຳລຸງຮັກສາຮອບໃຫຍ່ (Major PM)",
      nameEn: "Major Powertrain Maintenance (1,000h PM)",
      badgeLo: "Major Service",
      badgeEn: "Major Service",
      descriptionLo: "ກວດເຊັກໃຫຍ່ລະບົບຂັບເຄື່ອນ, ປ່ຽນຖ່າຍນ້ຳມັນເກຍ ແລະ ນ້ຳມັນເຟືອງທ້າຍ, ປັບຕັ້ງໄລຍະຟຣີຂອງເບຣກ ແລະ ຄັອດ.",
      descriptionEn: "Comprehensive powertrain overhaul: transmission & differential oil flush, brake and clutch clearance calibration.",
      durationLo: "4.0 - 5.0 ຊົ່ວໂມງ",
      durationEn: "4.0 - 5.0 Hours",
      partsReplacedLo: ["ຊຸດກອງຄົບເຊັດ (Oil + Fuel + Air Filters)", "ໄສ້ກອງນ້ຳມັນເກຍ (Transmission Filter)", "ສາຍພານພັດລົມ/ໄດຊາດ"],
      partsReplacedEn: ["Complete Filter Kit (Oil + Fuel + Air)", "Transmission Hydraulic Filter", "Fan & Alternator V-Belts"],
      fluidReplacedLo: ["ນ້ຳມັນເຄື່ອງດີເຊວ", "ນ້ຳມັນເກຍອັດຕະໂນມັດ (ATF) / ເກຍກະປຸກ", "ນ້ຳມັນເຟືອງທ້າຍ (Differential Gear Oil)", "ປ່ຽນຖ່າຍນ້ຳຫຼໍ່ເຢັນເຕັມລະບົບ"],
      fluidReplacedEn: ["15W-40 Diesel Engine Oil", "Automatic Transmission Fluid (ATF) / Gear Oil", "Differential Hypoid Gear Oil", "Complete Radiator Coolant Flush"],
      inspectionsLo: ["ທົດສອບແຮງອັດກະບອກສູບ", "ກວດເຊັກປ້ຳໄຮໂດຣລິກ Main Pump", "ຕັ້ງໂສ້ຍົກ ແລະ ປັບແຖບເລື່ອນ Fork Clearance", "ກວດເຊັກລະບົບຕັດໄຟນິລະໄພ"],
      inspectionsEn: ["Engine cylinder compression check", "Main hydraulic pump flow rate test", "Mast lift chain & fork carriage adjustment", "Emergency electrical cutoff test"],
      estimatedCostLak: "₭ 5,800,000 - ₭ 7,500,000"
    },
    {
      hours: 2000,
      label: "2,000 Hours",
      nameLo: "ກວດເຊັກຄົບວົງຈອນ (Comprehensive Overhaul PM)",
      nameEn: "Full System Overhaul (2,000h PM)",
      badgeLo: "Full System PM",
      badgeEn: "Full System PM",
      descriptionLo: "ປ່ຽນຖ່າຍນ້ຳມັນໄຮໂດຣລິກທັງໝົດໃນຖັງ, ປ່ຽນໄສ້ກອງດູດໄຮໂດຣລິກ, ທົດສອບການຮົ່ວຊຶມຂອງວາວ Control Valve ແລະ ກະບອກສູບ.",
      descriptionEn: "Complete hydraulic reservoir flush & replacement, suction & return filters renewal, control valve and cylinder seal audit.",
      durationLo: "6.0 - 8.0 ຊົ່ວໂມງ",
      durationEn: "6.0 - 8.0 Hours",
      partsReplacedLo: ["ຊຸດກອງທຸກຈຸດໃນຕົວລົດ 100%", "ໄສ້ກອງໄຮໂດຣລິກ (Suction & Return Filter)", "ຊຸດຢາງກັນຝຸ່ນ ແລະ ຊີລກະບອກຍົກທີ່ເສື່ອມ"],
      partsReplacedEn: ["Complete Vehicle Filter Set (100%)", "Hydraulic Suction & Return Filters", "Cylinder Dust Seals & Wear Rings"],
      fluidReplacedLo: ["ນ້ຳມັນໄຮໂດຣລິກມາດຕະຖານ ISO VG 46/68 (40-60L)", "ນ້ຳມັນເຄື່ອງ, ນ້ຳມັນເກຍ, ນ້ຳມັນເຟືອງທ້າຍຄົບວົງຈອນ", "ນ້ຳມັນເບຣກລ້າງທໍ່ໃໝ່ທັງໝົດ"],
      fluidReplacedEn: ["ISO VG 46/68 Hydraulic Fluid (40-60L)", "Complete Engine, Transmission & Diff Fluid Flush", "Brake Line Hydraulic Flush"],
      inspectionsLo: ["ກວດເຊັກແກນ Mast, ລູກປືນ Roller ທຸກຕັບ", "ທົດສອບການຮັບນ້ຳໜັກ Load Test 100%", "ກວດສອບຄວາມປອດໄພຕາມມາດຕະຖານໂຮງງານ", "ອອກໃບຢັ້ງຢືນ Maintenance Certificate"],
      inspectionsEn: ["Mast channel & roller bearing inspection", "100% Rated Capacity Load Test", "OSHA/ISO Factory Safety Audit", "Official Inspection Certificate Issuance"],
      estimatedCostLak: "₭ 11,500,000 - ₭ 14,800,000"
    }
  ],
  electric: [
    {
      hours: 250,
      label: "250 Hours",
      nameLo: "ກວດເຊັກລະບົບໄຟຟ້າ & ໝໍ້ໄຟ (Battery Care)",
      nameEn: "Electrical & Battery Care (250h PM)",
      badgeLo: "Minor Service",
      badgeEn: "Minor Service",
      descriptionLo: "ກວດວັດຄ່າຖ່ວງຈຳເພາະກົດໝໍ້ໄຟ, ເຮັດຄວາມສະອາດຂົ້ວໄຟ, ກວດເຊັກສາຍສາກ ແລະ ລະບົບຕັດໄຟສຸກເສີນ.",
      descriptionEn: "Traction battery electrolyte specific gravity test, terminal cleaning, charger cable & emergency stop audit.",
      durationLo: "1.5 - 2.0 ຊົ່ວໂມງ",
      durationEn: "1.5 - 2.0 Hours",
      partsReplacedLo: ["ນ້ຳກັ່ນເຕີມໝໍ້ໄຟ (Distilled Water Top-up)", "ແຜ່ນກັນກະແທກ"],
      partsReplacedEn: ["Battery Distilled Water Top-Up", "Battery Terminal Protective Dampers"],
      fluidReplacedLo: ["ອັດຈາຣະບີລູກປືນເສົາຍົກ ແລະ ໂສ້"],
      fluidReplacedEn: ["Synthetic Mast & Chain Lubricant"],
      inspectionsLo: ["ວັດແຮງດັນໄຟຟ້າແຕ່ລະ Cell", "ກວດລະບົບ Contactors & Motor Brushes", "ກວດສະພາບສາຍສາກ Charger Cable", "ກວດເຊັກສະວິດເຊັນເຊີເກົ້າອີ້"],
      inspectionsEn: ["Individual cell voltage check", "Contactor points & motor brush inspection", "Charger plug & cable resistance check", "Seat safety presence switch test"],
      estimatedCostLak: "₭ 1,200,000 - ₭ 1,800,000"
    },
    {
      hours: 500,
      label: "500 Hours",
      nameLo: "ບຳລຸງຮັກສາມໍເຕີ & ໄຮໂດຣລິກ (Motor & Hydraulics)",
      nameEn: "Motor & Hydraulic Service (500h PM)",
      badgeLo: "Standard PM",
      badgeEn: "Standard PM",
      popular: true,
      descriptionLo: "ກວດເຊັກມໍເຕີຂັບເຄື່ອນ (Traction Motor) ແລະ ມໍເຕີຍົກ (Pump Motor), ປ່ຽນຖ່າຍກອງນ້ຳມັນໄຮໂດຣລິກ ແລະ ເຊັກລະບົບເບຣກໄຟຟ້າ.",
      descriptionEn: "Traction and lift pump motor inspection, hydraulic return filter replacement, and regenerative braking check.",
      durationLo: "2.5 - 3.5 ຊົ່ວໂມງ",
      durationEn: "2.5 - 3.5 Hours",
      partsReplacedLo: ["ໄສ້ກອງນ້ຳມັນໄຮໂດຣລິກ", "ແປງຖ່ານມໍເຕີ (ຖ້າເປັນລະບົບ DC)"],
      partsReplacedEn: ["Hydraulic Return Filter Element", "Carbon Brushes (if DC motor system)"],
      fluidReplacedLo: ["ນ້ຳມັນເບຣກ", "ຈາຣະບີສັງເຄາະສຳລັບມໍເຕີ"],
      fluidReplacedEn: ["Brake Fluid", "High-Temperature Motor Synthetic Grease"],
      inspectionsLo: ["ກວດເຊັກລະບົບ Regenerative Braking", "ກວດເຊັກ Controller Inverter & Error Logs", "ທົດສອບເຊັນເຊີມຸມລ້ຽວ (Steering Angle Sensor)", "ກວດເຊັກໂສ້ຍົກ"],
      inspectionsEn: ["Regenerative braking efficiency test", "Controller fault error log diagnostic", "Steering angle sensor calibration", "Mast lift chain inspection"],
      estimatedCostLak: "₭ 2,400,000 - ₭ 3,200,000"
    },
    {
      hours: 1000,
      label: "1,000 Hours",
      nameLo: "ກວດເຊັກໃຫຍ່ລະບົບຂັບເຄື່ອນໄຟຟ້າ (Major Electric PM)",
      nameEn: "Drive Unit & Inverter Audit (1,000h PM)",
      badgeLo: "Major Service",
      badgeEn: "Major Service",
      descriptionLo: "ກວດລະອຽດລະບົບ Inverter/Controller ດ້ວຍຄອມພິວເຕີ, ປ່ຽນຖ່າຍນ້ຳມັນເກຍຂັບມໍເຕີ ແລະ ທົດສອບ Battery Health SOH.",
      descriptionEn: "Computer diagnostics for Inverter/Controller, drive unit gear oil replacement, and Battery Health (SOH) evaluation.",
      durationLo: "4.0 - 5.0 ຊົ່ວໂມງ",
      durationEn: "4.0 - 5.0 Hours",
      partsReplacedLo: ["ຊຸດກອງໄຮໂດຣລິກ", "ຊຸດຊີລປ້ອງກັນຝຸ່ນມໍເຕີ"],
      partsReplacedEn: ["Complete Hydraulic Filter Set", "Motor Housing Dust Seals"],
      fluidReplacedLo: ["ນ້ຳມັນເກຍ Drive Unit Oil", "ນ້ຳມັນໄຮໂດຣລິກບາງສ່ວນ"],
      fluidReplacedEn: ["Drive Unit Synthetic Gear Oil", "Hydraulic Fluid Top-Up & Correction"],
      inspectionsLo: ["ວິເຄາະສຸຂະພາບແບັດເຕີຣີ (Battery SOH/SOC Test)", "ກວດສອບຄວາມຮ້ອນ Controller Thermal Test", "ກວດສອບການສວມໃສ່ຂອງດອກຢາງ Polyurethane / Solid", "ອອກໃບຮັບຮອງຄວາມປອດໄພ"],
      inspectionsEn: ["Battery State-of-Health (SOH/SOC) analysis", "Controller thermal dissipation test", "Polyurethane & solid tire wear check", "Safety audit certification"],
      estimatedCostLak: "₭ 4,500,000 - ₭ 6,200,000"
    },
    {
      hours: 2000,
      label: "2,000 Hours",
      nameLo: "ບຳລຸງຮັກສາຄົບວົງຈອນ (Full Electric Overhaul)",
      nameEn: "Comprehensive Electric Overhaul (2,000h PM)",
      badgeLo: "Full System PM",
      badgeEn: "Full System PM",
      descriptionLo: "ປ່ຽນຖ່າຍນ້ຳມັນໄຮໂດຣລິກເຕັມລະບົບ, ກວດລ້າງມໍເຕີ, ທົດສອບລະບົບຍົກສູງສຸດ ແລະ Calibrate ລະບົບນ້ຳໜັກ Load Sensor.",
      descriptionEn: "Complete hydraulic reservoir replacement, drive motor cleanout, max height stress test, and load sensor calibration.",
      durationLo: "6.0 - 7.5 ຊົ່ວໂມງ",
      durationEn: "6.0 - 7.5 Hours",
      partsReplacedLo: ["ກອງໄຮໂດຣລິກຄົບຊຸດ", "ຊີລກະບອກຍົກ (Lift Cylinder Seals)", "ຊຸດລູກປືນ Mast Bearings ທີ່ສວມໃສ່"],
      partsReplacedEn: ["Complete Hydraulic Filter Set", "Lift & Tilt Cylinder Seal Kits", "Worn Mast Channel Bearings"],
      fluidReplacedLo: ["ນ້ຳມັນໄຮໂດຣລິກມາດຕະຖານເຕັມຖັງ", "ນ້ຳມັນ Drive Unit Gear Oil"],
      fluidReplacedEn: ["Full ISO VG Hydraulic Fluid Replacement", "Drive Unit Synthetic Gear Oil Flush"],
      inspectionsLo: ["Calibrate ເຊັນເຊີຄວາມສູງ ແລະ ນ້ຳໜັກ", "ທົດສອບການຍົກເຕັມກຳລັງ Load Test", "ລ້າງລະບົບລະບາຍຄວາມຮ້ອນ Controller", "ອອກໃບຢັ້ງຢືນ Maintenance Certificate"],
      inspectionsEn: ["Calibrate lift height & weight sensors", "100% Rated Capacity Load Test", "Controller cooling heat sink flush", "Official PM Certificate Issuance"],
      estimatedCostLak: "₭ 8,900,000 - ₭ 11,500,000"
    }
  ]
};

export const CHECKLIST_24_ITEMS = [
  { 
    categoryLo: "1. ລະບົບເຄື່ອງຈັກ & ສົ່ງກຳລັງ (Engine & Drive)", 
    categoryEn: "1. Engine & Drive Powertrain System",
    itemsLo: [
      "ລະດັບ ແລະ ຄວາມໜຽວນ້ຳມັນເຄື່ອງ", 
      "ສະພາບສາຍພານໜ້າເຄື່ອງ & ພັດລົມ", 
      "ໝໍ້ນ້ຳ, ທໍ່ຢາງ ແລະ ລະດັບນ້ຳຫຼໍ່ເຢັນ", 
      "ລະບົບນ້ຳມັນໂຊລາ & ປ້ຳແຍັກ", 
      "ລະບົບໄຟຊາດ Alternator & ໄດສະຕາດ", 
      "ລະບົບທໍ່ໄອເສຍ & ຄວັນດຳ"
    ],
    itemsEn: [
      "Engine oil level, viscosity & contamination",
      "Drive belt tension & cooling fan condition",
      "Radiator fins, coolant level & hose integrity",
      "Diesel fuel delivery line & priming pump",
      "Alternator charging voltage & starter motor",
      "Exhaust manifold & emission smoke check"
    ]
  },
  { 
    categoryLo: "2. ລະບົບໄຮໂດຣລິກ & ຊຸດຍົກ (Hydraulics & Mast)", 
    categoryEn: "2. Hydraulic & Mast Assembly System",
    itemsLo: [
      "ລະດັບນ້ຳມັນໄຮໂດຣລິກ & ສີຂອງນ້ຳມັນ", 
      "ການຮົ່ວຊຶມຂອງກະບອກຍົກ Lift Cylinder", 
      "ການຮົ່ວຊຶມຂອງກະບອກອຽງ Tilt Cylinder", 
      "ສະພາບສາຍໄຮໂດຣລິກ & ຂໍ້ຕໍ່ສາຍ", 
      "ຄວາມຕຶງ ແລະ ການສວມໃສ່ຂອງໂສ້ຍົກ", 
      "ລູກປືນເສົາ Mast & ແຜ່ນເລື່ອນງາຍົກ"
    ],
    itemsEn: [
      "Hydraulic fluid level, clarity & contamination",
      "Main lift cylinder seals & rod leakage",
      "Tilt cylinder seals & pin bushing clearance",
      "High-pressure hydraulic hoses & fittings",
      "Lift chain elongation, tension & lubrication",
      "Mast channel bearings & fork carriage wear pads"
    ]
  },
  { 
    categoryLo: "3. ລະບົບເບຣກ, ຢາງ & ຊ່ວງລ່າງ (Brakes & Steering)", 
    categoryEn: "3. Brake, Steering & Undercarriage System",
    itemsLo: [
      "ລະດັບນ້ຳມັນເບຣກ & ແຮງກົດແປ້ນເບຣກ", 
      "ປະສິດທິພາບເບຣກມື Handbrake", 
      "ກະບອກລ້ຽວ ແລະ ລູກໝາກຄອມ້າຫຼັງ", 
      "ສະພາບດອກຢາງຕັນ & ຮອຍຈີກຂາດ", 
      "ແໜ້ນໜາຂອງນັອດລໍ້ທຸກໂຕ", 
      "ໄລຍະຟຣີຂອງພວງມາໄລ Power Steering"
    ],
    itemsEn: [
      "Brake fluid level, pedal play & hydraulic pressure",
      "Parking brake holding force on 15% incline",
      "Steer axle kingpins, tie rods & steer cylinder",
      "Solid tire tread depth, wear pattern & cuts",
      "Wheel lug nuts torque verification",
      "Power steering orbitrol responsiveness & free play"
    ]
  },
  { 
    categoryLo: "4. ລະບົບໄຟຟ້າ & ຄວາມປອດໄພ (Safety & Electrical)", 
    categoryEn: "4. Electrical, Warning & Safety System",
    itemsLo: [
      "ໄຟໜ້າ, ໄຟຫຼັງ, ໄຟລ້ຽວ, ໄຟຖອຍ", 
      "ສຽງແກ ແລະ ສຽງສັນຍານຖອຍຫຼັງ", 
      "ໄຟໝູນວາບວາບ Beacon Safety Light", 
      "ສາຍຮັດນິລະໄພ & ສະວິດເຊັນເຊີເກົ້າອີ້", 
      "ປຸ່ມຕັດໄຟສຸກເສີນ Emergency Stop", 
      "ແວ່ນມອງຫຼັງ ແລະ ໂຄງເຫຼັກນິລະໄພ Overhead Guard"
    ],
    itemsEn: [
      "Headlights, tail lights, indicators & reverse lights",
      "Horn operation & reverse warning beeper",
      "Strobe beacon safety light & blue spot projector",
      "Seat belt mechanism & operator presence switch (OPS)",
      "Emergency power disconnect button",
      "Rearview mirrors & overhead guard structure"
    ]
  }
];

export const PROVINCES_LO = [
  "ນະຄອນຫຼວງວຽງຈັນ (Vientiane Capital)",
  "ແຂວງວຽງຈັນ (Vientiane Province)",
  "ສະຫວັນນະເຂດ (Savannakhet)",
  "ຈຳປາສັກ (Champasak / Pakse)",
  "ຄຳມ່ວນ (Khammouane / Thakhek)",
  "ຫຼວງພະບາງ (Luang Prabang)",
  "ບໍລິຄຳໄຊ (Bolikhamxay)",
  "ໄຊຍະບູລີ (Xayaburi)",
  "ອື່ນໆ (Other Province)"
];

export const PROVINCES_EN = [
  "Vientiane Capital",
  "Vientiane Province",
  "Savannakhet Province",
  "Champasak / Pakse",
  "Khammouane / Thakhek",
  "Luang Prabang",
  "Bolikhamxay",
  "Xayaburi",
  "Other Province"
];

// 360° Total Fleet & Operations Management Ecosystem Data Model
export const ECOSYSTEM_JOURNEY_STEPS = [
  {
    step: "01",
    titleLo: "ວິເຄາະ & ຈັດຫາລົດ",
    titleEn: "Fleet Audit & Sizing",
    descLo: "0 CAPEX Leasing / ຈັດຫາລົດໃໝ່-ມືສອງ",
    descEn: "0-CAPEX Lease / New & Inspected"
  },
  {
    step: "02",
    titleLo: "ຄົນຂັບ & ຄວາມປອດໄພ",
    titleEn: "Workforce & Safety",
    descLo: "ຄົນຂັບມືອາຊີບ + Safety Academy",
    descEn: "Certified Staffing + Academy"
  },
  {
    step: "03",
    titleLo: "ຕິດຕາມ IoT & PM",
    titleEn: "IoT & Auto PM",
    descLo: "ບັນທຶກຊົ່ວໂມງອັດຕະໂນມັດ 250h-1000h",
    descEn: "Real-time Telematics & PM Alerts"
  },
  {
    step: "04",
    titleLo: "ສາງອາໄຫຼ່ Consignment",
    titleEn: "On-Site Spares",
    descLo: "ຝາກອາໄຫຼ່ໄວ້ທີ່ສາງໂຮງງານລູກຄ້າ",
    descEn: "Fast-Moving Spares in Client Plant"
  },
  {
    step: "05",
    titleLo: "ກູ້ໄພດ່ວນ 24/7",
    titleEn: "Rapid Rescue SLA",
    descLo: "Mobile 2-4h + ລົດສຳຮອງປ່ຽນແທນຟຣີ",
    descEn: "Mobile 2-4h + Standby Guarantee"
  },
  {
    step: "06",
    titleLo: "ຮັບຊື້ຄືນ & ເທຣິນລົດໃໝ່",
    titleEn: "Buy-Back & Trade-In",
    descLo: "ປ່ຽນລົດເກົ່າເປັນລົດໃໝ່ທຸກໆ 3-5 ປີ",
    descEn: "Universal Trade-In & Green EV Fleet"
  }
];

export const ECOSYSTEM_PILLARS = [
  {
    id: "supply-tradein",
    icon: RefreshCw,
    badgeLo: "ວົງຈອນຊີວິດລົດ 360°",
    badgeEn: "Lifecycle Fleet Care",
    color: "from-blue-600 to-cyan-500",
    borderHover: "hover:border-blue-500/50",
    bgLight: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    titleLo: "1. ຈັດຫາລົດ & ຮັບຊື້ຄືນຕະຫຼອດຊີວິດ (Fleet Supply & Trade-In)",
    titleEn: "1. Fleet Supply, Trade-In & Guaranteed Buy-Back",
    subtitleLo: "ບໍ່ມີຄ່າເສື່ອມລາຄາຕົກຄ້າງ • ໝູນວຽນລົດໃໝ່ໄດ້ທຸກໆ 3-5 ປີ ໂດຍບໍ່ຕ້ອງແບກພາລະ",
    subtitleEn: "Zero Capital Depreciation • Rotate into Brand-New Fleet Every 3-5 Years",
    descLo: "ລູກຄ້າບໍ່ຕ້ອງກັງວົນເລື່ອງລົດເກົ່າຕົກສະເປັກ ຫຼື ຂາຍຕໍ່ຍາກ. ພວກເຮົາມີບໍລິການຈັດຫາລົດໃໝ່/ມືສອງຍີ່ປຸ່ນ (EV Lithium-ion & Diesel), ໃຫ້ເຊົ່າເລີ່ມຕົ້ນ 0 LAK CAPEX, ພ້ອມຮັບປະກັນຊື້ຄືນ (Guaranteed Buy-Back) ຫຼື ຕີລາຄາເທຣິນລົດເກົ່າທຸກຍີ່ຫໍ້ເພື່ອປ່ຽນເປັນລົດໃໝ່ໄດ້ຕະຫຼອດເວລາ.",
    descEn: "Eliminate asset depreciation risks. We provide full-line new/inspected Japanese forklifts (Lithium-ion EV & Diesel), 0-CAPEX operating leases, and guaranteed Buy-Back / Trade-In valuation to swap aged units into modern high-efficiency electric fleets.",
    highlightsLo: [
      "ເຊົ່າໄລຍະຍາວ 1-5 ປີ ເລີ່ມຕົ້ນ 0 LAK CAPEX (ຫັກ OPEX ພາສີໄດ້ 100%)",
      "ໂຄງການ Guaranteed Buy-Back ຮັບຊື້ຄືນຕາມມູນຄ່າຕະຫຼາດທີ່ຍຸຕິທຳ",
      "Trade-In ປ່ຽນລົດເກົ່າທຸກຍີ່ຫໍ້ (Toyota, Komatsu, Mitsubishi, TCM) ເປັນລົດໄຟຟ້າໃໝ່"
    ],
    highlightsEn: [
      "1-5 Year B2B Fleet Leasing starting at 0 LAK CAPEX (100% Tax Deductible OPEX)",
      "Guaranteed Buy-Back program ensuring high residual salvage value",
      "Universal Trade-In program: trade any legacy brand into smart Lithium-ion"
    ],
    slaLo: "Trade-In ປະເມີນລາຄາພາຍໃນ 24 ຊົ່ວໂມງ",
    slaEn: "24h Trade-In Valuation Guarantee",
    deepLinkUrl: "#sale",
    deepLinkLabelLo: "ເບິ່ງລົດພ້ອມສົ່ງ & ເຊົ່າ",
    deepLinkLabelEn: "Browse Inventory & Lease"
  },
  {
    id: "zero-downtime",
    icon: LifeBuoy,
    badgeLo: "Zero-Downtime SLA",
    badgeEn: "Zero-Downtime SLA",
    color: "from-rose-600 to-amber-500",
    borderHover: "hover:border-rose-500/50",
    bgLight: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    titleLo: "2. ສາຍການຜະລິດບໍ່ມີມື້ຢຸດ & ລົດສຳຮອງ (Zero Downtime & Standby Fleet)",
    titleEn: "2. Zero Downtime Guarantee & Standby Replacement Fleet",
    subtitleLo: "ສາຍດ່ວນກູ້ໄພ 24/7 • ແປງເກີນ 24h ເອົາລົດສຳຮອງປ່ຽນແທນຟຣີ",
    subtitleEn: "24/7 Rapid Mobile Rescue • Free Replacement Unit if Repair Exceeds 24 Hours",
    descLo: "ລົດຍົກເສຍ ໝາຍເຖິງສາຍການຜະລິດໂຮງງານຢຸດສະງັກ. DK LAO ແກ້ໄຂດ້ວຍ SLA ທີ່ເຄັ່ງຄັດທີ່ສຸດ: ໜ່ວຍ Mobile Service ເຖິງພື້ນທີ່ໂຮງງານໃນ 2-4 ຊົ່ວໂມງ. ຖ້າອາການໜັກສ້ອມເກີນ 24 ຊົ່ວໂມງ, ພວກເຮົາຈັດສົ່ງລົດຍົກສຳຮອງຂະໜາດເທົ່າກັນໄປໃຫ້ໃຊ້ງານຟຣີທັນທີ.",
    descEn: "Forklift downtime stalls entire production lines. DK LAO enforces the strictest industrial SLA in Laos: Rapid Mobile Service vans arrive on-site within 2-4 hours. For major overhauls exceeding 24 hours, we dispatch an equivalent standby replacement unit free of charge.",
    highlightsLo: [
      "Rapid Response SLA: ໜ່ວຍຊ່າງເຄື່ອນທີ່ລົງພື້ນທີ່ໂຮງງານພາຍໃນ 2-4 ຊົ່ວໂມງ",
      "Standby Fleet Guarantee: ລົດສຳຮອງຂະໜາດເທົ່າກັນສະແຕນບາຍປ່ຽນແທນຟຣີ",
      "Dedicated On-Site Technician: ຊ່າງປະຈຳໂຮງງານ 8h/24h ສໍາລັບ Fleet 5 ຄັນຂຶ້ນໄປ"
    ],
    highlightsEn: [
      "2-4h On-Site Rapid Response SLA across industrial zones in Vientiane & provinces",
      "Free equivalent standby forklift delivered if maintenance exceeds 24 hours",
      "Dedicated on-site resident technician available for mega fleets (>5 units)"
    ],
    slaLo: "ຕອບສະໜອງພາຍໃນ 2-4 ຊົ່ວໂມງ ທົ່ວເຂດອຸດສາຫະກຳ",
    slaEn: "2-4h On-Site Emergency SLA",
    deepLinkUrl: "#service",
    deepLinkLabelLo: "ເບິ່ງມາດຕະຖານ Mobile Service",
    deepLinkLabelEn: "Inspect Mobile 2-4h SLA"
  },
  {
    id: "digital-telematics",
    icon: Activity,
    badgeLo: "Digital IoT & ERP",
    badgeEn: "Digital IoT & ERP",
    color: "from-sky-600 to-indigo-500",
    borderHover: "hover:border-sky-500/50",
    bgLight: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    titleLo: "3. ບໍລິຫານຜ່ານລະບົບດິຈິທັລ & IoT (Digital Telematics & Auto PM)",
    titleEn: "3. Digital Telematics, IoT Fleet Health & Automated PM",
    subtitleLo: "ຕິດຕາມຊົ່ວໂມງໃຊ້ງານແບບ Real-time • ແຈ້ງເຕືອນຮອບ PM ອັດຕະໂນມັດ",
    subtitleEn: "Real-Time Hour Logging • Predictive Maintenance & Digital Audit Records",
    descLo: "ໝົດຍຸກຈົດບັນທຶກໃສ່ເຈ້ຍ. ລະບົບ Cloud ERP & IoT ຂອງພວກເຮົາເຊື່ອມຕໍ່ກັບກ່ອງບັນທຶກຊົ່ວໂມງເຮັດວຽກຂອງລົດ, ແຈ້ງເຕືອນຮອບປ່ຽນຖ່າຍ (250h, 500h, 1000h) ອັດຕະໂນມັດ, ພ້ອມອອກໃບຢັ້ງຢືນສຸຂະພາບລົດ 24 ຈຸດແບບ Digital Audit-Ready ສຳລັບຍື່ນກວດສອບ ISO ໄດ້ທັນທີ.",
    descEn: "Replace paper logbooks with automated intelligence. Our IoT-enabled fleet platform tracks operating hours in real time, triggers automated preventive maintenance (PM) schedules, and archives 24-point vehicle inspection records ready for ISO 9001/3691 and factory audits.",
    highlightsLo: [
      "Automated PM Alert: ລະບົບເຕືອນຮອບບຳລຸງຮັກສາອັດຕະໂນມັດ — ໂຮງງານບໍ່ຕ້ອງຄອຍຈື່",
      "Digital Health Audit Logs: ໃບຢັ້ງຢືນກວດເຊັກ 24 ຈຸດ ບັນທຶກໃນລະບົບ ພິມໄດ້ 24/7",
      "Battery & Motor Telematics: ວິເຄາະສຸຂະພາບແບັດເຕີຣີ Lithium-ion ແລະ ແຮງດັນໄຮໂດຣລິກ"
    ],
    highlightsEn: [
      "Automated PM Scheduling at 250h, 500h, 1000h without client manual tracking",
      "Digital 24-Point Health Certificates with engineer sign-offs for factory audits",
      "Lithium battery cycle life and hydraulic operating pressure telemetry"
    ],
    slaLo: "ກວດສອບປະຫວັດລົດຍ້ອນຫຼັງໄດ້ 100% ຕະຫຼອດສັນຍາ",
    slaEn: "100% Traceable Digital Audit History",
    deepLinkUrl: "#pm-calculator",
    deepLinkLabelLo: "ຄຳນວນ PM Estimator",
    deepLinkLabelEn: "Calculate PM Costs"
  },
  {
    id: "consignment-parts",
    icon: Warehouse,
    badgeLo: "ສາງອາໄຫຼ່ຝາກໃນໂຮງງານ",
    badgeEn: "On-Site Consignment",
    color: "from-emerald-600 to-teal-500",
    borderHover: "hover:border-emerald-500/50",
    bgLight: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    titleLo: "4. ສາງອາໄຫຼ່ຝາກໃນໂຮງງານ (On-Site Consignment Stock & Store Hub)",
    titleEn: "4. On-Site Consignment Stock & 16,000+ Parts Store Hub",
    subtitleLo: "ຝາກອາໄຫຼ່ດ່ວນໄວ້ທີ່ສາງລູກຄ້າ • ເບີກໃຊ້ກ່ອນ ຈ່າຍຕາມຮອບບິນ",
    subtitleEn: "Zero Waiting Time for Fast-Moving Spares • Stored Inside Your Plant",
    descLo: "ລູກຄ້າບໍ່ຕ້ອງລໍຖ້າອາໄຫຼ່ຈາກຕ່າງປະເທດ. DK LAO ຈັດຊຸດອາໄຫຼ່ສຸກເສີນທີ່ໃຊ້ເລື້ອຍໆ (ໄສ້ກອງ, ຢາງຕັນ, ນ້ຳມັນໄຮໂດຣລິກ, ຟິວສ໌) ໄປຝາກສະຕັອກໄວ້ໃນສາງຂອງໂຮງງານລູກຄ້າໂດຍກົງ (Consignment Stock). ເມື່ອເກີດເຫດສຸກເສີນ, ຊ່າງສາມາດປ່ຽນໄດ້ທັນທີໂດຍບໍ່ຕ້ອງລໍຖ້າ.",
    descEn: "Eliminate import delays and inventory carrying costs. DK LAO places critical fast-moving spare parts (filters, solid tires, certified fluids, electrical fuses) directly inside your factory warehouse on consignment. Technicians replace parts immediately when needed — invoiced upon actual consumption.",
    highlightsLo: [
      "Zero Waiting Time: ປ່ຽນອາໄຫຼ່ທັນທີພາຍໃນ 15 ນາທີ ໂດຍບໍ່ຕ້ອງລໍຖ້າຂົນສົ່ງ",
      "Cash Flow Friendly: ບໍ່ຕ້ອງຈ່າຍເງິນລ່ວງໜ້າ ເບີກໃຊ້ເທົ່າໃດ ຈ່າຍເທົ່ານັ້ນຕາມຮອບບິນ",
      "Central Express Hub: ສາງໃຫຍ່ 16,000+ SKUs ໃນວຽງຈັນ ພ້ອມຈັດສົ່ງດ່ວນທົ່ວປະເທດ"
    ],
    highlightsEn: [
      "Zero lead time: replace worn parts in 15 minutes right from your on-site stock",
      "Improves cash flow: zero upfront parts capital, pay only for consumed spares",
      "Backed by Vientiane central parts hub with 16,000+ SKUs for express delivery"
    ],
    slaLo: "ປ່ຽນອາໄຫຼ່ດ່ວນພາຍໃນ 15-30 ນາທີຈາກສະຕັອກໂຮງງານ",
    slaEn: "Instant 15-Min Part Replacement from Plant Stock",
    deepLinkUrl: "#spare-parts",
    deepLinkLabelLo: "ເບິ່ງສາງອາໄຫຼ່ OEM 16,000+",
    deepLinkLabelEn: "Browse 16,000+ Parts"
  },
  {
    id: "workforce-safety",
    icon: GraduationCap,
    badgeLo: "ຄົນຂັບ & ຄວາມປອດໄພ",
    badgeEn: "Workforce & Safety",
    color: "from-amber-600 to-orange-500",
    borderHover: "hover:border-amber-500/50",
    bgLight: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    titleLo: "5. ບໍລິຫານຄົນຂັບ & ອົບຮົມຄວາມປອດໄພ (Workforce Outsourcing & Academy)",
    titleEn: "5. Professional Operator Outsourcing & Safety Academy",
    subtitleLo: "ສະໜອງຄົນຂັບລົດຍົກມືອາຊີບ • ອົບຮົມ Safety ມອບໃບຢັ້ງຢືນຟຣີ",
    subtitleEn: "Certified Licensed Operators • In-House Safety Training & Factory Retrofits",
    descLo: "ລົດດີແຕ່ຂາດຄົນຂັບທີ່ຊຳນານກໍ່ເກີດອຸບັດຕິເຫດໄດ້. ພວກເຮົາສະໜອງບໍລິການຄົນຂັບລົດຍົກທີ່ຜ່ານການກວດປະຫວັດ, ມີໃບຂັບຂີ່ສະເພາະທາງ, ພ້ອມທັງເປີດຄອຣ໌ສ DK LAO Safety Academy ຝຶກອົບຮົມການຂັບຂີ່ປອດໄພ ແລະ ມອບໃບຢັ້ງຢືນ (Operator Certification) ໃຫ້ພະນັກງານຂອງໂຮງງານລູກຄ້າ.",
    descEn: "Top machinery requires certified operators. We provide licensed forklift operator outsourcing with background checks and insurance, alongside our DK LAO Safety Academy offering on-site safety training, OSHA compliance certifications, and daily pre-shift digital safety checks.",
    highlightsLo: [
      "Operator Outsourcing: ສະໜອງຄົນຂັບມືອາຊີບ ພ້ອມປະກັນໄພອຸບັດຕິເຫດຄົບຊຸດ",
      "Safety Academy: ຄອຣ໌ສຝຶກອົບຮົມການຂັບຂີ່ປອດໄພ ມອບໃບຢັ້ງຢືນໃຫ້ຄົນຂັບໂຮງງານ",
      "Safety Retrofits: ບໍລິການຕິດຕັ້ງໄຟ Blue Spot, Red Zone Laser ແລະ ລະບົບ OPS"
    ],
    highlightsEn: [
      "Licensed operator staffing with comprehensive occupational insurance",
      "Certified Operator Safety Academy with formal graduation credentials",
      "Full warehouse safety retrofits: Blue Spot LED, Red Perimeter laser, OPS interlocks"
    ],
    slaLo: "100% Zero-Accident Safety Compliance Focus",
    slaEn: "100% Zero-Accident Compliance",
    deepLinkUrl: "#rental",
    deepLinkLabelLo: "ເບິ່ງຊຸດຄວາມປອດໄພ Plant Safety",
    deepLinkLabelEn: "Inspect Plant Safety Suite"
  },
  {
    id: "unified-accounting",
    icon: Receipt,
    badgeLo: "100% OPEX ພາສີ",
    badgeEn: "100% OPEX & Consolidated Billing",
    color: "from-purple-600 to-pink-500",
    borderHover: "hover:border-purple-500/50",
    bgLight: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    titleLo: "6. ໃບແຈ້ງໜີ້ດຽວຄົບຈົບ & ການເງິນຍືດຫຍຸ່ນ (Unified B2B Accounting & 0 CAPEX)",
    titleEn: "6. Unified B2B Billing & Financial Flexibility (100% OPEX)",
    subtitleLo: "1 ໃບແຈ້ງໜີ້ລວມທຸກຢ່າງ • ຫຼຸດພາສີນິຕິບຸກຄົນຖືກຕ້ອງຕາມກົດໝາຍ",
    subtitleEn: "One Consolidated Invoice for Fleet, Service & Parts • 100% Tax Deductible",
    descLo: "ຫຼຸດພາລະໃຫ້ພະແນກຈັດຊື້ ແລະ ຫ້ອງການບັນຊີໂຮງງານ 90%. DK LAO ອອກໃບແຈ້ງໜີ້ລວມຍອດດຽວ (One Consolidated Monthly Invoice) ທີ່ຄຸ້ມຄອງທັງ ຄ່າເຊົ່າລົດ + ຄ່າບຳລຸງຮັກສາ + ອາໄຫຼ່ + ປະກັນໄພ + ຄົນຂັບ ພ້ອມໃບກຳກັບພາສີອາກອນຖືກຕ້ອງຕາມກົດໝາຍ ສປປ ລາວ.",
    descEn: "Slash corporate administrative overhead by 90%. DK LAO delivers a single consolidated monthly invoice covering lease fees, preventive maintenance, consumable spare parts, insurance, and operator staffing — backed by official VAT tax documentation fully deductible under Lao tax law.",
    highlightsLo: [
      "One Monthly Invoice: ໃບແຈ້ງໜີ້ດຽວຄຸ້ມຄອງທຸກການບໍລິການ ບັນຊີກວດສອບງ່າຍດາຍ",
      "100% OPEX Tax Advantage: ຫັກເປັນຄ່າໃຊ້ຈ່າຍດຳເນີນງານໄດ້ເຕັມຈຳນວນ ບໍ່ມີບັນຫາພາສີ",
      "Flexible Payment Terms: ຮອງຮັບສິນເຊື່ອ B2B Credit Term 30-60 ວັນ ສຳລັບໂຮງງານໃຫຍ່"
    ],
    highlightsEn: [
      "Consolidated single monthly invoice eliminating dozens of supplier bills",
      "100% Tax-deductible OPEX recognized by the Ministry of Finance of Lao PDR",
      "Flexible 30-60 day B2B commercial credit terms for enterprise manufacturers"
    ],
    slaLo: "ອອກໃບກຳກັບພາສີອາກອນ ແລະ ໃບແຈ້ງໜີ້ຖືກຕ້ອງ 100%",
    slaEn: "100% Compliant Official VAT Tax Invoicing",
    deepLinkUrl: "#rental",
    deepLinkLabelLo: "ປຽບທຽບ CAPEX vs OPEX",
    deepLinkLabelEn: "Compare CAPEX vs OPEX"
  }
];

