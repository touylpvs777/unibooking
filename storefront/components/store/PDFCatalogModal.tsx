"use client";

import React, { useState, useMemo, useRef } from "react";
import { InventoryItem } from "@/data/catalog";
import { STORE_CATEGORIES } from "@/data/categories";
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  Check, 
  Filter, 
  Building2, 
  Phone, 
  Mail, 
  Globe, 
  Layers,
  Copy,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateLAKPrice } from "@/context/CartContext";

interface PDFCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: InventoryItem[];
  currentCategory?: string;
  isLao?: boolean;
}

export function PDFCatalogModal({
  isOpen,
  onClose,
  items,
  currentCategory = "All",
  isLao = true,
}: PDFCatalogModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    currentCategory !== "All" ? currentCategory : "All"
  );
  const [includePrices, setIncludePrices] = useState<boolean>(true);
  const [includeSpecs, setIncludeSpecs] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Filter items for the catalog
  const filteredCatalogItems = useMemo(() => {
    let result = items;
    if (selectedCategory !== "All") {
      result = result.filter((item) => item.category === selectedCategory);
    }
    // Limit to 60 items per PDF print to avoid browser hang while keeping comprehensive
    return result.slice(0, 60);
  }, [items, selectedCategory]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const todayStr = new Date().toLocaleDateString(isLao ? "lo-LA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      {/* Container Dialog */}
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
        {/* Top Header - Not printed */}
        <div className="print:hidden flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                {isLao ? "ສ້າງ ແລະ ດາວໂຫຼດແຄັດຕາລັອກ (B2B PDF Catalog)" : "Generate & Download B2B PDF Catalog"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isLao 
                  ? "ເລືອກໝວດໝູ່ສິນຄ້າ ແລະ ພິມ ຫຼື ບັນທຶກເປັນໄຟລ໌ PDF ທາງການສຳລັບສະເໜີລູກຄ້າ"
                  : "Select product category and print or save as an official PDF catalog for clients"}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls Toolbar - Not printed */}
        <div className="print:hidden px-6 py-3 bg-slate-100/70 dark:bg-slate-950/40 border-b border-slate-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Selector */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {isLao ? "ໝວດໝູ່:" : "Category:"}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs font-semibold py-1.5 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All">{isLao ? "🌟 ທຸກໝວດໝູ່ (All Categories)" : "🌟 All Categories"}</option>
                {STORE_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {isLao ? cat.name_lo : cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Options Toggles */}
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includePrices}
                onChange={(e) => setIncludePrices(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>{isLao ? "ສະແດງລາຄາ" : "Show Prices"}</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSpecs}
                onChange={(e) => setIncludeSpecs(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>{isLao ? "ສະແດງສະເປັກ (Specs)" : "Show Specs"}</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              onClick={handleCopyLink}
              variant="outline"
              size="sm"
              className="rounded-xl text-xs font-bold gap-1.5 border-slate-300 dark:border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isLao ? "ສຳເນົາແລ້ວ!" : "Copied!") : (isLao ? "ສຳເນົາລິ້ງ" : "Copy Link")}</span>
            </Button>

            <Button
              onClick={handlePrint}
              size="sm"
              className="rounded-xl text-xs font-bold gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/25"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isLao ? "ພິມ ຫຼື ບັນທຶກເປັນ PDF" : "Print / Save as PDF"}</span>
            </Button>
          </div>
        </div>

        {/* Scrollable Printable Document Preview Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-200 dark:bg-slate-950/80">
          <div 
            ref={printRef}
            className="max-w-4xl mx-auto bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-xl border border-slate-200 print:shadow-none print:border-none print:p-0 print:m-0"
          >
            {/* Header Letterhead */}
            <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-slate-900 pb-6 mb-6 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-base">
                    LUD
                  </div>
                  <span className="text-xl font-black tracking-tight text-slate-900">
                    LAO UNIVERSAL DEVELOPMENT
                  </span>
                </div>
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  {isLao ? "ບໍລິສັດ ພັດທະນາລາວສາກົນ ຈຳກັດ • B2B & Industrial Trading" : "Lao Universal Development Co., Ltd. • B2B & Industrial Trading"}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Vientiane Capital, Lao PDR • Official Hotline: +856 20 5892 9299 • Email: Salesadmin@dklao.com
                </p>
              </div>

              <div className="text-left sm:text-right">
                <div className="inline-block bg-slate-900 text-white px-3 py-1 rounded-md text-xs font-extrabold tracking-wide uppercase mb-1">
                  {isLao ? "ລາຍການສິນຄ້າທາງການ" : "OFFICIAL PRODUCT CATALOG"}
                </div>
                <p className="text-xs font-semibold text-slate-600">
                  {isLao ? `ວັນທີອອກ: ${todayStr}` : `Date: ${todayStr}`}
                </p>
                <p className="text-xs font-bold text-emerald-600 mt-0.5">
                  {isLao ? `ໝວດໝູ່: ${selectedCategory === "All" ? "ທຸກໝວດໝູ່" : selectedCategory}` : `Category: ${selectedCategory}`}
                </p>
              </div>
            </div>

            {/* Catalog Highlights Note */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 mb-6 flex items-center justify-between text-xs text-emerald-900">
              <span className="font-semibold">
                {isLao 
                  ? `⚡ ສິນຄ້າທັງໝົດໃນລາຍການນີ້ຜ່ານການຮັບຮອງມາດຕະຖານອຸດສາຫະກຳ ແລະ ມີການຮັບປະກັນໂດຍ LUD` 
                  : `⚡ All products listed meet international industrial standards and carry LUD warranties`}
              </span>
              <span className="font-extrabold text-emerald-700 shrink-0 ml-2">
                {filteredCatalogItems.length} {isLao ? "ລາຍການ" : "Items"}
              </span>
            </div>

            {/* Products Table */}
            <div className="overflow-hidden border border-slate-200 rounded-xl mb-8">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-extrabold">
                    <th className="py-2.5 px-3 w-16 text-center">#</th>
                    <th className="py-2.5 px-3">{isLao ? "ລະຫັດ & ຊື່ສິນຄ້າ" : "SKU & Product Name"}</th>
                    <th className="py-2.5 px-3 w-28">{isLao ? "ໝວດໝູ່" : "Category"}</th>
                    {includeSpecs && (
                      <th className="py-2.5 px-3 w-48">{isLao ? "ຄຸນລັກສະນະ (Specs)" : "Key Specifications"}</th>
                    )}
                    {includePrices && (
                      <th className="py-2.5 px-3 w-32 text-right">{isLao ? "ລາຄາ (LAK)" : "Price (LAK)"}</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredCatalogItems.map((item, idx) => {
                    const priceLAK = calculateLAKPrice(Number(item.unit_price), (item as any).currency, item.category);
                    const displayName = isLao ? (item.part_name_lo || item.part_name) : (item.part_name || item.part_name_lo);
                    const isRental = item.category === "Equipment Rental";

                    return (
                      <tr key={item.sku_id || idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                        <td className="py-2.5 px-3 text-center font-bold text-slate-400">
                          {idx + 1}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="font-extrabold text-slate-900 leading-snug">
                            {displayName}
                          </div>
                          <div className="text-[10px] font-mono text-emerald-700 mt-0.5">
                            SKU: {item.sku_code}
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 font-medium">
                          {item.category}
                        </td>
                        {includeSpecs && (
                          <td className="py-2.5 px-3 text-[11px] text-slate-600">
                            {item.specs ? (
                              <div className="space-y-0.5">
                                {Object.entries(item.specs).slice(0, 3).map(([k, v]) => (
                                  <div key={k} className="truncate">
                                    <span className="font-semibold text-slate-700">{k}:</span> {v}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-slate-400 italic">-</span>
                            )}
                          </td>
                        )}
                        {includePrices && (
                          <td className="py-2.5 px-3 text-right">
                            <div className="font-black text-slate-900 text-sm">
                              {priceLAK.toLocaleString()} ₭
                            </div>
                            {isRental && (
                              <span className="text-[10px] text-blue-600 font-bold block">
                                {isLao ? "/ ມື້" : "/ day"}
                              </span>
                            )}
                            {item.bulk_pricing && item.bulk_pricing.length > 0 && (
                              <span className="text-[10px] text-emerald-600 font-semibold block">
                                {isLao ? "ມີລາຄາສົ່ງ 5+ ອັນ" : "Wholesale 5+ Units"}
                              </span>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer Terms & Contact */}
            <div className="border-t-2 border-slate-200 pt-6 text-[11px] text-slate-500 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">
                    {isLao ? "ເງື່ອນໄຂການສັ່ງຊື້ ແລະ ຮັບປະກັນ (Terms & Conditions):" : "Order & Warranty Terms:"}
                  </h4>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                    <li>{isLao ? "ລາຄາຂ້າງເທິງອາດມີການປ່ຽນແປງຕາມອັດຕາແລກປ່ຽນຂອງທະນາຄານ" : "Prices subject to bank exchange rate adjustments."}</li>
                    <li>{isLao ? "ຮັບປະກັນສິນຄ້າ 6 - 24 ເດືອນ ພ້ອມບໍລິການອະໄຫຼ່ແທ້ຕະຫຼອດອາຍຸການໃຊ້ງານ" : "6 to 24-month warranty with guaranteed original spare parts."}</li>
                    <li>{isLao ? "ຮອງຮັບການຊຳລະຜ່ານ BCEL One, ໂອນຜ່ານບັນຊີບໍລິສັດ ຫຼື ເຄຣດິດເທິມອົງກອນ" : "Accepts BCEL One, Bank Transfer, or Corporate Credit Terms."}</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-1">
                    {isLao ? "ຕິດຕໍ່ສັ່ງຊື້ ແລະ ຂໍໃບສະເໜີລາຄາທາງການ (RFQ):" : "Direct Ordering & Formal RFQ:"}
                  </h4>
                  <p className="font-bold text-emerald-700 text-sm">
                    WhatsApp & Hotline: 020 5892 9299
                  </p>
                  <p className="text-slate-600 mt-0.5">
                    Website: www.lud.la • Email: Salesadmin@dklao.com
                  </p>
                </div>
              </div>

              <div className="text-center pt-4 text-slate-400 text-[10px]">
                © {new Date().getFullYear()} Lao Universal Development Co., Ltd. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
