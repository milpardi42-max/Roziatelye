import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { products, categories, styles } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductCard } from "@/components/cards/ProductCard";
import { FilterBar, FilterChips, type SortOption } from "@/components/ui/FilterBar";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { QuickView } from "@/components/cards/QuickView";
import type { Product } from "@/lib/data";

const PER_PAGE = 8;

export function ProductsPage() {
  const { t, lang } = useI18n();
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState<SortOption>("featured");
  const [page, setPage] = useState(1);
  const [quick, setQuick] = useState<Product | null>(null);

  const styleFilter = params.get("style");
  const categoryFilter = params.get("category");
  const exclusiveFilter = params.get("exclusive") === "1";

  const filtered = useMemo(() => {
    let list = [...products];
    if (styleFilter) list = list.filter((p) => p.style === styleFilter);
    if (categoryFilter) list = list.filter((p) => p.category === categoryFilter);
    if (exclusiveFilter) list = list.filter((p) => p.exclusive);
    switch (sort) {
      case "priceLow": list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)); break;
      case "priceHigh": list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)); break;
      case "newest": list.sort((a, b) => Number(b.newArrival) - Number(a.newArrival)); break;
      case "popular": list.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return list;
  }, [styleFilter, categoryFilter, exclusiveFilter, sort]);

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const current = Math.min(page, pages || 1);
  const shown = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const activeChips: { label: string; onClear: () => void }[] = [];
  if (styleFilter) {
    const s = styles.find((x) => x.slug === styleFilter);
    activeChips.push({ label: `${t("filter.style")}: ${s ? (lang === "fa" ? s.nameFa : s.name) : styleFilter}`, onClear: () => { const p = new URLSearchParams(params); p.delete("style"); setParams(p); setPage(1); } });
  }
  if (categoryFilter) {
    const c = categories.find((x) => x.slug === categoryFilter);
    activeChips.push({ label: `${t("filter.category")}: ${c ? (lang === "fa" ? c.nameFa : c.name) : categoryFilter}`, onClear: () => { const p = new URLSearchParams(params); p.delete("category"); setParams(p); setPage(1); } });
  }
  if (exclusiveFilter) activeChips.push({ label: "Exclusive", onClear: () => { const p = new URLSearchParams(params); p.delete("exclusive"); setParams(p); setPage(1); } });

  return (
    <>
      <PageHeader eyebrow={t("section.products.eyebrow")} title={t("section.products.title")} />
      <section className="py-12 lg:py-16">
        <div className="container-page">
          <div className="flex flex-wrap gap-2.5 pb-6">
            <select
              value={categoryFilter ?? ""}
              onChange={(e) => { const p = new URLSearchParams(params); if (e.target.value) p.set("category", e.target.value); else p.delete("category"); setParams(p); setPage(1); }}
              className="rounded-full border border-[#d2d2d7] bg-white px-4 py-2 text-[13px] outline-none focus:border-foreground transition-colors cursor-pointer"
            >
              <option value="">{t("filter.category")}</option>
              {categories.map((c) => <option key={c.slug} value={c.slug}>{lang === "fa" ? c.nameFa : c.name}</option>)}
            </select>
            <select
              value={styleFilter ?? ""}
              onChange={(e) => { const p = new URLSearchParams(params); if (e.target.value) p.set("style", e.target.value); else p.delete("style"); setParams(p); setPage(1); }}
              className="rounded-full border border-[#d2d2d7] bg-white px-4 py-2 text-[13px] outline-none focus:border-foreground transition-colors cursor-pointer"
            >
              <option value="">{t("filter.style")}</option>
              {styles.map((s) => <option key={s.slug} value={s.slug}>{lang === "fa" ? s.nameFa : s.name}</option>)}
            </select>
          </div>
          <FilterBar sort={sort} onSortChange={setSort} resultCount={filtered.length} />
          <FilterChips active={activeChips} />
          {shown.length === 0 ? (
            <EmptyState title={t("empty.title")} description={t("empty.desc")} action={<Button to="/products" variant="outline">{t("filter.clear")}</Button>} />
          ) : (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {shown.map((p) => <ProductCard key={p.slug} product={p} onQuickView={setQuick} />)}
            </div>
          )}
          <Pagination page={current} pages={pages} onChange={setPage} />
        </div>
      </section>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}
