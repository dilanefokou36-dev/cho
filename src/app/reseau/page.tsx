import { ActorTable } from "@/components/metier/ActorTable";
import { PageHero } from "@/components/layout/PageHero";
import { getPageContent } from "@/lib/content/fetch-content";

export const metadata = { title: "Modélisation réseau" };

export default async function ReseauPage() {
  const data = await getPageContent<{
    title: string;
    intro: string;
    heroImage: { src: string; alt: string; credit: string };
    mapping: { network: string; metier: string }[];
    actors: { actor: string; role: string; networkRole: string }[];
    scenario: { title: string; steps: string[] };
  }>("reseau", "reseau.json");

  return (
    <>
      <PageHero title={data.title} intro={data.intro} image={data.heroImage} />

      <section className="page-container py-12">
        <h2 className="text-xl font-semibold text-heading">Transposition réseau ↔ métier</h2>
        <div className="mt-8 overflow-x-auto rounded-lg bg-white shadow-card">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-cream">
                <th className="px-5 py-4 font-semibold">Concept réseau</th>
                <th className="px-5 py-4 font-semibold">Correspondance métier</th>
              </tr>
            </thead>
            <tbody>
              {data.mapping.map((m) => (
                <tr key={m.network} className="border-b border-black/5">
                  <td className="px-5 py-4 font-medium text-accent">{m.network}</td>
                  <td className="px-5 py-4 text-ink/80">{m.metier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="page-container">
          <h2 className="text-xl font-semibold text-heading">Acteurs et rôles</h2>
          <div className="mt-8">
            <ActorTable rows={data.actors} />
          </div>
        </div>
      </section>

      <section className="page-container py-12">
        <div className="card-minimal border-l-4 border-l-accent bg-cream/50">
          <h2 className="font-serif text-xl font-bold text-heading">{data.scenario.title}</h2>
          <ol className="mt-6 space-y-4">
            {data.scenario.steps.map((step, i) => (
              <li key={step} className="flex gap-4 text-sm leading-relaxed">
                <span className="font-bold text-accent">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 rounded-lg bg-heading p-6 font-mono text-xs text-white/90 sm:text-sm">
          <pre className="overflow-x-auto whitespace-pre">
{`[Client] ──requête──► [Plateforme BookStore]
                              │
                    protocole métier (stock, prix)
                              │
                    ◄──message── (confirmation, facture)
                              │
                    [Kafka] ──► notification libraire`}
          </pre>
        </div>
      </section>
    </>
  );
}
