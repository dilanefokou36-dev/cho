import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { getPageContent } from "@/lib/content/fetch-content";
import { ContactezNous } from "@/components/contact/ContactezNous";

export const metadata = { title: "Difficultés du métier" };

export default async function DifficultesPage() {
  const data = await getPageContent<{
    title: string;
    intro: string;
    challenges: { title: string; description: string; impact: string; image: string; credit: string }[];
    solutions: string[];
    heroImage: { src: string; alt: string; credit: string };
  }>("difficultes", "difficultes.json");

  return (
    <>
      <PageHero title={data.title} intro={data.intro} image={data.heroImage} />

      <section className="page-container py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {data.challenges.map((c, i) => (
            <article
              key={c.title}
              className="card-minimal overflow-hidden p-0"
            >
              <div className="relative aspect-video">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold text-heading">{c.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/80">
                  {c.description}
                </p>
                <div className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-xs font-medium text-red-700">
                  Impact : {c.impact}
                </div>
                <p className="mt-3 text-xs text-ink/40">© {c.credit}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="page-container">
          <h2 className="text-xl font-semibold text-heading">
            Pistes de solutions
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {data.solutions.map((s) => (
              <div key={s} className="card-minimal flex gap-3">
                <span className="mt-0.5 text-accent">→</span>
                <p className="text-sm leading-relaxed text-ink/80">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-black/5 bg-white">
        <div className="page-container py-6 text-center">
          <Link href="/achats" className="link-accent text-sm">
            Voir le circuit d&apos;achat et les flux financiers →
          </Link>
        </div>
      </div>

      <ContactezNous />
    </>
  );
}
