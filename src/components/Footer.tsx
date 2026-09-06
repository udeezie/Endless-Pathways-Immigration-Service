import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import Logo from "./Logo";
import "./Footer.scss";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/book-consultation", label: "Consultation" },
  { to: "/blogs", label: "Blog" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
];

const SOCIALS = [
  {
    href: "https://instagram.com/endlessimmigration",
    label: "Instagram",
    Icon: FaInstagram,
  },
  {
    href: "https://linkedin.com/in/endlessimmigration",
    label: "LinkedIn",
    Icon: FaLinkedinIn,
  },
  { href: "https://wa.me/19059313776", label: "WhatsApp", Icon: FaWhatsapp },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__grain" aria-hidden="true" />

      <div className="site-footer__inner">
        <div className="site-footer__grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-brand__lockup">
              <span className="footer-brand__mark">
                <Logo size={30} title="Endless Immigration Pathways Logo" />
              </span>
              <span className="footer-brand__type">
                <span className="footer-brand__name">Endless Pathways</span>
                <span className="footer-brand__sub">Immigration Services</span>
              </span>
            </div>

            <div className="footer-social">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <nav className="footer-col" aria-label="Footer">
            <h2 className="footer-col__title">Navigate</h2>
            <ul className="footer-links">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="footer-col">
            <h2 className="footer-col__title">Contact</h2>
            <address className="footer-contact">
              <span className="footer-contact__addr">
                190 Harwood Avenue S
                <br />
                Ajax, Ontario L1S 2H6
              </span>
              <a href="tel:905-931-3776">905-931-3776</a>
              <a href="mailto:info@endlesspathways.ca">
                info@endlesspathways.ca
              </a>
              <span className="footer-contact__hours">Mon-Fri: 9am-5pm EST</span>
            </address>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="footer-legal">
            &copy; {currentYear} Endless Immigration Pathways. All rights
            reserved.
          </p>
          <p className="footer-reg">
            RCIC Number: R1053912
            <span className="footer-reg__sep" aria-hidden="true" />
            Member in good standing with ICCRC
          </p>
          <p className="footer-credit">
            Website by{" "}
            <a
              href="https://aflostudios.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              aflo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
