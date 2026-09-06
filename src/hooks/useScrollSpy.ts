import { useState, useEffect } from "react";

/**
 * Tracks which of a set of sections is currently being read.
 *
 * Uses scroll position rather than IntersectionObserver: on a long reference
 * page several sections are on screen at once, and what the reader wants
 * highlighted is the one they are *in*, not merely the one that is visible.
 * The active section is the last whose top has passed the reading line.
 *
 * Returns the active id, and never returns null once mounted so the rail
 * always shows a position.
 */
export const useScrollSpy = (ids: string[], offset = 140) => {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (!ids.length) return;

    let raf = 0;

    const update = () => {
      raf = 0;

      // Bottom of the page: the last section can be too short to ever cross
      // the reading line, so pin to it once we run out of scroll.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) {
        setActiveId(ids[ids.length - 1]);
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) current = id;
      }
      setActiveId(current);
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
  }, [ids, offset]);

  return activeId;
};

/** Heading text -> stable DOM id. */
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
