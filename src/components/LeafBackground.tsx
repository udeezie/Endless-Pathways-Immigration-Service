import React from "react";
import "./LeafBackground.css";

interface LeafBackgroundProps {
  children: React.ReactNode;
}

const LeafBackground: React.FC<LeafBackgroundProps> = ({ children }) => {
  return (
    <div className="leaf-background-wrapper">
      <div className="background-pattern"></div>
      <div className="leaf-decoration">
        <div className="leaf-1"></div>
        <div className="leaf-2"></div>
        <div className="leaf-3"></div>
      </div>
      {children}
    </div>
  );
};

export default LeafBackground;
