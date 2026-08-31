import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { products, categories, type Product } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/Button";
import { QuickView } from "@/components/cards/QuickView";

export function StorePage() {
  const { t, lang } = useI18n();
  const [quick, setQuick] = useState<Product | null>(null);
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);
  const exclusive = products.filter((p) => p.exclusive).slice(0, 4);

  return (
    <>
      {/* Store Hero — pure text, ultra minimal */}
      <section className="border-b border-[#d2d2d7]/60 bg-white">
        <div className="container-page py-20 lg:py-28">
          <p className="eyebrow mb-5">{t("store.hero.eyebrow")}</p>
          <h1 className="font-display text-[3rem] text-balance leading-[1.04] md:text-[4.5rem] lg:text-[5.5rem]">
            {t("store.hero.title")}
          </h1>
          <p className="mt-6 max-w-lg text-[17px] text-foreground-secondary text-pretty leading-relaxed">
            {t("store.hero.desc")}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/products" variant="primary" size="lg">
              {t("action.shopNow")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
            <Button to="/patterns" variant="outline" size="lg">
              {t("action.explorePatterns")}
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 lg:py-24 bg-[#f5f5f7]">
        <div className="container-page">
          <SectionHeader
            eyebrow={t("store.categories")}
            title={t("store.categories")}
            viewAllTo="/products"
            viewAllLabel={t("action.viewAll")}
          />
          <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/store/category/${c.slug}`}
                className="group zoom-img relative aspect-[4/5] overflow-hidden rounded-2xl"
              >
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <div className="absolute bottom-6 start-6 end-6">
                  <h3 className="font-display text-xl text-white">{lang === "fa" ? c.nameFa : c.name}</h3>
                  <p className="mt-1 text-sm text-white/65 line-clamp-1">{c.description}</p>
                  <p className="mt-2 text-xs text-white/45">{c.count} {t("nav.products")}</p>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      <ProductSection title={t("store.featured")} items={featured} onQuickView={setQuick} />
      {/* New arrivals */}
      <ProductSection title={t("store.newArrivals")} items={newArrivals} onQuickView={setQuick} bg />
      {/* Best sellers */}
      <ProductSection title={t("store.bestSellers")} items={bestSellers} onQuickView={setQuick} />
      {/* Exclusive */}
      <ProductSection title={t("section.exclusive.title")} items={exclusive} onQuickView={setQuick} bg />

      {/* Promo Banner */}
      <section className="py-20">
        <div className="container-page">
          <div className="rounded-2xl bg-foreground px-8 py-12 md:px-16 text-center text-white">
            <h2 className="font-display text-[1.75rem] leading-tight md:text-[2.5rem]">
              {t("store.promo.title")}
            </h2>
            <p className="mt-4 text-white/60 max-w-md mx-auto text-[15px] leading-relaxed">
              {t("store.promo.desc")}
            </p>
            <Button to="/account" variant="accent" className="mt-8">
              {t("action.learnMore")}
            </Button>
          </div>
        </div>
      </section>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}

function ProductSection({
  title,
  items,
  onQuickView,
  bg,
}: {
  title: string;
  items: Product[];
  onQuickView: (p: Product) => void;
  bg?: boolean;
}) {
  const { t } = useI18n();
  if (items.length === 0) return null;
  return (
    <section className={`py-20 lg:py-24 ${bg ? "bg-[#f5f5f7]" : "bg-white"}`}>
      <div className="container-page">
        <SectionHeader
          eyebrow={title}
          title={title}
          viewAllTo="/products"
          viewAllLabel={t("action.viewAll")}
        />
        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => <ProductCard key={p.slug} product={p} onQuickView={onQuickView} />)}
        </Reveal>
      </div>
    </section>
  );
}
