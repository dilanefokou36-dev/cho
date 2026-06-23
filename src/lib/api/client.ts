const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:8080";

export function getApiBaseUrl(): string {
  return API_BASE;
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { revalidate?: number }
): Promise<T> {
  const { revalidate, ...fetchInit } = init ?? {};
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...fetchInit,
    headers: {
      "Content-Type": "application/json",
      ...fetchInit.headers,
    },
    next: revalidate !== undefined ? { revalidate } : undefined,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => res.statusText);
    throw new Error(`API ${res.status}: ${detail}`);
  }

  return res.json() as Promise<T>;
}
