"use server";

import { revalidatePath } from "next/cache";

export async function updateCmsItemAction(id: string, value_text: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/cms/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value_text }),
    });

    if (!res.ok) {
      throw new Error(`Failed to update CMS item: ${res.statusText}`);
    }

    const data = await res.json();
    
    // Revalidate paths so the frontend updates immediately
    revalidatePath("/", "layout"); // Revalidate all pages to show new translation
    
    return { success: true, data };
  } catch (error: any) {
    console.error("updateCmsItemAction Error:", error);
    return { success: false, error: error.message };
  }
}
