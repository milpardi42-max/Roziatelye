import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function SectionHeader({
  eyebrow,
  title,
  description,
  viewAllTo,
  viewAllLabel,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  viewAllTo?: string;
  viewAllLabel?: string;
}) {
  const { dir } = useI18n();
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-xl">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 className="font-display text-[2rem] text-balance leading-[1.06] md:text-[2.5rem] lg:text-[3rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-foreground-secondary text-pretty text-[15px] leading-relaxed md:text-base">
            {description}
          </p>
        )}
      </div>
      {viewAllTo && viewAllLabel && (
        <Link
          to={viewAllTo}
          className="group inline-flex shrink-0 items-center gap-2 text-[13px] font-medium text-foreground-secondary transition-colors hover:text-foreground"
        >
          {viewAllLabel}
          <span
            className={`transition-transform duration-300 ${
              dir === "rtl"
                ? "group-hover:-translate-x-1 rotate-180"
                : "group-hover:translate-x-1"
            }`}
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      )}
    </div>
  );
}
