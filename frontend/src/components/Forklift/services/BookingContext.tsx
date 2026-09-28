import React, { createContext, useContext, useState, ReactNode } from "react";

export interface BookingContextType {
  selectedForkliftType: "diesel" | "electric";
  setSelectedForkliftType: (val: "diesel" | "electric") => void;
  selectedHoursIndex: number;
  setSelectedHoursIndex: (val: number) => void;
  pmViewMode: "calculator" | "table";
  setPmViewMode: (val: "calculator" | "table") => void;
  activeEcosystemTab: number;
  setActiveEcosystemTab: (val: number) => void;
  isChecklistModalOpen: boolean;
  setIsChecklistModalOpen: (val: boolean) => void;
  companyName: string;
  setCompanyName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  province: string;
  setProvince: (val: string) => void;
  brand: string;
  setBrand: (val: string) => void;
  urgency: "sale_inquiry" | "rental_b2b" | "standard" | "spare_parts";
  setUrgency: (val: "sale_inquiry" | "rental_b2b" | "standard" | "spare_parts") => void;
  issueDetails: string;
  setIssueDetails: (val: string) => void;
  handleBookPackage: (hoursIndex: number, pkgNameLo: string, pkgNameEn: string, label: string, isLo: boolean) => void;
  handleBookConsultation: (topic: string) => void;
  handleBookingSubmit: (e: React.FormEvent, isLo: boolean) => void;
}

export const BookingContext = createContext<BookingContextType | null>(null);

export function useBookingContext() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
}

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedForkliftType, setSelectedForkliftType] = useState<"diesel" | "electric">("diesel");
  const [selectedHoursIndex, setSelectedHoursIndex] = useState<number>(1);
  const [pmViewMode, setPmViewMode] = useState<"calculator" | "table">("table");
  const [activeEcosystemTab, setActiveEcosystemTab] = useState<number>(0);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState<boolean>(false);
  
  const [companyName, setCompanyName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [province, setProvince] = useState<string>("ນະຄອນຫຼວງວຽງຈັນ (Vientiane Capital)");
  const [brand, setBrand] = useState<string>("Toyota");
  const [urgency, setUrgency] = useState<"sale_inquiry" | "rental_b2b" | "standard" | "spare_parts">("rental_b2b");
  const [issueDetails, setIssueDetails] = useState<string>("");

  const handleBookPackage = (hoursIndex: number, pkgNameLo: string, pkgNameEn: string, label: string, isLo: boolean) => {
    setSelectedHoursIndex(hoursIndex);
    setUrgency("standard");
    const pkgLabel = isLo ? `${pkgNameLo} (${label})` : `${pkgNameEn} (${label})`;
    setIssueDetails(
      isLo
        ? `ຕ້ອງການຈອງແພັກເກັດບຳລຸງຮັກສາ ${pkgLabel} ສຳລັບລົດຍົກ ${selectedForkliftType === "diesel" ? "ດີເຊວ" : "ໄຟຟ້າ"}`
        : `Requesting booking for maintenance package: ${pkgLabel} for ${selectedForkliftType === "diesel" ? "Diesel" : "Electric"} Forklift`
    );
    const formElement = document.getElementById("booking-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookConsultation = (topic: string) => {
    setUrgency("sale_inquiry");
    setIssueDetails(topic);
    const formElement = document.getElementById("booking-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookingSubmit = (e: React.FormEvent, isLo: boolean) => {
    e.preventDefault();
    if (isLo) {
      const serviceLabelMap = {
        sale_inquiry: "🚜 1. ສົນໃຈຊື້ລົດຟອກລີບໃໝ່/ມືສອງ (Forklift Sale Inquiry)",
        rental_b2b: "⏱️ 2. ຂໍໃບສະເໜີລາຄາ ເຊົ່າລົດຟອກລີບໄລຍະຍາວ 1-5 ປີ (B2B Fleet Rental)",
        standard: "🛠️ 3. ນັດໝາຍສູນສ້ອມບຳລຸງ / PM ຕາມຮອບ / ລົດເສຍ (Service & PM)",
        spare_parts: "⚙️ 4. ສັ່ງຊື້ອາໄຫຼ່ແທ້, ຢາງຕັນ, ນ້ຳມັນໄຮໂດຣລິກ (Spare Parts Order)"
      };
      const urgencyText = serviceLabelMap[urgency as keyof typeof serviceLabelMap];
      const message = 
        `ສະບາຍດີ DK LAO 4S Forklift Hub!\n` +
        `ຂ້ອຍຕ້ອງການຕິດຕໍ່ສູນລົດຟອກລີບຄົບວົງຈອນ:\n\n` +
        `🏢 ຊື່ບໍລິສັດ/ໂຮງງານ: ${companyName || "ບໍ່ໄດ້ລະບຸ"}\n` +
        `📞 ເບີໂທຕິດຕໍ່: ${phone || "ກະລຸນາຕິດຕໍ່ກັບ"}\n` +
        `📍 ສະຖານທີ່/ແຂວງ: ${province}\n` +
        `🚜 ຍີ່ຫໍ້ລົດຍົກທີ່ສົນໃຈ/ນຳໃຊ້: ${brand}\n` +
        `📌 ປະເພດຄວາມຕ້ອງການ (4S): ${urgencyText}\n` +
        `📝 ລາຍລະອຽດຄວາມຕ້ອງການ / ຈຳນວນຄັນ / ອາໄຫຼ່: ${issueDetails || "ຕ້ອງການໃບສະເໜີລາຄາ ຫຼື ຄຳປຶກສາ"}`;
      window.open(`https://wa.me/8562058929299?text=${encodeURIComponent(message)}`, "_blank");
    } else {
      const serviceLabelMapEn = {
        sale_inquiry: "🚜 1. Forklift Purchase Inquiry (New & Inspected Pre-Owned)",
        rental_b2b: "⏱️ 2. B2B Long-Term Fleet Leasing (1-5 Years)",
        standard: "🛠️ 3. Maintenance Service / Scheduled PM / Urgent Breakdown",
        spare_parts: "⚙️ 4. Genuine OEM Parts / Solid Tires / Certified Lubricants"
      };
      const urgencyTextEn = serviceLabelMapEn[urgency as keyof typeof serviceLabelMapEn];
      const messageEn = 
        `Hello DK LAO 4S Forklift Hub!\n` +
        `I would like to submit an inquiry regarding your 4S forklift solutions:\n\n` +
        `🏢 Company / Facility: ${companyName || "Not specified"}\n` +
        `📞 Contact Number: ${phone || "Please call back"}\n` +
        `📍 Location / Province: ${province}\n` +
        `🚜 Forklift Brand of Interest: ${brand}\n` +
        `📌 4S Category: ${urgencyTextEn}\n` +
        `📝 Operational Details / Fleet Requirements: ${issueDetails || "Requesting quotation and technical consultation"}`;
      window.open(`https://wa.me/8562058929299?text=${encodeURIComponent(messageEn)}`, "_blank");
    }
  };

  return (
    <BookingContext.Provider value={{
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
      handleBookPackage, handleBookConsultation, handleBookingSubmit
    }}>
      {children}
    </BookingContext.Provider>
  );
};
