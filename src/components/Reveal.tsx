import React from "react";
import { useInView } from "../hooks/useScrollMotion";

type Variant = "up" | "mask" | "scale" | "fade";
type Tag = "div" | "section" | "article" | "li" | "header" | "figure" | "ul";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Anchor target, for in-page navigation. */
  id?: string;
  /** Seconds of transition-delay, for staggering siblings. */
  delay?: number;
  /** up = rise, mask = wipe up from a clip, scale = settle from oversize, fade = opacity only. */
  variant?: Variant;
  as?: Tag;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  className = "",
  id,
  delay = 0,
  variant = "up",
  as: Component = "div",
}) => {
  const { ref, isIn } = useInView<HTMLDivElement>();

  return (
    <Component
      id={id}
      ref={ref as React.RefObject<never>}
      className={[
        "reveal",
        `reveal--${variant}`,
        isIn ? "is-in" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Component>
  );
};

export default Reveal;
