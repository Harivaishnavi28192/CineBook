import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home", num: "01", desc: "Featured movies & shows" },
  { to: "/movies", label: "Now Showing", num: "02", desc: "Explore all movies & filters" },
  { to: "/book", label: "Book Tickets", num: "03", desc: "Reserve seats & showtimes" },
  { to: "/bookings", label: "My Bookings", num: "04", desc: "View & manage reservations" },
  { to: "/admin", label: "Manage Movies", num: "05", desc: "Admin portal & schedule" }
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("cb_theme") || "dark");
  const location = useLocation();

  // Scroll detection for fixed header
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 400 && y > lastY + 4 && !menuOpen) {
        setHideHeader(true);
      } else if (y < lastY - 4) {
        setHideHeader(false);
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  // Apply theme to html root
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("cb_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const closeMenu = () => setMenuOpen(false);

  // Close menu on route change
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMenuOpen(false);
  }

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""} ${hideHeader ? "hide" : ""}`}>
        <div className="container d-flex align-items-center justify-content-between">
          {/* Brand */}
          <Link to="/" className="brand d-flex align-items-center gap-2 text-decoration-none" onClick={closeMenu}>
            <span className="brand-mark">
              <i className="ti ti-movie"></i>
            </span>
            <span className="brand-title">
              Cine<em>Book</em>
              <small>Cinema &amp; Booking</small>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="d-none d-lg-flex align-items-center gap-1 nav-desktop">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => `nav-link-pill ${isActive ? "active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="site-actions d-flex align-items-center gap-2">
            {/* Theme Toggle */}
            <button
              className="icon-btn"
              onClick={toggleTheme}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              aria-label="Toggle theme"
            >
              <i className={`ti ${theme === "dark" ? "ti-sun" : "ti-moon"}`}></i>
            </button>

            {/* Quick Book CTA */}
            <Link to="/book" className="btn btn-primary btn-pill d-none d-sm-inline-flex align-items-center gap-2">
              <i className="ti ti-ticket"></i>
              <span>Book Tickets</span>
            </Link>

            {/* Full-screen Menu Button */}
            <button
              className={`menu-btn-pill ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className="menu-lines">
                <i></i>
                <i></i>
              </span>
              <span className="menu-word">{menuOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Numbered Menu Overlay (HealthTwin style) */}
      <div className={`site-nav-overlay ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="container nav-inner">
          <div className="row g-5 align-items-center w-100">
            <div className="col-lg-7">
              <ol className="numbered-nav-list list-unstyled mb-0">
                {navLinks.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      onClick={closeMenu}
                      className={({ isActive }) => `numbered-link ${isActive ? "active" : ""}`}
                    >
                      <span className="num">{item.num}</span>
                      <span className="text">
                        {item.label}
                        <small>{item.desc}</small>
                      </span>
                      <i className="ti ti-arrow-right arrow-icon"></i>
                    </NavLink>
                  </li>
                ))}
              </ol>
            </div>

            <div className="col-lg-5">
              <div className="nav-side-cards d-flex flex-column gap-3">
                <Link to="/book" className="nav-side-card" onClick={closeMenu}>
                  <div className="card-icon bg-orange-soft">
                    <i className="ti ti-ticket text-orange"></i>
                  </div>
                  <div>
                    <b>Quick Ticket Booking</b>
                    <small>Instant seats, immediate confirmation</small>
                  </div>
                  <i className="ti ti-chevron-right ms-auto"></i>
                </Link>

                <Link to="/movies" className="nav-side-card" onClick={closeMenu}>
                  <div className="card-icon bg-amber-soft">
                    <i className="ti ti-flame text-amber"></i>
                  </div>
                  <div>
                    <b>Trending Now</b>
                    <small>Top rated releases &amp; special screenings</small>
                  </div>
                  <i className="ti ti-chevron-right ms-auto"></i>
                </Link>

                <Link to="/admin" className="nav-side-card nav-admin-card" onClick={closeMenu}>
                  <div className="card-icon bg-terracotta-soft">
                    <i className="ti ti-adjustments text-orange"></i>
                  </div>
                  <div>
                    <b>Theatre Administration</b>
                    <small>Add movies, manage showtimes &amp; capacity</small>
                  </div>
                  <i className="ti ti-chevron-right ms-auto"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
