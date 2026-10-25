import Modal from "./Modal";
import { SHOWTIMES, formatDuration, posterGradient, seatStatus } from "../utils";

function MovieDetailsModal({ movie, onClose, onBook }) {
  if (!movie) return null;
  const seat = seatStatus(movie.availableSeats);

  return (
    <Modal show={true} onClose={onClose} size="modal-lg">
      <div className="row g-4 align-items-center">
        <div className="col-md-5">
          <div className="poster poster-lg rounded-4 shadow-sm" style={{ background: posterGradient(movie.movieId) }}>
            <div className="poster-title fs-3">{movie.title}</div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <span className="eyebrow mb-1">Movie ID · {movie.movieId}</span>
              <h3 className="modal-movie-title mb-1">{movie.title}</h3>
            </div>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <span className={`badge rounded-pill ${seat.cls} mb-3`}>{seat.label}</span>

          <div className="row g-2 mb-4">
            {[
              { icon: "ti-category", label: "Genre", value: movie.genre },
              { icon: "ti-language", label: "Language", value: movie.language },
              { icon: "ti-clock", label: "Duration", value: formatDuration(movie.duration) },
              { icon: "ti-armchair", label: "Available", value: `${movie.availableSeats} seats` }
            ].map((item) => (
              <div className="col-6" key={item.label}>
                <div className="info-tile">
                  <i className={`ti ${item.icon} text-orange fs-4`}></i>
                  <div>
                    <small className="text-secondary d-block">{item.label}</small>
                    <span className="fw-semibold text-body">{item.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h6 className="fw-semibold mb-2 text-body">Available Showtimes</h6>
          <div className="d-flex flex-wrap gap-2 mb-4">
            {SHOWTIMES.map((time) => (
              <span key={time} className="chip chip-lg">
                <i className="ti ti-clock me-1 text-orange"></i>
                {time}
              </span>
            ))}
          </div>

          <button
            className="btn btn-primary btn-pill btn-lg w-100 d-inline-flex align-items-center justify-content-center gap-2"
            disabled={movie.availableSeats === 0}
            onClick={() => onBook(movie)}
          >
            <i className="ti ti-ticket"></i>
            <span>{movie.availableSeats === 0 ? "Housefull" : "Proceed to Book Tickets"}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default MovieDetailsModal;
