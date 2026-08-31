import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Heart, ShoppingBag, Minus, Plus, Star, Truck, Share2 } from "lucide-react";
import { useI18n, useCurrency } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { getProduct, getArtist, getCategory, getPattern, productsByPattern, products as allProducts, patterns } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/cards/ProductCard";
import { PatternCard } from "@/components/cards/PatternCard";
import { QuickView } from "@/components/cards/QuickView";
import type { Product } from "@/lib/data";

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useI18n();
  const { format } = useCurrency();
  const { add } = useCart();
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);
  const [quick, setQuick] = useState<Product | null>(null);

  const product = slug ? getProduct(slug) : undefined;
  if (!product) return <Navigate to="/products" replace />;

  const artist = product.artistSlug ? getArtist(product.artistSlug) : null;
  const category = getCategory(product.category);
  const pattern = product.patternSlug ? getPattern(product.patternSlug) : null;
  const name = lang === "fa" ? product.nameFa : product.name;
  const material = lang === "fa" ? product.materialFa : product.material;
  const color = lang === "fa" ? product.colorFa : product.color;
  const description = lang === "fa" ? product.descriptionFa : product.description;
  const shipping = lang === "fa" ? product.shippingFa : product.shipping;

  const related = allProducts.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const relatedPatterns = pattern ? patterns.filter((p) => p.style === pattern.style && p.slug !== pattern.slug).slice(0, 4) : [];

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-background-secondary/30">
        <div className="container-page py-4">
          <nav className="flex items-center gap-2 text-xs text-muted">
            <Link to="/" className="hover:text-accent">{t("nav.home")}</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-accent">{t("nav.products")}</Link>
            {category && (<><span>/</span><Link to={`/store/category/${category.slug}`} className="hover:text-accent">{lang === "fa" ? category.nameFa : category.name}</Link></>)}
            <span>/</span>
            <span className="text-foreground">{name}</span>
          </nav>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Gallery */}
            <div>
              <div className="zoom-img relative aspect-square overflow-hidden rounded-xl border border-border bg-background-secondary">
                <img src={product.images[imgIdx]} alt={name} className="h-full w-full object-cover" />
                <div className="absolute top-4 start-4 flex flex-col gap-1.5">
                  {product.exclusive && <Badge tone="accent">Exclusive</Badge>}
                  {product.salePrice && <Badge tone="error">Sale</Badge>}
                </div>
              </div>
              {product.images.length > 1 && (
                <div className="mt-4 flex gap-3">
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setImgIdx(i)} className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors ${i === imgIdx ? "border-accent" : "border-border"}`}>
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted">{product.sku}</span>
                <span className="text-muted">·</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                  <span className="text-sm text-muted">({product.reviewCount})</span>
                </div>
              </div>
              <h1 className="mt-2 font-display text-3xl md:text-4xl">{name}</h1>
              {artist && (
                <Link to={`/artists/${artist.slug}`} className="mt-2 inline-block text-sm text-foreground-secondary hover:text-accent transition-colors">
                  {t("label.creator")}: {lang === "fa" ? artist.nameFa : artist.name}
                </Link>
              )}

              <div className="mt-5 flex items-baseline gap-3">
                {product.salePrice ? (
                  <>
                    <span className="text-3xl font-semibold text-accent">{format(product.salePrice)}</span>
                    <span className="text-lg text-muted line-through">{format(product.price)}</span>
                  </>
                ) : (
                  <span className="text-3xl font-semibold">{format(product.price)}</span>
                )}
              </div>
              <span className={`mt-1 block text-sm font-medium ${product.inStock ? "text-success" : "text-error"}`}>
                {product.inStock ? (product.lowStock ? t("label.lowStock") : t("label.inStock")) : t("label.outOfStock")}
              </span>

              {/* Specs */}
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-border py-6">
                <Spec label={t("label.sku")} value={product.sku} />
                <Spec label={t("label.category")} value={category ? (lang === "fa" ? category.nameFa : category.name) : "—"} />
                <Spec label={t("label.material")} value={material} />
                <Spec label={t("label.dimensions")} value={product.dimensions} />
                <Spec label={t("label.color")} value={color} />
                <Spec label={t("label.availability")} value={product.inStock ? t("label.inStock") : t("label.outOfStock")} />
              </dl>

              {/* Variants */}
              {product.variants.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium mb-3">{t("label.variants")}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v, i) => (
                      <span key={i} className="rounded-full border border-border-strong px-3 py-1.5 text-xs font-medium">
                        {v.value}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-full border border-border-strong">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-11 w-11 items-center justify-center text-foreground hover:text-accent transition-colors" aria-label="Decrease">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="flex h-11 w-11 items-center justify-center text-foreground hover:text-accent transition-colors" aria-label="Increase">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button variant="primary" size="lg" onClick={() => add(product, qty)} disabled={!product.inStock}>
                  <ShoppingBag className="h-4 w-4" />
                  {t("action.addToCart")}
                </Button>
                {product.inStock && (
                  <Button to="/cart" variant="accent" size="lg" onClick={() => add(product, qty)}>
                    {t("action.buyNow")}
                  </Button>
                )}
                <button onClick={() => setFav((f) => !f)} className="flex h-12 w-12 items-center justify-center rounded-full border border-border-strong hover:border-accent transition-colors" aria-label={t("action.favorite")}>
                  <Heart className={`h-5 w-5 ${fav ? "fill-accent text-accent" : ""}`} />
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-full border border-border-strong hover:border-accent transition-colors" aria-label={t("action.share")}>
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              {/* Shipping */}
              <div className="mt-8 flex gap-3 rounded-xl bg-background-secondary p-4">
                <Truck className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium">{t("label.shipping")}</p>
                  <p className="mt-1 text-sm text-foreground-secondary">{shipping}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-16 grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl">{t("label.description")}</h2>
              <p className="mt-4 text-foreground-secondary text-pretty leading-relaxed">{description}</p>
            </div>
            {pattern && (
              <div>
                <h2 className="font-display text-2xl">{t("nav.patterns")}</h2>
                <Link to={`/patterns/${pattern.slug}`} className="mt-4 block surface-card overflow-hidden transition-shadow hover:shadow-medium">
                  <div className="zoom-img aspect-[4/3] overflow-hidden">
                    <img src={pattern.image} alt={pattern.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{lang === "fa" ? pattern.nameFa : pattern.name}</h3>
                    <p className="mt-1 text-sm text-foreground-secondary line-clamp-2">{lang === "fa" ? pattern.descriptionFa : pattern.description}</p>
                    <span className="mt-3 inline-block text-sm font-medium text-accent">{t("action.viewPattern")} →</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-2xl">{t("label.relatedProducts")}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p) => <ProductCard key={p.slug} product={p} onQuickView={setQuick} />)}
              </div>
            </div>
          )}

          {/* Related patterns */}
          {relatedPatterns.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-2xl">{t("label.relatedPatterns")}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {relatedPatterns.map((p) => <PatternCard key={p.slug} pattern={p} />)}
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
