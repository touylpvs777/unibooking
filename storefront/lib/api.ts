import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function fetchAPI(endpoint: string, options: RequestInit & { noAuth?: boolean } = {}) {
  const { noAuth, ...fetchOptions } = options;
  let session = null;
  
  if (!noAuth) {
    try {
      session = await getServerSession(authOptions);
    } catch (e) {
      // Ignore if called in static generation
    }
  }
  
  const headers = new Headers(fetchOptions.headers);
  if (!headers.has('Content-Type') && !(fetchOptions.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  
  // @ts-ignore
  if (session?.accessToken) {
    // @ts-ignore
    headers.set('Authorization', `Bearer ${session.accessToken}`);
  }
  
  headers.set('Bypass-Tunnel-Reminder', 'true');
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  
  const res = await fetch(`${API_URL}/api/v1${endpoint}`, {
    ...fetchOptions,
    headers
  });
  
  if (!res.ok) {
    let errorBody = '';
    try {
        errorBody = await res.text();
    } catch (e) {}
    console.error(`API Error ${res.status}:`, errorBody);
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  
  // If it's a 204 No Content, return null
  if (res.status === 204) return null;
  
  return res.json();
}
