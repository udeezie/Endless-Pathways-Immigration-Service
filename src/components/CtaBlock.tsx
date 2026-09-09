import React from "react";
import { Link } from "react-router-dom";
import "./CtaBlock.scss";

/**
 * The standing call to action, standing on its own.
 *
 * It has been through two rejected shapes: a button loose at the foot of a
 * card, then a band flush across that card's base. Both still read as part of
 * the card they sat in. This one is not attached to anything — it is a sibling
 * of the panel above it, on the page's own ground, separated by space and a
 * single rule.
 */
const CtaBlock: React.FC<{
  children: React.ReactNode;
  label: string;
  to?: string;
  /** Offers the phone as an alternative to filling in a form. */
  phone?: boolean;
}> = ({ children, label, to = "/book-consultation", phone = true }) => (
  <aside className="cta-block">
    <p className="cta-block__text">{children}</p>

    <div className="cta-block__actions">
      <Link to={to} className="btn btn--gold">
        {label}
      </Link>
      {phone && (
        <span className="cta-block__or">
          or call <a href="tel:905-931-3776">905-931-3776</a>
        </span>
      )}
    </div>
  </aside>
);

export default CtaBlock;
