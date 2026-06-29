import { loadJson } from "@/lib/content/loader";
import type { CarouselSlide } from "@/types/content";

async function fetchFromApi<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function withFallback<T>(
  label: string,
  fetcher: () => Promise<T>,
  fallback: () => Promise<T>
): Promise<T> {
  try {
    return await fetcher();
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[BookStore] API indisponible pour "${label}", fallback JSON local.`, err);
    }
    return fallback();
  }
}

export async function getPageContent<T>(slug: string, fallbackFile: string): Promise<T> {
  return withFallback<T>(
    slug,
    async () => {
      const data = await fetchFromApi<{ content: string }>(`/api/content/${slug}`);
      return JSON.parse(data.content) as T;
    },
    () => Promise.resolve(loadJson<T>(fallbackFile))
  );
}

export async function getSiteContent<T>(): Promise<T> {
  return withFallback(
    "site",
    async () => {
      const data = await fetchFromApi<{ content: string }>("/api/content/site");
      return JSON.parse(data.content) as T;
    },
    () => Promise.resolve(loadJson<T>("site.json"))
  );
}

export async function getCarouselSlides(): Promise<CarouselSlide[]> {
  return withFallback(
    "carousel",
    async () => {
      const data = await fetchFromApi<{ content: string }>("/api/content/carousel");
      const parsed = JSON.parse(data.content);
      return parsed.slides as CarouselSlide[];
    },
    () => {
      const data = loadJson<{ slides: CarouselSlide[] }>("carousel.json");
      return Promise.resolve(data.slides);
    }
  );
}
