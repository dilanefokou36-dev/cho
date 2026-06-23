import { PageHero } from "@/components/layout/PageHero";
import { getPageContent } from "@/lib/content/fetch-content";

export const metadata = { title: "Protocoles métier" };

export default async function ProtocolesPage() {
  const data = await getPageContent<{
    title: string;
    intro: string;
    heroImage: { src: string; alt: string; credit: string };
    rules: { id: number; rule: string }[];
  }>("protocoles", "protocoles.json");

  return (
    <>
      <PageHero title={data.title} intro={data.intro} image={data.heroImage} />

      <section className="page-container py-12 sm:py-16">
        <ol className="space-y-4">
          {data.rules.map((r) => (
            <li key={r.id} className="card-minimal flex gap-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-white">
                {r.id}
              </span>
              <p className="pt-2 text-sm leading-relaxed sm:text-base">{r.rule}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
