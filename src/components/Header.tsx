import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaCalendarCheck,
  FaNewspaper,
  FaCalendarAlt,
  FaEnvelope,
  FaStar,
} from "react-icons/fa";
import "./Header.css";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") === "dark";
    setIsDarkMode(savedTheme);
    if (savedTheme) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    if (newDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        !(e.target as Element).closest(".mobile-nav, .mobile-menu-button")
      )
        closeMenu();
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='70' viewBox='0 0 200 70'%3E%3Crect width='200' height='70' fill='%23333'/%3E%3Ctext x='20' y='45' font-family='Arial' font-size='16' fill='%23FFD700'%3EEndless Immigration%3C/text%3E%3C/svg%3E";
  };

  return (
    <>
      <header
        className={`header ${scrolled ? "scrolled" : ""} ${hideHeader ? "header-hidden" : ""}`}
      >
        <div className="header-container">
          <div className="header-logo">
            <Link to="/" className="logo-link" onClick={closeMenu}>
              <img
                src="/endless.jpeg"
                alt="Endless Immigration Pathways Logo"
                className="header-logo-image"
                onError={handleImageError}
              />
            </Link>
          </div>

          <nav className="desktop-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <FaHome className="nav-icon" />
                  <span>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/services" className="nav-link">
                  <FaBriefcase className="nav-icon" />
                  <span>Services</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/book-consultation" className="nav-link">
                  <FaCalendarCheck className="nav-icon" />
                  <span>Consultation</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/blogs" className="nav-link">
                  <FaNewspaper className="nav-icon" />
                  <span>Blog</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/events" className="nav-link">
                  <FaCalendarAlt className="nav-icon" />
                  <span>Events</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/client-reviews" className="nav-link">
                  <FaStar className="nav-icon" />
                  <span>Reviews</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  <FaEnvelope className="nav-icon" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-right-container">
            <label className="theme-switch" aria-label="Toggle dark/light mode">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                aria-checked={isDarkMode}
              />
              <span className="slider">
                <div className="circle">
                  <div className="divider"></div>
                </div>
              </span>
            </label>

            <div className="header-social-container">
              <div className="social-icons-card">
                <a
                  href="https://instagram.com/endlessimmigration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="socialContainer containerOne"
                  aria-label="Instagram"
                >
                  <svg className="socialSvg instagramSvg" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 1 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/endlessimmigration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="socialContainer containerThree"
                  aria-label="LinkedIn"
                >
                  <svg className="socialSvg linkdinSvg" viewBox="0 0 448 512">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
                <a
                  href="https://wa.me/19059313776"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="socialContainer containerFour"
                  aria-label="WhatsApp"
                >
                  <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.50-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <button
              className={`mobile-menu-button ${isMenuOpen ? "active" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`mobile-nav-overlay ${isMenuOpen ? "open" : ""}`}
        onClick={closeMenu}
        aria-hidden={!isMenuOpen}
      >
        <div
          className={`mobile-nav ${isMenuOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-nav-header">
            <Link to="/" className="logo-link" onClick={closeMenu}>
              <img
                src="/endless.jpeg"
                alt="Endless Immigration Pathways Logo"
                className="mobile-nav-logo"
                onError={handleImageError}
              />
            </Link>
            <button
              className="mobile-close-button"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <svg
                className="close-icon"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                  fill="#FFD700"
                />
              </svg>
            </button>
          </div>
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <Link to="/" className="mobile-nav-link" onClick={closeMenu}>
                <FaHome className="nav-icon" />
                <span>Home</span>
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link
                to="/services"
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                <FaBriefcase className="nav-icon" />
                <span>Services</span>
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link
                to="/book-consultation"
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                <FaCalendarCheck className="nav-icon" />
                <span>Book a Consultation</span>
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link to="/blogs" className="mobile-nav-link" onClick={closeMenu}>
                <FaNewspaper className="nav-icon" />
                <span>Blog</span>
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link
                to="/events"
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                <FaCalendarAlt className="nav-icon" />
                <span>Events</span>
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link
                to="/client-reviews"
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                <FaStar className="nav-icon" />
                <span>Reviews</span>
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link
                to="/contact"
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                <FaEnvelope className="nav-icon" />
                <span>Contact us</span>
              </Link>
            </li>
          </ul>

          <div className="mobile-social-section">
            <div className="mobile-social-icons">
              <a
                href="https://instagram.com/endlessimmigration"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-socialContainer containerOne"
                aria-label="Instagram"
                onClick={closeMenu}
              >
                <svg className="socialSvg instagramSvg" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 1 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/endlessimmigration"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-socialContainer containerThree"
                aria-label="LinkedIn"
                onClick={closeMenu}
              >
                <svg className="socialSvg linkdinSvg" viewBox="0 0 448 512">
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                </svg>
              </a>
              <a
                href="https://wa.me/19059313776"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-socialContainer containerFour"
                aria-label="WhatsApp"
                onClick={closeMenu}
              >
                <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.50-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;