"use server";

import { InventoryItem, INITIAL_CATALOG } from "@/data/catalog";
export type { InventoryItem };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1` 
  : 'http://localhost:8000/api/v1';

export async function fetchInventory(skip: number = 0, limit: number = 100): Promise<InventoryItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/wms/inventory?skip=${skip}&limit=${limit}`, {
      next: { revalidate: 30 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return INITIAL_CATALOG;
    }

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      // Merge with enriched catalog metadata if API returns basic records
      return data.map((item: any, idx: number) => {
        const enriched = INITIAL_CATALOG.find(c => c.sku_code === item.sku_code) || INITIAL_CATALOG[idx % INITIAL_CATALOG.length];
        return {
          ...enriched,
          ...item,
          unit_price: Number(item.unit_price || enriched.unit_price),
          original_price: item.original_price ? Number(item.original_price) : enriched.original_price,
          qty_on_hand: Number(item.qty_on_hand ?? enriched.qty_on_hand),
          image_url: item.image_url || enriched.image_url,
        };
      });
    }

    return INITIAL_CATALOG;
  } catch (error) {
    return INITIAL_CATALOG;
  }
}

export async function fetchRentals(): Promise<InventoryItem[]> {
  // Can be extended to fetch from API later
  const { RENTAL_CATALOG } = await import('@/data/catalog');
  return RENTAL_CATALOG;
}
