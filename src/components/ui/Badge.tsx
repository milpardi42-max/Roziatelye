import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "success" | "warning" | "error" | "slate";

const tones: Record<Tone, string> = {
  neutral: "bg-background-secondary text-foreground-secondary border-[#d2d2d7]",
  accent: "bg-accent-soft text-accent-foreground border-accent/15",
  success: "bg-success-soft text-success border-success/15",
  warning: "bg-warning-soft text-warning border-warning/15",
  error: "bg-error-soft text-error border-error/15",
  slate: "bg-slate-blue-soft text-slate-blue border-slate-blue/15",
};

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-[3px] text-[11px] font-medium tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
