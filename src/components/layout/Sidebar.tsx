"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils/cn";

interface SidebarItem {
  href: string;
  label: string;
  icon: string;
}

const VISITOR_ITEMS: SidebarItem[] = [
  { href: "/", label: "Accueil", icon: "🏠" },
  { href: "/achat", label: "Achat", icon: "🛍️" },
  { href: "/devenir-libraire", label: "Devenir libraire", icon: "📚" },
  { href: "/metier", label: "Le métier", icon: "💼" },
  { href: "/quotidien", label: "Le quotidien", icon: "📅" },
  { href: "/difficultes", label: "Difficultés", icon: "⚠️" },
  { href: "/formation", label: "Formation", icon: "🎓" },
  { href: "/espaces", label: "Espaces", icon: "🏪" },
  { href: "/produits", label: "Produits", icon: "📦" },
  { href: "/achats", label: "Achats & flux", icon: "🛒" },
  { href: "/economie", label: "Économie", icon: "📊" },
  { href: "/outils", label: "Outils", icon: "🔧" },
  { href: "/reseau", label: "Réseau", icon: "🌐" },
  { href: "/protocoles", label: "Protocoles", icon: "📋" },
  { href: "/galerie", label: "Galerie", icon: "🖼️" },
  { href: "/contact", label: "Contact", icon: "📧" },
];

const LIBRAIRE_ITEMS: SidebarItem[] = [
  { href: "/libraire", label: "Tableau de bord", icon: "📊" },
  { href: "/libraire/livres", label: "Mes livres", icon: "📚" },
  { href: "/libraire/messages", label: "Messages", icon: "💬" },
  { href: "/libraire/profil", label: "Mon profil", icon: "👤" },
];

const ADMIN_ITEMS: SidebarItem[] = [
  { href: "/admin", label: "Tableau de bord", icon: "📊" },
  { href: "/admin/libraires", label: "Libraires", icon: "🏪" },
  { href: "/admin/livres", label: "Livres", icon: "📚" },
  { href: "/admin/messages", label: "Messages", icon: "💬" },
  { href: "/admin/contenu/metier", label: "Contenu du site", icon: "📝" },
];

function roleIcon(role?: string): string {
  if (role === "ADMIN") return "🛡️";
  if (role === "LIBRAIRE") return "📖";
  return "👤";
}

function roleLabel(role?: string): string {
  if (role === "ADMIN") return "Administrateur";
  if (role === "LIBRAIRE") return "Libraire";
  return "Visiteur";
}

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = (session?.user as Record<string, unknown> | undefined)?.role as string | undefined;
  const name = session?.user?.name || "";

  let items: SidebarItem[];
  if (role === "ADMIN") items = ADMIN_ITEMS;
  else if (role === "LIBRAIRE") items = LIBRAIRE_ITEMS;
  else items = VISITOR_ITEMS;

  return (
    <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r border-black/5 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-black/5 px-5 py-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-xl font-bold text-white">
            B
          </span>
          <div>
            <p className="text-base font-bold leading-tight text-heading">BookStore</p>
            <p className="text-xs font-medium text-ink/40">Métier de libraire</p>
          </div>
        </Link>
      </div>

      {/* User info */}
      <div className="border-b border-black/5 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-canvas text-lg">
            {roleIcon(role)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-heading">{name || "Visiteur"}</p>
            <p className="text-sm font-medium text-ink/50">{roleLabel(role)}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/" && item.href !== "/admin" && item.href !== "/libraire" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors",
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-heading hover:bg-black/5 hover:text-accent"
                )}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-black/5 px-3 py-4">
        {session ? (
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-red-500 transition-colors hover:bg-red-50"
          >
            <span className="text-lg">🚪</span>
            Déconnexion
          </button>
        ) : (
          <div className="space-y-2">
            <Link
              href="/connexion"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-heading transition-colors hover:bg-black/5 hover:text-accent"
            >
              <span className="text-lg">🔑</span>
              Connexion
            </Link>
            <Link
              href="/inscription"
              className="flex w-full items-center gap-3 rounded-lg bg-accent px-3 py-3 text-base font-semibold text-white transition-colors hover:bg-accent/90"
            >
              <span className="text-lg">✨</span>
              Inscription
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
