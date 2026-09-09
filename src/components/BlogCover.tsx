import React from "react";
import "./BlogCover.scss";

/**
 * Covers for the Monday Immigration Watch posts.
 *
 * These replaced stock photography — an alarm clock, a chalk question mark, a
 * two-way arrow sign — that said nothing about any particular article. Each
 * cover here carries a mark drawn from what its post is actually about: a
 * timeline that forks, a score climbing toward a cut-off, rails converging.
 *
 * Rendered inline rather than as <img src="*.svg"> for two reasons: an SVG
 * loaded through <img> is isolated and cannot pull in the site's webfonts, and
 * inline costs no request at all. They are vector, so a few hundred bytes each
 * covers every size from a 365px card to the 832px article slot.
 *
 * The headline is deliberately not drawn on the cover. Every place these appear
 * prints the title directly beneath, and burning it into artwork is what made
 * the old stock graphic look like a stock graphic.
 */

export type CoverVariant =
  | "categories"
  | "pgwp"
  | "crs"
  | "pivot"
  | "streams"
  | "eoi"
  | "trToPr"
  | "countdown";

const LABELS: Record<CoverVariant, string> = {
  categories: "Category draws",
  pgwp: "PGWP expiry",
  crs: "CRS score",
  pivot: "Express Entry to OINP",
  streams: "Provincial streams",
  eoi: "Ontario EOI streams",
  trToPr: "Temporary to permanent",
  countdown: "Permit expiry",
};

const GOLD = "#c9a54e";
const GOLD_BRIGHT = "#e0c78a";
const DIM = "rgba(245,244,242,0.30)";
const FAINT = "rgba(245,244,242,0.13)";

/** Category draws: a field of streams with a handful selected in a round. */
const Categories = () => (
  <g>
    {Array.from({ length: 18 }).map((_, i) => {
      const col = i % 6;
      const row = Math.floor(i / 6);
      const on = [2, 5, 9, 14].includes(i);
      return (
        <rect
          key={i}
          x={520 + col * 104}
          y={330 + row * 88}
          width={78}
          height={54}
          rx={3}
          fill={on ? GOLD : "none"}
          stroke={on ? GOLD : FAINT}
          strokeWidth={on ? 0 : 2}
          opacity={on ? 1 : 1}
        />
      );
    })}
  </g>
);

/** PGWP expiry: a run of status that ends, then forks into what comes next. */
const Pgwp = () => (
  <g fill="none" strokeWidth={3}>
    <path d="M300 470 H840" stroke={GOLD} />
    <circle cx={840} cy={470} r={11} fill={GOLD} />
    <path d="M840 470 C 960 470, 1000 360, 1180 360" stroke={DIM} strokeDasharray="10 12" />
    <path d="M840 470 C 960 470, 1000 580, 1180 580" stroke={DIM} strokeDasharray="10 12" />
    <path d="M840 470 H1180" stroke={FAINT} strokeDasharray="10 12" />
  </g>
);

/** CRS: a score climbing toward a cut-off it has not cleared yet. */
const Crs = () => {
  const bars = [120, 172, 210, 268, 300, 352, 398];
  return (
    <g>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={470 + i * 96}
          y={600 - h}
          width={54}
          height={h}
          rx={2}
          fill={i === bars.length - 1 ? GOLD : FAINT}
        />
      ))}
      <path d="M430 250 H1160" stroke={GOLD_BRIGHT} strokeWidth={2} strokeDasharray="9 11" fill="none" />
    </g>
  );
};

/** The pivot: one route fading out, another opening up. */
const Pivot = () => (
  <g fill="none" strokeWidth={3}>
    <path d="M330 430 C 560 430, 640 560, 900 590" stroke={FAINT} strokeDasharray="9 12" />
    <path d="M330 430 C 560 430, 660 300, 1150 285" stroke={GOLD} />
    <path d="M1108 262 L1155 285 L1108 308" stroke={GOLD} strokeLinejoin="round" strokeLinecap="round" />
    <circle cx={330} cy={430} r={10} fill={GOLD} />
  </g>
);

/** Several provincial routes leaving one starting point. */
const Streams = () => (
  <g fill="none" strokeWidth={3}>
    {[-170, -85, 0, 85, 170].map((dy, i) => (
      <path
        key={i}
        d={`M330 450 C 620 450, 760 ${450 + dy}, 1160 ${450 + dy}`}
        stroke={i === 1 ? GOLD : FAINT}
      />
    ))}
    <circle cx={330} cy={450} r={10} fill={GOLD} />
  </g>
);

/** A score that falls short, and the alternate route around it. */
const Eoi = () => (
  <g>
    {[92, 128, 106, 150].map((h, i) => (
      <rect key={i} x={430 + i * 86} y={600 - h} width={50} height={h} rx={2} fill={FAINT} />
    ))}
    <path d="M400 250 H1170" stroke={FAINT} strokeWidth={2} strokeDasharray="9 11" fill="none" />
    <path
      d="M790 560 C 900 560, 900 330, 1140 315"
      stroke={GOLD}
      strokeWidth={3}
      fill="none"
    />
    <path d="M1098 292 L1145 315 L1098 338" stroke={GOLD} strokeWidth={3} fill="none" strokeLinejoin="round" strokeLinecap="round" />
  </g>
);

/** Two statuses converging into one, with the size of the intake. */
const TrToPr = () => (
  <g>
    <g fill="none" strokeWidth={3}>
      <path d="M300 360 C 620 360, 700 460, 980 460" stroke={DIM} />
      <path d="M300 580 C 620 580, 700 460, 980 460" stroke={DIM} />
      <path d="M980 460 H1180" stroke={GOLD} />
      <circle cx={980} cy={460} r={11} fill={GOLD} />
    </g>
    <text x={300} y={648} className="cover__figure">
      33,000
    </text>
  </g>
);

/** Time on a permit, running down. */
const Countdown = () => (
  <g>
    {Array.from({ length: 12 }).map((_, i) => (
      <rect
        key={i}
        x={360 + i * 68}
        y={400}
        width={44}
        height={130}
        rx={3}
        fill={i < 4 ? GOLD : FAINT}
        opacity={i < 4 ? 1 - i * 0.16 : 1}
      />
    ))}
  </g>
);

const MARKS: Record<CoverVariant, React.FC> = {
  categories: Categories,
  pgwp: Pgwp,
  crs: Crs,
  pivot: Pivot,
  streams: Streams,
  eoi: Eoi,
  trToPr: TrToPr,
  countdown: Countdown,
};

interface BlogCoverProps {
  variant: CoverVariant;
  className?: string;
}

const BlogCover: React.FC<BlogCoverProps> = ({ variant, className }) => {
  const Mark = MARKS[variant] ?? Categories;

  return (
    // The chrome is HTML and only the mark is SVG. The slots these sit in run
    // from 16:9 to 16:10, so a single viewBox has to crop — and when the type
    // lived inside it, the crop ate the first characters of both lines. Text in
    // HTML is laid out against the real box instead, and sized in container
    // units so it scales with the card rather than the viewport.
    <div className={`cover ${className ?? ""}`} aria-hidden="true">
      <svg
        className="cover__art"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <rect width="1600" height="900" fill="#0c0e11" />

        {/* The faint rule field the rest of the site uses, at cover scale. */}
        <g stroke="rgba(245,244,242,0.055)" strokeWidth="1">
          {Array.from({ length: 15 }).map((_, i) => (
            <line key={i} x1={100 * (i + 1)} y1="0" x2={100 * (i + 1)} y2="900" />
          ))}
        </g>

        <Mark />
      </svg>

      <span className="cover__eyebrow">Monday Immigration Watch</span>
      <span className="cover__label">{LABELS[variant]}</span>
    </div>
  );
};

export default BlogCover;
