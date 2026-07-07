import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resource APIs",
  description: "Pay-per-request APIs available on the Revnuvo network.",
};

const apis = [
  {
    name: "DNS Intelligence",
    path: "dns.revnuvo.site",
    price: "0.003 USDC",
    description: "DNS configuration, record health, and propagation checks.",
  },
  {
    name: "Trust API",
    path: "assess.revnuvo.site/trust",
    price: "0.005 USDC",
    description: "Composite trust scoring across domain age, reputation signals, and infrastructure.",
  },
  {
    name: "Domain Verification",
    path: "verify.revnuvo.site",
    price: "0.002 USDC",
    description: "Agent and domain identity verification backed by D1.",
  },
  {
    name: "Assessment",
    path: "assess.revnuvo.site/domain/assess",
    price: "0.005 USDC",
    description: "DNSSEC, SPF, and DMARC posture, scored 0–100.",
  },
];

export default function ApisPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="mb-3 text-3xl font-semibold tracking-tight text-ink">Resource APIs</h1>
      <p className="mb-10 max-w-xl text-base text-muted">
        Every API below is gated with x402 on Base mainnet. No API keys — pay
        per request in USDC and get a response.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {apis.map((api) => (
          <div key={api.name} className="rounded-lg border border-border bg-surface p-6">
            <div className="mb-3 flex items-start justify-between">
              <h3 className="text-sm font-medium text-ink">{api.name}</h3>
              <span className="font-mono text-xs text-settle">{api.price}</span>
            </div>
            <p className="mb-3 font-mono text-xs text-muted">{api.path}</p>
            <p className="text-sm text-muted">{api.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
