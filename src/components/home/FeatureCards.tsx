import Link from "next/link";
import { QUICK_LINKS } from "@/lib/constants/routes";

export function FeatureCards() {
  return (
    <section className="page-container py-16 sm:py-20">
      <div className="text-center">
        <h2 className="section-title">Explorez le métier de libraire au Cameroun</h2>
        <p className="section-intro mx-auto">
          Une plateforme complète pour comprendre la profession de libraire au Cameroun
          et en Afrique francophone : formations, espaces d&apos;exercice, défis et perspectives.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className="card-minimal group flex flex-col"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white">
              →
            </span>
            <h3 className="font-semibold text-heading group-hover:text-accent">
              {link.label}
            </h3>
            <p className="mt-2 flex-1 text-sm text-ink/70">{link.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
