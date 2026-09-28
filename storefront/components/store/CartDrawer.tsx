"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, getApplicablePrice, calculateLAKPrice } from "@/context/CartContext";
import { INITIAL_CATALOG } from "@/data/catalog";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles, Gift, Clock, Users, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    openCheckout,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalUSD,
    totalLAK,
  } = useCart();

  const loyaltyPoints = Math.floor(totalUSD * 10);
  const freeShippingThresholdUSD = 1000;
  
  // Marketing State
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [viewers, setViewers] = useState(12);

  // Timer Effect
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  // Viewers Effect (Simulate active viewers)
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setViewers((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 8000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "LUD2026") {
      setDiscountApplied(true);
    } else {
      alert("ລະຫັດສ່ວນຫຼຸດບໍ່ຖືກຕ້ອງ ຫຼື ໝົດອາຍຸ (Invalid Promo Code)");
    }
  };

  const handleWhatsAppQuickOrder = () => {
    const itemsText = items.map((it, idx) => `${idx + 1}. *${it.part_name_lo || it.part_name}* (${it.sku_code}) x ${it.quantity}`).join("\n");
    const msg = `ສະບາຍດີ DK LAO & LUD!\nຂ້າພະເຈົ້າຕ້ອງການສັ່ງຊື້ສິນຄ້າດ່ວນຈາກກະຕ່າ (${totalItems} ລາຍການ):\n━━━━━━━━━━━━━━━━━━\n${itemsText}\n━━━━━━━━━━━━━━━━━━\n🇱🇦 ຍອດລວມປະມານ: ${finalTotalLAK.toLocaleString()} ກີບ\nກະລຸນາຕິດຕໍ່ກັບເພື່ອຢືນຢັນອໍເດີ ແລະ ການຈັດສົ່ງດ່ວນ!`;
    window.open(`https://wa.me/8562058929299?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const finalTotalUSD = discountApplied ? totalUSD * 0.95 : totalUSD;
  const finalTotalLAK = discountApplied ? totalLAK * 0.95 : totalLAK;

  const progressToFreeShipping = Math.min((finalTotalUSD / freeShippingThresholdUSD) * 100, 100);
  const remainingForFreeShipping = freeShippingThresholdUSD - finalTotalUSD;

  // Recommendations (Cross-Selling)
  const cartSkuIds = items.map(item => item.sku_id);
  const recommendations = INITIAL_CATALOG.filter(item => !cartSkuIds.includes(item.sku_id)).slice(0, 3);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-slate-900/95 text-slate-100 border-l border-white/10 shadow-2xl backdrop-blur-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-slate-950/40">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                      ກະຕ່າສິນຄ້າ <span className="text-xs font-normal text-slate-400">({totalItems} ລາຍການ)</span>
                    </h2>
                    <p className="text-xs text-slate-400">Shopping Cart & Order Summary</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {items.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-xs text-slate-400 hover:text-rose-400 transition-colors px-2 py-1 rounded"
                      title="ລ້າງກະຕ່າທັງໝົດ"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={closeCart}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center text-slate-500 mb-4">
                      <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-200">ກະຕ່າຂອງທ່ານຍັງວ່າງເປົ່າ</h3>
                    <p className="text-sm text-slate-400 mt-1 max-w-xs">
                      ເລືອກສິນຄ້າອຸດສາຫະກຳ ແລະ ອາໄຫຼ່ເຄື່ອງຈັກໜັກໃສ່ກະຕ່າ ເພື່ອສັ່ງຊື້ໄດ້ທັນທີ
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                      <Users className="w-3.5 h-3.5" /> <span>ມີ {viewers} ຄົນ ກຳລັງຊື້ເຄື່ອງໃນຮ້ານຕອນນີ້</span>
                    </div>
                    <Button
                      onClick={closeCart}
                      className="mt-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-6"
                    >
                      ເລືອກຊົມສິນຄ້າ (Browse Catalog)
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Urgency Timer */}
                    <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-2.5 flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 text-rose-400 animate-pulse" />
                      <span className="text-xs font-medium text-rose-200">
                        ໄອເທັມຖືກຈອງໄວ້ພາຍໃນ: <span className="font-bold text-rose-400">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span> ນາທີ
                      </span>
                    </div>
                    
                    {items.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={item.sku_id}
                      className="p-4 rounded-xl bg-slate-800/60 border border-white/10 flex gap-4 items-center hover:border-emerald-500/30 transition-all"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-16 h-16 rounded-lg bg-slate-900/80 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {item.image_url ? (
                          <Image
                            src={item.image_url}
                            alt={item.part_name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <ShoppingBag className="w-6 h-6 text-slate-600" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                            {item.sku_code}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.sku_id)}
                            className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <h4 className="text-sm font-semibold text-slate-100 truncate mt-1">
                          {item.part_name_lo || item.part_name}
                        </h4>
                        
                        <div className="text-[10px] font-medium text-emerald-400 mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> ສິນຄ້ານຳເຂົ້າຕາມອໍເດີ (ຈັດສົ່ງ 30-120 ວັນ)
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <div className="text-sm font-bold text-emerald-400">
                              {item.currency === 'USD' ? '$' : '฿'}{(getApplicablePrice(item) * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              ≈ {(calculateLAKPrice(getApplicablePrice(item), item.currency, item.category) * item.quantity).toLocaleString()} ₭
                            </div>
                            {getApplicablePrice(item) < item.unit_price && (
                              <div className="text-[10px] text-amber-400 bg-amber-950/40 px-1 py-0.5 rounded mt-0.5 inline-block">
                                ໄດ້ລາຄາສົ່ງ (Bulk Discount)
                              </div>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-white/10 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.sku_id, item.quantity - 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-white px-2 min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.sku_id, item.quantity + 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Cross-Selling (You Might Also Like) */}
                  {recommendations.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-white/5">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> ສິນຄ້າທີ່ມັກຊື້ຄູ່ກັນ
                      </h4>
                      <div className="space-y-3">
                        {recommendations.map(rec => (
                          <div key={rec.sku_id} className="flex gap-3 items-center p-2 rounded-lg bg-slate-900/50 hover:bg-slate-800/50 border border-transparent hover:border-white/10 transition-colors">
                            <div className="relative w-12 h-12 rounded bg-slate-950 flex-shrink-0">
                              {rec.image_url ? (
                                <Image src={rec.image_url} alt={rec.part_name} fill className="object-cover rounded" sizes="48px" />
                              ) : (
                                <ShoppingBag className="w-4 h-4 text-slate-600 m-auto mt-4" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] font-semibold text-slate-200 truncate">{rec.part_name_lo || rec.part_name}</div>
                              <div className="text-xs font-bold text-emerald-400">${Number(rec.unit_price).toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
                            </div>
                            <button
                              onClick={() => updateQuantity(rec.sku_id, 1)}
                              className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-colors flex-shrink-0"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  </>
                )}
              </div>

              {/* Footer / Summary */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-slate-950/60 space-y-4">
                  {/* Promo Code Input */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="ລະຫັດສ່ວນຫຼຸດ (Promo Code)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={discountApplied}
                      className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
                    />
                    <Button
                      onClick={handleApplyPromo}
                      disabled={discountApplied || !promoCode}
                      variant="secondary"
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200"
                    >
                      {discountApplied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : "ໃຊ້ລະຫັດ"}
                    </Button>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pb-2 border-b border-white/5">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-emerald-400" /> ຈັດສົ່ງທົ່ວປະເທດລາວ
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> ສິນຄ້າແທ້ຮັບປະກັນ 100%
                    </span>
                    <span className="flex items-center gap-1.5 col-span-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Secure SSL Checkout & Money Back Guarantee
                    </span>
                  </div>

                  {/* Free Shipping Progress */}
                  <div className="space-y-2 py-2 border-b border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      {remainingForFreeShipping > 0 ? (
                        <span className="text-slate-300">
                          ຊື້ອີກ <span className="font-bold text-emerald-400">${remainingForFreeShipping.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span> ໄດ້ຮັບສິດ ສົ່ງຟຣີ! 🚚
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Gift className="w-3.5 h-3.5" /> ຍິນດີດ້ວຍ! ທ່ານໄດ້ຮັບສິດ ສົ່ງຟຣີ!
                        </span>
                      )}
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressToFreeShipping}%` }}
                        className={`h-full rounded-full transition-all duration-500 ${
                          progressToFreeShipping >= 100 ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-gradient-to-r from-blue-500 to-emerald-400"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Loyalty Points */}
                  <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span className="text-xs text-amber-200">DK Rewards (ຄະແນນສະສົມ)</span>
                    </div>
                    <span className="font-bold text-amber-400">+{loyaltyPoints} pts</span>
                  </div>

                  {/* Total Calculations */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>ຈຳນວນລວມ (Total Items):</span>
                      <span className="font-semibold text-slate-200">{totalItems} ຊິ້ນ</span>
                    </div>
                    {discountApplied && (
                      <div className="flex justify-between text-xs text-rose-400">
                        <span>ສ່ວນຫຼຸດ (Promo Code):</span>
                        <span>-5%</span>
                      </div>
                    )}
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-slate-300">ຍອດລວມ (Total LAK):</span>
                      <div className="flex items-center gap-2">
                        {discountApplied && (
                          <span className="text-xs text-slate-500 line-through">
                            {totalLAK.toLocaleString()} ₭
                          </span>
                        )}
                        <span className="text-xl font-black text-emerald-400">
                          {finalTotalLAK.toLocaleString()} ₭
                        </span>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500 text-right">
                      *ລາຄາລວມອັດຕາແລກປ່ຽນ (1 ບາດ = 650 ກີບ, 1 USD = 22,000 ກີບ) ແລະ ຄ່າດຳເນີນການແລ້ວ
                    </div>
                  </div>

                  {/* Checkout Buttons */}
                  <div className="space-y-2 pt-1">
                    <Button
                      onClick={openCheckout}
                      className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group transition-all cursor-pointer"
                    >
                      <span>ດຳເນີນການສັ່ງຊື້ (Proceed to Checkout)</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <button
                      type="button"
                      onClick={handleWhatsAppQuickOrder}
                      className="w-full h-11 bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                      title="ສັ່ງຊື້ດ່ວນຜ່ານ WhatsApp ໂດຍບໍ່ຕ້ອງປ້ອນຟອມ"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>⚡ ສັ່ງຊື້ດ່ວນຜ່ານ WhatsApp (1-Click Order)</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
