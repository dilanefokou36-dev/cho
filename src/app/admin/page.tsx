import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  const usersCount = await prisma.user.count();
  const pagesCount = await prisma.siteContent.count();
  const role = (session?.user as Record<string, unknown> | undefined)?.role as string | undefined;

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-heading">Dashboard</h1>
      <p className="mb-8 text-sm text-ink/60">
        Bienvenue, {session?.user?.name || "Administrateur"}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">Utilisateurs</p>
          <p className="mt-2 text-3xl font-bold text-heading">{usersCount}</p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">Pages de contenu</p>
          <p className="mt-2 text-3xl font-bold text-heading">{pagesCount}</p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">Rôle</p>
          <p className="mt-2 text-lg font-bold uppercase text-accent">
            {role || "USER"}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-heading">Gestion du contenu</h2>
        <p className="mb-6 text-sm text-ink/60">
          Modifiez le contenu des pages du site depuis l&apos;interface d&apos;administration.
        </p>
        <Link
          href="/admin/contenu/metier"
          className="inline-flex rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
        >
          Gérer le contenu
        </Link>
      </div>
    </div>
  );
}
