import { useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { getCategory, productsByCategory, categories, styles, type Product } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductCard } from "@/components/cards/ProductCard";
import { FilterBar, type SortOption } from "@/components/ui/FilterBar";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { QuickView } from "@/components/cards/QuickView";

const PER_PAGE = 8;

export function StoreCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useI18n();
  const [sort, setSort] = useState<SortOption>("featured");
  const [page, setPage] = useState(1);
  const [quick, setQuick] = useState<Product | null>(null);
  const [styleFilter, setStyleFilter] = useState<string>("");

  const category = slug ? getCategory(slug) : undefined;
  const validCategory = category ?? categories[0];

  const filtered = useMemo(() => {
    let list = productsByCategory(validCategory.slug);
    if (styleFilter) list = list.filter((p) => p.style === styleFilter);
    switch (sort) {
      case "priceLow": list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)); break;
      case "priceHigh": list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)); break;
      case "newest": list.sort((a, b) => Number(b.newArrival) - Number(a.newArrival)); break;
      case "popular": list.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return list;
  }, [validCategory.slug, styleFilter, sort]);

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const current = Math.min(page, pages || 1);
  const shown = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const relatedCategories = categories.filter((c) => c.slug !== validCategory.slug).slice(0, 4);

  if (!category) return <Navigate to="/store" replace />;

  return (
    <>
      <PageHeader eyebrow={t("store.categories")} title={lang === "fa" ? category.nameFa : category.name} subtitle={category.description} />
      <section className="py-12 lg:py-16">
        <div className="container-page">
          <div className="flex flex-wrap gap-3 pb-6">
            <select value={styleFilter} onChange={(e) => { setStyleFilter(e.target.value); setPage(1); }} className="rounded-full border border-border-strong bg-background px-4 py-2 text-sm outline-none focus:border-accent">
              <option value="">{t("filter.style")}</option>
              {styles.map((s) => <option key={s.slug} value={s.slug}>{lang === "fa" ? s.nameFa : s.name}</option>)}
            </select>
          </div>
          <FilterBar sort={sort} onSortChange={setSort} resultCount={filtered.length} />
          {shown.length === 0 ? (
            <EmptyState title={t("empty.title")} description={t("empty.desc")} action={<Button to={`/store/category/${category.slug}`} variant="outline">{t("filter.clear")}</Button>} />
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {shown.map((p) => <ProductCard key={p.slug} product={p} onQuickView={setQuick} />)}
            </div>
          )}
          <Pagination page={current} pages={pages} onChange={setPage} />

          {/* Related categories */}
          <div className="mt-20">
            <h2 className="font-display text-2xl">{t("store.categories")}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedCategories.map((c) => (
                <Link key={c.slug} to={`/store/category/${c.slug}`} className="group zoom-img relative aspect-[4/5] overflow-hidden rounded-xl border border-border">
                  <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 start-4 end-4">
                    <h3 className="font-display text-lg text-white">{lang === "fa" ? c.nameFa : c.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}
