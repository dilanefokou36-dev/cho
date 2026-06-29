import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AdminActions } from "@/components/admin/AdminActions";

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
        colors[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status === "PENDING" ? "En attente" : status === "APPROVED" ? "Approuvé" : "Refusé"}
    </span>
  );
}

function BookStatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    DRAFT: "bg-gray-100 text-gray-700",
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
        colors[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status === "DRAFT" ? "Brouillon" : status === "PENDING" ? "En attente" : status === "APPROVED" ? "Approuvé" : "Refusé"}
    </span>
  );
}

export default async function LibraireDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);

  const libraire = await prisma.libraire.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true, phone: true } },
      books: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!libraire) notFound();

  return (
    <div>
      <Link
        href="/admin/libraires"
        className="mb-6 inline-flex text-sm text-accent hover:underline"
      >
        &larr; Retour aux libraires
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-heading">{libraire.storeName}</h1>
          <StatusBadge status={libraire.status} />
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-card">
          <h2 className="mb-4 text-lg font-bold text-heading">Informations</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink">Propriétaire</dt>
              <dd className="font-medium text-heading">{libraire.user.name || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink">Email</dt>
              <dd className="font-medium text-heading">{libraire.user.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink">Téléphone</dt>
              <dd className="font-medium text-heading">{libraire.phone || libraire.user.phone || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink">Adresse</dt>
              <dd className="font-medium text-heading">{libraire.address || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink">Site web</dt>
              <dd className="font-medium text-heading">
                {libraire.website ? (
                  <a
                    href={libraire.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {libraire.website}
                  </a>
                ) : "—"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink">Droits de publication</dt>
              <dd className="font-medium text-heading">
                {libraire.validUntil
                  ? `Jusqu'au ${new Date(libraire.validUntil).toLocaleDateString("fr-FR")}`
                  : libraire.status === "APPROVED"
                    ? "Permanent"
                    : "—"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink">Inscrit le</dt>
              <dd className="font-medium text-heading">
                {new Date(libraire.createdAt).toLocaleDateString("fr-FR", {
                  dateStyle: "long",
                })}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-card">
          <h2 className="mb-4 text-lg font-bold text-heading">Description</h2>
          <p className="text-sm text-ink">
            {libraire.description || "Aucune description."}
          </p>
        </div>
      </div>

      {libraire.status === "PENDING" && (
        <div className="mb-8">
          <AdminActions
            endpoint={`/api/admin/libraires/${libraire.id}`}
            type="libraire"
            currentStatus={libraire.status}
          />
        </div>
      )}
      {libraire.status === "APPROVED" && (
        <div className="mb-8">
          <AdminActions
            endpoint={`/api/admin/libraires/${libraire.id}`}
            type="libraire"
            currentStatus={libraire.status}
          />
        </div>
      )}

      <div className="rounded-2xl border border-black/5 bg-white shadow-card">
        <div className="border-b border-black/5 px-6 py-4">
          <h2 className="text-lg font-bold text-heading">
            Livres ({libraire.books.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 text-xs font-semibold uppercase tracking-wider text-ink">
                <th className="px-6 py-4">Titre</th>
                <th className="px-6 py-4">Auteur</th>
                <th className="px-6 py-4">Prix</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {libraire.books.map((book) => (
                <tr key={book.id} className="border-b border-black/5 last:border-0">
                  <td className="px-6 py-4 font-medium text-heading">{book.title}</td>
                  <td className="px-6 py-4 text-ink">{book.author || "—"}</td>
                  <td className="px-6 py-4 text-ink">
                    {book.price != null ? `${book.price.toFixed(2)} €` : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <BookStatusBadge status={book.status} />
                  </td>
                  <td className="px-6 py-4 text-ink">
                    {new Date(book.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {book.status === "PENDING" && (
                        <AdminActions
                          endpoint={`/api/admin/livres/${book.id}`}
                        />
                      )}
                      {book.status !== "PENDING" && (
                        <span className="text-xs text-ink">—</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {libraire.books.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-ink">
                    Aucun livre pour ce libraire.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
