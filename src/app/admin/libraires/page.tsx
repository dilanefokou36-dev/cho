import { prisma } from "@/lib/db";
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
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
        colors[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status === "PENDING" ? "En attente" : status === "APPROVED" ? "Approuvé" : "Refusé"}
    </span>
  );
}

export default async function AdminLibrairesPage() {
  const libraires = await prisma.libraire.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
      _count: { select: { books: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-heading">Libraires</h1>
        <p className="mt-1 text-sm text-ink">
          Gérez les comptes libraires et leurs inscriptions.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-card">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-black/5 text-xs font-semibold uppercase tracking-wider text-ink">
              <th className="px-6 py-4">Magasin</th>
              <th className="px-6 py-4">Propriétaire</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Téléphone</th>
              <th className="px-6 py-4">Statut</th>
              <th className="px-6 py-4">Livres</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {libraires.map((lib) => (
              <tr key={lib.id} className="border-b border-black/5 last:border-0">
                <td className="px-6 py-4 font-medium text-heading">{lib.storeName}</td>
                <td className="px-6 py-4 text-ink">{lib.user.name || "—"}</td>
                <td className="px-6 py-4 text-ink">{lib.user.email}</td>
                <td className="px-6 py-4 text-ink">{lib.phone || "—"}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={lib.status} />
                </td>
                <td className="px-6 py-4 text-ink">{lib._count.books}</td>
                <td className="px-6 py-4 text-ink">
                  {new Date(lib.createdAt).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {lib.status === "PENDING" && (
                      <AdminActions
                        endpoint={`/api/admin/libraires/${lib.id}`}
                        type="libraire"
                        currentStatus={lib.status}
                      />
                    )}
                    {lib.status === "APPROVED" && (
                      <AdminActions
                        endpoint={`/api/admin/libraires/${lib.id}`}
                        type="libraire"
                        currentStatus={lib.status}
                      />
                    )}
                    <Link
                      href={`/admin/libraires/${lib.id}`}
                      className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-gray-200"
                    >
                      Voir
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {libraires.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-sm text-ink">
                  Aucun libraire trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
