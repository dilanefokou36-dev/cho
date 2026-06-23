import Image from "next/image";
import Link from "next/link";
import { FeatureCards } from "@/components/home/FeatureCards";
import { ImageCarousel } from "@/components/home/ImageCarousel";
import { ContactezNous } from "@/components/contact/ContactezNous";
import { BookSalesLink } from "@/components/layout/BookSalesLink";
import { getCarouselSlides, getSiteContent } from "@/lib/content/fetch-content";

export default async function HomePage() {
  const slides = await getCarouselSlides();
  const site = await getSiteContent<{ tagline: string }>();

  return (
    <>
      <ImageCarousel slides={slides} />

      <section className="border-b border-black/5 bg-white py-10">
        <div className="page-container text-center">
          <p className="text-lg text-ink/80">{site.tagline}</p>
          <p className="mt-3 text-sm text-ink/60">Projet 3GI — Génie Informatique, Cameroun</p>
        </div>
      </section>

      <FeatureCards />

      <section className="page-container py-16 sm:py-20">
        <div className="grid items-center gap-10 overflow-hidden rounded-2xl bg-bordeaux text-white lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-14">
            <h2 className="font-serif text-3xl font-bold">
              Le libraire au Cameroun, un passeur de culture
            </h2>
            <p className="mt-4 leading-relaxed text-white/85">
              Entre conseil personnalisé, vente de manuels scolaires et
              promotion de la littérature africaine, le libraire camerounais
                joue un rôle essentiel dans l&apos;accès au savoir et à la
                culture. Découvrez les réalités du métier au Cameroun :
                formation, espaces d&apos;exercice, défis et perspectives.
            </p>
            <Link href="/quotidien" className="btn-primary mt-8 bg-white text-bordeaux hover:bg-cream">
              Découvrir le quotidien
            </Link>
          </div>
          <div className="relative min-h-[280px] lg:min-h-full">
            <Image
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80"
              alt="Rayonnages de livres"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <BookSalesLink />

      <ContactezNous />
    </>
  );
}
