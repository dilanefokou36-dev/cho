import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const SLUG_TITLE: Record<string, string> = {
  metier: "Le métier de libraire",
  quotidien: "La réalité du métier",
  difficultes: "Difficultés du métier",
  formation: "Formation & compétences",
  espaces: "Espaces d'exercice",
  produits: "Produits & services",
  achats: "Circuit d'achat et flux financiers",
  economie: "Modèle économique",
  outils: "Outils du métier",
  reseau: "Modélisation réseau",
  protocoles: "Protocoles métier",
  galerie: "Galerie",
  contact: "Contact",
  accueil: "Accueil",
};

async function main() {
  const contentDir = path.join(__dirname, "../../public/content-fr");

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const slug = file.replace(".json", "");
    const filePath = path.join(contentDir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const title = SLUG_TITLE[slug] || slug;

    await prisma.siteContent.upsert({
      where: { slug },
      update: { title, content: raw },
      create: { slug, title, content: raw },
    });

    console.log(`✅ ${slug} — ${title}`);
  }

  console.log("\n🎉 Contenu importé avec succès !");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
