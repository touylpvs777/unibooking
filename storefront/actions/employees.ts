"use server";

import { revalidatePath } from "next/cache";
import { fetchAPI } from "@/lib/api";

export async function getEmployees() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/hr/employees`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch employees");
    const data = await res.json();
    return { success: true, employees: data };
  } catch (error: any) {
    console.error("Failed to fetch employees:", error);
    return { success: false, employees: [], error: error.message };
  }
}

export async function createEmployee(data: any) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/hr/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create employee");
    const employee = await res.json();
    revalidatePath("/[locale]/admin/employees", "page");
    revalidatePath("/[locale]/about", "page");
    return { success: true, employee };
  } catch (error: any) {
    console.error("Error creating employee:", error);
    return { success: false, error: error.message };
  }
}

export async function updateEmployee(id: string, data: any) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/hr/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update employee");
    const employee = await res.json();
    revalidatePath("/[locale]/admin/employees", "page");
    revalidatePath("/[locale]/about", "page");
    return { success: true, employee };
  } catch (error: any) {
    console.error("Error updating employee:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteEmployee(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/hr/employees/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete employee");
    revalidatePath("/[locale]/admin/employees", "page");
    revalidatePath("/[locale]/about", "page");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting employee:", error);
    return { success: false, error: error.message };
  }
}
