import React from "react";

/**
 * The brand mark, as vector.
 *
 * Traced from the original artwork (design/logo-source.png, which carries its own
 * alpha channel) rather than redrawn, so the shape is genuinely the client's
 * logo and not an approximation. ~1.3KB of path data replaces a 250KB raster
 * that went soft at any size, and as inline SVG it costs no request and takes
 * its colour from the theme.
 *
 * Regenerate with trace.mjs if the source artwork ever changes.
 */

const MARK_PATHS = [
  "M 0.19,-50 L 7.98,-35.21 L 9.53,-33.66 L 11.48,-33.66 L 19.65,-38.72 L 17.32,-30.16 L 14.2,-13.42 L 15.37,-12.26 L 16.93,-12.65 L 27.82,-24.32 L 29.38,-18.87 L 30.93,-17.7 L 33.66,-17.7 L 44.16,-20.43 L 40.27,-5.64 L 42.22,-3.7 L 45.72,-2.14 L 39.49,3.31 L 32.88,7.2 L 23.54,10.7 L 10.7,13.81 L -4.09,18.48 L -13.81,22.37 L -26.26,28.99 L -23.15,20.82 L -23.15,17.32 L -24.71,15.37 L -45.72,-2.53 L -41.83,-3.7 L -39.88,-5.25 L -39.88,-7.98 L -43.39,-20.43 L -30.93,-17.32 L -29.77,-17.7 L -28.21,-20.04 L -27.43,-24.71 L -16.54,-13.04 L -14.59,-12.65 L -13.81,-13.42 L -13.81,-16.15 L -16.93,-32.1 L -18.87,-38.72 L -13.04,-34.82 L -10.7,-33.66 L -9.14,-33.66 L -7.2,-35.6 L -0.19,-49.61 Z",
  "M 38.33,7.2 L 35.6,10.31 L 30.16,14.2 L 11.87,21.98 L 2.53,26.65 L -5.25,31.71 L -13.81,39.88 L -20.43,50 L -36.38,50 L -36.38,49.22 L -30.93,41.83 L -24.71,35.6 L -19.65,31.71 L -13.04,27.43 L -4.47,23.15 L 11.48,17.32 L 28.6,12.26 L 37.94,7.59 Z",
  "M 30.54,15.76 L 27.04,19.26 L 12.26,30.93 L 6.81,36.77 L 3.7,43.77 L 3.7,50 L -9.92,50 L -6.03,40.66 L -2.14,35.6 L 2.53,31.32 L 8.37,27.43 L 30.16,16.15 Z",
];

interface LogoProps {
  /** Rendered size in px; the mark is square. */
  size?: number;
  className?: string;
  /** Decorative by default — the wordmark beside it carries the name. */
  title?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 40, className, title }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="-58 -58 116 116"
    role={title ? "img" : undefined}
    aria-label={title}
    aria-hidden={title ? undefined : true}
    focusable="false"
  >
    <g fill="currentColor">
      {MARK_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  </svg>
);

export default Logo;
