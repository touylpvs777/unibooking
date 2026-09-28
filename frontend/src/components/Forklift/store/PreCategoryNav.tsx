import React, { useRef } from "react";
import { Truck, Archive, SprayCan, Settings, Pickaxe, Layers, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { PRE_CATEGORIES, PreCategory, STORE_CATEGORIES } from "@/data/categories";
import { useTranslation } from "react-i18next";

interface PreCategoryNavProps {
  selectedPreCategory: string;
  onSelectPreCategory: (id: string) => void;
  items?: Array<{ category?: string; pre_category_id?: string }>;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Truck,
  Archive,
  SprayCan,
  Settings,
  Pickaxe,
};

export function PreCategoryNav({
  selectedPreCategory = "all",
  onSelectPreCategory,
  items = [],
}: PreCategoryNavProps) {
  const { i18n } = useTranslation();
  const locale = i18n.language || "lo";
  const isLao = locale === "lo";
  const scrollRef = useRef<HTMLDivElement>(null);

  // Compute product counts dynamically per pre-category
  const counts = React.useMemo(() => {
    const map: Record<string, number> = { all: items.length };

    // Build a category -> pre_category_id dictionary
    const catToPreCat: Record<string, string> = {};
    STORE_CATEGORIES.forEach((cat) => {
      catToPreCat[cat.name.toLowerCase()] = cat.pre_category_id;
    });

    items.forEach((item) => {
      let preCatId = item.pre_category_id;
      if (!preCatId && item.category) {
        preCatId = catToPreCat[item.category.toLowerCase()];
      }
      if (preCatId) {
        map[preCatId] = (map[preCatId] || 0) + 1;
      }
    });

    return map;
  }, [items]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.7 : scrollLeft + clientWidth * 0.7;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const navItems = [
    {
      id: "all",
      name: isLao ? "✨ ທຸກສາຍງານ (All Divisions)" : "✨ All Divisions",
      name_lo: "✨ ທຸກສາຍງານ (All Divisions)",
      icon: Layers,
      count: counts["all"] || items.length,
      badge: isLao ? "ລວມສິນຄ້າທັງໝົດ" : "Full Catalog",
      accent: "from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800",
    },
    ...PRE_CATEGORIES.map((p) => ({
      id: p.id,
      name: isLao ? p.name_lo : p.name,
      name_lo: p.name_lo,
      icon: ICON_MAP[p.iconName] || Layers,
      count: counts[p.id] || 0,
      badge: isLao ? p.badge_lo : p.badge_en,
      accent: p.accentColor,
    })),
  ];

  return (
    <div className="relative w-full bg-white dark:bg-slate-900 rounded-3xl p-3 md:p-4 border border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-none mb-6">
      {/* Top Header Label */}
      <div className="flex items-center justify-between px-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs md:text-sm font-black text-slate-900 dark:text-white tracking-wide uppercase">
            {isLao ? "ເລືອກສາຍງານຫຼັກ (Pre-Category Divisions)" : "Select Business Division (Pre-Category)"}
          </span>
        </div>
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hidden sm:inline">
          {isLao ? "ກັ່ນກອງຕາມ 5 ສາຍງານຍຸດທະສາດ DK LAO" : "Filtered across 5 strategic business units"}
        </span>
      </div>

      {/* Navigation Buttons (desktop/tablet) */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-md shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all cursor-pointer opacity-0 hover:opacity-100 focus:opacity-100 hidden md:flex"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-md shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all cursor-pointer opacity-0 hover:opacity-100 focus:opacity-100 hidden md:flex"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-0.5 px-1 scrollbar-none snap-x snap-mandatory scroll-smooth"
      >
        {navItems.map((item) => {
          const isSelected = selectedPreCategory === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelectPreCategory(item.id)}
              className={`group relative shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 text-left cursor-pointer snap-start select-none ${
                isSelected
                  ? "bg-slate-900 text-white dark:bg-blue-600 dark:text-white shadow-md shadow-blue-900/20 scale-[1.02] ring-2 ring-blue-500/40"
                  : "bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/5 hover:border-blue-400/40"
              }`}
            >
              {/* Icon Bubble */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 shadow-sm ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Title & Badge */}
              <div className="flex flex-col pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs md:text-sm font-black tracking-tight whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                      isSelected
                        ? "bg-white/20 text-blue-100"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {item.count} {isLao ? "ລາຍການ" : "items"}
                  </span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold tracking-wider uppercase hidden sm:inline ${
                        isSelected ? "text-blue-200" : "text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      • {item.badge}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
