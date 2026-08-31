import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { artists } from "@/lib/data";

export function AboutPage() {
  const { t, lang } = useI18n();
  const values = [
    { title: "Maker-first", desc: "Artists set their prices and retain ownership of their work." },
    { title: "Made to last", desc: "We favor natural materials and traditional techniques over fast trends." },
    { title: "Pattern-led", desc: "Every product starts with an original pattern you can trace to its creator." },
    { title: "Global, grounded", desc: "Creators in 42 countries, rooted in local craft traditions." },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("nav.about")}
        title={t("about.title")}
        subtitle={t("about.subtitle")}
      />

      {/* Story */}
      <section className="py-20 lg:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="text-[17px] text-foreground-secondary text-pretty leading-[1.75]">
              Patrão began as a small pattern library in 2026 — a way for independent designers to share and license their work. Today it connects 180+ artists with buyers and brands across 42 countries, offering patterns, products, portfolios, and education under one roof.
            </p>
            <p className="mt-6 text-[17px] text-foreground-secondary text-pretty leading-[1.75]">
              We believe a pattern is more than decoration. It's a record of hands, a tradition, and a point of view. Every product on Patrão traces back to a named creator, and every creator keeps ownership of their work.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-[#d2d2d7]/60 bg-[#f5f5f7]">
        <div className="container-page py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: "180+", label: "Artists" },
              { value: "2,400+", label: "Patterns" },
              { value: "42", label: "Countries" },
              { value: "2026", label: "Founded" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-[2.25rem] leading-none tracking-[-0.03em]">{s.value}</div>
                <div className="mt-2 text-[13px] text-muted tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-24">
        <div className="container-page">
          <p className="eyebrow mb-5">What we stand for</p>
          <h2 className="font-display text-[2rem] text-balance leading-[1.06] md:text-[2.75rem]">
            Our values
          </h2>
          <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-[#d2d2d7]/60 bg-white p-7"
              >
                <h3 className="font-medium text-[14px] tracking-wide">{v.title}</h3>
                <p className="mt-3 text-[14px] text-foreground-secondary leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Artists / Team */}
      <section className="py-20 lg:py-24 bg-[#f5f5f7]">
        <div className="container-page">
          <p className="eyebrow mb-5">{t("section.artists.eyebrow")}</p>
          <h2 className="font-display text-[2rem] text-balance leading-[1.06] md:text-[2.75rem]">
            {t("section.artists.title")}
          </h2>
          <Reveal className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {artists.map((a) => (
              <div key={a.slug} className="text-center">
                <img
                  src={a.avatar}
                  alt={a.name}
                  className="mx-auto h-20 w-20 rounded-full object-cover border border-[#d2d2d7]"
                />
                <h3 className="mt-4 font-medium text-[14px]">{lang === "fa" ? a.nameFa : a.name}</h3>
                <p className="mt-0.5 text-[13px] text-muted">{lang === "fa" ? a.professionFa : a.profession}</p>
                <p className="text-[12px] text-muted">{a.location}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
