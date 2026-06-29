import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";

function ValidityInfo({ validUntil }: { validUntil: Date | null }) {
  if (!validUntil) return <span className="text-xs text-green-600">Permanent</span>;

  const now = new Date();
  const expired = new Date(validUntil) < now;
  const daysLeft = Math.ceil(
    (new Date(validUntil).getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (expired) {
    return <span className="text-xs text-red-600">Expiré</span>;
  }

  return (
    <span className="text-xs text-orange-600">
      Expire dans {daysLeft} jour{daysLeft > 1 ? "s" : ""}
    </span>
  );
}

export default async function LibraireDashboard() {
  const session = await getServerSession(authOptions);
  const userId = parseInt((session?.user as Record<string, unknown>)?.id as string);

  const libraire = await prisma.libraire.findUnique({ where: { userId } });
  const totalBooks = await prisma.book.count({ where: { libraireId: libraire?.id } });
  const pendingBooks = await prisma.book.count({
    where: { libraireId: libraire?.id, status: "PENDING" },
  });
  const messagesCount = await prisma.message.count({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
  });

  const stats = [
    { label: "Mes livres", value: totalBooks, href: "/libraire/livres" },
    { label: "En attente", value: pendingBooks, href: "/libraire/livres" },
    { label: "Messages", value: messagesCount, href: "/libraire/messages" },
    {
      label: "Statut profil",
      value: libraire?.status || "N/A",
      href: "/libraire/profil",
    },
  ];

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-heading">Tableau de bord</h1>
      <p className="mb-2 text-sm text-ink">
        Bienvenue, {session?.user?.name || "Libraire"}
      </p>

      {libraire && libraire.status === "APPROVED" && (
        <p className="mb-8 text-sm text-ink">
          Droits de publication : <ValidityInfo validUntil={libraire.validUntil} />
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-ink">
              {s.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-heading">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-heading">Gestion</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/libraire/livres"
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            Gérer mes livres
          </Link>
          <Link
            href="/libraire/profil"
            className="rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-heading transition-colors hover:bg-canvas"
          >
            Modifier mon profil
          </Link>
        </div>
      </div>
    </div>
  );
}
