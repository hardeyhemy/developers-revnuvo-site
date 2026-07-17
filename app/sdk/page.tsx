import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { VersionBadge, GitHubCard, NpmCard } from "@/components/ecosystem-cards";

export const metadata: Metadata = {
  title: "SDK",
  description: "The Revnuvo x402 SDK — sign EIP-3009 payment authorizations in TypeScript.",
};

export default function SdkPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="mb-3 flex items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">
          @revnuvo/x402
        </h1>
        <VersionBadge version="0.1.4" />
      </div>
      <p className="mb-10 max-w-xl text-base text-muted">
        A client-side TypeScript SDK for the x402 payment protocol. Signs
        EIP-3009 <span className="font-mono text-sm">TransferWithAuthorization</span> payloads
        and builds the exact <span className="font-mono text-sm">X-Payment</span> header
        Revnuvo's gateway expects — without touching raw signatures.
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
      <p className="mb-4 text-sm text-muted">
        Request a resource, get a 402 challenge, sign it, and retry — end to end:
      </p>
      <div className="mb-10">
        <CodeBlock
          title="index.ts"
          code={`import { buildXPaymentHeader } from "@revnuvo/x402";

const RESOURCE = "https://assess.revnuvo.site/assess/domain";
const privateKey = process.env.PRIVATE_KEY as \`0x\${string}\`;

// 1. Request the resource — no payment yet
const quoteRes = await fetch(RESOURCE, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ domain: "example.com" }),
});

// 2. Get the 402 challenge, sign it
const challenge = await quoteRes.json();
const xPaymentHeader = await buildXPaymentHeader({ challenge, privateKey });

// 3. Retry with the signed payment
const paidRes = await fetch(RESOURCE, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Payment": xPaymentHeader,
  },
  body: JSON.stringify({ domain: "example.com" }),
});

const data = await paidRes.json();
console.log(data.trust_score);`}
        />
      </div>

      <h2 className="mb-4 text-lg font-medium text-ink">Lower-level: sign a payment directly</h2>
      <p className="mb-4 text-sm text-muted">
        If you need the raw signed authorization instead of a ready-to-send header:
      </p>
      <div className="mb-10">
        <CodeBlock
          title="sign.ts"
          code={`import { signPayment } from "@revnuvo/x402";

const { domain, message, signature } = await signPayment({
  privateKey: process.env.PRIVATE_KEY as \`0x\${string}\`,
  chainId: 8453,
  usdc: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  payTo: "0x2aaD494F3f2f3f30E464cB84442924d764f19CE7",
  amount: 50000n, // atomic units — 0.05 USDC at 6 decimals
});`}
        />
      </div>

      <h2 className="mb-4 text-lg font-medium text-ink">Class-based API</h2>
      <p className="mb-4 text-sm text-muted">
        <span className="font-mono text-sm">X402Client</span> wraps the same flow if you
        prefer a stateful client over calling functions directly:
      </p>
      <div className="mb-10">
        <CodeBlock
          title="client.ts"
          code={`import { X402Client } from "@revnuvo/x402";

const client = new X402Client({ privateKey: process.env.PRIVATE_KEY as \`0x\${string}\` });
const data = await client.pay("https://assess.revnuvo.site/assess/domain", {
  domain: "example.com",
});`}
        />
      </div>

      <h2 className="mb-4 text-lg font-medium text-ink">Release notes</h2>
      <div className="rounded-lg border border-border bg-surface p-5 text-sm text-muted">
        <p className="mb-1 font-mono text-ink">v0.1.4</p>
        <p className="mb-3">
          Corrects <span className="font-mono">buildXPaymentHeader</span> and{" "}
          <span className="font-mono">X402Client</span> to sign with{" "}
          <span className="font-mono">TransferWithAuthorization</span>, matching the
          gateway's on-chain settlement call. v0.1.3 fixed this only for{" "}
          <span className="font-mono">signPayment</span> — the other two export
          paths still signed with the wrong type and would fail at settlement.
          If you installed <span className="font-mono">0.1.3</span>, upgrade to{" "}
          <span className="font-mono">0.1.4</span>.
        </p>
        <p className="font-mono text-ink">v0.1.3</p>
        <p>
          Partial fix — corrected <span className="font-mono">signPayment</span> only.
        </p>
      </div>
    </div>
  );
}
