import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { useI18n, useCurrency } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { getArtist, getCategory, type Product } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (p: Product) => void;
}) {
  const { t, lang } = useI18n();
  const { format } = useCurrency();
  const { add } = useCart();
  const [fav, setFav] = useState(false);
  const artist = product.artistSlug ? getArtist(product.artistSlug) : null;
  const category = getCategory(product.category);
  const name = lang === "fa" ? product.nameFa : product.name;
  const material = lang === "fa" ? product.materialFa : product.material;
  const color = lang === "fa" ? product.colorFa : product.color;

  return (
    <article className="group card-lift rounded-2xl overflow-hidden border border-[#d2d2d7]/60 bg-white">
      {/* Image */}
      <div className="zoom-img relative aspect-square overflow-hidden bg-background-secondary">
        <Link to={`/products/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </Link>
        {/* Badges */}
        <div className="absolute top-3 start-3 flex flex-col gap-1.5">
          {product.exclusive && <Badge tone="accent">Exclusive</Badge>}
          {product.bestSeller && <Badge tone="slate">Best seller</Badge>}
          {product.salePrice && <Badge tone="error">Sale</Badge>}
          {!product.inStock && <Badge tone="neutral">{t("label.outOfStock")}</Badge>}
        </div>
        {/* Favorite */}
        <button
          onClick={() => setFav((f) => !f)}
          className="absolute top-3 end-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-foreground hover:text-accent transition-colors"
          aria-label={t("action.favorite")}
        >
          <Heart className={`h-[16px] w-[16px] ${fav ? "fill-accent text-accent" : ""}`} />
        </button>
        {/* Hover actions */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <button
            onClick={() => onQuickView?.(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-3 py-2 text-[12px] font-medium text-foreground hover:bg-white transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            {t("action.quickView")}
          </button>
          <button
            onClick={() => add(product)}
            disabled={!product.inStock}
            className="flex items-center justify-center rounded-full bg-foreground px-3 py-2 text-[12px] font-medium text-white hover:bg-[#3a3a3c] transition-colors disabled:opacity-40"
            aria-label={t("action.addToCart")}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/products/${product.slug}`} className="group/link">
            <h3 className="text-[14px] font-medium text-foreground group-hover/link:text-accent transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>
          {product.lowStock && product.inStock && (
            <Badge tone="warning" className="shrink-0">
              {t("label.lowStock")}
            </Badge>
          )}
        </div>

        <dl className="mt-2.5 space-y-1 text-xs text-foreground-secondary">
          <div className="flex justify-between gap-2">
            <dt className="text-muted">{t("label.sku")}</dt>
            <dd className="font-mono">{product.sku}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted">{t("label.category")}</dt>
            <dd>{category ? (lang === "fa" ? category.nameFa : category.name) : "—"}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted">{t("label.material")}</dt>
            <dd>{material}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted">{t("label.size")}</dt>
            <dd>{product.dimensions}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted">{t("label.color")}</dt>
            <dd>{color}</dd>
          </div>
        </dl>

        {artist && (
          <p className="mt-2.5 text-xs text-muted">
            {t("label.creator")}:{" "}
            <Link
              to={`/artists/${artist.slug}`}
              className="text-foreground-secondary hover:text-accent transition-colors"
            >
              {lang === "fa" ? artist.nameFa : artist.name}
            </Link>
          </p>
        )}

        <div className="mt-3 flex items-end justify-between border-t border-[#d2d2d7]/60 pt-3">
          <div className="flex items-baseline gap-1.5">
            {product.salePrice ? (
              <>
                <span className="text-[15px] font-semibold text-accent tabular-nums">
                  {format(product.salePrice)}
                </span>
                <span className="text-[13px] text-muted line-through tabular-nums">
                  {format(product.price)}
                </span>
              </>
            ) : (
              <span className="text-[15px] font-semibold tabular-nums">{format(product.price)}</span>
            )}
          </div>
          <span
            className={`text-xs font-medium ${
              product.inStock ? "text-success" : "text-error"
            }`}
          >
            {product.inStock ? t("label.inStock") : t("label.outOfStock")}
          </span>
        </div>
      </div>
    </article>
  );
}
