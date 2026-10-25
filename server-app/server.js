const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing JSON data

// MongoDB connection (database name = moviebooking)
mongoose.connect("mongodb://127.0.0.1:27017/moviebooking")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// ---------------- Schemas and Models ----------------

const movieSchema = new mongoose.Schema({
  movieId: { type: String, required: true, unique: true }, // avoid duplicates
  title: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true },  // in minutes
  language: { type: String, required: true },
  availableSeats: { type: Number, required: true, min: 0 }
});
const Movie = mongoose.model("Movie", movieSchema, "movies");

const bookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  movieId: { type: String, required: true },
  movieTitle: { type: String, required: true },
  showtime: { type: String, required: true },
  seats: { type: Number, required: true, min: 1 },
  status: { type: String, default: "Booked" }, // Booked or Cancelled
  bookingDate: { type: Date, default: Date.now }
});
const Booking = mongoose.model("Booking", bookingSchema, "bookings");

// ---------------- Test API ----------------

app.get("/", async (req, res) => {
  res.send("Hello from Movie Ticket Booking Server (Express + MongoDB + CORS)!");
});

// ---------------- Movie APIs ----------------

// API to add a new movie (CREATE)
app.post("/api/addMovie", async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.json({ status: "Movie added successfully" });
  } catch (err) {
    if (err.code == 11000) {
      // handle duplicate movie ID
      res.json({ status: `Movie ID ${req.body.movieId} already exists` });
    } else {
      res.json({ status: err.message });
    }
  }
});

// API to view all movies (READ)
app.get("/api/viewMovies", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

// API to search movies by title (READ)
app.get("/api/searchMovies", async (req, res) => {
  const title = req.query.title || "";
  // escape special characters so the text is searched as plain text
  const safeTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const movies = await Movie.find({ title: { $regex: safeTitle, $options: "i" } });
  res.send(movies);
});

// API to update movie details (UPDATE)
app.post("/api/updateMovie", async (req, res) => {
  const { id, title, genre, duration, language, availableSeats } = req.body;
  try {
    await Movie.findByIdAndUpdate(
      id,
      { title, genre, duration, language, availableSeats },
      { runValidators: true }
    );
    res.json({ status: "Movie updated successfully" });
  } catch (err) {
    res.json({ status: "Error updating movie: " + err.message });
  }
});

// API to delete a movie using ID (DELETE)
app.post("/api/deleteMovie", async (req, res) => {
  const { id } = req.body;
  try {
    const movie = await Movie.findByIdAndDelete(id);
    if (movie) {
      // also remove the bookings of this movie
      await Booking.deleteMany({ movieId: movie.movieId });
    }
    res.json({ status: "Movie deleted successfully" });
  } catch (err) {
    res.json({ status: "Error deleting movie" });
  }
});

// ---------------- Booking APIs ----------------

// API to book tickets (CREATE)
app.post("/api/bookTicket", async (req, res) => {
  const { customerName, movieId, showtime } = req.body;
  const seats = parseInt(req.body.seats);
  try {
    if (!seats || seats < 1) {
      return res.json({ status: "Please enter a valid number of seats" });
    }
    // reduce seats only if enough seats are available
    const movie = await Movie.findOneAndUpdate(
      { movieId: movieId, availableSeats: { $gte: seats } },
      { $inc: { availableSeats: -seats } }
    );
    if (!movie) {
      return res.json({ status: "Not enough seats available for this movie" });
    }
    const newBooking = new Booking({
      customerName,
      movieId,
      movieTitle: movie.title,
      showtime,
      seats
    });
    await newBooking.save();
    // send the saved booking back so the frontend can show the ticket
    res.json({
      status: `Booked ${seats} seat(s) for ${movie.title} at ${showtime}`,
      booking: newBooking
    });
  } catch (err) {
    res.json({ status: err.message });
  }
});

// API to view all bookings (READ)
app.get("/api/viewBookings", async (req, res) => {
  const bookings = await Booking.find().sort({ bookingDate: -1 });
  res.send(bookings);
});

// API to cancel a booking (UPDATE status + give seats back)
app.post("/api/cancelBooking", async (req, res) => {
  const { id } = req.body;
  try {
    // only bookings with status "Booked" are eligible for cancellation
    const booking = await Booking.findOneAndUpdate(
      { _id: id, status: "Booked" },
      { status: "Cancelled" }
    );
    if (!booking) {
      return res.json({ status: "This booking cannot be cancelled" });
    }
    // add the seats back to the movie
    await Movie.updateOne(
      { movieId: booking.movieId },
      { $inc: { availableSeats: booking.seats } }
    );
    res.json({ status: "Booking cancelled successfully" });
  } catch (err) {
    res.json({ status: "Error cancelling booking" });
  }
});

// API to delete a booking record (DELETE)
app.post("/api/deleteBooking", async (req, res) => {
  const { id } = req.body;
  try {
    const booking = await Booking.findByIdAndDelete(id);
    // if it was still active, give the seats back
    if (booking && booking.status === "Booked") {
      await Movie.updateOne(
        { movieId: booking.movieId },
        { $inc: { availableSeats: booking.seats } }
      );
    }
    res.json({ status: "Booking deleted successfully" });
  } catch (err) {
    res.json({ status: "Error deleting booking" });
  }
});

// Start server
const PORT = 7000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
