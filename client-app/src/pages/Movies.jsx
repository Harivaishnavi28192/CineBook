import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import MovieCard from "../components/MovieCard";
import MovieDetailsModal from "../components/MovieDetailsModal";
import PageHeader from "../components/PageHeader";

function Movies({ movies, loading }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  // Search uses server API, filters work in browser
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null); // null = not searching
  const [genre, setGenre] = useState("All");
  const [language, setLanguage] = useState("All");
  const [sortBy, setSortBy] = useState("title");

  const searchMovies = (event) => {
    event.preventDefault();
    if (!query.trim()) return clearSearch();
    api
      .get("/searchMovies", { params: { title: query } })
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err));
  };

  const clearSearch = () => {
    setQuery("");
    setResults(null);
  };

  const genres = ["All", ...new Set(movies.map((m) => m.genre))];
  const languages = ["All", ...new Set(movies.map((m) => m.language))];

  const shown = (results ?? movies)
    .filter((m) => genre === "All" || m.genre === genre)
    .filter((m) => language === "All" || m.language === language)
    .sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "seats") return b.availableSeats - a.availableSeats;
      return a.title.localeCompare(b.title);
    });

  const book = (movie) => navigate(`/book?movie=${movie.movieId}`);

  return (
    <>
      <PageHeader
        title={
          <>
            Explore <em>Movies.</em>
          </>
        }
        subtitle="Browse current theatre schedules, filter by genre or language, and reserve your seats."
      >
        <form className="search-form d-flex gap-2" onSubmit={searchMovies}>
          <div className="input-group">
            <span className="input-group-text bg-surface-2 border-end-0">
              <i className="ti ti-search text-orange"></i>
            </span>
            <input
              className="form-control border-start-0"
              placeholder="Search movie title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="btn btn-primary btn-pill px-4 d-inline-flex align-items-center gap-1">
            <i className="ti ti-search"></i>
            <span>Search</span>
          </button>
        </form>
      </PageHeader>

      <div className="container mt-4">
        {/* Filters Bar */}
        <div className="filter-bar mb-4 reveal">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <span className="small text-secondary fw-semibold me-1">Genre:</span>
            {genres.map((g) => (
              <button
                key={g}
                type="button"
                className={`chip chip-btn ${genre === g ? "active" : ""}`}
                onClick={() => setGenre(g)}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="d-flex gap-2 align-items-center">
            <select
              className="form-select form-select-sm pill-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Filter by language"
            >
              {languages.map((l) => (
                <option key={l} value={l}>
                  {l === "All" ? "All Languages" : l}
                </option>
              ))}
            </select>
            <select
              className="form-select form-select-sm pill-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort movies"
            >
              <option value="title">Sort: Title (A-Z)</option>
              <option value="duration">Sort: Shortest Duration</option>
              <option value="seats">Sort: Most Seats Available</option>
            </select>
          </div>
        </div>

        {/* Search Results Notice */}
        {results && (
          <div className="d-flex align-items-center justify-content-between mb-4 p-3 rounded-3 bg-surface-2 border border-line reveal">
            <span className="text-secondary">
              Found <strong className="text-orange">{results.length}</strong> title(s) matching &ldquo;
              <strong className="text-body">{query}</strong>&rdquo;
            </span>
            <button className="btn btn-sm btn-outline-secondary btn-pill px-3" onClick={clearSearch}>
              <i className="ti ti-x me-1"></i> Clear Search
            </button>
          </div>
        )}

        {/* Movie Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-orange"></div>
          </div>
        ) : shown.length === 0 ? (
          <div className="empty-box reveal">
            <i className="ti ti-search text-orange"></i>
            <p className="fs-5 fw-medium mb-1">No movies match your filters.</p>
            <small className="text-secondary d-block mb-3">Try clearing search terms or changing genre selection.</small>
            <button
              className="btn btn-primary btn-pill btn-sm px-4"
              onClick={() => {
                clearSearch();
                setGenre("All");
                setLanguage("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {shown.map((movie) => (
              <div className="col-6 col-md-4 col-lg-3" key={movie._id}>
                <MovieCard movie={movie} onDetails={setSelected} onBook={book} />
              </div>
            ))}
          </div>
        )}
      </div>

      <MovieDetailsModal movie={selected} onClose={() => setSelected(null)} onBook={book} />
    </>
  );
}

export default Movies;
