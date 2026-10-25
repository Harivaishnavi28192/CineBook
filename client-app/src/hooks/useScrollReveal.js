import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll(".reveal, .img-reveal, .hero-title, .reveal-scale");
      elements.forEach((el) => {
        if (reduceMotion) {
          el.classList.add("in");
        } else {
          observer.observe(el);
        }
      });
    };

    // Initial check
    const timer = setTimeout(observeElements, 100);

    // Watch for dynamically loaded content
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);
}
