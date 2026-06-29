import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  const [
    usersCount,
    librairesPending,
    librairesApproved,
    librairesRejected,
    booksPending,
    booksApproved,
    booksRejected,
    messagesCount,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.libraire.count({ where: { status: "PENDING" } }),
    prisma.libraire.count({ where: { status: "APPROVED" } }),
    prisma.libraire.count({ where: { status: "REJECTED" } }),
    prisma.book.count({ where: { status: "PENDING" } }),
    prisma.book.count({ where: { status: "APPROVED" } }),
    prisma.book.count({ where: { status: "REJECTED" } }),
    prisma.message.count(),
  ]);

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-heading">Dashboard</h1>
      <p className="mb-8 text-sm text-ink">
        Bienvenue, {session?.user?.name || "Administrateur"}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink">
            Utilisateurs
          </p>
          <p className="mt-2 text-3xl font-bold text-heading">{usersCount}</p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink">
            Libraires en attente
          </p>
          <p className="mt-2 text-3xl font-bold text-accent">{librairesPending}</p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink">
            Libraires approuvés
          </p>
          <p className="mt-2 text-3xl font-bold text-heading">{librairesApproved}</p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink">
            Libraires refusés
          </p>
          <p className="mt-2 text-3xl font-bold text-heading">{librairesRejected}</p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink">
            Livres en attente
          </p>
          <p className="mt-2 text-3xl font-bold text-accent">{booksPending}</p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink">
            Livres approuvés
          </p>
          <p className="mt-2 text-3xl font-bold text-heading">{booksApproved}</p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink">
            Livres refusés
          </p>
          <p className="mt-2 text-3xl font-bold text-heading">{booksRejected}</p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink">
            Messages
          </p>
          <p className="mt-2 text-3xl font-bold text-heading">{messagesCount}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-heading">Gestion</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/libraires"
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            Gérer les libraires
          </Link>
          <Link
            href="/admin/livres"
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            Gérer les livres
          </Link>
          <Link
            href="/admin/messages"
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            Messages
          </Link>
          <Link
            href="/admin/contenu/metier"
            className="rounded-xl border border-accent px-6 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/5"
          >
            Gérer le contenu
          </Link>
        </div>
      </div>
    </div>
  );
}
