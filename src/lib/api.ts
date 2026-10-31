const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

let cached: { token: string; expires: number } | null = null;

async function getToken(): Promise<string | null> {
  if (cached && cached.expires > Date.now()) return cached.token;
  const res = await fetch("/api/token", { credentials: "include" });
  if (!res.ok) return null;
  const { token } = await res.json();
  cached = { token, expires: Date.now() + 50 * 60 * 1000 };
  return token;
}

export function clearToken() {
  cached = null;
}

export async function api<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getToken();
  const headers = new Headers(options.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }
  return data as T;
}