import { navIcons, navLinks, locations } from "#constants";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";
import useDarkStore from "#store/dark";
import RecommendationToast from "./RecommendationToast";
import dayjs from "dayjs";
import { useState } from "react";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();
  const { isDark, toggleDark } = useDarkStore();
  const [showRecommendation, setShowRecommendation] = useState(false);

  const handleIconClick = (id) => {
    if (id === 1) setShowRecommendation((prev) => !prev); // wifi → recommendation
    if (id === 2) openWindow("safari");
    if (id === 3) openWindow("contact");
    if (id === 4) toggleDark();
  };

  return (
    <>
      <nav>
        <div>
          <img src="/images/logo.svg" alt="logo" className="dark:invert" />
          <p className="font-bold dark:text-gray-100">Abdu Alim's Portfolio</p>

          <ul>
            {navLinks.map(({ id, name, type }) => (
              <li
                key={id}
                onClick={() => {
                  openWindow(type);
                  if (type === "finder") setActiveLocation(locations.work);
                }}
              >
                <p className="text-sm dark:text-gray-200">{name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ul>
            {navIcons.map(({ id, img }) => (
              <li
                key={id}
                onClick={() => handleIconClick(id)}
                className="cursor-pointer"
              >
                <img
                  src={
                    id === 4
                      ? isDark
                        ? "/icons/sun.svg"
                        : "/icons/moon.svg"
                      : img
                  }
                  className={`icon-hover dark:invert ${id === 1 ? "animate-pulse" : ""}`}
                  alt={`icon-${id}`}
                />
              </li>
            ))}
          </ul>

          <time className="dark:text-gray-100">
            {dayjs().format("ddd MMM D h:mm A")}
          </time>
        </div>
      </nav>

      {/* Recommendation toast — renders outside nav to avoid clipping */}
      {showRecommendation && (
        <RecommendationToast onClose={() => setShowRecommendation(false)} />
      )}
    </>
  );
};

export default Navbar;
