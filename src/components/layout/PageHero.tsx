import Image from "next/image";

interface PageHeroProps {
  title: string;
  intro: string;
  image?: { src: string; alt: string; credit: string };
}

export function PageHero({ title, intro, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="page-container py-12 sm:py-16">
        <div className={image ? "grid items-center gap-10 lg:grid-cols-2" : ""}>
          <div className="animate-slide-up">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              BookStore
            </p>
            <h1 className="section-title mt-3">{title}</h1>
            <p className="section-intro">{intro}</p>
          </div>
          {image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-card">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                <p className="text-xs text-white/90">© {image.credit}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
