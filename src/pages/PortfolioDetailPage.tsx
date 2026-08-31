import { useParams, Navigate } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getPortfolio, getArtist, getPattern, getProduct, type Product } from "@/lib/data";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/cards/ProductCard";
import { PatternCard } from "@/components/cards/PatternCard";
import { QuickView } from "@/components/cards/QuickView";

export function PortfolioDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useI18n();
  const [quick, setQuick] = useState<Product | null>(null);

  const portfolio = slug ? getPortfolio(slug) : undefined;
  if (!portfolio) return <Navigate to="/portfolio" replace />;

  const artist = getArtist(portfolio.artistSlug);
  const title = lang === "fa" ? portfolio.titleFa : portfolio.title;
  const overview = lang === "fa" ? portfolio.overviewFa : portfolio.overview;
  const story = lang === "fa" ? portfolio.storyFa : portfolio.story;
  const usedPatterns = portfolio.patternSlugs.map(getPattern).filter(Boolean);
  const usedProducts = portfolio.productSlugs.map(getProduct).filter(Boolean);

  return (
    <>
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={portfolio.cover} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="container-page absolute inset-x-0 bottom-0 pb-10">
          <span className="text-sm text-white/70">{portfolio.category}</span>
          <h1 className="mt-2 font-display text-3xl text-white md:text-5xl">{title}</h1>
          <div className="mt-3 flex items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{portfolio.location}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{portfolio.year}</span>
          </div>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-page max-w-3xl">
          {/* Overview */}
          <div>
            <h2 className="font-display text-2xl">{t("label.overview")}</h2>
            <p className="mt-4 text-lg text-foreground-secondary text-pretty leading-relaxed">{overview}</p>
          </div>

          {/* Gallery */}
          {portfolio.gallery.length > 1 && (
            <div className="mt-12 grid gap-4">
              {portfolio.gallery.map((img, i) => (
                <div key={i} className="zoom-img aspect-[16/10] overflow-hidden rounded-xl border border-border">
                  <img src={img} alt={`${title} ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Story */}
          <div className="mt-12">
            <h2 className="font-display text-2xl">{t("label.story")}</h2>
            <p className="mt-4 text-foreground-secondary text-pretty leading-relaxed">{story}</p>
          </div>

          {/* Creator */}
          {artist && (
            <div className="mt-12 surface-card p-6 flex items-center gap-4">
              <img src={artist.avatar} alt={artist.name} className="h-16 w-16 rounded-full object-cover border border-border" />
              <div className="flex-1">
                <h3 className="font-medium">{lang === "fa" ? artist.nameFa : artist.name}</h3>
                <p className="text-sm text-muted">{lang === "fa" ? artist.professionFa : artist.profession}</p>
              </div>
              <Button to={`/artists/${artist.slug}`} variant="outline" size="sm">{t("action.viewArtist")}</Button>
            </div>
          )}
        </div>

        {/* Patterns used */}
        {usedPatterns.length > 0 && (
          <div className="container-page mt-20">
            <h2 className="font-display text-2xl">{t("label.patternsUsed")}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {usedPatterns.map((p) => p && <PatternCard key={p.slug} pattern={p} />)}
            </div>
          </div>
        )}

        {/* Products used */}
        {usedProducts.length > 0 && (
          <div className="container-page mt-20">
            <h2 className="font-display text-2xl">{t("label.productsUsed")}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {usedProducts.map((p) => p && <ProductCard key={p.slug} product={p} onQuickView={setQuick} />)}
            </div>
          </div>
        )}
      </section>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}
