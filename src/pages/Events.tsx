import React from "react";
import "./Events.css";

const Events: React.FC = () => {
  return (
    <div className="events-container">
      <div className="events-content">
        <div
          className="events-loader"
          aria-label="Loading indicator"
          role="img"
        >
          <div className="events-box1"></div>
          <div className="events-box2"></div>
          <div className="events-box3"></div>
        </div>
        <p className="events-message">Check back for events and updates.</p>
      </div>
    </div>
  );
};

export default Events;