import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { getPageContent } from "@/lib/content/fetch-content";

export const metadata = { title: "Espaces d'exercice" };

export default async function EspacesPage() {
  const data = await getPageContent<{
    title: string;
    intro: string;
    heroImage: { src: string; alt: string; credit: string };
    spaces: { name: string; description: string; examples: string; image: string; credit: string }[];
  }>("espaces", "espaces.json");

  return (
    <>
      <PageHero title={data.title} intro={data.intro} image={data.heroImage} />

      <section className="page-container py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.spaces.map((space) => (
            <article key={space.name} className="card-minimal overflow-hidden p-0">
              <div className="relative aspect-[3/2]">
                <Image src={space.image} alt={space.name} fill className="object-cover" sizes="33vw" />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-heading">{space.name}</h3>
                <p className="mt-2 text-sm text-ink/80">{space.description}</p>
                <p className="mt-3 text-xs text-accent">Ex. : {space.examples}</p>
                <p className="mt-2 text-xs text-ink/40">© {space.credit}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
