"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { NAV_CATEGORIES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";

function roleLabel(role?: string | null): string {
  return role === "ADMIN" ? "Administrateur" : "Visiteur";
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const { data: session } = useSession();
  const role = (session?.user as Record<string, unknown> | undefined)?.role as string | undefined;

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-md">
      <div className="page-container flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
            B
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold leading-tight text-heading">
              BookStore
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className={cn(
              "rounded-full px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/"
                ? "bg-accent/10 text-accent"
                : "text-ink/80 hover:bg-black/5 hover:text-accent"
            )}
          >
            Accueil
          </Link>

          {NAV_CATEGORIES.map((cat) => {
            const isActive = cat.items.some((item) => pathname === item.href);
            return (
              <div
                key={cat.label}
                className="relative"
                onMouseEnter={() => setActiveCat(cat.label)}
                onMouseLeave={() => setActiveCat(null)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-ink/80 hover:bg-black/5 hover:text-accent"
                  )}
                >
                  {cat.label}
                  <svg className={cn("h-3.5 w-3.5 transition-transform", activeCat === cat.label && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>

                {activeCat === cat.label && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="w-56 rounded-xl border border-black/5 bg-white p-2 shadow-lg">
                      {cat.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                            pathname === item.href
                              ? "bg-accent/10 text-accent"
                              : "text-ink/80 hover:bg-black/5 hover:text-accent"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/contact"
            className={cn(
              "rounded-full px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/contact"
                ? "bg-accent/10 text-accent"
                : "text-ink/80 hover:bg-black/5 hover:text-accent"
            )}
          >
            Contact
          </Link>

          <div className="ml-3 flex items-center gap-2 border-l border-black/10 pl-3">
            {session ? (
              <>
                <span className="hidden rounded-full bg-black/5 px-3 py-1.5 text-xs font-medium text-ink/60 md:inline-block">
                  {roleLabel(role)}
                </span>
                {role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="rounded-full px-3 py-2 text-sm font-medium text-ink/60 transition-colors hover:text-red-500"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/connexion"
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    pathname === "/connexion"
                      ? "bg-accent/10 text-accent"
                      : "text-ink/80 hover:bg-black/5 hover:text-accent"
                  )}
                >
                  Connexion
                </Link>
                <Link
                  href="/inscription"
                  className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-black/5 bg-white px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-lg px-4 py-3 text-sm font-medium",
                  pathname === "/"
                    ? "bg-accent/10 text-accent"
                    : "text-ink hover:bg-black/5"
                )}
              >
                Accueil
              </Link>
            </li>

            {NAV_CATEGORIES.map((cat) => (
              <li key={cat.label}>
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-ink/80 hover:bg-black/5">
                    {cat.label}
                    <svg className="h-3.5 w-3.5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <ul className="ml-4 mt-1 space-y-1 border-l-2 border-accent/20 pl-3">
                    {cat.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "block rounded-lg px-4 py-2.5 text-sm font-medium",
                            pathname === item.href
                              ? "bg-accent/10 text-accent"
                              : "text-ink/80 hover:bg-black/5"
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}

            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-lg px-4 py-3 text-sm font-medium",
                  pathname === "/contact"
                    ? "bg-accent/10 text-accent"
                    : "text-ink hover:bg-black/5"
                )}
              >
                Contact
              </Link>
            </li>

            <li className="mt-3 border-t border-black/5 pt-3">
              {session ? (
                <>
                  <div className="mb-2 text-center text-xs font-medium text-ink/60">
                    Connecté en tant que <span className="font-semibold text-accent">{roleLabel(role)}</span>
                  </div>
                  {role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="block rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white text-center"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => { setOpen(false); signOut(); }}
                    className="mt-1 block w-full rounded-lg px-4 py-3 text-sm font-medium text-red-500 text-center"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/connexion"
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-sm font-medium text-center",
                      pathname === "/connexion"
                        ? "bg-accent/10 text-accent"
                        : "text-ink hover:bg-black/5"
                    )}
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/inscription"
                    onClick={() => setOpen(false)}
                    className="mt-1 block rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white text-center"
                  >
                    Inscription
                  </Link>
                </>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
