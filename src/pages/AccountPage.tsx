import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { User, ShoppingBag, Heart, Settings, LogOut } from "lucide-react";

export function AccountPage() {
  const { t } = useI18n();
  const items = [
    { icon: ShoppingBag, label: t("nav.store"), desc: "View your order history and track shipments." },
    { icon: Heart, label: t("action.favorite"), desc: "Patterns and products you've saved." },
    { icon: Settings, label: "Settings", desc: "Manage your profile, address book, and preferences." },
    { icon: LogOut, label: "Sign out", desc: "End your session securely." },
  ];

  return (
    <>
      <PageHeader eyebrow={t("nav.account")} title={t("nav.account")} />
      <section className="py-12 lg:py-16">
        <div className="container-page max-w-2xl">
          <div className="surface-card p-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h2 className="font-display text-xl">Guest account</h2>
              <p className="text-sm text-muted">Sign in to sync your cart, wishlist, and orders across devices.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <button key={item.label} className="surface-card p-5 flex items-start gap-4 text-start hover:shadow-medium transition-shadow">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background-secondary text-foreground-secondary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">{item.label}</h3>
                  <p className="mt-1 text-sm text-foreground-secondary">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <Button variant="primary">Sign in</Button>
            <Button variant="outline">Create account</Button>
          </div>
        </div>
      </section>
    </>
  );
}
