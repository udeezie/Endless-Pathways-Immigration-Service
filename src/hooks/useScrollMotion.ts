import { useState, useEffect, useRef } from "react";

/**
 * Scroll-driven entrances, shared by every page.
 *
 * Revealed content rests at opacity 0, which means a failure here does not
 * degrade the animation — it hides the page. So visibility is decided by three
 * independent mechanisms, and content only stays hidden if all three fail:
 *
 *   1. IntersectionObserver — the primary, and the only one that runs in the
 *      common case.
 *   2. A shared scroll/resize sweep — plain listeners, which keep firing in
 *      situations where observer delivery does not.
 *   3. A circuit breaker — if nothing has reported at all by the deadline, the
 *      whole system is switched off and everything becomes visible for good.
 *
 * Everything animates transform/opacity/clip-path only, so none of it forces
 * layout during scroll, and all of it opts out under prefers-reduced-motion.
 */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const REVEAL_OFF = "reveal-off";
const BREAKER_MS = 2500;

/** Elements still waiting to be revealed, with the callback that shows them. */
const pending = new Map<Element, () => void>();

let anyRevealFired = false;
let sweepAttached = false;
let breakerArmed = false;
let sweepRaf = 0;

const isOnScreen = (el: Element) => {
  const box = el.getBoundingClientRect();
  // Generous: anything even partly in view counts, so nothing can slip past a
  // fast scroll or a momentum fling.
  return box.top < window.innerHeight * 1.05 && box.bottom > -box.height * 0.1;
};

/** Reveals every pending element currently in view. */
const sweep = () => {
  sweepRaf = 0;
  if (!pending.size) return;

  for (const [el, show] of pending) {
    if (isOnScreen(el)) {
      pending.delete(el);
      show();
    }
  }
};

const requestSweep = () => {
  if (!sweepRaf) sweepRaf = requestAnimationFrame(sweep);
};

const attachSweep = () => {
  if (sweepAttached || typeof window === "undefined") return;
  sweepAttached = true;

  window.addEventListener("scroll", requestSweep, { passive: true });
  window.addEventListener("resize", requestSweep);
  // Coming back to a backgrounded tab is exactly when the observer may have
  // missed everything.
  document.addEventListener("visibilitychange", requestSweep);
};

const armBreaker = () => {
  if (breakerArmed || typeof document === "undefined") return;
  breakerArmed = true;

  window.setTimeout(() => {
    if (!anyRevealFired) {
      document.documentElement.classList.add(REVEAL_OFF);
      pending.clear();
    }
  }, BREAKER_MS);
};

export const useInView = <T extends HTMLElement>(threshold = 0.14) => {
  const [isIn, setIsIn] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    attachSweep();
    armBreaker();

    const show = () => {
      anyRevealFired = true;
      setIsIn(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          pending.delete(el);
          show();
          // One-shot: elements never re-hide on the way back up.
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);

    // Register with the scroll sweep as well, and take an immediate reading so
    // anything already on screen at mount never depends on the observer.
    pending.set(el, () => {
      observer.disconnect();
      show();
    });
    requestSweep();

    return () => {
      pending.delete(el);
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isIn };
};

/**
 * Publishes the element's travel through the viewport as `--py` (pixels) so
 * CSS can move a layer at a different rate from the page.
 */
export const useParallax = <T extends HTMLElement>(strength = 0.1) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      // How far the element's centre sits from the viewport's centre.
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.setProperty("--py", `${(-offset * strength).toFixed(2)}px`);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
};
