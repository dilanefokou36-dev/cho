import { prisma } from "@/lib/db";
import Link from "next/link";
import { AdminActions } from "@/components/admin/AdminActions";

function StatusBadge({ status }: { status: string }) {
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
      {status === "DRAFT"
        ? "Brouillon"
        : status === "PENDING"
          ? "En attente"
          : status === "APPROVED"
            ? "Approuvé"
            : "Refusé"}
    </span>
  );
}

export default async function AdminLivresPage({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const filter = searchParams.filter || "";

  const where =
    filter && ["PENDING", "APPROVED", "REJECTED", "DRAFT"].includes(filter)
      ? { status: filter as import("@prisma/client").BookStatus }
      : {};

  const books = await prisma.book.findMany({
    where,
    include: {
      libraire: { select: { storeName: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const tabs = [
    { label: "Tous", value: "" },
    { label: "En attente", value: "PENDING" },
    { label: "Approuvés", value: "APPROVED" },
    { label: "Refusés", value: "REJECTED" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-heading">Livres</h1>
        <p className="mt-1 text-sm text-ink">
          Gérez les livres soumis par les libraires.
        </p>
      </div>

      <div className="mb-6 flex gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            href={tab.value ? `/admin/livres?filter=${tab.value}` : "/admin/livres"}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              filter === tab.value || (!filter && !tab.value)
                ? "bg-accent text-white"
                : "bg-white text-ink hover:text-ink"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-card">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-black/5 text-xs font-semibold uppercase tracking-wider text-ink">
              <th className="px-6 py-4">Titre</th>
              <th className="px-6 py-4">Auteur</th>
              <th className="px-6 py-4">Libraire</th>
              <th className="px-6 py-4">Prix</th>
              <th className="px-6 py-4">Statut</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b border-black/5 last:border-0">
                <td className="px-6 py-4 font-medium text-heading">{book.title}</td>
                <td className="px-6 py-4 text-ink">{book.author || "—"}</td>
                <td className="px-6 py-4 text-ink">{book.libraire.storeName}</td>
                <td className="px-6 py-4 text-ink">
                  {book.price != null ? `${book.price.toFixed(2)} €` : "—"}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={book.status} />
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
            {books.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-sm text-ink">
                  Aucun livre trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
