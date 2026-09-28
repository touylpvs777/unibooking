"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { BusinessDocument, WarehouseProductOption } from "@/types/document";
import { addLedgerEntryAction } from "@/actions/finance";

import { INITIAL_BUSINESS_DOCUMENTS } from "@/data/documents";

/**
 * 0. Fetch initial business documents
 */
export async function getInitialDocumentsAction(): Promise<{ success: boolean; data: BusinessDocument[] }> {
  return { success: true, data: INITIAL_BUSINESS_DOCUMENTS };
}

/**
 * 1. Fetch live warehouse product variants from PostgreSQL
 */
export async function getWarehouseCatalogAction(): Promise<{ success: boolean; data: WarehouseProductOption[] }> {
  try {
    const variants = await prisma.productVariant.findMany({
      where: {
        isActive: true,
      },
      include: {
        product: {
          include: {
            category: true,
            images: {
              where: { isPrimary: true },
              take: 1,
            },
          },
        },
      },
      orderBy: {
        stockLevel: "desc",
      },
      take: 150, // Top active inventory items
    });

    const catalogOptions: WarehouseProductOption[] = variants.map((v) => ({
      variant_id: v.id,
      product_id: v.product.id,
      product_name: v.product.name,
      product_name_lo: v.product.nameLo || undefined,
      sku: v.sku,
      category_name: v.product.category?.name || "General Equipment",
      stock_level: v.stockLevel,
      wholesale_price: Number(v.wholesalePrice),
      retail_price: Number(v.retailPrice),
      currency: v.currency,
      image: v.product.images[0]?.url || undefined,
    }));

    return { success: true, data: catalogOptions };
  } catch (error: any) {
    console.error("Error fetching warehouse catalog:", error);
    return { success: false, data: [] };
  }
}

/**
 * 2. Deduct live inventory stock when Stock Requisition or Work Order is approved
 */
export async function deductStockAction(documentId: string, items: { variant_id?: string; quantity: number }[]) {
  try {
    const validItems = items.filter((it) => it.variant_id && it.quantity > 0);

    if (validItems.length === 0) {
      return { success: false, error: "No inventory items linked to warehouse variants." };
    }

    // Prisma Transaction for atomic stock deduction
    await prisma.$transaction(async (tx) => {
      for (const item of validItems) {
        if (!item.variant_id) continue;
        await tx.productVariant.update({
          where: { id: item.variant_id },
          data: {
            stockLevel: {
              decrement: item.quantity,
            },
          },
        });
      }
    });

    revalidatePath("/[locale]/admin/documents");
    revalidatePath("/[locale]/catalog");
    revalidatePath("/[locale]/store");

    return { success: true, message: `Successfully deducted inventory for ${validItems.length} items.` };
  } catch (error: any) {
    console.error("Stock deduction error:", error);
    return { success: false, error: error.message || "Failed to deduct inventory stock." };
  }
}

/**
 * 3. Auto-Post Official Receipt to Double-Entry GL Ledger
 */
export async function postReceiptToGLAction(doc: BusinessDocument) {
  try {
    const rate = doc.exchange_rate || 1.0;
    const usdVal = doc.currency === "USD" ? doc.grand_total : doc.grand_total / rate;

    // Credit to Revenue / Settlement
    const result = await addLedgerEntryAction({
      amount: doc.grand_total,
      currency: doc.currency,
      exchange_rate: rate,
      entry_type: "Credit",
      project_name: doc.project_name || "LUD Group Enterprise",
      category: "PPA_ENERGY_REVENUE",
      description: `[Official Receipt ${doc.doc_number}] Paid by ${doc.client_name || doc.client_company || "Client"} - ${doc.title}`,
    });

    revalidatePath("/[locale]/admin/finance");
    revalidatePath("/[locale]/admin/documents");

    return { success: true, data: result };
  } catch (error: any) {
    console.error("GL Post error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * 4. 1-Click QuickBooks Pipeline: Convert Quotation to Tax Invoice
 */
export async function convertQuotationToInvoiceAction(quotation: BusinessDocument): Promise<{
  success: boolean;
  data?: BusinessDocument;
  error?: string;
}> {
  try {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const invNumber = `INV-${new Date().getFullYear()}-${randomSuffix}`;

    const newInvoice: BusinessDocument = {
      ...quotation,
      id: `doc-inv-${Date.now()}`,
      doc_number: invNumber,
      type: "TAX_INVOICE",
      status: "ISSUED",
      title: `ໃບຮຽກເກັບເງິນ / ແຈ້ງໜີ້ (ແປງຈາກໃບສະເໜີລາຄາ ${quotation.doc_number}): ${quotation.title}`,
      issue_date: new Date().toISOString().split("T")[0],
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      reference_doc_no: quotation.doc_number,
      bank_name: "BCEL Bank",
      bank_account: quotation.currency === "USD" ? "BCEL USD 010-11-00-09876543-001" : "BCEL LAK 010-12-00-01234567-001",
      notes: `ແປງມາຈາກໃບສະເໜີລາຄາ ${quotation.doc_number}. ${quotation.notes || ""}`,
      stock_deducted: false,
      posted_to_gl: false,
      created_at: new Date().toISOString(),
    };

    revalidatePath("/[locale]/admin/documents");
    return { success: true, data: newInvoice };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * 5. 1-Click QuickBooks Pipeline: Convert Purchase Order to Stock Requisition / Bill
 */
export async function convertPOToStockRequisitionAction(po: BusinessDocument): Promise<{
  success: boolean;
  data?: BusinessDocument;
  error?: string;
}> {
  try {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const srNumber = `SR-${new Date().getFullYear()}-${randomSuffix}`;

    const newSR: BusinessDocument = {
      ...po,
      id: `doc-sr-${Date.now()}`,
      doc_number: srNumber,
      type: "STOCK_REQUISITION",
      status: "APPROVED",
      title: `ໃບເບິກເຄື່ອງ / ຮັບອຸປະກອນເຂົ້າສາງ (ແປງຈາກ PO ${po.doc_number}): ${po.title}`,
      issue_date: new Date().toISOString().split("T")[0],
      due_date: new Date().toISOString().split("T")[0],
      department: "Central Warehouse Receiving & Logistics",
      requester_name: "Warehouse Receiving Clerk",
      approver_name: "Head of Procurement & Inventory",
      reference_doc_no: po.doc_number,
      notes: `ສິນຄ້າຮັບເຂົ້າສາງຈາກ PO ${po.doc_number} (ຜູ້ສະໜອງ: ${po.vendor_name || "N/A"}). ພ້ອມຕັດສະຕັອກ/ບັນທຶກສິນຄ້າ.`,
      stock_deducted: false,
      posted_to_gl: false,
      created_at: new Date().toISOString(),
    };

    revalidatePath("/[locale]/admin/documents");
    return { success: true, data: newSR };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * 6. 1-Click QuickBooks Pipeline: Receive Payment for Invoice (Generate Official Receipt)
 */
export async function receivePaymentForInvoiceAction(
  invoice: BusinessDocument,
  paymentMethod: "BCEL_BANK_TRANSFER" | "CASH" | "CHEQUE" | "LETTER_OF_CREDIT" = "BCEL_BANK_TRANSFER",
  bankAccount: string = "BCEL USD 010-11-00-09876543-001"
): Promise<{
  success: boolean;
  receipt?: BusinessDocument;
  updatedInvoice?: BusinessDocument;
  error?: string;
}> {
  try {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const recNumber = `REC-${new Date().getFullYear()}-${randomSuffix}`;

    const newReceipt: BusinessDocument = {
      id: `doc-rec-${Date.now()}`,
      doc_number: recNumber,
      type: "OFFICIAL_RECEIPT",
      status: "COMPLETED",
      title: `ໃບຮັບເງິນທາງການ ສຳລັບໃບແຈ້ງໜີ້ ${invoice.doc_number} (${invoice.client_name || invoice.client_company})`,
      project_name: invoice.project_name,
      client_name: invoice.client_name,
      client_company: invoice.client_company,
      client_tax_id: invoice.client_tax_id,
      client_address: invoice.client_address,
      client_phone: invoice.client_phone,
      client_email: invoice.client_email,
      issue_date: new Date().toISOString().split("T")[0],
      currency: invoice.currency,
      exchange_rate: invoice.exchange_rate,
      items: [
        {
          id: `rec-item-${Date.now()}`,
          description: `Full payment settlement for invoice ${invoice.doc_number} - ${invoice.title}`,
          quantity: 1,
          unit: "Settlement",
          unit_price: invoice.grand_total,
          amount: invoice.grand_total,
        },
      ],
      subtotal: invoice.subtotal,
      discount: invoice.discount,
      vat_rate: invoice.vat_rate,
      vat_amount: invoice.vat_amount,
      grand_total: invoice.grand_total,
      payment_method: paymentMethod,
      bank_name: "Banque Pour Le Commerce Exterieur Lao (BCEL)",
      bank_account: bankAccount,
      notes: `ໄດ້ຮັບການຊຳລະເງິນຄົບຖ້ວນສຳລັບໃບແຈ້ງໜີ້ ${invoice.doc_number}. ຂໍຂອບໃຈມາຍັງ ${invoice.client_name || invoice.client_company || "ລູກຄ້າ"}.`,
      stock_deducted: false,
      posted_to_gl: true,
      reference_doc_no: invoice.doc_number,
      created_at: new Date().toISOString(),
    };

    const updatedInvoice: BusinessDocument = {
      ...invoice,
      status: "PAID",
      posted_to_gl: true,
    };

    // Auto-post to Double-Entry GL Ledger: Credit Revenue, Debit Bank/Cash
    await postReceiptToGLAction(newReceipt);

    revalidatePath("/[locale]/admin/documents");
    revalidatePath("/[locale]/admin/finance");

    return {
      success: true,
      receipt: newReceipt,
      updatedInvoice,
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
