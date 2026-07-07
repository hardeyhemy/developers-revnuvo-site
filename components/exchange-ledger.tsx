"use client";

import { useEffect, useState } from "react";

const STEPS = [
  {
    label: "REQUEST",
    color: "text-muted",
    lines: [
      "GET /domain/assess HTTP/1.1",
      "Host: assess.revnuvo.site",
      'Body: {"domain":"example.com"}',
    ],
  },
  {
    label: "402 PAYMENT REQUIRED",
    color: "text-pending",
    lines: [
      "HTTP/1.1 402 Payment Required",
      "Network: eip155:8453 (Base)",
      "Amount: 0.005 USDC",
    ],
  },
  {
    label: "SIGN + RETRY",
    color: "text-muted",
    lines: [
      "GET /domain/assess HTTP/1.1",
      "X-Payment: eyJhbGciOi...signed",
      "Scheme: exact",
    ],
  },
  {
    label: "200 SETTLED",
    color: "text-settle",
    lines: [
      "HTTP/1.1 200 OK",
      "Payment-Response: settled",
      '{"trust_score":92,"grade":"A"}',
    ],
  },
];

export function ExchangeLedger() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % STEPS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const current = STEPS[step];

  return (
    <div className="w-full max-w-md rounded-lg border border-border bg-surface font-mono text-sm shadow-2xl">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-pending/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-settle/60" />
        <span className="ml-2 text-xs text-muted">assess.revnuvo.site</span>
      </div>
      <div className="px-4 py-5">
        <div className={`mb-3 text-xs font-medium tracking-wide ${current.color}`}>
          {current.label}
        </div>
        <div className="space-y-1.5">
          {current.lines.map((line, i) => (
            <div key={i} className="truncate text-ink/80">
              {line}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-1 text-muted">
          <span>$</span>
          <span className="h-4 w-2 bg-ink/60 animate-blink" />
        </div>
      </div>
      <div className="flex border-t border-border">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 transition-colors duration-300 ${
              i === step ? "bg-settle" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
