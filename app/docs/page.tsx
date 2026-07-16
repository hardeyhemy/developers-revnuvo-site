import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Getting started with Revnuvo — install the SDK, protect an API, and deploy to Cloudflare Workers.",
};

const sidebar = [
  {
    section: "Getting started",
    items: ["Install the SDK", "Create an authorization", "Verify a payment", "Settle a payment"],
  },
  {
    section: "Guides",
    items: ["Protect an API", "Deploy a Cloudflare Worker"],
  },
  {
    section: "Reference",
    items: ["MCP server", "Examples"],
  },
];

export default function DocsPage() {
  return (
    <div className="mx-auto flex max-w-6xl gap-12 px-6 py-20">
      <aside className="hidden w-56 shrink-0 md:block">
        <nav className="sticky top-24 space-y-8">
          {sidebar.map((group) => (
            <div key={group.section}>
              <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
                {group.section}
              </h4>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="text-sm text-muted transition-colors hover:text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <h1 id="getting-started" className="mb-3 text-3xl font-semibold tracking-tight text-ink">
          Getting started
        </h1>
        <p className="mb-10 max-w-xl text-base text-muted">
          Everything you need to accept or make your first x402 payment on
          Revnuvo.
        </p>

        <section className="mb-12">
          <h2 className="mb-4 text-lg font-medium text-ink">1. Install the SDK</h2>
          <CodeBlock code="npm install @revnuvo/x402" />
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-lg font-medium text-ink">2. Make your first paid request</h2>
          <CodeBlock
            code={`import { buildXPaymentHeader } from "@revnuvo/x402";

const res = await fetch("https://assess.revnuvo.site/assess/domain", {
  method: "POST",
  body: JSON.stringify({ domain: "example.com" }),
});
const challenge = await res.json(); // 402 with a signed quote

const xPaymentHeader = await buildXPaymentHeader({ challenge, privateKey });
// retry the same request with X-Payment: xPaymentHeader`}
          />
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-lg font-medium text-ink">3. Protect your own API</h2>
          <p className="mb-4 text-sm text-muted">
            See the <a href="/gateway" className="text-settle hover:underline">Gateway</a> page
            for the full request/settlement sequence.
          </p>
        </section>

        <section id="examples" className="mb-4">
          <h2 className="mb-4 text-lg font-medium text-ink">Examples</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {["Cloudflare Worker", "Node.js", "Next.js API route", "Express middleware"].map(
              (ex) => (
                <div
                  key={ex}
                  className="rounded-lg border border-border bg-surface p-4 text-sm text-muted"
                >
                  {ex}
                  <span className="ml-2 rounded bg-pending/10 px-1.5 py-0.5 font-mono text-xs text-pending">
                    coming soon
                  </span>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
