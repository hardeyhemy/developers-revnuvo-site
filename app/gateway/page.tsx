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
      <p className="mb-4 text-sm text-muted">
        The SDK (<span className="font-mono">@revnuvo/x402</span>) is client-side —
        it signs payments, it doesn't gate resource servers. To protect your own
        endpoint, call the gateway's <span className="font-mono">/quote</span>,{" "}
        <span className="font-mono">/verify</span>, and{" "}
        <span className="font-mono">/settle</span> directly, the same way
        Revnuvo's own Assess Worker does:
      </p>
      <div>
        <CodeBlock
          title="worker.ts"
          code={`const GATEWAY = "https://gateway.revnuvo.site";

export default {
  async fetch(req: Request) {
    const payment = req.headers.get("X-Payment");

    if (!payment) {
      // No payment yet — get a fresh signed quote and return it as the 402 body
      const quoteRes = await fetch(\`\${GATEWAY}/quote\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "/your-resource",
          maxAmountRequired: "50000", // atomic units
          payTo: "0xYourAddress",
          network: "eip155:8453",
          asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        }),
      });
      return new Response(await quoteRes.text(), { status: 402 });
    }

    const { quote, payment: signedPayment } = JSON.parse(atob(payment));

    const verifyRes = await fetch(\`\${GATEWAY}/verify\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote, payment: signedPayment }),
    });
    const { valid, receipt } = await verifyRes.json();
    if (!valid) return new Response("Payment invalid", { status: 402 });

    const settleRes = await fetch(\`\${GATEWAY}/settle\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receipt }),
    });
    if (!(await settleRes.json()).settled) {
      return new Response("Settlement failed", { status: 402 });
    }

    return new Response(JSON.stringify({ trust_score: 92 }));
  },
};`}
        />
      </div>
    </div>
  );
}
