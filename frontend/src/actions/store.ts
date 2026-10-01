import { getProducts } from "@/api/catalog";
import { INITIAL_CATALOG, RENTAL_CATALOG } from "@/data/catalog";
import type { InventoryItem } from "@/data/catalog";

export type { InventoryItem };

export async function fetchInventory(skip: number = 0, limit: number = 100): Promise<InventoryItem[]> {
  try {
    const res = await getProducts({ skip, limit, is_active: true });
    const products = res.data.items;
    
    if (products && products.length > 0) {
      return products.map((prod, idx) => {
        return {
          sku_id: prod.id.toString(),
          sku_code: prod.sku,
          barcode: null,
          part_name: prod.name_en,
          part_name_lo: prod.name_lo || prod.name_en,
          category: prod.category?.name_en || "General",
          description: prod.description_lo || prod.description_en || "Premium industrial equipment from DK Lao Trading",
          qty_on_hand: 5,
          unit_price: INITIAL_CATALOG.find(i => i.sku_code === prod.sku)?.unit_price || 15000000,
          image_url: prod.primary_image_url || INITIAL_CATALOG[idx % INITIAL_CATALOG.length].image_url,
          currency: "LAK",
        };
      });
    }
  } catch (error) {
    console.error("Failed to fetch real products, falling back to mock:", error);
  }
  return INITIAL_CATALOG;
}

export async function fetchRentals(): Promise<InventoryItem[]> {
  try {
    const res = await getProducts({ skip: 0, limit: 100, is_rental: true, is_active: true });
    const products = res.data.items;
    
    if (products && products.length > 0) {
      return products.map((prod, idx) => {
        return {
          sku_id: prod.id.toString(),
          sku_code: prod.sku,
          barcode: null,
          part_name: prod.name_en,
          part_name_lo: prod.name_lo || prod.name_en,
          category: prod.category?.name_en || "Rental Fleet",
          qty_on_hand: 2,
          unit_price: RENTAL_CATALOG.find(i => i.sku_code === prod.sku)?.unit_price || 5000000, 
          image_url: prod.primary_image_url || RENTAL_CATALOG[idx % RENTAL_CATALOG.length].image_url,
          currency: "LAK",
        };
      });
    }
  } catch (error) {
    console.error("Failed to fetch rental products, falling back to mock:", error);
  }
  return RENTAL_CATALOG;
}
