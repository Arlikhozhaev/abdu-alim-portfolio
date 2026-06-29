import { WindowControls } from "#components";
import OptimizedImage from "#components/OptimizedImage";
import { photosLinks, gallery } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { Mail, Search } from "lucide-react";

const Photos = () => {
  const { openDynamicWindow } = useWindowStore();

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />

        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>

      <div className="flex w-full overflow-hidden" style={{ height: "70vh" }}>
        <div className="sidebar">
          <h2>Photos</h2>

          <ul>
            {photosLinks.map(({ id, icon, title }) => (
              <li key={id}>
                <img src={icon} alt={title} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex-1 overflow-y-auto p-2"
          style={{ columnCount: 2, columnGap: "4px" }}
        >
          {gallery.map(({ id, img, title, desc }) => (
            <div
              key={id}
              onClick={() =>
                openDynamicWindow({
                  id,
                  name: title,
                  icon: "/images/image.png",
                  kind: "file",
                  fileType: "img",
                  imageUrl: img,
                })
              }
              style={{
                breakInside: "avoid",
                marginBottom: "4px",
                position: "relative",
                cursor: "pointer",
                borderRadius: "6px",
                overflow: "hidden",
              }}
              className="group"
            >
              <OptimizedImage
                src={img}
                alt={title}
                style={{ width: "100%", height: "auto", display: "block" }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
                  padding: "24px 10px 10px",
                  opacity: 0,
                  transition: "opacity 0.2s ease",
                }}
                className="group-hover:opacity-100"
              >
                <p style={{ color: "white", fontSize: "13px", fontWeight: 600, margin: 0 }}>
                  {title}
                </p>
                {desc && (
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "11px", margin: "2px 0 0" }}>
                    {desc}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const photosWindow = WindowWrapper(Photos, "photos");

export default photosWindow;