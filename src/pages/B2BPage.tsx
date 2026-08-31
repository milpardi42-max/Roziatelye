import { Layers, ShoppingBag, Store, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function B2BPage() {
  const { t } = useI18n();
  const features = [
    { icon: Layers, title: t("b2b.feature1"), desc: t("b2b.feature1.desc") },
    { icon: ShoppingBag, title: t("b2b.feature2"), desc: t("b2b.feature2.desc") },
    { icon: Store, title: t("b2b.feature3"), desc: t("b2b.feature3.desc") },
  ];
  const steps = [
    { n: "01", title: "Consultation", desc: "Tell us about your brand, volumes, and timeline." },
    { n: "02", title: "Curation", desc: "We match you with artists and workshops from our network." },
    { n: "03", title: "Prototype", desc: "Sample production and pattern adaptation for your use case." },
    { n: "04", title: "Production", desc: "Scaled manufacturing with quality control at every stage." },
  ];

  return (
    <>
      <PageHeader eyebrow={t("section.b2b.eyebrow")} title={t("b2b.title")} subtitle={t("b2b.subtitle")} />
      <section className="py-16 lg:py-20">
        <div className="container-page">
          {/* Features */}
          <Reveal className="grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="surface-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl">{f.title}</h3>
                <p className="mt-2 text-sm text-foreground-secondary">{f.desc}</p>
              </div>
            ))}
          </Reveal>

          {/* Process */}
          <div className="mt-20">
            <h2 className="font-display text-2xl md:text-3xl">How it works</h2>
            <Reveal className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div key={s.n} className="relative">
                  <span className="font-display text-4xl text-accent/30">{s.n}</span>
                  <h3 className="mt-2 font-medium">{s.title}</h3>
                  <p className="mt-1 text-sm text-foreground-secondary">{s.desc}</p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* CTA */}
          <div className="mt-20 rounded-xl bg-primary p-8 md:p-12 text-center text-white">
            <h2 className="font-display text-2xl md:text-3xl">{t("action.requestB2B")}</h2>
            <p className="mt-3 text-white/70">Tell us about your project and we'll be in touch within 48 hours.</p>
            <Button to="/contact" variant="accent" className="mt-6">
              {t("action.requestB2B")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
