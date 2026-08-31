import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { patterns, categories, styles } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { PatternCard } from "@/components/cards/PatternCard";
import { FilterBar, FilterChips, type SortOption } from "@/components/ui/FilterBar";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

const PER_PAGE = 8;

export function PatternsPage() {
  const { t, lang } = useI18n();
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState<SortOption>("featured");
  const [page, setPage] = useState(1);

  const styleFilter = params.get("style");
  const categoryFilter = params.get("category");

  const filtered = useMemo(() => {
    let list = [...patterns];
    if (styleFilter) list = list.filter((p) => p.style === styleFilter);
    if (categoryFilter) list = list.filter((p) => p.category === categoryFilter);
    switch (sort) {
      case "priceLow": list.sort((a, b) => a.price - b.price); break;
      case "priceHigh": list.sort((a, b) => b.price - a.price); break;
      case "popular": list.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller)); break;
      case "newest": list.reverse(); break;
    }
    return list;
  }, [styleFilter, categoryFilter, sort]);

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const current = Math.min(page, pages || 1);
  const shown = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const activeChips: { label: string; onClear: () => void }[] = [];
  if (styleFilter) {
    const s = styles.find((x) => x.slug === styleFilter);
    activeChips.push({
      label: `${t("filter.style")}: ${s ? (lang === "fa" ? s.nameFa : s.name) : styleFilter}`,
      onClear: () => { const p = new URLSearchParams(params); p.delete("style"); setParams(p); setPage(1); },
    });
  }
  if (categoryFilter) {
    const c = categories.find((x) => x.slug === categoryFilter);
    activeChips.push({
      label: `${t("filter.category")}: ${c ? (lang === "fa" ? c.nameFa : c.name) : categoryFilter}`,
      onClear: () => { const p = new URLSearchParams(params); p.delete("category"); setParams(p); setPage(1); },
    });
  }

  return (
    <>
      <PageHeader
        eyebrow={t("section.patterns.eyebrow")}
        title={t("section.patterns.title")}
        subtitle={t("section.patterns.desc")}
      />
      <section className="py-12 lg:py-16">
        <div className="container-page">
          {/* Filter row */}
          <div className="flex flex-wrap gap-2.5 pb-6">
            <select
              value={categoryFilter ?? ""}
              onChange={(e) => { const p = new URLSearchParams(params); if (e.target.value) p.set("category", e.target.value); else p.delete("category"); setParams(p); setPage(1); }}
              className="rounded-full border border-[#d2d2d7] bg-white px-4 py-2 text-[13px] outline-none focus:border-foreground transition-colors cursor-pointer"
            >
              <option value="">{t("filter.category")}</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{lang === "fa" ? c.nameFa : c.name}</option>
              ))}
            </select>
            <select
              value={styleFilter ?? ""}
              onChange={(e) => { const p = new URLSearchParams(params); if (e.target.value) p.set("style", e.target.value); else p.delete("style"); setParams(p); setPage(1); }}
              className="rounded-full border border-[#d2d2d7] bg-white px-4 py-2 text-[13px] outline-none focus:border-foreground transition-colors cursor-pointer"
            >
              <option value="">{t("filter.style")}</option>
              {styles.map((s) => (
                <option key={s.slug} value={s.slug}>{lang === "fa" ? s.nameFa : s.name}</option>
              ))}
            </select>
          </div>

          <FilterBar sort={sort} onSortChange={setSort} resultCount={filtered.length} />
          <FilterChips active={activeChips} />

          {shown.length === 0 ? (
            <EmptyState
              title={t("empty.title")}
              description={t("empty.desc")}
              action={<Button to="/patterns" variant="outline">{t("filter.clear")}</Button>}
            />
          ) : (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {shown.map((p) => (
                <PatternCard key={p.slug} pattern={p} />
              ))}
            </div>
          )}

          <Pagination page={current} pages={pages} onChange={setPage} />
        </div>
      </section>
    </>
  );
}
