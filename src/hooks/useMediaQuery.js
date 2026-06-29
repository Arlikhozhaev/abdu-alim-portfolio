import { useEffect, useState } from "react";

const getInitialMatch = (query) => {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
};

/**
 * Subscribes to a CSS media query. Initial value is read synchronously on the
 * client so the correct UI branch mounts on first paint (no desktop/mobile flash).
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => getInitialMatch(query));

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);

    setMatches(media.matches);
    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
};

export default useMediaQuery;
