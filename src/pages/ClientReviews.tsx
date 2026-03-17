import React, { useEffect } from "react";
import "./ClientReviews.css";

const ClientReviews: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="client-reviews-page">
      <div className="background-pattern" aria-hidden="true"></div>

      <section className="client-reviews-grid-section">
        <div className="client-reviews-container">
          {/* Elfsight Google Reviews widget */}
          <div
            className="elfsight-app-f58d9626-b2a6-48ca-9a96-40c89f7f8f31"
            data-elfsight-app-lazy
          ></div>
        </div>
      </section>
    </div>
  );
};

export default ClientReviews;
