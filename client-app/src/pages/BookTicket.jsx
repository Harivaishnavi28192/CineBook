import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api";
import PageHeader from "../components/PageHeader";
import { SHOWTIMES, formatDate, formatDuration, posterGradient, seatStatus, ticketCode } from "../utils";

function BookTicket({ movies, reload, notify }) {
  const [params] = useSearchParams();

  const [movieId, setMovieId] = useState(params.get("movie") || "");
  const [showtime, setShowtime] = useState("");
  const [seats, setSeats] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [saving, setSaving] = useState(false);
  const [ticket, setTicket] = useState(null); // booking returned by the server

  const movie = movies.find((m) => m.movieId === movieId);
  const maxSeats = movie ? movie.availableSeats : 1;
  const TICKET_PRICE = 250; // INR price per seat

  // Progress steps
  const steps = [
    { num: "01", label: "Select Movie", done: !!movie },
    { num: "02", label: "Pick Showtime", done: !!showtime },
    { num: "03", label: "Guest & Seats", done: customerName.trim() !== "" && seats > 0 }
  ];

  const chooseMovie = (id) => {
    setMovieId(id);
    setSeats(1);
  };

  const changeSeats = (delta) => {
    const next = Math.max(1, Math.min(maxSeats, seats + delta));
    setSeats(next);
  };

  const bookTicket = (event) => {
    event.preventDefault();
    if (!movie) return notify("Please select a movie to continue", "error");
    if (!showtime) return notify("Please choose a preferred showtime", "error");
    if (!customerName.trim()) return notify("Please provide your name for the ticket", "error");

    setSaving(true);
    api
      .post("/bookTicket", { customerName, movieId, showtime, seats })
      .then((res) => {
        if (res.data.booking) {
          setTicket(res.data.booking);
          notify(res.data.status, "success");
          reload();
        } else {
          notify(res.data.status, "error");
        }
      })
      .catch(() => notify("Could not connect to the booking server", "error"))
      .finally(() => setSaving(false));
  };

  const bookAnother = () => {
    setTicket(null);
    setMovieId("");
    setShowtime("");
    setSeats(1);
    setCustomerName("");
  };

  // ---------------- Ticket Confirmation View ----------------
  if (ticket) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 text-center">
            <div className="success-icon pop-in mb-3">
              <i className="ti ti-check fs-1"></i>
            </div>
            <h2 className="display-2 mb-1">
              Booking <em>Confirmed!</em>
            </h2>
            <p className="text-secondary mb-4">
              Your seats are reserved. Present this digital ticket barcode at the counter.
            </p>

            <div className="ticket text-start pop-in shadow-lg">
              <div className="ticket-top" style={{ background: posterGradient(ticket.movieId) }}>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="small text-white opacity-75">CineBook · Verified Admission Pass</span>
                  <span className="badge rounded-pill bg-dark bg-opacity-50 text-white small">
                    <i className="ti ti-circle-check-filled text-success me-1"></i> Confirmed
                  </span>
                </div>
                <h3 className="fw-bold mb-0 text-white">{ticket.movieTitle}</h3>
              </div>

              <div className="p-4 bg-surface">
                <div className="row g-3">
                  <div className="col-6">
                    <small className="text-secondary d-block">Passenger / Guest</small>
                    <strong className="text-body fs-6">{ticket.customerName}</strong>
                  </div>
                  <div className="col-6">
                    <small className="text-secondary d-block">Ticket Reference</small>
                    <strong className="text-orange fs-6">{ticketCode(ticket._id)}</strong>
                  </div>
                  <div className="col-6">
                    <small className="text-secondary d-block">Showtime</small>
                    <strong className="text-body">{ticket.showtime}</strong>
                  </div>
                  <div className="col-6">
                    <small className="text-secondary d-block">Total Seats</small>
                    <strong className="text-body">{ticket.seats} Recliner Seat(s)</strong>
                  </div>
                  <div className="col-12 pt-2 border-top border-line">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-secondary d-block">Booking Timestamp</small>
                        <span className="small text-body">{formatDate(ticket.bookingDate)}</span>
                      </div>
                      <div className="text-end">
                        <small className="text-secondary d-block">Total Paid</small>
                        <strong className="text-orange fs-5">₹{ticket.seats * TICKET_PRICE}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ticket-cut"></div>
              <div className="p-3 text-center barcode bg-surface">
                <div className="barcode-lines">||| | |||| || ||| | || |||| | ||| || | |||</div>
                <small className="text-secondary tracking-widest">{ticket._id}</small>
              </div>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
              <button className="btn btn-primary btn-pill px-4" onClick={bookAnother}>
                <i className="ti ti-plus me-1"></i> Book Another Ticket
              </button>
              <Link to="/bookings" className="btn btn-outline-secondary btn-pill px-4">
                <i className="ti ti-ticket me-1"></i> View All Bookings
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- Booking Form View ----------------
  return (
    <>
      <PageHeader
        title={
          <>
            Reserve <em>Seats.</em>
          </>
        }
        subtitle="Select your movie, preferred showtime, and reserve luxury seats with instant confirmation."
      />

      <div className="container mt-4 mb-5">
        {/* Step Progress Indicator (HealthTwin numbered style) */}
        <div className="steps-wrap mb-5 reveal">
          <div className="steps">
            {steps.map((st) => (
              <div key={st.label} className={`step ${st.done ? "done" : ""}`}>
                <div className="step-dot">{st.num}</div>
                <span className="step-label">{st.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="row g-4">
          {/* Main Booking Form */}
          <div className="col-lg-7">
            <form onSubmit={bookTicket} className="d-flex flex-column gap-4">
              {/* Step 1: Movie Selection */}
              <div className="panel reveal">
                <div className="panel-title">
                  <span>01</span>
                  <h5>Select Movie</h5>
                </div>

                {movies.length === 0 ? (
                  <p className="text-secondary small">No movies currently available to book.</p>
                ) : (
                  <div className="movie-pick-list d-flex flex-column gap-2">
                    {movies.map((m) => {
                      const seat = seatStatus(m.availableSeats);
                      const isSelected = movieId === m.movieId;
                      const disabled = m.availableSeats === 0;

                      return (
                        <button
                          key={m.movieId}
                          type="button"
                          disabled={disabled}
                          onClick={() => chooseMovie(m.movieId)}
                          className={`movie-pick text-start ${isSelected ? "active" : ""}`}
                        >
                          <div className="movie-pick-thumb" style={{ background: posterGradient(m.movieId) }}>
                            {m.title[0]}
                          </div>
                          <div className="flex-grow-1 min-w-0">
                            <div className="fw-semibold text-truncate">{m.title}</div>
                            <small className="text-secondary">
                              {m.genre} · {m.language} · {formatDuration(m.duration)}
                            </small>
                          </div>
                          <span className={`badge rounded-pill ${seat.cls} ms-2 flex-shrink-0`}>{seat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Step 2: Showtime Selection */}
              <div className="panel reveal" style={{ "--d": "0.1s" }}>
                <div className="panel-title">
                  <span>02</span>
                  <h5>Choose Showtime</h5>
                </div>
                <p className="text-secondary small mb-3">All shows are screened in 4K Laser with Dolby Atmos audio.</p>
                <div className="row g-2">
                  {SHOWTIMES.map((time) => {
                    const isSelected = showtime === time;
                    return (
                      <div className="col-6 col-sm-3" key={time}>
                        <button
                          type="button"
                          className={`time-btn ${isSelected ? "active" : ""}`}
                          onClick={() => setShowtime(time)}
                        >
                          <i className="ti ti-clock d-block mb-1 fs-5"></i>
                          <span>{time}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Customer Details & Seats */}
              <div className="panel reveal" style={{ "--d": "0.2s" }}>
                <div className="panel-title">
                  <span>03</span>
                  <h5>Passenger &amp; Seats</h5>
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold">Customer Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-surface-2 border-end-0">
                      <i className="ti ti-user text-orange"></i>
                    </span>
                    <input
                      className="form-control border-start-0"
                      placeholder="e.g. Hari Vaishnavi"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="form-label text-secondary small fw-bold d-flex justify-content-between">
                    <span>Number of Seats</span>
                    {movie && (
                      <span className="text-secondary">
                        Max available: <strong className="text-orange">{maxSeats}</strong>
                      </span>
                    )}
                  </label>

                  <div className="d-flex align-items-center gap-3">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-icon-round"
                      disabled={seats <= 1}
                      onClick={() => changeSeats(-1)}
                    >
                      <i className="ti ti-minus"></i>
                    </button>

                    <div className="seat-display text-center">
                      <span className="fs-3 fw-bold text-orange">{seats}</span>
                      <small className="d-block text-secondary">Seat(s)</small>
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-icon-round"
                      disabled={seats >= maxSeats}
                      onClick={() => changeSeats(1)}
                    >
                      <i className="ti ti-plus"></i>
                    </button>

                    <div className="ms-auto text-end">
                      <small className="text-secondary d-block">Estimated Total</small>
                      <span className="fs-4 fw-bold text-body">₹{seats * TICKET_PRICE}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={saving || !movie || !showtime || !customerName.trim()}
                className="btn btn-primary btn-pill btn-lg w-100 py-3 shadow-lg d-inline-flex align-items-center justify-content-center gap-2"
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm"></span>
                    <span>Processing Reservation...</span>
                  </>
                ) : (
                  <>
                    <i className="ti ti-ticket fs-5"></i>
                    <span>Confirm &amp; Book Tickets (₹{seats * TICKET_PRICE})</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sticky Order Summary Ticket Preview */}
          <div className="col-lg-5">
            <div className="sticky-lg-top">
              <div className="panel summary reveal" style={{ "--d": "0.15s" }}>
                <h5 className="fw-bold mb-3 d-flex align-items-center gap-2 text-body">
                  <i className="ti ti-receipt text-orange"></i>
                  <span>Live Ticket Preview</span>
                </h5>

                {movie ? (
                  <>
                    <div
                      className="p-3 rounded-3 mb-3 text-white d-flex align-items-center gap-3"
                      style={{ background: posterGradient(movie.movieId) }}
                    >
                      <div className="movie-pick-thumb small-thumb bg-black bg-opacity-25">{movie.title[0]}</div>
                      <div>
                        <div className="fw-bold">{movie.title}</div>
                        <small className="opacity-75">
                          {movie.genre} · {movie.language}
                        </small>
                      </div>
                    </div>

                    <ul className="summary-list list-unstyled mb-4">
                      <li>
                        <span>Showtime</span>
                        <strong>{showtime || "Not selected yet"}</strong>
                      </li>
                      <li>
                        <span>Seats</span>
                        <strong>{seats} Recliner Seat(s)</strong>
                      </li>
                      <li>
                        <span>Price per ticket</span>
                        <strong>₹{TICKET_PRICE}</strong>
                      </li>
                      <li>
                        <span>Customer</span>
                        <strong>{customerName || "—"}</strong>
                      </li>
                      <li className="total-row pt-3 mt-2 border-top border-line">
                        <span className="fs-6 fw-bold text-body">Total Payable</span>
                        <strong className="fs-5 text-orange">₹{seats * TICKET_PRICE}</strong>
                      </li>
                    </ul>

                    <div className="p-3 rounded-3 bg-surface-2 border border-line small text-secondary d-flex align-items-start gap-2">
                      <i className="ti ti-shield-check text-orange fs-5 flex-shrink-0 mt-1"></i>
                      <span>Free cancellation up to 2 hours prior to showtime. Instant seat reassignment.</span>
                    </div>
                  </>
                ) : (
                  <div className="empty-box py-4">
                    <i className="ti ti-ticket-off text-orange fs-2"></i>
                    <p className="small mb-0">Select a movie from the left to preview your ticket details.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookTicket;
