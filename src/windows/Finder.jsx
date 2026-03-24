import { WindowControls } from "#components";
import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import { locations, experience } from "#constants";
import useLocationStore from "#store/location";
import clsx from "clsx";
import useWindowStore from "#store/window";

const Finder = () => {
  const { openWindow, openDynamicWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href) {
      return window.open(item.href, "_blank");
    }
    if (item.fileType === "img") {
      return openDynamicWindow({
        id: item.id,
        name: item.name,
        icon: item.icon,
        kind: "file",
        fileType: "img",
        imageUrl: item.imageUrl,
      });
    }
    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation.id ? "active" : "not-active",
            )}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const isExperience = activeLocation?.type === "experience";

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList("Favorites", Object.values(locations))}
          {renderList("My Projects", locations.work.children)}
        </div>

        {/* Experience view */}
        {isExperience ? (
          <div style={{ flex: 1, overflowY: "auto", padding: "24px", backgroundColor: "#f5f5f5", display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ color: "rgba(0,0,0,0.35)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, margin: 0, fontWeight: 600 }}>
              Work Experience
            </p>
            {experience.map(({ id, company, logo, title, dates, location, tech, bullets }) => (
              <div key={id} style={{ backgroundColor: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>

                {/* Card Header */}
                <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid rgba(0,0,0,0.06)", background: "linear-gradient(135deg, #f0f6ff, #ffffff)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <img
                      src={logo}
                      alt={company}
                      style={{ width: 44, height: 44, borderRadius: 10, objectFit: "contain", backgroundColor: "rgba(0,0,0,0.04)", padding: 4, border: "1px solid rgba(0,0,0,0.08)" }}
                    />
                    <div>
                      <p style={{ color: "#111", fontWeight: 700, fontSize: 15, margin: "0 0 3px" }}>{company}</p>
                      <p style={{ color: "#0A84FF", fontWeight: 600, fontSize: 12, margin: 0 }}>{title}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <p style={{ color: "rgba(0,0,0,0.4)", fontSize: 11, margin: 0 }}>{dates}</p>
                    <p style={{ color: "rgba(0,0,0,0.4)", fontSize: 11, margin: 0 }}>· {location}</p>
                  </div>
                </div>

                {/* Bullets */}
                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  {bullets.map((b, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#0A84FF", flexShrink: 0, marginTop: 7 }} />
                      <p style={{ color: "rgba(0,0,0,0.65)", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{b}</p>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div style={{ padding: "0 16px 16px", display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {tech.map((t) => (
                    <span key={t} style={{ backgroundColor: "rgba(10,132,255,0.08)", color: "#0A84FF", fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 500 }}>
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Default icon grid */
          <ul className="content">
            {activeLocation?.children.map((item) => (
              <li
                key={item.id}
                className={item.position}
                onClick={() => openItem(item)}
              >
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

const finderWindow = WindowWrapper(Finder, "finder");

export default finderWindow;