import Link from "next/link";

const columns = [
  {
    title: "Build",
    links: [
      { href: "/sdk", label: "SDK" },
      { href: "/gateway", label: "Gateway" },
      { href: "/apis", label: "Resource APIs" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/docs#getting-started", label: "Getting started" },
      { href: "/docs#examples", label: "Examples" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { href: "https://www.npmjs.com/package/@revnuvo/x402", label: "npm" },
      { href: "https://github.com/hardeyhemy/revnuvo-x402-sdk", label: "GitHub" },
      { href: "https://x402.org", label: "x402 protocol" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="font-mono text-sm text-settle">402</span>
              <span className="font-semibold text-ink">Revnuvo</span>
            </div>
            <p className="max-w-xs text-sm text-muted">
              Pay-per-request infrastructure for AI agents. Settled in USDC on Base.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-medium text-ink">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-settle"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Revnuvo Technologies</span>
          <span className="font-mono">eip155:8453 · USDC</span>
        </div>
      </div>
    </footer>
  );
}
