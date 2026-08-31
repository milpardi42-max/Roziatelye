import { useEffect, useRef } from "react";

/* Reveal-on-scroll: adds .is-visible when the element enters the viewport. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string; delay?: number }
) {
  const ref = useRef<T>(null);
  const { threshold = 0.08, rootMargin = "0px 0px -48px 0px", delay = 0 } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (delay) {
              setTimeout(() => {
                e.target.classList.add("is-visible");
              }, delay);
            } else {
              e.target.classList.add("is-visible");
            }
            obs.unobserve(e.target);
          }
        }
      },
      {
        threshold,
        rootMargin,
      },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, delay]);
  return ref;
}
