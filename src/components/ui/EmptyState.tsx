import { PackageOpen } from "lucide-react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background-secondary text-muted">
        <PackageOpen className="h-7 w-7" />
      </div>
      <h3 className="font-display text-xl">{title}</h3>
      {description && <p className="max-w-md text-foreground-secondary">{description}</p>}
      {action}
    </div>
  );
}
