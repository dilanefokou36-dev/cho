import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageHero } from "@/components/layout/PageHero";
import { getPageContent } from "@/lib/content/fetch-content";
import type { GalleryImage } from "@/types/content";

export const metadata = { title: "Galerie" };

export default async function GaleriePage() {
  const data = await getPageContent<{ title: string; intro: string; heroImage: { src: string; alt: string; credit: string }; images: GalleryImage[] }>(
    "galerie",
    "galerie.json"
  );

  return (
    <>
      <PageHero title={data.title} intro={data.intro} image={data.heroImage} />
      <section className="page-container py-12 sm:py-16">
        <GalleryGrid images={data.images} />
      </section>
    </>
  );
}
