import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-disclaimer">
        Walk-in appointments are not available. Please schedule a consultation
        in advance.
      </div>

      <div className="footer-logo-wrapper">
        <img
          src="/endless.jpeg"
          alt="Endless Immigration Pathways Logo"
          className="footer-logo-image"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/200x80/000000/FFD700?text=Endless+Immigration";
          }}
        />
      </div>

      <div className="footer-contact">
        <div>190 Harwood Avenue S</div>
        <div>Ajax, Ontario L1S 2H6</div>
        <div>
          <a href="tel:905-931-3776">905-931-3776</a>
        </div>
        <div>
          <a href="mailto:info@endlesspathways.ca">info@endlesspathways.ca</a>
        </div>
        <div>Mon-Fri: 9am-6pm EST</div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          © {currentYear} Endless Immigration Pathways. All rights reserved.
          <br />
          RCIC Number: R1053912 | Member in good standing with ICCRC
        </div>
      </div>
    </footer>
  );
};

export default Footer;