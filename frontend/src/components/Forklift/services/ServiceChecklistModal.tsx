import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Forklift/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wrench, Clock, ShieldCheck, Truck, PhoneCall, CheckCircle2, 
  AlertTriangle, ArrowRight, Calendar, MapPin, FileText, Sparkles, 
  Layers, HelpCircle, ExternalLink, ChevronRight, BatteryCharging, 
  Gauge, Check, Building2, Printer, Download, Award, Zap, Boxes, 
  FileCheck2, X, Package, CircleDollarSign, Cog, ShieldAlert, Eye, 
  ShoppingBag, ArrowUpRight, RefreshCw, LifeBuoy, Activity, Warehouse, 
  GraduationCap, Receipt, Table as TableIcon, SlidersHorizontal
} from "lucide-react";
import { useBookingContext } from "./BookingContext";
import { PM_PACKAGES, CHECKLIST_24_ITEMS, ECOSYSTEM_JOURNEY_STEPS, ECOSYSTEM_PILLARS, PROVINCES_LO, PROVINCES_EN } from "@/data/servicesData";
import { EnterpriseCustomerShowcase } from "@/components/customers/EnterpriseCustomerShowcase";
import { WarehouseAutomationShowcase } from "@/components/Forklift/services/WarehouseAutomationShowcase";
import { MitsubishiForkliftShowcase } from "@/components/Forklift/services/MitsubishiForkliftShowcase";
import { JungheinrichEFGShowcase } from "@/components/Forklift/services/JungheinrichEFGShowcase";
import { UsedForkliftsShowcase } from "@/components/Forklift/services/UsedForkliftsShowcase";
import { MaintenanceChecklistShowcase } from "@/components/Forklift/services/MaintenanceChecklistShowcase";
import { MultiBrandPartsShowcase } from "@/components/Forklift/services/MultiBrandPartsShowcase";
import { ServiceWorkshopShowcase } from "@/components/Forklift/services/ServiceWorkshopShowcase";
import { RentalBenefitsShowcase } from "@/components/Forklift/services/RentalBenefitsShowcase";
import { JLGAccessPlatformsShowcase } from "@/components/Forklift/services/JLGAccessPlatformsShowcase";
import { RackingAndStorageShowcase } from "@/components/Forklift/services/RackingAndStorageShowcase";
import { NilfiskCleaningShowcase } from "@/components/Forklift/services/NilfiskCleaningShowcase";


export const ServiceChecklistModal = ({ isLo }: { isLo: boolean }) => {
  const { 
    selectedForkliftType, setSelectedForkliftType,
    selectedHoursIndex, setSelectedHoursIndex,
    pmViewMode, setPmViewMode,
    activeEcosystemTab, setActiveEcosystemTab,
    isChecklistModalOpen, setIsChecklistModalOpen,
    companyName, setCompanyName,
    phone, setPhone,
    province, setProvince,
    brand, setBrand,
    urgency, setUrgency,
    issueDetails, setIssueDetails,
    handleBookPackage, handleBookingSubmit
  } = useBookingContext();

  const activePackage = PM_PACKAGES[selectedForkliftType][selectedHoursIndex];
  const packageName = isLo ? activePackage.nameLo : activePackage.nameEn;
  const packageDesc = isLo ? activePackage.descriptionLo : activePackage.descriptionEn;
  const packageDuration = isLo ? activePackage.durationLo : activePackage.durationEn;
  const packageParts = isLo ? activePackage.partsReplacedLo : activePackage.partsReplacedEn;
  const packageFluids = isLo ? activePackage.fluidReplacedLo : activePackage.fluidReplacedEn;
  const packageInspections = isLo ? activePackage.inspectionsLo : activePackage.inspectionsEn;
  const provincesList = isLo ? PROVINCES_LO : PROVINCES_EN;

  return (
    <>

    </>
  );
};
