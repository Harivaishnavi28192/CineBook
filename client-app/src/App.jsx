import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import api from "./api";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import Preloader from "./components/Preloader";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import BookTicket from "./pages/BookTicket";
import Bookings from "./pages/Bookings";
import ManageMovies from "./pages/ManageMovies";
import NotFound from "./pages/NotFound";
import { useScrollReveal } from "./hooks/useScrollReveal";

// Scroll to top whenever URL changes and re-trigger reveal observations
function ScrollHandler() {
  const { pathname } = useLocation();
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Start a fresh booking form every time the Book page is opened
function BookRoute(props) {
  const location = useLocation();
  return <BookTicket key={location.key} {...props} />;
}

function App() {
  const [movies, setMovies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null); // { text, type }

  // Show a message. If no type is given, decide from server text
  const notify = (text, type) => {
    const finalType = type || (/success|booked/i.test(text) ? "success" : "error");
    setToast({ text, type: finalType, id: Date.now() });
  };

  const loadMovies = () =>
    api
      .get("/viewMovies")
      .then((res) => setMovies(res.data))
      .catch(() =>
        notify("Cannot connect to server. Please ensure backend is running (npm run dev in server-app).", "error")
      );

  const loadBookings = () =>
    api
      .get("/viewBookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));

  // Reload both lists after any change
  const reload = () => {
    loadMovies();
    loadBookings();
  };

  // Load initial data
  useEffect(() => {
    Promise.all([loadMovies(), loadBookings()]).finally(() => setLoading(false));
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3800);
    return () => clearTimeout(timer);
  }, [toast]);

  const shared = { movies, bookings, loading, reload, notify };

  return (
    <BrowserRouter>
      <Preloader />
      <ScrollHandler />
      <Navbar />
      <Toast toast={toast} onClose={() => setToast(null)} />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home {...shared} />} />
          <Route path="/movies" element={<Movies {...shared} />} />
          <Route path="/book" element={<BookRoute {...shared} />} />
          <Route path="/bookings" element={<Bookings {...shared} />} />
          <Route path="/admin" element={<ManageMovies {...shared} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
