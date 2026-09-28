"use client";

import React from "react";
import { X, Printer, Download, ShieldCheck, Building2, CheckCircle2, FileText, Phone, Mail, Globe, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface QuotationItem {
  sku_id: string;
  sku_code: string;
  part_name: string;
  unit_price: number;
  quantity: number;
  subtotal: number;
  currency?: string;
}

export interface QuotationData {
  orderNumber: string;
  customerName: string;
  phone: string;
  deliveryAddress: string;
  province?: string;
  taxCompanyName?: string;
  taxId?: string;
  paymentMethod: string;
  items: QuotationItem[];
  totalUSD: number;
  totalLAK: number;
  date?: string;
}

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: QuotationData | null;
}

export function QuotationModal({ isOpen, onClose, data }: QuotationModalProps) {
  if (!isOpen || !data) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = data.date || new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  const validUntilDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  const quotationNo = `DK-QT-${data.orderNumber.replace("LUD-ORD-", "")}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4 md:p-6 print:p-0 print:static">
      {/* Backdrop (hidden on print) */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity print:hidden"
      />

      {/* Modal Wrapper */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 text-slate-100 flex flex-col max-h-[95vh] print:max-h-none print:border-none print:shadow-none print:rounded-none print:bg-white print:text-black">
        
        {/* Actions Bar (hidden on print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/80 print:hidden">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                ໃບສະເໜີລາຄາທາງການ (Official Price Quotation)
              </h3>
              <p className="text-xs text-slate-400">
                ເລກທີ: {quotationNo} | ພ້ອມພິມ ຫຼື ບັນທຶກເປັນ PDF (Save as PDF)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handlePrint}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/20"
            >
              <Printer className="w-4 h-4" />
              <span>ພິມ / ບັນທຶກເປັນ PDF</span>
            </Button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 print:p-6 print:overflow-visible bg-white text-slate-900">
          
          {/* 1. Header & Company Brand Identity */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-slate-900 pb-6 gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-white font-black text-base shadow-sm">
                  DK
                </div>
                <div>
                  <h1 className="text-lg font-black tracking-tight text-slate-950 uppercase">
                    DK LAO TRADING & LUD CO., LTD.
                  </h1>
                  <p className="text-xs font-bold text-emerald-700">
                    ບໍລິສັດ ດີເຄ ລາວ ເທຣດດິງ ແອນ ລຸດ ຈຳກັດ (ສຳນັກງານໃຫຍ່)
                  </p>
                </div>
              </div>
              
              <div className="text-[11px] text-slate-600 mt-3 space-y-0.5">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  ຊັ້ນ 6 ອາຄານ ອຳມະຕະ ທາວເວີ, ຖະໜົນກຳແພງເມືອງ, ບ້ານໜອງໄຮ, ເມືອງຫາດຊາຍຟອງ, ນະຄອນຫຼວງວຽງຈັນ
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  ໂທລະສັບ / WhatsApp: +856 20 5892 9299 | ຫ້ອງການ: +856 21 254 888
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  Email: contact@lud.la | Web: www.lud.la
                </p>
              </div>
            </div>

            {/* Document Meta Badge */}
            <div className="text-left sm:text-right bg-slate-50 border border-slate-200 rounded-xl p-3 min-w-[220px]">
              <div className="text-xs font-black uppercase text-emerald-700 tracking-wider">
                ໃບສະເໜີລາຄາ / QUOTATION
              </div>
              <div className="text-sm font-mono font-bold text-slate-900 mt-1">
                {quotationNo}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                ວັນທີ (Date): <span className="font-semibold text-slate-800">{currentDate}</span>
              </div>
              <div className="text-[11px] text-slate-500">
                ກຳນົດໃຊ້ຮອດ (Valid Until): <span className="font-semibold text-emerald-800">{validUntilDate}</span>
              </div>
            </div>
          </div>

          {/* 2. Customer & B2B Tax Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                ຂໍ້ມູນລູກຄ້າ / ຜູ້ຕິດຕໍ່ (Customer Information)
              </span>
              <div className="font-bold text-slate-900 text-sm">{data.customerName}</div>
              <div className="text-slate-600 mt-0.5">ເບີໂທລະສັບ / WhatsApp: {data.phone}</div>
              <div className="text-slate-600 mt-0.5">
                ທີ່ຢູ່ຈັດສົ່ງ: {data.deliveryAddress} {data.province ? `(${data.province})` : ""}
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                ຂໍ້ມູນນິຕິບຸກຄົນ / ໃບກຳກັບພາສີ (Tax Invoice Details)
              </span>
              <div className="font-bold text-slate-900">
                {data.taxCompanyName || "ລູກຄ້າທົ່ວໄປ / General Customer"}
              </div>
              {data.taxId && (
                <div className="text-slate-700 mt-0.5 font-mono">
                  ເລກປະຈຳຕົວຜູ້ເສຍພາສີ (Tax ID): <span className="font-bold text-slate-900">{data.taxId}</span>
                </div>
              )}
              <div className="text-slate-600 mt-0.5">
                ເງື່ອນໄຂການຊຳລະ: {data.paymentMethod === "B2B_PO" ? "B2B Purchase Order (Credit Term 30-90 ວັນ)" : data.paymentMethod}
              </div>
            </div>
          </div>

          {/* 3. Items Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl my-6">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-3 w-10 text-center">#</th>
                  <th className="py-3 px-3 w-28">ລະຫັດ SKU</th>
                  <th className="py-3 px-4">ລາຍການສິນຄ້າ / ລາຍລະອຽດເຕັກນິກ</th>
                  <th className="py-3 px-3 text-center w-16">ຈຳນວນ</th>
                  <th className="py-3 px-3 text-right w-28">ລາຄາຕໍ່ໜ່ວຍ</th>
                  <th className="py-3 px-4 text-right w-32">ລວມເປັນເງິນ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.items.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                    <td className="py-3 px-3 text-center font-mono text-slate-500">{idx + 1}</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-700">{item.sku_code}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{item.part_name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        ສິນຄ້ານຳເຂົ້າຕາມມາດຕະຖານສາກົນ, ຮັບປະກັນສູນແທ້ 100%
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-800">{item.quantity}</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-700">
                      ${Number(item.unit_price).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                      ${Number(item.subtotal).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4. Financial Calculations & Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 items-start">
            {/* Payment & Banking Instructions */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-600" />
                ບັນຊີທະນາຄານທາງການສຳລັບຊຳລະເງິນ:
              </div>
              <div className="text-[11px] text-slate-700 space-y-1">
                <div>• <span className="font-semibold">BCEL (LAK):</span> DK LAO TRADING &amp; LUD CO., LTD [UPDATE BEFORE LAUNCH: BCEL LAK]</div>
                <div>• <span className="font-semibold">BCEL (USD):</span> DK LAO TRADING &amp; LUD CO., LTD [UPDATE BEFORE LAUNCH: BCEL USD]</div>
                <div>• <span className="font-semibold">LDB (LAK):</span> DK LAO TRADING &amp; LUD CO., LTD [UPDATE BEFORE LAUNCH: LDB LAK]</div>
              </div>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                *ກະລຸນາລະບຸເລກທີໃບສະເໜີລາຄາ <b>{quotationNo}</b> ໃນໝາຍເຫດການໂອນເງິນ
              </div>
            </div>

            {/* Total Calculations */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>ມູນຄ່າລວມ (Subtotal USD):</span>
                <span className="font-mono font-bold text-slate-800">
                  ${data.totalUSD.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ພາສີມູນຄ່າເພີ່ມ (VAT 10% Included):</span>
                <span className="font-mono text-emerald-700">ຮວມໃນລາຄາແລ້ວ</span>
              </div>
              <div className="border-t-2 border-slate-900 pt-2 flex justify-between items-baseline">
                <span className="font-black text-slate-900 text-sm">ຍອດລວມສຸດທິ (Total LAK):</span>
                <div className="text-right">
                  <div className="text-lg font-black text-emerald-700 font-mono">
                    {data.totalLAK.toLocaleString()} ₭
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    (≈ ${data.totalUSD.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Terms & Signature Block */}
          <div className="border-t border-slate-200 pt-6 mt-8">
            <div className="text-[10px] text-slate-500 space-y-1 mb-10">
              <div className="font-bold text-slate-700 uppercase tracking-wider mb-1">ເງື່ອນໄຂທາງການຄ້າ (Terms &amp; Conditions):</div>
              <div>1. ລາຄານີ້ມີຜົນບັງຄັບໃຊ້ 30 ວັນ ນັບແຕ່ມື້ອອກເອກະສານ.</div>
              <div>2. ໄລຍະເວລານຳເຂົ້າ ແລະ ຈັດສົ່ງ: 30-120 ວັນ ສຳລັບສິນຄ້າ Pre-Order ນຳເຂົ້າຈາກໂຮງງານ.</div>
              <div>3. ການຮັບປະກັນ: ຮັບປະກັນສູນແທ້ 1-5 ປີ ຫຼື 10,000 ຊົ່ວໂມງ ພ້ອມທີມຊ່າງ 4S ບໍລິການຫຼັງການຂາຍ.</div>
            </div>

            {/* Signature & Stamp Boxes */}
            <div className="grid grid-cols-2 gap-8 text-center pt-4">
              <div>
                <div className="border-b border-slate-400 pb-16 w-3/4 mx-auto" />
                <div className="text-xs font-bold text-slate-900 mt-2">ຜູ້ມີອຳນາດລົງລາຍເຊັນ / ຕາປະທັບ</div>
                <div className="text-[10px] text-slate-500">DK LAO TRADING &amp; LUD CO., LTD.</div>
              </div>

              <div>
                <div className="border-b border-slate-400 pb-16 w-3/4 mx-auto" />
                <div className="text-xs font-bold text-slate-900 mt-2">ລູກຄ້າ / ຜູ້ສັ່ງຊື້ຮັບຮອງ (Acceptance)</div>
                <div className="text-[10px] text-slate-500">{data.taxCompanyName || data.customerName}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
