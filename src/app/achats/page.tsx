import { PageHero } from "@/components/layout/PageHero";
import { getPageContent } from "@/lib/content/fetch-content";
import { ContactezNous } from "@/components/contact/ContactezNous";
import { BookSalesLink } from "@/components/layout/BookSalesLink";

export const metadata = { title: "Circuit d'achat et flux financiers" };

export default async function AchatsPage() {
  const data = await getPageContent<{
    title: string;
    intro: string;
    circuit: {
      title: string;
      description: string;
      steps: { step: number; actor: string; action: string; detail: string }[];
    };
    moneyFlow: {
      title: string;
      description: string;
      participants: { actor: string; pays: string; receives: string; type: string }[];
    };
    paymentMethods: { method: string; description: string; limit: string }[];
    schéma: { title: string; diagram: string };
    heroImage: { src: string; alt: string; credit: string };
  }>("achats", "achats.json");

  return (
    <>
      <PageHero title={data.title} intro={data.intro} image={data.heroImage} />

      <section className="page-container py-12">
        <h2 className="text-xl font-semibold text-heading">
          {data.circuit.title}
        </h2>
        <p className="mt-2 text-sm text-ink/70">{data.circuit.description}</p>
        <div className="mt-8 space-y-4">
          {data.circuit.steps.map((s) => (
            <article
              key={s.step}
              className="card-minimal flex flex-wrap items-start gap-4 sm:flex-nowrap"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-white">
                {s.step}
              </span>
              <div className="flex-1">
                <h3 className="font-semibold text-heading">{s.actor}</h3>
                <p className="mt-1 text-sm text-ink/80">{s.action}</p>
                <p className="mt-1 text-xs italic text-ink/50">{s.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="page-container">
          <h2 className="text-xl font-semibold text-heading">
            {data.moneyFlow.title}
          </h2>
          <p className="mt-2 text-sm text-ink/70">{data.moneyFlow.description}</p>
          <div className="mt-8 overflow-x-auto rounded-lg bg-white shadow-card">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-black/5 bg-cream">
                  <th className="px-5 py-4 font-semibold">Acteur</th>
                  <th className="px-5 py-4 font-semibold">Donne / Paye</th>
                  <th className="px-5 py-4 font-semibold">Reçoit</th>
                  <th className="px-5 py-4 font-semibold">Rôle réseau</th>
                </tr>
              </thead>
              <tbody>
                {data.moneyFlow.participants.map((p) => (
                  <tr key={p.actor} className="border-b border-black/5">
                    <td className="px-5 py-4 font-medium text-heading">{p.actor}</td>
                    <td className="px-5 py-4 text-ink/80">{p.pays}</td>
                    <td className="px-5 py-4 text-ink/80">{p.receives}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                        {p.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="page-container py-12">
        <h2 className="text-xl font-semibold text-heading">
          Moyens de paiement
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {data.paymentMethods.map((pm) => (
            <div key={pm.method} className="card-minimal">
              <h3 className="font-semibold text-heading">{pm.method}</h3>
              <p className="mt-2 text-sm text-ink/80">{pm.description}</p>
              <p className="mt-2 text-xs text-ink/50">Limite : {pm.limit}</p>
            </div>
          ))}
        </div>
      </section>

      {data.schéma && (
        <section className="bg-white py-12">
          <div className="page-container">
            <h2 className="text-xl font-semibold text-heading">
              {data.schéma.title}
            </h2>
            <div className="mt-6 overflow-x-auto rounded-lg bg-heading p-6 font-mono text-xs text-white/90 shadow-card sm:text-sm">
              <pre className="whitespace-pre">{data.schéma.diagram}</pre>
            </div>
          </div>
        </section>
      )}

      <BookSalesLink />

      <ContactezNous />
    </>
  );
}
