import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import { Star, MapPin, Instagram, Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getArtist, productsByArtist, patternsByArtist, portfoliosByArtist, type Product } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/cards/ProductCard";
import { PatternCard } from "@/components/cards/PatternCard";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { QuickView } from "@/components/cards/QuickView";

type Tab = "portfolio" | "patterns" | "products";

export function ArtistProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useI18n();
  const [tab, setTab] = useState<Tab>("portfolio");
  const [quick, setQuick] = useState<Product | null>(null);

  const artist = slug ? getArtist(slug) : undefined;
  if (!artist) return <Navigate to="/artists" replace />;

  const name = lang === "fa" ? artist.nameFa : artist.name;
  const profession = lang === "fa" ? artist.professionFa : artist.profession;
  const bio = lang === "fa" ? artist.bioFa : artist.bio;
  const artistPatterns = patternsByArtist(artist.slug);
  const artistProducts = productsByArtist(artist.slug);
  const artistPortfolios = portfoliosByArtist(artist.slug);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "portfolio", label: t("nav.portfolio"), count: artistPortfolios.length },
    { key: "patterns", label: t("nav.patterns"), count: artistPatterns.length },
    { key: "products", label: t("nav.products"), count: artistProducts.length },
  ];

  return (
    <>
      {/* Cover */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-background-secondary">
        <img src={artist.cover} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="container-page -mt-16 relative">
        {/* Profile header */}
        <div className="surface-card p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <img src={artist.avatar} alt={name} className="h-24 w-24 md:h-28 md:w-28 rounded-full border-4 border-background object-cover shadow-medium" />
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl md:text-3xl">{name}</h1>
                  <p className="mt-1 text-sm text-foreground-secondary">{profession}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                    <MapPin className="h-3.5 w-3.5" />
                    {artist.location}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-medium">{artist.rating.toFixed(1)}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    {t("label.social")}
                  </Button>
                </div>
              </div>
              <p className="mt-4 text-sm text-foreground-secondary text-pretty leading-relaxed">{bio}</p>
              <div className="mt-4 flex gap-3">
                {artist.social.map((s) => (
                  <a key={s.label} href={s.href} className="flex h-9 w-9 items-center justify-center rounded-full bg-background-secondary text-foreground hover:text-accent transition-colors" aria-label={s.label}>
                    {s.label === "Instagram" ? <Instagram className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b border-border">
          <div className="flex gap-1">
            {tabs.map((tb) => (
              <button
                key={tb.key}
                onClick={() => setTab(tb.key)}
                className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                  tab === tb.key ? "text-accent" : "text-foreground-secondary hover:text-foreground"
                }`}
              >
                {tb.label}
                <span className="ms-1.5 text-xs text-muted">({tb.count})</span>
                {tab === tb.key && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" />}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="py-10">
          {tab === "portfolio" && (
            artistPortfolios.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {artistPortfolios.map((p) => <PortfolioCard key={p.slug} portfolio={p} />)}
              </div>
            ) : <p className="text-muted py-8 text-center">{t("empty.title")}</p>
          )}
          {tab === "patterns" && (
            artistPatterns.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {artistPatterns.map((p) => <PatternCard key={p.slug} pattern={p} />)}
              </div>
            ) : <p className="text-muted py-8 text-center">{t("empty.title")}</p>
          )}
          {tab === "products" && (
            artistProducts.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {artistProducts.map((p) => <ProductCard key={p.slug} product={p} onQuickView={setQuick} />)}
              </div>
            ) : <p className="text-muted py-8 text-center">{t("empty.title")}</p>
          )}
        </div>
      </div>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}
