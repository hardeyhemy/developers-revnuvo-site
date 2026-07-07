import { Github, Package } from "lucide-react";

export function VersionBadge({ version }: { version: string }) {
  return (
    <span className="rounded-full border border-settle/30 bg-settle/10 px-2.5 py-1 font-mono text-xs text-settle">
      v{version}
    </span>
  );
}

export function GitHubCard({ repo }: { repo: string }) {
  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between rounded-lg border border-border bg-surface p-4 transition-colors hover:border-settle/40"
    >
      <div className="flex items-center gap-3">
        <Github size={18} className="text-ink" />
        <span className="font-mono text-sm text-ink">{repo}</span>
      </div>
      <span className="text-xs text-muted">→</span>
    </a>
  );
}

export function NpmCard({ pkg }: { pkg: string }) {
  return (
    <a
      href={`https://www.npmjs.com/package/${pkg}`}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between rounded-lg border border-border bg-surface p-4 transition-colors hover:border-settle/40"
    >
      <div className="flex items-center gap-3">
        <Package size={18} className="text-pending" />
        <span className="font-mono text-sm text-ink">{pkg}</span>
      </div>
      <span className="text-xs text-muted">→</span>
    </a>
  );
}
