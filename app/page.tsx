import Link from "next/link";
import { Zap, ShieldCheck, Cloud, Bot, Code2, Unlock } from "lucide-react";
import { ExchangeLedger } from "@/components/exchange-ledger";
import { FeatureCard } from "@/components/feature-card";
import { FlowSteps } from "@/components/flow-steps";
import { CodeBlock } from "@/components/code-block";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="grain border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-settle" />
              Live on Base mainnet
            </div>
            <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
              Programmable payments
              <br />
              for AI agents.
            </h1>
            <p className="mb-8 max-w-md text-base leading-relaxed text-muted">
              Every request can carry a payment. Revnuvo turns any API into a
              pay-per-use resource — no API keys, no accounts, no invoices.
              Just an HTTP 402 and a signed authorization, settled in USDC on Base.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/docs"
                className="rounded-md bg-settle px-5 py-2.5 text-sm font-medium text-base transition-opacity hover:opacity-90"
              >
                Get started
              </Link>
              <Link
                href="/sdk"
                className="rounded-md border border-border px-5 py-2.5 text-sm text-ink transition-colors hover:border-settle/40"
              >
                View SDK
              </Link>
              <Link
                href="/apis"
                className="rounded-md border border-border px-5 py-2.5 text-sm text-ink transition-colors hover:border-settle/40"
              >
                Explore APIs
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <ExchangeLedger />
          </div>
        </div>
      </section>

      {/* Architecture / flow */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10">
            <h2 className="mb-3 text-2xl font-semibold tracking-tight text-ink">
              How a payment settles
            </h2>
            <p className="max-w-lg text-sm text-muted">
              Five steps, every time. The protocol never deviates from this
              sequence — which is exactly what makes it safe for an agent to
              automate.
            </p>
          </div>
          <FlowSteps />
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-10 text-2xl font-semibold tracking-tight text-ink">
            Built for the agentic web
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Zap}
              title="Pay-per-request"
              description="Price every endpoint independently. No tiers, no rate-limit haggling, no monthly minimums."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="USDC on Base"
              description="Settlement in stablecoin, confirmed on-chain in seconds. No custodial risk to your buyers."
            />
            <FeatureCard
              icon={Cloud}
              title="Cloudflare native"
              description="Deployed on Workers at the edge. Low latency, global by default."
            />
            <FeatureCard
              icon={Bot}
              title="Agent-ready"
              description="Discoverable via the Bazaar, x402scan, and Agentic Market. Built for autonomous callers."
            />
            <FeatureCard
              icon={Code2}
              title="TypeScript SDK"
              description="Generate and verify EIP-3009 authorizations without touching raw signatures."
            />
            <FeatureCard
              icon={Unlock}
              title="Open protocol"
              description="x402 is an open standard. No vendor lock-in, no proprietary payment rail."
            />
          </div>
        </div>
      </section>

      {/* Quick start */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-3 text-2xl font-semibold tracking-tight text-ink">
            Start in one install
          </h2>
          <p className="mb-8 max-w-lg text-sm text-muted">
            Add the SDK, generate an authorization, and make your first paid
            request.
          </p>
          <CodeBlock
            title="terminal"
            code={`npm install @revnuvo/x402

import { createAuthorization } from "@revnuvo/x402";

const res = await createAuthorization({
  endpoint: "https://assess.revnuvo.site/domain/assess",
  domain: "example.com",
});

console.log(res.trust_score);`}
          />
        </div>
      </section>
    </>
  );
}
