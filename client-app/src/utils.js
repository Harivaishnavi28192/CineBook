// Small helper functions used by many pages

export const SHOWTIMES = ["10:00 AM", "1:30 PM", "6:00 PM", "9:30 PM"];

// Poster colors - the same movie always gets the same color
const gradients = [
  "linear-gradient(160deg, #ff8a1f 0%, #8a3a00 55%, #140800 100%)",   // orange
  "linear-gradient(160deg, #ffc15e 0%, #9a5a00 50%, #170d00 100%)",   // amber
  "linear-gradient(160deg, #ff5f1f 0%, #7a1f00 55%, #120400 100%)",   // burnt orange
  "linear-gradient(160deg, #e8a87c 0%, #6b3a1e 55%, #0f0805 100%)",   // copper
  "linear-gradient(160deg, #ffa94d 0%, #5c2a10 50%, #0d0705 100%)",   // tangerine
  "linear-gradient(160deg, #d9480f 0%, #4a1405 55%, #0a0302 100%)"    // rust
];

// Next showtime from now (or the first show tomorrow)
export const nextShowtime = () => {
  const now = new Date();
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const toMinutes = (t) => {
    const [time, ampm] = t.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    return h * 60 + m;
  };
  const next = SHOWTIMES.find((t) => toMinutes(t) > minutesNow);
  return next ? `Today, ${next}` : `Tomorrow, ${SHOWTIMES[0]}`;
};

export const posterGradient = (key = "") => {
  let hash = 0;
  for (const ch of key) hash = (hash * 31 + ch.charCodeAt(0)) % 997;
  return gradients[hash % gradients.length];
};

// 164 -> "2h 44m"
export const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

// Seats left badge text and color
export const seatStatus = (count) => {
  if (count === 0) return { label: "Housefull", cls: "bg-danger" };
  if (count <= 20) return { label: `Only ${count} left`, cls: "bg-warning text-dark" };
  return { label: `${count} seats left`, cls: "bg-success" };
};

// Short ticket code made from the MongoDB _id
export const ticketCode = (id = "") => "TKT-" + id.slice(-6).toUpperCase();

export const formatDate = (date) =>
  new Date(date).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  });
