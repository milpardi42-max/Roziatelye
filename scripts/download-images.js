/**
 * download-images.js
 * Downloads all Pexels images used in data.ts / Hero.tsx
 * and places them in organised sub-folders under public/images/
 *
 * Run:  node scripts/download-images.js
 */

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ------------------------------------------------------------------ */
/*  Image manifest — url → local path (relative to public/images/)    */
/* ------------------------------------------------------------------ */
const images = [
  /* ===== HERO ===== */
  {
    url: "https://images.pexels.com/photos/3099309/pexels-photo-3099309.jpeg?auto=compress&cs=tinysrgb&w=1920",
    dest: "hero/hero-background.jpg",
  },

  /* ===== CATEGORIES ===== */
  {
    url: "https://images.pexels.com/photos/1249171/pexels-photo-1249171.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "categories/home-decor.jpg",
  },
  {
    url: "https://images.pexels.com/photos/8931783/pexels-photo-8931783.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "categories/rugs-textiles.jpg",
  },
  {
    url: "https://images.pexels.com/photos/28867382/pexels-photo-28867382.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "categories/ceramics.jpg",
  },
  {
    url: "https://images.pexels.com/photos/3099309/pexels-photo-3099309.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "categories/wall-art.jpg",
  },

  /* ===== STYLES ===== */
  {
    url: "https://images.pexels.com/photos/7867295/pexels-photo-7867295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "styles/geometric.jpg",
  },
  {
    url: "https://images.pexels.com/photos/15949827/pexels-photo-15949827.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "styles/organic.jpg",
  },
  {
    url: "https://images.pexels.com/photos/34465333/pexels-photo-34465333.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "styles/batik.jpg",
  },
  {
    url: "https://images.pexels.com/photos/6801218/pexels-photo-6801218.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "styles/minimal.jpg",
  },

  /* ===== ARTISTS — avatars ===== */
  {
    url: "https://images.pexels.com/photos/7147962/pexels-photo-7147962.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "artists/leila-mostofi-avatar.jpg",
  },
  {
    url: "https://images.pexels.com/photos/9903256/pexels-photo-9903256.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "artists/amir-rezvani-avatar.jpg",
  },
  {
    url: "https://images.pexels.com/photos/5682079/pexels-photo-5682079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "artists/sara-ahmadi-avatar.jpg",
  },
  {
    url: "https://images.pexels.com/photos/6322355/pexels-photo-6322355.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "artists/matin-karimi-avatar.jpg",
  },

  /* ===== ARTISTS — covers ===== */
  {
    url: "https://images.pexels.com/photos/7283181/pexels-photo-7283181.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "artists/leila-mostofi-cover.jpg",
  },
  {
    url: "https://images.pexels.com/photos/37472728/pexels-photo-37472728.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "artists/amir-rezvani-cover.jpg",
  },
  {
    url: "https://images.pexels.com/photos/20531142/pexels-photo-20531142.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "artists/sara-ahmadi-cover.jpg",
  },
  {
    url: "https://images.pexels.com/photos/34432628/pexels-photo-34432628.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "artists/matin-karimi-cover.jpg",
  },

  /* ===== PATTERNS ===== */
  {
    url: "https://images.pexels.com/photos/3099309/pexels-photo-3099309.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "patterns/lattice-bloom.jpg",
  },
  {
    url: "https://images.pexels.com/photos/34465333/pexels-photo-34465333.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "patterns/indigo-resist.jpg",
  },
  {
    url: "https://images.pexels.com/photos/7867295/pexels-photo-7867295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "patterns/copper-weave.jpg",
  },
  {
    url: "https://images.pexels.com/photos/8931783/pexels-photo-8931783.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "patterns/kashan-garden.jpg",
  },
  {
    url: "https://images.pexels.com/photos/6801218/pexels-photo-6801218.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "patterns/minimal-stripe.jpg",
  },
  {
    url: "https://images.pexels.com/photos/28867382/pexels-photo-28867382.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "patterns/vessel-grid.jpg",
  },
  {
    url: "https://images.pexels.com/photos/15949827/pexels-photo-15949827.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "patterns/soft-bloom.jpg",
  },
  {
    url: "https://images.pexels.com/photos/29298932/pexels-photo-29298932.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "patterns/market-weave.jpg",
  },

  /* ===== PRODUCTS — lattice-bloom-cushion ===== */
  {
    url: "https://images.pexels.com/photos/9316201/pexels-photo-9316201.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "products/lattice-bloom-cushion/image-1.jpg",
  },
  {
    url: "https://images.pexels.com/photos/1421176/pexels-photo-1421176.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "products/lattice-bloom-cushion/image-2.jpg",
  },
  {
    url: "https://images.pexels.com/photos/4271665/pexels-photo-4271665.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "products/lattice-bloom-cushion/image-3.jpg",
  },

  /* ===== PRODUCTS — indigo-resist-throw ===== */
  {
    url: "https://images.pexels.com/photos/920383/pexels-photo-920383.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "products/indigo-resist-throw/image-1.jpg",
  },
  {
    url: "https://images.pexels.com/photos/27459757/pexels-photo-27459757.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "products/indigo-resist-throw/image-2.jpg",
  },

  /* ===== PRODUCTS — kashan-garden-rug ===== */
  {
    url: "https://images.pexels.com/photos/8931788/pexels-photo-8931788.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "products/kashan-garden-rug/image-1.jpg",
  },
  {
    url: "https://images.pexels.com/photos/34536023/pexels-photo-34536023.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "products/kashan-garden-rug/image-2.jpg",
  },

  /* ===== PRODUCTS — vessel-grid-vase ===== */
  {
    url: "https://images.pexels.com/photos/28867382/pexels-photo-28867382.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "products/vessel-grid-vase/image-1.jpg",
  },
  {
    url: "https://images.pexels.com/photos/34259434/pexels-photo-34259434.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "products/vessel-grid-vase/image-2.jpg",
  },

  /* ===== PRODUCTS — copper-weave-cushion ===== */
  {
    url: "https://images.pexels.com/photos/6801218/pexels-photo-6801218.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "products/copper-weave-cushion/image-1.jpg",
  },
  {
    url: "https://images.pexels.com/photos/8416318/pexels-photo-8416318.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "products/copper-weave-cushion/image-2.jpg",
  },

  /* ===== PRODUCTS — minimal-stripe-cushion ===== */
  {
    url: "https://images.pexels.com/photos/1421176/pexels-photo-1421176.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "products/minimal-stripe-cushion/image-1.jpg",
  },
  {
    url: "https://images.pexels.com/photos/9252955/pexels-photo-9252955.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "products/minimal-stripe-cushion/image-2.jpg",
  },

  /* ===== PRODUCTS — soft-bloom-print ===== */
  {
    url: "https://images.pexels.com/photos/15949827/pexels-photo-15949827.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "products/soft-bloom-print/image-1.jpg",
  },

  /* ===== PRODUCTS — market-weave-pouf ===== */
  {
    url: "https://images.pexels.com/photos/37023127/pexels-photo-37023127.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "products/market-weave-pouf/image-1.jpg",
  },
  {
    url: "https://images.pexels.com/photos/920383/pexels-photo-920383.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "products/market-weave-pouf/image-2.jpg",
  },

  /* ===== PORTFOLIOS — covers & galleries ===== */
  {
    url: "https://images.pexels.com/photos/1249171/pexels-photo-1249171.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "portfolios/tahir-tower-lobby/cover.jpg",
  },
  {
    url: "https://images.pexels.com/photos/27459757/pexels-photo-27459757.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "portfolios/tahir-tower-lobby/gallery-2.jpg",
  },
  {
    url: "https://images.pexels.com/photos/834694/pexels-photo-834694.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "portfolios/tahir-tower-lobby/gallery-3.jpg",
  },
  {
    url: "https://images.pexels.com/photos/27459757/pexels-photo-27459757.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "portfolios/sara-studio-retreat/cover.jpg",
  },
  {
    url: "https://images.pexels.com/photos/920383/pexels-photo-920383.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "portfolios/sara-studio-retreat/gallery-2.jpg",
  },
  {
    url: "https://images.pexels.com/photos/34432628/pexels-photo-34432628.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "portfolios/matin-loom-house/cover.jpg",
  },
  {
    url: "https://images.pexels.com/photos/8931788/pexels-photo-8931788.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "portfolios/matin-loom-house/gallery-2.jpg",
  },

  /* ===== COURSES — covers ===== */
  {
    url: "https://images.pexels.com/photos/7283181/pexels-photo-7283181.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "courses/pattern-design-fundamentals.jpg",
  },
  {
    url: "https://images.pexels.com/photos/34465333/pexels-photo-34465333.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "courses/batik-resist-techniques.jpg",
  },
  {
    url: "https://images.pexels.com/photos/34432628/pexels-photo-34432628.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "courses/weaving-on-a-loom.jpg",
  },
  {
    url: "https://images.pexels.com/photos/37472728/pexels-photo-37472728.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    dest: "courses/ceramic-glaze-color.jpg",
  },
];

/* ------------------------------------------------------------------ */
/*  Download helper (follows redirects)                                */
/* ------------------------------------------------------------------ */
function download(url, destAbs) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destAbs);
    function get(u) {
      https
        .get(u, (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            file.destroy();
            const redir = res.headers.location.startsWith("http")
              ? res.headers.location
              : new URL(res.headers.location, u).href;
            get(redir);
            return;
          }
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode} for ${u}`));
            return;
          }
          res.pipe(file);
          file.on("finish", () => {
            file.close();
            resolve();
          });
        })
        .on("error", (err) => {
          fs.unlink(destAbs, () => {});
          reject(err);
        });
    }
    get(url);
  });
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */
const BASE = path.join(__dirname, "..", "public", "images");

// Deduplicate by dest path (same file may appear for multiple sections)
const seen = new Set();
const unique = images.filter(({ dest }) => {
  if (seen.has(dest)) return false;
  seen.add(dest);
  return true;
});

(async () => {
  console.log(`\n📂  Base folder: ${BASE}`);
  console.log(`📥  Total files to download: ${unique.length}\n`);

  let ok = 0;
  let skip = 0;
  let fail = 0;

  for (const { url, dest } of unique) {
    const abs = path.join(BASE, dest);
    const dir = path.dirname(abs);

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    if (fs.existsSync(abs)) {
      console.log(`  ⏭  skip   ${dest}`);
      skip++;
      continue;
    }

    try {
      await download(url, abs);
      console.log(`  ✅  saved  ${dest}`);
      ok++;
    } catch (err) {
      console.error(`  ❌  FAIL   ${dest} — ${err.message}`);
      fail++;
    }
  }

  console.log(`\n✨  Done — saved: ${ok}  skipped: ${skip}  failed: ${fail}\n`);
})();
