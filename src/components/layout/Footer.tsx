import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t, lang, setLang } = useI18n();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const cols: { title: string; links: { label: string; to: string }[] }[] = [
    {
      title: t("nav.store"),
      links: [
        { label: t("store.featured"), to: "/store" },
        { label: t("store.newArrivals"), to: "/store?sort=newest" },
        { label: t("store.bestSellers"), to: "/store?sort=popular" },
        { label: t("store.categories"), to: "/store" },
      ],
    },
    {
      title: t("nav.patterns"),
      links: [
        { label: t("section.patterns.title"), to: "/patterns" },
        { label: t("section.trending.title"), to: "/patterns?sort=popular" },
        { label: t("section.exclusive.title"), to: "/patterns?exclusive=1" },
      ],
    },
    {
      title: t("nav.portfolio"),
      links: [
        { label: t("section.portfolios.title"), to: "/portfolio" },
        { label: t("nav.artists"), to: "/artists" },
        { label: t("nav.education"), to: "/education" },
      ],
    },
    {
      title: t("nav.about"),
      links: [
        { label: t("nav.b2b"), to: "/b2b" },
        { label: t("nav.contact"), to: "/contact" },
        { label: t("nav.about"), to: "/about" },
      ],
    },
  ];

  return (
    <footer className="mt-32 border-t border-[#d2d2d7]/60 bg-[#f5f5f7]">
      <div className="container-page py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-white">
                <svg viewBox="0 0 28 28" className="h-4 w-4" fill="none">
                  <path
                    d="M8 20V8l6 7 6-7v12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="font-display text-[1.05rem] tracking-[-0.02em] group-hover:opacity-70 transition-opacity">
                Patrão
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm text-foreground-secondary leading-relaxed">
              {t("footer.tagline")}
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="eyebrow mb-4">{t("footer.newsletter")}</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) {
                    setSent(true);
                    setEmail("");
                    setTimeout(() => setSent(false), 3000);
                  }
                }}
                className="flex items-center gap-2 rounded-full border border-[#d2d2d7] bg-white p-1 ps-4 pe-1 focus-within:border-foreground transition-colors"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("section.newsletter.placeholder")}
                  className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted min-w-0"
                />
                <button
                  type="submit"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-white hover:bg-[#3a3a3c] transition-colors shrink-0"
                  aria-label={t("section.newsletter.cta")}
                >
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </button>
              </form>
              {sent && (
                <p className="mt-2.5 text-xs text-success animate-fade-in">
                  {lang === "fa" ? "عضو شدید — سپاس!" : "Subscribed — thank you!"}
                </p>
              )}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:pt-1">
            {cols.map((col) => (
              <div key={col.title}>
                <h3 className="text-[12px] font-semibold text-foreground mb-5 tracking-wide">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-[13px] text-foreground-secondary hover:text-foreground transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-[#d2d2d7]/60 pt-8 sm:flex-row">
          <p className="text-[12px] text-muted">
            © {new Date().getFullYear()} Patrão. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="text-muted hover:text-foreground transition-colors">
                <Instagram className="h-[16px] w-[16px]" />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted hover:text-foreground transition-colors">
                <Twitter className="h-[16px] w-[16px]" />
              </a>
              <a href="#" aria-label="Youtube" className="text-muted hover:text-foreground transition-colors">
                <Youtube className="h-[16px] w-[16px]" />
              </a>
            </div>
            <span className="h-3.5 w-px bg-[#d2d2d7]" />
            <button
              onClick={() => setLang(lang === "en" ? "fa" : "en")}
              className="text-[12px] font-medium text-foreground-secondary hover:text-foreground transition-colors"
            >
              {lang === "en" ? "فارسی" : "English"}
            </button>
          </div>
          <div className="flex items-center gap-5 text-[12px] text-muted">
            <Link to="/about" className="hover:text-foreground transition-colors">{t("footer.privacy")}</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
