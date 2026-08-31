import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Globe,
  Sun,
  Moon,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { useTheme } from "@/lib/theme";
import { categories, styles, patterns, products } from "@/lib/data";

export function Header() {
  const { t, lang, setLang, dir } = useI18n();
  const { count } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const openMega = (key: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMegaOpen(key);
  };
  const closeMega = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(null), 100);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      navigate(`/search?q=${encodeURIComponent(q.trim())}`);
      setSearchOpen(false);
      setMobileOpen(false);
      setQ("");
    }
  };

  const navItems = [
    { to: "/patterns", label: t("nav.patterns"), mega: "patterns" },
    { to: "/products", label: t("nav.products"), mega: "products" },
    { to: "/artists", label: t("nav.artists") },
    { to: "/portfolio", label: t("nav.portfolio") },
    { to: "/education", label: t("nav.education") },
    { to: "/store", label: t("nav.store") },
    { to: "/b2b", label: t("nav.b2b") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-2xl border-b border-[#d2d2d7]/60 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "bg-white/60 backdrop-blur-xl border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-[58px] items-center justify-between gap-4 lg:h-[64px]">
        {/* Left: mobile menu + logo */}
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden -ml-1.5 p-2 text-foreground rounded-lg hover:bg-background-secondary transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-[18px] w-[18px]" />
          </button>
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="Patrão home">
            <Logo />
            <span className="font-display text-[1.1rem] tracking-[-0.02em] text-foreground group-hover:opacity-70 transition-opacity">
              Patrão
            </span>
          </Link>
        </div>

        {/* Center: nav */}
        <nav className="hidden lg:flex items-center">
          {navItems.map((item) =>
            item.mega ? (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => openMega(item.mega!)}
                onMouseLeave={closeMega}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium transition-colors rounded-lg ${
                      isActive ? "text-foreground" : "text-foreground-secondary hover:text-foreground"
                    }`
                  }
                >
                  {item.label}
                  <svg className="h-3 w-3 opacity-40" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </NavLink>
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-[13px] font-medium transition-colors rounded-lg ${
                    isActive ? "text-foreground" : "text-foreground-secondary hover:text-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            className="p-2.5 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
            aria-label={t("nav.search")}
          >
            <Search className="h-[17px] w-[17px]" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="h-[17px] w-[17px]" /> : <Moon className="h-[17px] w-[17px]" />}
          </button>
          <button
            onClick={() => setLang(lang === "en" ? "fa" : "en")}
            className="hidden sm:flex items-center gap-1 p-2.5 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
            aria-label="Switch language"
          >
            <Globe className="h-[17px] w-[17px]" />
            <span className="text-[11px] font-medium uppercase tracking-wide">{lang}</span>
          </button>
          <Link
            to="/account"
            className="hidden sm:block p-2.5 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
            aria-label={t("nav.account")}
          >
            <User className="h-[17px] w-[17px]" />
          </Link>
          <Link
            to="/cart"
            className="relative p-2.5 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
            aria-label={t("nav.cart")}
          >
            <ShoppingBag className="h-[17px] w-[17px]" />
            {count > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] font-semibold text-white leading-none">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-full border-b border-[#d2d2d7]/60 bg-white/95 backdrop-blur-2xl animate-fade-in">
          <form
            onSubmit={submitSearch}
            className="container-page py-5 flex items-center gap-4"
          >
            <Search className="h-4 w-4 text-muted shrink-0" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`${t("nav.search")}…`}
              className="flex-1 bg-transparent text-[17px] outline-none placeholder:text-muted font-display"
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="p-2 rounded-lg hover:bg-background-secondary text-foreground-secondary transition-colors"
              aria-label="Close search"
            >
              <X className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mega menu */}
      {megaOpen && (
        <div
          className="absolute inset-x-0 top-full hidden lg:block"
          onMouseEnter={openMega.bind(null, megaOpen)}
          onMouseLeave={closeMega}
        >
          <div className="border-b border-[#d2d2d7]/60 bg-white/97 backdrop-blur-2xl animate-fade-in">
            <div className="container-page py-10">
              {megaOpen === "patterns" && <MegaPatterns dir={dir} />}
              {megaOpen === "products" && <MegaProducts dir={dir} />}
            </div>
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className={`absolute top-0 ${
              dir === "rtl" ? "left-0" : "right-0"
            } h-full w-[80%] max-w-xs bg-white shadow-elevated overflow-y-auto animate-slide-up`}
            style={{ animationDuration: "0.35s" }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#d2d2d7]/60">
              <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
                <Logo />
                <span className="font-display text-base tracking-[-0.02em]">Patrão</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-background-secondary text-foreground-secondary transition-colors"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-0.5">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-3 text-[15px] font-medium text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/about"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-3 text-[15px] font-medium text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
                  >
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-3 text-[15px] font-medium text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
                  >
                    {t("nav.contact")}
                  </Link>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-[#d2d2d7]/60">
                <button
                  onClick={() => setLang(lang === "en" ? "fa" : "en")}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-3 text-[15px] font-medium text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  {lang === "en" ? "فارسی" : "English"}
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
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
  );
}

function MegaPatterns({ dir }: { dir: "ltr" | "rtl" }) {
  const { t } = useI18n();
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-3">
        <p className="eyebrow mb-5">{t("section.styles.eyebrow")}</p>
        <ul className="space-y-0.5">
          {styles.map((s) => (
            <li key={s.slug}>
              <Link
                to={`/patterns?style=${s.slug}`}
                className="group flex items-center gap-3 rounded-lg p-2.5 hover:bg-background-secondary transition-colors"
              >
                <img
                  src={s.image}
                  alt=""
                  loading="lazy"
                  className="h-11 w-11 rounded-[8px] object-cover"
                />
                <span>
                  <span className="block text-[13px] font-medium text-foreground group-hover:text-accent transition-colors">
                    {dir === "rtl" ? s.nameFa : s.name}
                  </span>
                  <span className="block text-xs text-muted mt-0.5">{s.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-5">
        <p className="eyebrow mb-5">{t("section.patterns.eyebrow")}</p>
        <div className="grid grid-cols-3 gap-3">
          {patterns.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              to={`/patterns/${p.slug}`}
              className="group zoom-img relative aspect-[4/5] overflow-hidden rounded-[10px] border border-[#d2d2d7]/60"
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3">
                <span className="text-[12px] font-medium text-white leading-tight">
                  {dir === "rtl" ? p.nameFa : p.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="col-span-4">
        <p className="eyebrow mb-5">{t("nav.explore")}</p>
        <ul className="space-y-0.5">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                to={`/patterns?category=${c.slug}`}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-background-secondary transition-colors"
              >
                <span className="text-[13px] font-medium text-foreground-secondary hover:text-foreground">
                  {dir === "rtl" ? c.nameFa : c.name}
                </span>
                <span className="text-xs text-muted tabular-nums">{c.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MegaProducts({ dir }: { dir: "ltr" | "rtl" }) {
  const { t } = useI18n();
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-3">
        <p className="eyebrow mb-5">{t("store.categories")}</p>
        <ul className="space-y-0.5">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                to={`/store/category/${c.slug}`}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-background-secondary transition-colors"
              >
                <span className="text-[13px] font-medium text-foreground-secondary hover:text-foreground">
                  {dir === "rtl" ? c.nameFa : c.name}
                </span>
                <span className="text-xs text-muted tabular-nums">{c.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-9">
        <p className="eyebrow mb-5">{t("store.featured")}</p>
        <div className="grid grid-cols-4 gap-3">
          {products.slice(0, 4).map((p) => (
            <Link
              key={p.slug}
              to={`/products/${p.slug}`}
              className="group zoom-img relative aspect-square overflow-hidden rounded-[10px] border border-[#d2d2d7]/60"
            >
              <img
                src={p.images[0]}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-2.5">
                <span className="text-[11px] font-medium text-white line-clamp-1">
                  {dir === "rtl" ? p.nameFa : p.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
