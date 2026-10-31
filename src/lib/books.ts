import type { Book } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getBooks(query: Record<string, string | undefined> = {}) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  try {
    const res = await fetch(`${API_URL}/books?${params.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Request failed");
    return { books: (await res.json()) as Book[], failed: false };
  } catch {
    return { books: [] as Book[], failed: true };
  }
}