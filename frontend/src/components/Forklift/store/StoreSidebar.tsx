import React from "react";
import { Search, Filter, Layers, Wrench, Settings, Truck, Circle, Archive, Shield, SprayCan, Building2, Package, Briefcase, RotateCcw, PhoneCall, ChevronRight, Zap, Sparkles, ArrowRight, Pickaxe } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { STORE_CATEGORIES, PRE_CATEGORIES } from "@/data/categories";

interface StoreSidebarProps {
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  selectedPreCategory?: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onResetFilters?: () => void;
  hasActiveFilters?: boolean;
  items?: Array<{ category?: string; pre_category_id?: string }>;
}

export function StoreSidebar({
  selectedCategory = "All",
  onSelectCategory = () => {},
  selectedPreCategory = "all",
  searchQuery = "",
  onSearchChange = () => {},
  onResetFilters = () => {},
  hasActiveFilters = false,
  items = [],
}: StoreSidebarProps) {
  const { i18n } = useTranslation();
  const locale = i18n.language || "lo";
  const isLao = locale === "lo";

  const activePreCat = React.useMemo(() => {
    return PRE_CATEGORIES.find((p) => p.id === selectedPreCategory);
  }, [selectedPreCategory]);

  // Compute product counts for each category
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { All: items.length };
    items.forEach((item) => {
      if (item?.category) {
        counts[item.category] = (counts[item.category] || 0) + 1;
      }
    });
    return counts;
  }, [items]);

  // Filter categories according to selectedPreCategory
  const visibleCategories = React.useMemo(() => {
    let list = STORE_CATEGORIES;
    if (selectedPreCategory && selectedPreCategory !== "all") {
      list = STORE_CATEGORIES.filter((c) => c.pre_category_id === selectedPreCategory);
    }
    return list;
  }, [selectedPreCategory]);

  return (
    <aside className="w-full lg:w-64 shrink-0 flex flex-col bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
      {/* 1. Category Header with Division Badge */}
      <div className="bg-slate-100 dark:bg-slate-800/80 px-4 py-3.5 flex flex-col gap-1 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h2 className="text-[13px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {isLao ? "ໝວດໝູ່ (Categories)" : "Categories"}
          </h2>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-[11px] font-bold text-rose-500 hover:text-rose-600 dark:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
              title={isLao ? "ລ້າງຕົວກັ່ນຕອງທັງໝົດ" : "Reset all filters"}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isLao ? "ລ້າງ" : "Reset"}</span>
            </button>
          )}
        </div>
        {activePreCat && (
          <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 truncate">
            {isLao ? activePreCat.name_lo : activePreCat.name}
          </div>
        )}
      </div>

      {/* 2. Main Categories List */}
      <div className="flex flex-col max-h-[500px] overflow-y-auto scrollbar-thin">
        {/* 'All' Option */}
        <button
          onClick={() => onSelectCategory("All")}
          className={`group flex items-center justify-between px-4 py-2.5 text-[13px] font-medium transition-all text-left border-b border-slate-100 dark:border-slate-800/50 cursor-pointer ${
            selectedCategory === "All"
              ? "bg-blue-50/50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 font-bold border-l-4 border-l-blue-600"
              : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-blue-600 dark:hover:text-blue-400 border-l-4 border-l-transparent"
          }`}
        >
          <div className="flex items-center gap-3 truncate">
            <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
              <Layers className={`w-3.5 h-3.5 ${selectedCategory === "All" ? "text-blue-600 dark:text-blue-400" : "text-slate-500"}`} />
            </div>
            <span className="truncate">{isLao ? "ທຸກໝວດໝູ່ (All)" : "All Categories"}</span>
          </div>
          <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${selectedCategory === "All" ? "text-blue-600 translate-x-1" : "text-slate-300 group-hover:text-blue-400"}`} />
        </button>

        {/* Dynamic Categories */}
        {visibleCategories.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
          const count = categoryCounts[cat.name] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`group flex items-center justify-between px-4 py-2.5 text-[13px] font-medium transition-all text-left border-b border-slate-100 dark:border-slate-800/50 last:border-0 cursor-pointer ${
                isSelected
                  ? "bg-blue-50/50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 font-bold border-l-4 border-l-blue-600"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-blue-600 dark:hover:text-blue-400 border-l-4 border-l-transparent"
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <div className="w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
                    onError={(e) => {
                      // Fallback icon if image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="flex flex-col truncate">
                  <span className="truncate text-xs font-semibold">{isLao ? cat.name_lo : cat.name}</span>
                  {cat.brand && (
                    <span className="text-[10px] text-slate-400 truncate">{cat.brand}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {count > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold">
                    {count}
                  </span>
                )}
                <ChevronRight className={`h-3.5 w-3.5 transition-transform ${isSelected ? "text-blue-600 translate-x-1" : "text-slate-300 group-hover:text-blue-400"}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. 360° Management & Fleet Ecosystem Synergy Card */}
      <div className="p-4 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 border-t border-slate-200 dark:border-slate-800 text-white">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[11px] font-black uppercase tracking-wider text-blue-300">
            {isLao ? "ໂຄງສ້າງການບໍລິຫານ 360°" : "360° Fleet Care"}
          </span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed mb-3 font-normal">
          {isLao
            ? "ບໍລິການເຊົ່າລົດຍົກ 0 CAPEX, ຊ່າງປະຈຳໂຮງງານ 24/7, ແລະ ຕັ້ງສາງ Consignment."
            : "0 CAPEX Forklift Lease, 24/7 Dedicated Technicians & Factory Consignment."}
        </p>
        <Link
          to={`/${locale}/services#management-ecosystem`}
          className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-600/30"
        >
          <span>{isLao ? "ສຳຫຼວດລະບົບ 360°" : "Explore 360° Fleet"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
}

