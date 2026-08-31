import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useI18n, useCurrency } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export function CartPage() {
  const { t } = useI18n();
  const { format } = useCurrency();
  const { lines, subtotal, count, setQty, remove } = useCart();
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  if (lines.length === 0) {
    return (
      <section className="py-20">
        <div className="container-page">
          <EmptyState
            title={t("cart.empty")}
            description={t("cart.empty.desc")}
            action={<Button to="/store" variant="primary">{t("action.continueShopping")}</Button>}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="container-page">
        <h1 className="font-display text-3xl md:text-4xl">{t("cart.title")}</h1>
        <p className="mt-2 text-sm text-muted">{count} {count === 1 ? t("cart.item") : t("cart.items")}</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {/* Lines */}
          <div className="lg:col-span-2 space-y-4">
            {lines.map((line) => (
              <div key={line.slug + line.variant} className="surface-card flex gap-4 p-4">
                <Link to={`/products/${line.slug}`} className="zoom-img h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-border">
                  <img src={line.image} alt={line.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to={`/products/${line.slug}`} className="font-medium hover:text-accent transition-colors">{line.name}</Link>
                      <p className="text-xs text-muted">{t("label.sku")}: {line.sku}</p>
                      {line.variant && <p className="text-xs text-muted">{line.variant}</p>}
                    </div>
                    <p className="font-semibold">{format(line.price)}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-full border border-border-strong">
                      <button onClick={() => setQty(line.slug, line.quantity - 1)} className="flex h-9 w-9 items-center justify-center text-foreground hover:text-accent transition-colors" aria-label="Decrease">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{line.quantity}</span>
                      <button onClick={() => setQty(line.slug, line.quantity + 1)} className="flex h-9 w-9 items-center justify-center text-foreground hover:text-accent transition-colors" aria-label="Increase">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button onClick={() => remove(line.slug)} className="flex items-center gap-1.5 text-xs text-muted hover:text-error transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                      {t("action.remove")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="surface-card sticky top-24 p-6">
              <h2 className="font-display text-xl">{t("cart.summary")}</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-foreground-secondary">{t("cart.subtotal")}</dt>
                  <dd className="font-medium">{format(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-foreground-secondary">{t("cart.shipping")}</dt>
                  <dd className="font-medium">{shipping === 0 ? t("checkout.free") : format(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base">
                  <dt className="font-semibold">{t("cart.total")}</dt>
                  <dd className="font-semibold">{format(total)}</dd>
                </div>
              </dl>
              <Button to="/checkout" variant="primary" size="lg" className="mt-6 w-full">
                {t("action.checkout")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
              <Link to="/store" className="mt-3 flex items-center justify-center gap-2 text-sm text-foreground-secondary hover:text-accent transition-colors">
                <ShoppingBag className="h-4 w-4" />
                {t("action.continueShopping")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
