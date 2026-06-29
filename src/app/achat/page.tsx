import { prisma } from "@/lib/db";

export const metadata = { title: "Achat de livres" };

export default async function AchatPage() {
  const libraires = await prisma.libraire.findMany({
    where: { status: "APPROVED" },
    include: {
      user: { select: { name: true, city: true } },
      books: {
        where: { status: "APPROVED" },
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { storeName: "asc" },
  });

  return (
    <div>
      <div className="border-b border-black/5 bg-white">
        <div className="px-8 py-10">
          <h1 className="text-3xl font-bold text-heading">Achat de livres</h1>
          <p className="mt-2 text-lg text-ink/60">
            Découvrez les librairies partenaires et leurs ouvrages disponibles.
          </p>
        </div>
      </div>

      <div className="px-8 py-6">
        <a
          href="https://bookmarket-omega.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl border border-accent/20 bg-accent/5 p-5 text-lg font-semibold text-accent transition-colors hover:bg-accent/10"
        >
          <span className="text-2xl">📚</span>
          Plateforme d&apos;achat de livres
        </a>
      </div>

      {libraires.length === 0 ? (
        <div className="px-8 py-20 text-center">
          <p className="text-lg text-ink/40">Aucune libraire disponible pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-8 px-8 py-8">
          {libraires.map((libraire) => (
            <section key={libraire.id} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-heading">{libraire.storeName}</h2>
                <p className="mt-1 text-sm text-ink/60">
                  {libraire.user.city || libraire.address ? `${libraire.user.city || libraire.address}` : ""}
                  {libraire.description && ` — ${libraire.description.slice(0, 120)}${libraire.description.length > 120 ? "..." : ""}`}
                </p>
              </div>

              {libraire.books.length === 0 ? (
                <p className="text-sm text-ink/40">Aucun livre disponible dans cette librairie.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {libraire.books.map((book) => (
                    <div key={book.id} className="rounded-xl border border-black/5 bg-canvas p-4 transition-shadow hover:shadow-md">
                      {book.imageUrl && (
                        <img
                          src={book.imageUrl}
                          alt={book.title}
                          className="mb-3 h-40 w-full rounded-lg object-cover"
                        />
                      )}
                      <h3 className="font-semibold text-heading">{book.title}</h3>
                      {book.author && <p className="text-sm text-ink/60">{book.author}</p>}
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-lg font-bold text-accent">
                          {book.price != null ? `${book.price.toFixed(2)} €` : "—"}
                        </span>
                        {book.category && (
                          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                            {book.category}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
