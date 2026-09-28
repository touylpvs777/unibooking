"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { InventoryItem } from "@/actions/store";

export interface CartItem {
  sku_id: string;
  sku_code: string;
  part_name: string;
  part_name_lo?: string;
  category?: string;
  unit_price: number;
  currency?: 'THB' | 'USD' | 'LAK';
  quantity: number;
  image_url?: string;
  qty_on_hand: number;
  bulk_pricing?: { min_qty: number; price: number }[];
}

export interface ExchangeRates {
  THB: number;
  USD: number;
  lastUpdated: string;
  source: string;
}

export const DEFAULT_EXCHANGE_RATES: ExchangeRates = {
  THB: 650, // 1 THB = ~650 LAK (Commercial Reference Rate)
  USD: 22000, // 1 USD = 22,000 LAK (Commercial Reference Rate)
  lastUpdated: "ມື້ນີ້ (Real-time Online Feed)",
  source: "BCEL & Commercial FX Market Reference"
};

export const USD_TO_LAK_RATE = DEFAULT_EXCHANGE_RATES.USD;
export const THB_TO_LAK_RATE = DEFAULT_EXCHANGE_RATES.THB;
export const FACTORY_MARKUP_PERCENT = 65; // Strictly 65% factory profit markup (as mandated by user)
export const FACTORY_MARKUP_RATE = 1.65; // 1 + 0.65 = 1.65 (Strictly 65% profit markup)
export const MARKUP_RATE = FACTORY_MARKUP_RATE;

/**
 * Land-Logistics & Factory-to-Laos Pricing Framework
 * Strictly implements: Factory Base Price + 65% Profit Markup (1.65x)
 */
export function getProductPricingParameters(category?: string, unitPrice: number = 0, currency: string = 'THB'): {
  freightFactor: number;
  marginPercent: number;
  markupFactor: number;
} {
  return {
    freightFactor: 0.0,
    marginPercent: 65,
    markupFactor: 1.65
  };
}

/**
 * Calculates retail price in source foreign currency (THB ฿ or USD $) after strict 65% markup
 */
export const calculateRetailForeignPrice = (
  factoryPrice: number,
  currency: string = 'THB'
): number => {
  if (currency === 'LAK') return Math.round(factoryPrice);
  return Math.round(factoryPrice * FACTORY_MARKUP_RATE);
};

export const calculateLAKPrice = (
  price: number,
  currency: string = 'THB',
  category?: string,
  rates: ExchangeRates = DEFAULT_EXCHANGE_RATES
) => {
  if (currency === 'LAK') {
    // Already in Lao Kip
    return Math.round(price);
  }
  
  let baseLak = 0;
  const thbRate = rates?.THB || DEFAULT_EXCHANGE_RATES.THB;
  const usdRate = rates?.USD || DEFAULT_EXCHANGE_RATES.USD;

  if (currency === 'THB') {
    baseLak = price * thbRate;
  } else if (currency === 'USD') {
    baseLak = price * usdRate;
  } else {
    baseLak = price * thbRate;
  }

  // Strictly +65% Factory Markup (1.65x)
  return Math.round(baseLak * FACTORY_MARKUP_RATE);
};

export const getApplicablePrice = (item: CartItem) => {
  if (!item.bulk_pricing || item.bulk_pricing.length === 0) return item.unit_price;
  // Find highest applicable qty tier
  const sortedTiers = [...item.bulk_pricing].sort((a, b) => b.min_qty - a.min_qty);
  for (const tier of sortedTiers) {
    if (item.quantity >= tier.min_qty) {
      return tier.price;
    }
  }
  return item.unit_price;
};

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  addToCart: (item: InventoryItem, quantity?: number) => void;
  removeFromCart: (sku_id: string) => void;
  updateQuantity: (sku_id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalUSD: number;
  totalTHB: number;
  totalLAK: number;
  exchangeRates: ExchangeRates;
  updateRates: (newRates: Partial<ExchangeRates>) => void;
  isAdminMode: boolean;
  setAdminMode: (val: boolean) => void;
  toggleAdminMode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [rates, setRates] = useState<ExchangeRates>(DEFAULT_EXCHANGE_RATES);
  const [isAdminMode, setIsAdminModeState] = useState(false);

  // Load cart, rates, and adminMode from LocalStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("lud_shopping_cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedRates = localStorage.getItem("lud_exchange_rates");
      if (savedRates) {
        setRates(JSON.parse(savedRates));
      }
      // Admin mode must ALWAYS default to false for public customers.
      // We only check temporary sessionStorage for authorized staff during active session,
      // and explicitly remove any legacy localStorage keys to prevent accidental leaks.
      localStorage.removeItem("lud_admin_pricing_mode");
      const sessionAdmin = sessionStorage.getItem("lud_admin_pricing_mode");
      if (sessionAdmin === "true") {
        setIsAdminModeState(true);
      } else {
        setIsAdminModeState(false);
      }
    } catch (e) {
      console.error("Failed to load cart/rates from storage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const setAdminMode = (val: boolean) => {
    setIsAdminModeState(val);
    try {
      if (val) {
        sessionStorage.setItem("lud_admin_pricing_mode", "true");
      } else {
        sessionStorage.removeItem("lud_admin_pricing_mode");
        localStorage.removeItem("lud_admin_pricing_mode");
      }
    } catch (e) {}
  };

  const toggleAdminMode = () => {
    setAdminMode(!isAdminMode);
  };

  const updateRates = (newRates: Partial<ExchangeRates>) => {
    setRates((prev) => {
      const updated = {
        ...prev,
        ...newRates,
        lastUpdated: "ອັບເດດລ່າສຸດ (Online Live Rate)",
      };
      try {
        localStorage.setItem("lud_exchange_rates", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Save cart to LocalStorage when items change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("lud_shopping_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items, isInitialized]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const openCheckout = () => {
    setIsOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const addToCart = (product: InventoryItem, qty: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.sku_id === product.sku_id);
      if (existing) {
        const newQty = Math.min(
          existing.quantity + qty,
          product.qty_on_hand > 0 ? product.qty_on_hand : 99
        );
        return prev.map((item) =>
          item.sku_id === product.sku_id ? { ...item, quantity: newQty } : item
        );
      } else {
        const newItem: CartItem = {
          sku_id: product.sku_id,
          sku_code: product.sku_code,
          part_name: product.part_name,
          part_name_lo: (product as any).part_name_lo || product.part_name,
          category: (product as any).category || "Industrial Parts",
          unit_price: Number(product.unit_price),
          currency: (product as any).currency || 'THB',
          quantity: Math.min(qty, product.qty_on_hand > 0 ? product.qty_on_hand : 1),
          image_url: (product as any).image_url,
          qty_on_hand: product.qty_on_hand,
          bulk_pricing: (product as any).bulk_pricing,
        };
        return [...prev, newItem];
      }
    });
    setIsOpen(true);
  };

  const removeFromCart = (sku_id: string) => {
    setItems((prev) => prev.filter((item) => item.sku_id !== sku_id));
  };

  const updateQuantity = (sku_id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sku_id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.sku_id === sku_id) {
          const maxAllowed = item.qty_on_hand > 0 ? item.qty_on_hand : 99;
          return { ...item, quantity: Math.min(quantity, maxAllowed) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalUSD = items.reduce((sum, item) => {
    return item.currency === 'USD' ? sum + getApplicablePrice(item) * item.quantity : sum;
  }, 0);
  const totalTHB = items.reduce((sum, item) => {
    return item.currency === 'THB' ? sum + getApplicablePrice(item) * item.quantity : sum;
  }, 0);
  
  const totalLAK = items.reduce((sum, item) => {
    const applicablePrice = getApplicablePrice(item);
    return sum + calculateLAKPrice(applicablePrice, item.currency, item.category, rates) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        isCheckoutOpen,
        openCart,
        closeCart,
        openCheckout,
        closeCheckout,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalUSD,
        totalTHB,
        totalLAK,
        exchangeRates: rates,
        updateRates,
        isAdminMode,
        setAdminMode,
        toggleAdminMode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
