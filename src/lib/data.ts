/* ============================================================
   PATRÃO — MOCK DATA LAYER
   Typed content consumed across the marketplace, store, and academy.
   ============================================================ */

import { asset } from "@/lib/assets";

export type Category = {
  slug: string;
  name: string;
  nameFa: string;
  description: string;
  image: string;
  count: number;
};

export type Style = {
  slug: string;
  name: string;
  nameFa: string;
  description: string;
  image: string;
};

export type Artist = {
  slug: string;
  name: string;
  nameFa: string;
  profession: string;
  professionFa: string;
  location: string;
  avatar: string;
  cover: string;
  bio: string;
  bioFa: string;
  social: { label: string; href: string }[];
  patternCount: number;
  productCount: number;
  projectCount: number;
  rating: number;
};

export type Pattern = {
  slug: string;
  name: string;
  nameFa: string;
  artistSlug: string;
  category: string;
  style: string;
  colors: string[];
  image: string;
  price: number;
  trending: boolean;
  bestSeller: boolean;
  exclusive: boolean;
  applications: string[];
  description: string;
  descriptionFa: string;
};

export type Product = {
  slug: string;
  name: string;
  nameFa: string;
  sku: string;
  category: string;
  style: string;
  material: string;
  materialFa: string;
  dimensions: string;
  color: string;
  colorFa: string;
  price: number;
  salePrice?: number;
  images: string[];
  patternSlug?: string;
  artistSlug?: string;
  inStock: boolean;
  lowStock: boolean;
  inventory: number;
  variants: { name: string; value: string }[];
  description: string;
  descriptionFa: string;
  shipping: string;
  shippingFa: string;
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  exclusive: boolean;
  rating: number;
  reviewCount: number;
};

export type Portfolio = {
  slug: string;
  title: string;
  titleFa: string;
  artistSlug: string;
  category: string;
  cover: string;
  gallery: string[];
  overview: string;
  overviewFa: string;
  story: string;
  storyFa: string;
  patternSlugs: string[];
  productSlugs: string[];
  year: number;
  location: string;
};

export type Course = {
  slug: string;
  title: string;
  titleFa: string;
  authorSlug: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  episodes: number;
  cover: string;
  overview: string;
  overviewFa: string;
  patternSlugs: string[];
  productSlugs: string[];
  popular: boolean;
  featured: boolean;
};

export const categories: Category[] = [
  {
    slug: "home-decor",
    name: "Home Décor",
    nameFa: "دکوراسیون خانه",
    description: "Cushions, throws, and objects that bring pattern into the room.",
    image: asset("/images/categories/home-decor.jpg"),
    count: 48,
  },
  {
    slug: "rugs-textiles",
    name: "Rugs & Textiles",
    nameFa: "فرش و پارچه",
    description: "Handwoven rugs and textile art from independent workshops.",
    image: asset("/images/categories/rugs-textiles.jpg"),
    count: 32,
  },
  {
    slug: "ceramics",
    name: "Ceramics",
    nameFa: "سرامیک",
    description: "Vases, vessels, and tableware shaped by hand.",
    image: asset("/images/categories/ceramics.jpg"),
    count: 27,
  },
  {
    slug: "wall-art",
    name: "Wall Art",
    nameFa: "هنر دیواری",
    description: "Patterned prints and woven hangings for the wall.",
    image: asset("/images/categories/wall-art.jpg"),
    count: 21,
  },
];

export const styles: Style[] = [
  {
    slug: "geometric",
    name: "Geometric",
    nameFa: "هندسی",
    description: "Order, rhythm, and repetition.",
    image: asset("/images/styles/geometric.jpg"),
  },
  {
    slug: "organic",
    name: "Organic",
    nameFa: "ارگانیک",
    description: "Soft, flowing, natural forms.",
    image: asset("/images/styles/organic.jpg"),
  },
  {
    slug: "batik",
    name: "Batik",
    nameFa: "باتیک",
    description: "Traditional resist-dye patterns.",
    image: asset("/images/styles/batik.jpg"),
  },
  {
    slug: "minimal",
    name: "Minimal",
    nameFa: "مینیمال",
    description: "Quiet, restrained, essential.",
    image: asset("/images/styles/minimal.jpg"),
  },
];

export const artists: Artist[] = [
  {
    slug: "leila-mostofi",
    name: "Leila Mostofi",
    nameFa: "لیلا مستوفی",
    profession: "Textile Designer",
    professionFa: "طراح پارچه",
    location: "Tehran, IR",
    avatar: asset("/images/artists/leila-mostofi-avatar.jpg"),
    cover: asset("/images/artists/leila-mostofi-cover.jpg"),
    bio: "Leila works at the intersection of Persian textile heritage and contemporary geometry. Her patterns have been licensed by hospitality groups across Europe and the Middle East.",
    bioFa:
      "لیلا در تلاقی میراث پارچه‌ای ایران و هندسه معاصر کار می‌کند. طرح‌های او توسط گروه‌های مهمان‌نوازی در اروپا و خاورمیانه لایسنس شده است.",
    social: [
      { label: "Instagram", href: "#" },
      { label: "Behance", href: "#" },
      { label: "Website", href: "#" },
    ],
    patternCount: 18,
    productCount: 24,
    projectCount: 7,
    rating: 4.9,
  },
  {
    slug: "amir-rezvani",
    name: "Amir Rezvani",
    nameFa: "امیر رضوانی",
    profession: "Ceramicist",
    professionFa: "سرامیک‌ساز",
    location: "Isfahan, IR",
    avatar: asset("/images/artists/amir-rezvani-avatar.jpg"),
    cover: asset("/images/artists/amir-rezvani-cover.jpg"),
    bio: "Amir draws on Isfahan's blue-tile tradition to create vessels that feel both ancient and modern. Each piece is wheel-thrown and glazed in his studio workshop.",
    bioFa:
      "امیر از سنت کاشی‌کاری آبی اصفهان وام می‌گیرد و ظروفی می‌سازد که کهن و نو به نظر می‌رسند. هر قطعه روی چرخ ساخته و در کارگاهش لعاب‌کاری می‌شود.",
    social: [
      { label: "Instagram", href: "#" },
      { label: "Website", href: "#" },
    ],
    patternCount: 9,
    productCount: 31,
    projectCount: 4,
    rating: 4.8,
  },
  {
    slug: "sara-ahmadi",
    name: "Sara Ahmadi",
    nameFa: "سارا احمدی",
    profession: "Pattern Designer",
    professionFa: "طراح الگو",
    location: "Lisbon, PT",
    avatar: asset("/images/artists/sara-ahmadi-avatar.jpg"),
    cover: asset("/images/artists/sara-ahmadi-cover.jpg"),
    bio: "Sara's batik-inspired patterns bridge West African technique with Mediterranean palette. She teaches surface design at the Patrão Academy.",
    bioFa:
      "الگوهای الهام‌گرفته از باتیک سارا، تکنیک غرب آفریقا را با پالت مدیترانه‌ای پیوند می‌دهد. او طراحی سطح را در آکادمی پاترائو آموزش می‌دهد.",
    social: [
      { label: "Instagram", href: "#" },
      { label: "Behance", href: "#" },
    ],
    patternCount: 22,
    productCount: 16,
    projectCount: 9,
    rating: 5.0,
  },
  {
    slug: "matin-karimi",
    name: "Matin Karimi",
    nameFa: "متین کریمی",
    profession: "Weaver",
    professionFa: "بافنده",
    location: "Kashan, IR",
    avatar: asset("/images/artists/matin-karimi-avatar.jpg"),
    cover: asset("/images/artists/matin-karimi-cover.jpg"),
    bio: "Matin weaves on a traditional loom in Kashan, producing rugs that reinterpret classical motifs for contemporary interiors. He mentors three apprentices.",
    bioFa:
      "متین روی یک دستگاه سنتی در کاشان بافت می‌کند و فرش‌هایی می‌سازد که نقش‌مoteهای کلاسیک را برای فضاهای معاصر بازتفسیر می‌کنند. او سه شاگرد دارد.",
    social: [{ label: "Website", href: "#" }],
    patternCount: 12,
    productCount: 19,
    projectCount: 5,
    rating: 4.7,
  },
];

export const patterns: Pattern[] = [
  {
    slug: "lattice-bloom",
    name: "Lattice Bloom",
    nameFa: "شکوفه شبکه‌ای",
    artistSlug: "leila-mostofi",
    category: "home-decor",
    style: "geometric",
    colors: ["Natural", "Copper"],
    image: asset("/images/patterns/lattice-bloom.jpg"),
    price: 120,
    trending: true,
    bestSeller: true,
    exclusive: false,
    applications: ["Cushions", "Throws", "Wall art"],
    description:
      "A geometric lattice softened by floral nodes, drawn from Persian garden geometry. Repeatable across large surfaces without visual fatigue.",
    descriptionFa:
      "شبکه هندسی با گره‌های گل نرم، برگرفته از هندسه باغ ایرانی. قابل تکرار روی سطوح بزرگ بدون خستگی بصری.",
  },
  {
    slug: "indigo-resist",
    name: "Indigo Resist",
    nameFa: "نیل مقاوم",
    artistSlug: "sara-ahmadi",
    category: "rugs-textiles",
    style: "batik",
    colors: ["Indigo", "Ivory"],
    image: asset("/images/patterns/indigo-resist.jpg"),
    price: 140,
    trending: true,
    bestSeller: false,
    exclusive: true,
    applications: ["Rugs", "Upholstery", "Wall art"],
    description:
      "Hand-resisted indigo on ivory, with organic crackle that records the maker's hand. No two yards are identical.",
    descriptionFa:
      "نیل دستی روی عاج، با ترک‌خوردگی ارگانیک که دست سازنده را ثبت می‌کند. هیچ دو یاردی یکسان نیست.",
  },
  {
    slug: "copper-weave",
    name: "Copper Weave",
    nameFa: "باف مسین",
    artistSlug: "leila-mostofi",
    category: "home-decor",
    style: "geometric",
    colors: ["Copper", "Slate"],
    image: asset("/images/patterns/copper-weave.jpg"),
    price: 95,
    trending: false,
    bestSeller: true,
    exclusive: false,
    applications: ["Cushions", "Table linen"],
    description:
      "A tight diagonal weave in copper and slate, designed for soft furnishings that read as both texture and pattern.",
    descriptionFa:
      "باف مورب فشرده در مس و سربی، طراحی‌شده برای منسوجات نرم که هم بافت و هم الگو خوانده می‌شوند.",
  },
  {
    slug: "kashan-garden",
    name: "Kashan Garden",
    nameFa: "باغ کاشان",
    artistSlug: "matin-karimi",
    category: "rugs-textiles",
    style: "organic",
    colors: ["Terracotta", "Sage"],
    image: asset("/images/patterns/kashan-garden.jpg"),
    price: 210,
    trending: true,
    bestSeller: false,
    exclusive: true,
    applications: ["Rugs", "Runners"],
    description:
      "A garden lattice motif reinterpreted from 17th-century Kashan rugs, woven in terracotta and sage wool.",
    descriptionFa:
      "نقش شبکه باغ، بازتفسیرشده از فرش‌های کاشان قرن هفدهم، بافته‌شده در پشم اخرایی و سبز.",
  },
  {
    slug: "minimal-stripe",
    name: "Minimal Stripe",
    nameFa: "خط مینیمال",
    artistSlug: "sara-ahmadi",
    category: "home-decor",
    style: "minimal",
    colors: ["Ivory", "Slate"],
    image: asset("/images/patterns/minimal-stripe.jpg"),
    price: 70,
    trending: false,
    bestSeller: true,
    exclusive: false,
    applications: ["Cushions", "Bedding", "Table linen"],
    description:
      "A restrained pinstripe in ivory and slate, designed to sit quietly beside bolder patterns in a collection.",
    descriptionFa:
      "خط‌باریک محدود در عاج و سربی، طراحی‌شده تا آرام کنار الگوهای جسورتر در یک مجموعه بنشیند.",
  },
  {
    slug: "vessel-grid",
    name: "Vessel Grid",
    nameFa: "شبکه ظرف",
    artistSlug: "amir-rezvani",
    category: "ceramics",
    style: "geometric",
    colors: ["Cobalt", "White"],
    image: asset("/images/patterns/vessel-grid.jpg"),
    price: 160,
    trending: false,
    bestSeller: false,
    exclusive: true,
    applications: ["Ceramics", "Tableware"],
    description:
      "A cobalt grid pattern adapted from Isfahan tilework, applied to wheel-thrown vessels and tableware.",
    descriptionFa:
      "الگوی شبکه کبالت برگرفته از کاشی‌کاری اصفهان، اعمال‌شده روی ظروف روی چرخ و سفره.",
  },
  {
    slug: "soft-bloom",
    name: "Soft Bloom",
    nameFa: "شکوفه نرم",
    artistSlug: "leila-mostofi",
    category: "wall-art",
    style: "organic",
    colors: ["Blush", "Sage"],
    image: asset("/images/patterns/soft-bloom.jpg"),
    price: 110,
    trending: true,
    bestSeller: false,
    exclusive: false,
    applications: ["Wall art", "Prints"],
    description:
      "An organic bloom in blush and sage, built for large-format wall prints and framed panels.",
    descriptionFa:
      "شکوفه ارگانیک در صورتی و سبز، ساخته‌شده برای چاپ‌های دیواری بزرگ و پنل‌های قاب‌دار.",
  },
  {
    slug: "market-weave",
    name: "Market Weave",
    nameFa: "باف بازار",
    artistSlug: "matin-karimi",
    category: "rugs-textiles",
    style: "geometric",
    colors: ["Multi"],
    image: asset("/images/patterns/market-weave.jpg"),
    price: 130,
    trending: false,
    bestSeller: true,
    exclusive: false,
    applications: ["Rugs", "Poufs"],
    description:
      "A multicolor geometric weave inspired by market textiles, durable enough for floor and pouf use.",
    descriptionFa:
      "باف چندرنگ هندسی الهام‌گرفته از پارچه‌های بازار، به‌قدری مقاوم برای کف و پوف.",
  },
];

export const products: Product[] = [
  {
    slug: "lattice-bloom-cushion",
    name: "Lattice Bloom Cushion",
    nameFa: "کوسن شکوفه شبکه‌ای",
    sku: "PRD-00124",
    category: "home-decor",
    style: "geometric",
    material: "Cotton",
    materialFa: "پنبه",
    dimensions: "50 × 50 cm",
    color: "Natural",
    colorFa: "طبیعی",
    price: 68,
    images: [
      asset("/images/products/lattice-bloom-cushion/image-1.jpg"),
      asset("/images/products/lattice-bloom-cushion/image-2.jpg"),
      asset("/images/products/lattice-bloom-cushion/image-3.jpg"),
    ],
    patternSlug: "lattice-bloom",
    artistSlug: "leila-mostofi",
    inStock: true,
    lowStock: false,
    inventory: 42,
    variants: [
      { name: "Size", value: "50 × 50 cm" },
      { name: "Size", value: "40 × 40 cm" },
      { name: "Color", value: "Natural" },
      { name: "Color", value: "Copper" },
    ],
    description:
      "A cotton cushion cover featuring the Lattice Bloom pattern, woven on a traditional loom and finished with a concealed zipper. Down insert included.",
    descriptionFa:
      "روبالشت پنبه‌ای با الگوی شکوفه شبکه‌ای، بافته‌شده روی دستگاه سنتی با زیپ مخفی. بالشت پر از داخل.",
    shipping: "Ships within 3 business days. Free shipping on orders over $150.",
    shippingFa: "ظرف ۳ روز کارس ارسال می‌شود. ارسال رایگان سفارش‌های بالای ۱۵۰ دلار.",
    featured: true,
    newArrival: false,
    bestSeller: true,
    exclusive: false,
    rating: 4.9,
    reviewCount: 128,
  },
  {
    slug: "indigo-resist-throw",
    name: "Indigo Resist Throw",
    nameFa: "پارچه نیل مقاوم",
    sku: "PRD-00187",
    category: "home-decor",
    style: "batik",
    material: "Linen",
    materialFa: "کتان",
    dimensions: "130 × 180 cm",
    color: "Indigo",
    colorFa: "نیل",
    price: 145,
    salePrice: 124,
    images: [
      asset("/images/products/indigo-resist-throw/image-1.jpg"),
      asset("/images/products/indigo-resist-throw/image-2.jpg"),
    ],
    patternSlug: "indigo-resist",
    artistSlug: "sara-ahmadi",
    inStock: true,
    lowStock: true,
    inventory: 8,
    variants: [
      { name: "Size", value: "130 × 180 cm" },
      { name: "Color", value: "Indigo" },
    ],
    description:
      "A hand-resisted indigo linen throw, each piece uniquely crackled by the dye process. Finished with hand-knotted fringe.",
    descriptionFa:
      "پارچه کتان نیل دستی، هر قطعه با ترک‌خوردگی یکتای فرآیند رنگرزی. با گره‌دستی تمام‌شده.",
    shipping: "Ships within 5 business days. Free shipping on orders over $150.",
    shippingFa: "ظرف ۵ روز کارس ارسال می‌شود. ارسال رایگان سفارش‌های بالای ۱۵۰ دلار.",
    featured: true,
    newArrival: true,
    bestSeller: false,
    exclusive: true,
    rating: 4.8,
    reviewCount: 64,
  },
  {
    slug: "kashan-garden-rug",
    name: "Kashan Garden Rug",
    nameFa: "فرش باغ کاشان",
    sku: "PRD-00203",
    category: "rugs-textiles",
    style: "organic",
    material: "Wool",
    materialFa: "پشم",
    dimensions: "200 × 300 cm",
    color: "Terracotta",
    colorFa: "اخرایی",
    price: 890,
    images: [
      asset("/images/products/kashan-garden-rug/image-1.jpg"),
      asset("/images/products/kashan-garden-rug/image-2.jpg"),
    ],
    patternSlug: "kashan-garden",
    artistSlug: "matin-karimi",
    inStock: true,
    lowStock: false,
    inventory: 6,
    variants: [
      { name: "Size", value: "200 × 300 cm" },
      { name: "Size", value: "160 × 230 cm" },
    ],
    description:
      "A handwoven wool rug reinterpreting the 17th-century Kashan garden lattice in terracotta and sage. 180 knots per square inch.",
    descriptionFa:
      "فرش پشم دستباف، بازتفسیر شبکه باغ کاشان قرن هفدهم در اخرایی و سبز. ۱۸۰ گره در اینچ مربع.",
    shipping: "Ships within 10 business days. White-glove delivery available.",
    shippingFa: "ظرف ۱۰ روز کارس ارسال می‌شود. تحویل ویژه موجود.",
    featured: false,
    newArrival: false,
    bestSeller: false,
    exclusive: true,
    rating: 5.0,
    reviewCount: 22,
  },
  {
    slug: "vessel-grid-vase",
    name: "Vessel Grid Vase",
    nameFa: "گلدان شبکه ظرف",
    sku: "PRD-00311",
    category: "ceramics",
    style: "geometric",
    material: "Stoneware",
    materialFa: "سنگ‌واره",
    dimensions: "Ø 18 × H 32 cm",
    color: "Cobalt",
    colorFa: "کبالت",
    price: 92,
    images: [
      asset("/images/products/vessel-grid-vase/image-1.jpg"),
      asset("/images/products/vessel-grid-vase/image-2.jpg"),
    ],
    patternSlug: "vessel-grid",
    artistSlug: "amir-rezvani",
    inStock: true,
    lowStock: false,
    inventory: 15,
    variants: [
      { name: "Size", value: "Ø 18 × H 32 cm" },
      { name: "Size", value: "Ø 12 × H 22 cm" },
    ],
    description:
      "A wheel-thrown stoneware vase with cobalt grid glaze adapted from Isfahan tilework. Each piece signed by the maker.",
    descriptionFa:
      "گلدان سنگ‌واره روی چرخ با لعاب شبکه کبالت برگرفته از کاشی‌کاری اصفهان. هر قطعه امضای سازنده.",
    shipping: "Ships within 4 business days. Wrapped in protective foam.",
    shippingFa: "ظرف ۴ روز کارس ارسال می‌شود. بسته‌بندی محافظ.",
    featured: true,
    newArrival: true,
    bestSeller: false,
    exclusive: false,
    rating: 4.7,
    reviewCount: 41,
  },
  {
    slug: "copper-weave-cushion",
    name: "Copper Weave Cushion",
    nameFa: "کوسن باف مسین",
    sku: "PRD-00125",
    category: "home-decor",
    style: "geometric",
    material: "Cotton",
    materialFa: "پنبه",
    dimensions: "45 × 45 cm",
    color: "Copper",
    colorFa: "مسین",
    price: 58,
    images: [
      asset("/images/products/copper-weave-cushion/image-1.jpg"),
      asset("/images/products/copper-weave-cushion/image-2.jpg"),
    ],
    patternSlug: "copper-weave",
    artistSlug: "leila-mostofi",
    inStock: true,
    lowStock: false,
    inventory: 60,
    variants: [
      { name: "Size", value: "45 × 45 cm" },
      { name: "Color", value: "Copper" },
      { name: "Color", value: "Slate" },
    ],
    description:
      "A cotton cushion cover with a tight diagonal weave in copper and slate. Reads as both texture and pattern. Down insert included.",
    descriptionFa:
      "روبالشت پنبه‌ای با باف مورب فشرده در مس و سربی. هم بافت و هم الگو خوانده می‌شود. بالشت پر از داخل.",
    shipping: "Ships within 3 business days. Free shipping on orders over $150.",
    shippingFa: "ظرف ۳ روز کارس ارسال می‌شود. ارسال رایگان سفارش‌های بالای ۱۵۰ دلار.",
    featured: false,
    newArrival: false,
    bestSeller: true,
    exclusive: false,
    rating: 4.8,
    reviewCount: 96,
  },
  {
    slug: "minimal-stripe-cushion",
    name: "Minimal Stripe Cushion",
    nameFa: "کوسن خط مینیمال",
    sku: "PRD-00130",
    category: "home-decor",
    style: "minimal",
    material: "Linen",
    materialFa: "کتان",
    dimensions: "50 × 50 cm",
    color: "Ivory",
    colorFa: "عاج",
    price: 62,
    images: [
      asset("/images/products/minimal-stripe-cushion/image-1.jpg"),
      asset("/images/products/minimal-stripe-cushion/image-2.jpg"),
    ],
    patternSlug: "minimal-stripe",
    artistSlug: "sara-ahmadi",
    inStock: true,
    lowStock: false,
    inventory: 38,
    variants: [
      { name: "Size", value: "50 × 50 cm" },
      { name: "Color", value: "Ivory" },
    ],
    description:
      "A restrained pinstripe linen cushion in ivory and slate, designed to sit quietly beside bolder patterns. Down insert included.",
    descriptionFa:
      "روبالشت کتان خط‌باریک محدود در عاج و سربی، طراحی‌شده تا آرام کنار الگوهای جسورتر بنشیند. بالشت پر از داخل.",
    shipping: "Ships within 3 business days. Free shipping on orders over $150.",
    shippingFa: "ظرف ۳ روز کارس ارسال می‌شود. ارسال رایگان سفارش‌های بالای ۱۵۰ دلار.",
    featured: false,
    newArrival: true,
    bestSeller: true,
    exclusive: false,
    rating: 4.6,
    reviewCount: 73,
  },
  {
    slug: "soft-bloom-print",
    name: "Soft Bloom Print",
    nameFa: "چاپ شکوفه نرم",
    sku: "PRD-00402",
    category: "wall-art",
    style: "organic",
    material: "Archival paper",
    materialFa: "کاغذ آرشیوی",
    dimensions: "50 × 70 cm",
    color: "Blush",
    colorFa: "صورتی",
    price: 78,
    images: [
      asset("/images/products/soft-bloom-print/image-1.jpg"),
    ],
    patternSlug: "soft-bloom",
    artistSlug: "leila-mostofi",
    inStock: true,
    lowStock: false,
    inventory: 25,
    variants: [
      { name: "Size", value: "50 × 70 cm" },
      { name: "Size", value: "70 × 100 cm" },
    ],
    description:
      "An archival giclée print of the Soft Bloom pattern in blush and sage. Signed and numbered edition of 100.",
    descriptionFa:
      "چاپ ژیکله آرشیوی الگوی شکوفه نرم در صورتی و سبز. امضادار و شماره‌دار، نسخه ۱۰۰.",
    shipping: "Ships within 5 business days. Rolled in a protective tube.",
    shippingFa: "ظرف ۵ روز کارس ارسال می‌شود. در لوله محافظ.",
    featured: true,
    newArrival: false,
    bestSeller: false,
    exclusive: true,
    rating: 4.9,
    reviewCount: 34,
  },
  {
    slug: "market-weave-pouf",
    name: "Market Weave Pouf",
    nameFa: "پوف باف بازار",
    sku: "PRD-00218",
    category: "rugs-textiles",
    style: "geometric",
    material: "Wool",
    materialFa: "پشم",
    dimensions: "Ø 50 × H 35 cm",
    color: "Multi",
    colorFa: "چندرنگ",
    price: 175,
    images: [
      asset("/images/products/market-weave-pouf/image-1.jpg"),
      asset("/images/products/market-weave-pouf/image-2.jpg"),
    ],
    patternSlug: "market-weave",
    artistSlug: "matin-karimi",
    inStock: false,
    lowStock: false,
    inventory: 0,
    variants: [{ name: "Color", value: "Multi" }],
    description:
      "A multicolor wool pouf woven in the Market Weave pattern, durable enough for floor seating. Filled with recycled textile fiber.",
    descriptionFa:
      "پوف پشم چندرنگ بافته‌شده در الگوی باف بازار، مقاوم برای نشستن روی کف. پر از الیاف پارچه‌ای بازیافتی.",
    shipping: "Ships within 7 business days.",
    shippingFa: "ظرف ۷ روز کارس ارسال می‌شود.",
    featured: false,
    newArrival: false,
    bestSeller: true,
    exclusive: false,
    rating: 4.5,
    reviewCount: 51,
  },
];

export const portfolios: Portfolio[] = [
  {
    slug: "tahir-tower-lobby",
    title: "Tahir Tower Lobby",
    titleFa: "لابی برج طاهر",
    artistSlug: "leila-mostofi",
    category: "Hospitality",
    cover: asset("/images/portfolios/tahir-tower-lobby/cover.jpg"),
    gallery: [
      asset("/images/portfolios/tahir-tower-lobby/cover.jpg"),
      asset("/images/portfolios/tahir-tower-lobby/gallery-2.jpg"),
      asset("/images/portfolios/tahir-tower-lobby/gallery-3.jpg"),
    ],
    overview:
      "A 400-square-meter hotel lobby furnished with custom Lattice Bloom cushions, Kashan Garden runners, and Vessel Grid ceramics.",
    overviewFa:
      "لابی هتل ۴۰۰ متری با کوسن‌های سفارشی شکوفه شبکه‌ای، رانر باغ کاشان و سرامیک شبکه ظرف.",
    story:
      "Leila was commissioned to unify the lobby's three seating zones under a single pattern language. She drew from the hotel's garden courtyard to develop a palette of natural, copper, and sage, then specified every soft furnishing and ceramic piece.",
    storyFa:
      "لیلا مأمور شد سه منطقه نشیمن لابی را زیر یک زبان الگویی واحد متحد کند. او از حیاط باغ هتل الهام گرفت و پالتی طبیعی، مس و سبز را توسعه داد، سپس هر منسوج و سرامیک را مشخص کرد.",
    patternSlugs: ["lattice-bloom", "copper-weave", "kashan-garden"],
    productSlugs: ["lattice-bloom-cushion", "copper-weave-cushion", "kashan-garden-rug", "vessel-grid-vase"],
    year: 2025,
    location: "Doha, QA",
  },
  {
    slug: "sara-studio-retreat",
    title: "Studio Retreat",
    titleFa: "اقامتگاه کارگاهی",
    artistSlug: "sara-ahmadi",
    category: "Residential",
    cover: asset("/images/portfolios/sara-studio-retreat/cover.jpg"),
    gallery: [
      asset("/images/portfolios/sara-studio-retreat/cover.jpg"),
      asset("/images/portfolios/sara-studio-retreat/gallery-2.jpg"),
    ],
    overview:
      "A Lisbon artist's retreat layered with Indigo Resist throws, Minimal Stripe cushions, and Soft Bloom wall prints.",
    overviewFa:
      "اقامتگاه هنرمند لیسبون با لایه‌های پارچه نیل مقاوم، کوسن خط مینیمال و چاپ‌های دیواری شکوفه نرم.",
    story:
      "Sara designed her own studio as a testing ground for pattern layering — batik against minimal stripe, organic bloom against geometric weave — to show collectors how the pieces live together.",
    storyFa:
      "سارا کارگاه خود را به‌عنوان میدان آزمایش لایه‌بندی الگو طراحی کرد — باتیک در برابر خط مینیمال، شکوفه ارگانیک در برابر باف هندسی — تا به مجموعه‌داران نشان دهد قطعات چگونه کنار هم زندگی می‌کنند.",
    patternSlugs: ["indigo-resist", "minimal-stripe", "soft-bloom"],
    productSlugs: ["indigo-resist-throw", "minimal-stripe-cushion", "soft-bloom-print"],
    year: 2026,
    location: "Lisbon, PT",
  },
  {
    slug: "matin-loom-house",
    title: "Loom House",
    titleFa: "خانه دستگاه",
    artistSlug: "matin-karimi",
    category: "Commercial",
    cover: asset("/images/portfolios/matin-loom-house/cover.jpg"),
    gallery: [
      asset("/images/portfolios/matin-loom-house/cover.jpg"),
      asset("/images/portfolios/matin-loom-house/gallery-2.jpg"),
    ],
    overview:
      "A working rug workshop and showroom in Kashan, with Market Weave poufs and a Kashan Garden rug on the floor.",
    overviewFa:
      "کارگاه و نمایشگاه فعال فرش در کاشان، با پوف‌های باف بازار و فرش باغ کاشان روی کف.",
    story:
      "Matin restored a 19th-century caravanserai as his workshop and showroom. The space doubles as an apprentice training center, where three weavers learn the craft alongside him.",
    storyFa:
      "متین یک کاروانسرای قرن نوزدهم را به‌عنوان کارگاه و نمایشگاه بازسازی کرد. فضا همزمان مرکز آموزش شاگردان است، جایی که سه بافنده کنار او صنعت را می‌آموزند.",
    patternSlugs: ["kashan-garden", "market-weave"],
    productSlugs: ["kashan-garden-rug", "market-weave-pouf"],
    year: 2025,
    location: "Kashan, IR",
  },
];

export const courses: Course[] = [
  {
    slug: "pattern-design-fundamentals",
    title: "Pattern Design Fundamentals",
    titleFa: "مبانی طراحی الگو",
    authorSlug: "leila-mostofi",
    category: "Design",
    level: "Beginner",
    duration: "4h 20m",
    episodes: 12,
    cover: asset("/images/courses/pattern-design-fundamentals.jpg"),
    overview:
      "Build a repeatable pattern from a single motif. Leila covers grid systems, color, and hand-drawn repeats you can license.",
    overviewFa:
      "یک الگوی تکرارشونده از یک نقوش بسازید. لیلا شبکه‌بندی، رنگ و تکرارهای دستی قابل لایسنس را آموزش می‌دهد.",
    patternSlugs: ["lattice-bloom", "copper-weave"],
    productSlugs: ["lattice-bloom-cushion"],
    popular: true,
    featured: true,
  },
  {
    slug: "batik-resist-techniques",
    title: "Batik Resist Techniques",
    titleFa: "تکنیک‌های باتیک مقاوم",
    authorSlug: "sara-ahmadi",
    category: "Textile",
    level: "Intermediate",
    duration: "3h 05m",
    episodes: 9,
    cover: asset("/images/courses/batik-resist-techniques.jpg"),
    overview:
      "Sara teaches traditional resist-dye methods adapted for modern studio practice, from wax application to indigo vat dyeing.",
    overviewFa:
      "سارا روش‌های سنتی رنگرزی مقاوم را برای کارگاه معاصر آموزش می‌دهد، از اعمال موم تا رنگرزی نیل.",
    patternSlugs: ["indigo-resist"],
    productSlugs: ["indigo-resist-throw"],
    popular: true,
    featured: false,
  },
  {
    slug: "weaving-on-a-loom",
    title: "Weaving on a Loom",
    titleFa: "بافتن روی دستگاه",
    authorSlug: "matin-karimi",
    category: "Textile",
    level: "Beginner",
    duration: "5h 10m",
    episodes: 14,
    cover: asset("/images/courses/weaving-on-a-loom.jpg"),
    overview:
      "Set up a traditional loom and weave your first rug. Matin covers warp, weft, tension, and finishing techniques.",
    overviewFa:
      "یک دستگاه سنتی برپا کنید و نخستین فرش خود را ببافید. متین تار، پود، کشش و تکنیک‌های اتمام را آموزش می‌دهد.",
    patternSlugs: ["kashan-garden", "market-weave"],
    productSlugs: ["kashan-garden-rug"],
    popular: false,
    featured: true,
  },
  {
    slug: "ceramic-glaze-color",
    title: "Ceramic Glaze & Color",
    titleFa: "لعاب و رنگ سرامیک",
    authorSlug: "amir-rezvani",
    category: "Ceramics",
    level: "Advanced",
    duration: "3h 45m",
    episodes: 11,
    cover: asset("/images/courses/ceramic-glaze-color.jpg"),
    overview:
      "Develop a signature glaze palette. Amir covers cobalt formulation, application, and firing for consistent results.",
    overviewFa:
      "یک پالت لعاب امضایی بسازید. امیر فرمولاسیون کبالت، اعمال و پخت برای نتیجه پایدار را آموزش می‌دهد.",
    patternSlugs: ["vessel-grid"],
    productSlugs: ["vessel-grid-vase"],
    popular: false,
    featured: false,
  },
];

/* ---------- Lookup helpers ---------- */

export const getArtist = (slug: string) => artists.find((a) => a.slug === slug);
export const getPattern = (slug: string) => patterns.find((p) => p.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getPortfolio = (slug: string) => portfolios.find((p) => p.slug === slug);
export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getStyle = (slug: string) => styles.find((s) => s.slug === slug);

export const productsByArtist = (slug: string) => products.filter((p) => p.artistSlug === slug);
export const patternsByArtist = (slug: string) => patterns.filter((p) => p.artistSlug === slug);
export const portfoliosByArtist = (slug: string) => portfolios.filter((p) => p.artistSlug === slug);
export const productsByPattern = (slug: string) => products.filter((p) => p.patternSlug === slug);
export const productsByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const productsByStyle = (slug: string) => products.filter((p) => p.style === slug);
export const patternsByStyle = (slug: string) => patterns.filter((p) => p.style === slug);
