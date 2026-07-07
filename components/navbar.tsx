import Link from "next/link";
import { Github } from "lucide-react";

const links = [
  { href: "/sdk", label: "SDK" },
  { href: "/gateway", label: "Gateway" },
  { href: "/apis", label: "Resource APIs" },
  { href: "/docs", label: "Docs" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-base/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono text-sm text-settle">402</span>
          <span className="font-semibold tracking-tight text-ink">Revnuvo</span>
          <span className="text-muted">/ developers</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://github.com/hardeyhemy/revnuvo-x402-sdk"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-ink transition-colors hover:border-settle hover:text-settle"
        >
          <Github size={16} />
          GitHub
        </a>
      </div>
    </header>
  );
}
