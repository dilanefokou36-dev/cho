"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "bot" | "user";
  text: string;
}

const FAQ: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["métier", "libraire", "c'est quoi", "définition"],
    answer: "Un libraire est un professionnel du livre qui combine expertise commerciale et sens culturel. Il conseille les lecteurs, sélectionne les ouvrages, gère les stocks et anime la vie culturelle locale."
  },
  {
    keywords: ["formation", "étudier", "diplôme", "école", "devenir"],
    answer: "Plusieurs formations existent : Bac Pro Commerce, BTS MCO, Licence Pro Métiers du Livre, Master Métiers du Livre ou encore le CFA Librairie. La passion de la lecture est la première qualité requise !"
  },
  {
    keywords: ["fcfa", "franc cfa", "cameroun salaire"],
    answer: "Au Cameroun, un libraire débutant gagne entre 50 000 et 100 000 FCFA par mois. Un gérant expérimenté à Douala ou Yaoundé peut toucher 150 000 à 200 000 FCFA. Le SMIG camerounais est fixé à 43 969 FCFA/mois (2025). Beaucoup complètent leurs revenus avec la papeterie ou les photocopies."
  },
  {
    keywords: ["smic", "smig", "salaire minimum"],
    answer: "En France, le SMIC 2026 est de 1 801,80 € brut/mois (1 426,30 € net). Au Cameroun, le SMIG est de 43 969 FCFA/mois pour les agents de l'État et 60 000 FCFA dans les autres secteurs. Dans la librairie, la convention collective (IDCC 3013) fixe un minimum de 1 812 € brut/mois."
  },
  {
    keywords: ["salaire", "gagner", "argent", "revenu", "paie"],
    answer: "Le salaire d'un libraire salarié débute autour du SMIC. Un libraire indépendant gagne selon la rentabilité de sa librairie. La marge sur un livre est d'environ 35-40% du prix de vente."
  },
  {
    keywords: ["quotidien", "journée", "travail", "routine"],
    answer: "La journée type alterne entre réception des livraisons le matin, conseil client en journée, gestion administrative l'après-midi et animations en fin de journée. Le travail le week-end est fréquent."
  },
  {
    keywords: ["qualité", "compétence", "savoir", "profil"],
    answer: "Les qualités essentielles : grande culture littéraire, sens du conseil, compétences en gestion commerciale, maîtrise des outils numériques, et capacité à animer des événements culturels."
  },
  {
    keywords: ["librairie", "indépendant", "espace", "boutique"],
    answer: "Un libraire peut exercer dans différents espaces : librairie indépendante, grande surface culturelle, librairie en ligne, librairie universitaire, bouquiniste ou bibliothèque."
  },
  {
    keywords: ["achat", "commande", "éditeur", "distributeur"],
    answer: "Le circuit est : Auteur → Éditeur → Distributeur → Libraire → Client. Le libraire achète le livre à 60% du prix public et le revend au prix fixé par l'éditeur. Sa marge est d'environ 35-40%."
  },
  {
    keywords: ["difficulté", "problème", "défi", "concurrence"],
    answer: "Les principales difficultés sont : la concurrence du numérique (Amazon), les marges faibles, la charge de travail élevée, la gestion des retours éditeurs et l'adaptation technologique."
  },
  {
    keywords: ["outil", "logiciel", "numérique", "technologie"],
    answer: "Les outils incontournables : Biblys (gestion), Tite-Live/Dilicom (distribution), logiciels de caisse, plateformes e-commerce, réseaux sociaux et outils de gestion de stock."
  },
  {
    keywords: ["prix", "livre", "tarif", "coût"],
    answer: "En France, le prix du livre est unique (loi Lang). L'éditeur fixe le prix, le libraire ne peut pas vendre en dessous. La remise moyenne du libraire est de 35-40% sur le prix public."
  },
  {
    keywords: ["paiement", "payer", "carte", "espèce"],
    answer: "Les moyens de paiement acceptés en librairie : espèces (plafond 1000€), carte bancaire, virement, paiement en ligne, chèques cadeaux et Pass culture."
  },
  {
    keywords: ["video", "vidéo", "reportage", "documentaire"],
    answer: "Vous pouvez visionner notre vidéo sur la page 'Le quotidien' qui présente une journée typique d'un libraire à travers un reportage."
  },
  {
    keywords: ["contact", "contacter", "message"],
    answer: "Vous pouvez nous contacter via la page Contact du site. Un formulaire est disponible pour nous envoyer vos questions et impressions."
  },
  {
    keywords: ["commentaire", "avis", "impression"],
    answer: "Vous pouvez laisser vos impressions directement sur la page d'accueil."
  },
  {
    keywords: ["ouvrir", "créer", "création", "indépendant", "librairie"],
    answer: "Pour ouvrir une librairie, il faut un diplôme (BTS, Licence Pro) ou justifier de 3 ans d'expérience dans le métier. Il faut aussi un business plan solide, un local adapté et des financements. Des aides existent : CNL, label LIR, associations de libraires."
  },
  {
    keywords: ["horaire", "heure", "ouverture", "fermeture", "week-end", "dimanche"],
    answer: "Les librairies ouvrent généralement du mardi au samedi de 10h à 19h, avec une ouverture possible le lundi après-midi. Le travail le samedi est systématique et certains libraires ouvrent le dimanche matin en zones touristiques."
  },
  {
    keywords: ["stage", "alternance", "apprentissage", "emploi", "recrute", "embauche"],
    answer: "Les librairies proposent des stages (Bac Pro, BTS), des contrats en alternance et des postes de vendeurs. Consultez les offres sur les sites spécialisés (Leslibraires.fr, métiers du livre) ou déposez votre CV directement en librairie."
  },
  {
    keywords: ["numérique", "e-book", "ebook", "liseuse", "numérisation", "livre numérique"],
    answer: "Le livre numérique représente environ 5-10% du marché. Les librairies vendent des e-books via des plateformes comme Placedeslibraires.fr ou directement en boutique avec des cartes cadeaux numériques. La liseuse ne remplace pas le livre papier, elle le complète."
  },
  {
    keywords: ["tva", "fiscalité", "taxe", "impôt"],
    answer: "En France, le taux de TVA sur le livre est de 5,5% (taux réduit). Les livres numériques sont passés à 5,5% également depuis 2020. Les libraires bénéficient aussi d'une exonération de cotisation foncière dans certains cas."
  },
  {
    keywords: ["prix littéraire", "goncourt", "renaudot", "prix", "sélection"],
    answer: "La rentrée littéraire (août-septembre) est le moment clé avec les prix Goncourt, Renaudot, Femina, Médicis, Interallié. Le Goncourt est le plus vendeur : jusqu'à 400 000 exemplaires. Les libraires préparent ces sélections des mois à l'avance."
  },
  {
    keywords: ["conseil", "coup de cœur", "recommander", "lecture"],
    answer: "Le conseil est le cœur du métier de libraire. Il repose sur la connaissance des goûts du client, une veille littéraire constante et des lectures personnelles. Les coups de cœur des libraires sont souvent signalés par des fiches ou des marque-pages en rayon."
  },
  {
    keywords: ["vitrine", "étalage", "merchandising", "présentation"],
    answer: "La vitrine est la première vitrine de la librairie. Elle doit être changée régulièrement (toutes les 2-4 semaines), suivre l'actualité littéraire et les saisons, et donner envie d'entrer. Les tables de présentation à l'intérieur sont aussi essentielles."
  },
  {
    keywords: ["réseau social", "instagram", "facebook", "communication"],
    answer: "Les réseaux sociaux sont devenus indispensables pour les libraires. Instagram permet de mettre en avant les coups de cœur, Facebook d'annoncer les événements, et TikTok (#BookTok) peut faire exploser les ventes d'un livre."
  },
  {
    keywords: ["rentrée littéraire", "actualité", "nouveauté"],
    answer: "La rentrée littéraire de janvier et surtout de septembre-octobre est le moment fort de l'année. Plus de 500 romans français et étrangers sortent à chaque rentrée. Le libraire doit en sélectionner une partie pour les mettre en avant."
  },
  {
    keywords: ["jeunesse", "enfant", "album", "maternelle"],
    answer: "Le livre jeunesse est un secteur dynamique (25% du marché). Il va des albums pour tout-petits aux romans adolescents. La sélection est importante car les parents et grands-parents sont très demandeurs de conseils."
  },
  {
    keywords: ["bd", "bande dessinée", "manga", "comics"],
    answer: "La BD est un secteur porteur (plus de 15% du marché). Les mangas représentent une part croissante, notamment grâce aux séries comme One Piece, Naruto ou Demon Slayer. Le 9e art a ses propres prix (Angoulême, Fauve d'Or)."
  },
  {
    keywords: ["occasion", "bouquiniste", "ancien", "livre rare"],
    answer: "La vente de livres d'occasion permet une marge plus élevée (hors prix unique). Les bouquinistes sur les quais de Paris sont une institution. Les livres anciens et rares nécessitent une expertise spécifique (cotes, état, éditions originales)."
  },
  {
    keywords: ["e-commerce", "site internet", "livraison", "click and collect"],
    answer: "La plupart des librairies ont désormais un site de vente en ligne, souvent via des plateformes mutualisées comme Leslibraires.fr. Le click & collect s'est développé après le Covid. La livraison à domicile est un service attendu par les clients."
  },
  {
    keywords: ["stock", "inventaire", "réassort", "rupture"],
    answer: "La gestion des stocks est cruciale : un livre en rayon c'est une vente potentielle. Les libraires utilisent des seuils de réassort automatiques et font des inventaires réguliers. La rupture sur un best-seller peut faire perdre des ventes."
  },
  {
    keywords: ["retour", "invendu", "remise éditeur"],
    answer: "Les libraires peuvent retourner aux éditeurs les invendus (sauf commandes fermes). C'est un droit mais aussi une contrainte logistique. Les taux de retour varient de 15% à 40% selon les genres. Certains éditeurs imposent des quotas."
  },
  {
    keywords: ["dédicace", "auteur", "rencontre", "événement"],
    answer: "Organiser une dédicace demande de contacter l'éditeur, commander les livres, communiquer sur l'événement et accueillir l'auteur. C'est un moment fort pour la librairie qui attire du monde et crée du lien avec les clients."
  },
  {
    keywords: ["club de lecture", "comité", "lecteur", "groupe"],
    answer: "Les clubs de lecture sont animés par le libraire ou des clients bénévoles. Ils créent une communauté fidèle autour de la librairie. Certaines librairies organisent des clubs thématiques (polar, SF, jeunesse)."
  },
  {
    keywords: ["pass culture", "jeune", "dispositif"],
    answer: "Le Pass Culture est un crédit de 20€ à 300€ offert aux jeunes de 15 à 20 ans pour acheter des biens culturels, dont les livres. Les librairies peuvent s'inscrire comme partenaires pour permettre son utilisation en magasin."
  },
  {
    keywords: ["livre audio", "audible", "audio"],
    answer: "Le livre audio connaît une forte croissance (environ 5% du marché). Certaines librairies proposent des cartes d'abonnement ou des codes de téléchargement. C'est un complément au livre papier, pas un concurrent direct."
  },
  {
    keywords: ["auto-édition", "autoédité", "publié à compte d'auteur"],
    answer: "L'auto-édition permet aux auteurs de publier sans passer par un éditeur. Les librairies acceptent parfois ces ouvrages en dépôt-vente, mais la sélection est rigoureuse car la qualité est variable. Amazon KDP est la plateforme la plus utilisée."
  },
  {
    keywords: ["congé", "vacance", "remplacement"],
    answer: "Les librairies ferment généralement une semaine en hiver et 2-3 semaines en été. Les remplacements sont assurés par des CDD ou des étudiants. La période de Noël est la plus chargée de l'année (souvent pas de congés en décembre)."
  },
  {
    keywords: ["label", "lir", "cnl", "aide", "subvention"],
    answer: "Le label LIR (Librairie Indépendante de Référence) est décerné par le CNL aux librairies répondant à des critères de qualité. Il donne droit à des aides financières, une exonération de TFPB et un accompagnement personnalisé."
  },
  {
    keywords: ["syndicat", "organisation", "professionnel", "SLF"],
    answer: "Le principal syndicat est le SLF (Syndicat de la Librairie Française). Il défend les intérêts des libraires, négocie avec les pouvoirs publics et propose des formations. Il existe aussi des associations régionales de libraires."
  },
  {
    keywords: ["vendre", "vendeur", "vendeuse", "conseiller"],
    answer: "Le vendeur en librairie accueille les clients, les conseille, encaisse les achats, réceptionne les livraisons et participe à l'animation. C'est un métier polyvalent qui demande une grande culture générale et le sens du contact."
  },
  {
    keywords: ["logistique", "livraison", "transport", "colis"],
    answer: "Les livres sont livrés par les distributeurs (Dilicom, Hachette, Madrigall, Interforum). Les délais sont de 24h à 72h. Les colis sont réceptionnés le matin, vérifiés, puis mis en rayon. En période de rentrée, le volume est très important."
  },
  {
    keywords: ["convention collective", "idcc", "grille salariale", "classification"],
    answer: "La convention collective de la librairie (IDCC 3013, brochure 3252) fixe les salaires minimums par niveau et échelon. Au 1er mai 2025, le minimum conventionnel est de 1 812 € brut/mois. Elle couvre les salariés des librairies et définit classifications, primes d'ancienneté et garanties sociales."
  },
  {
    keywords: ["marché africain", "afrique livre", "édition afrique", "unesco livre"],
    answer: "Selon l'UNESCO (2025), l'Afrique compte environ 6 400 éditeurs et 86 000 titres publiés. Le continent importe pour 597 millions $ de livres contre 81 millions $ d'exportations. Le marché est estimé à plus de 1 milliard $ avec une croissance annuelle de 6%. Le numérique ouvre de nouvelles opportunités."
  },
  {
    keywords: ["crise livre", "décadence", "cameroun édition", "éditeur cameroun"],
    answer: "Le marché du livre au Cameroun traverse une crise. Les maisons d'édition peinent à financer les œuvres locales, les auteurs manquent de soutien, et la concurrence des livres importés de France est forte. Le manque de librairies en dehors des grandes villes limite l'accès à la lecture."
  },
  {
    keywords: ["booktok", "tiktok livre"],
    answer: "BookTok, la communauté littéraire de TikTok, crée des best-sellers en quelques jours. Un livre peut voir ses ventes exploser grâce à une vidéo virale. En 2025-2026, c'est un outil marketing incontournable pour les libraires et éditeurs, surtout pour les polars, la romantasy et la littérature jeunesse."
  },
  {
    keywords: ["marché france", "vente livre france", "chiffre livre"],
    answer: "En 2025, le marché du livre en France a généré 3,9 milliards € de CA pour 307 millions d'exemplaires vendus (-2,5% en volume). Les Français lisent en moyenne 13 livres par an et consacrent 163 € au livre. La littérature et les polars sont les segments les plus dynamiques."
  },
  {
    keywords: ["marché mondial", "monde livre", "milliards dollars"],
    answer: "Le marché mondial du livre est évalué à plus de 142 milliards de dollars par an, avec une croissance stable d'environ 2% jusqu'en 2030. La fiction domine les ventes (polars, fantasy, romantasy). Le livre physique devient un objet premium avec une hausse des prix."
  },
  {
    keywords: ["piraterie", "contrefaçon", "copie illégale", "plagiat"],
    answer: "La piraterie touche le secteur du livre, surtout dans les pays émergents. Les photocopies illégales de manuels scolaires et la diffusion non autorisée d'e-books font perdre des revenus aux auteurs et éditeurs. Au Cameroun, la photocopie des manuels est un problème récurrent."
  },
  {
    keywords: ["manuel scolaire", "rentrée scolaire", "fourniture", "scolaire"],
    answer: "Les manuels scolaires représentent une part très importante du chiffre d'affaires des librairies, surtout au Cameroun. La rentrée scolaire est le moment clé (septembre-octobre). Les libraires commandent des stocks massifs et doivent gérer les ruptures et les retours d'invendus."
  },
  {
    keywords: ["littérature camerounaise", "auteur camerounais", "écrivain cameroun", "roman cameroun"],
    answer: "Le Cameroun compte des écrivains reconnus : Mongo Beti ('Le Pauvre Christ de Bomba'), Calixthe Beyala, Léonora Miano (prix Femina 2013), Djaïli Amadou Amal (prix Goncourt des lycéens 2020) et Hemley Boum. La littérature camerounaise est dynamique mais souffre d'un manque de diffusion locale."
  },
  {
    keywords: ["importation", "exportation", "douane", "livre importé"],
    answer: "Au Cameroun, la majorité des livres sont importés de France, ce qui alourdit les coûts (transport, douane, TVA). Les livres importés sont plus chers, limitant l'accès pour une partie de la population. Des initiatives locales tentent de développer l'édition camerounaise pour réduire cette dépendance."
  },
  {
    keywords: ["charges", "loyer", "électricité", "frais fixes"],
    answer: "Les charges d'une librairie incluent le loyer (élevé en centre-ville), l'électricité, les salaires, les cotisations sociales et la taxe foncière. La marge sur les livres (35-40%) doit couvrir toutes ces charges, ce qui rend l'équilibre financier fragile, surtout au Cameroun où les volumes sont faibles."
  },
  {
    keywords: ["tva cameroun", "taxe cameroun", "fiscalité livre"],
    answer: "Au Cameroun, la TVA sur les livres est de 5% (taux réduit), contre 19,25% (taux normal). Ce taux réduit vise à favoriser l'accès à la lecture. En France, la TVA sur le livre est de 5,5%. Ces taux préférentiels sont essentiels pour maintenir des prix accessibles."
  },
  {
    keywords: ["livre numérique afrique", "e-book afrique", "numérique cameroun"],
    answer: "Le livre numérique en Afrique est en pleine croissance. Des plateformes comme Bookset.app développent l'accès aux livres numériques sur le continent. Le mobile est le principal outil de lecture, ouvrant des opportunités pour les formats adaptés aux smartphones. Les défis : coût de la data et équipement."
  },
  {
    keywords: ["financement", "prêt", "banque", "investir librairie"],
    answer: "Ouvrir une librairie nécessite un investissement : local, aménagement, stock initial (30 000 à 80 000 € en France, moins au Cameroun). Des aides existent : CNL, label LIR. Au Cameroun, les microfinances et les tontines sont souvent utilisées pour le financement."
  },
  {
    keywords: ["marge cameroun", "bénéfice librairie", "commission libraire"],
    answer: "La marge du libraire au Cameroun est de 30 à 40% sur le prix de vente, comme en France. Mais les volumes de vente sont plus faibles, rendant la rentabilité difficile. Beaucoup de librairies camerounaises diversifient avec la papeterie, les fournitures scolaires et les photocopies."
  },
];

function findAnswer(input: string): string | null {
  const lower = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const faq of FAQ) {
    for (const kw of faq.keywords) {
      const normalized = kw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (lower.includes(normalized)) {
        return faq.answer;
      }
    }
  }
  return null;
}

const GREETINGS = [
  "Bonjour ! 👋 Je suis le guide virtuel de BookStore. Posez-moi vos questions sur le métier de libraire.",
  "Salut ! Je suis là pour vous renseigner sur le métier de libraire. Que voulez-vous savoir ?"
];

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: GREETINGS[0] }
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");

    const local = findAnswer(text);
    if (local) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", text: local }]);
      }, 400);
      return;
    }

    setMessages((prev) => [
      ...prev,
      { role: "bot", text: "🤔 Je cherche dans mes connaissances avancées..." },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = await res.json();
      setMessages((prev) => {
        const withoutTyping = prev.slice(0, -1);
        return [...withoutTyping, { role: "bot", text: data.answer }];
      });
    } catch {
      setMessages((prev) => {
        const withoutTyping = prev.slice(0, -1);
        return [
          ...withoutTyping,
          { role: "bot", text: "Désolé, une erreur est survenue. Réessayez." },
        ];
      });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed bottom-0 right-0 z-50 w-full transition-transform duration-300 sm:w-[400px] ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "80vh" }}
      >
        <div className="flex h-full max-h-[80vh] flex-col rounded-t-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between rounded-t-2xl bg-bordeaux px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm">
                🤖
              </span>
              <div>
                <p className="text-sm font-semibold">Guide BookStore</p>
                <p className="text-xs text-white/70">Posez vos questions sur le métier</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Fermer le chat"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-ink"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-black/5 p-4">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Posez votre question..."
                className="flex-1 rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim()}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white transition hover:bg-accent-hover disabled:opacity-50"
                aria-label="Envoyer"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition hover:bg-accent-hover hover:shadow-xl"
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </>
  );
}
