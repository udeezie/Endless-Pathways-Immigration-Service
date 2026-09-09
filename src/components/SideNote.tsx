import React from "react";
import "./SideNote.scss";

/**
 * A quiet aside beneath a panel — a caveat, not a call to action.
 *
 * This started as a CTA and went through three shapes before the answer turned
 * out to be that it should not be a CTA at all. The header carries a standing
 * consultation button on every page, so an in-page one was arguing for
 * something the reader had already been offered.
 */
const SideNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <aside className="side-note">
    <p>{children}</p>
  </aside>
);

export default SideNote;
