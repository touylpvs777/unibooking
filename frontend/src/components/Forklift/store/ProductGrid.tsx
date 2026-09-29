import React from "react";
import type { InventoryItem } from "@/actions/store";

import { ProductCard } from "./ProductCard";
import { PackageSearch } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProductGridProps {
  items: InventoryItem[];
  viewMode?: 'grid' | 'list';
}

export function ProductGrid({ items, viewMode = 'grid' }: ProductGridProps) {
  const { i18n } = useTranslation();
  const locale = i18n.language || "lo";
  const isLao = locale === 'lo';

  if (!items || items.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 p-12 text-center backdrop-blur-sm">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
          <PackageSearch className="w-8 h-8" />
        </div>
        <p className="text-base font-bold text-slate-800 dark:text-slate-200">
          {isLao ? "ບໍ່ພົບລາຍການສິນຄ້າທີ່ກົງກັບເງື່ອນໄຂ" : "No products found matching your criteria"}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
          {isLao 
            ? "ລອງປ່ຽນຄຳຄົ້ນຫາ ຫຼື ເລືອກໝວດໝູ່ອື່ນ ເພື່ອເບິ່ງສິນຄ້າທັງໝົດໃນຄັງ."
            : "Try adjusting your search terms or category filters to view more products."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>
          {isLao ? (
            <>ສະແດງທັງໝົດ <strong>{items.length}</strong> ລາຍການ</>
          ) : (
            <>Showing <strong>{items.length}</strong> items</>
          )}
        </span>
      </div>

      <div className={`grid gap-5 ${
        viewMode === 'list' 
          ? 'grid-cols-1' 
          : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'
      }`}>
        {items.map((item) => (
          <ProductCard key={item.sku_id} item={item} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
}
