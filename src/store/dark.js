import { create } from "zustand";

const getInitialDark = () => {
  const stored = localStorage.getItem("theme");
  if (stored) return stored === "dark";
  return false; // light by default
};

const applyDark = (isDark) => {
  const html = document.documentElement;
  if (isDark) {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

// Apply immediately on import — before React renders anything
applyDark(getInitialDark());

const useDarkStore = create((set) => ({
  isDark: getInitialDark(),

  toggleDark: () =>
    set((state) => {
      const next = !state.isDark;
      applyDark(next);
      return { isDark: next };
    }),
}));

export default useDarkStore;