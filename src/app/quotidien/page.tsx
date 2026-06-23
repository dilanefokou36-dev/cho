import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { getPageContent } from "@/lib/content/fetch-content";
import { ContactezNous } from "@/components/contact/ContactezNous";

export const metadata = { title: "La réalité du métier" };

export default async function QuotidienPage() {
  const data = await getPageContent<{
    title: string;
    intro: string;
    dailyLife: { time: string; activities: string; icon: string }[];
    realities: { title: string; description: string; image: string; credit: string }[];
    testimonial: { quote: string; author: string };
    video: { title: string; embedUrl: string; description: string };
    heroImage: { src: string; alt: string; credit: string };
  }>("quotidien", "quotidien.json");

  return (
    <>
      <PageHero title={data.title} intro={data.intro} image={data.heroImage} />

      <section className="page-container py-12">
        <h2 className="text-xl font-semibold text-heading">Une journée type</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.dailyLife.map((d) => (
            <article key={d.time} className="card-minimal">
              <span className="text-2xl">{d.icon}</span>
              <h3 className="mt-3 font-semibold text-accent">{d.time}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">{d.activities}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="page-container">
          <h2 className="text-xl font-semibold text-heading">
            Les facettes du quotidien
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {data.realities.map((r) => (
              <article key={r.title} className="card-minimal overflow-hidden p-0">
                <div className="relative aspect-video">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-heading">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">
                    {r.description}
                  </p>
                  <p className="mt-3 text-xs text-ink/40">© {r.credit}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-container py-12">
        <div className="card-minimal border-l-4 border-l-accent bg-cream/50">
          <svg
            className="mb-4 h-8 w-8 text-accent"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-lg italic leading-relaxed text-ink/85">
            &ldquo;{data.testimonial.quote}&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-ink/60">— {data.testimonial.author}</p>
        </div>
      </section>

      {data.video && (
        <section className="bg-white py-12">
          <div className="page-container">
            <h2 className="text-xl font-semibold text-heading">{data.video.title}</h2>
            <p className="mt-2 text-sm text-ink/70">{data.video.description}</p>
            <div className="mt-6 aspect-video overflow-hidden rounded-lg shadow-card">
              <iframe
                src={data.video.embedUrl}
                title={data.video.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      <div className="border-t border-black/5 bg-white">
        <div className="page-container py-6 text-center">
          <Link href="/difficultes" className="link-accent text-sm">
            Découvrir les défis du métier →
          </Link>
        </div>
      </div>

      <ContactezNous />
    </>
  );
}
