import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import Logo from "./Logo";
import "./Header.scss";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/blogs", label: "Blog" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
];

const CTA = { to: "/book-consultation", label: "Consultation" };

// Pages that open on a full-bleed dark photograph. The bar inverts to light
// text over these until it scrolls onto its own solid ground.
const DARK_HERO_ROUTES = ["/services"];

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

// Light is the default; the pitch-black theme is opt-in via the toggle.
const readTheme = () => {
  try {
    return localStorage.getItem("theme") === "dark";
  } catch {
    return false; // private mode
  }
};

const Brand: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <Link
    to="/"
    className="brand"
    onClick={onClick}
    aria-label="Endless Pathways Immigration Services, home"
  >
    <span className="brand__mark">
      <Logo size={26} />
    </span>
    <span className="brand__type">
      <span className="brand__name">Endless Pathways</span>
      <span className="brand__sub">Immigration Services</span>
    </span>
  </Link>
);

const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Read once at mount rather than in an effect, so the first paint is correct.
  const [isDark, setDark] = useState(readTheme);

  const lastY = useRef(0);
  const { pathname } = useLocation();

  const overHero = DARK_HERO_ROUTES.includes(pathname) && !scrolled;

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDark);
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {
        /* private mode — theme still applies for this session */
      }
      return next;
    });
  }, []);

  // rAF-throttled: scroll fires far more often than we can paint.
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        // Retreat going down, return going up.
        setHidden(y > lastY.current && y > 220);
        lastY.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isMenuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isMenuOpen]);

  // Close the drawer on navigation — including browser back/forward, which the
  // links' own onClick never sees. Adjusting state during render (rather than
  // in an effect) avoids a second render pass with the menu still open.
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    if (isMenuOpen) setMenuOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setMenuOpen(false);

  // The nav indicator is a single element that travels to the active link.
  // Measured from the DOM because the links are text of varying width.
  const navRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(
    null,
  );

  useLayoutEffect(() => {
    const measure = () => {
      const list = navRef.current;
      const active = list?.querySelector<HTMLElement>(".site-nav__link.is-active");
      if (!list || !active) {
        setIndicator(null);
        return;
      }
      setIndicator({ x: active.offsetLeft, w: active.offsetWidth });
    };

    measure();
    // Web fonts land after first paint and change the measurements.
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  return (
    <>
      <header
        className={[
          "site-header",
          scrolled ? "is-scrolled" : "",
          hidden && !isMenuOpen ? "is-hidden" : "",
          overHero ? "is-overHero" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="site-header__inner">
          <Brand />

          <nav className="site-nav" aria-label="Primary">
            <ul ref={navRef}>
              {indicator && (
                <li className="site-nav__indicator" aria-hidden="true">
                  <span
                    style={{
                      transform: `translateX(${indicator.x}px)`,
                      width: `${indicator.w}px`,
                    }}
                  />
                </li>
              )}
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `site-nav__link ${isActive ? "is-active" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              aria-pressed={isDark}
              type="button"
            >
              <span className="theme-btn__glyph" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="theme-btn__sun">
                  <circle cx="12" cy="12" r="4.4" />
                  <g strokeLinecap="round">
                    <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
                  </g>
                </svg>
                <svg viewBox="0 0 24 24" className="theme-btn__moon">
                  <path d="M20.2 14.4A8.4 8.4 0 0 1 9.6 3.8a8.4 8.4 0 1 0 10.6 10.6Z" />
                </svg>
              </span>
            </button>

            <Link to={CTA.to} className="header-cta">
              {CTA.label}
            </Link>

            <button
              className={`menu-btn ${isMenuOpen ? "is-open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              type="button"
            >
              <span className="menu-btn__bar" />
              <span className="menu-btn__bar" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`mobile-nav ${isMenuOpen ? "is-open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-nav__head">
          <Brand onClick={close} />
          <button
            className="mobile-nav__close"
            onClick={close}
            aria-label="Close menu"
            type="button"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        <nav className="mobile-nav__list" aria-label="Mobile">
          {[...NAV, { to: CTA.to, label: "Book a Consultation", end: false }].map(
            (item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `mobile-nav__link ${isActive ? "is-active" : ""}`
                }
                onClick={close}
                style={{ transitionDelay: `${0.06 + i * 0.045}s` }}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="mobile-nav__foot">
          <div className="mobile-nav__contact">
            <a href="tel:905-931-3776">905-931-3776</a>
            <a href="mailto:info@endlesspathways.ca">info@endlesspathways.ca</a>
            <span>Mon-Fri: 9am-5pm EST</span>
          </div>
          <div className="mobile-nav__social">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onClick={close}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`mobile-scrim ${isMenuOpen ? "is-open" : ""}`}
        onClick={close}
        aria-hidden="true"
      />
    </>
  );
};

export default Header;
