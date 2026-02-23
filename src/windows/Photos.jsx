import { WindowControls } from "#components";
import { photosLinks, gallery } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { Mail, Search } from "lucide-react";

const Photos = () => {
  const { openWindow } = useWindowStore();

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />

        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>

      <div className="flex w-full h-full overflow-hidden">
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

        {/* Masonry gallery using CSS columns — no JS, no gaps */}
        <div
          className="flex-1 overflow-y-auto p-2"
          style={{
            columnCount: 2,
            columnGap: "4px",
          }}
        >
          {gallery.map(({ id, img, title, desc }) => (
            <div
              key={id}
              onClick={() =>
                openWindow("imgfile", {
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
              <img
                src={img}
                alt={title}
                style={{
                  width: "100%",
                  height: "auto",   
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const photosWindow = WindowWrapper(Photos, "photos");

export default photosWindow;