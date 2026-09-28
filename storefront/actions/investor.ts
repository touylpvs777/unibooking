"use server";

import { fetchAPI } from "@/lib/api";

export async function getInvestorDashboardData(userId: string) {
  try {
    const data = await fetchAPI(`/investors/${userId}/dashboard`);
    return data;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return null;
  }
}
