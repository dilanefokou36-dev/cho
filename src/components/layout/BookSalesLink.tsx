export function BookSalesLink() {
  return (
    <section className="bg-gradient-to-r from-bordeaux to-forest py-16 text-white sm:py-20">
      <div className="page-container text-center">
        <h2 className="font-serif text-3xl font-bold sm:text-4xl">
          Plateforme de vente de livres
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
          Vous souhaitez acheter des livres en ligne ? Découvrez notre
          plateforme partenaire <strong>BookMarket</strong> pour parcourir
          et acheter des livres en quelques clics.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="https://bookmarket-omega.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-bordeaux transition hover:bg-cream"
          >
            Accéder à BookMarket
          </a>
          <a
            href="https://bookmarket-omega.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
          >
            Boutique en ligne — Voir le catalogue
          </a>
        </div>
      </div>
    </section>
  );
}
