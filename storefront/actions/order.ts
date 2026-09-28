"use server";

export interface OrderItemPayload {
  sku_id: string;
  sku_code: string;
  part_name: string;
  unit_price: number;
  quantity: number;
  subtotal: number;
}

export interface PlaceOrderInput {
  customer_name: string;
  phone_number: string;
  delivery_address: string;
  province?: string;
  district?: string;
  payment_method: "BCEL_ONE_QR" | "BANK_TRANSFER" | "CASH_ON_DELIVERY" | "B2B_PO";
  notes?: string;
  items: OrderItemPayload[];
  total_usd: number;
  total_lak: number;
  slip_reference?: string;
  tax_company_name?: string;
  tax_id?: string;
}

export interface OrderResult {
  success: boolean;
  order_id: string;
  order_number: string;
  message: string;
  whatsapp_url?: string;
  data?: any;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1` 
  : 'http://localhost:8000/api/v1';

export async function placeOrder(input: PlaceOrderInput): Promise<OrderResult> {
  try {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `LUD-ORD-${randomSuffix}`;

    // Format WhatsApp message for Lao customer service
    const paymentLabel = {
      BCEL_ONE_QR: "BCEL One QR Code (ໂອນແລ້ວ)",
      BANK_TRANSFER: "ໂອນຜ່ານບັນຊີທະນາຄານ (Bank Transfer)",
      CASH_ON_DELIVERY: "ເກັບເງິນປາຍທາງ (Cash on Delivery)",
      B2B_PO: "ຂໍໃບສະເໜີລາຄາ / Purchase Order (B2B)",
    }[input.payment_method];

    const itemsSummary = input.items
      .map(
        (i, idx) =>
          `${idx + 1}. *${i.part_name}* (${i.sku_code})\n   ຈຳນວນ: ${i.quantity} x $${i.unit_price.toLocaleString()} = *$${i.subtotal.toLocaleString()}*`
      )
      .join("\n");

    const messageText = `📦 *ແຈ້ງການສັ່ງຊື້ສິນຄ້າໃໝ່ (New Order)*\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `🔖 *ເລກທີ Order:* ${orderNumber}\n` +
      `👤 *ລູກຄ້າ:* ${input.customer_name}\n` +
      `📞 *ເບີໂທ:* ${input.phone_number}\n` +
      `📍 *ສະຖານທີ່ຈັດສົ່ງ:* ${input.delivery_address} ${input.district ? `(${input.district}, ${input.province})` : ""}\n` +
      `💳 *ວິທີຊຳລະ:* ${paymentLabel}\n` +
      `🚚 *ຮູບແບບ:* ສິນຄ້ານຳເຂົ້າຕາມອໍເດີ (Pre-Order ຈັດສົ່ງ 30-120 ວັນ)\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `📋 *ລາຍການສິນຄ້າ:*\n${itemsSummary}\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `💵 *ຍອດລວມ (USD):* $${input.total_usd.toLocaleString('en-US', { minimumFractionDigits: 2 })}\n` +
      `🇱🇦 *ຍອດລວມ (LAK):* ${input.total_lak.toLocaleString()} ກີບ\n` +
      `${input.tax_company_name ? `🏢 *ອອກໃບກຳກັບພາສີໃນນາມ:* ${input.tax_company_name}\n` : ""}` +
      `${input.tax_id ? `📝 *ເລກປະຈຳຕົວຜູ້ເສຍພາສີ:* ${input.tax_id}\n` : ""}` +
      `${input.notes ? `📝 *ໝາຍເຫດ:* ${input.notes}\n` : ""}` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `_ສົ່ງຈາກລະບົບ LUD Storefront Official_`;

    // Lao Customer Service Admin WhatsApp number (or company contact)
    const adminWhatsApp = "8562058929299"; 
    const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(messageText)}`;

    // Try posting to Backend API if available
    try {
      await fetch(`${API_BASE_URL}/bookings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_date: new Date().toISOString(),
          status: "PENDING",
          notes: JSON.stringify({
            order_number: orderNumber,
            customer_name: input.customer_name,
            phone_number: input.phone_number,
            delivery_address: input.delivery_address,
            payment_method: input.payment_method,
            total_usd: input.total_usd,
            total_lak: input.total_lak,
            items: input.items,
            tax_company_name: input.tax_company_name,
            tax_id: input.tax_id,
          }),
        }),
      });
    } catch (apiErr) {
      console.warn("Backend API booking log skipped:", apiErr);
    }

    return {
      success: true,
      order_id: `ord_${timestamp}`,
      order_number: orderNumber,
      message: "ການສັ່ງຊື້ຂອງທ່ານສຳເລັດແລ້ວ! ທີມງານຈະຕິດຕໍ່ກັບພາຍໃນ 15 ນາທີ.",
      whatsapp_url: whatsappUrl,
      data: {
        orderNumber,
        customerName: input.customer_name,
        phone: input.phone_number,
        totalUSD: input.total_usd,
        totalLAK: input.total_lak,
        items: input.items,
        paymentMethod: input.payment_method,
      },
    };
  } catch (error: any) {
    console.error("Place order failed:", error);
    return {
      success: false,
      order_id: "",
      order_number: "",
      message: error?.message || "ບໍ່ສາມາດດຳເນີນການສັ່ງຊື້ໄດ້, ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.",
    };
  }
}
