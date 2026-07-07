const STEPS = [
  { n: "01", label: "Discover", detail: "Agent finds your endpoint via Bazaar, x402scan, or a direct URL." },
  { n: "02", label: "402", detail: "Server responds with payment terms — amount, network, asset." },
  { n: "03", label: "Sign", detail: "Client signs an EIP-3009 authorization. No funds move yet." },
  { n: "04", label: "Settle", detail: "Facilitator verifies and settles on Base. USDC moves peer-to-peer." },
  { n: "05", label: "Access", detail: "Server returns 200 with the resource. No accounts, no keys." },
];

export function FlowSteps() {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-5">
      {STEPS.map((step) => (
        <div key={step.n} className="bg-surface p-6">
          <div className="mb-6 font-mono text-xs text-settle">{step.n}</div>
          <div className="mb-2 text-sm font-medium text-ink">{step.label}</div>
          <p className="text-xs leading-relaxed text-muted">{step.detail}</p>
        </div>
      ))}
    </div>
  );
}
