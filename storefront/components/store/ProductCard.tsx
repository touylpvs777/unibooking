"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { InventoryItem, INITIAL_CATALOG } from "@/data/catalog";
import { ShoppingCart, Package, Check, Eye, Zap, FileText, Download, Clock, MessageCircle, Sliders, Sparkles, ArrowRight, ShieldAlert, ShieldCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, calculateLAKPrice, calculateRetailForeignPrice, FACTORY_MARKUP_PERCENT, FACTORY_MARKUP_RATE } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { RFQModal } from "./RFQModal";
import { useLocale } from "next-intl";

const SPEC_TRANSLATIONS_LO: Record<string, string> = {
  "Height": "ຄວາມສູງ (Height)",
  "Width": "ຄວາມກວ້າງ (Width)",
  "Length": "ຄວາມຍາວ (Length)",
  "Dimensions": "ຂະໜາດລວມ (Dimensions)",
  "Type": "ປະເພດ / ຮູບແບບ (Type)",
  "Material": "ວັດສະດຸ (Material)",
  "Capacity": "ຄວາມຈຸ / ຮັບນ້ຳໜັກ (Capacity)",
  "Load Capacity": "ນ້ຳໜັກບັນທຸກ (Load Capacity)",
  "Lifting Height": "ໄລຍະຍົກສູງສຸດ (Lifting Height)",
  "Weight": "ນ້ຳໜັກຕົວເຄື່ອງ (Weight)",
  "Net Weight": "ນ້ຳໜັກສຸດທິ (Net Weight)",
  "Gross Weight": "ນ້ຳໜັກລວມ (Gross Weight)",
  "Power": "ກຳລັງໄຟຟ້າ (Power)",
  "Power Supply": "ລະບົບໄຟຟ້າ (Power Supply)",
  "Voltage": "ແຮງດັນໄຟ (Voltage)",
  "Frequency": "ຄວາມຖີ່ໄຟ (Frequency)",
  "Motor": "ມໍເຕີ (Motor)",
  "Battery": "ແບັດເຕີຣີ (Battery)",
  "Battery Capacity": "ຄວາມຈຸແບັດເຕີຣີ (Battery Capacity)",
  "Fork Width": "ຄວາມກວ້າງງາ (Fork Width)",
  "Fork Length": "ຄວາມຍາວງາ (Fork Length)",
  "Rollers": "ປະເພດລໍ້ (Rollers)",
  "Wheel Type": "ປະເພດລໍ້ (Wheel Type)",
  "Wheel Material": "ວັດສະດຸລໍ້ (Wheel Material)",
  "Tank Capacity": "ຄວາມຈຸຖັງ (Tank Capacity)",
  "Volume": "ປະລິມານຄວາມຈຸ (Volume)",
  "Airflow": "ແຮງລົມດູດ (Airflow)",
  "Suction Power": "ແຮງດູດ (Suction Power)",
  "Noise Level": "ລະດັບສຽງ (Noise Level)",
  "Cable Length": "ຄວາມຍາວສາຍໄຟ (Cable Length)",
  "Hose Length": "ຄວາມຍາວສາຍດູດ (Hose Length)",
  "Pressure": "ແຮງດັນ (Pressure)",
  "Speed": "ຄວາມໄວ (Speed)",
  "Max Speed": "ຄວາມໄວສູງສຸດ (Max Speed)",
  "Warranty": "ການຮັບປະກັນ (Warranty)",
  "Color": "ສີ (Color)",
  "Size": "ຂະໜາດ (Size)",
  "Origin": "ປະເທດຕົ້ນກຳເນີດ (Origin)",
  "Standard": "ມາດຕະຖານ (Standard)",
  "Certification": "ໃບຢັ້ງຢືນ (Certification)",
  "Platform Size": "ຂະໜາດຖານຮອງ (Platform Size)",
  "Table Size": "ຂະໜາດໜ້າໂຕະ (Table Size)",
  "Stroke": "ໄລຍະຊັກ / ຍົກ (Stroke)",
};

function formatSpecKey(key: string, isLao: boolean): string {
  if (!isLao) return key;
  if (SPEC_TRANSLATIONS_LO[key]) return SPEC_TRANSLATIONS_LO[key];
  const found = Object.keys(SPEC_TRANSLATIONS_LO).find(
    k => k.toLowerCase() === key.toLowerCase().trim()
  );
  if (found) return SPEC_TRANSLATIONS_LO[found];
  return key;
}

const GALLERY_IMAGE_META: Record<string, { lo: string; en: string }> = {
  "front": { lo: "ມຸມໜ້າ", en: "Front View" },
  "rear": { lo: "ມຸມຫຼັງ", en: "Rear View" },
  "left": { lo: "ມຸມຊ້າຍ", en: "Left Profile" },
  "right": { lo: "ມຸມຂວາ", en: "Right Profile" },
  "tire_front": { lo: "ຢາງໜ້າ", en: "Front Tire" },
  "tire_rear": { lo: "ຢາງຫຼັງ", en: "Rear Tire" },
  "dashboard": { lo: "ໜ້າປັດ", en: "Dashboard" },
  "seat": { lo: "ເບາະນັ່ງ", en: "Operator Seat" },
  "pedals": { lo: "ແປ້ນຄັນເລັ່ງ/ເບຣກ", en: "Pedals Controls" },
  "levers": { lo: "ຄັນໂຍກ", en: "Hydraulic Levers" },
  "mast": { lo: "ເສົາຍົກ", en: "Mast & Lift" },
  "forks": { lo: "ງ່າຍົກ", en: "Forks & Carriage" },
};

function getGalleryImageLabel(url: string, isLao: boolean): string {
  if (url.includes("tire_front")) return isLao ? "ຢາງໜ້າ" : "Front Tire";
  if (url.includes("tire_rear")) return isLao ? "ຢາງຫຼັງ" : "Rear Tire";
  if (url.includes("dashboard")) return isLao ? "ໜ້າປັດ" : "Dashboard";
  if (url.includes("seat")) return isLao ? "ເບາະນັ່ງ" : "Operator Seat";
  if (url.includes("pedals")) return isLao ? "ແປ້ນຄັນເລັ່ງ/ເບຣກ" : "Pedals Controls";
  if (url.includes("levers")) return isLao ? "ຄັນໂຍກ" : "Hydraulic Levers";
  if (url.includes("mast") || url.includes("lift")) return isLao ? "ເສົາຍົກ" : "Mast & Lift";
  if (url.includes("forks")) return isLao ? "ງ່າຍົກ" : "Forks & Carriage";
  if (url.includes("front")) return isLao ? "ມຸມໜ້າ" : "Front View";
  if (url.includes("rear")) return isLao ? "ມຸມຫຼັງ" : "Rear View";
  if (url.includes("left")) return isLao ? "ມຸມຊ້າຍ" : "Left Profile";
  if (url.includes("right")) return isLao ? "ມຸມຂວາ" : "Right Profile";
  if (url.includes("wheel")) return isLao ? "ລໍ້ & ຢາງ" : "Wheel";
  return isLao ? "ຮູບຕົວຈິງ" : "Photo";
}

// Helpers for Realistic Dynamic Lead Time Display (Matching Enterprise Logistics)
function getLeadTimeBadge(leadTimeStr: string | undefined, isLao: boolean) {
  if (!leadTimeStr) return isLao ? "ນຳເຂົ້າ 30-45 ວັນ (ຮອບໂຮງງານ)" : "Pre-Order (30-45 Days)";
  const lt = leadTimeStr.toLowerCase();
  
  // Real In-Stock at Vientiane Logistics Hub
  if (lt.includes("24") || lt.includes("48") || lt.includes("hub") || lt.includes("dispatch") || (lt.includes("in stock") && !lt.includes("30-45"))) {
    return isLao ? "ພ້ອມສົ່ງ 24-48 ຊມ (ສາງວຽງຈັນ)" : "VTE Hub (24-48h Dispatch)";
  }
  // Direct Factory Import
  if (lt.includes("30") || lt.includes("45") || lt.includes("pre-order") || lt.includes("import") || lt.includes("factory")) {
    return isLao ? "ນຳເຂົ້າ 30-45 ວັນ (ຮອບໂຮງງານ)" : "Factory Direct (30-45 Days)";
  }
  return isLao ? `ຈັດສົ່ງ (${leadTimeStr.replace(/in stock|delivery|\(|\)/ig, "").trim()})` : `Lead Time (${leadTimeStr})`;
}

function getLeadTimeBusiness(leadTimeStr: string | undefined, isLao: boolean) {
  if (!leadTimeStr) return isLao ? "ສິນຄ້ານຳເຂົ້າຕາມຮອບໂຮງງານ 30-45 ວັນລັດຖະການ" : "Direct Factory Import: 30-45 Business Days";
  const lt = leadTimeStr.toLowerCase();
  
  if (lt.includes("24") || lt.includes("48") || lt.includes("hub") || lt.includes("dispatch") || (lt.includes("in stock") && !lt.includes("30-45"))) {
    return isLao ? "ສິນຄ້າພ້ອມຈັດສົ່ງທັນທີພາຍໃນ 24-48 ຊົ່ວໂມງ (ສາງນະຄອນຫຼວງວຽງຈັນ)" : "Immediate Dispatch from Vientiane Logistics Hub (24-48 Hours)";
  }
  return isLao ? "ສິນຄ້ານຳເຂົ້າຕາມຮອບໂຮງງານຜູ້ຜະລິດ 30-45 ວັນລັດຖະການ" : "Official Factory Import Order: 30-45 Business Days";
}

/**
 * Only major equipment, machinery, lifting, and high-value industrial assets qualify for warranty (12 months).
 * Small consumables, signage, PPE, tools, basic wheels, and accessories do not carry warranty.
 */
export function isBigProductEligibleForWarranty(item?: InventoryItem): boolean {
  if (!item || !item.warranty_months || item.warranty_months <= 0) return false;

  const name = ((item.part_name || '') + ' ' + (item.part_name_lo || '')).toLowerCase();
  const cat = (item.category || '').toLowerCase();
  const unitPrice = Number(item.unit_price) || 0;
  const currency = item.currency || 'THB';
  const priceTHB = currency === 'THB' ? unitPrice : (currency === 'USD' ? unitPrice * 35 : unitPrice / 650);

  // 1. Definite small items, consumables, PPE, signage, manual accessories to exclude
  const smallItemKeywords = [
    'sign', 'caution', 'wet floor', 'cone', 'tape', 'glove', 'vest', 'goggle', 'helmet',
    'mop', 'broom', 'brush', 'pad', 'bucket', 'bag', 'cloth', 'duster', 'sponge',
    'bottle', 'dispenser', 'refill', 'paper', 'mask', 'filter pad', 'label', 'wheel chock',
    'strap', 'sling', 'band', 'box', 'film', 'carton', 'cable tie', 'tag', 'caster', 'wheel',
    'ປ້າຍ', 'ຖົງມື', 'ແວ່ນຕາ', 'ເສື້ອ', 'ໄມ້ຖູ', 'ຟອຍ', 'ຖັງ', 'ຜ້າ', 'ເທບ', 'ໜ້າກາກ', 'ຂວດ',
    'ສາຍຮັດ', 'ກ່ອງ', 'ລໍ້', 'ໝວກ'
  ];
  if (smallItemKeywords.some(kw => name.includes(kw))) {
    return false;
  }

  // 2. Categories that are predominantly small consumables / supplies
  if (
    cat.includes('safety') ||
    cat.includes('packaging') ||
    cat.includes('cleaning') ||
    cat.includes('wheels') ||
    cat.includes('accessories')
  ) {
    // Only motorized/electrical industrial machines in these categories qualify (e.g. electric floor scrubber, industrial vacuum)
    const isElectricMachine = (
      name.includes('machine') || 
      name.includes('electric') || 
      name.includes('motor') || 
      name.includes('vacuum') || 
      name.includes('nilfisk') ||
      name.includes('scrubber') ||
      name.includes('sweeper') ||
      name.includes('washer') ||
      name.includes('ເຄື່ອງດູດຝຸ່ນ') ||
      name.includes('ເຄື່ອງຂັດ') ||
      name.includes('ເຄື່ອງກວາດ') ||
      name.includes('ເຄື່ອງສີດນ້ຳ')
    ) && priceTHB >= 3000;

    return isElectricMachine;
  }

  // 3. Heavy industrial machinery, lifting, vehicles, solar, hydraulic systems
  if (
    cat.includes('handling') ||
    cat.includes('lifting') ||
    cat.includes('machinery') ||
    cat.includes('forklift') ||
    cat.includes('pallet') ||
    cat.includes('hydraulic') ||
    cat.includes('solar') ||
    cat.includes('fleet')
  ) {
    return true;
  }

  // 4. Other heavy equipment above price threshold (>= 3,000 THB or ~2,000,000 LAK)
  if (priceTHB >= 3000) {
    return true;
  }

  return false;
}

interface ProductCardProps {
  item: InventoryItem;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ item, viewMode = 'grid' }: ProductCardProps) {
  const { addToCart, openCheckout, exchangeRates, isAdminMode } = useCart();
  const locale = useLocale();
  const isLao = locale === 'lo';

  const [isAdded, setIsAdded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showRfq, setShowRfq] = useState(false);
  
  const [selectedColor, setSelectedColor] = useState<string | null>(item?.colors && item.colors.length > 0 ? item.colors[0] : null);
  const [selectedSize, setSelectedSize] = useState<string | null>(item?.sizes && item.sizes.length > 0 ? item.sizes[0] : null);
  const [quantity, setQuantity] = useState<number>(1);
  const [mainImage, setMainImage] = useState<string | null>(item?.image_url || null);

  if (!item) return null;
  const isRental = item.category === 'Equipment Rental';
  const hasWarranty = isBigProductEligibleForWarranty(item);
  const warrantyMonths = item.warranty_months || 12;
  
  const displayName = (isLao ? (item.part_name_lo || item.part_name) : (item.part_name || item.part_name_lo)) || item.sku_code || 'Product';
  const displayDesc = isLao ? (item.description_lo || item.description) : (item.description || item.description_lo);

  const factoryPrice = Number(item.unit_price) || 0;
  const itemCurrency = (item as any).currency || 'THB';
  const retailForeignPrice = calculateRetailForeignPrice(factoryPrice, itemCurrency);

  // Real DB Discount Logic vs Mock
  let isSale = false;
  let discountPercent = 0;
  let originalPriceNative = factoryPrice;

  if (item.original_price && item.original_price > factoryPrice) {
    isSale = true;
    originalPriceNative = Number(item.original_price);
    discountPercent = Math.round(((originalPriceNative - factoryPrice) / originalPriceNative) * 100);
  } else {
    // Fallback to deterministic mock if no real discount in DB
    const discountSeed = item.sku_id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    isSale = !isRental && (discountSeed % 5 === 0);
    discountPercent = isSale ? (discountSeed % 3 === 0 ? 30 : (discountSeed % 2 === 0 ? 20 : 15)) : 0;
    originalPriceNative = isSale ? factoryPrice / (1 - discountPercent / 100) : factoryPrice;
  }

  const discountSeed = item.sku_id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const isBogo = !isRental && !isSale && (discountSeed % 7 === 0);
  const stockCount = (discountSeed % 150) + 12; // Simulated WMS Stock (12 - 161)
  const isLowStock = stockCount < 20;
  
  const originalPriceLAK = calculateLAKPrice(originalPriceNative, itemCurrency, item.category, exchangeRates);
  
  const relatedProducts = item.related_skus 
    ? INITIAL_CATALOG.filter(prod => item.related_skus?.includes(prod.sku_id))
    : [];

  const handleAddToCart = () => {
    // In a real app we'd pass color and size to cart item, but for now we just add it to cart.
    addToCart(item, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleQuickBuy = () => {
    addToCart(item, quantity);
    openCheckout();
  };

  const priceLAK = calculateLAKPrice(factoryPrice, itemCurrency, item.category, exchangeRates);

  return (
    <>
      <motion.div
        whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(0,91,172,0.18)" }}
        transition={{ duration: 0.3 }}
        className="group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-[#005BAC]/50 transition-all duration-300"
      >
        {/* Product Image Box */}
        <div className="relative mb-0 h-56 w-full overflow-hidden bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center p-6 border-b border-slate-100 dark:border-white/5">
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={displayName}
              fill
              className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          ) : (
            <Package className="h-16 w-16 text-slate-300 dark:text-slate-700 group-hover:scale-110 transition-transform duration-500 m-auto" />
          )}

          {/* Badges Overlay — DK Lao Styling */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {isRental ? (
              <span className="bg-[#005BAC] text-white text-[11px] font-black px-2.5 py-1 rounded-md shadow-lg shadow-blue-600/30">
                {isLao ? "ໃຫ້ເຊົ່າ" : "Rental"}
              </span>
            ) : (
              <>
                <span className="bg-[#005BAC] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {getLeadTimeBadge(item.lead_time, isLao)}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md flex items-center gap-1 border backdrop-blur-md ${isLowStock ? 'bg-amber-50/90 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800' : 'bg-emerald-50/90 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'}`}>
                  <Package className="w-3 h-3" /> {isLao ? `ສາງ VTE: ${stockCount} ພ້ອມສົ່ງ` : `VTE Hub: ${stockCount} In Stock`}
                </span>
                {isSale && (
                  <span className="bg-[#E1251B] text-white text-[11px] font-black px-2.5 py-1 rounded-md shadow-lg shadow-red-500/30 animate-pulse">
                    -{discountPercent}% OFF
                  </span>
                )}
                {isBogo && (
                  <span className="bg-amber-500 text-white text-[11px] font-black px-2.5 py-1 rounded-md shadow-lg shadow-amber-500/30">
                    {isLao ? "ຊື້ 1 ແຖມ 1" : "Buy 1 Get 1"}
                  </span>
                )}
                {hasWarranty && (
                  <span className="bg-blue-50/90 dark:bg-blue-950/80 text-[#005BAC] dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800 backdrop-blur-md flex items-center gap-1">
                    <Check className="w-3 h-3" /> {isLao ? `${warrantyMonths} ເດືອນ` : `${warrantyMonths}M Wty`}
                  </span>
                )}
              </>
            )}
          </div>

          <button
            onClick={() => setShowQuickView(true)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white text-slate-400 hover:text-[#005BAC] flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm hover:scale-110 z-10"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Content Section */}
        <div className={`flex flex-col flex-1 p-5 ${viewMode === 'list' ? 'w-full justify-between' : ''}`}>
          <div className={viewMode === 'list' ? 'mb-4' : 'flex-1'}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono font-bold text-[#005BAC] dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-800 px-2 py-0.5 rounded-md inline-block">
                SKU: {item.sku_code}
              </span>
              {item.category && (
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate max-w-[120px]">
                  {item.category.split(' & ')[0]}
                </span>
              )}
            </div>
            
            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight line-clamp-2 group-hover:text-[#005BAC] transition-colors">
              {displayName}
            </h3>

            {viewMode === 'list' && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {displayDesc}
              </p>
            )}

            {item.compatible_models && item.compatible_models.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.compatible_models.slice(0,2).map((model) => (
                  <span key={model} className="text-[10px] font-bold text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                    {model}
                  </span>
                ))}
                {item.compatible_models.length > 2 && (
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-2 py-0.5 rounded-md border border-transparent">
                    +{item.compatible_models.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Pricing & Actions */}
          <div className={`pt-4 mt-4 border-t border-slate-100 dark:border-white/5 ${viewMode === 'list' ? 'flex items-center justify-between gap-4' : 'flex flex-col gap-4'}`}>
            <div>
              <div className="flex flex-col gap-1">
                {/* 1. Currency Reference / Internal Cost Intelligence */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {isAdminMode ? (
                    <>
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                        {itemCurrency === 'USD' ? 'ຕົ້ນທຶນ ($):' : 'ຕົ້ນທຶນ (฿):'}
                      </span>
                      <span className="text-xs font-mono font-black text-slate-900 dark:text-white bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-300 dark:border-amber-800">
                        {itemCurrency === 'USD' ? '$' : (itemCurrency === 'LAK' ? '₭' : '฿')}{factoryPrice.toLocaleString("en-US", { minimumFractionDigits: itemCurrency === 'USD' ? 2 : 0 })}
                      </span>
                      {itemCurrency !== 'LAK' && (
                        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded border border-amber-300 dark:border-amber-700">
                          +65% ກຳໄລ
                        </span>
                      )}
                    </>
                  ) : (
                    itemCurrency !== 'LAK' && (
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {isLao ? "ລາຄາອ້າງອີງ:" : "Ref:"}{" "}
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          {itemCurrency === 'USD' ? '$' : '฿'}{retailForeignPrice.toLocaleString("en-US", { minimumFractionDigits: itemCurrency === 'USD' ? 2 : 0 })}
                        </span>
                      </span>
                    )
                  )}
                </div>

                {/* 2. Converted Lao Kip (LAK) Price */}
                {isSale && (
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-slate-400 line-through">
                      {(originalPriceLAK).toLocaleString()} ₭
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <span className={`text-xl font-black tracking-tight ${isSale ? 'text-[#E1251B] dark:text-rose-500' : 'text-[#E1251B] dark:text-red-500'}`}>
                    {priceLAK.toLocaleString()} <span className="text-sm font-bold">₭</span>
                  </span>
                  {isRental && (
                    <span className="text-xs font-semibold text-slate-500">{isLao ? "/ ມື້" : "/ day"}</span>
                  )}
                </div>

                {/* 3. Live Online Rate Footnote */}
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    {itemCurrency === 'USD'
                      ? (isLao ? `ອັດຕາແລກປ່ຽນ: $1 = ${exchangeRates.USD.toLocaleString()} ₭` : `Rate: $1 = ${exchangeRates.USD.toLocaleString()} LAK`)
                      : (isLao ? `ອັດຕາແລກປ່ຽນ: 1 ฿ = ${exchangeRates.THB.toLocaleString()} ₭` : `Rate: 1 ฿ = ${exchangeRates.THB.toLocaleString()} LAK`)}
                  </span>
                </div>
              </div>
            </div>

            <div className={`grid ${isRental ? 'grid-cols-1' : 'grid-cols-2'} gap-2 ${viewMode === 'list' ? 'w-64' : 'w-full'}`}>
              {!isRental && (
                <Button
                  onClick={handleAddToCart}
                  className={`h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 group/btn ${
                    isAdded
                      ? "bg-[#005BAC] hover:bg-[#00478a] text-white shadow-lg shadow-blue-600/25"
                      : "bg-slate-900 hover:bg-[#005BAC] text-white dark:bg-slate-800 dark:hover:bg-[#005BAC] shadow-lg shadow-slate-900/10"
                  }`}
                >
                  {isAdded ? (
                    <><Check className="w-4 h-4" /> {isLao ? "ເພີ່ມແລ້ວ" : "Added"}</>
                  ) : (
                    <><ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" /> {isLao ? "ໃສ່ກະຕ່າ" : "Add to Cart"}</>
                  )}
                </Button>
              )}

              <Button
                onClick={() => setShowRfq(true)}
                variant={isRental ? "default" : "secondary"}
                className={`h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 hover:shadow-md ${
                  isRental 
                    ? "bg-[#005BAC] text-white hover:bg-[#00478a] w-full shadow-lg shadow-blue-600/20" 
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{isRental ? (isLao ? 'ຈອງ/ຕິດຕໍ່' : 'Book / Inquire') : (isLao ? 'ຂໍລາຄາ' : 'Get Quote')}</span>
              </Button>
            </div>

            {/* Direct WhatsApp Quick Order & Technical Inquiry */}
            <a
              href={`https://wa.me/8562058929299?text=${encodeURIComponent(
                isLao
                  ? `ສະບາຍດີ LUD/DK Lao, ຂ້າພະເຈົ້າສົນໃຈສິນຄ້າ:\n• ຊື່: ${displayName}\n• ລະຫັດ SKU: ${item.sku_code}\n• ລາຄາ: ${priceLAK.toLocaleString()} ₭\nຕ້ອງການສັ່ງຊື້ / ສອບຖາມຂໍ້ມູນເພີ່ມເຕີມ`
                  : `Hello LUD/DK Lao, I am interested in:\n• Product: ${displayName}\n• SKU: ${item.sku_code}\n• Price: ${priceLAK.toLocaleString()} LAK\nI would like to order / inquire further.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl text-[11px] font-bold bg-emerald-500/10 hover:bg-emerald-600 text-emerald-700 hover:text-white dark:bg-emerald-500/20 dark:text-emerald-400 dark:hover:text-white border border-emerald-500/30 flex items-center justify-center gap-1.5 transition-all duration-200 shadow-sm group/wa"
              title={isLao ? "ສັ່ງຊື້ ຫຼື ສອບຖາມດ່ວນຜ່ານ WhatsApp (020 5892 9299)" : "Order or Inquire instantly via WhatsApp"}
            >
              <MessageCircle className="w-3.5 h-3.5 transition-transform group-hover/wa:scale-110" />
              <span>{isLao ? "ສັ່ງຊື້ / ຖາມຜ່ານ WhatsApp" : "Order via WhatsApp"}</span>
            </a>

            {/* 360° Management & Rental Synergy Link */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">
                {isRental ? (isLao ? "ການບໍລິຫານ:" : "Management:") : (isLao ? "ທາງເລືອກ B2B:" : "B2B Option:")}
              </span>
              <Link
                href={isRental ? `/${locale}/services#rental` : `/${locale}/services#management-ecosystem`}
                className="text-[#005BAC] dark:text-blue-400 hover:underline font-bold flex items-center gap-0.5"
              >
                <span>{isRental ? (isLao ? "ແພັກເກດ 0 CAPEX" : "0 CAPEX Lease") : (isLao ? "ບໍລິຫານ 360°" : "360° Care")}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal (Full Screen) — DK Lao Corporate Edition */}
      {showQuickView && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-white dark:bg-slate-950 flex flex-col animate-in fade-in zoom-in-95 duration-200">
          <div className="sticky top-0 z-20 flex justify-between items-center p-4 md:px-8 md:py-4 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#E1251B] animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider text-[#005BAC] dark:text-blue-400">
                {isLao ? "ລາຍລະອຽດສິນຄ້າ ແລະ ມຸມມອງ 360°" : "Product Details & 360° Inspection"}
              </span>
            </div>
            <button
              onClick={() => setShowQuickView(false)}
              className="p-2 md:px-4 md:py-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full transition-all flex items-center gap-2 font-bold text-sm"
            >
              <span className="hidden md:block">{isLao ? "ປິດ (Close)" : "Close"}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 flex flex-col gap-12 pb-24">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
              <div className="w-full md:w-1/2 flex flex-col gap-3">
              {/* Main Image View with Current Angle Badge */}
              <div className="relative h-64 md:h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/10 shadow-inner">
                {mainImage ? (
                  <Image src={mainImage} alt={displayName} fill className="object-contain p-2" priority />
                ) : (
                  <Package className="w-16 h-16 m-auto text-slate-400 dark:text-slate-600 absolute inset-0" />
                )}
                {/* Active Angle Overlay Badge */}
                {mainImage && (
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold shadow-xl border border-white/20 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E1251B] animate-pulse" />
                    <span>{mainImage === item.image_url ? (isLao ? "ຮູບຫຼັກ (Overview)" : "Overview") : getGalleryImageLabel(mainImage, isLao)}</span>
                  </div>
                )}
              </div>

              {/* 12-Point Spec-Accurate Gallery with DK Lao Themed Thumbnails & Labels */}
              {item.gallery_images && item.gallery_images.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between px-1">
                    <span>{isLao ? "ເລືອກເບິ່ງມຸມ ແລະ ຊິ້ນສ່ວນລົດ:" : "Inspect Angles & Components:"}</span>
                    <span className="text-[10px] text-[#005BAC] font-mono font-bold">1 + {item.gallery_images.length} {isLao ? "ມຸມມອງ" : "views"}</span>
                  </div>
                  <div className="flex gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-thin snap-x">
                    {item.image_url && (
                      <button 
                        onClick={() => setMainImage(item.image_url!)} 
                        className={`relative flex flex-col items-center gap-1 shrink-0 snap-start group/thumb`}
                      >
                         <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all ${mainImage === item.image_url ? 'border-[#E1251B] ring-2 ring-[#E1251B]/40 shadow-md scale-[1.03] bg-white' : 'border-slate-200 dark:border-white/10 hover:border-[#005BAC] bg-white'}`}>
                           <Image src={item.image_url!} alt="thumbnail-main" fill className="object-contain p-1" />
                         </div>
                         <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors ${mainImage === item.image_url ? 'bg-[#E1251B] text-white' : 'text-slate-600 dark:text-slate-300 group-hover/thumb:text-[#005BAC]'}`}>
                           {isLao ? "ຮູບຫຼັກ" : "Main"}
                         </span>
                      </button>
                    )}
                    {item.gallery_images.map((img, idx) => {
                      const label = getGalleryImageLabel(img, isLao);
                      const isSelected = mainImage === img;
                      return (
                        <button 
                          key={idx} 
                          onClick={() => setMainImage(img)} 
                          className={`relative flex flex-col items-center gap-1 shrink-0 snap-start group/thumb`}
                        >
                           <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all ${isSelected ? 'border-[#E1251B] ring-2 ring-[#E1251B]/40 shadow-md scale-[1.03] bg-white' : 'border-slate-200 dark:border-white/10 hover:border-[#005BAC] bg-white'}`}>
                             <Image src={img} alt={`thumbnail-${idx}`} fill className="object-cover" />
                           </div>
                           <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded truncate max-w-[84px] text-center transition-colors ${isSelected ? 'bg-[#E1251B] text-white' : 'text-slate-600 dark:text-slate-300 group-hover/thumb:text-[#005BAC]'}`}>
                             {label}
                           </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {item.spec_sheet_url && (
                <a
                  href={item.spec_sheet_url}
                  download
                  className="flex items-center justify-center gap-2 text-sm font-bold text-[#005BAC] dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 py-2.5 rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                >
                  <Download className="w-4 h-4" /> {isLao ? "ດາວໂຫຼດສະເປັກ (PDF)" : "Download Specs (PDF)"}
                </a>
              )}
            </div>

            <div className="w-full md:w-1/2 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono font-bold text-[#005BAC] dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 px-2.5 py-0.5 rounded-lg">
                  {item.sku_code}
                </span>
                <span className="text-xs font-semibold text-[#005BAC] dark:text-blue-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {getLeadTimeBadge(item.lead_time, isLao)}
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-2">
                {displayName}
              </h3>
              
              <div className="mb-4 pb-4 border-b border-slate-100 dark:border-white/5">
                {isSale && (
                  <div className="text-sm font-medium text-slate-400 line-through mb-1">
                    {originalPriceLAK.toLocaleString()} ₭
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className={`text-3xl font-black ${isSale ? 'text-[#E1251B] dark:text-rose-500' : 'text-[#E1251B] dark:text-red-500'}`}>
                    {priceLAK.toLocaleString()} ₭
                  </span>
                  {isSale && (
                    <span className="bg-rose-100 dark:bg-rose-500/20 text-[#E1251B] dark:text-rose-400 text-xs font-bold px-2 py-1 rounded">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                {/* Reference for Customers vs Internal Cost Intelligence for Admin */}
                {itemCurrency !== 'LAK' ? (
                  isAdminMode ? (
                    /* 🔐 Admin & Internal Staff Intelligence Panel */
                    <div className="mt-2.5 p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300/80 dark:border-amber-700/50 flex flex-col gap-1.5 shadow-sm">
                      <div className="flex items-center justify-between text-[11px] font-bold text-amber-800 dark:text-amber-300 border-b border-amber-200 dark:border-amber-800/50 pb-1">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                          {isLao ? "🔐 ມຸມມອງແອັດມີນ / ໂຄງສ້າງຕົ້ນທຶນພາຍໃນ (Admin Only)" : "🔐 Internal Admin Cost Intelligence"}
                        </span>
                        <span className="text-[10px] bg-amber-200/80 dark:bg-amber-800/60 px-1.5 py-0.5 rounded text-amber-900 dark:text-amber-200">
                          +65% ກຳໄລຄົງທີ່
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                        <span>{isLao ? "ລາຄາຕົ້ນທຶນໂຮງງານ (Factory Base):" : "Factory Base Cost:"}</span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {itemCurrency === 'USD' ? '$' : '฿'}{factoryPrice.toLocaleString("en-US", { minimumFractionDigits: itemCurrency === 'USD' ? 2 : 0 })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                        <span>{isLao ? "ລາຄາຂາຍລວມກຳໄລ 65%:" : "Retail Price (+65%):"}</span>
                        <span className="font-bold text-[#005BAC] dark:text-blue-400">
                          {itemCurrency === 'USD' ? '$' : '฿'}{retailForeignPrice.toLocaleString("en-US", { minimumFractionDigits: itemCurrency === 'USD' ? 2 : 0 })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 pt-1 border-t border-amber-200/50 dark:border-white/5">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {isLao ? "ອັດຕາແລກປ່ຽນອອນໄລນ໌ປັດຈຸບັນ:" : "Live Online Rate:"}
                        </span>
                        <span className="font-bold">
                          {itemCurrency === 'USD'
                            ? `1 USD = ${exchangeRates.USD.toLocaleString()} ₭`
                            : `1 THB = ${exchangeRates.THB.toLocaleString()} ₭`}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* 👤 Public Customer View: Clean, Professional, No Internal Cost Leak */
                    <div className="mt-2 flex flex-wrap items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold">
                        {isLao ? "ລາຄາອ້າງອີງ:" : "Reference:"}{" "}
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {itemCurrency === 'USD' ? '$' : '฿'}{retailForeignPrice.toLocaleString("en-US", { minimumFractionDigits: itemCurrency === 'USD' ? 2 : 0 })}
                        </span>
                      </span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {itemCurrency === 'USD'
                          ? `1 USD ≈ ${exchangeRates.USD.toLocaleString()} ₭`
                          : `1 THB ≈ ${exchangeRates.THB.toLocaleString()} ₭`}
                      </span>
                    </div>
                  )
                ) : (
                  <div className="text-sm font-bold text-slate-500 mt-1">
                    {priceLAK.toLocaleString()} ₭
                  </div>
                )}
              </div>

              {/* Description as bullet points (if applicable) */}
              <div className="mb-4">
                <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
                  {(displayDesc || '').split('\n').map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>

              {item.compatible_models && item.compatible_models.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    {isLao ? "ຮອງຮັບກັບລົດ (Compatible Models):" : "Compatible Vehicle Models:"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.compatible_models.map((model) => (
                      <span key={model} className="px-2 py-1 text-xs font-semibold rounded bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800">
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {hasWarranty && (
                <div className="mb-6 flex items-center gap-2 text-sm font-bold text-[#005BAC] dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-3.5 py-2 rounded-lg border border-blue-200 dark:border-blue-800 w-fit">
                   <Check className="w-4 h-4 text-[#005BAC]" /> {isLao ? "ຮັບປະກັນສິນຄ້າ 12 ເດືອນ (12-Month OEM Warranty)" : "12-Month OEM Warranty Guarantee"}
                </div>
              )}

              {(item.colors || item.sizes) && (
                <div className="flex flex-col gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-white/5">
                  {item.colors && (
                    <div>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        {isLao ? "ສີ (Color):" : "Color:"}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.colors.map(color => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                              selectedColor === color
                                ? "bg-blue-50 dark:bg-blue-500/20 border-[#005BAC] text-[#005BAC] dark:text-blue-400 font-bold"
                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-blue-300"
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.sizes && (
                    <div>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        {isLao ? "ຂະໜາດ (Size):" : "Size:"}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                              selectedSize === size
                                ? "bg-blue-50 dark:bg-blue-500/20 border-[#005BAC] text-[#005BAC] dark:text-blue-400 font-bold"
                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-blue-300"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Wholesale Pricing & Corporate Reservation of Rights Policy */}
              {item.category === 'Forklifts' || item.category === 'Equipment Rental' ? (
                <div className="mb-4 bg-gradient-to-br from-amber-50/90 to-orange-50/90 dark:from-amber-950/40 dark:to-orange-950/30 rounded-xl p-3.5 border border-amber-200 dark:border-amber-800/50 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300 mb-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>{isLao ? "ນະໂຍບາຍລາຄາສົ່ງ & ສ່ວນຫຼຸດໂຄງການອົງກອນ (Corporate Fleet Policy)" : "Corporate Fleet & Wholesale Policy"}</span>
                  </div>
                  <p className="text-xs text-amber-800/90 dark:text-amber-300/90 leading-relaxed mb-2.5">
                    {isLao
                      ? "• ລາຄາສົ່ງ ແລະ ສ່ວນຫຼຸດພິເສດ: ໃຫ້ສະເພາະສິນຄ້າທີ່ຮ່ວມລາຍການເທົ່ານັ້ນ (ອາໄຫຼ່ ແລະ ອຸປະກອນສິ້ນເປືອງ).\n• ສຳລັບລົດຍົກ ແລະ ເຄື່ອງຈັກໜັກ: ຂໍສະຫງວນສິດລາຄາໂຄງການເປັນໄປຕາມທີ່ບໍລິສັດກຳນົດໄວ້."
                      : "• Wholesale bulk pricing applies strictly to participating spare parts and consumables.\n• For forklifts and heavy machinery: company reserves project fleet terms per corporate policy."}
                  </p>
                  <Button
                    onClick={() => {
                      setShowQuickView(false);
                      setShowRfq(true);
                    }}
                    variant="outline"
                    className="w-full py-2 h-9 text-xs font-bold bg-white dark:bg-slate-900 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-950/50 flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>{isLao ? "ຂໍໃບສະເໜີລາຄາໂຄງການ B2B (Request Project Quotation)" : "Request B2B Project Quotation"}</span>
                  </Button>
                </div>
              ) : (
                item.bulk_pricing && item.bulk_pricing.length > 0 && (
                  <div className="mb-4 bg-slate-50 dark:bg-slate-950 rounded-xl p-3 border border-slate-200 dark:border-white/5">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      {isLao ? "ລາຄາສົ່ງ (Bulk Pricing - ສະເພາະສິນຄ້າຮ່ວມລາຍການ):" : "Enterprise Wholesale Pricing (Participating Only):"}
                    </div>
                    <div className="space-y-1.5">
                      {item.bulk_pricing.map((tier, idx) => {
                        const tierPriceLAK = calculateLAKPrice(tier.price, itemCurrency, item.category, exchangeRates);
                        const currSymbol = itemCurrency === 'USD' ? '$' : (itemCurrency === 'LAK' ? '₭' : '฿');
                        return (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="text-slate-600 dark:text-slate-400 font-medium">{tier.min_qty}+ units</span>
                            <div className="text-right">
                              <span className="font-bold text-[#E1251B] dark:text-red-400">
                                {tierPriceLAK.toLocaleString()} ₭
                              </span>
                              <span className="text-xs text-slate-400 ml-1.5 font-normal">
                                ({currSymbol}{tier.price.toLocaleString()})
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              )}

              {/* Quantity and Actions */}
              <div className="flex flex-col gap-3 mt-auto">
                {!isRental && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-white/10">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-[#005BAC] dark:hover:text-blue-400 font-bold"
                      >-</button>
                      <span className="w-8 text-center text-sm font-bold text-slate-900 dark:text-white">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-[#005BAC] dark:hover:text-blue-400 font-bold"
                      >+</button>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {isLao ? "ຈຳນວນທີ່ຕ້ອງການສັ່ງຊື້" : "Order Quantity"}
                    </span>
                  </div>
                )}

                <div className={`flex gap-2 ${isRental ? 'flex-col sm:flex-row' : ''}`}>
                  {!isRental && (
                    <div className="flex gap-2 w-full mt-2">
                      <Button
                        onClick={() => {
                          handleAddToCart();
                          setShowQuickView(false);
                        }}
                        variant="outline"
                        className="flex-1 border-2 border-[#005BAC] text-[#005BAC] hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl font-bold h-12 text-base"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" /> {isLao ? "ໃສ່ກະຕ່າ" : "Add to Cart"}
                      </Button>
                      <Button
                        onClick={() => {
                          handleQuickBuy();
                          setShowQuickView(false);
                        }}
                        className="flex-1 bg-[#E1251B] hover:bg-[#c91e15] text-white rounded-xl font-bold h-12 text-base shadow-lg shadow-red-500/25"
                      >
                        {isLao ? "ຊື້ເລີຍ" : "Buy Now"}
                      </Button>
                    </div>
                  )}
                  {isRental && (
                    <Button
                      onClick={() => {
                        setShowQuickView(false);
                        setShowRfq(true);
                      }}
                      className="w-full mt-2 bg-[#005BAC] hover:bg-[#00478a] text-white rounded-xl font-bold h-12 text-base shadow-lg shadow-blue-600/25"
                    >
                      <FileText className="w-5 h-5 mr-2" /> {isLao ? "ຈອງລົດ / ສອບຖາມ (Book / Inquire)" : "Book / Inquire Equipment"}
                    </Button>
                  )}
                </div>

                {/* WhatsApp Quick Order in QuickView */}
                <a
                  href={`https://wa.me/8562058929299?text=${encodeURIComponent(
                    isLao
                      ? `ສະບາຍດີ LUD/DK Lao, ຂ້າພະເຈົ້າສົນໃຈສິນຄ້າ:\n• ຊື່: ${displayName}\n• ລະຫັດ SKU: ${item.sku_code}\n• ຈຳນວນ: ${quantity} ອັນ\n• ລາຄາ: ${priceLAK.toLocaleString()} ₭\nຕ້ອງການສັ່ງຊື້ / ສອບຖາມຂໍ້ມູນເພີ່ມເຕີມ`
                      : `Hello LUD/DK Lao, I am interested in:\n• Product: ${displayName}\n• SKU: ${item.sku_code}\n• Qty: ${quantity}\n• Price: ${priceLAK.toLocaleString()} LAK\nI would like to order / inquire further.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2 h-11 rounded-xl text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2 transition-all shadow-md shadow-green-600/25"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isLao ? "ສັ່ງຊື້ / ຖາມຜ່ານ WhatsApp (020 5892 9299)" : "Direct WhatsApp Order (020 5892 9299)"}</span>
                </a>
              </div>
            </div>
          </div>

          {/* 360° Management & Enterprise Service Ecosystem Callout */}
          <div className="w-full p-4 md:p-5 rounded-2xl bg-gradient-to-r from-blue-950/70 via-slate-900/80 to-indigo-950/70 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-blue-500 text-white text-[10px] font-black uppercase tracking-wider">
                    360° FLEET SYNERGY
                  </span>
                  <span className="text-xs font-bold text-blue-300">
                    {isLao ? "ໂຄງສ້າງການບໍລິຫານ & ບໍລິການຄົບວົງຈອນ" : "Integrated Fleet & Service"}
                  </span>
                </div>
                <h4 className="text-sm md:text-base font-black text-white">
                  {isLao
                    ? "ຕ້ອງການເຊົ່າໄລຍະຍາວ 0 CAPEX ຫຼື ສັ່ງອາໄຫຼ່ພ້ອມຊ່າງ PM ລົງຕິດຕັ້ງເຖິງໂຮງງານ?"
                    : "Prefer 0 CAPEX Long-Term Lease or Spare Parts with On-Site PM Installation?"}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {isLao
                    ? "DK LAO ໃຫ້ບໍລິການທີມຊ່າງເຄື່ອນທີ່ Mobile Service, ຕັ້ງຕູ້ສະຕັອກ Consignment, ແລະ ໃບແຈ້ງໜີ້ລວມ B2B."
                    : "DK LAO offers Rapid Mobile Service SLAs, On-site Plant Consignment Depots, and Unified Enterprise B2B Billing."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <Link
                href={`/${locale}/services#management-ecosystem`}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-600/30"
              >
                <span>{isLao ? "ສຳຫຼວດລະບົບ 360°" : "Explore 360°"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Specifications Striped Table — DK Lao Engineering Theme */}
          {item.specs && (
            <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden mt-6 shadow-sm">
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-white/10 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-[#005BAC] dark:text-blue-400">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {isLao ? "ຄຸນລັກສະນະສະເພາະ (Technical Specifications)" : "Technical Specifications"}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#005BAC] dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                    {isLao ? "ມາດຕະຖານໂຮງງານ 100%" : "100% Certified"}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    {isLao ? "PDI 30-Point Checked" : "PDI Verified"}
                  </span>
                </div>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-white/5">
                {Object.entries(item.specs)
                  .filter(([key]) => !key.toLowerCase().includes('warranty') && !key.toLowerCase().includes('ຮັບປະກັນ') && !key.toLowerCase().includes('lead') && !key.toLowerCase().includes('ຈັດສົ່ງ'))
                  .map(([key, val], idx) => (
                  <div 
                    key={key} 
                    className={`flex flex-col sm:flex-row px-6 py-3.5 transition-colors hover:bg-blue-50/20 dark:hover:bg-blue-950/10 ${
                      idx % 2 === 0 ? 'bg-slate-50/40 dark:bg-slate-800/30' : 'bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="sm:w-5/12 text-sm text-slate-600 dark:text-slate-400 font-semibold mb-1 sm:mb-0 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#005BAC]"></span>
                      {formatSpecKey(key, isLao)}
                    </div>
                    <div className="sm:w-7/12 text-sm font-bold text-slate-900 dark:text-white">
                      {val}
                    </div>
                  </div>
                ))}

                {/* Additional Essential Rows */}
                {hasWarranty && (
                  <div className="flex flex-col sm:flex-row px-6 py-3.5 bg-blue-50/40 dark:bg-blue-950/20 transition-colors">
                    <div className="sm:w-5/12 text-sm text-[#005BAC] dark:text-blue-400 font-semibold mb-1 sm:mb-0 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#005BAC]"></span>
                      {isLao ? "ການຮັບປະກັນ (Warranty Guarantee)" : "Warranty Guarantee"}
                    </div>
                    <div className="sm:w-7/12 text-sm font-bold text-[#005BAC] dark:text-blue-300 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#005BAC]" />
                      {isLao ? "ຮັບປະກັນສິນຄ້າແທ້ 12 ເດືອນ (12 Months OEM Warranty)" : "12 Months OEM Factory Warranty"}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row px-6 py-3.5 bg-blue-50/30 dark:bg-blue-950/10 transition-colors">
                  <div className="sm:w-5/12 text-sm text-[#005BAC] dark:text-blue-400 font-semibold mb-1 sm:mb-0 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#005BAC]"></span>
                    {isLao ? "ກຳນົດເວລາຈັດສົ່ງ (Delivery Lead Time)" : "Delivery Lead Time"}
                  </div>
                  <div className="sm:w-7/12 text-sm font-bold text-[#005BAC] dark:text-blue-300 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#005BAC]" />
                    {getLeadTimeBusiness(item.lead_time, isLao)}
                  </div>
                </div>
              </div>
            </div>
          )}

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
              <div className="w-full mt-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  {isLao ? "ສິນຄ້າທີ່ມັກຊື້ຄູ່ກັນ (Frequently Bought Together)" : "Frequently Bought Together"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedProducts.map(rel => {
                    const relName = (isLao ? (rel.part_name_lo || rel.part_name) : (rel.part_name || rel.part_name_lo)) || rel.sku_code || 'Product';
                    return (
                    <div key={rel.sku_id} className="flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 hover:border-[#005BAC]/50 hover:shadow-md transition-all cursor-pointer" onClick={() => {
                      // In a real app we might navigate to the product detail page, but for now we close the modal to let user click the new item from the store.
                      setShowQuickView(false);
                    }}>
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                        {rel.image_url ? (
                          <Image src={rel.image_url} alt={relName} fill className="object-cover" />
                        ) : (
                          <Package className="w-8 h-8 m-auto text-slate-400 absolute inset-0" />
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                          {relName}
                        </h4>
                        <div className="text-[#E1251B] dark:text-red-400 font-bold mt-1 text-sm">
                          {calculateLAKPrice(Number(rel.unit_price), rel.currency, rel.category).toLocaleString()} ₭
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RFQ Modal */}
      <RFQModal item={item} isOpen={showRfq} onClose={() => setShowRfq(false)} />
    </>
  );
}
