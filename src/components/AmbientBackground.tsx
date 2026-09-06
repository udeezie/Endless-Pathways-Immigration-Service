import React from "react";
import "./AmbientBackground.scss";

/**
 * The fixed atmosphere behind every page: a warm wash in the light theme and
 * film grain. Nothing drawn — no rules, no grid. Structure comes from the
 * layout itself.
 */
const AmbientBackground: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="ambient-root">
      <div className="ambient" aria-hidden="true">
        <div className="ambient__wash" />
        <div className="ambient__grain" />
      </div>

      {children}
    </div>
  );
};

export default AmbientBackground;
