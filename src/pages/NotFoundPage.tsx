import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";

export function NotFoundPage() {
  const { t } = useI18n();
  return (
    <section className="py-20 lg:py-32">
      <div className="container-page text-center max-w-md">
        <p className="font-display text-7xl text-accent/30">404</p>
        <h1 className="mt-4 font-display text-3xl">Page not found</h1>
        <p className="mt-3 text-foreground-secondary">The page you're looking for doesn't exist or has moved.</p>
        <Button to="/" variant="primary" className="mt-8">{t("nav.home")}</Button>
      </div>
    </section>
  );
}
