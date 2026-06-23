import { apiFetch } from "@/lib/api/client";
import { loadJson } from "@/lib/content/loader";
import type { CarouselSlide } from "@/types/content";

const REVALIDATE = 60;

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
  return withFallback(
    slug,
    () => apiFetch<T>(`/api/v1/content/pages/${slug}`, { revalidate: REVALIDATE }),
    () => Promise.resolve(loadJson<T>(fallbackFile))
  );
}

export async function getSiteContent<T>(): Promise<T> {
  return withFallback(
    "site",
    () => apiFetch<T>("/api/v1/content/site", { revalidate: REVALIDATE }),
    () => Promise.resolve(loadJson<T>("site.json"))
  );
}

export async function getCarouselSlides(): Promise<CarouselSlide[]> {
  return withFallback(
    "carousel",
    async () => {
      const data = await apiFetch<{ slides: CarouselSlide[] }>("/api/v1/carousel", {
        revalidate: REVALIDATE,
      });
      return data.slides;
    },
    () => {
      const data = loadJson<{ slides: CarouselSlide[] }>("carousel.json");
      return Promise.resolve(data.slides);
    }
  );
}
