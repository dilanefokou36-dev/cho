import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { getPageContent } from "@/lib/content/fetch-content";

export const metadata = { title: "Le métier de libraire" };

export default async function MetierPage() {
  const data = await getPageContent<{
    title: string;
    intro: string;
    definition: string[];
    categories: { type: string; description: string; image: string; credit: string }[];
    conditions: { label: string; value: string }[];
    heroImage: { src: string; alt: string; credit: string };
  }>("metier", "metier.json");

  return (
    <>
      <PageHero title={data.title} intro={data.intro} image={data.heroImage} />

      <section className="page-container py-12">
        <h2 className="text-xl font-semibold text-heading">Définition</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {data.definition.map((item) => (
            <li key={item} className="card-minimal flex gap-3 text-sm leading-relaxed">
              <span className="text-accent">✦</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white py-12">
        <div className="page-container">
          <h2 className="text-xl font-semibold text-heading">Types de libraires</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {data.categories.map((cat) => (
              <article key={cat.type} className="card-minimal overflow-hidden p-0">
                <div className="relative aspect-video">
                  <Image src={cat.image} alt={cat.type} fill className="object-cover" sizes="50vw" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-heading">{cat.type}</h3>
                  <p className="mt-2 text-sm text-ink/80">{cat.description}</p>
                  <p className="mt-3 text-xs text-ink/50">© {cat.credit}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-container py-12">
        <h2 className="text-xl font-semibold text-heading">Conditions d&apos;exercice</h2>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          {data.conditions.map((c) => (
            <div key={c.label} className="card-minimal">
              <dt className="text-xs font-semibold uppercase tracking-wider text-accent">{c.label}</dt>
              <dd className="mt-2 text-sm text-ink/80">{c.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
