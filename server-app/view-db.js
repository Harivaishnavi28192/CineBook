const mongoose = require("mongoose");

async function viewDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/moviebooking");
    console.log("\n=======================================================");
    console.log("  CineBook — Live MongoDB Database (moviebooking)");
    console.log("=======================================================\n");

    const db = mongoose.connection.db;

    // Fetch Movies
    const movies = await db.collection("movies").find().toArray();
    console.log(`🎬 MOVIES COLLECTION (${movies.length} records):`);
    if (movies.length === 0) {
      console.log("  (No movies in database yet)\n");
    } else {
      console.table(
        movies.map((m) => ({
          ID: m.movieId,
          Title: m.title,
          Genre: m.genre,
          Duration: `${m.duration} mins`,
          Language: m.language,
          "Seats Left": m.availableSeats
        }))
      );
      console.log("\n");
    }

    // Fetch Bookings
    const bookings = await db.collection("bookings").find().toArray();
    console.log(`🎟️  BOOKINGS COLLECTION (${bookings.length} records):`);
    if (bookings.length === 0) {
      console.log("  (No bookings in database yet)\n");
    } else {
      console.table(
        bookings.map((b) => ({
          "Ticket ID": String(b._id).slice(-6).toUpperCase(),
          Customer: b.customerName,
          Movie: b.movieTitle,
          Showtime: b.showtime,
          Seats: b.seats,
          Status: b.status,
          Date: new Date(b.bookingDate).toLocaleString()
        }))
      );
      console.log("\n");
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  }
}

viewDatabase();
