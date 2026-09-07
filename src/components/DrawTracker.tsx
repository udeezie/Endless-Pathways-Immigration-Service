import React, { useState } from "react";
import {
  DRAWS_SOURCE,
  DRAWS_UPDATED,
  expressEntryDraws,
} from "../data/expressEntryDraws";
import "./DrawTracker.scss";

/**
 * The most recent Express Entry rounds, as a dated snapshot.
 *
 * Framed as history rather than as a target on purpose. Cut-offs swing by
 * hundreds of points between categories — 198 for physicians and 760 for a
 * provincial nomination in the same fortnight — so presenting any single number
 * as "the score you need" would be actively misleading. The date stamp and the
 * link to IRCC are part of the content, not decoration: they are what let a
 * reader tell whether this list still means anything.
 */
const DrawTracker: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [latest, ...rest] = expressEntryDraws;

  if (!latest) return null;

  return (
    <section className="drawtrack" aria-labelledby="drawtrack-title">
      <div className="drawtrack__bar">
        <div className="drawtrack__lead">
          <h2 id="drawtrack-title" className="drawtrack__label">
            Most recent round
          </h2>
          <p className="drawtrack__headline">
            <span className="drawtrack__date">{latest.date}</span>
            <span className="drawtrack__type">{latest.type}</span>
          </p>
        </div>

        <dl className="drawtrack__figures">
          <div>
            <dt>Invitations</dt>
            <dd>{latest.invitations.toLocaleString()}</dd>
          </div>
          <div>
            <dt>Lowest CRS invited</dt>
            <dd className="is-score">{latest.lowestCrs}</dd>
          </div>
        </dl>

        <button
          type="button"
          className="drawtrack__toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="drawtrack-history"
        >
          {open ? "Hide earlier rounds" : "Earlier rounds"}
        </button>
      </div>

      {/* Height animates from a collapsed grid row, so the panel can stay in the
          DOM for assistive tech without a fixed max-height guess. */}
      <div
        className={`drawtrack__panel ${open ? "is-open" : ""}`}
        id="drawtrack-history"
      >
        <div className="drawtrack__panelInner">
          <div className="drawtrack__scroll">
            <table className="drawtrack__table">
              <thead>
                <tr>
                  <th>Round</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Invitations</th>
                  <th>Lowest CRS</th>
                </tr>
              </thead>
              <tbody>
                {rest.map((d) => (
                  <tr key={d.round}>
                    <td>#{d.round}</td>
                    <td>{d.date}</td>
                    <td>{d.type}</td>
                    <td>{d.invitations.toLocaleString()}</td>
                    <td>{d.lowestCrs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="drawtrack__foot">
            Cut-offs are the lowest score invited in that round, not a threshold
            to aim for — they swing widely depending on which category is drawn.
            Checked {DRAWS_UPDATED}.{" "}
            <a href={DRAWS_SOURCE} target="_blank" rel="noopener noreferrer">
              Full list from IRCC
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DrawTracker;
