# Patrão (Roziatelye)

> **Turn every pattern into a possibility** — a premium, fully bilingual (EN / FA) creative marketplace for patterns, products, and portfolios.

Patrão is a static single-page application built with **React + TypeScript + Vite + Tailwind CSS**. It includes a storefront with cart & checkout flow, pattern and product catalogs with filtering/search/pagination, artist profiles, portfolios, an academy section, B2B pages, dark mode, and RTL support for Persian.

---

## 📁 Project structure

```
├── .github/workflows/     CI + GitHub Pages deployment
├── public/images/         Static images served with the site
├── scripts/               Asset download tooling
├── src/
│   ├── components/        Layout, cards, home sections, UI primitives
│   ├── lib/
│   │   ├── assets.ts      Base-path aware asset helper (GitHub Pages safe)
│   │   ├── data.ts        Typed mock content layer (products, patterns…)
│   │   ├── i18n.tsx       EN/FA translations + currency, RTL handling
│   │   ├── cart.tsx       Cart state (localStorage-backed)
│   │   └── theme.tsx      Light/dark theme
│   └── pages/             Route-level pages
├── index.html             SEO/meta + font loading
├── vite.config.ts         Build config (base path, alias, env)
└── tailwind.config.js     Design tokens
```

## 🚀 Local development

```bash
npm ci          # install the exact locked dependencies
npm run dev     # start the dev server (http://localhost:5173)
```

Other scripts:

| Script                 | Purpose                                  |
| ---------------------- | ---------------------------------------- |
| `npm run build`        | Production build into `dist/`            |
| `npm run preview`      | Serve the production build locally       |
| `npm run lint`         | ESLint                                   |
| `npm run typecheck`    | TypeScript type checking                 |
| `npm run check`        | Lint + typecheck (used in CI)            |

## 🌍 Deployment

The site is deployed automatically to **GitHub Pages** via `.github/workflows/deploy.yml`
on every push to `master` (it can also be run manually from the Actions tab).

Public configuration lives in `.env.production` (no secrets — safe to commit):

```env
VITE_SITE_URL=https://milpardi42-max.github.io/Roziatelye   # canonical URL for SEO
VITE_BASE=/Roziatelye/                                      # base path ("" or "/" for a custom domain)
```

### Moving to a custom domain

1. Point your DNS record at GitHub Pages (see GitHub's custom-domain docs).
2. Add the domain under **Settings → Pages → Custom domain**.
3. Set `VITE_BASE=/` and `VITE_SITE_URL=https://your-domain.com` in `.env.production`.
4. Push; the workflow rebuilds and redeploys automatically.

> **Note:** all image URLs in `src/lib/data.ts` go through the `asset()` helper
> (`src/lib/assets.ts`), so they automatically include the configured base path.

## 🧰 Tooling & quality

- **Node 20+**, npm lockfile committed (`package-lock.json`)
- **ESLint 9** (flat config) + **TypeScript strict mode**
- `npm run check` runs lint + typecheck locally; the Pages pipeline runs the same gates before every build

## 🎨 Design system

- Bilingual: English (LTR) and Persian (RTL) with a language switcher
- Light/dark theme persisted to `localStorage`, no flash-on-load
- Tailwind tokens: `container-page`, `font-display`, `accent`, `border-strong`, etc.

---

## فارسی — راهنمای سریع

این پروژه یک فروشگاه/مارکت‌پلیس کامل (React + TypeScript + Vite + Tailwind) است که به‌صورت خودکار روی **GitHub Pages** منتشر می‌شود.

- اجرای محلی: `npm ci` سپس `npm run dev`
- استقرار خودکار: هر push به شاخه `master` سایت را می‌سازد و منتشر می‌کند
- تنظیمات عمومی (آدرس سایت و مسیر پایه) در `.env.production` است
