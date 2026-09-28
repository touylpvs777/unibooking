import React, { useRef, useState, useEffect } from 'react';
import { InventoryItem } from '@/actions/store';
import { useCart, calculateLAKPrice } from '@/context/CartContext';
import { ChevronLeft, ChevronRight, Heart, Timer, ShoppingCart, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/Forklift/ui/button';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ProductSliderProps {
  title: string;
  items: InventoryItem[];
  isFlashDeal?: boolean;
}

export function ProductSlider({ title, items, isFlashDeal = false }: ProductSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { i18n } = useTranslation();
  const locale = i18n.language || "lo";
  const isLao = locale === 'lo';
  
  // Fake countdown for Flash Deals
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 34, s: 56 });

  useEffect(() => {
    if (!isFlashDeal) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 0; m = 0; s = 0; clearInterval(timer); }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFlashDeal]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      const target = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({ left: target, behavior: 'smooth' });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className={`w-full rounded-[2rem] p-6 md:p-8 lg:p-10 ${isFlashDeal ? 'bg-gradient-to-b from-rose-50 to-white dark:from-rose-950/20 dark:to-slate-950 border border-rose-200 dark:border-rose-900/50 shadow-sm' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm'}`}>
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4 flex-wrap">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tight">
            {isFlashDeal && <Zap className="w-8 h-8 text-[#E1251B] fill-[#E1251B]" />}
            {title}
          </h2>

          {items && items.length > 0 && (
            <span className="text-xs font-black px-3 py-1 bg-blue-50 text-[#005BAC] dark:bg-blue-950/60 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800/80 tracking-wide shadow-sm">
              {items.length} {isLao ? "ລາຍການ" : "Items"}
            </span>
          )}
          
          {isFlashDeal && (
            <div className="flex items-center gap-2 bg-[#E1251B] text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg shadow-red-500/30 animate-pulse">
              <Timer className="w-4 h-4" />
              <span className="tracking-widest">
                {String(timeLeft.h).padStart(2, '0')}:
                {String(timeLeft.m).padStart(2, '0')}:
                {String(timeLeft.s).padStart(2, '0')}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <Link href={`/${locale}/store`} className="text-sm font-bold text-[#005BAC] hover:text-[#00488A] dark:text-blue-400 dark:hover:text-blue-300 mr-4 transition-colors">
            {isLao ? "ເບິ່ງທັງໝົດ" : "View All"} &rarr;
          </Link>
          <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-all shadow-sm border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-all shadow-sm border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-5 md:gap-6 lg:gap-8 overflow-x-auto pb-8 pt-4 hide-scrollbar snap-x snap-mandatory px-2"
      >
        {items.map((item, idx) => {
          const priceLAK = calculateLAKPrice(Number(item.unit_price), (item as any).currency, item.category);
          const productName = (isLao ? (item.part_name_lo || item.part_name) : (item.part_name || item.part_name_lo)) || item.sku_code || 'Product';
          return (
          <div 
            key={idx} 
            className="relative snap-start shrink-0 w-[260px] md:w-[300px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden group hover:border-[#005BAC]/50 hover:shadow-[0_20px_40px_-15px_rgba(0,91,172,0.18)] transition-all duration-500 flex flex-col"
          >
            {/* Image Area */}
            <div className="relative aspect-[4/3] bg-slate-50 dark:bg-slate-800/50 p-6 flex-shrink-0 overflow-hidden">
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {isFlashDeal && (
                  <div className="bg-[#E1251B] text-white text-[11px] font-black px-2.5 py-1 rounded-md shadow-lg shadow-red-500/30">
                    -20% OFF
                  </div>
                )}
                <div className="bg-blue-500/10 text-[#005BAC] dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#005BAC]/20 backdrop-blur-md flex items-center gap-1">
                  <Timer className="w-3 h-3" /> {isLao ? "ສິນຄ້າພ້ອມສົ່ງ" : "Ready for Delivery"}
                </div>
              </div>
              
              <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-400 hover:text-rose-500 flex items-center justify-center shadow-sm transition-all hover:scale-110 z-10">
                <Heart className="w-4 h-4" />
              </button>
              
              <div className="w-full h-full flex items-center justify-center">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={productName}
                    fill
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-24 h-24 text-slate-300 dark:text-slate-700 group-hover:scale-110 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                  </div>
                )}
              </div>
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
              <div className="space-y-2">
                <p className="text-[11px] font-black text-[#005BAC] dark:text-blue-400 uppercase tracking-widest">{item.category}</p>
                <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-[#005BAC] transition-colors">
                  {productName}
                </h3>
                <p className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 inline-block px-2 py-0.5 rounded-md">SKU: {item.sku_code}</p>
              </div>

              <div className="pt-2 flex items-end justify-between">
                <div>
                  {isFlashDeal && (
                    <p className="text-xs font-bold text-slate-400 line-through mb-0.5">
                      {(priceLAK / (1 - 0.2)).toLocaleString()} ₭
                    </p>
                  )}
                  <p className="text-xl font-black text-[#005BAC] dark:text-blue-400 tracking-tight">
                    {priceLAK.toLocaleString()} <span className="text-sm">₭</span>
                  </p>
                </div>
              </div>

              <Button 
                onClick={() => addToCart(item, 1)}
                className="w-full bg-[#005BAC] hover:bg-[#00488A] text-white h-11 text-sm font-bold rounded-xl shadow-lg shadow-[#005BAC]/20 transition-all active:scale-95 flex items-center justify-center gap-2 group/btn"
              >
                <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
                {isLao ? "ເພີ່ມລົງກະຕ່າ" : "Add to Cart"}
              </Button>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
