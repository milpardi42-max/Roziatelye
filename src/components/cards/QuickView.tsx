import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ShoppingBag, Heart } from "lucide-react";
import { useI18n, useCurrency } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { getArtist, getCategory, type Product } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function QuickView({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { t, lang } = useI18n();
  const { format } = useCurrency();
  const { add } = useCart();
  const [imgIdx, setImgIdx] = useState(0);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setImgIdx(0);
    setFav(false);
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;
  const artist = product.artistSlug ? getArtist(product.artistSlug) : null;
  const category = getCategory(product.category);
  const name = lang === "fa" ? product.nameFa : product.name;
  const material = lang === "fa" ? product.materialFa : product.material;
  const color = lang === "fa" ? product.colorFa : product.color;
  const description = lang === "fa" ? product.descriptionFa : product.description;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-background shadow-elevated animate-scale-fade">
        <button
          onClick={onClose}
          className="absolute top-4 end-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background-secondary transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          {/* Image */}
          <div className="bg-background-secondary">
            <div className="zoom-img relative aspect-square overflow-hidden">
              <img
                src={product.images[imgIdx]}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 p-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-colors ${
                      i === imgIdx ? "border-accent" : "border-border"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col p-6">
            <div className="flex flex-wrap gap-1.5">
              {product.exclusive && <Badge tone="accent">Exclusive</Badge>}
              {product.bestSeller && <Badge tone="slate">Best seller</Badge>}
            </div>
            <h2 className="mt-3 font-display text-2xl">{name}</h2>
            {artist && (
              <Link
                to={`/artists/${artist.slug}`}
                className="mt-1 text-sm text-foreground-secondary hover:text-accent transition-colors"
              >
                {lang === "fa" ? artist.nameFa : artist.name}
              </Link>
            )}

            <dl className="mt-4 space-y-1.5 text-sm">
              <Row label={t("label.sku")} value={product.sku} />
              <Row
                label={t("label.category")}
                value={category ? (lang === "fa" ? category.nameFa : category.name) : "—"}
              />
              <Row label={t("label.material")} value={material} />
              <Row label={t("label.dimensions")} value={product.dimensions} />
              <Row label={t("label.color")} value={color} />
            </dl>

            <p className="mt-4 text-sm text-foreground-secondary line-clamp-3">
              {description}
            </p>

            <div className="mt-4 flex items-baseline gap-2">
              {product.salePrice ? (
                <>
                  <span className="text-2xl font-semibold text-accent">
                    {format(product.salePrice)}
                  </span>
                  <span className="text-base text-muted line-through">
                    {format(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-semibold">{format(product.price)}</span>
              )}
            </div>

            <span
              className={`mt-1 text-sm font-medium ${
                product.inStock ? "text-success" : "text-error"
              }`}
            >
              {product.inStock ? t("label.inStock") : t("label.outOfStock")}
            </span>

            <div className="mt-6 flex gap-2">
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => {
                  add(product);
                  onClose();
                }}
                disabled={!product.inStock}
              >
                <ShoppingBag className="h-4 w-4" />
                {t("action.addToCart")}
              </Button>
              <button
                onClick={() => setFav((f) => !f)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong hover:border-accent transition-colors"
                aria-label={t("action.favorite")}
              >
                <Heart className={`h-5 w-5 ${fav ? "fill-accent text-accent" : ""}`} />
              </button>
            </div>

            <Link
              to={`/products/${product.slug}`}
              onClick={onClose}
              className="mt-4 text-center text-sm font-medium text-accent hover:underline"
            >
              {t("action.viewFullProduct")} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
