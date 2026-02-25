import { navIcons, navLinks } from "#constants";
import useWindowStore from "#store/window";
import useDarkStore from "#store/dark";
import dayjs from "dayjs";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const { isDark, toggleDark } = useDarkStore();

  const handleIconClick = (id) => {
    if (id === 4) toggleDark(); // id 4 = moon.svg = dark toggle
  };

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" className="dark:invert" />
        <p className="font-bold dark:text-gray-100">Abdu Alim's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
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
              className={id === 4 ? "cursor-pointer" : ""}
            >
              <img
                src={id === 4 ? (isDark ? "/icons/sun.svg" : "/icons/moon.svg") : img}
                className="icon-hover dark:invert"
                alt={`icon-${id}`}
              />
            </li>
          ))}
        </ul>

        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;