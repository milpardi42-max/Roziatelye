import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, ShoppingBag, Store } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/cards/ProductCard";
import { PatternCard } from "@/components/cards/PatternCard";
import { ArtistCard } from "@/components/cards/ArtistCard";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { CourseCard } from "@/components/cards/CourseCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { QuickView } from "@/components/cards/QuickView";
import type { Product } from "@/lib/data";
import {
  patterns,
  products,
  artists,
  portfolios,
  courses,
  styles,
  categories,
} from "@/lib/data";

/* ---------- Pattern Discovery (Bento) ---------- */
export function PatternDiscovery() {
  const { t } = useI18n();
  const featured = patterns.slice(0, 5);
  return (
    <section className="py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          eyebrow={t("section.patterns.eyebrow")}
          title={t("section.patterns.title")}
          description={t("section.patterns.desc")}
          viewAllTo="/patterns"
          viewAllLabel={t("action.viewAll")}
        />
        <Reveal className="mt-12 grid gap-3 md:grid-cols-4 md:grid-rows-2">
          {/* Large */}
          <Link
            to={`/patterns/${featured[0].slug}`}
            className="group zoom-img relative md:col-span-2 md:row-span-2 overflow-hidden rounded-2xl"
          >
            <img src={featured[0].image} alt={featured[0].name} loading="lazy" className="h-full w-full object-cover min-h-[300px] md:min-h-[540px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-7 start-7 end-7">
              <Badge tone="accent">Trending</Badge>
              <h3 className="mt-3 font-display text-2xl text-white md:text-3xl leading-tight">{featured[0].name}</h3>
              <p className="mt-1.5 text-sm text-white/70 line-clamp-1">{featured[0].description}</p>
            </div>
          </Link>
          {/* Small */}
          {featured.slice(1, 5).map((p) => (
            <Link
              key={p.slug}
              to={`/patterns/${p.slug}`}
              className="group zoom-img relative overflow-hidden rounded-2xl"
            >
              <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover aspect-square md:aspect-auto md:min-h-[261px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              <div className="absolute bottom-5 start-5 end-5">
                <h3 className="font-display text-lg text-white leading-tight">{p.name}</h3>
                <p className="text-xs text-white/60 mt-1">{p.style}</p>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Trending Patterns ---------- */
export function TrendingPatterns() {
  const { t } = useI18n();
  const items = patterns.filter((p) => p.trending);
  return (
    <section className="py-24 lg:py-28 bg-[#f5f5f7]">
      <div className="container-page">
        <SectionHeader
          eyebrow={t("section.trending.eyebrow")}
          title={t("section.trending.title")}
          viewAllTo="/patterns?sort=popular"
          viewAllLabel={t("action.viewAll")}
        />
        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <PatternCard key={p.slug} pattern={p} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Best-Selling Patterns ---------- */
export function BestSellingPatterns() {
  const { t } = useI18n();
  const items = patterns.filter((p) => p.bestSeller);
  return (
    <section className="py-24 lg:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow={t("section.best.eyebrow")}
          title={t("section.best.title")}
          viewAllTo="/patterns?sort=popular"
          viewAllLabel={t("action.viewAll")}
        />
        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <PatternCard key={p.slug} pattern={p} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Featured Artists ---------- */
export function FeaturedArtists() {
  const { t } = useI18n();
  return (
    <section className="py-24 lg:py-28 bg-[#f5f5f7]">
      <div className="container-page">
        <SectionHeader
          eyebrow={t("section.artists.eyebrow")}
          title={t("section.artists.title")}
          viewAllTo="/artists"
          viewAllLabel={t("action.viewAll")}
        />
        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {artists.map((a) => (
            <ArtistCard key={a.slug} artist={a} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Featured Portfolios ---------- */
export function FeaturedPortfolios() {
  const { t } = useI18n();
  return (
    <section className="py-24 lg:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow={t("section.portfolios.eyebrow")}
          title={t("section.portfolios.title")}
          viewAllTo="/portfolio"
          viewAllLabel={t("action.viewAll")}
        />
        <Reveal className="mt-12 grid gap-4 md:grid-cols-3">
          {portfolios.map((p) => (
            <PortfolioCard key={p.slug} portfolio={p} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Styles ---------- */
export function StylesSection() {
  const { t, lang } = useI18n();
  return (
    <section className="py-24 lg:py-28 bg-[#f5f5f7]">
      <div className="container-page">
        <SectionHeader
          eyebrow={t("section.styles.eyebrow")}
          title={t("section.styles.title")}
          viewAllTo="/patterns"
          viewAllLabel={t("action.viewAll")}
        />
        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {styles.map((s) => (
            <Link
              key={s.slug}
              to={`/patterns?style=${s.slug}`}
              className="group zoom-img relative aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute bottom-6 start-6 end-6">
                <h3 className="font-display text-xl text-white">{lang === "fa" ? s.nameFa : s.name}</h3>
                <p className="mt-1 text-sm text-white/65 leading-snug">{s.description}</p>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Featured Products ---------- */
export function FeaturedProducts() {
  const { t } = useI18n();
  const [quick, setQuick] = useState<Product | null>(null);
  const items = products.filter((p) => p.featured).slice(0, 4);
  return (
    <section className="py-24 lg:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow={t("section.products.eyebrow")}
          title={t("section.products.title")}
          viewAllTo="/products"
          viewAllLabel={t("action.viewAll")}
        />
        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} onQuickView={setQuick} />
          ))}
        </Reveal>
      </div>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </section>
  );
}

/* ---------- Exclusive Collection ---------- */
export function ExclusiveCollection() {
  const { t, lang } = useI18n();
  const items = products.filter((p) => p.exclusive).slice(0, 3);
  return (
    <section className="py-24 lg:py-28 bg-foreground text-white">
      <div className="container-page">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-14">
          <div className="max-w-xl">
            <p className="eyebrow text-white/40">{t("section.exclusive.eyebrow")}</p>
            <h2 className="mt-4 font-display text-[2rem] text-balance leading-[1.06] md:text-[2.75rem]">
              {t("section.exclusive.title")}
            </h2>
          </div>
          <Button to="/store?exclusive=1" variant="accent" className="self-start">
            {t("action.viewCollection")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Button>
        </div>
        <Reveal className="grid gap-4 md:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.slug}
              to={`/products/${p.slug}`}
              className="group zoom-img relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10"
            >
              <img src={p.images[0]} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="absolute bottom-6 start-6 end-6">
                <Badge tone="accent">Exclusive</Badge>
                <h3 className="mt-3 font-display text-xl text-white leading-tight">{lang === "fa" ? p.nameFa : p.name}</h3>
                <p className="mt-1 text-sm text-white/60">{p.sku}</p>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Education / Academy ---------- */
export function EducationSection() {
  const { t } = useI18n();
  const items = courses.slice(0, 4);
  return (
    <section className="py-24 lg:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow={t("section.education.eyebrow")}
          title={t("section.education.title")}
          viewAllTo="/education"
          viewAllLabel={t("action.viewAll")}
        />
        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- B2B ---------- */
export function B2BSection() {
  const { t } = useI18n();
  const features = [
    { icon: Layers, title: t("b2b.feature1"), desc: t("b2b.feature1.desc") },
    { icon: ShoppingBag, title: t("b2b.feature2"), desc: t("b2b.feature2.desc") },
    { icon: Store, title: t("b2b.feature3"), desc: t("b2b.feature3.desc") },
  ];
  return (
    <section className="py-24 lg:py-28 bg-[#f5f5f7]">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <p className="eyebrow">{t("section.b2b.eyebrow")}</p>
            <h2 className="mt-5 font-display text-[2rem] text-balance leading-[1.06] md:text-[2.75rem]">{t("section.b2b.title")}</h2>
            <p className="mt-5 text-foreground-secondary text-pretty text-[15px] leading-relaxed md:text-base">{t("section.b2b.desc")}</p>
            <Button to="/b2b" variant="primary" className="mt-8">
              {t("action.requestB2B")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </div>
          <div className="grid gap-3">
            {features.map((f) => (
              <div key={f.title} className="flex gap-5 rounded-2xl border border-[#d2d2d7]/60 bg-white p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <f.icon className="h-[18px] w-[18px]" />
                </div>
                <div>
                  <h3 className="font-medium text-[14px]">{f.title}</h3>
                  <p className="mt-1 text-sm text-foreground-secondary leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Artist Stories ---------- */
export function ArtistStories() {
  const { t, lang } = useI18n();
  const artist = artists[0];
  return (
    <section className="py-24 lg:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal className="zoom-img relative aspect-[4/5] overflow-hidden rounded-2xl">
            <img src={artist.cover} alt={artist.name} loading="lazy" className="h-full w-full object-cover" />
          </Reveal>
          <div>
            <p className="eyebrow">{t("section.stories.eyebrow")}</p>
            <h2 className="mt-5 font-display text-[2rem] text-balance leading-[1.06] md:text-[2.75rem]">{t("section.stories.title")}</h2>
            <blockquote className="mt-7 text-[17px] text-foreground-secondary text-pretty leading-relaxed border-s-2 border-accent ps-5">
              "{lang === "fa" ? artist.bioFa : artist.bio}"
            </blockquote>
            <div className="mt-7 flex items-center gap-4">
              <img src={artist.avatar} alt={artist.name} className="h-12 w-12 rounded-full object-cover border border-[#d2d2d7]" />
              <div>
                <p className="font-medium text-[14px]">{lang === "fa" ? artist.nameFa : artist.name}</p>
                <p className="text-[13px] text-muted mt-0.5">{lang === "fa" ? artist.professionFa : artist.profession} · {artist.location}</p>
              </div>
            </div>
            <Button to={`/artists/${artist.slug}`} variant="outline" className="mt-7">
              {t("action.viewArtist")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Newsletter ---------- */
export function Newsletter() {
  const { t, lang } = useI18n();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="py-24 lg:py-28 bg-[#f5f5f7]">
      <div className="container-page">
        <div className="max-w-lg mx-auto text-center">
          <p className="eyebrow">{t("section.newsletter.eyebrow")}</p>
          <h2 className="mt-5 font-display text-[2rem] text-balance leading-[1.06] md:text-[2.5rem]">
            {t("section.newsletter.title")}
          </h2>
          <p className="mt-4 text-foreground-secondary text-[15px] leading-relaxed">
            {t("section.newsletter.desc")}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) {
                setSent(true);
                setEmail("");
                setTimeout(() => setSent(false), 3000);
              }
            }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("section.newsletter.placeholder")}
              className="h-11 flex-1 rounded-full border border-[#d2d2d7] bg-white px-5 text-[14px] outline-none focus:border-foreground transition-colors max-w-sm"
            />
            <Button type="submit" variant="primary" size="md">
              {t("section.newsletter.cta")}
            </Button>
          </form>
          {sent && (
            <p className="mt-4 text-[13px] text-success animate-fade-in">
              {lang === "fa" ? "عضو شدید — سپاس!" : "Subscribed — thank you!"}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Category Showcase ---------- */
export function CategoryShowcase() {
  const { t, lang } = useI18n();
  return (
    <section className="py-24 lg:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow={t("store.categories")}
          title={t("section.products.title")}
          viewAllTo="/store"
          viewAllLabel={t("action.shopNow")}
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
  );
}
