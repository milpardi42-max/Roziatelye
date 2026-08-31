import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { asset } from "@/lib/assets";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background image — full bleed, high opacity */}
      <div className="absolute inset-0">
        <img
          src={asset("/images/hero/hero-background.png")}
          alt=""
          className="h-full w-full object-cover"
        />
        {/* Subtle left fade for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10 rtl:from-white rtl:via-white/85 rtl:to-white/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/60" />
      </div>

      {/* Main content */}
      <div className="container-page relative py-16 md:py-20 lg:py-24">
        <div className="max-w-xl">

          <p className="eyebrow animate-blur-in">
            {t("hero.eyebrow")}
          </p>

          <h1
            className="mt-7 font-display text-[2rem] animate-fade-up leading-[1.04] whitespace-nowrap md:text-[2.75rem] lg:text-[3.25rem]"
            style={{ animationDelay: "0.08s" }}
          >
            {t("hero.title")}
          </h1>

          <p
            className="mt-6 max-w-md text-[17px] text-foreground-secondary text-pretty leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.18s" }}
          >
            {t("hero.subtitle")}
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up"
            style={{ animationDelay: "0.28s" }}
          >
            <Button to="/patterns" variant="primary" size="lg">
              {t("hero.cta.primary")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
            <Button to="/store" variant="outline" size="lg">
              {t("hero.cta.secondary")}
            </Button>
          </div>

          {/* Stats */}
          <div
            className="mt-14 flex flex-wrap gap-x-10 gap-y-5 animate-fade-up"
            style={{ animationDelay: "0.38s" }}
          >
            <Stat value="2,400+" label={t("hero.stat.patterns")} />
            <Stat value="180+" label={t("hero.stat.artists")} />
            <Stat value="1,200+" label={t("hero.stat.products")} />
            <Stat value="42" label={t("hero.stat.countries")} />
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative border-t border-[#d2d2d7]/60 bg-white/80 backdrop-blur-sm py-3.5 overflow-hidden">
        <div className="marquee-track gap-10 text-[11px] font-medium text-muted tracking-[0.14em] uppercase">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 gap-10">
              {["Handwoven", "Batik", "Geometric", "Ceramic", "Organic", "Minimal", "Copper", "Indigo", "Shibori", "Ikat"].map((w) => (
                <span key={w} className="flex items-center gap-3">
                  <span className="h-[3px] w-[3px] rounded-full bg-muted" />
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-[2rem] text-foreground leading-none tracking-[-0.03em] md:text-[2.25rem]">{value}</div>
      <div className="text-xs text-muted mt-1.5 tracking-wide">{label}</div>
    </div>
  );
}
