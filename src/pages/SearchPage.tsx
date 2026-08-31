import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { patterns, products, artists, portfolios, courses } from "@/lib/data";
import { ProductCard } from "@/components/cards/ProductCard";
import { PatternCard } from "@/components/cards/PatternCard";
import { ArtistCard } from "@/components/cards/ArtistCard";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { CourseCard } from "@/components/cards/CourseCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { QuickView } from "@/components/cards/QuickView";
import type { Product } from "@/lib/data";

export function SearchPage() {
  const [params] = useSearchParams();
  const { t, lang } = useI18n();
  const [quick, setQuick] = useState<Product | null>(null);
  const q = (params.get("q") ?? "").toLowerCase().trim();

  if (!q) {
    return (
      <section className="py-20">
        <div className="container-page">
          <EmptyState title={t("nav.search")} description={t("empty.desc")} action={<Button to="/" variant="primary">{t("nav.home")}</Button>} />
        </div>
      </section>
    );
  }

  const matchText = (text: string) => text.toLowerCase().includes(q);
  const matchAny = (...texts: string[]) => texts.some(matchText);

  const pProducts = products.filter((p) => matchAny(p.name, p.nameFa, p.sku, p.category, p.material, p.style, p.color));
  const pPatterns = patterns.filter((p) => matchAny(p.name, p.nameFa, p.category, p.style, p.description));
  const pArtists = artists.filter((a) => matchAny(a.name, a.nameFa, a.profession, a.professionFa, a.bio));
  const pPortfolios = portfolios.filter((p) => matchAny(p.title, p.titleFa, p.category, p.overview));
  const pCourses = courses.filter((c) => matchAny(c.title, c.titleFa, c.category, c.overview));
  const total = pProducts.length + pPatterns.length + pArtists.length + pPortfolios.length + pCourses.length;

  return (
    <section className="py-12 lg:py-16">
      <div className="container-page">
        <div className="flex items-center gap-3">
          <SearchIcon className="h-5 w-5 text-muted" />
          <h1 className="font-display text-2xl md:text-3xl">"{params.get("q")}"</h1>
        </div>
        <p className="mt-2 text-sm text-muted">{total} {t("nav.search")} {lang === "fa" ? "نتیجه" : "results"}</p>

        {total === 0 ? (
          <EmptyState title={t("empty.title")} description={t("empty.desc")} action={<Button to="/" variant="outline">{t("nav.home")}</Button>} />
        ) : (
          <div className="mt-10 space-y-16">
            {pProducts.length > 0 && (
              <ResultSection label={t("nav.products")} count={pProducts.length}>
                    {pProducts.map((p) => <ProductCard key={p.slug} product={p} onQuickView={setQuick} />)}
              </ResultSection>
            )}
            {pPatterns.length > 0 && (
              <ResultSection label={t("nav.patterns")} count={pPatterns.length}>
                {pPatterns.map((p) => <PatternCard key={p.slug} pattern={p} />)}
              </ResultSection>
            )}
            {pArtists.length > 0 && (
              <ResultSection label={t("nav.artists")} count={pArtists.length}>
                {pArtists.map((a) => <ArtistCard key={a.slug} artist={a} />)}
              </ResultSection>
            )}
            {pPortfolios.length > 0 && (
              <ResultSection label={t("nav.portfolio")} count={pPortfolios.length}>
                {pPortfolios.map((p) => <PortfolioCard key={p.slug} portfolio={p} />)}
              </ResultSection>
            )}
            {pCourses.length > 0 && (
              <ResultSection label={t("nav.education")} count={pCourses.length}>
                {pCourses.map((c) => <CourseCard key={c.slug} course={c} />)}
              </ResultSection>
            )}
          </div>
        )}
      </div>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </section>
  );
}

function ResultSection({ label, count, children }: { label: string; count: number; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 border-b border-border pb-3">
        <h2 className="font-display text-xl">{label}</h2>
        <span className="rounded-full bg-background-secondary px-2.5 py-0.5 text-xs font-medium text-muted">{count}</span>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
    </div>
  );
}
