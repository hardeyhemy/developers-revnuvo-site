import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "Gateway",
  description: "The Revnuvo Gateway verifies, authorizes, and settles x402 payments on Base.",
};

const endpoints = [
  {
    method: "POST",
    path: "/verify",
    description: "Validates a signed payment authorization against the resource's price and network, without moving funds.",
  },
  {
    method: "POST",
    path: "/settle",
    description: "Submits the verified authorization on-chain. USDC transfers directly from buyer to seller.",
  },
];

export default function GatewayPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="mb-3 text-3xl font-semibold tracking-tight text-ink">Gateway</h1>
      <p className="mb-10 max-w-xl text-base text-muted">
        The Gateway is Revnuvo's facilitator — it verifies signatures, checks
        balances, and settles payments on Base. It never custodies funds; every
        transfer moves directly between buyer and seller wallets.
      </p>

      <h2 className="mb-4 text-lg font-medium text-ink">Endpoints</h2>
      <div className="mb-12 space-y-3">
        {endpoints.map((ep) => (
          <div key={ep.path} className="rounded-lg border border-border bg-surface p-5">
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded bg-settle/10 px-2 py-0.5 font-mono text-xs text-settle">
                {ep.method}
              </span>
              <span className="font-mono text-sm text-ink">{ep.path}</span>
            </div>
            <p className="text-sm text-muted">{ep.description}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-lg font-medium text-ink">Sequence</h2>
      <div className="mb-12">
        <CodeBlock
          title="verify → settle"
          code={`Client          Resource Server        Gateway            Base
  |  GET /resource     |                    |                |
  |-------------------->|                    |                |
  |  402 + terms        |                    |                |
  |<--------------------|                    |                |
  |  GET + X-Payment     |                    |                |
  |-------------------->|                    |                |
  |                     |  POST /verify       |                |
  |                     |------------------->|                |
  |                     |  valid: true        |                |
  |                     |<-------------------|                |
  |                     |  POST /settle       |                |
  |                     |------------------->|                |
  |                     |                    |  transferWithAuthorization
  |                     |                    |--------------->|
  |                     |                    |  confirmed      |
  |                     |                    |<---------------|
  |  200 + resource      |                    |                |
  |<--------------------|                    |                |`}
        />
      </div>

      <h2 className="mb-4 text-lg font-medium text-ink">Protecting an endpoint</h2>
      <div>
        <CodeBlock
          title="worker.ts"
          code={`import { requirePayment } from "@revnuvo/x402";

export default {
  async fetch(req: Request) {
    return requirePayment(req, {
      price: "0.005",
      asset: "USDC",
      network: "eip155:8453",
      gateway: "https://gateway.revnuvo.site",
    }, async () => {
      return new Response(JSON.stringify({ trust_score: 92 }));
    });
  },
};`}
        />
      </div>
    </div>
  );
}
