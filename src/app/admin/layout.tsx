"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils/cn";
import { NAV_CATEGORIES, type NavItem } from "@/lib/constants/routes";

const allPages: NavItem[] = NAV_CATEGORIES.flatMap((cat) => cat.items);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex min-h-[80vh]">
      <aside className="hidden w-64 shrink-0 border-r border-black/5 bg-white p-4 lg:block">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">
            Back Office
          </p>
          <p className="mt-1 text-sm font-medium text-heading">
            {session?.user?.name || "Admin"}
          </p>
        </div>

        <nav className="space-y-1">
          <Link
            href="/admin"
            className={cn(
              "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/admin"
                ? "bg-accent/10 text-accent"
                : "text-ink/70 hover:bg-black/5 hover:text-accent"
            )}
          >
            Dashboard
          </Link>

          <p className="mt-4 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-ink/40">
            Pages du site
          </p>

          {allPages.map((page) => (
            <Link
              key={page.href}
              href={`/admin/contenu${page.href === "/" ? "" : page.href}`}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === `/admin/contenu${page.href === "/" ? "" : page.href}`
                  ? "bg-accent/10 text-accent"
                  : "text-ink/70 hover:bg-black/5 hover:text-accent"
              )}
            >
              {page.label}
            </Link>
          ))}

          <div className="mt-6 border-t border-black/5 pt-4">
            <button
              onClick={() => signOut()}
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
            >
              Déconnexion
            </button>
          </div>
        </nav>
      </aside>

      <main className="flex-1 overflow-auto p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
