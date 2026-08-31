import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "./data";

export type CartLine = {
  slug: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  variant: string;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (product: Product, quantity?: number, variant?: string) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "patrao-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartLine[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
    const count = lines.reduce((sum, l) => sum + l.quantity, 0);
    return {
      lines,
      count,
      subtotal,
      add: (product, quantity = 1, variant = "") => {
        setLines((prev) => {
          const existing = prev.find((l) => l.slug === product.slug && l.variant === variant);
          if (existing) {
            return prev.map((l) =>
              l === existing ? { ...l, quantity: l.quantity + quantity } : l,
            );
          }
          return [
            ...prev,
            {
              slug: product.slug,
              name: product.name,
              sku: product.sku,
              image: product.images[0],
              price: product.salePrice ?? product.price,
              quantity,
              variant,
            },
          ];
        });
      },
      remove: (slug) => setLines((prev) => prev.filter((l) => l.slug !== slug)),
      setQty: (slug, quantity) =>
        setLines((prev) =>
          prev
            .map((l) => (l.slug === slug ? { ...l, quantity: Math.max(1, quantity) } : l))
            .filter((l) => l.quantity > 0),
        ),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
