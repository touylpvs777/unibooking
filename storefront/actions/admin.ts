"use server";

import { revalidatePath } from "next/cache";
import { fetchAPI } from "@/lib/api";

export async function getInvestors() {
  try {
    const investors = await fetchAPI("/investors");
    return investors;
  } catch (error) {
    console.error("Failed to fetch investors:", error);
    return [];
  }
}

export async function createInvestor(data: any) {
  try {
    const result = await fetchAPI("/investors", {
      method: "POST",
      body: JSON.stringify(data),
    });
    revalidatePath("/[locale]/admin/investors", "page");
    return { success: true, investor: result };
  } catch (error: any) {
    console.error("Failed to create investor:", error);
    return { success: false, error: error?.message || "Failed to create investor" };
  }
}

export async function updateInvestor(userId: string, data: any) {
  try {
    const result = await fetchAPI(`/investors/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    revalidatePath("/[locale]/admin/investors", "page");
    return { success: true, result };
  } catch (error: any) {
    console.error("Failed to update investor:", error);
    return { success: false, error: error?.message || "Failed to update investor" };
  }
}

export async function deleteInvestor(userId: string) {
  try {
    await fetchAPI(`/investors/${userId}`, {
      method: "DELETE",
    });
    revalidatePath("/[locale]/admin/investors", "page");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete investor:", error);
    return { success: false, error: error?.message || "Failed to delete investor" };
  }
}

export async function approveInvestor(userId: string) {
  try {
    await fetchAPI(`/investors/${userId}/approve`, { method: "PUT" });
    revalidatePath("/[locale]/admin/investors", "page");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to approve investor:", error);
    return { success: false, error: error?.message || "Failed to approve investor" };
  }
}

export async function updateInvestorKyc(userId: string, data: { kyc_status: string; kyc_notes?: string; nda_signed?: string; accredited_status?: string }) {
  try {
    const result = await fetchAPI(`/investors/${userId}/kyc`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    revalidatePath("/[locale]/admin/investors", "page");
    return { success: true, result };
  } catch (error: any) {
    console.error("Failed to update investor KYC:", error);
    return { success: false, error: error?.message || "Failed to update KYC status" };
  }
}

export async function allocateInvestment(userId: string, data: {
  project_id: string;
  amount: number;
  equity_percentage?: number;
  committed_capital?: string;
  payout_frequency?: string;
  notes?: string;
}) {
  try {
    const result = await fetchAPI(`/investors/${userId}/investments`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    revalidatePath("/[locale]/admin/investors", "page");
    return { success: true, result };
  } catch (error: any) {
    console.error("Failed to allocate investment:", error);
    return { success: false, error: error?.message || "Failed to allocate project investment" };
  }
}

export async function removeInvestment(userId: string, investmentId: string) {
  try {
    await fetchAPI(`/investors/${userId}/investments/${investmentId}`, {
      method: "DELETE",
    });
    revalidatePath("/[locale]/admin/investors", "page");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to remove investment:", error);
    return { success: false, error: error?.message || "Failed to remove investment allocation" };
  }
}

export async function addTransaction(userId: string, data: {
  amount: number;
  type: "INCOME" | "EXPENSE" | "DIVIDEND";
  title: string;
  subtitle?: string;
  icon?: string;
  color?: string;
}) {
  try {
    const result = await fetchAPI(`/investors/${userId}/transactions`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    revalidatePath("/[locale]/admin/investors", "page");
    return { success: true, transaction: result.transaction };
  } catch (error: any) {
    console.error("Failed to add transaction:", error);
    return { success: false, error: error?.message || "Failed to add transaction" };
  }
}
