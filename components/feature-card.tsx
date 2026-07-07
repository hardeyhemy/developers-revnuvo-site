import { type LucideIcon } from "lucide-react";

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-lg border border-border bg-surface p-6 transition-colors hover:border-settle/40">
      <Icon size={20} className="mb-4 text-settle" strokeWidth={1.75} />
      <h3 className="mb-2 text-sm font-medium text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
