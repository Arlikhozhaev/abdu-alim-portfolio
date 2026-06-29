import { useRef, useCallback, useLayoutEffect } from "react";
import { WindowControls } from "#components";
import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import { locations, experience, volunteerExperience, education } from "#constants";
import useLocationStore from "#store/location";
import clsx from "clsx";
import useWindowStore from "#store/window";

const sectionLabelStyle = {
  color: "rgba(0,0,0,0.35)",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 1,
  margin: 0,
  fontWeight: 600,
};

const ExperienceRoleCard = ({ company, logo, title, dates, location, tech, bullets }) => (
  <div className="finder-experience-card" style={{ backgroundColor: "white", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
    <div
      style={{
        padding: "16px 16px 12px",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        background: "linear-gradient(135deg, #f0f6ff, #ffffff)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8, minWidth: 0 }}>
        <img
          src={logo}
          alt={`${company} logo`}
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            objectFit: "contain",
            backgroundColor: "rgba(0,0,0,0.04)",
            padding: 4,
            border: "1px solid rgba(0,0,0,0.08)",
            flexShrink: 0,
          }}
        />
        <div style={{ minWidth: 0, flex: "1 1 0%" }}>
          <p style={{ color: "#111", fontWeight: 700, fontSize: 15, margin: "0 0 3px", lineHeight: 1.35 }}>
            {company}
          </p>
          <p style={{ color: "#0A84FF", fontWeight: 600, fontSize: 12, margin: 0, lineHeight: 1.4 }}>
            {title}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px" }}>
        <p style={{ color: "rgba(0,0,0,0.4)", fontSize: 11, margin: 0 }}>{dates}</p>
        <p style={{ color: "rgba(0,0,0,0.4)", fontSize: 11, margin: 0 }}>· {location}</p>
      </div>
    </div>

    <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
      {bullets.map((b, i) => (
        <div key={i} className="finder-experience-bullet">
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              backgroundColor: "#0A84FF",
              flexShrink: 0,
              marginTop: 7,
            }}
          />
          <p className="finder-experience-bullet-text" style={{ color: "rgba(0,0,0,0.65)", fontSize: 13, lineHeight: 1.65 }}>
            {b}
          </p>
        </div>
      ))}
    </div>

    <div style={{ padding: "0 16px 16px", display: "flex", gap: 6, flexWrap: "wrap" }}>
      {tech.map((t) => (
        <span
          key={t}
          style={{
            backgroundColor: "rgba(10,132,255,0.08)",
            color: "#0A84FF",
            fontSize: 11,
            padding: "3px 10px",
            borderRadius: 20,
            fontWeight: 500,
          }}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

const Finder = () => {
  const { openWindow, openDynamicWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();
  const experiencePanelRef = useRef(null);

  const handleExperienceWheel = useCallback((event) => {
    const panel = experiencePanelRef.current;
    if (!panel) return;

    const { scrollTop, scrollHeight, clientHeight } = panel;
    const atTop = scrollTop <= 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
    const scrollingUp = event.deltaY < 0;
    const scrollingDown = event.deltaY > 0;

    if ((scrollingUp && atTop) || (scrollingDown && atBottom)) return;

    event.preventDefault();
    panel.scrollTop += event.deltaY;
  }, []);

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

  useLayoutEffect(() => {
    const finderWindow = document.getElementById("finder");
    if (!finderWindow) return;
    finderWindow.classList.toggle("is-experience-window", isExperience);
  }, [isExperience]);

  return (
    <div className={clsx("finder-shell", isExperience && "is-experience")}>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="finder-body">
        <div className="sidebar">
          {renderList("Favorites", Object.values(locations))}
          {renderList("My Projects", locations.work.children)}
        </div>

        {isExperience ? (
          <div
            ref={experiencePanelRef}
            className="finder-experience-panel"
            data-no-drag
            tabIndex={0}
            onWheel={handleExperienceWheel}
          >
            <div className="finder-experience-content">
              <p style={sectionLabelStyle}>Education</p>
            {education.map(({ id, institution, degree, dates, location, coursework }) => (
              <div
                key={id}
                className="finder-experience-card"
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  padding: 16,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                }}
              >
                <p style={{ color: "#111", fontWeight: 700, fontSize: 15, margin: "0 0 4px" }}>
                  {institution}
                </p>
                <p style={{ color: "rgba(0,0,0,0.65)", fontSize: 13, margin: "0 0 8px", lineHeight: 1.55 }}>
                  {degree}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", marginBottom: coursework?.length ? 10 : 0 }}>
                  <p style={{ color: "rgba(0,0,0,0.4)", fontSize: 11, margin: 0 }}>{dates}</p>
                  <p style={{ color: "rgba(0,0,0,0.4)", fontSize: 11, margin: 0 }}>· {location}</p>
                </div>
                {coursework?.length ? (
                  <>
                    <p
                      style={{
                        color: "rgba(0,0,0,0.45)",
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 0.8,
                        margin: "0 0 6px",
                      }}
                    >
                      Relevant Coursework
                    </p>
                    <p className="finder-experience-bullet-text" style={{ color: "rgba(0,0,0,0.65)", fontSize: 12, lineHeight: 1.6 }}>
                      {coursework.join(" · ")}
                    </p>
                  </>
                ) : null}
              </div>
            ))}

            <p style={{ ...sectionLabelStyle, marginTop: 8 }}>Experience</p>
            {experience.map((role) => (
              <ExperienceRoleCard key={role.id} {...role} />
            ))}

              <p style={{ ...sectionLabelStyle, marginTop: 8 }}>Volunteer</p>
              {volunteerExperience.map((role) => (
                <ExperienceRoleCard key={role.id} {...role} />
              ))}
            </div>
          </div>
        ) : (
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
    </div>
  );
};

const finderWindow = WindowWrapper(Finder, "finder");

export default finderWindow;
