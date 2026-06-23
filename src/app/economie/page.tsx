import { PageHero } from "@/components/layout/PageHero";
import { getPageContent } from "@/lib/content/fetch-content";

export const metadata = { title: "Modèle économique" };

export default async function EconomiePage() {
  const data = await getPageContent<{
    title: string;
    intro: string;
    levers: { title: string; description: string }[];
    revenue: { source: string; share: string }[];
    image: { src: string; alt: string; credit: string };
  }>("economie", "economie.json");

  return (
    <>
      <PageHero title={data.title} intro={data.intro} image={data.image} />

      <section className="page-container py-12">
        <h2 className="text-xl font-semibold text-heading">Leviers économiques</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {data.levers.map((l) => (
            <article key={l.title} className="card-minimal">
              <h3 className="font-semibold text-accent">{l.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">{l.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="page-container">
          <h2 className="text-xl font-semibold text-heading">Répartition du chiffre d&apos;affaires</h2>
          <div className="mt-8 space-y-4">
            {data.revenue.map((r) => (
              <div key={r.source} className="card-minimal flex flex-wrap items-center justify-between gap-4">
                <span className="font-medium">{r.source}</span>
                <span className="rounded-full bg-forest/10 px-4 py-1 text-sm font-semibold text-forest">
                  {r.share}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
