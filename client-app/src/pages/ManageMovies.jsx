import { useState } from "react";
import api from "../api";
import ConfirmModal from "../components/ConfirmModal";
import PageHeader from "../components/PageHeader";
import { formatDuration, posterGradient, seatStatus } from "../utils";

const emptyForm = { movieId: "", title: "", genre: "", duration: "", language: "", availableSeats: "" };

function ManageMovies({ movies, loading, reload, notify }) {
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null); // null = adding a new movie
  const [search, setSearch] = useState("");
  const [toDelete, setToDelete] = useState(null);

  // Update one field of the form
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const clearForm = () => {
    setForm(emptyForm);
    setEditId(null);
  };

  // Add new movie or update existing movie
  const saveMovie = (event) => {
    event.preventDefault();
    const request = editId
      ? api.post("/updateMovie", { ...form, id: editId })
      : api.post("/addMovie", form);

    request
      .then((res) => {
        notify(res.data.status, "success");
        if (/success/i.test(res.data.status)) {
          clearForm();
          reload();
        }
      })
      .catch(() => notify("Could not connect to the movie server", "error"));
  };

  const editMovie = (movie) => {
    setEditId(movie._id);
    setForm({
      movieId: movie.movieId,
      title: movie.title,
      genre: movie.genre,
      duration: movie.duration,
      language: movie.language,
      availableSeats: movie.availableSeats
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteMovie = () => {
    api
      .post("/deleteMovie", { id: toDelete._id })
      .then((res) => {
        notify(res.data.status, "success");
        if (editId === toDelete._id) clearForm();
        reload();
      })
      .catch(() => notify("Could not connect to the server", "error"));
    setToDelete(null);
  };

  const shown = movies.filter((m) =>
    (m.title + " " + m.movieId + " " + m.genre + " " + m.language)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const fields = [
    { name: "movieId", label: "Movie Identifier", placeholder: "e.g. M105", icon: "ti-hash" },
    { name: "title", label: "Movie Title", placeholder: "e.g. Interstellar", icon: "ti-movie" },
    { name: "genre", label: "Genre", placeholder: "e.g. Sci-Fi, Drama", icon: "ti-category" },
    { name: "language", label: "Language", placeholder: "e.g. English, Tamil", icon: "ti-language" },
    { name: "duration", label: "Duration (minutes)", placeholder: "e.g. 165", icon: "ti-clock", type: "number", min: 1 },
    { name: "availableSeats", label: "Available Seats", placeholder: "e.g. 120", icon: "ti-armchair", type: "number", min: 0 }
  ];

  return (
    <>
      <PageHeader
        title={
          <>
            Manage <em>Movies.</em>
          </>
        }
        subtitle="Add new film listings, edit screening details, or update theatre seating capacity."
      />

      <div className="container mt-4 mb-5">
        <div className="row g-4">
          {/* Left Form: Add / Edit Movie */}
          <div className="col-lg-5 col-xl-4">
            <div className={`panel sticky-lg-top ${editId ? "panel-edit" : ""} reveal`}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="panel-title mb-0">
                  <span>{editId ? <i className="ti ti-edit"></i> : <i className="ti ti-plus"></i>}</span>
                  <h5 className="mb-0">{editId ? "Edit Movie Details" : "Add New Movie"}</h5>
                </div>
                {editId && (
                  <button type="button" className="btn btn-sm btn-outline-secondary btn-pill" onClick={clearForm}>
                    Cancel Edit
                  </button>
                )}
              </div>

              {/* Dynamic Poster Preview */}
              {form.title && (
                <div
                  className="poster p-3 rounded-3 mb-3 text-white d-flex align-items-end"
                  style={{ height: "130px", background: posterGradient(form.movieId || form.title) }}
                >
                  <div>
                    <span className="badge rounded-pill bg-black bg-opacity-50 small mb-1">
                      {form.genre || "Genre"} · {form.language || "Language"}
                    </span>
                    <h5 className="fw-bold mb-0 text-truncate">{form.title}</h5>
                  </div>
                </div>
              )}

              <form onSubmit={saveMovie}>
                <div className="row g-2">
                  {fields.map((f) => (
                    <div className="col-12" key={f.name}>
                      <label className="form-label text-secondary small fw-semibold mb-1">{f.label}</label>
                      <div className="input-group">
                        <span className="input-group-text bg-surface-2 border-end-0">
                          <i className={`ti ${f.icon} text-orange`}></i>
                        </span>
                        <input
                          type={f.type || "text"}
                          name={f.name}
                          min={f.min}
                          className="form-control border-start-0"
                          placeholder={f.placeholder}
                          value={form[f.name]}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="d-flex gap-2 mt-4">
                  <button type="submit" className="btn btn-primary btn-pill flex-grow-1 py-2">
                    <i className={`ti ${editId ? "ti-check" : "ti-plus"} me-1`}></i>
                    {editId ? "Update Movie" : "Add Movie to Lineup"}
                  </button>
                  {editId && (
                    <button type="button" className="btn btn-outline-secondary btn-pill px-3" onClick={clearForm}>
                      Reset
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right Table: All Movies */}
          <div className="col-lg-7 col-xl-8">
            <div className="panel reveal" style={{ "--d": "0.1s" }}>
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
                <div>
                  <h5 className="fw-bold mb-1 text-body">Scheduled Movies</h5>
                  <p className="text-secondary small mb-0">Total of {movies.length} active listings</p>
                </div>
                <div className="input-group search-small">
                  <span className="input-group-text bg-surface-2 border-end-0">
                    <i className="ti ti-search text-orange"></i>
                  </span>
                  <input
                    className="form-control border-start-0"
                    placeholder="Search by title, ID or genre..."
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

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-orange"></div>
                </div>
              ) : shown.length === 0 ? (
                <div className="empty-box py-5">
                  <i className="ti ti-movie-off text-orange fs-2"></i>
                  <p className="fs-5 fw-medium mb-1">No movies listed.</p>
                  <small className="text-secondary d-block">
                    Use the form on the left to add your first movie release.
                  </small>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table app-table align-middle mb-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title &amp; Genre</th>
                        <th>Language</th>
                        <th>Duration</th>
                        <th>Available Seats</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shown.map((m) => {
                        const seat = seatStatus(m.availableSeats);
                        const isEditingThis = editId === m._id;
                        return (
                          <tr key={m._id} className={isEditingThis ? "row-editing" : ""}>
                            <td>
                              <span className="badge font-monospace text-orange bg-orange-soft px-2 py-1">
                                {m.movieId}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div
                                  className="movie-pick-thumb small-thumb rounded-2 flex-shrink-0"
                                  style={{ background: posterGradient(m.movieId) }}
                                >
                                  {m.title[0]}
                                </div>
                                <div className="min-w-0">
                                  <div className="fw-semibold text-body text-truncate">{m.title}</div>
                                  <small className="text-secondary">{m.genre}</small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="chip chip-sm">{m.language}</span>
                            </td>
                            <td>
                              <small className="text-secondary">{formatDuration(m.duration)}</small>
                            </td>
                            <td>
                              <span className={`badge rounded-pill ${seat.cls}`}>{seat.label}</span>
                            </td>
                            <td className="text-end">
                              <div className="d-inline-flex gap-1">
                                <button
                                  className="btn btn-outline-primary btn-sm btn-pill px-3"
                                  onClick={() => editMovie(m)}
                                  title="Edit movie"
                                >
                                  <i className="ti ti-edit me-1"></i> Edit
                                </button>
                                <button
                                  className="btn btn-outline-danger btn-sm btn-pill px-2"
                                  onClick={() => setToDelete(m)}
                                  title="Delete movie"
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
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {toDelete && (
        <ConfirmModal
          show={true}
          title="Delete Movie"
          message={`Are you sure you want to delete "${toDelete.title}"? This will also cancel and remove any customer bookings associated with this movie.`}
          confirmText="Yes, Delete Movie"
          variant="danger"
          onConfirm={deleteMovie}
          onClose={() => setToDelete(null)}
        />
      )}
    </>
  );
}

export default ManageMovies;
