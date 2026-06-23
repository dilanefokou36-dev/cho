import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants/routes";

export function Footer() {
  const mainLinks = NAV_ITEMS.filter((n) => n.href !== "/");

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#343434] text-white/80">
      <div className="page-container py-12">
        <div>
          <div>
            <p className="font-serif text-xl font-bold text-white">
              BookStore Business Core
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              Plateforme d&apos;information sur le métier de libraire.
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {mainLinks.slice(0, 9).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
