import { PageHero } from "@/components/layout/PageHero";
import { getPageContent } from "@/lib/content/fetch-content";

export const metadata = { title: "Formation & compétences" };

export default async function FormationPage() {
  const data = await getPageContent<{
    title: string;
    intro: string;
    diplomas: { level: string; name: string; skills: string }[];
    skills: string[];
    image: { src: string; alt: string; credit: string };
  }>("formation", "formation.json");

  return (
    <>
      <PageHero title={data.title} intro={data.intro} image={data.image} />

      <section className="page-container py-12">
        <h2 className="text-xl font-semibold text-heading">Parcours de formation</h2>
        <div className="mt-8 overflow-x-auto rounded-lg bg-white shadow-card">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-cream">
                <th className="px-5 py-4 font-semibold">Niveau</th>
                <th className="px-5 py-4 font-semibold">Diplôme</th>
                <th className="px-5 py-4 font-semibold">Compétences</th>
              </tr>
            </thead>
            <tbody>
              {data.diplomas.map((d) => (
                <tr key={d.name} className="border-b border-black/5">
                  <td className="px-5 py-4 font-medium text-accent">{d.level}</td>
                  <td className="px-5 py-4 font-medium">{d.name}</td>
                  <td className="px-5 py-4 text-ink/80">{d.skills}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="page-container">
          <h2 className="text-xl font-semibold text-heading">Compétences transversales</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {data.skills.map((s) => (
              <li key={s} className="card-minimal text-sm">{s}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
