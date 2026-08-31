import type { ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";

export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  delay?: number;
}) {
  const ref = useReveal<HTMLDivElement>({ delay });
  return (
    <Tag ref={ref as never} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
