import { SlidersHorizontal, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export type SortOption = "featured" | "priceLow" | "priceHigh" | "newest" | "popular";

export function FilterBar({
  sort,
  onSortChange,
  resultCount,
  children,
}: {
  sort: SortOption;
  onSortChange: (s: SortOption) => void;
  resultCount: number;
  children?: React.ReactNode;
}) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col gap-4 border-b border-[#d2d2d7]/60 pb-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-2.5">
        <SlidersHorizontal className="h-3.5 w-3.5 text-muted" />
        <span className="text-[13px] text-muted tabular-nums">
          {resultCount} {resultCount === 1 ? "item" : "items"}
        </span>
      </div>
      <div className="flex items-center gap-3">
        {children}
        <label className="flex items-center gap-2 text-[13px]">
          <span className="text-muted">{t("sort.title")}:</span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="rounded-full border border-[#d2d2d7] bg-white px-3 py-1.5 text-[13px] outline-none focus:border-foreground transition-colors cursor-pointer"
          >
            <option value="featured">{t("sort.featured")}</option>
            <option value="priceLow">{t("sort.priceLow")}</option>
            <option value="priceHigh">{t("sort.priceHigh")}</option>
            <option value="newest">{t("sort.newest")}</option>
            <option value="popular">{t("sort.popular")}</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export function FilterChips({
  active,
}: {
  active: { label: string; onClear: () => void }[];
}) {
  if (active.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 pt-4">
      {active.map((f, i) => (
        <button
          key={i}
          onClick={f.onClear}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#d2d2d7] bg-white px-3 py-1.5 text-[12px] font-medium text-foreground-secondary hover:border-foreground hover:text-foreground transition-colors"
        >
          {f.label}
          <X className="h-3 w-3 opacity-60" />
        </button>
      ))}
    </div>
  );
}
