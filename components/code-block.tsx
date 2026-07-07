export function CodeBlock({
  title,
  code,
}: {
  title?: string;
  code: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      {title && (
        <div className="border-b border-border px-4 py-2 font-mono text-xs text-muted">
          {title}
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-4 font-mono text-sm leading-relaxed text-ink/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}
