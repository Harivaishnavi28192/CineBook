import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import MovieDetailsModal from "../components/MovieDetailsModal";
import AnimatedCounter from "../components/AnimatedCounter";
import { SHOWTIMES, posterGradient } from "../utils";

function Home({ movies, bookings, loading }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const heroCardRef = useRef(null);

  const activeBookings = bookings.filter((b) => b.status === "Booked");
  const seatsBooked = activeBookings.reduce((sum, b) => sum + b.seats, 0);
  const languages = new Set(movies.map((m) => m.language.toLowerCase())).size;
  const featured = movies.find((m) => m.availableSeats > 0) || movies[0];

  const book = (movie) => navigate(`/book?movie=${movie.movieId}`);

  // Parallax tilt effect for hero ticket
  useEffect(() => {
    const card = heroCardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 12;
      const rotateY = (x / rect.width) * 12;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [featured]);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero position-relative">
        {/* Ambient Glowing Blobs */}
        <div className="hero-blob b1" aria-hidden="true"></div>
        <div className="hero-blob b2" aria-hidden="true"></div>

        <div className="container py-5">
          <div className="row align-items-center g-5 py-lg-4">
            <div className="col-lg-7">
              <span className="eyebrow reveal">
                <i className="ti ti-sparkles me-1"></i> Premiere Cinema Experience · Daily Screenings
              </span>

              <h1 className="hero-title reveal">
                <span className="line">
                  <span>Cinema that feels</span>
                </span>
                <span className="line">
                  <span>
                    <em>unforgettable.</em> Stories
                  </span>
                </span>
                <span className="line">
                  <span>
                    that come <em>alive.</em>
                  </span>
                </span>
              </h1>

              <p className="hero-lead reveal" style={{ "--d": "0.2s" }}>
                Explore the latest releases, select your preferred laser showtimes, and reserve luxury recliner seats
                in seconds with instant barcode confirmation.
              </p>

              <div className="d-flex flex-wrap gap-3 pt-2 reveal" style={{ "--d": "0.3s" }}>
                <Link to="/book" className="btn btn-primary btn-pill btn-lg d-inline-flex align-items-center gap-2">
                  <i className="ti ti-ticket"></i>
                  <span>Book Tickets Now</span>
                </Link>
                <Link to="/movies" className="btn btn-outline-custom btn-pill btn-lg d-inline-flex align-items-center gap-2">
                  <i className="ti ti-film"></i>
                  <span>Explore Movies</span>
                </Link>
              </div>

              {/* Quick highlights under CTAs */}
              <div className="d-flex flex-wrap gap-4 pt-4 mt-2 reveal text-secondary" style={{ "--d": "0.4s" }}>
                <div className="d-flex align-items-center gap-2 small">
                  <i className="ti ti-device-tv text-orange fs-5"></i>
                  <span>IMAX 4K Laser</span>
                </div>
                <div className="d-flex align-items-center gap-2 small">
                  <i className="ti ti-volume text-orange fs-5"></i>
                  <span>Dolby Atmos 7.1</span>
                </div>
                <div className="d-flex align-items-center gap-2 small">
                  <i className="ti ti-rotate-clockwise text-orange fs-5"></i>
                  <span>Zero Cancellation Fees</span>
                </div>
              </div>
            </div>

            {/* Featured movie ticket */}
            <div className="col-lg-5 reveal" style={{ "--d": "0.25s" }}>
              {featured ? (
                <div
                  ref={heroCardRef}
                  className="hero-ticket-wrap"
                  role="button"
                  onClick={() => setSelected(featured)}
                  title="Click to view details"
                >
                  <div className="hero-ticket shadow-lg">
                    <div className="poster poster-lg" style={{ background: posterGradient(featured.movieId) }}>
                      <span className="badge rounded-pill seat-badge bg-dark bg-opacity-75 border border-white border-opacity-10">
                        <i className="ti ti-flame text-amber me-1"></i> Featured Screening
                      </span>
                      <div className="poster-title fs-2">{featured.title}</div>
                      <div className="poster-play-wrap">
                        <i className="ti ti-player-play-filled poster-play-icon"></i>
                      </div>
                    </div>
                    <div className="ticket-cut"></div>
                    <div className="p-4 d-flex justify-content-between align-items-center">
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <span className="chip chip-sm">{featured.genre}</span>
                          <span className="chip chip-sm">{featured.language}</span>
                        </div>
                        <div className="fw-bold fs-5 text-body">{featured.title}</div>
                      </div>
                      <span className="btn btn-sm btn-primary btn-pill px-3 d-inline-flex align-items-center gap-1">
                        <span>View</span>
                        <i className="ti ti-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hero-ticket p-5 text-center text-secondary">
                  <i className="ti ti-movie display-3 d-block mb-3 text-orange"></i>
                  {loading ? "Loading cinema showtimes..." : "No movies scheduled currently"}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* ---------------- Animated Stats Strip ---------------- */}
        <div className="row g-3 stats-row reveal">
          {[
            { label: "Movies Showing", value: movies.length, icon: "ti-movie" },
            { label: "Languages Available", value: languages, icon: "ti-language" },
            { label: "Active Reservations", value: activeBookings.length, icon: "ti-ticket" },
            { label: "Seats Booked", value: seatsBooked, icon: "ti-armchair" }
          ].map((stat) => (
            <div className="col-6 col-lg-3" key={stat.label}>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className={`ti ${stat.icon}`}></i>
                </div>
                <div>
                  <div className="stat-value">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <small className="text-secondary">{stat.label}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---------------- Experience Highlights Strip ---------------- */}
        <section className="experience-strip mt-5 pt-3 reveal">
          <div className="row g-3">
            {[
              {
                icon: "ti-sparkles",
                title: "4K Laser Projection",
                desc: "Ultra-vivid colors and crisp contrast on colossal curved screens."
              },
              {
                icon: "ti-headphones",
                title: "Dolby Atmos Audio",
                desc: "Full 360-degree spatial sound that flows completely around you."
              },
              {
                icon: "ti-armchair",
                title: "Plush Recliner Seats",
                desc: "Spacious motorized leather recliners with personal charging ports."
              },
              {
                icon: "ti-shield-check",
                title: "Instant Confirmation",
                desc: "Digital barcode ticketing with 1-click zero hassle cancellation."
              }
            ].map((item) => (
              <div className="col-sm-6 col-lg-3" key={item.title}>
                <div className="feature-card h-100">
                  <div className="feature-icon mb-3">
                    <i className={`ti ${item.icon}`}></i>
                  </div>
                  <h6 className="fw-bold mb-1">{item.title}</h6>
                  <p className="text-secondary small mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Now Showing ---------------- */}
        <section className="mt-5 pt-4">
          <div className="d-flex justify-content-between align-items-end mb-4 reveal">
            <div>
              <span className="eyebrow mb-2">In Cinemas Today</span>
              <h2 className="display-2 mb-0">
                Now <em>Showing.</em>
              </h2>
            </div>
            <Link to="/movies" className="link-arrow">
              <span>View all releases</span>
              <i className="ti ti-arrow-right"></i>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-orange"></div>
            </div>
          ) : movies.length === 0 ? (
            <div className="empty-box reveal">
              <i className="ti ti-movie-off"></i>
              <p>No movies currently playing. Add your first title from <Link to="/admin">Manage Movies</Link>.</p>
            </div>
          ) : (
            <div className="row g-4">
              {movies.slice(0, 4).map((movie) => (
                <div className="col-6 col-md-4 col-lg-3" key={movie._id}>
                  <MovieCard movie={movie} onDetails={setSelected} onBook={book} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ---------------- How It Works (HealthTwin Numbered Steps) ---------------- */}
        <section className="mt-5 pt-5">
          <div className="text-center mb-5 reveal">
            <span className="eyebrow mb-2">Seamless Booking</span>
            <h2 className="display-2">
              Reserve in <em>three easy steps.</em>
            </h2>
          </div>
          <div className="row g-4">
            {[
              {
                num: "01",
                icon: "ti-film",
                title: "Choose Your Movie",
                text: "Explore current releases, watch trailers, and view ratings and genre details."
              },
              {
                num: "02",
                icon: "ti-clock",
                title: "Select a Showtime",
                text: `Pick from ${SHOWTIMES.length} daily show timings scheduled across morning, afternoon, and night.`
              },
              {
                num: "03",
                icon: "ti-ticket",
                title: "Receive Instant Ticket",
                text: "Enter your name, pick seat count, and receive a verified digital barcode pass."
              }
            ].map((step) => (
              <div className="col-md-4" key={step.title}>
                <div className="step-card h-100 reveal">
                  <span className="step-number">{step.num}</span>
                  <div className="step-icon">
                    <i className={`ti ${step.icon}`}></i>
                  </div>
                  <h5 className="fw-bold mb-2">{step.title}</h5>
                  <p className="text-secondary mb-0 small leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Critic & Guest Testimonial Carousel / Strip ---------------- */}
        <section className="mt-5 pt-5 reveal">
          <div className="section-head mb-4 text-center">
            <span className="eyebrow mb-2">Audience Praise</span>
            <h2 className="display-2">
              Loved by <em>moviegoers.</em>
            </h2>
          </div>
          <div className="row g-4">
            {[
              {
                quote: "The easiest and most polished cinema booking interface I've used. Clean, lightning fast, and effortless.",
                author: "Ananya S.",
                role: "Film Critic & Cinephile"
              },
              {
                quote: "Crystal clear laser projection and sound that shakes the room. You can cancel with one click if plans change.",
                author: "Rahul M.",
                role: "Weekend Moviegoer"
              },
              {
                quote: "Instant barcode ticket right on screen, no printing needed. Premium recliner seats make every watch a treat.",
                author: "Kavya R.",
                role: "Premiere Member"
              }
            ].map((t) => (
              <div className="col-md-4" key={t.author}>
                <div className="card quote-card h-100 p-4">
                  <div className="quote-stars mb-3 text-amber">
                    <i className="ti ti-star-filled me-1"></i>
                    <i className="ti ti-star-filled me-1"></i>
                    <i className="ti ti-star-filled me-1"></i>
                    <i className="ti ti-star-filled me-1"></i>
                    <i className="ti ti-star-filled"></i>
                  </div>
                  <p className="quote-text mb-4 text-body">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-auto d-flex align-items-center gap-2">
                    <div className="quote-avatar">{t.author[0]}</div>
                    <div>
                      <div className="fw-bold text-body small">{t.author}</div>
                      <small className="text-secondary">{t.role}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Call to Action Band ---------------- */}
        <section className="cta-band mt-5 reveal">
          <div className="row align-items-center g-4">
            <div className="col-md-8">
              <span className="eyebrow text-white opacity-75 mb-2">Don't Miss Out</span>
              <h3 className="display-3 fw-bold mb-2">
                Ready for the <em>show?</em>
              </h3>
              <p className="mb-0 opacity-90">
                Reserve your favorite recliner seats today before the theatre sells out.
              </p>
            </div>
            <div className="col-md-4 text-md-end">
              <Link to="/book" className="btn btn-light btn-pill btn-lg px-4 d-inline-flex align-items-center gap-2">
                <i className="ti ti-ticket text-orange"></i>
                <span className="fw-bold">Book Your Seats</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <MovieDetailsModal movie={selected} onClose={() => setSelected(null)} onBook={book} />
    </>
  );
}

export default Home;
