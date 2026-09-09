import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ABILITY_KEYS,
  DEFAULT_INPUT,
  EDUCATION_OPTIONS,
  IELTS_TO_CLB,
  MAX_SCORE,
  calculateCrs,
} from "../data/crs";
import type { Abilities, CrsInput, EducationLevel } from "../data/crs";
import DrawTracker from "../components/DrawTracker";
import "./CrsCalculator.scss";

/**
 * Express Entry CRS calculator.
 *
 * The score recalculates on every keystroke rather than behind a submit button,
 * because the useful thing about this tool is watching which answers move the
 * number — that is the difference between a form and an explanation.
 *
 * All arithmetic lives in data/crs.ts. This file only collects answers.
 */

// Counts toward a new value instead of snapping, so a change of +50 reads as
// movement. Respects reduced-motion by jumping straight to the target.
const COUNT_MS = 520;

const useCountUp = (value: number) => {
  const [shown, setShown] = useState(value);
  const frame = useRef(0);
  const timer = useRef(0);
  // Read once. When the reader has asked for reduced motion the hook returns
  // the real value straight through and never animates at all.
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  // Mirrors `shown` so the tween can read where it is starting from without
  // taking it as a dependency, which would restart the tween on its own
  // updates and never settle.
  const shownRef = useRef(value);
  useEffect(() => {
    shownRef.current = shown;
  }, [shown]);

  useEffect(() => {
    if (reduced) return;
    const from = shownRef.current;
    if (from === value) return;

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(from + (value - from) * eased));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);

    // Animation frames are suspended in background tabs and, on some systems,
    // in windows that are not painting — and the page still reports itself as
    // visible, so checking visibilityState does not catch it. This deadline
    // guarantees the figure lands on the real score either way: a stale number
    // beside a live breakdown would be worse than no animation at all.
    timer.current = window.setTimeout(() => {
      cancelAnimationFrame(frame.current);
      setShown(value);
    }, COUNT_MS + 120);

    return () => {
      cancelAnimationFrame(frame.current);
      clearTimeout(timer.current);
    };
  }, [value, reduced]);

  return reduced ? value : shown;
};

interface Option<T> {
  value: T;
  label: string;
  hint?: string;
}

/** Radio group drawn as a row of buttons — quicker to hit than a select. */
function Segmented<T extends string | number | boolean>({
  legend,
  value,
  options,
  onChange,
  name,
}: {
  legend: string;
  value: T;
  options: Option<T>[];
  onChange: (v: T) => void;
  name: string;
}) {
  return (
    <fieldset className="crs-seg">
      <legend className="crs-label">{legend}</legend>
      <div className="crs-seg__row">
        {options.map((o) => (
          <label
            key={String(o.value)}
            className={`crs-seg__opt ${value === o.value ? "is-on" : ""}`}
          >
            <input
              type="radio"
              name={name}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            <span className="crs-seg__text">{o.label}</span>
            {o.hint && <span className="crs-seg__hint">{o.hint}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const CLB_LEVELS = [0, 4, 5, 6, 7, 8, 9, 10];

const clbLabel = (n: number) => (n === 0 ? "Below 4" : n === 10 ? "10+" : String(n));

/** The four language abilities, scored on the Canadian Language Benchmark. */
function ClbRow({
  legend,
  value,
  onChange,
  note,
}: {
  legend: string;
  value: Abilities;
  onChange: (v: Abilities) => void;
  note?: string;
}) {
  return (
    <fieldset className="crs-clb">
      <legend className="crs-label">{legend}</legend>
      {note && <p className="crs-note">{note}</p>}
      <div className="crs-clb__grid">
        {ABILITY_KEYS.map((k) => (
          <label key={k} className="crs-clb__cell">
            <span className="crs-clb__ability">{k}</span>
            <select
              className="crs-select"
              value={value[k]}
              onChange={(e) => onChange({ ...value, [k]: Number(e.target.value) })}
            >
              {CLB_LEVELS.map((n) => (
                <option key={n} value={n}>
                  {clbLabel(n)}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const YES_NO: Option<boolean>[] = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

const CrsCalculator: React.FC = () => {
  const [input, setInput] = useState<CrsInput>(DEFAULT_INPUT);
  const set = useCallback(
    <K extends keyof CrsInput>(key: K, v: CrsInput[K]) =>
      setInput((prev) => ({ ...prev, [key]: v })),
    [],
  );

  const result = useMemo(() => calculateCrs(input), [input]);
  const shown = useCountUp(result.total);

  // The last change, shown as a floating delta beside the score.
  const prev = useRef(result.total);
  const [delta, setDelta] = useState<number | null>(null);
  useEffect(() => {
    const d = result.total - prev.current;
    prev.current = result.total;
    if (!d) return;
    setDelta(d);
    const t = setTimeout(() => setDelta(null), 1100);
    return () => clearTimeout(t);
  }, [result.total]);

  const withSpouse = input.marital === "spouse" && input.spouseAccompanying;

  const bars = result.sections.map((s) => ({
    key: s.key,
    title: s.title,
    points: s.points,
    pct: (s.points / MAX_SCORE) * 100,
  }));

  return (
    <div className="crs-page">
      <header className="crs-intro">
        <div className="wrap">
          <span className="crs-intro__eyebrow">Express Entry</span>
          <h1 className="crs-intro__title">
            What is your <em>CRS score</em>?
          </h1>
          <p className="crs-intro__lede">
            The Comprehensive Ranking System decides who receives an invitation
            to apply for permanent residence. Answer the sections below and your
            score updates as you go, with a full breakdown of where every point
            came from.
          </p>
        </div>
      </header>

      <div className="wrap crs-draws">
        <DrawTracker />
      </div>

      <div className="wrap crs-body">
        <div className="crs-form">
          {/* 1 — About you */}
          <section className="crs-card" aria-labelledby="crs-you">
            <div className="crs-card__head">
              <span className="crs-card__step">01</span>
              <h2 id="crs-you" className="crs-card__title">
                About you
              </h2>
            </div>

            <Segmented
              name="marital"
              legend="Marital status"
              value={input.marital}
              options={[
                { value: "single", label: "Single" },
                { value: "spouse", label: "Married or common-law" },
              ]}
              onChange={(v) => set("marital", v)}
            />

            {input.marital === "spouse" && (
              <Segmented
                name="accompanying"
                legend="Is your spouse coming with you to Canada?"
                value={input.spouseAccompanying}
                options={[
                  { value: true, label: "Yes" },
                  {
                    value: false,
                    label: "No, or they are a citizen or PR",
                    hint: "Scored as single",
                  },
                ]}
                onChange={(v) => set("spouseAccompanying", v)}
              />
            )}

            <label className="crs-field">
              <span className="crs-label">Age</span>
              <div className="crs-age">
                <input
                  type="range"
                  min={17}
                  max={50}
                  value={input.age}
                  onChange={(e) => set("age", Number(e.target.value))}
                  className="crs-range"
                  aria-label="Age in years"
                />
                <output className="crs-age__value">
                  {input.age >= 50 ? "50+" : input.age}
                  <span> yrs</span>
                </output>
              </div>
              <p className="crs-note">
                Points peak between 20 and 29 and reach zero at 45.
              </p>
            </label>
          </section>

          {/* 2 — Education */}
          <section className="crs-card" aria-labelledby="crs-edu">
            <div className="crs-card__head">
              <span className="crs-card__step">02</span>
              <h2 id="crs-edu" className="crs-card__title">
                Education
              </h2>
            </div>

            <label className="crs-field">
              <span className="crs-label">Highest level completed</span>
              <select
                className="crs-select crs-select--wide"
                value={input.education}
                onChange={(e) =>
                  set("education", e.target.value as EducationLevel)
                }
              >
                {EDUCATION_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>

            <Segmented
              name="cdn-edu"
              legend="Did you study in Canada?"
              value={input.canadianEducation}
              options={[
                { value: "none", label: "No" },
                { value: "one-two", label: "One or two year credential" },
                { value: "three-plus", label: "Three years or longer" },
              ]}
              onChange={(v) => set("canadianEducation", v)}
            />
          </section>

          {/* 3 — Language */}
          <section className="crs-card" aria-labelledby="crs-lang">
            <div className="crs-card__head">
              <span className="crs-card__step">03</span>
              <h2 id="crs-lang" className="crs-card__title">
                Language
              </h2>
            </div>

            <Segmented
              name="firstlang"
              legend="First official language"
              value={input.firstLanguage}
              options={[
                { value: "english", label: "English" },
                { value: "french", label: "French" },
              ]}
              onChange={(v) => set("firstLanguage", v)}
            />

            <ClbRow
              legend="Test results, as Canadian Language Benchmark levels"
              value={input.first}
              onChange={(v) => set("first", v)}
            />

            <details className="crs-help">
              <summary>How do I convert my test scores to CLB?</summary>
              <p className="crs-note">
                CELPIP maps directly — a CELPIP level 9 is CLB 9. For IELTS
                General Training:
              </p>
              <div className="crs-help__scroll">
                <table className="crs-help__table">
                  <thead>
                    <tr>
                      <th>CLB</th>
                      <th>Listening</th>
                      <th>Reading</th>
                      <th>Writing</th>
                      <th>Speaking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {IELTS_TO_CLB.map((r) => (
                      <tr key={r.clb}>
                        <td>{r.clb}</td>
                        <td>{r.listening}</td>
                        <td>{r.reading}</td>
                        <td>{r.writing}</td>
                        <td>{r.speaking}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>

            <Segmented
              name="hassecond"
              legend={`Do you have a ${input.firstLanguage === "english" ? "French" : "English"} test result?`}
              value={input.hasSecond}
              options={YES_NO}
              onChange={(v) => set("hasSecond", v)}
            />

            {input.hasSecond && (
              <ClbRow
                legend="Second official language"
                value={input.second}
                onChange={(v) => set("second", v)}
                note="Strong French alongside English is worth up to 50 additional points."
              />
            )}
          </section>

          {/* 4 — Work */}
          <section className="crs-card" aria-labelledby="crs-work">
            <div className="crs-card__head">
              <span className="crs-card__step">04</span>
              <h2 id="crs-work" className="crs-card__title">
                Work experience
              </h2>
            </div>

            <Segmented
              name="cdnwork"
              legend="Skilled work experience in Canada"
              value={input.canadianWorkYears}
              options={[
                { value: 0, label: "None" },
                { value: 1, label: "1 yr" },
                { value: 2, label: "2 yrs" },
                { value: 3, label: "3 yrs" },
                { value: 4, label: "4 yrs" },
                { value: 5, label: "5+ yrs" },
              ]}
              onChange={(v) => set("canadianWorkYears", v)}
            />

            <Segmented
              name="foreignwork"
              legend="Skilled work experience outside Canada"
              value={input.foreignWorkYears}
              options={[
                { value: 0, label: "None" },
                { value: 1, label: "1 to 2 yrs" },
                { value: 3, label: "3+ yrs" },
              ]}
              onChange={(v) => set("foreignWorkYears", v)}
            />

            <Segmented
              name="cert"
              legend="Do you hold a Canadian certificate of qualification in a trade?"
              value={input.certificateOfQualification}
              options={YES_NO}
              onChange={(v) => set("certificateOfQualification", v)}
            />
          </section>

          {/* 5 — Spouse, only when the spouse columns actually apply */}
          {withSpouse && (
            <section className="crs-card" aria-labelledby="crs-spouse">
              <div className="crs-card__head">
                <span className="crs-card__step">05</span>
                <h2 id="crs-spouse" className="crs-card__title">
                  Your spouse
                </h2>
              </div>

              <label className="crs-field">
                <span className="crs-label">Their highest level of education</span>
                <select
                  className="crs-select crs-select--wide"
                  value={input.spouseEducation}
                  onChange={(e) =>
                    set("spouseEducation", e.target.value as EducationLevel)
                  }
                >
                  {EDUCATION_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>

              <ClbRow
                legend="Their language ability"
                value={input.spouseLanguage}
                onChange={(v) => set("spouseLanguage", v)}
              />

              <Segmented
                name="spousework"
                legend="Their skilled work experience in Canada"
                value={input.spouseCanadianWorkYears}
                options={[
                  { value: 0, label: "None" },
                  { value: 1, label: "1 yr" },
                  { value: 2, label: "2 yrs" },
                  { value: 3, label: "3 yrs" },
                  { value: 4, label: "4 yrs" },
                  { value: 5, label: "5+ yrs" },
                ]}
                onChange={(v) => set("spouseCanadianWorkYears", v)}
              />
            </section>
          )}

          {/* 6 — Additional */}
          <section className="crs-card" aria-labelledby="crs-extra">
            <div className="crs-card__head">
              <span className="crs-card__step">{withSpouse ? "06" : "05"}</span>
              <h2 id="crs-extra" className="crs-card__title">
                Additional points
              </h2>
            </div>

            <Segmented
              name="nomination"
              legend="Do you have a provincial or territorial nomination?"
              value={input.provincialNomination}
              options={YES_NO}
              onChange={(v) => set("provincialNomination", v)}
            />

            <Segmented
              name="sibling"
              legend="Do you have a sibling in Canada who is a citizen or PR?"
              value={input.siblingInCanada}
              options={YES_NO}
              onChange={(v) => set("siblingInCanada", v)}
            />

            <p className="crs-note crs-note--flag">
              A job offer no longer earns CRS points. IRCC removed arranged
              employment from the grid in March 2025, so there is no job offer
              question here.
            </p>
          </section>

          {/* Result */}
          <section className="crs-result" aria-labelledby="crs-result-title">
            <h2 id="crs-result-title" className="crs-result__title">
              Where your points come from
            </h2>

            {result.sections.map((s) => (
              <div key={s.key} className="crs-result__group">
                <div className="crs-result__grouphead">
                  <h3>{s.title}</h3>
                  <span className="crs-result__groupscore">
                    {s.points}
                    <i>/ {s.max}</i>
                  </span>
                </div>
                <ul className="crs-result__rows">
                  {s.rows.map((r) => (
                    <li key={r.label} className={r.points ? "is-earned" : ""}>
                      <span className="crs-result__rowlabel">{r.label}</span>
                      <span className="crs-result__rowbar" aria-hidden="true">
                        <i style={{ width: `${(r.points / r.max) * 100}%` }} />
                      </span>
                      <span className="crs-result__rowpts">{r.points}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <p className="crs-disclaimer">
              This calculator follows the published CRS grid and is provided for
              guidance only. It is an estimate, not an assessment of eligibility,
              and does not constitute legal advice. Your official score is the one
              generated by your Express Entry profile.
            </p>

            {/* Sits flush across the base of the result panel rather than in a
                box of its own, so it reads as the panel's conclusion. */}
            <div className="crs-cta">
              <p className="crs-cta__text">
                A score is a starting point, not a verdict. Which pathway suits
                you, and which factors are realistically worth improving,
                depends on your full situation.
              </p>
              <Link to="/book-consultation" className="btn btn--gold">
                Discuss your score with an RCIC
              </Link>
            </div>
          </section>
        </div>

        {/* Live score */}
        <aside className="crs-score" aria-label="Your estimated score">
          <div className="crs-score__inner">
            <span className="crs-score__label">Estimated CRS score</span>

            <div className="crs-score__figure">
              <span className="crs-score__value" aria-live="polite">
                {shown}
              </span>
              <span className="crs-score__max">of {MAX_SCORE}</span>
              {delta !== null && (
                <span
                  key={delta + "-" + result.total}
                  className={`crs-score__delta ${delta > 0 ? "is-up" : "is-down"}`}
                  aria-hidden="true"
                >
                  {delta > 0 ? "+" : ""}
                  {delta}
                </span>
              )}
            </div>

            <div className="crs-score__bar" aria-hidden="true">
              {bars.map((b) => (
                <i
                  key={b.key}
                  className={`crs-score__seg crs-score__seg--${b.key}`}
                  style={{ width: `${b.pct}%` }}
                  title={`${b.title}: ${b.points}`}
                />
              ))}
            </div>

            <ul className="crs-score__legend">
              {bars.map((b) => (
                <li key={b.key}>
                  <i className={`crs-score__dot crs-score__dot--${b.key}`} />
                  <span>{b.title}</span>
                  <strong>{b.points}</strong>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="crs-score__reset"
              onClick={() => setInput(DEFAULT_INPUT)}
            >
              Start over
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CrsCalculator;
