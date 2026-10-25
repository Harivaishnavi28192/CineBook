import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Footer() {
  const [serverOnline, setServerOnline] = useState(null);

  useEffect(() => {
    api
      .get("/")
      .then(() => setServerOnline(true))
      .catch(() => setServerOnline(false));
  }, []);

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Footer Editorial Callout */}
        <div className="footer-hero reveal">
          <h2 className="display-1">
            Cinema, <em>together.</em>
          </h2>
          <Link to="/book" className="btn btn-primary btn-pill btn-lg d-inline-flex align-items-center gap-2">
            <i className="ti ti-ticket"></i>
            <span>Book an experience</span>
          </Link>
        </div>

        {/* Decorative Frequency / Film Stroke SVG */}
        <svg className="footer-illustration" viewBox="0 0 1200 140" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="draw"
            d="M0 100 H260 l18 -40 22 70 20 -110 22 120 18 -40 H520 c40 0 50 -60 90 -60 s50 60 90 60 H860 l14 -24 16 40 14 -16 H1200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g className="footer-icons" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M600 52 c-10 -14 -32 -6 -32 10 c0 16 32 34 32 34 s32 -18 32 -34 c0 -16 -22 -24 -32 -10z" />
            <path d="M120 100 v-40 h40 v40 M132 72 h16 M140 64 v16" />
            <path d="M1040 100 v-50 h56 v50 M1060 100 v-18 h16 v18 M1056 62 h8 M1072 62 h8" />
          </g>
        </svg>

        {/* Footer Grid */}
        <div className="footer-grid">
          <div className="footer-brand-col">
            <Link to="/" className="brand d-flex align-items-center gap-2 text-decoration-none mb-3">
              <span className="brand-mark">
                <i className="ti ti-movie"></i>
              </span>
              <span className="brand-title">
                Cine<em>Book</em>
                <small>Cinema &amp; Booking</small>
              </span>
            </Link>
            <p className="footer-about">
              CineBook is an editorial movie ticketing experience built with React, Vite, Node.js, Express, and MongoDB.
              Explore the latest blockbusters, select your preferred showtimes, and book seats with instant ticket confirmation.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links list-unstyled">
              <li>
                <Link to="/">Home Overview</Link>
              </li>
              <li>
                <Link to="/movies">Now Showing</Link>
              </li>
              <li>
                <Link to="/book">Book Tickets</Link>
              </li>
              <li>
                <Link to="/bookings">My Bookings</Link>
              </li>
              <li>
                <Link to="/admin">Manage Movies</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Experience</h4>
            <ul className="footer-links list-unstyled">
              <li>
                <span className="text-secondary-emphasis">IMAX Laser 4K</span>
              </li>
              <li>
                <span className="text-secondary-emphasis">Dolby Atmos Sound</span>
              </li>
              <li>
                <span className="text-secondary-emphasis">Luxury Recliner Seating</span>
              </li>
              <li>
                <span className="text-secondary-emphasis">Zero Cancellation Fee</span>
              </li>
            </ul>
          </div>

          <div>
            <h4>Project Team</h4>
            <ul className="footer-links list-unstyled">
              <li className="mb-2">
                <div className="fw-semibold text-body">Christy Vincelet A</div>
                <small className="text-secondary">URK24CS1199</small>
              </li>
              <li>
                <div className="fw-semibold text-body">Hari Vaishnavi</div>
                <small className="text-secondary">URK24CS1238</small>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-base d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <span>&copy; 2026 CineBook — Movie Ticket Booking Platform · All rights reserved</span>
          <div className="d-flex align-items-center gap-2">
            <span
              className={`status-pill ${serverOnline === true ? "status-ok" : serverOnline === false ? "status-err" : "status-off"}`}
            >
              <i className="ti ti-circle-filled me-1"></i>
              {serverOnline === true
                ? "Backend Connected"
                : serverOnline === false
                ? "Backend Offline (Port 7000)"
                : "Checking API..."}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
