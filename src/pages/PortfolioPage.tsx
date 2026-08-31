import { useI18n } from "@/lib/i18n";
import { portfolios } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { Reveal } from "@/components/ui/Reveal";

export function PortfolioPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t("section.portfolios.eyebrow")} title={t("section.portfolios.title")} />
      <section className="py-14 lg:py-20">
        <div className="container-page">
          <Reveal className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {portfolios.map((p) => <PortfolioCard key={p.slug} portfolio={p} />)}
          </Reveal>
        </div>
      </section>
    </>
  );
}
