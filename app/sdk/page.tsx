import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { VersionBadge, GitHubCard, NpmCard } from "@/components/ecosystem-cards";

export const metadata: Metadata = {
  title: "SDK",
  description: "The Revnuvo x402 SDK — generate and verify EIP-3009 payment authorizations in TypeScript.",
};

export default function SdkPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="mb-3 flex items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">
          @revnuvo/x402
        </h1>
        <VersionBadge version="0.1.1" />
      </div>
      <p className="mb-10 max-w-xl text-base text-muted">
        A client-side TypeScript SDK for the x402 payment protocol. Generate
        EIP-3009 <span className="font-mono text-sm">ReceiveWithAuthorization</span> payloads,
        handle the 402 → sign → retry flow, and settle payments on Base — without
        touching raw signatures.
      </p>

      <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <GitHubCard repo="hardeyhemy/revnuvo-x402-sdk" />
        <NpmCard pkg="@revnuvo/x402" />
      </div>

      <h2 className="mb-4 text-lg font-medium text-ink">Installation</h2>
      <div className="mb-10">
        <CodeBlock code="npm install @revnuvo/x402" />
      </div>

      <h2 className="mb-4 text-lg font-medium text-ink">Quick start</h2>
      <div className="mb-10">
        <CodeBlock
          title="index.ts"
          code={`import { wrapFetchWithPayment } from "@revnuvo/x402";
import { privateKeyToAccount } from "viem/accounts";

const signer = privateKeyToAccount(process.env.EVM_PRIVATE_KEY as \`0x\${string}\`);
const fetchWithPayment = wrapFetchWithPayment(fetch, { signer });

const res = await fetchWithPayment("https://assess.revnuvo.site/domain/assess", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ domain: "example.com" }),
});

const data = await res.json();
console.log(data.trust_score);`}
        />
      </div>

      <h2 className="mb-4 text-lg font-medium text-ink">Verify a payment (server side)</h2>
      <div className="mb-10">
        <CodeBlock
          title="worker.ts"
          code={`import { verifyPayment } from "@revnuvo/x402";

export default {
  async fetch(req: Request) {
    const result = await verifyPayment(req, {
      network: "eip155:8453",
      asset: "USDC",
      amount: "0.005",
    });

    if (!result.valid) {
      return new Response(JSON.stringify(result.paymentRequirements), {
        status: 402,
      });
    }

    return new Response(JSON.stringify({ trust_score: 92, grade: "A" }));
  },
};`}
        />
      </div>

      <h2 className="mb-4 text-lg font-medium text-ink">Release notes</h2>
      <div className="rounded-lg border border-border bg-surface p-5 text-sm text-muted">
        <p className="mb-1 font-mono text-ink">v0.1.1</p>
        <p>x402 v2 payment flow support, LangChain tool wrapper, Base mainnet USDC settlement.</p>
      </div>
    </div>
  );
}
