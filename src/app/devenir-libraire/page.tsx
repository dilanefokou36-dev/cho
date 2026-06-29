import { PageHero } from "@/components/layout/PageHero";
import { StepCarousel } from "@/components/layout/StepCarousel";

const STEPS = [
  {
    id: 1,
    title: "Se former au métier",
    subtitle: "Acquérir les compétences fondamentales",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1920&q=80",
    description:
      "La formation est la base de tout projet de librairie. Contrairement à d'autres commerces, le métier de libraire exige une double compétence : une solide culture littéraire et des aptitudes en gestion d'entreprise. Que vous soyez étudiant, salarié en reconversion ou professionnel du livre, plusieurs parcours s'offrent à vous pour acquérir les savoir-faire indispensables : connaissance de la chaîne du livre, techniques de vente, gestion des stocks, comptabilité et relation client. L'École de la Librairie, le CNL et les organismes de formation continue proposent des programmes adaptés à chaque profil, du stage d'initiation au diplôme spécialisé.",
    points: [
      "Diplômes reconnus : CAP Employé de vente, Bac Pro Commerce, BTS MCO, DUT Métiers du livre, Licence Pro Métiers du Livre, Master Métiers du Livre et de l'Édition",
      "Formation continue : stages pratiques en librairie, programme du CNL, ateliers professionnels du Syndicat de la Librairie Française, formation Book Conseil",
      "Compétences clés : culture littéraire et généraliste, techniques de vente et merchandising, gestion commerciale et comptable, relation client et animation culturelle, maîtrise des outils numériques et des réseaux sociaux",
      "Label LIR : le label Librairie Indépendante de Référence exige un stage pratique de 6 mois minimum en librairie, renouvelé régulièrement pour conserver la certification",
      "Reconversion professionnelle : dispositif CPF, POEI, démission légitime, congé individuel de formation — des solutions existent pour financer votre projet de reconversion vers le métier de libraire",
    ],
  },
  {
    id: 2,
    title: "Définir son concept et sa niche",
    subtitle: "Choisir un positionnement stratégique",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1920&q=80",
    description:
      "Avant toute chose, vous devez imaginer à quoi ressemblera votre librairie et quelle expérience unique vous offrirez à vos clients. Le marché du livre est concurrentiel, et une librairie ne peut pas se contenter d'être un simple point de vente. Il faut inventer un concept fort, un lieu qui donne envie d'entrer, de s'attarder, de revenir. Souhaitez-vous une librairie généraliste ou spécialisée ? Un café-librairie, une librairie-papeterie, une librairie jeunesse ou un espace dédié aux bandes dessinées ? Votre concept déterminera votre identité visuelle, votre sélection d'ouvrages, votre stratégie de communication et l'aménagement de votre espace.",
    points: [
      "Librairie généraliste : large offre tous publics, idéale en centre-ville avec un flux diversifié, nécessite un stock important (5 000 à 10 000 références) et une équipe aux compétences variées",
      "Librairie spécialisée : choisir une niche porteuse (jeunesse, BD/manga, scolaire et universitaire, religieux, voyage, policier) — permet de se différencier, de fidéliser une communauté et de réduire les coûts de stock",
      "Concepts hybrides : café-librairie, librairie-théâtre, librairie-salon de thé, librairie-papeterie, librairie d'occasion — ces formats innovants attirent une clientèle variée et diversifient les sources de revenus",
      "Identité et expérience : le nom, le logo, l'agencement, l'ambiance lumineuse et sonore, la sélection musicale, le mobilier — chaque détail compte pour créer une expérience d'achat mémorable et un lieu de vie culturel",
    ],
  },
  {
    id: 3,
    title: "Réaliser une étude de marché",
    subtitle: "Analyser son environnement concurrentiel",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80",
    description:
      "Une étude de marché rigoureuse est indispensable pour valider votre projet et convaincre les financeurs. Elle vous permet de comprendre qui sont vos futurs clients, où ils se trouvent, quels sont leurs habitudes d'achat et leurs attentes. Vous devez aussi analyser la concurrence directe (autres librairies, grandes surfaces culturelles) et indirecte (vente en ligne, bibliothèques, abonnements). Cette étape vous aidera à définir votre zone de chalandise, votre politique de prix, vos horaires d'ouverture et votre stratégie commerciale. N'hésitez pas à sonder les habitants, les commerçants et les associations locales pour recueillir des données concrètes.",
    points: [
      "Zone de chalandise : délimiter un rayon de 5 à 15 minutes à pied (centre-ville) ou en voiture (périphérie), analyser le profil socio-démographique des habitants, le trafic piéton, les flux scolaires et universitaires",
      "Concurrence directe : recenser toutes les librairies, maisons de presse et rayons culturels dans votre zone, analyser leur offre, leurs prix, leurs horaires, leur fréquentation et leur réputation en ligne",
      "Concurrence indirecte : Amazon, Fnac, Cultura, bibliothèques municipales, médiathèques, book clubs, abonnements type Abonnement Livre — comprendre leurs forces et leurs faiblesses face à une librairie de proximité",
      "Clientèle cible : définir vos segments prioritaires (jeunes parents, étudiants, seniors, professionnels, touristes), leurs habitudes de lecture, leur budget culturel mensuel et leurs attentes en matière de services",
      "Enquête terrain : réaliser un questionnaire auprès de 50 à 100 personnes dans la zone, rencontrer les commerçants voisins, les directeurs d'école, les bibliothécaires et les associations culturelles locales",
    ],
  },
  {
    id: 4,
    title: "Construire un business plan solide",
    subtitle: "Prévoir, financer et rentabiliser",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80",
    description:
      "Le business plan est la colonne vertébrale de votre projet : c'est le document qui prouve la viabilité économique de votre librairie. Il comprend une partie narrative (présentation du projet, concept, équipe, stratégie) et une partie financière (comptes prévisionnels sur 3 ans, plan de trésorerie, seuil de rentabilité). Les banques et les investisseurs examineront attentivement vos hypothèses de chiffre d'affaires, vos marges, vos charges fixes et votre besoin en fonds de roulement. N'oubliez pas d'intégrer les spécificités du métier : remise moyenne de 35-40% sur le prix public, invendus représentant 15 à 20% du stock, saisonnalité des ventes (rentrée scolaire, Noël, été).",
    points: [
      "Compte de résultat prévisionnel : estimer le chiffre d'affaires mensuel (ventes de livres, papeterie, services), le coût d'achat des marchandises, les marges par catégorie, les charges fixes (loyer, salaires, électricité, assurances, communication) et le résultat net",
      "Plan de trésorerie : prévoir les entrées et sorties de fonds mois par mois sur les 3 premières années, anticiper les découverts saisonniers (rentrée scolaire, été), prévoir une ligne de crédit de 10 000 à 20 000 €",
      "Seuil de rentabilité : calculer le chiffre d'affaires minimum à atteindre chaque mois pour couvrir toutes les charges — généralement entre 15 000 et 40 000 € selon la taille de la librairie",
      "Investissement initial : budget total de 50 000 à 200 000 € comprenant le dépôt de garantie du local, l'aménagement intérieur, le stock initial (30 000 à 80 000 €), l'équipement informatique et caisse, la signalétique, les frais de création d'entreprise et la communication de lancement",
      "Sources de financement : apport personnel (30% minimum), prêt bancaire professionnel, prêt d'honneur Initiative France, crowdfunding (Ulule, KissKissBankBank), subventions CNL et ADELC, prêt sans intérêt de la Fédération Wallonie-Bruxelles (Belgique)",
    ],
  },
  {
    id: 5,
    title: "Trouver le financement",
    subtitle: "Mobiliser les ressources nécessaires",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1920&q=80",
    description:
      "Une fois votre business plan finalisé, vous devez réunir les fonds nécessaires au lancement. Le financement d'une librairie repose généralement sur un apport personnel (30 à 50% du budget total) complété par des prêts bancaires, des aides publiques et parfois du crowdfunding. Le secteur du livre bénéficie de dispositifs de soutien spécifiques : le Centre National du Livre (CNL) propose des subventions et des avances remboursables pour la création, la reprise ou la modernisation des librairies. L'ADELC et la Banque du Livre accompagnent également les porteurs de projet avec des conseils et des financements à taux avantageux. Préparez un dossier solide avec votre business plan, votre étude de marché, vos devis fournisseurs et votre prévisionnel financier.",
    points: [
      "Apport personnel : idéalement 30 à 50% du budget total (15 000 à 100 000 €), peut être complété par un prêt familial, un prêt d'honneur (Initiative France, Réseau Entreprendre) ou un apport en nature (matériel, stock)",
      "Prêts bancaires professionnels : durée de 5 à 7 ans, taux entre 1,5% et 4%, n'exigez pas un apport inférieur à 30% — les banques privilégient les projets solides avec un bon business plan et un apport significatif",
      "Aides du CNL : subvention pour création ou reprise de librairie (jusqu'à 25 000 €), avance remboursable pour modernisation (jusqu'à 40 000 €), aide au numéraire, aide à la trésorerie — dossier à déposer chaque année",
      "ADELC et Banque du Livre : accompagnement personnalisé, coaching professionnel, avances sur trésorerie, prêts sans intérêt pour les libraires labellisés — des ressources précieuses pour sécuriser le lancement",
      "Crowdfunding et financement participatif : plateformes spécialisées (Ulule, KissKissBankBank, Miimosa) permettent de tester l'intérêt du public, de pré-vendre des bons d'achat et de mobiliser une communauté avant l'ouverture — objectif moyen : 5 000 à 20 000 €",
    ],
  },
  {
    id: 6,
    title: "Choisir le statut juridique et accomplir les formalités",
    subtitle: "Sécuriser son cadre légal",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80",
    description:
      "Le choix du statut juridique est une décision importante qui impacte votre régime fiscal, votre protection sociale, votre responsabilité personnelle et vos obligations comptables. Pour une librairie, les options les plus courantes sont l'entreprise individuelle (EI), l'EURL, la SASU ou la SARL. Chaque statut a ses avantages et ses inconvénients : l'EI est simple et peu coûteuse mais ne sépare pas patrimoine personnel et professionnel ; la SASU offre une protection sociale renforcée mais implique plus de formalités. Au-delà du statut, vous devez accomplir plusieurs démarches administratives : immatriculation au Registre du Commerce, souscription d'assurances professionnelles, demande d'autorisation d'urbanisme pour l'enseigne, affiliation à la convention collective IDCC 3013 de la librairie.",
    points: [
      "Entreprise individuelle (EI) : régime le plus simple et le moins coûteux (frais de création < 100 €), idéal pour démarrer seul, responsabilité limitée au professionnel depuis la loi EIRL — régime micro-BIC possible si CA < 72 600 € HT",
      "SASU / SAS : statut le plus protecteur pour le dirigeant (assimilation salarié, sécurité sociale complète), flexibilité statutaire, frais de création plus élevés (500 à 2 000 €), idéal si vous prévoyez d'associer des investisseurs",
      "EURL / SARL : alternative intéressante pour une librairie en couple ou en famille, responsabilité limitée aux apports, régime social du gérant majoritaire (indépendant) ou minoritaire (assimilé salarié)",
      "Assurances obligatoires : responsabilité civile professionnelle, multirisque du local commercial, protection juridique, garantie du stock et des marchandises — prévoir un budget de 800 à 2 000 € par an",
      "Démarches administratives : inscription au RCS (Registre du Commerce et des Sociétés), autorisation d'urbanisme pour l'enseigne et la devanture, déclaration d'activité auprès de l'URSSAF, affiliation à la convention collective IDCC 3013 (Librairie), souscription à une mutuelle d'entreprise",
      "TVA et fiscalité : taux réduit de 5,5% sur les livres (France), 6% (Belgique), TVA normale à 20% sur la papeterie et les produits dérivés, option pour le régime de la TVA sur les encaissements pour simplifier la gestion",
    ],
  },
  {
    id: 7,
    title: "Trouver un local et l'aménager",
    subtitle: "Créer un espace de vente accueillant",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80",
    description:
      "L'emplacement de votre librairie est l'un des facteurs clés de succès. Une zone passante en centre-ville, à proximité des écoles, des universités, des transports en commun et des commerces culturels, maximise votre visibilité et votre fréquentation. La surface idéale se situe entre 50 et 150 m² selon votre positionnement. L'aménagement intérieur doit être pensé pour offrir une expérience agréable : rayonnages adaptés aux différents formats (poches, grands formats, beaux livres), tables de présentation pour les nouveautés, espace de lecture confortable, zone de caisse fonctionnelle. L'éclairage, la couleur des murs, le mobilier, la signalétique et l'ambiance sonore contribuent à créer une atmosphère chaleureuse qui invite à la flânerie et à la découverte.",
    points: [
      "Critères d'emplacement : zone passante (minimum 1 000 piétons/heure), centre-ville ou quartier animé, proximité des écoles/collèges/universités, transports en commun à moins de 5 minutes, vitrine sur rue avec belle visibilité, parking à proximité",
      "Surface et configuration : 50 à 80 m² pour une librairie de quartier, 80 à 150 m² pour une librairie généraliste, hauteur sous plafond minimale de 2,80 m pour les rayonnages, espace de stockage/réserve de 10 à 20 m²",
      "Agencement : rayonnages muraux et centraux (prévoir 1 000 à 1 500 € par ml), tables de présentation (5 à 10 tables pour une librairie de 80 m²), espace de lecture avec fauteuils, zone de caisse avec présentoirs d'impulsion",
      "Ambiance : éclairage LED chaleureux (3 000 K) pour les zones de lecture, éclairage dirigé sur les tables de présentation, peinture aux couleurs apaisantes (beige, vert sauge, gris chaud), mobilier en bois pour un aspect naturel, signalétique claire et lisible, fond sonore discret (jazz, classique, lounge)",
      "Budget aménagement : 15 000 à 50 000 € selon la surface et la qualité du mobilier, comprenant l'agencement intérieur (cloisons, électricité, peinture), le mobilier (rayonnages, tables, caisse, fauteuils), la signalétique extérieure et intérieure, l'éclairage et l'enseigne",
    ],
  },
  {
    id: 8,
    title: "Constituer le stock et choisir ses fournisseurs",
    subtitle: "Bâtir une offre éditoriale pertinente",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&q=80",
    description:
      "Le stock est le cœur battant de votre librairie. Constituer un fonds cohérent et renouvelé régulièrement est essentiel pour répondre aux attentes de votre clientèle et générer du chiffre d'affaires. Vous devez sélectionner vos ouvrages avec soin, en tenant compte de votre positionnement (généraliste ou spécialisé), des demandes locales et des tendances du marché. Les relations avec vos fournisseurs sont tout aussi stratégiques : éditeurs locaux, distributeurs nationaux, diffuseurs internationaux. La remise moyenne sur le prix public est de 35 à 40%, avec possibilité de retourner les invendus (selon les contrats). Un logiciel de gestion performant vous aidera à suivre vos ventes, gérer vos réassorts et optimiser votre trésorerie.",
    points: [
      "Stock initial : prévoir 3 000 à 10 000 références pour l'ouverture, réparties entre fonds (ouvrages de référence, classiques) et flux (nouveautés, best-sellers), renouvellement de 15 à 25% du stock chaque année",
      "Fournisseurs et partenaires : éditeurs locaux et régionaux (CLE, PUY, Harmattan), distributeurs nationaux (Hachette, Editis, Madrigall, Interforum, Volumen), diffuseurs spécialisés (jeunesse, BD, scolaire), plateformes de distribution numérique",
      "Conditions commerciales : remise standard de 35 à 40% sur le prix public, possibilité de retour des invendus (selon contrats, généralement 20 à 30% des quantités commandées), délais de paiement de 30 à 60 jours fin de mois",
      "Gestion des stocks : outils professionnels recommandés (Biblys, Logiciel de caisse avec module stock, Dilicom pour les commandes), seuils de réassort automatiques, inventaires tournants trimestriels, analyse des ventes par catégorie et par saison",
      "Politique d'achat : privilégier la qualité à la quantité, suivre les rentrées littéraires et les prix (Goncourt, Renaudot, Femina, Médicis, Prix des libraires), entretenir des relations privilégiées avec les représentants des maisons d'édition",
    ],
  },
  {
    id: 9,
    title: "Développer la clientèle et animer la librairie",
    subtitle: "Faire rayonner votre commerce",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1920&q=80",
    description:
      "Une librairie ne se résume pas à la vente de livres : c'est un lieu de vie, d'échange et de découverte. L'animation culturelle et une communication bien pensée sont les clés de votre notoriété locale et de la fidélisation de votre clientèle. Organisez régulièrement des événements : dédicaces, clubs de lecture, ateliers d'écriture, rencontres avec des auteurs, heures du conte pour les enfants. Sur les réseaux sociaux, partagez vos coups de cœur, vos actualités et les coulisses de votre librairie. Un site e-commerce ou une présence sur Leslibraires.fr vous permet de vendre en ligne. La carte de fidélité, la newsletter et les programmes de parrainage sont des outils efficaces pour transformer des visiteurs occasionnels en clients réguliers.",
    points: [
      "Services à la clientèle : conseil personnalisé et sur-mesure, commandes spéciales (livres non disponibles en stock), click & collect, livraison à domicile (en zone urbaine), emballage cadeau soigné, cartes de fidélité et programme de récompenses",
      "Animation culturelle : dédicaces avec auteurs locaux et nationaux (prévoir 1 à 2 événements par mois), clubs de lecture mensuels par thématique, ateliers d'écriture créative, heures du conte pour les enfants, rencontres-débats sur des sujets de société, partenariats avec le salon du livre et les festivals",
      "Communication multicanal : vitrine attrayante renouvelée chaque semaine, présence active sur Instagram (coups de cœur, coulisses, événements), Facebook (programmation, actualités), TikTok BookTok (recommandations aux jeunes lecteurs), newsletter bimensuelle, site internet avec catalogue et agenda",
      "Fidélisation : carte de fidélité avec points cumulables (1 point = 1 €, 100 points = 5 € de réduction), programme de parrainage (filleul et parrain gagnent 5 €), anniversaire du client (offre spéciale), événements privés réservés aux membres, avant-premières littéraires",
      "Partenariats locaux : écoles et collèges (fourniture scolaire, comités de lecture), bibliothèques et médiathèques (animations croisées), associations culturelles, offices du tourisme, comités d'entreprise (chèques culture, CSE), presse locale et radios associatives",
    ],
  },
  {
    id: 10,
    title: "Gérer l'entreprise au quotidien",
    subtitle: "Assurer la pérennité de votre activité",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
    description:
      "La gestion quotidienne d'une librairie demande rigueur, organisation et polyvalence. Au-delà de la passion des livres, vous devez maîtriser la comptabilité (tenue des comptes, déclarations fiscales, TVA à 5,5% sur le livre), la gestion des ressources humaines (recrutement, planning, formation continue, convention collective IDCC 3013), et la veille littéraire (rentrées littéraires, prix, tendances). La diversification est un levier de croissance important : papeterie, fournitures scolaires, e-books, cartes cadeaux, produits dérivés. Développez également votre présence en ligne avec un site e-commerce et des partenariats locaux pour renforcer la résilience de votre entreprise face aux fluctuations du marché.",
    points: [
      "Gestion comptable et fiscale : tenue quotidienne des comptes avec un logiciel professionnel, déclaration et paiement de la TVA (5,5% livres, 20% papeterie), suivi de la trésorerie en temps réel, préparation du bilan annuel avec un expert-comptable (budget : 1 500 à 3 000 €/an)",
      "Ressources humaines : recrutement de vendeurs passionnés (1 à 3 employés selon la surface), élaboration des plannings (ouverture 6 jours sur 7, amplitude 9h30-19h30), formation continue aux nouveautés et aux techniques de vente, application de la convention collective IDCC 3013 (Librairie)",
      "Veille littéraire et commerciale : abonnement aux revues professionnelles (Livres Hebdo, ActuaLitté), suivi des rentrées littéraires (janvier, mars/avril, septembre/octobre), participation aux comités de lecture et salons, analyse des tendances du marché (BookTok, podcasts, livres audio)",
      "Diversification des revenus : papeterie fine et fournitures scolaires (marge de 40 à 50%), e-books et liseuses (partenariat avec les éditeurs), cartes cadeaux et coffrets thématiques, produits dérivés (marque-pages, tote bags, carnets), location d'espace pour ateliers et événements",
      "Développement numérique : boutique en ligne avec Leslibraires.fr ou WooCommerce (investissement : 1 000 à 5 000 €), présence sur les plateformes de vente de livres d'occasion, newsletter automatisée avec Brevo ou Mailchimp, comptes professionnels sur les réseaux sociaux avec planning de publication",
      "Partenariats et réseau : adhésion au Syndicat de la Librairie Française, participation aux groupes d'achat et aux centrales de référencement, collaboration avec les écoles, les bibliothèques, les comités d'entreprise et les associations culturelles locales — un réseau solide est un atout concurrentiel majeur",
    ],
  },
];

const CHIFFRES = [
  { value: "35-40%", label: "Marge sur le livre neuf" },
  { value: "3 000-10 000", label: "Références en stock" },
  { value: "50-150 m²", label: "Surface de vente" },
  { value: "5,5%", label: "TVA sur le livre (France)" },
  { value: "50 000-200K €", label: "Budget d'ouverture" },
  { value: "15 000-40K €", label: "CA mensuel minimum" },
];

export const metadata = {
  title: "Devenir libraire",
};

export default function DevenirLibrairePage() {
  return (
    <div>
      {/* Hero */}
      <PageHero
        title="Devenir libraire"
        intro="Un guide visuel complet pour comprendre le métier de libraire, de la formation à la gestion quotidienne. Parcourez les 10 étapes clés illustrées pour bâtir votre projet de A à Z."
      />

      {/* Diaporama plein écran des 6 étapes */}
      <StepCarousel steps={STEPS} />

      {/* Chiffres clés */}
      <section className="bg-gradient-to-br from-forest to-bordeaux py-14 text-white">
        <div className="page-container">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Chiffres clés du métier</h2>
              <p className="mt-2 text-sm text-white/70">Données 2025-2026 — France & Cameroun</p>
            </div>
            <a
              href="/formation"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              Voir les formations →
            </a>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {CHIFFRES.map((c) => (
              <div key={c.label} className="rounded-xl bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-2xl font-bold text-accent">{c.value}</p>
                <p className="mt-1 text-xs text-white/70">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conseils pratiques */}
      <section className="bg-white py-14">
        <div className="page-container">
          <div className="text-center">
            <h2 className="section-title">Conseils pratiques pour réussir</h2>
            <p className="section-intro mx-auto">
              Les clés pour faire de votre librairie un commerce prospère et un lieu de vie culturel.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🎯", title: "Spécialisez-vous", text: "Une librairie généraliste est difficile à rentabiliser. Trouvez votre niche : jeunesse, bande dessinée, scolaire, universitaire ou religion." },
              { icon: "🌐", title: "Allez sur le web", text: "Un site e-commerce n'est plus une option. Utilisez Leslibraires.fr ou WooCommerce pour vendre en ligne sans compétences techniques." },
              { icon: "🤝", title: "Créez du lien", text: "Organisez des événements, collaborez avec les écoles, les bibliothèques et les associations culturelles locales." },
              { icon: "📱", title: "Maîtrisez les réseaux", text: "Instagram pour vos coups de cœur, TikTok (#BookTok) pour toucher les jeunes, Facebook pour vos événements." },
              { icon: "📊", title: "Suivez vos chiffres", text: "Un logiciel de gestion (Biblys, Logiciel de caisse) vous permet de suivre vos ventes, votre stock et votre trésorerie." },
              { icon: "💡", title: "Diversifiez vos revenus", text: "Papeterie, fournitures scolaires, photocopies, e-books, cartes cadeaux : diversifiez pour lisser votre activité." },
            ].map((item) => (
              <div key={item.title} className="card-minimal">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-canvas text-2xl">{item.icon}</div>
                <h3 className="font-bold text-heading">{item.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vidéo testimoniale */}
      <section className="page-container py-14">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="section-title">Témoignage vidéo</h2>
          <p className="section-intro mx-auto">
            Découvrez le parcours d&apos;un libraire qui a lancé son business avec le métier de libraire.
          </p>
        </div>
        <div className="relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl shadow-card">
          <div className="aspect-video">
            <iframe
              src="https://www.youtube.com/embed/rti3_ebqLfE"
              title="Lancer un business avec le métier de libraire"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-container py-14 text-center">
        <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-card sm:p-12">
          <h2 className="section-title">Prêt à vous lancer ?</h2>
          <p className="section-intro mx-auto">
            Le métier de libraire est exigeant mais passionnant. Avec une bonne préparation,
            de la persévérance et l&apos;amour des livres, vous pouvez faire de votre passion un métier.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/formation" className="btn-primary">Voir les formations</a>
            <a href="/metier" className="btn-outline">Découvrir le métier</a>
          </div>
        </div>
      </section>
    </div>
  );
}
