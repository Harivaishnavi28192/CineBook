# Movie Ticket Booking System


A full-stack web application built with **React JS + Bootstrap** (frontend), **Node.js + Express.js** (backend APIs) and **MongoDB** (database, via Mongoose).

## Features

| Feature | Description | CRUD |
|---|---|---|
| Add New Movie | Add movie ID, title, genre, duration, language and seats | Create |
| View All Movies | Table of all movies with seats left | Read |
| Search Movies | Find movies by title | Read |
| Edit Movie | Update movie details | Update |
| Delete Movie | Remove a movie (and its bookings) | Delete |
| Book Tickets | Select movie, showtime and number of seats | Create |
| View Ticket Bookings | Table of all reservations | Read |
| Cancel Tickets | Cancel an active booking and give the seats back | Update |
| Delete Booking | Remove a booking record | Delete |

## Project Structure

```
Web Project/
├── server-app/        Node.js + Express + Mongoose backend (port 7000)
│   ├── server.js
│   └── package.json
└── client-app/        React JS (Vite) + Bootstrap + Axios frontend (port 5173)
    └── src/
        ├── main.jsx
        └── App.jsx
```

## Database

- Database name: `moviebooking`
- Collections: `movies`, `bookings`
- Connection: `mongodb://127.0.0.1:27017/moviebooking`

The database and collections are created automatically when the first movie is added. (You can also create them in MongoDB Compass.)

## Backend APIs

| Method | URL | Purpose |
|---|---|---|
| POST | /api/addMovie | Add a new movie |
| GET | /api/viewMovies | View all movies |
| GET | /api/searchMovies?title=... | Search movies by title |
| POST | /api/updateMovie | Update a movie |
| POST | /api/deleteMovie | Delete a movie |
| POST | /api/bookTicket | Book tickets |
| GET | /api/viewBookings | View all bookings |
| POST | /api/cancelBooking | Cancel a booking |
| POST | /api/deleteBooking | Delete a booking |

## How to Run

1. Install **MongoDB Community Server** and **MongoDB Compass**, then connect to `localhost:27017` in Compass.
2. Start the backend (Terminal 1):
   ```
   cd server-app
   npm install
   npm run dev
   ```
   You should see `Server running on http://localhost:7000` and `MongoDB connected`.
3. Start the frontend (Terminal 2):
   ```
   cd client-app
   npm install
   npm run dev
   ```
4. Open http://localhost:5173 in the browser.
