import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./EligibilityCheck.scss";

/**
 * Turns a service's published requirements into something the reader can check
 * themselves against.
 *
 * The items are the page's own requirement list, unchanged — this does not
 * introduce criteria of its own, and it deliberately does not decide anything.
 * It counts what the reader ticked and names what they did not, which is the
 * honest limit of what a checklist can do and also the genuinely useful part:
 * the unticked lines are the conversation to have with a consultant.
 */
const EligibilityCheck: React.FC<{ items: string[] }> = ({ items }) => {
  const [ticked, setTicked] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const met = ticked.size;
  const total = items.length;
  const started = met > 0;
  const all = met === total;

  const verdict = useMemo(() => {
    if (!started) return "Tick the requirements you already meet.";
    if (all)
      return "You appear to meet every requirement listed on this page. That is a good sign, though a full application turns on evidence and detail this list cannot capture.";
    const outstanding = total - met;
    return `${outstanding} requirement${outstanding === 1 ? "" : "s"} left unticked. Those are the ones worth talking through — some have workarounds, others genuinely rule an application out.`;
  }, [started, all, met, total]);

  return (
    <div className="elig">
      <div className="elig__head">
        <h3 className="elig__title">Check yourself against these</h3>
        <span className="elig__count">
          <strong>{met}</strong> of {total}
        </span>
      </div>

      <div
        className="elig__meter"
        role="progressbar"
        aria-valuenow={met}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Requirements you have ticked"
      >
        <i style={{ width: `${total ? (met / total) * 100 : 0}%` }} />
      </div>

      <ul className="elig__list">
        {items.map((item, i) => (
          <li key={i}>
            <label className={`elig__item ${ticked.has(i) ? "is-on" : ""}`}>
              <input
                type="checkbox"
                checked={ticked.has(i)}
                onChange={() => toggle(i)}
              />
              <span className="elig__box" aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <path d="M3.5 8.5l3 3 6-6" />
                </svg>
              </span>
              {/* The requirement text is the page's own copy and may carry
                  inline markup, so it is rendered the same way as the plain
                  list it replaces. */}
              <span
                className="elig__text"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </label>
          </li>
        ))}
      </ul>

      <div className={`elig__verdict ${started ? "is-live" : ""}`}>
        <p aria-live="polite">{verdict}</p>
        {started && (
          <Link to="/book-consultation" className="elig__cta">
            Talk it through with an RCIC
          </Link>
        )}
      </div>

      <p className="elig__disclaimer">
        A self-assessment against the requirements shown above, not an
        eligibility decision. Officers assess the whole application.
      </p>
    </div>
  );
};

export default EligibilityCheck;
