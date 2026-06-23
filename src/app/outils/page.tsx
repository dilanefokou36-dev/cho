import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { getPageContent } from "@/lib/content/fetch-content";

export const metadata = { title: "Outils du métier" };

export default async function OutilsPage() {
  const data = await getPageContent<{
    title: string;
    intro: string;
    tools: { name: string; category: string; description: string; image: string }[];
    image: { src: string; alt: string; credit: string };
  }>("outils", "outils.json");

  return (
    <>
      <PageHero title={data.title} intro={data.intro} image={data.image} />

      <section className="page-container py-12 sm:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {data.tools.map((tool) => (
            <article key={tool.name} className="card-minimal overflow-hidden">
              <div className="relative h-40">
                <Image src={tool.image} alt={tool.name} fill className="object-cover" sizes="50vw" />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {tool.category}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-heading">{tool.name}</h3>
                <p className="mt-2 text-sm text-ink/80">{tool.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
