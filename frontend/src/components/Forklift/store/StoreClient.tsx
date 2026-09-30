import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import type { IFuseOptions } from "fuse.js";
import type { InventoryItem } from "@/actions/store";
import { StoreSidebar } from "./StoreSidebar";
import { ProductGrid } from "./ProductGrid";
import { CartDrawer } from "./CartDrawer";
import { CheckoutModal } from "./CheckoutModal";
import { TyreFinderModal } from "./TyreFinderModal";
import { FilterFinderModal } from "./FilterFinderModal";
import { PartIdentifierModal } from "./PartIdentifierModal";
import { MobileServiceBookingModal } from "./MobileServiceBookingModal";
import { HeroCarousel } from "./HeroCarousel";
import { CategoryCircleGrid } from "./CategoryCircleGrid";
import { ProductSlider } from "./ProductSlider";
import { IndustrySolutionsGrid } from "./IndustrySolutionsGrid";
import { PromoBanners } from "./PromoBanners";
import { PDFCatalogModal } from "./PDFCatalogModal";
import { ProjectPackagesSection } from "./ProjectPackagesSection";
import { PreCategoryNav } from "./PreCategoryNav";
import { PRE_CATEGORIES, STORE_CATEGORIES } from "@/data/categories";
import { Truck, Settings, ShoppingBag, ArrowUpDown, Wrench, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/Forklift/ui/button";
import { useTranslation } from "react-i18next";

interface StoreClientProps {
  initialItems: InventoryItem[];
  rentalItems?: InventoryItem[];
}

// Fuse.js options — fuzzy search across 4 fields with Lao + English support
const FUSE_OPTIONS: IFuseOptions<InventoryItem> = {
  includeScore: true,
  threshold: 0.35, // 0 = exact, 1 = match anything. 0.35 = tolerates minor typos
  ignoreLocation: true,
  keys: [
    { name: "part_name", weight: 2 },
    { name: "part_name_lo", weight: 2 },
    { name: "sku_code", weight: 3 },
    { name: "category", weight: 1 },
    { name: "description", weight: 0.5 },
    { name: "description_lo", weight: 0.5 },
  ],
};

const SUBSYSTEM_TAGS_DATA = [
  { id: "all", labelLo: "✨ ທັງໝົດ (All Systems)", labelEn: "✨ All Systems", keywords: [] },
  { id: "shock", labelLo: "🛞 ໂຊກອັບ & ຊ່ວງລາງ (Shock & Suspension)", labelEn: "🛞 Shock & Suspension", keywords: ["shock", "strut", "monotube", "fsd", "suspension", "control arm", "ball joint", "knuckle", "king pin", "axle", "ໂຊກ", "ຊົກ", "ຊ່ວງລາງ", "ປີກນົກ", "ຄອມ້າ"] },
  { id: "brake", labelLo: "🛑 ລະບົບເບຣກ (Brake System)", labelEn: "🛑 Brake System", keywords: ["brake", "rotor", "disc", "pad", "shoe", "master cylinder", "ibooster", "caliper", "ເບຣກ", "ເບກ", "ຈານເບຣກ", "ຜ້າເບຣກ"] },
  { id: "filter", labelLo: "🫁 ໝໍ້ຕອງ & ໄສ້ຕອງ (Filters)", labelEn: "🫁 Filters & Elements", keywords: ["filter", "hepa", "cn95", "air cleaner", "ຕອງ", "ກອງ", "ໄສ້ຕອງ"] },
  { id: "tire", labelLo: "🛞 ຢາງລົດ & ກະທະລໍ້ (Tyres & Wheels)", labelEn: "🛞 Tyres & Wheels", keywords: ["tire", "tyre", "wheel", "rim", "solid tire", "all-terrain", "ຢາງ", "ລໍ້", "ກະທະລໍ້"] },
  { id: "battery", labelLo: "⚡ ລະບົບໄຟ & ແບັດເຕີຣີ (Battery & Electric)", labelEn: "⚡ Electrical & Batteries", keywords: ["battery", "charger", "charging", "cable", "adapter", "wallbox", "starter", "alternator", "ignit", "light", "led", "fuse", "ecm", "ແບັດ", "ໝໍ້ໄຟ", "ສາຍສາກ", "ໄຟ", "ໄດສະຕາດ", "ໄດຊາດ"] },
  { id: "oil", labelLo: "🛢️ ນ້ຳມັນ & ຂອງແຫຼວ (Oils & Fluids)", labelEn: "🛢️ Oils & Lubricants", keywords: ["oil", "fluid", "coolant", "grease", "15w-40", "atf", "vg 68", "iso 46", "lubricant", "ນ້ຳມັນ", "ນ້ຳຢາ", "ຈາລະບີ"] },
  { id: "engine", labelLo: "⚙️ ເຄື່ອງຈັກ & ມໍເຕີ (Engine & Motor)", labelEn: "⚙️ Engine & Powertrain", keywords: ["engine", "motor", "turbo", "piston", "liner", "gasket", "cylinder head", "torque converter", "transmission", "clutch", "ເຄື່ອງຈັກ", "ມໍເຕີ", "ເທີ້ໂບ", "ລູກສູບ", "ເກຍ"] },
  { id: "forklift_mast", labelLo: "🏗️ ເສົາ & ໃບຊາຍົກ (Mast & Forks)", labelEn: "🏗️ Mast & Carriage Forks", keywords: ["mast", "fork", "chain", "side shift", "tilt", "roller", "carriage", "ເສົາ", "ໃບຊາ", "ໂສ້"] },
  { id: "lifting", labelLo: "⛓️ ລອກໂສ້ & ອຸປະກອນຍົກ (Hoists & Rigging)", labelEn: "⛓️ Hoists & Rigging", keywords: ["hoist", "chain block", "sling", "lever hoist", "crane", "shuttle", "asrs", "pallet truck", "trolley", "ລອກ", "ລອກໂສ້", "ສະລິງ", "ລົດເຂັນ", "ຍົກ"] },
  { id: "tools", labelLo: "🔧 ເຄື່ອງມືຊ່າງ & ອຸປະກອນ (Tools & Workshop)", labelEn: "🔧 Tools & Workshop", keywords: ["tool", "wrench", "drill", "cabinet", "workbench", "grinder", "hammer", "saw", "welder", "welding", "fan", "blower", "ເຄື່ອງມື", "ປະແຈ", "ສະຫວ່ານ", "ຕູ້ເຄື່ອງມື", "ເຊື່ອມ", "ພັດລົມ"] },
  { id: "safety", labelLo: "🛡️ ອຸປະກອນເຊັບຕີ້ (Safety & PPE)", labelEn: "🛡️ Safety & PPE", keywords: ["helmet", "vest", "goggle", "boot", "shoe", "glove", "first aid", "fire", "ear", "spill", "cone", "mirror", "chock", "ໝວກ", "ເສື້ອ", "ເກີບ", "ຖົງມື", "ປະຖົມພະຍາບານ", "ມອດໄຟ", "ກວຍ"] },
];

const POPULAR_MODELS_DATA = [
  { id: "all", labelLo: "🚗 ທຸກລຸ້ນ (All Models)", labelEn: "🚗 All Models", query: "" },
  { id: "revo", labelLo: "Toyota Hilux Revo / Fortuner", labelEn: "Toyota Hilux Revo / Fortuner", query: "Revo" },
  { id: "dmax", labelLo: "Isuzu D-Max / MU-X", labelEn: "Isuzu D-Max / MU-X", query: "D-Max" },
  { id: "ranger", labelLo: "Ford Ranger / Raptor", labelEn: "Ford Ranger / Raptor", query: "Ranger" },
  { id: "byd", labelLo: "BYD Atto 3 / Dolphin / Seal", labelEn: "BYD Atto 3 / Dolphin / Seal", query: "BYD" },
  { id: "tesla", labelLo: "Tesla Model 3 / Model Y", labelEn: "Tesla Model 3 / Model Y", query: "Tesla" },
  { id: "neta", labelLo: "NETA V / NETA X", labelEn: "NETA V / NETA X", query: "NETA" },
  { id: "aion", labelLo: "GAC Aion Y Plus", labelEn: "GAC Aion Y Plus", query: "Aion" },
  { id: "mitsubishi_fl", labelLo: "Mitsubishi Forklifts (GRENDiA / EDiA)", labelEn: "Mitsubishi Forklifts (GRENDiA / EDiA)", query: "Mitsubishi" },
  { id: "toyota_fl", labelLo: "Toyota Forklifts (8-Series & SAS)", labelEn: "Toyota Forklifts (8-Series & SAS)", query: "Toyota" },
  { id: "heli_fl", labelLo: "HELI Forklifts (H3 / G2 Li-ion)", labelEn: "HELI Forklifts (H3 / G2 Li-ion)", query: "HELI" },
  { id: "nilfisk_clean", labelLo: "Nilfisk Cleaning (Scrubber / Sweeper / Vacuum)", labelEn: "Nilfisk Cleaning (Scrubber / Sweeper / Vacuum)", query: "Nilfisk" },
  { id: "jungheinrich_fl", labelLo: "Jungheinrich Forklifts (EFG / ETV / DFG)", labelEn: "Jungheinrich Forklifts (EFG / ETV / DFG)", query: "Jungheinrich" },
  { id: "komatsu_fl", labelLo: "Komatsu FD Forklift", labelEn: "Komatsu FD Forklift", query: "Komatsu FD" },
  { id: "tcm_fl", labelLo: "TCM FD Forklift", labelEn: "TCM FD Forklift", query: "TCM FD" },
];

export function StoreClient({ initialItems, rentalItems = [] }: StoreClientProps) {
  const { totalItems, openCart } = useCart();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  const locale = i18n.language || "lo";
  const isLao = locale === "lo";

  const subsystemTags = useMemo(() => {
    return SUBSYSTEM_TAGS_DATA.map((t) => ({
      id: t.id,
      label: isLao ? t.labelLo : t.labelEn,
      keywords: t.keywords,
    }));
  }, [isLao]);

  const popularModels = useMemo(() => {
    return POPULAR_MODELS_DATA.map((m) => ({
      id: m.id,
      label: isLao ? m.labelLo : m.labelEn,
      query: m.query,
    }));
  }, [isLao]);

  const [activeTab, setActiveTab] = useState<"store" | "rental">("store");
  const [selectedPreCategory, setSelectedPreCategory] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSubsystem, setSelectedSubsystem] = useState<string>("all");
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [isTyreFinderOpen, setIsTyreFinderOpen] = useState<boolean>(false);
  const [isFilterFinderOpen, setIsFilterFinderOpen] = useState<boolean>(false);
  const [isPartIdentifierOpen, setIsPartIdentifierOpen] = useState<boolean>(false);
  const [isMobileServiceOpen, setIsMobileServiceOpen] = useState<boolean>(false);
  const [isPDFCatalogOpen, setIsPDFCatalogOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price_asc" | "price_desc" | "name">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState<number>(24);

  const updateUrlParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== "all" && value !== "All") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      navigate(`${location.pathname}?${params.toString()}`, { replace: true, preventScrollReset: true });
    },
    [searchParams, location.pathname, navigate]
  );

  // Sync category, pre_category and query from URL query parameters (e.g. ?pre_category=nilfisk-cleaning)
  useEffect(() => {
    const preCat = searchParams?.get("pre_category");
    const cat = searchParams?.get("category");
    const q = searchParams?.get("q");
    if (preCat || cat || q) {
      if (preCat) setSelectedPreCategory(preCat);
      if (cat) setSelectedCategory(cat);
      if (q) setSearchQuery(q);
      setSelectedSubsystem("all");
      setSelectedModel("all");
      const el = document.getElementById("product-catalog");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams]);

  // Curate diverse, cross-category showcase selections for homepage sliders
  const flashDealsItems = useMemo(() => {
    const targetSkus = ["JNS-HL-1002", "JNS-WH-1027", "JNS-PK-1017", "JNS-SF-1031", "JNS-CL-1026", "JNS-PR-1015", "JNS-ST-1032", "JNS-PK-1007"];
    const found = targetSkus.map(s => initialItems.find(i => i.sku_code === s)).filter(Boolean) as InventoryItem[];
    return found.length >= 6 ? found : initialItems.slice(0, 8);
  }, [initialItems]);

  const bestSellerItems = useMemo(() => {
    const targetSkus = [
      // 1. Industrial Power Generator (Flagship Cummins)
      "CUM-QSG12-400S",
      // 2-5. Top-tier Forklifts (Brand-accurate, ມື 1 ຈາກໂຮງງານ)
      "MFT-FD25N",
      "TYT-8FD25",
      "HELI-CPCD25-H3",
      "JGH-EFG216K",
      // 6-8. Hand Pallet Trucks (Double Nylon, Double PU, Narrow)
      "JNS-HL-1001",
      "JNS-HL-1002",
      "JNS-HL-1005",
      // 9-10. Industrial Caster Wheels
      "JNS-WH-1001",
      "JNS-WH-1003",
      // 11-12. Storage & Shelving Racking Systems
      "JNS-ST-1001",
      "JNS-ST-1002",
      // 13-14. Workshop Tool Cabinets
      "JNS-TL-1001",
      "JNS-TL-1002",
      // 15-16. Industrial Safety & Traffic Protection
      "JNS-SF-1001",
      "JNS-SF-1002",
      // 17-18. Industrial Cleaning Machinery
      "JNS-CL-1001",
      "JNS-CL-1004",
      // 19. Packaging Workstation Bench
      "JNS-PK-1001",
      // 20. Machinery Precision Bearing Sets
      "JNS-AC-1001"
    ];
    const found = targetSkus.map(s => initialItems.find(i => i.sku_code === s)).filter(Boolean) as InventoryItem[];
    return found.length >= 12 ? found : initialItems.slice(0, 20);
  }, [initialItems]);

  const newArrivalItems = useMemo(() => {
    const targetSkus = ["JNS-PR-1021", "JNS-SF-1034", "JNS-ST-1034", "JNS-ST-1038", "JNS-SF-1039", "JNS-CL-1034", "JNS-PK-1023", "JNS-WH-1038"];
    const found = targetSkus.map(s => initialItems.find(i => i.sku_code === s)).filter(Boolean) as InventoryItem[];
    return found.length >= 6 ? found : initialItems.slice(16, 24);
  }, [initialItems]);

  const currentDataset = activeTab === "store" ? initialItems : rentalItems;

  // Build Fuse instance fresh each time dataset changes
  const fuseInstance = useMemo(() => new Fuse(currentDataset, FUSE_OPTIONS), [currentDataset]);

  const filteredItems = useMemo(() => {
    let result = (currentDataset || []).filter(Boolean);

    // 0. Filter Pre-Category (Division)
    if (selectedPreCategory !== "all") {
      const catToPreCat: Record<string, string> = {};
      STORE_CATEGORIES.forEach((c) => {
        catToPreCat[c.name.toLowerCase()] = c.pre_category_id;
      });
      result = result.filter((item) => {
        if (item?.pre_category_id) {
          return item.pre_category_id === selectedPreCategory;
        }
        if (item?.category) {
          return catToPreCat[item.category.toLowerCase()] === selectedPreCategory;
        }
        return false;
      });
    }

    // 1. Filter Category (from Sidebar)
    if (selectedCategory !== "All") {
      result = result.filter(
        (item) => item?.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 2. Filter Subsystem Tag (e.g. shock absorbers, brakes, filters)
    if (selectedSubsystem !== "all") {
      const tag = subsystemTags.find((t) => t.id === selectedSubsystem);
      if (tag && tag.keywords) {
        result = result.filter((item) => {
          const itemText = `${item.sku_code} ${item.part_name} ${item.part_name_lo || ""} ${item.category || ""} ${item.description || ""} ${JSON.stringify(item.specs || {})}`.toLowerCase();
          return tag.keywords.some((kw) => itemText.includes(kw.toLowerCase()));
        });
      }
    }

    // 3. Filter Vehicle Model
    if (selectedModel !== "all") {
      const model = popularModels.find((m) => m.id === selectedModel);
      if (model && model.query) {
        const queryLower = model.query.toLowerCase();
        result = result.filter((item) => {
          const compModels = (item.compatible_models || []).join(" ").toLowerCase();
          const specsText = JSON.stringify(item.specs || {}).toLowerCase();
          const nameText = `${item.part_name} ${item.part_name_lo || ""}`.toLowerCase();
          return compModels.includes(queryLower) || specsText.includes(queryLower) || nameText.includes(queryLower);
        });
      }
    }

    // 4. Fuzzy Search (Fuse.js) — only runs when there is a search query
    if (searchQuery.trim().length >= 1) {
      const searchPool = new Fuse(result, FUSE_OPTIONS);
      const fuseResults = searchPool.search(searchQuery.trim());
      result = fuseResults
        .sort((a, b) => (a.score ?? 1) - (b.score ?? 1))
        .map((r) => r.item)
        .filter(Boolean);
    }

    // 5. Sort
    if (!searchQuery.trim()) {
      if (sortBy === "price_asc") {
        result.sort((a, b) => Number(a?.unit_price ?? 0) - Number(b?.unit_price ?? 0));
      } else if (sortBy === "price_desc") {
        result.sort((a, b) => Number(b?.unit_price ?? 0) - Number(a?.unit_price ?? 0));
      } else if (sortBy === "name") {
        result.sort((a, b) => (a?.part_name ?? "").localeCompare(b?.part_name ?? ""));
      }
    }

    return result;
  }, [currentDataset, selectedCategory, selectedSubsystem, selectedModel, searchQuery, sortBy]);

  return (
    <div id="product-catalog" className="space-y-6">
      {/* Floating Mobile Cart Trigger */}
      <div className="fixed bottom-6 right-6 z-40 lg:hidden">
        <Button
          onClick={openCart}
          className="h-14 px-5 rounded-full bg-[#E1251B] hover:bg-[#c91e15] text-white shadow-2xl flex items-center gap-2.5 font-bold"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-xs font-black flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span>{isLao ? `ກະຕ່າ (${totalItems})` : `Cart (${totalItems})`}</span>
        </Button>
      </div>

      {/* Navigation Controls: Tabs & 360° Synergy Quick Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Tabs for Store vs Rental */}
        <div className="flex p-1 space-x-1 bg-slate-100 dark:bg-slate-800/50 rounded-2xl w-full max-w-sm border border-slate-200 dark:border-white/5">
          <button
            onClick={() => { setActiveTab("store"); updateUrlParams({ tab: "store", pre_category: null, category: null, subsystem: null, model: null, q: null }); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-all ${
              activeTab === "store"
                ? "bg-white dark:bg-slate-700 text-[#005BAC] dark:text-blue-400 shadow-sm font-bold"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <Settings className="w-4 h-4" />
            {isLao ? "ອຸປະກອນ & ອາໄຫຼ່" : "Equipment & Parts"}
          </button>
          <button
            onClick={() => { setActiveTab("rental"); updateUrlParams({ tab: "rental", pre_category: null, category: null, subsystem: null, model: null, q: null }); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-all ${
              activeTab === "rental"
                ? "bg-white dark:bg-slate-700 text-[#005BAC] dark:text-blue-400 shadow-sm font-bold"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <Truck className="w-4 h-4" />
            {isLao ? "ບໍລິການລົດເຊົ່າ" : "Rental Services"}
          </button>
        </div>

        {/* 360° Management & Mobile PM Direct Triggers */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileServiceOpen(true)}
            className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Wrench className="w-3.5 h-3.5 text-amber-500" />
            <span>{isLao ? "ຈອງຊ່າງ PM 24 ຈຸດ" : "Book Mobile PM"}</span>
          </button>

          <Link to={`/${locale}/services#management-ecosystem`}
            className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-[#005BAC] dark:text-blue-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>{isLao ? "ໂຄງສ້າງການບໍລິຫານ 360°" : "360° Management"}</span>
          </Link>
        </div>
      </div>

      {/* 🌟 3-Tier Pre-Category / Business Divisions Horizontal Selector */}
      <div className="flex flex-col space-y-6">
                <ProductGrid items={filteredItems.slice(0, visibleCount)} viewMode={viewMode} />
              
              {visibleCount < filteredItems.length && (
                <div className="flex justify-center w-full pb-8">
                  <Button 
                    onClick={() => setVisibleCount(prev => prev + 24)}
                    variant="outline"
                    className="border-2 border-[#005BAC] text-[#005BAC] hover:bg-blue-50 font-bold rounded-xl px-8 h-12 transition-all shadow-sm"
                  >
                    {isLao ? "ເບິ່ງເພີ່ມເຕີມ (Load More)" : "Load More"}
                  </Button>
                </div>
              )}
            </div>
        </main>
      </div>

      {/* Cart & Checkout Drawers / Modals */}
      <CartDrawer />
      <CheckoutModal />

      {/* 🛞 Smart Forklift Tyre Finder Wizard Modal */}
      <TyreFinderModal
        isOpen={isTyreFinderOpen}
        onClose={() => setIsTyreFinderOpen(false)}
        onSelectTyreCriteria={(query, subsystem) => {
          setSelectedSubsystem(subsystem);
          setSearchQuery(query);
        }}
      />

      {/* 🫁 Smart Vehicle Filter Finder Wizard Modal */}
      <FilterFinderModal
        isOpen={isFilterFinderOpen}
        onClose={() => setIsFilterFinderOpen(false)}
        onSelectFilterCriteria={(query, subsystem) => {
          setSelectedSubsystem(subsystem);
          setSearchQuery(query);
        }}
      />

      {/* 🔍 Smart Part & VIN Identifier Modal */}
      <PartIdentifierModal
        isOpen={isPartIdentifierOpen}
        onClose={() => setIsPartIdentifierOpen(false)}
        onSelectSearchCriteria={(query, subsystem) => {
          if (subsystem) setSelectedSubsystem(subsystem);
          setSearchQuery(query);
        }}
      />

      {/* 🛠️ Mobile Service & 24-Point PM Booking Modal */}
      <MobileServiceBookingModal
        isOpen={isMobileServiceOpen}
        onClose={() => setIsMobileServiceOpen(false)}
      />

      {/* 📄 B2B Instant PDF Product Catalog Generator Modal */}
      <PDFCatalogModal
        isOpen={isPDFCatalogOpen}
        onClose={() => setIsPDFCatalogOpen(false)}
        items={initialItems}
        currentCategory={selectedCategory}
        isLao={isLao}
      />
    </div>
  );
}




