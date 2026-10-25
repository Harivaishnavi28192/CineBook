import { formatDuration, posterGradient, seatStatus } from "../utils";

function MovieCard({ movie, onDetails, onBook }) {
  const seat = seatStatus(movie.availableSeats);

  return (
    <div className="card movie-card h-100 reveal" onClick={() => onDetails(movie)} role="button">
      <div className="poster" style={{ background: posterGradient(movie.movieId) }}>
        <span className={`badge rounded-pill seat-badge ${seat.cls}`}>{seat.label}</span>
        <div className="poster-title">{movie.title}</div>
        <div className="poster-play-wrap">
          <i className="ti ti-player-play-filled poster-play-icon"></i>
        </div>
      </div>
      <div className="card-body d-flex flex-column p-3 p-sm-4">
        <div className="d-flex flex-wrap gap-1 mb-3 small">
          <span className="chip">{movie.genre}</span>
          <span className="chip">{movie.language}</span>
          <span className="chip">
            <i className="ti ti-clock me-1"></i>
            {formatDuration(movie.duration)}
          </span>
        </div>
        <button
          className="btn btn-primary btn-pill btn-sm mt-auto w-100 d-inline-flex align-items-center justify-content-center gap-1"
          disabled={movie.availableSeats === 0}
          onClick={(e) => {
            e.stopPropagation();
            onBook(movie);
          }}
        >
          <i className="ti ti-ticket"></i>
          <span>{movie.availableSeats === 0 ? "Housefull" : "Book Tickets"}</span>
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
