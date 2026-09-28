import React, { useRef } from 'react';
import { STORE_CATEGORIES } from '@/data/categories';
import { useTranslation } from "react-i18next";
import { Layers, ChevronLeft, ChevronRight } from 'lucide-react';

interface StoreTopNavProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function StoreTopNav({ selectedCategory, onSelectCategory }: StoreTopNavProps) {
  const { i18n } = useTranslation();
  const locale = i18n.language || "lo";
  const isLao = locale === 'lo';
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -250 : 250,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full mb-8">
      {/* Floating Glassmorphic Category Bar */}
      <div className="relative flex items-center p-1.5 rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-lg shadow-slate-900/5 group">
        {/* Scroll Left Button */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex shrink-0 w-8 h-8 rounded-xl items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Scroll Left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Category Chips */}
        <div
          ref={scrollRef}
          className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar whitespace-nowrap px-1 py-0.5 w-full scroll-smooth"
        >
          {/* "All" category button */}
          <button
            onClick={() => onSelectCategory("All")}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-black transition-all duration-200 flex items-center gap-2 shrink-0 ${
              selectedCategory === "All"
                ? "bg-[#005BAC] text-white shadow-md shadow-blue-600/30 scale-[1.02]"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-[#005BAC] dark:hover:text-blue-400"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isLao ? "ທຸກໝວດໝູ່ (All)" : "All Categories"}</span>
          </button>

          {STORE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            const label = isLao ? (cat.name_lo || cat.name) : (cat.name || cat.name_lo);

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? "bg-[#005BAC] text-white shadow-md shadow-blue-600/30 scale-[1.02]"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-[#005BAC] dark:hover:text-blue-400"
                }`}
              >
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex shrink-0 w-8 h-8 rounded-xl items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Scroll Right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
