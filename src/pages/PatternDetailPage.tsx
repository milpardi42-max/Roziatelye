import { useParams, Link, Navigate } from "react-router-dom";
import { Heart, Share2, Palette } from "lucide-react";
import { useState } from "react";
import { useI18n, useCurrency } from "@/lib/i18n";
import { getPattern, getArtist, getStyle, getCategory, productsByPattern, patterns } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/cards/ProductCard";
import { PatternCard } from "@/components/cards/PatternCard";
import { QuickView } from "@/components/cards/QuickView";
import type { Product } from "@/lib/data";

export function PatternDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useI18n();
  const { format } = useCurrency();
  const [fav, setFav] = useState(false);
  const [quick, setQuick] = useState<Product | null>(null);

  const pattern = slug ? getPattern(slug) : undefined;
  if (!pattern) return <Navigate to="/patterns" replace />;

  const artist = getArtist(pattern.artistSlug);
  const style = getStyle(pattern.style);
  const category = getCategory(pattern.category);
  const productsWithPattern = productsByPattern(pattern.slug);
  const related = patterns.filter((p) => p.style === pattern.style && p.slug !== pattern.slug).slice(0, 4);
  const name = lang === "fa" ? pattern.nameFa : pattern.name;
  const description = lang === "fa" ? pattern.descriptionFa : pattern.description;

  return (
    <>
      <div className="border-b border-border bg-background-secondary/30">
        <div className="container-page py-4">
          <nav className="flex items-center gap-2 text-xs text-muted">
            <Link to="/" className="hover:text-accent">{t("nav.home")}</Link>
            <span>/</span>
            <Link to="/patterns" className="hover:text-accent">{t("nav.patterns")}</Link>
            <span>/</span>
            <span className="text-foreground">{name}</span>
          </nav>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Large preview */}
            <div className="zoom-img relative aspect-square overflow-hidden rounded-xl border border-border bg-background-secondary">
              <img src={pattern.image} alt={name} className="h-full w-full object-cover" />
              <div className="absolute top-4 start-4 flex flex-col gap-1.5">
                {pattern.trending && <Badge tone="slate">Trending</Badge>}
                {pattern.exclusive && <Badge tone="accent">Exclusive</Badge>}
              </div>
            </div>

            {/* Info */}
            <div>
              <p className="text-sm text-muted">{style ? (lang === "fa" ? style.nameFa : style.name) : ""}</p>
              <h1 className="mt-2 font-display text-3xl md:text-4xl">{name}</h1>
              {artist && (
                <Link to={`/artists/${artist.slug}`} className="mt-2 inline-block text-sm text-foreground-secondary hover:text-accent transition-colors">
                  {t("label.creator")}: {lang === "fa" ? artist.nameFa : artist.name}
                </Link>
              )}

              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-3xl font-semibold">{format(pattern.price)}</span>
                <span className="text-sm text-muted">{t("common.from")}</span>
              </div>

              <p className="mt-6 text-foreground-secondary text-pretty leading-relaxed">{description}</p>

              {/* Meta */}
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-border py-6">
                <Spec label={t("label.category")} value={category ? (lang === "fa" ? category.nameFa : category.name) : "—"} />
                <Spec label={t("label.style")} value={style ? (lang === "fa" ? style.nameFa : style.name) : "—"} />
                <Spec label={t("label.color")} value={pattern.colors.join(", ")} />
                <Spec label={t("label.creator")} value={artist ? (lang === "fa" ? artist.nameFa : artist.name) : "—"} />
              </dl>

              {/* Applications */}
              <div className="mt-6">
                <p className="text-sm font-medium mb-3">{t("label.applications")}</p>
                <div className="flex flex-wrap gap-2">
                  {pattern.applications.map((a) => (
                    <span key={a} className="inline-flex items-center gap-1.5 rounded-full bg-background-secondary px-3 py-1.5 text-xs font-medium">
                      <Palette className="h-3 w-3 text-accent" />
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button variant="primary" size="lg">{t("action.usePattern")}</Button>
                <button onClick={() => setFav((f) => !f)} className="flex h-12 w-12 items-center justify-center rounded-full border border-border-strong hover:border-accent transition-colors" aria-label={t("action.favorite")}>
                  <Heart className={`h-5 w-5 ${fav ? "fill-accent text-accent" : ""}`} />
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-full border border-border-strong hover:border-accent transition-colors" aria-label={t("action.share")}>
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Products using this pattern */}
          {productsWithPattern.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-2xl">{t("label.productsUsingPattern")}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {productsWithPattern.map((p) => <ProductCard key={p.slug} product={p} onQuickView={setQuick} />)}
              </div>
            </div>
          )}

          {/* Related patterns */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-2xl">{t("label.relatedPatterns")}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p) => <PatternCard key={p.slug} pattern={p} />)}
              </div>
            </div>
          )}
        </div>
      </section>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
