import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ value = 0, duration = 1200, prefix = "", suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const target = Number(value) || 0;
    if (target === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Cubic ease-out
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            setDisplay(current);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplay(target);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  const target = Number(value) || 0;
  const shownValue = target === 0 ? 0 : display;

  return (
    <span ref={ref} className="count-number">
      {prefix}
      {shownValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export default AnimatedCounter;
