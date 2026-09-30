import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchInventory, fetchRentals } from "@/actions/store";
import type { InventoryItem } from "@/actions/store";
import { StoreClient } from "@/components/Forklift/store/StoreClient";
import PageHeader from "@/components/layout/PageHeader";
import { CartProvider } from "@/context/CartContext";

export default function ForkliftStorePage() {
  const { i18n } = useTranslation();
  const isLao = (i18n.language || "lo") === "lo";
  
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [rentals, setRentals] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchInventory(), fetchRentals()])
      .then(([inv, ren]) => {
        setInventory(inv);
        setRentals(ren);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <PageHeader title={isLao ? "ຮ້ານຄ້າລົດຟອກລິບ" : "Forklift Store"} subtitle={isLao ? "ກຳລັງໂຫຼດລາຍການສິນຄ້າ..." : "Loading catalog products..."} />
        <div className="py-20 text-center text-slate-400 font-bold">{isLao ? "ກຳລັງໂຫຼດຂໍ້ມູນ..." : "Loading data..."}</div>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="p-6 max-w-[1400px] mx-auto overflow-x-hidden">
        <PageHeader
          title={isLao ? "ຮ້ານຄ້າລົດຟອກລິບ" : "Forklift Store"}
          subtitle={isLao ? "ຄົ້ນຫາ, ສັ່ງຊື້ ແລະ ຂໍລາຄາລົດຟອກລິບ ແລະ ອາໄຫຼ່" : "Search, order and request quotes for forklifts and parts"}
        />

        <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
          <StoreClient initialItems={inventory} rentalItems={rentals} />
        </div>
      </div>
    </CartProvider>
  );
}
