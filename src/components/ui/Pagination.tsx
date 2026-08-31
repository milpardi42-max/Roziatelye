import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Pagination({
  page,
  pages,
  onChange,
}: {
  page: number;
  pages: number;
  onChange: (p: number) => void;
}) {
  const { t, dir } = useI18n();
  if (pages <= 1) return null;
  const Prev = dir === "rtl" ? ChevronRight : ChevronLeft;
  const Next = dir === "rtl" ? ChevronLeft : ChevronRight;

  const range: (number | "...")[] = [];
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || (i >= page - 1 && i <= page + 1)) {
      range.push(i);
    } else if (range[range.length - 1] !== "...") {
      range.push("...");
    }
  }

  return (
    <nav className="flex items-center justify-center gap-1.5 pt-14" aria-label={t("pagination.page")}>
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d2d2d7] text-foreground-secondary hover:bg-background-secondary hover:text-foreground disabled:opacity-30 transition-colors"
        aria-label={t("pagination.prev")}
      >
        <Prev className="h-3.5 w-3.5" />
      </button>
      {range.map((r, i) =>
        r === "..." ? (
          <span key={i} className="px-2 text-muted text-sm">…</span>
        ) : (
          <button
            key={i}
            onClick={() => onChange(r)}
            className={`flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-[13px] font-medium transition-colors ${
              r === page
                ? "bg-foreground text-white"
                : "border border-[#d2d2d7] text-foreground-secondary hover:bg-background-secondary hover:text-foreground"
            }`}
          >
            {r}
          </button>
        ),
      )}
      <button
        onClick={() => onChange(Math.min(pages, page + 1))}
        disabled={page === pages}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d2d2d7] text-foreground-secondary hover:bg-background-secondary hover:text-foreground disabled:opacity-30 transition-colors"
        aria-label={t("pagination.next")}
      >
        <Next className="h-3.5 w-3.5" />
      </button>
    </nav>
  );
}
