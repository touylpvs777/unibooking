"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { STORE_CATEGORIES } from '@/data/categories';
import { useLocale } from 'next-intl';

export function CategoryCircleGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const isLao = locale === 'lo';

  const categories = STORE_CATEGORIES.map(cat => ({
    id: cat.id,
    name: isLao ? (cat.name_lo || cat.name) : cat.name,
    image: cat.image,
    link: `/${locale}/store?category=${encodeURIComponent(cat.name)}`
  }));

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-white/5">
        <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {isLao ? "ໝວດໝູ່ສິນຄ້າ ແລະ ອຸປະກອນອຸດສາຫະກຳ" : "Industrial Equipment & Machinery Categories"}
        </h3>
        <Link href={`/${locale}/store`} className="text-sm font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 hidden md:flex items-center gap-1 transition-colors">
          {isLao ? "ເບິ່ງສິນຄ້າທັງໝົດ" : "View All Catalog"} <span>&rarr;</span>
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative group/carousel">
        {/* Navigation Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-lg rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:scale-105 transition-all opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-lg rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:scale-105 transition-all opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrollable Area */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory py-8 px-6 gap-6 md:gap-10"
        >
          {categories.map((cat, idx) => (
            <Link 
              key={cat.id} 
              href={cat.link} 
              className="flex flex-col items-center gap-4 group min-w-[120px] md:min-w-[160px] snap-start"
            >
              {/* Image Circle Container */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center overflow-hidden border border-slate-200/50 dark:border-white/5 group-hover:border-emerald-500/30 group-hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.2)] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/0 via-transparent to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-transparent transition-all duration-500 rounded-[2rem]" />
                <motion.img 
                  whileHover={{ scale: 1.15, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-sm mix-blend-multiply dark:mix-blend-normal z-10" 
                />
              </div>
              <span className="text-sm md:text-[15px] font-bold text-slate-700 dark:text-slate-300 text-center leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
