import { ContactezNous } from "@/components/contact/ContactezNous";
import { PageHero } from "@/components/layout/PageHero";
import { getPageContent } from "@/lib/content/fetch-content";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const data = await getPageContent<{
    title: string;
    intro: string;
    email: string;
    institution: string;
    heroImage: { src: string; alt: string; credit: string };
  }>("contact", "contact.json");

  return (
    <>
      <PageHero title={data.title} intro={data.intro} image={data.heroImage} />

      <section className="page-container py-12 sm:py-16">
        <ContactezNous />
      </section>
    </>
  );
}
