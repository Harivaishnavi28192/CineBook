import { useEffect, useState } from "react";

function Preloader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => setVisible(false), 600);
    }, 1100);

    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`app-loader ${fading ? "loader-fade" : ""}`} aria-hidden="true">
      <div className="loader-mark">
        <svg viewBox="0 0 72 72" width="72" height="72" className="loader-svg">
          <path
            className="loader-pulse"
            d="M 10 24 C 10 18, 16 14, 22 14 H 50 C 56 14, 62 18, 62 24 V 32 C 58 32, 54 36, 54 40 C 54 44, 58 48, 62 48 V 56 C 62 62, 56 66, 50 66 H 22 C 16 66, 10 62, 10 56 V 48 C 14 48, 18 44, 18 40 C 18 36, 14 32, 10 32 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="loader-beam"
            d="M 36 26 L 39 34 L 47 36 L 40 41 L 42 49 L 36 44 L 30 49 L 32 41 L 25 36 L 33 34 Z"
            fill="currentColor"
            opacity="0.85"
          />
        </svg>
        <span className="loader-text">
          Cine<em>Book</em>
        </span>
        <small className="loader-sub">Cinema &amp; Experiences</small>
      </div>
    </div>
  );
}

export default Preloader;
