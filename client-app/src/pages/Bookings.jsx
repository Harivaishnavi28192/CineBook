import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import ConfirmModal from "../components/ConfirmModal";
import PageHeader from "../components/PageHeader";
import AnimatedCounter from "../components/AnimatedCounter";
import { formatDate, ticketCode } from "../utils";

function Bookings({ bookings, loading, reload, notify }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [action, setAction] = useState(null); // { type: "cancel" | "delete", booking }

  const active = bookings.filter((b) => b.status === "Booked");
  const cancelled = bookings.filter((b) => b.status === "Cancelled");

  const shown = bookings
    .filter((b) => filter === "All" || b.status === filter)
    .filter((b) =>
      (b.customerName + " " + b.movieTitle + " " + ticketCode(b._id))
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const runAction = () => {
    const url = action.type === "cancel" ? "/cancelBooking" : "/deleteBooking";
    api
      .post(url, { id: action.booking._id })
      .then((res) => {
        notify(res.data.status, "success");
        reload();
      })
      .catch(() => notify("Could not connect to the server", "error"));
    setAction(null);
  };

  return (
    <>
      <PageHeader
        title={
          <>
            My <em>Bookings.</em>
          </>
        }
        subtitle="View, track, or cancel your current movie reservations and admission passes."
      >
        <Link to="/book" className="btn btn-primary btn-pill px-4 d-inline-flex align-items-center gap-2">
          <i className="ti ti-plus"></i>
          <span>New Reservation</span>
        </Link>
      </PageHeader>

      <div className="container mt-4 mb-5">
        {/* Summary Stats Strip */}
        <div className="row g-3 mb-4 reveal">
          {[
            { label: "Total Bookings", value: bookings.length, icon: "ti-folders" },
            { label: "Active Passes", value: active.length, icon: "ti-circle-check" },
            { label: "Cancelled", value: cancelled.length, icon: "ti-circle-x" },
            { label: "Seats Reserved", value: active.reduce((s, b) => s + b.seats, 0), icon: "ti-armchair" }
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

        <div className="panel reveal">
          {/* Toolbar */}
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
            <ul className="nav nav-pills app-pills">
              {["All", "Booked", "Cancelled"].map((f) => (
                <li className="nav-item" key={f}>
                  <button
                    type="button"
                    className={`nav-link ${filter === f ? "active" : ""}`}
                    onClick={() => setFilter(f)}
                  >
                    {f === "Booked" ? "Active" : f}
                  </button>
                </li>
              ))}
            </ul>

            <div className="input-group search-small">
              <span className="input-group-text bg-surface-2 border-end-0">
                <i className="ti ti-search text-orange"></i>
              </span>
              <input
                className="form-control border-start-0"
                placeholder="Search guest, movie or ticket no."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="btn btn-outline-secondary" type="button" onClick={() => setSearch("")}>
                  <i className="ti ti-x"></i>
                </button>
              )}
            </div>
          </div>

          {/* Bookings Table */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-orange"></div>
            </div>
          ) : shown.length === 0 ? (
            <div className="empty-box py-5">
              <i className="ti ti-ticket-off text-orange fs-1"></i>
              <p className="fs-5 fw-medium mb-1">No reservations found.</p>
              <small className="text-secondary d-block mb-3">
                {search ? "No bookings match your search query." : "You have not made any bookings in this view."}
              </small>
              <Link to="/book" className="btn btn-primary btn-pill btn-sm px-4">
                Book a Ticket Now
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table app-table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Ticket Ref</th>
                    <th>Customer Name</th>
                    <th>Movie &amp; Showtime</th>
                    <th>Seats</th>
                    <th>Date Booked</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((b) => {
                    const isBooked = b.status === "Booked";
                    return (
                      <tr key={b._id}>
                        <td>
                          <span className="badge font-monospace text-orange bg-orange-soft px-2 py-1">
                            {ticketCode(b._id)}
                          </span>
                        </td>
                        <td>
                          <strong className="text-body">{b.customerName}</strong>
                        </td>
                        <td>
                          <div className="fw-semibold text-body">{b.movieTitle}</div>
                          <small className="text-secondary">
                            <i className="ti ti-clock me-1 text-orange"></i>
                            {b.showtime}
                          </small>
                        </td>
                        <td>
                          <span className="badge rounded-pill bg-surface-2 text-body border border-line">
                            {b.seats} seat(s)
                          </span>
                        </td>
                        <td>
                          <small className="text-secondary">{formatDate(b.bookingDate)}</small>
                        </td>
                        <td>
                          <span className={`status-pill ${isBooked ? "status-ok" : "status-off"}`}>
                            <i className="ti ti-circle-filled me-1"></i>
                            {isBooked ? "Active" : "Cancelled"}
                          </span>
                        </td>
                        <td className="text-end">
                          <div className="d-inline-flex gap-1">
                            {isBooked && (
                              <button
                                className="btn btn-outline-warning btn-sm btn-pill px-3"
                                onClick={() => setAction({ type: "cancel", booking: b })}
                                title="Cancel this reservation"
                              >
                                Cancel
                              </button>
                            )}
                            <button
                              className="btn btn-outline-secondary btn-sm btn-pill px-2"
                              onClick={() => setAction({ type: "delete", booking: b })}
                              title="Delete record"
                            >
                              <i className="ti ti-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {action && (
        <ConfirmModal
          show={true}
          title={action.type === "cancel" ? "Cancel Reservation" : "Delete Booking Record"}
          message={
            action.type === "cancel"
              ? `Are you sure you want to cancel the reservation for "${action.booking.movieTitle}" (${action.booking.seats} seats)? The seats will be released back to the box office.`
              : `Are you sure you want to delete this booking record for "${action.booking.customerName}"? This action cannot be undone.`
          }
          confirmText={action.type === "cancel" ? "Yes, Cancel Booking" : "Yes, Delete Record"}
          variant={action.type === "cancel" ? "warning" : "danger"}
          onConfirm={runAction}
          onClose={() => setAction(null)}
        />
      )}
    </>
  );
}

export default Bookings;
