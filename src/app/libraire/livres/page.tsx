import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { SubmitBookButton } from "./SubmitBookButton";

export default async function LibraireLivresPage() {
  const session = await getServerSession(authOptions);
  const userId = parseInt((session?.user as Record<string, unknown>)?.id as string);
  const libraire = await prisma.libraire.findUnique({ where: { userId } });

  const books = libraire
    ? await prisma.book.findMany({
        where: { libraireId: libraire.id },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-heading">Mes livres</h1>
          <p className="mt-1 text-sm text-ink">
            {books.length} livre{books.length !== 1 ? "s" : ""} dans votre catalogue
          </p>
        </div>
        <Link
          href="/libraire/livres/ajouter"
          className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
        >
          Ajouter un livre
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="rounded-2xl border border-black/5 bg-white p-12 text-center shadow-sm">
          <p className="text-ink">Vous n&apos;avez pas encore de livres.</p>
          <Link
            href="/libraire/livres/ajouter"
            className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
          >
            Ajouter votre premier livre
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-canvas/50">
                <th className="px-4 py-3 font-semibold text-ink">Titre</th>
                <th className="px-4 py-3 font-semibold text-ink">Auteur</th>
                <th className="px-4 py-3 font-semibold text-ink">Prix</th>
                <th className="px-4 py-3 font-semibold text-ink">Statut</th>
                <th className="px-4 py-3 font-semibold text-ink">Date</th>
                <th className="px-4 py-3 font-semibold text-ink">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="border-b border-black/5 last:border-0">
                  <td className="px-4 py-3 font-medium text-heading">{book.title}</td>
                  <td className="px-4 py-3 text-ink">{book.author || "—"}</td>
                  <td className="px-4 py-3 text-ink">
                    {book.price != null ? `${book.price.toFixed(2)} €` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        book.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : book.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : book.status === "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {book.status === "APPROVED"
                        ? "Approuvé"
                        : book.status === "PENDING"
                          ? "En attente"
                          : book.status === "REJECTED"
                            ? "Rejeté"
                            : "Brouillon"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink">
                    {new Date(book.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/libraire/livres/${book.id}`}
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        Modifier
                      </Link>
                      {book.status === "DRAFT" && (
                        <SubmitBookButton bookId={book.id} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
