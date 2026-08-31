import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Lock } from "lucide-react";
import { useI18n, useCurrency } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export function CheckoutPage() {
  const { t } = useI18n();
  const { format } = useCurrency();
  const { lines, subtotal, count, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const shipping = shippingMethod === "express" ? 25 : subtotal > 150 ? 0 : 12;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <section className="py-20">
        <div className="container-page max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success">
            <Check className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-display text-3xl">{t("checkout.confirm")}</h1>
          <p className="mt-3 text-foreground-secondary">
            {t("cart.items")}: {count} · {format(total)}
          </p>
          <Button to="/" variant="primary" className="mt-8">{t("action.continueShopping")}</Button>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="py-20">
        <div className="container-page">
          <EmptyState title={t("cart.empty")} description={t("cart.empty.desc")} action={<Button to="/store" variant="primary">{t("action.continueShopping")}</Button>} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="container-page">
        <h1 className="font-display text-3xl md:text-4xl">{t("checkout.title")}</h1>
        <form onSubmit={(e) => { e.preventDefault(); clear(); setPlaced(true); window.scrollTo(0, 0); }} className="mt-10 grid gap-10 lg:grid-cols-3">
          {/* Form fields */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact */}
            <fieldset className="surface-card p-6">
              <legend className="font-display text-lg px-2">{t("checkout.contact")}</legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label={t("checkout.email")} type="email" required />
                <Field label={t("checkout.phone")} type="tel" />
              </div>
            </fieldset>

            {/* Address */}
            <fieldset className="surface-card p-6">
              <legend className="font-display text-lg px-2">{t("checkout.address")}</legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label={t("checkout.firstName")} required />
                <Field label={t("checkout.lastName")} required />
                <div className="sm:col-span-2"><Field label={t("checkout.address1")} required /></div>
                <div className="sm:col-span-2"><Field label={t("checkout.address2")} /></div>
                <Field label={t("checkout.city")} required />
                <Field label={t("checkout.postal")} required />
                <Field label={t("checkout.country")} required />
              </div>
            </fieldset>

            {/* Shipping method */}
            <fieldset className="surface-card p-6">
              <legend className="font-display text-lg px-2">{t("checkout.shippingMethod")}</legend>
              <div className="mt-4 space-y-3">
                <label className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors ${shippingMethod === "standard" ? "border-accent bg-accent-soft/30" : "border-border"}`}>
                  <span className="flex items-center gap-3">
                    <input type="radio" name="shipping" value="standard" checked={shippingMethod === "standard"} onChange={() => setShippingMethod("standard")} className="accent-accent" />
                    <span>
                      <span className="block text-sm font-medium">{t("checkout.standard")}</span>
                      <span className="block text-xs text-muted">3–5 {t("nav.business") || "days"}</span>
                    </span>
                  </span>
                  <span className="text-sm font-medium">{subtotal > 150 ? t("checkout.free") : format(12)}</span>
                </label>
                <label className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors ${shippingMethod === "express" ? "border-accent bg-accent-soft/30" : "border-border"}`}>
                  <span className="flex items-center gap-3">
                    <input type="radio" name="shipping" value="express" checked={shippingMethod === "express"} onChange={() => setShippingMethod("express")} className="accent-accent" />
                    <span>
                      <span className="block text-sm font-medium">{t("checkout.express")}</span>
                      <span className="block text-xs text-muted">1–2 {t("nav.business") || "days"}</span>
                    </span>
                  </span>
                  <span className="text-sm font-medium">{format(25)}</span>
                </label>
              </div>
            </fieldset>

            {/* Payment */}
            <fieldset className="surface-card p-6">
              <legend className="font-display text-lg px-2">{t("checkout.payment")}</legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2"><Field label={t("checkout.card")} required /></div>
                <Field label={t("checkout.expiry")} placeholder="MM/YY" required />
                <Field label={t("checkout.cvc")} placeholder="123" required />
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
                <Lock className="h-3.5 w-3.5" />
                {t("nav.secure") || "Secure payment"}
              </p>
            </fieldset>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="surface-card sticky top-24 p-6">
              <h2 className="font-display text-xl">{t("cart.summary")}</h2>
              <div className="mt-4 space-y-3">
                {lines.map((l) => (
                  <div key={l.slug + l.variant} className="flex items-center gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border">
                      <img src={l.image} alt={l.name} className="h-full w-full object-cover" />
                      <span className="absolute -top-1 -end-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">{l.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{l.name}</p>
                      <p className="text-xs text-muted">{l.sku}</p>
                    </div>
                    <p className="text-sm font-medium">{format(l.price * l.quantity)}</p>
                  </div>
                ))}
              </div>
              <dl className="mt-6 space-y-3 border-t border-border pt-4 text-sm">
                <div className="flex justify-between"><dt className="text-foreground-secondary">{t("cart.subtotal")}</dt><dd className="font-medium">{format(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-foreground-secondary">{t("cart.shipping")}</dt><dd className="font-medium">{shipping === 0 ? t("checkout.free") : format(shipping)}</dd></div>
                <div className="flex justify-between border-t border-border pt-3 text-base"><dt className="font-semibold">{t("cart.total")}</dt><dd className="font-semibold">{format(total)}</dd></div>
              </dl>
              <Button type="submit" variant="primary" size="lg" className="mt-6 w-full">{t("action.placeOrder")}</Button>
              <Link to="/cart" className="mt-3 block text-center text-sm text-foreground-secondary hover:text-accent transition-colors">← {t("cart.title")}</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, type = "text", required, placeholder }: { label: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-foreground-secondary">{label}{required && <span className="text-accent"> *</span>}</span>
      <input type={type} required={required} placeholder={placeholder} className="h-11 w-full rounded-lg border border-border-strong bg-background px-3 text-sm outline-none focus:border-accent transition-colors" />
    </label>
  );
}
