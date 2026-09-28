import React, { useState } from "react";
import { InventoryItem } from "@/data/catalog";
import { Button } from "@/components/Forklift/ui/button";
import { X, Send, Building, Mail, Phone, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RFQModalProps {
  item: InventoryItem;
  isOpen: boolean;
  onClose: () => void;
}

export function RFQModal({ item, isOpen, onClose }: RFQModalProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    taxId: "",
    contactName: "",
    phone: "",
    email: "",
    quantity: "1",
    urgency: "Normal (7-14 days)",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for RFQ
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // WhatsApp Integration for RFQ
      const waNumber = "8562058929299";
      const message = `*REQUEST FOR QUOTATION (RFQ)*
------------------------
*Item*: ${item.sku_code} - ${item.part_name}
*Quantity Needed*: ${formData.quantity}
*Urgency*: ${formData.urgency}
*Company*: ${formData.companyName}
*Tax ID*: ${formData.taxId || 'N/A'}
*Contact*: ${formData.contactName}
*Phone*: ${formData.phone}
*Email*: ${formData.email}
*Notes*: ${formData.notes || 'N/A'}`;
      
      window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
      
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 2000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-2xl z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#005BAC]" />
            ຂໍໃບສະເໜີລາຄາ (Request for Quotation)
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-5">
            ສຳລັບ {item.part_name_lo || item.part_name} ({item.sku_code})
          </p>

          {isSuccess ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-[#005BAC] dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">ສົ່ງຄຳຂໍສຳເລັດ!</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                ກຳລັງເປີດໜ້າຈໍ WhatsApp ເພື່ອສົ່ງຂໍ້ມູນຫາຝ່າຍຂາຍ...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">ຊື່ບໍລິສັດ (Company)</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      required
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-[#005BAC] outline-none transition-all dark:text-white"
                      placeholder="ບໍລິສັດ ພັດທະນາ ຈຳກັດ"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">ເລກປະຈຳຕົວຜູ້ເສຍອາກອນ (Tax ID)</label>
                  <input
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-[#005BAC] outline-none transition-all dark:text-white"
                    placeholder="ສຳລັບອອກໃບກຳກັບພາສີ"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">ຈຳນວນທີ່ຕ້ອງການ (Qty)</label>
                  <input
                    required
                    type="number"
                    min="1"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-[#005BAC] outline-none transition-all dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">ຄວາມຮີບດ່ວນ (Urgency)</label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-[#005BAC] outline-none transition-all dark:text-slate-200"
                >
                  <option value="Urgent (Within 3 days)">ດ່ວນທີ່ສຸດ (Urgent - ພາຍໃນ 3 ມື້)</option>
                  <option value="Normal (7-14 days)">ປົກກະຕິ (Normal - 7-14 ມື້)</option>
                  <option value="Planning (Next Month)">ວາງແຜນລ່ວງໜ້າ (Planning - ເດືອນໜ້າ)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">ຊື່ຜູ້ຕິດຕໍ່ (Contact Name)</label>
                <input
                  required
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-[#005BAC] outline-none transition-all dark:text-white"
                  placeholder="ທ. ສົມຊາຍ"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">ເບີໂທ (Phone)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-[#005BAC] outline-none transition-all dark:text-white"
                      placeholder="020 9999 9999"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">ອີເມວ (Email)</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-[#005BAC] outline-none transition-all dark:text-white"
                      placeholder="info@company.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">ລາຍລະອຽດເພີ່ມເຕີມ (Notes)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-[#005BAC] outline-none transition-all dark:text-white resize-none"
                  placeholder="ສະຖານທີ່ຈັດສົ່ງ, ເງື່ອນໄຂການຊຳລະ, ຯລຯ"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-[#005BAC] hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> ຂໍໃບສະເໜີລາຄາ (Submit RFQ)
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
