export type NavItem = { href: string; label: string };
export type NavCategory = { label: string; items: NavItem[] };

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/metier", label: "Le métier" },
  { href: "/quotidien", label: "Le quotidien" },
  { href: "/difficultes", label: "Difficultés" },
  { href: "/formation", label: "Formation" },
  { href: "/espaces", label: "Espaces" },
  { href: "/produits", label: "Produits" },
  { href: "/achats", label: "Achats & flux" },
  { href: "/economie", label: "Économie" },
  { href: "/outils", label: "Outils" },
  { href: "/reseau", label: "Réseau" },
  { href: "/protocoles", label: "Protocoles" },
  { href: "/galerie", label: "Galerie" },
  { href: "/contact", label: "Contact" },
] as const;

export const NAV_CATEGORIES: NavCategory[] = [
  {
    label: "Présentation",
    items: [
      { href: "/metier", label: "Le métier" },
      { href: "/quotidien", label: "Le quotidien" },
      { href: "/difficultes", label: "Difficultés" },
      { href: "/formation", label: "Formation & compétences" },
    ],
  },
  {
    label: "Écosystème",
    items: [
      { href: "/espaces", label: "Espaces d'exercice" },
      { href: "/produits", label: "Produits & services" },
      { href: "/achats", label: "Achats & flux" },
      { href: "/economie", label: "Modèle économique" },
    ],
  },
  {
    label: "Ressources",
    items: [
      { href: "/outils", label: "Outils du métier" },
      { href: "/reseau", label: "Modélisation réseau" },
      { href: "/protocoles", label: "Protocoles métier" },
    ],
  },
  {
    label: "Média",
    items: [
      { href: "/galerie", label: "Galerie photos" },
    ],
  },
];

export const QUICK_LINKS = [
  { href: "/metier", label: "Découvrir le métier", desc: "Définition, conditions d'exercice, contexte Cameroun" },
  { href: "/quotidien", label: "Le quotidien", desc: "Journée type, défis et réalité du libraire au Cameroun" },
  { href: "/achats", label: "Achats & flux", desc: "Circuit d'achat, importation et flux financiers en FCFA" },
  { href: "/reseau", label: "Modélisation réseau", desc: "Concepts 3GI appliqués au métier de libraire" },
  { href: "/galerie", label: "Galerie photos", desc: "Librairies du Cameroun et du monde" },
] as const;
