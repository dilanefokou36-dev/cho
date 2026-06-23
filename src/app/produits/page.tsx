import { PageHero } from "@/components/layout/PageHero";
import { getPageContent } from "@/lib/content/fetch-content";

export const metadata = { title: "Produits & services" };

export default async function ProduitsPage() {
  const data = await getPageContent<{
    title: string;
    intro: string;
    bookTypes: { name: string; detail: string }[];
    services: string[];
    image: { src: string; alt: string; credit: string };
  }>("produits", "produits.json");

  return (
    <>
      <PageHero title={data.title} intro={data.intro} image={data.image} />

      <section className="page-container py-12">
        <h2 className="text-xl font-semibold text-heading">Types de livres</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.bookTypes.map((b) => (
            <div key={b.name} className="card-minimal">
              <h3 className="font-medium text-heading">{b.name}</h3>
              <p className="mt-1 text-sm text-ink/70">{b.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="page-container">
          <h2 className="text-xl font-semibold text-heading">Services offerts</h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {data.services.map((s) => (
              <li key={s} className="flex gap-3 rounded-lg border border-black/5 bg-cream px-5 py-4 text-sm">
                <span className="font-bold text-accent">→</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
