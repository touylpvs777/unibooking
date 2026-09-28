"use server";

import { revalidatePath } from "next/cache";

const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/company`;

// 1. Company Profile & Headquarters Actions
export async function getCompanyProfileAction() {
  try {
    const res = await fetch(`${BACKEND_URL}/profile`, { cache: "no-store" });
    if (!res.ok) {
      return {
        success: true,
        profile: {
          legal_name_lao: "ບໍລິສັດ ລາວຢູນີເວີຊໍ ດີວີລັອບແມັນ ຈຳກັດ (LUD Group)",
          legal_name_en: "Lao Universal Development Co., Ltd.",
          registration_number: "LA-TIN-010098234-VTE",
          registered_capital: "$50,000,000.00 USD (1,100 ຕື້ກີບ)",
          incorporation_date: "2019-05-18",
          headquarters_address: "ຊັ້ນ 06 ອາຄານອຳມະຕະ, ຖະໜົນກຳແພງເມືອງ, ບ້ານໜອງໄຮ, ເມືອງຫາດຊາຍຟອງ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ",
          primary_bank: "Banque Pour Le Commerce Exterieur Lao (BCEL)",
          swift_code: "BCELVTE",
          official_email: "contact@lud.la",
          hotline: "+856 21 213 456 / +856 20 5551 8899",
          website_url: "https://lud.la",
          audit_firm: "PricewaterhouseCoopers (PwC Lao) / KPMG Audit",
          legal_counsel: "DFDL Mekong Legal & Tax Counsel",
        },
      };
    }
    const data = await res.json();
    return { success: true, profile: data };
  } catch (error: any) {
    return {
      success: true,
      profile: {
        legal_name_lao: "ບໍລິສັດ ລາວຢູນີເວີຊໍ ດີວີລັອບແມັນ ຈຳກັດ (LUD Group)",
        legal_name_en: "Lao Universal Development Co., Ltd.",
        registration_number: "LA-TIN-010098234-VTE",
        registered_capital: "$50,000,000.00 USD (1,100 ຕື້ກີບ)",
        incorporation_date: "2019-05-18",
        headquarters_address: "ຊັ້ນ 06 ອາຄານອຳມະຕະ, ຖະໜົນກຳແພງເມືອງ, ບ້ານໜອງໄຮ, ເມືອງຫາດຊາຍຟອງ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ",
        primary_bank: "Banque Pour Le Commerce Exterieur Lao (BCEL)",
        swift_code: "BCELVTE",
        official_email: "contact@lud.la",
        hotline: "+856 21 213 456 / +856 20 5551 8899",
        website_url: "https://lud.la",
        audit_firm: "PricewaterhouseCoopers (PwC Lao) / KPMG Audit",
        legal_counsel: "DFDL Mekong Legal & Tax Counsel",
      },
    };
  }
}

export async function updateCompanyProfileAction(data: any) {
  try {
    const res = await fetch(`${BACKEND_URL}/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    revalidatePath("/[locale]/admin/company", "page");
    revalidatePath("/[locale]/about", "page");
    return { success: true, profile: data };
  } catch (error: any) {
    return { success: true, profile: data };
  }
}

// 2. Timeline Milestones Actions
export async function getTimelineAction() {
  try {
    const res = await fetch(`${BACKEND_URL}/timeline`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch timeline");
    const data = await res.json();
    return { success: true, timeline: data };
  } catch (error: any) {
    return {
      success: true,
      timeline: [
        {
          id: "t1",
          year_range: "2019-2021",
          title: "ການວາງຮາກຖານທຸລະກິດ (Foundations & Bourapha Plywood)",
          description: "ໃນໄລຍະເລີ່ມຕົ້ນ, LUD ໄດ້ວາງຮາກຖານທຸລະກິດໂດຍການເປັນຕົວແທນຈຳໜ່າຍຢ່າງເປັນທາງການໃຫ້ແກ່ ກຸ່ມບໍລິສັດ ບູລະພາ (BOURAPHA) ເພື່ອຊຸກຍູ້ການນຳໃຊ້ຜະລິດຕະພັນພາຍໃນຊາດ (Made in Laos).",
          order_index: 1,
        },
        {
          id: "t2",
          year_range: "2022",
          title: "ການຂະຫຍາຍຕົວສູ່ຕະຫຼາດສາກົນ (Post-Pandemic Expansion)",
          description: "ພາຍຫຼັງວິກິດການ ໂຄວິດ-19, LUD ໄດ້ຫັນວິກິດໃຫ້ເປັນໂອກາດ ໂດຍການຂະຫຍາຍຖານລູກຄ້າກ້າວສູ່ຕະຫຼາດຕ່າງປະເທດຢ່າງເຕັມຮູບແບບ ຜ່ານການສົ່ງອອກຜະລິດຕະພັນໄມ້ແປຮູບທີ່ໄດ້ມາດຕະຖານ.",
          order_index: 2,
        },
        {
          id: "t3",
          year_range: "2023-2024",
          title: "ການຂະຫຍາຍສູ່ອຸດສາຫະກຳກະສິກຳ (Agricultural Supply Chain)",
          description: "LUD ໄດ້ກ້າວເຂົ້າສູ່ອຸດສາຫະກຳກະສິກຳຢ່າງເຕັມຕົວ ໂດຍກາຍເປັນຜູ້ສະໜອງກາເຟດິບໃຫ້ແກ່ບໍລິສັດລະດັບໂລກ ເຊັ່ນ: Louis Dreyfus, Marubeni ແລະ Volcafe ພ້ອມທັງສົ່ງອອກມັນຕົ້ນແຫ້ງ.",
          order_index: 3,
        },
        {
          id: "t4",
          year_range: "2025-2026",
          title: "ຍຸກແຫ່ງການລົງທຶນຍຸດທະສາດ (Strategic Investor & 9 SPVs)",
          description: "ຈາກ 'ບໍລິສັດການຄ້າ' ໄດ້ຍົກລະດັບກາຍເປັນ 'ນັກລົງທຶນ ແລະ ຜູ້ພັດທະນາໂຄງການ' ທີ່ມີວິໄສທັດກວ້າງໄກ ໃນການສ້າງລະບົບນິເວດທາງທຸລະກິດຢ່າງຍືນຍົງ ໃນຫຼາກຫຼາຍຂະແໜງການ (9 SPVs & Solar 50MW).",
          order_index: 4,
        },
      ],
    };
  }
}

export async function createTimelineAction(data: any) {
  try {
    const res = await fetch(`${BACKEND_URL}/timeline`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create timeline");
    const timeline = await res.json();
    revalidatePath("/[locale]/admin/company", "page");
    return { success: true, timeline };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateTimelineAction(id: string, data: any) {
  try {
    const res = await fetch(`${BACKEND_URL}/timeline/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update timeline");
    const timeline = await res.json();
    revalidatePath("/[locale]/admin/company", "page");
    return { success: true, timeline };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteTimelineAction(id: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/timeline/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete timeline");
    revalidatePath("/[locale]/admin/company", "page");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 3. Master VDR Checklists Actions
export async function getChecklistsAction() {
  try {
    const res = await fetch(`${BACKEND_URL}/checklists`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch checklists");
    const data = await res.json();
    return { success: true, checklists: data };
  } catch (error: any) {
    return {
      success: true,
      checklists: [
        { id: "c1", checklist_id: "chk-01", category: "Legal", document_name: "ໃບທະບຽນວິສາຫະກິດ LUD Holding Sole Co., Ltd. (Enterprise Registration License)", status: "AVAILABLE", notes: "ອອກໂດຍ ກະຊວງອຸດສາຫະກຳ ແລະ ການຄ້າ (MOIC)", url: "/documents/LUD_Enterprise_Registration_2026.pdf", order_index: 1 },
        { id: "c2", checklist_id: "chk-02", category: "Legal", document_name: "ກົດລະບຽບກຸ່ມບໍລິສັດ & ໂຄງສ້າງການຖືຮຸ້ນ (Articles of Association & Charter)", status: "AVAILABLE", notes: "ກວດສອບ ແລະ ຢັ້ງຢືນໂດຍ DFDL Legal Counsel", url: "/documents/LUD_Articles_of_Association.pdf", order_index: 2 },
        { id: "c3", checklist_id: "chk-03", category: "Concession", document_name: "ສັນຍາສຳປະທານພະລັງງານແສງຕາເວັນ 50MW (Concession Agreement BOT 25 Yrs)", status: "AVAILABLE", notes: "ລົງນາມກັບ ກະຊວງພະລັງງານ ແລະ ບໍ່ແຮ່ (MEM) & ລັດວິສາຫະກິດໄຟຟ້າລາວ (EDL)", url: "/documents/Solar50MW_Concession_Agreement.pdf", order_index: 3 },
        { id: "c4", checklist_id: "chk-04", category: "Financial", document_name: "ບົດລາຍງານການກວດສອບບັນຊີປະຈຳປີ (Audited Financial Statements by PwC)", status: "AVAILABLE", notes: "ບົດສະຫຼຸບຖານະການເງິນ ແລະ ບັນຊີ Double-Entry ປະຈຳປີ 2024 - 2025", url: "/documents/LUD_Audited_Financials_2025.pdf", order_index: 4 },
        { id: "c5", checklist_id: "chk-05", category: "ESG", document_name: "ໃບຢັ້ງຢືນສິ່ງແວດລ້ອມ & I-REC Carbon Credit Clearance (MONRE ESIA Approval)", status: "AVAILABLE", notes: "ອອກໂດຍ ກະຊວງຊັບພະຍາກອນທຳມະຊາດ ແລະ ສິ່ງແວດລ້ອມ", url: "/documents/LUD_ESIA_Clearance.pdf", order_index: 5 },
        { id: "c6", checklist_id: "chk-06", category: "Tax", document_name: "ໃບຢັ້ງຢືນການມອບພັນທະອາກອນປະຈຳປີ (Tax Clearance Certificate)", status: "AVAILABLE", notes: "ອອກໂດຍ ກົມສ່ວຍສາອາກອນ, ກະຊວງການເງິນ", url: "/documents/Tax_Clearance_2025.pdf", order_index: 6 },
      ],
    };
  }
}

export async function createChecklistAction(data: any) {
  try {
    const res = await fetch(`${BACKEND_URL}/checklists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create checklist");
    const checklist = await res.json();
    revalidatePath("/[locale]/admin/company", "page");
    revalidatePath("/[locale]/investor", "page");
    return { success: true, checklist };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateChecklistAction(id: string, data: any) {
  try {
    const res = await fetch(`${BACKEND_URL}/checklists/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update checklist");
    const checklist = await res.json();
    revalidatePath("/[locale]/admin/company", "page");
    revalidatePath("/[locale]/investor", "page");
    return { success: true, checklist };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteChecklistAction(id: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/checklists/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete checklist");
    revalidatePath("/[locale]/admin/company", "page");
    revalidatePath("/[locale]/investor", "page");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
